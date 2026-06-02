import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import {
  buildBlogPostBreadcrumbSchema,
  buildBlogPostingSchema,
  buildBlogPostMetadata,
  getBlogPost,
} from "@/lib/blog-posts";
import { FaqAccordion } from "./FaqAccordion";

const post = getBlogPost("how-much-does-a-website-cost")!;

export const metadata = buildBlogPostMetadata(post);

const schemas = [
  buildBlogPostingSchema(post),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a basic small business website cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A basic small business website typically costs $500–$2,000 when built by a freelancer or small studio. DIY builders like Squarespace run $16–$49/month but require your own time.",
        },
      },
      {
        "@type": "Question",
        name: "What affects the cost of a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Number of pages, custom design vs template, integrations like booking or e-commerce, SEO setup, and ongoing maintenance all affect price.",
        },
      },
      {
        "@type": "Question",
        name: "Is a cheaper website worth it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on your goal. If the site is meant to win customers, a cheap site that loses trust or loads slowly costs more in missed business than the savings.",
        },
      },
    ],
  },
  buildBlogPostBreadcrumbSchema(post),
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const optionCards = [
  {
    label: "DIY website builders (Squarespace, Wix, Webflow)",
    cost: "$0–$50/month",
    body: "You build it yourself using templates. Low upfront cost, but it takes real time to do well. Most DIY sites look generic and convert poorly because the layout decisions are left to someone with no design training. Good for side projects and very early-stage businesses.",
    take: "If your business depends on the site winning customers, a DIY builder usually isn't enough.",
  },
  {
    label: "Freelancer",
    cost: "$300–$2,500",
    body: "A solo developer or designer builds the site for you. Quality varies enormously — a great freelancer is excellent value; a bad one can cost you twice when you hire someone to fix it. Vet carefully, ask for live references, not just screenshots.",
    take: "Best value when you find the right person. Riskier than an agency but usually faster and cheaper.",
  },
  {
    label: "Small studio (like VryntLab)",
    cost: "$500–$3,000",
    body: "A small team handles strategy, design, and build together. You get professional output without agency overhead. Scope is agreed upfront. You work directly with the people building it.",
    take: "The sweet spot for most small businesses — professional result without paying for a large team's operating costs.",
  },
  {
    label: "Full-service agency",
    cost: "$5,000–$50,000+",
    body: "Large teams, long timelines, detailed discovery processes. Makes sense for enterprise or complex projects. Usually overkill for a small business that needs a marketing site or Shopify store.",
    take: "You're paying for their overhead. Only worth it if the project genuinely needs that level of resourcing.",
  },
] as const;

const pricingFactors = [
  {
    label: "Number of pages",
    body: "A 3-page site costs less than a 12-page one. Most small businesses need: home, about, services, contact. That's it.",
  },
  {
    label: "Custom design vs template",
    body: "A fully custom design from scratch costs more. A strong customization of a quality template is often indistinguishable and costs 30–50% less.",
  },
  {
    label: "E-commerce",
    body: "Adding Shopify or WooCommerce adds complexity. Product pages, checkout, payment setup, inventory. Budget an extra $300–$800 for a basic setup.",
  },
  {
    label: "Booking and forms",
    body: "A simple contact form is cheap. A full booking system with calendar sync and email automation adds $150–$500.",
  },
  {
    label: "SEO setup",
    body: "Basic on-page SEO should be included in any professional build. A separate SEO retainer or deep audit is additional.",
  },
  {
    label: "Ongoing maintenance",
    body: "Hosting runs $10–$30/month. Updates and small changes either cost hourly or are included in a support plan.",
  },
] as const;

const vryntlabPricing = [
  ["Simple marketing site", "$500–$1,200"],
  ["Shopify or e-commerce store", "$500–$1,500"],
  ["Site with booking system", "$700–$1,500"],
  ["Custom web app or tool", "quoted by scope"],
] as const;

