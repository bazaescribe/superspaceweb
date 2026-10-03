"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { BubbleChatQuestionIcon, Download04Icon, Building03Icon, Call02Icon } from "@hugeicons/core-free-icons";
import { bookingUrl } from "@/lib/site";
import { track } from "@/lib/analytics";
import { SystemSection } from "./section-system";
import { RevealTitle } from "./reveal-title";
import styles from "./quick-actions.module.css";

const actions = [
  { label: "FAQ", href: "/faq", icon: BubbleChatQuestionIcon },
  { label: "Download the brochure", href: undefined, icon: Download04Icon, download: true },
  { label: "About us", href: "/company", icon: Building03Icon },
  { label: "Book a call", href: bookingUrl, icon: Call02Icon, booking: true },
];

export function QuickActions() {
  return (
    <SystemSection
      variant="custom"
      className={styles.section}
      header={
        <header className="system-section__header">
          <RevealTitle id="quick-actions-title">Want to learn more?</RevealTitle>
        </header>
      }
    >
      <nav className={styles.tiles} aria-labelledby="quick-actions-title">
        {actions.map((action) => {
          const content = (
            <>
              <HugeiconsIcon icon={action.icon} size={24} strokeWidth={1.5} aria-hidden="true" focusable="false" />
              <span>{action.label}</span>
            </>
          );
          if (!action.href)
            return (
              <span
                key={action.label}
                className={`${styles.tile} ${styles.unavailable}`}
                aria-disabled="true"
                title="Brochure coming soon"
              >
                {content}
              </span>
            );
          return (
            <Link
              key={action.label}
              className={styles.tile}
              href={action.href}
              download={action.download || undefined}
              {...(action.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              onClick={
                action.booking
                  ? () =>
                      track({
                        name: "cta_clicked",
                        cta: "talk_to_us",
                        destination: bookingUrl,
                        placement: "home_quick_actions",
                      })
                  : undefined
              }
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </SystemSection>
  );
}
