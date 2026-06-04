"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { focusRing } from "@/components/layout/layoutTokens";
import { caseStudies } from "@/lib/case-studies";

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

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-4 shrink-0 bg-[#8888a8]" aria-hidden />
      <span className="text-[13px] font-normal text-[#8888a8]">{text}</span>
    </div>
  );
}

type WorkCardProps = {
  study: (typeof caseStudies)[number];
  priority?: boolean;
};

function WorkCard({ study, priority = false }: WorkCardProps) {
  const hero = study.media.images[0] ?? "";
  const tall = study.media.images[1] ?? "";
  const cardRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Scroll-linked entry: card lifts in as it enters viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const entryScale = useTransform(scrollYProgress, [0, 0.6], [0.96, 1.0]);

  return (
    <motion.article
      ref={cardRef}
      className="group overflow-hidden rounded-2xl border border-[#1E1E35] bg-[#0c0c18]"
      style={{ scale: entryScale }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.75, ease }}
    >
      {/* Violet accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-[#7C3FFF] to-[#5533DD]" />

      {/* Card body: tall scrolling screenshot */}
      <Link
        href={`/work/${study.id}`}
        className={`relative block overflow-hidden ${focusRing}`}
        style={{ minHeight: "480px" }}
        aria-label={`View ${study.client} case study`}
      >
        {/* Auto-scrolling tall image (always running, top→bottom→top) */}
        <div className="absolute inset-0 overflow-hidden [container-type:size]">
          {reduceMotion ? (
            <Image
              src={hero}
              alt={study.coverAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
              priority={priority}
            />
          ) : (
            <div className="work-scroll-auto relative w-full">
              <Image
                src={tall}
                alt={study.imageAlts[1] ?? study.coverAlt}
                width={1600}
                height={2600}
                className="h-auto w-full max-w-none"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
                priority={priority}
              />
            </div>
          )}
        </div>

        {/* Bottom gradient + project info overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#060610]/95 via-[#060610]/65 to-transparent px-6 pb-6 pt-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7C3FFF]">
            {study.typeLabel}
          </p>
          <h3 className="mt-2 text-[1.375rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#F0F0FF]">
            {study.client}
          </h3>
          <p className="mt-1 line-clamp-2 text-[0.875rem] leading-[1.5] text-[#8888a8]">
            {study.cardOutcome}
          </p>
        </div>

        {/* Hover dark overlay */}
        <div
          className="absolute inset-0 bg-black/0 transition-[background-color] duration-300 group-hover:bg-black/20"
          aria-hidden
        />

        {/* "View case study" pill on hover */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        >
          <span className="rounded-full bg-white/10 px-5 py-2.5 text-[14px] font-medium text-white backdrop-blur-md ring-1 ring-white/15">
            View case study →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function NdaCard() {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-[#1E1E35] bg-[#0c0c18]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, ease }}
    >
      <div className="h-[3px] bg-[#1E1E35]" />
      <div
        className="flex min-h-[160px] items-center justify-center px-8 py-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,63,255,0.05) 0%, rgba(0,229,255,0.02) 100%)",
        }}
      >
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8888a8]/50">
            NDA
          </p>
          <p className="mt-2 text-[1.0625rem] font-medium text-[#F0F0FF]">
            More on request
          </p>
          <p className="mt-1.5 text-[0.875rem] text-[#8888a8]">
            Partner builds and NDA work available on request
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedWork() {
  const [study1, study2] = [caseStudies[0]!, caseStudies[1]!];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-16 lg:py-[140px]"
      style={{ background: "var(--surface)" }}
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={parentVariant}
        >
          <motion.div variants={childVariant}>
            <SectionLabel text="Selected Work" />
          </motion.div>

          <div className="mt-6 overflow-hidden">
            <motion.h2
              id="work-heading"
              variants={childVariant}
              className="text-[3rem] font-medium leading-[1] tracking-[-0.04em] text-[#F0F0FF] sm:text-[4.5rem] lg:text-[6rem]"
            >
              Featured{" "}
              <span className="text-[#C8C8D8]/30">Work</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Two project cards side by side on desktop */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-7">
          <WorkCard study={study1} priority />
          <WorkCard study={study2} />
        </div>

        {/* NDA card below, full width */}
        <div className="mt-5 lg:mt-7">
          <NdaCard />
        </div>
      </div>
    </section>
  );
}
