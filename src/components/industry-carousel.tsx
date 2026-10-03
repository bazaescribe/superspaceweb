"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import maritime from "../../public/assets/figma/industries/maritime.png";
import agriculture from "../../public/assets/figma/industries/agriculture.png";
import mining from "../../public/assets/figma/industries/mining.png";
import people from "../../public/assets/figma/industries/people.png";
import { PresentationPlayback, usePresentationPlayback } from "./presentation-playback";
import styles from "./industry-carousel.module.css";

const industries = [
  {
    image: "maritime",
    source: maritime,
    label: "Superspace for maritime transportation",
    alt: "A container ship moving through turquoise water",
  },
  {
    image: "agriculture",
    source: agriculture,
    label: "Superspace for agro industries",
    alt: "Agricultural fields viewed from above",
  },
  { image: "mining", source: mining, label: "Superspace for mining", alt: "An open-pit mining operation" },
  { image: "people", source: people, label: "Urban People Operations", alt: "A city viewed from above" },
];

export function IndustryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playback = usePresentationPlayback(industries.length, containerRef);
  const [loaded, setLoaded] = useState<string[]>([]);
  const press = useRef<{ x: number; y: number } | null>(null);
  return (
    <div
      className={styles.carousel}
      ref={containerRef}
      {...playback.focusProps}
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries"
    >
      <div className={styles.container}>
        <div
          className={styles.track}
          style={{ transform: `translateX(calc(${playback.active * -100}% - ${playback.active * 32}px))` }}
          onPointerDown={(event) => {
            press.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={(event) => {
            if (!press.current) return;
            const dx = event.clientX - press.current.x;
            const dy = event.clientY - press.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) playback.select(playback.active + (dx < 0 ? 1 : -1));
            press.current = null;
          }}
          onPointerCancel={() => {
            press.current = null;
          }}
        >
          {industries.map((industry, index) => (
            <div
              className={styles.slide}
              data-loaded={loaded.includes(industry.image)}
              key={industry.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${industries.length}: ${industry.label}`}
              aria-hidden={index !== playback.active}
            >
              <span
                className={styles.preview}
                aria-hidden="true"
                style={{ backgroundImage: `url("${industry.source.blurDataURL}")` }}
              />
              <Image
                src={industry.source}
                alt={industry.alt}
                fill
                sizes="(max-width: 720px) 230vw, (max-width: 1352px) 95vw, 1280px"
                preload={index === 0}
                loading={
                  index === 0
                    ? undefined
                    : index === playback.active || index === (playback.active + 1) % industries.length
                      ? "eager"
                      : "lazy"
                }
                onLoad={() =>
                  setLoaded((current) => (current.includes(industry.image) ? current : [...current, industry.image]))
                }
                draggable={false}
              />
              <div className={styles.caption}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/figma/industries/brand.svg" alt="" />
                <span>{industry.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <PresentationPlayback labels={industries.map((item) => item.label)} playback={playback} name="Industries" />
          <Link href="/offering">View Offerings</Link>
        </div>
      </div>
    </div>
  );
}
