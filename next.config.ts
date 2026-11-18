import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.76"],
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: { root: __dirname },
  // Routes consolidated into the Product, Capabilities and How it works pages.
  async redirects() {
    const moved = [
      ["platform", "product"],
      ["deployment", "how-it-works"],
      ["offering", "capabilities"],
      ["solutions", "capabilities"],
    ];
    return moved.flatMap(([from, to]) => [
      { source: `/${from}`, destination: `/${to}`, permanent: true },
      { source: `/:locale(en|es)/${from}`, destination: `/:locale/${to}`, permanent: true },
    ]);
  },
};

export default createNextIntlPlugin()(nextConfig);
