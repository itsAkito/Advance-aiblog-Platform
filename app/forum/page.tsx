"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppToast from "@/components/ui/app-toast";
import { useAuth } from "@/context/AuthContext";

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  slug: string;
  topic_count: number;
  post_count: number;
}

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_avatar?: string;
  is_pinned: boolean;
  is_solved: boolean;
  is_locked: boolean;
  reply_count: number;
  like_count: number;
  view_count: number;
  tags: string[];
  last_reply_at: string;
  created_at: string;
  forum_categories?: {
    name: string;
    slug: string;
    gradient: string;
    icon: string;
  };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

/* ── Dynamic gradient from category name ── */
function categoryAccent(cat?: { gradient?: string; name?: string }) {
  if (cat?.gradient) return cat.gradient;
  const g: Record<string, string> = {
    "AI & ML": "from-blue-500 to-cyan-400",
    "Web Dev": "from-violet-500 to-purple-400",
    Career: "from-emerald-500 to-teal-400",
    Design: "from-pink-500 to-rose-400",
    DevOps: "from-orange-500 to-amber-400",
  };
  return g[cat?.name || ""] || "from-primary to-secondary";
}

export default function ForumPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [recentTopics, setRecentTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "unanswered">("latest");
  const [likedTopicIds, setLikedTopicIds] = useState<Set<string>>(new Set());
  const [openReplyForTopic, setOpenReplyForTopic] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [replySubmittingForTopic, setReplySubmittingForTopic] = useState<string | null>(null);
  const [reportSubmittingTopic, setReportSubmittingTopic] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; tone: "success" | "error" } | null>(null);

  const pushSnackbar = (message: string, tone: "success" | "error" = "success") => {
    setSnackbar({ message, tone });
  };

  useEffect(() => {
    if (!snackbar) return;
    const timer = setTimeout(() => setSnackbar(null), 2400);
    return () => clearTimeout(timer);
  }, [snackbar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, topicsRes] = await Promise.all([
          fetch("/api/forum/categories"),
          fetch(`/api/forum/topics?limit=20&sort=${activeTab}`),
        ]);
        const catsData = catsRes.ok ? await catsRes.json() : {};
        const topicsData = topicsRes.ok ? await topicsRes.json() : {};
        const topics = topicsData.topics || [];
        setCategories(catsData.categories || []);
        setRecentTopics(topics);

        if (isAuthenticated && topics.length > 0) {
          const likeChecks = await Promise.all(
            topics.map(async (topic: ForumTopic) => {
              try {
                const res = await fetch(`/api/forum/topics/${topic.id}/like`, { credentials: "include" });
                if (!res.ok) return null;
                const data = await res.json();
                return data.liked ? topic.id : null;
              } catch {
                return null;
              }
            })
          );

          const liked = new Set<string>();
          likeChecks.forEach((id) => {
            if (id) liked.add(id);
          });
          setLikedTopicIds(liked);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, isAuthenticated]);

  const toggleLike = async (topicId: string) => {
    if (!isAuthenticated) {
      router.push("/auth?next=%2Fforum");
      return;
    }

    const wasLiked = likedTopicIds.has(topicId);

    setLikedTopicIds((current) => {
      const next = new Set(current);
      if (wasLiked) next.delete(topicId);
      else next.add(topicId);
      return next;
    });

    setRecentTopics((current) =>
      current.map((topic) =>
        topic.id === topicId
          ? { ...topic, like_count: Math.max(0, (topic.like_count || 0) + (wasLiked ? -1 : 1)) }
          : topic
      )
    );

    try {
      const response = await fetch(`/api/forum/topics/${topicId}/like`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      const data = await response.json();
      const liked = Boolean(data.liked);
      setLikedTopicIds((current) => {
        const next = new Set(current);
        if (liked) next.add(topicId);
        else next.delete(topicId);
        return next;
      });
      pushSnackbar(liked ? "Topic liked" : "Like removed", "success");
    } catch {
      setLikedTopicIds((current) => {
        const next = new Set(current);
        if (wasLiked) next.add(topicId);
        else next.delete(topicId);
        return next;
      });
      setRecentTopics((current) =>
        current.map((topic) =>
          topic.id === topicId
            ? { ...topic, like_count: Math.max(0, (topic.like_count || 0) + (wasLiked ? 1 : -1)) }
            : topic
        )
      );
      pushSnackbar("Could not update like", "error");
    }
  };

  const openInlineReply = (topicId: string) => {
    if (!isAuthenticated) {
      router.push("/auth?next=%2Fforum");
      return;
    }
    setOpenReplyForTopic((current) => (current === topicId ? null : topicId));
  };

  const submitInlineReply = async (topicId: string) => {
    if (!isAuthenticated) {
      router.push("/auth?next=%2Fforum");
      return;
    }

    const content = (replyDrafts[topicId] || "").trim();
    if (!content) return;

    setReplySubmittingForTopic(topicId);
    try {
      const response = await fetch(`/api/forum/topics/${topicId}/replies`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to post reply");
      }

      setRecentTopics((current) =>
        current.map((topic) =>
          topic.id === topicId
            ? { ...topic, reply_count: (topic.reply_count || 0) + 1, last_reply_at: new Date().toISOString() }
            : topic
        )
      );
      setReplyDrafts((current) => ({ ...current, [topicId]: "" }));
      setOpenReplyForTopic(null);
      pushSnackbar("Reply posted", "success");
    } catch {
      pushSnackbar("Reply failed. Try again.", "error");
    } finally {
      setReplySubmittingForTopic(null);
    }
  };

  const reportTopic = async (topicId: string) => {
    if (!isAuthenticated) {
      router.push("/auth?next=%2Fforum");
      return;
    }

    try {
      setReportSubmittingTopic(topicId);
      const response = await fetch("/api/moderation/reports", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityType: "post",
          entityId: topicId,
          reason: "forum_topic",
          details: "User reported a forum topic from forum list row",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      pushSnackbar("Topic reported. Thanks for helping moderate.", "success");
    } catch {
      pushSnackbar("Failed to report topic", "error");
    } finally {
      setReportSubmittingTopic(null);
    }
  };

  const filtered = (() => {
    let topics = recentTopics;
    if (search) {
      topics = topics.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (activeTab === "popular") topics = [...topics].sort((a, b) => b.like_count - a.like_count);
    if (activeTab === "unanswered") topics = topics.filter((t) => t.reply_count === 0);
    return topics;
  })();

  const pinnedTopics = filtered.filter((t) => t.is_pinned);
  const regularTopics = filtered.filter((t) => !t.is_pinned);

  return (
    <div className="min-h-screen text-on-background bg-background">
      <NavBar />

      {/* ── Compact Hero ─────────────────────────────── */}
      <section className="relative px-4 sm:px-8 pt-24 pb-12">
        {/* Subtle gradient mesh — no blobs */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/3 via-transparent to-transparent" />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/6 border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                Community Forum
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-headline tracking-tighter leading-[1.05]">
                Ask. Answer. <span className="text-gradient">Grow Together.</span>
              </h1>
              <p className="text-sm text-on-surface-variant mt-2 max-w-lg">
                Share knowledge, ask questions, and connect with thousands of AI enthusiasts and builders.
              </p>
            </div>

            {isAuthenticated ? (
              <Button
                className="h-11 px-6 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 shrink-0"
                onClick={() => router.push("/forum/new")}
              >
                <span className="material-symbols-outlined text-sm mr-1">add</span>
                New Discussion
              </Button>
            ) : (
              <Button
                className="h-11 px-6 bg-primary text-white font-bold rounded-xl shrink-0"
                onClick={() => router.push("/auth?next=%2Fforum")}
              >
                Join the Forum
              </Button>
            )}
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-8 relative max-w-xl"
          >
            <span className="material-symbols-outlined text-on-surface-variant/40 absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">search</span>
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search discussions & tags..."
              className="pl-10 h-11 bg-white/60 dark:bg-white/4 border-black/8 dark:border-white/10 rounded-xl focus-visible:ring-primary/30 text-sm"
            />
          </motion.div>

          {/* Compact stat chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex gap-3 mt-5 text-[10px] font-bold text-on-surface-variant"
          >
            {[
              { v: categories.length, l: "Categories", i: "category" },
              { v: recentTopics.length > 0 ? `${recentTopics.length}+` : "0", l: "Threads", i: "chat_bubble" },
              { v: "120K+", l: "Members", i: "group" },
            ].map((s) => (
              <span key={s.l} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/50 dark:bg-white/4 border border-black/5 dark:border-white/8">
                <span className="material-symbols-outlined text-[10px] text-primary">{s.i}</span>
                <span className="font-extrabold text-on-surface">{s.v}</span>
                {s.l}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Categories — horizontal scroll ribbon ─── */}
      <section className="px-4 sm:px-8 pb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-3">Browse Categories</h2>
          {loading ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-40 h-20 shrink-0 rounded-xl bg-black/5 dark:bg-white/4 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/forum/category/${cat.slug}`} className="shrink-0 group">
                  <div className="relative w-44 rounded-xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/4 p-3.5 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${cat.gradient}`} />
                    <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${cat.gradient} flex items-center justify-center mb-2 shadow-md`}>
                      <span className="material-symbols-outlined text-white text-sm">{cat.icon}</span>
                    </div>
                    <h3 className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors truncate">{cat.name}</h3>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{cat.topic_count} topics</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Discussions List ─────────────────────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Tab bar */}
          <div className="flex items-center gap-1 mb-6 border-b border-black/5 dark:border-white/8">
            {(["latest", "popular", "unanswered"] as const).map((tab) => (
              <button
                key={tab}
                suppressHydrationWarning
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-xs font-bold capitalize transition-colors relative ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="forum-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-black/5 dark:bg-white/4 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-3">forum</span>
              <p className="text-on-surface-variant text-sm mb-6">
                {search ? "No matches found." : "No discussions yet. Be the first!"}
              </p>
              {isAuthenticated && !search && (
                <Button
                  className="bg-primary text-white font-bold rounded-xl"
                  onClick={() => router.push("/forum/new")}
                >
                  <span className="material-symbols-outlined text-sm mr-1">add</span>
                  Start a Discussion
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-1.5">
              {/* Pinned topics */}
              {pinnedTopics.map((topic) => (
                <div key={topic.id} className="space-y-2">
                  <TopicRow
                    topic={topic}
                    pinned
                    isLiked={likedTopicIds.has(topic.id)}
                    onLike={toggleLike}
                    onComment={openInlineReply}
                    onReport={reportTopic}
                    reportLoading={reportSubmittingTopic === topic.id}
                  />
                  {openReplyForTopic === topic.id && (
                    <div className="ml-12 p-3 rounded-xl border border-black/8 dark:border-white/12 bg-white/60 dark:bg-white/4">
                      <textarea
                        value={replyDrafts[topic.id] || ""}
                        onChange={(e) => setReplyDrafts((current) => ({ ...current, [topic.id]: e.target.value }))}
                        placeholder="Write your reply..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/20 text-sm"
                      />
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setOpenReplyForTopic(null)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-outline-variant/20 text-on-surface-variant"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => submitInlineReply(topic.id)}
                          disabled={replySubmittingForTopic === topic.id}
                          className="px-3 py-1.5 text-xs rounded-lg bg-primary text-white font-bold"
                        >
                          {replySubmittingForTopic === topic.id ? "Posting..." : "Post Reply"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {pinnedTopics.length > 0 && regularTopics.length > 0 && (
                <div className="border-t border-black/5 dark:border-white/5 my-2" />
              )}
              {/* Regular topics */}
              {regularTopics.map((topic) => (
                <div key={topic.id} className="space-y-2">
                  <TopicRow
                    topic={topic}
                    isLiked={likedTopicIds.has(topic.id)}
                    onLike={toggleLike}
                    onComment={openInlineReply}
                    onReport={reportTopic}
                    reportLoading={reportSubmittingTopic === topic.id}
                  />
                  {openReplyForTopic === topic.id && (
                    <div className="ml-12 p-3 rounded-xl border border-black/8 dark:border-white/12 bg-white/60 dark:bg-white/4">
                      <textarea
                        value={replyDrafts[topic.id] || ""}
                        onChange={(e) => setReplyDrafts((current) => ({ ...current, [topic.id]: e.target.value }))}
                        placeholder="Write your reply..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/20 text-sm"
                      />
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setOpenReplyForTopic(null)}
                          className="px-3 py-1.5 text-xs rounded-lg border border-outline-variant/20 text-on-surface-variant"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => submitInlineReply(topic.id)}
                          disabled={replySubmittingForTopic === topic.id}
                          className="px-3 py-1.5 text-xs rounded-lg bg-primary text-white font-bold"
                        >
                          {replySubmittingForTopic === topic.id ? "Posting..." : "Post Reply"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AppToast
        visible={Boolean(snackbar)}
        message={snackbar?.message || ""}
        tone={snackbar?.tone || "info"}
      />
    </div>
  );
}

/* ── Topic row component ── */
function TopicRow({
  topic,
  pinned,
  isLiked,
  onLike,
  onComment,
  onReport,
  reportLoading,
}: {
  topic: ForumTopic;
  pinned?: boolean;
  isLiked: boolean;
  onLike: (topicId: string) => void;
  onComment: (topicId: string) => void;
  onReport: (topicId: string) => void;
  reportLoading: boolean;
}) {
  const accent = categoryAccent(topic.forum_categories);

  return (
    <div
      className={`group flex items-start gap-3.5 px-4 py-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
          pinned
            ? "border-amber-500/15 bg-amber-500/3 hover:bg-amber-500/5"
            : "border-transparent hover:border-black/5 dark:hover:border-white/10 hover:bg-white/60 dark:hover:bg-white/4"
        }`}
    >
        {/* Avatar with dynamic accent ring */}
        <div className={`w-9 h-9 shrink-0 rounded-full bg-linear-to-br ${accent} flex items-center justify-center text-white text-xs font-bold overflow-hidden ring-2 ring-black/5 dark:ring-white/10`}>
          {topic.author_avatar ? (
            <Image src={topic.author_avatar} alt={topic.author_name} width={36} height={36} className="w-full h-full object-cover" />
          ) : (
            topic.author_name?.charAt(0)?.toUpperCase() || "U"
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title line */}
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            {pinned && (
              <span className="material-symbols-outlined text-amber-500 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
            )}
            {topic.is_solved && (
              <span className="material-symbols-outlined text-emerald-500 text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            )}
            <Link href={`/forum/topic/${topic.id}`} className="min-w-0">
              <h3 className="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                {topic.title}
              </h3>
            </Link>
          </div>

          {/* Meta line */}
          <div className="flex items-center gap-3 text-[10px] text-on-surface-variant">
            <span className="font-medium">{topic.author_name}</span>
            <span className="opacity-40">·</span>
            <span>{timeAgo(topic.last_reply_at || topic.created_at)}</span>
            {topic.forum_categories && (
              <>
                <span className="opacity-40">·</span>
                <span className={`px-1.5 py-0.5 rounded bg-linear-to-r ${topic.forum_categories.gradient} text-white text-[9px] font-bold`}>
                  {topic.forum_categories.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right stats cluster */}
        <div className="flex items-center gap-4 text-[10px] text-on-surface-variant shrink-0 pt-1">
          <button onClick={() => onComment(topic.id)} className="flex items-center gap-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[11px]">chat_bubble_outline</span>
            {topic.reply_count}
          </button>
          <button onClick={() => onLike(topic.id)} className={`flex items-center gap-1 transition-colors ${isLiked ? "text-red-400" : "hover:text-red-400"}`}>
            <span className="material-symbols-outlined text-[11px]" style={isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}>favorite</span>
            {topic.like_count}
          </button>
          <button
            onClick={() => onReport(topic.id)}
            disabled={reportLoading}
            className="flex items-center gap-1 hover:text-orange-300 transition-colors disabled:opacity-60"
            title="Report topic"
          >
            <span className="material-symbols-outlined text-[11px]">flag</span>
            {reportLoading ? "..." : "Report"}
          </button>
          <Link href={`/forum/topic/${topic.id}`} className="flex items-center gap-1 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[11px]">visibility</span>
            {topic.view_count}
          </Link>
        </div>
    </div>
  );
}
