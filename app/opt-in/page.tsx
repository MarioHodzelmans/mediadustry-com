import type { Metadata } from "next";
import ConsentAction from "@/components/funnel/ConsentAction";
import SiteFooter from "@/components/footers/SiteFooter";

export const metadata: Metadata = {
  title: "Bevestig je e-mailaanmelding",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  alternates: { canonical: "/opt-in" },
};

export default async function OptInPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  return (
    <>
      <ConsentAction
        token={typeof token === "string" ? token : ""}
        purpose="confirm"
      />
      <SiteFooter />
    </>
  );
}
