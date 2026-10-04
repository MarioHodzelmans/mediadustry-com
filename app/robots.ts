import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Let crawlers follow old template redirects and read showcase noindex metadata.
      disallow: "/api/",
    },
    sitemap: "https://www.mediadustry.com/sitemap.xml",
    host: "https://www.mediadustry.com",
  };
}
