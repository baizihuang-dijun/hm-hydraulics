import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'Rotary Actuator Cross-Reference Guide: From OEM Part Number to Replacement | HM Hydraulics',
  description:
    'Cross-reference a Helac rotary actuator by matching mounting interface, shaft, rotation angle, torque, and valve configuration. Send us the code for free verification.',
  alternates: { canonical: '/alternatives/cross-reference-guide' },
};

const pagePath = '/alternatives/cross-reference-guide';

const faqs = [
  {
    q: 'Can I replace a Helac actuator without the original model code?',
    a: 'Yes. If the tag is missing, we can identify the unit from stamped numbers on the housing plus measurements of the mounting pattern, shaft, and rotation angle.',
  },
  {
    q: 'What dimensions must match exactly?',
    a: 'Mounting interface pattern, shaft type and diameter, rotation angle, and valve port configuration must match exactly. Torque must be equal or higher.',
  },
  {
    q: 'How long does cross-reference verification take?',
    a: 'We confirm the match within one working day after receiving the model code, OEM part number, and any photos.',
  },
  {
    q: 'Do you publish a full cross-reference table online?',
    a: 'No. Dimensions overlap between models and OEM revisions, so a published table can create ordering errors. We verify every match before quoting.',
  },
  {
    q: 'Which Helac series do you cover?',
    a: 'We supply drop-in replacements for Helac L10, L20, L30, L40, HTX, and HP series actuators used on mining and construction equipment.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'Cross-Reference Guide', item: `${SITE}${pagePath}` },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rotary Actuator Cross-Reference Guide: From OEM Part Number to Replacement',
  description:
    'Cross-reference a Helac rotary actuator by matching mounting interface, shaft, rotation angle, torque, and valve configuration.',
  author: {
    '@type': 'Organization',
    name: 'HM Hydraulics Engineering Team',
  },
  publisher: {
    '@type': 'Organization',
    name: 'HM Hydraulics — Qingdao Hydraulic Machinery Co., Ltd.',
    url: SITE,
  },
  datePublished: '2026-09-01',
  dateModified: '2026-09-01',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function CrossReferenceGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, articleJsonLd, faqJsonLd]) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#62666C]">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/alternatives" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Helac Alternatives
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Cross-Reference Guide</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">CROSS-REFERENCE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            Rotary Actuator Cross-Reference Guide: From OEM Part Number to Replacement
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            To cross-reference a Helac rotary actuator, match five key dimensions: mounting
            interface pattern, shaft type and diameter, rotation angle, torque output, and valve
            configuration. Start with the OEM part number or model code on the actuator tag, then
            verify each dimension against the replacement specification. Send us the code and we
            confirm the match within one working day.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: September 2026</p>
        </div>
      </section>

      {/* What Cross-Reference Matches */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            What Cross-Reference Actually Matches
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.20)]">
                  <th className="py-3 pr-4 font-heading text-sm font-medium text-[#1B1E20]">Field</th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">Why it matters</th>
                  <th className="py-3 pl-4 font-heading text-sm font-medium text-[#1B1E20]">Where to find it</th>
                </tr>
              </thead>
              <tbody className="text-[#4A4E54]">
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Mounting interface</td>
                  <td className="py-3 px-4">Determines bolt pattern and flange fit on the machine.</td>
                  <td className="py-3 pl-4">Model tag, mounting face, or service manual</td>
                </tr>
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Shaft type &amp; diameter</td>
                  <td className="py-3 px-4">Controls connection to the driven component.</td>
                  <td className="py-3 pl-4">Shaft end measurement or tag</td>
                </tr>
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Rotation angle</td>
                  <td className="py-3 px-4">Must equal the required swing to avoid machine damage.</td>
                  <td className="py-3 pl-4">Model tag or machine specification</td>
                </tr>
                <tr className="border-b border-[rgba(44,74,115,0.10)]">
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Torque output</td>
                  <td className="py-3 px-4">Replacement must meet or exceed the original rating.</td>
                  <td className="py-3 pl-4">Datasheet or model code</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-[#1B1E20]">Valve configuration</td>
                  <td className="py-3 px-4">Defines port size, position, and integrated valve options.</td>
                  <td className="py-3 pl-4">Model tag or port inspection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Read Model Code */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            How to Read a Helac Model Code
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            A Helac model code is a compact string that states series, size, mounting style, shaft,
            rotation angle, and valve option in a fixed order. Reading it correctly is the fastest
            way to identify a replacement.
          </p>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            For a full position-by-position breakdown, see our{' '}
            <Link href="/alternatives/how-to-identify" className="text-[#2C4A73] no-underline hover:underline">
              How to Identify Your Helac Actuator
            </Link>{' '}
            guide.
          </p>
          <div className="p-5 bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-md max-w-3xl">
            <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-2">Example</p>
            <p className="font-mono text-sm text-[#1B1E20]">L10-5-5-M-RF-360-S1-O-H</p>
          </div>
        </div>
      </section>

      {/* From OEM Part Number to Replacement */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            From OEM Part Number to Replacement
          </h2>
          <ol className="list-decimal pl-5 space-y-4 text-[#4A4E54] leading-relaxed max-w-3xl">
            <li>
              <strong className="text-[#1B1E20]">Locate the tag or stamp.</strong> Find the silver
              plastic tag or stamped numbers on the actuator housing.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Record both codes.</strong> Write down the Helac
              model code and the OEM part number from your machine manufacturer.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Send for verification.</strong> Email us the codes
              with photos of the tag, mounting face, and shaft.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Receive a confirmed match.</strong> We check the
              dimensions and quote the correct replacement before you order.
            </li>
          </ol>
        </div>
      </section>

      {/* Match vs Equivalence */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            What Must Match Exactly vs What Allows Equivalence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">Must match exactly</h3>
              <ul className="list-disc pl-5 space-y-2 text-[#4A4E54] leading-relaxed">
                <li>Mounting bolt pattern and pilot diameter</li>
                <li>Shaft type, diameter, and key/spline detail</li>
                <li>Rotation angle and end stops</li>
                <li>Valve port size and position</li>
              </ul>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">Allows equivalence</h3>
              <ul className="list-disc pl-5 space-y-2 text-[#4A4E54] leading-relaxed">
                <li>Torque: replacement may exceed original rating</li>
                <li>Weight: similar-class units are interchangeable</li>
                <li>Paint and minor cosmetic finish</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why No Full Table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            Why We Don&apos;t Publish a Full Cross-Reference Table
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            Model codes and OEM part numbers can share the same prefix while differing in rotation
            angle, shaft, or valve option. A published table can appear to match when the underlying
            dimensions do not.
          </p>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl">
            We verify every cross-reference against the actual tag and application to eliminate
            ordering errors and costly returns.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">FREE VERIFICATION</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Send Your Part Number for Free Verification
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Send the Helac model code or OEM part number and we confirm the matching replacement
                within one working day.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{' '}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">
                  hm@hmhydraulics.com
                </a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Cross-reference verification" />
            </div>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/alternatives"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Helac Replacement Guide</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Browse replacement actuators by Helac series.</p>
            </Link>
            <Link
              href="/alternatives/rebuild-vs-replacement"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Rebuild vs Replacement</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Compare costs, downtime, and risk factors.</p>
            </Link>
            <Link
              href="/alternatives/how-to-identify"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">How to Identify Your Actuator</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Read model tags and decode Helac model codes.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
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
                <p className="mt-3 text-[#4A4E54] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
          <p className="text-xs text-[#62666C] leading-relaxed max-w-4xl">
            Helac® and all OEM names are trademarks of their respective owners. HM Hydraulics is an
            independent manufacturer and is not affiliated with, sponsored by, or endorsed by Helac,
            Parker, or any listed OEM. Part numbers and model codes are used solely for
            identification and compatibility purposes.
          </p>
        </div>
      </section>
    </>
  );
}
