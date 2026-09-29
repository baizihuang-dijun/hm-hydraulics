import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('l10-3-0-e-rf-180-s1-o-h');

export const metadata: Metadata = model
  ? {
      title: 'L10-3.0-E-RF-180-S1-O-H / Husqvarna RS8500D 541 20 09-94 Replacement',
      description:
        'Replacement steering rotary actuator for the Helac L10-3.0-E-RF-180-S1-O-H used on the Husqvarna RS8500D, OEM part 541 20 09-94. 180°, 3,000 in-lb, 12 kg. Send your tag or part number to verify.',
      alternates: { canonical: '/alternatives/l10-3-0-e-rf-180-s1-o-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
