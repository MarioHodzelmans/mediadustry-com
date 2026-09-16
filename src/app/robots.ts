import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout", "/my-account"] },
    sitemap: "https://www.mediadustry.com/sitemap.xml",
    host: "https://www.mediadustry.com",
  };
}
