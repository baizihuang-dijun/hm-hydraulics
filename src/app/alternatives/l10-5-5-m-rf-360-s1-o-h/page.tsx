import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l10-5-5-m-rf-360-s1-o-h');

export const metadata: Metadata = model
  ? {
      title: 'L10-5.5-M-RF-360 Replacement | Sandvik 76350015 | Atlas 3128309281',
      description: 'Replacement rotary actuator for the Helac L10-5.5-M-RF-360-S1-O-H, Sandvik 76350015 / 76350006 and Atlas 3128309281 on the Boltec 235, 235h, Lc and Md. Verify by part number.',
      alternates: { canonical: '/alternatives/l10-5-5-m-rf-360-s1-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
