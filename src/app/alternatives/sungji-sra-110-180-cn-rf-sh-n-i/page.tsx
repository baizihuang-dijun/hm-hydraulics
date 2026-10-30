import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sungji-sra-110-180-cn-rf-sh-n-i');

export const metadata: Metadata = model
  ? {
      title: 'Sungji SRA-110 | Sourcing & Alternative Supply',
      description: 'The Sungji SRA-110 is a helical hydraulic rotary actuator from Sungji (SJH, Korea), rated at about 735.5 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~735.5 Nm torque class together with: HKS M-DA-H 63. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/sungji-sra-110-180-cn-rf-sh-n-i' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
