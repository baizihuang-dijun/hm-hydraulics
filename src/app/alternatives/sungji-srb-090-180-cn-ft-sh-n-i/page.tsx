import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sungji-srb-090-180-cn-ft-sh-n-i');

export const metadata: Metadata = model
  ? {
      title: 'Sungji SRB-090 | Sourcing & Alternative Supply',
      description: 'The Sungji SRB-090 is a helical hydraulic rotary actuator from Sungji (SJH, Korea), rated at about 1029.7 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~927 Nm torque class together with: Helac L20-8.2; HKS M-DA-H-F7 85; Moveco RP24. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/sungji-srb-090-180-cn-ft-sh-n-i' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
