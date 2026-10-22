import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sandvik-bg01035613-rotary-actuator');

export const metadata: Metadata = model
  ? {
      title: 'Sandvik BG01035613 Rotary / Torque Actuator | DD321-40 Sourcing',
      description:
        'Sourcing and alternative-supply support for Sandvik OEM part BG01035613, the heavy-duty rotary / torque turning unit recorded on the DD321-40 development drill (380 kg class); configuration confirmed against your nameplate and drawing.',
      alternates: { canonical: '/alternatives/sandvik-bg01035613-rotary-actuator' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
