import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l10-15-e-rf-180-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Helac L10-15-E-RF-180-S1-C-H Replacement | L10-15 180° rear-flange Actuator',
      description:
        'Replacement for the Helac L10-15 180-degree rear-flange catalog configuration L10-15-E-RF-180-S1-C-H: ~1,695 Nm at 207 bar, SAE ports, counterbalance valve. Full L10 engineering data and cross-brand torque-class alternatives; configuration confirmed against your unit tag before quote.',
      alternates: { canonical: '/alternatives/l10-15-e-rf-180-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
