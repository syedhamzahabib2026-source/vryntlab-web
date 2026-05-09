"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { contentWell, focusRing, slabBleed, slabContent } from "@/components/layout/layoutTokens";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollingWorkPreview } from "./ScrollingWorkPreview";
import { caseStudies } from "@/lib/case-studies";
import { brandWorkSection } from "@/lib/brand-knowledge";

function useDesktopFineHover(): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);
  useLayoutEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return matches;
}

const cardBase =
  "group relative overflow-hidden rounded-2xl border border-[#1E1E35] bg-[#0A0A14] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-premium)] motion-reduce:transform-none [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-violet-500/35 [@media(hover:hover)]:hover:shadow-[0_0_0_1px_rgba(124,63,255,0.18),0_0_50px_-14px_rgba(124,63,255,0.22)]";

const primaryCta =
  `inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-4 py-2.5 text-[12px] font-semibold text-[#F0F0FF] transition-[border-color,background-color] duration-300 active:scale-[0.99] ${focusRing} [@media(hover:hover)]:hover:border-violet-400/55 [@media(hover:hover)]:hover:bg-violet-500/[0.15]`;

const secondaryCta =
  `inline-flex items-center gap-1.5 text-[12px] font-medium text-[#C8C8D8]/60 underline decoration-white/15 underline-offset-4 transition-colors duration-300 ${focusRing} rounded-sm [@media(hover:hover)]:hover:text-[#00E5FF]/90 [@media(hover:hover)]:hover:decoration-[#00E5FF]/35`;

const ILLUSTRATIVE_CARDS = [
  {
    label: "E-commerce · Fashion",
    gradient: "from-violet-600/25 via-violet-900/10 to-[#0A0A14]",
    glow: "bg-violet-500/15",
  },
  {
    label: "Local services · Booking",
    gradient: "from-[#00E5FF]/18 via-[#00E5FF]/05 to-[#0A0A14]",
    glow: "bg-[#00E5FF]/12",
  },
  {
    label: "SaaS · Landing page",
    gradient: "from-violet-500/22 via-[#00E5FF]/08 to-[#0A0A14]",
    glow: "bg-violet-400/12",
  },
] as const;

