import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { buildSearchIndex, thumbFor } from '@/components/alternatives/model-data';
import { oemPartGroups } from '@/components/alternatives/oem-parts';
import { AlternativesBrowser } from '@/components/alternatives/alternatives-browser';

export const metadata: Metadata = {
  title: 'Helac, HKS, Moveco Rotary Actuator Cross-Reference',
  description:
    'Find alternative replacements for Helac, HKS, Moveco, Sungji and ECKART rotary actuators. Search 80+ models by model code or OEM part number for JLG, Genie, Sandvik, Atlas Copco, Epiroc, RESEMIN and Putzmeister equipment; engineering verifies each match.',
  alternates: { canonical: '/alternatives' },
};

const modelIndex = buildSearchIndex().map((m) => ({ ...m, kind: 'model' as const }));
const oemPartIndex = oemPartGroups.map((g) => ({
  model: g.primary,
  slug: g.slug,
  originBrand: g.brand,
  equipmentMakes: [g.brand],
  parts: g.allNumbers,
  machines: g.machines.map((m) => `${g.brand} ${m}`),
  kind: 'part' as const,
  image: g.image,
  thumb: thumbFor(g.image),
}));
const searchIndex = [...modelIndex, ...oemPartIndex];

const faqs = [
  {
    q: 'Do you supply direct replacements for Helac, HKS or Moveco rotary actuators?',
    a: 'We supply alternative rotary actuators that match Helac, HKS, Moveco and Sungji units used on Atlas, Sandvik and other equipment. Rotation, weight and mounting interface are checked against your original unit before we confirm the exact replacement model.',
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
    { '@type': 'ListItem', position: 2, name: 'Cross-Reference', item: 'https://www.hmhydraulics.com/alternatives' },
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
            <span className="text-[#1B1E20]">Cross-Reference</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">REPLACEMENT &amp; CROSS-REFERENCE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-5">
            Rotary Actuator Cross-Reference Lookup
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            Search by actuator brand (Helac, HKS, Moveco, Sungji, ECKART) or by equipment make and
            part number — JLG, Genie, Sandvik, Atlas Copco / Epiroc, RESEMIN and Putzmeister — to
            find a matching replacement rotary actuator. Our engineering team confirms rotation,
            mounting interface and shaft configuration against your unit tag before quoting.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#search"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Search by model or part number
            </a>
            <a
              href="#rfq"
              className="inline-flex items-center px-5 py-2.5 bg-white text-[#1B1E20] text-sm font-medium rounded border border-[rgba(44,74,115,0.20)] no-underline hover:border-[rgba(44,74,115,0.40)] transition-colors duration-150"
            >
              Ask us to check a model
            </a>
          </div>
        </div>
      </section>

      {/* Search landing */}
      <section id="search" className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
            Model or part-number search
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-2">
            Find your actuator reference
          </h2>
          <p className="text-sm text-[#62666C] mb-8">
            Search by actuator model code, OEM part number, equipment make or machine model across our
            cross-reference library.
          </p>
          <AlternativesBrowser searchIndex={searchIndex} />
          <p className="mt-12 text-sm text-[#62666C] leading-relaxed max-w-2xl">
            The model codes and OEM part numbers here are search starting points for identifying your
            unit. They are <strong>not</strong> a claim that every code has been verified against a
            physical nameplate &mdash; every build is confirmed against the unit nameplate and mounting
            drawing before we quote. Don&apos;t see your part number? Send us the tag and we&apos;ll
            identify it.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            <Link
              href="/alternatives/jlg-aerial-work-platform"
              className="block rounded-lg border border-[rgba(44,74,115,0.14)] bg-white p-5 no-underline hover:border-[#2C4A73] transition-colors"
            >
              <p className="font-heading text-base font-medium text-[#1B1E20]">JLG boom lift parts</p>
              <p className="text-xs text-[#62666C] mt-1 leading-relaxed">
                JLG aerial work platform rotary actuators — current &amp; superseded part numbers.
              </p>
            </Link>
            <Link
              href="/alternatives/genie-boom-lifts"
              className="block rounded-lg border border-[rgba(44,74,115,0.14)] bg-white p-5 no-underline hover:border-[#2C4A73] transition-colors"
            >
              <p className="font-heading text-base font-medium text-[#1B1E20]">Genie boom lift parts</p>
              <p className="text-xs text-[#62666C] mt-1 leading-relaxed">
                Genie S- &amp; Z-series GT rotary actuator part numbers.
              </p>
            </Link>
            <Link
              href="/alternatives/mining-drill-rigs"
              className="block rounded-lg border border-[rgba(44,74,115,0.14)] bg-white p-5 no-underline hover:border-[#2C4A73] transition-colors"
            >
              <p className="font-heading text-base font-medium text-[#1B1E20]">Mining drill rig parts</p>
              <p className="text-xs text-[#62666C] mt-1 leading-relaxed">
                Atlas Copco / Epiroc, Sandvik, RESEMIN &amp; Putzmeister drill and bolting rigs.
              </p>
            </Link>
          </div>
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

      {/* RFQ */}
      <section id="rfq" className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">Request a check</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Send us your model details
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
              <RfqForm context="Model to be confirmed" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
