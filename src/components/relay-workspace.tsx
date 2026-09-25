"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChartBar, HouseLine, Tray, Truck } from "@phosphor-icons/react";
import { WorkspaceSidebar, WorkspaceTopbar } from "./workspace-shell";
import styles from "./relay-workspace.module.css";

type DeliveryRequest = {
  id: string;
  age: string;
  origin: string;
  destination: string;
  payout: string;
  duration: string;
  distance: string;
  courier?: { initials: string; name: string; color: string };
  status: "Unassigned" | "Assigned" | "In transit" | "Delivered";
  pin: { x: number; y: number };
};

const requests: DeliveryRequest[] = [
  {
    id: "RL2048",
    age: "7m",
    origin: "Nueva York 231, Int. A902, Nápoles, Benito Juárez, Ciudad de México.",
    destination: "Zamora 199, Int. 401, Condesa, Cuauhtémoc, Ciudad de México.",
    payout: "$19.02",
    duration: "13 min",
    distance: "4.6 km",
    status: "Unassigned",
    pin: { x: 36, y: 44 },
  },
  {
    id: "RL2047",
    age: "7m",
    origin: "Montecito 301, Int. 2, Nápoles, Benito Juárez, Ciudad de México.",
    destination: "Av. Niños Heroes de Chapultepec 1132, Niños Heroes de Chapultepec.",
    payout: "$42.01",
    duration: "27 min",
    distance: "6.1 km",
    status: "Unassigned",
    pin: { x: 57, y: 30 },
  },
  {
    id: "RL2046",
    age: "7m",
    origin: "San Francisco 16, Int 901. Del Valle Sur. Benito Juárez. Ciudad de México",
    destination: "Durango 3, Int. 8. Condesa, Cuauhtémoc. Ciudad de México",
    payout: "$11.50",
    duration: "8 min",
    distance: "2.5 km",
    courier: { initials: "MP", name: "Mario Pérez", color: "#31966e" },
    status: "Assigned",
    pin: { x: 66, y: 56 },
  },
  {
    id: "RL2045",
    age: "7m",
    origin: "Milwaukee 5011, Int 2. Nápoles. Benito Juárez. Ciudad de México",
    destination: "Porfirio Diaz 23 Int. 102. Del Valle Sur. Benito Juárez. Ciudad de México",
    payout: "$12.04",
    duration: "8 min",
    distance: "2.5 km",
    courier: { initials: "GG", name: "Guadalupe Gómez", color: "#8d3d9f" },
    status: "In transit",
    pin: { x: 31, y: 71 },
  },
  {
    id: "RL2044",
    age: "7m",
    origin: "Sindicalismo 942, Escandón I Sección, Miguel Hidalgo, Ciudad de México.",
    destination: "Av. Sonora 111, Int. 801, Condesa, Cuauhtémoc, Ciudad de México.",
    payout: "$17.50",
    duration: "11 min",
    distance: "3.1 km",
    courier: { initials: "RA", name: "Ramón Ayala", color: "#ff542e" },
    status: "In transit",
    pin: { x: 53, y: 5 },
  },
  {
    id: "RL2043",
    age: "7m",
    origin: "Correggio 1024, Ciudad de los Deportes. Benito Juárez, Ciudad de México.",
    destination: "Av. Sonora 111, Int. 801, Condesa, Cuauhtémoc, Ciudad de México.",
    payout: "$25.04",
    duration: "18 min",
    distance: "5.4 km",
    courier: { initials: "MC", name: "Marilyn Cote", color: "#ef6dcc" },
    status: "Delivered",
    pin: { x: 14, y: 86 },
  },
  {
    id: "RL2042",
    age: "7m",
    origin: "Providencia 404, Del Valle. Benito Juárez, Ciudad de México.",
    destination: "Aragón 199, Álamos, Benito Juárez, Ciudad de México.",
    payout: "$21.04",
    duration: "15 min",
    distance: "5.1 km",
    courier: { initials: "AV", name: "Alexis Vega", color: "#6370d8" },
    status: "Delivered",
    pin: { x: 82, y: 42 },
  },
];

const relayNavigation = [
  { item: { label: "Home", icon: <HouseLine /> } },
  { item: { label: "Inbox", icon: <Tray />, count: "8" } },
  { heading: "Favorites" },
  { item: { label: "Dispatch Overview", dot: "#0da5df", count: "12" } },
  { item: { label: "Couriers", dot: "#a749f5" } },
  { item: { label: "Merchants", dot: "#f1ad00" } },
  { item: { label: "Zones", dot: "#12bb86" } },
  { heading: "Work" },
  { item: { label: "Bills", dot: "#ef3e9a" } },
  { item: { label: "RRHH", dot: "#ff3d4a" } },
  { item: { label: "Monthly Report", dot: "#ff650f" } },
  { item: { label: "Quarterly Report", dot: "#6370f2" } },
];

const statusClass: Record<DeliveryRequest["status"], string> = {
  Unassigned: styles.unassigned,
  Assigned: styles.assigned,
  "In transit": styles.transit,
  Delivered: styles.delivered,
};

