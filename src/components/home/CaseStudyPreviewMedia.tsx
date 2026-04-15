"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { caseStudyPosterUrl, type CaseStudy } from "@/lib/case-studies";

type CaseStudyMediaMode = "hoverCard" | "inViewAutoplay";

type CaseStudyPreviewMediaProps = {
  study: CaseStudy;
  sizes: string;
};

const easeMedia =
  "duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

/** Wide desktop with real hover: card hover/focus. Otherwise: in-view autoplay (touch, tablets, narrow windows). */
function useCaseStudyMediaMode(): CaseStudyMediaMode | null {
  const [mode, setMode] = useState<CaseStudyMediaMode | null>(null);

  useLayoutEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () =>
      setMode(mq.matches ? "hoverCard" : "inViewAutoplay");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return mode;
}

export function CaseStudyPreviewMedia({
  study,
  sizes,
}: CaseStudyPreviewMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoveringRef = useRef(false);
  const mediaMode = useCaseStudyMediaMode();

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
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tryPlayAndReveal();
      });
    });
  }, [tryPlayAndReveal]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Desktop / wide + fine pointer: hover + focus inside card; pause when card leaves view. */
  useEffect(() => {
    if (!videoSrc || reduceMotion || mediaMode !== "hoverCard") return;
    const root = rootRef.current;
    if (!root) return;
    const hoverSurface = root.closest("a");
    if (!hoverSurface) return;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const e = entries[0];
      if (!e) return;
      if (!e.isIntersecting) {
        resetWhenOffscreen();
        return;
      }
      requestAnimationFrame(() => {
        try {
          const hovered = hoverSurface.matches(":hover");
          const focusedInside = hoverSurface.contains(document.activeElement);
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
    io.observe(hoverSurface);

    const onFocusOut = (ev: FocusEvent) => {
      const next = ev.relatedTarget;
      if (next instanceof Node && hoverSurface.contains(next)) return;
      leaveHover();
    };

    hoverSurface.addEventListener("mouseenter", prime);
    hoverSurface.addEventListener("mouseleave", leaveHover);
    hoverSurface.addEventListener("focusin", prime);
    hoverSurface.addEventListener("focusout", onFocusOut);
    hoverSurface.addEventListener("pointerdown", prime, { passive: true });

    return () => {
      io.disconnect();
      hoverSurface.removeEventListener("mouseenter", prime);
      hoverSurface.removeEventListener("mouseleave", leaveHover);
      hoverSurface.removeEventListener("focusin", prime);
      hoverSurface.removeEventListener("focusout", onFocusOut);
      hoverSurface.removeEventListener("pointerdown", prime);
    };
  }, [
    videoSrc,
    reduceMotion,
    mediaMode,
    prime,
    leaveHover,
    resetWhenOffscreen,
  ]);

  /**
   * Touch, tablets, narrow viewports: autoplay when the media region is clearly in view;
   * pause when mostly scrolled away. Hysteresis + center-weighted rootMargin keeps behavior deliberate.
   */
  useEffect(() => {
    if (!videoSrc || reduceMotion || mediaMode !== "inViewAutoplay") return;
    const root = rootRef.current;
    if (!root) return;

    const PLAY_RATIO = 0.15;
    const STOP_RATIO = 0.05;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (!entry) return;
      const ratio = entry.intersectionRatio;
      const shouldPlay = entry.isIntersecting && ratio >= PLAY_RATIO;
      const shouldStop = !entry.isIntersecting || ratio < STOP_RATIO;

      if (shouldPlay) {
        hoveringRef.current = true;
        setVideoPrimed(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            tryPlayAndReveal();
          });
        });
      } else if (shouldStop) {
        resetWhenOffscreen();
      }
    };

    const io = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: [
        0, 0.03, 0.05, 0.06, 0.08, 0.1, 0.12, 0.14, 0.15, 0.18, 0.2, 0.25,
        0.3, 0.35, 0.4, 0.5, 0.6, 0.75, 1,
      ],
      rootMargin: "-6% 0px -8% 0px",
    });
    io.observe(root);
    return () => io.disconnect();
  }, [
    videoSrc,
    reduceMotion,
    mediaMode,
    tryPlayAndReveal,
    resetWhenOffscreen,
  ]);

  const onVideoLoadedData = useCallback(() => {
    setVideoReady(true);
    if (hoveringRef.current) tryPlayAndReveal();
  }, [tryPlayAndReveal]);

  useLayoutEffect(() => {
    if (!videoPrimed || !videoSrc || reduceMotion) return;
    const v = videoRef.current;
    if (!v || !hoveringRef.current) return;
    if (v.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlayAndReveal();
    }
  }, [videoPrimed, videoSrc, reduceMotion, tryPlayAndReveal]);

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

        {mediaMode === "inViewAutoplay" && videoRevealed && videoReady ? (
          <div
            className="pointer-events-none absolute bottom-3 left-3 z-[4] flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-200 shadow-lg backdrop-blur-sm sm:bottom-4 sm:left-4"
            aria-hidden
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            In-view preview
          </div>
        ) : null}
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
