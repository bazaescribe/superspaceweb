"use client";

import { motion, useAnimationControls, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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
  const [passed, setPassed] = useState(false);
  const controls = useAnimationControls();
  const isInView = useInView(titleRef, { amount: 0.35, once: true });
  const entranceTransition = { ...motionTokens.standard, duration: 0.5 };

  useEffect(() => {
    const reveal = () => controls.start({ opacity: 1, y: 0 });
    if (reduceMotion || isInView) {
      reveal();
      return;
    }
    const revealIfPassed = () => {
      if (titleRef.current && titleRef.current.getBoundingClientRect().bottom < 0) {
        setPassed(true);
        reveal();
        window.removeEventListener("scroll", revealIfPassed);
      }
    };
    window.addEventListener("scroll", revealIfPassed, { passive: true });
    revealIfPassed();
    return () => window.removeEventListener("scroll", revealIfPassed);
  }, [controls, isInView, reduceMotion]);

  return (
    <>
      <motion.h2
        ref={titleRef}
        id={id}
        className="scroll-title"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={controls}
        transition={entranceTransition}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="reveal-subtitle"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion || isInView || passed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
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
