import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { oemPartGroups, type OemPartGroup } from '@/components/alternatives/oem-parts';

function listJoin(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function PartFaqs({ g }: { g: OemPartGroup }) {
  const oldNumbers = g.allNumbers.filter((n) => n !== g.primary);
  const faqs: { q: string; a: string }[] = [
    {
      q: `Do you supply a replacement for ${g.brand} part ${g.primary}?`,
      a: `HM supplies an independently manufactured replacement helical rotary actuator built to match the interface and performance class used under ${g.brand} part ${g.primary}. We verify the mounting face, shaft, rotation angle and valve arrangement against the tag on your unit before confirming an order. ${g.brand} part numbers are used for identification only; the unit is not an original ${g.brand} part.`,
    },
    ...(oldNumbers.length
      ? [
          {
            q: `Are ${listJoin(oldNumbers)} the same actuator as ${g.primary}?`,
            a: `${g.numberNote}. If your tag shows ${listJoin(oldNumbers)}, quote that number and send a tag photo \u2014 engineering confirms it maps to the same build before ordering.`,
          },
        ]
      : []),
    ...(g.machines.length
      ? [
          {
            q: `Which ${g.brand} machines use part ${g.primary}?`,
            a: `This actuator is reported on the ${listJoin(g.machines)}. Fitment varies across production years and revisions, so confirm the part against your machine build plate and the actuator data tag rather than relying on model alone.`,
          },
        ]
      : []),
    {
      q: 'What do you need to confirm the right replacement?',
      a: 'Send the part number, the aerial work platform or boom lift model and year, quantity, and photos of the data tag, mounting face, shaft and ports. Engineering confirms the exact match and lead time before you order.',
    },
  ];

  return (
    <section className="border-t border-[rgba(44,74,115,0.10)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
        <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl">
          {faqs.map((f) => (
            <div key={f.q}>
              <p className="text-sm font-medium text-[#1B1E20] mb-1.5">{f.q}</p>
              <p className="text-sm text-[#4A4E54] leading-relaxed m-0">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#8A8E94] leading-relaxed max-w-3xl mt-12 mb-0">
          {g.brand}&reg; is a trademark of its respective owner and is used on this page for part
          identification only. HM Hydraulics is an independent supplier and is not affiliated with or
          endorsed by {g.brand}. Machine fitment is reported and verified against your unit before ordering.
        </p>
      </div>
    </section>
  );
}

export function PartPage({ g }: { g: OemPartGroup }) {
  const oldNumbers = g.allNumbers.filter((n) => n !== g.primary);
  const siblingGroups = oemPartGroups
    .filter((x) => x.brand === g.brand && x.slug !== g.slug)
    .slice(0, 8);
  const hubHref =
    g.brand === 'JLG'
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
          { '@type': 'ListItem', position: 3, name: `${g.brand} ${g.primary}`, item: `https://www.hmhydraulics.com/alternatives/${g.slug}` },
        ],
      },
      {
        '@type': 'Product',
        name: `${g.brand} ${g.primary} replacement rotary actuator`,
        description: g.lead,
        brand: { '@type': 'Brand', name: 'HM Hydraulics' },
        image: `https://www.hmhydraulics.com${g.image}`,
        category: 'Hydraulic rotary actuator',
        // Machine fitment is AI web-researched and unverified, so it is deliberately NOT emitted
        // into machine-readable Product structured data (no isCompatibleWith / additionalProperty).
        // It appears only in the visible, clearly-labelled "Reported" section on the page.
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'OEM part number', value: g.allNumbers.join(', ') },
          { '@type': 'PropertyValue', name: 'Equipment brand', value: g.brand },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [],
      },
    ],
  };
  // Fill FAQ entities into JSON-LD from the same question set (kept consistent with visible FAQs).
  const faqEntities = [
    `Do you supply a replacement for ${g.brand} part ${g.primary}?`,
    ...(oldNumbers.length ? [`Are ${listJoin(oldNumbers)} the same actuator as ${g.primary}?`] : []),
    ...(g.machines.length ? [`Which ${g.brand} machines use part ${g.primary}?`] : []),
    'What do you need to confirm the right replacement?',
  ];
  (jsonLd['@graph'][2] as { mainEntity: object[] }).mainEntity = faqEntities.map((q) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: 'See the answer on this page; compatibility is verified against your actuator tag and mounting photos before ordering.' },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-[#62666C] flex-wrap">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73]">Home</Link>
            <span>/</span>
            <Link href="/alternatives" className="no-underline text-[#62666C] hover:text-[#2C4A73]">
              Cross-Reference
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">{g.brand} {g.primary}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="eyebrow text-[#2C4A73] mb-4">{g.brand.toUpperCase()} AERIAL WORK PLATFORM</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.6rem] font-medium text-[#1B1E20] leading-tight mb-4">
              {g.brand} {g.primary} Replacement Rotary Actuator
            </h1>
            <p className="text-lg text-[#4A4E54] leading-relaxed mb-5">{g.lead}</p>

            <div className="rounded-lg border border-[rgba(44,74,115,0.14)] bg-[#FAFAF7] p-4 mb-6">
              <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-1.5">Part numbers</p>
              <p className="text-sm text-[#1B1E20] leading-relaxed m-0">{g.numberNote}</p>
            </div>

            {g.machines.length ? (
              <div className="mb-6">
                <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-2">
                  Reported on these machines
                </p>
                <div className="flex flex-wrap gap-2">
                  {g.machines.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center rounded border border-[rgba(44,74,115,0.18)] bg-white px-2.5 py-1 text-xs font-medium text-[#2C4A73]"
                    >
                      {g.brand} {m}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-[#8A8E94] leading-relaxed m-0">
                  Reported fitment based on available cross-reference data. Confirm against your machine
                  build plate and actuator tag — builds vary by year and revision.
                </p>
              </div>
            ) : null}

            <p className="text-sm text-[#4A4E54] leading-relaxed">
              Independently supplied replacement unit engineered to match the interface and performance of
              the original. {g.brand} numbers are used for identification only.{' '}
              <Link href={hubHref} className="text-[#2C4A73] hover:underline">
                See all {g.brand} part numbers &rarr;
              </Link>
            </p>
          </div>

          <div className="bg-white border border-[rgba(44,74,115,0.14)] rounded-md p-5">
            <div className="bg-[#FAFAF7] rounded h-72 flex items-center justify-center overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.image}
                alt={`${g.brand} ${g.primary} replacement rotary actuator`}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            {g.extraImages && g.extraImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {g.extraImages.map((src) => (
                  <div key={src} className="bg-[#FAFAF7] rounded h-24 flex items-center justify-center overflow-hidden border border-[rgba(44,74,115,0.10)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${g.brand} ${g.primary} rotary actuator alternative view`}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="bg-[#F7F8F5] border border-[rgba(44,74,115,0.12)] rounded p-5">
              <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-3">Verify before you order</p>
              <RfqForm context={`${g.brand} ${g.primary}`} />
            </div>
          </div>
        </div>
      </section>

      {/* How verification works */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-14">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">How it works</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Confirming Your {g.primary} Replacement
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-5 m-0 p-0 list-none">
            {[
              `Send ${g.primary} (or the number on your tag) and platform model.`,
              'Add photos of the data tag, mounting face, shaft and ports.',
              'Engineering confirms the build, interface and rotation.',
              'You get a confirmed quote and lead time before ordering.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#4A4E54] leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2C4A73] text-white text-xs font-medium flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm">
            <Link href="/quality" className="text-[#2C4A73] hover:underline">
              Quality, pressure testing &amp; endurance validation &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Sibling parts */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-14">
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-6">
            Other {g.brand} part numbers
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {siblingGroups.map((s) => (
              <Link
                key={s.slug}
                href={`/alternatives/${s.slug}`}
                className="inline-flex items-center rounded border border-[rgba(44,74,115,0.18)] px-3 py-1.5 text-xs font-medium text-[#2C4A73] no-underline hover:border-[#2C4A73] hover:bg-[#F0F4FA] transition-colors"
              >
                {s.primary}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PartFaqs g={g} />
    </>
  );
}
