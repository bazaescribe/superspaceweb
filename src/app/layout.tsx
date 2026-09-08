import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superspace — Operational software for growing companies",
  description: "A managed platform built around the way your operation actually works.",
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
