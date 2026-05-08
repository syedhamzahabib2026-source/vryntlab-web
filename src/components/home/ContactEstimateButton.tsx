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

  const classOnDark = `mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#7C3FFF] bg-transparent px-5 text-[13px] font-semibold text-[#7C3FFF] transition-all duration-300 sm:mt-6 sm:w-auto ${focusRing} hover:bg-[#7C3FFF] hover:text-white`;

  const classDefault = `mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#1E1E35] bg-[#0F0F1A] px-5 text-[13px] font-semibold text-[#C8C8D8] transition-all duration-300 sm:mt-6 sm:w-auto ${focusRing} hover:border-[#7C3FFF]/50 hover:text-[#F0F0FF]`;

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
