import Footer3 from "@/components/footers/Footer3";
import { Metadata } from "next";
import Hero from "@/components/homes/index-digital-agency/Hero";
import AboutProcess from "@/components/homes/index-digital-agency/AboutProcess";
import ProjectsShowcase from "@/components/homes/index-digital-agency/ProjectsShowcase";
import ServicesList from "@/components/homes/index-digital-agency/ServicesList";
import ParallaxDividerVideo from "@/components/homes/index-digital-agency/ParallaxDividerVideo";
import Divider from "@/components/homes/index-digital-agency/Divider";
export const metadata: Metadata = {
  title: "MEDIADUSTRY | Digital design & development",
  description:
    "MEDIADUSTRY creëert onderscheidende merken, websites, webshops en digitale ervaringen.",
};
export default function IndexDigitalAgencyPage() {
  return (
    <>
      <>
        <Hero />
        <AboutProcess />
        <ProjectsShowcase />
        <ServicesList />
        <ParallaxDividerVideo />
        <Divider />
      </>
      <Footer3 />
    </>
  );
}
