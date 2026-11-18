"use client";
import { useCopy } from "@/i18n/copy";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  PreviewPanel,
  PreviewTitle,
  PreviewField,
  PreviewTag,
  PreviewPerson,
  PreviewSwitch,
  PreviewIcon,
  PreviewRow,
  PreviewFile,
  PreviewSpinner,
} from "./preview-ui";
import styles from "./feature-previews.module.css";

const calendar = <Image src="/assets/figma/workflows/calendar.svg" width={12} height={12} alt="" />;
const darkCalendar = <PreviewIcon file="ef858" size={12} />;
export function PermissionsMockup({ platform = false }: { platform?: boolean } = {}) {
  const localizeCopy = useCopy();
  return (
    <div className={styles.viewport} aria-hidden="true">
      <PreviewPanel theme={platform ? "light" : "dark"} className={`${styles.record} ${styles.permissions}`}>
        <div className={styles.portrait}>
          <Image src="/assets/figma/key-features/fa3d3.png" alt="" width={378} height={212} />
          <div className={styles.identity}>
            <div>
              <strong>{localizeCopy("Sam Olguín")}</strong>
              <p>{localizeCopy("Finance Lead")}</p>
            </div>
            <PreviewTag>{localizeCopy("Manager")}</PreviewTag>
            <PreviewTag tone="green">{localizeCopy("Active")}</PreviewTag>
          </div>
        </div>
        <div className={styles.body}>
          <PreviewField label={localizeCopy("Groups")}>
            <div className={styles.tags}>
              <PreviewTag>{localizeCopy("Finances")}</PreviewTag>
              <PreviewTag>{localizeCopy("Support")}</PreviewTag>
              <PreviewTag>
                <PreviewIcon file="03da9" size={12} />
              </PreviewTag>
            </div>
          </PreviewField>
          <PreviewField label={localizeCopy("Effective permissions")}>
            {[
              ["Manage people", "Invite, edit and remove members."],
              ["View Audit Log", "Read org-wide activity."],
              ["Manage Billing", "Payment methods and invoices."],
            ].map(([title, detail], i) => (
              <div className={styles.permission} key={title}>
                <div>
                  {localizeCopy(title)}
                  <p>{localizeCopy(detail)}</p>
                </div>
                <PreviewSwitch enabled={i === 0} />
              </div>
            ))}
          </PreviewField>
        </div>
      </PreviewPanel>
      {!platform && <div className={styles.darkFade} />}
    </div>
  );
}
const events = [
  ["cfc20", "Request placed.", "8:23 AM"],
  ["cfc20", "Courier assigned.", "8:24 AM"],
  ["cfc20", "Courier arrived at pickup.", "8:33 AM"],
  ["99554", "Courier is heading to delivery destination", "8:35 AM"],
  ["6780e", "Delivery rerouted due to heavy transit", "8:57 AM"],
  ["cfc20", "Courier arrived at delivery destination.", "9:29 AM"],
  ["99554", "Recipient contacted through phone", "9:30 AM"],
  ["cfc20", "Delivered to recipient.", "9:33 AM"],
  ["99554", "Service Closed Successfully", "9:33 AM"],
];
export function ActivityMockup({ delivered = false }: { delivered?: boolean } = {}) {
  const localizeCopy = useCopy();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className={styles.viewport} aria-hidden="true">
      <PreviewPanel theme={delivered ? "light" : "dark"} className={styles.record}>
        <div className={styles.body}>
          <PreviewTitle label={localizeCopy("F91W")}>{localizeCopy("Service History")}</PreviewTitle>
          <div className={styles.fields}>
            <PreviewField inline label={localizeCopy("Time")}>
              <PreviewTag>
                {localizeCopy(delivered ? calendar : darkCalendar)}
                {localizeCopy("October 3, 8:23 AM")}
              </PreviewTag>
            </PreviewField>
            <PreviewField inline label={localizeCopy("Status")}>
              <PreviewTag tone="green">{localizeCopy("Delivered")}</PreviewTag>
            </PreviewField>
            <PreviewField inline label={localizeCopy("Courier")}>
              <PreviewPerson initials="MG" name="Miguel Luis Galvan" color="#fe9a00" />
            </PreviewField>
          </div>
          <PreviewField label={localizeCopy("Recorded Events")}>
            <div className={styles.timeline}>
              {events.map(([icon, text, time], i) => (
                <motion.div
                  className={styles.event}
                  key={text}
                  initial={false}
                  animate={{ opacity: reduced || visible ? 1 : 0, y: reduced || visible ? 0 : 8 }}
                  transition={{ duration: reduced ? 0 : 0.3, delay: reduced || !visible ? 0 : i * 0.08 }}
                >
                  <PreviewRow
                    leading={<PreviewIcon file={icon} />}
                    trailing={<time className={styles.eventTime}>{localizeCopy(time)}</time>}
                  >
                    {localizeCopy(text)}
                  </PreviewRow>
                  {i < events.length - 1 && (
                    <Image
                      className={styles.connector}
                      src="/assets/figma/features-iteration/0bb6c.svg"
                      width={20}
                      height={10}
                      alt=""
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </PreviewField>
        </div>
      </PreviewPanel>
      {!delivered && <div className={styles.darkFade} />}
    </div>
  );
}
export function ContextMockup({ dark = false }: { dark?: boolean } = {}) {
  const localizeCopy = useCopy();
  return (
    <div className={styles.viewport} aria-hidden="true">
      <PreviewPanel theme={dark ? "dark" : "light"} className={styles.record}>
        <div className={`${styles.body} ${styles.context}`}>
          <PreviewTitle label={localizeCopy("GMWB5000")}>{localizeCopy("Delivery Details")}</PreviewTitle>
          <p className={styles.address}>
            {localizeCopy("Montecito 301, Int. 2, Nápoles, Benito Juárez, Ciudad de México.")}
          </p>
          <div className={styles.fields}>
            <PreviewField inline label={localizeCopy("Time")}>
              <PreviewTag>
                {localizeCopy(dark ? darkCalendar : calendar)}
                {localizeCopy("May 29, 11:33 AM")}
              </PreviewTag>
            </PreviewField>
            <PreviewField inline label={localizeCopy("Status")}>
              <PreviewTag tone="green">{localizeCopy("Delivered")}</PreviewTag>
              <PreviewTag tone="green">{localizeCopy("On time")}</PreviewTag>
            </PreviewField>
            <PreviewField inline label={localizeCopy("Courier")}>
              <PreviewPerson initials="RV" name="Ramiro Velazquez" color="#f69dcc" />
            </PreviewField>
          </div>
          <PreviewField label={localizeCopy("Attachments")}>
            <div>
              {[
                ["65182", "Packing List - GMWB5000.xlsx", "1.4MB"],
                ["61f54", "Delivery Receipt - GMWB5000.pdf", "128KB"],
                ["0d528", "Delivery Photo Evidence - GMWB5000.jpg", "1.4MB"],
              ].map(([file, name, size]) => (
                <PreviewFile
                  key={name}
                  image={`/assets/figma/features-iteration/${file}.png`}
                  name={name}
                  size={size}
                />
              ))}
            </div>
          </PreviewField>
          <PreviewField label={localizeCopy("Comments")}>
            <div className={styles.tags}>
              <PreviewPerson initials="RV" name="Ramiro Velazquez" color="#f69dcc" />
              <PreviewTag>{localizeCopy("9:32 AM")}</PreviewTag>
            </div>
            <p className={styles.comment}>
              {localizeCopy("Delivered all 6 boxes to reception. Signed receipt attached.")}
            </p>
          </PreviewField>
        </div>
      </PreviewPanel>
      <div className={dark ? styles.darkFade : styles.lightFade} />
    </div>
  );
}
const products = ["Philodendron Gloriosum.", "Monstera Deliciosa Thai Constellation.", "Ceramic 15 cm. Plant Pot x 2."];
const steps = [
  "Reviewing current stock",
  "Analyzing product history.",
  "Modeling sales projection.",
  "Purchase order sent",
];
const cycleDuration = 13700;
export function AutomationsMockup({ compact = false }: { compact?: boolean } = {}) {
  const localizeCopy = useCopy();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!visible || reduced) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = now - last;
      last = now;
      if (
        !document.hidden &&
        ref.current?.closest("article")?.getAttribute("aria-hidden") !== "true" &&
        ref.current?.closest("article")?.getAttribute("data-preview-playing") !== "false"
      )
        setElapsed((value) => (value + delta) % cycleDuration);
    }, 100);
    return () => window.clearInterval(timer);
  }, [visible, reduced]);
  // All searches start together; the missing product resolves last at 2.6s.
  // Restock begins one second later, completes at 7.6s, and reports at 8.6s.
  const stage = reduced ? 2 : elapsed < 3600 ? 0 : elapsed < 8600 ? 1 : 2;
  return (
    <div ref={ref} className={`${styles.viewport} ${styles.automation}`} data-compact={compact} aria-hidden="true">
      {(compact ? [0, 1] : [stage]).map((displayStage, index) => (
        <AnimatePresence key={index} mode="wait" initial={false}>
          <motion.div
            key={displayStage}
            className={styles.automationCard}
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <PreviewPanel theme="dark">
              <div className={`${styles.body} ${styles.automationBody}`}>
                {localizeCopy(
                  displayStage === 0 ? (
                    <>
                      <PreviewTitle subtitle="Now">{localizeCopy("New Order Received #78234")}</PreviewTitle>
                      <PreviewField label={localizeCopy("Checking Stock Availability")}>
                        <div className={styles.rows}>
                          {products.map((product, i) => {
                            const complete = reduced || elapsed >= [1400, 2000, 2600][i];
                            return (
                              <PreviewRow
                                key={product}
                                leading={
                                  complete ? (
                                    <PreviewIcon file={i === 2 ? "0c994" : "cfc20"} />
                                  ) : (
                                    <PreviewSpinner file="94283" />
                                  )
                                }
                              >
                                {localizeCopy(product)}
                              </PreviewRow>
                            );
                          })}
                        </div>
                      </PreviewField>
                    </>
                  ) : displayStage === 1 ? (
                    <>
                      <PreviewTitle subtitle="Automatic Restock">
                        {localizeCopy("Ceramic 15 cm. Plant Pot")}
                      </PreviewTitle>
                      <PreviewField label={localizeCopy("Processing Product Restock")}>
                        <div className={styles.rows}>
                          {steps.map((title, i) => {
                            const complete = reduced || elapsed >= 4600 + i * 1000;
                            const active = reduced || elapsed >= 3600 + i * 1000;
                            return (
                              <div className={active ? "" : styles.pending} key={title}>
                                <PreviewRow
                                  leading={
                                    complete ? (
                                      <PreviewIcon file="cfc20" />
                                    ) : active ? (
                                      <PreviewSpinner file="94283" />
                                    ) : (
                                      <span className={styles.indicatorPlaceholder} />
                                    )
                                  }
                                >
                                  {localizeCopy(title)}
                                </PreviewRow>
                              </div>
                            );
                          })}
                        </div>
                      </PreviewField>
                    </>
                  ) : (
                    <>
                      <PreviewTitle subtitle="Now">{localizeCopy("Order Update #78234")}</PreviewTitle>
                      <div className={styles.fields}>
                        <PreviewField inline label={localizeCopy("Exp. Delivery")}>
                          <PreviewTag>
                            {localizeCopy(darkCalendar)}
                            {localizeCopy("Nov 29")}
                          </PreviewTag>
                        </PreviewField>
                        <PreviewField inline label={localizeCopy("Status")}>
                          <PreviewTag tone="amber">{localizeCopy("Waiting for stock")}</PreviewTag>
                        </PreviewField>
                      </div>
                      <PreviewField label={localizeCopy("Available products reserved")}>
                        <div className={styles.rows}>
                          {products.slice(0, 2).map((product) => (
                            <PreviewRow key={product} leading={<PreviewIcon file="cfc20" />}>
                              {localizeCopy(product)}
                            </PreviewRow>
                          ))}
                        </div>
                      </PreviewField>
                      <PreviewField label={localizeCopy("Waiting for stock")}>
                        <PreviewRow leading={<PreviewIcon file="d356a" />}>
                          <span className={styles.stockItem}>
                            {localizeCopy(products[2])}
                            <small>{localizeCopy("Expected arrival Nov. 14.")}</small>
                          </span>
                        </PreviewRow>
                      </PreviewField>
                    </>
                  ),
                )}
              </div>
            </PreviewPanel>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}
const logos = ["Slack", "Excel", "Gmail", "OpenAI", "Whatsapp", "Shopify", "Notion", "Webhook"];
export function IntegrationsMockup() {
  return (
    <div className={styles.logoViewport} aria-hidden="true">
      <div className={styles.logoTrack}>
        {[0, 1].map((copy) => (
          <div className={styles.logoGroup} key={copy}>
            {logos.map((name) => (
              <div className={styles.logoTile} key={name}>
                <Image src={`/assets/figma/logos/Logo-${name}.png`} alt="" width={96} height={96} loading="eager" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
