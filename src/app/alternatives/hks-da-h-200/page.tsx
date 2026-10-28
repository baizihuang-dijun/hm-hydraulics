import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-da-h-200');

export const metadata: Metadata = model
  ? {
      title: 'HKS DA-H 200 | Sourcing & Alternative Supply',
      description:
        "The HKS DA-H 200 is a helical hydraulic rotary actuator in HKS's large-bore industrial programme, rated at about 22,300 Nm output torque at 210 bar. The number 200 is an HKS bore / housing size designation, not a torque figure and not another maker's size number. In the controlled cross-reference it sits in the 22,300 Nm torque class, matched to HM's own HMR1-2200 build. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.",
      alternates: { canonical: '/alternatives/hks-da-h-200' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
