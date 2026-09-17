import "@/styles/template.css";
import { JetBrains_Mono, Manrope } from "next/font/google";
import Header1 from "@/components/headers/Header1";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import MenuRuntimeShell from "@/components/headers/MenuRuntimeShell";
import { Metadata } from "next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mediadustry.com"),
  applicationName: "MEDIADUSTRY",
  title: {
    default: "MEDIADUSTRY | Digital design & development",
    template: "%s | MEDIADUSTRY",
  },
  description:
    "Strategie, design en development voor merken die digitaal vooruit willen.",
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
    url: "https://mediadustry.com",
    siteName: "MEDIADUSTRY",
    title: "MEDIADUSTRY | Digital design & development",
    description:
      "Strategie, design en development voor merken die digitaal vooruit willen.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MEDIADUSTRY | Digital design & development",
    description:
      "Strategie, design en development voor merken die digitaal vooruit willen.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
  category: "digital agency",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MEDIADUSTRY",
  url: "https://mediadustry.com",
  logo: "https://mediadustry.com/icon-512.png",
  image: "https://mediadustry.com/opengraph-image.png",
  email: "info@mediadustry.com",
  telephone: "+31624383998",
  vatID: "NL062176468B02",
  taxID: "54271932",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tenelenweg 11",
    postalCode: "6367 VR",
    addressLocality: "Voerendaal",
    addressCountry: "NL",
  },
};

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
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/video/1280x720_hero-02.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable}`}
        style={
          {
            "--_font-default": "var(--font-manrope)",
            "--_font-accent": "var(--font-jetbrains-mono)",
          } as React.CSSProperties
        }
      >
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.setAttribute('color-scheme',localStorage.getItem('template.theme')==='dark'?'dark':'light')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <TemplateRuntimeProvider>
          <Header1 initialTheme="light" />
          <MenuRuntimeShell />
          {children}
        </TemplateRuntimeProvider>
      </body>
    </html>
  );
}
