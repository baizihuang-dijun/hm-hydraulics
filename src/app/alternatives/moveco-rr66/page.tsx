import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel } from '@/components/alternatives/model-data';

const model = getModel('moveco-rr66');

export const metadata: Metadata = model
  ? {
      title: 'Moveco RR66 | Sourcing & Alternative Supply | HM Hydraulics',
      description: 'The Moveco RR66 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 20000 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~18645 Nm torque class together with: Helac L30-165; HKS F5 245. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/moveco-rr66' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} />;
}
