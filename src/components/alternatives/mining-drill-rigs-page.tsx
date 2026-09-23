'use client';

import Link from 'next/link';
import { RfqForm } from './rfq-form';

const SITE = 'https://www.hmhydraulics.com';

const pagePath = '/alternatives/mining-drill-rigs';

const slugByModelCode: Record<string, string | undefined> = {
  'L10-5.5-M-RF-360-S1-O-H': 'l10-5-5-m-rf-360-s1-o-h',
  'L10-5.5-E-RF-360-S1-O-H': 'l10-5-5-e-rf-360-s1-o-h',
  'L10-5.5-M-RF-360/240-S1-CH': 'l10-5-5-m-rf-360-240-s1-ch',
  'L10-9.5-M-RF-185-S-C-H': 'l10-9-5-m-rf-185-s-c-h',
  'HTX70-MS-RF-360-SS-O-H': 'htx70-ms-rf-360-ss-o-h',
  'L40-110-M-RF-360-S1-C-H': 'l40-110-m-rf-360-s1-c-h',
  HKS: undefined,
  'HP125-S-RF-360-S1-C-H': 'hp125-s-rf-360-s1-c-h',
  'L10-3.0-E-RF-180-S1-O-H': 'l10-3-0-e-rf-180-s1-o-h',
  'L10-3.0-S-RF-180-S1-O-H': 'l10-3-0-s-rf-180-s1-0-h',
  'L20-15-E-CL-180/90-S1-O-H': 'l20-15-e-cl-180-90-s1-o-h',
  'HP-15-S-FT-180-S1-O-H': 'hp-15-s-ft-180-s1-o-h',
  'L30-25-M-FT-180-S1-C-H': 'l30-25-m-ft-180-s1-c-h',
  'L30-42-M-RF-360-S1-C-H': 'l30-42-m-rf-360-s1-c-h',
  'L30-42-M-FT-180-S1-C-H': 'l30-42-m-ft-180-s1-c-h',
};

const atlasRows = [
  {
    code: 'L10-5.5-M-RF-360-S1-O-H',
    oemNo: '3128309281',
    weight: '21',
    machines: 'Boltec 235, Boltec 235h, Boltec Lc, Boltec Md',
  },
  {
    code: 'L10-5.5-E-RF-360-S1-O-H',
    oemNo: '3128309281',
    weight: '21',
    machines: 'Boltec 235, Boltec 235h, Boltec Lc, Boltec Md',
  },
  {
    code: 'L10-5.5-M-RF-360/240-S1-CH',
    oemNo: '—',
    weight: '21.5',
    machines: 'Simba S7D, Simba H1257',
  },
  {
    code: 'L10-9.5-M-RF-185-S-C-H',
    oemNo: '9106178448',
    weight: '26',
    machines: '—',
  },
  {
    code: 'HTX70-MS-RF-360-SS-O-H',
    oemNo: '3128307978',
    weight: '—',
    machines: 'Boomer 104, Boomer K41, Boomer K41x, Simba H157',
  },
  {
    code: 'L40-110-M-RF-360-S1-C-H',
    oemNo: '3128341070',
    weight: '140',
    machines: '—',
  },
  {
    code: 'HKS',
    oemNo: '3128309172',
    weight: '—',
    machines: 'Boltec 235, Boltec 235h, Boltec Lc, Boltec Md',
  },
  {
    code: 'HP125-S-RF-360-S1-C-H',
    oemNo: 'L3D, 3128312645',
    weight: '208',
    machines: 'Boomer M2d, Boomer Xl3, Boomer 353, Boomer L2c, Boomer L2d',
  },
];

