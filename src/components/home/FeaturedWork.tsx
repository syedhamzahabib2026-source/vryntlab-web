"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { focusRing } from "@/components/layout/layoutTokens";
import { caseStudies, caseStudyPosterUrl } from "@/lib/case-studies";

const ease = [0.16, 1, 0.3, 1] as const;

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
  delay?: number;
};

function WorkCard({ study, priority = false, delay = 0 }: WorkCardProps) {
  const posterSrc = caseStudyPosterUrl(study.media);

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-t border-[#1E1E35] px-0 py-5">
        <Link
          href={`/work/${study.id}`}
          className={`flex items-center gap-2 text-[15px] font-normal text-[#8888a8] transition-colors duration-200 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#F0F0FF]`}
          tabIndex={0}
        >
          View
          <span
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </Link>
        <span className="text-[15px] font-normal text-[#F0F0FF]">
          {study.client}
        </span>
        {/* Balance spacer */}
        <span className="w-[52px]" aria-hidden />
      </div>

      {/* Image — full bleed */}
      <Link
        href={`/work/${study.id}`}
        className={`relative block overflow-hidden rounded-sm ${focusRing}`}
        style={{ aspectRatio: "16 / 9" }}
        tabIndex={-1}
        aria-label={`View ${study.client} case study`}
      >
        <Image
          src={posterSrc}
          alt={study.coverAlt}
          fill
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-premium)] will-change-transform group-hover:scale-[1.03]"
          sizes="(max-width: 1290px) 100vw, 1290px"
          priority={priority}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black/0 transition-[background-color] duration-500 group-hover:bg-black/30"
          aria-hidden
        />
        {/* "View →" overlay label — fades in on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-[var(--ease-out-premium)] group-hover:opacity-100"
          aria-hidden
        >
          <span className="rounded-full bg-white/10 px-5 py-2 text-[15px] font-medium text-white backdrop-blur-md ring-1 ring-white/15">
            View →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedWork() {
  const [study1, study2] = [caseStudies[0]!, caseStudies[1]!];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      style={{
        paddingTop: "100px",
        background: "var(--surface)",
      }}
    >
      <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">

        {/* Section header — stagger in */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
          >
            <SectionLabel text="Selected Work" />
          </motion.div>

          <div className="mt-6 overflow-hidden">
            <motion.h2
              id="work-heading"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="text-[3rem] font-medium leading-[1] tracking-[-0.04em] text-[#F0F0FF] sm:text-[4.5rem] lg:text-[6rem]"
            >
              Featured{" "}
              <span className="text-[#C8C8D8]/30">Work</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Work cards */}
        <div className="mt-10 flex flex-col">
          <WorkCard study={study1} priority delay={0} />
          <WorkCard study={study2} delay={0.05} />

          {/* NDA placeholder */}
          <motion.article
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
          >
            <div className="flex items-center justify-between border-t border-[#1E1E35] px-0 py-5">
              <span className="text-[15px] font-normal text-[#8888a8]/50">
                NDA
              </span>
              <span className="text-[15px] font-normal text-[#F0F0FF]">
                More on request
              </span>
              <span className="w-[52px]" aria-hidden />
            </div>
            <div
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: "16 / 9" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,63,255,0.08) 0%, rgba(0,229,255,0.04) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                  aria-hidden
                />
                <p className="relative text-[13px] font-normal text-[#8888a8]">
                  Partner builds and NDA work available on request
                </p>
              </div>
            </div>
          </motion.article>

          {/* Bottom border closure */}
          <div className="border-t border-[#1E1E35] pt-0" />
        </div>

        <div className="pb-[100px]" />
      </div>
    </section>
  );
}
