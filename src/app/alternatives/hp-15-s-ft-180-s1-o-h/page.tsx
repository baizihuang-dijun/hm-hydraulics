import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('hp-15-s-ft-180-s1-o-h');

export const metadata: Metadata = model
  ? {
      title: 'HP-15-S-FT-180-S1-O-H Replacement | Helac Alternative',
      description: 'Replacement rotary actuator for the Helac HP-15-S-FT-180-S1-O-H, matched on rotation, weight and mounting interface. Send your model or part number to verify.',
      alternates: { canonical: '/alternatives/hp-15-s-ft-180-s1-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
