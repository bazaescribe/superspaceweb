"use client";

import { useEffect, useRef, useState } from "react";
import {
  CaretDown as ChevronDown,
  Check,
  CheckCircle as CircleCheck,
  Clock as Clock3,
  DotsThree as MoreHorizontal,
  FileText,
  Package,
  Plus,
  Truck,
} from "@phosphor-icons/react";
import { defaultWorkspaceEntries, WorkspaceSidebar, WorkspaceTopbar } from "./workspace-shell";
import styles from "./order-workspace.module.css";

const orders = [
  {
    id: "NS–1048",
    customer: "Northstar Supply",
    description: "Commercial fixtures",
    quantity: 240,
    previous: 200,
    value: "$7,680.00",
    status: "Ready for dispatch",
    date: "Fri, Sep 25",
    owner: "Alex Lee",
    initials: "NS",
  },
  {
    id: "NS–1047",
    customer: "Northstar Supply",
    description: "Display components",
    quantity: 120,
    previous: 120,
    value: "$3,840.00",
    status: "Delivered",
    date: "Tue, Sep 22",
    owner: "Alex Lee",
    initials: "NS",
  },
  {
    id: "AC–1049",
    customer: "Acme Retail",
    description: "Store fixtures",
    quantity: 80,
    previous: 80,
    value: "$2,560.00",
    status: "In review",
    date: "Mon, Sep 28",
    owner: "Maya Chen",
    initials: "AC",
  },
  {
    id: "WL–1050",
    customer: "Westline Goods",
    description: "Modular fixtures",
    quantity: 160,
    previous: 160,
    value: "$5,120.00",
    status: "Scheduled",
    date: "Wed, Sep 30",
    owner: "Diego Marín",
    initials: "WL",
  },
];
const navEntries = [
  ...defaultWorkspaceEntries.slice(0, 10),
  { item: { label: "Orders", dot: "#0d31ff", count: "24" } },
  ...defaultWorkspaceEntries.slice(10),
];

