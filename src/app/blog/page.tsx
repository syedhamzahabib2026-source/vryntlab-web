import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { blogPostPath, blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Web Design, SEO & AI Tips | VryntLab",
  description:
    "Practical guides on web design, SEO, GEO, and AI tools for small businesses. From VryntLab.",
  alternates: {
    canonical: "https://vryntlab.com/blog",
  },
  openGraph: {
    title: "Blog — Web Design, SEO & AI Tips | VryntLab",
    description:
      "Practical guides on web design, SEO, GEO, and AI tools for small businesses. From VryntLab.",
    url: "https://vryntlab.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Web Design, SEO & AI Tips | VryntLab",
    description:
      "Practical guides on web design, SEO, GEO, and AI tools for small businesses. From VryntLab.",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vryntlab.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://vryntlab.com/blog" },
    ],
  },
];

const posts = blogPosts.map((post) => ({
  category: post.category,
  title: post.headline,
  desc: post.listDescription,
  href: blogPostPath(post.slug),
  date: post.listDateLabel,
}));

export default function BlogIndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd schema={schemas} />

      <div className={`${contentWell} mx-auto w-full max-w-3xl`}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 py-3 text-[12px] text-[#8888a8]">
            <li>
              <Link
                href="/"
                className={`transition-colors duration-200 hover:text-[#F0F0FF] ${focusRing} rounded-sm`}
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="select-none">/</li>
            <li className="text-[#C8C8D8]">Blog</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="border-t border-[#1E1E35] py-10 sm:py-12">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
              <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
              Blog
            </p>
            <h1 className="mt-5 text-[1.875rem] font-black leading-[1.08] tracking-[-0.03em] text-[#F0F0FF] sm:text-[2.375rem]">
              Practical guides for small businesses
            </h1>
            <p className="mt-4 text-[1rem] leading-[1.68] text-[#C8C8D8]/75">
              No fluff. Just useful things about websites, search, and automation.
            </p>
          </Reveal>
        </header>

        {/* Post list */}
        <ul className="space-y-4 pb-16 sm:pb-20">
          {posts.map((post, i) => (
            <li key={post.href}>
              <Reveal delay={i * 0.08}>
                <Link
                  href={post.href}
                  className={`group block rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-6 transition-[border-color,transform] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.995] sm:p-7 ${focusRing} [@media(hover:hover)]:hover:border-[#7C3FFF]/30 [@media(hover:hover)]:hover:-translate-y-px`}
                >
                  {/* Category badge */}
                  <span className="inline-flex items-center rounded-full border border-[#7C3FFF]/30 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#7C3FFF]">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="mt-3 text-[1.0625rem] font-bold leading-[1.3] tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.1875rem]">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-[#C8C8D8]/72">
                    {post.desc}
                  </p>

                  {/* Read link + date */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#7C3FFF] transition-colors duration-200 group-hover:text-[#00E5FF]">
                      Read{" "}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                    <span className="text-[12px] text-[#8888a8]">{post.date}</span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
