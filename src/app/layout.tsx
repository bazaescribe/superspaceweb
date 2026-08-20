import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superspace — Operational infrastructure for scaling companies",
  description: "Custom software outcomes. Platform economics.",
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
