"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function HeroMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-product">
      <motion.div
        className="hero-product__screen"
        initial={reduceMotion ? false : { opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 0.86, 0.24, 1] }}
      >
        <Image src="/assets/figma/hero-workspace.png" alt="Superspace workspace home dashboard" fill priority />
      </motion.div>
    </div>
  );
}
