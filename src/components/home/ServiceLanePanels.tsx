import Link from "next/link";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { brandServiceLanes, brandServicesSection } from "@/lib/brand-knowledge";

const panelClass =
  "scroll-mt-28 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface-soft)_40%,var(--surface))] p-6 shadow-[var(--shadow-xs)] ring-1 ring-black/[0.02] sm:p-7 dark:border-zinc-800/85 dark:bg-[color-mix(in_oklab,var(--surface)_88%,var(--surface-soft))] dark:ring-white/[0.04]";

export function ServiceLanePanels() {
  return (
    <section
      className="border-t border-[var(--border)] pt-10 sm:pt-12 md:pt-14"
      aria-labelledby="service-lanes-heading"
    >
      <div className={contentWell}>
        <Reveal>
          <h2
            id="service-lanes-heading"
            className="font-display text-balance text-[1.375rem] font-normal leading-[1.15] tracking-[-0.03em] text-[var(--foreground)] sm:text-[1.5rem] md:text-[1.625rem]"
          >
            {brandServicesSection.title}
          </h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-[1rem] dark:text-zinc-400">
            Three ways we usually engage — pick the lane that matches how you work.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-7">
          {brandServiceLanes.map((lane, i) => (
            <Reveal key={lane.id} delay={i * 0.04}>
              <article id={lane.id} className={panelClass}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00E5FF]/90">
                  {lane.shortLabel}
                </p>
                <h3 className="mt-2 font-display text-xl font-normal tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.35rem]">
                  {lane.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#C8C8D8]/80">
                  {lane.description}
                </p>
                <p className="mt-4 border-l-2 border-violet-500/30 py-0.5 pl-3.5 text-[13px] leading-relaxed text-[#C8C8D8]/65 sm:pl-4 sm:text-[14px]">
                  <span className="font-semibold text-[#C8C8D8]">
                    {brandServicesSection.panelHeading}:{" "}
                  </span>
                  {lane.scope}
                </p>
                <div className="mt-5">
                  <Link
                    href="/#contact"
                    className={`inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-5 text-[13px] font-semibold tracking-tight text-white shadow-[0_8px_28px_-8px_rgba(124,63,255,0.4)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)]`}
                  >
                    Start a conversation
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
