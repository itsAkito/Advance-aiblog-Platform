export interface BlogTheme {
  id: string;
  name: string;
  description: string;
  previewImage: string; // emoji or icon identifier
  // Content area styles
  bgClass: string;
  textClass: string;
  headingClass: string;
  linkClass: string;
  codeBlockClass: string;
  blockquoteClass: string;
  // Card preview style (for community/feed)
  cardClass: string;
  // Cover image overlay
  coverOverlayClass: string;
  // Accent color for highlights
  accentClass: string;
  // Font style
  fontClass: string;
  // Prose class override
  proseClass: string;
}

export const BLOG_THEMES: BlogTheme[] = [
  {
    id: "default",
    name: "Default Dark",
    description: "Clean dark theme with blue accents",
    previewImage: "🌑",
    bgClass: "bg-background",
    textClass: "text-on-surface-variant",
    headingClass: "text-on-surface",
    linkClass: "text-primary hover:text-primary/80",
    codeBlockClass: "bg-surface-container border border-outline-variant/20",
    blockquoteClass: "border-l-4 border-primary/40 bg-primary/5 pl-4 py-2 italic",
    cardClass: "bg-surface-container-low border-outline-variant/15",
    coverOverlayClass: "from-transparent via-transparent to-background",
    accentClass: "text-primary",
    fontClass: "font-body",
    proseClass: "prose prose-invert prose-lg",
  },
  {
    id: "midnight-purple",
    name: "Midnight Purple",
    description: "Deep purple tones with violet accents",
    previewImage: "🔮",
    bgClass: "bg-[#0d0a1a]",
    textClass: "text-purple-100/80",
    headingClass: "text-purple-50",
    linkClass: "text-violet-400 hover:text-violet-300",
    codeBlockClass: "bg-[#1a1030] border border-violet-500/20",
    blockquoteClass: "border-l-4 border-violet-500/50 bg-violet-500/5 pl-4 py-2 italic",
    cardClass: "bg-[#140f26] border-violet-500/15",
    coverOverlayClass: "from-transparent via-transparent to-[#0d0a1a]",
    accentClass: "text-violet-400",
    fontClass: "font-body",
    proseClass: "prose prose-invert prose-lg prose-violet",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    description: "Nature-inspired green & earth tones",
    previewImage: "🌿",
    bgClass: "bg-[#0a1a0f]",
    textClass: "text-emerald-100/80",
    headingClass: "text-emerald-50",
    linkClass: "text-emerald-400 hover:text-emerald-300",
    codeBlockClass: "bg-[#0f2618] border border-emerald-500/20",
    blockquoteClass: "border-l-4 border-emerald-500/50 bg-emerald-500/5 pl-4 py-2 italic",
    cardClass: "bg-[#0d1f14] border-emerald-500/15",
    coverOverlayClass: "from-transparent via-transparent to-[#0a1a0f]",
    accentClass: "text-emerald-400",
    fontClass: "font-body",
    proseClass: "prose prose-invert prose-lg prose-emerald",
  },
  {
    id: "warm-sunset",
    name: "Warm Sunset",
    description: "Golden amber tones with warm glow",
    previewImage: "🌅",
    bgClass: "bg-[#1a120a]",
    textClass: "text-amber-100/80",
    headingClass: "text-amber-50",
    linkClass: "text-amber-400 hover:text-amber-300",
    codeBlockClass: "bg-[#261a0f] border border-amber-500/20",
    blockquoteClass: "border-l-4 border-amber-500/50 bg-amber-500/5 pl-4 py-2 italic",
    cardClass: "bg-[#1f150d] border-amber-500/15",
    coverOverlayClass: "from-transparent via-transparent to-[#1a120a]",
    accentClass: "text-amber-400",
    fontClass: "font-body",
    proseClass: "prose prose-invert prose-lg prose-amber",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Deep sea blue with cyan highlights",
    previewImage: "🌊",
    bgClass: "bg-[#0a0f1a]",
    textClass: "text-cyan-100/80",
    headingClass: "text-cyan-50",
    linkClass: "text-cyan-400 hover:text-cyan-300",
    codeBlockClass: "bg-[#0f1826] border border-cyan-500/20",
    blockquoteClass: "border-l-4 border-cyan-500/50 bg-cyan-500/5 pl-4 py-2 italic",
    cardClass: "bg-[#0d1520] border-cyan-500/15",
    coverOverlayClass: "from-transparent via-transparent to-[#0a0f1a]",
    accentClass: "text-cyan-400",
    fontClass: "font-body",
    proseClass: "prose prose-invert prose-lg prose-cyan",
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    description: "Elegant pink & rose tones",
    previewImage: "🌹",
    bgClass: "bg-[#1a0a12]",
    textClass: "text-rose-100/80",
    headingClass: "text-rose-50",
    linkClass: "text-rose-400 hover:text-rose-300",
    codeBlockClass: "bg-[#260f18] border border-rose-500/20",
    blockquoteClass: "border-l-4 border-rose-500/50 bg-rose-500/5 pl-4 py-2 italic",
    cardClass: "bg-[#1f0d15] border-rose-500/15",
    coverOverlayClass: "from-transparent via-transparent to-[#1a0a12]",
    accentClass: "text-rose-400",
    fontClass: "font-body",
    proseClass: "prose prose-invert prose-lg prose-rose",
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean light background with dark text",
    previewImage: "☀️",
    bgClass: "bg-[#f8f6f3]",
    textClass: "text-[#374151]",
    headingClass: "text-[#111827]",
    linkClass: "text-blue-600 hover:text-blue-500",
    codeBlockClass: "bg-[#f0ede8] border border-gray-300",
    blockquoteClass: "border-l-4 border-gray-400 bg-gray-100 pl-4 py-2 italic text-gray-600",
    cardClass: "bg-white border-gray-200",
    coverOverlayClass: "from-transparent via-transparent to-[#f8f6f3]",
    accentClass: "text-blue-600",
    fontClass: "font-body",
    proseClass: "prose prose-lg",
  },
  {
    id: "newspaper",
    name: "Newspaper",
    description: "Classic serif newspaper layout",
    previewImage: "📰",
    bgClass: "bg-[#faf8f4]",
    textClass: "text-[#333] leading-[1.9]",
    headingClass: "text-[#111] font-serif",
    linkClass: "text-[#8b4513] hover:text-[#a0522d] underline",
    codeBlockClass: "bg-[#f0ede8] border border-[#d4c9b8]",
    blockquoteClass: "border-l-4 border-[#8b4513] bg-[#f5f0e8] pl-4 py-2 italic text-[#555] font-serif",
    cardClass: "bg-[#faf8f4] border-[#d4c9b8]",
    coverOverlayClass: "from-transparent via-transparent to-[#faf8f4]",
    accentClass: "text-[#8b4513]",
    fontClass: "font-serif",
    proseClass: "prose prose-lg prose-stone",
  },
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Cyberpunk neon with glitch aesthetic",
    previewImage: "⚡",
    bgClass: "bg-[#0a0a0f]",
    textClass: "text-[#00ff88]/90",
    headingClass: "text-[#00ff88]",
    linkClass: "text-[#ff00ff] hover:text-[#ff66ff]",
    codeBlockClass: "bg-[#0f0f1a] border border-[#00ff88]/30",
    blockquoteClass: "border-l-4 border-[#ff00ff]/60 bg-[#ff00ff]/5 pl-4 py-2 italic text-[#00ff88]/70",
    cardClass: "bg-[#0a0a14] border-[#00ff88]/20",
    coverOverlayClass: "from-transparent via-transparent to-[#0a0a0f]",
    accentClass: "text-[#00ff88]",
    fontClass: "font-mono",
    proseClass: "prose prose-invert prose-lg",
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Retro terminal with monospace text",
    previewImage: "💻",
    bgClass: "bg-black",
    textClass: "text-green-400/90 font-mono",
    headingClass: "text-green-300 font-mono",
    linkClass: "text-green-300 hover:text-green-200 underline",
    codeBlockClass: "bg-[#0a1a0a] border border-green-500/30",
    blockquoteClass: "border-l-4 border-green-500/50 bg-green-500/5 pl-4 py-2 italic text-green-400/70 font-mono",
    cardClass: "bg-[#0a0f0a] border-green-500/20",
    coverOverlayClass: "from-transparent via-transparent to-black",
    accentClass: "text-green-400",
    fontClass: "font-mono",
    proseClass: "prose prose-invert prose-lg prose-green",
  },
];

export function getThemeById(id: string): BlogTheme {
  return BLOG_THEMES.find((t) => t.id === id) || BLOG_THEMES[0];
}
