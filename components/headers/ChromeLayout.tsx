import type { ReactNode } from "react";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import SiteChrome from "@/components/headers/SiteChrome";

export default function ChromeLayout({ children }: { children: ReactNode }) {
  return <TemplateRuntimeProvider><SiteChrome />{children}</TemplateRuntimeProvider>;
}
