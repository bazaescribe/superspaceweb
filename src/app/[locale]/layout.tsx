import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";
import { createPageMetadata } from "@/i18n/metadata";
import { translate } from "@/i18n/translate";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../dark-site.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await createPageMetadata({
    title: "Superspace — Operational software for growing companies",
    description: siteDescription,
    path: "/",
    absoluteTitle: true,
  });
  return {
    ...page,
    metadataBase: siteUrl,
    applicationName: siteName,
    title: {
      default:
        typeof page.title === "object" && page.title && "absolute" in page.title ? page.title.absolute : siteName,
      template: "%s — Superspace",
    },
    icons: {
      icon: [
        { url: "/brand/superspace-favicon.svg", type: "image/svg+xml", sizes: "any" },
        { url: "/brand/superspace-favicon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: { url: "/brand/superspace-apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    },
    manifest: "/manifest.webmanifest",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl.origin}/#organization`,
                  name: siteName,
                  url: siteUrl.origin,
                  logo: new URL("/brand/superspace-logo.svg", siteUrl).toString(),
                  foundingDate: "2024",
                  foundingLocation: { "@type": "Place", name: "Mexico City, Mexico" },
                  description: translate(siteDescription, locale),
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl.origin}/#website`,
                  name: siteName,
                  url: siteUrl.origin,
                  description: translate(siteDescription, locale),
                  publisher: { "@id": `${siteUrl.origin}/#organization` },
                  inLanguage: locale,
                },
              ],
            }}
          />
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
