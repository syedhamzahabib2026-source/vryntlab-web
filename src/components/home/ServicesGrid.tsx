"use client";

import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  brandServiceGrid,
  brandServiceGridFooter,
  brandServicesSection,
} from "@/lib/brand-knowledge";

export function ServicesGrid() {
  return (
    <SectionShell id="services" labelledBy="services-heading">
      <div className="relative flex flex-col gap-8 border-t border-[#1E1E35] pt-10 sm:gap-10 sm:pt-12 md:gap-12 md:pt-14">
        <SectionIntro
          eyebrow={brandServicesSection.eyebrow}
          titleId="services-heading"
          title={brandServicesSection.title}
          description={<>{brandServicesSection.description}</>}
          align="start"
        />

        <div className={`${contentWell} relative`}>
          <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-5 lg:gap-6">
            {brandServiceGrid.map((item) => (
              <li key={item.title}>
                <article className="group flex h-full flex-col rounded-xl border border-[#1E1E35] bg-[#0F0F1A] p-5 transition-all duration-400 ease-[var(--ease-out-premium)] sm:p-6 hover:-translate-y-0.5 hover:border-[#7C3FFF]/30 hover:shadow-[0_0_30px_-12px_rgba(124,63,255,0.15)]">
                  <h3 className="font-display text-base font-medium tracking-[-0.02em] text-[#F0F0FF] sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-[#8888a0] sm:mt-3 sm:text-[15px]">
                    {item.outcome}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <p
          className={`${contentWell} text-center text-[13px] leading-relaxed text-[#8888a0] sm:text-[14px]`}
        >
          {brandServiceGridFooter}
        </p>

        <p
          className={`${contentWell} border-l-2 border-[#7C3FFF]/30 py-0.5 pl-3.5 text-[13px] leading-relaxed text-[#8888a0] sm:pl-4 sm:text-[14px]`}
        >
          {brandServicesSection.footerNote}
        </p>

        <div className={`${contentWell} flex justify-center`}>
          <Link
            href="/#contact"
            className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1E1E35] bg-transparent px-6 text-[13px] font-semibold text-[#C8C8D8] transition-all duration-300 ${focusRing} hover:border-[#7C3FFF]/50 hover:text-[#F0F0FF]`}
          >
            Tell us what to fix
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
