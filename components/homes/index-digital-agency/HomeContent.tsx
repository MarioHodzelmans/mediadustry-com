import Footer3 from "@/components/footers/Footer3";
import AboutProcess from "./AboutProcess";
import ProjectsShowcase from "./ProjectsShowcase";
import ServicesList from "./ServicesList";
import ParallaxDividerVideo from "./ParallaxDividerVideo";
import ParallaxDividerImage from "./ParallaxDividerImage";
import Divider from "./Divider";

export default function HomeContent() {
  return (
    <>
      <AboutProcess />
      <ProjectsShowcase />
      <ServicesList />
      <ParallaxDividerVideo />
      <ParallaxDividerImage />
      <Divider />
      <Footer3 />
    </>
  );
}
