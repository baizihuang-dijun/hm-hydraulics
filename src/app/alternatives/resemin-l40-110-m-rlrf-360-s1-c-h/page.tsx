import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('resemin-l40-110-m-rlrf-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L40-110-M-RL/RF-360 Actuator for RESEMIN | Sourcing & Supply',
      description:
        'Sourcing and alternative-supply support for the L40-110-M-RL/RF-360-S1-C-H heavy-duty 360° trunnion / rear-flange helical rotary actuator used on RESEMIN drilling equipment; mount, rotation, shaft and ports confirmed against your nameplate.',
      alternates: { canonical: '/alternatives/resemin-l40-110-m-rlrf-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
