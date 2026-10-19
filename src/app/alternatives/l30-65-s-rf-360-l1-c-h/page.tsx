import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l30-65-s-rf-360-l1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L30-65-RF-360-L1 Replacement | Sandvik 76350018',
      description:
        'Replacement 360-degree rear-flange rotary actuator for the Helac L30-65-S-RF-360-L1-C-H mining build, Sandvik part 76350018, commonly listed on DD210 development-drill and bolter rigs. L30-65 class, about 7,345 Nm. Verify by serial number and nameplate.',
      alternates: { canonical: '/alternatives/l30-65-s-rf-360-l1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
