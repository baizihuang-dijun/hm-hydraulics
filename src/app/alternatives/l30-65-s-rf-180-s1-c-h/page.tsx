import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l30-65-s-rf-180-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L30-65-RF-180 Replacement | Atlas Copco / Epiroc 3128312607',
      description:
        '180° rear-flange replacement rotary actuator matched to Atlas Copco / Epiroc part 3128312607 (Helac L30-65-S-RF-180-S1-C-H), 107 kg mining class; rotation, flange and ports confirmed against your nameplate.',
      alternates: { canonical: '/alternatives/l30-65-s-rf-180-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
