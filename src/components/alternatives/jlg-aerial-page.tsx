import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE } from '@/components/alternatives/model-data';

const pagePath = '/alternatives/jlg-aerial-work-platform';

interface PnRow {
  primary: string;
  image: string;
  altCodes: string[];
  note?: string;
}

// Visual top-to-bottom order from the JLG cross-reference sheet.
// Each primary number maps to one product photo; GT codes are the legacy JLG numbering.
const rows: PnRow[] = [
  { primary: '94397GT', image: '/images/jlg/94397gt.png', altCodes: [] },
  { primary: '226541GT', image: '/images/jlg/226541gt.png', altCodes: [] },
  {
    primary: '1001178269',
    image: '/images/jlg/1001178269.png',
    altCodes: ['1001307714', '0060066'],
  },
  { primary: '1001217780', image: '/images/jlg/1001217780.png', altCodes: [] },
  {
    primary: '1001307717',
    image: '/images/jlg/1001307717.png',
    altCodes: ['1001181060 (old)', '0060061 (old)'],
  },
  { primary: '1001181058', image: '/images/jlg/1001181058.png', altCodes: [] },
  {
    primary: '1001307763 (new)',
    image: '/images/jlg/1001307763.png',
    altCodes: ['1001181057', '0060067'],
  },
  {
    primary: '1001181051',
    image: '/images/jlg/1001181051.png',
    altCodes: ['1001307715 (new)'],
  },
  {
    primary: '1001307759',
    image: '/images/jlg/1001307759.png',
    altCodes: ['0060059S (old)', '1001181050 (old)'],
  },
  { primary: '1001178248', image: '/images/jlg/1001178248.png', altCodes: [] },
  { primary: '1001178247', image: '/images/jlg/1001178247.png', altCodes: [] },
  { primary: '233715GT', image: '/images/jlg/233715gt.png', altCodes: [] },
  { primary: '94398GT', image: '/images/jlg/94398gt.png', altCodes: [] },
  { primary: '88576GT', image: '/images/jlg/88576gt.png', altCodes: [] },
];

const faqs = [
  {
    q: 'Do you supply replacement actuators for JLG aerial work platforms?',
    a: 'Yes. We supply replacement rotary actuators built on the same mid-size helical platform used in JLG aerial work platform and boom lift applications. Send the JLG part number and a photo of the data tag and we confirm the exact match before quoting.',
  },
  {
    q: 'What is the difference between a GT part number and a 10-digit JLG number?',
    a: 'GT suffix numbers are the legacy JLG part numbering; the 10-digit codes are newer JLG numbers for the same component. Many units also carry older superseded numbers. All of the equivalent numbers for each actuator are listed in the table above.',
  },
  {
    q: 'Can you match my actuator from the part number alone?',
    a: 'The part number identifies the build configuration, but we verify the mounting interface and valve arrangement before confirming an order. A clear photo of the tag together with the mounting face and ports prevents mismatches across revisions.',
  },
  {
    q: 'Are these original JLG parts?',
    a: 'They are independently supplied replacement units engineered to match the interface and performance of the original. JLG part numbers are used for identification only. We verify compatibility before you order.',
  },
  {
    q: 'What information should I send for a fast quote?',
    a: 'Send the JLG part number, the aerial work platform or boom lift model, quantity, and photos of the data tag, mounting face, and ports. Use the form on this page or email hm@hmhydraulics.com.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'JLG Aerial Work Platform', item: `${SITE}${pagePath}` },
  ],
};

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'JLG aerial work platform replacement actuators',
  itemListElement: rows.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: r.primary,
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

