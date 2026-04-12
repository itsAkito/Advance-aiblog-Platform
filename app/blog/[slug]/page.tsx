"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import GhostReaderPanel from "@/components/GhostReaderPanel";
import AppToast from "@/components/ui/app-toast";

import { useAuth } from "@/context/AuthContext";
import { renderMarkdownBlocks } from "@/lib/markdown";
import { emitLikeUpdate, subscribeLikeUpdates } from "@/lib/like-sync";
import { BlogTheme, getThemeById, getThemeFromAny, isBuiltinTheme } from "@/lib/blog-themes";

/** Maps post topic → subtle ambient gradient for dynamic theming */
function topicAmbient(topic?: string): string {
  if (!topic) return "";
  const t = topic.toLowerCase();
  if (t.includes("ai") || t.includes("machine") || t.includes("deep learning")) return "from-blue-500/6 via-cyan-500/3 to-transparent";
  if (t.includes("web") || t.includes("frontend") || t.includes("react") || t.includes("next")) return "from-violet-500/6 via-fuchsia-500/3 to-transparent";
  if (t.includes("career") || t.includes("job") || t.includes("interview")) return "from-amber-500/6 via-orange-500/3 to-transparent";
  if (t.includes("design") || t.includes("ui") || t.includes("ux")) return "from-pink-500/6 via-rose-500/3 to-transparent";
  if (t.includes("data") || t.includes("science") || t.includes("analytics")) return "from-teal-500/6 via-emerald-500/3 to-transparent";
  if (t.includes("devops") || t.includes("cloud") || t.includes("aws") || t.includes("docker")) return "from-sky-500/6 via-indigo-500/3 to-transparent";
  if (t.includes("mobile") || t.includes("ios") || t.includes("android")) return "from-lime-500/6 via-green-500/3 to-transparent";
  if (t.includes("security") || t.includes("cyber") || t.includes("hack")) return "from-red-500/6 via-orange-500/3 to-transparent";
  if (t.includes("python") || t.includes("backend")) return "from-yellow-500/6 via-green-500/3 to-transparent";
  if (t.includes("productivity") || t.includes("tool")) return "from-indigo-500/6 via-purple-500/3 to-transparent";
  return "from-primary/4 via-secondary/2 to-transparent";
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  cover_image_url?: string;
  topic?: string;
  blog_theme?: string;
  views: number;
  likes_count: number;
  comments_count: number;
  liked_by_current_user?: boolean;
  ai_generated: boolean;
  created_at: string;
  profiles?: { id: string; name: string; avatar_url?: string };
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  profiles?: { id: string; name: string; avatar_url?: string } | null;
}

interface LikerProfile {
  id: string;
  name: string | null;
  avatar_url?: string | null;
}

interface AuthorSummary {
  author: {
    id: string;
    name: string;
    bio?: string;
    avatar_url?: string;
  };
  followerCount: number;
  followingCount: number;
  mutual: {
    isFollowing: boolean;
    followsMe: boolean;
  };
  recentPosts: Array<{
    id: string;
    title: string;
    slug?: string;
    created_at: string;
    likes_count?: number;
    views?: number;
  }>;
}

interface CreatorAnalyticsSummary {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  followerCount: number;
  viewsToLikeRatio: number;
  followConversionPerPost: number;
  bestPostingTime: string;
}

interface CreatorAnalytics {
  summary: CreatorAnalyticsSummary;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { user, isAdmin } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState("");
  const [liked, setLiked] = useState(false);
  const [likers, setLikers] = useState<LikerProfile[]>([]);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [resolvedTheme, setResolvedTheme] = useState<BlogTheme | null>(null);

