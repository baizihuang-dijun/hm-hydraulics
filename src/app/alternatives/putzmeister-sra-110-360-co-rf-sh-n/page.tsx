import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('putzmeister-sra-110-360-co-rf-sh-n');

export const metadata: Metadata = model
  ? {
      title: 'SRA-110-360-CO-RF-SH-N Actuator | Putzmeister Sourcing & Supply',
      description:
        'Sourcing and alternative-supply support for the SRA-110-360-CO-RF-SH-N compact 360° rear-flange helical rotary actuator recorded on Putzmeister equipment; full code, mounting, shaft and ports confirmed against your nameplate.',
      alternates: { canonical: '/alternatives/putzmeister-sra-110-360-co-rf-sh-n' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
