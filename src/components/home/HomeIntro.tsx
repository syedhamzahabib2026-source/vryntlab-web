"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const childVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

const parentVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const STATS = [
  { number: "2+", label: "Years running" },
  { number: "100%", label: "Client ownership" },
  { number: "1–2 wk", label: "Average launch" },
] as const;

const MARQUEE_ITEMS = [
  "Shopify Stores",
  "Web Design",
  "AI Chatbots",
  "SEO",
  "Automations",
  "Booking Systems",
] as const;

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
      <span className="text-[13px] font-normal text-[#8888a8]">{text}</span>
    </div>
  );
}

export function HomeIntro() {
  const paragraphRef = useRef<HTMLHeadingElement>(null);

  // Scroll-linked color: paragraph fades from gray to near-white as it scrolls into center
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start end", "end center"],
  });
  const color = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    ["#8a8a8a", "#F0F0FF"],
  );

  return (
    <section
      id="about"
      aria-labelledby="intro-heading"
      className="py-16 lg:py-[140px]"
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">

        {/* Two-col: stats left, paragraph right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">

          {/* LEFT: label + stats */}
          <motion.div
            className="flex shrink-0 flex-col gap-8 lg:w-[220px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={parentVariant}
          >
            <motion.div variants={childVariant}>
              <SectionLabel text="About" />
            </motion.div>
            <motion.div variants={childVariant}>
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 lg:flex-col lg:gap-6">
                {STATS.map(({ number, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-[11px] font-normal uppercase tracking-[0.14em] text-[#8888a8]">
                      {label}
                    </span>
                    <span className="text-[1.25rem] font-medium text-[#F0F0FF]">
                      {number}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: paragraph — entrance animation + continuous scroll color shift */}
          <div className="flex flex-1 flex-col justify-center">
            <motion.h2
              id="intro-heading"
              ref={paragraphRef}
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.75, ease }}
              style={{ color }}
              className="text-[1.75rem] font-medium leading-[1.25] tracking-[-0.02em] sm:text-[2rem] lg:text-[2.25rem]"
            >
              We&rsquo;re a small studio that builds Shopify stores, websites,{" "}
              <span className="text-white/40">and</span> the automations behind them.
              You work directly with the people doing it.
              You see the number first.
            </motion.h2>
          </div>
        </div>

        {/* Partner text marquee */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
        >
          <div
            className="relative mt-16 overflow-hidden border-t border-[var(--border)] pt-10"
            aria-hidden
          >
            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />

            <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="flex items-center gap-10">
                  <span className="text-[14px] font-normal text-[#8888a8]">{item}</span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#8888a8]/40" />
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
