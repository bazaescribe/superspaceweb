"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { WorkspaceSidebar, WorkspaceTopbar } from "./workspace-shell";
import styles from "./account-workspace.module.css";

type Account = {
  name: string;
  logo: string;
  tier: string;
  year: number;
  since: number;
  cases: number;
  region: string;
  manager: string;
  contact: string;
  site: string;
};
const accounts: Account[] = [
  {
    name: "Aliada",
    logo: "Aliada",
    tier: "Startup",
    year: 2016,
    since: 2022,
    cases: 1,
    region: "CDMX Centro",
    manager: "Valeria Torres",
    contact: "Mariana Cruz",
    site: "Roma Norte",
  },
  {
    name: "Homely",
    logo: "Homely",
    tier: "Startup",
    year: 2017,
    since: 2023,
    cases: 0,
    region: "CDMX Sur",
    manager: "Jorge Ramírez",
    contact: "Andrés Vega",
    site: "Condesa",
  },
  {
    name: "DEV.F",
    logo: "DEVF",
    tier: "Startup",
    year: 2017,
    since: 2023,
    cases: 0,
    region: "Latam Norte",
    manager: "Lucía Morales",
    contact: "Paula Díaz",
    site: "Juárez",
  },
  {
    name: "CareMe",
    logo: "CareMe",
    tier: "Startup",
    year: 2019,
    since: 2024,
    cases: 2,
    region: "CDMX Poniente",
    manager: "Valeria Torres",
    contact: "Renata Silva",
    site: "Polanco",
  },
  {
    name: "Walmart",
    logo: "Walmart",
    tier: "Enterprise",
    year: 2021,
    since: 2021,
    cases: 2,
    region: "México Centro",
    manager: "Jorge Ramírez",
    contact: "Roberto Medina",
    site: "Azcapotzalco",
  },
  {
    name: "IKEA",
    logo: "IKEA",
    tier: "Enterprise",
    year: 2022,
    since: 2022,
    cases: 8,
    region: "México Centro",
    manager: "Lucía Morales",
    contact: "Elena Castillo",
    site: "Oceanía",
  },
  {
    name: "Acme Industries",
    logo: "ACME",
    tier: "Enterprise",
    year: 2022,
    since: 2024,
    cases: 12,
    region: "Latam Norte",
    manager: "Lucía Morales",
    contact: "Daniela Ruiz",
    site: "Roma Norte",
  },
  {
    name: "Superspace",
    logo: "Superspace",
    tier: "Startup",
    year: 2024,
    since: 2024,
    cases: 0,
    region: "CDMX Centro",
    manager: "Valeria Torres",
    contact: "Gabriel Pérez",
    site: "Condesa",
  },
  {
    name: "Uber",
    logo: "Uber",
    tier: "Enterprise",
    year: 2024,
    since: 2024,
    cases: 2,
    region: "Latam Norte",
    manager: "Jorge Ramírez",
    contact: "Camila Reyes",
    site: "Reforma",
  },
  {
    name: "Northline Solutions",
    logo: "Northline",
    tier: "Enterprise",
    year: 2024,
    since: 2024,
    cases: 2,
    region: "México Norte",
    manager: "Lucía Morales",
    contact: "Diego Navarro",
    site: "Monterrey",
  },
  {
    name: "OpenAI",
    logo: "OpenAI",
    tier: "Enterprise",
    year: 2025,
    since: 2025,
    cases: 2,
    region: "Latam Norte",
    manager: "Valeria Torres",
    contact: "Sofía Vázquez",
    site: "Polanco",
  },
];
const types = [
  "Supplies",
  "Maintenance",
  "Technology",
  "Marketing",
  "Human Resources",
  "Finance",
  "Logistics",
  "Customer Support",
  "Research",
  "Legal",
  "Development",
  "Quality Assurance",
];
const locations = [
  "Roma Norte",
  "Condesa",
  "Polanco",
  "Coyoacán",
  "Juárez",
  "Santa Fe",
  "Roma Sur",
  "Narvarte",
  "Polanco",
  "Del Valle",
  "Santa María",
  "Roma Norte",
];
const contacts = [
  "Mauricio Angulo",
  "Lilia Marquez",
  "Carlos Herrera",
  "Sofia Ramirez",
  "Juan Pérez",
  "Elena Castillo",
  "Diego Luna",
  "Valeria Mendoza",
  "Ricardo Salinas",
  "Ana Torres",
  "Miguel Soto",
  "Gabriela Fuentes",
];
const tasks = [
  "Replenish washroom and cleaning supplies",
  "Preventive HVAC maintenance",
  "Inspect building access controls",
  "Update visitor signage",
  "Facilities safety induction",
  "Review monthly service invoice",
  "Coordinate equipment delivery",
  "Resolve reception service request",
  "Complete energy efficiency audit",
  "Review facilities service agreement",
  "Plan workspace improvements",
  "Inspect cleaning service quality",
];
type Request = {
  id: string;
  date: string;
  type: string;
  location: string;
  contact: string;
  title: string;
  status: string;
};
function requestsFor(account: Account): Request[] {
  const index = accounts.indexOf(account);
  const isAcme = account.logo === "ACME";
  return Array.from({ length: Math.max(account.cases, 3) }, (_, i) => {
    const offset = isAcme ? i : (i + Math.max(index, 0)) % types.length;
    return {
      id: `${
        isAcme
          ? "ACI"
          : account.name
              .replace(/[^a-z]/gi, "")
              .slice(0, 3)
              .toUpperCase()
      }-RQ-${1023 + i + (isAcme ? 0 : Math.max(index, 0) * 20)}`,
      date: i < 9 ? `Sep ${22 + i}, 2026` : `Oct ${i - 8}, 2026`,
      type: types[offset],
      location: isAcme ? locations[i] : account.site,
      contact: isAcme ? contacts[i] : i === 0 ? account.contact : contacts[offset],
      title: tasks[offset],
      status: i >= account.cases ? "Resolved" : i % 3 === 0 ? "Awaiting approval" : "In progress",
    };
  });
}
function Icon({ name }: { name: string }) {
  return <Image src={`/assets/figma/mclean/${name}.svg`} alt="" width={14} height={14} unoptimized />;
}
function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
  return <span className={`${styles.tag} ${styles[tone] ?? ""}`}>{children}</span>;
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
}

