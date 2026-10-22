import type { Metadata } from 'next';
import { JlgAerialPage } from '@/components/alternatives/jlg-aerial-page';

export const metadata: Metadata = {
  title: 'JLG Aerial Work Platform Actuator Replacement',
  description:
    'Replacement rotary actuators for JLG boom lifts and aerial work platforms. Cross-reference 14 JLG part numbers (GT and 10-digit codes). Send your tag to verify.',
  alternates: { canonical: '/alternatives/jlg-aerial-work-platform' },
};

export default function Page() {
  return <JlgAerialPage />;
}
