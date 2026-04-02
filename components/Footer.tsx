import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0a0a]">
      {/* ─── Beyond a Platform — Career Engine ─── */}
      <div className="relative overflow-hidden border-b border-white/5">
        {/* Transparent mixed gradient background */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.06) 25%, transparent 50%, rgba(16,185,129,0.06) 75%, rgba(236,72,153,0.04) 100%)'}} />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.12)0-*****************, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(139,92,246,0.08), transparent 50%)'}} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 mb-3 font-bold">How It Works</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-4">
            Beyond a Platform. A Career Engine.
          </h3>
          <p className="text-sm text-on-surface-variant max-w-2xl mb-12">
            From your first blog post to landing your dream role — AiBlog powers every step of your creative and professional journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", icon: "edit_note", title: "Write with AI", desc: "Open the editor, pick from 200+ themed templates, and craft your story with AI-powered writing tools, slash commands, and smart formatting.", gradient: "from-blue-500/15 to-cyan-500/5" },
              { step: "02", icon: "palette", title: "Style Your Brand", desc: "Choose typography, colors, and block variants from 10+ categories. Create custom themes or use curated editorial palettes for every niche.", gradient: "from-violet-500/15 to-purple-500/5" },
              { step: "03", icon: "groups", title: "Build Community", desc: "Engage in forums, collaborate on posts with other writers, follow creators, join the Inner Circle, and grow your professional network.", gradient: "from-emerald-500/15 to-teal-500/5" },
              { step: "04", icon: "rocket_launch", title: "Launch Your Career", desc: "Build a portfolio and resume, track analytics, explore job opportunities on our board, and get discovered by recruiters in your field.", gradient: "from-pink-500/15 to-rose-500/5" },
            ].map((item) => (
              <div key={item.step} className="group relative">
                {/* Card with transparent bg */}
                <div className={`relative overflow-hidden border border-white/8 bg-linear-to-br ${item.gradient} backdrop-blur-sm p-6 transition-all hover:border-white/15 hover:-translate-y-0.5`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-white/10 bg-surface-container/60 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary/50 tracking-[0.3em] uppercase">{item.step}</span>
                  </div>
                  <h4 className="text-sm font-bold text-on-surface mb-2 font-headline">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Footer Links ─── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block font-headline">
              AiBlog
            </Link>
            <p className="text-on-surface-variant max-w-xs mb-6 leading-relaxed text-sm">
              An AI-powered editorial platform for writers, developers, and professionals. Create themed blog posts, build your portfolio, and grow your career.
            </p>
            <div className="flex gap-3">
              {[
                { label: "X / Twitter", icon: "tag", href: "#" },
                { label: "GitHub", icon: "code", href: "#" },
                { label: "LinkedIn", icon: "work", href: "#" },
                { label: "RSS", icon: "rss_feed", href: "#" },
              ].map((s) => (
                <Button key={s.label} asChild variant="ghost" size="icon" className="w-9 h-9 bg-surface-container hover:bg-primary/20 hover:text-primary" title={s.label}>
                  <Link href={s.href}>
                    <span className="material-symbols-outlined text-base">{s.icon}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h6 className="text-white font-bold text-xs mb-5 uppercase tracking-[0.2em] font-headline">Platform</h6>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><Link href="/editor" className="hover:text-primary transition-colors">Blog Editor</Link></li>
              <li><Link href="/blog-themes" className="hover:text-primary transition-colors">Theme Gallery</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/portfolio" className="hover:text-primary transition-colors">Portfolio Builder</Link></li>
              <li><Link href="/dashboard/resume" className="hover:text-primary transition-colors">Resume Builder</Link></li>
              <li><Link href="/innovation" className="hover:text-primary transition-colors">Innovation Lab</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h6 className="text-white font-bold text-xs mb-5 uppercase tracking-[0.2em] font-headline">Community</h6>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><Link href="/community" className="hover:text-primary transition-colors">Feed</Link></li>
              <li><Link href="/forum" className="hover:text-primary transition-colors">Forum Discussions</Link></li>
              <li><Link href="/inner-circle" className="hover:text-primary transition-colors flex items-center gap-1.5">Inner Circle <Badge variant="outline" className="bg-primary/10 text-primary text-[8px] border-transparent py-0 px-1">PRO</Badge></Link></li>
              <li><Link href="/dashboard/collaboration" className="hover:text-primary transition-colors">Collaboration</Link></li>
              <li><Link href="/dashboard/notifications" className="hover:text-primary transition-colors">Notifications</Link></li>
            </ul>
          </div>

          {/* Careers & Jobs */}
          <div>
            <h6 className="text-white font-bold text-xs mb-5 uppercase tracking-[0.2em] font-headline">Careers</h6>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><Link href="/jobs" className="hover:text-primary transition-colors">Job Board</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors flex items-center gap-1.5">We&apos;re Hiring <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 text-[8px] border-transparent py-0 px-1">Open</Badge></Link></li>
              <li><Link href="/dashboard/career" className="hover:text-primary transition-colors">Career Paths</Link></li>
              <li><Link href="/dashboard/insights" className="hover:text-primary transition-colors">Analytics</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h6 className="text-white font-bold text-xs mb-5 uppercase tracking-[0.2em] font-headline">Company</h6>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li><Link href="/" className="hover:text-primary transition-colors">About AiBlog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/auth" className="hover:text-primary transition-colors">Sign In / Sign Up</Link></li>
            </ul>
          </div>
        </div>

        {/* ─── Tech Stack & Status ─── */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-wider mr-2">Built with</span>
          {["Next.js", "Supabase", "Tailwind CSS", "Gemini AI", "Clerk Auth"].map((tech) => (
            <span key={tech} className="text-[10px] px-2 py-0.5 border border-white/5 text-on-surface-variant/60">{tech}</span>
          ))}
        </div>

        <Separator className="mb-8 opacity-30" />

        {/* ─── Bottom Bar ─── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-on-surface-variant/50">
            © {new Date().getFullYear()} AiBlog. AI-powered editorial platform for creators and professionals.
          </span>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 gap-1.5 font-bold uppercase tracking-widest text-[9px]">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Operational
            </Badge>
            <span className="text-[10px] text-on-surface-variant/40">v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}