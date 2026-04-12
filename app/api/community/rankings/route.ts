import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getAuthUserId } from "@/lib/auth-helpers";
import { decodeRankingCursor, encodeRankingCursor, RankingSort } from "@/lib/cursor";
import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/revalidation";

function toSort(input: string | null): RankingSort {
  if (input === "likes" || input === "views") return input;
  return "latest";
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const authUserId = await getAuthUserId(request);
    const params = request.nextUrl.searchParams;

    const sort = toSort(params.get("sort"));
    const rawLimit = Number(params.get("limit") || 20);
    const limit = Math.max(1, Math.min(50, Number.isFinite(rawLimit) ? rawLimit : 20));
    const search = (params.get("search") || "").trim();
    const cursor = decodeRankingCursor(params.get("cursor"));

    const baseSelect = "id, title, slug, excerpt, views, likes_count, comments_count, liked_by_current_user, created_at, ai_generated, topic, category, blog_theme, author_id, cover_image_url, profiles:profiles!posts_author_id_fkey(id, name, avatar_url)";

    const canUseTaggedCache = !authUserId && !cursor && !search;

    const fetchRows = async () => {
      let query = supabase
        .from("posts")
        .select(baseSelect)
        .eq("status", "published")
        .or("approval_status.eq.approved,approval_status.is.null");

      if (search) {
        const safe = search.replace(/[,.()'"\\]/g, "").trim();
        if (safe) {
          query = query.or(`title.ilike.%${safe}%,excerpt.ilike.%${safe}%,topic.ilike.%${safe}%,category.ilike.%${safe}%`);
        }
      }

      if (sort === "latest") {
        if (cursor) {
          query = query.lt("created_at", cursor.createdAt);
        }
        query = query.order("created_at", { ascending: false });
      } else if (sort === "likes") {
        if (cursor) {
          query = query.or(`likes_count.lt.${cursor.score},and(likes_count.eq.${cursor.score},created_at.lt.${cursor.createdAt})`);
        }
        query = query.order("likes_count", { ascending: false }).order("created_at", { ascending: false });
      } else {
        if (cursor) {
          query = query.or(`views.lt.${cursor.score},and(views.eq.${cursor.score},created_at.lt.${cursor.createdAt})`);
        }
        query = query.order("views", { ascending: false }).order("created_at", { ascending: false });
      }

      return query.limit(limit + 1);
    };

    const getCachedRows = unstable_cache(
      async () => {
        const { data, error } = await fetchRows();
        if (error) throw new Error(error.message);
        return data || [];
      },
      ["community-rankings", sort, String(limit)],
      {
        tags: [
          sort === "likes" ? CACHE_TAGS.communityLikes : sort === "views" ? CACHE_TAGS.communityViews : CACHE_TAGS.communityLatest,
        ],
        revalidate: 60,
      }
    );

    const liveResult = canUseTaggedCache ? null : await fetchRows();
    const data = canUseTaggedCache ? await getCachedRows() : liveResult?.data;
    const error = canUseTaggedCache ? null : liveResult?.error;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = (data || []) as Array<any>;
    const hasMore = rows.length > limit;
    const posts = hasMore ? rows.slice(0, limit) : rows;

    const postIds = posts.map((post) => post.id).filter(Boolean);
    const likedByCurrentUser = new Set<string>();

    if (authUserId && postIds.length > 0) {
      const { data: likedRows } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", authUserId)
        .in("post_id", postIds);

      for (const row of likedRows || []) {
        if (row.post_id) likedByCurrentUser.add(row.post_id);
      }
    }

    const normalizedPosts = posts.map((post) => ({
      ...post,
      views: post.views ?? 0,
      likes_count: post.likes_count ?? 0,
      comments_count: post.comments_count ?? 0,
      liked_by_current_user: likedByCurrentUser.has(post.id),
    }));

    let nextCursor: string | null = null;
    if (hasMore && normalizedPosts.length > 0) {
      const last = normalizedPosts[normalizedPosts.length - 1];
      const score = sort === "likes" ? (last.likes_count || 0) : sort === "views" ? (last.views || 0) : 0;
      nextCursor = encodeRankingCursor({
        score,
        createdAt: last.created_at,
        id: last.id,
      });
    }

    return NextResponse.json({
      sort,
      posts: normalizedPosts,
      pageInfo: {
        hasMore,
        nextCursor,
      },
    });
  } catch (error) {
    console.error("Community rankings error:", error);
    return NextResponse.json({ error: "Failed to load ranked posts" }, { status: 500 });
  }
}
