"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export function HeroMockup() {
  const reduceMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 85, damping: 24, mass: 0.3 });
  const y = useSpring(offsetY, { stiffness: 85, damping: 24, mass: 0.3 });
  const gridX = useTransform(x, (value) => value * -0.42);
  const gridY = useTransform(y, (value) => value * -0.42);

  return (
    <div
      className="hero-product"
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === "touch") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        offsetX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        offsetY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
      }}
      onPointerLeave={() => {
        offsetX.set(0);
        offsetY.set(0);
      }}
    >
      <motion.div
        className="hero-product__grid"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: gridX, y: gridY }}
        animate={
          reduceMotion
            ? undefined
            : {
                backgroundPosition: ["0px 0px", "20px 14px", "0px 0px"],
                opacity: [0.62, 0.76, 0.62],
                rotate: [-0.18, 0.18, -0.18],
                scaleX: [1.012, 1.04, 1.018],
                scaleY: [1.018, 1.004, 1.03],
              }
        }
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="hero-product__signal-map" aria-hidden="true">
        <motion.span
          className="hero-product__signal-word hero-product__signal-word--order"
          animate={reduceMotion ? undefined : { x: [0, 10, -4, 0], y: [0, -4, 2, 0], skewX: [0, -1, 0.5, 0] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        >
          order
        </motion.span>
        <motion.span
          className="hero-product__signal-word hero-product__signal-word--flow"
          animate={reduceMotion ? undefined : { x: [0, -8, 5, 0], y: [0, 5, -3, 0], skewX: [0, 0.8, -0.5, 0] }}
          transition={{ delay: 0.8, duration: 18, ease: "easeInOut", repeat: Infinity }}
        >
          flow
        </motion.span>
        <motion.span
          className="hero-product__signal-word hero-product__signal-word--system"
          animate={reduceMotion ? undefined : { x: [0, 7, -8, 0], y: [0, -3, 4, 0], scaleX: [1, 1.025, 0.992, 1] }}
          transition={{ delay: 1.4, duration: 20, ease: "easeInOut", repeat: Infinity }}
        >
          system
        </motion.span>
      </div>
      <motion.div
        className="hero-product__screen"
        initial={reduceMotion ? false : { opacity: 0, y: 64 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.68, delay: 0.16, ease: [0.22, 0.86, 0.24, 1] }}
      >
        <motion.div className="hero-product__screen-inner" style={reduceMotion ? undefined : { x, y }}>
          <Image
            src="/assets/figma/hero-challenges.png"
            alt="Superspace workspace"
            width={1287}
            height={820}
            priority
            sizes="(max-width: 760px) 120vw, 1100px"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
