"use client";

import { LinePath } from "@visx/shape";
import { curveMonotoneX, curveStepAfter } from "@visx/curve";
import { motion } from "motion/react";
import { useId } from "react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { motionEase } from "@/lib/motion";
import styles from "./deployment-cost-chart.module.css";

type Point = { time: number; cost: number };
// Relative illustrative shapes, not prices, forecasts, or measured savings.
const series = [
  {
    id: "internal",
    title: "Internal team",
    color: "#b6b0ff",
    curve: curveMonotoneX,
    description: "Development, people, infrastructure, and ongoing maintenance.",
    points: [
      { time: 0, cost: 12 },
      { time: 1, cost: 28 },
      { time: 2, cost: 42 },
      { time: 3, cost: 53 },
      { time: 4, cost: 64 },
      { time: 5, cost: 75 },
      { time: 6, cost: 86 },
      { time: 7, cost: 97 },
    ],
  },
  {
    id: "consulting",
    title: "Project consulting",
    color: "#83c8ed",
    curve: curveStepAfter,
    description: "Implementation, then separately commissioned changes and support.",
    points: [
      { time: 0, cost: 18 },
      { time: 1, cost: 30 },
      { time: 2, cost: 30 },
      { time: 3, cost: 44 },
      { time: 4, cost: 44 },
      { time: 5, cost: 60 },
      { time: 6, cost: 60 },
      { time: 7, cost: 76 },
    ],
  },
  {
    id: "superspace",
    title: "Superspace",
    color: "#f16bb1",
    curve: curveMonotoneX,
    description: "Discovery upfront, then a steady monthly service fee. Extensions scoped separately.",
    points: [
      { time: 0, cost: 10 },
      { time: 1, cost: 18 },
      { time: 2, cost: 22 },
      { time: 3, cost: 26 },
      { time: 4, cost: 30 },
      { time: 5, cost: 34 },
      { time: 6, cost: 38 },
      { time: 7, cost: 42 },
    ],
  },
];
const x = (point: Point) => 48 + (point.time / 7) * 900;
const y = (point: Point) => 310 - point.cost * 2.6;

export function DeploymentCostChart() {
  const { ref, entered, reducedMotion } = useScrollEntrance<HTMLElement>();
  const id = useId().replaceAll(":", "");
  const transition = (delay = 0) => ({
    duration: reducedMotion ? 0 : 1.8,
    delay: reducedMotion ? 0 : delay,
    ease: motionEase,
  });

  return (
    <figure ref={ref} className={styles.chart} aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>The cost of keeping software working</span>
        <h3 id={`${id}-title`}>
          More predictable.
          <br />
          <span>By design.</span>
        </h3>
        <p>A monthly service you can plan around. Fewer software responsibilities for your team to carry.</p>
      </div>
      <div className={styles.legend} aria-label="Illustrated delivery models">
        {[series[2], series[0], series[1]].map((line) => (
          <span key={line.id}>
            <i style={{ background: line.color }} />
            {line.title}
          </span>
        ))}
      </div>
      <div className={styles.plot} aria-hidden="true">
        <svg viewBox="0 0 1000 350" fill="none">
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#f16bb1" stopOpacity=".14" />
              <stop offset="1" stopColor="#f16bb1" stopOpacity="0" />
            </linearGradient>
            <filter id={`${id}-glow`} x="-30%" y="-60%" width="160%" height="220%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <LinePath data={series[2].points} x={x} y={y} curve={curveMonotoneX}>
            {({ path }) => (
              <motion.path
                d={`${path(series[2].points)} L948,330 L48,330 Z`}
                fill={`url(#${id}-fill)`}
                initial={{ opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={transition(0.7)}
              />
            )}
          </LinePath>
          {series.map((line, index) => (
            <LinePath key={line.id} data={line.points} x={x} y={y} curve={line.curve}>
              {({ path }) => (
                <>
                  {line.id === "superspace" && (
                    <motion.path
                      d={path(line.points) ?? ""}
                      stroke={line.color}
                      strokeWidth="9"
                      filter={`url(#${id}-glow)`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: entered ? 1 : 0, opacity: entered ? 0.5 : 0 }}
                      transition={transition(index * 0.2)}
                    />
                  )}
                  <motion.path
                    d={path(line.points) ?? ""}
                    stroke={line.color}
                    strokeWidth={line.id === "superspace" ? 4.5 : 2.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: entered ? 1 : 0, opacity: entered ? 1 : 0 }}
                    transition={transition(index * 0.2)}
                  />
                  <motion.circle
                    cx={x(line.points[7])}
                    cy={y(line.points[7])}
                    r={line.id === "superspace" ? 6 : 4}
                    fill={line.color}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: entered ? 1 : 0, scale: entered ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 1.8 + index * 0.2 }}
                  />
                </>
              )}
            </LinePath>
          ))}
        </svg>
        <div className={styles.time}>
          <span>Getting started</span>
          <span>As the operation continues →</span>
        </div>
      </div>
      <div className={styles.components}>
        {[series[2], series[0], series[1]].map((line, index) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 12 }}
            transition={{ ...transition(reducedMotion ? 0 : 1.3 + index * 0.12), duration: reducedMotion ? 0 : 0.6 }}
          >
            <span style={{ color: line.color }}>{line.title}</span>
            <p>{line.description}</p>
          </motion.div>
        ))}
      </div>
      <figcaption id={`${id}-caption`}>
        Illustrative cumulative cost patterns, not a price forecast or a savings guarantee. Superspace’s line represents
        an agreed scope; additional work can change costs. Actual costs depend on scope, staffing, usage, and support
        arrangements.
      </figcaption>
    </figure>
  );
}
