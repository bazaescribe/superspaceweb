import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import styles from "./preview-ui.module.css";

export type PreviewTone = "neutral" | "green" | "blue" | "amber";
export function PreviewPanel({
  children,
  theme = "light",
  className = "",
}: {
  children: ReactNode;
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`${styles.panel} ${className}`} data-preview-theme={theme}>
      {children}
    </div>
  );
}
export function PreviewTitle({
  label,
  children,
  subtitle,
}: {
  label?: string;
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className={styles.title}>
      {label && <small>{label}</small>}
      <strong>{children}</strong>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
export function PreviewField({
  label,
  children,
  inline = false,
}: {
  label: string;
  children: ReactNode;
  inline?: boolean;
}) {
  return (
    <div className={`${styles.field} ${inline ? styles.inline : ""}`}>
      <small>{label}</small>
      <div>{children}</div>
    </div>
  );
}
export function PreviewTag({
  children,
  tone = "neutral",
  dot = false,
}: {
  children: ReactNode;
  tone?: PreviewTone;
  dot?: boolean;
}) {
  return <span className={`${styles.tag} ${styles[tone]} ${dot ? styles.dot : ""}`}>{children}</span>;
}
export function PreviewAvatar({ initials, color = "#615fff" }: { initials: string; color?: string }) {
  return (
    <b className={styles.avatar} style={{ "--avatar-color": color } as CSSProperties}>
      {initials}
    </b>
  );
}
export function PreviewPerson({ initials, name, color }: { initials: string; name: string; color?: string }) {
  return (
    <span className={styles.person}>
      <PreviewAvatar initials={initials} color={color} />
      {name}
    </span>
  );
}
export function PreviewSwitch({ enabled = true }: { enabled?: boolean }) {
  return (
    <span className={`${styles.switch} ${enabled ? styles.enabled : ""}`}>
      <Image src="/assets/figma/features-refactor/1a266.svg" width={32} height={21} alt="" />
    </span>
  );
}
export function PreviewIcon({ file, size = 20, className = "" }: { file: string; size?: number; className?: string }) {
  return (
    <Image
      className={className}
      src={`/assets/figma/features-refactor/${file}.svg`}
      width={size}
      height={size}
      alt=""
    />
  );
}
export function PreviewRow({
  children,
  leading,
  trailing,
}: {
  children: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className={styles.row}>
      {leading}
      <span className={styles.rowText}>{children}</span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </div>
  );
}
export function PreviewFile({ image, name, size }: { image: string; name: string; size: string }) {
  return (
    <div className={styles.file}>
      <Image src={image} width={36} height={36} alt="" />
      <div>
        <p>{name}</p>
        <small>{size}</small>
      </div>
    </div>
  );
}
export function PreviewSpinner({ file = "19b11" }: { file?: string } = {}) {
  return <PreviewIcon file={file} className={styles.spinner} />;
}
