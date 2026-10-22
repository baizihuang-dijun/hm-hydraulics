import type { Metadata } from 'next';
import { AerialHubPage } from '@/components/alternatives/aerial-hub-page';

export const metadata: Metadata = {
  title: 'JLG Boom Lift & Aerial Work Platform Actuator Replacement',
  description:
    'Replacement rotary actuators for JLG boom lifts and aerial work platforms. Cross-reference current and superseded JLG part numbers (1001178269, 1001217780, 1001307717 and more), with reported machine fitment. Send your tag to verify.',
  alternates: { canonical: '/alternatives/jlg-aerial-work-platform' },
};

export default function Page() {
  return <AerialHubPage brand="JLG" />;
}
