"use client";
import { useCopy } from "@/i18n/copy";

import { useState, type ReactNode, type RefObject } from "react";
import { useInView } from "motion/react";
import backgrounds from "./preview-backgrounds.json";
import styles from "./preview-stage.module.css";

export function PreviewStage({
  background,
  children,
  stageRef,
  entered,
  label,
  className = "",
  mobileCanvas = false,
  tabIndex,
}: {
  background: string;
  children: ReactNode;
  stageRef: RefObject<HTMLDivElement | null>;
  entered: boolean;
  label: string;
  className?: string;
  mobileCanvas?: boolean;
  tabIndex?: number;
}) {
  const localizeCopy = useCopy();
  const nearViewport = useInView(stageRef, { once: true, margin: "500px 0px" });
  const [loadedSource, setLoadedSource] = useState("");
  const asset = backgrounds[background as keyof typeof backgrounds];
  const largest = asset.variants[asset.variants.length - 1];
  const loaded = loadedSource === largest.src;
  return (
    <div
      ref={stageRef}
      tabIndex={tabIndex}
      className={`${styles.stage} ${mobileCanvas ? styles.scrollable : ""} ${className}`}
      data-entered={entered}
      role="group"
      aria-label={localizeCopy(label)}
    >
      <div className={styles.backgroundLayer} aria-hidden="true" data-loaded={loaded}>
        <span className={styles.placeholder} style={{ backgroundImage: `url("${asset.blurDataURL}")` }} />
        {nearViewport && (
          // Delivery variants are pre-generated; the browser selects the appropriate resolution.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.background}
            src={largest.src}
            srcSet={asset.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ")}
            sizes="(max-width: 760px) 100vw, (max-width: 1352px) 95vw, 1280px"
            width={asset.width}
            height={asset.height}
            decoding="async"
            onLoad={() => setLoadedSource(largest.src)}
            alt=""
          />
        )}
      </div>
      {localizeCopy(mobileCanvas ? <div className={styles.canvas}>{localizeCopy(children)}</div> : children)}
    </div>
  );
}