export function JlgAerialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, itemListJsonLd, faqJsonLd]) }}
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
            <span className="text-[#1B1E20]">JLG Aerial Work Platform</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">AERIAL WORK PLATFORM REPLACEMENT</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-5">
            JLG Aerial Work Platform Actuator Replacement
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl">
            We supply replacement rotary actuators for JLG aerial work platforms and boom lifts, built on the
            mid-size helical platform that matches the original mounting and valve configuration. Find your JLG
            part number in the table below &mdash; including legacy GT codes and superseded numbers &mdash; then
            send it with a photo of the data tag for free verification before you order.
          </p>
          <p className="text-xs text-[#62666C] mt-6 mb-0">
            {rows.length} part references listed &nbsp;·&nbsp; Last reviewed: September 2026
          </p>
        </div>
      </section>

      {/* Cross-reference table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
            Cross-reference by part number
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            JLG Part Number Reference
          </h2>
          <p className="text-sm text-[#4A4E54] leading-relaxed max-w-3xl mb-8">
            The primary part number is shown first, followed by equivalent legacy (GT) and superseded numbers for
            the same actuator. Part numbers below are for identification; send yours for engineering confirmation.
          </p>

          <div className="overflow-x-auto border border-[rgba(44,74,115,0.14)] rounded-md">
            <table className="w-full min-w-[560px] text-sm border-collapse">
              <thead>
                <tr className="bg-[#F5F6F4]">
                  <th className="text-left font-label text-xs uppercase tracking-wider text-[#62666C] px-4 py-3 w-12">
                    #
                  </th>
                  <th className="text-left font-label text-xs uppercase tracking-wider text-[#62666C] px-4 py-3">
                    Primary part number
                  </th>
                  <th className="text-left font-label text-xs uppercase tracking-wider text-[#62666C] px-4 py-3">
                    Equivalent / superseded numbers
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.primary} className="border-t border-[rgba(44,74,115,0.10)]">
                    <td className="px-4 py-3 text-[#62666C] align-top">{i + 1}</td>
                    <td className="px-4 py-3 align-top">
                      <span className="font-medium text-[#1B1E20]">{r.primary}</span>
                    </td>
                    <td className="px-4 py-3 align-top text-[#4A4E54]">
                      {r.altCodes.length ? r.altCodes.join(', ') : <span className="text-[#8A8E94]">&mdash;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* About the platform */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                Built on the L20 helical platform
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
                Matched to the original interface
              </h2>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
                These actuators use a helical gear mechanism to convert linear piston motion into high-torque
                output rotation in a compact, sealed housing &mdash; the same operating principle as the units
                fitted to JLG boom lifts. Rated working pressure matches the original 3000&nbsp;psi class.
              </p>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-6">
                Because build configurations vary across revisions, we confirm the mounting face, shaft, rotation
                angle, and valve arrangement against your tag before confirming an order.
              </p>
              <Link
                href="/alternatives/helac-l20-series"
                className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline"
              >
                See the L20 series specifications &nbsp;&rarr;
              </Link>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.14)] rounded-md p-6">
              <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-4">
                How verification works
              </p>
              <ol className="space-y-4 m-0 p-0 list-none">
                {[
                  'You send the JLG part number and a photo of the data tag.',
                  'We add photos of the mounting face, shaft, and ports if available.',
                  'Engineering confirms the build and matching replacement.',
                  'You receive a confirmed quote with lead time before ordering.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#4A4E54] leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2C4A73] text-white text-xs font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Product photos</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Replacement Units
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rows.map((r) => (
              <figure
                key={r.primary}
                className="m-0 bg-white border border-[rgba(44,74,115,0.14)] rounded-md p-4"
              >
                <div className="bg-[#FAFAF7] rounded h-44 flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={r.image}
                    alt={`JLG ${r.primary} replacement actuator`}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <figcaption className="font-label text-xs font-medium text-[#1B1E20]">
                  {r.primary}
                  {r.altCodes.length ? (
                    <span className="block font-normal text-[#62666C] mt-1">{r.altCodes.join(', ')}</span>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Request verification</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
                Confirm Your JLG Replacement
              </h2>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-6">
                Enter your JLG part number and platform model and attach tag photos to your email. We confirm the
                match and lead time at no obligation.
              </p>
              <div className="space-y-3 text-sm text-[#4A4E54]">
                <p className="m-0">
                  <Link href="/alternatives" className="text-[#2C4A73] no-underline hover:underline">
                    Browse all alternatives
                  </Link>
                </p>
                <p className="m-0">
                  <Link href="/contact" className="text-[#2C4A73] no-underline hover:underline">
                    Contact our engineering team
                  </Link>
                </p>
              </div>
            </div>
            <div className="bg-[#F7F8F5] border border-[rgba(44,74,115,0.12)] rounded-md p-6 md:p-8">
              <RfqForm context="JLG aerial work platform" />
            </div>
          </div>
        </div>
      </section>

      {/* Trademark / FAQ */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl">
            {faqs.map((f) => (
              <div key={f.q}>
                <p className="text-sm font-medium text-[#1B1E20] mb-1.5">{f.q}</p>
                <p className="text-sm text-[#4A4E54] leading-relaxed m-0">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#8A8E94] leading-relaxed max-w-3xl mt-12 mb-0">
            JLG&reg; is a trademark of its respective owner and is used on this page for part identification only.
            HM Hydraulics is an independent supplier and is not affiliated with or endorsed by JLG. Compatibility
            is verified before ordering.
          </p>
        </div>
      </section>
    </>
  );
}
