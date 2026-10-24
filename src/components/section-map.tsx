"use client";
import { useCopy } from "@/i18n/copy";

import { useEffect, useRef, useState } from "react";
import styles from "./company-story.module.css";

export function SectionMap({ sections }: { sections: { id: string; label: string }[] }) {
  const localizeCopy = useCopy();
  const [active, setActive] = useState(sections[0].id);
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = document.querySelector(".header")?.getBoundingClientRect().bottom ?? 64;
      const mobileMap = window.matchMedia("(max-width: 720px)").matches
        ? (navigation.current?.getBoundingClientRect().height ?? 0)
        : 0;
      const edge = header + mobileMap + 40;
      let current = sections[0].id;
      for (const { id } of sections)
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= edge) current = id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    const article = document.querySelector("article");
    if (article) observer.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);
  useEffect(() => {
    const nav = navigation.current;
    const item = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !item || !window.matchMedia("(max-width: 720px)").matches) return;
    nav.scrollTo({
      left: item.offsetLeft - (nav.clientWidth - item.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [active]);
  return (
    <nav ref={navigation} className={styles.map} aria-label={localizeCopy("On this page")}>
      {sections.map(({ id, label }) => (
        <a href={"#" + id} key={id} aria-current={active === id ? "location" : undefined}>
          {localizeCopy(label)}
        </a>
      ))}
    </nav>
  );
}
