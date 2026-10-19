import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('hp50-ms-rl-230-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'HP50-MS-RL-230 Replacement | Epiroc 3128312643 / 3129316303',
      description:
        'Replacement heavy-duty 230-degree rail-mount rotary actuator for the Helac HP50-MS-RL-230-S1-C-H, Atlas Copco / Epiroc parts 3128312643 and 3129316303, commonly listed on Boomer 104, K41, K41x and Simba drill rigs. Verify by serial number and nameplate.',
      alternates: { canonical: '/alternatives/hp50-ms-rl-230-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
