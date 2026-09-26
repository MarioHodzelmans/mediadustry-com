import { cookies } from "next/headers";
import Header1 from "@/components/headers/Header1";
import MenuRuntimeShell from "@/components/headers/MenuRuntimeShell";

export default async function SiteChrome() {
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("template.theme")?.value === "dark" ? "dark" : "light";
  return <><Header1 initialTheme={initialTheme} /><MenuRuntimeShell /></>;
}
