import type { MetadataRoute } from "next";
import { siteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Superspace — Operational software for growing companies",
    short_name: "Superspace",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#170fff",
    icons: [
      { src: "/brand/superspace-favicon.png", sizes: "679x679", type: "image/png" },
      { src: "/brand/superspace-favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
