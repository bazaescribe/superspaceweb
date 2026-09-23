"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Checks as CheckCheck,
  Clock as Clock3,
  Cube as Box,
  FileText,
  House as Home,
  MapPin,
  Package,
  ShieldCheck,
  Stack as Layers,
  Users,
  FlowArrow as Workflow,
  Wrench,
} from "@phosphor-icons/react";
import { WorkspaceSidebar, WorkspaceTopbar } from "./workspace-shell";
import styles from "./solution-workspace.module.css";

export type SolutionKind = "orders" | "service" | "inventory" | "approvals";
const configurations = {
  orders: {
    company: "Forma Studio",
    industry: "Made-to-order interiors",
    view: "Production board",
    icon: <Layers size={16} />,
    title: "Designed. Built. Delivered.",
    subtitle: "Every custom piece, from brief to installation.",
    nav: ["Production board", "Collections", "Materials", "Clients"],
    summary: "18 active orders · 4 installations this week",
  },
  service: {
    company: "Aire Care",
    industry: "Field service operations",
    view: "Dispatch",
    icon: <MapPin size={16} />,
    title: "A good day in the field.",
    subtitle: "The right people, in the right place, with everything they need.",
    nav: ["Dispatch", "Service plans", "Technicians", "Customers"],
    summary: "12 visits today · 4 teams on the move",
  },
  inventory: {
    company: "Fieldwork",
    industry: "Equipment & production",
    view: "Equipment library",
    icon: <Box size={16} />,
    title: "Ready for the next production.",
    subtitle: "A connected home for every kit, booking and handoff.",
    nav: ["Equipment library", "Reservations", "Locations", "Maintenance"],
    summary: "86 assets · 3 locations · 98% ready to work",
  },
  approvals: {
    company: "Meridian",
    industry: "Multi-site hospitality",
    view: "Decision room",
    icon: <ShieldCheck size={16} />,
    title: "Move good decisions forward.",
    subtitle: "Requests, context and the right people. All in one place.",
    nav: ["Decision room", "Requests", "Policies", "Suppliers"],
    summary: "8 open requests · 3 ready for your decision",
  },
};

