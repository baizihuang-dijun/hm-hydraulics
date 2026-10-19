import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l20-4-5-e-ft-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Helac L20-4.5-E-FT-360-S1-C-H Replacement | L20-4.5 360° Foot-Mount Actuator',
      description:
        'Replacement for the Helac L20-4.5 360-degree foot-mount catalog configuration L20-4.5-E-FT-360-S1-C-H: ~509 Nm at 207 bar, SAE ports, counterbalance valve. Full engineering data and cross-brand torque-class alternatives; configuration confirmed against your unit tag before quote.',
      alternates: { canonical: '/alternatives/l20-4-5-e-ft-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
