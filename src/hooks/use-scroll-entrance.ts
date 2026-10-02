"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const entranceViewport = { amount: 0.35, once: true } as const;

/** One-time entrances, including sections passed by anchor navigation or fast scrolling. */
export function useScrollEntrance<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, entranceViewport);
  const reducedMotion = useReducedMotion();
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (inView || reducedMotion || passed) return;
    const checkPassed = () => {
      if (ref.current && ref.current.getBoundingClientRect().bottom < 0) setPassed(true);
    };
    checkPassed();
    window.addEventListener("scroll", checkPassed, { passive: true });
    return () => window.removeEventListener("scroll", checkPassed);
  }, [inView, reducedMotion, passed]);

  return { ref, entered: inView || passed || !!reducedMotion, reducedMotion: !!reducedMotion };
}
