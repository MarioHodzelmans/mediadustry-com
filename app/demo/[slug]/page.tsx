import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShowcase, getShowcases } from "@/content/showcases";
import Showcase from "@/components/showcase/Showcase";

export function generateStaticParams() {
  return getShowcases("demo").map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const item = getShowcase("demo", (await params).slug);
  if (!item) return {};
  return {
    title: item.seo.title,
    description: item.seo.description,
    alternates: { canonical: `https://www.mediadustry.com/demo/${item.slug}` },
    robots: { index: false, follow: true },
  };
}
export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const item = getShowcase("demo", (await params).slug);
  if (!item) notFound();
  return <Showcase showcase={item} />;
}
