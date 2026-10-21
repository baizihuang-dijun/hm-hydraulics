import type { Metadata } from 'next';
import { SeriesPage } from '@/components/alternatives/series-page';
import { getModelsBySeries, SITE } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'Helac L20 Series Replacement Actuators',
  description: 'Mid-size Helac L20 series rotary actuator replacements including compound-angle builds. Send your model or part number to verify.',
  alternates: { canonical: '/alternatives/helac-l20-series' },
};

export default function Page() {
  return <SeriesPage code="L20" models={getModelsBySeries('L20')} site={SITE} />;
}
