"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { useInView } from "motion/react";
import {
  Circle,
  DotsThree as MoreHorizontal,
  Envelope as Mail,
  Hash,
  MicrosoftExcelLogo as FileSpreadsheet,
  ShieldCheck,
} from "@phosphor-icons/react";
import { OrderWorkspace } from "./order-workspace";
import styles from "./operations-system.module.css";


export function OperationsSystem({
  embedded = false,
  initialConnected = false,
  animateBefore = false,
}: { embedded?: boolean; initialConnected?: boolean; animateBefore?: boolean } = {}) {
  const [connected, setConnected] = useState(initialConnected);
  const id = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const beforeInView = useInView(stageRef, { amount: 0.12, margin: "0px 0px -8% 0px", once: true });
  return (
    <section
      className={`${styles.section} ${embedded ? styles.embedded : ""}`}
      aria-labelledby={embedded ? undefined : `${id}-title`}
      aria-label={
        embedded ? (connected ? "Connected Superspace workspace" : "Disconnected operational tools") : undefined
      }
    >
      {!embedded && (
        <header className="v24-heading-row">
          <h2 id={`${id}-title`}>
            Your operation already has a system. <span>It just isn’t software yet.</span>
          </h2>
          <div className={styles.switcher} aria-label="Compare operational systems">
            <button aria-pressed={!connected} aria-controls={`${id}-demo`} onClick={() => setConnected(false)}>
              The old way
            </button>
            <button aria-pressed={connected} aria-controls={`${id}-demo`} onClick={() => setConnected(true)}>
              <Image src="/brand/superspace-logo.svg" alt="Superspace" width={91} height={14} />
            </button>
          </div>
        </header>
      )}
      <div
        id={`${id}-demo`}
        ref={stageRef}
        className={`${styles.stage} ${connected ? styles.connected : ""}`}
        data-before-reveal={animateBefore ? (beforeInView ? "visible" : "pending") : undefined}
      >
        <div className={styles.fragments} inert={connected} aria-hidden={connected}>
          <article className={`${styles.card} ${styles.email}`}>
            <div className={styles.cardBar}>
              <span className={styles.mailMark}>
                <Image src='/assets/figma/logos/Logo-gmail.png' width={20} height={20} alt="Gmail Logo"></Image>
              </span>
              <span>
                Inbox <small>selena.gomez@acme.com</small>
              </span>
              <MoreHorizontal size={16} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.person}>
                <div className="rounded-full border border-black/20 w-7 h-7 overflow-hidden flex align-center justify-center">
                  <Image src='/assets/figma/photos/User-Emma.png' width={28} height={28} alt="Gmail Logo"></Image>
                </div>
                <span>
                  Emma Lewis <small>emma@northstar.co &nbsp;·&nbsp; to Operations</small>
                </span>
                <time>9:14 AM</time>
              </div>
              <p>
                Can we make that <strong>240 units</strong> instead?
                <br />
                Same delivery window on Friday.
              </p>
              <div className={styles.quote}>
                On Tuesday, Alex wrote:
                <br />
                “Confirming the original 200 units.”
              </div>
              <div className={styles.mailActions}>
                <span>↩ &nbsp; Reply</span>
                <span>Forward</span>
              </div>
            </div>
          </article>
          <article className={`${styles.card} ${styles.sheet}`}>
            <div className={styles.cardBar} style={{ color: 'white'}}>
              <span className={styles.mailMark}>
                <Image src='/assets/figma/logos/Logo-Excel.png' width={20} height={20} alt="Gmail Logo"></Image>
              </span>
              <span style={{color: 'white'}}>
                Orders_final_v3.xlsx <small>Saved to Drive</small>
              </span>
              <span className={styles.sheetShare}>Share</span>
            </div>
            <div className={styles.sheetToolbar}>
              File <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
              <span>Format</span>
              <small>Last edited yesterday</small>
            </div>
            <table>
              <thead>
                <tr>
                  <th />
                  <th>Order</th>
                  <th>Qty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12</td>
                  <td>NS–1047</td>
                  <td>120</td>
                  <td>Delivered</td>
                </tr>
                <tr className={styles.selected}>
                  <td>13</td>
                  <td>NS–1048</td>
                  <td>200</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>AC–1049</td>
                  <td>80</td>
                  <td>In review</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.sheetFoot}>
              <span>Orders</span>
              <span>Inventory</span>
              <span>+</span>
            </div>
          </article>
          <article className={`${styles.card} ${styles.chat}`}>
            <div className={styles.cardBar}>
              <span className={styles.mailMark}>
                <Image src='/assets/figma/logos/Logo-Slack.png' width={28} height={28} alt="Gmail Logo"></Image>
              </span>
              <span style={{ color: 'white'}}>
                dispatch <small>9 members</small>
              </span>
              <span className={styles.unread}>2 new</span>
            </div>
            <div className={styles.chatThread}>
              <div className={styles.chatMessage}>
                <div className="rounded-full border border-black/20 w-7 h-7 overflow-hidden flex align-center justify-center">
                  <Image src='/assets/figma/photos/User-Marcel.png' width={28} height={28} alt="Gmail Logo"></Image>
                </div>
                <div>
                  <span className={styles.messageMeta}>
                    Marcel Ruiz <time>9:32</time>
                  </span>
                  <p className={styles.messageBubble}>
                    Sheet says <strong>200</strong>. Are we shipping 240?
                  </p>
                </div>
              </div>
              <div className={`${styles.chatMessage} ${styles.chatMessageOwn}`}>
                <div>
                  <span className={styles.messageMeta}>
                    Alex Lee <time>9:34</time>
                  </span>
                  <p className={styles.messageBubble}>Checking with sales now.</p>
                </div>
              </div>
              <div className={styles.chatMessage}>
                <div className="rounded-full border border-black/20 w-7 h-7 overflow-hidden flex align-center justify-center">
                  <Image src='/assets/figma/photos/User-Sofia.png' width={28} height={28} alt="Gmail Logo"></Image>
                </div>
                <div>
                  <span className={styles.messageMeta}>
                    Sofía Bianchi <time>9:36</time>
                  </span>
                  <p className={styles.messageBubble}>Dispatch has Friday held. Need the final quantity.</p>
                </div>
              </div>
            </div>
          </article>
          <article className={`${styles.card} ${styles.approval}`}>
            <div className={styles.cardBar}>
              <span className={styles.mailMark}>
                <Image src='/assets/figma/logos/Logo-Notion.png' width={28} height={28} alt="Gmail Logo"></Image>
              </span>
              <span>
                Purchase approval <small>Procurement</small>
              </span>
              <Circle size={12} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.meta}>PO–2084 · NORTHSTAR</div>
              <h3>Additional 40 units</h3>
              <div className={styles.approvalLine}>
                <strong>$1,280.00</strong>
                <span>Awaiting sign-off</span>
              </div>
              <p>Requested by Alex · Owner unassigned</p>
              <div className={styles.approvalActions}>
                <span>Review request</span>
                <span>View policy ↗</span>
              </div>
            </div>
          </article>
          <div className={`${styles.floatingMessage} ${styles.floatingMessageOne}`}>
            <div className="rounded-full border border-black/20 w-7 h-7 overflow-hidden flex align-center justify-center">
              <Image src='/assets/figma/photos/User-Emma.png' width={28} height={28} alt="Gmail Logo"></Image>
            </div>
            <span>
              <strong>Emma Lewis</strong>
              <small>Just confirming: 240, please.</small>
            </span>
          </div>
          <div className={`${styles.floatingMessage} ${styles.floatingMessageTwo}`}>
            <div className="rounded-full border border-black/20 w-7 h-7 overflow-hidden flex align-center justify-center">
              <Image src='/assets/figma/photos/User-Alex.png' width={28} height={28} alt="Gmail Logo"></Image>
            </div>
            <span>
              <strong>Alex Lee</strong>
              <small>Is PO–2084 approved yet?</small>
            </span>
          </div>
        </div>
        <div className={styles.workspace} inert={!connected} aria-hidden={!connected}>
          <OrderWorkspace />
        </div>
      </div>
    </section>
  );
}
