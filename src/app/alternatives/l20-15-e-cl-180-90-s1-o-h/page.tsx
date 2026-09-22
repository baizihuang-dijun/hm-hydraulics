import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l20-15-e-cl-180-90-s1-o-h');

export const metadata: Metadata = model
  ? {
      title: 'L20-15-E-CL-180/90-S1-O-H Replacement | Helac Alternative',
      description: 'Replacement rotary actuator for the Helac L20-15-E-CL-180/90-S1-O-H, matched on rotation, weight and mounting interface. Send your model or part number to verify.',
      alternates: { canonical: '/alternatives/l20-15-e-cl-180-90-s1-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
