"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { mountFooterField, type FooterFieldState } from "@/lib/footer-field/renderer";

const MAX_STRETCH = 340;

export function FooterElasticField() {
  const reduceMotion = useReducedMotion();
  const target = useMotionValue(0);
  const height = useSpring(target, { damping: 21, mass: 0.58, stiffness: 240 });
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef<FooterFieldState>({ pull: 0, velocity: 0, pointerX: 0.5 });

  useEffect(() => {
    if (!canvas.current || reduceMotion) return;
    const stopHeight = height.on("change", (value) => {
      state.current.pull = Math.min(1, value / MAX_STRETCH);
      state.current.velocity = Math.max(-1.5, Math.min(1.5, height.getVelocity() / 900));
    });
    const dispose = mountFooterField(canvas.current, () => state.current);
    return () => {
      stopHeight();
      dispose();
    };
  }, [height, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

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
      target.set(Math.min(MAX_STRETCH, target.get() + event.deltaY * 0.42));
      state.current.pointerX = Math.max(0.08, Math.min(0.92, event.clientX / window.innerWidth));
      window.requestAnimationFrame(() => window.scrollTo(0, document.documentElement.scrollHeight));

      if (releaseTimer) window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(release, 120);
    };

    let touchY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const delta = touchY - touch.clientY;
      touchY = touch.clientY;
      if (delta <= 0 || (!isPulling && !isAtBottom())) return;
      event.preventDefault();
      isPulling = true;
      state.current.pointerX = touch.clientX / window.innerWidth;
      target.set(Math.min(MAX_STRETCH, target.get() + delta * 1.05));
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", release, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", release);
      if (releaseTimer) window.clearTimeout(releaseTimer);
    };
  }, [reduceMotion, target]);

  return (
    <motion.div aria-hidden="true" className="footer-elastic-field" style={{ height }}>
      {!reduceMotion && <canvas ref={canvas} />}
    </motion.div>
  );
}
