"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationState } from "@/lib/navigation";
import { BookingLink } from "@/components/booking-link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu09Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { motion as motionTokens, motionEase } from "@/lib/motion";
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
        width={1376}
        height={240}
        priority={!large}
      />
      {compactOnMobile && (
        <Image
          className="brand__symbol"
          src={`/brand/superspace-logo${variant}.svg`}
          alt=""
          aria-hidden="true"
          width={14.375}
          height={22}
          priority
        />
      )}
    </span>
  );
}

const navigation = [
  { href: "/platform", label: "Platform" },
  { href: "/offering", label: "Offerings" },
  { href: "/deployment", label: "Deployment" },
] as const;

const mobileNavigation = [{ href: "/", label: "Home" }, ...navigation] as const;

const shadeTransition = { duration: 0.48, ease: motionEase };

const menuVariants = {
  closed: {},
  open: {},
} as const;

const shadeVariants = {
  closed: { clipPath: "inset(0 0 100% 0)" },
  open: { clipPath: "inset(0 0 0% 0)" },
} as const;

const linkVariants = {
  closed: {
    opacity: 0,
    y: 28,
    transition: { duration: 0.2, ease: motionEase },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: motionEase },
  },
} as const;

const reducedLinkVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0 } },
} as const;

const linksVariants = {
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
  open: {
    transition: { staggerChildren: 0.075, delayChildren: 0.32 },
  },
} as const;

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
      className={`inline-flex min-h-10 items-center px-3 py-2 text-sm no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-content ${
        dark
          ? active
            ? "text-content"
            : "text-content/40 hover:text-content focus-visible:text-content"
          : active
            ? "text-foreground"
            : "text-foreground/40 hover:text-foreground focus-visible:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
  reduceMotion,
}: {
  href: string;
  label: string;
  onClick: () => void;
  reduceMotion: boolean | null;
}) {
  const pathname = usePathname();
  const state = navigationState(pathname, href);
  const active = Boolean(state);

  return (
    <motion.div className="mobile-nav__item" variants={reduceMotion ? reducedLinkVariants : linkVariants}>
      <Link
        href={href}
        onClick={onClick}
        aria-current={state}
        className={`mobile-nav__link ${active ? "mobile-nav__link--active" : ""}`}
      >
        <span className="mobile-nav__link-label">{label}</span>
      </Link>
    </motion.div>
  );
}

export function Header({ tone: toneOverride }: { tone?: HeaderTone } = {}) {
  const pathname = usePathname();
  const headerTheme = useHeaderTheme();
  const tone = toneOverride ?? headerTheme?.tone ?? "light";
  const dark = tone === "dark";
  const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroActionsPassed, setHeroActionsPassed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 0);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const heroActions = document.querySelector(".hero-actions");
    if (!heroActions) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroActionsPassed(!entry.isIntersecting && entry.boundingClientRect.bottom <= 64),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(heroActions);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) setMenuVisible(true);
  }, [open]);

  useEffect(() => {
    if (!menuVisible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuVisible]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setOpen(false);
  const menuOpenChrome = open || menuVisible;

  return (
    <header
      ref={headerTheme?.setHeaderElement}
      className={`header ${scrolled ? "header--scrolled" : ""} ${dark ? "header--dark" : ""} ${menuOpenChrome ? "header--menu-open" : ""}`}
      data-tone={tone}
      data-theme={tone}
    >
      <nav className="shell header__inner" aria-label="Primary navigation">
        <Link className="header__brand" href="/" aria-label="Superspace home" onClick={closeMenu}>
          <span className="header__brand-tone">
            <Brand compactOnMobile inverse={dark} />
          </span>
          <span className="header__brand-negative" aria-hidden="true">
            <Brand compactOnMobile inverse />
          </span>
        </Link>
        <div className="desktop-nav gap-1">
          {navigation.map((link) => (
            <NavigationLink key={link.href} {...link} tone={tone} />
          ))}
        </div>
        <AnimatePresence initial={false}>
          {(heroActionsPassed || pathname !== "/") && (
            <motion.div
              className="header__cta"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={motionTokens.fast}
            >
              <BookingLink inverse={dark} placement="header_desktop" />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className={`menu-button ${open ? "menu-button--open" : ""}`}
          type="button"
          ref={buttonRef}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close" : "Open"} navigation</span>
          <span className="menu-button__icon" aria-hidden="true">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "close" : "menu"}
                className="menu-button__glyph"
                initial={reduceMotion ? false : { opacity: 0, rotate: open ? -45 : 45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: open ? 45 : -45, scale: 0.7 }}
                transition={motionTokens.fast}
              >
                <HugeiconsIcon
                  icon={open ? Cancel01Icon : Menu09Icon}
                  size={22}
                  strokeWidth={1.75}
                  focusable="false"
                />
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
      </nav>
      {portalReady &&
        createPortal(
          <AnimatePresence onExitComplete={() => setMenuVisible(false)}>
            {open && (
              <motion.div
                id="mobile-navigation"
                className="mobile-nav"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.div
                  className="mobile-nav__shade"
                  variants={shadeVariants}
                  transition={reduceMotion ? { duration: 0 } : shadeTransition}
                  aria-hidden="true"
                />
                <div className="shell mobile-nav__inner">
                  <motion.div
                    className="mobile-nav__content"
                    variants={reduceMotion ? undefined : linksVariants}
                  >
                    {mobileNavigation.map((link) => (
                      <MobileNavLink
                        key={link.href}
                        {...link}
                        reduceMotion={reduceMotion}
                        onClick={closeMenu}
                      />
                    ))}
                    <motion.div
                      className="mobile-nav__cta"
                      variants={reduceMotion ? reducedLinkVariants : linkVariants}
                    >
                      <BookingLink inverse className="mobile-nav__booking" placement="header_mobile" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
