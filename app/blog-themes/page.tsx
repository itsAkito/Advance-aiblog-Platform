"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { BLOCK_VARIANTS, BlogTheme, FONT_OPTIONS, getThemeFromAny, sanitizeThemeConfig } from "@/lib/blog-themes";
import { CATEGORY_STYLES, FEATURED_THEMES, EXPANDED_TEMPLATE_CATEGORIES, type BlockTemplate, type ThemeCreatorForm } from "@/lib/blog-theme-templates";
/* ────────────────────────────────────────────────────────────
   BlogPreviewCard — realistic mini blog article preview
   ──────────────────────────────────────────────────────────── */
function BlogPreviewCard({ tmpl, categoryLabel }: { tmpl: BlockTemplate; categoryLabel?: string }) {
  const p = tmpl.preview;
  const editorLink = `/editor?templateTheme=${tmpl.id}&bg=${encodeURIComponent(p.bg)}&accent=${encodeURIComponent(p.accent)}&heading=${encodeURIComponent(p.heading)}&text=${encodeURIComponent(p.text)}&surface=${encodeURIComponent(p.surface)}&muted=${encodeURIComponent(p.muted)}&font=${encodeURIComponent(tmpl.font)}`;

  return (
    <article className="border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl group" style={{ backgroundColor: p.surface, borderColor: `${p.muted}25` }}>
      {/* Browser chrome bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ backgroundColor: p.bg, borderColor: `${p.muted}20` }}>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `${p.muted}50` }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `${p.muted}30` }} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `${p.muted}30` }} />
        </div>
        <span className="text-[9px] ml-2 tracking-wider uppercase" style={{ color: p.muted, fontFamily: tmpl.font }}>{tmpl.name}</span>
        {categoryLabel && (
          <span className="ml-auto text-[8px] tracking-wider uppercase px-1.5 py-0.5 border" style={{ color: p.accent, borderColor: `${p.accent}40` }}>{categoryLabel}</span>
        )}
      </div>

      {/* Theme preview image */}
      {tmpl.image && (
        <div className="relative w-full h-36 overflow-hidden">
          <Image
            src={tmpl.image}
            alt={tmpl.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${p.bg})` }} />
        </div>
      )}

      {/* Blog article preview */}
      <div className="p-4 space-y-3" style={{ backgroundColor: p.bg }}>
        <div className="flex items-center gap-2">
          <div className="w-1 h-4" style={{ backgroundColor: p.accent }} />
          <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: p.muted, fontFamily: tmpl.font }}>
            {tmpl.tags[0]} — Jan 2025
          </span>
        </div>

        <h3 className="text-sm font-bold leading-tight" style={{ color: p.heading, fontFamily: tmpl.font }}>
          {tmpl.sampleTitle || tmpl.name}
        </h3>

        <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: p.text, fontFamily: tmpl.font }}>
          {tmpl.sampleExcerpt || tmpl.description}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <div className="flex gap-0.5">
            <div className="w-8 h-1" style={{ backgroundColor: p.accent }} />
            <div className="w-5 h-1" style={{ backgroundColor: `${p.accent}60` }} />
            <div className="w-3 h-1" style={{ backgroundColor: `${p.accent}30` }} />
          </div>
          <span className="text-[9px]" style={{ color: p.muted }}>4 min read</span>
        </div>
      </div>

      {/* Palette swatches + action */}
      <div className="p-3 flex items-center gap-2 border-t" style={{ backgroundColor: p.surface, borderColor: `${p.muted}15` }}>
        <div className="flex gap-0.5 flex-1">
          {Object.values(p).map((color, i) => (
            <div key={i} className="w-3 h-3 border" style={{ backgroundColor: color, borderColor: `${p.muted}20` }} title={color} />
          ))}
        </div>
        <Link
          href={editorLink}
          className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
          style={{ backgroundColor: p.accent, color: p.bg }}
        >
          Use Theme
        </Link>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Page Component
   ──────────────────────────────────────────────────────────── */
export default function BlogThemesPage() {
  const { isAuthenticated } = useAuth();
  const [themes, setThemes] = useState<BlogTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreator, setShowCreator] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [uploadingBg, setUploadingBg] = useState(false);

  const [form, setForm] = useState<ThemeCreatorForm>({
    name: "",
    description: "",
    previewIcon: "🎨",
    fontClass: "font-body",
    blockVariant: "soft",
    isPublic: false,
    backgroundImage: "",
    palette: {
      background: "#0e0e0e",
      surface: "#1a1a1a",
      text: "#d4d4d8",
      mutedText: "#a1a1aa",
      heading: "#ffffff",
      accent: "#85adff",
      border: "#3f3f46",
      codeBackground: "#161616",
      codeText: "#dbeafe",
      blockquoteBackground: "#0f1d33",
      tableHeaderBackground: "#171717",
    },
  });

  useEffect(() => {
    let active = true;
    const loadThemes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blog-themes?includeBuiltin=true", { credentials: "include" });
        if (!response.ok) { setThemes([]); return; }
        const data = await response.json();
        const resolved = Array.isArray(data.themes) ? data.themes.map((theme: any) => getThemeFromAny(theme)) : [];
        if (active) setThemes(resolved);
      } catch {
        if (active) setThemes([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadThemes();
    return () => { active = false; };
  }, []);

  const paletteKeys = useMemo(
    () => Object.keys(form.palette) as Array<keyof ThemeCreatorForm["palette"]>,
    [form.palette]
  );

  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setFeedback("Image must be under 5MB."); return; }
    setUploadingBg(true);
    setFeedback("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "theme-backgrounds");
      const res = await fetch("/api/upload", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((prev) => ({ ...prev, backgroundImage: data.url }));
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingBg(false);
    }
  };

  const createTheme = async () => {
    if (!form.name.trim()) { setFeedback("Theme name is required."); return; }
    setSaving(true);
    setFeedback("");
    try {
      const safeConfig = sanitizeThemeConfig({
        fontClass: form.fontClass,
        blockVariant: form.blockVariant as any,
        palette: form.palette,
      });
      const response = await fetch("/api/blog-themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: form.name, description: form.description, previewIcon: form.previewIcon, isPublic: form.isPublic, themeConfig: { ...safeConfig, backgroundImage: form.backgroundImage || undefined } }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create theme");
      const created = getThemeFromAny(data.theme);
      setThemes((current) => [created, ...current]);
      setFeedback("Theme created successfully.");
      setShowCreator(false);
      setForm((prev) => ({ ...prev, name: "", description: "", previewIcon: "🎨" }));
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Failed to create theme");
    } finally {
      setSaving(false);
    }
  };

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query && !activeCategory) return EXPANDED_TEMPLATE_CATEGORIES;
    if (!query && activeCategory) return EXPANDED_TEMPLATE_CATEGORIES.filter((c) => c.id === activeCategory);
    return EXPANDED_TEMPLATE_CATEGORIES.map((cat) => ({
      ...cat,
      templates: cat.templates.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          cat.title.toLowerCase().includes(query)
      ),
    })).filter((cat) => cat.templates.length > 0);
  }, [searchQuery, activeCategory]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* ─── Hero Section ─── */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,154,91,0.12),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(100,80,160,0.08),transparent_50%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4">Theme Gallery</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-headline tracking-tighter text-on-surface leading-[0.9]">
                  Blog Theme
                  <br />
                  <span className="bg-linear-to-r from-amber-300/90 via-orange-300/80 to-violet-400/70 bg-clip-text text-transparent italic">
                    Templates
                  </span>
                </h1>
                <p className="mt-5 text-on-surface-variant max-w-lg leading-relaxed">
                  Choose a theme, preview how your blog will look, and start writing. Each category features unique
                  typography, imagery, and color palettes crafted for specific content styles.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {isAuthenticated && (
                    <button
                      onClick={() => setShowCreator((v) => !v)}
                      className="bg-primary text-on-primary-fixed px-5 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      {showCreator ? "Close Creator" : "Create Custom Theme"}
                    </button>
                  )}
                  <Link href="/editor" className="border border-white/15 text-on-surface px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors">
                    Open Editor
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: `${themes.length + EXPANDED_TEMPLATE_CATEGORIES.reduce((s, c) => s + c.templates.length, 0)}`, label: "Total Templates" },
                  { num: `${EXPANDED_TEMPLATE_CATEGORIES.length}`, label: "Categories" },
                  { num: "6", label: "Typography Styles" },
                  { num: "5", label: "Block Variants" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-white/8 bg-surface-container/40 p-4">
                    <span className="text-2xl font-extrabold font-headline text-on-surface">{stat.num}</span>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Category Navigation ─── */}
        <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-xs">
                <span className="material-symbols-outlined text-on-surface-variant/60 absolute left-2.5 top-1/2 -translate-y-1/2 text-sm">search</span>
                <input
                  type="text"
                  placeholder="Search themes..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory(null); }}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface-container border border-white/10 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 px-4 py-1.5 text-xs font-semibold transition-colors ${!activeCategory ? "bg-primary/15 text-primary border border-primary/30" : "border border-white/8 text-on-surface-variant hover:text-on-surface hover:border-white/20"}`}
            >
              All Themes
            </button>
            {EXPANDED_TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-1.5 text-xs font-semibold transition-colors flex items-center gap-1.5 ${activeCategory === cat.id ? "bg-primary/15 text-primary border border-primary/30" : "border border-white/8 text-on-surface-variant hover:text-on-surface hover:border-white/20"}`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                {cat.title}
              </button>
            ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-20">
          {/* ─── Custom Theme Creator ─── */}
          {showCreator && isAuthenticated && (
            <div className="mb-10 border border-white/10 bg-surface-container p-5 space-y-4">
              <h2 className="text-xl font-bold text-on-surface">Custom Theme Creator</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Theme name" className="bg-surface-container-high border border-white/10 px-3 py-2 text-sm text-on-surface" />
                <input value={form.previewIcon} onChange={(e) => setForm((prev) => ({ ...prev, previewIcon: e.target.value }))} placeholder="Preview icon" className="bg-surface-container-high border border-white/10 px-3 py-2 text-sm text-on-surface" />
                <select value={form.fontClass} onChange={(e) => setForm((prev) => ({ ...prev, fontClass: e.target.value }))} className="bg-surface-container-high border border-white/10 px-3 py-2 text-sm text-on-surface">
                  {FONT_OPTIONS.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
              </div>
              <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Theme description" className="w-full bg-surface-container-high border border-white/10 px-3 py-2 text-sm text-on-surface" rows={2} />
              <div className="space-y-2">
                <label className="text-xs text-on-surface-variant font-semibold">Background Image (optional)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-surface-container-high border border-white/10 px-3 py-2 text-xs text-on-surface-variant hover:text-on-surface hover:border-white/20 transition-colors">
                    {uploadingBg ? "Uploading..." : "Choose Image"}
                    <input type="file" accept="image/*" onChange={handleBgImageUpload} className="hidden" disabled={uploadingBg} />
                  </label>
                  {form.backgroundImage && (
                    <div className="flex items-center gap-2">
                      <Image
                        src={form.backgroundImage}
                        alt="Background preview"
                        width={56}
                        height={32}
                        className="h-8 w-14 object-cover border border-white/10"
                      />
                      <button onClick={() => setForm((prev) => ({ ...prev, backgroundImage: "" }))} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select value={form.blockVariant} onChange={(e) => setForm((prev) => ({ ...prev, blockVariant: e.target.value }))} className="bg-surface-container-high border border-white/10 px-3 py-2 text-sm text-on-surface">
                  {BLOCK_VARIANTS.map((variant) => (<option key={variant.value} value={variant.value}>{variant.label}</option>))}
                </select>
                <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <input type="checkbox" checked={form.isPublic} onChange={(e) => setForm((prev) => ({ ...prev, isPublic: e.target.checked }))} />
                  Make this theme public for all users
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {paletteKeys.map((key) => (
                  <label key={key} className="text-xs text-on-surface-variant flex items-center gap-2 bg-surface-container-high px-2 py-2">
                    <span className="w-28 truncate">{key}</span>
                    <input type="color" value={form.palette[key]} onChange={(e) => setForm((prev) => ({ ...prev, palette: { ...prev.palette, [key]: e.target.value } }))} className="h-8 w-10" />
                    <span className="text-[11px]">{form.palette[key]}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-on-surface-variant">Custom themes are saved to your account.</p>
                <button onClick={createTheme} disabled={saving} className="bg-primary text-on-primary-fixed px-4 py-2 text-sm font-semibold disabled:opacity-60">{saving ? "Saving..." : "Save Theme"}</button>
              </div>
              {feedback && <p className="text-xs text-primary">{feedback}</p>}
            </div>
          )}

          {/* ─── Featured Blog Theme Previews (6 curated themes) ─── */}
          {!activeCategory && !searchQuery && (
            <section className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Featured Blog Themes</h2>
                <p className="text-sm text-on-surface-variant mt-1">See how your blog will look — click any theme to start writing</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {FEATURED_THEMES.map((tmpl) => (
                  <BlogPreviewCard key={tmpl.id} tmpl={tmpl} categoryLabel={tmpl.category} />
                ))}
              </div>
            </section>
          )}

          {/* ─── Library Themes (built-in + custom) ─── */}
          {(!activeCategory || activeCategory === "library") && (
            <section className="mb-14">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">Library Themes</h2>
                <p className="text-sm text-on-surface-variant mt-1">Built-in and community-created themes ready to use</p>
              </div>
              {loading ? (
                <div className="text-sm text-on-surface-variant">Loading themes...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {themes.map((theme) => (
                    <article key={theme.id} className="border overflow-hidden shadow-xl transition-all hover:-translate-y-0.5 group" style={{ backgroundColor: theme.palette.surface, borderColor: theme.palette.border }}>
                      <div className={`h-28 ${theme.fontClass} p-4 flex flex-col justify-between`} style={{ backgroundColor: theme.palette.background, color: theme.palette.text }}>
                        <div className="flex items-center justify-between">
                          <span className="text-xl">{theme.previewImage}</span>
                          <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: theme.palette.mutedText }}>{theme.source}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold" style={{ color: theme.palette.heading }}>{theme.name}</h3>
                          <p className="text-[11px] line-clamp-1" style={{ color: theme.palette.mutedText }}>{theme.description}</p>
                        </div>
                      </div>
                      <div className="p-3 flex gap-2">
                        <Link href={`/editor?theme=${encodeURIComponent(theme.id)}`} className="flex-1 inline-flex items-center justify-center bg-primary text-on-primary-fixed py-1.5 text-xs font-semibold hover:opacity-90">
                          Use Theme
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ─── Template Categories with Unique Visual Identity ─── */}
          {filteredCategories.map((category) => {
            const style = CATEGORY_STYLES[category.id];
            if (!style) return null;

            return (
              <section key={category.id} className="mb-16" id={category.id}>
                {/* Category Hero with Unsplash Image */}
                <div className="relative overflow-hidden mb-6 h-48 sm:h-56 border border-white/5">
                  <Image
                    src={style.heroImage}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    unoptimized
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${style.gradientFrom} 0%, ${style.gradientVia} 60%, transparent 100%)` }} />
                  <div className="absolute inset-0" style={{ backgroundImage: style.pattern, backgroundSize: "20px 20px" }} />

                  <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-2xl" style={{ color: style.accentColor }}>{category.icon}</span>
                      <span className="text-[9px] uppercase tracking-[0.25em] px-2 py-0.5 border" style={{ color: style.accentColor, borderColor: `${style.accentColor}40` }}>
                        {category.templates.length} templates
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">{style.fontLabel}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight" style={{ fontFamily: style.fontFamily }}>
                      {category.title}
                    </h2>
                    <p className="text-sm text-white/70 mt-1 max-w-lg" style={{ fontFamily: style.fontFamily }}>
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Blog preview cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.templates.map((tmpl) => (
                    <BlogPreviewCard key={tmpl.id} tmpl={tmpl} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