const sandvikRows = [
  { code: 'L10-3.0-E-RF-180-S1-O-H', oemNo: '—', weight: '12' },
  { code: 'L10-3.0-S-RF-180-S1-O-H', oemNo: '76350014, BG00568383', weight: '12' },
  { code: 'L10-5.5-E-RF-360-S1-O-H', oemNo: '—', weight: '21' },
  { code: 'L10-5.5-M-RF-360-S1-O-H', oemNo: '76350015, 76350006', weight: '20.5' },
  { code: 'L20-15-E-CL-180/90-S1-O-H', oemNo: '—', weight: '56' },
  { code: 'HP-15-S-FT-180-S1-O-H', oemNo: '76350011', weight: '27' },
  { code: 'L30-25-M-FT-180-S1-C-H', oemNo: '—', weight: '49' },
  { code: 'L30-42-M-RF-360-S1-C-H', oemNo: '—', weight: '94' },
  { code: 'L30-42-M-FT-180-S1-C-H', oemNo: '—', weight: '73' },
];

const steps = [
  {
    number: '01',
    title: 'Check the OEM part number',
    description:
      'Compare the Atlas Copco / Epiroc or Sandvik part number from your parts book or the actuator tag with the reference above.',
  },
  {
    number: '02',
    title: 'Confirm the machine model and mounting flange',
    description:
      'Verify the rig model and whether the actuator is mounted on the boom, feed, or rotation unit so the interface matches.',
  },
  {
    number: '03',
    title: 'Confirm rotation angle and ports',
    description:
      'Check the required swing angle, shaft type, and valve / port arrangement against the model code.',
  },
  {
    number: '04',
    title: 'Send the RFQ',
    description:
      'Use the form below or email us the model code, OEM number, and machine details. We confirm the replacement before quoting.',
  },
];

const faqs = [
  {
    q: 'Can I find a replacement from an OEM part number alone?',
    a: 'Yes, in most cases. A part number such as 3128309281 or 76350015 maps back to a specific Helac-compatible actuator. Send the number and we verify the machine application before confirming the replacement.',
  },
  {
    q: 'Why does one part number fit several machine models?',
    a: 'Atlas Copco / Epiroc and Sandvik often use the same rotary actuator across multiple rigs within the same platform family — for example Boltec 235 variants share the same rotation unit.',
  },
  {
    q: 'What is the difference between the M and E suffix in the model code?',
    a: 'They typically refer to mounting or shaft variants that share the same gear set. The exact meaning depends on the series; send the full code and we confirm which variant you need.',
  },
  {
    q: 'Are these original Atlas Copco, Epiroc, or Sandvik actuators?',
    a: 'No. HM Hydraulics supplies independent replacement actuators that match the original mounting interface and performance data. Brand names are used for identification only.',
  },
  {
    q: 'What if the actuator tag is missing or unreadable?',
    a: 'Send us the machine model, serial number, and photos of the mounting face and shaft. We can identify the correct replacement from physical dimensions and the parts book.',
  },
];

const seriesLinks = [
  { name: 'Helac L10 Series', href: '/alternatives/helac-l10-series' },
  { name: 'Helac L20 Series', href: '/alternatives/helac-l20-series' },
  { name: 'Helac L30 Series', href: '/alternatives/helac-l30-series' },
  { name: 'Helac L40 Series', href: '/alternatives/helac-l40-series' },
  { name: 'Helac HTX Series', href: '/alternatives/helac-htx-series' },
  { name: 'Helac HP Series', href: '/alternatives/helac-hp-series' },
];

const guideLinks = [
  {
    name: 'How to Identify Your Helac Actuator',
    href: '/alternatives/how-to-identify',
    description: 'Read model tags and decode model codes.',
  },
  {
    name: 'Cross-Reference Guide',
    href: '/alternatives/cross-reference-guide',
    description: 'Match OEM part numbers to the right replacement.',
  },
  {
    name: 'Rebuild vs Replacement',
    href: '/alternatives/rebuild-vs-replacement',
    description: 'Compare costs, downtime, and risk factors.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'Mining drill rigs', item: `${SITE}${pagePath}` },
  ],
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Mining drill rig rotary actuator cross-reference',
  itemListElement: [...atlasRows, ...sandvikRows].map((row, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: row.code,
    description: `OEM reference ${row.oemNo}`,
  })),
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