export default function WebsiteCostPage() {
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
            <li aria-hidden className="select-none">/</li>
            <li className="text-[#C8C8D8]">How Much Does a Website Cost</li>
          </ol>
        </nav>

        {/* Article */}
        <article className="border-t border-[#1E1E35] py-10 sm:py-12">

          {/* Eyebrow + H1 */}
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
              <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
              VryntLab · May 2026
            </p>
            <h1 className="mt-5 text-[1.875rem] font-black leading-[1.08] tracking-[-0.03em] text-[#F0F0FF] sm:text-[2.375rem]">
              How Much Does a Small Business Website Cost in 2026?
            </h1>
          </Reveal>

          {/* Intro */}
          <Reveal delay={0.06}>
            <div className="mt-8 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                If you&apos;ve asked anyone recently, you&apos;ve probably gotten answers anywhere
                from $200 to $20,000. Both are technically correct. The real answer depends on what
                you actually need — and who builds it.
              </p>
              <p>
                This breakdown covers the main options, what drives cost up or down, and what a
                small business in 2026 realistically needs to spend to get a site that actually
                works.
              </p>
            </div>
          </Reveal>

          {/* Section: Four ways */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              The four ways to get a website built
            </h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {optionCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.07}>
                <div className="rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-[0.9375rem] font-bold text-[#F0F0FF]">{card.label}</h3>
                    <span className="shrink-0 rounded-full bg-[#7C3FFF]/15 px-3 py-0.5 font-mono text-[11px] font-semibold text-[#7C3FFF]">
                      {card.cost}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.875rem] leading-[1.68] text-[#C8C8D8]/75">{card.body}</p>
                  <p className="mt-3 text-[0.875rem] italic leading-[1.6] text-[#8888a8]">
                    {card.take}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Section: What affects price */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              What actually affects the price
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-6 space-y-5">
              {pricingFactors.map((factor) => (
                <li key={factor.label} className="flex items-start gap-3">
                  <span
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3FFF]"
                    aria-hidden
                  />
                  <span className="text-[0.9375rem] leading-[1.68] text-[#C8C8D8]/80">
                    <strong className="font-semibold text-[#F0F0FF]">{factor.label}</strong>
                    {" — "}
                    {factor.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Section: What do you actually need */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              What does a small business actually need?
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                For most local businesses and service providers, the honest answer is: a clear
                homepage, a services page, an about page, and a contact form. Mobile-friendly,
                fast-loading, and structured so Google can read it.
              </p>
              <p>
                That site, built well, costs $500–$1,500 from a freelancer or small studio. If you
                add e-commerce or booking, budget $800–$2,000. You don&apos;t need more than that
                to compete online.
              </p>
            </div>
          </Reveal>

          {/* Section: Cost of a bad website */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              The cost of a bad website
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                A $300 website that loads slowly, looks untrustworthy, and doesn&apos;t explain
                your offer isn&apos;t saving you money — it&apos;s costing you customers. Every
                visitor who bounces because the site looks amateur is a lead you paid for through
                ads or SEO that you didn&apos;t convert.
              </p>
              <p>
                The question isn&apos;t &ldquo;how cheap can I get a website.&rdquo; It&apos;s
                &ldquo;what does it cost me to have a site that doesn&apos;t work.&rdquo;
              </p>
            </div>
          </Reveal>

          {/* Section: What VryntLab charges */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              What VryntLab charges
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>We&apos;re a small Chicago-based studio. Our projects typically run:</p>
              <ul className="space-y-2.5 pl-1">
                {vryntlabPricing.map(([item, price]) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3FFF]"
                      aria-hidden
                    />
                    <span>
                      <strong className="font-semibold text-[#F0F0FF]">{item}</strong>
                      {" — "}
                      {price}
                    </span>
                  </li>
                ))}
              </ul>
              <p>We scope everything in writing before work starts. No surprises.</p>
              <p>
                If you want a straight answer on what your project would cost, the fastest way is
                to describe it in the form below.
              </p>
            </div>
          </Reveal>

          {/* CTA box */}
          <Reveal delay={0.06}>
            <div className="mt-10 rounded-2xl border-l-4 border-[#7C3FFF] bg-[#0F0F1A] p-6 ring-1 ring-[#1E1E35]">
              <p className="text-[1rem] font-bold text-[#F0F0FF]">
                Get a straight answer on what your site would cost
              </p>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-[#C8C8D8]/75">
                Describe what you need — we&apos;ll come back with a clear scope and number. No
                commitment required.
              </p>
              <div className="mt-5">
                <Link href="/#contact" className={primaryBtn}>
                  Get a free estimate{" "}
                  <span aria-hidden className="opacity-90">→</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* FAQ */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              Common questions
            </h2>
          </Reveal>

          <div className="mt-6 pb-10">
            <FaqAccordion />
          </div>

        </article>
      </div>
    </div>
  );
}
