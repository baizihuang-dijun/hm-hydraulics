import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';

export const metadata: Metadata = {
  title: 'Helac Replacement & Cross-Reference Guide',
  description:
    'Find a replacement for Helac L10, HP and HP125 rotary actuators used on Atlas and Sandvik equipment. Confirm your model code, part number and mounting dimensions with our engineering team.',
  alternates: { canonical: '/alternatives' },
};

const series = [
  {
    name: 'L10 Series',
    href: '/alternatives/helac-l10-series',
    models: '7 models',
    range: '12–26 kg · 180–360°',
    description:
      'Compact L10 helical rotary actuators found on Sandvik and Atlas drilling and bolting rigs.',
    state: 'published',
  },
  {
    name: 'L20 Series',
    href: '/alternatives/helac-l20-series',
    models: '1 model',
    range: '56 kg · 180/90°',
    description:
      'Mid-size L20 helical actuators including compound-angle builds for mid-size equipment.',
    state: 'published',
  },
  {
    name: 'L30 Series',
    href: '/alternatives/helac-l30-series',
    models: '3 models',
    range: '49–94 kg · 180–360°',
    description:
      'Large L30 flange and round-flange actuators for heavy-duty rotation on larger rigs.',
    state: 'published',
  },
  {
    name: 'L40 Series',
    href: '/alternatives/helac-l40-series',
    models: '1 model',
    range: '140 kg · 360°',
    description:
      'Heavy-duty L40 helical actuators for the largest rotation duties.',
    state: 'published',
  },
  {
    name: 'HTX Series',
    href: '/alternatives/helac-htx-series',
    models: '1 model',
    range: 'HTX70 · 360°',
    description:
      'Splined-shaft HTX70 actuators used on Atlas Boomer and Simba rigs.',
    state: 'published',
  },
  {
    name: 'HP Series',
    href: '/alternatives/helac-hp-series',
    models: '2 models',
    range: '27–208 kg · 180–360°',
    description:
      'Flanged helical actuators from the compact HP-15 to the large HP125, OEM part 3128312645 / L3D.',
    state: 'published',
  },
];

const faqs = [
  {
    q: 'Do you supply direct replacements for Helac rotary actuators?',
    a: 'We supply alternative rotary actuators that match Helac L-series, HP and HP125 units used on Atlas and Sandvik equipment. Rotation, weight and mounting interface are checked against your original unit before we confirm the exact replacement model.',
  },
  {
    q: 'What information do you need to confirm the right replacement?',
    a: 'The model code on the actuator tag, the OEM part number if visible, and the machine it is fitted to. A photo of the tag and the mounting face lets our engineering team confirm the interface and rotation quickly.',
  },
  {
    q: 'Is the HM replacement model number published online?',
    a: 'No. The exact HM model and price are confirmed per inquiry so we can verify mounting dimensions and operating parameters with you first, rather than risk a mismatched part.',
  },
  {
    q: 'What is the lead time for a replacement rotary actuator?',
    a: 'Lead time depends on the model and quantity. Standard models are typically available within 2-4 weeks. Send your model code for an accurate timeline.',
  },
  {
    q: 'Do you ship worldwide?',
    a: 'Yes, we ship to mining and construction operations worldwide. Freight and customs arrangements are handled per shipment.',
  },
  {
    q: 'Can you match actuators for machines not listed on your site?',
    a: 'Yes. If your machine model is not listed, send the actuator model code and machine details — we check compatibility for models beyond our published catalog.',
  },
  {
    q: 'What is the difference between Helac L10, L20, L30, and L40?',
    a: 'The series indicate size and torque capacity. L10 is compact (12-26 kg), L20 is mid-size, L30 is large flange-mount, and L40 is heavy-duty for the largest rotation duties.',
  },
  {
    q: 'How do I know if I need to rebuild or replace my actuator?',
    a: 'If only seals are worn and the housing is intact, rebuild may work. If there is torque loss, shaft damage, or housing cracks, replacement is usually more reliable. See our rebuild vs replacement guide for details.',
    link: { href: '/alternatives/rebuild-vs-replacement', label: 'rebuild vs replacement guide' },
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hmhydraulics.com/' },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: 'https://www.hmhydraulics.com/alternatives' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.link ? `${f.a.split(' See our')[0]}. See our ${f.link.label}: ${`https://www.hmhydraulics.com${f.link.href}`}` : f.a },
  })),
};

