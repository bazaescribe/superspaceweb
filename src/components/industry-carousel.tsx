"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import maritime from "../../public/assets/figma/industries/hero-desktop-transportation.png";
import agriculture from "../../public/assets/figma/industries/hero-desktop-agro.png";
import mining from "../../public/assets/figma/industries/hero-desktop-mining.png";
import people from "../../public/assets/figma/industries/hero-desktop-people.png";
import building from "../../public/assets/figma/industries/hero-desktop-building.png";
import hard from "../../public/assets/figma/industries/hero-desktop-hard.png";
import { PresentationPlayback, usePresentationPlayback } from "./presentation-playback";
import styles from "./industry-carousel.module.css";

const industries = [
  {
    image: "transportation",
    source: maritime,
    mobile: "/assets/figma/industries/hero-mobile-transportation.png",
    label: "For companies moving things",
    alt: "A container ship moving through turquoise water",
  },
  {
    image: "people",
    source: people,
    mobile: "/assets/figma/industries/hero-mobile-people.png",
    label: "For companies deploying people",
    alt: "A city viewed from above",
  },
  {
    image: "agro",
    source: agriculture,
    mobile: "/assets/figma/industries/hero-mobile-agro.png",
    label: "For companies growing things",
    alt: "Agricultural fields viewed from above",
  },
  {
    image: "building",
    source: building,
    mobile: "/assets/figma/industries/hero-mobile-building.png",
    label: "For companies building things",
    alt: "Building operations",
  },
  {
    image: "mining",
    source: mining,
    mobile: "/assets/figma/industries/hero-mobile-mining.png",
    label: "For companies digging through earth",
    alt: "An open-pit mining operation",
  },
  {
    image: "hard",
    source: hard,
    mobile: "/assets/figma/industries/hero-mobile-hard.png",
    label: "For companies doing hard things",
    alt: "Industrial operations",
  },
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
              <picture>
                <source
                  media="(max-width: 720px)"
                  srcSet={
                    getImageProps({ src: industry.mobile, alt: industry.alt, width: 840, height: 1370, sizes: "95vw" })
                      .props.srcSet
                  }
                  sizes="95vw"
                />
                <Image
                  src={industry.source}
                  alt={industry.alt}
                  fill
                  sizes="(max-width: 1352px) 95vw, 1280px"
                  loading={
                    index === 0
                      ? "eager"
                      : index === playback.active || index === (playback.active + 1) % industries.length
                        ? "eager"
                        : "lazy"
                  }
                  onLoad={() =>
                    setLoaded((current) => (current.includes(industry.image) ? current : [...current, industry.image]))
                  }
                  draggable={false}
                />
              </picture>
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
