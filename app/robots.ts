import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/contact"],
      disallow: [
        "/404",
        "/preview",
        "/about-me",
        "/about-us",
        "/blog-article",
        "/blog-creative",
        "/blog-standard",
        "/faq",
        "/index-",
        "/pricing",
        "/project-details",
        "/services",
        "/team",
        "/works-",
      ],
    },
    sitemap: "https://mediadustry.com/sitemap.xml",
    host: "https://mediadustry.com",
  };
}
