import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l30-25-m-ft-180-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L30-25-M-FT-180-S1-C-H (Parker 29125) Replacement | Helac Alternative',
      description: 'Replacement rotary actuator for Helac L30-25-M-FT-180-S1-C-H, also listed by Parker as 29125 (S2 straddle build). Send your tag code or drawing to verify fit.',
      alternates: { canonical: '/alternatives/l30-25-m-ft-180-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
