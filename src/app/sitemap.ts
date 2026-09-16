import type { MetadataRoute } from "next";

const routes = ["", "/contact-us-light", "/imprint", "/terms-and-conditions", "/privacy-cookies", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://www.mediadustry.com${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/contact-us-light" ? 0.9 : 0.4,
  }));
}
