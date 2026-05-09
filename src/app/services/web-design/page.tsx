import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "Web Design for Small Business | VryntLab",
  description:
    "VryntLab builds fast, clear websites for small businesses. Custom design, mobile-first, built to convert. Chicago-based studio. Free estimate.",
  alternates: {
    canonical: "https://vryntlab.com/services/web-design",
  },
  openGraph: {
    title: "Web Design for Small Business | VryntLab",
    description:
      "VryntLab builds fast, clear websites for small businesses. Custom design, mobile-first, built to convert. Chicago-based studio. Free estimate.",
    url: "https://vryntlab.com/services/web-design",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design for Small Business | VryntLab",
    description:
      "VryntLab builds fast, clear websites for small businesses. Custom design, mobile-first, built to convert. Chicago-based studio. Free estimate.",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Development for Small Business",
    provider: { "@type": "Organization", name: "VryntLab" },
    areaServed: "Worldwide",
    url: "https://vryntlab.com/services/web-design",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a small business website cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most small business websites from VryntLab run $500–$1,500. Simple 3–5 page sites start lower; custom design with integrations and SEO setup move toward the higher end.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most sites are live in 1–2 weeks from when we have your content and brand assets. Complex projects take longer — we scope it before we start.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to provide the content?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We can work with what you have or help you structure and write it. Most clients provide a rough brief and we shape it from there.",
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
      { "@type": "ListItem", position: 3, name: "Web Design", item: "https://vryntlab.com/services/web-design" },
    ],
  },
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const ghostBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full border border-[#1E1E35] bg-[#0F0F1A] px-8 text-[14px] font-semibold tracking-tight text-[#C8C8D8] transition-[border-color,transform] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:border-violet-500/40`;

const problemCards = [
  {
    title: "Looks fine but doesn't explain what you do",
    body: "Visitors land and can't immediately tell who you serve, what you offer, or what to do next. They leave. You never know they were there.",
  },
  {
    title: "Slow on phones",
    body: "Over 60% of small business website traffic is mobile. A site that loads in 4 seconds on a phone loses more than half its visitors before they read a word.",
  },
  {
    title: "No clear path to contact or book",
    body: "Good design guides people toward one action. Most small business sites bury the contact form, have too many options, or make it unclear what happens after you reach out.",
  },
];

const leftBullets = [
  "Clear messaging — visitors know what you do in the first 5 seconds",
  "Mobile-first layout — built for phones, looks great on desktop too",
  "Fast load times — compressed assets, clean code, nothing unnecessary",
  "One clear CTA — contact, book, or buy — not five competing options",
];

const rightBullets = [
  "SEO basics included — page titles, structure, and schema from day one",
  "Contact form or booking integration if you need it",
  "You own everything — Vercel, Netlify, or your own host",
  "Walkthrough on launch — you know what you have and how to update it",
];

const useCases = [
  {
    title: "New businesses",
    body: "You need a professional presence fast. We scope it lean, build it right, and get you live in weeks.",
  },
  {
    title: "Local service businesses",
    body: "Plumbers, cleaners, landscapers, contractors — sites built to get calls and bookings, not just look good.",
  },
  {
    title: "Consultants and freelancers",
    body: "Your work is your reputation. A site that reflects that quality and filters for the right clients.",
  },
  {
    title: "Restaurants and hospitality",
    body: "Menu, hours, reservations, location. Clear, fast, and easy to update when things change.",
  },
  {
    title: "Rebrand or refresh",
    body: "You've grown past your old site. We rebuild it around where you are now, not where you started.",
  },
  {
    title: "Businesses with no online presence",
    body: "Still running on word of mouth? We build the foundation that makes digital actually work for you.",
  },
];

const steps = [
  {
    n: "01",
    title: "Understand before we design",
    body: "We learn your business, your customers, and what success looks like. Every layout decision comes from that, not from trends.",
  },
  {
    n: "02",
    title: "Show you early, adjust cheaply",
    body: "You see the homepage and key pages before anything is final. Changes at this stage take hours, not days.",
  },
  {
    n: "03",
    title: "Launch and hand it over",
    body: "Clean deployment, a walkthrough of what we built, and how to manage it yourself. No black boxes.",
  },
];

export default function WebDesignPage() {
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
          <li className="text-[#C8C8D8]">Web Design</li>
        </ol>
      </nav>

      {/* 2. Hero */}
      <section
        aria-labelledby="webdesign-h1"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-14 md:py-16`}
      >
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
            <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
            Web Design &amp; Development
          </p>
          <h1
            id="webdesign-h1"
            className="mt-5 max-w-3xl text-[2rem] font-black leading-[1.06] tracking-[-0.032em] text-[#F0F0FF] sm:text-[2.625rem] md:text-[3.125rem]"
          >
            A website that works as hard as you do
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.68] text-[#C8C8D8]/80 sm:text-[1.0625rem]">
            We build fast, clear websites for small businesses — designed around your customers,
            not your preferences. Mobile-first, built to convert, ready in weeks not months.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#contact" className={primaryBtn}>
              Get a free estimate{" "}
              <span aria-hidden className="opacity-90">→</span>
            </Link>
            <Link href="/#work" className={ghostBtn}>
              See our work ↓
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. What most sites get wrong */}
      <section
        aria-labelledby="problem-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="problem-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            What most small business sites get wrong
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

      {/* 4. What we build */}
      <section
        aria-labelledby="deliver-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="deliver-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            What every VryntLab site includes
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
            Our process
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
          aria-labelledby="cta-webdesign-heading"
          className={`${contentWell} px-4 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16`}
        >
          <div className={slabContent}>
            <Reveal>
              <h2
                id="cta-webdesign-heading"
                className="max-w-2xl text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[var(--slab-fg,#F0F0FF)] sm:text-[2.125rem] md:text-[2.5rem]"
              >
                Let&apos;s build something that actually works
              </h2>
              <p className="mt-4 max-w-[50ch] text-[1rem] leading-[1.68] text-[var(--slab-muted,#C8C8D8)]/80">
                Tell us about your business, who you&apos;re trying to reach, and what your current
                site is missing. We&apos;ll come back with a clear scope and what it costs.
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
