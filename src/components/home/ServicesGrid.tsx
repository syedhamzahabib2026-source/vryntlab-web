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
  `flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-xs)] ring-1 ring-black/[0.02] transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-premium)] sm:p-6 dark:border-zinc-800/85 dark:bg-[color-mix(in_oklab,var(--surface)_92%,var(--surface-soft))] dark:ring-white/[0.04] [@media(hover:hover)]:hover:border-zinc-300/70 [@media(hover:hover)]:hover:shadow-[var(--shadow-sm)] dark:[@media(hover:hover)]:hover:border-zinc-600/45`;

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
                  <article className={cardClass}>
                    <h3 className="font-display text-base font-normal tracking-[-0.02em] text-zinc-950 sm:text-lg dark:text-zinc-50">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-zinc-500 sm:mt-3 sm:text-[15px] dark:text-zinc-400">
                      {item.outcome}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <p
            className={`${contentWell} text-center text-[13px] leading-relaxed text-zinc-500 sm:text-[14px] dark:text-zinc-500`}
          >
            {brandServiceGridFooter}
          </p>
        </Reveal>

        <Reveal>
          <p
            className={`${contentWell} border-l-2 border-[var(--accent)]/30 py-0.5 pl-3.5 text-[13px] leading-relaxed text-zinc-600 sm:pl-4 sm:text-[14px] dark:border-[var(--accent)]/35 dark:text-zinc-500`}
          >
            {brandServicesSection.footerNote}
          </p>
        </Reveal>

        <Reveal>
          <div className={`${contentWell} flex justify-center`}>
            <Link
              href="/#contact"
              className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 text-[13px] font-semibold text-[var(--foreground)] transition-[transform,border-color] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.99] dark:border-zinc-700 dark:bg-[var(--surface)] ${focusRing} [@media(hover:hover)]:hover:border-[var(--accent)]/35`}
            >
              Tell us what to fix
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
