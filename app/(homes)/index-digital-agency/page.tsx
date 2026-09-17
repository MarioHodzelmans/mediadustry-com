import { Metadata } from "next";
import Hero from "@/components/homes/index-digital-agency/Hero";
import DeferredHomeContent from "@/components/homes/index-digital-agency/DeferredHomeContent";
export const metadata: Metadata = {
  title: "MEDIADUSTRY | Digital design & development",
  description:
    "MEDIADUSTRY creëert onderscheidende merken, websites, webshops en digitale ervaringen vanuit Voerendaal.",
};
export default function IndexDigitalAgencyPage() {
  return (
    <>
      <>
        <Hero />
        <DeferredHomeContent />
      </>
    </>
  );
}
