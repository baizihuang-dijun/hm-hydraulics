import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l40-110-m-rf-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L40-110-M-RF-360 Replacement | Atlas 3128341070',
      description: 'Heavy-duty replacement rotary actuator for the Helac L40-110-M-RF-360-S1-C-H, Atlas Copco / Epiroc part number 3128341070. 360-degree, 140 kg class. Verify by part number or tag.',
      alternates: { canonical: '/alternatives/l40-110-m-rf-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
