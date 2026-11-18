import type { Metadata } from "next";
import { translate } from "../i18n/translate.ts";

export const siteName = "Superspace";
export const siteDescription =
  "A managed operational software platform built around the way growing companies actually work.";
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://superspaceos.com");
export const socialImage = {
  url: "/brand/superspace-social.png",
  width: 1200,
  height: 675,
  alt: "Superspace",
};

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  absoluteTitle?: boolean;
};

export function createPageMetadata(
  { title, description, path, absoluteTitle = false }: PageMetadata,
  locale = "en",
): Metadata {
  title = translate(title, locale);
  description = translate(description, locale);
  const localizedPath = `/${locale}${path === "/" ? "" : path}`;
  const socialTitle = absoluteTitle ? title : `${title} — ${siteName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        en: `/en${path === "/" ? "" : path}`,
        es: `/es${path === "/" ? "" : path}`,
        "x-default": `/en${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
      siteName,
      title: socialTitle,
      description,
      url: localizedPath,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
