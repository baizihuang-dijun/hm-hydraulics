import Link from 'next/link';
import { getHmrComparison } from '@/lib/hmr/hmr-compare';
import { linkForBase } from '@/lib/hmr/hmr-cross-links';
import { HMR_ALL_DATA } from '@/lib/hmr/hmr-all-series';
import { HMR_MODEL_PAGE_CODES } from '@/lib/hmr/hmr-model-pages';

const BRAND_ORDER = [
  ['helac', 'Helac'],
  ['hks', 'HKS'],
  ['moveco', 'Moveco'],
  ['sungji', 'Sungji'],
] as const;

const MOUNT_LABELS: Record<string, string> = {
  FT: 'Foot mount',
  FF: 'Front flange',
  RF: 'Rear flange',
  FL: 'Flange',
};

const MOUNT_PHRASE: Record<string, string> = {
  FT: 'foot mount',
  FF: 'front-flange mount',
  RF: 'rear-flange mount',
  FL: 'flange mount',
};

const MOUNT_PHRASE_BY_SERIES: Record<string, string> = {
  'HMR1-FL': 'flange mount',
  'HMR6-FT': 'straddle mount',
  'HMR5-FL': 'valve mounting flange',
};

const MOUNT_TITLE_BY_SERIES: Record<string, string> = {
  'HMR6-FT': 'Straddle Mount',
  'HMR5-FL': 'Valve Flange',
};

const MOUNT_TITLE: Record<string, string> = {
  FT: 'Foot Mount',
  FF: 'Front Flange',
  RF: 'Rear Flange',
  FL: 'Flange',
};

const SERIES_META: Record<
  string,
  { label: string; family: string; duty: string; angleNote: string; pressureNote: string }
