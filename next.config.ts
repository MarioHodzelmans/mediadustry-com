import type { NextConfig } from "next";
// Preserve static rendering/CDN caching. Next's hydration needs inline scripts;
// external scripts stay limited to this origin, without eval in production.
const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.alexkamsmaparket.nl",
  "font-src 'self'",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "media-src 'self' blob:",
  "frame-src 'self' https://www.alexkamsmaparket.nl",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
].join("; ");
const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.alexkamsmaparket.nl",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      ...["/opt-in", "/afmelden"].map((source) => ({
        source,
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      })),
    ];
  },
  async redirects() {
    // Keep the purchased template examples available for local development;
    // public visitors should only see MEDIADUSTRY's actual pages and content.
    const templateRoutes = isDevelopment
      ? []
      : [
          ...[
            "/index-branding-studio",
            "/index-software-development-company",
            "/index-web-developer",
            "/index-creative-agency",
            "/index-design-studio",
            "/index-web-studio",
            "/index-digital-designer",
            "/index-personal-portfolio",
            "/index-freelancer-portfolio",
            "/preview",
            "/about-me",
            "/about-us",
            "/team",
            "/blog-standard",
            "/blog-creative",
            "/blog-article",
          ].map((source) => ({ source, destination: "/", permanent: true })),
          ...[
            "/works-default",
            "/works-grid",
            "/works-grid-sticky",
            "/project-details",
            "/work",
            "/work/:slug",
          ].map((source) => ({
            source,
            destination: "/#werk",
            permanent: true,
          })),
          { source: "/services", destination: "/#diensten", permanent: true },
          { source: "/pricing", destination: "/contact", permanent: true },
          { source: "/faq", destination: "/#faq", permanent: true },
        ];
    return [
      { source: "/index-digital-agency", destination: "/", permanent: true },
      ...templateRoutes,
    ];
  },
};

export default nextConfig;
