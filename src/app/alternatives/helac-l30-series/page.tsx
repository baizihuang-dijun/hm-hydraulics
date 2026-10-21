import type { Metadata } from 'next';
import { SeriesPage } from '@/components/alternatives/series-page';
import { getModelsBySeries, SITE } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'Helac L30 Series Replacement Actuators',
  description: 'Large Helac L30 series rotary actuator replacements with flange mounts for heavy-duty rigs. Verify by model or part number.',
  alternates: { canonical: '/alternatives/helac-l30-series' },
};

export default function Page() {
  return <SeriesPage code="L30" models={getModelsBySeries('L30')} site={SITE} />;
}
