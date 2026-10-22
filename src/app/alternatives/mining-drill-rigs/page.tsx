import type { Metadata } from 'next';
import { MiningDrillRigsPage } from '@/components/alternatives/mining-drill-rigs-page';

export const metadata: Metadata = {
  title: 'Mining Drill Rig Rotary Actuator Cross-Reference | Atlas Copco, Epiroc, Sandvik, RESEMIN',
  description:
    'Cross-reference rotary actuators for Atlas Copco, Epiroc, Sandvik, RESEMIN and Putzmeister mining & construction equipment by OEM part number or model code. Independent replacement actuators matched to Helac-compatible mounting interfaces.',
  alternates: { canonical: '/alternatives/mining-drill-rigs' },
};

export default function MiningDrillRigsRoute() {
  return <MiningDrillRigsPage />;
}
