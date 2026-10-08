"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
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
  return (
    <div className={styles.viewport} aria-hidden="true">
      <PreviewPanel theme={platform ? "light" : "dark"} className={`${styles.record} ${styles.permissions}`}>
        <div className={styles.portrait}>
          <Image src="/assets/figma/key-features/fa3d3.png" alt="" width={378} height={212} />
          <div className={styles.identity}>
            <div>
              <strong>Sam Olguín</strong>
              <p>Finance Lead</p>
            </div>
            <PreviewTag>Manager</PreviewTag>
            <PreviewTag tone="green">Active</PreviewTag>
          </div>
        </div>
        <div className={styles.body}>
          <PreviewField label="Groups">
            <div className={styles.tags}>
              <PreviewTag>Finances</PreviewTag>
              <PreviewTag>Support</PreviewTag>
              <PreviewTag>
                <PreviewIcon file="03da9" size={12} />
              </PreviewTag>
            </div>
          </PreviewField>
          <PreviewField label="Effective permissions">
            {[
              ["Manage people", "Invite, edit and remove members."],
              ["View Audit Log", "Read org-wide activity."],
              ["Manage Billing", "Payment methods and invoices."],
            ].map(([title, detail], i) => (
              <div className={styles.permission} key={title}>
                <div>
                  {title}
                  <p>{detail}</p>
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
  ["cfc20", "Request placed at 8:23 AM."],
  ["cfc20", "Courier assigned. 8:24 AM."],
  ["cfc20", "Courier arrived at pickup. 8:32 AM."],
  ["99554", "Package in transit."],
  ["99554", "Estimated delivery by 8:44 AM."],
  ["6780e", "Traffic rerouted through Market St."],
  ["6780e", "Courier stopped for fuel. 8:36 AM."],
  ["6780e", "Package held at security checkpoint."],
  ["6780e", "Clearance approved 8:41 AM."],
  ["6780e", "Courier arrived at delivery destination 8:42 AM."],
  ["cfc20", "Delivered 8:43 AM."],
];
export function ActivityMockup({ delivered = false }: { delivered?: boolean } = {}) {
  return (
    <div className={styles.viewport} aria-hidden="true">
      <PreviewPanel theme={delivered ? "light" : "dark"} className={styles.record}>
        <div className={styles.body}>
          <PreviewTitle label="F91W">Service History</PreviewTitle>
          <div className={styles.fields}>
            <PreviewField inline label="Time">
              <PreviewTag>{delivered ? calendar : darkCalendar}October 3, 8:23 AM</PreviewTag>
            </PreviewField>
            <PreviewField inline label="Status">
              <PreviewTag tone="green">Delivered</PreviewTag>
            </PreviewField>
            <PreviewField inline label="Courier">
              <PreviewPerson initials="MG" name="Miguel Luis Galvan" color="#fe9a00" />
            </PreviewField>
          </div>
          <PreviewField label="Recorded Events">
            <div className={styles.timeline}>
              {events.map(([icon, text], i) => (
                <div className={styles.event} key={text}>
                  <PreviewRow leading={<PreviewIcon file={icon} />}>{text}</PreviewRow>
                  {i < events.length - 1 && (
                    <Image
                      className={styles.connector}
                      src="/assets/figma/features-iteration/0bb6c.svg"
                      width={20}
                      height={10}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </PreviewField>
        </div>
      </PreviewPanel>
      {!delivered && <div className={styles.darkFade} />}
    </div>
  );
}
export function ContextMockup() {
  return (
    <div className={styles.viewport} aria-hidden="true">
      <PreviewPanel className={styles.record}>
        <div className={`${styles.body} ${styles.context}`}>
          <PreviewTitle label="GMWB5000">Delivery Details</PreviewTitle>
          <p className={styles.address}>Montecito 301, Int. 2, Nápoles, Benito Juárez, Ciudad de México.</p>
          <div className={styles.fields}>
            <PreviewField inline label="Time">
              <PreviewTag>{calendar}May 29, 11:33 AM</PreviewTag>
            </PreviewField>
            <PreviewField inline label="Status">
              <PreviewTag tone="green">Delivered</PreviewTag>
              <PreviewTag tone="green">On time</PreviewTag>
            </PreviewField>
            <PreviewField inline label="Courier">
              <PreviewPerson initials="RV" name="Ramiro Velazquez" color="#f69dcc" />
            </PreviewField>
          </div>
          <PreviewField label="Attachments">
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
          <PreviewField label="Comments">
            <div className={styles.tags}>
              <PreviewPerson initials="RV" name="Ramiro Velazquez" color="#f69dcc" />
              <PreviewTag>9:32 AM</PreviewTag>
            </div>
            <p className={styles.comment}>Delivered all 6 boxes to reception. Signed receipt attached.</p>
          </PreviewField>
        </div>
      </PreviewPanel>
      <div className={styles.lightFade} />
    </div>
  );
}
const products = ["Philodendron Gloriosum.", "Monstera Deliciosa Thai Constellation.", "Ceramic 15 cm. Plant Pot x 2."];
const steps = [
  ["4b158", "Reviewing current stock"],
  ["79ccf", "Analyzing product history."],
  ["783bb", "Modeling sales projection."],
  ["cfc20", "Order placed"],
];
const cycleDuration = 13700;
export function AutomationsMockup() {
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
    <div ref={ref} className={`${styles.viewport} ${styles.automation}`} aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage}
          className={styles.automationCard}
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -12 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          <PreviewPanel theme="dark">
            <div className={`${styles.body} ${styles.automationBody}`}>
              {stage === 0 ? (
                <>
                  <PreviewTitle subtitle="Now">New Order Received #78234</PreviewTitle>
                  <PreviewField label="Checking Stock Availability">
                    <div className={styles.rows}>
                      {products.map((product, i) => {
                        const complete = elapsed >= [1400, 2000, 2600][i];
                        return (
                          <PreviewRow
                            key={product}
                            leading={<PreviewIcon file={complete && i === 2 ? "0c994" : "cfc20"} />}
                            trailing={
                              complete ? (
                                <span className={i === 2 ? styles.missing : styles.found}>
                                  {i === 2 ? "Not found" : "Found"}
                                </span>
                              ) : (
                                <PreviewSpinner />
                              )
                            }
                          >
                            {product}
                          </PreviewRow>
                        );
                      })}
                    </div>
                  </PreviewField>
                </>
              ) : stage === 1 ? (
                <>
                  <PreviewTitle subtitle="Automatic Restock">Ceramic 15 cm. Plant Pot</PreviewTitle>
                  <PreviewField label="Processing Product Restock">
                    <div className={styles.rows}>
                      {steps.map(([icon, title], i) => {
                        const complete = elapsed >= 4600 + i * 1000;
                        const active = elapsed >= 3600 + i * 1000;
                        return (
                          <div className={active ? "" : styles.pending} key={title}>
                            <PreviewRow
                              leading={
                                i === 3 ? (
                                  <PreviewIcon file={icon} />
                                ) : (
                                  <span className={styles.iconTile}>
                                    <PreviewIcon file={icon} size={12} />
                                  </span>
                                )
                              }
                              trailing={
                                complete ? (
                                  <span className={styles.found}>✓</span>
                                ) : active ? (
                                  <PreviewSpinner />
                                ) : undefined
                              }
                            >
                              {title}
                            </PreviewRow>
                          </div>
                        );
                      })}
                    </div>
                  </PreviewField>
                </>
              ) : (
                <>
                  <PreviewTitle subtitle="Now">Order Update #78234</PreviewTitle>
                  <div className={styles.fields}>
                    <PreviewField inline label="Exp. Delivery">
                      <PreviewTag>{darkCalendar}Nov 29</PreviewTag>
                    </PreviewField>
                    <PreviewField inline label="Status">
                      <PreviewTag tone="amber">Waiting for stock</PreviewTag>
                    </PreviewField>
                  </div>
                  <PreviewField label="Available products reserved">
                    <div className={styles.rows}>
                      {products.slice(0, 2).map((product) => (
                        <PreviewRow key={product} leading={<PreviewIcon file="cfc20" />}>
                          {product}
                        </PreviewRow>
                      ))}
                    </div>
                  </PreviewField>
                  <PreviewField label="Waiting for stock">
                    <PreviewRow leading={<PreviewIcon file="d356a" />}>{products[2]}</PreviewRow>
                    <div className={styles.arrival}>
                      <PreviewTag>Expected arrival Nov. 14.</PreviewTag>
                    </div>
                  </PreviewField>
                </>
              )}
            </div>
          </PreviewPanel>
        </motion.div>
      </AnimatePresence>
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
