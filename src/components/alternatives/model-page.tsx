import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import type { ModelData } from '@/components/alternatives/model-data';
import { getSeriesSiblings, parseTorqueNm } from '@/components/alternatives/model-data';
import { resolveModelImage, modelImageTier, resolveModelAlt } from '@/components/alternatives/model-image';

const SITE = 'https://www.hmhydraulics.com';

function listJoin(items: string[]): string {
  return items.join(', ');
}

function buildFaqs(d: ModelData) {
  const brand = d.brands.length ? listJoin(d.brands) : null;
  const ob = d.originBrand ?? 'Helac';
  const faqs: { q: string; a: string }[] = [];

  // Q1 — what it is / replaces
  const q1 = `What does the ${d.model} replace?`;
  let a1 = d.catalogBuild
    ? `${d.model} is a ${d.rotation} Helac L-series helical rotary actuator configuration derived from the Parker/Helac HY34-1001 ordering key${
        d.catalogSpec?.source ? ` and ${d.catalogSpec.source}` : ''
      }. It is assembled per the catalog ordering rules rather than read from a specific nameplate, so the exact configuration and compatibility are confirmed against the original unit tag and mounting drawings; our alternative is matched only after that review.`
    : d.modelCodeUnverified
    ? `Our supply records associate this ${d.rotation} rotary actuator${
        d.weight ? ` (${d.weight} class)` : ''
      } with the Helac HP-series build referenced as ${d.model}. The exact factory model code is confirmed against the unit's nameplate before order.`
    : d.sourcingOnly
    ? `It is the original ${ob} model code for a helical hydraulic rotary actuator providing ${d.rotation} rotation. HM provides sourcing and alternative-supply support for this reference; it is not assumed to be an original ${ob} part or a pre-verified interchangeable unit, and the configuration is confirmed against your actuator nameplate and drawing before we quote.`
    : `It is the model code for a ${ob} helical rotary actuator providing ${d.rotation} rotation${
        d.weight ? ` in the ${d.weight} class` : ''
      }.`;
  if (!d.catalogBuild) {
    if (brand) a1 += ` It is listed by ${brand}`;
    if (d.parts.length) a1 += ` under part number${d.parts.length > 1 ? 's' : ''} ${listJoin(d.parts)}`;
    if (d.sourcingOnly) {
      a1 += brand || d.parts.length ? '. HM can source or arrange alternative supply' : ' HM can source or arrange alternative supply';
      a1 += ' for this reference; mounting dimensions, shaft, ports and the exact configuration are checked against your unit and drawing before any alternative is recommended.';
    } else {
      a1 += brand || d.parts.length ? '. Our alternative is matched to the same rotation' : ' Our alternative is matched to the same rotation';
      if (d.weight) a1 += `, ${d.weight} class`;
      a1 += ' and mounting interface.';
    }
  } else {
    a1 += ' Send your tag code or a drawing and we confirm the exact build before quoting.';
  }
  faqs.push({ q: q1, a: a1 });

  // Q2 — fitment (only if machines known)
  if (d.machines.length) {
    faqs.push({
      q: 'How do I know this fits my machine?',
      a: `The same actuator is recorded on the ${listJoin(d.machines)}. Before quoting we confirm the mounting face, port position and rotation against the tag and a photo of your unit, so the replacement matches your exact build.`,
    });
  }

  // Model-specific FAQs (e.g. exact machine fit question)
  if (d.extraFaqs?.length) faqs.push(...d.extraFaqs);

  // Q3 — why model/price hidden
  faqs.push({
    q: 'Why is the exact HM model and price not shown?',
    a: 'We confirm the HM model per inquiry after verifying the interface and operating parameters with you. This avoids shipping a part that looks right by model name but differs in mounting or rotation. Price is provided with that confirmed quote.',
  });

  return faqs;
}

