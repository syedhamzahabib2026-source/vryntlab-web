import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies, caseStudyPosterUrl } from "@/lib/case-studies";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Work — Web & App Projects | VryntLab",
  description:
    "See how VryntLab has built Shopify stores, logistics websites, and custom digital solutions for real businesses. Selected projects from our portfolio.",
  alternates: {
    canonical: "https://vryntlab.com/work",
  },
  openGraph: {
    title: "Our Work — Web & App Projects | VryntLab",
    description:
      "See how VryntLab has built Shopify stores, logistics websites, and custom digital solutions for real businesses. Selected projects from our portfolio.",
    url: "https://vryntlab.com/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work — Web & App Projects | VryntLab",
    description:
      "See how VryntLab has built Shopify stores, logistics websites, and custom digital solutions for real businesses. Selected projects from our portfolio.",
  },
};

export default function WorkIndexPage() {
  const workSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vryntlab.com" },
        { "@type": "ListItem", position: 2, name: "Work", item: "https://vryntlab.com/work" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "VryntLab Portfolio",
      itemListElement: caseStudies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${study.client} — ${study.shortTitle}`,
        url: `https://vryntlab.com/work/${study.id}`,
      })),
    },
  ];

  return (
    <div className="flex flex-1 flex-col pb-16 pt-4 sm:pb-20 sm:pt-6">
      <JsonLd schema={workSchemas} />
      <div className={`${contentWell} max-w-3xl space-y-6`}>
        <nav aria-label="Breadcrumb" className="text-[13px] text-[#8888a0]">
          <Link
            href="/#work"
            className={`font-medium text-[#7C3FFF] underline decoration-[#7C3FFF]/30 underline-offset-4 transition-colors ${focusRing} rounded-sm hover:text-[#9d6aff] hover:decoration-[#7C3FFF]`}
          >
            &larr; Home
          </Link>
        </nav>
        <header className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7C3FFF]">
            Work
          </p>
          <h1 className="font-display text-balance text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-[#F0F0FF] sm:text-[2.25rem] md:text-[2.5rem]">
            Selected projects — a slice of what we ship
          </h1>
          <p className="max-w-2xl text-[16px] leading-relaxed text-[#C8C8D8] sm:text-[17px]">
            This page lists public projects. Many builds are confidential or live
            under partner brands; reach out if you need references closer to your
            industry.
          </p>
        </header>
      </div>

      <ul
        className={`${contentWell} mt-12 flex max-w-3xl flex-col gap-5 sm:mt-14 sm:gap-6`}
      >
        {caseStudies.map((study) => {
          const posterSrc = caseStudyPosterUrl(study.media);
          return (
            <li key={study.id}>
              <Link
                href={`/work/${study.id}`}
                className={`group block overflow-hidden rounded-xl border border-[#1E1E35] bg-[#0F0F1A] transition-all duration-400 ease-[var(--ease-out-premium)] hover:-translate-y-1 hover:border-[#7C3FFF]/40 hover:shadow-[0_0_40px_-15px_rgba(124,63,255,0.2)] ${focusRing}`}
              >
                {/* Image preview */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={posterSrc}
                    alt={study.coverAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 48rem"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent" />
                </div>
                
                <div className="p-6 sm:p-7">
                  <span className="inline-flex rounded-full border border-[#1E1E35] bg-[#1E1E35]/30 px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-[#C8C8D8]">
                    {study.typeLabel}
                  </span>
                  <h2 className="mt-3 font-display text-lg font-medium tracking-[-0.02em] text-[#F0F0FF] sm:text-xl">
                    {study.client}
                  </h2>
                  <p className="mt-2 text-[14px] leading-snug text-[#C8C8D8] sm:text-[15px]">
                    {study.shortTitle}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#7C3FFF]">
                    Open project
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={`${contentWell} mt-14 max-w-3xl`}>
        <Link
          href="/#contact"
          className={`inline-flex min-h-11 items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-6 text-[13px] font-semibold text-white shadow-lg transition-all duration-300 ${focusRing} hover:shadow-[0_0_30px_-5px_rgba(124,63,255,0.4)]`}
        >
          Start a project
        </Link>
      </div>
    </div>
  );
}
