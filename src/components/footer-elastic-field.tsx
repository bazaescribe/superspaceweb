"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";

const MAX_STRETCH = 136;

export function FooterElasticField() {
  const reduceMotion = useReducedMotion();
  const target = useMotionValue(0);
  const height = useSpring(target, { damping: 23, mass: 0.32, stiffness: 380 });

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;

    let releaseTimer: number | undefined;
    let isPulling = false;
    const release = () => {
      isPulling = false;
      target.set(0);
    };
    const isAtBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) {
        release();
        return;
      }

      if (!isPulling && !isAtBottom()) return;

      event.preventDefault();
      isPulling = true;
      target.set(Math.min(MAX_STRETCH, target.get() + event.deltaY * 0.18));
      window.requestAnimationFrame(() => window.scrollTo(0, document.documentElement.scrollHeight));

      if (releaseTimer) window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(release, 90);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (releaseTimer) window.clearTimeout(releaseTimer);
    };
  }, [reduceMotion, target]);

  return <motion.div aria-hidden="true" className="footer-elastic-field" style={{ height }} />;
}
