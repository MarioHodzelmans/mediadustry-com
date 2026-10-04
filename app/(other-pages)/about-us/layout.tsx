import LegacyTemplateLayout from "@/components/common/LegacyTemplateLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LegacyTemplateLayout>{children}</LegacyTemplateLayout>;
}
