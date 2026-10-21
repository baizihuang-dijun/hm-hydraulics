import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('t20-45-e-ft-220-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Helac T20-45-E-FT-220-S1-C-H Replacement | T20-45 220° Dual-Splined-Shaft-Foot-Mount Actuator',
      description:
        'Replacement for the Helac T20-45 220-degree dual splined-shaft foot-mount catalog configuration T20-45-E-FT-220-S1-C-H: ~5,085 Nm at 207 bar, SAE ports, counterbalance valve. Full engineering data and cross-brand torque-class alternatives; configuration confirmed against your unit tag before quote.',
      alternates: { canonical: '/alternatives/t20-45-e-ft-220-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
