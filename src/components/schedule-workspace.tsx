"use client";

import { useMemo, useState } from "react";
import { CalendarDots, CaretLeft, CaretRight, Check, MagnifyingGlass } from "@phosphor-icons/react";
import { WorkspaceSidebar, WorkspaceTopbar } from "./workspace-shell";
import styles from "./schedule-workspace.module.css";

const operators = [
  ["ER", "Edgardo Ramírez", "#a742da"],
  ["CT", "Carlos Treviño", "#2f8dfb"],
  ["MC", "Mariana Cruz", "#f69dcc"],
  ["LH", "Luis Manuel Hernández", "#fb2c36"],
  ["AG", "Ana Garza", "#00b8d9"],
  ["RV", "Ramón Valdéz", "#00b5a6"],
  ["MB", "Malinali Becerril", "#f5b900"],
  ["YG", "Yoalli Garibay", "#5a69e8"],
  ["GR", "Gonzalo Robles", "#f08800"],
  ["MG", "Manuel García", "#f59e0b"],
  ["AM", "Alberto Martínez", "#a742da"],
  ["MM", "Miguel Marín", "#00a98f"],
  ["JO", "José Otazú", "#fb2c36"],
] as const;

const jobs = [
  {
    col: 0,
    start: 1,
    span: 7,
    code: "WO-1063",
    status: "Confirmed",
    tone: "purple",
    address: "Libramiento Noreste km 33, Parque Industrial Escobedo, NL",
    task: "Critical Equipment Repair",
  },
  {
    col: 1,
    start: 6,
    span: 5,
    code: "WO-1051",
    status: "Confirmed",
    tone: "blue",
    address: "Blvd. Aeropuerto 1001, Parque Industrial Milenium, Apodaca, NL",
    task: "Boiler pressure test",
  },
  {
    col: 1,
    start: 11,
    span: 5,
    code: "WO-1054",
    status: "Confirmed",
    tone: "blue",
    address: "Av. Miguel Alemán 1200, Parque Industrial Stiva, Apodaca, NL",
    task: "Electrical panel inspection",
  },
  {
    col: 2,
    start: 7,
    span: 4,
    code: "WO-1042",
    status: "Confirmed",
    tone: "pink",
    address: "Carretera Dulces Nombres–Pesquería km 4.5, Pesquería, NL",
    task: "Air compressor inspection",
  },
  {
    col: 2,
    start: 11,
    span: 4,
    code: "WO-1045",
    status: "Confirmed",
    tone: "pink",
    address: "Carretera Dulces Nombres–Pesquería km 4.5, Pesquería, NL",
    task: "Conveyor belt alignment",
  },
  {
    col: 2,
    start: 15,
    span: 4,
    code: "WO-1048",
    status: "Waiting",
    tone: "pink",
    address: "Carretera Dulces Nombres–Pesquería km 4.5, Pesquería, NL",
    task: "Centrifugal pump seal replacement",
  },
  {
    col: 3,
    start: 8,
    span: 4,
    code: "WO-1060",
    status: "Confirmed",
    tone: "red",
    address: "Carretera Monterrey–Saltillo km 9, Parque Industrial Mitras, Santa Catarina, NL",
    task: "Motor vibration analysis",
  },
  {
    col: 3,
    start: 12,
    span: 5,
    code: "WO-1060",
    status: "Waiting",
    tone: "red",
    address: "Carretera Monterrey–Saltillo km 9, Parque Industrial Mitras, Santa Catarina, NL",
    task: "Motor vibration analysis",
  },
  {
    col: 4,
    start: 9,
    span: 10,
    code: "WO-1057",
    status: "Confirmed",
    tone: "cyan",
    address: "Av. Nogalar Sur 305, Industrial Nogalar, San Nicolás, NL",
    task: "HVAC duct cleaning",
  },
] as const;

const entries = [
  { item: { label: "Home" } },
  { item: { label: "Inbox", count: "2" } },
  { heading: "Favorites" },
  { item: { label: "Requests", dot: "#12c7e8", count: "34" } },
  { item: { label: "Schedule Board", dot: "#ad46ff" } },
  { heading: "Work" },
  { item: { label: "Operators", dot: "#f5b900" } },
  { item: { label: "Cars", dot: "#2f8dfb" } },
  { item: { label: "Finance", dot: "#f69dcc" } },
  { item: { label: "Trips", dot: "#fb2c36" } },
  { item: { label: "Clients", dot: "#00b96b" } },
];

