import type { ReactNode } from "react";
import { PreviewAvatar, PreviewTag, type PreviewTone } from "./preview-ui";
import {
  stateTones,
  type ActivityEntry,
  type BriefingItem,
  type BriefingSegment,
  type ObjectRecord,
  type StoryTone,
} from "@/lib/operational-story";
import styles from "./operational-ui.module.css";

/*
 * Operational mockup primitives. They extend the preview shell (`preview-ui`, `PreviewStage`,
 * `ProductPreview`) with the product's operational vocabulary: object references, lifecycle states,
 * actions and activity. Sizes are in `em`, so the same primitive renders inside the 1512px product
 * canvas and inside the container-scaled panels of a `PreviewStage`. See docs/mockup-shell.md.
 */

export type Highlight =
  "summary" | "exception" | "context" | "proposal" | "actions" | "dialog" | "result" | "state" | "related" | "activity";

const toneMap: Record<StoryTone, PreviewTone> = {
  neutral: "neutral",
  green: "green",
  blue: "blue",
  amber: "amber",
  red: "red",
};

export function OpTag({
  children,
  tone = "neutral",
  dot = false,
}: {
  children: ReactNode;
  tone?: StoryTone;
  dot?: boolean;
}) {
  return (
    <PreviewTag tone={toneMap[tone]} dot={dot} className={styles.tag}>
      {children}
    </PreviewTag>
  );
}

export function StateTag({ state }: { state: string }) {
  return (
    <OpTag tone={stateTones[state] ?? "neutral"} dot>
      {state}
    </OpTag>
  );
}

type IconName = "check" | "chevron" | "ellipsis" | "filter" | "lock" | "plus" | "search" | "spark" | "arrow";
const iconPaths: Record<IconName, string> = {
  check: "M3 8.5 6.5 12 13 4.5",
  chevron: "M4 6l4 4 4-4",
  ellipsis: "M4 8h.01M8 8h.01M12 8h.01",
  filter: "M2.5 4h11M4.5 8h7M6.5 12h3",
  lock: "M4.5 7.5h7v6h-7zM6 7.5V5.5a2 2 0 0 1 4 0v2",
  plus: "M8 3.5v9M3.5 8h9",
  search: "M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM10.5 10.5 14 14",
  spark: "M8 1.5 9.4 6.6 14.5 8 9.4 9.4 8 14.5 6.6 9.4 1.5 8 6.6 6.6z",
  arrow: "M3.5 8h9M9 4.5 12.5 8 9 11.5",
};
export function OpIcon({ name }: { name: IconName }) {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} fill={name === "spark" ? "currentColor" : "none"} />
    </svg>
  );
}

/** A reference to a real business object. Interactive when given an onClick. */
export function ObjectChip({ id, onClick, label }: { id: string; onClick?: () => void; label?: string }) {
  if (onClick)
    return (
      <button type="button" className={styles.chip} onClick={onClick} aria-label={label ?? `Open ${id}`}>
        {id}
      </button>
    );
  return <span className={styles.chip}>{id}</span>;
}

export function ActionButton({
  children,
  primary = false,
  onClick,
  label,
  icon,
}: {
  children: ReactNode;
  primary?: boolean;
  onClick?: () => void;
  label?: string;
  icon?: IconName;
}) {
  const content = (
    <>
      {icon && <OpIcon name={icon} />}
      {children}
    </>
  );
  const className = `${styles.button} ${primary ? styles.primary : ""}`;
  if (!onClick) return <span className={className}>{content}</span>;
  return (
    <button type="button" className={className} onClick={onClick} aria-label={label}>
      {content}
    </button>
  );
}

/** Descriptive lifecycle segments with the current state marked. Not a progress bar. */
export function StateBar({
  states,
  current,
  terminal,
}: {
  states: readonly string[];
  current: string;
  terminal?: string;
}) {
  return (
    <div className={styles.stateBar} aria-label={`State: ${current}`}>
      {states.map((state) => (
        <span key={state} data-current={state === current || undefined}>
          {state}
        </span>
      ))}
      {terminal && (
        <span data-terminal data-current={terminal === current || undefined}>
          {terminal}
        </span>
      )}
    </div>
  );
}

export function ActivityTimeline({ entries, highlight }: { entries: ActivityEntry[]; highlight?: string }) {
  return (
    <ol className={styles.timeline}>
      {entries.map((entry) => (
        <li key={entry.id} data-highlighted={entry.id === highlight || undefined} data-tone={entry.tone}>
          <span className={styles.timelineDot} aria-hidden="true" />
          <div>
            <p>
              <strong>{entry.actor}</strong> {entry.text}
            </p>
            {entry.detail && <small>{entry.detail}</small>}
            {entry.badge && (
              <span className={styles.timelineBadge}>
                <OpTag tone="blue">{entry.badge}</OpTag>
              </span>
            )}
          </div>
          <time>{entry.time}</time>
        </li>
      ))}
    </ol>
  );
}

function Section({
  label,
  children,
  highlighted,
  trailing,
}: {
  label: string;
  children: ReactNode;
  highlighted?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <section className={styles.section} data-highlighted={highlighted || undefined}>
      <div className={styles.sectionLabel}>
        <span>{label}</span>
        {trailing}
      </div>
      {children}
    </section>
  );
}

