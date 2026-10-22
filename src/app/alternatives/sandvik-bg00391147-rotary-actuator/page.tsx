import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sandvik-bg00391147-rotary-actuator');

export const metadata: Metadata = model
  ? {
      title: 'Sandvik BG00391147 Rotary / Torque Actuator | DD321-40 Sourcing',
      description:
        'Sourcing and alternative-supply support for Sandvik OEM part BG00391147, the heavy-duty rotary / torque turning unit on the DD321-40 development drill (380 kg class); mounting, shaft and ports confirmed against your nameplate and drawing.',
      alternates: { canonical: '/alternatives/sandvik-bg00391147-rotary-actuator' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
