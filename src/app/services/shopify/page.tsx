import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "Shopify Store Setup & Design | VryntLab",
  description:
    "VryntLab builds and improves Shopify stores for small businesses. Product pages that convert, fast checkout, and a brand that builds trust. Chicago-based. Free estimate.",
  alternates: {
    canonical: "https://vryntlab.com/services/shopify",
  },
  openGraph: {
    title: "Shopify Store Setup & Design | VryntLab",
    description:
      "VryntLab builds and improves Shopify stores for small businesses. Product pages that convert, fast checkout, and a brand that builds trust. Chicago-based. Free estimate.",
    url: "https://vryntlab.com/services/shopify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Store Setup & Design | VryntLab",
    description:
      "VryntLab builds and improves Shopify stores for small businesses. Product pages that convert, fast checkout, and a brand that builds trust. Chicago-based. Free estimate.",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Shopify Store Design & Development",
    provider: { "@type": "Organization", name: "VryntLab" },
    areaServed: "Worldwide",
    url: "https://vryntlab.com/services/shopify",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a Shopify store cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most Shopify builds from VryntLab run $500–$1,200. Simple stores with a theme and product setup start lower; custom layouts, apps, and checkout work push toward the higher end.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with existing Shopify stores?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we redesign, fix, and improve stores that are already live just as often as we build new ones.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a Shopify store take to build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most stores are live in 1–2 weeks from when we have your products and brand assets.",
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
      { "@type": "ListItem", position: 3, name: "Shopify", item: "https://vryntlab.com/services/shopify" },
    ],
  },
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const ghostBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full border border-[#1E1E35] bg-[#0F0F1A] px-8 text-[14px] font-semibold tracking-tight text-[#C8C8D8] transition-[border-color,transform] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:border-violet-500/40`;

const problemCards = [
  {
    title: "Product pages that don't build trust",
    body: "Long descriptions, no clear benefits, weak images. Visitors read for 10 seconds and leave without adding to cart.",
  },
  {
    title: "Checkout drop-off",
    body: "Too many steps, unexpected costs at checkout, no trust signals near the buy button. Money left in abandoned carts.",
  },
  {
    title: "Store that looks nothing like your brand",
    body: "Default theme, stock fonts, generic layout. Nothing that makes someone remember you or trust you over a competitor.",
  },
];

const leftBullets = [
  "Product pages built to convert — benefits above the fold, clear CTA, trust signals",
  "Brand-matched design — fonts, colors, layout that fits your product",
  "Mobile-first — most Shopify traffic is on phones",
  "Fast load times — compressed images, clean theme code",
];

const rightBullets = [
  "Collections structured for browsing and SEO",
  "Checkout optimized — fewer steps, no surprise costs",
  "App setup if needed — reviews, upsells, email capture",
  "Launch-ready — domain, payment, shipping all verified",
];

const useCases = [
  {
    title: "New product launches",
    body: "You have a product ready to sell and need a store that makes it look credible from day one.",
  },
  {
    title: "Rebrand / redesign",
    body: "Your store is live but it doesn't match the product quality. Visitors bounce before they buy.",
  },
  {
    title: "Adding online to a physical store",
    body: "Your retail is strong but online is an afterthought. We fix that.",
  },
  {
    title: "DTC brands",
    body: "Supplement, beauty, apparel, food — any direct-to-consumer product that needs a store that earns trust.",
  },
  {
    title: "Low-converting stores",
    body: "Traffic exists but sales don't follow. We audit and fix what's leaking.",
  },
  {
    title: "Shopify migrations",
    body: "Moving from WooCommerce, Wix, or Squarespace. We handle the move without breaking SEO.",
  },
];

const steps = [
  {
    n: "01",
    title: "We learn your product and customer",
    body: "Who buys it, why they hesitate, what makes them trust. This shapes every layout decision.",
  },
  {
    n: "02",
    title: "We build and show you early",
    body: "You see the homepage and product page before anything is final. Easy to adjust while it's still cheap.",
  },
  {
    n: "03",
    title: "We launch and hand it over",
    body: "You get the Shopify login, a walkthrough of what we built, and how to manage it.",
  },
];

export default function ShopifyPage() {
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
          <li className="text-[#C8C8D8]">Shopify</li>
        </ol>
      </nav>

      {/* 2. Hero */}
      <section
        aria-labelledby="shopify-h1"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-14 md:py-16`}
      >
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
            <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
            Shopify &amp; E-commerce
          </p>
          <h1
            id="shopify-h1"
            className="mt-5 max-w-3xl text-[2rem] font-black leading-[1.06] tracking-[-0.032em] text-[#F0F0FF] sm:text-[2.625rem] md:text-[3.125rem]"
          >
            A Shopify store that sells — not just one that looks good
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.68] text-[#C8C8D8]/80 sm:text-[1.0625rem]">
            Most Shopify stores leak sales on the product page. We fix the layout, trust signals,
            and checkout path so more visitors actually buy.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#contact" className={primaryBtn}>
              Get a free estimate{" "}
              <span aria-hidden className="opacity-90">→</span>
            </Link>
            <Link href="/work/living-silica" className={ghostBtn}>
              See our work ↓
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. Social proof strip */}
      <Reveal>
        <div className={`${contentWell} border-t border-[#1E1E35]`}>
          <div className="flex flex-col gap-2 bg-[#0F0F1A] px-5 py-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#1E1E35]">
            <p className="text-[13px] text-[#C8C8D8]/75">
              <span className="font-semibold text-[#F0F0FF]">Living Silica</span>
              {" "}— DTC supplement brand, Shopify redesign, product page clarity improved
            </p>
            <Link
              href="/work/living-silica"
              className={`shrink-0 text-[12px] font-semibold text-[#7C3FFF] transition-colors duration-200 hover:text-[#00E5FF] ${focusRing} rounded-sm`}
            >
              View case study →
            </Link>
          </div>
        </div>
      </Reveal>

      {/* 4. Problem cards */}
      <section
        aria-labelledby="problem-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="problem-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            What we fix
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {problemCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-6">
                <h3 className="text-[0.9375rem] font-bold text-[#F0F0FF]">{card.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-[1.68] text-[#C8C8D8]/72">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. What we deliver */}
      <section
        aria-labelledby="deliver-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="deliver-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            What a proper Shopify build includes
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

      {/* 6. Who it's for */}
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

      {/* 7. Process */}
      <section
        aria-labelledby="process-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="process-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            How it works
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

      {/* 8. FAQ */}
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

      {/* 9. CTA slab */}
      <div className={`mt-10 ${slabBleed}`}>
        <section
          aria-labelledby="cta-shopify-heading"
          className={`${contentWell} px-4 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16`}
        >
          <div className={slabContent}>
            <Reveal>
              <h2
                id="cta-shopify-heading"
                className="max-w-2xl text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[var(--slab-fg,#F0F0FF)] sm:text-[2.125rem] md:text-[2.5rem]"
              >
                Ready to turn more visitors into buyers?
              </h2>
              <p className="mt-4 max-w-[50ch] text-[1rem] leading-[1.68] text-[var(--slab-muted,#C8C8D8)]/80">
                Tell us about your product and where the store is losing people. We&apos;ll come
                back with what we&apos;d fix and what it costs.
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
