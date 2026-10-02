"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { offerings, type Offering } from "@/lib/offerings";
import { Reveal } from "@/components/reveal";
import { BookingLink } from "@/components/booking-link";
import styles from "./offerings-catalog.module.css";

export function OfferingsCatalog() {
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
                    src="/assets/offering-placeholder.svg"
                    alt=""
                    width={800}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.copy}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
        {selected && (
          <>
            <div className={styles.modalHeader}>
              <span>Superspace offerings</span>
              <button type="button" autoFocus aria-label="Close offering details" onClick={close}>
                ×
              </button>
            </div>
            <div className={styles.modalIntro}>
              <div>
                <p className={styles.eyebrow}>An operation we can model around</p>
                <h2 id="offering-dialog-title">{selected.title}</h2>
                <p id="offering-dialog-intro">{selected.description}</p>
              </div>
              <Image src="/assets/offering-placeholder.svg" alt="" width={800} height={500} />
            </div>
            <div className={styles.details}>
              <div>
                <span>01 / The problem</span>
                <h3>When the work is connected, but the tools aren’t.</h3>
                <p>{selected.problem}</p>
              </div>
              <div>
                <span>02 / The fit</span>
                <h3>One shared view of the operation.</h3>
                <p>{selected.fit}</p>
              </div>
            </div>
            <div className={styles.workflow}>
              <h3>An example workflow</h3>
              <ol>
                {selected.workflow.map((step, index) => (
                  <li key={step}>
                    <span>0{index + 1}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.modalFooter}>
              <p>
                Your workflows, configured on the shared Superspace platform. We define the scope together through
                discovery.
              </p>
              <BookingLink placement={`offering_${selected.id}`} label="Talk about this operation" designIcon />
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
