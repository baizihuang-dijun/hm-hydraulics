import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('putzmeister-sra-110-240-co-rf-sh-n');

export const metadata: Metadata = model
  ? {
      title: 'SRA-110-240-CO-RF-SH-N Actuator for Putzmeister | Sourcing & Supply',
      description:
        'Sourcing and alternative-supply support for the SRA-110-240-CO-RF-SH-N 240° rear-flange helical rotary actuator (factory parts number RA1101K03-0) used on Putzmeister equipment; angle, mounting, shaft and ports confirmed against your nameplate.',
      alternates: { canonical: '/alternatives/putzmeister-sra-110-240-co-rf-sh-n' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
