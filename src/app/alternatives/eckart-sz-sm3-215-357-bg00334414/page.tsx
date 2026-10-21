import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('eckart-sz-sm3-215-357-bg00334414');

export const metadata: Metadata = model
  ? {
      title: 'ECKART SZ.SM3.215-357°/SO | Sandvik BG00334414 | Sourcing & Alternative Supply',
      description:
        'ECKART SZ.SM3.215-357°/SO helical hydraulic rotary actuator, listed by Sandvik under OEM part number BG00334414. HM provides sourcing and alternative-supply support; configuration, mounting and interchangeability are confirmed against your nameplate and drawing before quoting.',
      alternates: { canonical: '/alternatives/eckart-sz-sm3-215-357-bg00334414' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
