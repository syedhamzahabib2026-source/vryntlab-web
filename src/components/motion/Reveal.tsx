"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";

/**
 * Calm ease-out: settles without bounce. Tune here for sitewide scroll reveals.
 */
export const motionEase = [0.16, 1, 0.3, 1] as const;

export const revealDefaults = {
  duration: 0.58,
  y: 10,
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 1, y: revealDefaults.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-36px 0px -32px 0px", amount: 0.16 }}
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
  className?: string;
};

/**
 * Subtle lift on hover for cards — pair with shadow/border transitions on className.
 */
export function HoverLift({ children, className }: HoverLiftProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <article className={className}>{children}</article>;
  }

  return (
    <motion.article
      className={className}
      whileHover={{
        y: -1,
        transition: { duration: 0.32, ease: motionEase },
      }}
    >
      {children}
    </motion.article>
  );
}
