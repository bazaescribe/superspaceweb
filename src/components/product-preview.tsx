"use client";
import { useCopy } from "@/i18n/copy";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionEase } from "@/lib/motion";
import styles from "./product-preview.module.css";

const asset = (name: string) => `/assets/figma/dark-site/${name}`;
const screens = ["Home", "Inbox", "Data"] as const;
type Screen = (typeof screens)[number];
const colors = ["#00a6f4", "#00bc7d", "#f0ac00", "#ad46ff", "#fb2c36"];
const people = [
  ["Amara Okafor", "amara.okafor", "AO", "#00c950"],
  ["Diego Marín", "diego.marin", "DM", "#00bba7"],
  ["Julián Reyes", "julian.reyes", "JR", "#ff6900"],
  ["Lena Fischer", "lena.fischer", "LF", "#615fff"],
  ["Leona Withfield", "leona.withfield", "LW", "#ad46ff"],
  ["Priya Nair", "priya.nair", "PN", "#5b4434"],
  ["Sofía Bianchi", "sofia.bianchi", "SB", "#2b7fff"],
  ["Tom Baxter", "tom.baxter", "TB", "#f8a3d0"],
  ["Kenji Tanaka", "kenji.tanaka", "KT", "#ff9900"],
  ["Maya Chen", "maya.chen", "MC", "#fb2c36"],
  ["Elias Nordström", "elias.nordstrom", "EN", "#7ccf00"],
  ["Nadia Petrov", "nadia.petrov", "NP", "#fdc700"],
  ["Ravi Kapoor", "ravi.kapoor", "RK", "#00b8db"],
];
const tasks = [
  ["Approve Payment", "Invoice #INV-2048 requires your approval before processing.", "Finance", "2m"],
  ["Assign Operator", "Service #SRV-1082 has no assigned operator.", "Operations", "1h"],
  ["Finalize budget", "Complete the budget report for Q2 to present at the meeting.", "Finance", "2h"],
  ["Review contract", "Acme Logistics contract is ready for your review.", "Legal", "3h"],
  ["Design homepage", "Create initial wireframes for the new homepage layout.", "Design", "4h"],
  ["Resolve Customer Request", "A customer escalation needs your response.", "Customer Support", "1d"],
];

