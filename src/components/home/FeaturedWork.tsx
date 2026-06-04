"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { focusRing } from "@/components/layout/layoutTokens";
import { caseStudies, caseStudyPosterUrl } from "@/lib/case-studies";

const ease = [0.22, 1, 0.36, 1] as const;

const childVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease } },
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

// ─── Mobile stacked card (keeps the scroll-linked scale from previous pass) ──

type WorkCardProps = {
  study: (typeof caseStudies)[number];
  priority?: boolean;
};

function WorkCard({ study, priority = false }: WorkCardProps) {
  const posterSrc = caseStudyPosterUrl(study.media);
  const cardRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1.02]);
  const imgY     = useTransform(scrollYProgress, [0, 0.5], [24, 0]);

  return (
    <motion.article
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.75, ease }}
    >
      <div className="flex items-center justify-between border-t border-[#1E1E35] px-0 py-5">
        <Link
          href={`/work/${study.id}`}
          className={`flex items-center gap-2 text-[15px] font-normal text-[#8888a8] transition-colors duration-200 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#F0F0FF]`}
        >
          View
          <span className="inline-block transition-transform duration-[200ms] group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
        <span className="text-[15px] font-normal text-[#F0F0FF]">{study.client}</span>
        <span className="w-[52px]" aria-hidden />
      </div>

      <Link
        href={`/work/${study.id}`}
        className={`relative block overflow-hidden rounded-sm ${focusRing}`}
        style={{ aspectRatio: "16 / 9" }}
        tabIndex={-1}
        aria-label={`View ${study.client} case study`}
      >
        <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
          <Image
            src={posterSrc}
            alt={study.coverAlt}
            fill
            className="object-cover transition-transform duration-[250ms] ease-[var(--ease-out-premium)] will-change-transform group-hover:scale-[1.03]"
            sizes="(max-width: 1290px) 100vw, 1290px"
            priority={priority}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 transition-[background-color] duration-[250ms] group-hover:bg-black/30" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-[250ms] ease-[var(--ease-out-premium)] group-hover:opacity-100" aria-hidden>
          <span className="rounded-full bg-white/10 px-5 py-2 text-[15px] font-medium text-white backdrop-blur-md ring-1 ring-white/15">
            View →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function NdaCard() {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1.02]);
  const imgY     = useTransform(scrollYProgress, [0, 0.5], [24, 0]);

  return (
    <motion.article
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.75, ease }}
    >
      <div className="flex items-center justify-between border-t border-[#1E1E35] px-0 py-5">
        <span className="text-[15px] font-normal text-[#8888a8]/50">NDA</span>
        <span className="text-[15px] font-normal text-[#F0F0FF]">More on request</span>
        <span className="w-[52px]" aria-hidden />
      </div>
      <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "16 / 9" }}>
        <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(124,63,255,0.08) 0%, rgba(0,229,255,0.04) 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
              aria-hidden
            />
            <p className="relative text-[13px] font-normal text-[#8888a8]">
              Partner builds and NDA work available on request
            </p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─── Desktop sticky gallery ───────────────────────────────────────────────────

function StickyGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [study1, study2] = [caseStudies[0]!, caseStudies[1]!];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Heading fades out as first project settles in
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 1, 0]);

  // 3 scenes: each project holds, then crossfades to next
  const opacity0 = useTransform(scrollYProgress, [0.00, 0.25, 0.35], [1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.25, 0.40, 0.60, 0.70], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.60, 0.75, 1.00], [0, 1, 1]);

  const y0 = useTransform(scrollYProgress, [0.25, 0.35], [0, -30]);
  const y1 = useTransform(scrollYProgress, [0.25, 0.40], [20, 0]);
  const y2 = useTransform(scrollYProgress, [0.60, 0.75], [20, 0]);

  // Images start slightly zoomed in and gradually settle as they fill the screen
  const scale0 = useTransform(scrollYProgress, [0.00, 0.35], [1.03, 1.0]);
  const scale1 = useTransform(scrollYProgress, [0.25, 0.60], [1.03, 1.0]);
  const scale2 = useTransform(scrollYProgress, [0.60, 1.00], [1.03, 1.0]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "350vh", background: "var(--surface)" }}
      aria-label="Featured Work gallery"
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "#090910" }}>

        {/* ── Layer 0: Living Silica ─────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ opacity: opacity0, y: y0, scale: scale0 }}
        >
          <Image
            src={caseStudyPosterUrl(study1.media)}
            alt={study1.coverAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Bottom gradient + project info */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-4 pb-12 pt-40 sm:px-8 lg:px-[30px]">
            <div className="mx-auto max-w-[1290px]">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">01</p>
              <p className="mt-2 text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[3rem]">
                {study1.client}
              </p>
              <p className="mt-1 text-[1rem] text-white/55">{study1.typeLabel}</p>
              <Link
                href={`/work/${study1.id}`}
                className="mt-4 inline-flex items-center gap-2 text-[15px] font-normal text-white/70 transition-colors duration-200 hover:text-white"
              >
                View Project <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Layer 1: DK Express ───────────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-[2]"
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
        >
          <Image
            src={caseStudyPosterUrl(study2.media)}
            alt={study2.coverAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-4 pb-12 pt-40 sm:px-8 lg:px-[30px]">
            <div className="mx-auto max-w-[1290px]">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">02</p>
              <p className="mt-2 text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[3rem]">
                {study2.client}
              </p>
              <p className="mt-1 text-[1rem] text-white/55">{study2.typeLabel}</p>
              <Link
                href={`/work/${study2.id}`}
                className="mt-4 inline-flex items-center gap-2 text-[15px] font-normal text-white/70 transition-colors duration-200 hover:text-white"
              >
                View Project <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Layer 2: More on request ───────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-[3] flex items-center justify-center"
          style={{ opacity: opacity2, y: y2, scale: scale2, background: "var(--surface)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
            aria-hidden
          />
          <div className="relative z-[1] max-w-md px-8 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8888a8]/60">03</p>
            <h3 className="mt-4 text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#F0F0FF] sm:text-[2.5rem]">
              More on request
            </h3>
            <p className="mt-3 text-[1rem] leading-[1.6] text-[#8888a8]">
              Partner builds and NDA work available — reach out to see more.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-normal text-[#F0F0FF]/60 transition-colors duration-200 hover:text-[#F0F0FF]"
            >
              Get in touch <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>

        {/* ── Heading overlay — sits above images, fades out first ── */}
        {/* Soft dark gradient for heading legibility */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-[9] h-72 bg-gradient-to-b from-black/60 to-transparent"
          style={{ opacity: headingOpacity }}
          aria-hidden
        />
        <motion.div
          className="absolute inset-x-0 top-0 z-[10] px-4 pt-10 sm:px-8 lg:px-[30px]"
          style={{ opacity: headingOpacity }}
        >
          <div className="mx-auto max-w-[1290px]">
            <SectionLabel text="Selected Work" />
            <h2
              id="work-heading"
              className="mt-6 text-[3rem] font-medium leading-[1] tracking-[-0.04em] text-[#F0F0FF] sm:text-[4.5rem] lg:text-[6rem]"
            >
              Featured{" "}
              <span className="text-[#C8C8D8]/30">Work</span>
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Exported section ─────────────────────────────────────────────────────────

export function FeaturedWork() {
  const [study1, study2] = [caseStudies[0]!, caseStudies[1]!];

  return (
    <div id="work">
      {/* ── Mobile: stacked cards (< lg) ── */}
      <section
        className="block py-16 lg:hidden"
        style={{ background: "var(--surface)" }}
        aria-label="Featured Work"
      >
        <div className="mx-auto w-full max-w-[1290px] px-4 sm:px-8 lg:px-[30px]">
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
                variants={childVariant}
                className="text-[3rem] font-medium leading-[1] tracking-[-0.04em] text-[#F0F0FF] sm:text-[4.5rem]"
              >
                Featured <span className="text-[#C8C8D8]/30">Work</span>
              </motion.h2>
            </div>
          </motion.div>

          <div className="mt-10 flex flex-col">
            <WorkCard study={study1} priority />
            <WorkCard study={study2} />
            <NdaCard />
            <div className="border-t border-[#1E1E35]" />
          </div>
        </div>
      </section>

      {/* ── Desktop: sticky scroll gallery (≥ lg) ── */}
      <div className="hidden lg:block">
        <StickyGallery />
      </div>
    </div>
  );
}
