import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-f5-265s');

export const metadata: Metadata = model
  ? {
      title: 'M-DA-H-F5 265S (HKS M-DA-H-F5 265S) | Sourcing & Alternative Supply',
      description:
        'The M-DA-H-F5 265S is the HKS mobile-version helical hydraulic rotary actuator code for this base size, in the M-DA-H programme, rated at about 42900 Nm output torque at 210 bar, 480 kg at 180 degrees, 180-degree build only. HKS writes this base size as M-DA-H-F5 265S for the foot-mount build and M-DA-H-F10 265S for the flange-mount build, where the S2 straddle option is not available. In the controlled cross-reference it sits in the ~42900 Nm torque class together with Moveco RR78; the 265S is a short large-bore design whose S1 cantilever moment capacity is lower than the 265; these are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service; we do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability. Configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/hks-f5-265s' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
