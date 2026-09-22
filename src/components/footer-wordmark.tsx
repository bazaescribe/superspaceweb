"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";

const GLYPH_COUNT = 10;
const MAX_PULL = 130;
const VERTICAL_TRAVEL = [0.23, 0.58, 0.35, 0.74, 0.44, 0.27, 0.67, 0.39, 0.82, 0.51];
const MAX_VERTICAL_TRAVEL = Math.max(...VERTICAL_TRAVEL);
const SIDE_DRIFT = [-0.025, 0.018, -0.013, 0.022, -0.018, 0.014, -0.022, 0.015, -0.012, 0.023];
const SPRING = { stiffness: 440, damping: 34, mass: 0.52 };

function Glyph({ index, pull }: { index: number; pull: MotionValue<number> }) {
  const y = useSpring(
    useTransform(pull, (value) => value * VERTICAL_TRAVEL[index]),
    SPRING,
  );
  const x = useSpring(
    useTransform(pull, (value) => value * SIDE_DRIFT[index]),
    SPRING,
  );
  return (
    <motion.g style={{ x, y }}>
      <use href={`/brand/superspace-wordmark-white.svg#glyph-${index}`} />
    </motion.g>
  );
}

export function FooterWordmark() {
  const pull = useMotionValue(0);
  const bottomSpace = useSpring(
    useTransform(pull, (value) => value * MAX_VERTICAL_TRAVEL),
    SPRING,
  );
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let releaseTimer: number | undefined;
    let pulling = false;
    let touchY = 0;
    const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const release = () => {
      pulling = false;
      pull.set(0);
    };
    const advance = (distance: number) => {
      pulling = true;
      pull.set(Math.min(MAX_PULL, pull.get() + Math.min(distance, 90) * 0.55));
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(release, 130);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) {
        release();
        return;
      }
      if (!pulling && !atBottom()) return;
      event.preventDefault();
      advance(event.deltaY);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const distance = touchY - touch.clientY;
      touchY = touch.clientY;
      if (distance <= 0 || (!pulling && !atBottom())) return;
      event.preventDefault();
      advance(distance);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", release, { passive: true });
    window.addEventListener("touchcancel", release, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
      window.clearTimeout(releaseTimer);
    };
  }, [pull, reduceMotion]);

  return (
    <motion.div className="footer-wordmark-space" style={{ paddingBottom: bottomSpace }}>
      <svg className="footer-wordmark" viewBox="0 0 1280 175" role="img" aria-label="Superspace">
        {Array.from({ length: GLYPH_COUNT }, (_, index) => (
          <Glyph key={index} index={index} pull={pull} />
        ))}
      </svg>
    </motion.div>
  );
}

export function FooterReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = root.current;
    if (!element || reduceMotion) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(1, window.innerHeight * 0.55);
      const progress = Math.max(0, Math.min(1, (window.innerHeight - element.getBoundingClientRect().top) / distance));
      element.style.setProperty("--footer-reveal-shift", `${Math.round(48 * (1 - progress))}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <div className="site-footer" data-theme="dark" ref={root}>
      {children}
    </div>
  );
}