export default function AlternativesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, faqJsonLd]) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-[#62666C]">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Helac Alternatives</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">REPLACEMENT &amp; CROSS-REFERENCE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-5">
            Replacement Guide for Helac Rotary Actuators
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            Looking for a replacement for a Helac rotary actuator? We supply drop-in alternatives
            matched to the original mounting interface, shaft, rotation angle, and torque specs
            across all Helac series — L10, L20, L30, L40, HTX, and HP. Send us the model code or OEM
            part number from the actuator tag, and our engineering team confirms the exact match
            before you order.
          </p>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl">
            If the Helac actuator on your Atlas or Sandvik machine is worn, damaged or past its
            service life, we supply an alternative matched to the original interface. Browse by
            series, or send us the model code and part number on the tag — our engineering team
            confirms the exact replacement before you commit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/alternatives/helac-l10-series"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Browse L10 series
            </Link>
            <a
              href="#rfq"
              className="inline-flex items-center px-5 py-2.5 bg-white text-[#1B1E20] text-sm font-medium rounded border border-[rgba(44,74,115,0.20)] no-underline hover:border-[rgba(44,74,115,0.40)] transition-colors duration-150"
            >
              Ask us to check a model
            </a>
          </div>
          <p className="mt-4 text-sm text-[#62666C]">Last reviewed: September 2026</p>
        </div>
      </section>

      {/* Series grid */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
            Browse by series
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Select your Helac series
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((item) => (
              <div
                key={item.name}
                className="group relative p-6 border bg-white rounded-md transition-colors duration-150 border-[rgba(44,74,115,0.10)] hover:border-[rgba(44,74,115,0.25)]"
              >
                <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                  {item.models}
                </p>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed mb-3">
                  {item.description}
                </p>
                <p className="font-label text-xs text-[#62666C] mb-4">{item.range}</p>
                {item.state === 'published' ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline"
                  >
                    View models
                    <svg className="ml-1.5 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-[#62666C]">
                    Available on inquiry &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-[#62666C] leading-relaxed max-w-2xl">
            This guide covers 14 confirmed Helac model codes across six series. If
            your model is not listed, send the details and we will check the
            available option.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl divide-y divide-[rgba(44,74,115,0.10)]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-heading text-base md:text-lg font-medium text-[#1B1E20]">
                  {f.q}
                  <span className="ml-4 text-[#2C4A73] text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[#4A4E54] leading-relaxed">
                  {f.link ? (
                    <>
                      {f.a.split(' See our')[0]}. See our{' '}
                      <Link href={f.link.href} className="text-[#2C4A73] no-underline hover:underline">
                        {f.link.label}
                      </Link>{' '}
                      for details.
                    </>
                  ) : (
                    f.a
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">LEARN MORE</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/alternatives/rebuild-vs-replacement"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                Rebuild vs Replacement Guide
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Compare costs, downtime, and risk factors.
              </p>
            </Link>
            <Link
              href="/alternatives/cross-reference-guide"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                Cross-Reference Guide
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Match OEM part numbers to the right replacement.
              </p>
            </Link>
            <Link
              href="/alternatives/how-to-identify"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                How to Identify Your Helac Actuator
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Read model tags and decode model codes.
              </p>
            </Link>
            <Link
              href="/alternatives/jlg-aerial-work-platform"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                JLG Aerial Work Platform
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Cross-reference JLG part numbers for boom lift replacements.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">Request a check</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Send us your Helac model details
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Give us the model code, the part number on the tag and the machine it
                is fitted to. We confirm the matching alternative, mounting interface
                and availability — usually within one working day.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{" "}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">
                  hm@hmhydraulics.com
                </a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Helac model to be confirmed" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
