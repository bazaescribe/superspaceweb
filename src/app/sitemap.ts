import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/platform",
  "/offering",
  "/deployment",
  "/solutions",
  "/company",
  "/manifesto",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/faq",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    ["en", "es"].map((locale) => ({
      url: new URL(`/${locale}${route === "/" ? "" : route}`, siteUrl).toString(),
      alternates: {
        languages: Object.fromEntries(
          ["en", "es"].map((language) => [
            language,
            new URL(`/${language}${route === "/" ? "" : route}`, siteUrl).toString(),
          ]),
        ),
      },
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : route === "/privacy" || route === "/terms" ? 0.3 : 0.8,
    })),
  );
}
