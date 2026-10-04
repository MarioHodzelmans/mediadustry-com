import type { Metadata } from "next";
import ThankYou from "@/components/funnel/ThankYou";
import SiteFooter from "@/components/footers/SiteFooter";

export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag",
  description: "De volgende stap na je aanvraag bij MEDIADUSTRY.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/bedankt" },
};

export default function ThankYouPage() {
  return (
    <>
      <ThankYou />
      <SiteFooter />
    </>
  );
}
