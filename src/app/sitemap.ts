import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/platform",
  "/offering",
  "/deployment",
  "/solutions",
  "/company",
  "/careers",
  "/engineering-blog",
  "/contact",
  "/privacy",
  "/terms",
  "/faq",
  "/changelog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/privacy" || route === "/terms" ? 0.3 : 0.8,
  }));
}
