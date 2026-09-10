import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: {
    default: 'HM Hydraulics — Technical Sourcing Partner for Core Hydraulic Components',
    template: '%s | HM Hydraulics',
  },
  description:
    'HM Hydraulics is your technical sourcing partner for hydraulic rotary actuators and core hydraulic components. Lower risk, reliable delivery, meaningful cost savings.',
  keywords: [
    'hydraulic rotary actuator',
    'tilt actuator',
    'slew drive',
    'hydraulic components',
    'excavator tilt coupler',
    'HKS replacement',
    'Helac replacement',
    'Chinese hydraulic manufacturer',
    'OEM hydraulic sourcing',
  ],
  authors: [{ name: 'HM Hydraulics', url: 'https://hmhydraulics.com' }],
  openGraph: {
    title: 'HM Hydraulics — Technical Sourcing Partner for Core Hydraulic Components',
    description:
      'Lower risk, reliable delivery, meaningful cost savings. We bridge the gap between Chinese manufacturing capability and overseas OEM quality requirements.',
    siteName: 'HM Hydraulics',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HM Hydraulics — Hydraulic Rotary Actuators & Components',
    description:
      'Technical sourcing partner for core hydraulic components. 1M+ cycle fatigue tested. ISO9001 certified.',
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAFAF7] text-[#1B1E20]">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
