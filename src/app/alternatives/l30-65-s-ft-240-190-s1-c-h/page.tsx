import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l30-65-s-ft-240-190-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L30-65-FT-190/240 Replacement | Sandvik 76350019 / 76350008',
      description:
        'Replacement foot-mount rotary actuator for the Helac L30-65-S-FT-240/190-S1-C-H, Sandvik parts 76350019 and 76350008, commonly listed on the Solo 5 and Solo 5V drill rigs. L30-65 class, 190/240-degree rotation, about 7,345 Nm. Verify by serial number and nameplate.',
      alternates: { canonical: '/alternatives/l30-65-s-ft-240-190-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
