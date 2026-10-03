"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { motionEase } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  role?: string;
  "aria-label"?: string;
};

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const { ref, entered, reducedMotion } = useScrollEntrance();

  return (
    <motion.div
      ref={ref}
      className={className}
      {...props}
      initial={{ opacity: 0, y: 20 }}
      animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: reducedMotion ? 0 : delay, duration: reducedMotion ? 0 : 0.62, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}
