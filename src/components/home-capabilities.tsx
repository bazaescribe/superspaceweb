"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { PermissionsMockup, ActivityMockup, ContextMockup, AutomationsMockup } from "./feature-previews";
import { PreviewPanel, PreviewTag, PreviewSpinner, PreviewTitle, PreviewIcon } from "./preview-ui";
import { PreviewStage } from "./preview-stage";
import styles from "./home-capabilities.module.css";

const asset = "/assets/figma/home-iteration/";
const racks = [
  "e1f4d",
  "79891",
  "87340",
  "e2e3e",
  "27077",
  "3e6c2",
  "1a8a5",
  "9aa1e",
  "29c60",
  "1c290",
  "0bc66",
  "5b57c",
];
const positions = [
  [38.1, 0],
  [19.05, 33.92],
  [0, 67.66],
  [52.38, 27.59],
  [33.33, 61.51],
  [14.29, 95.25],
  [66.67, 52.9],
  [47.62, 86.81],
  [28.57, 120.55],
  [80.95, 78.2],
  [61.9, 112.12],
  [42.86, 145.86],
];
function SmartViews() {
  return (
    <div className={styles.smart} aria-hidden="true">
      <PreviewPanel theme="dark" className={styles.smartPanel}>
        <PreviewTitle label="Apps">Server Room Floor Plan</PreviewTitle>
        <div className={styles.floor}>
          {racks.map((file, i) => (
            <Image
              key={file}
              src={`${asset}${file}.svg`}
              alt=""
              width={59.0476}
              height={84.5288}
              style={{ left: `${positions[i][0]}%`, top: `${(positions[i][1] / 230.39) * 100}%` }}
            />
          ))}
        </div>
        <small>Status overview</small>
        {[
          ["Virtual machine server", "132.012.321.32"],
          ["Web server", "10.0.0.12"],
          ["Application server", "172.16.254.1"],
          ["Backup server", "203.0.113.5"],
        ].map(([name, address]) => (
          <div className={styles.server} key={name}>
            <PreviewIcon file="cfc20" />
            <span>{name}</span>
            <small>{address}</small>
          </div>
        ))}
      </PreviewPanel>
    </div>
  );
}
const logos = [
  ["ce4c3", "65182", "03e27", "25d78", "43749"],
  ["0d608", "f802c", "f7830", "ce692"],
];
function IntegrationTiles() {
  return (
    <div className={styles.integrations} aria-hidden="true">
      {logos.map((row, i) => (
        <div className={styles.logoRow} key={i}>
          {row.map((name) => (
            <Image key={name} src={`${asset}${name}.png`} alt="" width={96} height={96} />
          ))}
        </div>
      ))}
    </div>
  );
}
const capabilities = [
  {
    title: "Roles & Permissions",
    description: "Control access across teams, locations and responsibilities.",
    visual: <PermissionsMockup />,
  },
  {
    title: "Activity and Traceability",
    description: "A secure activity history helps keep your team informed and protected.",
    visual: <ActivityMockup />,
  },
  {
    title: "Files, comments & context",
    description: "Keep the information behind the work attached to the work itself.",
    visual: <ContextMockup dark />,
  },
  {
    title: "Smart views",
    description: "Your superspace automatically creates the apps you need.",
    visual: <SmartViews />,
  },
  {
    title: "Rules & workflows",
    description: "Model your superspace around how work gets done.",
    visual: <AutomationsMockup compact />,
  },
  {
    title: "Integrations & API",
    description: "Connect the systems your business already depends on.",
    visual: <IntegrationTiles />,
    soon: true,
  },
];
export function HomeCapabilities() {
  return (
    <div className={styles.grid}>
      {capabilities.map((card) => (
        <article className={styles.card} key={card.title}>
          <div className={styles.copy}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {card.soon && <span className={styles.soon}>Coming soon</span>}
          </div>
          <div className={styles.visual}>{card.visual}</div>
        </article>
      ))}
    </div>
  );
}
const stages = ["Incoming", "Assignation in progress", "Need your attention", "Assigned"];
function DeliveryCard({
  index,
  assigned = false,
  attention = false,
  cycle = 0,
}: {
  index: number;
  assigned?: boolean;
  attention?: boolean;
  cycle?: number;
}) {
  return (
    <div className={styles.delivery}>
      {!assigned && !attention && (
        <header>
          <Image src={`${asset}e0afc.svg`} alt="" width={30} height={30} />
          <div>
            Assignations Agent<small>{cycle % 2 === 0 ? "Confirmed via SMS" : "Checking availability"}</small>
          </div>
          <PreviewSpinner />
        </header>
      )}
      <div className={styles.deliveryBody}>
        <div>
          Request #{1129316 - index}
          <small>Today {index === 0 ? "12" : "5"}m ago.</small>
        </div>
        <div>
          <small>Pickup</small>
          {assigned
            ? "Blvd. Adolfo López Mateos 789, Lomas de Chapultepec, Miguel Hidalgo, Ciudad de México."
            : index === 0
              ? "Av. Insurgentes Sur 1234, Del Valle, Benito Juárez, Ciudad de México."
              : "Calle Reforma 300, Juárez, Cuauhtémoc, Ciudad de México."}
        </div>
        <div>
          <small>Delivery</small>
          {assigned
            ? "Av. Insurgentes Norte 234, Lindavista, Gustavo A. Madero, Ciudad de México."
            : "Calle Oaxaca 56, Roma Norte, Cuauhtémoc, Ciudad de México."}
        </div>
        <div className={styles.deliveryField}>
          <small>Courier</small>
          <PreviewTag tone={assigned ? "green" : attention ? "neutral" : "amber"}>
            {assigned ? "JL Juan López" : attention ? "None" : "Assigned"}
          </PreviewTag>
        </div>
        <div className={styles.deliveryField}>
          <small>Delivery</small>
          <PreviewTag tone={assigned ? "green" : "amber"}>Scheduled {attention ? "3" : "4"}pm</PreviewTag>
        </div>
      </div>
      {attention && (
        <div className={styles.exception}>
          <strong>Delivery couldn’t be assigned.</strong>
          <p>There were no courier available to complete this delivery.</p>
          <div>
            <span>EDIT PAYMENT</span>
            <span>CONTACT CLIENT</span>
          </div>
        </div>
      )}
    </div>
  );
}
export function HomeWorkforcePreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const visible = useInView(ref, { amount: 0.15 });
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!visible || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setCycle((c) => c + 1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [visible, reducedMotion]);
  return (
    <div>
      <PreviewStage
        background="Home Workforce.webp"
        stageRef={ref}
        entered={entered}
        label="AI agents coordinating delivery assignments"
        className={styles.workforce}
        tabIndex={0}
      >
        <motion.div
          className={styles.board}
          aria-hidden="true"
          initial={false}
          animate={{ opacity: entered ? 1 : 0, y: entered || reducedMotion ? 0 : 24 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
        >
          <div className={styles.boardBar}>
            <span>
              Operations intelligence <span className={styles.chevron}>›</span> Delivery Assignations
            </span>
            <PreviewTag tone="green">3 Agents working</PreviewTag>
          </div>
          <div className={styles.boardBody}>
            <h3>42 deliveries to coordinate today.</h3>
            <p>Your agents are coordinating assignments, checking availability and flagging exceptions.</p>
            <div className={styles.columns}>
              {stages.map((stage, i) => (
                <div className={styles.column} key={stage}>
                  <div className={styles.columnHeading}>
                    {i === 1 ? <PreviewSpinner /> : <span className={styles.status} data-tone={i} />}
                    <span>{stage}</span>
                    <small>{[0, 8, 2, 32][i]}</small>
                    <span className={styles.arrow}>↓</span>
                  </div>
                  {i === 0 ? (
                    <div className={styles.empty}>
                      <Image src={`${asset}a4949.svg`} alt="" width={56} height={64} />
                      <strong>Waiting for new services</strong>
                      <small>3 sources connected</small>
                    </div>
                  ) : (
                    <>
                      <motion.div
                        key={i === 1 ? cycle : stage}
                        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <DeliveryCard index={i === 1 ? 0 : 1} assigned={i === 3} attention={i === 2} cycle={cycle} />
                      </motion.div>
                      <DeliveryCard index={2} assigned={i === 3} />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </PreviewStage>
      <p className={styles.caption}>Feature preview</p>
    </div>
  );
}
