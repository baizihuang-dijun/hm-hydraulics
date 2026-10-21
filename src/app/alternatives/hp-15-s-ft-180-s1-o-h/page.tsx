import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hp-15-s-ft-180-s1-o-h');

export const metadata: Metadata = model
  ? {
      title: 'HP-15-S-FT-180 Replacement | Sandvik 76350011',
      description: 'Replacement rotary actuator for the Helac HP-15-S-FT-180-S1-O-H, Sandvik part number 76350011. 180-degree foot/flange mount, 27 kg class. Verify by part number or tag.',
      alternates: { canonical: '/alternatives/hp-15-s-ft-180-s1-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
