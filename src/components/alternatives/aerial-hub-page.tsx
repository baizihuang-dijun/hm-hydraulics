import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { oemPartGroups, type AerialBrand } from '@/components/alternatives/oem-parts';

interface BrandConfig {
  brand: AerialBrand;
  platformLabel: string;
  h1: string;
  intro: string;
  platformNote: string;
  seriesLink?: { href: string; label: string };
}

const CONFIGS: Record<AerialBrand, BrandConfig> = {
  JLG: {
    brand: 'JLG',
    platformLabel: 'JLG boom lifts & aerial work platforms',
    h1: 'JLG Aerial Work Platform Actuator Replacement',
    intro:
      'Replacement helical rotary actuators for JLG boom lifts and aerial work platforms. Find your JLG part number below — including current 10-digit numbers and superseded 006xxx and legacy codes — then send the tag to confirm the exact build.',
    platformNote:
      'These actuators use a helical gear mechanism to convert linear piston motion into high-torque output rotation in a compact, sealed housing — the same operating principle as the units fitted to JLG boom lifts. Rated working pressure matches the original 3000\u00a0psi class.',
    seriesLink: { href: '/alternatives/helac-l20-series', label: 'See the L20-class helical specifications' },
  },
  Genie: {
    brand: 'Genie',
    platformLabel: 'Genie S- and Z-series boom lifts',
    h1: 'Genie Boom Lift Actuator Replacement',
    intro:
      'Replacement helical rotary actuators for Genie S-series telescopic and Z-series articulating boom lifts. Find your Genie GT part number below and send the data tag to confirm the exact build before ordering.',
    platformNote:
      'These helical rotary actuators convert linear piston motion into high-torque output rotation in a compact, sealed housing — the same operating principle as the units fitted to Genie boom lifts. The GT suffix is the legacy Genie part-numbering convention.',
  },
};

const faqs = [
  {
    q: 'Are these original parts?',
    a: 'They are independently supplied replacement units engineered to match the interface and performance class of the original. The OEM part numbers are used for identification only; compatibility is verified against your unit before you order.',
  },
  {
    q: 'How do I read the part numbers in the table?',
    a: 'The current/primary number is shown first, followed by superseded and legacy equivalents for the same actuator. JLG units may carry a current 10-digit number plus older 006xxx codes; Genie units use GT-suffix numbering.',
  },
  {
    q: 'Can you confirm the match from the part number alone?',
    a: 'The number identifies the build configuration, but mounting interface, shaft and valve arrangement vary across revisions. A clear photo of the data tag, mounting face and ports lets engineering confirm the exact replacement before quoting.',
  },
  {
    q: 'What should I send to get a quote?',
    a: 'Send the part number, the platform model and year, quantity, and photos of the data tag, mounting face, shaft and ports. Use the form on this page or email hm@hmhydraulics.com.',
  },
];

