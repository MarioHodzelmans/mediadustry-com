import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/services/InnerHeadline";
import ServicesDescriptionStack from "@/components/other-pages/services/ServicesDescriptionStack";
import ParallaxDividerImage from "@/components/other-pages/services/ParallaxDividerImage";
import BlogPreview from "@/components/other-pages/services/BlogPreview";
import CTAWithMarquee from "@/components/other-pages/services/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Services | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function ServicesPage() {
  return (
    <>
      <>
        <InnerHeadline />
        <ServicesDescriptionStack />
        <ParallaxDividerImage />
        <BlogPreview />
        <CTAWithMarquee />
      </>
    </>
  );
}
