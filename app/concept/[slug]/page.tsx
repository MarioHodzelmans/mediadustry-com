import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShowcase, getShowcases } from "@/content/showcases";
import Showcase from "@/components/showcase/Showcase";

export function generateStaticParams() { return getShowcases("concept").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getShowcase("concept", (await params).slug);
  if (!item) return {};
  return { title: item.seo.title, description: item.seo.description, robots: { index: false, follow: false, nocache: true } };
}
export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getShowcase("concept", (await params).slug);
  if (!item) notFound();
  return <Showcase showcase={item} />;
}