export function AccountWorkspace() {
  const [extraAccounts, setExtraAccounts] = useState<Account[]>([]);
  const [account, setAccount] = useState(accounts[6]);
  const [query, setQuery] = useState("");
  const [newest, setNewest] = useState(false);
  const [accountFilter, setAccountFilter] = useState("All");
  const [tab, setTab] = useState("Requests");
  const [reverse, setReverse] = useState(false);
  const [requestFilter, setRequestFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [document, setDocument] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [newContact, setNewContact] = useState("");
  const allAccounts = [...accounts, ...extraAccounts];
  const visibleAccounts = allAccounts
    .filter(
      (a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) &&
        (accountFilter === "All" || (accountFilter === "Open cases" ? a.cases > 0 : a.tier === accountFilter)),
    )
    .sort((a, b) => (newest ? b.year - a.year : a.year - b.year));
  const requests = requestsFor(account);
  const visibleRequests = requests.filter((r) => requestFilter === "All" || r.status === requestFilter);
  if (reverse) visibleRequests.reverse();
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 4000);
    return () => window.clearTimeout(timer);
  }, [message]);
  function selectAccount(next: Account) {
    setAccount(next);
    setSelectedRequest(null);
    setDocument(null);
    setTab("Requests");
    setRequestFilter("All");
    setReverse(false);
  }
  return (
    <div className={styles.app}>
      <WorkspaceSidebar
        active="Apps"
        organization="McLean"
        organizationSubtitle="Integrated Facilities Management"
        businessLogo="/assets/figma/logos/Logo-McLean.png"
        onMessage={setMessage}
        onNavigate={(label) => {
          if (label === "Apps" || label === "Home") {
            setQuery("");
            setAccountFilter("All");
            setTab("Requests");
          } else if (label === "Inbox") setTab("Activity");
          else setTab("Documents");
        }}
      />
      <div className={styles.main}>
        <WorkspaceTopbar
          title={account.name}
          section="Apps › Account Management"
          icon={null}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((v) => !v)}
          onMessage={setMessage}
        />
        <div className={styles.columns}>
          <aside className={styles.accounts} aria-label="Client accounts">
            <div className={styles.accountTools}>
              <div className={styles.tools}>
                <button onClick={() => setNewest((v) => !v)} aria-label="Sort accounts" className={styles.control}>
                  {newest ? "Newest" : "Oldest"}
                  <Icon name="sort" />
                </button>
                <label className={styles.select}>
                  <select
                    aria-label="Filter accounts"
                    value={accountFilter}
                    onChange={(e) => setAccountFilter(e.target.value)}
                  >
                    {["All", "Open cases", "Startup", "Enterprise"].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                  <span className={styles.count}>{visibleAccounts.length}</span>
                  <Icon name="filter" />
                </label>
                <button className={styles.new} onClick={() => dialog.current?.showModal()}>
                  New
                </button>
              </div>
              <label className={styles.search}>
                <Icon name="search" />
                <input
                  aria-label="Search accounts"
                  placeholder="Search accounts"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.accountList}>
              {visibleAccounts.map((a) => (
                <button
                  className={styles.account}
                  key={a.name}
                  aria-pressed={a.name === account.name}
                  onClick={() => selectAccount(a)}
                >
                  <Image src={`/assets/figma/logos/Logo-${a.logo}.png`} width={40} height={40} alt="" />
                  <span className={styles.accountCopy}>
                    <strong>{a.name}</strong>
                    <span className={styles.tags}>
                      <Tag>{a.tier}</Tag>
                      <Tag tone="green">Active</Tag>
                      {a.cases > 0 && (
                        <Tag tone={a.cases > 8 ? "red" : "orange"}>
                          {a.cases} open {a.cases === 1 ? "case" : "cases"}
                        </Tag>
                      )}
                    </span>
                  </span>
                  <small>{a.year}</small>
                </button>
              ))}
              {!visibleAccounts.length && (
                <p className={styles.empty}>
                  No matching accounts.
                  <button
                    onClick={() => {
                      setQuery("");
                      setAccountFilter("All");
                    }}
                  >
                    Clear filters
                  </button>
                </p>
              )}
            </div>
          </aside>
          <main className={styles.content} aria-label={`${account.name} account workspace`}>
            <div className={styles.accountHeading}>
              <Image src={`/assets/figma/logos/Logo-${account.logo}.png`} width={46} height={46} alt="" />
              <div>
                <h3>{account.name}</h3>
                <p>
                  {account.tier} account · Active since {account.since}
                </p>
              </div>
            </div>
            <div className={styles.tabs} role="tablist" aria-label="Account views">
              {["Requests", "Activity", "Documents"].map((t) => (
                <button
                  role="tab"
                  aria-selected={t === tab}
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setSelectedRequest(null);
                    setDocument(null);
                  }}
                >
                  {t}
                  {t === "Requests" && account.cases > 0 && <span className={styles.count}>{account.cases}</span>}
                </button>
              ))}
            </div>
            <div className={styles.view} role="tabpanel" aria-label={tab}>
              {tab === "Requests" && (
                <>
                  <div className={styles.tools}>
                    <button className={styles.control} onClick={() => setReverse((v) => !v)} aria-label="Sort requests">
                      {reverse ? "Oldest" : "Recent"}
                      <Icon name="sort" />
                    </button>
                    <label className={styles.select}>
                      <select
                        aria-label="Filter requests"
                        value={requestFilter}
                        onChange={(e) => setRequestFilter(e.target.value)}
                      >
                        {["All", "In progress", "Awaiting approval", "Resolved"].map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                      <Icon name="filter" />
                    </label>
                  </div>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {["Request ID", "Date", "Type", "Location", "Contact", "Actions"].map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRequests.map((r) => (
                        <tr key={r.id} className={selectedRequest?.id === r.id ? styles.activeRow : ""}>
                          <td>{r.id}</td>
                          <td>{r.date}</td>
                          <td>
                            <Tag tone="green">{r.type}</Tag>
                          </td>
                          <td>
                            <Tag>{r.location}</Tag>
                          </td>
                          <td title={r.contact}>{r.contact}</td>
                          <td>
                            <button
                              className={styles.arrow}
                              aria-label={`Open request ${r.id}`}
                              onClick={() => setSelectedRequest(r)}
                            >
                              <Icon name="arrow" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!visibleRequests.length && <p className={styles.empty}>No requests with this status.</p>}
                </>
              )}
              {tab === "Activity" && (
                <div className={styles.feed}>
                  <div className={styles.feedHeading}>
                    <h4>Latest account activity</h4>
                    <Tag tone="green">Up to date</Tag>
                  </div>
                  {requests.slice(0, 5).map((r, i) => (
                    <article key={r.id}>
                      <span className={styles.activityDot} />
                      <div>
                        <strong>
                          {i === 0
                            ? `${account.manager} updated the service plan`
                            : `${r.contact} ${r.status === "Resolved" ? "completed" : "updated"} a request`}
                        </strong>
                        <p>{i === 0 ? `Facilities coverage confirmed for ${account.site}.` : `${r.title} · ${r.id}`}</p>
                        <small>
                          {r.date} · {i + 9}:30
                        </small>
                      </div>
                    </article>
                  ))}
                  <article>
                    <span className={styles.activityDot} />
                    <div>
                      <strong>Account review scheduled</strong>
                      <p>
                        {account.manager} and {account.contact} · Quarterly facilities review
                      </p>
                      <small>Oct 12, 2026 · 10:00</small>
                    </div>
                  </article>
                </div>
              )}
              {tab === "Documents" && (
                <div className={styles.documents}>
                  <h4>Account documents</h4>
                  {[
                    "Facilities service agreement",
                    "Preventive maintenance plan",
                    "Monthly service report",
                    "Site safety procedures",
                  ].map((title, i) => (
                    <button key={title} onClick={() => setDocument(title)}>
                      <span className={styles.file}>DOC</span>
                      <span>
                        <strong>{title}</strong>
                        <small>
                          {account.name} · Updated Sep {22 + i}, 2026
                        </small>
                      </span>
                      <Icon name="arrow" />
                    </button>
                  ))}
                  {document && (
                    <article className={styles.document}>
                      <button aria-label="Close document" onClick={() => setDocument(null)}>
                        ×
                      </button>
                      <h4>{document}</h4>
                      <p>{account.name} · McLean Integrated Facilities Management</p>
                      <p>
                        Scope: cleaning, preventive maintenance, building security and workplace support at{" "}
                        {account.site}. {account.manager} coordinates service delivery with {account.contact}.
                      </p>
                      <p>
                        Service coverage:{" "}
                        {account.tier === "Enterprise" ? "24/7 priority response" : "Mon–Fri, 08:00–18:00"}. Monthly
                        inspections and service reports are included. Escalate urgent requests to the account manager.
                      </p>
                      <Tag tone="green">Approved · September 2026</Tag>
                    </article>
                  )}
                </div>
              )}
            </div>
          </main>
          <aside className={styles.inspector} aria-label="Account details">
            {selectedRequest ? (
              <>
                <div className={styles.detailHeading}>
                  <h4>Request details</h4>
                  <button aria-label="Close request details" onClick={() => setSelectedRequest(null)}>
                    ×
                  </button>
                </div>
                <h3>{selectedRequest.title}</h3>
                <Field label="Request ID">
                  <Tag>{selectedRequest.id}</Tag>
                </Field>
                <Field label="Status">
                  <Tag tone={selectedRequest.status === "Resolved" ? "green" : "orange"}>{selectedRequest.status}</Tag>
                </Field>
                <Field label="Account">
                  <Tag>{account.name}</Tag>
                </Field>
                <Field label="Service">
                  <Tag tone="green">{selectedRequest.type}</Tag>
                </Field>
                <Field label="Location">
                  <Tag>{selectedRequest.location}</Tag>
                </Field>
                <Field label="Contact">
                  <Tag>{selectedRequest.contact}</Tag>
                </Field>
                <Field label="Scheduled date">
                  <Tag>{selectedRequest.date}</Tag>
                </Field>
                <Field label="Assigned account manager">
                  <Tag tone="blue">{account.manager}</Tag>
                </Field>
                <p className={styles.description}>
                  McLean’s facilities team is coordinating this request with the site contact. Updates and service
                  documentation are available in the account activity.
                </p>
                <button
                  className={styles.control}
                  onClick={() => {
                    setSelectedRequest(null);
                    setTab("Activity");
                  }}
                >
                  View account activity
                </button>
              </>
            ) : (
              <>
                <section>
                  <h4>Account summary</h4>
                  <div className={styles.summaryGrid}>
                    <Field label="Account ID">
                      <Tag>MX-{account.logo === "ACME" ? 10482 : 10420 + allAccounts.indexOf(account)}</Tag>
                    </Field>
                    <Field label="Service region">
                      <Tag>{account.region}</Tag>
                    </Field>
                    <Field label="Active since">
                      <Tag>Jan {account.since}</Tag>
                    </Field>
                    <Field label="Renewal">
                      <Tag tone="orange">{account.logo === "ACME" ? "Jun 2026" : "Jan 2027"}</Tag>
                    </Field>
                  </div>
                  <Field label="Billing owner">
                    <Tag>María Elena García</Tag>
                  </Field>
                </section>
                <section>
                  <h4>Account team</h4>
                  <Field label="Account manager">
                    <Tag tone="blue">{account.manager}</Tag>
                  </Field>
                  <Field label="Support">
                    <Tag>Jorge Ramírez</Tag>
                    <Tag>Valeria Torres</Tag>
                  </Field>
                  <Field label="Finance">
                    <Tag>María Elena García</Tag>
                    <Tag>Carlos Herrera</Tag>
                  </Field>
                  <Field label="Security">
                    <Tag>Alejandro López</Tag>
                  </Field>
                </section>
                <section>
                  <h4>Key contacts</h4>
                  <Field label="Primary contact">
                    <Tag>{account.contact}</Tag>
                  </Field>
                  <Field label="IT lead">
                    <Tag>
                      {account.logo === "ACME"
                        ? "Leonardo Soto"
                        : contacts[(allAccounts.indexOf(account) + 2) % contacts.length]}
                    </Tag>
                  </Field>
                  <Field label="Procurement">
                    <Tag>
                      {account.logo === "ACME"
                        ? "Sofía Vázquez"
                        : contacts[(allAccounts.indexOf(account) + 5) % contacts.length]}
                    </Tag>
                  </Field>
                </section>
                <section>
                  <h4>Quick reference</h4>
                  <div className={styles.summaryGrid}>
                    <Field label="SLA">
                      <Tag>{account.tier === "Enterprise" ? "24/7" : "8 business hours"}</Tag>
                    </Field>
                    <Field label="Support Hours">
                      <Tag>Mon-Fri 08:00-18:00</Tag>
                    </Field>
                  </div>
                  <Field label="Escalation path">
                    <Tag>
                      {account.manager} → {account.manager === "Jorge Ramírez" ? "Lucía Morales" : "Jorge Ramírez"}
                    </Tag>
                  </Field>
                </section>
              </>
            )}
          </aside>
        </div>
      </div>
      {message && (
        <div className={styles.toast} role="status">
          {message}
        </div>
      )}
      <dialog
        ref={dialog}
        className={styles.dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = name.trim();
            if (!trimmed || !newContact.trim()) return;
            if (allAccounts.some((a) => a.name.toLowerCase() === trimmed.toLowerCase())) {
              setMessage("An account with this name already exists");
              return;
            }
            const next: Account = {
              name: trimmed,
              contact: newContact.trim(),
              logo: "McLean",
              tier: "Startup",
              year: 2026,
              since: 2026,
              cases: 0,
              region: "CDMX Centro",
              manager: "Lucía Morales",
              site: "Roma Norte",
            };
            setExtraAccounts((a) => [...a, next]);
            selectAccount(next);
            setQuery("");
            setAccountFilter("All");
            setName("");
            setNewContact("");
            dialog.current?.close();
            setMessage("Account created in this preview");
          }}
        >
          <h3>New account</h3>
          <p>Add a client to McLean’s facilities portfolio.</p>
          <label>
            Company name
            <input required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Primary contact
            <input required maxLength={60} value={newContact} onChange={(e) => setNewContact(e.target.value)} />
          </label>
          <div>
            <button type="button" onClick={() => dialog.current?.close()}>
              Cancel
            </button>
            <button type="submit">Create account</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
