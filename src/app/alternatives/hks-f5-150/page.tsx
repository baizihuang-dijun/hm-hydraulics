import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-f5-150');

export const metadata: Metadata = model
  ? {
      title: 'HKS F5 150 | Sourcing & Alternative Supply',
      description: 'The HKS F5 150 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 4750 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~4746 Nm torque class together with: Helac L30-42; Moveco RR46; Sungji SRC-150-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/hks-f5-150' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
