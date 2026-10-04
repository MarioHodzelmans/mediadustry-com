import { Metadata } from "next";
import RealWorkHome from "@/components/home/RealWorkHome";
import NativeFooter3 from "@/components/footers/NativeFooter3";
import "@/styles/home-fonts.css";

export const metadata: Metadata = {
  title: "MEDIADUSTRY | Strategie, webdesign & development",
  description:
    "MEDIADUSTRY helpt organisaties en ondernemers met positionering, webdesign en development. Bekijk recente cases uit Limburg.",
};

export default function IndexDigitalAgencyPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        media="(min-width: 701px)"
        type="image/avif"
        href="/img/cases/responsive/bouwservice-peskens-720.avif"
        imageSrcSet={[384, 720, 1080, 1440]
          .map(
            (width) =>
              `/img/cases/responsive/bouwservice-peskens-${width}.avif ${width}w`,
          )
          .join(", ")}
        imageSizes="(max-width: 1050px) 94vw, 50vw"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/inter-home-latin.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/jetbrains-mono-home-latin.woff2"
        crossOrigin="anonymous"
      />
      <RealWorkHome />
      <NativeFooter3 />
    </>
  );
}
