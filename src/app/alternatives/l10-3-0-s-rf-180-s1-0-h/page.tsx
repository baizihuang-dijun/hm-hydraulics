import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l10-3-0-s-rf-180-s1-0-h');

export const metadata: Metadata = model
  ? {
      title: 'L10-3.0-S-RF-180 Replacement | Sandvik 76350014 (BG00568383)',
      description: 'Replacement rotary actuator for the Helac L10-3.0-S-RF-180-S1-0-H, Sandvik part number 76350014 (BG00568383). 180-degree, 12 kg class. Verify by part number or tag.',
      alternates: { canonical: '/alternatives/l10-3-0-s-rf-180-s1-0-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
