"use client";

import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionEase } from "./Reveal";

/** Tight stagger: readable sequence without a long cascade */
export const staggerTiming = {
  staggerChildren: 0.055,
  delayChildren: 0.035,
} as const;

/** Above-the-fold / mount: same motion language, no opacity blackout before paint */
export const staggerTimingImmediate = {
  staggerChildren: 0.036,
  delayChildren: 0,
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: staggerTiming,
  },
};

export const staggerContainerImmediate = {
  hidden: {},
  visible: {
    transition: staggerTimingImmediate,
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 11 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.54, ease: motionEase },
  },
};

export const staggerItemImmediate = {
  hidden: { opacity: 1, y: 9 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: motionEase },
  },
};

const StaggerItemVariantsContext = createContext(staggerItem);

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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (mode === "immediate") {
    return (
      <StaggerItemVariantsContext.Provider value={staggerItemImmediate}>
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          variants={staggerContainerImmediate}
        >
          {children}
        </motion.div>
      </StaggerItemVariantsContext.Provider>
    );
  }

  return (
    <StaggerItemVariantsContext.Provider value={staggerItem}>
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-48px 0px -40px 0px", amount: 0.14 }}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    </StaggerItemVariantsContext.Provider>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const itemVariants = useContext(StaggerItemVariantsContext);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
