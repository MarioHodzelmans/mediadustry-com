import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/contact/InnerHeadline";
import ParallaxDividerImage from "@/components/other-pages/contact/ParallaxDividerImage";
import SectionTitle from "@/components/other-pages/contact/SectionTitle";
import CTAWithMarquee from "@/components/other-pages/contact/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met MEDIADUSTRY voor branding, webdesign, development en digitale projecten.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "https://mediadustry.com/contact",
    title: "Contact | MEDIADUSTRY",
    description:
      "Neem contact op met MEDIADUSTRY voor branding, webdesign, development en digitale projecten.",
  },
};
export default function ContactPage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <ParallaxDividerImage />
        <SectionTitle />
        <CTAWithMarquee />
      </div>
    </>
  );
}
