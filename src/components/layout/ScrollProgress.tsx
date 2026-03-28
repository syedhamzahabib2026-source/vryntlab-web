"use client";

import { useEffect, useState } from "react";

/**
 * Thin viewport-wide progress bar — subtle scroll affordance without distraction.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const el = document.documentElement;
      const total = el.scrollHeight - window.innerHeight;
      const next = total > 0 ? window.scrollY / total : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] bg-zinc-200/40 dark:bg-zinc-800/70"
      aria-hidden
    >
      <div
        className="h-full bg-zinc-950/35 dark:bg-zinc-100/45"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
