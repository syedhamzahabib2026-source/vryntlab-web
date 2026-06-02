import type { Metadata } from "next";
import { contentWell } from "@/components/layout/layoutTokens";

export const metadata: Metadata = {
  title: "Disclaimer | VryntLab",
  description:
    "Limitations and clarifications on VryntLab website content, AI chatbot responses, and service outcomes.",
  robots: { index: false, follow: false },
};

const linkClass =
  "font-medium text-[#C8C8D8] underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current";

export default function DisclaimerPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header
        className={`${contentWell} border-b border-[var(--border)] pb-8 pt-6 sm:pb-10 sm:pt-8`}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Last updated: June 2, 2026
        </p>
        <h1 className="font-display text-balance text-[1.75rem] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] sm:text-[2rem]">
          Disclaimer
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-zinc-400">
          The limits of what VryntLab&apos;s website content, chatbot, and services can be relied
          upon for.
        </p>
      </header>

      <div className={`${contentWell} py-10 sm:py-12`}>
        <div className="max-w-2xl space-y-10">

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              1. Website Content Is Informational Only
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              The content on vryntlab.com — including blog posts, service descriptions, process
              explanations, and example outcomes — is provided for informational purposes only. It
              does not constitute professional advice and should not be the sole basis for any
              business decision.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">2. AI Chatbot Responses</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              The chat widget on this site is powered by an AI language model. Responses are:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>
                <strong className="font-semibold text-[#C8C8D8]">Automatically generated</strong> and
                may contain errors, outdated information, or misunderstandings specific to your
                situation
              </li>
              <li>
                <strong className="font-semibold text-[#C8C8D8]">Not reviewed by a human</strong>{" "}
                before being delivered to you
              </li>
              <li>
                <strong className="font-semibold text-[#C8C8D8]">Not authoritative</strong> — for
                firm pricing, scope, or process answers, contact us at{" "}
                <a href="mailto:hello@vryntlab.com" className={linkClass}>
                  hello@vryntlab.com
                </a>
              </li>
            </ul>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Do not share sensitive information — passwords, financial data, or personal
              identification numbers — in the chat widget.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              3. No Guarantee of Outcomes
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Examples, case studies, and results mentioned on this site reflect specific past
              engagements in specific contexts.{" "}
              <strong className="font-semibold text-[#C8C8D8]">
                We do not guarantee that any client will achieve similar results.
              </strong>{" "}
              Outcomes depend on your industry, market, existing assets, competition, and many other
              variables outside our control. Specifically:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>We make no guarantees of SEO rankings, organic traffic, or search visibility</li>
              <li>We make no guarantees of conversion rate improvements or revenue increases</li>
              <li>
                We make no guarantees of specific delivery timelines, except where documented in a
                signed project agreement
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">4. Third-Party Platforms</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Where our services involve third-party platforms — Shopify, Google, hosting providers,
              Zapier, and others — VryntLab is not responsible for policy changes, outages, or
              pricing changes on those platforms, or for functionality loss caused by their updates
              after our work is delivered.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">5. Client Responsibility</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Clients are responsible for:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>
                Ensuring that content provided to us is accurate, legal, and does not infringe
                third-party rights
              </li>
              <li>Complying with applicable laws and regulations in their own jurisdiction</li>
              <li>Business decisions made based on our work or advice</li>
              <li>Maintaining their own backups of data and digital assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">6. No Professional Advice</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              VryntLab provides web design, development, and marketing services. Nothing we do or
              say constitutes:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>
                <strong className="font-semibold text-[#C8C8D8]">Legal advice</strong> — consult a
                qualified attorney for legal questions
              </li>
              <li>
                <strong className="font-semibold text-[#C8C8D8]">Financial or investment advice</strong>{" "}
                — consult a licensed financial advisor
              </li>
              <li>
                <strong className="font-semibold text-[#C8C8D8]">Tax advice</strong> — consult a
                qualified accountant or tax professional
              </li>
              <li>
                <strong className="font-semibold text-[#C8C8D8]">Medical advice</strong> — consult a
                qualified healthcare provider
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">7. Changes</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              We may update this disclaimer at any time. The &ldquo;Last updated&rdquo; date at the
              top reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">8. Questions</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              <a href="mailto:hello@vryntlab.com" className={linkClass}>
                hello@vryntlab.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
