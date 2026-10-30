import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-f5-350');

export const metadata: Metadata = model
  ? {
      title: 'HKS F5 350 (M-DA-H-F5 350) | Sourcing & Alternative Supply',
      description:
        'The HKS F5 350 is a mobile-version helical hydraulic rotary actuator in the M-DA-H programme, rated at about 83600 Nm output torque at 210 bar, 1100 kg at 180 degrees, 180-degree build only. HKS writes this base size as M-DA-H-F5 350 for the foot-mount build and M-DA-H-F10 350 for the flange-mount build, where the S2 straddle option is not available. In the controlled cross-reference it sits in the ~83600 Nm torque class together with no Helac, Moveco or Sungji size in that class; the HM HMR range does reach it; these are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service; we do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability. Configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/hks-f5-350' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
