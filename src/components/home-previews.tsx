"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { PreviewPanel, PreviewTag, PreviewAvatar, PreviewSpinner } from "./preview-ui";
import { PreviewStage } from "./preview-stage";
import styles from "./home-previews.module.css";

const assets = "/assets/figma/home-previews/";
function Asset({ file, width = 20, height = width }: { file: string; width?: number; height?: number }) {
  return <Image src={file.startsWith("/") ? file : `${assets}${file}`} width={width} height={height} alt="" />;
}
function Rise({
  entered,
  reduced,
  children,
  className,
  delay = 0,
}: {
  entered: boolean;
  reduced: boolean;
  children: ReactNode;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: entered ? 1 : 0, y: entered || reduced ? 0 : 26 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <PreviewPanel theme="dark" className={`${styles.panel} ${className}`}>
      {children}
    </PreviewPanel>
  );
}
const objects = [
  ["Operators", "128 operators", "Role", "#ad46ff"],
  ["Services", "42 services", "Type", "#ff2347"],
  ["Clients", "1,926 clients", "Email", "#f69dcc"],
  ["Invoices", "3,184 invoices", "Date", "#00b8d9"],
  ["Locations", "64 locations", "City", "#ff8904"],
  ["Payment Method", "7 methods", "Gateway", "#ff8904"],
  ["Zones", "18 zones", "City", "#00b5a6"],
  ["Payments", "12,860 payments", "Amount", "#615fff"],
];
const connectors: [string, number, number, number, number, number?][] = [
  ["8f89b.svg", 568, 67.5, 91, 1],
  ["8f89b.svg", 238, 67.5, 91, 1],
  ["8a911.svg", 772, 130, 110, 1, 90],
  ["38813.svg", 448, 130, 110, 1, 90],
  ["a80ba.svg", 118, 130, 261, 1, 90],
  ["38bcd.svg", 569.5, 69, 91.5, 240],
  ["2ddde.svg", 240, 308, 421, 152, 180],
  ["3ff56.svg", 900, 69, 92, 250],
  ["bfb08.svg", 570, 69, 91, 460],
  ["4d4f5.svg", 570, 306.5, 91, 222.5],
  ["20090.svg", 901, 318, 91.3396, 211],
];
const objectPositions = [
  [0, 0],
  [330, 0],
  [660, 0],
  [330, 240],
  [661, 240],
  [991, 240],
  [0, 390],
  [661, 463],
];

