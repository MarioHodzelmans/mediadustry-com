import Footer3 from "@/components/footers/Footer3";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import SiteChrome from "@/components/headers/SiteChrome";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <TemplateRuntimeProvider>
      <SiteChrome />
      {/* <div className="mxd-page-content inner-page-content"> */}
      {children}
      {/* </div> */}
      <Footer3 />
    </TemplateRuntimeProvider>
  );
}
