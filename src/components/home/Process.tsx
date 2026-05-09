"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { brandProcess } from "@/lib/brand-knowledge";
import { contentWell } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: "-80px 0px" });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-[calc(4.5rem+0.25rem)] py-8 sm:scroll-mt-24 sm:py-10 md:scroll-mt-28"
    >
      <div className={contentWell}>
        {/* Section header */}
        <Reveal>
          <div className="mb-8 sm:mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7C3FFF]/90">
              {brandProcess.eyebrow}
            </p>
            <h2
              id="process-heading"
              className="mt-2 text-[1.875rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[2.25rem]"
            >
              {brandProcess.title}
            </h2>
            <p className="mt-2.5 text-[14px] text-[#C8C8D8]/70 sm:text-[15px]">
              {brandProcess.description}
            </p>
          </div>
        </Reveal>

        {/* Steps container */}
        <div ref={lineRef} className="relative">
          {/* Connecting line (desktop only) */}
          <div
            className="pointer-events-none absolute left-[calc(10%+2.5rem)] right-[calc(10%+2.5rem)] top-[2.25rem] hidden h-px bg-[#1E1E35] lg:block"
            aria-hidden
          >
            {!reduceMotion && (
              <motion.div
                className="h-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ duration: 1.1, delay: 0.4, ease }}
                style={{ transformOrigin: "left center" }}
              />
            )}
          </div>

          {/* Connecting line (mobile only) — runs along the left at x=20px */}
          <div
            className="pointer-events-none absolute bottom-5 left-5 top-5 w-px bg-[#1E1E35] lg:hidden"
            aria-hidden
          >
            {!reduceMotion && (
              <motion.div
                className="w-full bg-gradient-to-b from-[#7C3FFF] to-[#00E5FF]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isInView ? 1 : 0 }}
                transition={{ duration: 1.1, delay: 0.4, ease }}
                style={{ transformOrigin: "top center", height: "100%" }}
              />
            )}
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-8">
            {brandProcess.steps.map((step, i) => (
              <Reveal key={step.phase} delay={i * 0.1}>
                {/* Mobile: flex-row with small circle on left; Desktop: flex-col centered */}
                <div className="flex items-start gap-5 lg:flex-col lg:items-center lg:text-center">

                  {/* Mobile number circle (hidden on desktop) */}
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#7C3FFF]/35 bg-[#0A0A14] lg:hidden">
                    <span className="font-mono text-[0.6875rem] font-bold text-[#7C3FFF]">
                      {step.phase}
                    </span>
                  </div>

                  {/* Desktop large outlined number (hidden on mobile) */}
                  <div className="relative hidden h-[4.5rem] w-[4.5rem] items-center justify-center lg:flex">
                    <div
                      className="absolute -bottom-px left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#7C3FFF] bg-[#080810]"
                      aria-hidden
                    />
                    <span
                      className="select-none text-[4rem] font-black leading-none tracking-[-0.06em] text-transparent"
                      style={{ WebkitTextStroke: "1.5px rgba(124,63,255,0.6)" }}
                      aria-hidden
                    >
                      {step.phase}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="flex-1 lg:flex-none">
                    <h3 className="text-[1.0625rem] font-bold tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.125rem] lg:mt-5 lg:text-[1.375rem]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-[1.65] text-[#C8C8D8]/70 sm:text-[14px] lg:mt-2 lg:text-[15px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
