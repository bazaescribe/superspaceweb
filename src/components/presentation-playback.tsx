"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import styles from "./presentation-playback.module.css";

export function usePresentationPlayback(
  count: number,
  containerRef: RefObject<HTMLDivElement | null>,
  interval = 6500,
  enabled = true,
  slideIntervals?: readonly (number | undefined)[],
) {
  const [active, setActive] = useState(0);
  const duration = slideIntervals?.[active] ?? interval;
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const elapsed = useRef(0);
  const running = enabled && playing && inView && visible && !focused && !reducedMotion;
  const select = useCallback(
    (index: number) => {
      elapsed.current = 0;
      setCycle((value) => value + 1);
      setActive((index + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(container);
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - previous;
      previous = now;
      if (elapsed.current >= duration) {
        elapsed.current = 0;
        setActive((index) => (index + 1) % count);
        setCycle((value) => value + 1);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, duration, running]);

  return {
    active,
    select,
    playing: playing && !reducedMotion,
    running,
    cycle,
    interval: duration,
    toggle: () => setPlaying((value) => !value),
    reducedMotion: !!reducedMotion,
    focusProps: {
      onFocusCapture: (event: React.FocusEvent) => setFocused((event.target as HTMLElement).matches(":focus-visible")),
      onBlurCapture: (event: React.FocusEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      },
    },
  };
}

export function PresentationPlayback({
  labels,
  playback,
  name,
}: {
  labels: readonly string[];
  playback: ReturnType<typeof usePresentationPlayback>;
  name: string;
}) {
  return (
    <div className={styles.controls} role="group" aria-label={`${name} playback`}>
      <div className={styles.indicators}>
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            className={styles.indicator}
            aria-label={`Show ${label}`}
            aria-pressed={playback.active === index}
            onClick={() => playback.select(index)}
          >
            {playback.active === index && (
              <span
                key={playback.cycle}
                className={styles.progress}
                style={{
                  animationDuration: `${playback.interval}ms`,
                  animationPlayState: playback.running ? "running" : "paused",
                }}
              />
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.toggle}
        onClick={playback.toggle}
        disabled={playback.reducedMotion}
        aria-label={`${playback.playing ? "Pause" : "Play"} ${name.toLowerCase()}`}
        aria-pressed={playback.playing}
      >
        <span className={playback.playing ? styles.pause : styles.play} aria-hidden="true" />
      </button>
    </div>
  );
}