export function ScheduleWorkspace() {
  const [query, setQuery] = useState("");
  const [monthOffset, setMonthOffset] = useState(0);
  const [filter, setFilter] = useState("Operators");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const visibleOperators = useMemo(
    () => operators.filter((operator) => operator[1].toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  return (
    <div className={styles.app} aria-label="Northline Solutions schedule workspace">
      <WorkspaceSidebar
        active="Schedule Board"
        entries={entries}
        organization="Northline Solutions"
        organizationSubtitle="Work"
        businessLogo="/assets/figma/logos/Logo-Northline.png"
        onNavigate={(label) => announce(`${label} opened in this preview`)}
        onMessage={announce}
      />
      <main className={styles.main}>
        <WorkspaceTopbar
          title="Schedule Board"
          icon={<CalendarDots size={15} />}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
          onMessage={announce}
        />
        <div className={styles.schedule}>
          <aside className={styles.filters} aria-label="Schedule filters">
            <div className={styles.monthPicker}>
              <div className={styles.monthControls}>
                <button aria-label="Previous month" onClick={() => setMonthOffset((value) => value - 1)}>
                  <CaretLeft />
                </button>
                <span>{monthOffset === 0 ? "May" : monthOffset < 0 ? "April" : "June"}</span>
                <button aria-label="Next month" onClick={() => setMonthOffset((value) => value + 1)}>
                  <CaretRight />
                </button>
              </div>
              <div className={styles.weekdays}>
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <span key={`${day}-${index}`}>{day}</span>
                ))}
              </div>
              <div className={styles.days}>
                {[
                  26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                  24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6,
                ].map((day, index) => (
                  <button
                    key={`${day}-${index}`}
                    className={`${index < 5 || index > 35 ? styles.outside : ""} ${day === 18 && index === 22 ? styles.selectedDay : ""}`}
                    onClick={() => announce(`May ${day} selected`)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.segmented}>
              {["Operators", "Type", "Status"].map((label) => (
                <button
                  key={label}
                  className={filter === label ? styles.segmentActive : ""}
                  onClick={() => setFilter(label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className={styles.operatorSearch}>
              <MagnifyingGlass />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search operators" />
            </label>
            <div className={styles.operatorList}>
              {visibleOperators.map(([initials, name, color]) => (
                <button key={name} onClick={() => announce(`${name} selected`)}>
                  <i style={{ background: color }}>{initials}</i>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </aside>
          <section className={styles.board} aria-label="May 18, 2026 technician schedule">
            <header className={styles.boardTitle}>
              <strong>May 18th,</strong> 2026
            </header>
            <div className={styles.boardScroller}>
              <div className={styles.boardGrid}>
                <div className={styles.timeHeader} />
                {operators.slice(0, 5).map(([initials, name, color]) => (
                  <div className={styles.techHeader} key={name}>
                    <i style={{ background: color }}>{initials}</i>
                    <span>{name}</span>
                  </div>
                ))}
                <div className={styles.times}>
                  {Array.from({ length: 24 }, (_, hour) => (
                    <span key={hour}>{`${String(hour).padStart(2, "0")}:00`}</span>
                  ))}
                </div>
                <div className={styles.gridLines} />
                {jobs.map((job, index) => (
                  <button
                    key={`${job.code}-${index}`}
                    className={`${styles.job} ${styles[job.tone]}`}
                    style={{ "--column": job.col + 1, "--start": job.start, "--span": job.span } as React.CSSProperties}
                    onClick={() => announce(`${job.code} opened`)}
                  >
                    <span className={styles.jobMeta}>
                      <small>{job.code}</small>
                      <em className={job.status === "Waiting" ? styles.waiting : ""}>{job.status}</em>
                    </span>
                    <strong>{job.address}</strong>
                    <span>{job.task}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      {notice && (
        <div className={styles.toast} role="status">
          <Check />
          {notice}
        </div>
      )}
    </div>
  );
}
