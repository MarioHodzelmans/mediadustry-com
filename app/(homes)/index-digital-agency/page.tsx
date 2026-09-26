import { Metadata } from "next";
import RealWorkHome from "@/components/home/RealWorkHome";
import HomeFooter from "@/components/home/HomeFooter";

export const metadata: Metadata = {
  title: "MEDIADUSTRY | Strategie, webdesign & development",
  description:
    "MEDIADUSTRY helpt organisaties en ondernemers met positionering, webdesign en development. Bekijk recente cases uit Limburg.",
};

export default function IndexDigitalAgencyPage() {
  return (
    <>
      <RealWorkHome />
      <HomeFooter />
    </>
  );
}
