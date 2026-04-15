"use client";

import { useConversion } from "@/components/conversion/ConversionContext";
import { focusRing } from "@/components/layout/layoutTokens";
import {
  brandContactEstimateCta,
  brandIntentActionLabels,
} from "@/lib/brand-knowledge";

type ContactEstimateButtonProps = {
  /** Dark slab contact column */
  variant?: "default" | "onDark";
};

export function ContactEstimateButton({
  variant = "default",
}: ContactEstimateButtonProps) {
  const { openEstimate, selectedIntent } = useConversion();
  const label =
    selectedIntent != null
      ? brandIntentActionLabels[selectedIntent].estimatePrimary
      : brandContactEstimateCta;

  const classOnDark = `mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/18 bg-white/[0.08] px-5 text-[13px] font-semibold tracking-tight text-zinc-50 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.45)] transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] sm:mt-6 sm:w-auto [@media(hover:hover)]:hover:bg-white/[0.12] ${focusRing}`;

  const classDefault = `mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--accent-muted)_28%,var(--surface))] px-5 text-[13px] font-semibold tracking-tight text-[var(--foreground)] shadow-[var(--shadow-xs)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] active:scale-[0.98] sm:mt-6 sm:w-auto dark:border-zinc-600 ${focusRing}`;

  return (
    <button
      type="button"
      onClick={() => openEstimate()}
      className={variant === "onDark" ? classOnDark : classDefault}
    >
      {label}
    </button>
  );
}
