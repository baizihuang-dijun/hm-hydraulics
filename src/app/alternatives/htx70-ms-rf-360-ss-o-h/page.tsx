import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('htx70-ms-rf-360-ss-o-h');

export const metadata: Metadata = model
  ? {
      title: 'HTX70-MS-RF-360 Replacement | Atlas 3128307978 | HM Hydraulics',
      description: 'Replacement splined-shaft rotary actuator for the Helac HTX70-MS-RF-360-SS-O-H, Atlas Copco / Epiroc part 3128307978 on the Boomer 104, K41, K41x and Simba H157 rigs. Verify by part number.',
      alternates: { canonical: '/alternatives/htx70-ms-rf-360-ss-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
