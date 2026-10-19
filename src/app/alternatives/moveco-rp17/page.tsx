import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('moveco-rp17');

export const metadata: Metadata = model
  ? {
      title: 'Moveco RP17 | Sourcing & Alternative Supply | HM Hydraulics',
      description: 'The Moveco RP17 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 505 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~509 Nm torque class together with: Helac L20-4.5; HKS M-DA-H-F7 70; Sungji SRB-080-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/moveco-rp17' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
