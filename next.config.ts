import type { NextConfig } from "next";
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
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
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    // Production serves the generated homepage; development keeps its source editable.
    if (process.env.NODE_ENV !== "production") return [];
    return {
      beforeFiles: [
        { source: "/", destination: "/native-home.html" },
        { source: "/index-digital-agency", destination: "/native-home.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