export function HomeRulesPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <PreviewStage
      mobileCanvas
      background="Cover Pink.png"
      stageRef={ref}
      entered={entered}
      label="Business logic and connected operational objects"
    >
      <Rise entered={entered} reduced={reducedMotion} className={styles.rules}>
        <Panel>
          <div className={styles.bar}>
            <span>
              <span className={styles.muted}>Orders / </span>Integrations
            </span>
            <span>···</span>
          </div>
          <div className={styles.logic}>
            <small>Business Logic Definition</small>
            <h3>Service Request and Assignation</h3>
            <div className={styles.tags}>
              <PreviewTag>v 3.2</PreviewTag>
              <PreviewTag>April 23rd. 2026</PreviewTag>
              <PreviewTag>
                <PreviewAvatar initials="JR" /> José Luis Rosas
              </PreviewTag>
            </div>
            <div className={styles.graph}>
              <div className={styles.connectors} aria-hidden="true">
                {connectors.map(([file, x, y, width, height, rotate], i) => (
                  <div
                    key={i}
                    style={{
                      left: `${x / 12.8}cqw`,
                      top: `${y / 12.8}cqw`,
                      transform: rotate ? `rotate(${rotate}deg)` : undefined,
                      transformOrigin: "top left",
                    }}
                  >
                    <Image
                      src={`${assets}${file}`}
                      width={width}
                      height={height}
                      style={{ width: `${width / 12.8}cqw`, height: "auto" }}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              {objects.map(([name, count, field, color], i) => (
                <div
                  className={styles.object}
                  key={name}
                  style={{ left: `${objectPositions[i][0] / 12.8}cqw`, top: `${objectPositions[i][1] / 12.8}cqw` }}
                >
                  <header>
                    <i style={{ background: color }} />
                    <div>
                      {name}
                      <small>{count}</small>
                    </div>
                  </header>
                  <div>
                    <small>Properties</small>
                    <PreviewTag>ID</PreviewTag>
                    <PreviewTag>
                      {i === 3 ? "Number" : i === 4 ? "Address" : i === 5 ? "Type" : i === 7 ? "Invoice" : "Name"}
                    </PreviewTag>
                    <PreviewTag>{field}</PreviewTag>
                  </div>
                  <div>
                    <small>Last record</small>
                    <PreviewTag>13s</PreviewTag>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Rise>
    </PreviewStage>
  );
}
const members = [
  ["AO", "Javier Velazquez", "javier.velazquez@acme.com", "Field Supervisor", "Active", "#ffcc00"],
  ["EC", "Emily Chen", "emily.chen@acme.com", "Warehouse Manager", "Active", "#543127"],
  ["ML", "Marcus Lee", "marcus.lee@acme.com", "Customer Success Agent", "On Leave", "#ff2347"],
  ["SR", "Sofia Ramirez", "sofia.ramirez@acme.com", "Maintenance Manager", "Active", "#00ad7c"],
  ["MR", "Mario Rosales", "sofia.ramirez@acme.com", "Maintenance Manager", "Deactivated", "#00b8d9"],
];
const deliveries = [
  [
    "RL2048",
    "Nueva York 231, Int. A902, Nápoles, Benito Juárez, Ciudad de México.",
    "Zamora 199, Int. 401, Condesa, Cuauhtémoc, Ciudad de México.",
    "$19.02",
    "13 min",
    "4.6 km",
    "Unassigned",
  ],
  [
    "RL2047",
    "Montecito 301, Int. 2, Nápoles, Benito Juárez, Ciudad de México.",
    "Av. Niños Heroes de Chapultepec 1132, Niños Heroes de Chapultepec",
    "$42.01",
    "27 min",
    "6.1 km",
    "Unassigned",
  ],
  [
    "RL2046",
    "San Francisco 16, Int 901. Del Valle Sur. Benito Juárez. Ciudad de México",
    "Durango 3, Int. 8. Condesa, Cuauhtémoc. Ciudad de México",
    "$11.50",
    "8 min",
    "2.5 km",
    "Assigned",
  ],
  [
    "RL2045",
    "Milwaukee 5011, Int 2. Nápoles. Benito Juárez. Ciudad de México",
    "Porfirio Diaz 23 Int. 102, Del Valle Sur",
    "$12.04",
    "8 min",
    "2.5 km",
    "In transit",
  ],
];
function DispatchView() {
  return (
    <div className={styles.dispatch}>
      <div>
        <div className={styles.bar}>
          <span>
            <span className={styles.muted}>Apps　›　</span>Dispatch Overview
          </span>
          <span>···</span>
        </div>
        {deliveries.map(([id, from, to, price, time, distance, status]) => (
          <div className={styles.delivery} key={id}>
            <header>
              {id}
              <span>7m</span>
            </header>
            <p>●　{from}</p>
            <p>●　{to}</p>
            <div className={styles.tags}>
              {[price, time, distance].map((t) => (
                <PreviewTag key={t}>{t}</PreviewTag>
              ))}
              <PreviewTag tone={status === "Unassigned" ? "amber" : "blue"}>{status}</PreviewTag>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.map}>
        <Image src={`${assets}19c4b.png`} fill sizes="600px" alt="Delivery locations in Mexico City" />
        {["RL2041", "RL2044", "RL2047", "RL2048", "RL2046", "RL2045"].map((id, i) => (
          <span className={styles.pin} key={id} style={{ left: `${15 + (i % 3) * 29}%`, top: `${12 + i * 12}%` }}>
            <i style={{ background: i % 2 ? "#00cbe6" : "#00c86b" }} />
            {id}
          </span>
        ))}
      </div>
    </div>
  );
}
const products = [
  ["49d2f.png", "Relaxed Fit Henley", "APP-204", "S-XXL", "28", "1"],
  ["08b30.png", "Oversized Hoodie", "APP-318", "M-XXL", "19", "4"],
  ["b3e37.png", "Slim Fit Sweatpant", "APP-441", "XS-XL", "35", "3"],
  ["dcdc3.png", "Ribbed Tank Top", "APP-783", "XS-L", "67", "1"],
  ["8cdb6.png", "Weekend Chino", "APP-552", "28-34", "51", "2"],
  ["31f24.png", "Denim Trucker Jacket", "APP-668", "S-XL", "12", "5"],
  ["a4287.png", "Linen Shirt", "APP-344", "S-XL", "15", "6"],
  ["3efcf.png", "Cotton Jogger", "APP-457", "XS-XL", "58", "2"],
];
const productCrops: Record<string, CSSProperties> = {
  "49d2f.png": { height: "149.89%", top: "-33.69%", objectFit: "fill" },
  "b3e37.png": { height: "119.3%", top: "8.93%", objectFit: "fill" },
  "8cdb6.png": { height: "112.49%", width: "80.35%", left: "9.95%", top: "-10.34%", objectFit: "fill" },
  "a4287.png": { height: "133.33%", top: "-29.08%", objectFit: "fill" },
};
function InventoryView() {
  return (
    <>
      <div className={styles.stats}>
        {[
          ["Total Products", "1,248", "+4.2%"],
          ["Total Revenue", "$83,920.12", "+12.5%"],
          ["Total Orders", "142", "-1.4%"],
          ["Customers", "3,420", "+2.1%"],
        ].map(([name, value, change]) => (
          <div key={name}>
            <small>{name}</small>
            <strong>{value}</strong>
            <div className={styles.tags}>
              <PreviewTag>Last 7d</PreviewTag>
              <PreviewTag tone={change.startsWith("-") ? "amber" : "green"}>{change}</PreviewTag>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.products}>
        {products.map(([file, name, sku, size, units, days]) => (
          <article key={sku}>
            <div className={styles.productImage}>
              <Image
                src={`${assets}${file}`}
                width={220}
                height={220}
                sizes="220px"
                style={{ position: "absolute", width: "100%", height: "100%", ...productCrops[file] }}
                alt={name}
              />
            </div>
            <div>
              <p>{name}</p>
              <small>
                SKU: {sku} {size}
              </small>
              <div className={styles.tags}>
                <PreviewTag>{units} units</PreviewTag>
                <PreviewTag tone="amber">
                  Restock {days} day{days === "1" ? "" : "s"}
                </PreviewTag>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
const companies = [
  "Aliada",
  "Homely",
  "DEV.F",
  "CareMe",
  "Walmart",
  "IKEA",
  "Acme Industries",
  "Superspace",
  "Uber",
  "Northline Solutions",
  "OpenAI",
];
const companyLogos = [
  "cf221.png",
  "95c4c.png",
  "38b82.png",
  "6fc6e.png",
  "6bc86.png",
  "fe76a.png",
  "67e82.png",
  "5242e.png",
  "9758d.png",
  "471d6.png",
  "25d78.png",
];
function CustomersView() {
  return (
    <div className={styles.customers}>
      <aside>
        <h4>Customer Success</h4>
        <PreviewTag>38 team members</PreviewTag>
        {companies.map((name, i) => (
          <div className={styles.company} key={name}>
            <Asset file={companyLogos[i]} width={32} />
            <div>
              {name}
              <div className={styles.tags}>
                <PreviewTag>{i < 4 ? "Startup" : "Enterprise"}</PreviewTag>
                <PreviewTag tone="green">Active</PreviewTag>
              </div>
            </div>
          </div>
        ))}
      </aside>
      <div className={styles.requests}>
        <header>
          <Asset file="67e82.png" width={32} />
          <h4>Acme Industries</h4>
          <PreviewTag>Enterprise</PreviewTag>
          <PreviewTag>Active since 2024</PreviewTag>
          <PreviewTag tone="blue">VIP</PreviewTag>
        </header>
        <h4>Requests　⌄</h4>
        <table>
          <thead>
            <tr>
              {["Request ID", "Date", "Type", "Location", "Contact"].map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              "Supplies",
              "Maintenance",
              "Technology",
              "Marketing",
              "Human Resources",
              "Finance",
              "Logistics",
              "Customer Support",
            ].map((type, i) => (
              <tr key={type}>
                <td>ACI-RQ-{1023 + i}</td>
                <td>Sep {22 + i}, 2026</td>
                <td>
                  <PreviewTag tone="green">{type}</PreviewTag>
                </td>
                <td>
                  <PreviewTag>
                    {["Roma Norte", "Condesa", "Polanco", "Coyoacán", "Juárez", "Santa Fe", "Roma Sur", "Narvarte"][i]}
                  </PreviewTag>
                </td>
                <td>
                  {
                    [
                      "Mauricio Angulo",
                      "Lilia Marquez",
                      "Carlos Herrera",
                      "Sofia Ramirez",
                      "Juan Pérez",
                      "Elena Castillo",
                      "Diego Luna",
                      "Valeria Mendoza",
                    ][i]
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const operators = [
  ["ER", "Edgardo Ramírez", "#ad46ff"],
  ["CT", "Carlos Treviño", "#2f8dfb"],
  ["MC", "Mariana Cruz", "#f69dcc"],
  ["LH", "Luis Manuel Hernández", "#ff2347"],
  ["AG", "Ana Garza", "#00b8d9"],
];
const jobs = [
  [
    "WO-1063",
    "Libramiento Noreste km 33, Parque Industrial Escobedo, General Escobedo, NL",
    "Critical Equipment Replacement",
  ],
  ["WO-1051", "Blvd. Aeropuerto 1001, Parque Industrial Milenium, Apodaca, NL", "Boiler pressure test"],
  ["WO-1042", "Carretera Dulces Nombres–Pesquería km 4.5, Pesquería, NL", "Air compressor inspection"],
  [
    "WO-1060",
    "Carretera Monterrey–Saltillo km 9, Parque Industrial Mitras, Santa Catarina, NL",
    "Motor vibration analysis",
  ],
  ["WO-1057", "Av. Nogalar Sur 305, Industrial Nogalar, San Nicolás, NL", "HVAC duct cleaning"],
];
function CalendarView() {
  return (
    <div className={styles.calendar}>
      <header>
        <b>May 18th,</b> 2026
      </header>
      <div className={styles.calendarGrid}>
        <div className={styles.hours}>
          <div />
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i}>{i}:00</span>
          ))}
        </div>
        {operators.map(([initials, name, color], i) => (
          <div className={styles.operator} key={name}>
            <header>
              <PreviewAvatar initials={initials} color={color} />
              {name}
            </header>
            <article
              style={{
                top: `${34 + [0, 175, 245, 280, 350][i]}px`,
                height: `${[315, 175, 140, 140, 175][i]}px`,
                borderColor: color,
              }}
            >
              <div className={styles.tags}>
                <small>{jobs[i][0]}</small>
                <PreviewTag tone="blue">Confirmed</PreviewTag>
              </div>
              <p>{jobs[i][1]}</p>
              <span className={styles.muted}>{jobs[i][2]}</span>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
export function HomeRolesPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const visible = useInView(ref, { amount: 0.15 });
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!visible || reducedMotion) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % 4), 4500);
    return () => window.clearInterval(timer);
  }, [visible, reducedMotion, active]);
  return (
    <PreviewStage
      mobileCanvas
      background="Cover Ghost.png"
      stageRef={ref}
      entered={entered}
      label="Team roles and their application views"
    >
      <Rise entered={entered} reduced={reducedMotion} className={styles.roleScreen}>
        <Panel>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reducedMotion ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className={styles.roleContent}
            >
              {active === 0 ? (
                <DispatchView />
              ) : active === 1 ? (
                <InventoryView />
              ) : active === 2 ? (
                <CustomersView />
              ) : (
                <CalendarView />
              )}
            </motion.div>
          </AnimatePresence>
        </Panel>
      </Rise>
      <Rise entered={entered} reduced={reducedMotion} className={styles.members}>
        <Panel className={styles.memberPanel}>
          <h4>Team and Roles</h4>
          <PreviewTag>38 team members</PreviewTag>
          <div className={styles.memberList}>
            {members.map(([initials, name, email, role, status, color], i) => (
              <button
                key={name}
                type="button"
                disabled={i === 4}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={styles.member}
              >
                <PreviewAvatar initials={initials} color={color} />
                <div>
                  {name}
                  <small>{email}</small>
                  <div className={styles.tags}>
                    <PreviewTag>{role}</PreviewTag>
                    <PreviewTag tone={i === 4 ? "amber" : "green"}>{status}</PreviewTag>
                  </div>
                </div>
                <span>›</span>
              </button>
            ))}
          </div>
        </Panel>
      </Rise>
    </PreviewStage>
  );
}
const leadCards = [
  {
    brand: "greenschool.com",
    logo: "e27f7.svg",
    title: "New lead Incoming",
    subtitle: "A new person registered in the company’s website form",
    fields: [
      ["Age", "21"],
      ["Sex", "Male"],
      ["Country", "Mexico"],
      ["City", "Mexico City"],
    ],
    heading: "Interested in...",
    items: ["Intro to ML.", "Harness and AI.", "AI integrations"],
    foot: "Comments",
    note: "Mi nombre es Camilo y estoy interesado en aprender sobre Inteligencia Artificial y como puedo implementarlo en mi día a día o encontrar oportunidades una vez que salga de la universidad.",
  },
  {
    brand: "Superspace",
    logo: "5242e.png",
    title: "Lead evaluated",
    subtitle: "Interest matched. The next step is ready.",
    fields: [
      ["Fit", "High"],
      ["Intent", "Learn"],
      ["Region", "MX"],
      ["Route", "Admissions"],
    ],
    heading: "Decisions made",
    items: [
      "Match interests to the AI fundamentals course",
      "Route to the Mexico admissions team",
      "Create a contact and assign a follow-up",
    ],
    foot: "Why this route?",
    note: "Camilo wants practical AI skills before graduating. Match him with an introductory course and connect him with a local advisor.",
  },
  {
    brand: "Salesforce",
    logo: "/assets/figma/logos/Logo-Salesforce.png",
    title: "Ready for admissions",
    subtitle: "A qualified contact, with a clear next step.",
    fields: [
      ["Stage", "New"],
      ["Owner", "Sofía"],
      ["Pipeline", "Courses"],
      ["Sync", "Done"],
    ],
    heading: "Completed in your CRM",
    items: [
      "Contact created with interests and context",
      "Assigned to Sofía in admissions",
      "Follow-up scheduled for tomorrow",
    ],
    foot: "Next step",
    note: "Sofía will reach out with course details. The original form, qualification and recommended course are attached to Camilo’s contact.",
  },
];
export function HomeToolsPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <PreviewStage
      mobileCanvas
      background="Cover Sage.png"
      stageRef={ref}
      entered={entered}
      label="A website lead evaluated in Superspace and synced to Salesforce"
    >
      {leadCards.map((card, i) => (
        <Rise
          key={card.brand}
          entered={entered}
          reduced={reducedMotion}
          delay={i * 0.1}
          className={`${styles.lead} ${styles[`lead${i}`]}`}
        >
          <Panel>
            <div className={styles.leadBody}>
              <header>
                <Asset file={card.logo} width={40} />
                <b>{card.brand}</b>
              </header>
              <div>
                <h4>{card.title}</h4>
                <small>{card.subtitle}</small>
              </div>
              <div className={styles.identity}>
                <PreviewAvatar initials="AO" color="#ff2347" />
                <div>
                  Juan Camilo Marcial<small>juan.c.m@mail.com</small>
                </div>
              </div>
              <div className={styles.fields}>
                {card.fields.map(([label, value]) => (
                  <div key={label}>
                    <small>{label}</small>
                    <PreviewTag>{value}</PreviewTag>
                  </div>
                ))}
              </div>
              <div>
                <small>{card.heading}</small>
                {card.items.map((item) => (
                  <p className={styles.decision} key={item}>
                    <Asset file="d24db.svg" />
                    {item}
                  </p>
                ))}
              </div>
              <div>
                <small>{card.foot}</small>
                <p>{card.note}</p>
              </div>
            </div>
          </Panel>
        </Rise>
      ))}
    </PreviewStage>
  );
}
const agents = [
  {
    name: "Intake agent",
    id: "AGT 003",
    icon: "e0afc.svg",
    responsibility: "Validate incoming requests and prepare them for assignment.",
    permissions: [
      "Read incoming delivery requests",
      "Validate addresses and service zones",
      "Send ready requests to dispatch",
      "Invalid addresses need review",
    ],
    tasks: [
      "Request received · API",
      "Pickup address verified",
      "Drop-off in service zone",
      "Required details complete",
      "Delivery #1042 created",
      "Sent to Dispatch agent",
      "Validate incoming request",
      "Check customer details",
      "Verify delivery window",
      "Prepare assignment context",
    ],
  },
  {
    name: "Dispatch agent",
    id: "AGT 004",
    icon: "317d9.svg",
    responsibility: "Assign incoming deliveries and send routes to available riders.",
    permissions: [
      "Read requests and rider availability",
      "Assign riders and send routes",
      "Notify the operations team",
      "Price changes require approval",
    ],
    tasks: [
      "Received from Intake",
      "Checked 8 available riders",
      "Diego selected · 4 min away",
      "Assignment saved · #1042",
      "Route sent to rider",
      "Operations team notified",
      "Check nearby riders",
      "Calculate pickup route",
      "Confirm rider availability",
      "Prepare next assignment",
    ],
  },
  {
    name: "Follow-up agent",
    id: "AGT 005",
    icon: "aa68f.svg",
    responsibility: "Keep customers informed and flag deliveries that need attention.",
    permissions: [
      "Read assignments and delivery status",
      "Send customer status updates",
      "Escalate delays to operations",
      "Refunds require approval",
    ],
    tasks: [
      "Received from Dispatch",
      "Rider assignment confirmed",
      "Arrival estimate · 4 min",
      "Customer update sent",
      "Delivery status checked",
      "Follow-up scheduled",
      "Check delivery progress",
      "Prepare arrival notification",
      "Review delivery exceptions",
      "Send customer update",
    ],
  },
];
type Run = { id: number; text: string; loading: boolean };
function AgentRuns({
  tasks,
  active,
  reduced,
  offset,
}: {
  tasks: string[];
  active: boolean;
  reduced: boolean;
  offset: number;
}) {
  const [runs, setRuns] = useState<Run[]>(() =>
    tasks.slice(0, 6).map((text, i) => ({ id: i - 6, text, loading: false })),
  );
  const sequence = useRef(0);
  const pendingId = runs.find((run) => run.loading)?.id;
  useEffect(() => {
    if (pendingId === undefined) return;
    const timer = window.setTimeout(
      () => setRuns((previous) => previous.map((run) => (run.id === pendingId ? { ...run, loading: false } : run))),
      2400,
    );
    return () => window.clearTimeout(timer);
  }, [pendingId]);
  useEffect(() => {
    if (!active || reduced) return;
    const add = () => {
      const id = ++sequence.current;
      setRuns((previous) => [{ id, text: tasks[(5 + id) % tasks.length], loading: true }, ...previous].slice(0, 7));
    };
    let interval: number | undefined;
    const start = window.setTimeout(
      () => {
        add();
        interval = window.setInterval(add, 4200);
      },
      1200 + offset * 900,
    );
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [active, reduced, offset, tasks]);
  return (
    <div className={styles.runs} aria-label="Recent agent activity">
      <AnimatePresence initial={false}>
        {runs.map((run) => (
          <motion.div
            layout="position"
            key={run.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
            className={styles.run}
            data-loading={run.loading}
          >
            {run.loading ? <PreviewSpinner /> : <Asset file="eeba6.svg" />}
            <span className={styles.timestamp}>
              14:{32 + Math.floor((run.id + 60) / 60)}:{String((run.id + 60 + offset * 5) % 60).padStart(2, "0")}
            </span>
            <span>{run.text}</span>
            <span className={styles.srOnly}>{run.loading ? "Running" : "Completed"}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
export function HomeAgentsPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const visible = useInView(ref, { amount: 0.15 });
  return (
    <PreviewStage
      mobileCanvas
      background="Cover Cotton Candy.png"
      stageRef={ref}
      entered={entered}
      label="Intake, dispatch and follow-up agents processing deliveries"
    >
      <div className={styles.agents}>
        {agents.map((agent, i) => (
          <Rise entered={entered} reduced={reducedMotion} delay={i * 0.1} className={styles.agent} key={agent.id}>
            <Panel>
              <div className={styles.agentBody}>
                <header>
                  <Asset file={agent.icon} width={32} />
                  <div>
                    {agent.name}
                    <div className={styles.tags}>
                      <PreviewTag>{agent.id}</PreviewTag>
                      <PreviewTag>Operations</PreviewTag>
                      <PreviewTag tone="green">Active</PreviewTag>
                    </div>
                  </div>
                </header>
                <div>
                  <small>Assigned responsibility</small>
                  <p>{agent.responsibility}</p>
                </div>
                <div>
                  <p className={styles.muted}>Permissions &amp; limits</p>
                  {agent.permissions.map((permission, j) => (
                    <p className={styles.permission} key={permission}>
                      <Asset file={j === 3 ? "fcbdf.svg" : "eeba6.svg"} />
                      {permission}
                    </p>
                  ))}
                </div>
                <div>
                  <p className={styles.muted}>Latest run · Delivery #1042</p>
                  <AgentRuns tasks={agent.tasks} active={visible} reduced={reducedMotion} offset={i} />
                </div>
              </div>
            </Panel>
          </Rise>
        ))}
      </div>
    </PreviewStage>
  );
}
