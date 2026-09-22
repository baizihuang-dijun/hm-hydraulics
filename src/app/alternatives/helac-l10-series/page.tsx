import type { Metadata } from 'next';
import { SeriesPage } from '@/components/alternatives/series-page';

export const metadata: Metadata = {
  title: 'Helac L10 Series Replacement Actuators | HM Hydraulics',
  description: 'Compact Helac L10 series rotary actuator replacements, 180 and 360 degree, 12 to 26 kg. Send your model or part number to verify.',
  alternates: { canonical: '/alternatives/helac-l10-series' },
};

export default function Page() {
  return <SeriesPage code="L10" />;
}
