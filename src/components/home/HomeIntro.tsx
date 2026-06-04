"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

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
  const [revealed, setRevealed] = useState(false);

  // IO-triggered color shift: paragraph starts muted, transitions to white
  useEffect(() => {
    const el = paragraphRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="intro-heading"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">

        {/* Two-col: stats left, paragraph right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">

          {/* LEFT: label + stats — stagger in on scroll */}
          <StaggerGroup className="flex shrink-0 flex-col gap-8 lg:w-[220px]">
            <StaggerItem>
              <SectionLabel text="About" />
            </StaggerItem>
            <StaggerItem>
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
            </StaggerItem>
          </StaggerGroup>

          {/* RIGHT: paragraph — slides in and color-reveals */}
          <div className="flex flex-1 flex-col justify-center">
            <motion.h2
              id="intro-heading"
              ref={paragraphRef}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease }}
              className="text-[1.75rem] font-medium leading-[1.25] tracking-[-0.02em] transition-colors duration-700 ease-out sm:text-[2rem] lg:text-[2.25rem]"
              style={{ color: revealed ? "#F0F0FF" : "rgba(200,200,216,0.35)" }}
            >
              We&rsquo;re a small studio that builds online stores, websites,
              and the tools behind them. We work directly with business
              owners&mdash;plan, build, launch. Clear price before anything
              starts.
            </motion.h2>
          </div>
        </div>

        {/* Partner text marquee */}
        <Reveal delay={0.1}>
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
        </Reveal>
      </div>
    </section>
  );
}
