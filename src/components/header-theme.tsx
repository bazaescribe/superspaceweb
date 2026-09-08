"use client";

import {
  createContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { intersectsHeaderEdge, type HeaderTone } from "@/lib/header-theme";

type HeaderThemeContextValue = {
  tone: HeaderTone;
  registerRegion: (element: HTMLElement, tone: HeaderTone) => () => void;
  setHeaderElement: (element: HTMLElement | null) => void;
};

const HeaderThemeContext = createContext<HeaderThemeContextValue | null>(null);

export function HeaderThemeProvider({
  children,
  defaultTone = "light",
}: {
  children: ReactNode;
  defaultTone?: HeaderTone;
}) {
  const regions = useRef(new Map<HTMLElement, HeaderTone>());
  const headerElement = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const [tone, setTone] = useState<HeaderTone>(defaultTone);

  const updateTone = useCallback(() => {
    frame.current = null;
    const headerBottom = headerElement.current?.getBoundingClientRect().bottom ?? 0;
    let nextTone = defaultTone;

    for (const [element, regionTone] of regions.current) {
      if (intersectsHeaderEdge(element.getBoundingClientRect(), headerBottom)) {
        nextTone = regionTone;
      }
    }

    setTone((currentTone) => (currentTone === nextTone ? currentTone : nextTone));
  }, [defaultTone]);

  const scheduleUpdate = useCallback(() => {
    if (frame.current === null) {
      frame.current = window.requestAnimationFrame(updateTone);
    }
  }, [updateTone]);

  const registerRegion = useCallback(
    (element: HTMLElement, regionTone: HeaderTone) => {
      regions.current.set(element, regionTone);
      scheduleUpdate();

      return () => {
        regions.current.delete(element);
        scheduleUpdate();
      };
    },
    [scheduleUpdate],
  );

  const setHeaderElement = useCallback(
    (element: HTMLElement | null) => {
      headerElement.current = element;
      scheduleUpdate();
    },
    [scheduleUpdate],
  );

  useEffect(() => {
    const header = headerElement.current;
    const resizeObserver = header ? new ResizeObserver(scheduleUpdate) : null;
    if (header) resizeObserver?.observe(header);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, [scheduleUpdate]);

  const value = useMemo(() => ({ tone, registerRegion, setHeaderElement }), [registerRegion, setHeaderElement, tone]);

  return <HeaderThemeContext.Provider value={value}>{children}</HeaderThemeContext.Provider>;
}

export function HeaderThemeScope({
  children,
  defaultTone = "light",
  ...props
}: ComponentPropsWithoutRef<"div"> & { defaultTone?: HeaderTone }) {
  return (
    <HeaderThemeProvider defaultTone={defaultTone}>
      <div {...props}>{children}</div>
    </HeaderThemeProvider>
  );
}

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}

export function HeaderThemeRegion({
  tone,
  children,
  ...props
}: ComponentPropsWithoutRef<"section"> & { tone: HeaderTone }) {
  const context = useHeaderTheme();
  const registerRegion = context?.registerRegion;
  const element = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!registerRegion || !element.current) return;
    return registerRegion(element.current, tone);
  }, [registerRegion, tone]);

  return (
    <section ref={element} {...props}>
      {children}
    </section>
  );
}
