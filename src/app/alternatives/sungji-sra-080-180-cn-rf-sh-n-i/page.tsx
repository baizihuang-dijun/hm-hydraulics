import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sungji-sra-080-180-cn-rf-sh-n-i');

export const metadata: Metadata = model
  ? {
      title: 'Sungji SRA-080-180-CN-RF-SH-N-I | Sourcing & Alternative Supply',
      description: 'The Sungji SRA-080-180-CN-RF-SH-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 196.1 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~196.1 Nm torque class together with: HKS M-DA-H 50. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/sungji-sra-080-180-cn-rf-sh-n-i' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
