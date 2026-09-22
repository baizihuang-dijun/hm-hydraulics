import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l10-5-5-e-rf-360-s1-o-h');

export const metadata: Metadata = model
  ? {
      title: 'L10-5.5-E-RF-360-S1-O-H Replacement | Helac Alternative',
      description: 'Replacement rotary actuator for the Helac L10-5.5-E-RF-360-S1-O-H, matched on rotation, weight and mounting interface. Send your model or part number to verify.',
      alternates: { canonical: '/alternatives/l10-5-5-e-rf-360-s1-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
