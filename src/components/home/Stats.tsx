"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { contentWell } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";

type Stat = {
  value: number;
  display: string;
  prefix?: string;
  suffix?: string;
  label: string;
  isStatic?: boolean;
};

const STATS: Stat[] = [
  { value: 2, display: "2wk", suffix: "wk", label: "Not Months" },
  { value: 100, display: "100%", suffix: "%", label: "Client Ownership" },
  { value: 0, display: "$0", prefix: "$", label: "Agency Overhead" },
  { value: 0, display: "1:1", isStatic: true, label: "Direct Access" },
];

function CountUp({
  target,
  suffix = "",
  started,
}: {
  target: number;
  suffix?: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    if (target === 0) {
      setCount(0);
      return;
    }
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [started, target]);

  return (
    <span aria-hidden>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section aria-label="Key numbers" className="py-5 sm:py-6">
      <div className={contentWell}>
        <Reveal>
          <div
            ref={ref}
            className="grid grid-cols-2 border border-[#1E1E35] lg:grid-cols-4"
          >
            {STATS.map((stat, i) => {
              // Mobile 2×2: col-right gets left border, bottom row gets top border
              // Desktop 4-col: all but first get left border only
              const borderClass =
                i === 0 ? "" :
                i === 1 ? "border-l border-[#1E1E35]" :
                i === 2 ? "border-t border-[#1E1E35] lg:border-t-0 lg:border-l" :
                          "border-l border-t border-[#1E1E35] lg:border-t-0";
              return (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center justify-center px-3 py-8 text-center sm:px-6 sm:py-10 lg:py-12 ${borderClass}`}
                >
                  <span className="sr-only">{stat.display} {stat.label}</span>

                  <span
                    className="text-[2.25rem] font-black leading-none tracking-[-0.04em] text-[#F0F0FF] sm:text-[3rem] lg:text-[4.5rem]"
                    aria-hidden
                  >
                    {stat.isStatic ? (
                      stat.display
                    ) : (
                      <>
                        {stat.prefix}
                        <CountUp
                          target={stat.value}
                          suffix={stat.suffix}
                          started={isInView}
                        />
                      </>
                    )}
                  </span>

                  <span
                    className="my-2.5 h-px w-7 bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] sm:my-3 sm:w-8"
                    aria-hidden
                  />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8888a8] sm:text-[12px]">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
