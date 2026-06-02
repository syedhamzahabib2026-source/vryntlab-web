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

const post = getBlogPost("what-is-geo-generative-engine-optimization")!;

export const metadata = buildBlogPostMetadata(post);

const schemas = [
  buildBlogPostingSchema(post),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is GEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GEO stands for Generative Engine Optimization. It's the practice of making your content structured and clear enough that AI tools like ChatGPT, Perplexity, and Google AI Overviews cite your business when answering relevant questions.",
        },
      },
      {
        "@type": "Question",
        name: "Is GEO different from SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "They overlap significantly. Good SEO helps GEO. But GEO has additional requirements — structured data, clear entity definitions, and content written to be extracted rather than just read. A site optimized only for traditional search may still be invisible to AI engines.",
        },
      },
      {
        "@type": "Question",
        name: "Do small businesses need to worry about GEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, increasingly. AI-powered search is growing fast. Businesses that establish structured, citable content now will have an advantage as AI search becomes the default for more queries.",
        },
      },
    ],
  },
  buildBlogPostBreadcrumbSchema(post),
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const comparisonCards = [
  {
    label: "Traditional SEO",
    items: [
      { heading: "Goal", body: "Rank on Google search results page" },
      { heading: "Traffic comes from", body: "People clicking your link" },
      { heading: "What matters", body: "Keywords, backlinks, page authority" },
      { heading: "Output", body: "A blue link in a results list" },
    ],
  },
  {
    label: "GEO",
    items: [
      { heading: "Goal", body: "Get cited in AI-generated answers" },
      { heading: "Traffic comes from", body: "AI mentioning your business" },
      { heading: "What matters", body: "Structured data, clear entity signals, content written to be extracted" },
      { heading: "Output", body: "Your business name in an AI answer" },
    ],
  },
] as const;

const citationFactors = [
  {
    n: "1",
    title: "Structured data (schema markup)",
    body: "Schema markup is code that tells search engines and AI tools exactly what your page is about — is this a business? A service? A FAQ? An article? Without it, AI engines have to guess. With it, they can extract your business name, location, services, and phone number with confidence.",
    callout: "Every VryntLab site includes Organization, ProfessionalService, and WebSite schema as a baseline.",
  },
  {
    n: "2",
    title: "Clear entity definition",
    body: "An 'entity' in search terms is a real-world thing — a business, a person, a place, a service. AI engines build a model of what your entity is. Consistent name, address, and phone across your website, Google Business Profile, and other directories tells AI engines that you are a real, trustworthy business.",
    callout: "Inconsistent NAP (name, address, phone) across the web is one of the most common GEO problems — and one of the easiest to fix.",
  },
  {
    n: "3",
    title: "Content written to be extracted",
    body: "Traditional SEO content is written to persuade humans to read and convert. GEO content is also written so that an AI can extract a direct answer to a question. FAQ sections, clear headings, short declarative sentences, and factual specificity all help.",
    callout: "A page that clearly answers 'how much does a chatbot cost for a small business' is more likely to be cited by Perplexity than a page that talks vaguely about chatbot pricing.",
  },
] as const;

const actionBullets = [
  "Add schema markup to every page — at minimum Organization, Service, and BreadcrumbList",
  "Claim and fully complete your Google Business Profile — consistent with your website's name, address, and phone",
  "Create FAQ content that directly answers the questions your customers actually ask",
  "Get listed on credible directories — Clutch, G2, or industry-specific sites. These citations strengthen your entity.",
  "Write with specificity — AI engines trust content that makes concrete, verifiable claims over vague marketing copy",
];

