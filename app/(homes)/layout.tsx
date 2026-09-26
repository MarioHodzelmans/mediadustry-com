import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import SiteChrome from "@/components/headers/SiteChrome";

export default function HomesLayout({ children }: { children: React.ReactNode }) {
  return <TemplateRuntimeProvider><SiteChrome />{children}</TemplateRuntimeProvider>;
}