export function ModelPage({ d, related }: { d: ModelData; related: { slug: string; model: string }[] }) {
  const resolvedImage = resolveModelImage(d);
  const imageTier = modelImageTier(d);
  const resolvedAlt = resolveModelAlt(d);
  const faqs = buildFaqs(d);
  const path = `/alternatives/${d.slug}`;
  const ob = d.originBrand ?? 'Helac';

  const siblingsRaw = getSeriesSiblings(d.slug);
  const allSiblingsHaveTorque =
    siblingsRaw.length >= 2 && siblingsRaw.every((s) => parseTorqueNm(s.torque) > 0);
  const showSiblingSizes =
    d.originBrand && d.originBrand !== 'Helac' && allSiblingsHaveTorque;
  const sortedSiblings = showSiblingSizes
    ? [...siblingsRaw]
        .map((s) => ({ ...s, torqueNm: parseTorqueNm(s.torque) }))
        .sort((a, b) => {
          if (a.torqueNm === 0 && b.torqueNm !== 0) return 1;
          if (b.torqueNm === 0 && a.torqueNm !== 0) return -1;
          if (a.torqueNm !== b.torqueNm) return a.torqueNm - b.torqueNm;
          return a.slug.localeCompare(b.slug);
        })
    : [];
  const currentIndex = sortedSiblings.findIndex((s) => s.current);

  const quickRef = d.catalogBuild
    ? [
        { label: 'Catalog configuration', value: d.model, mono: true },
        { label: 'Original brand', value: 'Helac', mono: false },
        { label: 'Type', value: 'Rotary actuator', mono: false },
        { label: 'Rotation', value: d.rotation, mono: false },
        ...(d.catalogSpec?.ratedTorqueNm
          ? [{ label: 'Output torque @207 bar', value: `${d.catalogSpec.ratedTorqueNm.toLocaleString('en-US')} Nm`, mono: false }]
          : []),
        ...(d.weight ? [{ label: 'Unit weight', value: d.weight, mono: false }] : []),
        ...(d.catalogSpec?.mountingStyles ? [{ label: 'Mounting styles', value: d.catalogSpec.mountingStyles, mono: false }] : []),
      ]
    : [
    { label: d.modelCodeUnverified ? 'Reference code (from supply records)' : 'Original model', value: d.model, mono: true },
    { label: 'Original brand', value: ob, mono: false },
    { label: 'Type', value: 'Rotary actuator', mono: false },
    { label: 'Rotation', value: d.rotation, mono: false },
    ...(d.torque ? [{ label: 'Rated torque', value: d.torque, mono: false }] : []),
    ...(d.weight ? [{ label: 'Weight', value: d.weight, mono: false }] : []),
    ...(d.parts.length ? [{ label: 'Original part no.', value: listJoin(d.parts), mono: true }] : []),
  ];

  const partLabel = d.parts.length
    ? `Original reference: ${d.brands[0] ?? 'OEM'} No. ${d.parts[0]}${
        d.parts.length > 1 ? ` (also listed as ${listJoin(d.parts.slice(1))})` : ''
      }`
    : `${ob} ${d.series} series helical rotary actuator`;

  // Straddle (S2) figures are only published for L20/L30 frames (L10 catalog omits them),
  // and the current-build column must follow the page's own angle rather than always taking 360.
  const thisStraddle = d.catalogSpec?.momentStraddleNm
    ? (d.rotation === '180°'
        ? d.catalogSpec.momentStraddleNm.split('/')[0]?.trim()
        : d.catalogSpec.momentStraddleNm.split('/')[1]?.trim() ?? d.catalogSpec.momentStraddleNm)
    : '';
  const showSiblingStraddle = !!d.catalogSpec?.siblingAngle?.straddleNm && !!thisStraddle;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: `${ob} Alternatives`, item: `${SITE}/alternatives` },
      { '@type': 'ListItem', position: 3, name: d.modelCodeUnverified ? `${d.parts[0] ?? d.model} (recorded ref.)` : d.model, item: `${SITE}${path}` },
    ],
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: d.catalogBuild
      ? `Replacement rotary actuator for Helac ${d.model} (catalog configuration)`
      : d.modelCodeUnverified
      ? `Replacement rotary actuator for ${d.brands[0] ?? 'OEM'} ${d.parts[0] ?? d.model} (Helac HP-class)`
      : d.sourcingOnly
      ? `Sourcing / alternative supply for ${ob} ${d.model}`
      : `Replacement rotary actuator for ${ob} ${d.model}`,
    category: 'Hydraulic rotary actuator',
    image: `${SITE}${resolvedImage}`,
    description: d.catalogBuild
      ? `${d.intro} Configuration derived from HY34-1001; engineering data per ${d.catalogSpec?.source ?? 'published Helac tables'}; exact configuration and compatibility confirmed against the original unit tag and mounting drawings.`
      : d.sourcingOnly
      ? `${d.intro} HM offers sourcing and alternative-supply support; original brand and interchangeability are not claimed without verification; exact configuration and mounting are confirmed on inquiry.`
      : `${d.intro} Exact HM model confirmed on inquiry.`,
    brand: { '@type': 'Brand', name: 'HM Hydraulics' },
    manufacturer: {
      '@type': 'Organization',
      name: 'HM Hydraulics — Qingdao Hydraulic Machinery Co., Ltd.',
      url: SITE,
    },
    additionalProperty: [
      ...(d.catalogBuild
        ? [
            { '@type': 'PropertyValue', name: 'Original brand', value: 'Helac' },
            { '@type': 'PropertyValue', name: 'Catalog configuration (HY34-1001)', value: d.model },
            { '@type': 'PropertyValue', name: 'Configuration status', value: 'Configuration derived from the Parker/Helac HY34-1001 ordering key and published performance data; exact configuration and compatibility must be confirmed against the original unit tag and mounting drawings; not a nameplate-verified order code' },
            ...(d.catalogSpec?.ratedTorqueNm ? [{ '@type': 'PropertyValue', name: 'Output torque at 207 bar', value: `${d.catalogSpec.ratedTorqueNm.toLocaleString('en-US')} Nm` }] : []),
            ...(d.catalogSpec?.crossAlternatives?.length
              ? [
                  {
                    '@type': 'PropertyValue',
                    name: 'Performance-class alternatives',
                    value: d.catalogSpec.crossAlternatives.map((c) => `${c.brand} ${c.seriesRef}`).join('; '),
                  },
                ]
              : []),
          ]
        : d.modelCodeUnverified
        ? [
            { '@type': 'PropertyValue', name: 'OEM part number', value: listJoin(d.parts) },
            { '@type': 'PropertyValue', name: 'Recorded Helac reference code', value: d.model },
            { '@type': 'PropertyValue', name: 'Reference-code status', value: 'From HM supply records; exact factory model code to be confirmed against the unit nameplate' },
          ]
        : [
            { '@type': 'PropertyValue', name: 'Original brand', value: ob },
            { '@type': 'PropertyValue', name: 'Original model', value: d.model },
            ...(d.parts.length
              ? [{ '@type': 'PropertyValue', name: 'OEM part number', value: listJoin(d.parts) }]
              : []),
            ...(d.sourcingOnly
              ? [{ '@type': 'PropertyValue', name: 'Supply status', value: 'HM sourcing / alternative supply; not represented as an original part or a pre-verified interchangeable unit' }]
              : []),
          ]),
      { '@type': 'PropertyValue', name: 'Rotation', value: d.rotation },
      ...(d.catalogBuild && d.catalogSpec
        ? [
            ...(d.weight ? [{ '@type': 'PropertyValue', name: 'Unit weight', value: d.weight }] : []),
            { '@type': 'PropertyValue', name: 'Engineering data source', value: d.catalogSpec.source },
          ]
        : [
            ...(d.torque ? [{ '@type': 'PropertyValue', name: 'Rated torque', value: d.torque }] : []),
            ...(d.weight ? [{ '@type': 'PropertyValue', name: 'Weight', value: d.weight }] : []),
          ]),
    ],
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, productJsonLd, faqJsonLd]) }}
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
              {ob} Alternatives
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">{d.modelCodeUnverified ? `${d.parts[0] ?? d.model} (recorded ref.)` : d.model}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">{d.sourcingOnly ? `${ob.toUpperCase()} SOURCING` : `${ob.toUpperCase()} ALTERNATIVE`}</p>
              {d.modelCodeUnverified ? (
                <>
                  <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-3">
                    {d.brands[0] ?? 'OEM'} {d.parts[0]} Replacement Rotary Actuator
                  </h1>
                  <p className="text-sm text-[#62666C] mb-4">
                    Recorded Helac reference code&nbsp;
                    <span className="font-label text-[#1B1E20]">{d.model}</span>
                    &nbsp;· from HM supply records, to be confirmed against the unit nameplate
                  </p>
                </>
              ) : d.catalogBuild ? (
                <>
                  <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.5rem] font-medium text-[#1B1E20] leading-tight mb-3">
                    {d.model} Rotary Actuator
                  </h1>
                  <p className="text-base md:text-lg font-medium text-[#2C4A73] mb-4">
                    Alternatives &amp; cross-reference{d.catalogSpec?.ratedTorqueNm ? ` · ${d.rotation} · ${d.catalogSpec.ratedTorqueNm.toLocaleString('en-US')} Nm at ${d.catalogSpec.pressureBar ?? 207} bar` : ''}
                  </p>
                </>
              ) : (
                <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-4">
                  {d.model} Rotary Actuator
                </h1>
              )}
              <p className="text-lg text-[#4A4E54] leading-relaxed mb-5">{d.intro}</p>
              {d.parts.length ? (
                <div className="mb-7 border border-[rgba(44,74,115,0.18)] rounded-md overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="bg-[#2C4A73] px-4 py-3 sm:py-4">
                      <p className="m-0 text-[11px] uppercase tracking-wider text-white/70 font-label">
                        {d.brands[0] ?? 'OEM'} part number
                      </p>
                      <p className="m-0 text-xl font-label font-medium text-white leading-tight">{d.parts[0]}</p>
                    </div>
                    <p className="px-4 py-3 text-sm text-[#4A4E54] m-0">
                      {d.modelCodeUnverified
                        ? `Replacement matched to ${d.brands[0] ?? 'OEM'} ${d.parts[0]}${
                            d.parts.length > 1 ? ` (also listed as ${listJoin(d.parts.slice(1))})` : ''
                          }; the supplied build is recorded as Helac HP-series code ${d.model}, to be confirmed against the nameplate.`
                        : d.sourcingOnly
                        ? <>Sourcing / alternative supply for {ob} {d.model}
                          {d.parts.length > 1 ? ` — also listed as ${listJoin(d.parts.slice(1))}` : ''}. Interchangeability confirmed on inquiry.</>
                        : <>Alternative rotary actuator for {ob} {d.model}
                          {d.parts.length > 1 ? ` — also listed as ${listJoin(d.parts.slice(1))}` : ''}.</>}
                    </p>
                  </div>
                </div>
              ) : !d.catalogBuild ? (
                <p className="text-sm border-l-2 border-[#2C4A73] pl-3 mb-7">
                  <span className="text-[#4A4E54]">{partLabel}</span>
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {d.catalogBuild ? (
                  <>
                    <a
                      href="#rfq"
                      className="inline-flex items-center px-7 py-3.5 bg-[#2C4A73] text-white text-base font-semibold rounded-md shadow-md no-underline hover:bg-[#1E3A5F] hover:shadow-lg transition-all duration-150"
                    >
                      Request a replacement review
                    </a>
                    <a
                      href="#alternatives"
                      className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline"
                    >
                      Compare alternatives &darr;
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="#rfq"
                      className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
                    >
                      {d.sourcingOnly ? 'Request sourcing & availability' : 'Request a compatibility check'}
                    </a>
                    <a
                      href="#specs"
                      className="inline-flex items-center px-5 py-2.5 bg-white text-[#1B1E20] text-sm font-medium rounded border border-[rgba(44,74,115,0.20)] no-underline hover:border-[rgba(44,74,115,0.40)] transition-colors duration-150"
                    >
                      View specifications
                    </a>
                  </>
                )}
              </div>
              {d.catalogBuild ? (
                <p className="mt-5 mb-0 text-xs text-[#62666C] leading-relaxed">
                  Independently supplied alternative &mdash; not an original {ob} part. Configuration and fit are
                  confirmed against your unit tag and drawing before ordering.
                </p>
              ) : (
                <>
                  <p className="mt-4 mb-0 text-xs">
                    <a href="/solutions" className="text-[#2C4A73] no-underline hover:underline">
                      Specifying a new program? Talk to our engineering team &rarr;
                    </a>
                  </p>
                  <p className="mt-5 text-xs text-[#62666C] leading-relaxed">
                    {d.sourcingOnly
                      ? <>Independently sourced / alternative-supply service &mdash; not represented as an original {ob}
                        {d.brands.length ? ` or ${listJoin(d.brands)}` : ''} part. Interchangeability is verified against your unit and drawing before ordering.</>
                      : <>Independently supplied alternative &mdash; not an original {ob}
                        {d.brands.length ? ` or ${listJoin(d.brands)}` : ''} part. Compatibility is verified before ordering.</>}
                  </p>
                </>
              )}
            </div>

            <figure className="m-0 bg-white border border-[rgba(44,74,115,0.10)] rounded-md p-3">
              <img
                src={resolvedImage}
                alt={resolvedAlt}
                width={d.imageW}
                height={d.imageH}
                className="block w-full h-auto rounded"
                loading="eager"
              />
              <figcaption className="text-xs text-[#62666C] px-1 pt-2.5 pb-1">
                {imageTier === 'placeholder'
                  ? 'Correct unit drawing available on request — send your nameplate or mounting photo'
                  : imageTier === 'representative' || d.sourcingOnly
                    ? `Representative ${d.series} class rotary actuator — the exact ${ob} build is confirmed against your nameplate and drawing`
                    : `${d.series} series rotary actuator — verify flange and port configuration against your unit`}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Cross-reference / alternatives (catalog builds only) — commercial decision-support block */}
      {d.catalogBuild && (
        <section id="alternatives" className="border-b border-[rgba(44,74,115,0.10)] bg-[#FAFAF7]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
            <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Cross-reference</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
              Alternatives for Helac {d.series}-{d.model.split('-')[1]}
            </h2>
            <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-8">
              Compare this unit with other brands at a similar performance level &mdash; then send us your tag and
              mounting drawing and we confirm which option actually fits.
            </p>

            <div className="overflow-x-auto border border-[rgba(44,74,115,0.12)] rounded-md bg-white">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b border-[rgba(44,74,115,0.14)] bg-[rgba(44,74,115,0.05)]">
                    <th className="text-left py-3.5 px-5 font-label text-[#1B1E20]">Brand</th>
                    <th className="text-left py-3.5 px-5 font-label text-[#1B1E20]">Model / series</th>
                    <th className="text-left py-3.5 px-5 font-label text-[#1B1E20]">Key specification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[rgba(44,74,115,0.08)] bg-white">
                    <td className="py-3.5 px-5 align-top font-medium text-[#1B1E20]">Helac</td>
                    <td className="py-3.5 px-5 align-top font-label text-[#1B1E20]">
                      {d.series}-{d.model.split('-')[1]}
                      <span className="block text-xs text-[#62666C] mt-0.5 font-sans">{d.model}</span>
                    </td>
                    <td className="py-3.5 px-5 align-top text-[#4A4E54]">
                      {d.catalogSpec?.ratedTorqueNm ? `${d.catalogSpec.ratedTorqueNm.toLocaleString('en-US')} Nm` : ''}
                      {d.catalogSpec?.ratedTorqueNm ? ' · ' : ''}{d.rotation}
                    </td>
                  </tr>
                  {d.catalogSpec?.crossAlternatives?.length ? (
                    d.catalogSpec.crossAlternatives.map((c) => (
                      <tr key={`${c.brand}-${c.seriesRef}`} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                        <td className="py-3.5 px-5 align-top font-medium text-[#1B1E20]">{c.brand}</td>
                        <td className="py-3.5 px-5 align-top font-label text-[#1B1E20]">{c.seriesRef}</td>
                        <td className="py-3.5 px-5 align-top text-[#4A4E54]">{c.keySpec}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-3.5 px-5 text-[#4A4E54]" colSpan={3}>
                        No other brand is listed at this configuration in the current reference data. Send your tag and
                        drawing &mdash; we check available sourcing options for you.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[#62666C] max-w-3xl leading-relaxed">
              Alternative models are compared by published performance specifications. Mounting dimensions and
              compatibility must be confirmed before ordering.
            </p>

            {/* What we check before recommending a fit */}
            <div className="mt-10">
              <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-4">What HM checks before recommending a fit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  ['Mounting dimensions', 'Foot / flange pattern, bolt circle and overall envelope.'],
                  ['Shaft interface', 'Shaft type, spline / key, diameter and flange arrangement (S1/S2).'],
                  ['Rotation & stops', 'Rotation angle, end stops and cushioning for your mechanism.'],
                  ['Hydraulic connections', 'Port size/standard (SAE/UNF), position and counterbalance valve.'],
                ].map(([title, body]) => (
                  <div key={title} className="bg-white border border-[rgba(44,74,115,0.12)] rounded-md p-5">
                    <p className="m-0 mb-2 font-label text-sm font-medium text-[#1B1E20]">{title}</p>
                    <p className="m-0 text-xs text-[#62666C] leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5">
                <a
                  href="#rfq"
                  className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
                >
                  Send your tag &amp; drawing for a free review
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Quick reference */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">At a glance</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">Quick reference</h2>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[rgba(44,74,115,0.10)] border border-[rgba(44,74,115,0.10)] rounded-md overflow-hidden">
            {quickRef.map((item) => (
              <div key={item.label} className="bg-white p-5">
                <dt className="text-xs text-[#62666C] mb-1.5">{item.label}</dt>
                <dd className={`m-0 text-base font-medium text-[#1B1E20] ${item.mono ? 'font-label' : ''}`}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Applications (only when machines are known) */}
      {d.machines.length > 0 && (
        <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
            <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Equipment reference</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">Known applications</h2>
            <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-8">
              {d.applicationNote ??
                'Based on equipment records, this actuator is associated with the following machines. Confirmation against your machine build plate is recommended.'}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {d.machines.map((m) => (
                <Link
                  key={m}
                  href={`/alternatives?q=${encodeURIComponent(m)}`}
                  className="inline-flex items-center px-4 py-2 bg-[#FAFAF7] border border-[rgba(44,74,115,0.15)] rounded-full text-sm text-[#1B1E20] no-underline hover:border-[rgba(44,74,115,0.30)] transition-colors"
                >
                  <span className="text-[#2C4A73] mr-2" aria-hidden="true">●</span>
                  {m}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#62666C]">
              If your machine is not listed, send the full model and serial number &mdash;
              other builds may use the same actuator.
            </p>
          </div>
        </section>
      )}

      {/* Specifications */}
      <section id="specs" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          {d.catalogBuild ? (
            <>
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                Catalog engineering data · {d.catalogSpec?.source}
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Technical specifications — {d.catalogSpec?.baseLabel ?? d.series}, {d.rotation} build
              </h2>
              <p className="text-sm text-[#62666C] max-w-3xl mb-8">
                Performance figures are taken from the published Helac catalog ({d.catalogSpec?.source}). The full
                configuration and compatibility are confirmed against your unit tag and mounting drawings before
                ordering.
              </p>
              <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
                <table className="w-full text-sm">
                  <tbody>
                    {([
                      ['Product type', 'Hydraulic helical rotary actuator'],
                      ['Series / size', `${d.series} series · ${d.catalogSpec?.baseLabel ?? ''}`],
                      ['Catalog configuration', d.model],
                      ['Rotation angle', d.rotation],
                      ['Rated operating pressure', d.catalogSpec?.pressureBar ? `${d.catalogSpec.pressureBar} bar` : ''],
                      ['Output (drive) torque @ rated pressure', d.catalogSpec?.ratedTorqueNm ? `${d.catalogSpec.ratedTorqueNm.toLocaleString('en-US')} Nm` : ''],
                      ['Holding torque', d.catalogSpec?.holdingTorqueNm ? `${d.catalogSpec.holdingTorqueNm.toLocaleString('en-US')} Nm` : ''],
                      ['Moment capacity — cantilever (S1)', d.catalogSpec?.momentCantileverNm ? `${d.catalogSpec.momentCantileverNm.toLocaleString('en-US')} Nm` : ''],
                      ['Moment capacity — straddle (S2)', thisStraddle],
                      ['Axial load capacity', d.catalogSpec?.axialLoadKg ? `${d.catalogSpec.axialLoadKg.toLocaleString('en-US')} kg` : ''],
                      ['Radial load capacity', d.catalogSpec?.radialLoadKg ? `${d.catalogSpec.radialLoadKg.toLocaleString('en-US')} kg` : ''],
                      ['Displacement per cycle', d.catalogSpec?.displacementCm3 ?? ''],
                      ['Unit weight', d.catalogSpec?.weightKg ?? ''],
                      ['Available mounting styles', d.catalogSpec?.mountingStyles ?? ''],
                      ['This build', d.catalogSpec?.thisBuildDecode ?? ''],
                    ] as [string, string][]).filter(([, v]) => v).map(([k, v]) => (
                      <tr key={k} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                        <th scope="row" className="text-left py-3.5 px-5 font-medium text-[#1B1E20] w-64 align-top">
                          {k}
                        </th>
                        <td className="py-3.5 px-5 text-[#4A4E54]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 180 vs 360 sibling builds — real independent value */}
              {d.catalogSpec?.siblingAngle && (
                <div className="mt-10 max-w-3xl">
                  <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-3">
                    {d.rotation} vs {d.catalogSpec.siblingAngle.angle} on the same {d.catalogSpec?.baseLabel?.split(' ')[0] ?? d.series} base
                  </h3>
                  <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[rgba(44,74,115,0.12)] bg-[rgba(44,74,115,0.04)]">
                          <th className="text-left py-3 px-5 font-label text-[#1B1E20]">Parameter</th>
                          <th className="text-left py-3 px-5 font-label text-[#1B1E20]">{d.catalogSpec?.siblingAngle.angle} build</th>
                          <th className="text-left py-3 px-5 font-label text-[#2C4A73]">{d.rotation} build (this page)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[rgba(44,74,115,0.08)]">
                          <td className="py-3 px-5 text-[#1B1E20] font-medium">Catalog code</td>
                          <td className="py-3 px-5 text-[#4A4E54] font-label">{d.catalogSpec.siblingAngle.code}</td>
                          <td className="py-3 px-5 text-[#2C4A73] font-label">{d.model}</td>
                        </tr>
                        <tr className="border-b border-[rgba(44,74,115,0.08)]">
                          <td className="py-3 px-5 text-[#1B1E20] font-medium">Displacement per cycle</td>
                          <td className="py-3 px-5 text-[#4A4E54]">{d.catalogSpec.siblingAngle.displacementCm3}</td>
                          <td className="py-3 px-5 text-[#4A4E54]">{d.catalogSpec.displacementCm3}</td>
                        </tr>
                        <tr className="border-b border-[rgba(44,74,115,0.08)]">
                          <td className="py-3 px-5 text-[#1B1E20] font-medium">Unit weight</td>
                          <td className="py-3 px-5 text-[#4A4E54]">{d.catalogSpec.siblingAngle.weightKg}</td>
                          <td className="py-3 px-5 text-[#4A4E54]">{d.catalogSpec.weightKg}</td>
                        </tr>
                        {showSiblingStraddle && (
                          <tr>
                            <td className="py-3 px-5 text-[#1B1E20] font-medium">Straddle (S2) moment</td>
                            <td className="py-3 px-5 text-[#4A4E54]">{d.catalogSpec.siblingAngle.straddleNm}</td>
                            <td className="py-3 px-5 text-[#4A4E54]">{thisStraddle}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-[#62666C]">
                    Same frame and output torque, different displacement, weight, body length and straddle moment — they
                    match different cycle-time, hydraulic-flow and mounting-geometry requirements. Select by the angle
                    your mechanism needs, not by the model number alone.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Confirmed data only</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">Technical specifications</h2>
              <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['Product type', 'Hydraulic rotary actuator'],
                      ['Rotation angle', d.rotation],
                      ...(d.torque ? ([['Rated torque', d.torque]] as [string, string][]) : []),
                      ...(d.weight ? ([['Unit weight', d.weight]] as [string, string][]) : []),
                    ].map(([k, v]) => (
                      <tr key={k} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                        <th scope="row" className="text-left py-3.5 px-5 font-medium text-[#1B1E20] w-48 align-top">
                          {k}
                        </th>
                        <td className="py-3.5 px-5 text-[#4A4E54]">{v}</td>
                      </tr>
                    ))}
                    {d.crossNote && (
                      <tr className="border-b border-[rgba(44,74,115,0.08)]">
                        <th scope="row" className="text-left py-3.5 px-5 font-medium text-[#1B1E20] w-48 align-top">
                          Cross reference
                        </th>
                        <td className="py-3.5 px-5 text-[#4A4E54]">{d.crossNote}</td>
                      </tr>
                    )}
                    <tr>
                      <th scope="row" className="text-left py-3.5 px-5 font-medium text-[#1B1E20] w-48 align-top">
                        Further data
                      </th>
                      <td className="py-3.5 px-5 text-[#62666C]">
                        Torque, pressure, port and mounting dimensions are shared with the engineering drawing on request.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Replacement note */}
              <div className="mt-8 p-5 bg-[rgba(44,74,115,0.05)] border border-[rgba(44,74,115,0.12)] rounded-md max-w-3xl">
                <p className="text-sm text-[#4A4E54] leading-relaxed m-0">
                  <strong className="text-[#1B1E20]">HM alternative model — confirmed on inquiry.</strong>{' '}
                  Send us your original model number, part number or machine details and we confirm the matching
                  configuration, specifications and compatibility, then quote. The exact HM model is not published online.
                </p>
              </div>
            </>
          )}

          {/* Catalog replacement note + sibling link */}
          {d.catalogBuild && (
            <div className="mt-8 p-5 bg-[rgba(44,74,115,0.05)] border border-[rgba(44,74,115,0.12)] rounded-md max-w-3xl">
              <p className="text-sm text-[#4A4E54] leading-relaxed m-0">
                <strong className="text-[#1B1E20]">Send us your nameplate and mounting drawing.</strong>{' '}
                HM reviews the configuration and cross-brand options, confirms the fit, then quotes the matching unit
                and price.
              </p>
            </div>
          )}

          {/* Same-series size comparison */}
          {showSiblingSizes && sortedSiblings.length >= 2 && currentIndex !== -1 && (
            <div className="mt-10 p-5 bg-white border border-[rgba(44,74,115,0.12)] rounded-md max-w-3xl">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                Other sizes in the {d.series} range
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(44,74,115,0.10)] text-left text-[#62666C]">
                      <th className="py-2 pr-4 font-medium">Model</th>
                      <th className="py-2 pr-4 font-medium">Torque</th>
                      <th className="py-2 font-medium">Weight</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#1B1E20]">
                    {sortedSiblings.map((s) => {
                      const firstWeight = s.weight ? s.weight.split(';')[0].trim() : '—';
                      return (
                        <tr
                          key={s.slug}
                          className={s.current ? 'bg-[rgba(44,74,115,0.05)]' : ''}
                        >
                          <td className="py-2 pr-4 align-top">
                            {s.current ? (
                              <span className="font-medium">
                                {s.model}{' '}
                                <span className="text-[10px] text-[#62666C] font-normal">(this size)</span>
                              </span>
                            ) : (
                              <Link
                                href={`/alternatives/${s.slug}`}
                                className="text-[#2C4A73] hover:underline"
                              >
                                {s.model}
                              </Link>
                            )}
                          </td>
                          <td className="py-2 pr-4 align-top">{s.torque}</td>
                          <td className="py-2 align-top">{firstWeight}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-[#62666C] leading-relaxed">
                {currentIndex === 0
                  ? `${d.model} is the smallest size in the ${d.series} range at ${d.torque}.`
                  : currentIndex === sortedSiblings.length - 1
                    ? `${d.model} is the largest size in the ${d.series} range at ${d.torque}.`
                    : `At ${d.torque}, ${d.model} sits between ${sortedSiblings[currentIndex - 1].model} (${sortedSiblings[currentIndex - 1].torque}) and ${sortedSiblings[currentIndex + 1].model} (${sortedSiblings[currentIndex + 1].torque}) in the ${d.series} range.`}
              </p>
            </div>
          )}

          {/* Sibling series link */}
          {!d.hideSeriesLink && (
          <p className="mt-6 text-sm">
            <Link href={`/alternatives/${d.seriesSlug}`} className="text-[#2C4A73] hover:underline">
              View more {ob} {d.series} series models →
            </Link>
          </p>
          )}
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

      {/* Related models */}
      {related.length > 0 && (
        <section className="border-b border-[rgba(44,74,115,0.10)] bg-[#FAFAF7]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
            <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">Related models</p>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/alternatives/${r.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-[rgba(44,74,115,0.15)] rounded-md text-sm text-[#1B1E20] no-underline hover:border-[rgba(44,74,115,0.35)] transition-colors"
                >
                  {r.model}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RFQ */}
      <section id="rfq">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">{d.catalogBuild ? 'Request a replacement review' : d.sourcingOnly ? 'Request sourcing' : 'Request a check'}</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                {d.catalogBuild
                  ? `Need a replacement for ${d.series}-${d.model.split('-')[1]}?`
                  : d.sourcingOnly
                  ? `Need a source for ${d.model}?`
                  : 'Looking for an alternative to this model?'}
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                {d.catalogBuild ? (
                  <>
                    Send your existing unit&apos;s nameplate and a mounting drawing. HM reviews the configuration and
                    possible alternatives, confirms mounting and compatibility, and recommends the best available
                    sourcing option for your machine.
                  </>
                ) : d.sourcingOnly ? (
                  <>
                    Send the original {ob} model number, the Sandvik / OEM part number, machine details or a
                    mounting drawing. We confirm the configuration and advise the available sourcing or
                    alternative-supply option before quoting.
                  </>
                ) : (
                  <>
                    Send us the original model number, part number, machine model or a drawing. We check the available
                    option and confirm specifications and compatibility for you.
                  </>
                )}
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Original model / part number',
                  'Machine brand & model',
                  'Quantity & annual demand',
                  'Mounting photo or drawing (if available)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-[#62666C]">
                    <span className="text-[#2C4A73] mt-0.5 shrink-0" aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#62666C]">Or email directly: hm@hmhydraulics.com</p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md h-fit">
              <RfqForm context={d.model} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
