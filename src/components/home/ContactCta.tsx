"use client";

import {
  contentWell,
  focusRing,
  slabBleed,
  slabContent,
} from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContactForm } from "@/components/ui/ContactForm";
import { brandContact } from "@/lib/brand-knowledge";
import { siteEmail } from "@/lib/site";
import { ContactEstimateButton } from "./ContactEstimateButton";

export function ContactCta() {
  return (
    <div className={slabBleed}>
      <SectionShell
        id="contact"
        labelledBy="contact-heading"
        pad="compact"
        className={`${slabContent} !scroll-mt-20 border-0 pb-8 pt-4 sm:!scroll-mt-24 sm:pb-10 sm:pt-5 md:!scroll-mt-28 md:pb-12 md:pt-6 lg:pb-14 lg:pt-8`}
      >
        <div className={`${contentWell} py-10 sm:py-12 md:py-16`}>
          {/* Card with gradient border effect */}
          <div className="relative overflow-hidden rounded-xl border border-[#1E1E35] bg-[#0F0F1A] p-6 shadow-lg sm:p-8 md:p-10 lg:p-12">
            {/* Subtle gradient border glow */}
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-50" style={{
              background: 'linear-gradient(135deg, rgba(124,63,255,0.1) 0%, rgba(0,229,255,0.05) 100%)',
            }} />
            
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
              {/* Left column - Copy */}
              <div className="lg:col-span-5">
                <SectionIntro
                  eyebrow={brandContact.eyebrow}
                  titleId="contact-heading"
                  title={brandContact.title}
                  tone="onDark"
                  className="max-w-[min(100%,22rem)] sm:max-w-none"
                />
                <div className="mt-5 max-w-sm space-y-3.5 text-[0.9375rem] leading-[1.65] text-[#C8C8D8] sm:mt-6 sm:text-[1rem]">
                  {brandContact.lead.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
                <p className="mt-5 max-w-sm border-t border-[#1E1E35] pt-5 text-[13px] leading-[1.6] text-[#8888a0] sm:mt-6 sm:text-[14px]">
                  {brandContact.followUp}
                </p>
                <ContactEstimateButton variant="onDark" />
              </div>

              {/* Right column - Form */}
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="rounded-xl border border-[#1E1E35] bg-[#080810] p-5 sm:p-6 md:p-7">
                  <ContactForm />
                </div>
                <div className="mt-5 sm:mt-6">
                  <p className="text-[12px] leading-relaxed text-[#8888a0] sm:text-[13px]">
                    Prefer email?{" "}
                    <a
                      href={`mailto:${siteEmail}`}
                      className={`inline-block min-h-11 rounded-md py-2 font-semibold text-[#00E5FF] underline decoration-[#00E5FF]/30 underline-offset-[5px] transition-all duration-300 ${focusRing} hover:text-[#7affff] hover:decoration-[#00E5FF]/60`}
                    >
                      {siteEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
