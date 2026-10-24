import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.76"],
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: { root: __dirname },
};

export default createNextIntlPlugin()(nextConfig);
