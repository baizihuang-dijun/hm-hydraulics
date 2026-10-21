import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('t30-27-e-ft-220-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Helac T30-27-E-FT-220-S1-C-H Replacement | T30-27 220° Dual-Splined-Shaft-Foot-Mount Actuator',
      description:
        'Replacement for the Helac T30-27 220-degree dual splined-shaft foot-mount catalog configuration T30-27-E-FT-220-S1-C-H: ~3,051 Nm at 207 bar, SAE ports, counterbalance valve. Full engineering data and cross-brand torque-class alternatives; configuration confirmed against your unit tag before quote.',
      alternates: { canonical: '/alternatives/t30-27-e-ft-220-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
