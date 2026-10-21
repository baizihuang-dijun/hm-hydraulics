import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l30-125-m-ft-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L30-125-M-FT-360 Replacement | Epiroc 3128314313',
      description:
        'Replacement 360-degree foot-mount rotary actuator for the Helac L30-125-M-FT-360-S1-C-H, Atlas Copco / Epiroc part 3128314313, commonly listed on Simba S7D and H1257 drill rigs. L30-125 class, about 14,125 Nm. Verify by serial number and nameplate.',
      alternates: { canonical: '/alternatives/l30-125-m-ft-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
