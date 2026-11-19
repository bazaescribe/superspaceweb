"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  SparklesIcon,
  Link01Icon,
  PencilEdit01Icon,
  StarIcon,
  MoreHorizontalIcon,
  IdentityCardIcon,
  Tick02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";
import { useCopy } from "@/i18n/copy";
import { PreviewPanel } from "./preview-ui";
import styles from "./experience-showcase.module.css";

const benefits = [
  [
    "Know what matters.",
    "See pending tasks, exceptions, and approvals without searching across systems.",
    "fire",
    Briefing,
  ],
  [
    "Act with confidence.",
    "Make decisions and take action within your business rules, permissions, and approvals.",
    "cotton-candy",
    Proposal,
  ],
  [
    "Work your way.",
    "Use the right interface for the task, from tables and boards to focused workspaces.",
    "jungle",
    Customer,
  ],
  [
    "Adapt as operations change.",
    "When a process changes, its stages, rules, and workflows change with it.",
    "mist",
    ModelUpdate,
  ],
] as const;

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <PreviewPanel theme="dark" className={styles.panel}>
        {children}
      </PreviewPanel>
    </div>
  );
}

function Briefing() {
  const copy = useCopy();
  return (
    <Panel>
      <header className={styles.stack}>
        <small>{copy("Thu 5 Nov, 8:05 AM")}</small>
        <h4>{copy("Good morning, Selena.")}</h4>
      </header>
      <div className={styles.metrics}>
        {[
          [5, "Overdue orders"],
          [2, "Need a driver"],
          [1, "Driver conflict"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <small>{copy(label)}</small>
          </div>
        ))}
      </div>
      <div className={styles.stack}>
        <small className={styles.byline}>
          <HugeiconsIcon aria-hidden="true" icon={SparklesIcon} size={14} /> {copy("Dispatch Agent")}{" "}
          <time>{copy("12m ago")}</time>
        </small>
        <h4>{copy("Driver needed by 5 PM")}</h4>
        <p>
          {copy("Order PO-48202 is scheduled for delivery today at 5:00 PM, but it doesn’t have an assigned driver.")}
        </p>
      </div>
    </Panel>
  );
}

