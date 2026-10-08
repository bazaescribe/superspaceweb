"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { PreviewPanel, PreviewTitle } from "./preview-ui";
import styles from "./views-mockup.module.css";

const prompt =
  "Show me a floor plan of the server room in the data center with each rack labeled by its ID. Highlight racks with active problems in red and pending maintenance in amber.";
const racks = [
  ["48441", 38.1, 0],
  ["c05da", 19.05, 31.29],
  ["6201a", 0, 62.42],
  ["14595", 52.38, 25.45],
  ["94b12", 33.33, 56.74],
  ["81316", 14.29, 87.87],
  ["05261", 66.67, 48.8],
  ["cdb53", 47.62, 80.09],
  ["2d4ea", 28.57, 111.22],
  ["a0b39", 80.95, 72.15],
  ["ee772", 61.9, 103.44],
  ["212df", 42.86, 134.57],
] as const;
const servers = [
  ["Virtual machine server", "132.012.321.32", "9ded0"],
  ["Web server", "10.0.0.12", "9ded0"],
  ["Application server", "172.16.254.1", "b2a7b"],
  ["Backup server", "203.0.113.5", "9ded0"],
  ["Database server", "203.0.113.12", "9ded0"],
  ["Database server", "192.168.1.45", "f68b1"],
  ["Web server", "203.0.113.20", "9ded0"],
  ["Email server", "203.0.113.22", "9ded0"],
];
function Asset({ file, size = 14 }: { file: string; size?: number }) {
  return <Image src={`/assets/figma/custom-views/${file}.svg`} width={size} height={size} alt="" />;
}

export function ViewsMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!visible || reduced) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = Math.min(now - last, 100);
      last = now;
      const card = ref.current?.closest("article");
      if (
        document.hidden ||
        card?.getAttribute("aria-hidden") === "true" ||
        card?.getAttribute("data-preview-playing") === "false"
      )
        return;
      setElapsed((value) => (value + delta) % 15200);
    }, 40);
    return () => window.clearInterval(timer);
  }, [visible, reduced]);
  const stage =
    reduced || elapsed >= 9400
      ? "result"
      : elapsed >= 8900
        ? "exit"
        : elapsed >= 7900
          ? "loading"
          : elapsed >= 7650
            ? "submit"
            : elapsed >= 2200
              ? "typing"
              : "empty";
  const typed = prompt.slice(0, Math.floor(Math.max(0, Math.min(1, (elapsed - 2200) / 5200)) * prompt.length));
  const result = stage === "result";
  return (
    <div ref={ref} className={styles.viewport} aria-hidden="true" data-generative-stage={stage}>
      <AnimatePresence mode="wait" initial={false}>
        {result ? (
          <motion.div
            key="result"
            className={styles.result}
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <PreviewPanel className={styles.app}>
              <PreviewTitle label="Apps">Server Room Floor Plan</PreviewTitle>
              <div className={styles.floor}>
                {racks.map(([file, left, top]) => (
                  <div key={file} className={styles.rack} style={{ left: `${left}%`, top } as CSSProperties}>
                    <Image src={`/assets/figma/custom-views/${file}.svg`} width={55.4762} height={78.3656} alt="" />
                  </div>
                ))}
              </div>
              <div className={styles.status}>
                <small>Status overview</small>
                {servers.map(([name, address, icon]) => (
                  <div className={styles.server} key={address}>
                    <Asset file={icon} size={20} />
                    <span>{name}</span>
                    <span>{address}</span>
                  </div>
                ))}
              </div>
            </PreviewPanel>
          </motion.div>
        ) : (
          <motion.div
            key="prompt"
            className={styles.promptPosition}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: stage === "exit" ? 0 : 1, scale: stage === "exit" ? 0.82 : 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.45 }}
          >
            <PreviewPanel className={styles.prompt}>
              <div className={styles.input}>
                {stage === "empty" ? <span className={styles.placeholder}>Ask anything about Acme Inc.</span> : typed}
                {(stage === "empty" || stage === "typing") && <span className={styles.caret} />}
              </div>
              <div className={styles.actions}>
                <span className={styles.iconButton}>
                  <Asset file="4812c" />
                </span>
                <div className={styles.rightActions}>
                  <span className={`${styles.iconButton} ${styles.voice}`}>
                    <Asset file="488a0" />
                  </span>
                  <motion.span
                    className={`${styles.iconButton} ${styles.send}`}
                    animate={{ scale: stage === "submit" ? 0.86 : 1 }}
                    transition={{ duration: 0.12 }}
                  >
                    {stage === "loading" ? <span className={styles.spinner} /> : <Asset file="96bf7" />}
                  </motion.span>
                </div>
              </div>
            </PreviewPanel>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.fade} />
    </div>
  );
}
