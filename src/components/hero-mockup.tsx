"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Clock as Clock3,
  DotsThree as MoreHorizontal,
  Heart,
  House as Home,
  Plus,
  Sparkle as Sparkles,
  UserCircle as UserRound,
  Users,
  X,
} from "@phosphor-icons/react";
import styles from "./hero-mockup.module.css";
import { WorkspaceSidebar, WorkspaceTopbar } from "./workspace-shell";

type Person = { name: string; role: string; initials: string; color: string; groups: string[]; active: string };
const people: Person[] = [
  ["Amara Okafor", "Finance Lead", "AO", "var(--preview-green)", "Finances,Support", "2 h"],
  ["Diego Marín", "Operations Manager", "DM", "var(--preview-pink)", "Operations", "1 h"],
  ["Julián Reyes", "Service Coordinator", "JR", "var(--preview-orange)", "Services", "4 h"],
  ["Lena Fischer", "People Lead", "LF", "var(--preview-teal)", "People", "Yesterday"],
  ["Leona Whitfield", "Client Success", "LW", "var(--preview-pink)", "Support", "3 h"],
  ["Priya Nair", "Account Manager", "PN", "var(--preview-purple)", "Finances", "5 h"],
  ["Sofía Bianchi", "Service Lead", "SB", "var(--preview-teal)", "Services", "1 h"],
  ["Tom Baxter", "Operations Analyst", "TB", "var(--preview-orange)", "Operations", "6 h"],
  ["Kenji Tanaka", "Support Lead", "KT", "var(--preview-purple)", "Support", "2 h"],
  ["Maya Chen", "Finance Analyst", "MC", "var(--preview-pink)", "Finances", "Yesterday"],
  ["Elias Nordström", "Service Manager", "EN", "var(--preview-teal)", "Services", "3 h"],
  ["Nadia Petrov", "Client Partner", "NP", "var(--preview-orange)", "Support", "4 h"],
  ["Ravi Kapoor", "Operations Lead", "RK", "var(--preview-green)", "Operations", "1 h"],
].map(([name, role, initials, color, groups, active]) => ({
  name,
  role,
  initials,
  color,
  groups: groups.split(","),
  active,
}));

