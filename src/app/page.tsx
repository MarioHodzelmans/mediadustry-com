import CreativeStudioMain from "@/pages/homes/creative-studio/CreativeStudioMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mediadustry — Digital agency & headless commerce",
  description: "Strategie, webdesign, development en headless Shopify voor organisaties die digitaal willen groeien.",
};

export default function Home() {
  return (
    <CreativeStudioMain />
  );
}
