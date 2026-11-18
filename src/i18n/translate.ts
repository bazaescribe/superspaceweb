import spanish from "./es.json" with { type: "json" };
const dictionary: Record<string, string> = spanish;

export function translate<T>(value: T, locale: string): T {
  if (locale !== "es") return value;
  if (typeof value === "string") {
    const normalized = value.replace(/\s+/g, " ").trim();
    const translated = dictionary[normalized];
    if (!translated) return value;
    return (value.match(/^\s*/)?.[0] + translated + value.match(/\s*$/)?.[0]) as T;
  }
  if (Array.isArray(value)) return value.map((item) => translate(item, locale)) as T;
  return value;
}
