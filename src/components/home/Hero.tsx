"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { motionEase } from "@/components/motion/Reveal";
import { placeholderImages } from "@/lib/placeholder-images";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";

const buttonTransition = { duration: 0.2, ease: motionEase };

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden pb-8 pt-2 md:pb-12 md:pt-4"
      aria-labelledby="hero-heading"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-15%] flex justify-center opacity-70 dark:opacity-50"
        style={{ y: parallaxY }}
      >
        <div className="h-[min(24rem,65vw)] w-[min(40rem,90vw)] rounded-full bg-zinc-200/25 blur-3xl dark:bg-zinc-700/15" />
      </motion.div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <StaggerGroup
          mode="immediate"
          className="flex w-full flex-col items-center"
        >
          <StaggerItem>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-500">
              Trellisify
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1
              id="hero-heading"
              className="mt-7 max-w-[18ch] text-balance text-4xl font-semibold tracking-[-0.03em] text-zinc-950 sm:max-w-none sm:text-5xl md:text-6xl md:leading-[1.05] dark:text-zinc-50"
            >
              Web work that holds up in the real world
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-[1.65] text-zinc-600 md:text-[1.125rem] md:leading-relaxed dark:text-zinc-400">
              We build and fix websites, wire up automations, and ship the odd
              custom product when templates stop being enough. Small team, direct
              conversation, no jargon unless you want it.
            </p>
          </StaggerItem>
          <StaggerItem className="mt-11 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <motion.a
              href="#contact"
              className="inline-flex h-12 min-w-[168px] items-center justify-center rounded-full bg-zinc-950 px-9 text-[13px] font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={buttonTransition}
            >
              Start a project
            </motion.a>
            <motion.a
              href="#work"
              className="inline-flex h-12 min-w-[168px] items-center justify-center rounded-full border border-zinc-300/90 bg-white/90 px-9 text-[13px] font-medium text-zinc-900 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-950/85 dark:text-zinc-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={buttonTransition}
            >
              See recent work
            </motion.a>
          </StaggerItem>
          <StaggerItem className="mt-16 w-full md:mt-24">
            <VisualPlaceholder
              variant="hero"
              aspect="cinematic"
              caption="Studio mood — placeholder; swap for your own shot"
              className="w-full"
            >
              <Image
                src={placeholderImages.hero}
                alt="Workspace with laptop"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </VisualPlaceholder>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-10 max-w-md text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-500 md:mt-14">
              If you like clear estimates and code you can hand off later,
              we&apos;ll probably get along.
            </p>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