> = {
  HMR1: {
    label: 'flange-mount',
    family: 'Helical, flange-mount family',
    duty:
      'general positioning, swing and clamping duties where the actuator face-bolts to a machined flange on the machine, and the same housing is specified across four standard rotations',
    angleNote:
      'HMR1 covers 90°, 180°, 270° and 360° as standard rotations; the flange mount is implicit in the order code.',
    pressureNote:
      'HMR1 is rated at 210 bar continuous; the flange pilot diameter and bolt circle are what decide whether the unit sits square on your existing bracket.',
  },
  HMR2: {
    label: 'foot-mount',
    family: 'Helical, foot-mount family',
    duty:
      'steering and positioning duties on mobile equipment, where the housing bolts down onto a flat bracket face and the shaft carries the steering arm',
    angleNote: '180° is the standard rotation on HMR2. A 360° build is quoted only after engineering confirmation.',
    pressureNote: 'HMR2 is rated at 210 bar continuous; peak pressure and flow at the actuator are checked against your circuit.',
  },
  HMR3: {
    label: 'compact front-flange',
    family: 'Helical, compact front-flange family',
    duty:
      'tight mounting envelopes on aerial work platforms and small booms, where the front flange face carries the load and the body sits inside the boom section',
    angleNote: 'HMR3 is offered in 180° and 360° as standard rotations.',
    pressureNote: 'HMR3 is rated at 210 bar continuous; the flange bolt pattern and pilot diameter decide whether it drops onto your existing bracket.',
  },
  HMR4: {
    label: 'heavy-duty',
    family: 'Helical, heavy-duty family',
    duty:
      'continuous high-load duties on mining, drilling and material-handling equipment, where the same actuator is specified across foot, front-flange and rear-flange builds',
    angleNote: 'HMR4 is offered in 180° and 360° as standard rotations, with the same rated performance across FT, FF and RF mounting.',
    pressureNote: 'HMR4 is rated at 210 bar continuous; at this torque class the tie-rod clearance and bracket stiffness matter as much as the port size.',
  },
  HMR5: {
    label: 'valve-mount',
    family: 'Helical, valve-mount family',
    duty:
      'piloting and positioning duties on valve and damper linkages, where the actuator flange bolts straight to the valve body and swings the spool or lever through a fixed arc',
    angleNote:
      '90° is the standard rotation on HMR5; other angles are quoted as engineered specials.',
    pressureNote:
      'HMR5 is rated at 135 bar, lower than the other HMR series because the valve-mount duty carries no external load support — the housing is not designed to take radial or bending loads from a linkage.',
  },
  HMR6: {
    label: 'through-shaft straddle',
    family: 'Helical, through-shaft straddle-mount family',
    duty:
      'two-sided drive points on one axis, where the shaft passes right through the housing and both ends drive a load',
    angleNote: '220° is the standard rotation on HMR6; 180° is a special angle that has to be confirmed by engineering.',
    pressureNote: 'HMR6 is rated at 210 bar continuous; the straddle mount means both bearing faces are loaded, so bracket alignment is checked before quoting.',
  },
};

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function HmrModelPage({ code }: { code: string }) {
  const c = getHmrComparison(code);
  const model = HMR_ALL_DATA.models.find((m) => m.hmr === code);
  if (!c || !model) return null;

  const meta = SERIES_META[c.seriesCode] ?? SERIES_META.HMR2;
  const rawMounts = HMR_ALL_DATA.series[c.seriesCode].mounts;
  const mountCodes = rawMounts.map((m) => m.code);
  const mountText = (m: { code: string; label?: string }) => m.label ?? MOUNT_LABELS[m.code] ?? m.code;
  const mountLabel = rawMounts
    .map((m) => `${m.code} — ${mountText(m)}${m.implicit ? ' (standard)' : ''}`)
    .join(' / ');
  const mountShort =
    rawMounts.length === 1
      ? MOUNT_PHRASE_BY_SERIES[`${c.seriesCode}-${rawMounts[0].code}`] ??
        MOUNT_PHRASE[rawMounts[0].code] ??
        MOUNT_LABELS[rawMounts[0].code] ??
        rawMounts[0].code
      : `${rawMounts
          .map((m) => (MOUNT_PHRASE[m.code] ?? m.code).replace(/ mount$/, ''))
          .join(', ')
          .replace(/, ([^,]*)$/, ' or $1')} mounting`;
  const seriesModels = HMR_ALL_DATA.models
    .filter((m) => m.series === c.seriesCode)
    .sort((a, b) => a.drivingNm - b.drivingNm);
  const idx = seriesModels.findIndex((m) => m.hmr === code);
  const smaller = idx > 0 ? seriesModels[idx - 1] : undefined;
  const larger = idx >= 0 && idx < seriesModels.length - 1 ? seriesModels[idx + 1] : undefined;

  const rows = BRAND_ORDER.flatMap(([key, label]) =>
    ((model.comparable as Record<string, string[] | undefined>)[key] ?? []).map((ref) => ({
      brand: label,
      ref,
      href: linkForBase(ref),
    })),
  );

  const rawSeries = HMR_ALL_DATA.series[c.seriesCode];

  const specs: [string, string][] = [
    ['Rated driving torque', `${c.drivingNm.toLocaleString('en-US')} Nm`],
    ['Rated pressure', `${c.pressureBar} bar`],
    ['Rotation', `${c.angles.join('° / ')}°`],
    ['Mounting', mountLabel],
    ['Output shaft', rawSeries.outputs.map((o) => o.code).join(' / ')],
    ['Valve options', c.valves.join(' / ')],
    ['Ordering pattern', c.orderSyntax ?? '—'],
    ['Example order code', c.example ?? '—'],
  ];

  const decode: [string, string][] = [
    [c.seriesCode, `Series — helical rotary actuator, ${meta.label} family, ${c.pressureBar} bar rated`],
    [model.spec, `Spec size — ${c.drivingNm.toLocaleString('en-US')} Nm driving torque class`],
    [c.angles.join(' / '), 'Rotation — total travel in degrees'],
    [mountCodes.join(' / '), `Mounting — ${rawMounts.map((m) => mountText(m).toLowerCase()).join(' / ')}`],
    [
      rawSeries.outputs.map((o) => o.code).join(' / '),
      `Output — ${rawSeries.outputs
        .map((o) => (o.label ? `${o.code} ${o.label.toLowerCase()}` : `${o.code} (interface per drawing)`))
        .join(' / ')}`,
    ],
    [c.valves.join(' / '), 'Valve — integral valve block or plain ports'],
  ];

  const positionLine = smaller && larger
    ? `It sits between ${smaller.hmr} at ${smaller.drivingNm.toLocaleString('en-US')} Nm and ${larger.hmr} at ${larger.drivingNm.toLocaleString('en-US')} Nm.`
    : smaller
      ? `It is the largest size in the ${c.seriesCode} range, above ${smaller.hmr} at ${smaller.drivingNm.toLocaleString('en-US')} Nm.`
      : larger
        ? `It is the smallest size in the ${c.seriesCode} range, below ${larger.hmr} at ${larger.drivingNm.toLocaleString('en-US')} Nm.`
        : '';

  const neighbourTable = seriesModels.filter(
    (m) => m.hmr === code || m.hmr === smaller?.hmr || m.hmr === larger?.hmr,
  );

  const refsList = rows.map((r) => `${r.brand} ${r.ref}`);

  const faqs: { q: string; a: string }[] = [
    {
      q: `What can I use in place of an ${code}?`,
      a: `We build the ${code} itself to order, and where an ${code} is no longer available we quote the closest HM ${c.seriesCode} build and confirm the fit against your unit. We do not publish a one-to-one substitution table, because mounting pattern, shaft, port thread and valve arrangement have to match your machine, not just the torque class.`,
    },
    {
      q: `Is ${code} a direct replacement for ${refsList[0] ?? 'another make'}?`,
      a: `No — we do not claim a verified drop-in for any other make. ${refsList.length ? `Enquiries for this torque class arrive tagged as ${refsList.join(', ')}; ` : ''}we treat those as comparable references and compare rated torque, mounting interface, shaft and ports before quoting the ${code} build that suits your machine.`,
    },
    {
      q: `How is the ${code} order code put together?`,
      a: `The pattern is ${c.orderSyntax ?? 'series-spec-angle-mount-output-valve'}. A worked example is ${c.example ?? code}. Rotation, mount, output and valve are chosen per machine, so the code on your drawing is what we build to.`,
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
            <span className="text-[#1B1E20]">{code}</span>
          </nav>
        </div>
      </div>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-20">
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
            {c.seriesCode} series · spec {model.spec} · {meta.family}
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-medium text-[#1B1E20] mb-5 leading-tight">
            {code} helical rotary actuator
          </h1>
          <p className="text-lg text-[#4A4E54] max-w-3xl mb-4">
            {c.drivingNm.toLocaleString('en-US')} Nm driving torque at {c.pressureBar} bar,{' '}
            {c.angles.join('° / ')}° rotation, in {mountShort}. The {code} is{' '}
            {idx >= 0 ? ordinal(idx + 1) : 'one'} of {seriesModels.length} sizes in the {c.seriesCode} {meta.label}{' '}
            range, built to order for {meta.duty}.
          </p>
          {positionLine ? <p className="text-base text-[#4A4E54] max-w-3xl mb-8">{positionLine}</p> : <div className="mb-4" />}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              [`${c.drivingNm.toLocaleString('en-US')} Nm`, 'Driving torque'],
              [`${c.pressureBar} bar`, 'Rated pressure'],
              [`${c.angles.join(' / ')}°`, 'Rotation'],
              [mountCodes.join(' / '), 'Mounting'],
            ].map(([v, k]) => (
              <div key={k} className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white px-4 py-4">
                <div className="font-heading text-xl text-[#1B1E20] mb-1">{v}</div>
                <div className="text-xs text-[#62666C] uppercase tracking-wider">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            Specifications — {code}
          </h2>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <tbody>
                {specs.map(([k, v]) => (
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
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            What the code means
          </h2>
          <p className="text-sm text-[#62666C] max-w-3xl mb-6">
            Every {c.seriesCode} unit is specified the same way. If your tag carries a different suffix, the base
            size is still {code}.
          </p>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <tbody>
                {decode.map(([seg, meaning]) => (
                  <tr key={seg} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <th scope="row" className="text-left py-3 px-5 font-mono font-medium text-[#2C4A73] w-40">
                      {seg}
                    </th>
                    <td className="py-3 px-5 text-[#4A4E54]">{meaning}</td>
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
            Where {code} sits in the {c.seriesCode} range
          </h2>
          <p className="text-sm text-[#62666C] max-w-3xl mb-6">
            The nearest sizes either side of {code}. If your load is borderline, these are the two builds worth
            checking before you commit to a size.
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
                {neighbourTable.map((m) => (
                  <tr key={m.hmr} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                    <td className="py-3 px-5 text-[#1B1E20] font-mono text-xs">
                      {m.hmr}
                      {m.hmr === code ? <span className="ml-2 text-[#62666C]">this page</span> : null}
                    </td>
                    <td className="py-3 px-5 text-[#4A4E54]">{m.drivingNm.toLocaleString('en-US')} Nm</td>
                    <td className="py-3 px-5 text-[#4A4E54]">{m.rotation.join('° / ')}°</td>
                    <td className="py-3 px-5">
                      {m.hmr === code ? (
                        <span className="text-[#62666C]">—</span>
                      ) : !HMR_MODEL_PAGE_CODES.includes(m.hmr) ? (
                        <span className="text-[#62666C]">Ask us</span>
                      ) : (
                        <Link
                          href={`/products/rotary-actuators/${m.hmr.toLowerCase()}`}
                          className="text-[#2C4A73] no-underline hover:underline"
                        >
                          {m.hmr}
                        </Link>
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
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Cross reference</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Models customers compare with {code}
          </h2>
          <p className="text-sm text-[#4A4E54] max-w-3xl mb-6">
            These are the models that sit in the same torque class and come up in the same enquiries. They are
            comparable references, not validated substitutions — we confirm the mounting pattern, shaft and port
            details against your unit before quoting.
          </p>
          <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Make</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Model</th>
                  <th className="text-left py-3 px-5 font-medium text-[#1B1E20]">Reference page</th>
                </tr>
              </thead>
              <tbody>
                {rows.length ? (
                  rows.map((r) => (
                    <tr key={`${r.brand}-${r.ref}`} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                      <td className="py-3 px-5 text-[#1B1E20]">{r.brand}</td>
                      <td className="py-3 px-5 text-[#4A4E54] font-mono text-xs">{r.ref}</td>
                      <td className="py-3 px-5">
                        {r.href ? (
                          <Link href={`/alternatives/${r.href}`} className="text-[#2C4A73] no-underline hover:underline">
                            See the {r.ref} page
                          </Link>
                        ) : (
                          <span className="text-[#62666C]">No page — ask us</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 px-5 text-[#62666C]">
                      No comparable reference is published for this size. Send your tag and we will match it against
                      the {c.seriesCode} range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#62666C] max-w-3xl mt-4">{c.notice}</p>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            What we check before quoting
          </h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl">
            <div className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white p-5">
              <h3 className="font-medium text-[#1B1E20] mb-2">On the unit</h3>
              <ul className="text-sm text-[#4A4E54] space-y-1.5 list-disc pl-4">
                <li>Mounting pattern and bolt spacing</li>
                <li>Shaft type, spline or keyway, and length</li>
                <li>Port size, thread form and valve arrangement</li>
              </ul>
            </div>
            <div className="border border-[rgba(44,74,115,0.10)] rounded-md bg-white p-5">
              <h3 className="font-medium text-[#1B1E20] mb-2">On the machine</h3>
              <ul className="text-sm text-[#4A4E54] space-y-1.5 list-disc pl-4">
                <li>Available envelope and tie-rod clearance</li>
                <li>Working pressure and flow at the actuator</li>
                <li>Rotation stops and any mechanical limits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">
            {code} questions
          </h2>
          <div className="max-w-3xl divide-y divide-[rgba(44,74,115,0.10)] border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="p-5">
                <h3 className="font-medium text-[#1B1E20] mb-2">{f.q}</h3>
                <p className="text-sm text-[#4A4E54]">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#62666C] max-w-3xl mt-4">
            Still identifying the unit? Start with{' '}
            <Link href="/alternatives/how-to-identify" className="text-[#2C4A73] no-underline hover:underline">
              how to identify a rotary actuator
            </Link>{' '}
            or the{' '}
            <Link href="/alternatives/cross-reference-guide" className="text-[#2C4A73] no-underline hover:underline">
              cross-reference guide
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="rfq" className="bg-[#F7F8FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            Send your tag and mounting drawing
          </h2>
          <p className="text-[#4A4E54] max-w-2xl mx-auto mb-7">
            We confirm the fit against {code}, quote the matching build and give you a delivery date.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#2C4A73] text-white text-sm font-medium no-underline hover:bg-[#1E3A5F]"
          >
            Request a quote for {code}
          </Link>
        </div>
      </section>
    </main>
  );
}

/** Metadata for one HMR model page. */
export function hmrModelMetadata(code: string) {
  const c = getHmrComparison(code);
  const model = HMR_ALL_DATA.models.find((m) => m.hmr === code);
  if (!c || !model) return { title: 'Not found' };
  const meta = SERIES_META[c.seriesCode] ?? SERIES_META.HMR2;
  const rawMounts = HMR_ALL_DATA.series[c.seriesCode].mounts;
  const mountTitle =
    rawMounts.length === 1
      ? MOUNT_TITLE_BY_SERIES[`${c.seriesCode}-${rawMounts[0].code}`] ??
        MOUNT_TITLE[rawMounts[0].code] ??
        rawMounts[0].code
      : rawMounts.map((m) => m.code).join('/') + ' Mount';
  return {
    title: `${code} Helical Rotary Actuator — ${c.drivingNm.toLocaleString('en-US')} Nm, ${c.angles[0]}° ${mountTitle}`,
    description: `${code} helical hydraulic rotary actuator: ${c.drivingNm.toLocaleString('en-US')} Nm driving torque at ${c.pressureBar} bar, ${c.angles.join('/')}° rotation, ${rawMounts
      .map((m) => (m.label ?? MOUNT_LABELS[m.code] ?? m.code).toLowerCase())
      .join(' / ')}, ${c.outputs.join('/')} output, ${c.valves.join('/')} valves. ${meta.family}. Order code ${c.example ?? code}.`,
    alternates: { canonical: `/products/rotary-actuators/${code.toLowerCase()}` },
  };
}
