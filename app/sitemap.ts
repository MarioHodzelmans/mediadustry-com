import type { MetadataRoute } from "next";
import { realCases } from "@/data/realCases";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.mediadustry.com/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.mediadustry.com/contact",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://www.mediadustry.com/website-check",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.mediadustry.com/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...realCases.map((item) => ({
      url: `https://www.mediadustry.com/werk/${item.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
  ];
}
