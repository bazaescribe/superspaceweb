"use client";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <label className="language">
      <span className="sr-only">{locale === "es" ? "Idioma" : "Language"}</span>
      <select
        aria-label={locale === "es" ? "Idioma del sitio" : "Website language"}
        value={locale}
        onChange={(event) => {
          const language = event.target.value;
          document.cookie = `superspace-locale=${language}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
          window.location.assign(
            `/${language}${pathname === "/" ? "" : pathname}${window.location.search}${window.location.hash}`,
          );
        }}
        style={{
          font: "inherit",
          color: "inherit",
          background: "transparent",
          border: "1px solid currentColor",
          borderRadius: 6,
          padding: "8px 28px 8px 10px",
          cursor: "pointer",
        }}
      >
        <option value="en" lang="en" style={{ color: "#111", background: "#fff" }}>
          English
        </option>
        <option value="es" lang="es" style={{ color: "#111", background: "#fff" }}>
          Español
        </option>
      </select>
    </label>
  );
}
