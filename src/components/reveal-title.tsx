"use client";

import { motion, useReducedMotion } from "motion/react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
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
  const { ref: titleRef, entered, reducedMotion: reduceMotion } = useScrollEntrance<HTMLHeadingElement>();
  const entranceTransition = { ...motionTokens.standard, duration: reduceMotion ? 0 : 0.5 };

  return (
    <>
      <motion.h2
        ref={titleRef}
        id={id}
        className="scroll-title"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={entranceTransition}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="reveal-subtitle"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ ...entranceTransition, delay: reduceMotion ? 0 : 0.06 }}
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
