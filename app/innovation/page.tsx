"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  FlaskConical,
  Radar,
  Sparkles,
  TrendingUp,
  Briefcase,
  FileText,
  Globe,
  Newspaper,
  Users,
  Rss,
  BookOpen,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

type InnovationItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: "arxiv" | "crossref" | "github";
  category: string;
  publishedAt: string;
};

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  sourceName: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
};

type InnovationFeed = {
  updatedAt: string;
  featured: InnovationItem | null;
  items: InnovationItem[];
  sources: { arxiv: number; crossref: number; github: number };
};

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author_username?: string;
  created_at: string;
  category?: string;
};

type Job = {
  id: string;
  title: string;
  company?: string;
  location?: string;
  type?: string;
};

const SOURCE_LABEL: Record<InnovationItem["source"], string> = {
  arxiv: "arXiv Research",
  crossref: "Crossref Journals",
  github: "Open Source",
};

const SOURCE_COLOR: Record<InnovationItem["source"], string> = {
  arxiv: "text-blue-400",
  crossref: "text-emerald-400",
  github: "text-violet-400",
};

const SOURCE_BG: Record<InnovationItem["source"], string> = {
  arxiv: "bg-blue-500/10 border-blue-500/20",
  crossref: "bg-emerald-500/10 border-emerald-500/20",
  github: "bg-violet-500/10 border-violet-500/20",
};

