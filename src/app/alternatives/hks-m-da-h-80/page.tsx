import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-m-da-h-80');

export const metadata: Metadata = model
  ? {
      title: 'HKS M-DA-H 80 | Sourcing & Alternative Supply',
      description: 'The HKS M-DA-H 80 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 1073 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~1074 Nm torque class together with: Helac L10-9.5; Sungji SRA-140-180-CN-RF-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/hks-m-da-h-80' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