function Route({ request, detail = false }: { request: DeliveryRequest; detail?: boolean }) {
  return (
    <div className={styles.route}>
      <Image
        src={`/assets/figma/relay/${detail && request.status !== "Unassigned" ? "complete" : "pending"}.svg`}
        width={16}
        height={16}
        alt=""
      />
      <span title={request.origin}>{request.origin}</span>
      <Image className={styles.routeConnector} src="/assets/figma/relay/connector.svg" width={16} height={8} alt="" />
      <Image src="/assets/figma/relay/pending.svg" width={16} height={16} alt="" />
      <span title={request.destination}>{request.destination}</span>
    </div>
  );
}

function RequestCard({ request }: { request: DeliveryRequest }) {
  return (
    <div className={styles.mapCard}>
      <div className={styles.cardSummary}>
        <div className={styles.cardTitle}>
          <strong>{request.id}</strong>
          <span>{request.age}</span>
        </div>
        <Route request={request} detail />
        <dl>
          <div>
            <dt>Payout</dt>
            <dd>{request.payout}</dd>
          </div>
          <div>
            <dt>Distance</dt>
            <dd>{request.distance}</dd>
          </div>
          <div>
            <dt>Expected time</dt>
            <dd>{request.duration}</dd>
          </div>
        </dl>
      </div>
      <div className={styles.cardTimeline}>
        {[
          { label: "Request created at 8:23 AM.", state: "complete" },
          {
            label: request.status === "Unassigned" ? "Awaiting assignment" : "Assigned. 8:24 AM.",
            state: request.status === "Unassigned" ? "pending" : "complete",
          },
          {
            label: "Courier arrived at origin. 8:32 AM.",
            state: ["In transit", "Delivered"].includes(request.status) ? "complete" : "pending",
          },
          {
            label: request.status === "Delivered" ? "Delivered" : "In transit",
            state:
              request.status === "Delivered" ? "complete" : request.status === "In transit" ? "transit" : "pending",
          },
          { label: "Estimated Arrival at 8:44 AM.", state: "pending" },
        ].map((event) => (
          <p key={event.label}>
            <Image src={`/assets/figma/relay/${event.state}.svg`} width={16} height={16} alt="" />
            <span>{event.label}</span>
          </p>
        ))}
        <div className={styles.cardActions}>
          <button type="button">Contact Courier</button>
          <button type="button">Edit</button>
        </div>
      </div>
    </div>
  );
}

export function RelayWorkspace() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = requests.find((request) => request.id === activeId);

  return (
    <div className={styles.app} aria-label="Relay delivery operations workspace">
      <WorkspaceSidebar
        active="Dispatch Overview"
        entries={relayNavigation}
        organization="Relay"
        organizationSubtitle="Work"
        businessLogo="/assets/figma/logos/Logo-Relay.png"
        userAvatar="/assets/figma/photos/User-Emma.png"
        onNavigate={() => undefined}
      />
      <div className={styles.workspace}>
        <WorkspaceTopbar
          title="Dispatch Overview"
          icon={<Truck size={15} />}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
          onMessage={() => undefined}
        />
        <div className={styles.deliveryView}>
          <section className={styles.requests} aria-label="Delivery requests" onMouseLeave={() => setActiveId(null)}>
            <div className={styles.requestTools}>
              <div>
                <button type="button">
                  Recent <ChartBar size={13} />
                </button>
                <button type="button">
                  All <b>12</b> <span aria-hidden="true">⌄</span>
                </button>
              </div>
              <button type="button" className={styles.newButton}>
                New
              </button>
            </div>
            <div className={styles.requestList}>
              {requests.map((request) => (
                <button
                  type="button"
                  key={request.id}
                  className={`${styles.requestRow} ${active?.id === request.id ? styles.activeRow : ""}`}
                  aria-pressed={active?.id === request.id}
                  onMouseEnter={() => setActiveId(request.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  <span className={styles.rowTitle}>
                    <strong>{request.id}</strong>
                    <time>{request.age}</time>
                  </span>
                  <Route request={request} />
                  <span className={styles.metaTags}>
                    <span>{request.payout}</span>
                    <span>{request.duration}</span>
                    <span>{request.distance}</span>
                    {request.courier ? (
                      <span className={styles.courier}>
                        <i style={{ background: request.courier.color }}>{request.courier.initials}</i>
                        {request.courier.name}
                      </span>
                    ) : null}
                    <span className={statusClass[request.status]}>{request.status}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section className={styles.map} aria-label="Delivery request map">
            <Image
              src="/assets/figma/relay-map.png"
              alt="Map of delivery requests in Mexico City"
              fill
              sizes="(max-width: 720px) 660px, 66vw"
            />
            {requests.map((request) => (
              <span
                key={request.id}
                className={`${styles.pin} ${active?.id === request.id ? styles.activePin : ""}`}
                style={{ left: `${request.pin.x}%`, top: `${request.pin.y}%` }}
                aria-label={request.id}
              >
                <i />
                {request.id}
              </span>
            ))}
            <AnimatePresence mode="wait" initial={false}>
              {active && (
                <motion.div
                  key={active.id}
                  className={styles.cardAnchor}
                  style={{ "--card-x": `${active.pin.x}%`, "--card-y": `${active.pin.y}%` } as CSSProperties}
                  initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 5, scale: 0.99 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 0.86, 0.24, 1] }}
                >
                  <RequestCard request={active} />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