  // Author hover card state
  const [showAuthorCard, setShowAuthorCard] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const authorHoverRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<Array<{
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    author: { id: string; name: string; avatar_url?: string };
  }>>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [authorSummary, setAuthorSummary] = useState<AuthorSummary | null>(null);
  const [creatorAnalytics, setCreatorAnalytics] = useState<CreatorAnalytics | null>(null);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "error" | "info" } | null>(null);

  const pushToast = (message: string, tone: "success" | "error" | "info" = "info") => {
    setToast({ message, tone });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${slug}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setLiked(!!data.liked_by_current_user);
      }
    } catch (err) {
      console.error("Failed to load post:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchComments = useCallback(async () => {
    if (!post?.id) return;
    try {
      const res = await fetch(`/api/comments?postId=${post.id}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  }, [post?.id]);

  const fetchLikers = useCallback(async () => {
    if (!post?.id) return;
    try {
      const res = await fetch(`/api/likes?post_id=${post.id}`);
      if (res.ok) {
        const data = await res.json();
        setLikers(data.likers || []);
        const freshCount = data.count ?? data.likesCount;
        if (freshCount !== undefined) {
          setPost((current) => current ? { ...current, likes_count: freshCount } : current);
          setLiked(Boolean(data.likedByCurrentUser));
        }
      }
    } catch (err) {
      console.error("Failed to load likers:", err);
    }
  }, [post?.id]);

  // Check if current user follows the post author
  const checkFollowStatus = useCallback(async () => {
    if (!user || !post?.profiles?.id) return;
    try {
      const res = await fetch(`/api/follows?user_id=${post.profiles.id}&type=check`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setIsFollowing(data.isFollowing === true);
      }
    } catch {
      // ignore
    }
  }, [user, post?.profiles?.id]);

  const handleFollowToggle = async () => {
    if (!user) { window.location.href = `/auth?next=/blog/${slug}`; return; }
    if (!post?.profiles?.id) return;
    setFollowLoading(true);
    try {
      const res = await fetch(`/api/follows/${post.profiles.id}`, {
        method: isFollowing ? "DELETE" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) setIsFollowing(!isFollowing);
    } catch {
      // ignore
    } finally {
      setFollowLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = post?.title || "Check out this post";
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleReportPost = async () => {
    if (!post?.id) return;
    const reason = window.prompt("Report reason (spam, abuse, misinformation, other):", "spam");
    if (!reason) return;

    try {
      const response = await fetch('/api/moderation/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType: 'post',
          entityId: post.id,
          reason,
        }),
      });

      if (response.ok) {
        pushToast("Thanks. Your report was submitted.", "success");
      } else {
        const payload = await response.json().catch(() => ({}));
        pushToast(payload.error || "Failed to submit report", "error");
      }
    } catch {
      pushToast("Failed to submit report", "error");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    fetchLikers();
  }, [fetchLikers]);

  useEffect(() => {
    const unsubscribe = subscribeLikeUpdates((payload) => {
      if (!post || payload.postId !== post.id) return;
      setLiked(payload.likedByCurrentUser);
      setPost((current) => (current ? { ...current, likes_count: payload.likesCount } : current));
    });

    return unsubscribe;
  }, [post]);

  useEffect(() => {
    checkFollowStatus();
  }, [checkFollowStatus]);

  useEffect(() => {
    const authorId = post?.profiles?.id;
    if (!authorId) return;

    const fetchAuthorSummary = async () => {
      try {
        const response = await fetch(`/api/authors/${authorId}/summary`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        setAuthorSummary(data);
      } catch (error) {
        console.error("Failed to fetch author summary:", error);
      }
    };

    fetchAuthorSummary();
  }, [post?.profiles?.id]);

  useEffect(() => {
    if (!user || !post?.profiles?.id || post.profiles.id !== user.id) return;

    const fetchCreatorAnalytics = async () => {
      try {
        const response = await fetch('/api/creator/analytics', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        setCreatorAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch creator analytics:', error);
      }
    };

    fetchCreatorAnalytics();
  }, [user, post?.profiles?.id]);

  useEffect(() => {
    const themeId = post?.blog_theme;
    if (!themeId) {
      setResolvedTheme(getThemeById("default"));
      return;
    }

    if (isBuiltinTheme(themeId)) {
      setResolvedTheme(getThemeById(themeId));
      return;
    }

    let active = true;
    const loadTheme = async () => {
      try {
        const response = await fetch(`/api/blog-themes/${encodeURIComponent(themeId)}`);
        if (!response.ok) {
          if (active) setResolvedTheme(getThemeById("default"));
          return;
        }
        const data = await response.json();
        if (active) {
          setResolvedTheme(getThemeFromAny(data.theme));
        }
      } catch {
        if (active) setResolvedTheme(getThemeById("default"));
      }
    };

    loadTheme();
    return () => {
      active = false;
    };
  }, [post?.blog_theme]);

  const handleLike = async () => {
    if (!post) return;
    if (!user) {
      pushToast("Please sign in to like this post", "info");
      return;
    }

    const previousCount = post.likes_count || 0;
    const optimisticLiked = !liked;
    const optimisticCount = Math.max(0, previousCount + (optimisticLiked ? 1 : -1));

    setLiked(optimisticLiked);
    setPost({ ...post, likes_count: optimisticCount });
    emitLikeUpdate({
      postId: post.id,
      likesCount: optimisticCount,
      likedByCurrentUser: optimisticLiked,
      source: "blog",
    });

    try {
      if (liked) {
        // Unlike
        const res = await fetch(`/api/likes?post_id=${post.id}`, { method: "DELETE" });
        if (res.ok) {
          const data = await res.json();
          const finalCount = data.count ?? Math.max(0, previousCount - 1);
          setLiked(false);
          setPost({ ...post, likes_count: finalCount });
          emitLikeUpdate({
            postId: post.id,
            likesCount: finalCount,
            likedByCurrentUser: false,
            source: "blog",
          });
          pushToast("Like removed", "success");
          fetchLikers();
        } else {
          throw new Error("Failed to unlike post");
        }
      } else {
        // Like
        const res = await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: post.id }),
        });
        if (res.ok) {
          const data = await res.json();
          const finalCount = data.count ?? previousCount + 1;
          setLiked(true);
          setPost({ ...post, likes_count: finalCount });
          emitLikeUpdate({
            postId: post.id,
            likesCount: finalCount,
            likedByCurrentUser: true,
            source: "blog",
          });
          pushToast("Post liked", "success");
          fetchLikers();
        } else {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to like post");
        }
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      setLiked(liked);
      setPost({ ...post, likes_count: previousCount });
      emitLikeUpdate({
        postId: post.id,
        likesCount: previousCount,
        likedByCurrentUser: liked,
        source: "blog",
      });
      const msg = err instanceof Error ? err.message : "Failed to toggle like";
      if (msg.includes("Unauthorized")) {
        pushToast("Please sign in to like this post.", "info");
      } else {
        pushToast(msg, "error");
      }
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    if (!user && (!guestName.trim() || !guestEmail.trim())) return;
    if (!post?.id) {
      pushToast("Post is still loading. Please wait.", "info");
      return;
    }

    setSubmittingComment(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post.id,
          content: commentContent,
          guestName: user ? undefined : guestName,
          guestEmail: user ? undefined : guestEmail,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const comment = data?.comment;
        if (comment) {
          setComments([...comments, comment]);
          setPost((prev) => prev ? { ...prev, comments_count: (prev.comments_count || 0) + 1 } : prev);
        }
        setCommentContent("");
        setCommentSuccess("Comment posted!");
        setTimeout(() => setCommentSuccess(""), 3000);
        pushToast("Comment posted", "success");
      } else {
        let errorMessage = "Unknown error";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorData.message || `Server error (${res.status})`;
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          errorMessage = `Server error (${res.status}): Unable to parse error response`;
        }
        pushToast(`Failed to post comment: ${errorMessage}`, "error");
      }
    } catch (err) {
      console.error("Comment submission error:", err);
      pushToast("Failed to post comment. Please try again.", "error");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isAdmin) return;
    const confirmed = window.confirm("Delete this comment permanently?");
    if (!confirmed) return;

    try {
      setDeletingCommentId(commentId);
      const res = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete comment");
      }

      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setCommentSuccess("Comment deleted.");
      pushToast("Comment deleted.", "success");
    } catch (err) {
      pushToast(err instanceof Error ? err.message : "Failed to delete comment", "error");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const fetchReviews = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/community/reviews?limit=20`);
      if (res.ok) {
        const data = await res.json();
        if (!data.unavailable) {
          const postReviews = (data.reviews || []).filter(
            (r: { postSlug?: string }) => r.postSlug === slug
          );
          setReviews(postReviews);
        }
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  }, [slug]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim() || !user) return;
    setSubmittingReview(true);
    try {
      const res = await fetch("/api/community/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug: slug,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      if (res.ok) {
        setReviewComment("");
        setReviewRating(5);
        setReviewSuccess("Review submitted!");
        setTimeout(() => setReviewSuccess(""), 3000);
        pushToast("Review submitted!", "success");
        fetchReviews();
      } else {
        const data = await res.json().catch(() => ({}));
        pushToast(data.error || "Failed to submit review", "error");
      }
    } catch {
      pushToast("Failed to submit review. Please try again.", "error");
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-20 pb-16">
          {/* Cover skeleton */}
          <div className="w-full h-96 bg-surface-container animate-pulse" />
          <div className="max-w-3xl mx-auto px-4 sm:px-8 -mt-20 relative z-20">
            {/* Title skeleton */}
            <div className="mt-4 space-y-3">
              <div className="h-3 w-24 rounded-full bg-surface-container-high animate-pulse" />
              <div className="h-9 w-4/5 rounded-xl bg-surface-container-high animate-pulse" />
              <div className="h-9 w-3/5 rounded-xl bg-surface-container-high animate-pulse" />
            </div>
            {/* Author skeleton */}
            <div className="flex items-center gap-3 mt-6 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-surface-container-high animate-pulse shrink-0" />
              <div className="space-y-2">
                <div className="h-3 w-28 rounded-full bg-surface-container-high animate-pulse" />
                <div className="h-2 w-20 rounded-full bg-surface-container animate-pulse" />
              </div>
            </div>
            {/* Content skeleton */}
            <div className="mt-10 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-3 rounded-full bg-surface-container animate-pulse`} style={{ width: `${85 + (i % 3) * 5}%` }} />
              ))}
              <div className="h-32 rounded-2xl bg-surface-container animate-pulse mt-6" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`b${i}`} className="h-3 rounded-full bg-surface-container animate-pulse" style={{ width: `${75 + (i % 4) * 6}%` }} />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 px-4 text-center">
          <h1 className="text-3xl font-bold font-headline mt-20">Post Not Found</h1>
          <p className="text-on-surface-variant mt-4">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/community" className="mt-6 inline-block text-primary font-semibold hover:underline">
            Browse All Posts
          </Link>
        </main>
      </>
    );
  }

  const theme = resolvedTheme || getThemeById(post.blog_theme || "default");
  const isCustom = theme.source === "custom";
  const p = theme.palette;

  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen ${theme.fontClass} pt-20 pb-16 ${!isCustom ? theme.bgClass : ""} relative`}
        style={isCustom ? { backgroundColor: p.background, color: p.text } : undefined}
      >
        {/* Dynamic ambient gradient based on post topic */}
        {post.topic && !isCustom && (
          <div className={`pointer-events-none fixed inset-0 -z-10 bg-linear-to-b ${topicAmbient(post.topic)}`} />
        )}
        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="w-full h-100 relative overflow-hidden">
            <div className={`absolute inset-0 bg-linear-to-b ${theme.coverOverlayClass} z-10`}></div>
            <Image src={post.cover_image_url} alt={post.title} fill sizes="100vw" className="object-cover" />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-8">
        <article>
          {/* Header */}
          <header className={`${post.cover_image_url ? "-mt-24 relative z-20" : "mt-8"}`}>
            <div className="flex items-center gap-3 mb-4">
              <Link href="/community" className={`text-sm transition-colors flex items-center gap-1 ${!isCustom ? theme.linkClass : ""}`} style={isCustom ? { color: p.accent } : undefined}>
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                All Posts
              </Link>
              {post.topic && (
                <>
                  <span className="opacity-30">/</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${!isCustom ? theme.accentClass : ""}`} style={isCustom ? { color: p.accent, background: `${p.accent}1a` } : undefined}>
                    {post.topic}
                  </span>
                </>
              )}
              {post.ai_generated && (
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  AI Generated
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${!isCustom ? theme.accentClass : ""}`} style={isCustom ? { color: p.accent, background: `${p.accent}1a` } : undefined}>
                {theme.name}
              </span>
            </div>

            <h1 className={`text-4xl md:text-5xl font-extrabold font-headline tracking-tighter leading-tight mb-6 ${!isCustom ? theme.headingClass : ""}`} style={isCustom ? { color: p.heading || p.text } : undefined}>
              {post.title}
            </h1>

            {/* Author & Meta */}
            <div className={`flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-current/10`}>
              <div className="flex items-center gap-3">
                {/* Author avatar with hover card */}
                <div
                  className="relative"
                  onMouseEnter={() => {
                    if (authorHoverRef.current) clearTimeout(authorHoverRef.current);
                    setShowAuthorCard(true);
                  }}
                  onMouseLeave={() => {
                    authorHoverRef.current = setTimeout(() => setShowAuthorCard(false), 200);
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-primary/40 transition-all">
                    {post.profiles?.avatar_url ? (
                      <Image src={post.profiles.avatar_url} alt="" width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${!isCustom ? theme.textClass : ""}`} style={isCustom ? { color: p.text } : undefined}>
                        <span className="material-symbols-outlined">person</span>
                      </div>
                    )}
                  </div>

                  {/* Hover Author Card */}
                  {showAuthorCard && post.profiles && (
                    <div
                      className="absolute left-0 top-12 z-50 w-56 glass-panel rounded-2xl p-4 shadow-2xl border border-outline-variant/20 animate-in fade-in-0 slide-in-from-top-2 duration-200"
                      onMouseEnter={() => {
                        if (authorHoverRef.current) clearTimeout(authorHoverRef.current);
                        setShowAuthorCard(true);
                      }}
                      onMouseLeave={() => {
                        authorHoverRef.current = setTimeout(() => setShowAuthorCard(false), 200);
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden shrink-0">
                          {post.profiles.avatar_url ? (
                            <Image src={post.profiles.avatar_url} alt="" width={40} height={40} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                              <span className="material-symbols-outlined text-sm">person</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-on-surface truncate">{post.profiles.name}</p>
                          <p className="text-[10px] text-on-surface-variant">Article Author</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleFollowToggle}
                          disabled={followLoading}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold transition-all ${
                            isFollowing
                              ? "bg-primary/10 text-primary border border-primary/30 hover:bg-red-500/10 hover:text-red-500 hover:border-red-400/30"
                              : "bg-primary text-white hover:bg-primary/90"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isFollowing ? "'FILL' 1" : "'FILL' 0" }}>
                            {isFollowing ? "person_check" : "person_add"}
                          </span>
                          {followLoading ? "..." : isFollowing ? "Following" : "Follow"}
                        </button>
                        <button
                          onClick={handleShare}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold bg-surface-container-high text-on-surface hover:bg-surface-container transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">{shareCopied ? "check" : "share"}</span>
                          {shareCopied ? "Copied!" : "Share"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <span className={`font-semibold text-sm ${!isCustom ? theme.headingClass : ""}`} style={isCustom ? { color: p.heading || p.text } : undefined}>{post.profiles?.name || "Unknown"}</span>
                  <span className={`block text-xs ${!isCustom ? theme.textClass : ""}`} style={isCustom ? { color: p.mutedText || p.text } : undefined}>{formatDate(post.created_at)}</span>
                </div>

                {/* Visible Follow Button */}
                {user && post.profiles?.id && post.profiles.id !== user.id && (
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isFollowing
                        ? "bg-primary/10 text-primary border border-primary/30 hover:bg-red-500/10 hover:text-red-500 hover:border-red-400/30"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isFollowing ? "'FILL' 1" : "'FILL' 0" }}>
                      {isFollowing ? "person_check" : "person_add"}
                    </span>
                    {followLoading ? "..." : isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className={`flex items-center gap-4 text-xs ${!isCustom ? theme.textClass : ""}`} style={isCustom ? { color: p.mutedText || p.text } : undefined}>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  {post.views} views
                </span>
                <button onClick={handleLike} className={`flex items-center gap-1 transition-colors ${liked ? "text-red-400" : "hover:text-red-400"}`}>
                  <span className="material-symbols-outlined text-sm" style={liked ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
                  {post.likes_count} likes
                </button>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">chat_bubble</span>
                  {post.comments_count || comments.length} comments
                </span>
                <button onClick={handleReportPost} className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors">
                  <span className="material-symbols-outlined text-sm">flag</span>
                  Report
                </button>
              </div>
              {likers.length > 0 && (
                <p className={`mt-3 text-xs ${!isCustom ? theme.textClass : ""}`} style={isCustom ? { color: p.mutedText || p.text } : undefined}>
                  Liked by {likers.slice(0, 3).map((liker) => liker.name || "User").join(", ")}
                  {likers.length > 3 ? ` and ${likers.length - 3} others` : ""}
                </p>
              )}
            </div>
          </header>

          {/* Themed Content */}
          {user || isAdmin ? (
            <div className={`mt-10 max-w-none leading-relaxed ${!isCustom ? `${theme.proseClass} ${theme.textClass}` : ""}`} style={isCustom ? { color: p.text } : undefined}>
              {renderMarkdownBlocks(post.content, theme)}
            </div>
          ) : (
            <>
              <div className={`mt-10 max-w-none leading-relaxed relative ${!isCustom ? `${theme.proseClass} ${theme.textClass}` : ""}`} style={isCustom ? { color: p.text } : undefined}>
                <div className="line-clamp-8 overflow-hidden">
                  {renderMarkdownBlocks(post.content, theme)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t to-transparent pointer-events-none" style={isCustom ? { backgroundImage: `linear-gradient(to top, ${p.background}, transparent)` } : undefined}></div>
              </div>
              <div className="mt-8 glass-panel rounded-2xl p-8 text-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-4 block">lock</span>
                <h3 className={`text-2xl font-bold font-headline mb-2 ${!isCustom ? theme.headingClass : ""}`} style={isCustom ? { color: p.heading || p.text } : undefined}>Sign in to read the full article</h3>
                <p className={`text-sm mb-6 ${!isCustom ? theme.textClass : ""}`} style={isCustom ? { color: p.mutedText || p.text } : undefined}>
                  Create a free account or sign in to access the complete post, leave comments, and engage with the community.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href={`/auth?next=/blog/${slug}`}
                    className="px-6 py-3 bg-linear-to-r from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg text-sm hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
                  >
                    Sign In to Continue Reading
                  </Link>
                  <Link
                    href={`/auth?next=/blog/${slug}`}
                    className="px-6 py-3 border border-outline-variant/20 text-on-surface-variant font-semibold rounded-lg text-sm hover:bg-surface-container-high transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Comments & Reviews — only for authenticated users */}
          {(user || isAdmin) && (
          <>
          <section className="mt-16 pt-10 border-t border-outline-variant/10">
            <h2 className="text-2xl font-bold font-headline mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">forum</span>
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <div className="glass-panel rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-sm mb-4">
                {user ? "Leave a comment" : "Leave a comment as a guest"}
              </h3>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                {!user && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Your name *"
                      required
                      className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/20 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50"
                    />
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Your email *"
                      required
                      className="px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/20 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50"
                    />
                  </div>
                )}
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write your comment..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/20 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">
                    {user ? `Commenting as ${user.email}` : "Your email won't be published"}
                  </span>
                  <button
                    type="submit"
                    disabled={submittingComment || loading || !post?.id}
                    className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg text-sm hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                  >
                    {submittingComment ? "Posting..." : loading || !post?.id ? "Loading..." : "Post Comment"}
                  </button>
                </div>
                {commentSuccess && (
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {commentSuccess}
                  </p>
                )}
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-12 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2 block opacity-30">forum</span>
                  <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="glass-panel rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container-high overflow-hidden shrink-0">
                        {comment.profiles?.avatar_url ? (
                            <Image src={comment.profiles.avatar_url} alt="" width={36} height={36} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-sm">
                            <span className="material-symbols-outlined text-sm">person</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-on-surface">
                            {comment.profiles?.name || comment.guest_name || "Anonymous"}
                          </span>
                          {comment.guest_name && !comment.user_id && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">Guest</span>
                          )}
                          <span className="text-xs text-on-surface-variant">
                            {formatDate(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </p>
                        {isAdmin && (
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(comment.id)}
                              disabled={deletingCommentId === comment.id}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-400 hover:text-red-300 disabled:opacity-50"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                              {deletingCommentId === comment.id ? "Deleting..." : "Delete comment"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mt-12 pt-10 border-t border-outline-variant/10">
            <h2 className="text-2xl font-bold font-headline mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">rate_review</span>
              Reviews ({reviews.length})
            </h2>

            {/* Review Form */}
            {user ? (
              <div className="glass-panel rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-sm mb-4">Leave a Review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`text-2xl transition-colors ${star <= reviewRating ? "text-amber-400" : "text-zinc-600"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your thoughts about this post..."
                    rows={3}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/20 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-secondary/50 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">Reviewing as {user.email}</span>
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="px-6 py-2.5 bg-linear-to-r from-secondary to-tertiary text-white font-bold rounded-lg text-sm hover:scale-[1.02] transition-all shadow-lg shadow-secondary/20 disabled:opacity-50"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                  {reviewSuccess && (
                    <p className="text-green-400 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      {reviewSuccess}
                    </p>
                  )}
                </form>
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-6 mb-8 text-center">
                <p className="text-sm text-on-surface-variant">
                  <Link href="/auth" className="text-primary font-semibold hover:underline">Sign in</Link> to leave a review
                </p>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl mb-2 block opacity-30">reviews</span>
                  <p className="text-sm">No reviews yet. Be the first to review this post!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="glass-panel rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container-high overflow-hidden shrink-0 flex items-center justify-center text-on-surface-variant text-sm">
                        {review.author?.avatar_url ? (
                          <Image src={review.author.avatar_url} alt="" width={36} height={36} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-sm">person</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-on-surface">{review.author?.name || "User"}</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star} className={`text-xs ${star <= review.rating ? "text-amber-400" : "text-zinc-700"}`}>★</span>
                            ))}
                          </div>
                          <span className="text-xs text-on-surface-variant">{formatDate(review.created_at)}</span>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Ghost Reader AI - only for post author */}
          {user && post.profiles?.id === user.id && (
            <GhostReaderPanel postId={post.id} />
          )}
          </>
          )}
        </article>

        <aside className="hidden xl:block pt-8">
          <div className="sticky top-24 space-y-4">
            <div className="glass-panel rounded-2xl p-5 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-surface-container-high overflow-hidden">
                  {authorSummary?.author?.avatar_url ? (
                    <Image src={authorSummary.author.avatar_url} alt={authorSummary.author.name || "Author"} width={44} height={44} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-on-surface truncate">{authorSummary?.author?.name || post.profiles?.name || "Author"}</p>
                  <p className="text-[11px] text-on-surface-variant">Creator profile</p>
                </div>
              </div>

              {authorSummary?.author?.bio && (
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-3">{authorSummary.author.bio}</p>
              )}

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="rounded-xl bg-surface-container px-3 py-2 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-on-surface-variant">Followers</p>
                  <p className="text-sm font-bold text-on-surface">{authorSummary?.followerCount ?? 0}</p>
                </div>
                <div className="rounded-xl bg-surface-container px-3 py-2 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-on-surface-variant">Following</p>
                  <p className="text-sm font-bold text-on-surface">{authorSummary?.followingCount ?? 0}</p>
                </div>
              </div>

              {authorSummary?.mutual?.followsMe && (
                <p className="text-[11px] text-emerald-400 font-semibold mb-3">Follows you back</p>
              )}

              {user && post.profiles?.id && post.profiles.id !== user.id && (
                <button
                  onClick={handleFollowToggle}
                  disabled={followLoading}
                  className={`w-full h-9 rounded-lg text-xs font-bold transition-all ${
                    isFollowing
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {followLoading ? "Updating..." : isFollowing ? "Following" : "Follow Author"}
                </button>
              )}
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-outline-variant/20">
              <p className="text-sm font-bold text-on-surface mb-3">Recent Posts</p>
              <div className="space-y-3">
                {(authorSummary?.recentPosts || []).map((entry) => (
                  <Link key={entry.id} href={`/blog/${entry.slug || entry.id}`} className="block rounded-lg bg-surface-container px-3 py-2 hover:bg-surface-container-high transition-colors">
                    <p className="text-xs font-semibold text-on-surface line-clamp-2">{entry.title}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">{formatDate(entry.created_at)}</p>
                  </Link>
                ))}
                {(!authorSummary?.recentPosts || authorSummary.recentPosts.length === 0) && (
                  <p className="text-xs text-on-surface-variant">No recent posts yet.</p>
                )}
              </div>
            </div>

            {user && post.profiles?.id === user.id && creatorAnalytics?.summary && (
              <div className="glass-panel rounded-2xl p-5 border border-outline-variant/20">
                <p className="text-sm font-bold text-on-surface mb-3">Creator Analytics</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-surface-container p-2">
                    <p className="text-[10px] text-on-surface-variant">Views/Like</p>
                    <p className="text-sm font-bold text-on-surface">{creatorAnalytics.summary.viewsToLikeRatio}</p>
                  </div>
                  <div className="rounded-lg bg-surface-container p-2">
                    <p className="text-[10px] text-on-surface-variant">Follow Conv.</p>
                    <p className="text-sm font-bold text-on-surface">{creatorAnalytics.summary.followConversionPerPost}</p>
                  </div>
                  <div className="rounded-lg bg-surface-container p-2 col-span-2">
                    <p className="text-[10px] text-on-surface-variant">Best Posting Time</p>
                    <p className="text-sm font-bold text-on-surface">{creatorAnalytics.summary.bestPostingTime}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
        </div>
      </main>

      <AppToast
        visible={Boolean(toast)}
        message={toast?.message || ""}
        tone={toast?.tone || "info"}
      />
    </>
  );
}
