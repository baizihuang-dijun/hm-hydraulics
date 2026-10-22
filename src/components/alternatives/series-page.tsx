import Link from 'next/link';
import type { ModelData } from '@/components/alternatives/model-data';
import { resolveModelImage, resolveModelAlt } from '@/components/alternatives/model-image';
import { RfqForm } from '@/components/alternatives/rfq-form';

export interface SeriesMeta {
  code: string;
  slug: string;
  title: string;
  description: string;
}

export const SERIES_INFO: SeriesMeta[] = [
  {
    code: 'L10',
    slug: 'helac-l10-series',
    title: 'Helac L10 Series',
    description:
      'Compact helical rotary actuators for small to mid-size drill rigs, covering 180° and 360° rotations from roughly 12 to 26 kg.',
  },
  {
    code: 'L20',
    slug: 'helac-l20-series',
    title: 'Helac L20 Series',
    description:
      'Mid-size helical rotary actuators, including compound-angle builds, for mid-size equipment and aftermarket replacement.',
  },
  {
    code: 'L30',
    slug: 'helac-l30-series',
    title: 'Helac L30 Series',
    description:
      'Large helical rotary actuators with flange and round-flange mounts, built for heavy-duty rotation on larger rigs.',
  },
  {
    code: 'L40',
    slug: 'helac-l40-series',
    title: 'Helac L40 Series',
    description:
      'Heavy-duty helical rotary actuators for the largest rotation duties, supplied for maintenance and replacement.',
  },
  {
    code: 'HTX',
    slug: 'helac-htx-series',
    title: 'Helac HTX Series',
    description:
      'Splined-shaft helical rotary actuators engineered for high-torque rotation on specialized drill equipment.',
  },
  {
    code: 'HP',
    slug: 'helac-hp-series',
    title: 'Helac HP Series',
    description:
      'Flanged helical rotary actuators from compact flanged units to the large HP125, for drill and OEM equipment.',
  },
];

interface EquivRow {
  nm: string;
  helac: string;
  hks: string;
  sungji: string;
  moveco: string;
}

interface EquivMatrix {
  sungjiNote?: string;
  rows: EquivRow[];
}

// Public-safe torque-class cross-reference only. Sourced from the internal v2.3 cross-reference
// table (rows with a Helac anchor). Non-public internal columns are intentionally excluded.
// Same nominal torque class = independent designs, NOT drop-in interchangeable.
const TORQUE_CLASS_MATRIX: Record<string, EquivMatrix> = {
  L10: {
    rows: [
      { nm: '339', helac: 'L10-3.0', hks: 'M-DA-H 60', sungji: 'SRA-090', moveco: '—' },
      { nm: '1,074', helac: 'L10-9.5', hks: 'M-DA-H 80', sungji: 'SRA-140', moveco: '—' },
      { nm: '1,695', helac: 'L10-15', hks: 'M-DA-H 90', sungji: 'SRA-160', moveco: '—' },
      { nm: '2,825', helac: 'L10-25', hks: 'M-DA-H 100', sungji: '—', moveco: '—' },
    ],
  },
  L30: {
    sungjiNote:
      'Sungji SRC-115 is rated with roughly 32% higher cantilever moment capacity within the same torque class.',
    rows: [
      { nm: '1,921', helac: 'L30-17', hks: 'F10 / F5 115', sungji: 'SRC-115 *', moveco: 'RR34 †' },
      { nm: '2,825', helac: 'L30-25', hks: 'F10 / F5 125', sungji: 'SRC-125', moveco: 'RR40 †' },
      { nm: '4,746', helac: 'L30-42', hks: 'F10 / F5 150', sungji: 'SRC-150', moveco: 'RR46 †' },
      { nm: '7,345', helac: 'L30-65', hks: 'F10 / F5 175', sungji: 'SRC-180', moveco: 'RR52 †' },
      { nm: '10,735', helac: 'L30-95', hks: 'F10 / F5 200', sungji: '—', moveco: '—' },
      { nm: '14,125', helac: 'L30-125', hks: 'F10 / F5 220', sungji: '—', moveco: 'RR58 / RR61 †' },
      { nm: '18,645', helac: 'L30-165', hks: 'F10 / F5 245', sungji: '—', moveco: 'RR66 †' },
      { nm: '24,295', helac: 'L30-215', hks: 'F10 / F5 265', sungji: '—', moveco: 'RR72 †' },
    ],
  },
};

