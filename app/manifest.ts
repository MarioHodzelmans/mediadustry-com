import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MEDIADUSTRY",
    short_name: "MEDIADUSTRY",
    description:
      "Strategie, design en development voor merken die digitaal vooruit willen.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#121212",
    lang: "nl-NL",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
