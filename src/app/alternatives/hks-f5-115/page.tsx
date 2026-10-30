import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hks-f5-115');

export const metadata: Metadata = model
  ? {
      title: 'HKS F5 115 | Sourcing & Alternative Supply',
      description: 'The M-DA-H-F5 115 is a mobile-version helical hydraulic rotary actuator in HKS\'s M-DA-H programme (German maker). HKS uses its own bore/housing size numbers; the code is a size designation, not a torque figure and not a Helac size number, rated at about 1920 Nm output torque at 210 bar. The maker\'s table lists 180° / 360° builds for this base size. In the controlled cross-reference it sits in the ~1921 Nm torque class together with: Helac L30-17; Moveco RR34; Sungji SRC-115-180-CN-FT-SH-N-I. These are same-torque-class engineering references only. HM Hydraulics provides technical selection support and sourcing / alternative-supply service for this reference. We do not hold it as a stocked SKU and do not promise stock, lead time or confirmed availability; configuration, mounting dimensions and drawings are checked on request against your actuator nameplate before any quotation.',
      alternates: { canonical: '/alternatives/hks-f5-115' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
