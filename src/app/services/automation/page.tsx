import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "Business Automation & Integrations | VryntLab",
  description:
    "VryntLab connects your tools and automates repetitive work — CRM, booking, email, spreadsheets. Chicago-based. Free estimate.",
  alternates: {
    canonical: "https://vryntlab.com/services/automation",
  },
  openGraph: {
    title: "Business Automation & Integrations | VryntLab",
    description:
      "VryntLab connects your tools and automates repetitive work — CRM, booking, email, spreadsheets. Chicago-based. Free estimate.",
    url: "https://vryntlab.com/services/automation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Automation & Integrations | VryntLab",
    description:
      "VryntLab connects your tools and automates repetitive work — CRM, booking, email, spreadsheets. Chicago-based. Free estimate.",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Automation & Integrations",
    provider: { "@type": "Organization", name: "VryntLab" },
    areaServed: "Worldwide",
    url: "https://vryntlab.com/services/automation",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What tools can you automate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most common business tools — HubSpot, Salesforce, Google Sheets, Airtable, Calendly, Stripe, Slack, Gmail, Zapier, Make, and custom APIs. If it has an API, we can usually connect it.",
        },
      },
      {
        "@type": "Question",
        name: "How much does automation cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most automation projects run $450–$1,300. Simple one-step connections start lower; multi-step workflows with error handling and monitoring cost more.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to change the tools I already use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We work with what you have. The goal is connecting your existing tools, not replacing them.",
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
      { "@type": "ListItem", position: 3, name: "Automation", item: "https://vryntlab.com/services/automation" },
    ],
  },
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const problemCards = [
  {
    label: "Leads falling between systems",
    body: "Someone fills out your form. It goes to your email. You manually add it to the CRM. Then update the sheet. Then send the welcome email. Every single time.",
  },
  {
    label: "Hours spent on work a computer could do",
    body: "Copying data between tools, sending the same follow-up emails, updating records manually. This is not how you should be spending your time.",
  },
  {
    label: "Things get missed when it's all manual",
    body: "A lead doesn't get followed up. An invoice goes unsent. A booking confirmation never arrives. Manual processes fail silently.",
  },
];

const leftBullets = [
  "Lead capture → CRM sync — forms to HubSpot, Salesforce, Airtable, or Sheets automatically",
  "Booking → notification chains — calendar confirmed, Slack pinged, email sent, all without touching anything",
  "Invoice and payment triggers — Stripe events that update records and send receipts",
  "Cross-platform data sync — keep tools consistent without manual exports",
];

const rightBullets = [
  "Error handling and alerts — you know when something breaks before your customer does",
  "Zapier and Make workflows — visual, maintainable, not a black box",
  "Custom API connections — when no native integration exists",
  "Runbook on handoff — documented so you can manage it yourself",
];

const useCases = [
  {
    title: "Service businesses with booking",
    body: "Every booking should trigger a confirmation, a calendar update, and a CRM entry. Automatically.",
  },
  {
    title: "Sales teams",
    body: "Lead comes in, CRM updated, owner notified, follow-up sequence started. Without anyone touching it.",
  },
  {
    title: "E-commerce",
    body: "Order placed, inventory updated, fulfillment triggered, customer emailed. All connected.",
  },
  {
    title: "Agencies and studios",
    body: "Project created, Slack channel made, client onboarding started. One trigger, ten steps done.",
  },
  {
    title: "Healthcare and wellness",
    body: "Appointment booked, intake form sent, reminder scheduled. Fewer no-shows, less admin.",
  },
  {
    title: "Any business with repetitive manual work",
    body: "If you do the same sequence of steps every time something happens, we can automate it.",
  },
];

const steps = [
  {
    n: "01",
    title: "Map the manual work",
    body: "We document exactly what you do today, what triggers it, and what systems are involved. Most people underestimate how many steps their workflows have.",
  },
  {
    n: "02",
    title: "Build and test in stages",
    body: "You see each connection working before we chain them together. Easier to fix problems when you can see each step.",
  },
  {
    n: "03",
    title: "Hand off with documentation",
    body: "You get a plain-language runbook of what runs where. No dependency on us to maintain it.",
  },
];

export default function AutomationPage() {
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
          <li className="text-[#C8C8D8]">Automation</li>
        </ol>
      </nav>

      {/* 2. Hero */}
      <section
        aria-labelledby="automation-h1"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-14 md:py-16`}
      >
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
            <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
            Automation &amp; Integrations
          </p>
          <h1
            id="automation-h1"
            className="mt-5 max-w-3xl text-[2rem] font-black leading-[1.06] tracking-[-0.032em] text-[#F0F0FF] sm:text-[2.625rem] md:text-[3.125rem]"
          >
            Stop doing the same thing in three different places
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.68] text-[#C8C8D8]/80 sm:text-[1.0625rem]">
            We connect your tools so data moves automatically — no more copying leads from your form
            to your CRM, no more updating three spreadsheets when one booking comes in.
          </p>
          <div className="mt-8">
            <Link href="/#contact" className={primaryBtn}>
              Get a free estimate{" "}
              <span aria-hidden className="opacity-90">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* 3. Problem cards */}
      <section
        aria-labelledby="problems-heading"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-12`}
      >
        <Reveal>
          <h2
            id="problems-heading"
            className="text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]"
          >
            Where manual processes break down
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {problemCards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-6">
                <h3 className="text-[0.9375rem] font-bold text-[#F0F0FF]">{card.label}</h3>
                <p className="mt-3 text-[0.875rem] leading-[1.68] text-[#C8C8D8]/75">{card.body}</p>
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
            What automation work with VryntLab includes
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
          aria-labelledby="cta-automation-heading"
          className={`${contentWell} px-4 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16`}
        >
          <div className={slabContent}>
            <Reveal>
              <h2
                id="cta-automation-heading"
                className="max-w-2xl text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[var(--slab-fg,#F0F0FF)] sm:text-[2.125rem] md:text-[2.5rem]"
              >
                Tell us what you&apos;re doing manually
              </h2>
              <p className="mt-4 max-w-[50ch] text-[1rem] leading-[1.68] text-[var(--slab-muted,#C8C8D8)]/80">
                Describe the repetitive work — what triggers it, what tools are involved, and how
                often it happens. We&apos;ll tell you what&apos;s automatable and what it costs.
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
