import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('htx70-ms-rf-360-ss-o-h');

export const metadata: Metadata = model
  ? {
      title: 'HTX70-MS-RF-360-SS-O-H Replacement | Helac Alternative',
      description: 'Replacement rotary actuator for the Helac HTX70-MS-RF-360-SS-O-H, matched on rotation, weight and mounting interface. Send your model or part number to verify.',
      alternates: { canonical: '/alternatives/htx70-ms-rf-360-ss-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
