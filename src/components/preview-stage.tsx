"use client";

import Image from "next/image";
import type { ReactNode, RefObject } from "react";
import styles from "./preview-stage.module.css";

export function PreviewStage({
  background,
  children,
  stageRef,
  entered,
  label,
  className = "",
  mobileCanvas = false,
}: {
  background: string;
  children: ReactNode;
  stageRef: RefObject<HTMLDivElement | null>;
  entered: boolean;
  label: string;
  className?: string;
  mobileCanvas?: boolean;
}) {
  return (
    <div
      ref={stageRef}
      className={`${styles.stage} ${mobileCanvas ? styles.scrollable : ""} ${className}`}
      data-entered={entered}
      role="group"
      aria-label={label}
    >
      <Image
        className={styles.background}
        src={`/assets/figma/backgrounds/${background}`}
        fill
        loading="eager"
        unoptimized={background.endsWith(".webp")}
        sizes="(max-width: 760px) 100vw, 1280px"
        alt=""
      />
      {mobileCanvas ? <div className={styles.canvas}>{children}</div> : children}
    </div>
  );
}
