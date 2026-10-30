import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-f5-200');

export const metadata: Metadata = model
  ? {
      title: 'M-DA-H-F5 200 (HKS F5 200) | Sourcing & Alternative Supply',
      description: 'The M-DA-H-F5 200 is the HKS mobile-version helical hydraulic rotary actuator code for this base size, in the M-DA-H programme, rated at about 10700 Nm output torque at 210 bar, 160 kg at 180 degrees and 200 kg at 360 degrees. HKS writes this base size as M-DA-H-F5 200 for the foot-mount build and M-DA-H-F10 200 for the flange-mount build, where the S2 straddle option is not available. The maker table lists 180-degree and 360-degree builds for this base size. In the controlled cross-reference it sits in the ~10700 Nm torque class together with Helac L30-95; these are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service; we do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability. Configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/hks-f5-200' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