function Badge({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "orange" | "purple" }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
function Avatar({ children }: { children: ReactNode }) {
  return <span className={styles.avatar}>{children}</span>;
}
function Furniture({ type }: { type: "chair" | "table" | "shelf" }) {
  return (
    <div className={`${styles.productArt} ${styles[type]}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

function Orders() {
  return (
    <>
      <div className={styles.metrics}>
        <span>
          <b>18</b> In production
        </span>
        <span>
          <b>94%</b> On schedule
        </span>
        <span>
          <b>4</b> Ready to install
        </span>
        <small>
          <span className={styles.dot} /> All workshops connected
        </small>
      </div>
      <div className={styles.board}>
        {[
          {
            stage: "In fabrication",
            count: "06",
            name: "Arc dining collection",
            client: "Casa Loma · 24 pieces",
            type: "chair" as const,
            status: "On track",
            progress: 58,
            owner: "MR",
            note: "Oak finish approved",
          },
          {
            stage: "Quality check",
            count: "08",
            name: "Gather conference table",
            client: "Studio Norte · 6 pieces",
            type: "table" as const,
            status: "Review today",
            progress: 84,
            owner: "AL",
            note: "Final dimensions verified",
          },
          {
            stage: "Ready to install",
            count: "04",
            name: "Linea storage system",
            client: "Hotel Alba · 12 pieces",
            type: "shelf" as const,
            status: "Ready",
            progress: 100,
            owner: "SC",
            note: "Delivery window confirmed",
          },
        ].map((order) => (
          <section className={styles.lane} key={order.stage}>
            <div className={styles.laneTitle}>
              <span>{order.stage}</span>
              <small>{order.count}</small>
            </div>
            <article className={styles.orderCard}>
              <Furniture type={order.type} />
              <div className={styles.cardBody}>
                <Badge tone={order.progress === 84 ? "orange" : "green"}>{order.status}</Badge>
                <h4>{order.name}</h4>
                <p>{order.client}</p>
                <div className={styles.progress}>
                  <i style={{ width: `${order.progress}%` }} />
                </div>
                <div className={styles.cardMeta}>
                  <span>Completion</span>
                  <b>{order.progress}%</b>
                </div>
                <div className={styles.owner}>
                  <Avatar>{order.owner}</Avatar>
                  <span>
                    <Check size={12} /> {order.note}
                  </span>
                </div>
              </div>
            </article>
            <div className={styles.laneNote}>
              <Package size={13} />{" "}
              {order.stage === "Ready to install"
                ? "Next delivery · Fri, 09:00"
                : "Materials and specifications linked"}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function Service() {
  return (
    <div className={styles.dispatch}>
      <div className={styles.map}>
        <div className={styles.mapGrid} />
        <div className={styles.park} />
        <div className={styles.parkTwo} />
        <span className={styles.districtOne}>ROMA NORTE</span>
        <span className={styles.districtTwo}>CONDESA</span>
        <span className={styles.districtThree}>JUÁREZ</span>
        <svg className={styles.route} viewBox="0 0 470 400" fill="none" aria-hidden="true">
          <path d="M90 295 L90 190 Q90 170 115 170 L255 170 L255 85 L365 85" />
          <path d="M90 295 L255 295 L255 240 L365 240" />
        </svg>
        <div className={`${styles.pin} ${styles.pinOne}`}>1</div>
        <div className={`${styles.pin} ${styles.pinTwo}`}>2</div>
        <div className={`${styles.pin} ${styles.pinThree}`}>
          <Check size={15} />
        </div>
        <div className={styles.teamLocation}>
          <Avatar>DS</Avatar>
          <span>
            <strong>Diego’s team</strong>
            <small>Arriving in 8 min</small>
          </span>
        </div>
        <div className={styles.mapLegend}>
          <i className={styles.dot} /> Teams live <span>Updated just now</span>
        </div>
      </div>
      <div className={styles.schedule}>
        <div className={styles.scheduleTitle}>
          <h4>Today’s route</h4>
          <Badge>2 / 4 complete</Badge>
        </div>
        {[
          ["09:00", "Casa del Parque", "Seasonal maintenance", "Complete"],
          ["10:30", "Studio Oriente", "Air quality inspection", "Complete"],
          ["12:00", "Hotel Condesa", "Cooling system repair", "En route"],
          ["14:30", "Oficinas Roma", "New unit installation", "Scheduled"],
        ].map(([time, name, detail, state], i) => (
          <div className={styles.visit} key={name}>
            <time>{time}</time>
            <span className={`${styles.visitNode} ${i < 2 ? styles.done : ""}`}>
              {i < 2 ? <Check size={11} /> : i + 1}
            </span>
            <div>
              <strong>{name}</strong>
              <p>{detail}</p>
              <small>{state}</small>
            </div>
          </div>
        ))}
        <div className={styles.dispatchNote}>
          <Wrench size={18} />
          <div>
            <strong>Ready before arrival</strong>
            <p>Parts, site access and service history shared with the team.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EquipmentArt({ kind }: { kind: number }) {
  return (
    <div className={`${styles.equipmentArt} ${styles[`equipment${kind}`]}`} aria-hidden="true">
      {kind === 0 ? (
        <>
          <div className={styles.cameraBody} />
          <div className={styles.lens} />
          <div className={styles.cameraTop} />
        </>
      ) : kind === 1 ? (
        <>
          <div className={styles.lightPanel} />
          <div className={styles.lightStand} />
        </>
      ) : (
        <>
          <div className={styles.caseHandle} />
          <div className={styles.caseBody} />
          <div className={styles.caseLatch} />
        </>
      )}
    </div>
  );
}
function Inventory() {
  return (
    <>
      <div className={styles.inventorySummary}>
        <div>
          <Box size={23} />
          <span>
            <b>Equipment, accounted for.</b>
            <small>Availability across every location, in real time.</small>
          </span>
        </div>
        <div className={styles.availability}>
          <b>
            72 <small>available</small>
          </b>
          <b>
            11 <small>on location</small>
          </b>
          <b>
            3 <small>in service</small>
          </b>
        </div>
      </div>
      <div className={styles.assets}>
        {[
          ["Cinema camera kit", "CAM–024 · Sony FX6", "Available", "Main studio", "Next booking · Sep 28"],
          [
            "Daylight lighting kit",
            "LGT–012 · Aputure 600d",
            "On location",
            "Casa Barragán",
            "Returns tomorrow · 18:00",
          ],
          ["Location sound kit", "AUD–008 · Sound Devices", "Available", "Main studio", "Checked and ready to go"],
        ].map(([name, model, status, location, note], i) => (
          <article className={styles.asset} key={name}>
            <EquipmentArt kind={i} />
            <div className={styles.cardBody}>
              <Badge tone={i === 1 ? "purple" : "green"}>{status}</Badge>
              <h4>{name}</h4>
              <p>{model}</p>
              <div className={styles.assetLocation}>
                <MapPin size={13} />
                {location}
              </div>
              <div className={styles.assetNote}>
                <Clock3 size={12} />
                {note}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.reservation}>
        <span className={styles.reservationIcon}>
          <CheckCheck size={20} />
        </span>
        <div>
          <strong>Monday’s shoot is covered.</strong>
          <p>All 8 items reserved for the Atlas campaign. Pickup instructions sent to the crew.</p>
        </div>
        <ArrowUpRight size={18} />
      </div>
    </>
  );
}

function Approvals() {
  return (
    <div className={styles.approvalLayout}>
      <div className={styles.requests}>
        <div className={styles.laneTitle}>
          Your queue <small>03</small>
        </div>
        {[
          ["Terrace furniture", "Casa Centro · Procurement", "$12,480", "Ready for review"],
          ["Kitchen equipment", "Hotel Norte · Operations", "$8,250", "Budget check"],
          ["Guest experience", "All locations · Brand", "$3,600", "Awaiting context"],
        ].map(([name, detail, value, status], i) => (
          <div className={`${styles.request} ${i === 0 ? styles.requestSelected : ""}`} key={name}>
            <span className={styles.requestIcon}>
              <FileText size={18} />
            </span>
            <h4>{name}</h4>
            <p>{detail}</p>
            <div>
              <strong>{value}</strong>
              <small>{status}</small>
            </div>
          </div>
        ))}
      </div>
      <article className={styles.decision}>
        <div className={styles.decisionTop}>
          <span>PR–2084 · CAPITAL EXPENDITURE</span>
          <Badge>Within policy</Badge>
        </div>
        <h4>More room for memorable evenings.</h4>
        <p>Replace the terrace furniture at Casa Centro ahead of the autumn opening.</p>
        <div className={styles.budget}>
          <span>
            Requested amount
            <strong>
              $12,480<small>USD</small>
            </strong>
          </span>
          <div>
            <span>Location budget</span>
            <b>$32,000 available</b>
            <div className={styles.progress}>
              <i style={{ width: "39%" }} />
            </div>
            <small>39% of remaining budget</small>
          </div>
        </div>
        <div className={styles.policy}>
          <ShieldCheck size={18} />
          <span>
            <strong>Checks complete</strong>
            <small>Verified supplier · Budget available · 3 quotes attached</small>
          </span>
        </div>
        <h5>Approval path</h5>
        <div className={styles.approvalPath}>
          {[
            ["LP", "Lucía Pérez", "Requested"],
            ["DM", "David Moreno", "Budget verified"],
            ["You", "Your decision", "Up next"],
          ].map(([initials, name, status], i) => (
            <div key={name}>
              <span className={i === 2 ? styles.currentApprover : styles.approver}>
                {i < 2 ? <Check size={16} /> : initials}
              </span>
              <strong>{name}</strong>
              <small>{status}</small>
            </div>
          ))}
        </div>
        <div className={styles.decisionFooter}>
          <span>
            <FileText size={14} /> Supplier quotes · 3 files
          </span>
          <span className={styles.approveLabel}>
            Ready to approve <ArrowUpRight size={13} />
          </span>
        </div>
      </article>
    </div>
  );
}

/** Live HTML illustration; shell controls are intentionally inert inside the shot. */
export function SolutionWorkspace({ kind }: { kind: SolutionKind }) {
  const config = configurations[kind];
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1120));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const entries = [
    { item: { label: "Overview", icon: <Home /> } },
    { item: { label: "Team", icon: <Users /> } },
    { heading: "Workspace" },
    ...config.nav.map((label, index) => ({
      item: {
        label,
        icon: index === 0 ? config.icon : <Layers />,
        ...(index === 0 ? { count: kind === "approvals" ? "3" : undefined } : {}),
      },
    })),
    { heading: "Manage" },
    { item: { label: "Automations", icon: <Workflow /> } },
    { item: { label: "Documents", icon: <FileText /> } },
  ];
  return (
    <figure
      className={styles.figure}
      aria-label={`${config.company}: ${config.view}. Illustrative implementation with sample data.`}
    >
      <figcaption>
        <span>
          <i /> {config.company}
        </span>
        <span>Illustrative implementation</span>
      </figcaption>
      <div ref={frame} className={styles.frame}>
        <div className={styles.canvas} style={{ transform: `scale(${scale})` }} inert>
          <WorkspaceSidebar
            organization={config.company}
            organizationSubtitle={config.industry}
            active={config.view}
            entries={entries}
            onNavigate={() => {}}
          />
          <div className={styles.workspace}>
            <WorkspaceTopbar
              title={config.view}
              icon={config.icon}
              menuOpen={false}
              onMenuToggle={() => {}}
              onMessage={() => {}}
            />
            <div className={styles.body}>
              <div className={styles.heading}>
                <div>
                  <span className={styles.eyebrow}>YOUR OPERATION, CONNECTED</span>
                  <h3>{config.title}</h3>
                  <p>{config.subtitle}</p>
                </div>
                <span className={styles.date}>
                  Mon, Sep 21 <span>2026</span>
                </span>
              </div>
              {kind === "orders" ? (
                <Orders />
              ) : kind === "service" ? (
                <Service />
              ) : kind === "inventory" ? (
                <Inventory />
              ) : (
                <Approvals />
              )}
              <div className={styles.statusbar}>
                <span>
                  <i className={styles.dot} />
                  {config.summary}
                </span>
                <span>Powered by Superspace</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
