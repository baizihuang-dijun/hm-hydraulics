import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-da-h-125');

export const metadata: Metadata = model
  ? {
      title: 'HKS DA-H 125 / I-DA-H 125 Rotary Actuator | 5,100 Nm Alternative',
      description:
        'Alternative supply for the HKS DA-H 125 and I-DA-H 125 helical rotary actuator — 5,100 Nm at 210 bar, 90/180/270/360°. Send your nameplate and mounting drawing for a fit check.',
      alternates: { canonical: '/alternatives/hks-da-h-125' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
