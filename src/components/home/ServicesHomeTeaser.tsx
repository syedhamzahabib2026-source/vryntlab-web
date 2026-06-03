"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { contentWell, focusRing } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";

type Service = {
  n: string;
  name: string;
  desc: string;
  outcome: string;
  icon: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    n: "01",
    name: "Shopify & E-commerce",
    desc: "Stores that guide people to checkout, not just browse",
    outcome: "Higher product page trust and cart completion",
    icon: "◈",
    href: "/services/shopify",
  },
  {
    n: "02",
    name: "Website Design & Development",
    desc: "Fast, clear sites that turn visitors into customers",
    outcome: "More visitors complete your contact or checkout flow",
    icon: "⟡",
    href: "/services/web-design",
  },
  {
    n: "03",
    name: "AI Chatbots",
    desc: "Trained on your business, not a generic FAQ",
    outcome: "Fewer repeat support questions, more captured leads",
    icon: "✦",
    href: "/services/ai-chatbot",
  },
  {
    n: "04",
    name: "SEO & Local Search",
    desc: "Show up when people search for what you offer",
    outcome: "The right searches surface your business",
    icon: "◉",
    href: "/services/seo",
  },
  {
    n: "05",
    name: "Automation & Integrations",
    desc: "Your tools talk to each other — no manual copy-paste",
    outcome: "No more copying leads between three spreadsheets",
    icon: "⇢",
    href: "/services/automation",
  },
  {
    n: "06",
    name: "Booking Systems & Forms",
    desc: "Booking and intake that runs without chasing people",
    outcome: "Fewer no-shows and less inbox back-and-forth",
    icon: "▢",
    href: "/services/booking-systems",
  },
  {
    n: "07",
    name: "App Development",
    desc: "iOS, Android, or web — built in testable stages",
    outcome: "Testable builds early before you're locked in",
    icon: "◷",
    href: "/#contact",
  },
  {
    n: "08",
    name: "Custom Software & APIs",
    desc: "Custom tools built for how you actually work",
    outcome: "Browser-based tools built in slices you can try",
    icon: "❖",
    href: "/#contact",
  },
  {
    n: "09",
    name: "Backend & Infrastructure",
    desc: "Infrastructure that doesn't break at the wrong moment",
    outcome: "Less downtime, documented so anyone can maintain it",
    icon: "⬡",
    href: "/#contact",
  },
];

type ServiceRowProps = {
  service: Service;
  isActive: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  reduceMotion: boolean;
};

function ServiceRow({
  service,
  isActive,
  isDimmed,
  onHoverStart,
  onHoverEnd,
  reduceMotion,
}: ServiceRowProps) {
  return (
    <Link
      href={service.href}
      className={`block border-b border-[#1E1E35] last:border-0 ${focusRing} rounded-sm`}
    >
      <motion.div
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        animate={
          reduceMotion
            ? {}
            : {
                opacity: isDimmed ? 0.35 : 1,
                backgroundColor: isActive ? "#0F0F1A" : "rgba(0,0,0,0)",
              }
        }
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="group relative cursor-pointer select-none overflow-hidden px-2 sm:px-4"
        style={{ opacity: isDimmed && reduceMotion ? 0.35 : 1 }}
      >
        <div className="flex items-center gap-3 py-4 sm:gap-5 sm:py-5 lg:gap-8 lg:py-6">
          {/* Number */}
          <span className="w-8 shrink-0 font-mono text-[11px] font-bold text-[#7C3FFF]/55 sm:text-[12px] lg:text-[13px]">
            {service.n}
          </span>

          {/* Name + desc */}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-6">
            <h3 className="text-[0.9375rem] font-bold tracking-[-0.02em] text-[#F0F0FF] sm:text-[1.125rem] md:text-[1.375rem] lg:text-[1.5rem]">
              {service.name}
            </h3>
            <p className="text-[12px] text-[#8888a8] sm:text-[13px] lg:text-[14px]">{service.desc}</p>
          </div>

          {/* Outcome on hover — slides in from right */}
          <AnimatePresence>
            {isActive && !reduceMotion && (
              <motion.div
                key="outcome"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="hidden shrink-0 items-center gap-2 lg:flex"
              >
                <span className="text-[1rem] text-[#7C3FFF]">{service.icon}</span>
                <span className="max-w-[22ch] text-[13px] font-medium text-[#00E5FF]">
                  {service.outcome}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrow */}
          <motion.span
            animate={reduceMotion ? {} : { x: isActive ? 2 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 text-[#8888a8] transition-colors duration-200 group-hover:text-[#F0F0FF]"
            aria-hidden
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

export function ServicesHomeTeaser() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-[calc(4.5rem+0.25rem)] py-8 sm:scroll-mt-24 sm:py-10 md:scroll-mt-28"
    >
      <div className={contentWell}>
        {/* Section header */}
        <Reveal>
          <div className="mb-6 sm:mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7C3FFF]/90">
              Services
            </p>
            <h2
              id="services-heading"
              className="mt-2 text-[1.875rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[2.25rem]"
            >
              What we do
            </h2>
            <p className="mt-2.5 max-w-[52ch] text-[14px] text-[#C8C8D8]/70 sm:text-[15px]">
              Tell us what&apos;s not working. We&apos;ll tell you if we can help and what it costs.
            </p>
          </div>
        </Reveal>

        {/* Service list */}
        <Reveal>
          <div className="border-t border-[#1E1E35]">
            {SERVICES.map((service, i) => (
              <ServiceRow
                key={service.n}
                service={service}
                isActive={activeIndex === i}
                isDimmed={activeIndex !== null && activeIndex !== i}
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </Reveal>

        {/* Footer CTA */}
        <Reveal>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-[#8888a8]">
              Every project is built around your actual problem.
            </p>
            <Link
              href="/services"
              className={`inline-flex items-center gap-2 rounded-full border border-[#1E1E35] bg-[#0F0F1A] px-5 py-2.5 text-[13px] font-semibold text-[#F0F0FF] transition-[border-color,transform] duration-300 active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:border-violet-500/40 [@media(hover:hover)]:hover:-translate-y-px`}
            >
              Full services →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