export function OrderWorkspace() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<"Overview" | "Activity">("Overview");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const order = orders[selected];
  const filtered = orders.filter((item) =>
    `${item.id} ${item.customer} ${item.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInput.current?.focus();
      }
      if (event.key === "Escape") searchInput.current?.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }
  return (
    <div className={styles.app} aria-label="Superspace connected orders workspace">
      <WorkspaceSidebar
        active="Orders"
        entries={navEntries}
        query={query}
        onQueryChange={setQuery}
        searchInput={searchInput}
        onNavigate={(label) => announce(`${label} is part of this product preview`)}
        onMessage={announce}
      />
      <div className={styles.content}>
        <WorkspaceTopbar
          title="Orders"
          icon={<Package size={15} />}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(!menuOpen)}
          onMessage={announce}
        />
        <div className={styles.columns}>
          <div className={styles.list}>
            <div className={styles.listHeader}>
              <div>
                <h3>Orders</h3>
                <p>Every order, one source of truth.</p>
              </div>
              <button onClick={() => announce("New order · demo action")} aria-label="Create order">
                <Plus size={14} />
              </button>
            </div>
            <div className={styles.listTools}>
              <span>
                All orders <ChevronDown size={12} />
              </span>
              <span>24 total</span>
            </div>
            <div className={styles.rows}>
              {filtered.length ? (
                filtered.map((item) => (
                  <button
                    className={`${styles.row} ${order.id === item.id ? styles.active : ""}`}
                    key={item.id}
                    onClick={() => {
                      setSelected(orders.indexOf(item));
                      setTab("Overview");
                    }}
                  >
                    <span className={styles.rowAvatar}>{item.initials}</span>
                    <span className={styles.rowText}>
                      <strong>{item.customer}</strong>
                      <small>
                        {item.id} · {item.quantity} units
                      </small>
                    </span>
                    <span className={styles.rowStatus}>{item.status}</span>
                  </button>
                ))
              ) : (
                <p className={styles.empty}>No orders match “{query}”.</p>
              )}
            </div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTop}>
              <span>
                <Package size={13} /> {order.id}
              </span>
              <button onClick={() => announce(`${order.id} · more actions`)} aria-label="Order actions">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className={styles.detailBody}>
              <div className={styles.heading}>
                <div>
                  <span className={styles.eyebrow}>CUSTOMER ORDER · {order.id}</span>
                  <h3>{order.customer}</h3>
                  <p>{order.description} · Austin, TX</p>
                </div>
                <span className={`${styles.status} ${order.status === "Ready for dispatch" ? styles.ready : ""}`}>
                  <i />
                  {order.status}
                </span>
              </div>
              <div className={styles.tabs} role="tablist" aria-label="Order details">
                <button
                  role="tab"
                  aria-selected={tab === "Overview"}
                  className={tab === "Overview" ? styles.selectedTab : ""}
                  onClick={() => setTab("Overview")}
                >
                  Overview
                </button>
                <button
                  role="tab"
                  aria-selected={tab === "Activity"}
                  className={tab === "Activity" ? styles.selectedTab : ""}
                  onClick={() => setTab("Activity")}
                >
                  Activity
                </button>
              </div>
              {tab === "Overview" ? (
                <>
                  <div className={styles.facts}>
                    <div>
                      <span>Order owner</span>
                      <strong>{order.owner}</strong>
                    </div>
                    <div>
                      <span>Delivery date</span>
                      <strong>{order.date}</strong>
                    </div>
                    <div>
                      <span>Order value</span>
                      <strong>{order.value}</strong>
                    </div>
                  </div>
                  <div className={styles.sectionTitle}>
                    Line items <span>01</span>
                  </div>
                  <div className={styles.lineItem}>
                    <span className={styles.itemIcon}>
                      <Package size={17} />
                    </span>
                    <span>
                      <strong>Modular fixture / Type A</strong>
                      <small>SKU MF–024 · Warehouse A</small>
                    </span>
                    <b>
                      {order.quantity} <small>units</small>
                    </b>
                  </div>
                  {order.quantity !== order.previous && (
                    <div className={styles.update}>
                      <CircleCheck size={13} /> Quantity updated from {order.previous} to {order.quantity} after Emma’s
                      request
                    </div>
                  )}
                  <div className={styles.bottomGrid}>
                    <section>
                      <div className={styles.sectionTitle}>Workflow</div>
                      <div className={styles.steps}>
                        <span>
                          <Check size={12} /> Confirmed
                        </span>
                        <span>
                          <Check size={12} /> Approved
                        </span>
                        <span className={styles.next}>
                          <Truck size={13} /> {order.status === "Delivered" ? "Delivered" : "Dispatch"}
                        </span>
                      </div>
                    </section>
                    <section>
                      <div className={styles.sectionTitle}>Connected context</div>
                      <p>
                        <FileText size={13} />{" "}
                        {selected === 0
                          ? "Customer request and PO–2084 attached"
                          : "Customer record and fulfillment history linked"}
                      </p>
                    </section>
                  </div>
                </>
              ) : (
                <div className={styles.activity}>
                  {(selected === 0
                    ? [
                        ["Customer request linked", "Emma Lewis asked for 240 units", "9:14"],
                        ["Quantity updated to 240", "Inventory reserved automatically", "9:15"],
                        ["Additional units approved", "Alex Lee · PO–2084", "9:18"],
                        ["Ready for dispatch", "All checks complete", "9:20"],
                      ]
                    : [
                        ["Order created", `${order.customer} · ${order.quantity} units`, "9:14"],
                        ["Owner assigned", order.owner, "9:15"],
                        ["Status updated", order.status, "9:18"],
                      ]
                  ).map(([title, detail, time]) => (
                    <div key={title}>
                      <span className={styles.eventIcon}>
                        <Check size={11} />
                      </span>
                      <span>
                        <strong>{title}</strong>
                        <small>{detail}</small>
                      </span>
                      <time>{time}</time>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.detailFoot}>
              <Clock3 size={12} /> Every change connected. Every decision traceable.<span>Updated just now</span>
            </div>
          </div>
        </div>
      </div>
      {notice && (
        <div className={styles.toast} role="status">
          <Check size={13} /> {notice}
        </div>
      )}
    </div>
  );
}
