import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l40-110-m-rf-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L40-110-M-RF-360-S1-C-H Replacement | Helac Alternative',
      description: 'Replacement rotary actuator for the Helac L40-110-M-RF-360-S1-C-H, matched on rotation, weight and mounting interface. Send your model or part number to verify.',
      alternates: { canonical: '/alternatives/l40-110-m-rf-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
