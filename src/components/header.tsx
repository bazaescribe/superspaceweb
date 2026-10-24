"use client";
import { useCopy } from "@/i18n/copy";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { navigationState } from "@/lib/navigation";
import { BookingLink } from "@/components/booking-link";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type SetStateAction } from "react";
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
  const localizeCopy = useCopy();
  const variant = inverse ? "-inverse" : "";
  const className = ["brand", large && "brand--large", compactOnMobile && "brand--compact-mobile"]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className} aria-label={localizeCopy("Superspace")}>
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
          width={1376}
          height={240}
          priority
        />
      )}
    </span>
  );
}

const navigation = [
  { href: "/platform", label: "Platform" },
  { href: "/deployment", label: "Deployment" },
  { href: "/offering", label: "Offerings" },
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

function NavigationLink({ href, label }: { href: string; label: string }) {
  const localizeCopy = useCopy();
  const pathname = usePathname();
  return (
    <Link href={href} aria-current={navigationState(pathname, href)} className="header__nav-link">
      {localizeCopy(label)}
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
  const localizeCopy = useCopy();
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
        <span className="mobile-nav__link-label">{localizeCopy(label)}</span>
      </Link>
    </motion.div>
  );
}

const subscribeToHydration = () => () => {};
const clientHydrationSnapshot = () => true;
const serverHydrationSnapshot = () => false;

export function Header({ tone: toneOverride }: { tone?: HeaderTone } = {}) {
  const localizeCopy = useCopy();
  const pathname = usePathname();
  const usesHeroCtaTrigger = pathname === "/" || navigation.some(({ href }) => pathname === href);
  const headerTheme = useHeaderTheme();
  const tone = toneOverride ?? headerTheme?.tone ?? "dark";
  const dark = tone === "dark";
  const [menu, setMenu] = useState({ pathname, open: false, visible: false });
  // Reset route-owned state before rendering the destination, while retaining the exit animation.
  if (menu.pathname !== pathname) setMenu({ ...menu, pathname, open: false });
  const { open, visible: menuVisible } = menu;
  const setOpen = useCallback((next: SetStateAction<boolean>) => {
    setMenu((current) => {
      const open = typeof next === "function" ? next(current.open) : next;
      return { ...current, open, visible: open || current.visible };
    });
  }, []);
  const portalReady = useSyncExternalStore(subscribeToHydration, clientHydrationSnapshot, serverHydrationSnapshot);
  const [scrolled, setScrolled] = useState(false);
  const [heroActionsPassed, setHeroActionsPassed] = useState(false);
  const showCta = !usesHeroCtaTrigger || heroActionsPassed;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const chromeRef = useRef<HTMLElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const setThemeHeaderElement = headerTheme?.setHeaderElement;
  const setChromeElement = useCallback(
    (element: HTMLElement | null) => {
      chromeRef.current = element;
      setThemeHeaderElement?.(element);
    },
    [setThemeHeaderElement],
  );
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

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
  }, [setOpen]);

  const updateChromeMask = (latest: { clipPath?: unknown }) => {
    const match = String(latest.clipPath).match(/inset\(0(?:px)? 0(?:px)? ([\d.]+)% 0(?:px)?\)/);
    if (!match) return;
    const shade = shadeRef.current?.getBoundingClientRect();
    if (!shade) return;
    const edge = shade.top + shade.height * (1 - Number(match[1]) / 100);
    chromeRef.current?.querySelectorAll<HTMLElement>("[data-menu-mask]").forEach((element) => {
      const { top, height } = element.getBoundingClientRect();
      const covered = Math.max(0, Math.min(height, edge - top));
      element.style.clipPath =
        element.dataset.menuMask === "negative" ? `inset(0 0 ${height - covered}px 0)` : `inset(${covered}px 0 0 0)`;
    });
  };

  const closeMenu = () => setOpen(false);
  const menuOpenChrome = open || menuVisible;

  return (
    <header
      ref={setChromeElement}
      className={`header ${scrolled ? "header--scrolled" : ""} ${dark ? "header--dark" : ""} ${menuOpenChrome ? "header--menu-open" : ""}`}
      data-tone={tone}
      data-theme={tone}
    >
      <nav className="shell header__inner" aria-label={localizeCopy("Primary navigation")}>
        <Link className="header__brand" href="/" aria-label={localizeCopy("Superspace home")} onClick={closeMenu}>
          <span className="header__brand-tone" data-menu-mask="tone">
            <Brand compactOnMobile inverse={dark} />
          </span>
          <span className="header__brand-negative" data-menu-mask="negative" aria-hidden="true">
            <Brand compactOnMobile inverse />
          </span>
        </Link>
        <div className="desktop-nav">
          {navigation.map((link) => (
            <NavigationLink key={link.href} {...link} />
          ))}
        </div>
        <motion.div
          className="header__cta"
          initial={false}
          animate={{
            width: showCta ? "auto" : 0,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease: motionEase }}
          inert={!showCta}
          aria-hidden={!showCta}
        >
          <div className="header__cta-content">
            <BookingLink inverse={dark} placement="header_desktop" />
          </div>
        </motion.div>
        <button
          className={`menu-button ${open ? "menu-button--open" : ""}`}
          type="button"
          ref={buttonRef}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">
            {localizeCopy(open ? "Close" : "Open")} {localizeCopy(" navigation")}
          </span>
          <span className="menu-button__icon" aria-hidden="true">
            <span className="menu-button__glyph" data-menu-mask="tone">
              <HugeiconsIcon icon={open ? Cancel01Icon : Menu09Icon} size={22} strokeWidth={1.75} focusable="false" />
            </span>
            <span className="menu-button__glyph menu-button__glyph--negative" data-menu-mask="negative">
              <HugeiconsIcon icon={open ? Cancel01Icon : Menu09Icon} size={22} strokeWidth={1.75} focusable="false" />
            </span>
          </span>
        </button>
      </nav>
      {portalReady &&
        createPortal(
          <AnimatePresence>
            {showCta && !menuOpenChrome && (
              <motion.div
                className="mobile-floating-cta"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                transition={reduceMotion ? { duration: 0 } : motionTokens.standard}
              >
                <BookingLink placement="mobile_floating" designIcon />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      {portalReady &&
        createPortal(
          <AnimatePresence onExitComplete={() => setMenu((current) => ({ ...current, visible: current.open }))}>
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
                  ref={shadeRef}
                  className="mobile-nav__shade"
                  variants={shadeVariants}
                  onUpdate={updateChromeMask}
                  transition={reduceMotion ? { duration: 0 } : shadeTransition}
                  aria-hidden="true"
                />
                <div className="shell mobile-nav__inner">
                  <motion.div className="mobile-nav__content" variants={reduceMotion ? undefined : linksVariants}>
                    {mobileNavigation.map((link) => (
                      <MobileNavLink key={link.href} {...link} reduceMotion={reduceMotion} onClick={closeMenu} />
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
