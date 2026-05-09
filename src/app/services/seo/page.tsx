import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "SEO & Local Search for Small Business | VryntLab",
  description:
    "VryntLab helps small businesses get found on Google, Maps, and AI search engines. Technical SEO, local search, and GEO. Chicago-based. Free estimate.",
  alternates: {
    canonical: "https://vryntlab.com/services/seo",
  },
  openGraph: {
    title: "SEO & Local Search for Small Business | VryntLab",
    description:
      "VryntLab helps small businesses get found on Google, Maps, and AI search engines. Technical SEO, local search, and GEO. Chicago-based. Free estimate.",
    url: "https://vryntlab.com/services/seo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO & Local Search for Small Business | VryntLab",
    description:
      "VryntLab helps small businesses get found on Google, Maps, and AI search engines. Technical SEO, local search, and GEO. Chicago-based. Free estimate.",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & Local Search Optimization",
    provider: { "@type": "Organization", name: "VryntLab" },
    areaServed: "Worldwide",
    url: "https://vryntlab.com/services/seo",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does SEO take to show results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most businesses see meaningful movement in 3–6 months for local search. Technical fixes and Google Business Profile work can show results faster — sometimes within weeks.",
        },
      },
      {
        "@type": "Question",
        name: "What is GEO and why does it matter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GEO stands for Generative Engine Optimization — it's the practice of making your content discoverable by AI tools like ChatGPT, Perplexity, and Google AI Overviews. It matters because a growing share of searches now get answered directly by AI, not a list of links.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer ongoing SEO retainers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer monthly SEO work for businesses that want to build visibility over time. Scope and price depend on what's already in place — we assess before quoting.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vryntlab.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://vryntlab.com/services" },
      { "@type": "ListItem", position: 3, name: "SEO", item: "https://vryntlab.com/services/seo" },
    ],
  },
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const fronts = [
  {
    label: "Traditional search (Google)",
    body: "When someone searches 'plumber near me' or 'best accountant Chicago', Google returns a list of results. Ranking in the top 3 comes from technical health, local signals, and content quality. Most small businesses have fixable issues holding them back.",
  },
  {
    label: "AI search (GEO)",
    body: "ChatGPT, Perplexity, and Google AI Overviews now answer search queries directly — often without the user clicking a link. Getting cited in those answers requires structured data, clear entity signals, and content written to be extracted, not just read. Most agencies aren't doing this yet. We are.",
  },
];

const leftBullets = [
  "Technical audit — crawlability, indexing, site speed, and broken signals",
  "On-page optimization — titles, headers, meta descriptions, and content structure",
  "Schema markup — structured data that helps search engines and AI understand your business",
  "Google Business Profile — full setup and optimization for local visibility",
];

const rightBullets = [
  "Local SEO — citations, NAP consistency, and map pack signals",
  "GEO — structured content and entity signals for AI search engines",
  "Content gap analysis — what your competitors rank for that you don't",
  "Ongoing reporting — plain language, not vanity metrics",
];

const useCases = [
  {
    title: "Local service businesses",
    body: "Plumbers, lawyers, dentists, contractors — getting into the map pack and top 3 results for your area.",
  },
  {
    title: "Businesses not showing on Maps",
    body: "Your Google Business Profile is incomplete or unoptimized. We fix that.",
  },
  {
    title: "New websites",
    body: "A new site with no SEO foundation won't rank. We build it right from launch.",
  },
  {
    title: "Sites with traffic but no leads",
    body: "You have visitors but they're not converting. Often a content and intent mismatch we can fix.",
  },
  {
    title: "Businesses wanting AI visibility",
    body: "You want your business cited when ChatGPT or Perplexity answers questions in your industry.",
  },
  {
    title: "Existing sites that slipped",
    body: "Ranking drops after a site change or algorithm update. We diagnose and recover.",
  },
];

const steps = [
  {
    n: "01",
    title: "Audit first, assumptions never",
    body: "We look at what's actually broken before recommending anything. Most sites have 3–5 fixable issues causing most of the visibility problem.",
  },
  {
    n: "02",
    title: "Fix the foundation, then build",
    body: "Technical issues before content, local signals before broader SEO. The order matters.",
  },
  {
    n: "03",
    title: "Report in plain language",
    body: "You get a clear picture of what changed and why — not a dashboard full of numbers that don't connect to your business.",
  },
];

