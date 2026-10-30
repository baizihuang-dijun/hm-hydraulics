import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sungji-srs-115-220-cn-ft-ds-n-i');

export const metadata: Metadata = model
  ? {
      title: 'Sungji SRS-115 | Sourcing & Alternative Supply',
      description: 'The Sungji SRS-115 is a helical hydraulic rotary actuator from Sungji (SJH, Korea), rated at about 3049.9 Nm output torque at 210 bar. The SRS family is a fixed 220-degree, dual-spline-output, foot-mounted design. In the controlled cross-reference it sits in the ~2825 Nm torque class together with: Helac T20-25; Helac T30-27. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/sungji-srs-115-220-cn-ft-ds-n-i' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
