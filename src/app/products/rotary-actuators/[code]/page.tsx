import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HmrModelPage, hmrModelMetadata } from '@/components/hmr/hmr-model-page';
import { HMR_DYNAMIC_PAGE_CODES } from '@/lib/hmr/hmr-model-pages';

export function generateStaticParams() {
  return HMR_DYNAMIC_PAGE_CODES.map((code) => ({ code: code.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const upper = code.toUpperCase();
  if (!HMR_DYNAMIC_PAGE_CODES.includes(upper)) {
    return { title: 'Not found', robots: { index: false } };
  }
  return hmrModelMetadata(upper);
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const upper = code.toUpperCase();
  if (!HMR_DYNAMIC_PAGE_CODES.includes(upper)) return notFound();
  return <HmrModelPage code={upper} />;
}
