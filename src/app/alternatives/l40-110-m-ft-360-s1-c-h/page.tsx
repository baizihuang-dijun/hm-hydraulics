import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('l40-110-m-ft-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L40-110-FT-360 Replacement | Atlas Copco / Epiroc 3128341084',
      description:
        'Heavy-duty 360° foot-mount replacement rotary actuator matched to Atlas Copco / Epiroc part 3128341084 (Helac L40-110-M-FT-360-S1-C-H), 150 kg class, associated with the Boomer S2; FT mount and ports confirmed against your nameplate.',
      alternates: { canonical: '/alternatives/l40-110-m-ft-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
