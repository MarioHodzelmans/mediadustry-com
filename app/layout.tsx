import "@/styles/template.css";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  metadataBase: new URL("https://mediadustry.com"),
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
    url: "https://mediadustry.com",
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
  url: "https://mediadustry.com",
  logo: "https://mediadustry.com/icon-512.png",
  image: "https://mediadustry.com/opengraph-image.png",
  email: "info@mediadustry.com",
  vatID: "NL062176468B02",
  taxID: "54271932",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("template.theme")?.value;
  const initialTheme = cookieTheme === "dark" ? "dark" : "light";

  return (
    <html
      lang="nl"
      className="no-touch"
      color-scheme={initialTheme}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var loaded=false;var apply=function(){if(loaded)return;loaded=true;['plugins','main'].forEach(function(name){var link=document.createElement('link');link.rel='stylesheet';link.href='/css/'+name+'.css';document.head.appendChild(link)});removeEventListener('pointerdown',apply);removeEventListener('keydown',apply);removeEventListener('scroll',apply)};if(location.pathname!=='/'){apply();return;}addEventListener('pointerdown',apply,{once:true,passive:true});addEventListener('keydown',apply,{once:true});addEventListener('scroll',apply,{once:true,passive:true});})();`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
