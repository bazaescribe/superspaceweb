import type { Metadata } from "next";

export const siteName = "Superspace";
export const siteDescription =
  "A managed operational software platform built around the way growing companies actually work.";
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
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

export function createPageMetadata({ title, description, path, absoluteTitle = false }: PageMetadata): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} — ${siteName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      title: socialTitle,
      description,
      url: path,
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
