import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('resemin-l10-3-0-m-rf-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L10-3.0-M-RF-360 Actuator for RESEMIN | Sourcing & Supply',
      description:
        'Sourcing and alternative-supply support for the L10-3.0-M-RF-360-S1-C-H compact 360° rear-flange helical rotary actuator used on RESEMIN drilling equipment; exact build, ports and mounting confirmed against your nameplate.',
      alternates: { canonical: '/alternatives/resemin-l10-3-0-m-rf-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
