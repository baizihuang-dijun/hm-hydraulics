import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l10-9-5-m-rf-185-s-c-h');

export const metadata: Metadata = model
  ? {
      title: 'L10-9.5-M-RF-185 Replacement | Atlas 9106178448 | Boomer 353',
      description: 'Replacement rotary actuator for the Helac L10-9.5-M-RF-185-S-C-H, Atlas Copco / Epiroc part 9106178448 on the Boomer 353 face-drill rig. 185-degree, 26 kg class. Verify by part number.',
      alternates: { canonical: '/alternatives/l10-9-5-m-rf-185-s-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
