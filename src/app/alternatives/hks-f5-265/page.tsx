import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-f5-265');

export const metadata: Metadata = model
  ? {
      title: 'M-DA-H-F5 265 (HKS M-DA-H-F5 265) | Sourcing & Alternative Supply',
      description:
        'The M-DA-H-F5 265 is the HKS mobile-version helical hydraulic rotary actuator code for this base size, in the M-DA-H programme, rated at about 24300 Nm output torque at 210 bar, 360 kg at 180 degrees and 480 kg at 360 degrees. HKS writes this base size as M-DA-H-F5 265 for the foot-mount build and M-DA-H-F10 265 for the flange-mount build, where the S2 straddle option is not available. In the controlled cross-reference it sits in the ~24300 Nm torque class together with Helac L30-215 and Moveco RR72; these are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service; we do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability. Configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/hks-f5-265' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
