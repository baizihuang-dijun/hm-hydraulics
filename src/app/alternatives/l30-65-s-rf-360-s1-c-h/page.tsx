import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l30-65-s-rf-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L30-65-S-RF-360-S1-C-H Replacement | Atlas 3128312644',
      description:
        'Replacement rotary actuator for Helac L30-65-S-RF-360-S1-C-H, Atlas Copco / Epiroc part 3128312644 on the Boomer 282 mining drill rig. 360-degree round-flange unit; verify by model or part number.',
      alternates: { canonical: '/alternatives/l30-65-s-rf-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
