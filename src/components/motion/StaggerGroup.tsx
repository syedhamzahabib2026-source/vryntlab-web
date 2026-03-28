"use client";

import { motion } from "motion/react";
import { motionEase } from "./Reveal";

/** Stagger timing — tune staggerChildren / delayChildren here */
export const staggerTiming = {
  staggerChildren: 0.085,
  delayChildren: 0.06,
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: staggerTiming,
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: motionEase },
  },
};

type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * `immediate` — animate on mount (hero, above the fold).
   * `inView` — animate when scrolled into view.
   */
  mode?: "immediate" | "inView";
};

export function StaggerGroup({
  children,
  className,
  mode = "inView",
}: StaggerGroupProps) {
  if (mode === "immediate") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px", amount: 0.12 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
