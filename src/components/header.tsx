"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { bookingUrl } from "@/lib/site";
import { motion as motionTokens } from "@/lib/motion";

const platformLinks = [
  ["Matrix", "#matrix"],
  ["Flow", "#flow"],
  ["Atlas", "#atlas"],
] as const;

export function Brand({
  large = false,
  inverse = false,
  compactOnMobile = false,
}: {
  large?: boolean;
  inverse?: boolean;
  compactOnMobile?: boolean;
}) {
  const variant = inverse ? "-inverse" : "";
  const className = ["brand", large && "brand--large", compactOnMobile && "brand--compact-mobile"]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className} aria-label="Superspace">
      <Image
        className="brand__full"
        src={`/brand/superspace-logo${variant}.svg`}
        alt=""
        aria-hidden="true"
        width={1713}
        height={293}
        priority={!large}
      />
      {compactOnMobile && (
        <Image
          className="brand__symbol"
          src={`/brand/superspace-symbol${variant}.svg`}
          alt=""
          aria-hidden="true"
          width={182}
          height={292}
          priority
        />
      )}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

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

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 0);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting && entry.boundingClientRect.bottom <= 62),
      { rootMargin: "-62px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const externalBooking = bookingUrl.startsWith("http");

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <nav className="shell header__inner" aria-label="Primary navigation">
        <a className="header__brand" href="#top" aria-label="Superspace home">
          <Brand compactOnMobile />
        </a>
        <div className="desktop-nav">
          <div
            className="nav-popover"
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
            onBlur={(event) => {
              if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget))
                setPlatformOpen(false);
            }}
          >
            <button
              className={`nav-link nav-link--button ${platformOpen ? "nav-link--open" : ""}`}
              type="button"
              aria-expanded={platformOpen}
              aria-controls="platform-navigation"
              onClick={() => setPlatformOpen((value) => !value)}
            >
              Platform <ChevronDown aria-hidden="true" size={14} strokeWidth={1.5} />
            </button>
            <AnimatePresence initial={false}>
              {platformOpen && (
                <motion.div
                  id="platform-navigation"
                  className="nav-popover__panel"
                  initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={motionTokens.fast}
                >
                  {platformLinks.map(([label, href]) => (
                    <a href={href} key={label} onClick={() => setPlatformOpen(false)}>
                      {label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="nav-link nav-link--muted" aria-label="Company, coming soon">
            Company
          </span>
          <span className="nav-link nav-link--muted" aria-label="Notes, coming soon">
            Notes
          </span>
        </div>
        <AnimatePresence initial={false}>
          {heroPassed && (
            <motion.a
              className="header__cta"
              href={bookingUrl}
              {...(externalBooking ? { target: "_blank", rel: "noreferrer" } : {})}
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={motionTokens.fast}
            >
              Build your company OS <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
            </motion.a>
          )}
        </AnimatePresence>
        <button
          className="menu-button"
          type="button"
          ref={buttonRef}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close" : "Open"} navigation</span>
          {open ? (
            <X aria-hidden="true" size={17} strokeWidth={1.5} />
          ) : (
            <Menu aria-hidden="true" size={17} strokeWidth={1.5} />
          )}
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-hidden={!open}>
        <div className="shell mobile-nav__inner">
          <span className="mobile-nav__label">Platform</span>
          {platformLinks.map(([label, href]) => (
            <a href={href} key={label} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <span>
            Company <em>Coming soon</em>
          </span>
          <span>
            Notes <em>Coming soon</em>
          </span>
        </div>
      </div>
    </header>
  );
}