function ModelCodeCell({ code }: { code: string }) {
  const slug = slugByModelCode[code];
  if (!slug) return <span className="font-mono text-sm text-[#1B1E20]">{code}</span>;
  return (
    <Link
      href={`/alternatives/${slug}`}
      className="font-mono text-sm text-[#2C4A73] no-underline hover:underline"
    >
      {code}
    </Link>
  );
}

export function MiningDrillRigsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, itemListJsonLd, faqJsonLd]),
        }}
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
              Alternatives
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Mining drill rigs</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">MINING APPLICATION</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            Mining Drill Rig Rotary Actuator Replacement Selection
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            This page is a cross-reference selection table for rotary actuators used on Atlas Copco /
            Epiroc and Sandvik mining drill and bolting rigs. Use the OEM part number or machine
            model to look up the corresponding Helac-compatible actuator, then send us the code for
            engineering verification before ordering.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: September 2026</p>
        </div>
      </section>

      {/* Atlas / Epiroc table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Atlas Copco / Epiroc cross-reference
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.20)]">
                  <th className="py-3 pr-4 font-heading text-sm font-medium text-[#1B1E20]">
                    Helac model code
                  </th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">
                    Atlas Copco / Epiroc No.
                  </th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">
                    Weight (kg)
                  </th>
                  <th className="py-3 pl-4 font-heading text-sm font-medium text-[#1B1E20]">
                    Machine model
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#4A4E54]">
                {atlasRows.map((row) => (
                  <tr key={row.code} className="border-b border-[rgba(44,74,115,0.10)]">
                    <td className="py-3 pr-4">
                      <ModelCodeCell code={row.code} />
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{row.oemNo}</td>
                    <td className="py-3 px-4">{row.weight}</td>
                    <td className="py-3 pl-4">{row.machines}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sandvik table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Sandvik cross-reference
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.20)]">
                  <th className="py-3 pr-4 font-heading text-sm font-medium text-[#1B1E20]">
                    Helac model code
                  </th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">
                    Sandvik No.
                  </th>
                  <th className="py-3 pl-4 font-heading text-sm font-medium text-[#1B1E20]">
                    Weight (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#4A4E54]">
                {sandvikRows.map((row) => (
                  <tr key={row.code} className="border-b border-[rgba(44,74,115,0.10)]">
                    <td className="py-3 pr-4">
                      <ModelCodeCell code={row.code} />
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{row.oemNo}</td>
                    <td className="py-3 pl-4">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Shop by series */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">SHOP BY SERIES</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            Browse actuators by Helac series
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-8">
            If you already know the series, jump to the dedicated page for specifications, available
            models, and inquiry options.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {seriesLinks.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-between p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-[#FAFAF7] no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
              >
                <span className="font-heading text-base font-medium text-[#1B1E20]">{s.name}</span>
                <span className="text-[#2C4A73]">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">RELATED GUIDES</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Guides for mining equipment maintenance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guideLinks.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
              >
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">{g.name}</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4-step confirmation */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">HOW TO ORDER</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            4-step confirmation before ordering
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#2C4A73] text-white font-label text-sm mb-4">
                  {step.number}
                </span>
                <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">REQUEST A QUOTE</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Send your mining drill rig actuator details
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Send the Helac model code or OEM part number, the machine model, and photos of the
                tag and mounting face. We verify the match and quote the correct replacement before
                you order.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{" "}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">
                  hm@hmhydraulics.com
                </a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Mining drill rig" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">QUESTIONS</p>
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
            Atlas Copco®, Epiroc®, Sandvik®, Boomer®, Boltec®, and Simba® are trademarks of their
            respective owners. HM Hydraulics is an independent third-party replacement parts
            supplier and is not affiliated with, sponsored by, or endorsed by Atlas Copco, Epiroc,
            or Sandvik. Part numbers and model codes are used solely for identification and
            compatibility purposes.
          </p>
        </div>
      </section>
    </>
  );
}
