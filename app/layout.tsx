import "@/styles/site.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header1 from "@/components/headers/Header1";
import MenuRuntimeShell from "@/components/headers/MenuRuntimeShell";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mediadustry.com"),
  applicationName: "MEDIADUSTRY",
  title: {
    default: "MEDIADUSTRY | Digital design & development",
    template: "%s | MEDIADUSTRY",
  },
  description:
    "Strategie, AI, design en development voor merken die digitaal vooruit willen.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.mediadustry.com",
    siteName: "MEDIADUSTRY",
    title: "MEDIADUSTRY | Digital design & development",
    description:
      "Strategie, AI, design en development voor merken die digitaal vooruit willen.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MEDIADUSTRY | Digital design & development",
    description:
      "Strategie, AI, design en development voor merken die digitaal vooruit willen.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
  category: "digital agency",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MEDIADUSTRY",
  url: "https://www.mediadustry.com",
  logo: "https://www.mediadustry.com/icon-512.png",
  image: "https://www.mediadustry.com/opengraph-image.png",
  email: "info@mediadustry.com",
  vatID: "NL062176468B02",
  taxID: "54271932",
};

// Read the optional display preference before paint while keeping pages cacheable.
const themeBootstrap = `var t;try{t=localStorage.getItem('template.theme')}catch{}try{if(t!=='light'&&t!=='dark'){var m=document.cookie.match(/(?:^|; )template\\.theme=(light|dark)(?:;|$)/);t=m&&m[1]}if(t==='light'||t==='dark')document.documentElement.setAttribute('color-scheme',t)}catch{}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className="no-touch"
      color-scheme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        style={
          {
            "--_font-default": "var(--font-inter)",
            "--_font-accent": "var(--font-jetbrains-mono)",
          } as React.CSSProperties
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a href="#site-content" className="md-skip-link">
          Direct naar inhoud
        </a>
        <Header1 />
        <MenuRuntimeShell />
        <div id="site-content" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
