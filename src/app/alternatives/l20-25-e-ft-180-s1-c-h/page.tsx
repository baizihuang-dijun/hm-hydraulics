import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l20-25-e-ft-180-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Helac L20-25-E-FT-180-S1-C-H Replacement | L20-25 180° Foot-Mount Actuator',
      description:
        'Replacement for the Helac L20-25 180-degree foot-mount catalog configuration L20-25-E-FT-180-S1-C-H: ~2,825 Nm at 207 bar, SAE ports, counterbalance valve. Full engineering data and cross-brand torque-class alternatives; configuration confirmed against your unit tag before quote.',
      alternates: { canonical: '/alternatives/l20-25-e-ft-180-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
