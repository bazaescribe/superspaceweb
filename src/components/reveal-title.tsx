"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { HeroHeading } from "./entrance-heading";
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
  const entranceTransition = { ...motionTokens.standard, duration: reduceMotion ? 0 : 0.3 };

  return (
    <>
      <motion.h2
        ref={titleRef}
        id={id}
        className="scroll-title"
        initial={{ opacity: 0, y: 14 }}
        animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={entranceTransition}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="reveal-subtitle"
          initial={{ opacity: 0, y: 8 }}
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
      <HeroHeading>{children}</HeroHeading>
      <motion.p
        className="reveal-subtitle"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...motionTokens.featured, duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.06 }}
      >
        {subtitle}
      </motion.p>
    </>
  );
}
