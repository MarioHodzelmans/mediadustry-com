import "@/styles/site-core.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header1 from "@/components/headers/Header1";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import MenuRuntimeShell from "@/components/headers/MenuRuntimeShell";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  preload: false,
  variable: "--font-inter-original",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  preload: false,
  variable: "--font-jetbrains-mono-original",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme = "light";

  return (
    <html
      id="site-top"
      lang="nl"
      className="no-touch"
      color-scheme={initialTheme}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('template.theme');if(t!=='light'&&t!=='dark'){var c=document.cookie.split('; ').find(function(v){return v.indexOf('template.theme=')===0;});t=c?c.split('=')[1]:'light';}document.documentElement.setAttribute('color-scheme',t==='dark'?'dark':'light');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        style={
          {
            "--font-inter":
              "var(--font-inter-page, var(--font-inter-original))",
            "--font-jetbrains-mono":
              "var(--font-mono-page, var(--font-jetbrains-mono-original))",
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
        <TemplateRuntimeProvider>
          <a className="md-skip-link" href="#site-content">
            Ga naar inhoud
          </a>
          <Header1 initialTheme={initialTheme} />
          <MenuRuntimeShell />
          <div id="site-content" tabIndex={-1}>
            {children}
          </div>
        </TemplateRuntimeProvider>
      </body>
    </html>
  );
}
