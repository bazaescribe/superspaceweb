"use client";

import { motion, useAnimationControls, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { motion as motionTokens } from "@/lib/motion";

export function RevealTitle({
  children,
  id,
  subtitle,
}: {
  children: React.ReactNode;
  id?: string;
  subtitle?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const controls = useAnimationControls();
  const isInView = useInView(titleRef, { amount: 0.6, margin: "0px 0px -12% 0px", once: true });

  useEffect(() => {
    if (reduceMotion || isInView) controls.start({ opacity: 1, y: 0 });
  }, [controls, isInView, reduceMotion]);

  return (
    <>
      <motion.h2
        ref={titleRef}
        id={id}
        className="scroll-title"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={controls}
        transition={motionTokens.standard}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="reveal-subtitle"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ ...motionTokens.standard, delay: reduceMotion ? 0 : 0.06 }}
        >
          {subtitle}
        </motion.p>
      )}
    </>
  );
}

export function RevealHeroTitle({ children, subtitle }: { children: React.ReactNode; subtitle: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTokens.featured}
      >
        {children}
      </motion.h1>
      <motion.p
        className="reveal-subtitle"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...motionTokens.featured, delay: reduceMotion ? 0 : 0.06 }}
      >
        {subtitle}
      </motion.p>
    </>
  );
}
