"use client";

import Image from "next/image";
import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionEase } from "@/lib/motion";
import { PreviewPanel, PreviewTag, PreviewAvatar } from "./preview-ui";
import styles from "./operative-models.module.css";
import backgroundPlaceholders from "./operative-model-backgrounds.json";

const path = "/assets/figma/operative-models/";
const models = [
  {
    name: "Retail",
    background: "9ebf3.webp",
    points: [
      ["Supply chain", "Match supply and demand with business-specific assignment rules."],
      ["Coordination", "Coordinate orders, providers, and exceptions across the full lifecycle."],
      ["Orchestration", "Keep payments, statuses, and operational decisions in sync."],
    ],
  },
  {
    name: "Logistics",
    background: "d2d5d.webp",
    points: [
      ["Route planning", "Plan deliveries around capacity, locations, and time windows."],
      ["Fleet coordination", "Keep drivers, vehicles, and assignments working together."],
      ["Delivery tracking", "Track progress, manage exceptions, and keep orders moving."],
    ],
  },
  {
    name: "Field Operations",
    background: "a5e2b.webp",
    points: [
      ["Service management", "Turn incoming requests into structured, actionable work."],
      ["Smart assignments", "Schedule the right people based on availability, skills, and location."],
      ["Field execution", "Capture progress, evidence, and approvals directly from the field."],
    ],
  },
  {
    name: "Manufacturing",
    background: "3203c.webp",
    points: [
      ["Production planning", "Coordinate work orders, materials, and production resources."],
      ["Process control", "Move production through defined stages, rules, and approvals."],
      ["Quality & traceability", "Keep checks, exceptions, and production history connected."],
    ],
  },
];
function Asset({ file, className = "", style }: { file: string; className?: string; style?: CSSProperties }) {
  return (
    <Image
      src={path + file}
      alt=""
      unoptimized
      fill
      sizes="(max-width: 720px) 600px, 1000px"
      className={className}
      style={style}
    />
  );
}
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
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <small>{label}</small>
      <div>{children}</div>
    </div>
  );
}
function Person({ name, email, initials }: { name: string; email: string; initials: string }) {
  return (
    <div className={styles.person}>
      <PreviewAvatar initials={initials} />
      <div>
        {name}
        <small>{email}</small>
      </div>
    </div>
  );
}
function Events({ items }: { items: string[] }) {
  return (
    <ol className={styles.events}>
      {items.map((item, i) => (
        <li key={item} style={{ "--row": i } as CSSProperties}>
          <span className={i === 1 ? styles.working : ""} />
          {item}
        </li>
      ))}
    </ol>
  );
}
function Progress({ manufacturing = false }: { manufacturing?: boolean }) {
  return (
    <div className={styles.progressGroup}>
      <div>{manufacturing ? "Modular Shelf A12 · Panels" : "Stop 11 / 16"}</div>
      <div className={styles.progress}>
        <span />
      </div>
      {manufacturing && (
        <small>
          86 of 120 units completed <span>72%</span>
        </small>
      )}
    </div>
  );
}
function Detail({ model }: { model: number }) {
  return (
    <PreviewPanel theme="dark" className={styles.detailPanel}>
      {model === 3 && (
        <div className={styles.machineImage}>
          <Asset file="95d8b.webp" />
        </div>
      )}
      <div className={styles.detailBody}>
        <header>
          {["New order received", "Route N04", "Service Visit Assigned", "CNC Routing Machine 02"][model]}
          {model === 1 && <PreviewTag>In progress</PreviewTag>}
          {model === 3 && <PreviewTag tone="green">Running</PreviewTag>}
          <small>{["PF-234014", "", "JOB #FS1083", "CNC-RTR-02"][model]}</small>
        </header>
        {model === 0 && (
          <>
            <Field label="Origin">
              <div className={styles.person}>
                <div className={styles.shopify}>
                  <Asset file="2e2fa.webp" />
                </div>
                <div>
                  Shopify<small>plantfriends.mx</small>
                </div>
              </div>
            </Field>
            <div className={styles.inline}>
              <Field label="Value">
                <PreviewTag>$2,480.00</PreviewTag>
              </Field>
              <Field label="Delivery">
                <PreviewTag>Same day pick up</PreviewTag>
              </Field>
            </div>
            <Field label="Handling location">Showroom Narvarte</Field>
            <Field label="Order">
              <Events items={["Begonia Ferox", "Hoya Kerrii", "Potting mix 5 lb. bag."]} />
            </Field>
            <Field label="Status">
              <Events items={["Stock reserved", "Preparing Hand-off", "Order completed"]} />
            </Field>
          </>
        )}
        {model === 1 && (
          <>
            <Field label="Route">
              Benito Juárez II.
              <div className={styles.tags}>
                {["Narvarte", "Del Valle", "Nápoles"].map((t) => (
                  <PreviewTag key={t}>{t}</PreviewTag>
                ))}
              </div>
            </Field>
            <Progress />
            <Field label="Driver">
              <Person name="Valeria Ruíz" email="val.ruiz@northstar.com" initials="AO" />
            </Field>
            <Field label="Vehicle">
              Sprinter A2<small>Mercedes-Benz, 043-ALV</small>
            </Field>
            <Field label="Events">
              <Events
                items={[
                  "Heading to Delivery location for #120428",
                  "Delivery #120427 completed",
                  "Delivery #120426 scheduled for tomorrow",
                  "Delivery #120425 completed",
                  "Delivery #120424 completed",
                ]}
              />
            </Field>
          </>
        )}
        {model === 2 && (
          <>
            <Field label="Request">AC Maintenance</Field>
            <div>
              <PreviewTag tone="blue">In progress</PreviewTag>
            </div>
            <Field label="Location">
              Casa Humboldt<small>Av. Parras 1207, Colonia Condesa, Cuauhtémoc, Ciudad de México, CDMX</small>
            </Field>
            <Field label="Schedule">
              <div className={styles.tags}>
                <PreviewTag>Today</PreviewTag>
                <PreviewTag>From 13:00</PreviewTag>
                <PreviewTag>To 15:00</PreviewTag>
              </div>
            </Field>
            <Field label="Technician">
              <Person name="Daniel Mejía" email="daniel.mejia@sisyphusmaintenance.co" initials="AO" />
            </Field>
            <Field label="Service Checklist">
              <Events
                items={[
                  "Verify equipment",
                  "Inspect filters",
                  "Test electrical system",
                  "Capture service photos",
                  "Customer signoff",
                ]}
              />
            </Field>
          </>
        )}
        {model === 3 && (
          <>
            <div className={styles.orderLabel}>
              CURRENT WORK ORDER <span>WO-2048</span>
            </div>
            <Progress manufacturing />
            <div className={styles.metrics}>
              {[
                ["Units / hour", "28"],
                ["Target / hour", "26.4"],
                ["Total Units", "18,742"],
              ].map(([a, b]) => (
                <Field label={a} key={a}>
                  {b}
                </Field>
              ))}
            </div>
            <Field label="Shift operator">
              <Person name="Jennifer García" email="jennifer.garcia@horusindustries.com.mx" initials="JG" />
            </Field>
          </>
        )}
      </div>
    </PreviewPanel>
  );
}
function Retail() {
  return (
    <div className={styles.store}>
      <div className={styles.plants}>
        <Asset file="c2805.webp" />
      </div>
      <header>
        <strong>PlantFriends</strong>
        <span>
          Catalog　 Promos　 About　 <b>Cart (12)</b>
        </span>
      </header>
      <div className={styles.storeCopy}>
        <h3>
          Exotic plants for
          <br />
          your collection
        </h3>
        <p>PlantFriends has the largest plant variety and delivers all across Mexico.</p>
        <span>EXPLORE THE CATALOG</span>
      </div>
    </div>
  );
}
function Logistics() {
  return (
    <div className={styles.map}>
      <Asset file="19c4b.webp" className={styles.mapImage} />
      <div className={styles.routeLine}>
        <Asset file="861a2.svg" />
      </div>
      {[
        ["120429", 4, 8],
        ["120428", 38, 12],
        ["120427", 49, 52],
        ["120426", 82, 71],
      ].map(([label, x, y], i) => (
        <span
          key={label}
          className={styles.mapPin}
          style={{ left: `${x}%`, top: `${y}%`, "--row": i } as CSSProperties}
        >
          <i />
          {label}
        </span>
      ))}
    </div>
  );
}
function FieldOperations() {
  return (
    <>
      <div className={styles.phone}>
        <div className={styles.phoneStatus}>
          9:41 <span>▴ ▰ ▰</span>
        </div>
        <div className={styles.phoneNav}>
          <Asset file="ae5be.webp" />☰{" "}
          <span className={styles.phoneLogo}>
            <Asset file="cd97c.webp" />
          </span>
          <b>My Jobs</b>
          <div className={styles.phoneAvatar}>
            <Asset file="442c4.webp" />
          </div>
        </div>
        <div className={styles.phoneMap}>
          <Asset file="21839.webp" />
        </div>
        <div className={styles.phoneBody}>
          <small>Location</small>
          <p>Casa Humboldt</p>
          <small>Av. Parras 1207, Colonia Condesa, Cuauhtémoc, Ciudad de México, CDMX</small>
          <br />
          <br />
          <small>JOB #FS1083</small>
          <h3>AC Maintenance</h3>
          <Events items={["Verify equipment", "Inspect filters", "Test electrical system", "Capture service photos"]} />
        </div>
      </div>
      <div className={styles.calendar}>
        <h3>
          May 2nd, <span>2027</span>
        </h3>
        <div className={styles.calendarGrid}>
          <div className={styles.hours}>
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i}>{i}:00</span>
            ))}
          </div>
          {["Edgardo Ramírez", "Carlos Treviño", "Mariana Cruz"].map((name, i) => (
            <div className={styles.day} key={name}>
              <header>
                <PreviewAvatar initials={["ER", "CT", "MC"][i]} />
                {name}
              </header>
              <div
                className={styles.appointment}
                style={
                  {
                    top: `${i * 140 + 45}px`,
                    "--appointment-color": ["#ad46ff", "#00a6f4", "#00b87a"][i],
                  } as CSSProperties
                }
              >
                <small>
                  WO-{1063 - i * 12} <PreviewTag tone="blue">Confirmed</PreviewTag>
                </small>
                <p>
                  {
                    [
                      "Libramiento Noreste km 33, Parque Industrial Escobedo, General Escobedo, NL",
                      "Blvd. Aeropuerto 1001, Parque Industrial Milenium, Apodaca, NL",
                      "Carretera Dulces Nombres–Pesquería km 4.5",
                    ][i]
                  }
                </p>
                <p>{["Critical Equipment Replacement", "Boiler pressure test", "Air compressor inspection"][i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
const floorLayers = [
  ["c3d27.svg", 272.76, 142.56, 166.486, 190.27],
  ["e48bc.svg", 274.24, 190.49, 163.513, 140.85],
  ["556ec.svg", 150.86, 216.88, 166.486, 190.27],
  ["bab93.svg", 152.35, 264.81, 163.513, 140.85],
  ["c3d27.svg", 26, 288.23, 166.486, 190.27],
  ["e48bc.svg", 27.49, 336.17, 163.513, 140.85],
  ["57c50.svg", 400.59, 216.88, 166.486, 190.27],
  ["e48bc.svg", 402.08, 264.81, 163.513, 140.85],
  ["c3d27.svg", 504.65, 276.34, 166.486, 190.27],
  ["e48bc.svg", 506.14, 324.27, 163.513, 140.85],
  ["89a72.svg", 275.73, 288.23, 269.474, 249.73],
  ["0bc4d.svg", 277.22, 336.17, 267.568, 200.927],
  ["89a72.svg", 150.86, 359.58, 269.474, 249.73],
  ["0bc4d.svg", 152.35, 407.52, 267.568, 200.927],
  ["b66dd.svg", 379.78, 347.69, 416.216, 332.973],
  ["e7302.svg", 381.89, 395.62, 412.624, 284.675],
] as const;
function Manufacturing() {
  return (
    <div className={styles.factory}>
      <header>
        <small>Pesquería IV / Production</small>
        <h3>
          Floor Plan{" "}
          <span className={styles.live}>
            <PreviewTag tone="green">Live</PreviewTag>
          </span>
        </h3>
        <div className={styles.tags}>
          <PreviewTag tone="green">6 running</PreviewTag>
          <PreviewTag>2 idle</PreviewTag>
          <PreviewTag>1 needs attention</PreviewTag>
        </div>
      </header>
      <div className={styles.floor}>
        {floorLayers.map(([file, x, y, w, h], i) => (
          <div key={i} style={{ left: x, top: y, width: w, height: h }}>
            <Asset file={file} />
          </div>
        ))}
        {[
          ["CNC-RTR-03", 83, 48],
          ["CNC-RTR-02", 83, 48],
          ["CNC-RTR-01", 83, 48],
          ["QA-01", 83, 48],
          ["QA-02", 83, 48],
          ["ASMBLY-02", 134, 78],
          ["ASMBLY-01", 134, 78],
          ["PCK-01", 208, 119],
        ].map(([name, cx, cy], i) => (
          <div
            className={styles.floorAnnotation}
            key={name}
            style={{ left: floorLayers[i * 2][1] + Number(cx), top: floorLayers[i * 2][2] + Number(cy) }}
          >
            <div className={styles.floorLabel}>
              <i style={{ background: i === 0 ? "#ff2347" : i === 6 ? "#666" : "#00bc7d" }} />
              <span>{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const scenes = [Retail, Logistics, FieldOperations, Manufacturing];
export function OperativeModels() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px 0px" });
  const entered = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  const id = useId();
  const Scene = scenes[active];
  const transition = { duration: reduced ? 0 : 0.55, ease: motionEase };
  return (
    <div ref={ref} className={styles.models} data-active={active} data-running={visible && !reduced}>
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Operative models">
          {models.map((model, i) => (
            <button
              key={model.name}
              type="button"
              role="tab"
              id={id + "-tab-" + i}
              aria-selected={active === i}
              aria-controls={id + "-panel"}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                let next = i;
                if (event.key === "ArrowRight") next = (i + 1) % 4;
                else if (event.key === "ArrowLeft") next = (i + 3) % 4;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = 3;
                else return;
                event.preventDefault();
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
              <span>{model.name}</span>
            </button>
          ))}
        </div>
        <a className={styles.more} href="/offering">
          More operating models
        </a>
      </div>
      <div id={id + "-panel"} role="tabpanel" aria-labelledby={id + "-tab-" + active} tabIndex={0}>
        <div
          className={styles.stage}
          style={{
            backgroundImage: `url("${backgroundPlaceholders[models[active].background as keyof typeof backgroundPlaceholders]}")`,
          }}
        >
          <AnimatePresence initial={false}>
            {models.map(
              (model, i) =>
                active === i && (
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
                ),
            )}
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
              <motion.div
                className={styles.detail}
                variants={{
                  hidden: { opacity: 0, y: reduced ? 0 : 32 },
                  show: { opacity: 1, y: 0, transition },
                  exit: { opacity: 0, y: reduced ? 0 : -14, transition: { duration: reduced ? 0 : 0.18 } },
                }}
              >
                <Detail model={active} />
              </motion.div>
              <motion.div
                className={styles.scene}
                variants={{
                  hidden: { opacity: 0, y: reduced ? 0 : 42 },
                  show: { opacity: 1, y: 0, transition },
                  exit: { opacity: 0, y: reduced ? 0 : -20, transition: { duration: reduced ? 0 : 0.2 } },
                }}
              >
                <Scene />
              </motion.div>
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
              {models[active].points.map(([title, text]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
