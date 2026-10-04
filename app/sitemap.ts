import type { MetadataRoute } from "next";
import { realCases } from "@/data/realCases";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://www.mediadustry.com",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.mediadustry.com/contact",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...realCases.map((item) => ({
      url: `https://www.mediadustry.com/werk/${item.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
  ];
}
