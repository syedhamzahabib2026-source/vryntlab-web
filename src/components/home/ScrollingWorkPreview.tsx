"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { CaseStudy } from "@/lib/case-studies";

type ScrollingWorkPreviewProps = {
  study: CaseStudy;
  sizes: string;
  /** True when hover (desktop fine pointer) or in-view (touch / coarse). */
  active: boolean;
};

export function ScrollingWorkPreview({
  study,
  sizes,
  active,
}: ScrollingWorkPreviewProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [layerKey, setLayerKey] = useState(0);
  const labelId = useId();

  const [hero, tall] = study.media.images;
  const altHero = study.imageAlts[0] ?? study.coverAlt;
  const altTall = study.imageAlts[1] ?? study.coverAlt;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!active) setLayerKey((k) => k + 1);
  }, [active]);

  const scrollOn = active && !reduceMotion;

  return (
    <div
      className="relative h-full min-h-[220px] w-full overflow-hidden bg-zinc-950 sm:min-h-[260px] lg:min-h-0 lg:h-full"
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        {study.coverAlt}
      </span>

      <div className="pointer-events-none absolute left-3 top-3 z-[4] rounded-md border border-white/[0.12] bg-black/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-100 shadow-lg backdrop-blur-md sm:left-4 sm:top-4">
        Live preview
      </div>

      <div className="absolute inset-0 z-[1]">
        <Image
          src={hero}
          alt={altHero}
          fill
          className={`object-cover object-center transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            scrollOn ? "opacity-0" : "opacity-100"
          }`}
          sizes={sizes}
          quality={90}
          priority={false}
        />
      </div>

      {!reduceMotion ? (
        <div
          className={`absolute inset-0 z-[0] overflow-hidden [container-type:size] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            scrollOn ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!scrollOn}
        >
          <div
            key={layerKey}
            data-active={scrollOn ? "true" : "false"}
            className="work-scroll-preview-track relative w-full will-change-transform"
          >
            <Image
              src={tall}
              alt={altTall}
              width={1600}
              height={2600}
              className="h-auto w-full max-w-none object-cover object-top"
              sizes={sizes}
              quality={90}
            />
          </div>
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%] bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] ring-1 ring-inset ring-white/[0.06]"
        aria-hidden
      />
    </div>
  );
}