function Icon({ name, size = 14 }: { name: string; size?: number }) {
  return <Image src={asset(name)} alt="" width={size} height={size} unoptimized />;
}
function Avatar({ name, color, large = false }: { name: string; color: string; large?: boolean }) {
  const localizeCopy = useCopy();
  return (
    <span className={`${styles.avatar} ${large ? styles.largeAvatar : ""}`} style={{ background: color }}>
      {localizeCopy(name)}
    </span>
  );
}
function Tag({ children, tone }: { children: ReactNode; tone?: "green" | "blue" | "yellow" }) {
  const localizeCopy = useCopy();
  return <span className={`${styles.tag} ${tone ? styles[tone] : ""}`}>{localizeCopy(children)}</span>;
}
function Panel({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const localizeCopy = useCopy();
  return (
    <div className={`${styles.enter} ${className}`} style={{ "--enter-delay": `${delay}ms` } as CSSProperties}>
      {localizeCopy(children)}
    </div>
  );
}
function Activity({ inbox = false }: { inbox?: boolean }) {
  const localizeCopy = useCopy();
  const entries = inbox
    ? [
        "Adriana Valverde released the service",
        "Adriana Valverde took the service",
        "Staffing Agent raised the Payout for the service 10%",
        "Service offered in Zona Poniente Group",
        "Service offered in Zona Norte Group",
        "Service offered in Zona Centro Group",
        "Service requested",
      ]
    : [
        "Weekly deep clean requested for Suite 402.",
        "Request routed to Downtown Commercial Ops.",
        "Assigned to Team 4B (2 cleaners, 1 supervisor).",
        "Crew checked in and began window detailing.",
      ];
  return (
    <section className={styles.activity}>
      <h3>
        {localizeCopy("Activity ")}
        <span className={styles.smallCircle}>{"⌄"}</span>
      </h3>
      <ol>
        {entries.map((text, i) => (
          <li key={text} style={{ "--enter-delay": `${240 + i * 45}ms` } as CSSProperties}>
            <span
              className={styles.activityDot}
              style={{ color: i === 0 && inbox ? colors[4] : i === 2 && inbox ? colors[2] : colors[1] }}
            />
            <span>{localizeCopy(text)}</span>
            <time>{localizeCopy(i === 0 ? "08 Oct, 07:12" : "05 Oct, 08:14")}</time>
          </li>
        ))}
      </ol>
    </section>
  );
}
function FieldList({ fields }: { fields: [string, ReactNode][] }) {
  const localizeCopy = useCopy();
  return (
    <dl className={styles.fields}>
      {fields.map(([label, value], i) => (
        <div key={label + i}>
          <dt>{localizeCopy(label)}</dt>
          <dd>{localizeCopy(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductRail({ screen, navigate }: { screen: Screen; navigate: (screen: Screen) => void }) {
  const localizeCopy = useCopy();
  return (
    <nav className={styles.rail} aria-label={localizeCopy("Product preview navigation")}>
      <div>
        <Image src={asset("cf221.png")} alt={localizeCopy("Aliada")} width={30} height={30} />
        <Icon name="26628.svg" size={36} />
        {screens.map((name, i) => (
          <button
            type="button"
            key={name}
            aria-label={localizeCopy("Show screen") + ": " + localizeCopy(name)}
            aria-pressed={screen === name}
            title={localizeCopy(name)}
            onClick={() => navigate(name)}
          >
            <Icon name={["89179.svg", "fe362.svg", "8b96a.svg"][i]} />
          </button>
        ))}
        <span className={styles.railDecoration}>
          <Icon name="7b26d.svg" />
        </span>
      </div>
      <div>
        <Icon name="d7e0c.svg" />
        <Image
          className={styles.userPhoto}
          src={asset("0320b.png")}
          alt={localizeCopy("Jane")}
          width={30}
          height={30}
        />
      </div>
    </nav>
  );
}

function HomeScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  const localizeCopy = useCopy();
  const stacks = [
    [0, 0, 0, 0, 21],
    [0, 0, 0, 0, 48],
    [0, 166, 0, 0, 27],
    [0, 92, 0, 0, 28],
    [0, 111, 40, 0, 28],
    [0, 183, 19, 0, 37],
    [0, 176, 33, 25, 12],
    [0, 125, 69, 46, 9],
    [0, 0, 230, 16, 0],
    [0, 0, 222, 15, 9],
    [0, 0, 222, 27, 0],
    [0, 0, 184, 70, 0],
  ];
  return (
    <div className={styles.home}>
      <div className={styles.dashboard}>
        <Panel>
          <h2>{localizeCopy("Good afternoon, Jane!")}</h2>
          <p className={styles.subtitle}>{localizeCopy("Here’s how your operations are looking today.")}</p>
        </Panel>
        <Panel delay={70}>
          <h3>{localizeCopy("Today")}</h3>
          <div className={styles.metrics}>
            {[
              ["848", "Total services", "white"],
              ["81%", "Current cover rate", colors[4]],
              ["90.8%", "Expected cover rate", colors[1]],
            ].map(([value, label, color]) => (
              <div key={label}>
                <strong style={{ color }}>{localizeCopy(value)}</strong>
                <span>{localizeCopy(label)}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel delay={120}>
          <ServiceProgress
            title={localizeCopy("Started services")}
            segments={[
              ["Completed 198", 198, colors[0]],
              ["In progress 187", 187, colors[1]],
            ]}
          />
        </Panel>
        <Panel delay={170}>
          <ServiceProgress
            title={localizeCopy("Not started services")}
            segments={[
              ["Assigned 302", 302, colors[2]],
              ["Unassigned 83", 83, colors[3]],
              ["Canceled 78", 78, colors[4]],
            ]}
          />
        </Panel>
        <Panel delay={220}>
          <h3>{localizeCopy("Hourly services status")}</h3>
          <div className={styles.legend}>
            {["Completed", "Started", "Assigned", "Unassigned", "Canceled"].map((label, i) => (
              <span key={label}>
                <i style={{ background: colors[i] }} />
                {localizeCopy(label)}
              </span>
            ))}
          </div>
          <div
            className={styles.chart}
            role="img"
            aria-label={localizeCopy(
              "Hourly service status from 7 AM to 6 PM, showing completed, started, assigned, unassigned and canceled services.",
            )}
          >
            {stacks.map((values, i) => {
              const v = [...values];
              if (i < 2) v[0] = 258 - v[4] - 4;
              if (i === 2) v[0] = 57;
              if (i === 3) v[0] = 134;
              if (i === 4) v[0] = 70;
              return (
                <div
                  key={i}
                  className={styles.chartColumn}
                  style={{ opacity: i > 7 ? 0.4 : 1, "--enter-delay": `${280 + i * 35}ms` } as CSSProperties}
                >
                  <div className={styles.stack}>
                    {[4, 3, 2, 1, 0].map(
                      (j) => v[j] > 0 && <span key={j} style={{ flex: v[j], background: colors[j] }} />,
                    )}
                  </div>
                  <span className={styles.hour}>{localizeCopy(i === 7 ? "NOW" : `${i + 7}:00`)}</span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel delay={360}>
          <h3>{localizeCopy("Yearly cover rate")}</h3>
          <div className={styles.legend}>
            {[">95%", ">90%", ">80%", "Less than 80%", "Today"].map((text, i) => (
              <span key={text}>
                <i style={{ background: colors[i] }} />
                {localizeCopy(text)}
              </span>
            ))}
          </div>
          <div className={styles.heatmap} aria-hidden="true">
            {localizeCopy(
              Array.from({ length: 182 }, (_, i) => (
                <span key={i} style={{ background: i < 80 ? colors[(i * 7 + (i % 3)) % 5] : undefined }} />
              )),
            )}
          </div>
        </Panel>
      </div>
      <aside className={styles.quickActions}>
        <Panel delay={120}>
          <p className={styles.smallLabel}>{localizeCopy("Quick Actions")}</p>
          <div className={styles.actionGrid}>
            {[
              ["View unassigned services", colors[3], "a5ffe.svg", "Inbox"],
              ["New Service", "#7ccf00", "3aca5.svg", "Data"],
              ["New Aliada", "#615fff", "ead45.svg", "Data"],
              ["New Client", "#ff6900", "80925.svg", "Data"],
            ].map(([label, color, icon, destination]) => (
              <button
                type="button"
                key={label}
                style={{
                  background: color,
                  color: label === "New Service" || label === "New Client" ? "#070709" : "white",
                }}
                onClick={() => navigate(destination as Screen)}
              >
                <Icon name={icon} />
                <span>{localizeCopy(label)}</span>
              </button>
            ))}
            <div className={styles.addAction}>
              <Icon name="e8825.svg" size={18} />
            </div>
          </div>
        </Panel>
        <Panel delay={200}>
          <p className={styles.smallLabel}>{localizeCopy("Inbox")}</p>
          <div className={styles.agentList}>
            {[
              ["Assignations Agent", "The service #89123 is not being taken...", "e0afc.svg", "4m"],
              ["Leo Velazquez", "Requested for Aliada onboarding...", "LV", "57m"],
              ["Pricing Agent", "Trending growing demand of services...", "6d7f6.svg", "1h"],
              ["María del Rincón", "Request for Aliada onboarding...", "MD", "1d"],
              ["Growth Agent", "The cover rate is steady all across...", "a0182.svg", "1d"],
            ].map(([name, text, icon, time], i) => (
              <button type="button" onClick={() => navigate("Inbox")} key={name}>
                {localizeCopy(
                  icon.endsWith("svg") ? (
                    <Icon name={icon} size={30} />
                  ) : (
                    <Avatar name={icon} color={i === 1 ? "#7ccf00" : colors[3]} />
                  ),
                )}
                <span>
                  <span>{localizeCopy(name)}</span>
                  <span className={styles.subtitle}>{localizeCopy(text)}</span>
                </span>
                <time>{localizeCopy(time)}</time>
              </button>
            ))}
          </div>
        </Panel>
      </aside>
    </div>
  );
}
function ServiceProgress({ title, segments }: { title: string; segments: [string, number, string][] }) {
  const localizeCopy = useCopy();
  return (
    <div className={styles.progress}>
      <h3>
        {localizeCopy(title)}
        <span>{"385"}</span>
      </h3>
      <div>
        {segments.map(([label, value, color]) => (
          <div style={{ flex: value }} key={label}>
            <i style={{ background: color }} />
            <span>{localizeCopy(label)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InboxScreen() {
  const localizeCopy = useCopy();
  const [selected, setSelected] = useState(1);
  return (
    <div className={styles.inbox}>
      <div className={styles.inboxTabs}>
        <span>
          {localizeCopy("To Do ")}
          <Tag>{"6"}</Tag>
        </span>
        <span className={styles.muted}>{localizeCopy("Done")}</span>
      </div>
      <aside className={styles.taskList} aria-label={localizeCopy("Inbox items")}>
        {tasks.map(([title, text, tag, time], i) => (
          <button
            type="button"
            key={title}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            className={styles.enter}
            style={{ "--enter-delay": `${80 + i * 35}ms` } as CSSProperties}
          >
            <span>{localizeCopy(title)}</span>
            <time>{localizeCopy(time)}</time>
            <p>{localizeCopy(text)}</p>
            <Tag>{localizeCopy(tag)}</Tag>
            {i === 0 && <Tag tone="yellow">{localizeCopy("Urgent")}</Tag>}
          </button>
        ))}
      </aside>
      <div key={selected} className={styles.taskDetail}>
        <Panel>
          <h2>{localizeCopy(selected === 1 ? "Assign an operator" : tasks[selected][0])}</h2>
          <p className={styles.subtitle}>
            {localizeCopy(selected === 1 ? "#SRV-1082" : selected === 0 ? "#INV-2048" : tasks[selected][2])}
          </p>
        </Panel>
        <Panel delay={70}>
          <p className={styles.info}>
            {localizeCopy(
              selected === 1
                ? "This service is scheduled for tomorrow and needs an operator before it can proceed."
                : tasks[selected][1],
            )}
          </p>
        </Panel>
        <Panel delay={120}>
          <div className={styles.detailColumns}>
            <section>
              <h3>{localizeCopy("Service Details")}</h3>
              <FieldList
                fields={[
                  ["Date", <Tag key="date">{localizeCopy("May 23rd, 2027")}</Tag>],
                  ["Hour", <Tag key="hour">{localizeCopy("7:00 AM")}</Tag>],
                  ["Duration", <Tag key="duration">{localizeCopy("4h")}</Tag>],
                  [
                    "Status",
                    <Tag key="status" tone="yellow">
                      {localizeCopy("Unassigned")}
                    </Tag>,
                  ],
                  [
                    "Payout",
                    <span key="payout">
                      <Tag>{"$578"}</Tag> <Tag tone="yellow">{localizeCopy("+10% Applied")}</Tag>
                    </span>,
                  ],
                ]}
              />
            </section>
            <section>
              <h3>{localizeCopy("Client Details")}</h3>
              <FieldList
                fields={[
                  [
                    "Client",
                    <Tag key="client">
                      <Image src={asset("67e82.png")} alt="" width={16} height={16} /> {localizeCopy(" ACME Inc.")}
                    </Tag>,
                  ],
                  [
                    "Priority",
                    <Tag key="priority" tone="blue">
                      {localizeCopy("VIP")}
                    </Tag>,
                  ],
                  ["Zone", <Tag key="zone">{localizeCopy("Puebla 2043, Int 401")}</Tag>],
                  ["Zone", <Tag key="zone2">{localizeCopy("Roma Norte")}</Tag>],
                ]}
              />
            </section>
          </div>
        </Panel>
        <Panel delay={170}>
          <h3 className={styles.rowHeading}>
            {localizeCopy("Operator assigned ")}
            <span className={styles.smallCircle}>{"+"}</span>
          </h3>
          <p className={styles.empty}>{localizeCopy("No operator assigned")}</p>
        </Panel>
        <Panel delay={220}>
          <Activity inbox />
        </Panel>
      </div>
    </div>
  );
}
function DataScreen() {
  const localizeCopy = useCopy();
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");
  const person = people[selected];
  return (
    <div className={styles.data}>
      <div className={styles.dataTabs}>
        <span className={styles.selectedTab}>{localizeCopy("Customers")}</span>
        <span>
          {localizeCopy("Requests ")}
          <Tag>{"12"}</Tag>
        </span>
        <span>{localizeCopy("Invoices ")}</span>
        <span>{localizeCopy("Aliadas")}</span>
      </div>
      <div className={styles.toolbar}>
        <label>
          <Icon name="18d12.svg" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={localizeCopy("Search clients")}
            aria-label={localizeCopy("Search preview clients")}
          />
        </label>
        <span>
          {localizeCopy("Filter ")}
          <Icon name="820f7.svg" />
        </span>
        <span>
          {localizeCopy("Newest ")}
          <Icon name="1426b.svg" />
        </span>
        <div className={styles.viewControls}>
          <Icon name="7d564.svg" />
          <Icon name="61d9e.svg" />
          <Icon name="3f872.svg" />
          <span>{localizeCopy("Options ⌄")}</span>
          <span className={styles.newRecord}>{localizeCopy("NEW +")}</span>
        </div>
      </div>
      <aside className={styles.peopleList} aria-label={localizeCopy("Clients")}>
        {people.map(
          ([name, email, initials, color], i) =>
            (name.toLowerCase().includes(query.toLowerCase()) || email.includes(query.toLowerCase())) && (
              <button
                type="button"
                key={name}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={styles.enter}
                style={{ "--enter-delay": `${60 + i * 25}ms` } as CSSProperties}
              >
                <Avatar name={initials} color={color} />
                <span>
                  <span>{localizeCopy(name)}</span>
                  <span className={styles.subtitle}>
                    {localizeCopy(email)}
                    {localizeCopy("@acme.com")}
                  </span>
                </span>
                {selected === i && <Icon name="ac021.svg" />}
              </button>
            ),
        )}
        {query &&
          !people.some(
            (p) => p[0].toLowerCase().includes(query.toLowerCase()) || p[1].includes(query.toLowerCase()),
          ) && <p className={styles.subtitle}>{localizeCopy("No matching clients.")}</p>}
      </aside>
      <div className={styles.customerDetail} key={selected}>
        <Panel>
          <div className={styles.identity}>
            <Avatar name={person[2]} color={person[3]} large />
            <div>
              <h2>{localizeCopy(person[0])}</h2>
              <p className={styles.subtitle}>
                {localizeCopy(person[1])}
                {localizeCopy("@acme.com")}
              </p>
            </div>
          </div>
          <div className={styles.recordActions}>
            <span>
              <Icon name="49201.svg" /> {localizeCopy(" EDIT")}
            </span>
            <span>
              <Icon name="c9125.svg" /> {localizeCopy(" COPY URL")}
            </span>
          </div>
        </Panel>
        <Panel delay={100}>
          <h3 className={styles.rowHeading}>
            {localizeCopy("Requests ")}
            <span className={styles.smallCircle}>{"+"}</span>
          </h3>
          <table className={styles.requests}>
            <tbody>
              {[
                ["Limpieza de oficinas", "Reforma 250, piso 8", "3h", "07:00", "Assigned"],
                ["Limpieza de almacén", "Vallejo 980, nave 2", "5h", "09:00", "Unassigned"],
                ["Limpieza de cristales", "Insurgentes 1450", "2h", "11:30", "Completed"],
                ["Limpieza de sucursal", "Polanco, Horacio 320", "3h", "14:00", "Completed"],
                ["Desinfección de clínica", "Roma, Córdoba 85", "4h", "18:00", "Completed"],
              ].map(([work, address, duration, time, status]) => (
                <tr key={work}>
                  <td>{localizeCopy(work)}</td>
                  <td>{localizeCopy(address)}</td>
                  <td>{localizeCopy(duration)}</td>
                  <td>
                    <Tag>{localizeCopy(time)}</Tag>
                  </td>
                  <td>
                    <Tag tone={status === "Completed" ? "green" : status === "Assigned" ? "blue" : "yellow"}>
                      {localizeCopy(status)}
                    </Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.moreRequests}>{localizeCopy("329 more requests ↗")}</p>
        </Panel>
        <Panel delay={150}>
          <h3 className={styles.rowHeading}>
            {localizeCopy("Invoices")}
            <span className={styles.smallCircle}>{"+"}</span>
          </h3>
        </Panel>
        <Panel delay={180}>
          <h3 className={styles.rowHeading}>
            {localizeCopy("Comments ")}
            <span className={styles.smallCircle}>{"+"}</span>
          </h3>
        </Panel>
        <Panel delay={220}>
          <Activity />
        </Panel>
      </div>
      <aside className={styles.customerFields}>
        <Panel delay={160}>
          <p className={styles.smallLabel}>{localizeCopy("Customer details")}</p>
          <FieldList
            fields={[
              ["ID", <Tag key="id">{"0130239138"}</Tag>],
              [
                "Email",
                <Tag key="email">
                  {localizeCopy(person[1])}
                  {localizeCopy("@acme.com")}
                </Tag>,
              ],
              ["Phone", <Tag key="phone">{"+52 1234 2345"}</Tag>],
              [
                "Status",
                <Tag key="status" tone="green">
                  {localizeCopy("Active")}
                </Tag>,
              ],
              [
                "Priority",
                <Tag key="priority" tone="blue">
                  {localizeCopy("VIP")}
                </Tag>,
              ],
            ]}
          />
          <p className={styles.smallLabel}>{localizeCopy("Company")}</p>
          <Tag>
            <Image src={asset("67e82.png")} alt="" width={16} height={16} /> {localizeCopy(" ACME Inc.")}
          </Tag>
        </Panel>
      </aside>
    </div>
  );
}

export function ProductPreview() {
  const localizeCopy = useCopy();
  const [screen, setScreen] = useState<Screen>("Home");
  const wrapper = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1280 / 1512);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.max(entry.contentRect.width, 900) / 1512));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const navigate = (next: Screen) => {
    setScreen(next);
    if (wrapper.current) wrapper.current.scrollLeft = 0;
  };
  return (
    <div className={styles.preview}>
      <div className={styles.mobileTabs} role="group" aria-label={localizeCopy("Product screens")}>
        {screens.map((name) => (
          <button type="button" aria-pressed={screen === name} onClick={() => navigate(name)} key={name}>
            {localizeCopy(name)}
          </button>
        ))}
      </div>
      <div
        className={styles.viewport}
        ref={wrapper}
        tabIndex={0}
        role="region"
        aria-label={localizeCopy("Product preview") + ": " + localizeCopy(screen)}
      >
        <div className={styles.scaledSpace} style={{ width: 1512 * scale, height: 982 * scale }}>
          <div className={styles.canvas} style={{ transform: `scale(${scale})` }}>
            <ProductRail screen={screen} navigate={navigate} />
            {screen !== "Data" && (
              <div className={styles.topbar}>
                {localizeCopy(screen)}
                <Icon name="77887.svg" size={16} />
              </div>
            )}
            <motion.div
              key={screen}
              className={styles.screen}
              data-screen={screen}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: motionEase }}
            >
              {localizeCopy(
                screen === "Home" ? (
                  <HomeScreen navigate={navigate} />
                ) : screen === "Inbox" ? (
                  <InboxScreen />
                ) : (
                  <DataScreen />
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
