import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.76"],
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: { root: __dirname },
  // Routes consolidated into the Product, Capabilities and How it works pages.
  async redirects() {
    return [
      { source: "/platform", destination: "/product", permanent: true },
      { source: "/deployment", destination: "/how-it-works", permanent: true },
      { source: "/offering", destination: "/capabilities", permanent: true },
      { source: "/solutions", destination: "/capabilities", permanent: true },
    ];
  },
};

export default nextConfig;
