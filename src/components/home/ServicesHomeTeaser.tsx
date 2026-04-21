import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { brandHomeServicesTeaser } from "@/lib/brand-knowledge";

const linkClass = `inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] underline decoration-[color-mix(in_oklab,var(--accent)_35%,transparent)] underline-offset-[4px] transition-[gap,color] duration-300 ease-[var(--ease-out-premium)] ${focusRing} rounded-md [@media(hover:hover)]:hover:gap-2 [@media(hover:hover)]:hover:decoration-[var(--accent)]`;

export function ServicesHomeTeaser() {
  return (
    <SectionShell
      id="services-teaser"
      labelledBy="services-teaser-heading"
      pad="compact"
      className="!scroll-mt-[calc(4.5rem+0.25rem)] border-t border-[var(--border)] sm:!scroll-mt-24 md:!scroll-mt-28"
    >
      <Reveal>
        <div className={contentWell}>
          <h2
            id="services-teaser-heading"
            className="font-display text-lg font-normal tracking-[-0.02em] text-[var(--foreground)] sm:text-xl"
          >
            What we do
          </h2>
          <ul className="mt-4 max-w-2xl space-y-3 text-[0.9375rem] leading-relaxed text-zinc-600 sm:mt-5 sm:text-[1rem] sm:leading-[1.65] dark:text-zinc-400">
            {brandHomeServicesTeaser.lines.map((line) => (
              <li key={line} className="text-pretty">
                {line}
              </li>
            ))}
          </ul>
          <Link href="/services" className={`${linkClass} mt-5 inline-flex sm:mt-6`}>
            {brandHomeServicesTeaser.ctaLabel}
          </Link>
        </div>
      </Reveal>
    </SectionShell>
  );
}
