import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l30-215-e-ft-180-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Helac L30-215-E-FT-180-S1-C-H Replacement | L30-215 180° foot-mount Actuator',
      description:
        'Replacement for the Helac L30-215 180-degree foot-mount catalog configuration L30-215-E-FT-180-S1-C-H: ~24,295 Nm at 207 bar, SAE ports, counterbalance valve. Full L30 engineering data and cross-brand torque-class alternatives; configuration confirmed against your unit tag before quote.',
      alternates: { canonical: '/alternatives/l30-215-e-ft-180-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
