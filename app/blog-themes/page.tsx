import Link from "next/link";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { BLOG_THEMES } from "@/lib/blog-themes";

export default function BlogThemesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-8">
        <section className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tighter text-on-surface">
              Blog Themes Gallery
            </h1>
            <p className="mt-3 text-on-surface-variant max-w-2xl mx-auto">
              Pick a style that matches your voice. Each theme changes how your blog post looks to the community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_THEMES.map((theme) => (
              <article
                key={theme.id}
                className={`rounded-2xl border overflow-hidden shadow-xl transition-all hover:-translate-y-1 ${theme.cardClass}`}
              >
                <div className={`h-32 ${theme.bgClass} ${theme.fontClass} p-4 flex flex-col justify-between`}>
                  <div className="text-2xl">{theme.previewImage}</div>
                  <div>
                    <h2 className={`text-lg font-bold ${theme.headingClass}`}>{theme.name}</h2>
                    <p className={`text-xs ${theme.textClass}`}>{theme.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-black/10">
                  <Link
                    href={`/editor?theme=${encodeURIComponent(theme.id)}`}
                    className="inline-flex items-center justify-center w-full rounded-lg bg-primary text-on-primary-fixed py-2 text-sm font-semibold hover:opacity-90"
                  >
                    Use This Theme
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
