/* ────────────────────────────────────────────────────────────
   Per-category visual identity:
   Each category gets a unique Unsplash hero image, display
   font, gradient accent, and pattern overlay.
   ──────────────────────────────────────────────────────────── */

export type CardVariant = "classic" | "magazine" | "terminal" | "polaroid" | "glassmorphic" | "brutalist" | "editorial" | "neon" | "minimal" | "cinematic" | "notebook" | "postcard" | "vinyl" | "recipe" | "passport";

export interface CategoryStyle {
  heroImage: string;
  fontFamily: string;
  fontLabel: string;
  gradientFrom: string;
  gradientVia: string;
  accentColor: string;
  pattern: string;
  cardVariant: CardVariant;
}

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "market-business": {
    heroImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontLabel: "Playfair Display",
    gradientFrom: "rgba(120,80,20,0.85)",
    gradientVia: "rgba(40,30,10,0.75)",
    accentColor: "#c99a5b",
    pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(201,154,91,0.03) 10px, rgba(201,154,91,0.03) 20px)",
    cardVariant: "classic",
  },
  "real-estate": {
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Lora', 'Playfair Display', Georgia, serif",
    fontLabel: "Lora",
    gradientFrom: "rgba(20,60,100,0.85)",
    gradientVia: "rgba(10,25,50,0.75)",
    accentColor: "#4d8ef7",
    pattern: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(77,142,247,0.02) 20px, rgba(77,142,247,0.02) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(77,142,247,0.02) 20px, rgba(77,142,247,0.02) 21px)",
    cardVariant: "polaroid",
  },
  "science": {
    heroImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontLabel: "Space Grotesk",
    gradientFrom: "rgba(60,20,120,0.85)",
    gradientVia: "rgba(20,10,50,0.75)",
    accentColor: "#7c6cf0",
    pattern: "radial-gradient(circle, rgba(124,108,240,0.04) 1px, transparent 1px)",
    cardVariant: "glassmorphic",
  },
  "technology": {
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop&q=80",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLabel: "JetBrains Mono",
    gradientFrom: "rgba(10,80,50,0.85)",
    gradientVia: "rgba(5,30,20,0.75)",
    accentColor: "#00f0ff",
    pattern: "linear-gradient(0deg, rgba(0,240,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.02) 1px, transparent 1px)",
    cardVariant: "terminal",
  },
  "social-media": {
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontLabel: "Inter",
    gradientFrom: "rgba(120,20,80,0.85)",
    gradientVia: "rgba(50,10,40,0.75)",
    accentColor: "#e040a0",
    pattern: "radial-gradient(ellipse at 30% 50%, rgba(224,64,160,0.06), transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(100,60,240,0.06), transparent 50%)",
    cardVariant: "neon",
  },
  "code-space": {
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80",
    fontFamily: "'JetBrains Mono', 'Cascadia Code', monospace",
    fontLabel: "JetBrains Mono",
    gradientFrom: "rgba(30,30,30,0.92)",
    gradientVia: "rgba(13,17,23,0.85)",
    accentColor: "#58a6ff",
    pattern: "linear-gradient(0deg, rgba(88,166,255,0.015) 1px, transparent 1px)",
    cardVariant: "terminal",
  },
  "photography": {
    heroImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Lora', Georgia, serif",
    fontLabel: "Lora",
    gradientFrom: "rgba(60,30,10,0.85)",
    gradientVia: "rgba(20,14,8,0.75)",
    accentColor: "#d4944c",
    pattern: "radial-gradient(circle at 50% 50%, rgba(212,148,76,0.04) 0%, transparent 60%)",
    cardVariant: "polaroid",
  },
  "architecture": {
    heroImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
    fontLabel: "Space Grotesk",
    gradientFrom: "rgba(40,40,35,0.88)",
    gradientVia: "rgba(18,18,16,0.8)",
    accentColor: "#c8b890",
    pattern: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(200,184,144,0.02) 40px, rgba(200,184,144,0.02) 41px)",
    cardVariant: "brutalist",
  },
  "typography": {
    heroImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Crimson Pro', 'Playfair Display', Georgia, serif",
    fontLabel: "Crimson Pro",
    gradientFrom: "rgba(80,50,20,0.85)",
    gradientVia: "rgba(30,20,10,0.75)",
    accentColor: "#a08060",
    pattern: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160,128,96,0.015) 3px, rgba(160,128,96,0.015) 4px)",
    cardVariant: "editorial",
  },
  "about-portfolio": {
    heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Inter', 'DM Sans', sans-serif",
    fontLabel: "Inter",
    gradientFrom: "rgba(20,30,80,0.85)",
    gradientVia: "rgba(10,14,40,0.75)",
    accentColor: "#5890e0",
    pattern: "radial-gradient(circle at 80% 20%, rgba(88,144,224,0.06), transparent 50%)",
    cardVariant: "minimal",
  },
  "health-wellness": {
    heroImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Lora', Georgia, serif",
    fontLabel: "Lora",
    gradientFrom: "rgba(20,80,60,0.85)",
    gradientVia: "rgba(10,40,30,0.75)",
    accentColor: "#4ade80",
    pattern: "radial-gradient(circle at 50% 80%, rgba(74,222,128,0.06), transparent 60%)",
    cardVariant: "magazine",
  },
  "food-culinary": {
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontLabel: "Playfair Display",
    gradientFrom: "rgba(100,30,10,0.85)",
    gradientVia: "rgba(40,14,5,0.75)",
    accentColor: "#f97316",
    pattern: "radial-gradient(circle at 30% 60%, rgba(249,115,22,0.06), transparent 50%)",
    cardVariant: "recipe",
  },
  "travel-adventure": {
    heroImage: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
    fontLabel: "Space Grotesk",
    gradientFrom: "rgba(20,50,100,0.85)",
    gradientVia: "rgba(10,20,50,0.75)",
    accentColor: "#38bdf8",
    pattern: "radial-gradient(ellipse at 60% 40%, rgba(56,189,248,0.06), transparent 50%)",
    cardVariant: "postcard",
  },
  "education-learning": {
    heroImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Crimson Pro', Georgia, serif",
    fontLabel: "Crimson Pro",
    gradientFrom: "rgba(60,40,20,0.85)",
    gradientVia: "rgba(30,18,10,0.75)",
    accentColor: "#fbbf24",
    pattern: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(251,191,36,0.015) 4px, rgba(251,191,36,0.015) 5px)",
    cardVariant: "notebook",
  },
  "music-entertainment": {
    heroImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=400&fit=crop&q=80",
    fontFamily: "'Inter', 'DM Sans', sans-serif",
    fontLabel: "Inter",
    gradientFrom: "rgba(80,10,60,0.85)",
    gradientVia: "rgba(30,5,25,0.75)",
    accentColor: "#ec4899",
    pattern: "radial-gradient(ellipse at 20% 60%, rgba(236,72,153,0.08), transparent 50%), radial-gradient(ellipse at 80% 40%, rgba(139,92,246,0.06), transparent 50%)",
    cardVariant: "vinyl",
  },
};

/* ────────────────────────────────────────────────────────────
   Block-template categories with curated sample themes
   ──────────────────────────────────────────────────────────── */
export interface BlockTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  preview: { bg: string; surface: string; text: string; accent: string; heading: string; muted: string };
  font: string;
  tags: string[];
  image: string;
  sampleTitle?: string;
  sampleExcerpt?: string;
}

