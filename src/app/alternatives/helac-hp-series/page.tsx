import type { Metadata } from 'next';
import { SeriesPage } from '@/components/alternatives/series-page';
import { getModelsBySeries, SITE } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'Helac HP Series Replacement Actuators',
  description: 'Helac HP series flanged rotary actuator replacements from compact flanged units to the HP125. Verify by model or part number.',
  alternates: { canonical: '/alternatives/helac-hp-series' },
};

export default function Page() {
  return <SeriesPage code="HP" models={getModelsBySeries('HP')} site={SITE} />;
}
