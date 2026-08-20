"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { motion as motionTokens } from "@/lib/motion";

export function HeroMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="v2-product-card__mockup"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...motionTokens.featured, delay: 0.52 }}
    >
      <Image
        className="v2-product-card__screen"
        src="/assets/figma/hero-challenges.png"
        alt="Superspace challenge workspace"
        width={1287}
        height={820}
        priority
      />
    </motion.div>
  );
}
