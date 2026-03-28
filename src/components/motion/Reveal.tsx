"use client";

import { motion, type HTMLMotionProps } from "motion/react";

/** Premium ease — adjust here to change global reveal feel */
export const motionEase = [0.22, 1, 0.36, 1] as const;

export const revealDefaults = {
  duration: 0.55,
  y: 20,
} as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Extra delay before this block animates (seconds) */
  delay?: number;
} & Pick<HTMLMotionProps<"div">, "id">;

export function Reveal({
  children,
  className,
  delay = 0,
  id,
}: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: revealDefaults.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px", amount: 0.2 }}
      transition={{
        duration: revealDefaults.duration,
        delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}

type HoverLiftProps = {
  children: React.ReactNode;
  /**
   * Include base card styles plus Tailwind `transition-shadow` and
   * `hover:shadow-*` for a soft shadow lift alongside motion `y`.
   */
  className?: string;
};

/**
 * Subtle lift on hover for cards — combine with hover shadow classes on className.
 */
export function HoverLift({ children, className }: HoverLiftProps) {
  return (
    <motion.article
      className={className}
      whileHover={{
        y: -3,
        transition: { duration: 0.22, ease: motionEase },
      }}
    >
      {children}
    </motion.article>
  );
}
