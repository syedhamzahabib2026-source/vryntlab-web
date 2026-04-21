"use client";

import Link from "next/link";
import { focusRing } from "@/components/layout/layoutTokens";
import { brandIntentActionLabels } from "@/lib/brand-knowledge";
import { ctaViewWork } from "@/lib/site";
import { useConversion } from "./ConversionContext";

/**
 * Fixed entry points on small viewports — hover-free, thumb-reachable.
 * Hidden from `lg` where header + in-page CTAs carry the flow.
 */
export function StickyMobileCta() {
  const { openEstimate, selectedIntent } = useConversion();
  const estimateLabel =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].estimatePrimary
      : "Quick estimate";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] lg:hidden"
      aria-hidden={false}
    >
      <div
        className="pointer-events-auto mx-auto flex max-w-lg gap-2 border-t border-[color-mix(in_srgb,var(--border)_55%,transparent)] bg-[color-mix(in_oklab,var(--surface)_82%,var(--background))] px-3 py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_-28px_rgba(0,0,0,0.08)] backdrop-blur-lg backdrop-saturate-125 dark:border-white/[0.06] dark:bg-[color-mix(in_oklab,var(--surface)_76%,var(--background))] dark:shadow-[0_-10px_36px_-32px_rgba(0,0,0,0.4)] sm:px-4 sm:py-3"
      >
        <button
          type="button"
          onClick={() => openEstimate()}
          className={`flex min-h-[3.25rem] min-w-0 flex-1 items-center justify-center rounded-full bg-[var(--surface-ink)] px-3 text-[13px] font-semibold tracking-tight text-white shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] dark:bg-white dark:text-zinc-950 ${focusRing}`}
        >
          {estimateLabel}
        </button>
        <Link
          href="/#work"
          className={`flex min-h-[3.25rem] min-w-0 flex-1 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-[13px] font-semibold tracking-tight text-[var(--foreground)] shadow-[var(--shadow-xs)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] dark:border-zinc-700 dark:bg-[var(--surface)] ${focusRing}`}
        >
          {ctaViewWork}
        </Link>
      </div>
    </div>
  );
}