function HeroWorkCard() {
  const study = caseStudies[0]!;
  const cardRef = useRef<HTMLElement>(null);
  const fineDesktop = useDesktopFineHover();
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = cardRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        setInView(e.isIntersecting && e.intersectionRatio > 0.1);
      },
      { threshold: [0, 0.1, 0.2], rootMargin: "-6% 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const active = fineDesktop === true ? hovered : fineDesktop === false ? inView : false;

  return (
    <article
      ref={cardRef}
      className={`${cardBase} min-h-[480px] sm:min-h-[540px] lg:min-h-[560px]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full-bleed screenshot preview */}
      <div className="absolute inset-0">
        <ScrollingWorkPreview study={study} active={active} sizes="100vw" />
      </div>

      {/* Bottom overlay with content */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#080810] via-[#080810]/90 to-transparent pt-20 px-6 pb-7 sm:px-8 sm:pb-8">
        <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-[#C8C8D8]">
          {study.typeLabel}
        </span>
        <h3 className="mt-3 text-[1.5rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[1.75rem]">
          {study.client}
        </h3>
        <p className="mt-1.5 max-w-[52ch] text-[14px] leading-snug text-[#C8C8D8]/75">
          {study.shortTitle}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link href={`/work/${study.id}`} className={primaryCta}>
            View project →
          </Link>
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryCta}
          >
            Visit live site →
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function SecondaryWorkCard() {
  const study = caseStudies[1]!;
  const cardRef = useRef<HTMLElement>(null);
  const fineDesktop = useDesktopFineHover();
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = cardRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        setInView(e.isIntersecting && e.intersectionRatio > 0.1);
      },
      { threshold: [0, 0.1, 0.2], rootMargin: "-6% 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const active = fineDesktop === true ? hovered : fineDesktop === false ? inView : false;

  return (
    <article
      ref={cardRef}
      className={`${cardBase} min-h-[340px] sm:min-h-[380px]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        <ScrollingWorkPreview study={study} active={active} sizes="50vw" />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#080810] via-[#080810]/90 to-transparent pt-16 px-5 pb-5 sm:px-6 sm:pb-6">
        <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-2.5 py-0.5 text-[10px] font-medium tracking-tight text-[#C8C8D8]">
          {study.typeLabel}
        </span>
        <h3 className="mt-2.5 text-[1.25rem] font-bold tracking-[-0.02em] text-[#F0F0FF]">
          {study.client}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-[#C8C8D8]/70">
          {study.shortTitle}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link href={`/work/${study.id}`} className={primaryCta}>
            View project →
          </Link>
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryCta}
          >
            Live site →
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function StatInfoCard({
  stat,
  label,
  sub,
  gradient,
}: {
  stat: string;
  label: string;
  sub: string;
  gradient: string;
}) {
  return (
    <div
      className={`${cardBase} flex flex-col justify-between p-5 sm:p-6`}
      style={{ background: gradient }}
    >
      <p className="text-[2.25rem] font-black leading-none tracking-[-0.04em] text-[#F0F0FF] sm:text-[2.75rem]">
        {stat}
      </p>
      <div>
        <p className="text-[14px] font-semibold text-[#F0F0FF]">{label}</p>
        <p className="mt-1 text-[12px] text-[#C8C8D8]/60">{sub}</p>
      </div>
    </div>
  );
}

export function FeaturedWork() {
  return (
    <div className={slabBleed}>
      <section
        id="work"
        aria-labelledby="work-heading"
        className={`${slabContent} scroll-mt-[calc(4.5rem+0.25rem)] py-16 sm:scroll-mt-24 sm:py-20 md:scroll-mt-28`}
      >
        <div className={`${contentWell} flex flex-col gap-5 sm:gap-6`}>
          {/* Section intro */}
          <Reveal>
            <div className="mb-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7C3FFF]/90">
                {brandWorkSection.eyebrow}
              </p>
              <h2
                id="work-heading"
                className="mt-2 text-[1.875rem] font-bold tracking-[-0.025em] text-[#F0F0FF] sm:text-[2.25rem]"
              >
                {brandWorkSection.title}
              </h2>
              <p className="mt-2 text-[14px] text-[#C8C8D8]/70 sm:text-[15px]">
                {brandWorkSection.description}
              </p>
            </div>
          </Reveal>

          {/* Row 1: Hero card — full width */}
          <Reveal>
            <HeroWorkCard />
          </Reveal>

          {/* Row 2: DK Express + 2 stat cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <Reveal>
              <SecondaryWorkCard />
            </Reveal>
            <div className="grid grid-rows-2 gap-5 sm:gap-6">
              <Reveal>
                <StatInfoCard
                  stat="1–2wk"
                  label="Ships fast"
                  sub="Most sites delivered in 1–2 weeks"
                  gradient="linear-gradient(135deg, rgba(124,63,255,0.18) 0%, rgba(124,63,255,0.06) 60%, #0A0A14 100%)"
                />
              </Reveal>
              <Reveal>
                <StatInfoCard
                  stat="$0"
                  label="Agency overhead"
                  sub="You work directly with who's building it"
                  gradient="linear-gradient(135deg, rgba(0,229,255,0.14) 0%, rgba(0,229,255,0.04) 60%, #0A0A14 100%)"
                />
              </Reveal>
            </div>
          </div>

          {/* Row 3: Industry placeholder cards */}
          <Reveal>
            <div
              aria-hidden="true"
              className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6"
            >
              {ILLUSTRATIVE_CARDS.map(({ label, gradient, glow }) => (
                <div
                  key={label}
                  className="pointer-events-none select-none overflow-hidden rounded-2xl border border-[#1E1E35] opacity-70"
                >
                  <div className={`relative aspect-[16/9] bg-gradient-to-br ${gradient}`}>
                    <div className={`absolute left-4 top-4 h-10 w-10 rounded-full ${glow} blur-2xl`} />
                    <div className="absolute bottom-3 left-4 right-4 h-1.5 rounded-full bg-white/[0.07]" />
                    <div className="absolute bottom-6 left-4 w-2/3 h-1 rounded-full bg-white/[0.04]" />
                  </div>
                  <div className="border-t border-[#1E1E35] bg-[#0A0A14] px-4 py-3">
                    <p className="text-[11px] font-medium tracking-tight text-[#C8C8D8]/50">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[12px] text-[#8888a8]">
              More available on request — partner builds and NDA work not shown
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
