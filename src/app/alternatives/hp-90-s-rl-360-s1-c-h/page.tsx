import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hp-90-s-rl-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'HP-90-S-RL-360 Replacement | Sandvik 76350010',
      description:
        'Alternative 360-degree rail-mount helical rotary actuator for the Helac HP-90-S-RL-360-S1-C-H, listed by Sandvik under part number 76350010. Configuration, mounting and ports confirmed against your nameplate and drawing before quoting.',
      alternates: { canonical: '/alternatives/hp-90-s-rl-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