export interface TemplateCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  templates: BlockTemplate[];
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "market-business",
    title: "Market & Business",
    subtitle: "Professional templates for commerce, finance and enterprise storytelling",
    icon: "trending_up",
    templates: [
      { id: "biz-sahara", name: "Sahara Executive", description: "Warm earthy tones for corporate narratives", icon: "☀️", preview: { bg: "#1a150e", surface: "#241e14", text: "#d4c9b0", accent: "#c99a5b", heading: "#f5e6cc", muted: "#9c8b70" }, font: "'Playfair Display', serif", tags: ["editorial", "warm"], image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=340&fit=crop&q=80", sampleTitle: "Q4 Earnings Surpass Expectations", sampleExcerpt: "The quarterly report reveals a 23% increase in revenue driven by strategic market expansion across emerging economies..." },
      { id: "biz-slate", name: "Slate Pro", description: "Clean slate grays for data-driven reports", icon: "📊", preview: { bg: "#0f1114", surface: "#181b20", text: "#c8ccd4", accent: "#6b8aff", heading: "#eef0f4", muted: "#7c8290" }, font: "'Space Grotesk', sans-serif", tags: ["minimal", "data"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&q=80", sampleTitle: "Data-Driven Market Analysis", sampleExcerpt: "Comprehensive analysis of market trends using machine learning models reveals shifts in consumer spending patterns..." },
      { id: "biz-emerald", name: "Emerald Ledger", description: "Financial green with trust signals", icon: "💰", preview: { bg: "#0a120e", surface: "#12201a", text: "#b8d4c8", accent: "#3dd68c", heading: "#e0f4ea", muted: "#6b9a82" }, font: "'Inter', sans-serif", tags: ["finance", "trust"], image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=600&h=340&fit=crop&q=80", sampleTitle: "Sustainable Investment Portfolio", sampleExcerpt: "ESG-focused funds have demonstrated consistent returns while maintaining ethical investment standards across global markets..." },
      { id: "biz-noir", name: "Noir Quarterly", description: "High-contrast dark editorial for premium brands", icon: "🖤", preview: { bg: "#0a0a0a", surface: "#141414", text: "#c8c8c8", accent: "#ffffff", heading: "#ffffff", muted: "#6e6e6e" }, font: "'Playfair Display', serif", tags: ["premium", "minimal"], image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=340&fit=crop&q=80", sampleTitle: "The Future of Luxury Markets", sampleExcerpt: "An in-depth exploration of how digital transformation is reshaping luxury consumer behavior and brand positioning..." },
      { id: "biz-midnight", name: "Midnight Bloomberg", description: "Dark terminal aesthetic for financial analytics", icon: "📈", preview: { bg: "#080c14", surface: "#101824", text: "#a0b8d4", accent: "#00d4aa", heading: "#e0ecff", muted: "#506888" }, font: "'JetBrains Mono', monospace", tags: ["finance", "terminal"], image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop&q=80", sampleTitle: "Real-Time Market Signals Dashboard", sampleExcerpt: "Algorithmic trading strategies powered by machine learning models detect micro-patterns across 47 global exchanges..." },
      { id: "biz-ivory", name: "Ivory Report", description: "Premium light-on-dark report styling", icon: "📄", preview: { bg: "#0c0a08", surface: "#181410", text: "#d8d0c0", accent: "#c8a870", heading: "#f4ece0", muted: "#907850" }, font: "'Playfair Display', serif", tags: ["report", "elegant"], image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=340&fit=crop&q=80", sampleTitle: "Annual Shareholder Report 2025", sampleExcerpt: "A comprehensive review of organizational performance, strategic initiatives, and projected growth trajectories for stakeholders..." },
      { id: "biz-copper", name: "Copper Street", description: "Rich copper and gold tones for Wall Street narratives", icon: "🏦", preview: { bg: "#0e0a06", surface: "#1a1408", text: "#d4c4a0", accent: "#d4884c", heading: "#f0e0c0", muted: "#9c8458" }, font: "'Lora', serif", tags: ["wall-street", "warm"], image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=340&fit=crop&q=80", sampleTitle: "Copper Futures and Commodity Trends", sampleExcerpt: "Global supply chain disruptions create unprecedented opportunities in base metal futures as renewable energy demand accelerates..." },
      { id: "biz-graph", name: "Graphite Analytics", description: "Cool gray analytical dashboard style", icon: "📉", preview: { bg: "#0e0f12", surface: "#171920", text: "#b0b8c8", accent: "#7090d0", heading: "#dce0ec", muted: "#5c6478" }, font: "'Space Grotesk', sans-serif", tags: ["analytics", "data"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop&q=80", sampleTitle: "Predictive Analytics in Retail Banking", sampleExcerpt: "Machine learning models achieve 89% accuracy in predicting customer churn, enabling proactive retention strategies..." },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "Elegant layouts for property showcases and architectural stories",
    icon: "apartment",
    templates: [
      { id: "re-marble", name: "Marble Estate", description: "Luxurious cream tones for property showcases", icon: "🏛️", preview: { bg: "#14110e", surface: "#1e1a14", text: "#d6ccb8", accent: "#c9a96e", heading: "#f2e8d6", muted: "#998c74" }, font: "'Lora', serif", tags: ["luxury", "warm"], image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=340&fit=crop&q=80", sampleTitle: "Penthouse Living on Fifth Avenue", sampleExcerpt: "Floor-to-ceiling windows frame panoramic skyline views in this meticulously designed 4,200 sq ft penthouse residence..." },
      { id: "re-skyline", name: "Skyline Modern", description: "Cool blues for urban developments", icon: "🏙️", preview: { bg: "#0c1018", surface: "#141a24", text: "#b8c8e0", accent: "#4d8ef7", heading: "#e0ecff", muted: "#6880a0" }, font: "'Space Grotesk', sans-serif", tags: ["modern", "urban"], image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=340&fit=crop&q=80", sampleTitle: "Urban Development: Smart Cities 2025", sampleExcerpt: "How IoT infrastructure and sustainable architecture converge to create the next generation of intelligent urban spaces..." },
      { id: "re-villa", name: "Villa Rustica", description: "Mediterranean warmth for resort properties", icon: "🏡", preview: { bg: "#18120c", surface: "#221a12", text: "#d4c0a0", accent: "#d4783c", heading: "#f0dcc4", muted: "#a08860" }, font: "'Lora', serif", tags: ["rustic", "resort"], image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=340&fit=crop&q=80", sampleTitle: "Coastal Estate with Private Cove", sampleExcerpt: "Nestled along the Mediterranean coast, this restored 18th-century villa offers 12 acres of terraced gardens and olive groves..." },
      { id: "re-penthouse", name: "Penthouse Dark", description: "Ultra-premium dark aesthetic for luxury penthouses", icon: "🌃", preview: { bg: "#080808", surface: "#121212", text: "#c0c0c0", accent: "#d4b896", heading: "#f0f0f0", muted: "#585858" }, font: "'Playfair Display', serif", tags: ["luxury", "dark"], image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=340&fit=crop&q=80", sampleTitle: "Exclusive Penthouse Collection — Park Avenue", sampleExcerpt: "Curated selections of Manhattan's most prestigious penthouse residences featuring private terraces and panoramic skyline views..." },
      { id: "re-coastal", name: "Coastal Breeze", description: "Serene ocean blues for beachfront properties", icon: "🏖️", preview: { bg: "#0a1018", surface: "#121c28", text: "#b0c8e4", accent: "#48a8d8", heading: "#e0f0ff", muted: "#5878a0" }, font: "'Inter', sans-serif", tags: ["coastal", "modern"], image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&h=340&fit=crop&q=80", sampleTitle: "Malibu Beachfront — Direct Ocean Access", sampleExcerpt: "Wake up to the sound of waves in this architectural masterpiece featuring floor-to-ceiling glass and infinity pool overlooking the Pacific..." },
      { id: "re-forest", name: "Forest Lodge", description: "Deep green tones for mountain and forest homes", icon: "🌲", preview: { bg: "#0a100a", surface: "#141e14", text: "#b0c8b0", accent: "#4c9c5c", heading: "#d8f0d8", muted: "#5c8060" }, font: "'Lora', serif", tags: ["nature", "mountain"], image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=340&fit=crop&q=80", sampleTitle: "Mountain Retreat — 40 Acres of Old Growth Forest", sampleExcerpt: "A hand-crafted timber lodge nestled among towering Douglas firs, offering complete privacy with modern sustainable amenities..." },
      { id: "re-gold", name: "Golden Gate", description: "San Francisco-inspired warm gold and fog tones", icon: "🌁", preview: { bg: "#100c08", surface: "#1c1610", text: "#d4c8b0", accent: "#e0a040", heading: "#f4e8d0", muted: "#988c6c" }, font: "'Space Grotesk', sans-serif", tags: ["urban", "warm"], image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=340&fit=crop&q=80", sampleTitle: "Victorian Townhome — Painted Ladies District", sampleExcerpt: "Meticulously restored 1890s Victorian featuring original crown molding, bay windows, and a modern chef's kitchen with Bay views..." },
    ],
  },
  {
    id: "science",
    title: "Science & Research",
    subtitle: "Academic and research-forward templates for scientific content",
    icon: "science",
    templates: [
      { id: "sci-lab", name: "Lab Report", description: "Clinical precision for research publications", icon: "🔬", preview: { bg: "#0e1014", surface: "#161a20", text: "#c0c8d6", accent: "#44a4ff", heading: "#e4ecfa", muted: "#7080a0" }, font: "'Space Grotesk', sans-serif", tags: ["academic", "clean"], image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=340&fit=crop&q=80", sampleTitle: "CRISPR-Cas9 Gene Editing Breakthrough", sampleExcerpt: "Novel delivery mechanisms achieve 94% efficiency in targeted gene modification, opening new frontiers in therapeutic applications..." },
      { id: "sci-cosmos", name: "Cosmos", description: "Deep space theme for astronomy and astrophysics", icon: "🌌", preview: { bg: "#060810", surface: "#0e1220", text: "#b0bcd8", accent: "#7c6cf0", heading: "#dce0ff", muted: "#5860a0" }, font: "'Space Grotesk', sans-serif", tags: ["space", "deep"], image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=340&fit=crop&q=80", sampleTitle: "New Exoplanet Discovered in Habitable Zone", sampleExcerpt: "The James Webb Space Telescope captures spectral data revealing atmospheric composition consistent with potential biosignatures..." },
      { id: "sci-bio", name: "BioGreen", description: "Natural tones for biology and life sciences", icon: "🧬", preview: { bg: "#0a100c", surface: "#121c16", text: "#b0d4bc", accent: "#34c870", heading: "#d8f4e0", muted: "#5c9870" }, font: "'Inter', sans-serif", tags: ["biology", "nature"], image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=340&fit=crop&q=80", sampleTitle: "Mycelium Networks and Forest Communication", sampleExcerpt: "Underground fungal networks facilitate nutrient exchange between trees, revealing a complex symbiotic communication system..." },
      { id: "sci-chem", name: "Periodic", description: "Element-inspired layout for chemistry content", icon: "⚗️", preview: { bg: "#10100a", surface: "#1a1a12", text: "#c8c8b0", accent: "#e0c040", heading: "#f0f0d8", muted: "#888870" }, font: "'JetBrains Mono', monospace", tags: ["chemistry", "data"], image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&h=340&fit=crop&q=80", sampleTitle: "Synthesizing Novel Catalysts for Clean Energy", sampleExcerpt: "Transition metal oxide catalysts demonstrate unprecedented electrochemical efficiency in hydrogen fuel cell applications..." },
      { id: "sci-quantum", name: "Quantum Field", description: "Purple-blue quantum physics aesthetic", icon: "⚛️", preview: { bg: "#08061a", surface: "#100e28", text: "#b8b0e4", accent: "#8060f0", heading: "#e0d8ff", muted: "#5848a0" }, font: "'Space Grotesk', sans-serif", tags: ["quantum", "physics"], image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop&q=80", sampleTitle: "Quantum Entanglement at Room Temperature", sampleExcerpt: "Breakthrough experiment demonstrates persistent quantum coherence in macroscopic systems, challenging decoherence theory..." },
      { id: "sci-ocean", name: "Marine Lab", description: "Deep ocean blue for marine biology", icon: "🐋", preview: { bg: "#060c14", surface: "#0c1620", text: "#a0c0dc", accent: "#2898d4", heading: "#d0e8ff", muted: "#4878a0" }, font: "'Inter', sans-serif", tags: ["marine", "ocean"], image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=340&fit=crop&q=80", sampleTitle: "Deep Sea Bioluminescence Mapping Project", sampleExcerpt: "Autonomous submersibles catalog over 3,000 new species of bioluminescent organisms in the Mariana Trench ecosystem..." },
      { id: "sci-neuro", name: "Neural Network", description: "Brain-inspired purple and pink for neuroscience", icon: "🧠", preview: { bg: "#100818", surface: "#1a1024", text: "#d0b8e8", accent: "#c850b8", heading: "#f0d8ff", muted: "#8050a0" }, font: "'Space Grotesk', sans-serif", tags: ["neuro", "brain"], image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=340&fit=crop&q=80", sampleTitle: "Mapping the Connectome: Neural Pathways Decoded", sampleExcerpt: "Advanced diffusion tensor imaging reveals previously unknown neural circuits connecting memory formation and emotional processing..." },
      { id: "sci-astro", name: "Astrophysics", description: "Dark cosmic with gold accents for astronomy", icon: "✨", preview: { bg: "#04040c", surface: "#0c0c18", text: "#a8b0c8", accent: "#d4a840", heading: "#e8ecff", muted: "#484c6c" }, font: "'Space Grotesk', sans-serif", tags: ["astronomy", "cosmic"], image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&h=340&fit=crop&q=80", sampleTitle: "First Direct Image of Exoplanet Atmosphere", sampleExcerpt: "Webb telescope spectroscopy reveals water vapor, carbon dioxide, and methane in a super-Earth's atmosphere 120 light-years away..." },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    subtitle: "Modern templates for tech blogs, startups and product launches",
    icon: "memory",
    templates: [
      { id: "tech-neon", name: "Neon Circuit", description: "Cyberpunk-inspired with electric accents", icon: "⚡", preview: { bg: "#0a0a14", surface: "#12121e", text: "#c0c0e0", accent: "#00f0ff", heading: "#e0e0ff", muted: "#6060a0" }, font: "'JetBrains Mono', monospace", tags: ["cyber", "neon"], image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=340&fit=crop&q=80", sampleTitle: "Edge Computing Changes Everything", sampleExcerpt: "Distributed processing at the network edge reduces latency to sub-millisecond levels, enabling real-time AI inference..." },
      { id: "tech-silicon", name: "Silicon Valley", description: "Startup-clean with vibrant primary colors", icon: "🚀", preview: { bg: "#0c0e14", surface: "#141820", text: "#c0cce0", accent: "#5b8def", heading: "#e4ecff", muted: "#6878a0" }, font: "'Space Grotesk', sans-serif", tags: ["startup", "clean"], image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=340&fit=crop&q=80", sampleTitle: "Series B: Scaling Infrastructure at Speed", sampleExcerpt: "How modern startups leverage serverless architecture and microservices to scale from prototype to millions of users..." },
      { id: "tech-carbon", name: "Carbon Fiber", description: "Dark premium tech aesthetic", icon: "💎", preview: { bg: "#0c0c0c", surface: "#161616", text: "#b8b8b8", accent: "#a0a0a0", heading: "#e8e8e8", muted: "#606060" }, font: "'Inter', sans-serif", tags: ["dark", "premium"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=340&fit=crop&q=80", sampleTitle: "The Silent Revolution in Chip Design", sampleExcerpt: "3nm process technology and chiplet architecture are redefining what's possible in high-performance computing hardware..." },
      { id: "tech-matrix", name: "Matrix Terminal", description: "Green-on-black terminal aesthetic", icon: "💻", preview: { bg: "#000800", surface: "#001200", text: "#30d050", accent: "#50ff70", heading: "#80ff90", muted: "#208030" }, font: "'JetBrains Mono', monospace", tags: ["terminal", "retro"], image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop&q=80", sampleTitle: "$ ./deploy --production --scale=auto", sampleExcerpt: "Building zero-downtime deployment pipelines with blue-green strategies and automated rollback mechanisms for critical systems..." },
      { id: "tech-rust", name: "Rust CLI", description: "Warm orange Rust-inspired terminal theme", icon: "🦀", preview: { bg: "#0c0806", surface: "#1a1210", text: "#d4b8a0", accent: "#e06020", heading: "#f0d8c0", muted: "#906040" }, font: "'JetBrains Mono', monospace", tags: ["rust", "systems"], image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=340&fit=crop&q=80", sampleTitle: "Memory Safety Without Garbage Collection", sampleExcerpt: "How Rust's ownership model and borrow checker guarantee thread safety at compile time, eliminating entire classes of bugs..." },
      { id: "tech-ai", name: "AI Studio", description: "Deep violet for artificial intelligence and ML", icon: "🤖", preview: { bg: "#0a0614", surface: "#140e22", text: "#c4b8e4", accent: "#9060e8", heading: "#e4d8ff", muted: "#6848a8" }, font: "'Space Grotesk', sans-serif", tags: ["ai", "ml"], image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=340&fit=crop&q=80", sampleTitle: "Transformer Architectures Beyond Language", sampleExcerpt: "Vision transformers and multimodal models achieve state-of-the-art results across 14 benchmark tasks with unified attention..." },
      { id: "tech-cloud", name: "Cloud Native", description: "Sky blue for cloud computing and DevOps", icon: "☁️", preview: { bg: "#080e18", surface: "#101a28", text: "#b0c8e8", accent: "#38a8e8", heading: "#d8ecff", muted: "#5080a8" }, font: "'Inter', sans-serif", tags: ["cloud", "devops"], image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop&q=80", sampleTitle: "Kubernetes at Scale: 10,000 Node Clusters", sampleExcerpt: "Lessons learned from operating massive Kubernetes deployments with automated scaling, self-healing, and zero-touch operations..." },
      { id: "tech-devops", name: "Pipeline Green", description: "CI/CD pipeline green for DevOps content", icon: "🔄", preview: { bg: "#060c08", surface: "#0e1a10", text: "#a8d4b0", accent: "#30c850", heading: "#d0f4d8", muted: "#408c50" }, font: "'JetBrains Mono', monospace", tags: ["cicd", "devops"], image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=340&fit=crop&q=80", sampleTitle: "GitOps: The Future of Infrastructure", sampleExcerpt: "Declarative infrastructure management with Git as the single source of truth enables reproducible, auditable deployments..." },
    ],
  },
  {
    id: "social-media",
    title: "Social Media",
    subtitle: "Vibrant templates for creators, influencers and digital content",
    icon: "share",
    templates: [
      { id: "sm-gradient", name: "Gradient Wave", description: "Bold gradients inspired by social platforms", icon: "🌈", preview: { bg: "#14081e", surface: "#1e1028", text: "#d0c0e8", accent: "#e040a0", heading: "#f0d8ff", muted: "#8060a8" }, font: "'Inter', sans-serif", tags: ["bold", "vibrant"], image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=340&fit=crop&q=80", sampleTitle: "Going Viral: The Science of Shareability", sampleExcerpt: "Understanding the psychological triggers that make content irresistible to share across digital platforms and communities..." },
      { id: "sm-creator", name: "Creator Studio", description: "Clean and modern for content creators", icon: "🎬", preview: { bg: "#0e0e14", surface: "#181820", text: "#c4c4d8", accent: "#f04040", heading: "#eceef4", muted: "#7070a0" }, font: "'Inter', sans-serif", tags: ["creator", "modern"], image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&h=340&fit=crop&q=80", sampleTitle: "Creator Economy: Monetization Guide", sampleExcerpt: "From sponsorships to digital products, a comprehensive breakdown of revenue streams available to modern content creators..." },
      { id: "sm-pastel", name: "Pastel Pop", description: "Soft pastel tones for lifestyle content", icon: "🍬", preview: { bg: "#16101a", surface: "#201824", text: "#d8c8e4", accent: "#c088e0", heading: "#f0e4ff", muted: "#9070a8" }, font: "'Lora', serif", tags: ["pastel", "lifestyle"], image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=340&fit=crop&q=80", sampleTitle: "Mindful Living in the Digital Age", sampleExcerpt: "Balancing screen time with intentional offline experiences — a guide to digital wellness and authentic lifestyle content..." },
      { id: "sm-story", name: "Story Mode", description: "Instagram story-inspired mobile-first design", icon: "📱", preview: { bg: "#120814", surface: "#1e101e", text: "#d8c0e0", accent: "#f04880", heading: "#f8d4ff", muted: "#9060a0" }, font: "'Inter', sans-serif", tags: ["stories", "mobile"], image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=340&fit=crop&q=80", sampleTitle: "The Science Behind Viral Stories", sampleExcerpt: "Ephemeral content drives 3x more engagement than feed posts — analyzing the psychology of FOMO-driven social consumption..." },
      { id: "sm-thread", name: "Thread View", description: "Clean threaded conversation layout", icon: "🧵", preview: { bg: "#0c0c10", surface: "#16161c", text: "#c0c0d0", accent: "#4ca8f0", heading: "#e4e4f0", muted: "#606078" }, font: "'Inter', sans-serif", tags: ["threads", "minimal"], image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=340&fit=crop&q=80", sampleTitle: "Building in Public: A Thread", sampleExcerpt: "Documenting the journey from zero to 50K followers through authentic sharing, vulnerability, and consistent value creation..." },
      { id: "sm-reel", name: "Reel Maker", description: "Short-form video creator energy", icon: "🎥", preview: { bg: "#080410", surface: "#140c1c", text: "#c8b8e0", accent: "#e844d0", heading: "#f4d4ff", muted: "#7850a0" }, font: "'Space Grotesk', sans-serif", tags: ["video", "reels"], image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=340&fit=crop&q=80", sampleTitle: "Reels Algorithm Decoded: What Actually Works", sampleExcerpt: "Data analysis of 100,000 viral reels reveals the optimal posting cadence, hook timing, and audio trends for maximum reach..." },
      { id: "sm-podcast", name: "Podcast Studio", description: "Dark cozy theme for audio content creators", icon: "🎙️", preview: { bg: "#0c0808", surface: "#181210", text: "#d4c4b8", accent: "#e08040", heading: "#f0e0d4", muted: "#8c7060" }, font: "'Lora', serif", tags: ["podcast", "audio"], image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=340&fit=crop&q=80", sampleTitle: "Long-Form Audio: The Renaissance of Depth", sampleExcerpt: "Why 3-hour podcast episodes outperform 5-minute clips in listener retention, brand loyalty, and advertiser revenue metrics..." },
    ],
  },
  {
    id: "code-space",
    title: "Code Space",
    subtitle: "Developer-focused templates for technical writing and documentation",
    icon: "code",
    templates: [
      { id: "cs-vscode", name: "VS Code Dark", description: "Familiar dark IDE aesthetic for developers", icon: "🔧", preview: { bg: "#1e1e1e", surface: "#252526", text: "#d4d4d4", accent: "#569cd6", heading: "#dcdcaa", muted: "#808080" }, font: "'JetBrains Mono', monospace", tags: ["ide", "familiar"], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop&q=80", sampleTitle: "Building a Custom Language Server", sampleExcerpt: "Step-by-step tutorial on implementing LSP for your domain-specific language with intelligent code completion and diagnostics..." },
      { id: "cs-github", name: "GitHub Dimmed", description: "GitHub's dimmed theme for documentation", icon: "🐙", preview: { bg: "#0d1117", surface: "#161b22", text: "#c9d1d9", accent: "#58a6ff", heading: "#f0f6fc", muted: "#8b949e" }, font: "'JetBrains Mono', monospace", tags: ["github", "docs"], image: "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?w=600&h=340&fit=crop&q=80", sampleTitle: "Open Source Maintainer's Handbook", sampleExcerpt: "Best practices for managing issues, reviewing PRs, and fostering a welcoming community around your open source project..." },
      { id: "cs-dracula", name: "Dracula Code", description: "Popular Dracula color scheme for code blogs", icon: "🧛", preview: { bg: "#282a36", surface: "#2d2f3d", text: "#f8f8f2", accent: "#ff79c6", heading: "#bd93f9", muted: "#6272a4" }, font: "'JetBrains Mono', monospace", tags: ["dracula", "popular"], image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=340&fit=crop&q=80", sampleTitle: "Functional Programming Patterns in TypeScript", sampleExcerpt: "Monads, functors, and algebraic data types — practical functional programming techniques for production TypeScript codebases..." },
      { id: "cs-solarized", name: "Solarized Night", description: "Warm solarized tones for readable code", icon: "🌗", preview: { bg: "#002b36", surface: "#073642", text: "#839496", accent: "#b58900", heading: "#fdf6e3", muted: "#586e75" }, font: "'JetBrains Mono', monospace", tags: ["solarized", "readable"], image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=340&fit=crop&q=80", sampleTitle: "Algorithms Illustrated: A Visual Guide", sampleExcerpt: "Interactive visualizations of sorting, graph traversal, and dynamic programming algorithms with complexity analysis..." },
      { id: "cs-monokai", name: "Monokai Pro", description: "Classic Monokai scheme beloved by developers", icon: "🌟", preview: { bg: "#272822", surface: "#2e2e28", text: "#f8f8f2", accent: "#f92672", heading: "#a6e22e", muted: "#75715e" }, font: "'JetBrains Mono', monospace", tags: ["monokai", "classic"], image: "https://images.unsplash.com/photo-1607799279861-4dd421887fc5?w=600&h=340&fit=crop&q=80", sampleTitle: "Design Patterns in Modern JavaScript", sampleExcerpt: "Practical implementations of Observer, Factory, and Strategy patterns using ES2024 features and real-world examples..." },
      { id: "cs-nord", name: "Nord Theme", description: "Arctic cool Nord palette for clean code blogs", icon: "❄️", preview: { bg: "#2e3440", surface: "#3b4252", text: "#d8dee9", accent: "#88c0d0", heading: "#eceff4", muted: "#4c566a" }, font: "'JetBrains Mono', monospace", tags: ["nord", "arctic"], image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=600&h=340&fit=crop&q=80", sampleTitle: "Building CLI Tools with Go", sampleExcerpt: "From argument parsing to interactive TUI components — a comprehensive guide to creating professional command-line applications..." },
      { id: "cs-onedark", name: "One Dark", description: "Atom One Dark inspired editor theme", icon: "🌑", preview: { bg: "#282c34", surface: "#2c313c", text: "#abb2bf", accent: "#61afef", heading: "#e5c07b", muted: "#5c6370" }, font: "'JetBrains Mono', monospace", tags: ["atom", "onedark"], image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=340&fit=crop&q=80", sampleTitle: "React Server Components Deep Dive", sampleExcerpt: "Understanding the rendering pipeline, data fetching patterns, and streaming architecture behind server-first React applications..." },
      { id: "cs-catppuccin", name: "Catppuccin Mocha", description: "Warm pastel Catppuccin colors for friendly code posts", icon: "😺", preview: { bg: "#1e1e2e", surface: "#252536", text: "#cdd6f4", accent: "#f5c2e7", heading: "#f5e0dc", muted: "#585b70" }, font: "'JetBrains Mono', monospace", tags: ["catppuccin", "pastel"], image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=340&fit=crop&q=80", sampleTitle: "Neovim from Scratch: A Complete Setup Guide", sampleExcerpt: "Building a productive Neovim configuration with LSP, treesitter, and telescope for a fully customized editing experience..." },
    ],
  },
  {
    id: "photography",
    title: "Photography",
    subtitle: "Showcase visual storytelling with image-first layouts",
    icon: "photo_camera",
    templates: [
      { id: "ph-gallery", name: "Dark Gallery", description: "Pitch-black background to let images shine", icon: "📷", preview: { bg: "#080808", surface: "#111111", text: "#c0c0c0", accent: "#ffffff", heading: "#ffffff", muted: "#555555" }, font: "'Lora', serif", tags: ["gallery", "minimal"], image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=340&fit=crop&q=80", sampleTitle: "Chasing Light: Iceland in Winter", sampleExcerpt: "Aurora borealis over glacial lagoons — a 30-day expedition capturing the ethereal beauty of the Icelandic winter landscape..." },
      { id: "ph-journal", name: "Photo Journal", description: "Warm tones for travel and documentary photography", icon: "📸", preview: { bg: "#140e08", surface: "#1e1610", text: "#d4c4a8", accent: "#d4944c", heading: "#f0e0c8", muted: "#907858" }, font: "'Lora', serif", tags: ["journal", "warm"], image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop&q=80", sampleTitle: "Street Portraits of Havana", sampleExcerpt: "Candid encounters in the vibrant streets of Old Havana, where every face tells a story of resilience and cultural pride..." },
      { id: "ph-mono", name: "Monochrome", description: "B&W aesthetic for minimalist portfolio", icon: "◻️", preview: { bg: "#0c0c0c", surface: "#181818", text: "#a0a0a0", accent: "#d0d0d0", heading: "#e8e8e8", muted: "#585858" }, font: "'Inter', sans-serif", tags: ["bw", "portfolio"], image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&h=340&fit=crop&q=80", sampleTitle: "Geometry in Architecture: A B&W Study", sampleExcerpt: "Minimalist compositions exploring the interplay of light, shadow, and geometric form in contemporary architecture..." },
      { id: "ph-sepia", name: "Sepia Archive", description: "Vintage sepia tones for film photography archives", icon: "📜", preview: { bg: "#12100a", surface: "#1c1810", text: "#c8b898", accent: "#b89060", heading: "#e8d8c0", muted: "#887858" }, font: "'Crimson Pro', serif", tags: ["vintage", "sepia"], image: "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=600&h=340&fit=crop&q=80", sampleTitle: "The Lost Darkrooms of Brooklyn", sampleExcerpt: "Documenting the last remaining analog photo labs where silver gelatin prints are hand-processed in century-old equipment..." },
      { id: "ph-film", name: "Film Grain", description: "Analogue film look with warm grain texture", icon: "🎥", preview: { bg: "#100c08", surface: "#1a1610", text: "#d0c4a8", accent: "#c8a468", heading: "#f0e4c8", muted: "#908060" }, font: "'Lora', serif", tags: ["film", "analog"], image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=340&fit=crop&q=80", sampleTitle: "Kodak Portra 400: A Love Letter", sampleExcerpt: "Why this legendary color negative film stock continues to define portrait and wedding photography thirty years after its debut..." },
      { id: "ph-neon", name: "Neon Nights", description: "Electric neon for urban night photography", icon: "🌃", preview: { bg: "#080410", surface: "#100a18", text: "#c8b8e0", accent: "#e840c0", heading: "#f0d4ff", muted: "#6840a0" }, font: "'Space Grotesk', sans-serif", tags: ["neon", "urban"], image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&h=340&fit=crop&q=80", sampleTitle: "Tokyo After Dark: Neon Reflections", sampleExcerpt: "Rain-soaked Shinjuku alleys transform into a kaleidoscope of reflected neon, creating surreal compositions at every turn..." },
      { id: "ph-nature", name: "Nature Canvas", description: "Earth greens and browns for nature photography", icon: "🌿", preview: { bg: "#0a0e08", surface: "#141c10", text: "#b8ccac", accent: "#5cac48", heading: "#d8eccc", muted: "#688054" }, font: "'Lora', serif", tags: ["nature", "earth"], image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=340&fit=crop&q=80", sampleTitle: "Macro Photography: Hidden Worlds", sampleExcerpt: "Extreme close-up photography reveals the intricate geometry of dewdrops, insect wings, and pollen structures invisible to the naked eye..." },
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Design",
    subtitle: "Structural elegance for design, interiors and built environment",
    icon: "architecture",
    templates: [
      { id: "ar-brutalist", name: "Brutalist Concrete", description: "Raw concrete textures and bold geometry", icon: "🏗️", preview: { bg: "#121210", surface: "#1c1c18", text: "#b8b8a8", accent: "#c8b890", heading: "#e8e8d8", muted: "#787868" }, font: "'Space Grotesk', sans-serif", tags: ["brutalist", "raw"], image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=340&fit=crop&q=80", sampleTitle: "Brutalism Revival: Form Follows Function", sampleExcerpt: "How a new generation of architects are reinterpreting béton brut for sustainable, community-centered public buildings..." },
      { id: "ar-bauhaus", name: "Bauhaus", description: "Primary colors and geometric precision", icon: "🔺", preview: { bg: "#0e0e10", surface: "#181820", text: "#c0c0c8", accent: "#e03030", heading: "#f0f0f4", muted: "#686870" }, font: "'Space Grotesk', sans-serif", tags: ["geometric", "bold"], image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=340&fit=crop&q=80", sampleTitle: "Bauhaus at 100: Design That Endures", sampleExcerpt: "Tracing the lasting influence of the Bauhaus movement on modern product design, typography, and spatial planning..." },
      { id: "ar-interior", name: "Interior Luxe", description: "Soft warm palette for interior design showcases", icon: "🛋️", preview: { bg: "#16120e", surface: "#201a14", text: "#d0c4b0", accent: "#b8946c", heading: "#ece0cc", muted: "#90806a" }, font: "'Lora', serif", tags: ["interior", "luxury"], image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=340&fit=crop&q=80", sampleTitle: "Wabi-Sabi: The Beauty of Imperfection", sampleExcerpt: "Embracing natural materials, organic textures, and the Japanese philosophy of finding beauty in imperfection and transience..." },
      { id: "ar-glass", name: "Glass Facade", description: "Cool teal reflections for modern glass architecture", icon: "🏢", preview: { bg: "#060e14", surface: "#0e1a22", text: "#a0c4d8", accent: "#30b8d0", heading: "#d4ecf8", muted: "#4888a0" }, font: "'Space Grotesk', sans-serif", tags: ["glass", "modern"], image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=340&fit=crop&q=80", sampleTitle: "Curtain Wall Engineering: Light and Structure", sampleExcerpt: "How parametric modeling and advanced glazing technology enable impossible geometries in contemporary facade design..." },
      { id: "ar-concrete", name: "Raw Concrete", description: "Minimal concrete gray for structural content", icon: "🧱", preview: { bg: "#101010", surface: "#1a1a1a", text: "#b0b0b0", accent: "#909090", heading: "#d8d8d8", muted: "#606060" }, font: "'Space Grotesk', sans-serif", tags: ["concrete", "minimal"], image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=340&fit=crop&q=80", sampleTitle: "Concrete Canopies: Structural Art", sampleExcerpt: "Shell structures and folded plates demonstrate how reinforced concrete achieves sculptural beauty through engineering precision..." },
      { id: "ar-timber", name: "Timber Frame", description: "Warm wood tones for sustainable building", icon: "🪵", preview: { bg: "#100c08", surface: "#1c1610", text: "#d0c0a8", accent: "#c09050", heading: "#ecdcc4", muted: "#88744c" }, font: "'Lora', serif", tags: ["wood", "sustainable"], image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=340&fit=crop&q=80", sampleTitle: "Mass Timber: The Skyscraper Revolution", sampleExcerpt: "Cross-laminated timber enables 18-story wooden buildings with carbon-negative footprints, reshaping urban construction paradigms..." },
      { id: "ar-museum", name: "Museum Gallery", description: "Clean gallery aesthetic for exhibition content", icon: "🏛️", preview: { bg: "#0a0a0e", surface: "#141418", text: "#b8b8c4", accent: "#c8c0a8", heading: "#e4e4ec", muted: "#606068" }, font: "'Inter', sans-serif", tags: ["gallery", "clean"], image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&h=340&fit=crop&q=80", sampleTitle: "Exhibition Design: Curating Space and Light", sampleExcerpt: "The invisible art of museum lighting, spatial flow, and interpretive design that transforms artifacts into immersive experiences..." },
    ],
  },
  {
    id: "typography",
    title: "Typography & Editorial",
    subtitle: "Type-focused layouts celebrating the art of letters",
    icon: "text_fields",
    templates: [
      { id: "ty-broadsheet", name: "Broadsheet", description: "Classic newspaper broadsheet layout", icon: "📰", preview: { bg: "#12100e", surface: "#1c1814", text: "#c8c0b0", accent: "#a08060", heading: "#f0e8d8", muted: "#807060" }, font: "'Crimson Pro', serif", tags: ["newspaper", "classic"], image: "https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=600&h=340&fit=crop&q=80", sampleTitle: "The Art of Long-Form Journalism", sampleExcerpt: "In an era of hot takes and 280 characters, long-form journalism continues to thrive as readers hunger for depth and nuance..." },
      { id: "ty-swiss", name: "Swiss Grid", description: "International typographic style inspired by Swiss design", icon: "🇨🇭", preview: { bg: "#fafafa", surface: "#f0f0f0", text: "#222222", accent: "#e03030", heading: "#000000", muted: "#666666" }, font: "'Space Grotesk', sans-serif", tags: ["swiss", "grid"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop&q=80", sampleTitle: "Helvetica: The World's Most Famous Font", sampleExcerpt: "From New York subway signage to Fortune 500 logos, how one typeface became the universal language of modern design..." },
      { id: "ty-literary", name: "Literary Review", description: "Elegant serif for literary essays and reviews", icon: "📖", preview: { bg: "#10100c", surface: "#1a1814", text: "#c8c4b8", accent: "#988060", heading: "#e8e4d8", muted: "#7c766a" }, font: "'Crimson Pro', serif", tags: ["literary", "elegant"], image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=340&fit=crop&q=80", sampleTitle: "On Reading in the Age of Distraction", sampleExcerpt: "A meditation on the declining art of deep reading and why physical books still matter in our hyperconnected world..." },
      { id: "ty-gothic", name: "Gothic Press", description: "Dark gothic blackletter-inspired editorial", icon: "🧛", preview: { bg: "#080608", surface: "#121014", text: "#b8b0c0", accent: "#a050a0", heading: "#e0d4e8", muted: "#584864" }, font: "'Playfair Display', serif", tags: ["gothic", "dark"], image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&h=340&fit=crop&q=80", sampleTitle: "The Art of the Macabre in Modern Literature", sampleExcerpt: "How contemporary gothic fiction subverts traditional horror tropes to explore societal anxieties and cultural transformation..." },
      { id: "ty-typewriter", name: "Typewriter", description: "Monospace typewriter nostalgia aesthetic", icon: "⌨️", preview: { bg: "#0e0c08", surface: "#181610", text: "#c4c0b0", accent: "#a09880", heading: "#e4e0d4", muted: "#787060" }, font: "'JetBrains Mono', monospace", tags: ["typewriter", "retro"], image: "https://images.unsplash.com/photo-1504691342899-4d92b50853e1?w=600&h=340&fit=crop&q=80", sampleTitle: "Letters Never Sent: A Collection", sampleExcerpt: "Epistolary fragments and unsent correspondence exploring the space between intention and expression in human communication..." },
      { id: "ty-artdeco", name: "Art Deco", description: "Gold on black Art Deco geometric style", icon: "🔶", preview: { bg: "#080808", surface: "#121210", text: "#c8c4a8", accent: "#d4a840", heading: "#f0e8c8", muted: "#706840" }, font: "'Playfair Display', serif", tags: ["artdeco", "gold"], image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&h=340&fit=crop&q=80", sampleTitle: "The Roaring Twenties: Design Renaissance", sampleExcerpt: "Geometric symmetry, lavish ornamentation, and bold color: how Art Deco defined a century of visual culture and architecture..." },
      { id: "ty-magazine", name: "Magazine Spread", description: "Bold magazine editorial with large type", icon: "📰", preview: { bg: "#0a0a0e", surface: "#141418", text: "#c0c0d0", accent: "#e04040", heading: "#f0f0f8", muted: "#585860" }, font: "'Space Grotesk', sans-serif", tags: ["magazine", "bold"], image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&h=340&fit=crop&q=80", sampleTitle: "The Cover Story: Designing Impact", sampleExcerpt: "Behind the scenes of magazine cover design — from concept sketches to final press, every decision shapes public perception..." },
    ],
  },
  {
    id: "about-portfolio",
    title: "About & Portfolio",
    subtitle: "Personal brand templates for about pages and portfolio showcases",
    icon: "person",
    templates: [
      { id: "ab-personal", name: "Personal Brand", description: "Clean personal brand for professionals", icon: "👤", preview: { bg: "#0c0e14", surface: "#141820", text: "#c0c8d8", accent: "#5890e0", heading: "#e4ecff", muted: "#6878a0" }, font: "'Inter', sans-serif", tags: ["personal", "clean"], image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=340&fit=crop&q=80", sampleTitle: "About Me: Building at the Intersection", sampleExcerpt: "Software engineer, writer, and open source contributor — building tools that bridge the gap between code and creativity..." },
      { id: "ab-creative", name: "Creative Folio", description: "Bold creative portfolio with accent pops", icon: "🎨", preview: { bg: "#0e0814", surface: "#180e20", text: "#d0c0e4", accent: "#a050e0", heading: "#f0daff", muted: "#7850a0" }, font: "'Playfair Display', serif", tags: ["creative", "bold"], image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=340&fit=crop&q=80", sampleTitle: "Selected Works: 2020-2025", sampleExcerpt: "A curated collection of brand identities, editorial layouts, and interactive experiences crafted for visionary clients..." },
      { id: "ab-resume", name: "Resume Dark", description: "Professional resume-style dark layout", icon: "📋", preview: { bg: "#0e0e10", surface: "#181820", text: "#c0c0c8", accent: "#50a0d0", heading: "#e8ecf0", muted: "#6870a0" }, font: "'Space Grotesk', sans-serif", tags: ["resume", "professional"], image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=340&fit=crop&q=80", sampleTitle: "Experience & Technical Expertise", sampleExcerpt: "Full-stack developer with 8+ years of experience shipping production systems at scale across fintech and healthcare domains..." },
      { id: "ab-dev", name: "Developer Portfolio", description: "Tech-focused portfolio with terminal accents", icon: "👨‍💻", preview: { bg: "#0c0c10", surface: "#14141c", text: "#b8b8d0", accent: "#50c8a8", heading: "#e0e0f0", muted: "#585878" }, font: "'JetBrains Mono', monospace", tags: ["developer", "tech"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=340&fit=crop&q=80", sampleTitle: "Projects: Open Source & Production", sampleExcerpt: "From VS Code extensions to distributed systems — a showcase of projects that solve real problems at scale..." },
      { id: "ab-designer", name: "Design Folio", description: "Pink-purple tones for design portfolios", icon: "🎨", preview: { bg: "#100818", surface: "#1a1024", text: "#d0b8e4", accent: "#d060b0", heading: "#f0d4ff", muted: "#7850a0" }, font: "'Playfair Display', serif", tags: ["design", "creative"], image: "https://images.unsplash.com/photo-1561070791-36c11767b26a?w=600&h=340&fit=crop&q=80", sampleTitle: "Selected Works: Visual Identity Design", sampleExcerpt: "Brand systems, packaging, and digital experiences crafted with attention to craft, empathy, and cultural resonance..." },
      { id: "ab-writer", name: "Writer Page", description: "Clean serif layout for author bios and writing", icon: "✏️", preview: { bg: "#0e0c0a", surface: "#1a1614", text: "#c8c0b4", accent: "#a08060", heading: "#e8e0d4", muted: "#7c7264" }, font: "'Crimson Pro', serif", tags: ["writer", "author"], image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=340&fit=crop&q=80", sampleTitle: "About the Author", sampleExcerpt: "Award-winning journalist and essayist covering technology, culture, and the human stories behind innovation and change..." },
      { id: "ab-startup", name: "Startup Founder", description: "Bold modern layout for startup founders", icon: "🚀", preview: { bg: "#08080c", surface: "#121218", text: "#c0c0d4", accent: "#6080f0", heading: "#e4e4f4", muted: "#505078" }, font: "'Space Grotesk', sans-serif", tags: ["startup", "founder"], image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=340&fit=crop&q=80", sampleTitle: "Building the Future: My Journey", sampleExcerpt: "From a dorm room prototype to a Series C company — lessons in product-market fit, team building, and relentless execution..." },
    ],
  },
  {
    id: "health-wellness",
    title: "Health & Wellness",
    subtitle: "Calming templates for fitness, nutrition, mindfulness and medical content",
    icon: "spa",
    templates: [
      { id: "hw-zen", name: "Zen Garden", description: "Calm green meditation-inspired layout", icon: "🧘", preview: { bg: "#0a100c", surface: "#121c16", text: "#b0ccb8", accent: "#4ade80", heading: "#d4f0dc", muted: "#5c8868" }, font: "'Lora', serif", tags: ["zen", "calm"], image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=340&fit=crop&q=80", sampleTitle: "The Neuroscience of Meditation", sampleExcerpt: "fMRI studies reveal how 8 weeks of mindfulness practice physically restructures the prefrontal cortex and amygdala..." },
      { id: "hw-vitality", name: "Vitality", description: "Energetic coral and orange for fitness content", icon: "🏃", preview: { bg: "#120808", surface: "#1c1010", text: "#d4b8b0", accent: "#f06848", heading: "#f4d8d0", muted: "#985848" }, font: "'Space Grotesk', sans-serif", tags: ["fitness", "energy"], image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=340&fit=crop&q=80", sampleTitle: "HIIT vs Steady-State: The Science", sampleExcerpt: "Comparative metabolic analysis shows high-intensity intervals burn 40% more fat in half the time with sustained afterburn effects..." },
      { id: "hw-ocean", name: "Ocean Calm", description: "Deep soothing blue for relaxation content", icon: "🌊", preview: { bg: "#060c14", surface: "#0e1820", text: "#a8c4dc", accent: "#3898d0", heading: "#d0e4f8", muted: "#4878a0" }, font: "'Lora', serif", tags: ["calm", "water"], image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=340&fit=crop&q=80", sampleTitle: "Blue Mind: Water and Mental Health", sampleExcerpt: "Proximity to water bodies reduces cortisol by 20% and activates the parasympathetic nervous system for deep relaxation..." },
      { id: "hw-herb", name: "Herbal", description: "Earth green tones for natural wellness", icon: "🌿", preview: { bg: "#0c100a", surface: "#161e12", text: "#b8ccac", accent: "#68a848", heading: "#d8eccc", muted: "#608048" }, font: "'Crimson Pro', serif", tags: ["herbal", "natural"], image: "https://images.unsplash.com/photo-1515023115894-bacee0b8c48b?w=600&h=340&fit=crop&q=80", sampleTitle: "Adaptogens: Ancient Herbs, Modern Science", sampleExcerpt: "Clinical trials validate ashwagandha, rhodiola, and reishi mushroom for stress reduction, immune support, and cognitive function..." },
      { id: "hw-sunset", name: "Golden Hour", description: "Warm sunset glow for yoga and mindfulness", icon: "🌅", preview: { bg: "#14100a", surface: "#1e1812", text: "#d4c4a8", accent: "#e0a040", heading: "#f0dcc0", muted: "#988460" }, font: "'Lora', serif", tags: ["yoga", "warm"], image: "https://images.unsplash.com/photo-1506126279646-a697353d3166?w=600&h=340&fit=crop&q=80", sampleTitle: "Morning Rituals: The Golden Hour Blueprint", sampleExcerpt: "How a structured 60-minute morning practice combining breathwork, movement, and journaling transforms daily performance..." },
      { id: "hw-clinical", name: "Clinical Clean", description: "Professional blue-white for medical content", icon: "🏥", preview: { bg: "#0a0e14", surface: "#121a24", text: "#b0c0d8", accent: "#4490e0", heading: "#d8e4f8", muted: "#506888" }, font: "'Inter', sans-serif", tags: ["medical", "clean"], image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=340&fit=crop&q=80", sampleTitle: "mRNA Vaccines: A New Era in Medicine", sampleExcerpt: "How lipid nanoparticle delivery systems enabled rapid vaccine development and opened the door to personalized cancer therapeutics..." },
      { id: "hw-yoga", name: "Yoga Flow", description: "Soft purple and lavender for spiritual wellness", icon: "💜", preview: { bg: "#0e0a14", surface: "#18121e", text: "#c8b8d8", accent: "#a070c8", heading: "#e4d4f0", muted: "#705888" }, font: "'Lora', serif", tags: ["yoga", "spiritual"], image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=340&fit=crop&q=80", sampleTitle: "Pranayama: The Science of Breath", sampleExcerpt: "How controlled breathing techniques regulate the vagus nerve, lower blood pressure, and induce states of deep calm and clarity..." },
    ],
  },
  {
    id: "food-culinary",
    title: "Food & Culinary",
    subtitle: "Delicious templates for recipes, restaurant reviews and food storytelling",
    icon: "restaurant",
    templates: [
      { id: "food-fire", name: "Fire Kitchen", description: "Warm red and orange for cooking content", icon: "🔥", preview: { bg: "#120808", surface: "#1c0e0e", text: "#d4b8a8", accent: "#e05830", heading: "#f4d4c4", muted: "#984838" }, font: "'Playfair Display', serif", tags: ["cooking", "bold"], image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=340&fit=crop&q=80", sampleTitle: "Open-Flame Techniques: From Yakitori to Asado", sampleExcerpt: "Master the art of live-fire cooking with techniques from Japanese robata grills to Argentine open-pit barbecue traditions..." },
      { id: "food-farm", name: "Farm to Table", description: "Earth green organic tones for sustainable food", icon: "🥬", preview: { bg: "#0c100a", surface: "#141e10", text: "#b8c8a8", accent: "#5ca040", heading: "#d8eccc", muted: "#608048" }, font: "'Lora', serif", tags: ["organic", "farm"], image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=340&fit=crop&q=80", sampleTitle: "Regenerative Agriculture: Feeding the Future", sampleExcerpt: "How small-scale farmers use cover cropping, rotational grazing, and no-till methods to restore soil health while growing food..." },
      { id: "food-patisserie", name: "Pâtisserie", description: "Soft pink and cream for pastry and baking", icon: "🧁", preview: { bg: "#140e10", surface: "#1e1618", text: "#d4c0c4", accent: "#d07080", heading: "#f0d8dc", muted: "#906068" }, font: "'Playfair Display', serif", tags: ["pastry", "elegant"], image: "https://images.unsplash.com/photo-1486427944544-d2c246c4df6e?w=600&h=340&fit=crop&q=80", sampleTitle: "The Art of French Lamination", sampleExcerpt: "Temperature-controlled butter lamination techniques for achieving 729 flaky layers in classic puff pastry and croissant dough..." },
      { id: "food-spice", name: "Spice Market", description: "Rich warm spice-inspired earthy palette", icon: "🫚", preview: { bg: "#120c06", surface: "#1c1408", text: "#d4c098", accent: "#c87830", heading: "#f0dcc0", muted: "#907040" }, font: "'Crimson Pro', serif", tags: ["spice", "warm"], image: "https://images.unsplash.com/photo-1596040033229-a9821eec3c51?w=600&h=340&fit=crop&q=80", sampleTitle: "The Silk Road: A Spice Journey", sampleExcerpt: "Tracing the origins of cardamom, saffron, and sumac from ancient trade routes to modern kitchens around the world..." },
      { id: "food-sushi", name: "Omakase", description: "Japanese minimal dark for fine dining", icon: "🍣", preview: { bg: "#0a0a0c", surface: "#141416", text: "#b8b8c0", accent: "#c8a080", heading: "#e4e4ec", muted: "#585860" }, font: "'Inter', sans-serif", tags: ["japanese", "minimal"], image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=340&fit=crop&q=80", sampleTitle: "Omakase: The Art of Trust", sampleExcerpt: "Inside Tokyo's most exclusive sushi counters where itamae craft 20-course tasting menus using fish aged for up to 30 days..." },
      { id: "food-wine", name: "Wine Cellar", description: "Deep bordeaux tones for wine and beverage content", icon: "🍷", preview: { bg: "#100808", surface: "#1a1010", text: "#d4b8b8", accent: "#a03848", heading: "#f0d4d4", muted: "#884050" }, font: "'Playfair Display', serif", tags: ["wine", "luxury"], image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=340&fit=crop&q=80", sampleTitle: "Burgundy: Terroir and Time", sampleExcerpt: "How limestone soil, elevation, and centuries of winemaking tradition converge to produce the most coveted Pinot Noir in the world..." },
      { id: "food-street", name: "Street Food", description: "Vibrant colorful theme for street food culture", icon: "🌮", preview: { bg: "#100a08", surface: "#1a1210", text: "#d4c4a8", accent: "#e08830", heading: "#f0dcc0", muted: "#907848" }, font: "'Space Grotesk', sans-serif", tags: ["street", "vibrant"], image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=340&fit=crop&q=80", sampleTitle: "Bangkok Street Food: A Midnight Guide", sampleExcerpt: "From Chinatown's yaowarat to Ratchawat market — navigating the best late-night street vendors for pad thai, som tam, and mango sticky rice..." },
    ],
  },
  {
    id: "travel-adventure",
    title: "Travel & Adventure",
    subtitle: "Wanderlust-inspiring templates for travel stories and adventure guides",
    icon: "flight",
    templates: [
      { id: "travel-compass", name: "Compass", description: "Classic adventure-inspired warm explorer theme", icon: "🧭", preview: { bg: "#100c06", surface: "#1a1608", text: "#d4c8a8", accent: "#c89840", heading: "#f0e4c4", muted: "#908058" }, font: "'Playfair Display', serif", tags: ["adventure", "classic"], image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=340&fit=crop&q=80", sampleTitle: "The Trans-Siberian Journal", sampleExcerpt: "9,289 kilometers by rail from Moscow to Vladivostok — documenting encounters, landscapes, and stories across seven time zones..." },
      { id: "travel-nordic", name: "Nordic Trail", description: "Cool Scandinavian blues and grays", icon: "🏔️", preview: { bg: "#0c1014", surface: "#141c22", text: "#b0c4d4", accent: "#80b4d0", heading: "#d8e8f4", muted: "#5880a0" }, font: "'Space Grotesk', sans-serif", tags: ["nordic", "cool"], image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=600&h=340&fit=crop&q=80", sampleTitle: "Norway's Fjord Trail: 14 Days on Foot", sampleExcerpt: "Hiking the length of Sognefjord through ancient stave church villages, glacier valleys, and some of Europe's most dramatic scenery..." },
      { id: "travel-desert", name: "Desert Safari", description: "Sandy warm tones for arid landscapes", icon: "🏜️", preview: { bg: "#14100a", surface: "#1e1810", text: "#d4c4a4", accent: "#d4983c", heading: "#f0e0c0", muted: "#988860" }, font: "'Lora', serif", tags: ["desert", "warm"], image: "https://images.unsplash.com/photo-1509023464722-18d996393e30?w=600&h=340&fit=crop&q=80", sampleTitle: "Sahara by Camel: 21 Days Across the Erg", sampleExcerpt: "Navigating by stars through sand seas and ancient oasis towns with Tuareg guides who have walked these routes for generations..." },
      { id: "travel-jungle", name: "Jungle Trek", description: "Deep green tropical for rainforest adventures", icon: "🌴", preview: { bg: "#081008", surface: "#0e1c0e", text: "#a8cca8", accent: "#40b848", heading: "#d0ecd0", muted: "#488c48" }, font: "'Inter', sans-serif", tags: ["jungle", "tropical"], image: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=600&h=340&fit=crop&q=80", sampleTitle: "Borneo Biodiversity: Into the Canopy", sampleExcerpt: "Ascending 60-meter dipterocarp trees in the heart of Danum Valley to document orangutan nesting behavior and canopy ecosystems..." },
      { id: "travel-pacific", name: "Pacific Blue", description: "Deep ocean blue for island and coastal travel", icon: "🌏", preview: { bg: "#060a14", surface: "#0e1420", text: "#a0b8d8", accent: "#2888d0", heading: "#c8e0ff", muted: "#4070a0" }, font: "'Space Grotesk', sans-serif", tags: ["ocean", "pacific"], image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=340&fit=crop&q=80", sampleTitle: "Island-Hopping the South Pacific", sampleExcerpt: "From Fiji's coral reefs to Samoa's volcanic beaches — a 6-week sailing journey through the world's most remote island chains..." },
      { id: "travel-city", name: "City Explorer", description: "Urban gray for city guides and architecture", icon: "🏛️", preview: { bg: "#0c0c0e", surface: "#161618", text: "#b8b8c0", accent: "#9090a8", heading: "#e0e0e8", muted: "#585860" }, font: "'Inter', sans-serif", tags: ["city", "urban"], image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=340&fit=crop&q=80", sampleTitle: "48 Hours in Lisbon: An Insider's Map", sampleExcerpt: "From Alfama's fado houses to LX Factory's creative hub — a curated itinerary covering Lisbon's best-kept cultural secrets..." },
      { id: "travel-mountain", name: "Summit", description: "Cool blue and white for mountain and alpine travel", icon: "⛰️", preview: { bg: "#0a0e14", surface: "#121a24", text: "#b0c0d8", accent: "#60a0d8", heading: "#d4e4f8", muted: "#4878a0" }, font: "'Space Grotesk', sans-serif", tags: ["mountain", "alpine"], image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=340&fit=crop&q=80", sampleTitle: "K2 Base Camp: The Hardest Trek on Earth", sampleExcerpt: "A 14-day approach through the Karakoram range to the foot of the world's most dangerous peak — logistics, terrain, and preparation..." },
    ],
  },
  {
    id: "education-learning",
    title: "Education & Learning",
    subtitle: "Structured templates for courses, tutorials, academic writing and e-learning",
    icon: "school",
    templates: [
      { id: "edu-chalk", name: "Chalkboard", description: "Dark green chalkboard nostalgia theme", icon: "📝", preview: { bg: "#0a120a", surface: "#122014", text: "#b0ccb0", accent: "#80c880", heading: "#d4f0d4", muted: "#508050" }, font: "'Crimson Pro', serif", tags: ["chalk", "classic"], image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=340&fit=crop&q=80", sampleTitle: "The Socratic Method in Modern Classrooms", sampleExcerpt: "How question-driven pedagogy develops critical thinking skills more effectively than lecture-based instruction across all age groups..." },
      { id: "edu-notebook", name: "Notebook", description: "Lined-paper inspired study notes aesthetic", icon: "📓", preview: { bg: "#0e0c08", surface: "#181610", text: "#c8c0ac", accent: "#3880c0", heading: "#e4dcc8", muted: "#787058" }, font: "'Crimson Pro', serif", tags: ["notebook", "study"], image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=340&fit=crop&q=80", sampleTitle: "Note-Taking Systems: A Comparative Study", sampleExcerpt: "Cornell, Zettelkasten, and mind-mapping methods analyzed for retention, recall, and creative synthesis across 500 students..." },
      { id: "edu-campus", name: "Campus", description: "Warm university tones for academic content", icon: "🎓", preview: { bg: "#0e0a08", surface: "#1a1410", text: "#d0c4b0", accent: "#b88040", heading: "#ece0c8", muted: "#8c7450" }, font: "'Playfair Display', serif", tags: ["university", "academic"], image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=340&fit=crop&q=80", sampleTitle: "The Liberal Arts Renaissance in STEM Education", sampleExcerpt: "Why leading tech companies now prioritize humanities graduates and how interdisciplinary programs produce more innovative thinkers..." },
      { id: "edu-stem", name: "STEM Lab", description: "Bright technical blue for STEM education", icon: "🔭", preview: { bg: "#080c14", surface: "#101a28", text: "#a8c0e0", accent: "#3898e8", heading: "#d0e4ff", muted: "#4878a8" }, font: "'Space Grotesk', sans-serif", tags: ["stem", "technical"], image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=340&fit=crop&q=80", sampleTitle: "Teaching Robotics to 8-Year-Olds", sampleExcerpt: "How block-based programming and sensor kits introduce computational thinking, engineering principles, and problem-solving to young learners..." },
      { id: "edu-library", name: "Library", description: "Warm book-leather tones for reading content", icon: "📚", preview: { bg: "#100c08", surface: "#1a1610", text: "#d0c4a8", accent: "#a08050", heading: "#ece0c4", muted: "#887048" }, font: "'Lora', serif", tags: ["library", "warm"], image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=340&fit=crop&q=80", sampleTitle: "The Architecture of Public Libraries", sampleExcerpt: "How Scandinavian library design principles create open, welcoming civic spaces that serve communities worldwide..." },
      { id: "edu-digital", name: "Digital Class", description: "Modern e-learning platform aesthetic", icon: "💻", preview: { bg: "#0a0a10", surface: "#141418", text: "#c0c0d0", accent: "#5080e0", heading: "#e0e0f0", muted: "#505068" }, font: "'Inter', sans-serif", tags: ["elearning", "modern"], image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=340&fit=crop&q=80", sampleTitle: "Designing Engaging Online Courses", sampleExcerpt: "Microlearning modules with spaced repetition achieve 3x better knowledge retention than traditional 60-minute lecture formats..." },
      { id: "edu-thesis", name: "Thesis", description: "Formal academic prose for research papers", icon: "📄", preview: { bg: "#0e0e0e", surface: "#181818", text: "#c4c4c4", accent: "#7898c0", heading: "#e0e0e0", muted: "#686868" }, font: "'Crimson Pro', serif", tags: ["thesis", "formal"], image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=340&fit=crop&q=80", sampleTitle: "Methodology: Mixed-Methods Research Design", sampleExcerpt: "Combining qualitative ethnographic fieldwork with quantitative survey analysis to produce robust, triangulated findings in social science..." },
    ],
  },
  {
    id: "music-entertainment",
    title: "Music & Entertainment",
    subtitle: "Dynamic templates for music blogs, film reviews, and performance content",
    icon: "music_note",
    templates: [
      { id: "mus-vinyl", name: "Vinyl", description: "Dark retro theme for music collectors", icon: "🎵", preview: { bg: "#0c0a08", surface: "#181410", text: "#c8c0a8", accent: "#c08830", heading: "#e8dcc0", muted: "#887448" }, font: "'Crimson Pro', serif", tags: ["vinyl", "retro"], image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=340&fit=crop&q=80", sampleTitle: "The Vinyl Revival: Why Analog Endures", sampleExcerpt: "Record sales surpass CDs for the first time since 1987 as listeners rediscover the warmth, ritual, and artwork of physical media..." },
      { id: "mus-concert", name: "Concert", description: "Electric neon stage lighting aesthetic", icon: "🎤", preview: { bg: "#0a0418", surface: "#140c24", text: "#c8b0e8", accent: "#c040e0", heading: "#f0d0ff", muted: "#704898" }, font: "'Space Grotesk', sans-serif", tags: ["concert", "neon"], image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=340&fit=crop&q=80", sampleTitle: "Stadium Sound: Engineering the Perfect Show", sampleExcerpt: "Line array physics, delay towers, and acoustic modeling — how audio engineers create immersive concert experiences for 80,000 people..." },
      { id: "mus-studio", name: "Recording Studio", description: "Dark warm wood tones for music production", icon: "🎧", preview: { bg: "#0e0a06", surface: "#1a1408", text: "#d0c0a0", accent: "#b89050", heading: "#ecdcc0", muted: "#887440" }, font: "'Lora', serif", tags: ["studio", "production"], image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=340&fit=crop&q=80", sampleTitle: "Analog Warmth in the Digital Age", sampleExcerpt: "Why top producers still route through Neve consoles and SSL compressors when plugins can emulate every harmonic characteristic..." },
      { id: "mus-edm", name: "EDM", description: "Electric neon blue and pink for electronic music", icon: "🎛️", preview: { bg: "#06041c", surface: "#0e0a28", text: "#b8a8f0", accent: "#4030ff", heading: "#d8c8ff", muted: "#5040a8" }, font: "'Inter', sans-serif", tags: ["edm", "electronic"], image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&h=340&fit=crop&q=80", sampleTitle: "Sound Design: Building Synths from Scratch", sampleExcerpt: "Oscillator stacking, FM synthesis, and granular processing — techniques for creating unique textures in electronic music production..." },
      { id: "mus-jazz", name: "Jazz Club", description: "Warm amber and dark for jazz culture", icon: "🎷", preview: { bg: "#0c0806", surface: "#181008", text: "#d4c4a4", accent: "#d09840", heading: "#f0e0c0", muted: "#908050" }, font: "'Playfair Display', serif", tags: ["jazz", "warm"], image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=340&fit=crop&q=80", sampleTitle: "Blue Note Records: A Design Legacy", sampleExcerpt: "How Reid Miles' minimalist cover designs for Blue Note became as iconic as the music within, defining mid-century graphic design..." },
      { id: "mus-cinema", name: "Cinema", description: "Dark theater red for film and movie reviews", icon: "🎬", preview: { bg: "#0c0606", surface: "#180e0e", text: "#d4b8b8", accent: "#c03030", heading: "#f0d4d4", muted: "#884040" }, font: "'Playfair Display', serif", tags: ["cinema", "film"], image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=340&fit=crop&q=80", sampleTitle: "The Art of the Long Take", sampleExcerpt: "From Hitchcock's Rope to Iñárritu's Birdman — how unbroken single-take sequences create tension, intimacy, and cinematic magic..." },
      { id: "mus-streaming", name: "Streaming", description: "Modern dark green for streaming platform aesthetics", icon: "🎶", preview: { bg: "#060c08", surface: "#0e1a10", text: "#a8d0b8", accent: "#1db954", heading: "#d0f0d8", muted: "#408c58" }, font: "'Inter', sans-serif", tags: ["streaming", "modern"], image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600&h=340&fit=crop&q=80", sampleTitle: "Algorithmic Curation: How Playlists Shape Taste", sampleExcerpt: "Recommendation engines analyze 4 billion daily streams to surface music that matches not just genre preferences but emotional states..." },
    ],
  },
];

type GeneratedVariant = {
  nameSuffix: string;
  icon: string;
  shade: number;
  saturation: number;
  prefix: string;
};

const GENERATED_VARIANTS: GeneratedVariant[] = [
  { nameSuffix: "Dawn", icon: "✨", shade: 12, saturation: 0.12, prefix: "dawn" },
  { nameSuffix: "Noon", icon: "☀️", shade: 6, saturation: 0.06, prefix: "noon" },
  { nameSuffix: "Dusk", icon: "🌆", shade: -10, saturation: 0.08, prefix: "dusk" },
  { nameSuffix: "Midnight", icon: "🌙", shade: -16, saturation: 0.12, prefix: "midnight" },
  { nameSuffix: "Pulse", icon: "⚡", shade: -4, saturation: 0.16, prefix: "pulse" },
  { nameSuffix: "Canvas", icon: "🎨", shade: 8, saturation: 0.14, prefix: "canvas" },
  { nameSuffix: "Prism", icon: "💎", shade: -8, saturation: 0.1, prefix: "prism" },
  { nameSuffix: "Nova", icon: "🌟", shade: 4, saturation: 0.18, prefix: "nova" },
];

const clamp255 = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const adjustHex = (hex: string, amount: number, satBoost = 0) => {
  const match = hex.match(/^#([0-9a-fA-F]{6})$/);
  if (!match) return hex;
  const n = parseInt(match[1], 16);
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;

  const avg = (r + g + b) / 3;
  r = clamp255(avg + (r - avg) * (1 + satBoost) + amount);
  g = clamp255(avg + (g - avg) * (1 + satBoost) + amount);
  b = clamp255(avg + (b - avg) * (1 + satBoost) + amount);

  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

const buildGeneratedTemplate = (category: TemplateCategory, source: BlockTemplate, variant: GeneratedVariant): BlockTemplate => {
  const { preview } = source;
  const nextPreview = {
    bg: adjustHex(preview.bg, variant.shade - 4, variant.saturation),
    surface: adjustHex(preview.surface, variant.shade, variant.saturation * 0.75),
    text: adjustHex(preview.text, Math.max(-2, Math.floor(variant.shade / 3)), variant.saturation * 0.25),
    accent: adjustHex(preview.accent, variant.shade + 10, variant.saturation),
    heading: adjustHex(preview.heading, variant.shade + 6, variant.saturation * 0.4),
    muted: adjustHex(preview.muted, variant.shade - 6, variant.saturation * 0.2),
  };

  return {
    ...source,
    id: `${source.id}-${variant.prefix}`,
    name: `${source.name} ${variant.nameSuffix}`,
    description: `${source.description} (${variant.nameSuffix.toLowerCase()} variant)`,
    icon: variant.icon,
    preview: nextPreview,
    tags: [...source.tags, "generated"],
    sampleTitle: source.sampleTitle ? `${source.sampleTitle} • ${variant.nameSuffix}` : source.sampleTitle,
    sampleExcerpt: source.sampleExcerpt
      ? `${source.sampleExcerpt.slice(0, 120)}... Tuned for ${category.title.toLowerCase()} readers who want stronger visual hierarchy.`
      : source.sampleExcerpt,
  };
};

const buildExpandedTemplateCategories = (): TemplateCategory[] => {
  const generatedPool: Array<{ categoryId: string; template: BlockTemplate }> = [];

  TEMPLATE_CATEGORIES.forEach((category, index) => {
    const source = category.templates[index % category.templates.length] || category.templates[0];
    GENERATED_VARIANTS.forEach((variant) => {
      generatedPool.push({ categoryId: category.id, template: buildGeneratedTemplate(category, source, variant) });
    });
  });

  // Exactly 100 additional templates are appended across all categories.
  const selected = generatedPool.slice(0, 100);

  return TEMPLATE_CATEGORIES.map((category) => {
    const additional = selected
      .filter((item) => item.categoryId === category.id)
      .map((item) => item.template);

    if (!additional.length) return category;

    return {
      ...category,
      templates: [...category.templates, ...additional],
    };
  });
};

export const EXPANDED_TEMPLATE_CATEGORIES: TemplateCategory[] = buildExpandedTemplateCategories();

/* ────────────────────────────────────────────────────────────
   Featured blog themes — 6 curated across categories
   ──────────────────────────────────────────────────────────── */
export const FEATURED_THEMES = [
  { ...TEMPLATE_CATEGORIES[0].templates[0], category: "Market & Business" },
  { ...TEMPLATE_CATEGORIES[2].templates[1], category: "Science & Research" },
  { ...TEMPLATE_CATEGORIES[3].templates[0], category: "Technology" },
  { ...TEMPLATE_CATEGORIES[5].templates[2], category: "Code Space" },
  { ...TEMPLATE_CATEGORIES[10].templates[0], category: "Health & Wellness" },
  { ...TEMPLATE_CATEGORIES[12].templates[0], category: "Travel & Adventure" },
];

/* ────────────────────────────────────────────────────────────
   Custom theme creator form
   ──────────────────────────────────────────────────────────── */
export type ThemeCreatorForm = {
  name: string;
  description: string;
  previewIcon: string;
  fontClass: string;
  blockVariant: string;
  isPublic: boolean;
  backgroundImage: string;
  palette: {
    background: string;
    surface: string;
    text: string;
    mutedText: string;
    heading: string;
    accent: string;
    border: string;
    codeBackground: string;
    codeText: string;
    blockquoteBackground: string;
    tableHeaderBackground: string;
  };
};