export default function InnovationPage() {
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [feed, setFeed] = useState<InnovationFeed | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<"news" | "research" | "community">("news");

  useEffect(() => {
    const loadFeed = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/innovation/feed");
        if (res.ok) setFeed(await res.json());
      } catch {}
      finally { setLoading(false); }
    };

    const loadNews = async () => {
      try {
        setNewsLoading(true);
        const res = await fetch("/api/innovation/news");
        if (res.ok) {
          const data = await res.json();
          setNews(data.items || []);
        }
      } catch {}
      finally { setNewsLoading(false); }
    };

    const loadSidebars = async () => {
      try {
        const [postsRes, jobsRes] = await Promise.allSettled([
          fetch("/api/posts?limit=6&published=true"),
          fetch("/api/jobs?limit=5"),
        ]);
        if (postsRes.status === "fulfilled" && postsRes.value.ok) {
          const d = await postsRes.value.json();
          setPosts(d.posts || d || []);
        }
        if (jobsRes.status === "fulfilled" && jobsRes.value.ok) {
          const d = await jobsRes.value.json();
          setJobs(d.jobs || d || []);
        }
      } catch {}
    };

    loadFeed();
    loadNews();
    loadSidebars();
  }, []);

  const tickerItems = useMemo(() => {
    const newsHeadlines = news.slice(0, 5).map((n) => `${n.sourceName}: ${n.title}`);
    const researchHeadlines = (feed?.items || []).slice(0, 5).map((i) => `${SOURCE_LABEL[i.source]}: ${i.title}`);
    return [...newsHeadlines, ...researchHeadlines];
  }, [feed?.items, news]);

  const trendingTopics = useMemo(() => {
    const topics: Record<string, number> = {};
    [...(feed?.items || []), ...news].forEach((item) => {
      const cat = (item as any).category || "Technology";
      topics[cat] = (topics[cat] || 0) + 1;
    });
    return Object.entries(topics).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [feed?.items, news]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0f0a1e] pt-20 pb-24 text-white">

        {/* Gradient Hero Banner */}
        <div className="relative mb-0 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-linear-to-br from-violet-950 via-[#0f0a1e] to-indigo-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.2),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.5) 40px,rgba(255,255,255,0.5) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.5) 40px,rgba(255,255,255,0.5) 41px)" }}
          />

          <div className="relative mx-auto max-w-7xl px-6 py-12">
            <div className="mb-8 overflow-hidden rounded-full border border-violet-500/20 bg-black/30 px-4 py-2">
              <div className="flex gap-12 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-zinc-300"
                style={{ animation: "marquee 60s linear infinite" }}>
                {tickerItems.length > 0
                  ? [...tickerItems, ...tickerItems].map((txt, idx) => (
                    <span key={`${txt}-${idx}`} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-violet-400 inline-block" />
                      {txt}
                    </span>
                  ))
                  : <span>Loading live innovation ticker...</span>}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300 border border-violet-500/20">
                  <Radar className="h-3.5 w-3.5" /> Innovation Command Center
                </div>
                <h1 className="font-headline text-5xl font-black tracking-tight text-white md:text-6xl leading-[1.05]">
                  {"What's Happening"}
                  <br />
                  <span className="bg-linear-to-r from-violet-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                    in the World
                  </span>
                </h1>
                <p className="mt-4 text-zinc-300 text-lg">
                  Real-time world tech news, cutting-edge research, and innovation stories from our community.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 min-w-65">
                <div className="rounded-xl bg-violet-500/10 border border-violet-500/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-violet-300">News Sources</p>
                  <p className="mt-1.5 text-2xl font-bold text-violet-400">{news.length > 0 ? "5" : "–"}</p>
                </div>
                <div className="rounded-xl bg-blue-500/10 border border-blue-500/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300">arXiv Papers</p>
                  <p className="mt-1.5 text-2xl font-bold text-blue-400">{feed?.sources.arxiv ?? 0}</p>
                </div>
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">Journals</p>
                  <p className="mt-1.5 text-2xl font-bold text-emerald-400">{feed?.sources.crossref ?? 0}</p>
                </div>
                <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/15 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-300">Open Source</p>
                  <p className="mt-1.5 text-2xl font-bold text-indigo-400">{feed?.sources.github ?? 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <div className="grid gap-6 lg:grid-cols-[270px_1fr_260px]">

            {/* LEFT SIDEBAR */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#13112b] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-amber-500/15 p-1.5">
                      <Briefcase className="h-4 w-4 text-amber-400" />
                    </div>
                    <h3 className="font-bold text-sm text-white">Latest Jobs</h3>
                  </div>
                  <Link href="/jobs" className="text-[11px] text-zinc-500 hover:text-amber-400 flex items-center gap-1">
                    All <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                {jobs.length > 0 ? (
                  <div className="space-y-3">
                    {jobs.slice(0, 4).map((job) => (
                      <Link key={job.id} href="/jobs" className="block group">
                        <div className="rounded-lg border border-white/8 bg-[#1a1730] p-3 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all">
                          <p className="text-sm font-semibold text-white group-hover:text-amber-300 line-clamp-1">{job.title}</p>
                          {job.company && <p className="mt-0.5 text-[11px] text-zinc-500">{job.company}</p>}
                          {(job.type || job.location) && (
                            <p className="mt-1 text-[10px] text-zinc-600">{job.type}{job.location ? ` · ${job.location}` : ""}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {["Senior AI Engineer", "Full Stack Developer", "Product Manager", "UX Designer"].map((title) => (
                      <Link key={title} href="/jobs" className="block group">
                        <div className="rounded-lg border border-white/8 bg-[#1a1730] p-3 hover:border-amber-500/25 transition-colors">
                          <p className="text-sm font-semibold text-zinc-200 group-hover:text-amber-300 line-clamp-1">{title}</p>
                          <p className="mt-0.5 text-[11px] text-zinc-600">View openings</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <Link href="/jobs" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/25 bg-amber-500/8 px-3 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/15 transition-colors">
                  Browse All Jobs <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-linear-to-br from-violet-950 to-[#13112b] p-5">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
                <div className="relative">
                  <div className="mb-3 rounded-lg bg-violet-500/15 w-fit p-2">
                    <FileText className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Resume Builder</h3>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                    Build a professional resume with 6 templates, color themes, and AI assistance. Export as PDF.
                  </p>
                  <Link href="/dashboard/resume" className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition-colors">
                    Build Resume <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#13112b] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Career Tools</h3>
                </div>
                <div className="space-y-1">
                  {[
                    { label: "Career Paths", href: "/dashboard/career" },
                    { label: "My Dashboard", href: "/dashboard" },
                    { label: "Portfolio", href: "/dashboard/portfolio" },
                    { label: "Collaboration", href: "/dashboard/collaboration" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-violet-300 hover:bg-violet-500/8 transition-colors">
                      {item.label} <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* CENTER COLUMN */}
            <div className="min-w-0 space-y-6">
              <div className="flex rounded-xl border border-white/10 bg-[#13112b] p-1 gap-1">
                {(["news", "research", "community"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-violet-600 text-white shadow"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                  >
                    {tab === "news" && <span className="flex items-center justify-center gap-1.5"><Newspaper className="h-3.5 w-3.5" /> World News</span>}
                    {tab === "research" && <span className="flex items-center justify-center gap-1.5"><FlaskConical className="h-3.5 w-3.5" /> Research</span>}
                    {tab === "community" && <span className="flex items-center justify-center gap-1.5"><Users className="h-3.5 w-3.5" /> Community</span>}
                  </button>
                ))}
              </div>

              {activeTab === "news" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                      <Globe className="h-5 w-5 text-violet-400" />
                      World Tech News
                    </h2>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <Rss className="h-3 w-3" /> Live RSS feeds
                    </span>
                  </div>

                  {newsLoading && (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse rounded-2xl border border-white/8 bg-[#13112b] p-5 h-32" />
                      ))}
                    </div>
                  )}

                  {!newsLoading && news.length === 0 && (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-6 text-center">
                      <Globe className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                      <p className="text-zinc-300 font-semibold">News feeds temporarily unavailable</p>
                      <p className="mt-1 text-sm text-zinc-500">RSS sources may be rate-limited. Check back shortly.</p>
                    </div>
                  )}

                  {news.map((item) => (
                    <article key={item.id} className="group rounded-2xl border border-white/8 bg-[#13112b] p-5 transition-all hover:border-violet-500/25 hover:bg-[#161330]">
                      <div className="flex items-start gap-4">
                        {item.imageUrl && (
                          <div className="hidden sm:block shrink-0 h-20 w-28 rounded-lg overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.imageUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-center gap-2 flex-wrap">
                            <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-300">
                              {item.sourceName}
                            </span>
                            <span className="text-[10px] text-zinc-600">
                              {new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                          <h3 className="line-clamp-2 font-bold text-white group-hover:text-violet-300 transition-colors">
                            {item.title}
                          </h3>
                          {item.summary && (
                            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{item.summary}</p>
                          )}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300"
                          >
                            Read full article <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {activeTab === "research" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                      <FlaskConical className="h-5 w-5 text-blue-400" />
                      Research & Innovation
                    </h2>
                    <span className="text-[11px] text-zinc-500">arXiv · Crossref · GitHub</span>
                  </div>

                  {feed?.featured && (
                    <div className="rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-950/50 to-[#13112b] p-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Featured Breakthrough</span>
                      <h3 className="mt-3 text-xl font-bold text-white">{feed.featured.title}</h3>
                      <p className="mt-2 line-clamp-4 text-sm text-zinc-300">{feed.featured.summary}</p>
                      <a href={feed.featured.url} target="_blank" rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 transition-colors">
                        Open Source Item <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  {loading && (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse rounded-2xl border border-white/8 bg-[#13112b] p-5 h-32" />
                      ))}
                    </div>
                  )}

                  {(feed?.items || []).map((item) => (
                    <article key={item.id} className="group rounded-2xl border border-white/8 bg-[#13112b] p-5 transition-all hover:border-blue-500/25 hover:bg-[#13152b]">
                      <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${SOURCE_BG[item.source]} ${SOURCE_COLOR[item.source]}`}>
                          {SOURCE_LABEL[item.source]}
                        </span>
                        <span className="text-[10px] text-zinc-600">
                          {new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{item.summary}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
                        <span className="text-[10px] text-zinc-600">{item.category || "Innovation"}</span>
                        <a href={item.url} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300">
                          Open <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {activeTab === "community" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                      <Users className="h-5 w-5 text-emerald-400" />
                      From Our Community
                    </h2>
                    <Link href="/community" className="text-xs text-zinc-500 hover:text-emerald-400 flex items-center gap-1">
                      View all <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {posts.length === 0 && (
                    <div className="rounded-2xl border border-white/8 bg-[#13112b] p-8 text-center">
                      <BookOpen className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                      <p className="text-zinc-400 font-semibold">No community posts yet</p>
                      <p className="mt-1 text-sm text-zinc-600">Be the first to share something!</p>
                      <Link href="/editor" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 transition-colors">
                        Write a Post <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}

                  {posts.map((post) => (
                    <article key={post.id} className="group rounded-2xl border border-white/8 bg-[#13112b] p-5 transition-all hover:border-emerald-500/25 hover:bg-[#131d1a]">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                          {(post.author_username || "A")[0].toUpperCase()}
                        </div>
                        <span className="text-[11px] text-zinc-500">{post.author_username || "Anonymous"}</span>
                        <span className="text-[10px] text-zinc-700 ml-auto">
                          {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">{post.title}</h3>
                      </Link>
                      {post.excerpt && (
                        <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{post.excerpt}</p>
                      )}
                      <div className="mt-3 flex items-center justify-between">
                        {post.category && (
                          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">{post.category}</span>
                        )}
                        <Link href={`/blog/${post.slug}`} className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300">
                          Read <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </article>
                  ))}

                  <Link href="/editor" className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/8 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/15 transition-colors">
                    <Sparkles className="h-4 w-4" /> Write & Share Your Story
                  </Link>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-[#13112b] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-violet-400" />
                  <h3 className="text-sm font-bold text-white">Trending Topics</h3>
                </div>
                {trendingTopics.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map(([topic, count]) => (
                      <span key={topic} className="rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 text-[11px] text-violet-300 hover:bg-violet-500/15 cursor-default transition-colors">
                        {topic} <span className="text-violet-500 ml-0.5">{count}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-600">Loading topics...</p>
                )}
              </div>

              {feed?.featured && (
                <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-950/60 to-[#13112b] p-5">
                  <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-blue-500/10 blur-xl" />
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300 mb-2">Featured Breakthrough</p>
                    <h4 className="line-clamp-3 text-sm font-bold text-white">{feed.featured.title}</h4>
                    <p className="mt-2 line-clamp-3 text-xs text-zinc-400">{feed.featured.summary}</p>
                    <a href={feed.featured.url} target="_blank" rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300">
                      Read More <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-[#13112b] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Rss className="h-4 w-4 text-orange-400" />
                  <h3 className="text-sm font-bold text-white">Live News Sources</h3>
                </div>
                <div className="space-y-2">
                  {["BBC Technology", "BBC Science", "NYT Technology", "TechCrunch", "Wired"].map((source) => (
                    <div key={source} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-zinc-400">{source}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#13112b] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Research Sources</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      <span className="text-xs text-zinc-400">arXiv</span>
                    </div>
                    <span className="text-xs text-blue-400 font-bold">{feed?.sources.arxiv ?? 0} papers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-zinc-400">Crossref</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold">{feed?.sources.crossref ?? 0} journals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      <span className="text-xs text-zinc-400">GitHub Labs</span>
                    </div>
                    <span className="text-xs text-violet-400 font-bold">{feed?.sources.github ?? 0} repos</span>
                  </div>
                </div>
                <p className="mt-3 text-[10px] text-zinc-700">
                  Updated: {feed?.updatedAt ? new Date(feed.updatedAt).toLocaleTimeString() : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#13112b] p-5">
                <h3 className="text-sm font-bold text-white mb-3">Explore Platform</h3>
                <div className="space-y-1">
                  {[
                    { label: "Write a Post", href: "/editor", color: "text-violet-400" },
                    { label: "Community Feed", href: "/community", color: "text-emerald-400" },
                    { label: "Browse Jobs", href: "/jobs", color: "text-amber-400" },
                    { label: "Dashboard", href: "/dashboard", color: "text-blue-400" },
                    { label: "Inner Circle", href: "/inner-circle", color: "text-pink-400" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${link.color} hover:bg-white/5 transition-colors`}>
                      {link.label} <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