export function AerialHubPage({ brand }: { brand: AerialBrand }) {
  const cfg = CONFIGS[brand];
  const groups = oemPartGroups.filter((g) => g.brand === brand);
  const otherBrand: AerialBrand = brand === 'JLG' ? 'Genie' : 'JLG';
  const otherHref =
    otherBrand === 'JLG'
      ? '/alternatives/jlg-aerial-work-platform'
      : '/alternatives/genie-boom-lifts';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hmhydraulics.com/' },
          { '@type': 'ListItem', position: 2, name: 'Cross-Reference', item: 'https://www.hmhydraulics.com/alternatives' },
          { '@type': 'ListItem', position: 3, name: cfg.h1, item: `https://www.hmhydraulics.com/alternatives/${brand === 'JLG' ? 'jlg-aerial-work-platform' : 'genie-boom-lifts'}` },
        ],
      },
      {
        '@type': 'ItemList',
        name: `${brand} rotary actuator part numbers`,
        itemListElement: groups.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://www.hmhydraulics.com/alternatives/${g.slug}`,
          name: `${brand} ${g.primary}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-[#62666C]">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73]">Home</Link>
            <span>/</span>
            <Link href="/alternatives" className="no-underline text-[#62666C] hover:text-[#2C4A73]">
              Cross-Reference
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">{brand}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <p className="eyebrow text-[#2C4A73] mb-4">{brand.toUpperCase()} REPLACEMENT PARTS</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-5 max-w-4xl">
            {cfg.h1}
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl">{cfg.intro}</p>
          <p className="mt-5 text-sm text-[#5A6775]">
            {groups.length} part-number groups &nbsp;·&nbsp; Cross-referenced from the factory part/photo
            sheet &nbsp;·&nbsp;{' '}
            <Link href={otherHref} className="text-[#2C4A73] hover:underline">
              Looking for {otherBrand} parts? &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Photo + part-number grid */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
            Cross-reference by part number
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            {brand} Part Number Reference
          </h2>
          <p className="text-sm text-[#4A4E54] leading-relaxed max-w-3xl mb-8">
            The current/primary part number is shown first with its product photo, followed by superseded and
            legacy equivalents for the same actuator. Click any part for its dedicated page. Part numbers are
            for identification — send your tag for engineering confirmation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((g) => {
              const oldNumbers = g.allNumbers.filter((n) => n !== g.primary);
              return (
                <Link
                  key={g.slug}
                  href={`/alternatives/${g.slug}`}
                  className="group block bg-white border border-[rgba(44,74,115,0.14)] rounded-md p-4 no-underline hover:border-[#2C4A73] transition-colors"
                >
                  <div className="bg-[#FAFAF7] rounded h-44 flex items-center justify-center overflow-hidden mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.image}
                      alt={`${brand} ${g.primary} replacement rotary actuator`}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="font-label text-sm font-medium text-[#1B1E20] group-hover:text-[#2C4A73]">
                    {g.primary}
                  </div>
                  {oldNumbers.length ? (
                    <div className="text-xs text-[#62666C] mt-1 leading-relaxed">
                      {oldNumbers.join(', ')}
                    </div>
                  ) : null}
                  {g.machines.length ? (
                    <div className="text-[11px] text-[#8A8E94] mt-2 leading-relaxed">
                      Reported on: {g.machines.slice(0, 4).join(', ')}
                      {g.machines.length > 4 ? '…' : ''}
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Part Numbers &amp; Reported Fitment
          </h2>
          <div className="overflow-x-auto border border-[rgba(44,74,115,0.14)] rounded-md">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr className="bg-[#F5F6F4]">
                  <th className="text-left font-label text-xs uppercase tracking-wider text-[#62666C] px-4 py-3">
                    Primary part number
                  </th>
                  <th className="text-left font-label text-xs uppercase tracking-wider text-[#62666C] px-4 py-3">
                    Superseded / legacy
                  </th>
                  <th className="text-left font-label text-xs uppercase tracking-wider text-[#62666C] px-4 py-3">
                    Reported machine fitment
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => {
                  const oldNumbers = g.allNumbers.filter((n) => n !== g.primary);
                  return (
                    <tr key={g.slug} className="border-t border-[rgba(44,74,115,0.10)]">
                      <td className="px-4 py-3 align-top">
                        <Link href={`/alternatives/${g.slug}`} className="font-medium text-[#2C4A73] hover:underline">
                          {g.primary}
                        </Link>
                      </td>
                      <td className="px-4 py-3 align-top text-[#4A4E54]">
                        {oldNumbers.length ? oldNumbers.join(', ') : <span className="text-[#8A8E94]">&mdash;</span>}
                      </td>
                      <td className="px-4 py-3 align-top text-[#4A4E54]">{g.machines.join(', ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-[#8A8E94] leading-relaxed max-w-3xl">
            Machine fitment is reported from available cross-reference data and is not an official {brand}{' '}
            parts-catalogue listing. Always confirm against your machine build plate and actuator tag; builds
            vary by year and revision.
          </p>
        </div>
      </section>

      {/* About the platform */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                Helical gear platform
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
                Matched to the original interface
              </h2>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">{cfg.platformNote}</p>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-6">
                Because build configurations vary across revisions, we confirm the mounting face, shaft,
                rotation angle and valve arrangement against your tag before confirming an order.
              </p>
              {cfg.seriesLink ? (
                <Link href={cfg.seriesLink.href} className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline">
                  {cfg.seriesLink.label} &nbsp;&rarr;
                </Link>
              ) : (
                <Link href="/products/rotary-actuators" className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline">
                  See the HM rotary actuator range &nbsp;&rarr;
                </Link>
              )}
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.14)] rounded-md p-6">
              <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-4">
                How verification works
              </p>
              <ol className="space-y-4 m-0 p-0 list-none">
                {[
                  `You send the ${brand} part number and a photo of the data tag.`,
                  'Add photos of the mounting face, shaft and ports if available.',
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

      {/* RFQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Request verification</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
                Confirm Your {brand} Replacement
              </h2>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-6">
                Enter your {brand} part number and platform model and attach tag photos to your email. We
                confirm the match and lead time at no obligation.
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
              <RfqForm context={cfg.platformLabel} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / trademark */}
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
            {brand}&reg; is a trademark of its respective owner and is used on this page for part
            identification only. HM Hydraulics is an independent supplier and is not affiliated with or
            endorsed by {brand}. Compatibility is verified before ordering.
          </p>
        </div>
      </section>
    </>
  );
}