function Avatar({ person, large = false }: { person: Person; large?: boolean }) {
  return (
    <span className={`${styles.avatar} ${large ? styles.avatarLarge : ""}`} style={{ background: person.color }}>
      {person.initials}
    </span>
  );
}
/** Reusable scaled product preview; interactions stay local to the mock workspace. */
export function HeroMockup() {
  const frame = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [scale, setScale] = useState(1);
  const [view, setView] = useState<"Home" | "Team">("Home");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<"People" | "Groups">("People");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!frame.current) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1280));
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        frame.current?.contains(document.activeElement) &&
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchInput.current?.focus();
      }
      if (event.key === "Escape") {
        setMenuOpen(false);
        searchInput.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }
  function navigate(label: string) {
    if (label === "Home" || label === "Team") {
      setView(label);
      setQuery("");
      return;
    }
    announce(`${label} is part of this product preview`);
  }
  const active = people[selected];
  const visiblePeople = people.filter((person) =>
    `${person.name} ${person.role} ${person.groups.join(" ")}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="hero-product">
      <div className="hero-point-field" aria-hidden="true" />
      <div className="hero-product__screen" ref={frame}>
        <div
          className={styles.canvas}
          style={{ transform: `scale(${scale})` }}
          aria-label="Interactive Superspace workspace preview"
        >
          <WorkspaceSidebar
            active={view}
            onNavigate={navigate}
            query={query}
            onQueryChange={(value) => {
              setQuery(value);
              if (value) setView("Team");
            }}
            searchInput={searchInput}
            onMessage={announce}
          />
          <div className={styles.workspace}>
            <WorkspaceTopbar
              title={view}
              icon={view === "Home" ? <Home size={15} /> : <Users size={15} />}
              menuOpen={menuOpen}
              onMenuToggle={() => setMenuOpen(!menuOpen)}
              onMessage={announce}
            />
            {view === "Home" ? (
              <HomePanel onAction={announce} onTeam={() => navigate("Team")} />
            ) : (
              <div className={styles.teamPage}>
                <div className={styles.teamList}>
                  <div className={styles.teamHeader}>
                    <h2>Team</h2>
                    <button className={styles.newButton} onClick={() => announce("Invite a team member · demo action")}>
                      <Plus size={14} /> New
                    </button>
                  </div>
                  <div className={styles.tabs} role="tablist" aria-label="Team view">
                    <button
                      role="tab"
                      aria-selected={tab === "People"}
                      className={tab === "People" ? styles.tabActive : ""}
                      onClick={() => setTab("People")}
                    >
                      People
                    </button>
                    <button
                      role="tab"
                      aria-selected={tab === "Groups"}
                      className={tab === "Groups" ? styles.tabActive : ""}
                      onClick={() => setTab("Groups")}
                    >
                      Groups
                    </button>
                  </div>
                  {tab === "People" ? (
                    <div className={styles.peopleList}>
                      {visiblePeople.length ? (
                        visiblePeople.map((person) => {
                          const index = people.indexOf(person);
                          return (
                            <button
                              key={person.name}
                              className={`${styles.personRow} ${index === selected ? styles.personSelected : ""}`}
                              onClick={() => setSelected(index)}
                            >
                              <Avatar person={person} />
                              <span>
                                <strong>{person.name}</strong>
                                <small>{person.name.toLowerCase().replaceAll(" ", ".")}@acme.com</small>
                              </span>
                              <ArrowUpRight size={14} />
                            </button>
                          );
                        })
                      ) : (
                        <p className={styles.empty}>No people match “{query}”.</p>
                      )}
                    </div>
                  ) : (
                    <div className={styles.groupsList}>
                      {["Finances", "Support", "Operations", "Services", "People"].map((group) => (
                        <button
                          key={group}
                          onClick={() => {
                            setTab("People");
                            setQuery(group);
                          }}
                        >
                          <span className={styles.groupBadge}>
                            <Users size={16} />
                          </span>
                          <span>
                            {group}
                            <small>{people.filter((person) => person.groups.includes(group)).length} members</small>
                          </span>
                          <ArrowUpRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.detailPanel}>
                  <div className={styles.detailInner}>
                    <div className={styles.detailTitle}>
                      <Avatar person={active} large />
                      <span>
                        <h3>{active.name}</h3>
                        <p>{active.role}</p>
                      </span>
                      <button aria-label="Profile options" onClick={() => announce(`${active.name} · profile actions`)}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                    <section className={styles.detailSection}>
                      <h4>Contact</h4>
                      <dl>
                        <div>
                          <dt>Email</dt>
                          <dd className={styles.linkText}>{active.name.toLowerCase().replaceAll(" ", ".")}@acme.com</dd>
                        </div>
                        <div>
                          <dt>Phone</dt>
                          <dd>+52 1234 2345</dd>
                        </div>
                        <div>
                          <dt>Country</dt>
                          <dd>México</dd>
                        </div>
                        <div>
                          <dt>Member Id.</dt>
                          <dd>#{selected + 2}</dd>
                        </div>
                        <div>
                          <dt>Last Active</dt>
                          <dd>{active.active}</dd>
                        </div>
                      </dl>
                    </section>
                    <section className={styles.detailSection}>
                      <h4>Properties</h4>
                      <div className={styles.pills}>
                        <span>♧ &nbsp;Manager</span>
                        <span>
                          <i /> Active
                        </span>
                      </div>
                    </section>
                    <section className={styles.detailSection}>
                      <h4>Groups</h4>
                      <div className={styles.pills}>
                        {active.groups.map((group) => (
                          <span key={group}>{group}</span>
                        ))}
                        <button onClick={() => announce("Add group · demo action")}>
                          Add group <Plus size={13} />
                        </button>
                      </div>
                    </section>
                    <section className={styles.detailSection}>
                      <h4>Effective permissions</h4>
                      <div className={styles.permissions}>
                        {[
                          ["Manage people", "Invite, edit and remove members."],
                          ["Manage billing", "Payment methods and invoices."],
                          ["View audit logs", "Read org-wide activity."],
                          ["Export data", "Download records in bulk."],
                        ].map(([title, subtitle]) => (
                          <div key={title}>
                            <strong>{title}</strong>
                            <small>{subtitle}</small>
                          </div>
                        ))}
                      </div>
                    </section>
                    <section className={styles.detailSection}>
                      <h4>Activity</h4>
                      <p className={styles.activityLine}>
                        <Clock3 size={14} /> {active.name} granted Finance access to billing.
                      </p>
                      <small className={styles.activityDate}>May 12, 2026 · 18:04</small>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
          {notice && (
            <div className={styles.toast} role="status">
              <Check size={15} />
              {notice}
              <button onClick={() => setNotice("")} aria-label="Dismiss message">
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomePanel({ onAction, onTeam }: { onAction: (message: string) => void; onTeam: () => void }) {
  return (
    <div className={styles.homeScroll}>
      <div className={styles.homeContent}>
        <div className={styles.greeting}>
          <h2>Good morning, Jane!</h2>
          <p>Here’s how your operations are looking today.</p>
        </div>
        <div className={styles.quickActions}>
          <button onClick={() => onAction("Create new service · demo action")}>
            <Sparkles size={20} />
            <span>Create new service</span>
          </button>
          <button onClick={() => onAction("Register new keeper · demo action")}>
            <Heart size={20} />
            <span>Register new keeper</span>
          </button>
          <button onClick={onTeam}>
            <UserRound size={20} />
            <span>Register new client</span>
          </button>
        </div>
        <section className={styles.brief}>
          <h3>Your operational brief.</h3>
          <p>
            <span className={styles.success}>
              <Check size={12} strokeWidth={3} />
            </span>
            39 out of 42 services are covered today
          </p>
          <p>
            <span className={styles.warning}>•</span>6 services still need a keeper tomorrow. Including 4 in Roma Norte.
          </p>
          <p>
            <span className={styles.success}>
              <Check size={12} strokeWidth={3} />
            </span>
            New requests remain within the response target.
          </p>
        </section>
        <section className={styles.glance}>
          <h3>At a glance</h3>
          <div>
            <article>
              <span>Scheduled services</span>
              <strong>42</strong>
              <small>Today</small>
            </article>
            <article>
              <span>Coverage</span>
              <strong>93%</strong>
              <small>39 out of 42 assigned</small>
            </article>
            <article>
              <span>Open Requests</span>
              <strong>12</strong>
              <small>All within response target</small>
            </article>
          </div>
        </section>
        <section className={styles.attention}>
          <h3>Worth your attention</h3>
          <p>Cancellations are concentrated.</p>
          <small>3 of this week’s 4 cancellations are in Condesa.</small>
          <div className={styles.map}>
            <Image src="/assets/figma/hero-map.png" alt="Map of Condesa, Mexico City" fill sizes="680px" />
            <span>×</span>
          </div>
        </section>
        <button className={styles.exploreTeam} onClick={onTeam}>
          Explore your team <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}
