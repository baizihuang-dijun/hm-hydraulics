import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-da-h-280');

export const metadata: Metadata = model
  ? {
      title: 'HKS DA-H 280 | Sourcing & Alternative Supply',
      description:
        "The HKS DA-H 280 is a helical hydraulic rotary actuator in HKS's large-bore industrial programme, rated at about 60,800 Nm output torque at 210 bar. The number 280 is an HKS bore / housing size designation, not a torque figure and not another maker's size number. In the controlled cross-reference it sits in the 60,800 Nm torque class, matched to HM's own HMR1-6000 build. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.",
      alternates: { canonical: '/alternatives/hks-da-h-280' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
