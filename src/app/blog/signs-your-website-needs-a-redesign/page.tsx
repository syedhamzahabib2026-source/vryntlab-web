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

const post = getBlogPost("signs-your-website-needs-a-redesign")!;

export const metadata = buildBlogPostMetadata(post);

const schemas = [
  buildBlogPostingSchema(post),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How often should you redesign your website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most small business websites need a meaningful update every 2–3 years. Technology, design standards, and your own business change faster than most people realize.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a website redesign cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most small business redesigns run $500–$1,500 with a small studio. The cost depends on how many pages need rebuilding and whether you're adding new features like booking or e-commerce.",
        },
      },
      {
        "@type": "Question",
        name: "Can I just update my existing site instead?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sometimes yes. If the structure and messaging are sound and only the visuals are dated, a refresh costs less than a full rebuild. We'll tell you honestly which one you need.",
        },
      },
    ],
  },
  buildBlogPostBreadcrumbSchema(post),
];

const primaryBtn =
  `inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-8 text-[14px] font-semibold tracking-tight text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.5)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[0_0_44px_-6px_rgba(124,63,255,0.65)]`;

const signs = [
  {
    n: "1",
    title: "It looks embarrassing on your phone",
    body: [
      "Over 60% of web traffic is mobile. If your site requires pinching, zooming, or sideways scrolling on a phone, every mobile visitor is having a bad first impression. It's not just a usability problem — Google ranks mobile-friendly sites higher, so a bad mobile experience hurts your search visibility too.",
    ],
    todo: "Test your site on a phone you don't use daily. If it feels painful, it needs fixing. A mobile-first rebuild fixes both the experience and the SEO.",
  },
  {
    n: "2",
    title: "Visitors can't tell what you do",
    body: [
      "Read your homepage headline. Does it clearly say who you serve and what you help them with? Or is it something vague like 'Solutions for your business' or your company name in large letters?",
      "Most visitors decide whether to stay or leave within 5 seconds. If they can't immediately understand what you do and whether it's relevant to them, they leave.",
    ],
    todo: "Your headline should answer: what do you do, for who, and why should they care. If it doesn't, that's the first thing to fix.",
  },
  {
    n: "3",
    title: "It loads slowly",
    body: [
      "A one-second delay in page load time reduces conversions by 7%. A site that takes 4 seconds to load on mobile loses more than half its visitors before they read anything.",
      "Slow sites are usually the result of uncompressed images, bloated plugins, cheap hosting, or all three. None of these are hard to fix — they just require someone to actually look.",
    ],
    todo: "Run your site through PageSpeed Insights (free, from Google). A score below 50 on mobile means you're losing customers to load time.",
  },
  {
    n: "4",
    title: "You're embarrassed to share the link",
    body: [
      "This is the most honest test. If someone asks for your website and you feel the need to pre-explain it — 'it's a bit outdated' or 'we're working on a new one' — your site is costing you credibility before the conversation even starts.",
      "A business's website is its first impression for most new customers. If you wouldn't hand someone a physical brochure that looked like your current website, the site needs work.",
    ],
    todo: "Ask three people who don't know your business to spend 30 seconds on your homepage and tell you what you do. Their answers will tell you everything.",
  },
  {
    n: "5",
    title: "You can't update it yourself",
    body: [
      "If making a simple change — updating a price, adding a new service, fixing a typo — requires emailing a developer and waiting, your site has a dependency problem.",
      "This isn't just inconvenient. It means your site gets stale because updates are too much friction. Outdated information on a site erodes trust faster than most business owners realize.",
    ],
    todo: "A modern CMS or a well-built static site should let you update basic content yourself. If yours doesn't, rebuild it on something that does.",
  },
  {
    n: "6",
    title: "It doesn't have a clear call to action",
    body: [
      "What do you want visitors to do? Book an appointment? Call you? Fill out a form? If your site doesn't make one of those things obviously easy to do, visitors will drift and leave.",
      "Many small business sites have four or five competing CTAs, or none at all. Both are equally bad. One clear, well-placed action outperforms a cluttered page every time.",
    ],
    todo: "Pick the one thing you most want visitors to do. Make sure it's visible without scrolling on both desktop and mobile. Remove anything that competes with it.",
  },
  {
    n: "7",
    title: "It was built more than 3 years ago and nothing has changed",
    body: [
      "Web design standards, user expectations, and technical requirements move fast. A site that was great in 2021 may look dated in 2024 and be technically broken by 2026 — outdated plugins, deprecated code, or hosting that no longer meets modern standards.",
      "The design refresh is the visible part. But the technical debt underneath an old site is often the more serious problem — slow load times, security vulnerabilities, and SEO signals that have degraded over time.",
    ],
    todo: "If your site is over 3 years old with no meaningful updates, get a professional review. The cost of fixing problems early is always lower than the cost of the leads you lost while waiting.",
  },
] as const;

