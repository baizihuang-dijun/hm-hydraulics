import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Analytics } from '@/components/analytics';
import { ConsentBanner } from '@/components/consent-banner';
import { graphLd, organizationLd, webSiteLd } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hmhydraulics.com'),
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
    url: 'https://www.hmhydraulics.com/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HM Hydraulics — hydraulic rotary actuators and core components',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
    title: 'HM Hydraulics — Hydraulic Rotary Actuators & Components',
    description:
      'Technical sourcing partner for core hydraulic components. 1,000,000-cycle endurance documented. Every rotary actuator pressure-tested before shipment.',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graphLd([organizationLd(), webSiteLd()])),
          }}
        />
      </head>
      <body className="antialiased bg-[#FAFAF7] text-[#1B1E20]">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
