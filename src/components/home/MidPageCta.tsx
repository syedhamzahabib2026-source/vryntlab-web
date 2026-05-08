"use client";

import Link from "next/link";
import { useConversion } from "@/components/conversion/ConversionContext";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import {
  brandIntentActionLabels,
  brandMidPageCta,
  brandMidPageIntentNudge,
} from "@/lib/brand-knowledge";

type MidPageCtaProps = {
  variant: "after-work" | "after-services";
};

export function MidPageCta({ variant }: MidPageCtaProps) {
  const { openEstimate, selectedIntent } = useConversion();
  const c = brandMidPageCta[variant];
  const intentLine =
    selectedIntent != null
      ? brandMidPageIntentNudge[variant][selectedIntent]
      : null;

  return (
    <div className="py-5 sm:py-6 md:py-7">
      <Reveal>
        <div
          className={`${contentWell} relative overflow-hidden rounded-[1.35rem] border border-violet-500/25 bg-[#0a0a18] p-6 text-white shadow-[0_28px_90px_-36px_rgba(0,0,0,0.65),0_0_0_1px_rgba(124,63,255,0.12)_inset] sm:flex sm:items-stretch sm:justify-between sm:gap-8 sm:rounded-[1.5rem] sm:p-7 md:p-8`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#00E5FF]/[0.07] blur-3xl"
          />
          <div className="relative min-w-0 max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00E5FF]/90">
              {c.kicker}
            </p>
            <p className="font-display mt-2 max-w-[28ch] text-balance text-[1.3125rem] font-normal leading-[1.14] tracking-[-0.024em] text-white sm:max-w-none sm:text-2xl sm:leading-[1.12] sm:tracking-[-0.025em]">
              {c.title}
            </p>
            <p className="mt-2 text-pretty text-[13px] leading-relaxed text-zinc-300 sm:mt-3 sm:max-w-lg sm:text-[14px] sm:leading-[1.6]">
              {c.body}
            </p>
            {intentLine ? (
              <p className="mt-2.5 text-[12px] leading-relaxed text-zinc-400 sm:max-w-lg">
                {intentLine}
              </p>
            ) : null}
          </div>
          <div className="relative mt-6 flex w-full shrink-0 flex-col items-stretch gap-3 sm:mt-0 sm:w-auto sm:min-w-[12.5rem] sm:justify-center sm:gap-3">
            <button
              type="button"
              onClick={() => openEstimate(selectedIntent ?? undefined)}
              className={`inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-5 text-[13px] font-semibold tracking-tight text-white shadow-[0_12px_40px_-16px_rgba(124,63,255,0.45)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-premium)] [@media(hover:hover)]:hover:shadow-[0_16px_44px_-14px_rgba(124,63,255,0.6)] active:scale-[0.98] sm:min-h-12 ${focusRing}`}
            >
              {selectedIntent != null
                ? brandIntentActionLabels[selectedIntent].estimatePrimary
                : c.primary}
            </button>
            <Link
              href="/#contact"
              className={`text-center text-[13px] font-semibold text-[#00E5FF]/95 underline decoration-[#00E5FF]/35 underline-offset-[6px] transition-[color,text-decoration-color] duration-300 ease-[var(--ease-out-premium)] sm:text-left ${focusRing} rounded-sm [@media(hover:hover)]:hover:decoration-[#00E5FF]/60`}
            >
              {c.secondary}
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