export default function SeoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd schema={schemas} />

      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className={contentWell}>
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
          <li>
            <Link
              href="/services"
              className={`transition-colors duration-200 hover:text-[#F0F0FF] ${focusRing} rounded-sm`}
            >
              Services
            </Link>
          </li>
          <li aria-hidden className="select-none">/</li>
          <li className="text-[#C8C8D8]">SEO</li>
        </ol>
      </nav>

      {/* 2. Hero */}
      <section
        aria-labelledby="seo-h1"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-14 md:py-16`}
      >
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
            <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
            SEO &amp; Local Search
          </p>
          <h1
            id="seo-h1"
            className="mt-5 max-w-3xl text-[2rem] font-black leading-[1.06] tracking-[-0.032em] text-[#F0F0FF] sm:text-[2.625rem] md:text-[3.125rem]"
          >
            Show up when your customers are actually searching
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.68] text-[#C8C8D8]/80 sm:text-[1.0625rem]">
            We help small businesses get found on Google, Maps, and AI search engines — through
            technical fixes, local optimization, and content that search engines trust.
          </p>
          <div className="mt-8">
            <Link href="/#contact" className={primaryBtn}>
              Get a free estimate{" "}
              <span aria-hidden className="opacity-90">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. Two fronts */}
      <section
        aria-labelledby="fronts-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="fronts-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            Search has two fronts now
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fronts.map((front, i) => (
            <Reveal key={front.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-6">
                <h3 className="text-[0.9375rem] font-bold text-[#F0F0FF]">{front.label}</h3>
                <p className="mt-3 text-[0.875rem] leading-[1.68] text-[#C8C8D8]/75">{front.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. What we do */}
      <section
        aria-labelledby="deliver-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="deliver-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            What SEO work with VryntLab includes
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
          <Reveal delay={0.05}>
            <ul className="space-y-4">
              {leftBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3FFF]"
                    aria-hidden
                  />
                  <span className="text-[0.9375rem] leading-[1.6] text-[#C8C8D8]/85">{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="space-y-4">
              {rightBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3FFF]"
                    aria-hidden
                  />
                  <span className="text-[0.9375rem] leading-[1.6] text-[#C8C8D8]/85">{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. Who it's for */}
      <section
        aria-labelledby="usecases-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="usecases-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            Who it&apos;s for
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {useCases.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 0.06}>
              <div className="rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-5 sm:p-6">
                <p className="text-[0.9375rem] font-bold text-[#F0F0FF]">{uc.title}</p>
                <p className="mt-2.5 text-[0.875rem] leading-[1.68] text-[#C8C8D8]/72">{uc.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. Process */}
      <section
        aria-labelledby="process-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="process-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            How we work
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <div className="border-l-2 border-[#7C3FFF]/30 pl-5">
                <p className="font-mono text-[11px] font-bold tracking-widest text-[#7C3FFF]/55">
                  {step.n}
                </p>
                <h3 className="mt-2 text-[0.9375rem] font-bold text-[#F0F0FF]">{step.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-[1.68] text-[#C8C8D8]/72">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section
        aria-labelledby="faq-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="faq-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            Common questions
          </h2>
        </Reveal>
        <div className="mt-8 max-w-2xl">
          <FaqAccordion />
        </div>
      </section>

      {/* 8. CTA slab */}
      <div className={`mt-10 ${slabBleed}`}>
        <section
          aria-labelledby="cta-seo-heading"
          className={`${contentWell} px-4 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16`}
        >
          <div className={slabContent}>
            <Reveal>
              <h2
                id="cta-seo-heading"
                className="max-w-2xl text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[var(--slab-fg,#F0F0FF)] sm:text-[2.125rem] md:text-[2.5rem]"
              >
                Find out what&apos;s holding your site back
              </h2>
              <p className="mt-4 max-w-[50ch] text-[1rem] leading-[1.68] text-[var(--slab-muted,#C8C8D8)]/80">
                Tell us your site and what you&apos;re trying to rank for. We&apos;ll come back
                with what we&apos;d fix and what it costs.
              </p>
              <div className="mt-8">
                <Link href="/#contact" className={primaryBtn}>
                  Get a free estimate{" "}
                  <span aria-hidden className="opacity-90">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
