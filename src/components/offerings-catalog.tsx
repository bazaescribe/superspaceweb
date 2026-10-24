"use client";
import { useCopy } from "@/i18n/copy";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { offerings, type Offering } from "@/lib/offerings";
import { Reveal } from "@/components/reveal";
import { OfferingWorkflow } from "./offering-workflow";
import { BookingLink } from "@/components/booking-link";
import styles from "./offerings-catalog.module.css";

export function OfferingsCatalog() {
  const localizeCopy = useCopy();
  const [selected, setSelected] = useState<Offering | null>(null);
  const [closing, setClosing] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const sync = () => setSelected(offerings.find((item) => `#${item.id}` === window.location.hash) ?? null);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!selected) {
      if (element.open) element.close();
      return;
    }
    if (!element.open) element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  useEffect(() => {
    if (!closing) return;
    const timeout = window.setTimeout(
      () => {
        setSelected(null);
        setClosing(false);
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450,
    );
    return () => window.clearTimeout(timeout);
  }, [closing]);

  const close = () => {
    if (offerings.some((item) => `#${item.id}` === window.location.hash)) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setClosing(true);
  };

  const open = (item: Offering) => {
    window.history.pushState(null, "", `#${item.id}`);
    setClosing(false);
    setSelected(item);
  };

  return (
    <>
      <div className={styles.grid}>
        {offerings.map((item) => (
          <Reveal key={item.id} className={styles.cell}>
            <article>
              <a
                className={styles.card}
                href={`#${item.id}`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  event.preventDefault();
                  open(item);
                }}
              >
                <div className={styles.image}>
                  <Image
                    src={item.image}
                    alt=""
                    width={800}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.copy}>
                  <h3>{localizeCopy(item.title)}</h3>
                  <p>{localizeCopy(item.description)}</p>
                </div>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={`${styles.dialog} ${closing ? styles.closing : ""}`}
        aria-labelledby="offering-dialog-title"
        aria-describedby="offering-dialog-intro"
        onClose={() => {
          setSelected(null);
          setClosing(false);
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onAnimationEnd={(event) => {
          if (closing && event.target === event.currentTarget) {
            setSelected(null);
            setClosing(false);
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }}
      >
        {selected && <OfferingDetails key={selected.id} offering={selected} onClose={close} />}
      </dialog>
    </>
  );
}

const tabs = ["Our approach", "Illustrative workflow", "Built-in features"] as const;

function OfferingDetails({ offering, onClose }: { offering: Offering; onClose: () => void }) {
  const localizeCopy = useCopy();
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <>
      <div className={styles.modalHero}>
        <Image src={offering.image} alt="" loading="eager" fill sizes="(max-width: 760px) 100vw, 720px" />
        <button
          className={styles.closeButton}
          type="button"
          autoFocus
          aria-label={localizeCopy("Close offering details")}
          onClick={onClose}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div className={styles.heroOverlay}>
          <div>
            <h2 id="offering-dialog-title">{localizeCopy(offering.title)}</h2>
            <p id="offering-dialog-intro">{localizeCopy(offering.description)}</p>
          </div>
          <BookingLink placement={`offering_${offering.id}`} label={localizeCopy("Talk about this solution")} inverse />
        </div>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.tabs} role="tablist" aria-label={localizeCopy("Offering details")}>
          {tabs.map((label, index) => (
            <button
              key={label}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`offering-tab-${index}`}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`offering-panel-${index}`}
              tabIndex={activeTab === index ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
                else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                else return;
                event.preventDefault();
                setActiveTab(next);
                tabRefs.current[next]?.focus();
              }}
            >
              {localizeCopy(label)}
            </button>
          ))}
        </div>
        {tabs.map((_, index) => (
          <div
            key={index}
            role="tabpanel"
            id={`offering-panel-${index}`}
            aria-labelledby={`offering-tab-${index}`}
            hidden={activeTab !== index}
            tabIndex={0}
            className={styles.tabPanel}
          >
            {activeTab === index &&
              (index === 0 ? (
                <div className={styles.approach}>
                  <section>
                    <h3>{localizeCopy("When the work is connected, but the tools aren’t.")}</h3>
                    <p>{localizeCopy(offering.problem)}</p>
                  </section>
                  <section>
                    <h3>{localizeCopy("What we could configure")}</h3>
                    <ul>
                      {offering.capabilities.map((capability) => (
                        <li key={capability}>{localizeCopy(capability)}</li>
                      ))}
                    </ul>
                  </section>
                  <p className={styles.scopeNote}>
                    {localizeCopy(
                      "Discovery establishes your requirements, confirms platform fit, and defines the scope of your deployment.",
                    )}
                  </p>
                </div>
              ) : index === 1 ? (
                <OfferingWorkflow steps={offering.workflow} />
              ) : (
                <div className={styles.features}>
                  <p>
                    {localizeCopy("Shared platform features, configured around the needs of ")}
                    {localizeCopy(offering.title.toLowerCase())}
                    {"."}
                  </p>
                  <dl>
                    {offering.features.map((feature) => (
                      <div key={feature.title}>
                        <dt>{localizeCopy(feature.title)}</dt>
                        <dd>{localizeCopy(feature.description)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
