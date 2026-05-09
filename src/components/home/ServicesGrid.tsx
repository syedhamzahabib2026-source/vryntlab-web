"use client";

import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  brandServiceGrid,
  brandServiceGridFooter,
  brandServicesSection,
} from "@/lib/brand-knowledge";

const cardClass =
  `flex h-full flex-col rounded-2xl border border-[#1E1E35] bg-[#0F0F1A] p-5 shadow-[var(--shadow-xs)] ring-1 ring-violet-500/[0.05] transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-premium)] sm:p-6 [@media(hover:hover)]:hover:border-violet-500/35 [@media(hover:hover)]:hover:shadow-[var(--shadow-sm),0_0_30px_-12px_rgba(124,63,255,0.2)]`;

export function ServicesGrid() {
  return (
    <SectionShell id="services" labelledBy="services-heading">
      <div className="relative flex flex-col gap-5 border-t border-[var(--border)] pt-6 sm:gap-8 sm:pt-8 md:gap-9 md:pt-9 lg:gap-10 lg:pt-10 xl:pt-11">
        <Reveal>
          <SectionIntro
            eyebrow={brandServicesSection.eyebrow}
            titleId="services-heading"
            title={brandServicesSection.title}
            description={<>{brandServicesSection.description}</>}
            align="start"
          />
        </Reveal>

        <div className={`${contentWell} relative`}>
          <Reveal delay={0.04}>
            <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-5 lg:gap-6">
              {brandServiceGrid.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`${cardClass} ${focusRing} cursor-pointer`}
                  >
                    <h3 className="font-display text-base font-normal tracking-[-0.02em] text-[#F0F0FF] sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[#C8C8D8]/75 sm:mt-3 sm:text-[15px]">
                      {item.outcome}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <p
            className={`${contentWell} text-center text-[13px] leading-relaxed text-[#8888a8] sm:text-[14px]`}
          >
            {brandServiceGridFooter}
          </p>
        </Reveal>

        <Reveal>
          <p
            className={`${contentWell} border-l-2 border-violet-500/30 py-0.5 pl-3.5 text-[13px] leading-relaxed text-[#C8C8D8]/60 sm:pl-4 sm:text-[14px]`}
          >
            {brandServicesSection.footerNote}
          </p>
        </Reveal>

        <Reveal>
          <div className={`${contentWell} flex justify-center`}>
            <Link
              href="/#contact"
              className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[#1E1E35] bg-[#0F0F1A] px-6 text-[13px] font-semibold text-[#F0F0FF] transition-[transform,border-color] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.99] ${focusRing} [@media(hover:hover)]:hover:border-violet-500/40`}
            >
              Tell us what to fix
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
