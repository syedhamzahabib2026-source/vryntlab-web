"use client";

import { Reveal } from "@/components/motion/Reveal";
import {
  contentWell,
  focusRing,
  narrowMeasure,
  proseComfort,
  slabBleed,
  slabContent,
} from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContactForm } from "@/components/ui/ContactForm";
import { brandContact } from "@/lib/brand-knowledge";
import { siteEmail } from "@/lib/site";
import { ContactEstimateButton } from "./ContactEstimateButton";

const leadClass = `${proseComfort} mt-4 max-w-[40ch] space-y-3.5 text-[0.9375rem] leading-[1.62] text-zinc-300 sm:mt-5 sm:max-w-[42ch] sm:space-y-4 sm:text-[1.0625rem] sm:leading-[1.64] md:text-[1.0625rem] md:leading-[1.65] lg:max-w-sm`;

const followUpClass = `${proseComfort} ${narrowMeasure} mt-5 border-t border-white/10 pt-5 text-[13px] leading-[1.58] text-zinc-500 sm:mt-6 sm:max-w-[38ch] sm:pt-5 sm:text-[14px] sm:leading-[1.6] lg:max-w-sm`;

export function ContactCta() {
  return (
    <div className={slabBleed}>
      <SectionShell
        id="contact"
        labelledBy="contact-heading"
        pad="compact"
        className={`${slabContent} !scroll-mt-[calc(4.5rem+0.25rem)] border-0 pb-8 pt-4 sm:!scroll-mt-24 sm:pb-10 sm:pt-5 md:!scroll-mt-28 md:pb-12 md:pt-6 lg:pb-14 lg:pt-8`}
      >
        <Reveal>
          <div className={contentWell}>
            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_28px_80px_-32px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.05] sm:rounded-[1.35rem] sm:p-7 sm:py-9 md:p-9 md:py-11 lg:p-11 lg:py-14 xl:py-[3.75rem]">
              <div className="grid gap-7 sm:gap-8 md:gap-9 lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-14">
                <div className="lg:col-span-5">
                  <SectionIntro
                    eyebrow={brandContact.eyebrow}
                    titleId="contact-heading"
                    title={brandContact.title}
                    tone="onDark"
                    className="max-w-[min(100%,22rem)] sm:max-w-none"
                  />
                  <div className={leadClass}>
                    {brandContact.lead.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                  <p className={followUpClass}>{brandContact.followUp}</p>
                  <ContactEstimateButton variant="onDark" />
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="rounded-xl border border-zinc-200/90 bg-[#f4f4f5] p-4 shadow-[var(--shadow-md)] sm:rounded-2xl sm:p-6 md:p-7 dark:border-zinc-700/80 dark:bg-zinc-900/95">
                    <ContactForm />
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <p
                      className={`text-[12px] leading-relaxed text-zinc-500 sm:text-[13px] ${narrowMeasure} lg:max-w-none`}
                    >
                      Prefer email?{" "}
                      <a
                        href={`mailto:${siteEmail}`}
                        className={`inline-block min-h-11 rounded-md py-2 font-semibold text-teal-200/95 underline decoration-teal-500/40 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 ease-[var(--ease-out-premium)] motion-reduce:duration-150 ${focusRing} active:text-white [@media(hover:hover)]:hover:text-white [@media(hover:hover)]:hover:decoration-teal-300/60`}
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
    </div>
  );
}
