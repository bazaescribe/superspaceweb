"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationState } from "@/lib/navigation";
import { SiteIcon } from "@/components/site-icon";
import { BookingLink } from "@/components/booking-link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { motion as motionTokens } from "@/lib/motion";
import { useHeaderTheme } from "@/components/header-theme";
import type { HeaderTone } from "@/lib/header-theme";

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

const navigation = [
  { href: "/platform", label: "Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/company", label: "Company" },
] as const;

export function NavigationLink({
  href,
  label,
  onClick,
  tone = "light",
}: {
  href: string;
  label: string;
  onClick?: () => void;
  tone?: HeaderTone;
}) {
  const pathname = usePathname();
  const state = navigationState(pathname, href);
  const active = Boolean(state);
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={state}
      className={`group inline-flex min-h-10 items-center gap-2 rounded-control px-3 py-2 text-sm no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        dark
          ? active
            ? "bg-white/12 text-inverse"
            : "text-inverse-muted hover:bg-white/8 hover:text-inverse active:bg-white/12"
          : active
            ? "bg-navigation text-foreground"
            : "text-muted hover:bg-navigation hover:text-foreground active:bg-subtle"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1 w-1 shrink-0 bg-current transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-50 group-focus-visible:opacity-100"}`}
      />
      {label}
    </Link>
  );
}

export function Header({ tone: toneOverride }: { tone?: HeaderTone } = {}) {
  const pathname = usePathname();
  const headerTheme = useHeaderTheme();
  const tone = toneOverride ?? headerTheme?.tone ?? "light";
  const dark = tone === "dark";
  const [open, setOpen] = useState(false);
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
  }, [pathname]);

  return (
    <header
      ref={headerTheme?.setHeaderElement}
      className={`header ${scrolled ? "header--scrolled" : ""} ${dark ? "header--dark" : ""}`}
      data-tone={tone}
    >
      <nav className="shell header__inner" aria-label="Primary navigation">
        <Link className="header__brand" href="/" aria-label="Superspace home">
          <Brand compactOnMobile inverse={dark} />
        </Link>
        <div className="desktop-nav gap-1">
          {navigation.map((link) => (
            <NavigationLink key={link.href} {...link} tone={tone} />
          ))}
        </div>
        <AnimatePresence initial={false}>
          {(heroPassed || pathname !== "/") && (
            <motion.div
              className="header__cta"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={motionTokens.fast}
            >
              <BookingLink inverse={dark} />
            </motion.div>
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
          <SiteIcon name={open ? "close" : "menu"} />
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-hidden={!open}>
        <div className="shell mobile-nav__inner">
          {navigation.map((link) => (
            <NavigationLink key={link.href} {...link} tone={tone} onClick={() => setOpen(false)} />
          ))}
          <BookingLink inverse={dark} className="justify-self-start text-label" />
        </div>
      </div>
    </header>
  );
}
