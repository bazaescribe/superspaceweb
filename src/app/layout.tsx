import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superspace — Operational infrastructure for growing companies",
  description: "Custom operational software without the custom-software overhead.",
  icons: {
    icon: "/brand/superspace-favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
