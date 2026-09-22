import type { Metadata } from 'next';
import { SeriesPage } from '@/components/alternatives/series-page';

export const metadata: Metadata = {
  title: 'Helac HP Series Replacement Actuators | HM Hydraulics',
  description: 'Helac HP series flanged rotary actuator replacements from compact flanged units to the HP125. Verify by model or part number.',
  alternates: { canonical: '/alternatives/helac-hp-series' },
};

export default function Page() {
  return <SeriesPage code="HP" />;
}
