import Link from 'next/link';
import { modelPages, ModelData, SITE } from '@/components/alternatives/model-data';
import { RfqForm } from '@/components/alternatives/rfq-form';

interface SeriesMeta {
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

function seriesModels(code: string): ModelData[] {
  return modelPages.filter((m) => m.series === code);
}

export function SeriesPage({ code }: { code: string }) {
  const info = SERIES_INFO.find((s) => s.code === code)!;
  const models = seriesModels(code);
  const path = `/alternatives/${info.slug}`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
      { '@type': 'ListItem', position: 3, name: info.title, item: `${SITE}${path}` },
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
      url: `${SITE}/alternatives/${m.slug}`,
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
                    src={m.image}
                    alt={m.imageAlt}
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

      {/* How it works */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">How replacement works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(44,74,115,0.10)] border border-[rgba(44,74,115,0.10)] rounded-md overflow-hidden">
            {[
              ['1', 'Send your model or tag', 'Share the Helac model code, OEM part number or machine details, plus a photo if possible.'],
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
