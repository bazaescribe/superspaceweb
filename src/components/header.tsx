"use client";

import { useEffect, useRef, useState } from "react";

const platformLinks = [
  ["Matrix", "#matrix"],
  ["Flow", "#flow"],
  ["Atlas", "#atlas"],
] as const;

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <span className={large ? "brand brand--large" : "brand"} aria-label="Superspace">
      <span aria-hidden="true" className="brand__glyph"><i /><i /><i /></span>
      <span>superspace</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="header">
      <nav className="shell header__inner" aria-label="Primary navigation">
        <a className="header__brand" href="#top" aria-label="Superspace home"><Brand /></a>
        <div className="desktop-nav">
          <div className="nav-popover">
            <button className="nav-link nav-link--button" type="button" aria-expanded="false">
              Platform <span aria-hidden="true">⌄</span>
            </button>
            <div className="nav-popover__panel">
              {platformLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
            </div>
          </div>
          <span className="nav-link nav-link--muted" aria-label="Company, coming soon">Company</span>
          <span className="nav-link nav-link--muted" aria-label="Notes, coming soon">Notes</span>
        </div>
        <button
          className="menu-button"
          type="button"
          ref={buttonRef}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close" : "Open"} navigation</span>
          <span /><span />
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-hidden={!open}>
        <div className="shell mobile-nav__inner">
          <span className="mobile-nav__label">Platform</span>
          {platformLinks.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>)}
          <span>Company <em>Coming soon</em></span>
          <span>Notes <em>Coming soon</em></span>
        </div>
      </div>
    </header>
  );
}
