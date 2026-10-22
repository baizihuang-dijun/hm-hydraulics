import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('atlas-3128309172-hks-rotary-actuator');

export const metadata: Metadata = model
  ? {
      title: 'Atlas Copco / Epiroc 3128309172 HKS Rotary Actuator | Boltec Sourcing',
      description:
        'Sourcing and alternative-supply support for Atlas Copco / Epiroc part 3128309172, an HKS rotary actuator recorded on the Boltec 235, 235h, LC and MD rock-bolting rigs; configuration confirmed against your nameplate and drawing.',
      alternates: { canonical: '/alternatives/atlas-3128309172-hks-rotary-actuator' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
