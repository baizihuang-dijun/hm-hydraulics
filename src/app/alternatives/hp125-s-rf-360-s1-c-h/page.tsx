import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ModelPage } from '@/components/alternatives/model-page';
import { getModel, getRelatedModels } from '@/components/alternatives/model-data';

const model = getModel('hp125-s-rf-360-s1-c-h');

export const metadata: Metadata = model
  ? {
      title: 'Atlas 3128312645 (L3D) Replacement Actuator | Recorded Helac HP-class Ref.',
      description: 'Heavy-duty 360° replacement rotary actuator matched to Atlas Copco / Epiroc part 3128312645 (L3D) on Boomer M2d, XL3, 353, L2c and L2d rigs; supplied build recorded as Helac HP-class, exact model code confirmed against the nameplate.',
      alternates: { canonical: '/alternatives/hp125-s-rf-360-s1-c-h' },
    }
  : { title: 'Not found' };

export default function Page() {
  if (!model) return notFound();
  return <ModelPage d={model} related={getRelatedModels(model.slug)} />;
}
