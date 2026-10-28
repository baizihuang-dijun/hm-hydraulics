import Link from 'next/link';
import { HMR_ALL_DATA } from '@/lib/hmr/hmr-all-series';
import { HMR_MODEL_PAGE_CODES } from '@/lib/hmr/hmr-model-pages';
import { MOUNT_LABELS, MOUNT_TITLE, MOUNT_TITLE_BY_SERIES, SERIES_META } from '@/lib/hmr/hmr-series-meta';

const SERIES_ORDER = ['HMR1', 'HMR2', 'HMR3', 'HMR4', 'HMR5', 'HMR6'];

const BRAND_LABEL: Record<string, string> = {
  helac: 'Helac',
  hks: 'HKS',
  moveco: 'Moveco',
  sungji: 'Sungji',
};

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export function hmrSeriesSlug(series: string): string {
  return series.toLowerCase();
}

export function hmrSeriesMetadata(series: string) {
  const meta = SERIES_META[series];
  const schema = HMR_ALL_DATA.series[series];
  if (!meta || !schema) return { title: 'Not found' };
  const sizes = HMR_ALL_DATA.models.filter((m) => m.series === series);
  const min = Math.min(...sizes.map((m) => m.drivingNm));
  const max = Math.max(...sizes.map((m) => m.drivingNm));
  const mountTitle =
    schema.mounts.length === 1
      ? MOUNT_TITLE_BY_SERIES[`${series}-${schema.mounts[0].code}`] ??
        schema.mounts[0].label ??
        MOUNT_TITLE[schema.mounts[0].code] ??
        schema.mounts[0].code
      : `${schema.mounts.map((m) => m.code).join('/')} Mount`;
  return {
    title: `${series} Helical Rotary Actuators — ${fmt(min)} to ${fmt(max)} Nm, ${mountTitle}`,
    description: `${series} helical hydraulic rotary actuators: ${sizes.length} sizes from ${fmt(min)} to ${fmt(max)} Nm at ${schema.pressureBar} bar, ${schema.angles.join('/')}° rotation, ${mountTitle.toLowerCase()}. ${meta.family}. Order pattern ${schema.orderSyntax}.`,
    alternates: { canonical: `/products/rotary-actuators/${hmrSeriesSlug(series)}` },
  };
}

