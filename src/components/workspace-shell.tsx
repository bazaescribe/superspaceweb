"use client";

import type { ReactNode, RefObject } from "react";
import {
  Bell,
  CaretDown as ChevronDown,
  DotsThree as MoreHorizontal,
  FlowArrow as Workflow,
  House as Home,
  MagnifyingGlass as Search,
  Pulse as Activity,
  Question as CircleHelp,
  SlidersHorizontal as Settings2,
  Sparkle as Sparkles,
  Tray as Inbox,
  Users,
  CaretUpDownIcon,
  SidebarSimpleIcon,
  HouseLineIcon
} from "@phosphor-icons/react";
import styles from "./hero-mockup.module.css";
import Image from "next/image";

type NavEntry = { label: string; icon?: ReactNode; dot?: string; count?: string };
export const defaultWorkspaceEntries: { heading?: string; item?: NavEntry }[] = [
  { item: { label: "Home", icon: <HouseLineIcon /> } },
  { item: { label: "Inbox", icon: <Inbox />, count: "8" } },
  { heading: "Admin" },
  { item: { label: "Team", icon: <Users /> } },
  { item: { label: "Automations", icon: <Workflow /> } },
  { item: { label: "Activity", icon: <Activity /> } },
  { heading: "Favorites" },
  { item: { label: "Requests", dot: "#00b9ad", count: "12" } },
  { item: { label: "Onboard new keeper", dot: "#a742da" } },
  { heading: "Work" },
  { item: { label: "Clients", dot: "#ff4141" } },
  { item: { label: "Services", dot: "#ff9800" } },
  { item: { label: "Keepers", dot: "#f5c500" } },
  { item: { label: "Invoices", dot: "#26bb62" } },
];

export function WorkspaceSidebar({
  active,
  onNavigate,
  query = "",
  onQueryChange,
  searchInput,
  organization = "Aliada",
  organizationSubtitle = "Work",
  entries = defaultWorkspaceEntries,
  onMessage,
}: {
  active: string;
  onNavigate: (label: string) => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  searchInput?: RefObject<HTMLInputElement | null>;
  organization?: string;
  organizationSubtitle?: string;
  entries?: { heading?: string; item?: NavEntry }[];
  onMessage?: (message: string) => void;
}) {
  return (
    <aside className={styles.sidebar} aria-label="Workspace navigation">
      <div className="p-2 px-3" style={{ height: "48px" }}>
        <button
          className={styles.organization}
          onClick={() => onMessage?.(`${organization} · ${organizationSubtitle}`)}
        >
          <div className="flex gap-2">
            <div className={styles.brandMark}>
              <Sparkles size={19} fill="white" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{organization}</p>
              <div className="bg-[#FF55AC] py-[2px] px-2 rounded-xl text-[10px] text-white">{organizationSubtitle}</div>
            </div>
          </div>
          <div className="rounded-md flex justify-center items-center" style={{ width: "20px", height: "20px" }}>
            <CaretUpDownIcon size={14} className="text-black/50" />
          </div>
        </button>
      </div>

      <div className="p-2 px-3">
        <label className={styles.searchBox}>
          <div className="flex items-center gap-2">
            <Image src={'/brand/superspace-symbol.svg'} width={12} height={16} alt="Superspace Symbol"></Image>
            <span className="text-xs text-black/30">Search or ask</span>
          </div>
          <kbd>⌘K</kbd>
        </label>
      </div>

      <div className="p-2 px-3">
        <nav>
          {entries.map((entry, index) =>
            entry.heading ? (
              <span key={entry.heading} className={styles.navHeading}>
                {entry.heading}
              </span>
            ) : entry.item ? (
              <button
                key={`${entry.item.label}-${index}`}
                className={`${styles.navItem} ${active === entry.item.label ? styles.navActive : ""}`}
                onClick={() => onNavigate(entry.item!.label)}
                aria-current={active === entry.item.label ? "page" : undefined}
              >
                {entry.item.dot ? (
                  <i className={styles.navDot} style={{ background: entry.item.dot }} />
                ) : (
                  <span className={styles.navIcon}>{entry.item.icon}</span>
                )}
                <span>{entry.item.label}</span>
                {entry.item.count && <b>{entry.item.count}</b>}
              </button>
            ) : null,
          )}
        </nav>
      </div>
      <div className={styles.sidebarBottom}>
        <button className={styles.navItem} onClick={() => onMessage?.("Help center is part of this preview")}>
          <span className={styles.navIcon}>
            <CircleHelp />
          </span>
          <span>Help</span>
        </button>
        <button className={styles.profile} onClick={() => onMessage?.("Signed in as Jane Doe")}>
          <span className={styles.jane}>JD</span>
          <span>
            <strong>Jane Doe</strong>
            <small>jane@mail.com</small>
          </span>
          <ChevronDown size={15} />
        </button>
      </div>
    </aside>
  );
}

export function WorkspaceTopbar({
  title,
  icon,
  menuOpen,
  onMenuToggle,
  onMessage,
}: {
  title: string;
  icon: ReactNode;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMessage: (message: string) => void;
}) {
  return (
    <header className={styles.topbar}>
      <div>
        <SidebarSimpleIcon size={14} />
        {title}
      </div>
      <div className={styles.menuWrap}>
        <button aria-label="More options" aria-expanded={menuOpen} className={styles.iconButton} onClick={onMenuToggle}>
          <MoreHorizontal size={19} />
        </button>
        {menuOpen && (
          <div className={styles.menu}>
            <button
              onClick={() => {
                onMenuToggle();
                onMessage("Workspace settings are part of this preview");
              }}
            >
              <Settings2 size={15} /> Workspace settings
            </button>
            <button
              onClick={() => {
                onMenuToggle();
                onMessage("Notifications are up to date");
              }}
            >
              <Bell size={15} /> Notifications
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
