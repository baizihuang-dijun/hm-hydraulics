import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { ModelData, SITE } from '@/components/alternatives/model-data';

function listJoin(items: string[]): string {
  return items.join(', ');
}

function buildFaqs(d: ModelData) {
  const brand = d.brands.length ? listJoin(d.brands) : null;
  const faqs: { q: string; a: string }[] = [];

  // Q1 — what it is / replaces
  const q1 = `What does the ${d.model} replace?`;
  let a1 = `It is the model code for a Helac helical rotary actuator providing ${d.rotation} rotation${
    d.weight ? ` in the ${d.weight} class` : ''
  }.`;
  if (brand) a1 += ` It is listed by ${brand}`;
  if (d.parts.length) a1 += ` under part number${d.parts.length > 1 ? 's' : ''} ${listJoin(d.parts)}`;
  a1 += brand || d.parts.length ? '. Our alternative is matched to the same rotation' : ' Our alternative is matched to the same rotation';
  if (d.weight) a1 += `, ${d.weight} class`;
  a1 += ' and mounting interface.';
  faqs.push({ q: q1, a: a1 });

  // Q2 — fitment (only if machines known)
  if (d.machines.length) {
    faqs.push({
      q: 'How do I know this fits my machine?',
      a: `The same actuator is recorded on the ${listJoin(d.machines)}. Before quoting we confirm the mounting face, port position and rotation against the tag and a photo of your unit, so the replacement matches your exact build.`,
    });
  }

  // Q3 — why model/price hidden
  faqs.push({
    q: 'Why is the exact HM model and price not shown?',
    a: 'We confirm the HM model per inquiry after verifying the interface and operating parameters with you. This avoids shipping a part that looks right by model name but differs in mounting or rotation. Price is provided with that confirmed quote.',
  });

  return faqs;
}

export function ModelPage({ d }: { d: ModelData }) {
  const faqs = buildFaqs(d);
  const path = `/alternatives/${d.slug}`;

  const quickRef = [
    { label: 'Original model', value: d.model, mono: true },
    { label: 'Original brand', value: 'Helac', mono: false },
    { label: 'Type', value: 'Rotary actuator', mono: false },
    { label: 'Rotation', value: d.rotation, mono: false },
    ...(d.weight ? [{ label: 'Weight', value: d.weight, mono: false }] : []),
    ...(d.parts.length ? [{ label: 'Original part no.', value: listJoin(d.parts), mono: true }] : []),
  ];

  const partLabel = d.parts.length
    ? `Original reference: ${d.brands[0] ?? 'OEM'} No. ${d.parts[0]}${
        d.parts.length > 1 ? ` (also listed as ${listJoin(d.parts.slice(1))})` : ''
      }`
    : `Helac ${d.series} series helical rotary actuator`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
      { '@type': 'ListItem', position: 3, name: d.model, item: `${SITE}${path}` },
    ],
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Replacement rotary actuator for Helac ${d.model}`,
    category: 'Hydraulic rotary actuator',
    image: `${SITE}${d.image}`,
    description: `${d.intro} Exact HM model confirmed on inquiry.`,
    brand: { '@type': 'Brand', name: 'HM Hydraulics' },
    manufacturer: {
      '@type': 'Organization',
      name: 'HM Hydraulics — Qingdao Hydraulic Machinery Co., Ltd.',
      url: SITE,
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Original brand', value: 'Helac' },
      { '@type': 'PropertyValue', name: 'Original model', value: d.model },
      ...(d.parts.length
        ? [{ '@type': 'PropertyValue', name: 'OEM part number', value: listJoin(d.parts) }]
        : []),
      { '@type': 'PropertyValue', name: 'Rotation', value: d.rotation },
      ...(d.weight ? [{ '@type': 'PropertyValue', name: 'Weight', value: d.weight }] : []),
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
              Helac Alternatives
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">{d.model}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">HELAC ALTERNATIVE</p>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-4">
                {d.model} Rotary Actuator
              </h1>
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
                      Alternative rotary actuator for Helac {d.model}
                      {d.parts.length > 1 ? ` — also listed as ${listJoin(d.parts.slice(1))}` : ''}.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#4A4E54] border-l-2 border-[#2C4A73] pl-3 mb-7">{partLabel}</p>
              )}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#rfq"
                  className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
                >
                  Request a compatibility check
                </a>
                <a
                  href="#specs"
                  className="inline-flex items-center px-5 py-2.5 bg-white text-[#1B1E20] text-sm font-medium rounded border border-[rgba(44,74,115,0.20)] no-underline hover:border-[rgba(44,74,115,0.40)] transition-colors duration-150"
                >
                  View specifications
                </a>
              </div>
              <p className="mt-5 text-xs text-[#62666C] leading-relaxed">
                Independently supplied alternative &mdash; not an original Helac
                {d.brands.length ? ` or ${listJoin(d.brands)}` : ''} part. Compatibility is verified before ordering.
              </p>
            </div>

            <figure className="m-0 bg-white border border-[rgba(44,74,115,0.10)] rounded-md p-3">
              <img
                src={d.image}
                alt={d.imageAlt}
                width={d.imageW}
                height={d.imageH}
                className="block w-full h-auto rounded"
                loading="eager"
              />
              <figcaption className="text-xs text-[#62666C] px-1 pt-2.5 pb-1">
                Alternative unit, {d.series} series &mdash; flange &amp; port configuration
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

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
                <span
                  key={m}
                  className="inline-flex items-center px-4 py-2 bg-[#FAFAF7] border border-[rgba(44,74,115,0.15)] rounded-full text-sm text-[#1B1E20]"
                >
                  <span className="text-[#2C4A73] mr-2" aria-hidden="true">●</span>
                  {m}
                </span>
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
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Confirmed data only</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">Technical specifications</h2>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Product type', 'Hydraulic rotary actuator'],
                  ['Rotation angle', d.rotation],
                  ...(d.weight ? ([['Unit weight', d.weight]] as [string, string][]) : []),
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <th scope="row" className="text-left py-3.5 px-5 font-medium text-[#1B1E20] w-48 align-top">
                      {k}
                    </th>
                    <td className="py-3.5 px-5 text-[#4A4E54]">{v}</td>
                  </tr>
                ))}
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

          {/* Sibling series link */}
          <p className="mt-6 text-sm">
            <Link href={`/alternatives/${d.seriesSlug}`} className="text-[#2C4A73] hover:underline">
              View more Helac {d.series} series models →
            </Link>
          </p>
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

      {/* RFQ */}
      <section id="rfq">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">Request a check</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Looking for an alternative to this model?
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Send us the original model number, part number, machine model or a drawing. We check the available
                option and confirm specifications and compatibility for you.
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
