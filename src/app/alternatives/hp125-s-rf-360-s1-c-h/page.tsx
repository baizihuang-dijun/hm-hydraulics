import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('hp125-s-rf-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'HP125-S-RF-360 Replacement | Atlas 3128312645 (L3D)',
      description: 'Heavy-duty replacement rotary actuator for the Helac HP125-S-RF-360-S1-C-H, Atlas Copco / Epiroc part 3128312645 (L3D) on Boomer M2d, XL3, 353, L2c and L2d rigs. Verify by part number.',
      alternates: { canonical: '/alternatives/hp125-s-rf-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
