"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import styles from "./shimmer-accent.module.css";

export function ShimmerAccent({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgroundPosition = useTransform(scrollYProgress, (value) => {
    const position = reduceMotion ? 0 : value * 100;
    return `${position}% ${position}%`;
  });

  return (
    <motion.span ref={ref} className={styles.accent} style={{ backgroundPosition }}>
      {children}
    </motion.span>
  );
}
