import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('sungji-srb-140-180-cn-ft-sh-n-i');

export const metadata: Metadata = model
  ? {
      title: 'Sungji SRB-140-180-CN-FT-SH-N-I | Sourcing & Alternative Supply | HM Hydraulics',
      description: 'The Sungji SRB-140-180-CN-FT-SH-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 3069.5 Nm output torque at 210 bar. In the controlled cross-reference it sits in the ~2825 Nm torque class together with: Helac L20-25; Moveco RP40; HKS M-DA-H-F7 125. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/sungji-srb-140-180-cn-ft-sh-n-i' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
