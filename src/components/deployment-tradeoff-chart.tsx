"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import data from "@/lib/deployment-comparison.json";
import styles from "@/app/deployment/deployment.module.css";

export function DeploymentTradeoffChart() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const { ref, entered, reducedMotion } = useScrollEntrance<HTMLDivElement>();
  const dimension = data.dimensions[selected];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % data.dimensions.length;
    else if (event.key === "ArrowLeft") next = (index + data.dimensions.length - 1) % data.dimensions.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = data.dimensions.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }
  return (
    <div ref={ref}>
      <div role="tablist" aria-label={data.title} className={styles.tabs}>
        {data.dimensions.map((item, index) => (
          <button
            key={item.id}
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`${id}-panel`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
        className={styles.chart}
      >
        <div className={styles.chartQuestion}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={dimension.id}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.24 } }}
              exit={{
                opacity: reducedMotion ? 1 : 0,
                y: reducedMotion ? 0 : -8,
                transition: { duration: reducedMotion ? 0 : 0.16 },
              }}
              transition={{ ease: [0.22, 0.86, 0.24, 1] }}
            >
              {dimension.question}
            </motion.p>
          </AnimatePresence>
          <span className="sr-only">
            {dimension.description}{" "}
            {dimension.preferredDirection === "higher" ? "Higher is better." : "Lower is better."}
          </span>
        </div>
        <div className={styles.bars}>
          {data.models.map((model, index) => {
            const item = dimension.values[model.id as keyof typeof dimension.values];
            const position = (item.value - data.scale.min) / (data.scale.max - data.scale.min);
            const sentiment = dimension.valueSentiment[position >= 0.5 ? "high" : "low"];
            const color = model.highlight
              ? "#5c10e8"
              : position > 0.3 && position < 0.7
                ? "#f0ac00"
                : sentiment === "positive"
                  ? "#00bc7d"
                  : "#fb2c36";
            return (
              <div key={model.id} className={styles.barRow}>
                <span>
                  {model.highlight ? (
                    <Image src="/assets/figma/deployment/wordmark.svg" alt={model.label} width={118} height={16} />
                  ) : (
                    model.label
                  )}
                </span>
                <span className="sr-only">{item.explanation}</span>
                <div className={styles.barTrack} title={item.explanation} aria-hidden="true">
                  <motion.div
                    key={dimension.id}
                    className={styles.barFill}
                    style={{ backgroundColor: color }}
                    initial={reducedMotion ? false : { width: "0%" }}
                    animate={{ width: entered ? `${position * 100}%` : "0%" }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.65,
                      delay: reducedMotion ? 0 : index * 0.07,
                      ease: [0.22, 0.86, 0.24, 1],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className={styles.disclaimer}>{data.disclaimer}</p>
    </div>
  );
}