/**
 * The generic object detail composition: identity and permitted actions, properties with the state bar,
 * fields, related work and activity. The same component renders an Order and a Production job.
 */
export function ObjectDetail({
  record,
  highlight,
  onAction,
  activityHighlight,
  sections = ["properties", "details", "related", "activity"],
}: {
  record: ObjectRecord;
  highlight?: Highlight;
  onAction?: (action: string) => void;
  activityHighlight?: string;
  sections?: ("properties" | "details" | "related" | "activity")[];
}) {
  const lit = (...names: Highlight[]) => (highlight ? names.includes(highlight) : false);
  return (
    <div className={styles.detail} data-focused={highlight ? true : undefined}>
      <header className={styles.detailHeader}>
        <div>
          <small>{record.type}</small>
          <strong>{record.id}</strong>
          <span>{record.subtitle}</span>
        </div>
        <div className={styles.detailActions} data-highlighted={lit("actions") || undefined}>
          <small>Actions</small>
          {record.actions.map((action, i) => (
            <ActionButton
              key={action}
              primary={i === 0}
              onClick={onAction ? () => onAction(action) : undefined}
              label={onAction ? `${action} on ${record.id}` : undefined}
            >
              {action}
            </ActionButton>
          ))}
        </div>
      </header>
      {sections.includes("properties") && (
        <Section label="Properties" highlighted={lit("context", "state")}>
          <StateBar states={record.states} current={record.state} terminal={record.terminal} />
        </Section>
      )}
      {sections.includes("details") && (
        <Section label="Details" highlighted={lit("context")}>
          <dl className={styles.fields}>
            {record.fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.tone ? <OpTag tone={field.tone}>{field.value}</OpTag> : field.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}
      {sections.includes("related") && (
        <Section label="Related work" highlighted={lit("context", "related", "result")}>
          <dl className={styles.fields}>
            {record.related.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {item.value ? (
                    <span className={styles.relatedValue}>
                      <ObjectChip id={item.value} />
                      <small>{item.type}</small>
                    </span>
                  ) : (
                    <span className={styles.empty}>{item.empty}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}
      {sections.includes("activity") && (
        <Section
          label="Activity"
          highlighted={lit("activity", "result")}
          trailing={<span className={styles.sectionLink}>View activity</span>}
        >
          <ActivityTimeline entries={record.activity} highlight={activityHighlight} />
        </Section>
      )}
    </div>
  );
}

export type CollectionRow = {
  id: string;
  title: string;
  subtitle: string;
  tags: { label: string; tone?: StoryTone }[];
};

export function CollectionList({
  rows,
  selected,
  onSelect,
  label,
}: {
  rows: CollectionRow[];
  selected?: string;
  onSelect?: (id: string) => void;
  label: string;
}) {
  return (
    <div
      className={styles.collection}
      role={onSelect ? "listbox" : undefined}
      aria-label={onSelect ? label : undefined}
    >
      {rows.map((row) => {
        const content = (
          <>
            <span className={styles.rowTitle}>
              <strong>{row.title}</strong>
              <span>{row.subtitle}</span>
            </span>
            <span className={styles.rowTags}>
              {row.tags.map((tag) => (
                <OpTag key={tag.label} tone={tag.tone} dot={tag.tone !== undefined}>
                  {tag.label}
                </OpTag>
              ))}
            </span>
          </>
        );
        return onSelect ? (
          <button
            type="button"
            role="option"
            key={row.id}
            aria-selected={selected === row.id}
            className={styles.row}
            onClick={() => onSelect(row.id)}
          >
            {content}
          </button>
        ) : (
          <div key={row.id} className={styles.row} data-selected={selected === row.id || undefined}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

/** A situation that needs attention, tied to the object it concerns and the actions available on it. */
export function ExceptionRow({
  item,
  highlighted,
  onAction,
}: {
  item: BriefingItem;
  highlighted?: boolean;
  onAction?: (intent: BriefingItem["actions"][number]["intent"], id: string) => void;
}) {
  return (
    <div className={styles.exception} data-highlighted={highlighted || undefined}>
      <span className={styles.exceptionDot} aria-hidden="true" />
      <div className={styles.exceptionMain}>
        <p className={styles.exceptionTitle}>
          {item.title}
          <time>{item.time}</time>
        </p>
        <div className={styles.exceptionSubject}>
          <ObjectChip id={item.subject} />
          {item.tags.map((tag) => (
            <OpTag key={tag.label} tone={tag.tone}>
              {tag.label}
            </OpTag>
          ))}
        </div>
      </div>
      <div className={styles.exceptionActions}>
        {item.actions.map((action) => {
          // Assign driver is the row's call to action; other actions open the record behind an arrow.
          const assign = action.intent === "assign";
          const className = assign ? styles.assign : styles.arrow;
          const content = assign ? action.label : <OpIcon name="arrow" />;
          if (!onAction)
            return (
              <span key={action.label} className={className}>
                {content}
              </span>
            );
          return (
            <button
              type="button"
              key={action.label}
              className={className}
              onClick={() => onAction(action.intent, item.id)}
              aria-label={`${action.label}: ${item.subject}`}
              title={action.label}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BriefingCard({
  label,
  generatedAt,
  greeting,
  summary,
  items,
  provenance,
  highlight,
  onAction,
  onReference,
}: {
  label: string;
  generatedAt: string;
  greeting: string;
  summary: BriefingSegment[];
  items: BriefingItem[];
  provenance: string[];
  highlight?: Highlight;
  onAction?: (intent: BriefingItem["actions"][number]["intent"], id: string) => void;
  onReference?: (id: string) => void;
}) {
  return (
    <div className={styles.briefing} data-focused={highlight ? true : undefined}>
      <section className={styles.section} data-highlighted={highlight === "summary" || undefined}>
        <small className={styles.briefingLabel}>
          <OpIcon name="spark" />
          {label} · {generatedAt}
        </small>
        <strong className={styles.greeting}>{greeting}</strong>
        <p className={styles.summary}>
          {summary.map((segment, i) =>
            typeof segment === "string" ? (
              segment
            ) : "figure" in segment ? (
              <span key={i} className={styles.figure}>
                {segment.figure}
              </span>
            ) : (
              <ObjectChip key={i} id={segment.ref} onClick={onReference ? () => onReference(segment.ref) : undefined} />
            ),
          )}
        </p>
      </section>
      <section className={styles.section} data-highlighted={highlight === "exception" || undefined}>
        <div className={styles.sectionLabel}>
          <span>Needs attention</span>
          <small>{items.length}</small>
        </div>
        <div className={styles.exceptions}>
          {items.map((item, i) => (
            <ExceptionRow
              key={item.id}
              item={item}
              onAction={onAction}
              highlighted={highlight === "exception" && i === 0}
            />
          ))}
        </div>
      </section>
      <footer className={styles.provenance}>
        {provenance.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </footer>
    </div>
  );
}

export function PersonOption({
  name,
  initials,
  color,
  selected,
  detail,
  tag,
  disabled,
  onClick,
}: {
  name: string;
  initials: string;
  color: string;
  selected?: boolean;
  /** Availability or eligibility shown under the name. */
  detail?: string;
  tag?: { label: string; tone: StoryTone };
  disabled?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <>
      <PreviewAvatar initials={initials} color={color} />
      <span className={styles.optionName}>
        {name}
        <small>{detail ?? "Driver"}</small>
      </span>
      {tag && <OpTag tone={tag.tone}>{tag.label}</OpTag>}
      {selected && <OpIcon name="check" />}
    </>
  );
  return onClick && !disabled ? (
    <button type="button" role="option" aria-selected={selected} className={styles.option} onClick={onClick}>
      {content}
    </button>
  ) : (
    <div
      className={styles.option}
      role={onClick ? "option" : undefined}
      aria-selected={onClick ? false : undefined}
      aria-disabled={disabled || undefined}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
    >
      {content}
    </div>
  );
}

/** An action form: a typed object reference input, its permission requirement and its declared effect. */
export function ActionDialog({
  title,
  subject,
  input,
  query,
  options,
  selected,
  requirement,
  effect,
  onSelect,
  onConfirm,
  onCancel,
  highlighted,
}: {
  title: string;
  subject: string;
  input: string;
  query: string;
  options: {
    name: string;
    initials: string;
    color: string;
    detail?: string;
    tag?: { label: string; tone: StoryTone };
    disabled?: boolean;
  }[];
  selected?: string;
  requirement: ReactNode;
  effect: string;
  onSelect?: (name: string) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  highlighted?: boolean;
}) {
  return (
    <div
      className={styles.dialog}
      role="group"
      aria-label={`${title}: ${subject}`}
      data-highlighted={highlighted || undefined}
    >
      <header>
        <strong>{title}</strong>
        <ObjectChip id={subject} />
      </header>
      <div className={styles.dialogField}>
        <small>
          {input} <span>Required</span>
        </small>
        <div className={styles.combobox}>
          <OpIcon name="search" />
          <span>{query}</span>
        </div>
        <div
          className={styles.options}
          role={onSelect ? "listbox" : undefined}
          aria-label={onSelect ? input : undefined}
        >
          {options.map((option) => (
            <PersonOption
              key={option.name}
              {...option}
              selected={selected === option.name}
              onClick={onSelect ? () => onSelect(option.name) : undefined}
            />
          ))}
        </div>
      </div>
      <div className={styles.dialogNotes}>
        <p>
          <OpIcon name="lock" />
          {requirement}
        </p>
        <p>
          <OpIcon name="arrow" />
          {effect}
        </p>
      </div>
      <footer>
        <ActionButton onClick={onCancel}>Cancel</ActionButton>
        <ActionButton primary onClick={onConfirm} label={onConfirm ? `Confirm ${title}` : undefined}>
          {title}
        </ActionButton>
      </footer>
    </div>
  );
}

export function Toast({ children }: { children: ReactNode }) {
  return (
    <div className={styles.toast} role="status">
      <OpIcon name="check" />
      {children}
    </div>
  );
}
