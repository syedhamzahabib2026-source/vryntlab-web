"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { focusRing } from "@/components/layout/layoutTokens";

const ease = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    num: "01",
    title: "Ecommerce & Shopify",
    description:
      "Custom Shopify stores built to convert. Product pages, checkout flow, and everything your store needs to sell.",
    href: "/services/shopify",
    imageSrc: "/images/services/ecommerce.jpg",
    imageAlt: "Laptop showing an ecommerce store checkout",
  },
  {
    num: "02",
    title: "Web Design",
    description:
      "Marketing sites that load fast, tell a clear story, and turn visitors into customers.",
    href: "/services/web-design",
    imageSrc: "/images/services/web-design.jpg",
    imageAlt: "Modern website displayed on a desktop monitor",
  },
  {
    num: "03",
    title: "AI Chatbots",
    description:
      "Your visitors get instant answers about your products and services. Ready-to-buy leads reach you directly.",
    href: "/services/ai-chatbot",
    imageSrc: "/images/services/chatbot.jpg",
    imageAlt: "AI chat interface on a smartphone screen",
  },
  {
    num: "04",
    title: "SEO",
    description:
      "Get found by the people already searching for what you sell. Technical SEO, local search, and content that ranks.",
    href: "/services/seo",
    imageSrc: "/images/services/seo.jpg",
    imageAlt: "Search analytics displayed on a laptop screen",
  },
  {
    num: "05",
    title: "Automations",
    description:
      "Connect your tools and skip the manual work. Orders, emails, inventory, and CRM all talking to each other.",
    href: "/services/automation",
    imageSrc: "/images/services/automation.jpg",
    imageAlt: "Circuit board representing automated systems",
  },
  {
    num: "06",
    title: "Booking Systems",
    description:
      "Online booking that works while you sleep. Calendar sync, confirmations, and payments built in.",
    href: "/services/booking-systems",
    imageSrc: "/images/services/booking.jpg",
    imageAlt: "Calendar and scheduling interface on a device",
  },
] as const;

// ─── Sticky scroll gallery — works on ALL screen sizes ────────────────────────
//
// Mobile (flex-col):  image top 40% → text bottom 60%
// Desktop (flex-row): text left 44% → image right flex-1
//
// AnimatePresence mode="wait" is identical on both — one service at a time,
// crossfade triggered by scroll progress. Same useScroll/useMotionValueEvent
// math on all screen sizes.
//
// Section height: 500vh mobile / 600vh desktop (shorter on small screens so
// scrolling through all 6 services doesn't feel endless).
// Sticky inner: 100dvh mobile (dynamic viewport height handles address bar) /
// 100vh desktop.

function StickyServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(5, Math.floor(v * 6)));
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const svc = SERVICES[activeIdx]!;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="h-[400vh] lg:h-[600vh]"
    >
      <h2 id="services-heading" className="sr-only">
        Our services
      </h2>
      {/* Sticky panel — flex-col on mobile, flex-row on desktop.
          pt-20 below lg keeps the image clear of the sticky header. */}
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden pt-20 lg:h-screen lg:flex-row lg:pt-0">

        {/* ── Image panel ────────────────────────────────────────────────────
            DOM first → naturally at the TOP in flex-col (mobile).
            On desktop we push it RIGHT with lg:order-last.                 */}
        <div className="relative h-[40%] w-full shrink-0 overflow-hidden lg:order-last lg:h-full lg:flex-1">

          {/* Left-edge gradient — desktop only (blends into text panel) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-20 lg:block"
            style={{ background: "linear-gradient(to right, var(--surface), transparent)" }}
          />

          <AnimatePresence>
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0"
            >
              <Image
                src={svc.imageSrc}
                alt={svc.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56vw, 100vw"
                priority={activeIdx === 0}
              />
              {/* Bottom-fade into text panel on mobile; subtle vignette on desktop */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 lg:h-48"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Text panel ─────────────────────────────────────────────────────
            DOM second → naturally at the BOTTOM in flex-col (mobile).
            On desktop we push it LEFT with lg:order-first.                 */}
        <div
          className="relative h-[60%] w-full shrink-0 overflow-hidden lg:order-first lg:h-full lg:w-[44%]"
          style={{ background: "var(--surface)" }}
        >
          <AnimatePresence>
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
                {activeIdx === 0 && (
                  <div className="mb-4 flex items-center gap-2.5 lg:mb-6">
                    <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
                    <span className="text-[13px] font-normal text-[#8888a8]">
                      What We Do Best
                    </span>
                  </div>
                )}

                <div className="inline-flex items-center rounded-full bg-[#7C3FFF]/10 px-3 py-1.5 ring-1 ring-[#7C3FFF]/30">
                  <span className="bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-[12px] font-semibold tracking-[0.1em] text-transparent">
                    {svc.num}
                  </span>
                </div>

                <h3 className="mt-4 text-[1.5rem] font-medium leading-[1.1] tracking-[-0.04em] text-[#F0F0FF] sm:text-[1.75rem] lg:mt-5 lg:text-[2.25rem] xl:text-[2.75rem]">
                  {svc.title}
                </h3>

                <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-[1.65] text-[#8888a8] lg:mt-4 lg:text-[1.0625rem]">
                  {svc.description}
                </p>

                <Link
                  href={svc.href}
                  className={`mt-5 inline-flex min-h-11 items-center gap-2 text-[14px] font-normal text-[#C8C8D8]/55 transition-colors duration-200 ${focusRing} rounded-sm lg:mt-8 [@media(hover:hover)]:hover:text-[#F0F0FF]`}
                >
                  Learn more
                  <span aria-hidden className="inline-block transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar pinned to bottom of text panel */}
          {/* bottom-24 below lg clears the fixed mobile CTA bar */}
          <div className="absolute bottom-24 left-6 right-6 sm:left-8 sm:right-8 lg:bottom-10 lg:left-12 lg:right-12 xl:left-16 xl:right-16">
            <div className="h-px w-full bg-[#1E1E35]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF]"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mobile stacked list — commented-out backup; do not render ────────────────
/*
const childVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
};
const parentVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

function MobileServicesList() {
  return (
    <section
      aria-label="Our Services"
      className="py-16"
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={parentVariant}
        >
          <motion.div variants={childVariant} className="flex items-center gap-2.5">
            <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
            <span className="text-[13px] font-normal text-[#8888a8]">What We Do Best</span>
          </motion.div>
          <div className="mt-6 overflow-hidden">
            <motion.h2
              variants={childVariant}
              className="text-[2.5rem] font-medium leading-[1] tracking-[-0.04em] text-[#F0F0FF]"
            >
              Our{" "}
              <span className="text-[#C8C8D8]/30">Services</span>
            </motion.h2>
          </div>
        </motion.div>
        <div className="mt-10">
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease }}
            >
              <Link
                href={svc.href}
                className={`group flex items-center gap-5 border-t border-[#1E1E35] py-6 ${focusRing} rounded-sm`}
              >
                <div className="relative h-[56px] w-[84px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={svc.imageSrc}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                    sizes="84px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8888a8]">
                    {svc.num}
                  </span>
                  <p className="mt-0.5 text-[1.0625rem] font-medium leading-[1.3] text-[#F0F0FF]">
                    {svc.title}
                  </p>
                </div>
                <span
                  className="shrink-0 text-[#8888a8] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-[#1E1E35]" />
        </div>
      </div>
    </section>
  );
}
*/

// ─── Exported section ──────────────────────────────────────────────────────────

export function ServicesAccordion() {
  return <StickyServices />;
}
