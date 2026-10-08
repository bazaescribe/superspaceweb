"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { PreviewPerson, PreviewTitle, PreviewTag } from "./preview-ui";
import styles from "./workflow-mockup.module.css";

const assets = "/assets/figma/workflows/";
const members = [
  ["Truck Driver", "ML", "Mauro Lainez", "#615fff"],
  ["Excavator operator", "VD", "Vicente del Bosque", "#fb2c36"],
  ["Mixer operator", "MG", "Manuel Garza", "#ff6900"],
  ["Mixer operator", "AF", "Antonio Flores", "#00bba7"],
];
export function WorkflowMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.25, once: true });
  const reduced = useReducedMotion();
  const id = useId();
  const entrance = (index: number) => ({
    initial: { opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.9 },
    animate: { opacity: visible || reduced ? 1 : 0, scale: visible || reduced ? 1 : 0.9 },
    transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <div ref={ref} className={styles.viewport} aria-hidden="true">
      <div className={styles.scene}>
        <motion.div className={`${styles.card} ${styles.request}`} {...entrance(0)}>
          <div className={styles.body}>
            <PreviewTitle label="#091294">New Machinery Rental Request</PreviewTitle>
            <div className={styles.fields}>
              <div>
                <small>From</small>
                <PreviewTag tone="blue">Big Tuna Fish Co.</PreviewTag>
                <PreviewTag>
                  <Image src={`${assets}calendar.svg`} width={12} height={12} alt="" />
                  March 23
                </PreviewTag>
              </div>
              <div>
                <small>Properties</small>
                <PreviewTag tone="green">Active</PreviewTag>
                <PreviewTag tone="amber">Waiting confirmation</PreviewTag>
              </div>
              <div>
                <small>Acct. Mgr.</small>
                <PreviewPerson initials="BL" name="Beatriz López" color="#ad46ff" />
              </div>
              <div>
                <small>Req. Details</small>
                <PreviewTag>
                  Machines <b>3</b>
                </PreviewTag>
                <PreviewTag>
                  Operators <b>4</b>
                </PreviewTag>
              </div>
            </div>
          </div>
          <div className={styles.map}>
            <Image src={`${assets}request-map.png`} alt="" fill sizes="320px" />
          </div>
        </motion.div>
        <div className={styles.connectors}>
          {[
            {
              path: "M97.5 0.25C23.5 0.25 97.5 95.7499 23.5 95.7499H0",
              width: 97.5,
              height: 95.9999,
              color: "#009DFF",
              end: "#F622FE",
              className: styles.machineryConnector,
              x: 39.5,
              y1: -10.75,
              y2: 95.75,
            },
            {
              path: "M129 0.25C23.5 0.25 116.5 121.75 23.5 118.75H0",
              width: 129,
              height: 119.055,
              color: "#F27210",
              end: "#F622FE",
              className: styles.operatorsConnector,
              x: 56.3971,
              y1: 0.25,
              y2: 118.805,
            },
          ].map((connector, index) => (
            <svg
              key={index}
              className={connector.className}
              width={connector.width}
              height={connector.height}
              viewBox={`0 0 ${connector.width} ${connector.height}`}
              fill="none"
            >
              <defs>
                <linearGradient
                  id={`${id}-${index}`}
                  x1={connector.x}
                  x2={connector.x}
                  y1={connector.y1}
                  y2={connector.y2}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={connector.color} />
                  <stop offset="1" stopColor={connector.end} />
                </linearGradient>
              </defs>
              <motion.path
                d={connector.path}
                stroke={`url(#${id}-${index})`}
                strokeWidth="0.5"
                initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
                animate={{ pathLength: visible || reduced ? 1 : 0, opacity: visible || reduced ? 1 : 0 }}
                transition={{
                  duration: reduced ? 0 : 0.85,
                  delay: reduced ? 0 : 0.85 + index * 0.12,
                  ease: "easeInOut",
                }}
              />
            </svg>
          ))}
        </div>
        <motion.div className={`${styles.card} ${styles.garage}`} {...entrance(1)}>
          <div className={styles.body}>
            <PreviewTitle label="Garage">
              Machinery request for <em>#091294</em>
            </PreviewTitle>
            <div className={styles.equipment}>
              <small>Req. Details</small>
              <div className={styles.machines}>
                <div>
                  <div className={styles.photo}>
                    <Image src={`${assets}cement-mixer.png`} alt="" fill sizes="108px" />
                  </div>
                  <p>Cement Mixer</p>
                  <small>2 machines</small>
                </div>
                <div>
                  <div className={`${styles.photo} ${styles.excavator}`}>
                    <Image src={`${assets}excavator.png`} alt="" fill sizes="124px" />
                  </div>
                  <p>Excavator</p>
                  <small>1 machine</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div className={`${styles.card} ${styles.team}`} {...entrance(2)}>
          <div className={styles.body}>
            <PreviewTitle label="Team management">
              Operators request for <em>#091294</em>
            </PreviewTitle>
            <div className={styles.members}>
              <small>Team members</small>
              {members.map(([role, initials, name, color]) => (
                <div key={name}>
                  <span className={styles.count}>1</span>
                  <span className={styles.role}>{role}</span>
                  <PreviewPerson initials={initials} name={name} color={color} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className={styles.fade} />
    </div>
  );
}
