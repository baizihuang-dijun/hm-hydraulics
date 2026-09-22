import type { Metadata } from 'next';
import { SeriesPage } from '@/components/alternatives/series-page';

export const metadata: Metadata = {
  title: 'Helac HTX Series Replacement Actuators | HM Hydraulics',
  description: 'Helac HTX series splined-shaft rotary actuator replacements for high-torque drill equipment. Verify by model or part number.',
  alternates: { canonical: '/alternatives/helac-htx-series' },
};

export default function Page() {
  return <SeriesPage code="HTX" />;
}
