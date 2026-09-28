"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Bell, SlidersHorizontal as Settings2 } from "@phosphor-icons/react";
import Image, { type ImageProps } from "next/image";
import styles from "./workspace-shell.module.css";

type NavEntry = { label: string; icon?: ReactNode; dot?: string; count?: string };
export const defaultWorkspaceEntries: { heading?: string; item?: NavEntry }[] = [
  { item: { label: "Home" } },
  { item: { label: "Inbox" } },
  { item: { label: "Team" } },
  { item: { label: "Database" } },
  { item: { label: "Apps" } },
];

function ShellIcon({ name, size = 14 }: { name: string; size?: number }) {
  return <Image src={`/assets/figma/shell/${name}.svg`} alt="" width={size} height={size} unoptimized />;
}

export function WorkspaceSidebar({
  active,
  onNavigate,
  organization = "Aliada",
  organizationSubtitle = "Work",
  businessLogo,
  entries = defaultWorkspaceEntries,
  onMessage,
  userName = "Jane Doe",
  userEmail = "jane@mail.com",
  userAvatar = "/assets/figma/shell/avatar.png",
}: {
  active: string;
  onNavigate: (label: string) => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  searchInput?: RefObject<HTMLInputElement | null>;
  organization?: string;
  organizationSubtitle?: string;
  businessLogo?: ImageProps["src"];
  entries?: { heading?: string; item?: NavEntry }[];
  onMessage?: (message: string) => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: ImageProps["src"];
}) {
  const sidebar = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [search, setSearch] = useState("");
  const current = ["Home", "Inbox", "Database", "Apps"].includes(active) ? active : "Apps";
  function openPalette() {
    setSearch("");
    setPaletteOpen(true);
  }
  function closePalette() {
    setPaletteOpen(false);
  }
  useEffect(() => {
    if (!paletteOpen) return;
    dialog.current?.querySelector("input")?.focus({ preventScroll: true });
    const siblings = Array.from(sidebar.current?.parentElement?.children ?? []).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== sidebar.current,
    );
    const previous = siblings.map((element) => element.inert);
    siblings.forEach((element) => {
      element.inert = true;
    });
    const paletteTrigger = trigger.current;
    return () => {
      siblings.forEach((element, index) => {
        element.inert = previous[index];
      });
      paletteTrigger?.focus({ preventScroll: true });
    };
  }, [paletteOpen]);
  useEffect(() => {
    const root = sidebar.current?.parentElement;
    function onKey(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        root?.contains(document.activeElement)
      ) {
        event.preventDefault();
        openPalette();
      }
    }
    root?.addEventListener("keydown", onKey);
    return () => root?.removeEventListener("keydown", onKey);
  }, []);
  const actions = [
    ...new Set([
      "Home",
      "Inbox",
      "Database",
      "Apps",
      ...entries.flatMap((entry) => (entry.item ? [entry.item.label] : [])),
    ]),
  ];
  return (
    <aside ref={sidebar} className={styles.sidebar} aria-label="Workspace navigation">
      <div className={styles.sidebarTop} inert={paletteOpen}>
        <button
          className={`${styles.railButton} ${styles.organization}`}
          aria-label={`Business options: ${organization}`}
          title={organization}
          onClick={() => onMessage?.(`${organization} · ${organizationSubtitle}`)}
        >
          {businessLogo && <Image src={businessLogo} alt="" width={28} height={28} className={styles.brandLogo} />}
        </button>
        <button
          className={`${styles.railButton} ${styles.paletteTrigger}`}
          ref={trigger}
          aria-expanded={paletteOpen}
          aria-label="Open action palette"
          aria-haspopup="dialog"
          aria-keyshortcuts="Meta+K Control+K"
          title="Search or ask (⌘K)"
          onClick={openPalette}
        >
          <ShellIcon name="palette" size={60} />
        </button>
        {[
          ["Home", "Inbox"],
          ["Database", "Apps"],
        ].map((group, index) => (
          <nav className={styles.navGroup} aria-label={index === 0 ? "Basic options" : "Work options"} key={index}>
            {group.map((label) => (
              <button
                key={label}
                className={`${styles.railButton} ${current === label ? styles.navActive : ""}`}
                aria-label={label}
                title={label}
                aria-current={current === label ? "page" : undefined}
                onClick={() => onNavigate(label)}
              >
                <ShellIcon name={label.toLowerCase()} />
              </button>
            ))}
          </nav>
        ))}
      </div>
      <div className={styles.sidebarBottom} inert={paletteOpen}>
        <button
          className={styles.railButton}
          aria-label="Help"
          title="Help"
          onClick={() => onMessage?.("Help center is part of this preview")}
        >
          <ShellIcon name="help" />
        </button>
        <button
          className={styles.profile}
          aria-label={`User options: ${userName}`}
          title={`${userName} · ${userEmail}`}
          onClick={() => onMessage?.(`Signed in as ${userName}`)}
        >
          <Image src={userAvatar} alt="" width={30} height={30} className={styles.profileAvatar} />
        </button>
      </div>
      {paletteOpen && (
        <div
          className={styles.paletteOverlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
        >
          <div
            role="dialog"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                closePalette();
              }
              if (event.key === "Tab") {
                const controls = dialog.current?.querySelectorAll<HTMLElement>("input, button");
                if (!controls?.length) return;
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
            ref={dialog}
            className={styles.palette}
            aria-label="Action palette"
          >
            <div className={styles.paletteHeader}>
              <input
                aria-label="Search actions"
                placeholder="Search or ask…"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button aria-label="Close action palette" onClick={() => closePalette()}>
                Esc
              </button>
            </div>
            <div className={styles.paletteActions}>
              {actions
                .filter((label) => label.toLowerCase().includes(search.toLowerCase()))
                .map((label) => (
                  <button
                    key={label}
                    onClick={() => {
                      closePalette();
                      onNavigate(label);
                    }}
                  >
                    {label}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export function WorkspaceTopbar({
  title,
  section = title === "Home" || title === "Inbox" ? undefined : "Apps",
  menuOpen,
  onMenuToggle,
  onMessage,
}: {
  title: string;
  section?: string;
  icon: ReactNode;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMessage: (message: string) => void;
}) {
  return (
    <header className={styles.topbar}>
      <div>
        {section && (
          <>
            <span className={styles.breadcrumb}>{section}</span>
            <ShellIcon name="chevron" />
          </>
        )}
        {title}
      </div>
      <div className={styles.menuWrap}>
        <button aria-label="More options" aria-expanded={menuOpen} className={styles.iconButton} onClick={onMenuToggle}>
          <ShellIcon name="more" size={16} />
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