export function SeriesPage({ code, models, site }: { code: string; models: ModelData[]; site: string }) {
  const info = SERIES_INFO.find((s) => s.code === code)!;
  const equiv = TORQUE_CLASS_MATRIX[code];
  const path = `/alternatives/${info.slug}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${site}/alternatives` },
      { '@type': 'ListItem', position: 3, name: info.title, item: `${site}${path}` },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: info.title,
    itemListElement: models.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.model,
      url: `${site}/alternatives/${m.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, collectionJsonLd]) }}
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
            <span className="text-[#1B1E20]">{info.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">HELAC REPLACEMENT GUIDE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-5">
            {info.title} Replacement Actuators
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-8">{info.description}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#models"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Browse {code} models
            </a>
            <a
              href="#rfq"
              className="inline-flex items-center px-5 py-2.5 bg-white text-[#1B1E20] text-sm font-medium rounded border border-[rgba(44,74,115,0.20)] no-underline hover:border-[rgba(44,74,115,0.40)] transition-colors duration-150"
            >
              Send your part number
            </a>
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
            {models.length} model{models.length > 1 ? 's' : ''} in this series
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">Models in this series</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {models.map((m) => (
              <Link
                key={m.slug}
                href={`/alternatives/${m.slug}`}
                className="group block no-underline bg-white border border-[rgba(44,74,115,0.14)] rounded-md p-5 hover:border-[#2C4A73] hover:shadow-[0_2px_12px_rgba(44,74,115,0.08)] transition-all duration-150"
              >
                <div className="bg-[#FAFAF7] rounded p-3 mb-4 h-36 flex items-center justify-center overflow-hidden">
                  <img
                    src={resolveModelImage(m)}
                    alt={resolveModelAlt(m)}
                    width={m.imageW}
                    height={m.imageH}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-label text-sm font-medium text-[#1B1E20] mb-1.5 group-hover:text-[#2C4A73] transition-colors">
                  {m.model}
                </h3>
                <p className="text-xs text-[#62666C] leading-relaxed m-0">
                  {m.rotation}
                  {m.weight ? ` · ${m.weight}` : ''}
                  {m.parts.length ? ` · OEM ${m.parts[0]}` : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-brand torque-class reference (L10 / L30 only) */}
      {equiv && (
        <section id="equivalents" className="border-b border-[rgba(44,74,115,0.10)]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
            <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
              Cross-brand reference
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
              {code} series &mdash; torque-class equivalents
            </h2>
            <p className="text-base text-[#4A4E54] leading-relaxed max-w-3xl mb-8">
              Competing actuators in the same nominal torque class are listed below for engineering
              comparison. These are potential equivalents, not drop-in replacements: each brand uses
              its own housing and mount dimensions, so compatibility must be verified against drawings
              and application requirements before ordering.
            </p>
            <div className="overflow-x-auto rounded-md border border-[rgba(44,74,115,0.14)]">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F2F5F9] text-left text-[#1B1E20]">
                    <th className="px-4 py-3 font-medium">Nominal torque (Nm)</th>
                    <th className="px-4 py-3 font-medium">Helac {code} size</th>
                    <th className="px-4 py-3 font-medium">HKS</th>
                    <th className="px-4 py-3 font-medium">Sungji (SJH)</th>
                    <th className="px-4 py-3 font-medium">Moveco</th>
                  </tr>
                </thead>
                <tbody>
                  {equiv.rows.map((r) => (
                    <tr
                      key={r.helac}
                      className="border-t border-[rgba(44,74,115,0.10)] text-[#4A4E54]"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-[#1B1E20] font-medium">{r.nm}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.helac}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.hks}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.sungji}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.moveco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-5 space-y-1.5 text-xs text-[#62666C] leading-relaxed m-0 pl-4">
              <li>
                Nominal torque figures are Helac published values at rated pressure. The numbers
                inside HKS, Sungji and Moveco model codes are each manufacturer&rsquo;s own size or
                bore designation, not torque values.
              </li>
              {equiv.sungjiNote && <li>* {equiv.sungjiNote}</li>}
              {equiv.rows.some((r) => r.moveco !== '—') && (
                <li>
                  &dagger; Moveco RR models share a near torque class only and use independent
                  structural dimensions; not drop-in.
                </li>
              )}
            </ul>
            <div className="mt-8">
              <a
                href="#rfq"
                className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
              >
                Verify a specific equivalent &rarr;
              </a>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">How replacement works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(44,74,115,0.10)] border border-[rgba(44,74,115,0.10)] rounded-md overflow-hidden">
            {[
              ['1', 'Send your model or tag', 'Share the actuator / brand model code, OEM part number or machine details, plus a photo if possible.'],
              ['2', 'We confirm the match', 'We verify rotation, weight, mounting face and ports against your unit before quoting.'],
              ['3', 'Quote and supply', 'You receive the confirmed specifications, price and lead time for the exact build.'],
            ].map(([n, h, p]) => (
              <div key={n} className="bg-white p-7">
                <div className="font-heading text-2xl text-[#2C4A73] mb-3">{n}</div>
                <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">{h}</h3>
                <p className="text-sm text-[#62666C] leading-relaxed m-0">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related applications */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-10 md:py-12">
          <p className="text-sm text-[#62666C] leading-relaxed">
            <span className="font-medium text-[#1B1E20]">Related application:</span>{' '}
            See the{' '}
            <Link href="/alternatives/mining-drill-rigs" className="text-[#2C4A73] no-underline hover:underline">
              mining drill rigs
            </Link>{' '}
            selection page for Atlas Copco / Epiroc and Sandvik cross-references.
          </p>
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">Request a check</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Looking for a {code} series replacement?
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Send the original model or part number and we confirm the matching configuration, specifications and
                compatibility, then quote.
              </p>
              <p className="text-sm text-[#62666C]">Or email directly: hm@hmhydraulics.com</p>
            </div>
            <div className="p-6 md:p-8 bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-md h-fit">
              <RfqForm context={`${info.title}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
