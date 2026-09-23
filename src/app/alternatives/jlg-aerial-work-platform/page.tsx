import type { Metadata } from 'next';
import { JlgAerialPage } from '@/components/alternatives/jlg-aerial-page';

export const metadata: Metadata = {
  title: 'JLG Aerial Work Platform Actuator Replacement | Cross-Reference by Part Number | HM Hydraulics',
  description:
    'Replacement rotary actuators for JLG aerial work platforms and boom lifts. Cross-reference 14 JLG part numbers (GT and 10-digit codes). Send your number and tag photo to verify.',
  alternates: { canonical: '/alternatives/jlg-aerial-work-platform' },
};

export default function Page() {
  return <JlgAerialPage />;
}
