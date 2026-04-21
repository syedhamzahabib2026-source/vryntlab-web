"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CaseStudyHeroScrollProps = {
  src: string;
  alt: string;
  sizes: string;
};

/**
 * Tall project still with continuous CSS scroll (15s loop).
 * Autoplays on the detail page — not hover-gated (unlike home cards).
 */
export function CaseStudyHeroScroll({ src, alt, sizes }: CaseStudyHeroScrollProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="relative min-h-[min(52vh,22rem)] w-full overflow-hidden bg-zinc-950 [container-type:size] sm:min-h-[min(56vh,28rem)] md:min-h-[min(62vh,34rem)] lg:min-h-[min(64vh,38rem)]">
      {reduceMotion ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes={sizes}
          quality={92}
          priority
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden [container-type:size]">
          <div className="work-hero-scroll-track relative w-full will-change-transform">
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={2600}
              className="h-auto w-full max-w-none object-cover object-top"
              sizes={sizes}
              quality={92}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
