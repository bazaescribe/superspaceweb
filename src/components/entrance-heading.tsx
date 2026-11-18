"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { motionEase } from "@/lib/motion";
import { useCopy } from "@/i18n/copy";

type HeadingProps = Omit<HTMLMotionProps<"h2">, "ref" | "initial" | "animate" | "transition">;

/** Marketing section titles reveal once, including after anchor navigation. */
export function EntranceHeading({ children, ...props }: HeadingProps) {
  const { ref, entered, reducedMotion } = useScrollEntrance<HTMLHeadingElement>();
  const localizeCopy = useCopy();
  return (
    <motion.h2
      {...props}
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 14 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: motionEase }}
    >
      {localizeCopy(children)}
    </motion.h2>
  );
}

/** A more visible rise for page heroes without changing their layout. */
export function HeroHeading({ children, ...props }: HeadingProps) {
  const reducedMotion = useReducedMotion();
  const localizeCopy = useCopy();
  return (
    <motion.h1
      {...props}
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {localizeCopy(children)}
    </motion.h1>
  );
}
