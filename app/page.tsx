import type { Metadata } from "next";
import RealWorkHome from "@/components/home/RealWorkHome";
import SiteFooter from "@/components/footers/SiteFooter";

export const metadata: Metadata = {
  title: { absolute: "MEDIADUSTRY | Strategie, webdesign & development" },
  description:
    "Een snelle website die vertrouwen wekt en aanvragen oplevert. Werk direct met Mario aan strategie, webdesign en development. Vraag een gratis websitecheck aan.",
  alternates: { canonical: "https://www.mediadustry.com/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "MEDIADUSTRY",
    url: "https://www.mediadustry.com/",
    title: "MEDIADUSTRY | Strategie, webdesign & development",
    description:
      "Van een scherp verhaal naar een snelle website. Bekijk echte cases en ontdek de kansen voor jouw website met een gratis persoonlijke websitecheck.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MEDIADUSTRY | Strategie, webdesign & development",
    description:
      "Van een scherp verhaal naar een snelle website. Bekijk echte cases en vraag een gratis persoonlijke websitecheck aan.",
    images: ["/opengraph-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <RealWorkHome />
      <SiteFooter />
    </>
  );
}
