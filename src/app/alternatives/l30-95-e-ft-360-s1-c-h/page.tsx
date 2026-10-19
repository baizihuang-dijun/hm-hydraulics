import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l30-95-e-ft-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Helac L30-95-E-FT-360-S1-C-H Replacement | L30 360° Foot-Mount Actuator',
      description:
        'Replacement for the Helac L30-95 360-degree foot-mount catalog configuration L30-95-E-FT-360-S1-C-H: ~10,735 Nm at 207 bar, SAE ports, counterbalance valve. Full L30 engineering data and 180° vs 360° build comparison; configuration confirmed against your unit tag before quote.',
      alternates: { canonical: '/alternatives/l30-95-e-ft-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
