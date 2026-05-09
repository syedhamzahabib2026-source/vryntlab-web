"use client";

import { ContactForm } from "@/components/ui/ContactForm";
import { brandContact } from "@/lib/brand-knowledge";
import { siteEmail } from "@/lib/site";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";

export function ContactCta() {
  return (
    <div className={slabBleed}>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className={`${slabContent} scroll-mt-[calc(4.5rem+0.25rem)] py-16 sm:scroll-mt-24 sm:py-20 md:scroll-mt-28`}
      >
        <div className={contentWell}>
          {/* Large centered headline */}
          <Reveal>
            <div className="mb-12 text-center sm:mb-14">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7C3FFF]/90">
                {brandContact.eyebrow}
              </p>
              <h2
                id="contact-heading"
                className="mt-3 text-[2rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                {brandContact.title}
              </h2>
              <p className="mx-auto mt-4 max-w-[50ch] text-[15px] leading-relaxed text-[#C8C8D8]/70">
                {brandContact.lead[0]}
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal>
            <div className="mx-auto max-w-lg">
              <ContactForm />
            </div>
          </Reveal>

          {/* Email link */}
          <Reveal>
            <div className="mt-14 text-center">
              <p className="mb-3 text-[13px] text-[#8888a8]">Prefer to write directly?</p>
              <a
                href={`mailto:${siteEmail}`}
                className={`text-[1.25rem] font-bold tracking-tight text-[#F0F0FF] underline decoration-[#7C3FFF]/35 underline-offset-4 transition-[text-decoration-color,color] duration-300 ease-[var(--ease-out-premium)] ${focusRing} rounded-md sm:text-[1.5rem] [@media(hover:hover)]:hover:text-[#7C3FFF] [@media(hover:hover)]:hover:decoration-[#7C3FFF]/70`}
              >
                {siteEmail}
              </a>
              <p className="mt-4 text-[12px] text-[#8888a8]">{brandContact.followUp}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
