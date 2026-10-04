import type { Metadata } from "next";
import ConsentAction from "@/components/funnel/ConsentAction";
import SiteFooter from "@/components/footers/SiteFooter";

export const metadata: Metadata = {
  title: "Afmelden voor e-mailtips",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  alternates: { canonical: "/afmelden" },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  return (
    <>
      <ConsentAction
        token={typeof token === "string" ? token : ""}
        purpose="unsubscribe"
      />
      <SiteFooter />
    </>
  );
}
