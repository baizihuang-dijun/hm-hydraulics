import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l10-3-0-s-rf-180-s1-0-h');

export const metadata: Metadata = model
  ? {
      title: 'L10-3.0-S-RF-180-S1-0-H Replacement | Helac Alternative',
      description: 'Replacement rotary actuator for the Helac L10-3.0-S-RF-180-S1-0-H, matched on rotation, weight and mounting interface. Send your model or part number to verify.',
      alternates: { canonical: '/alternatives/l10-3-0-s-rf-180-s1-0-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