export default function RedesignSignsPage() {
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
            <li className="text-[#C8C8D8]">Signs Your Website Needs a Redesign</li>
          </ol>
        </nav>

        <article className="border-t border-[#1E1E35] py-10 sm:py-12">

          {/* Eyebrow + H1 */}
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#7C3FFF]">
              <span className="h-px w-8 bg-[#7C3FFF]" aria-hidden />
              VryntLab · May 2026
            </p>
            <h1 className="mt-5 text-[1.875rem] font-black leading-[1.08] tracking-[-0.03em] text-[#F0F0FF] sm:text-[2.375rem]">
              7 Signs Your Website Needs a Redesign
            </h1>
          </Reveal>

          {/* Intro */}
          <Reveal delay={0.06}>
            <div className="mt-8 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                Most business owners know their website isn&apos;t great. What they&apos;re less
                sure about is whether it&apos;s bad enough to warrant rebuilding — or whether
                it&apos;s actually costing them customers.
              </p>
              <p>Here are seven signs that the answer is yes.</p>
            </div>
          </Reveal>

          {/* Signs */}
          <div className="mt-10 space-y-12">
            {signs.map((sign, i) => (
              <Reveal key={sign.n} delay={i * 0.04}>
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="shrink-0 font-mono text-[2rem] font-black leading-none text-[#7C3FFF]/25 sm:text-[2.5rem]">
                      {sign.n}
                    </span>
                    <h2 className="text-[1.125rem] font-bold tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.25rem]">
                      {sign.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
                    {sign.body.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border-l-4 border-[#7C3FFF] bg-[#0F0F1A] px-5 py-4 ring-1 ring-[#1E1E35]">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7C3FFF]/70">
                      What to do about it
                    </p>
                    <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-[#C8C8D8]/80">
                      {sign.todo}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closing */}
          <Reveal delay={0.04}>
            <h2 className="mt-14 text-[1.375rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.625rem]">
              What to do next
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-[#C8C8D8]/80">
              <p>
                If you recognized two or more of these signs, your site is likely costing you
                customers. The good news is none of them are expensive to fix — and fixing them
                doesn&apos;t always mean a full rebuild.
              </p>
              <p>
                Describe what you&apos;re working with and what feels broken. We&apos;ll tell you
                honestly what needs to change and what it costs.
              </p>
            </div>
          </Reveal>

          {/* CTA box */}
          <Reveal delay={0.06}>
            <div className="mt-10 rounded-2xl border-l-4 border-[#7C3FFF] bg-[#0F0F1A] p-6 ring-1 ring-[#1E1E35]">
              <p className="text-[1rem] font-bold text-[#F0F0FF]">
                Get a straight answer on what your site needs
              </p>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-[#C8C8D8]/75">
                No pitch, no fluff. Tell us the site and the problems — we&apos;ll come back with
                what we&apos;d fix.
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
