import type { Metadata } from "next";
import { contentWell } from "@/components/layout/layoutTokens";

export const metadata: Metadata = {
  title: "Terms of Service | VryntLab",
  description:
    "Terms governing use of the VryntLab website, AI chat widget, and client project engagements.",
  robots: { index: false, follow: false },
};

const linkClass =
  "font-medium text-[#C8C8D8] underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header
        className={`${contentWell} border-b border-[var(--border)] pb-8 pt-6 sm:pb-10 sm:pt-8`}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Last updated: June 2, 2026
        </p>
        <h1 className="font-display text-balance text-[1.75rem] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] sm:text-[2rem]">
          Terms of Service
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-zinc-400">
          By using this website or engaging VryntLab for services, you agree to these terms.
        </p>
      </header>

      <div className={`${contentWell} py-10 sm:py-12`}>
        <div className="max-w-2xl space-y-10">

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">1. Agreement to Terms</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              By accessing vryntlab.com or using our AI chat widget, you agree to these Terms of
              Service and our{" "}
              <a href="/privacy" className={linkClass}>
                Privacy Policy
              </a>
              . If you don&apos;t agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">2. Services</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              VryntLab provides web design, development, AI chatbot integration, SEO, booking
              systems, and business automation services. The scope, timeline, and deliverables for
              any project are defined in a separate written agreement or proposal.{" "}
              <strong className="font-semibold text-[#C8C8D8]">
                Nothing on this website or in the chat widget constitutes a binding contract or
                commitment.
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">3. Intellectual Property</h2>
            <div className="mt-4 space-y-5">
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">Site content</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                  All content on vryntlab.com — including text, design, graphics, and code — belongs
                  to VryntLab. You may not reproduce or redistribute it without written permission.
                </p>
              </div>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">Client deliverables</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                  Upon receipt of full payment, VryntLab transfers ownership of deliverables created
                  specifically for the client — including custom website designs, bespoke code, and
                  written copy prepared for the client — to the client. We retain the right to
                  display completed work in our portfolio unless otherwise agreed in writing.
                  Third-party components, open-source libraries, and licensed tools are subject to
                  their own licenses, which transfer with the project.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              4. AI Chatbot — Important Limitations
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              The chat widget on this site is powered by an AI language model. AI-generated responses:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>
                Are generated automatically and may contain errors, inaccuracies, or outdated
                information
              </li>
              <li>Are not reviewed by a human before delivery</li>
              <li>
                Are not a substitute for professional advice — legal, financial, technical, or
                otherwise
              </li>
              <li>
                Do not constitute a quote, proposal, or binding commitment from VryntLab
              </li>
            </ul>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              For firm answers on pricing, timeline, or scope, contact us directly at{" "}
              <a href="mailto:hello@vryntlab.com" className={linkClass}>
                hello@vryntlab.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">5. No Guarantee of Results</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              We do not guarantee specific outcomes from any service, including:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>Search engine rankings or organic traffic volume</li>
              <li>Conversion rates or revenue increases</li>
              <li>
                Load time improvements affected by third-party scripts or hosting outside our
                control
              </li>
              <li>
                Continued performance after changes made by the client or third parties post-launch
              </li>
            </ul>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Results vary based on many factors outside our control, including your content,
              market, competition, and third-party platform behavior.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">6. Third-Party Platforms</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Many of our services involve third-party platforms — Shopify, Google, hosting
              providers, booking tools, and others. We are not responsible for outages, errors, or
              policy changes on those platforms, or for loss of functionality caused by their
              updates. If a platform change requires additional development work beyond the original
              project scope, that work is scoped and priced separately.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">7. Limitation of Liability</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              To the maximum extent permitted by law, VryntLab&apos;s total liability for any claim
              arising from or related to our services is limited to the fees you paid for the
              specific service in question. We are not liable for indirect, incidental, special, or
              consequential damages — including lost profits, lost data, or business interruption —
              even if we were advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">8. Indemnification</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              You agree to indemnify, defend, and hold harmless VryntLab and its team members from
              any claims, damages, or expenses (including reasonable legal fees) arising from your
              use of the website or services, content you provide to us, or your violation of these
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">9. Governing Law</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              These terms are governed by the laws of the State of Illinois, USA. Any disputes shall
              be resolved in the state or federal courts located in Illinois, and you consent to
              personal jurisdiction there.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">10. Modifications</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              We may update these terms at any time. Changes take effect when posted. Continued use
              of the site or services after changes are posted constitutes acceptance. We update the
              &ldquo;Last updated&rdquo; date at the top of this page when revisions are made.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">11. Severability</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              If any provision of these terms is found to be unenforceable, the remaining provisions
              stay in full effect.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">12. Contact</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Questions about these terms:{" "}
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
