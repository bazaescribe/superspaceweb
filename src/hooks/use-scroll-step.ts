"use client";

import { useEffect, useRef, useState } from "react";

/** Select the section nearest the shared stage center, including restored scroll positions. */
export function useScrollStep() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-step]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-height")) || 80;
      const stageHeight = window.innerHeight - header;
      const readingLine = header + stageHeight / 2;
      let next = 0;
      steps.forEach((step, index) => {
        // Switch halfway between the outgoing and incoming centered compositions.
        if (step.getBoundingClientRect().top <= readingLine) next = index;
      });
      setActive(next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    steps.forEach((step) => observer.observe(step));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return { ref, active };
}
