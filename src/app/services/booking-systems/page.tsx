import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "Booking Systems & Online Scheduling | VryntLab",
  description:
    "VryntLab builds booking systems and intake forms for small businesses. Calendar sync, automated reminders, fewer no-shows. Free estimate.",
  alternates: {
    canonical: "https://vryntlab.com/services/booking-systems",
  },
  openGraph: {
    title: "Booking Systems & Online Scheduling | VryntLab",
    description:
      "VryntLab builds booking systems and intake forms for small businesses. Calendar sync, automated reminders, fewer no-shows. Free estimate.",
    url: "https://vryntlab.com/services/booking-systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Systems & Online Scheduling | VryntLab",
    description:
      "VryntLab builds booking systems and intake forms for small businesses. Calendar sync, automated reminders, fewer no-shows. Free estimate.",
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Booking Systems & Online Scheduling",
    provider: { "@type": "Organization", name: "VryntLab" },
    areaServed: "Worldwide",
    url: "https://vryntlab.com/services/booking-systems",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a booking system cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most booking system builds from VryntLab run $150–$500. Simple calendar integrations start lower; custom intake flows with CRM sync and automated reminders cost more.",
        },
      },
      {
        "@type": "Question",
        name: "What booking platforms do you work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calendly, Acuity, Cal.com, Google Calendar, and custom-built solutions depending on your needs and existing tools.",
        },
      },
      {
        "@type": "Question",
        name: "Can you connect the booking system to my CRM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We commonly connect booking to HubSpot, Salesforce, Airtable, or Google Sheets so every booking becomes a lead record automatically.",
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
      { "@type": "ListItem", position: 3, name: "Booking Systems", item: "https://vryntlab.com/services/booking-systems" },
    ],
  },
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const problemCards = [
  {
    label: "Booking is a back-and-forth email chain",
    body: "Customer asks about availability. You check the calendar. You suggest a time. They can't do it. You suggest another. Three days later, you have a booking — or they went elsewhere.",
  },
  {
    label: "No-shows cost you real money",
    body: "Without automated reminders, no-show rates for service businesses average 10–15%. A simple reminder sequence cuts that in half.",
  },
  {
    label: "New bookings don't connect to anything",
    body: "The booking comes in, sits in an email, and someone manually copies it to the spreadsheet. Or forgets to. Or copies it wrong.",
  },
];

const leftBullets = [
  "Online calendar — clients book directly, no back-and-forth",
  "Automated confirmations — instant email or SMS on booking",
  "Reminder sequences — 24h and 1h before, no-shows drop significantly",
  "Intake forms — collect what you need before the appointment",
];

const rightBullets = [
  "CRM sync — every booking becomes a contact record automatically",
  "Payment collection — deposit or full payment at booking if needed",
  "Buffer and availability rules — no double-booking, travel time respected",
  "Mobile-friendly — clients book on their phone in under a minute",
];

const useCases = [
  {
    title: "Healthcare and wellness",
    body: "Therapists, physios, personal trainers, massage therapists — appointment-based businesses that need reliable scheduling.",
  },
  {
    title: "Salons and beauty",
    body: "Hair, nails, lashes, aesthetics. Multiple staff, multiple services, one clean booking page.",
  },
  {
    title: "Consultants and coaches",
    body: "Discovery calls, strategy sessions, follow-ups. Booked without your inbox involved.",
  },
  {
    title: "Home services",
    body: "Cleaners, landscapers, inspectors. Booking with job details collected upfront, calendar synced.",
  },
  {
    title: "Legal and financial",
    body: "Initial consultations booked online, intake form completed before the call, CRM updated automatically.",
  },
  {
    title: "Any appointment-based business",
    body: "If you take bookings by phone or email, we can move that online in under a week.",
  },
];

const steps = [
  {
    n: "01",
    title: "Understand your current flow",
    body: "How bookings come in today, what information you need, and what happens after. We design around your actual process.",
  },
  {
    n: "02",
    title: "Build, connect, and test",
    body: "Calendar set up, integrations connected, reminders tested end-to-end before anything goes live.",
  },
  {
    n: "03",
    title: "Live in under a week",
    body: "Most booking systems are live in 3–5 days. You get a walkthrough and the login — it's yours.",
  },
];

export default function BookingSystemsPage() {
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
          <li className="text-[#C8C8D8]">Booking Systems</li>
        </ol>
      </nav>

      {/* 2. Hero */}
      <section
        aria-labelledby="booking-h1"
        className={`${contentWell} border-t border-[#1E1E35] py-10 sm:py-14 md:py-16`}
      >
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
            <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
            Booking Systems &amp; Forms
          </p>
          <h1
            id="booking-h1"
            className="mt-5 max-w-3xl text-[2rem] font-black leading-[1.06] tracking-[-0.032em] text-[#F0F0FF] sm:text-[2.625rem] md:text-[3.125rem]"
          >
            Let customers book without calling you
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.68] text-[#C8C8D8]/80 sm:text-[1.0625rem]">
            We build booking systems and intake forms that work while you&apos;re busy — calendar
            synced, reminders automated, new bookings in your CRM without anyone touching anything.
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
            The cost of manual scheduling
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
            What a proper booking setup includes
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
          aria-labelledby="cta-booking-heading"
          className={`${contentWell} px-4 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16`}
        >
          <div className={slabContent}>
            <Reveal>
              <h2
                id="cta-booking-heading"
                className="max-w-2xl text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[var(--slab-fg,#F0F0FF)] sm:text-[2.125rem] md:text-[2.5rem]"
              >
                Ready to stop scheduling manually?
              </h2>
              <p className="mt-4 max-w-[50ch] text-[1rem] leading-[1.68] text-[var(--slab-muted,#C8C8D8)]/80">
                Tell us how bookings work today and what&apos;s frustrating about it. We&apos;ll
                come back with what we&apos;d build and what it costs.
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
