import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('moveco-rp46');

export const metadata: Metadata = model
  ? {
      title: 'Moveco RP46 | Sourcing & Alternative Supply',
      description: 'The Moveco RP46 is a helical hydraulic rotary actuator from Moveco (Italy). The maker publishes the short size designation only; the full suffix after the size code is not disclosed in the available catalogue and has to be confirmed with the factory, rated at about 4800 Nm output torque at 210 bar. This entry covers the 180-degree configuration only. In the controlled cross-reference it sits in the ~4407 Nm torque class together with: Helac L20-39; HKS M-DA-H-F7 145; Sungji SRB-160-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/moveco-rp46' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
