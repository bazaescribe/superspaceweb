export const spanishCountries = new Set([
  "MX",
  "ES",
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "SV",
  "GQ",
  "GT",
  "HN",
  "NI",
  "PA",
  "PY",
  "PE",
  "PR",
  "UY",
  "VE",
]);

export function detectLocale(saved?: string, acceptLanguage?: string | null, country?: string | null): "en" | "es" {
  if (saved === "en" || saved === "es") return saved;
  const preferences = (acceptLanguage || "")
    .split(",")
    .map((entry, order) => {
      const [tag, ...parameters] = entry.trim().toLowerCase().split(";");
      const quality = parameters.find((part) => part.trim().startsWith("q="));
      return { language: tag.split("-")[0], quality: quality ? Number(quality.trim().slice(2)) : 1, order };
    })
    .filter((entry) => Number.isFinite(entry.quality) && entry.quality > 0 && entry.quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.order - b.order);
  for (const { language } of preferences) {
    if (language === "en" || language === "es") return language;
  }
  return spanishCountries.has((country || "").toUpperCase()) ? "es" : "en";
}
