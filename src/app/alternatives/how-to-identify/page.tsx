import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE, modelPages } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'How to Identify Your Helac Actuator: Model Tag, Serial Number & Code Breakdown | HM Hydraulics',
  description:
    'Identify a Helac rotary actuator from the model tag, stamped numbers, or measurements. Decode the model code and send photos for free engineering verification.',
  alternates: { canonical: '/alternatives/how-to-identify' },
};

const pagePath = '/alternatives/how-to-identify';

const faqs = [
  {
    q: 'What if the Helac tag is missing?',
    a: 'If the plastic tag is missing or unreadable, look for stamped numbers on the housing and measure the outside diameter, shaft diameter, mounting pattern, and rotation angle. Send us clear photos and we identify the series.',
  },
  {
    q: 'Where is the model tag located?',
    a: 'The silver plastic tag is usually riveted or glued to the side of the actuator housing, near the valve ports.',
  },
  {
    q: 'Can I identify the actuator from the OEM part number alone?',
    a: 'Often yes, because OEM part numbers map back to Helac model codes. We can cross-reference the OEM number and confirm the replacement match.',
  },
  {
    q: 'What photos should I send for identification?',
    a: 'Send a close-up of the tag, a clear view of the mounting face, the shaft end, and the machine nameplate. These four photos cover the data we need most.',
  },
  {
    q: 'Do the stamped numbers include the full model code?',
    a: 'Stamped numbers may show only the series and size. The full configuration—rotation angle, valve, and mounting—is usually only on the plastic tag.',
  },
];

const seriesList = Object.values(
  modelPages.reduce<Record<string, { slug: string; name: string }>>((acc, m) => {
    if (!acc[m.series]) acc[m.series] = { slug: m.seriesSlug, name: `Helac ${m.series} Series` };
    return acc;
  }, {}),
);

const codePositions = [
  { position: '1–3', meaning: 'Series', example: 'L10, L20, L30, L40, HTX, HP' },
  { position: '4', meaning: 'Size / gear set', example: '5, 7, 10 (varies by series)' },
  { position: '5', meaning: 'Mounting type', example: 'M = foot mount; flange variants follow series convention' },
  { position: '6', meaning: 'Shaft type', example: 'RF, S1, etc. (depends on series)' },
  { position: '7', meaning: 'Rotation angle', example: '180, 360 (degrees)' },
  { position: '8', meaning: 'Valve / port option', example: 'O = valve on one side; H = hose port variant' },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'How to Identify', item: `${SITE}${pagePath}` },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Identify Your Helac Actuator: Model Tag, Serial Number & Code Breakdown',
  description:
    'Identify a Helac rotary actuator from the model tag, stamped numbers, or measurements. Decode the model code and send photos for free engineering verification.',
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

export default function HowToIdentifyPage() {
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
            <span className="text-[#1B1E20]">How to Identify</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">IDENTIFICATION</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            How to Identify Your Helac Actuator: Model Tag, Serial Number & Code Breakdown
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            A Helac rotary actuator is identified by the model code on its silver plastic tag,
            usually fixed to the housing. If the tag is missing or worn, read the stamped numbers on
            the body and measure the outside diameter, shaft, and mounting pattern. The model code
            states the series, size, mounting type, rotation angle, and valve option in a fixed
            order.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: September 2026</p>
        </div>
      </section>

      {/* Three Ways */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Three Ways to Identify Your Actuator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <p className="eyebrow mb-3">01</p>
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">Read the tag</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Locate the silver plastic tag on the housing. The full model code is printed here and
                is the fastest identification method.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <p className="eyebrow mb-3">02</p>
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">Check stamped numbers</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                If the tag is missing, look for stamped numbers on the body. These usually show the
                series and size, sometimes with a manufacturing date.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <p className="eyebrow mb-3">03</p>
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">Measure the unit</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Measure outside diameter, shaft diameter, mounting bolt pattern, and rotation angle.
                Send the numbers and we narrow down the series.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Code Breakdown */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            Helac Model Code Breakdown
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            The code is read from left to right. Each segment tells us something about the
            replacement we need to match.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.20)]">
                  <th className="py-3 pr-4 font-heading text-sm font-medium text-[#1B1E20]">Position</th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">Meaning</th>
                  <th className="py-3 pl-4 font-heading text-sm font-medium text-[#1B1E20]">Example values</th>
                </tr>
              </thead>
              <tbody className="text-[#4A4E54]">
                {codePositions.map((row) => (
                  <tr key={row.position} className="border-b border-[rgba(44,74,115,0.10)]">
                    <td className="py-3 pr-4 font-medium text-[#1B1E20]">{row.position}</td>
                    <td className="py-3 px-4">{row.meaning}</td>
                    <td className="py-3 pl-4 font-mono text-sm">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-5 bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-md max-w-3xl">
            <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-2">Example code</p>
            <p className="font-mono text-sm text-[#1B1E20]">L10-5-5-M-RF-360-S1-O-H</p>
          </div>
        </div>
      </section>

      {/* Serial Numbers */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            Serial Numbers and Manufacturing Date
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            Stamped serial numbers help confirm the production batch and sometimes the manufacturing
            date. They are useful when the model tag is partially legible or when verifying whether
            a unit belongs to an OEM-specific revision.
          </p>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl">
            Always include a photo of any stamped numbers along with the tag photo so we can cross
            check against production records.
          </p>
        </div>
      </section>

      {/* Photos */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            What to Photograph for an Inquiry
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">1. Tag close-up</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Clear, in-focus photo of the model code and serial number.</p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">2. Mounting face</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Shows bolt pattern and pilot diameter.</p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">3. Shaft end</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Shows shaft diameter, keyway, or spline detail.</p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">4. Machine nameplate</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Helps confirm OEM part number and application.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">FREE IDENTIFICATION</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Send for Free Identification
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Send the model code, OEM part number, and photos. We identify the exact series and
                confirm the replacement match before you order.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{' '}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">
                  hm@hmhydraulics.com
                </a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Actuator identification" />
            </div>
          </div>
        </div>
      </section>

      {/* Series links */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            Browse by Series
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {seriesList.map((series) => (
              <Link
                key={series.slug}
                href={`/alternatives/${series.slug}`}
                className="flex items-center justify-between p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
              >
                <span className="font-heading text-base font-medium text-[#1B1E20]">{series.name}</span>
                <span className="text-[#2C4A73]">&rarr;</span>
              </Link>
            ))}
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
              href="/alternatives/cross-reference-guide"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Cross-Reference Guide</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Match OEM part numbers to the right replacement.</p>
            </Link>
            <Link
              href="/alternatives/rebuild-vs-replacement"
              className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
            >
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Rebuild vs Replacement</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Compare costs, downtime, and risk factors.</p>
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
