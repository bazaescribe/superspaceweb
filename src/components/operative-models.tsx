"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useCopy } from "@/i18n/copy";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionEase } from "@/lib/motion";
import { orderRecord, orders, productionJob, productionJobs, stateTones, storyOrderId } from "@/lib/operational-story";
import { CollectionList, ObjectDetail, type CollectionRow } from "./operational-ui";
import { PreviewPanel } from "./preview-ui";
import styles from "./operative-models.module.css";
import backgroundPlaceholders from "./operative-model-backgrounds.json";

const path = "/assets/figma/operative-models/";
const story = orders.find((order) => order.id === storyOrderId)!;

type Localize = (value: string) => string;

const models = [
  {
    name: "Logistics",
    background: "d2d5d.webp",
    collection: "Orders",
    record: orderRecord(story),
    sections: ["properties", "related", "activity"] as const,
    rows: (localize: Localize) =>
      orders.slice(0, 7).map<CollectionRow>((order) => ({
        id: order.id,
        title: order.id,
        subtitle: `${order.customer}${order.driver ? ` · ${order.driver}` : ""}`,
        tags: [{ label: localize(order.state), tone: stateTones[order.state] }],
      })),
    points: [
      ["Connected deliveries", "Keep each order linked to its customer and assigned driver."],
      ["Visible progress", "Follow orders from draft through delivery."],
      ["Clear next steps", "Identify orders waiting for a driver and make the assignment from the same workspace."],
    ],
  },
  {
    name: "Manufacturing",
    background: "3203c.webp",
    collection: "Production jobs",
    record: productionJob,
    sections: ["properties", "details", "related"] as const,
    rows: (localize: Localize) =>
      productionJobs.map<CollectionRow>((job) => ({
        id: job.id,
        title: job.id,
        subtitle: `${job.order} · ${localize(job.product)}${job.owner ? ` · ${job.owner}` : ""}`,
        tags: [{ label: localize(job.state), tone: stateTones[job.state] }],
      })),
    points: [
      ["Connected production", "Keep production jobs linked to the customer orders they serve."],
      ["Visible progress", "Follow each job from queue to completion."],
      ["Clear ownership", "See which jobs need an owner before production begins."],
    ],
  },
];

function ModelBackground({ file }: { file: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.backgroundImage} data-loaded={loaded}>
      <span
        className={styles.backgroundPlaceholder}
        style={{ backgroundImage: `url("${backgroundPlaceholders[file as keyof typeof backgroundPlaceholders]}")` }}
      />
      <Image
        src={path + file}
        alt=""
        fill
        unoptimized
        loading="eager"
        sizes="(max-width: 720px) 100vw, 1280px"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/** The same object detail and collection primitives, configured for two different operations. */
export function OperativeModels() {
  const localizeCopy = useCopy();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  const id = useId();
  const model = models[active];
  const transition = { duration: reduced ? 0 : 0.55, ease: motionEase };
  return (
    <div ref={ref} className={styles.models} data-active={active}>
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label={localizeCopy("Operations")}>
          {models.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              id={id + "-tab-" + i}
              aria-selected={active === i}
              aria-controls={id + "-panel"}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const next =
                  event.key === "Home" ? 0 : event.key === "End" ? models.length - 1 : (i + 1) % models.length;
                setActive(next);
                event.currentTarget.parentElement?.querySelectorAll("button")[next].focus();
              }}
            >
              {active === i && (
                <motion.span
                  className={styles.tabHighlight}
                  layoutId={id + "-highlight"}
                  transition={{ duration: reduced ? 0 : 0.28 }}
                />
              )}
              <span>{localizeCopy(item.name)}</span>
            </button>
          ))}
        </div>
        <Link className={styles.more} href="/how-it-works#operations">
          {localizeCopy("See what’s shared")}
        </Link>
      </div>
      <div id={id + "-panel"} role="tabpanel" aria-labelledby={id + "-tab-" + active} tabIndex={0}>
        <div
          className={styles.stage}
          style={{
            backgroundImage: `url("${backgroundPlaceholders[model.background as keyof typeof backgroundPlaceholders]}")`,
          }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              className={styles.background}
              key={model.background}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              <ModelBackground file={model.background} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.composition}
              initial="hidden"
              animate={entered ? "show" : "hidden"}
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduced ? 0 : 0.09 } },
                exit: { transition: { staggerChildren: reduced ? 0 : 0.035, staggerDirection: -1 } },
              }}
            >
              {[
                <div className={styles.collectionBody} key="collection">
                  <div className={styles.bar}>
                    <span>
                      <span className={styles.muted}>{localizeCopy("Data")} / </span>
                      {localizeCopy(model.collection)}
                    </span>
                    <span aria-hidden="true">···</span>
                  </div>
                  <div className={styles.collectionRows}>
                    <CollectionList
                      label={localizeCopy(model.collection)}
                      rows={model.rows(localizeCopy)}
                      selected={model.record.id}
                    />
                  </div>
                </div>,
                <div className={styles.detailBody} key="detail">
                  <ObjectDetail record={model.record} sections={[...model.sections]} />
                </div>,
              ].map((content, i) => (
                <motion.div
                  key={i}
                  className={i === 0 ? styles.scene : styles.detail}
                  variants={{
                    hidden: { opacity: 0, y: reduced ? 0 : 36 },
                    show: { opacity: 1, y: 0, transition },
                    exit: { opacity: 0, y: reduced ? 0 : -14, transition: { duration: reduced ? 0 : 0.18 } },
                  }}
                >
                  <PreviewPanel theme="dark" className={styles.panel}>
                    {content}
                  </PreviewPanel>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.pointsContainer}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className={styles.points}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: entered ? 1 : 0, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
            >
              {model.points.map(([title, text]) => (
                <div key={title}>
                  <h3>{localizeCopy(title)}</h3>
                  <p>{localizeCopy(text)}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className={styles.shared}>
          <span>{localizeCopy("Shared by both")}</span>{" "}
          {localizeCopy("Objects · Relationships · States · Actions · Roles · Activity")}
        </p>
      </div>
    </div>
  );
}
