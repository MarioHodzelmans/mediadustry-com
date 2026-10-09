import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { validCustomerToken } from "@/lib/quotes/config";
import { hasDatabase } from "@/lib/quotes/db";
import { ensureQuote } from "@/lib/quotes/workflow";
import { DietwiejOfferPage } from "../page";

export const metadata: Metadata = {
  title: "Persoonlijke offerte — Gastrobar Die Twie",
  robots: { index: false, follow: false, nocache: true },
};

export default async function PersonalOfferPage({
  params,
}: PageProps<"/offerte/dietwiej/[token]">) {
  const { token } = await params;
  if (!validCustomerToken(token)) notFound();
  if (hasDatabase() && process.env.DIETWIEJ_QUOTE_ID) await ensureQuote(token);
  return <DietwiejOfferPage token={token} />;
}
