import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { siteDescription, siteName, siteUrl, socialImage } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Superspace — Operational software for growing companies",
    template: "%s — Superspace",
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: "Superspace — Operational software for growing companies",
    description: siteDescription,
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superspace — Operational software for growing companies",
    description: siteDescription,
    images: [socialImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
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
                description: siteDescription,
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl.origin}/#website`,
                name: siteName,
                url: siteUrl.origin,
                description: siteDescription,
                publisher: { "@id": `${siteUrl.origin}/#organization` },
                inLanguage: "en",
              },
            ],
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
