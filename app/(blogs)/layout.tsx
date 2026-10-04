import Footer2 from "@/components/footers/Footer2";
import LegacyTemplateLayout from "@/components/common/LegacyTemplateLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <LegacyTemplateLayout>
      {children}
      <Footer2 />
    </LegacyTemplateLayout>
  );
}
