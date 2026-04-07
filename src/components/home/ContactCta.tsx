"use client";

import { Reveal } from "@/components/motion/Reveal";
import { focusRing, narrowMeasure, proseComfort } from "@/components/layout/layoutTokens";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteEmail } from "@/lib/site";

const headingClass =
  "max-w-[20ch] text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.03em] text-zinc-950 text-balance sm:max-w-none sm:text-[1.875rem] sm:leading-[1.08] md:text-[2.125rem] md:tracking-[-0.033em] lg:text-[2.375rem] dark:text-zinc-50";

const leadClass = `${proseComfort} mt-4 max-w-[40ch] space-y-3.5 text-[0.9375rem] leading-[1.62] text-zinc-600 sm:mt-5 sm:max-w-[42ch] sm:space-y-4 sm:text-[1.0625rem] sm:leading-[1.64] md:text-[1.0625rem] md:leading-[1.65] dark:text-zinc-400 lg:max-w-sm`;

const followUpClass = `${proseComfort} ${narrowMeasure} mt-5 border-t border-[var(--border)] pt-5 text-[13px] leading-[1.58] text-zinc-500 sm:mt-6 sm:max-w-[38ch] sm:pt-5 sm:text-[14px] sm:leading-[1.6] dark:border-zinc-700/60 dark:text-zinc-500 lg:max-w-sm`;

export function ContactCta() {
  return (
    <SectionShell id="contact" labelledBy="contact-heading">
      <Reveal>
        <div className="border-t border-[var(--border)] pt-9 sm:pt-10 md:pt-11 lg:pt-14 xl:pt-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_52%,var(--surface))] p-5 shadow-[var(--shadow-sm)] ring-1 ring-black/[0.025] sm:rounded-[1.35rem] sm:p-7 sm:py-10 md:p-9 md:py-12 lg:p-11 lg:py-14 xl:py-[3.75rem] dark:ring-white/[0.04]">
            <div className="grid gap-7 sm:gap-8 md:gap-9 lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-14">
              <header className="lg:col-span-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] opacity-90 sm:tracking-[0.24em] dark:opacity-95">
                  Contact
                </p>
                <h2 id="contact-heading" className={`mt-3 sm:mt-3.5 ${headingClass}`}>
                  Start a conversation
                </h2>
                <div className={leadClass}>
                  <p>
                    Tell us what you&apos;re trying to build or fix, your timeline,
                    and anything useful to look at.
                  </p>
                  <p>
                    We usually start with a short call or email, then send a clear
                    estimate. No pressure.
                  </p>
                  <p>No pitch deck needed—just explain it in your own words.</p>
                </div>
                <p className={followUpClass}>
                  After you reach out, we&apos;ll follow up by email. If it&apos;s a
                  good fit, you&apos;ll get a clear scope and pricing before
                  anything moves forward.
                </p>
              </header>

              <div className="lg:col-span-6 lg:col-start-7">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-xs)] sm:rounded-2xl sm:p-6 md:p-7 dark:border-zinc-800/80">
                  <ContactForm />
                </div>
                <div className="mt-5 sm:mt-6">
                  <p
                    className={`text-[12px] leading-relaxed text-zinc-500 sm:text-[13px] dark:text-zinc-500 ${narrowMeasure} lg:max-w-none`}
                  >
                    Prefer email?{" "}
                    <a
                      href={`mailto:${siteEmail}`}
                      className={`inline-block min-h-11 rounded-md py-2 font-semibold text-zinc-800 underline decoration-zinc-300/90 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} active:text-zinc-950 [@media(hover:hover)]:hover:text-zinc-950 [@media(hover:hover)]:hover:decoration-[var(--accent)]/50 dark:text-zinc-200 dark:decoration-zinc-600 dark:[@media(hover:hover)]:hover:text-zinc-50`}
                    >
                      {siteEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