function Proposal() {
  const copy = useCopy();
  const [route, setRoute] = useState("Rebalance routes");
  return (
    <Panel>
      <small className={styles.byline}>
        <HugeiconsIcon aria-hidden="true" icon={SparklesIcon} size={14} /> {copy("Dispatch Agent")}{" "}
        <time>{copy("5m ago")}</time>
      </small>
      <div className={styles.stack}>
        <h4>{copy("Review dispatch options")}</h4>
        <p>{copy("The order can still be delivered today if two smaller orders move to the next trip.")}</p>
      </div>

      <div className={styles.choices} role="group" aria-label={copy("Proposed resolution")}>
        {["Rebalance routes", "Reschedule PO-48202"].map((option) => (
          <button key={option} type="button" aria-pressed={route === option} onClick={() => setRoute(option)}>
            <span className={styles.radio}>
              {route === option && <HugeiconsIcon icon={Tick02Icon} size={13} aria-hidden="true" />}
            </span>
            {copy(option)}
          </button>
        ))}
      </div>
      <div className={styles.transitions}>
        <small className={styles.outcome}>
          {route === "Rebalance routes" ? (
            <HugeiconsIcon aria-hidden="true" icon={CheckmarkCircle02Icon} size={15} />
          ) : (
            <HugeiconsIcon aria-hidden="true" icon={Clock01Icon} size={15} />
          )}
          {copy(
            route === "Rebalance routes"
              ? "All deliveries remain within their committed windows."
              : "Confirm a new delivery window with the customer.",
          )}
        </small>
        <div className={styles.chips} aria-live="polite">
          <span>PO-48202</span> <HugeiconsIcon icon={ArrowRight02Icon} size={12} aria-hidden="true" />{" "}
          <span>{route === "Rebalance routes" ? "V-12" : copy("Next available trip")}</span>
          {route === "Rebalance routes" && <span>R-08</span>}
        </div>
        <div
          className={styles.routeRows}
          data-open={route === "Rebalance routes"}
          aria-hidden={route !== "Rebalance routes"}
        >
          <div>
            <div>
              {["PO-48197", "PO-48186"].map((id) => (
                <div key={id} className={styles.chips}>
                  <span>{id}</span> <HugeiconsIcon icon={ArrowRight02Icon} size={12} aria-hidden="true" />{" "}
                  <span>V-11</span>
                  <span>R-09</span>
                  <span className={styles.delay}>{copy("+2h delay")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Customer() {
  const copy = useCopy();
  return (
    <Panel>
      <div className={styles.toolbar}>
        <span>
          <HugeiconsIcon aria-hidden="true" icon={IdentityCardIcon} size={16} /> {copy("Customer record")}
        </span>
        <span>
          <HugeiconsIcon aria-hidden="true" icon={StarIcon} size={14} />
          <HugeiconsIcon aria-hidden="true" icon={MoreHorizontalIcon} size={14} />
        </span>
      </div>
      <div className={styles.identity}>
        <div className={styles.initials}>AO</div>
        <div>
          <h4>Amara Okafor</h4>
          <p>amara.okafor@example.com</p>
        </div>
        <span>
          <HugeiconsIcon aria-hidden="true" icon={PencilEdit01Icon} size={14} />
          <HugeiconsIcon aria-hidden="true" icon={Link01Icon} size={14} />
        </span>
      </div>
      <div className={styles.recordTabs}>
        {["Details", "Services", "Invoices", "Activity"].map((label) => (
          <span key={label}>
            {copy(label)}
            {label === "Services" && <b className={styles.count}>3</b>}
          </span>
        ))}
      </div>
      <div className={styles.stack}>
        <strong>{copy("Details")}</strong>
        <dl className={styles.details}>
          <div>
            <dt>ID</dt>
            <dd>0130239138</dd>
          </div>
          <div>
            <dt>{copy("Email")}</dt>
            <dd>amara.okafor@example.com</dd>
          </div>
          <div>
            <dt>{copy("Phone")}</dt>
            <dd>+52 55 0100 0001</dd>
          </div>
          <div>
            <dt>{copy("Created")}</dt>
            <dd>{copy("March 23, 2025")}</dd>
          </div>
        </dl>
      </div>
      <div className={styles.stack}>
        <strong>{copy("Properties")}</strong>
        <dl className={styles.details}>
          <div>
            <dt>{copy("Status")}</dt>
            <dd className={styles.success}>{copy("Active")}</dd>
          </div>
          <div>
            <dt>{copy("Priority")}</dt>
            <dd>{copy("High")}</dd>
          </div>
          <div>
            <dt>{copy("Company")}</dt>
            <dd>ACME Inc.</dd>
          </div>
        </dl>
      </div>
    </Panel>
  );
}

function ModelUpdate() {
  const copy = useCopy();
  return (
    <Panel>
      <small className={styles.chatDate}>{copy("Sat May 2, 10:03 AM")}</small>
      <p className={styles.prompt}>
        {copy(
          "Require a valid license for the assigned vehicle before a driver can take a delivery. Keep the current zone and time rules, and alert Dispatch before licenses expire.",
        )}
      </p>
      <div className={styles.stack}>
        <small className={styles.worked}>{copy("Superspace worked for 48s")}</small>
        <p>{copy("I found where to add license checks to driver assignment.")}</p>
        <div className={styles.notice}>
          <strong>{copy("Driver licensing proposal")}</strong>
          <p>
            <small>{copy("Awaiting your approval")}</small>
          </p>
          <ul>
            <li>
              {copy("Create a Driver Licenses object")}
              <small>{copy("Link each license to a driver and record its class and expiration date.")}</small>
            </li>
            <li>
              {copy("Add a license check to assignment")}
              <small>{copy("Keep zone and time checks and require a valid license for the assigned vehicle.")}</small>
            </li>
            <li>
              {copy("Warn Dispatch and flag expired licenses")}
              <small>{copy("Alert Dispatch 30 days before expiry and flag affected open deliveries.")}</small>
            </li>
          </ul>
          <div className={styles.chatActions}>
            <span>{copy("Apply changes")}</span>
            <span>{copy("Adjust")}</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function ExperienceShowcase() {
  const copy = useCopy();
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const sync = () =>
      setEdges({
        start: element.scrollLeft < 2,
        end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    element.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", sync);
    };
  }, []);

  function step(direction: number) {
    const element = track.current;
    const first = element?.children[0] as HTMLElement | undefined;
    const second = element?.children[1] as HTMLElement | undefined;
    if (!element || !first || !second) return;
    const stride = second.offsetLeft - first.offsetLeft;
    const next = Math.round(element.scrollLeft / stride) + direction;
    const end = element.scrollWidth - element.clientWidth;
    const target = direction > 0 && end - next * stride <= 24 ? end : next * stride;
    element.scrollTo({
      left: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className={styles.carousel} role="region" aria-label={copy("What your team can do")}>
      <ul ref={track} className={styles.track} tabIndex={0}>
        {benefits.map(([title, text, background, Preview]) => (
          <li key={title}>
            <div className={styles.visual} data-theme="dark" data-background={background}>
              <Preview />
            </div>
            <h3>{copy(title)}</h3>
            <p>{copy(text)}</p>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <button type="button" aria-label={copy("Previous slide")} disabled={edges.start} onClick={() => step(-1)}>
          <HugeiconsIcon aria-hidden="true" icon={ArrowLeft01Icon} size={18} />
        </button>
        <button type="button" aria-label={copy("Next slide")} disabled={edges.end} onClick={() => step(1)}>
          <HugeiconsIcon aria-hidden="true" icon={ArrowRight01Icon} size={18} />
        </button>
      </div>
    </div>
  );
}
