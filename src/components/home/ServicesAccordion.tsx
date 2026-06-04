"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { focusRing } from "@/components/layout/layoutTokens";

const ease = [0.22, 1, 0.36, 1] as const;

const childVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
};

const parentVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

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

// ─── Scroll progress constants ────────────────────────────────────────────────
// 6 services each get 1/6 of the scroll range; OL = crossfade overlap window
const S = 1 / 6;
const OL = 0.05;

// ─── Desktop sticky gallery ────────────────────────────────────────────────────

function StickyServices() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scene opacity — each layer fades in then fades out around its step boundary
  const op0 = useTransform(scrollYProgress, [0, S - OL, S + OL], [1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [S - OL, S + OL, 2 * S - OL, 2 * S + OL], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [2 * S - OL, 2 * S + OL, 3 * S - OL, 3 * S + OL], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [3 * S - OL, 3 * S + OL, 4 * S - OL, 4 * S + OL], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [4 * S - OL, 4 * S + OL, 5 * S - OL, 5 * S + OL], [0, 1, 1, 0]);
  const op5 = useTransform(scrollYProgress, [5 * S - OL, 5 * S + OL, 1.0], [0, 1, 1]);

  // Text Y — slides out up, next slides in from below
  const ty0 = useTransform(scrollYProgress, [S - OL, S + OL], [0, -50]);
  const ty1 = useTransform(scrollYProgress, [S - OL, S + OL, 2 * S - OL, 2 * S + OL], [50, 0, 0, -50]);
  const ty2 = useTransform(scrollYProgress, [2 * S - OL, 2 * S + OL, 3 * S - OL, 3 * S + OL], [50, 0, 0, -50]);
  const ty3 = useTransform(scrollYProgress, [3 * S - OL, 3 * S + OL, 4 * S - OL, 4 * S + OL], [50, 0, 0, -50]);
  const ty4 = useTransform(scrollYProgress, [4 * S - OL, 4 * S + OL, 5 * S - OL, 5 * S + OL], [50, 0, 0, -50]);
  const ty5 = useTransform(scrollYProgress, [5 * S - OL, 5 * S + OL], [50, 0]);

  // Image scale — starts slightly zoomed, settles as scene holds
  const sc0 = useTransform(scrollYProgress, [0, S], [1.05, 1.0]);
  const sc1 = useTransform(scrollYProgress, [S, 2 * S], [1.05, 1.0]);
  const sc2 = useTransform(scrollYProgress, [2 * S, 3 * S], [1.05, 1.0]);
  const sc3 = useTransform(scrollYProgress, [3 * S, 4 * S], [1.05, 1.0]);
  const sc4 = useTransform(scrollYProgress, [4 * S, 5 * S], [1.05, 1.0]);
  const sc5 = useTransform(scrollYProgress, [5 * S, 1.0], [1.05, 1.0]);

  // Progress bar fills as you scroll through all 6 services
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const opacities = [op0, op1, op2, op3, op4, op5];
  const tyValues = [ty0, ty1, ty2, ty3, ty4, ty5];
  const scValues = [sc0, sc1, sc2, sc3, sc4, sc5];

  return (
    <section
      ref={sectionRef}
      aria-label="Our Services"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 flex h-screen overflow-hidden">

        {/* ── Left: text panel ──────────────────────────────── */}
        <div
          className="relative w-[44%] shrink-0 overflow-hidden"
          style={{ background: "var(--surface)" }}
        >
          {/* Service text layers — all stacked, crossfade via opacity + y */}
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.num}
              className="absolute inset-0 flex items-center"
              style={{ opacity: opacities[i] }}
            >
              <motion.div
                className="w-full px-8 lg:px-12 xl:px-16"
                style={{ y: tyValues[i] }}
              >
                {/* Section eyebrow — only on first scene */}
                {i === 0 && (
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
                    <span className="text-[13px] font-normal text-[#8888a8]">
                      What We Do Best
                    </span>
                  </div>
                )}

                {/* Service number pill with gradient */}
                <div className="inline-flex items-center rounded-full bg-[#7C3FFF]/10 px-3 py-1.5 ring-1 ring-[#7C3FFF]/30">
                  <span className="bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-[12px] font-semibold tracking-[0.1em] text-transparent">
                    {svc.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.04em] text-[#F0F0FF] lg:text-[2.25rem] xl:text-[2.75rem]">
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="mt-4 max-w-[34ch] text-[1.0625rem] leading-[1.65] text-[#8888a8]">
                  {svc.description}
                </p>

                {/* Link */}
                <Link
                  href={svc.href}
                  className={`mt-8 inline-flex items-center gap-2 text-[14px] font-normal text-[#C8C8D8]/55 transition-colors duration-200 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#F0F0FF]`}
                >
                  Learn more
                  <span aria-hidden className="inline-block transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}

          {/* Progress line at the bottom */}
          <div className="absolute bottom-10 left-8 right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16">
            <div className="h-px w-full bg-[#1E1E35]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF]"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>

        {/* ── Right: image panel ────────────────────────────── */}
        <div className="relative flex-1 overflow-hidden">

          {/* Gradient edge where text panel meets image */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-20"
            style={{ background: "linear-gradient(to right, var(--surface), transparent)" }}
          />

          {/* Image layers */}
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.num}
              className="absolute inset-0"
              style={{ opacity: opacities[i], scale: scValues[i] }}
            >
              <Image
                src={svc.imageSrc}
                alt={svc.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56vw, 100vw"
                priority={i === 0}
              />
              {/* Bottom vignette for visual depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mobile stacked list ───────────────────────────────────────────────────────

function MobileServicesList() {
  return (
    <section
      aria-label="Our Services"
      className="py-16"
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8">

        {/* Header */}
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

        {/* Service rows */}
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
                {/* Thumbnail */}
                <div className="relative h-[56px] w-[84px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={svc.imageSrc}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                    sizes="84px"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8888a8]">
                    {svc.num}
                  </span>
                  <p className="mt-0.5 text-[1.0625rem] font-medium leading-[1.3] text-[#F0F0FF]">
                    {svc.title}
                  </p>
                </div>

                {/* Arrow */}
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

// ─── Exported section ──────────────────────────────────────────────────────────

export function ServicesAccordion() {
  return (
    <>
      {/* Mobile: stacked list (< lg) */}
      <div className="block lg:hidden">
        <MobileServicesList />
      </div>

      {/* Desktop: sticky scroll gallery (≥ lg) */}
      <div className="hidden lg:block">
        <StickyServices />
      </div>
    </>
  );
}