export function HmrSeriesPage({ series }: { series: string }) {
  const meta = SERIES_META[series];
  const schema = HMR_ALL_DATA.series[series];
  if (!meta || !schema) return null;

  const sizes = HMR_ALL_DATA.models
    .filter((m) => m.series === series)
    .sort((a, b) => a.drivingNm - b.drivingNm);
  const min = sizes[0].drivingNm;
  const max = sizes[sizes.length - 1].drivingNm;

  const brandRefs = new Map<string, Set<string>>();
  for (const m of sizes) {
    for (const [brand, refs] of Object.entries(m.comparable)) {
      if (!refs || !refs.length) continue;
      const set = brandRefs.get(brand) ?? new Set<string>();
      refs.forEach((r) => set.add(r));
      brandRefs.set(brand, set);
    }
  }
  const brandSummary = Object.keys(BRAND_LABEL)
    .filter((b) => brandRefs.has(b))
    .map((b) => ({ label: BRAND_LABEL[b], count: brandRefs.get(b)!.size }));

  const others = SERIES_ORDER.filter((s) => s !== series).map((s) => {
    const list = HMR_ALL_DATA.models.filter((m) => m.series === s);
    const lo = Math.min(...list.map((m) => m.drivingNm));
    const hi = Math.max(...list.map((m) => m.drivingNm));
    const sm = SERIES_META[s];
    return { series: s, label: sm?.label ?? s, count: list.length, lo, hi, bar: HMR_ALL_DATA.series[s]?.pressureBar };
  });

  const faqs = [
    {
      q: `What is the difference between ${series} and the other HMR series?`,
      a: `${series} is the ${meta.label} range: ${meta.duty}. The series is defined by the mounting interface and the pressure rating, not by torque alone — ${series} is rated at ${schema.pressureBar} bar with ${schema.angles.join('° / ')}° rotations. Other HMR series cover the same torque band with a different mount, so the machine bracket decides which one applies.`,
    },
    {
      q: `How many sizes does ${series} cover?`,
      a: `${sizes.length} sizes, from ${series}-${sizes[0].spec} at ${fmt(min)} Nm to ${series}-${sizes[sizes.length - 1].spec} at ${fmt(max)} Nm. Every size is built to order against the same housing design, so the torque step between sizes is fixed and you pick the step that covers your load with margin.`,
    },
    {
      q: `Can ${series} replace another make's actuator?`,
      a: `We supply ${series} as an alternative where the torque class and mounting interface line up, but we do not claim a verified drop-in for any other make. The comparable references we hold for this series are ${brandSummary.map((b) => `${b.label} (${b.count} models)`).join(', ')}; mounting pattern, shaft and port details are confirmed against your unit before quoting.`,
    },
  ];

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
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <nav className="text-xs text-[#62666C] flex flex-wrap items-center gap-2">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73]">
              Home
            </Link>
            <span>/</span>
            <Link href="/products/rotary-actuators" className="no-underline text-[#62666C] hover:text-[#2C4A73]">
              Rotary actuators
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">{series} series</span>
          </nav>
        </div>
      </div>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-20">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
            HMR series · {meta.label} · {schema.pressureBar} bar
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-medium text-[#1B1E20] mb-5 leading-tight">
            {series} helical rotary actuators
          </h1>
          <p className="text-lg text-[#4A4E54] max-w-3xl mb-4">
            {sizes.length} sizes from {fmt(min)} to {fmt(max)} Nm at {schema.pressureBar} bar, with{' '}
            {schema.angles.join('° / ')}° rotations. The {series} range is built for {meta.duty}.
          </p>
          <p className="text-base text-[#4A4E54] max-w-3xl mb-8">
            Every unit is assembled to order, pressure-tested before shipment, and quoted against your mounting
            drawing rather than off a stock list.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              [`${sizes.length}`, 'Sizes in the range'],
              [`${fmt(min)}–${fmt(max)} Nm`, 'Driving torque'],
              [`${schema.pressureBar} bar`, 'Rated pressure'],
              [schema.angles.map((a) => `${a}°`).join(' / '), 'Rotation'],
            ].map(([v, k]) => (
              <div key={k} className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white px-4 py-4">
                <div className="font-heading text-lg text-[#1B1E20] mb-1">{v}</div>
                <div className="text-xs text-[#62666C] uppercase tracking-wider">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            Sizes in the {series} range
          </h2>
          <p className="text-sm text-[#62666C] max-w-3xl mb-6">
            Pick the size from your required output torque, then confirm rotation, mounting and shaft on the model
            page. Sizes without a page are quoted on request.
          </p>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Model</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Driving torque</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Rotation</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Page</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((m) => (
                  <tr key={m.hmr} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <td className="py-3 px-5 font-mono text-xs text-[#1B1E20]">{m.hmr}</td>
                    <td className="py-3 px-5 text-[#4A4E54]">{fmt(m.drivingNm)} Nm</td>
                    <td className="py-3 px-5 text-[#4A4E54]">{m.rotation.join('° / ')}°</td>
                    <td className="py-3 px-5">
                      {HMR_MODEL_PAGE_CODES.includes(m.hmr) ? (
                        <Link
                          href={`/products/rotary-actuators/${m.hmr.toLowerCase()}`}
                          className="text-[#2C4A73] no-underline hover:underline"
                        >
                          {m.hmr}
                        </Link>
                      ) : (
                        <span className="text-[#62666C]">On request</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            How the {series} order code works
          </h2>
          <p className="text-sm text-[#62666C] max-w-3xl mb-6">
            Pattern: <span className="font-mono text-[#2C4A73]">{schema.orderSyntax}</span>. Worked example:{' '}
            <span className="font-mono text-[#2C4A73]">{schema.example}</span>.
          </p>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <tbody>
                {[
                  [
                    'Mounting',
                    schema.mounts
                      .map(
                        (m) =>
                          `${m.code} — ${m.label ?? MOUNT_LABELS[m.code] ?? m.code}${m.implicit ? ' (standard)' : ''}`,
                      )
                      .join(' / '),
                  ],
                  ['Output shaft', schema.outputs.map((o) => o.code).join(' / ')],
                  ['Valve options', schema.valves.map((v) => v.code).join(' / ')],
                  ['Rotation', schema.angles.map((a) => `${a}°`).join(' / ')],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <th scope="row" className="text-left py-3.5 px-5 font-medium text-[#1B1E20] w-56 align-top">
                      {k}
                    </th>
                    <td className="py-3.5 px-5 text-[#4A4E54]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#62666C] max-w-3xl mt-4">
            {meta.pressureNote} {meta.angleNote}
          </p>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            What this range is compared with
          </h2>
          <p className="text-sm text-[#4A4E54] max-w-3xl mb-6">
            Across the {series} sizes we hold comparable references for {brandSummary.map((b) => `${b.count} ${b.label} models`).join(', ')}.
            These are torque-class references used to route an enquiry, not validated substitutions — mounting
            pattern, shaft and ports are confirmed against your unit before quoting.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mb-6">
            {brandSummary.map((b) => (
              <div key={b.label} className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white px-4 py-4">
                <div className="font-heading text-xl text-[#1B1E20] mb-1">{b.count}</div>
                <div className="text-xs text-[#62666C] uppercase tracking-wider">{b.label} models</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/alternatives/cross-reference-guide"
              className="inline-flex items-center px-5 py-2.5 rounded-lg border border-[rgba(44,74,115,0.20)] text-[#2C4A73] text-sm font-medium no-underline hover:bg-[#F7F8FA]"
            >
              How the cross-reference works
            </Link>
            <Link
              href="/products/rotary-actuators#selector"
              className="inline-flex items-center px-5 py-2.5 rounded-lg border border-[rgba(44,74,115,0.20)] text-[#2C4A73] text-sm font-medium no-underline hover:bg-[#F7F8FA]"
            >
              Match a model code with the selector
            </Link>
            <Link
              href="/alternatives/which-one-do-i-need"
              className="inline-flex items-center px-5 py-2.5 rounded-lg border border-[rgba(44,74,115,0.20)] text-[#2C4A73] text-sm font-medium no-underline hover:bg-[#F7F8FA]"
            >
              Which torque class do I need
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            Other HMR series
          </h2>
          <p className="text-sm text-[#62666C] max-w-3xl mb-6">
            Same helical design, different mounting interface and pressure rating. If your bracket does not match{' '}
            {series}, one of these usually does.
          </p>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Series</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Mounting</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Sizes</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Torque</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Pressure</th>
                </tr>
              </thead>
              <tbody>
                {others.map((o) => (
                  <tr key={o.series} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <td className="py-3 px-5">
                      <Link
                        href={`/products/rotary-actuators/${o.series.toLowerCase()}`}
                        className="text-[#2C4A73] no-underline hover:underline font-medium"
                      >
                        {o.series}
                      </Link>
                    </td>
                    <td className="py-3 px-5 text-[#4A4E54]">{o.label}</td>
                    <td className="py-3 px-5 text-[#4A4E54]">{o.count}</td>
                    <td className="py-3 px-5 text-[#4A4E54]">
                      {fmt(o.lo)}–{fmt(o.hi)} Nm
                    </td>
                    <td className="py-3 px-5 text-[#4A4E54]">{o.bar} bar</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">{series} questions</h2>
          <div className="max-w-3xl divide-y divide-[rgba(44,74,115,0.10)] border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="p-5">
                <h3 className="font-medium text-[#1B1E20] mb-2">{f.q}</h3>
                <p className="text-sm text-[#4A4E54]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rfq" className="bg-[#F7F8FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            Send the torque, angle and mounting drawing
          </h2>
          <p className="text-[#4A4E54] max-w-2xl mx-auto mb-7">
            We confirm the {series} size against your load and bracket, then quote the build and a delivery date.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#2C4A73] text-white text-sm font-medium no-underline hover:bg-[#1E3A5F]"
          >
            Request a quote for {series}
          </Link>
        </div>
      </section>
    </main>
  );
}