export default function WhatIsGeoPage() {
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
            <li className="text-[#C8C8D8]">What Is GEO</li>
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
              What Is GEO? (And Why Small Businesses Should Pay Attention)
            </h1>
          </Reveal>

          {/* Intro */}
          <Reveal delay={0.06}>
            <div className="mt-8 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                A few years ago, SEO meant one thing: get your website ranking on Google. That&apos;s
                still important. But there&apos;s a new layer of search that most small businesses
                aren&apos;t thinking about yet — and it&apos;s growing fast.
              </p>
              <p>
                It&apos;s called GEO. Generative Engine Optimization. Here&apos;s what it is, how
                it works, and what you should actually do about it.
              </p>
            </div>
          </Reveal>

          {/* H2: What is GEO */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              What is GEO?
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                GEO stands for Generative Engine Optimization. It&apos;s the practice of making
                your content discoverable and citable by AI-powered answer engines — tools like
                ChatGPT, Perplexity, Claude, and Google&apos;s AI Overviews.
              </p>
              <p>
                When someone types &ldquo;best accountant in Chicago&rdquo; into Perplexity or
                asks ChatGPT &ldquo;what should I look for in a web designer&rdquo;, these tools
                pull from the web and generate a direct answer. The businesses and content they
                cite get the visibility. The ones they don&apos;t cite are invisible — even if
                they rank on Google.
              </p>
            </div>
          </Reveal>

          {/* H2: How is it different from SEO */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              How is it different from SEO?
            </h2>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {comparisonCards.map((card, ci) => (
              <Reveal key={card.label} delay={ci * 0.08}>
                <div className="rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-5">
                  <h3 className="text-[0.9375rem] font-bold text-[#F0F0FF]">{card.label}</h3>
                  <ul className="mt-4 space-y-3">
                    {card.items.map((item) => (
                      <li key={item.heading}>
                        <span className="text-[0.8125rem] font-semibold uppercase tracking-wide text-[#7C3FFF]/80">
                          {item.heading}
                        </span>
                        <p className="mt-0.5 text-[0.875rem] leading-[1.55] text-[#C8C8D8]/75">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <p className="mt-6 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              The good news: most solid SEO work also helps GEO. The bad news: doing SEO without
              GEO in mind leaves gaps that AI engines exploit. A site with keyword-heavy copy but
              no schema markup or clear entity definition is optimized for 2020 search, not 2026.
            </p>
          </Reveal>

          {/* H2: What makes AI engines cite something */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              What makes AI engines cite something?
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-5 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              AI engines pull from sources they can understand and trust. Three things matter most:
            </p>
          </Reveal>

          <div className="mt-8 space-y-8">
            {citationFactors.map((factor, i) => (
              <Reveal key={factor.n} delay={i * 0.08}>
                <div className="border-l-2 border-[#7C3FFF]/30 pl-5">
                  <p className="font-mono text-[11px] font-bold tracking-widest text-[#7C3FFF]/55">
                    {factor.n}
                  </p>
                  <h3 className="mt-2 text-[1rem] font-bold text-[#F0F0FF]">{factor.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.68] text-[#C8C8D8]/80">
                    {factor.body}
                  </p>
                  <div className="mt-4 rounded-xl border-l-4 border-[#7C3FFF] bg-[#0F0F1A] px-4 py-3 ring-1 ring-[#1E1E35]">
                    <p className="text-[0.875rem] leading-[1.6] text-[#C8C8D8]/75 italic">
                      {factor.callout}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* H2: What should small businesses actually do */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              What should small businesses actually do?
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-5 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              You don&apos;t need to rebuild everything. Most of GEO is about layering the right
              signals onto work you&apos;re already doing.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-6 space-y-4">
              {actionBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3FFF]"
                    aria-hidden
                  />
                  <span className="text-[0.9375rem] leading-[1.68] text-[#C8C8D8]/80">{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* H2: The window is still open */}
          <Reveal delay={0.04}>
            <h2 className="mt-12 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              The window is still open
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                Most small businesses haven&apos;t started thinking about GEO yet. The agencies
                that serve them haven&apos;t either. That makes right now a good time to establish
                the signals — before everyone else catches up and the advantage disappears.
              </p>
              <p>
                If you&apos;re working with VryntLab on SEO, GEO is already part of the scope.
                Schema markup, entity consistency, and structured content are built into every
                site we deliver.
              </p>
            </div>
          </Reveal>

          {/* CTA box */}
          <Reveal delay={0.06}>
            <div className="mt-10 rounded-2xl border-l-4 border-[#7C3FFF] bg-[#0F0F1A] p-6 ring-1 ring-[#1E1E35]">
              <p className="text-[1rem] font-bold text-[#F0F0FF]">
                Want GEO built into your site?
              </p>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-[#C8C8D8]/75">
                Tell us what you&apos;re working with. We&apos;ll assess what signals are missing
                and what it would take to add them.
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
