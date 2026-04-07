"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudyPosterUrl, type CaseStudy } from "@/lib/case-studies";

type CaseStudyPreviewMediaProps = {
  study: CaseStudy;
  sizes: string;
};

const easeMedia =
  "duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

export function CaseStudyPreviewMedia({
  study,
  sizes,
}: CaseStudyPreviewMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoveringRef = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoPrimed, setVideoPrimed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [posterCoverVisible, setPosterCoverVisible] = useState(true);
  const [videoRevealed, setVideoRevealed] = useState(false);

  const poster = caseStudyPosterUrl(study.media);
  const videoSrc = study.media.previewVideoSrc;

  const tryPlayAndReveal = useCallback(() => {
    const v = videoRef.current;
    if (!v || !hoveringRef.current) return;

    void v
      .play()
      .then(() => {
        if (!hoveringRef.current) return;
        setVideoRevealed(true);
        setPosterCoverVisible(false);
      })
      .catch(() => {
        setVideoRevealed(false);
        setPosterCoverVisible(true);
      });
  }, []);

  /** Pause + poster while hovered card is still on screen (video stays mounted). */
  const leaveHover = useCallback(() => {
    hoveringRef.current = false;
    const v = videoRef.current;
    if (v) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {
        /* noop */
      }
    }
    setPosterCoverVisible(true);
    setVideoRevealed(false);
  }, []);

  /**
   * Card left the viewport: tear down the `<video>` so later cards are not all
   * holding decode/buffer state, and scroll-back + hover gets a clean remount
   * (matches the “first card” experience more closely).
   */
  const resetWhenOffscreen = useCallback(() => {
    hoveringRef.current = false;
    const v = videoRef.current;
    if (v) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {
        /* noop */
      }
    }
    setPosterCoverVisible(true);
    setVideoRevealed(false);
    setVideoPrimed(false);
    setVideoReady(false);
  }, []);

  const prime = useCallback(() => {
    hoveringRef.current = true;
    setVideoPrimed(true);
    queueMicrotask(() => {
      const el = videoRef.current;
      if (
        el &&
        el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        hoveringRef.current
      ) {
        tryPlayAndReveal();
      }
    });
  }, [tryPlayAndReveal]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!videoSrc || reduceMotion || !rootRef.current) return;
    const article = rootRef.current.closest("article");
    if (!article) return;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const e = entries[0];
      if (!e) return;
      if (!e.isIntersecting) {
        resetWhenOffscreen();
        return;
      }
      requestAnimationFrame(() => {
        try {
          const hovered = article.matches(":hover");
          const focusedInside = article.contains(document.activeElement);
          if (hovered || focusedInside) {
            prime();
          }
        } catch {
          /* :hover can be unavailable in some environments */
        }
      });
    };

    const io = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0,
      rootMargin: "32px 0px 48px 0px",
    });
    io.observe(article);

    const onFocusOut = (ev: FocusEvent) => {
      const next = ev.relatedTarget;
      if (next instanceof Node && article.contains(next)) return;
      leaveHover();
    };

    article.addEventListener("mouseenter", prime);
    article.addEventListener("mouseleave", leaveHover);
    article.addEventListener("focusin", prime);
    article.addEventListener("focusout", onFocusOut);
    article.addEventListener("pointerdown", prime, { passive: true });

    return () => {
      io.disconnect();
      article.removeEventListener("mouseenter", prime);
      article.removeEventListener("mouseleave", leaveHover);
      article.removeEventListener("focusin", prime);
      article.removeEventListener("focusout", onFocusOut);
      article.removeEventListener("pointerdown", prime);
    };
  }, [videoSrc, reduceMotion, prime, leaveHover, resetWhenOffscreen]);

  const onVideoLoadedData = useCallback(() => {
    setVideoReady(true);
    if (hoveringRef.current) tryPlayAndReveal();
  }, [tryPlayAndReveal]);

  if (videoSrc && !reduceMotion) {
    return (
      <div
        ref={rootRef}
        className="relative h-full w-full bg-zinc-100 dark:bg-zinc-950"
      >
        {videoPrimed ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            loop
            preload="metadata"
            aria-label={study.coverAlt}
            onLoadedData={onVideoLoadedData}
            className={`absolute inset-0 z-[1] h-full w-full object-contain object-center transition-opacity ${easeMedia} ${
              videoReady && videoRevealed ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}

        <div
          className={`pointer-events-none absolute inset-0 z-[2] bg-zinc-100 transition-opacity dark:bg-zinc-950 ${easeMedia} ${
            posterCoverVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <Image
            src={poster}
            alt=""
            fill
            className="object-contain object-center"
            sizes={sizes}
            quality={92}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full bg-zinc-100 dark:bg-zinc-950"
    >
      <Image
        src={poster}
        alt={study.coverAlt}
        fill
        className="object-contain object-center"
        sizes={sizes}
        quality={92}
      />
    </div>
  );
}
