import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://mediadustry.com",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://mediadustry.com/contact",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
