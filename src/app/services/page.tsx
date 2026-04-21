import type { Metadata } from "next";
import Link from "next/link";
import { NeedPathSelector } from "@/components/home/NeedPathSelector";
import { ServiceLanePanels } from "@/components/home/ServiceLanePanels";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { siteBrandName } from "@/lib/site";

export const metadata: Metadata = {
  title: `What we do — ${siteBrandName}`,
  description:
    "Pick a focus, browse common problems we solve, and see how we work across web, automation, and custom builds.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header
        className={`${contentWell} border-b border-[var(--border)] pb-8 pt-6 sm:pb-10 sm:pt-8 md:pb-11 md:pt-10`}
      >
        <h1 className="font-display text-balance text-[1.75rem] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] sm:text-[2rem] md:text-[2.25rem]">
          What we do — {siteBrandName}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-[1.0625rem] dark:text-zinc-400">
          Choose a lane, explore the problem grid, then read how we usually
          deliver — same team from estimate to launch.
        </p>
      </header>

      <NeedPathSelector />
      <ServicesGrid />
      <ServiceLanePanels />

      <section
        className={`${contentWell} border-t border-[var(--border)] py-12 sm:py-14 md:py-16`}
        aria-labelledby="services-cta-heading"
      >
        <h2 id="services-cta-heading" className="sr-only">
          Contact
        </h2>
        <p className="max-w-xl text-[1.0625rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
          Ready to talk scope? Send a short note — we reply with next steps and a
          clear estimate when it&apos;s a fit.
        </p>
        <Link
          href="/#contact"
          className={`mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--surface-ink)] px-8 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-md)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] dark:bg-white dark:text-zinc-950 ${focusRing} [@media(hover:hover)]:hover:shadow-[var(--shadow-glow)]`}
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}
