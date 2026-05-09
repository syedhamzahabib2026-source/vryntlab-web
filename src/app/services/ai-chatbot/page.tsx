import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "AI Chatbot for Small Business | VryntLab",
  description:
    "VryntLab builds custom AI chatbots for small businesses. Trained on your services, answers real questions, captures leads 24/7. Chicago-based. Get a free estimate.",
  alternates: {
    canonical: "https://vryntlab.com/services/ai-chatbot",
  },
  openGraph: {
    title: "AI Chatbot for Small Business | VryntLab",
    description:
      "VryntLab builds custom AI chatbots for small businesses. Trained on your services, answers real questions, captures leads 24/7. Chicago-based. Get a free estimate.",
    url: "https://vryntlab.com/services/ai-chatbot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot for Small Business | VryntLab",
    description:
      "VryntLab builds custom AI chatbots for small businesses. Trained on your services, answers real questions, captures leads 24/7. Chicago-based. Get a free estimate.",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Chatbot Development",
    provider: { "@type": "Organization", name: "VryntLab" },
    areaServed: "Worldwide",
    url: "https://vryntlab.com/services/ai-chatbot",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does an AI chatbot cost for a small business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most small business chatbots from VryntLab range from $200–$600 depending on complexity. Simple FAQ bots start lower; ones with lead capture and CRM integration cost more.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to set up?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually 48–72 hours from when we have your business information. We handle training, setup, and installation.",
        },
      },
      {
        "@type": "Question",
        name: "Will it work on my existing website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We install it on any website — WordPress, Shopify, Squarespace, custom HTML, or Next.js — with one line of code.",
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
      { "@type": "ListItem", position: 3, name: "AI Chatbot", item: "https://vryntlab.com/services/ai-chatbot" },
    ],
  },
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const ghostBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full border border-[#1E1E35] bg-[#0F0F1A] px-8 text-[14px] font-semibold tracking-tight text-[#C8C8D8] transition-[border-color,transform] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:border-violet-500/40`;

const problemCards = [
  {
    title: "Visitors leave without answers",
    body: "Someone lands at 11pm with a question about your services. Your phone number is closed. They go to the next result.",
  },
  {
    title: "The same 10 questions, over and over",
    body: "Hours, pricing, availability, what's included. Your inbox is full of questions your site should already answer.",
  },
  {
    title: "No way to know who was interested",
    body: "Visitors browse and leave. No name, no email, no record of what they were looking for.",
  },
];

const useCases = [
  {
    title: "Local service businesses",
    sub: "Plumbers, cleaners, contractors",
    body: "Answers \"how much does X cost\" and books callbacks while you're on a job.",
  },
  {
    title: "Restaurants and cafes",
    sub: "",
    body: "Handles hours, menu questions, and reservations without you checking your phone.",
  },
  {
    title: "Consultants and coaches",
    sub: "",
    body: "Pre-qualifies leads and collects project details before your call.",
  },
  {
    title: "E-commerce stores",
    sub: "",
    body: "Answers product questions, handles returns policy, and reduces support load.",
  },
  {
    title: "Healthcare and wellness",
    sub: "",
    body: "Handles scheduling questions and insurance FAQs without back-and-forth.",
  },
  {
    title: "Any business with a FAQ problem",
    sub: "",
    body: "If you answer the same 5 questions every day, a chatbot can handle them.",
  },
];

const steps = [
  {
    n: "01",
    title: "We learn your business",
    body: "You share your services, pricing, FAQs, and tone. We handle the rest.",
  },
  {
    n: "02",
    title: "We build and train it",
    body: "Usually 48–72 hours. You review it before it goes live.",
  },
  {
    n: "03",
    title: "It goes live on your site",
    body: "One line of code. Works on any platform. You get an email every time a lead comes through.",
  },
];

const solutionBullets = [
  "Trained on your pages, services, and FAQs",
  "Captures name, email, and what they need",
  "Works on any website in under 5 minutes",
  "You get an email when a real lead comes through",
];

export default function AiChatbotPage() {
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
          <li className="text-[#C8C8D8]">AI Chatbot</li>
        </ol>
      </nav>

      {/* 2. Hero */}
      <section
        aria-labelledby="chatbot-h1"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-14 md:py-16`}
      >
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
            <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
            AI Chatbots
          </p>
          <h1
            id="chatbot-h1"
            className="mt-5 max-w-3xl text-[2rem] font-black leading-[1.06] tracking-[-0.032em] text-[#F0F0FF] sm:text-[2.625rem] md:text-[3.125rem]"
          >
            Your site should answer questions at 2am — not just show your phone number
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.68] text-[#C8C8D8]/80 sm:text-[1.0625rem]">
            We build AI chatbots trained on your actual business. Visitors get real answers about
            your services, pricing, and availability — and serious leads route to your inbox
            automatically.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#contact" className={primaryBtn}>
              Get a free estimate{" "}
              <span aria-hidden className="opacity-90">→</span>
            </Link>
            <Link href="#how-it-works" className={ghostBtn}>
              See how it works ↓
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. Problem */}
      <section
        aria-labelledby="problem-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="problem-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            Most small business sites lose leads after hours
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

      {/* 4. Solution */}
      <section
        id="solution"
        aria-labelledby="solution-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="solution-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            A chatbot trained on your business, not a generic FAQ
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <Reveal delay={0.05}>
            <p className="text-[0.9375rem] leading-[1.72] text-[#C8C8D8]/80 sm:text-[1rem]">
              We build and train the assistant on your actual services, pricing, and common
              questions. It answers in your tone — not robotic, not generic. When someone is ready
              to book or buy, it captures their details and sends them straight to you.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="space-y-4">
              {solutionBullets.map((bullet) => (
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

      {/* 5. Use cases */}
      <section
        aria-labelledby="usecases-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="usecases-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            Who it works well for
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {useCases.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 0.06}>
              <div className="rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-5 sm:p-6">
                <p className="text-[0.9375rem] font-bold text-[#F0F0FF]">{uc.title}</p>
                {uc.sub && (
                  <p className="mt-0.5 text-[12px] font-medium text-[#7C3FFF]/80">{uc.sub}</p>
                )}
                <p className="mt-2.5 text-[0.875rem] leading-[1.68] text-[#C8C8D8]/72">{uc.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. Process */}
      <section
        id="how-it-works"
        aria-labelledby="process-heading"
        className={`${contentWell} scroll-mt-24 border-t border-[#1E1E35] py-10 sm:py-12`}
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
          aria-labelledby="cta-chatbot-heading"
          className={`${contentWell} px-4 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16`}
        >
          <div className={slabContent}>
            <Reveal>
              <h2
                id="cta-chatbot-heading"
                className="max-w-2xl text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[var(--slab-fg,#F0F0FF)] sm:text-[2.125rem] md:text-[2.5rem]"
              >
                Ready to stop losing after-hours leads?
              </h2>
              <p className="mt-4 max-w-[50ch] text-[1rem] leading-[1.68] text-[var(--slab-muted,#C8C8D8)]/80">
                Tell us about your business and we&apos;ll show you what the chatbot would look
                like. Free estimate, no commitment.
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
