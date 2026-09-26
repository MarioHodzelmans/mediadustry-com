import Footer2 from "@/components/footers/Footer2";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import SiteChrome from "@/components/headers/SiteChrome";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <TemplateRuntimeProvider>
      <SiteChrome />
      {children}
      <Footer2 />
    </TemplateRuntimeProvider>
  );
}
