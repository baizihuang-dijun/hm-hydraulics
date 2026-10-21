import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('sungji-srs-090-220-cn-ft-ds-n-i');

export const metadata: Metadata = model
  ? {
      title: 'Sungji SRS-090-220-CN-FT-DS-N-I | Sourcing & Alternative Supply',
      description: 'The Sungji SRS-090-220-CN-FT-DS-N-I is a helical hydraulic rotary actuator from Sungji (SJH, Korea); the ordering code follows the SRA/SRB/SRS family, bore size, rotation, valve, mounting and seal segments, rated at about 1696.6 Nm output torque at 210 bar. The SRS family is a fixed 220-degree, dual-spline-output, foot-mounted design. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/sungji-srs-090-220-cn-ft-ds-n-i' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
