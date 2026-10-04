import type { ReactNode } from "react";
import "@/styles/template.css";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";

/** Animation and vendor styles belong to the template demonstrations. */
export default function LegacyTemplateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TemplateRuntimeProvider>{children}</TemplateRuntimeProvider>;
}
