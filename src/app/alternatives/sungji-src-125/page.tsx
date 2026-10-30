import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sungji-src-125');

export const metadata: Metadata = model
  ? {
      title: 'Sungji SRC-125 | Sourcing & Alternative Supply',
      description:
        'The Sungji SRC-125 is a helical hydraulic rotary actuator from Sungji (SJH, Korea) in the SRC family, rated at about 2824.3 Nm output torque at 210 bar and 47 kg at 180-degree rotation; the SRC series is listed at 180 degrees only. In the controlled cross-reference it sits in the ~2820 Nm torque class together with Helac L30-25, HKS F5 125 / M-DA-H-F10 125 and Moveco RR40. Same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service; we do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability. Configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/sungji-src-125' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
