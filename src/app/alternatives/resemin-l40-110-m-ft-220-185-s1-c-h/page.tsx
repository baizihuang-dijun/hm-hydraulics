import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('resemin-l40-110-m-ft-220-185-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L40-110-M-FT-220/185 Actuator for RESEMIN | Sourcing & Supply',
      description:
        'Sourcing and alternative-supply support for the L40-110-M-FT-220/185-S1-C-H heavy-duty foot-mount helical rotary actuator (220° / 185°) used on RESEMIN drilling equipment; angle, mount and ports confirmed against your nameplate and drawing.',
      alternates: { canonical: '/alternatives/resemin-l40-110-m-ft-220-185-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
