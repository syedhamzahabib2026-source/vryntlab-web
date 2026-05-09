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
    <section aria-label="Key numbers" className="py-10 sm:py-12">
      <div className={contentWell}>
        <Reveal>
          <div
            ref={ref}
            className="grid grid-cols-2 divide-x divide-[#1E1E35] border border-[#1E1E35] lg:grid-cols-4"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12"
              >
                {/* Accessible static value */}
                <span className="sr-only">
                  {stat.display} {stat.label}
                </span>

                <span
                  className="text-[3rem] font-black leading-none tracking-[-0.04em] text-[#F0F0FF] sm:text-[4rem] lg:text-[4.5rem]"
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

                {/* Divider line */}
                <span
                  className="my-3 h-px w-8 bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF]"
                  aria-hidden
                />

                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8888a8]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
