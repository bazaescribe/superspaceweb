"use client";

import { useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { PresentationPlayback, usePresentationPlayback } from "./presentation-playback";
import styles from "./key-features.module.css";
import layouts from "./feature-bento.module.css";

export type BentoCard = {
  title: string;
  description: string;
  visual?: ReactNode;
  wide?: boolean;
  tall?: boolean;
  dark?: boolean;
  column?: number;
  row?: number;
  duration?: number;
};

function subscribeMobile(onChange: () => void) {
  const media = window.matchMedia("(max-width: 719px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
function getMobile() {
  return window.matchMedia("(max-width: 719px)").matches;
}
function getServerMobile() {
  return false;
}

export function FeatureBento({
  items,
  layout = "standard",
  mobileOrder,
  name,
  tabletOrder,
}: {
  items: readonly BentoCard[];
  layout?: "standard" | "split";
  mobileOrder?: readonly number[];
  name: string;
  tabletOrder?: readonly number[];
}) {
  const mobile = useSyncExternalStore(subscribeMobile, getMobile, getServerMobile);
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = mobile && mobileOrder ? mobileOrder.map((index) => items[index]) : items;
  const playback = usePresentationPlayback(
    items.length,
    containerRef,
    6500,
    mobile,
    cards.map((card) => card.duration),
  );
  const press = useRef<{ x: number; y: number } | null>(null);
  return (
    <div
      ref={containerRef}
      {...playback.focusProps}
      role={mobile ? "region" : undefined}
      aria-roledescription={mobile ? "carousel" : undefined}
      aria-label={mobile ? name : undefined}
    >
      <div className={styles.carousel}>
        <div className={styles.container}>
          <div
            className={`${styles.grid} ${layouts[layout]} ${tabletOrder ? styles.tabletGrid : ""}`}
            style={{ "--feature-active": playback.active } as CSSProperties}
            onPointerDown={(event) => {
              if (!mobile) return;
              press.current = { x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={(event) => {
              if (!press.current) return;
              const dx = event.clientX - press.current.x;
              const dy = event.clientY - press.current.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
                playback.select(playback.active + (dx < 0 ? 1 : -1));
              press.current = null;
            }}
            onPointerCancel={() => {
              press.current = null;
            }}
          >
            {cards.map((card, index) => (
              <article
                key={card.title}
                data-preview-playing={mobile ? playback.running : undefined}
                className={`${styles.card} ${card.wide ? styles.wide : ""} ${card.tall ? layouts.tall : ""} ${card.dark ? styles.dark : ""}`}
                style={
                  {
                    "--bento-column": card.column,
                    "--bento-row": card.row,
                    "--tablet-order": tabletOrder?.indexOf(items.indexOf(card)),
                    "--tablet-span": tabletOrder && items.indexOf(card) === 0 ? 2 : 1,
                  } as CSSProperties
                }
                aria-hidden={mobile ? index !== playback.active : undefined}
              >
                <div className={styles.copy}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className={styles.visual}>{card.visual}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.playback}>
        <PresentationPlayback labels={cards.map((card) => card.title)} playback={playback} name={name} />
      </div>
    </div>
  );
}
