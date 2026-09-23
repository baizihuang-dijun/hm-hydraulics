import type { Metadata } from 'next';
import { MiningDrillRigsPage } from '@/components/alternatives/mining-drill-rigs-page';

export const metadata: Metadata = {
  title: 'Mining Drill Rig Rotary Actuator Cross-Reference | Atlas Copco, Epiroc, Sandvik | HM Hydraulics',
  description:
    'Cross-reference rotary actuators for Atlas Copco, Epiroc and Sandvik mining drill rigs by OEM part number or machine model. Independent replacement actuators matched to Helac-compatible mounting interfaces.',
  alternates: { canonical: '/alternatives/mining-drill-rigs' },
};

export default function MiningDrillRigsRoute() {
  return <MiningDrillRigsPage />;
}
