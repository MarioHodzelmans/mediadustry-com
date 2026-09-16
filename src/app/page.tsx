import CreativeStudioMain from "@/pages/homes/creative-studio/CreativeStudioMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediadustry — Digital agency & headless commerce",
  description: "Strategie, webdesign, development en headless Shopify voor organisaties die digitaal willen groeien.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MEDIADUSTRY",
    url: "https://www.mediadustry.com",
    email: "info@mediadustry.com",
    telephone: "+31624383998",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tenelenweg 11",
      postalCode: "6367 VR",
      addressLocality: "Voerendaal",
      addressCountry: "NL",
    },
    areaServed: "Nederland",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CreativeStudioMain />
    </>
  );
}
