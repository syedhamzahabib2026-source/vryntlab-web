"use client";

import { useEffect, useRef } from "react";

type CaseStudyHeroVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Muted inline autoplay for case study hero media (browser policy–friendly).
 * Pauses when mostly off-screen and resumes when sufficiently visible again.
 */
export function CaseStudyHeroVideo({
  src,
  poster,
  className,
}: CaseStudyHeroVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const v = videoRef.current;
    if (!wrap || !v) return;

    const PLAY_RATIO = 0.15;
    const STOP_RATIO = 0.05;

    let playAllowed = false;

    const tryPlay = () => {
      v.muted = true;
      const p = v.play();
      if (p !== undefined) void p.catch(() => {});
    };

    const tryPause = () => {
      v.pause();
    };

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const e = entries[0];
      if (!e) return;
      const ratio = e.intersectionRatio;
      const shouldPlay = e.isIntersecting && ratio >= PLAY_RATIO;
      const shouldStop = !e.isIntersecting || ratio < STOP_RATIO;

      if (shouldPlay) {
        playAllowed = true;
        tryPlay();
      } else if (shouldStop) {
        playAllowed = false;
        tryPause();
      }
    };

    const io = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: [
        0, 0.03, 0.05, 0.06, 0.08, 0.1, 0.12, 0.14, 0.15, 0.18, 0.2, 0.25,
        0.3, 0.35, 0.5, 0.75, 1,
      ],
      rootMargin: "-6% 0px -8% 0px",
    });

    io.observe(wrap);

    const onLoadedData = () => {
      if (playAllowed) tryPlay();
    };
    v.addEventListener("loadeddata", onLoadedData);

    return () => {
      v.removeEventListener("loadeddata", onLoadedData);
      io.disconnect();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className="flex w-full justify-center">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={className}
        muted
        playsInline
        loop
        autoPlay
        controls
        preload="auto"
      />
    </div>
  );
}
