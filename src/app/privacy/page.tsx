import type { Metadata } from "next";
import { contentWell } from "@/components/layout/layoutTokens";

export const metadata: Metadata = {
  title: "Privacy Policy | VryntLab",
  description:
    "How VryntLab collects, uses, and protects your information — including what our contact form and AI chat widget do with your data.",
  robots: { index: false, follow: false },
};

const linkClass =
  "font-medium text-[#C8C8D8] underline decoration-white/30 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-current";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header
        className={`${contentWell} border-b border-[var(--border)] pb-8 pt-6 sm:pb-10 sm:pt-8`}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Last updated: June 2, 2026
        </p>
        <h1 className="font-display text-balance text-[1.75rem] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] sm:text-[2rem]">
          Privacy Policy
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-zinc-400">
          VryntLab takes your privacy seriously. This page explains exactly what data we collect,
          why, and how you can request changes or deletion.
        </p>
      </header>

      <div className={`${contentWell} py-10 sm:py-12`}>
        <div className="max-w-2xl space-y-10">

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">1. Who We Are</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              VryntLab is a web design and development studio based in Illinois, USA. You can reach
              us at{" "}
              <a href="mailto:hello@vryntlab.com" className={linkClass}>
                hello@vryntlab.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">2. Information We Collect</h2>

            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">Contact Form</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                  When you submit the contact form, we collect your name, email address, and the
                  message you write. This information is transmitted via{" "}
                  <strong className="font-semibold text-[#C8C8D8]">Resend</strong>, our transactional
                  email provider, and delivered to our team inbox.{" "}
                  <strong className="font-semibold text-[#C8C8D8]">
                    Contact form submissions are not stored in any database.
                  </strong>{" "}
                  Once the email is delivered, the data lives in our email inbox only.
                </p>
              </div>

              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">AI Chat Widget</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                  Conversations in our chat widget live in your browser&apos;s memory for the duration of
                  the session.{" "}
                  <strong className="font-semibold text-[#C8C8D8]">
                    We do not store conversation transcripts.
                  </strong>
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
                  If you share your name, email address, business name, or business website during a
                  chat, our backend may extract and save that structured data — specifically: name,
                  email, business name, website URL, and a summary of your stated need — to our
                  database (hosted on{" "}
                  <strong className="font-semibold text-[#C8C8D8]">Supabase</strong>) for internal
                  follow-up. This only happens when the conversation suggests you may be interested
                  in our services and includes enough identifying information. The full chat log is
                  never saved.
                </p>
              </div>

              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">Session Storage</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                  We use the browser&apos;s{" "}
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.875rem] text-zinc-300">
                    sessionStorage
                  </code>{" "}
                  API — not cookies — to temporarily hold a conversation ID for the chat widget and
                  your selected service intent (for example, &quot;website&quot; or &quot;automation&quot;). This data is{" "}
                  <strong className="font-semibold text-[#C8C8D8]">
                    automatically cleared when you close the browser tab
                  </strong>
                  . It is never shared with third parties and is not used for tracking or advertising.
                </p>
              </div>

              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">
                  What We Don&apos;t Collect
                </h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
                  <li>
                    <strong className="font-semibold text-[#C8C8D8]">No cookies.</strong> We do not
                    set any cookies on your device.
                  </li>
                  <li>
                    <strong className="font-semibold text-[#C8C8D8]">No analytics.</strong> We do not
                    use Google Analytics, Meta Pixel, Hotjar, Clarity, or any other analytics or
                    behavioral tracking service.
                  </li>
                  <li>
                    <strong className="font-semibold text-[#C8C8D8]">No advertising tracking.</strong>{" "}
                    We do not run retargeting campaigns and do not load advertising pixels.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              3. How We Use Your Information
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              We use the information we collect only to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-zinc-400">
              <li>Respond to your contact form message</li>
              <li>
                Follow up with potential clients who have expressed interest through the chat
              </li>
              <li>
                Prevent abuse of the chat system — rate limiting uses IP addresses in server memory
                during the request, which are not written to disk
              </li>
            </ul>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              We do not sell your information. We do not share it with third parties for marketing
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              4. Third-Party Service Providers
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              The following third-party services receive data in connection with this site:
            </p>
            <div className="mt-4 space-y-3">
              {(
                [
                  {
                    name: "Resend",
                    role: "Email delivery",
                    receives:
                      "Name, email, and message from contact form submissions.",
                  },
                  {
                    name: "Supabase",
                    role: "Database hosting",
                    receives:
                      "Structured lead data from qualifying chat conversations: name, email, business name, website, and stated need.",
                  },
                  {
                    name: "OpenRouter",
                    role: "AI / LLM processing",
                    receives:
                      "Your chat messages, sent to generate AI responses. OpenRouter routes requests to large language model providers.",
                  },
                  {
                    name: "Slack",
                    role: "Internal team notifications",
                    receives:
                      "The same structured lead data saved to Supabase — sent as a notification to our internal workspace when a qualifying lead is received.",
                  },
                  {
                    name: "Google Fonts",
                    role: "Typography",
                    receives:
                      "Our fonts are loaded server-side via Next.js. No Google JavaScript or tracking scripts run in your browser.",
                  },
                ] as const
              ).map(({ name, role, receives }) => (
                <div
                  key={name}
                  className="rounded-lg border border-[var(--border)] bg-white/[0.02] px-4 py-4"
                >
                  <p className="text-[0.875rem] font-semibold text-[#C8C8D8]">
                    {name}{" "}
                    <span className="ml-1.5 font-normal text-zinc-500">— {role}</span>
                  </p>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-zinc-400">{receives}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-zinc-500">
              Each provider is subject to their own privacy policy. We do not authorize them to use
              your data beyond the purpose described above.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">5. Data Retention</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Contact form messages are retained in our email inbox until we delete them. Lead data
              saved from the chat widget is stored in our database until we manually remove it or
              until you request deletion. We do not have an automated retention schedule. If you want
              your data removed, email{" "}
              <a href="mailto:hello@vryntlab.com" className={linkClass}>
                hello@vryntlab.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">6. Your Rights</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">
                  California Residents (CCPA)
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                  If you are a California resident, you have the right to know what personal
                  information we hold about you, request that we delete it, and confirm that we do
                  not sell it (we don&apos;t). To exercise these rights, contact us at{" "}
                  <a href="mailto:hello@vryntlab.com" className={linkClass}>
                    hello@vryntlab.com
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-[#C8C8D8]">
                  EU and EEA Residents (GDPR)
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-400">
                  If you are in the EU or EEA, you have the right to access, correct, or delete the
                  personal data we hold about you, and to withdraw consent where processing is
                  consent-based. You may also lodge a complaint with your national data protection
                  authority. To exercise your rights, contact{" "}
                  <a href="mailto:hello@vryntlab.com" className={linkClass}>
                    hello@vryntlab.com
                  </a>
                  . We will respond within 30 days.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">7. Children&apos;s Privacy</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              Our website and services are not directed to children under 13. We do not knowingly
              collect personal information from anyone under 13. If you believe a child has submitted
              information to us, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">
              8. Changes to This Policy
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              We may update this policy from time to time. When we do, we update the &ldquo;Last
              updated&rdquo; date at the top of this page. We encourage you to review this page
              periodically.
            </p>
          </section>

          <section>
            <h2 className="text-[1rem] font-semibold text-[#F0F0FF]">9. Contact</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              For questions, data access requests, or deletion requests:
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-400">
              <strong className="font-semibold text-[#C8C8D8]">VryntLab</strong>
              <br />
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
