import { Inter, Space_Grotesk } from "next/font/google";
import GlobalVideoModal from "@/components/Popup/GlobalVideoModal";
import { VideoProvider } from "@/provider/VideoProvider";
import AppProvider from "@/provider/AppProvider";
import Wrapper from "@/layouts/wrapper";
import type { Metadata } from "next";
import "swiper/css/bundle";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mediadustry.com"),
  title: "MEDIADUSTRY — Digital agency & headless commerce",
  description: "Strategie, webdesign, development en headless Shopify voor organisaties die digitaal willen groeien.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "MEDIADUSTRY — Digitale groei zonder ruis",
    description: "Strategie, webdesign, development en headless Shopify vanuit Zuid-Limburg.",
    url: "/",
    siteName: "MEDIADUSTRY",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className="no-js agntix-light" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} ${inter.variable} ${spaceGrotesk.variable}`}>
        <AppProvider>
          <Wrapper>
            <VideoProvider>{children}</VideoProvider>
            <GlobalVideoModal />
          </Wrapper>
        </AppProvider>
      </body>
    </html>
  );
}
