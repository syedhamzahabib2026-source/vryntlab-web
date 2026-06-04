"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { focusRing } from "@/components/layout/layoutTokens";

const ease = [0.22, 1, 0.36, 1] as const;

const CYCLING_WORDS = [
  "Shopify Store",
  "Website",
  "Chatbot",
  "Bookings",
] as const;

const childVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
};

const parentVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Section-scoped scroll progress — drives the fade-out effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  // CTA image breathing scale as it enters viewport
  const { scrollYProgress: ctaScrollY } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaImgScale = useTransform(ctaScrollY, [0, 0.5], [0.94, 1.02]);

  // Hero content fades, lifts, and scales out as user scrolls into the next section
  const heroOpacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);
  const heroY      = useTransform(scrollYProgress, [0.4, 0.8], [0, -60]);
  const heroScale  = useTransform(scrollYProgress, [0.4, 0.8], [1, 0.97]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative w-full"
      aria-labelledby="hero-heading"
    >
      {/* Backgrounds — fill the full section height (180vh on desktop) */}
      <div aria-hidden className="hero-dot-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-gradient-mesh pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[50rem] w-[50rem] rounded-full blur-[180px]"
        style={{ background: "rgba(124,63,255,0.07)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[36rem] w-[36rem] rounded-full blur-[140px]"
        style={{ background: "rgba(0,229,255,0.05)" }}
      />

      {/*
        Scroll runway: on desktop this div is 180vh tall, giving the sticky panel
        room to pin while the user scrolls through it.
        On mobile it collapses to auto (no sticky, normal flow).
      */}
      <div className="lg:h-[180vh]">
        {/* Sticky panel: pins at viewport top on desktop */}
        <div className="flex items-center py-16 pt-[140px] lg:sticky lg:top-0 lg:h-screen lg:py-0">
          {/* Content wrapper — fades/lifts out as scroll progresses on desktop */}
          <motion.div
            className="relative mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]"
            style={!reduceMotion ? { opacity: heroOpacity, y: heroY, scale: heroScale } : undefined}
          >
            {/* Two-column on desktop: text left, CTA image right */}
            <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-16">

              {/* Left: stagger text entrance */}
              <motion.div
                className="flex-1"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={parentVariant}
              >
                <motion.h1
                  id="hero-heading"
                  variants={childVariant}
                  className="text-[3rem] font-medium leading-[1] tracking-[-0.04em] text-[#F0F0FF] sm:text-[4.5rem] lg:text-[6rem]"
                >
                  <span className="text-[#C8C8D8]/40">Your </span>

                  <span className="relative inline-block">
                    <span className="invisible select-none" aria-hidden>
                      {CYCLING_WORDS[0]},
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={CYCLING_WORDS[wordIndex]}
                        initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                        transition={{ duration: 0.28, ease }}
                        className="absolute left-0 top-0 whitespace-nowrap text-[#F0F0FF]"
                        aria-live="polite"
                      >
                        {CYCLING_WORDS[wordIndex]},
                      </motion.span>
                    </AnimatePresence>
                  </span>

                  <br />
                  <span className="bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] bg-clip-text text-transparent">
                    built to sell.
                  </span>
                </motion.h1>

                <motion.p
                  variants={childVariant}
                  className="mt-8 max-w-[46ch] text-[1.125rem] leading-[1.55] text-[#C8C8D8]/60 sm:text-[1.25rem]"
                >
                  Shopify stores, websites, and the automations behind them.
                  A clear plan and price before we start.
                </motion.p>

                <motion.div
                  variants={childVariant}
                  className="mt-10 flex items-center gap-4"
                >
                  <Link
                    href="/#contact"
                    className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7C3FFF] to-[#00E5FF] px-7 py-3.5 text-[16px] font-medium text-white shadow-[0_0_32px_-8px_rgba(124,63,255,0.55)] transition-[transform,box-shadow] duration-[180ms] ease-[var(--ease-out-premium)] active:scale-[0.98] ${focusRing} [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:shadow-[0_0_44px_-4px_rgba(124,63,255,0.75)]`}
                  >
                    Say Hello
                    <span
                      aria-hidden
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[14px]"
                    >
                      →
                    </span>
                  </Link>

                  <Link
                    href="/#work"
                    className={`inline-flex items-center gap-2 text-[16px] font-normal text-[#C8C8D8]/60 underline decoration-white/20 underline-offset-4 transition-colors duration-200 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#F0F0FF] [@media(hover:hover)]:hover:decoration-white/45`}
                  >
                    View Work
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right: CTA image — desktop only, scroll-linked scale + gentle float */}
              <motion.div
                ref={ctaRef}
                className="hidden lg:block lg:w-[46%] lg:shrink-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease, delay: 0.25 }}
                style={{ scale: ctaImgScale }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <Image
                    src="/images/cta.png"
                    alt="VryntLab workspace — custom websites, Shopify stores, and automations"
                    width={640}
                    height={480}
                    className="w-full rounded-2xl shadow-[0_0_80px_-20px_rgba(124,63,255,0.4),0_40px_80px_-20px_rgba(0,0,0,0.7)]"
                    priority
                  />
                  {/* Subtle inner ring */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.07]"
                  />
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
