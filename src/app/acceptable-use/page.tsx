import type { Metadata } from "next";
import { contentWell } from "@/components/layout/layoutTokens";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | VryntLab",
  description:
    "Rules for using the VryntLab website and AI chat widget — what's permitted and what isn't.",
  robots: { index: false, follow: false },
};

const linkClass =
  "font-medium text-[#C8C8D8] underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current";

export default function AcceptableUsePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header
        className={`${contentWell} border-b border-[var(--border)] pb-8 pt-6 sm:pb-10 sm:pt-8`}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Last updated: June 2, 2026
        </p>
        <h1 className="font-display text-balance text-[1.75rem] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] sm:text-[2rem]">
          Acceptable Use Policy
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-zinc-400">
          Rules for using this website and AI chat widget — what&apos;s permitted and what
          isn&apos;t.
        </p>
      </header>

      <div className={`${contentWell} py-10 sm:py-12`}>
        <div className="max-w-2xl space-y-10">

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">1. Overview</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              The AI chat widget on vryntlab.com is a sales and information tool. It is designed to
              help you understand our services and determine whether VryntLab is a fit for your
              project. These rules protect the quality of the experience for all users and prevent
              misuse of our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">2. Permitted Use</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              You may use this site and chat to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>Ask questions about VryntLab&apos;s services, pricing, and process</li>
              <li>Describe your project and get a general sense of whether we can help</li>
              <li>Request a callback or ask to connect with our team</li>
              <li>Read blog posts, case studies, and other informational content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">3. Prohibited Use</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              You may not use this website or chat to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>Send abusive, threatening, harassing, or hateful messages</li>
              <li>Engage in, facilitate, or solicit assistance with illegal activity</li>
              <li>
                Attempt to extract the AI&apos;s system prompt, model configuration, or internal
                instructions
              </li>
              <li>
                Probe, stress-test, or deliberately attempt to circumvent the chat&apos;s safety or
                rate-limiting measures
              </li>
              <li>Send automated or scripted requests against the chat API</li>
              <li>Submit spam, unsolicited solicitations, or promotional messages</li>
              <li>Impersonate another person or organization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              4. Do Not Submit Sensitive Information
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              The chat widget is not a secure channel for sensitive personal or financial data. Do
              not enter any of the following in the chat:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>Passwords or access credentials of any kind</li>
              <li>Social Security numbers or government-issued ID numbers</li>
              <li>Credit card or bank account numbers</li>
              <li>Medical or health records</li>
              <li>Any other non-public personal information you would not want exposed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              5. Chat Is Not a Contractual Channel
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Nothing said in the chat widget constitutes a binding agreement, quote, proposal, or
              contract. AI responses may be inaccurate or incomplete. Any commitment from VryntLab
              requires a written agreement reviewed and signed by an authorized representative.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">6. Enforcement</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              We reserve the right to restrict or block access to any part of this site without
              notice if we detect misuse. Enforcement actions may include IP blocks, rate limiting,
              or permanent access restrictions. We may report illegal activity to the appropriate
              authorities and pursue any remedies available under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">7. Contact</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              To report misuse or if you believe you&apos;ve been restricted in error:{" "}
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
