import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PartPage } from '@/components/alternatives/part-page';
import { getOemPartBySlug, oemPartSlugs } from '@/components/alternatives/oem-parts';

export function generateStaticParams() {
  return oemPartSlugs.map((slug) => ({ pn: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pn: string }>;
}): Promise<Metadata> {
  const { pn } = await params;
  const g = getOemPartBySlug(pn);
  if (!g) return { title: 'Not found', robots: { index: false } };
  const oldNumbers = g.allNumbers.filter((n) => n !== g.primary);
  const title = `${g.brand} ${g.primary} Replacement Rotary Actuator`;
  const description =
    `Replacement rotary actuator for ${g.brand} part ${g.primary}` +
    (oldNumbers.length ? ` (replaces/equivalent to ${oldNumbers.join(', ')})` : '') +
    (g.machines.length ? `. Reported on ${g.machines.slice(0, 6).join(', ')}.` : '.') +
    ' Send your tag to verify fit before ordering.';
  return {
    title,
    description,
    alternates: { canonical: `/alternatives/${g.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ pn: string }> }) {
  const { pn } = await params;
  const g = getOemPartBySlug(pn);
  if (!g) return notFound();
  return <PartPage g={g} />;
}
