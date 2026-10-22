import type { Metadata } from 'next';
import { AerialHubPage } from '@/components/alternatives/aerial-hub-page';

export const metadata: Metadata = {
  title: 'Genie Boom Lift Actuator Replacement | S & Z Series GT Parts',
  description:
    'Replacement rotary actuators for Genie S-series telescopic and Z-series articulating boom lifts. Cross-reference Genie GT part numbers (94397GT, 226541GT, 233715GT, 94398GT, 88576GT) with reported machine fitment. Send your tag to verify.',
  alternates: { canonical: '/alternatives/genie-boom-lifts' },
};

export default function Page() {
  return <AerialHubPage brand="Genie" />;
}
