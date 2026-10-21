import type { Metadata } from 'next';
import { SeriesPage } from '@/components/alternatives/series-page';
import { getModelsBySeries, SITE } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'Helac L40 Series Replacement Actuators',
  description: 'Heavy-duty Helac L40 series rotary actuator replacements for the largest rotation duties. Verify by model or part number.',
  alternates: { canonical: '/alternatives/helac-l40-series' },
};

export default function Page() {
  return <SeriesPage code="L40" models={getModelsBySeries('L40')} site={SITE} />;
}
