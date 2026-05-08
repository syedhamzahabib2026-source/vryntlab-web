import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { brandHomeServicesTeaser } from "@/lib/brand-knowledge";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const linkClass = `inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-[#00E5FF] underline decoration-[#00E5FF]/35 underline-offset-[4px] transition-[gap,color,text-decoration-color] duration-300 ease-[var(--ease-out-premium)] ${focusRing} rounded-md [@media(hover:hover)]:hover:gap-2 [@media(hover:hover)]:hover:decoration-[#00E5FF]`;

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
            className="font-display text-lg font-normal tracking-[-0.02em] text-[#F0F0FF] sm:text-xl"
          >
            What we do
          </h2>
          <StaggerGroup
            className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
            inViewMargin="-8% 0px -8% 0px"
            inViewAmount={0.1}
          >
            {brandHomeServicesTeaser.lines.map((line) => (
              <StaggerItem key={line}>
                <div className="flex items-start gap-3.5 rounded-xl border border-[#1E1E35] bg-[#0F0F1A] p-5 transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-premium)] [@media(hover:hover)]:hover:border-violet-500/35 [@media(hover:hover)]:hover:shadow-[0_0_24px_-8px_rgba(124,63,255,0.2)]">
                  <span
                    className="mt-[0.35rem] h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#7C3FFF] to-[#00E5FF] shadow-[0_0_8px_rgba(124,63,255,0.5)]"
                    aria-hidden
                  />
                  <p className="text-pretty text-[0.9375rem] leading-relaxed text-[#C8C8D8]/85 sm:text-[1rem] sm:leading-[1.65]">
                    {line}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Link href="/services" className={`${linkClass} mt-5 inline-flex sm:mt-6`}>
            {brandHomeServicesTeaser.ctaLabel}
          </Link>
        </div>
      </Reveal>
    </SectionShell>
  );
}
