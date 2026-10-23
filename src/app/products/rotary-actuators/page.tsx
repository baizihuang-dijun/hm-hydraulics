import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { RotaryGallery } from '@/components/products/rotary-gallery';
import { HmrUnifiedSelector } from '@/components/hmr/hmr-unified-selector';
import { HMR_ALL_DATA, HMR_SERIES_CODES, type HmrModel } from '@/lib/hmr/hmr-all-series';

function formatComparableRefs(refs: string[]): string {
  if (refs.length === 2) {
    const [a, b] = refs;
    const ma = a.match(/^(F10|F5)\s+(.+)$/);
    const mb = b.match(/^(F10|F5)\s+(.+)$/);
    if (ma && mb && ma[2] === mb[2] && ma[1] !== mb[1]) {
      return `F10/F5 ${ma[2]}`;
    }
  }
  return refs.join(', ');
}

const NOTE_SYMBOLS = ['*', '†', '‡', '§', '¶', '#'];

function comparableCellText(m: HmrModel, noteToSymbol: Map<string, string>): ReactNode {
  const brands = [
    { key: 'helac' as const, label: 'Helac' },
    { key: 'hks' as const, label: 'HKS' },
    { key: 'moveco' as const, label: 'Moveco' },
    { key: 'sungji' as const, label: 'Sungji' },
  ];
  const parts = brands
    .filter((b) => m.comparable[b.key].length > 0)
    .map((b) => `${b.label}: ${formatComparableRefs(m.comparable[b.key])}`);
  const symbol = m.comparableNote ? noteToSymbol.get(m.comparableNote) : undefined;
  return (
    <>
      {parts.length > 0 ? parts.join(' · ') : 'Ask engineering'}
      {symbol && (
        <sup
          className="ml-1 text-[10px] text-[#62666C]"
          title={m.comparableNote}
        >
          {symbol}
        </sup>
      )}
    </>
  );
}

export const metadata: Metadata = {
  title: 'Hydraulic Rotary Actuators — Helical, Block Mount, 125–76,000 Nm | HM',
  description:
    'Helical hydraulic rotary actuators (rotary hydraulic cylinders) in foot, flange and block-mount styles — from small hydraulic rotary actuators to 76,000 Nm. HMR1–HMR6, 54 builds. Cross-reference Helac, HKS, Moveco.',
  alternates: { canonical: '/products/rotary-actuators' },
};

const hmrSeries = [
  {
    name: 'HMR1',
    torqueMax: 76000,
    torque: '200 – 76,000 Nm',
    pressure: 'Up to 210 bar',
    rotation: '90° / 180° / 360°',
    applications: 'Robotic arms, horizontal & vertical moving tools, door/hatch actuation',
  },
  {
    name: 'HMR2',
    torqueMax: 5870,
    torque: '508 – 5,870 Nm',
    pressure: 'Up to 210 bar',
    rotation: '180°',
    applications: 'Aerial work platforms, straight-arm & knuckle-arm swing mechanisms',
  },
  {
    name: 'HMR3',
    torqueMax: 2825,
    torque: '190 – 2,825 Nm',
    pressure: 'Up to 210 bar',
    rotation: '180° / 360°',
    applications: 'Steering mechanisms, mechanical arms, manipulators',
  },
  {
    name: 'HMR4',
    torqueMax: 42900,
    torque: '1,920 – 42,900 Nm',
    pressure: 'Up to 210 bar',
    rotation: '180° / 360°',
    applications: 'Tunnel drills, mining equipment, heavy-duty machinery rotation',
  },
  {
    name: 'HMR5',
    torqueMax: 32000,
    torque: '125 – 32,000 Nm',
    pressure: 'Up to 135 bar',
    rotation: '90°',
    applications: 'Valve actuation — petrochemical, marine, industrial valves',
  },
  {
    name: 'HMR6',
    torqueMax: 6780,
    torque: '2,830 – 6,780 Nm',
    pressure: 'Up to 210 bar',
    rotation: '220°',
    applications: 'Sanitation truck lifter systems, waste container tipping mechanisms',
  },
];

const otherMechanisms = [
  {
    name: 'DT',
    fullName: 'HMT tilt actuator family',
    torque: '500 – 10,000 Nm',
    pressure: 'Up to 210 bar',
    rotation: 'Up to 360° (multi-turn available)',
    applications: 'Excavator couplers, bucket tilt, attachment positioning',
    image: '/images/products/hmt-a-tilt-motor-v2.jpg',
    alt: 'HMT-A tilt actuator for excavator couplers',
  },
];

const maxScale = Math.max(...hmrSeries.map((s) => s.torqueMax));

const rotaryFaqs = [
  {
    q: 'What is the difference between a rotary actuator and a hydraulic motor?',
    a: 'A hydraulic motor rotates continuously through unlimited turns, while a rotary actuator swings through a fixed angle — typically 90°, 180° or 360°. The helical design converts linear piston motion into that angular rotation, delivering high torque in a compact block-mount body for positioning, clamping and swing duties.',
  },
  {
    q: 'How do I choose the right torque for a block-mount rotary actuator?',
    a: 'Start from the load torque and duty cycle, then add a safety margin for shock and side loading. Confirm the working pressure, rotation angle and shaft or interface dimensions, and match the mounting envelope. Send the required torque, angle, pressure and a drawing — engineering confirms the HMR series and configuration.',
  },
  {
    q: 'Are HMR actuators direct replacements for Helac, HKS, Moveco or Sungji units?',
    a: 'Use the cross-reference tables as a starting point, not a guarantee of interchangeability. Torque and envelope can align, but shaft, port and mounting dimensions must be verified against the controlled drawing. Share the OEM model or drawing and HM confirms fit before order.',
  },
  {
    q: 'What rotation angles are available?',
    a: 'Standard HMR builds cover 90°, 180°, 220° and 360° depending on series — for example HMR2 is 180°, HMR5 is 90°, and HMR3/HMR4 offer 180°/360°. Multi-turn and non-standard angles are available on engineered builds.',
  },
  {
    q: 'How are rotary actuators tested before shipment?',
    a: 'Every rotary actuator is pressure-tested before shipment. A documented 1,000,000-cycle full-load endurance test at 150 bar was independently run on a large HMR-class helical unit in 2017. Pressure-test records, dimensional inspection reports and batch traceability are available on request.',
  },
];

function jsonLd() {
  // Emitted as Service (not Product): quote-based sales carry no public offers/rating,
  // which schema.org Product rich results require. Spec data is retained for entities/GEO.
  const items = HMR_SERIES_CODES.map((code, i) => ({
    '@type': 'Service',
    name: code,
    serviceType: `${code} helical hydraulic rotary actuator series`,
    description: `${code} helical hydraulic rotary actuator series`,
    provider: { '@type': 'Organization', name: 'HM Hydraulics' },
    hasVariant: HMR_ALL_DATA.models
      .filter((m) => m.series === code)
      .map((m) => {
        const props = [
          { '@type': 'PropertyValue', name: 'Rated driving torque', value: `${m.drivingNm} Nm` },
          { '@type': 'PropertyValue', name: 'Rated pressure', value: `${HMR_ALL_DATA.series[code].pressureBar} bar` },
          { '@type': 'PropertyValue', name: 'Rotation', value: m.rotation.map((r) => `${r}°`).join(', ') },
        ];
        if (m.comparable.helac.length) {
          props.push({ '@type': 'PropertyValue', name: 'Comparable reference (Helac)', value: formatComparableRefs(m.comparable.helac) });
        }
        if (m.comparable.hks.length) {
          props.push({ '@type': 'PropertyValue', name: 'Comparable reference (HKS)', value: formatComparableRefs(m.comparable.hks) });
        }
        if (m.comparable.moveco.length) {
          props.push({ '@type': 'PropertyValue', name: 'Comparable reference (Moveco)', value: formatComparableRefs(m.comparable.moveco) });
        }
        if (m.comparable.sungji.length) {
          props.push({ '@type': 'PropertyValue', name: 'Comparable reference (Sungji)', value: formatComparableRefs(m.comparable.sungji) });
        }
        if (m.comparableNote) {
          props.push({ '@type': 'PropertyValue', name: 'Comparable note', value: m.comparableNote });
        }
        return {
          '@type': 'Service',
          name: m.hmr,
          serviceType: 'Hydraulic rotary actuator',
          description: `Rated driving torque ${m.drivingNm} Nm at ${HMR_ALL_DATA.series[code].pressureBar} bar`,
          provider: { '@type': 'Organization', name: 'HM Hydraulics' },
          additionalProperty: props,
        };
      }),
    position: i + 1,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Products', item: 'https://www.hmhydraulics.com/products' },
          { '@type': 'ListItem', position: 2, name: 'Rotary Actuators', item: 'https://www.hmhydraulics.com/products/rotary-actuators' },
        ],
      },
      ...items,
      {
        '@type': 'FAQPage',
        mainEntity: rotaryFaqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default function RotaryActuatorsPage() {
  const noteToSymbol = new Map<string, string>();
  const footnotes: string[] = [];
  HMR_ALL_DATA.models.forEach((m) => {
    if (m.comparableNote && !noteToSymbol.has(m.comparableNote)) {
      noteToSymbol.set(m.comparableNote, NOTE_SYMBOLS[footnotes.length % NOTE_SYMBOLS.length]);
      footnotes.push(m.comparableNote);
    }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-[#62666C]">
            <Link
              href="/products"
              className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Rotary Actuators</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">ROTARY ACTUATORS</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            6 HMR Series. 54 Configurations. One Sourcing Point.
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            Helical hydraulic rotary actuators covering 125 Nm to 76,000 Nm across six standard HMR
            series, with foot, flange, and through-shaft configurations for industrial applications.
          </p>
          <p className="mt-4 text-base text-[#4A4E54] leading-relaxed max-w-2xl">
            A rotary hydraulic actuator — the helical type is also called a helical hydraulic
            rotary actuator or rotary hydraulic cylinder — converts hydraulic pressure into
            high-torque angular rotation in a compact block-mount package. HM supplies six HMR series,
            from small hydraulic rotary actuators for valves and aerial work platforms to heavy units
            reaching 76,000 Nm for mining and drilling.
          </p>
          <p className="mt-4 text-sm text-[#5A6775]">
            Looking for a cross-reference to a specific Helac / HKS / Moveco / Sungji model?{' '}
            <Link href="/alternatives" className="text-[#2C4A73] hover:underline">
              Search by model or OEM part code
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Series Overview */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="space-y-0">
            {hmrSeries.map((item, index) => (
              <div
                key={item.name}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 border-b border-[rgba(44,74,115,0.08)] first:border-t"
              >
                {/* Series Name */}
                <div className="md:col-span-2">
                  <h3 className="font-heading text-lg font-medium text-[#1B1E20]">{item.name}</h3>
                </div>

                {/* Specs */}
                <div className="md:col-span-3">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                    Torque Range
                  </p>
                  <p className="text-sm text-[#1B1E20] font-medium">{item.torque}</p>
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1 mt-3">
                    Max Pressure
                  </p>
                  <p className="text-sm text-[#1B1E20]">{item.pressure}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                    Rotation
                  </p>
                  <p className="text-sm text-[#1B1E20]">{item.rotation}</p>
                </div>

                {/* Applications */}
                <div className="md:col-span-5">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                    Typical Applications
                  </p>
                  <p className="text-sm text-[#4A4E54] leading-relaxed">{item.applications}</p>
                </div>

                {/* Sequence number */}
                <div className="hidden md:block md:col-span-0" />
                <div className="sr-only">{String(index + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Image Gallery (Client Component) */}
      <RotaryGallery />

      {/* Torque Range Visual */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Coverage</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Torque Range Overview
          </h2>

          <div className="space-y-3">
            {hmrSeries.map((item) => {
              const widthPercent = Math.max(3, (item.torqueMax / maxScale) * 100);
              return (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="font-label text-xs text-[#62666C] w-16 shrink-0 text-right">
                    {item.name}
                  </span>
                  <div className="flex-1 h-6 bg-[rgba(44,74,115,0.04)] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#2C4A73] rounded-sm transition-all duration-300"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#62666C] w-28 shrink-0">{item.torque}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-[#62666C] max-w-3xl">
            Standard series cover 125 Nm to 76,000 Nm. Our manufacturing envelope extends up to
            200,000 Nm for engineered, non-standard builds — send the required torque and duty
            cycle and we confirm the configuration.
          </p>
        </div>
      </section>

      {/* Unified Selector */}
      <HmrUnifiedSelector />

      {/* Full SSR Spec Table */}
      <section className="bg-[#FAFAF7] border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Catalogue</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            HMR Series Specification Table
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[rgba(44,74,115,0.10)] bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-[#F0F4FA] text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-[#1B1E20]">Series</th>
                  <th className="px-4 py-3 font-medium text-[#1B1E20]">Model</th>
                  <th className="px-4 py-3 font-medium text-[#1B1E20]">Driving torque</th>
                  <th className="px-4 py-3 font-medium text-[#1B1E20]">Pressure</th>
                  <th className="px-4 py-3 font-medium text-[#1B1E20]">Rotation</th>
                  <th className="px-4 py-3 font-medium text-[#1B1E20]">Comparable references</th>
                </tr>
              </thead>
              <tbody>
                {HMR_SERIES_CODES.map((code) => {
                  const models = HMR_ALL_DATA.models.filter((m) => m.series === code);
                  return models.map((m, idx) => (
                    <tr
                      key={m.hmr}
                      id={`spec-${m.hmr}`}
                      className={`border-t border-[rgba(44,74,115,0.06)] hover:bg-[#FAFAF7] transition-colors ${
                        m.availability === 'engineered' ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      {idx === 0 && (
                        <td
                          className="px-4 py-3 font-medium text-[#1B1E20] align-top"
                          rowSpan={models.length}
                        >
                          {code}
                        </td>
                      )}
                      <td className="px-4 py-3 font-mono text-[#1B1E20]">
                        <span className="align-middle">{m.hmr}</span>
                        {m.availability === 'engineered' && (
                          <span className="ml-2 inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-800 align-middle">
                            Engineered
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#4A4E54]">{m.drivingNm.toLocaleString()} Nm</td>
                      <td className="px-4 py-3 text-[#4A4E54]">{HMR_ALL_DATA.series[code].pressureBar} bar</td>
                      <td className="px-4 py-3 text-[#4A4E54]">
                        {m.rotation.map((r) => `${r}°`).join(', ')}
                      </td>
                      <td className="px-4 py-3 text-[#4A4E54] text-xs whitespace-nowrap">
                        {comparableCellText(m, noteToSymbol)}
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
          {footnotes.length > 0 && (
            <div className="mt-3 space-y-1">
              {footnotes.map((note, i) => (
                <p key={i} className="text-[11px] text-[#62666C] leading-relaxed">
                  <sup className="mr-1">{NOTE_SYMBOLS[i % NOTE_SYMBOLS.length]}</sup>
                  {note}
                </p>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs text-[#62666C]">
            {HMR_ALL_DATA.compareNotice}
          </p>
        </div>
      </section>

      {/* Explainer: what it is + mounting styles */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
              What Is a Helical Hydraulic Rotary Actuator?
            </h2>
            <p className="text-sm text-[#4A4E54] leading-relaxed">
              A helical hydraulic rotary actuator (also called a rotary hydraulic cylinder) turns
              linear piston motion into high-torque angular rotation through a helical spline. As
              hydraulic oil drives the piston, internal helical gearing rotates the output shaft
              — producing more torque in a smaller envelope than a rack-and-pinion design, with
              no external linkage. That compact block-mount body is why helical rotary hydraulic
              actuators are used where space is tight and torque is high: valve actuation, aerial
              work platforms, mining and drilling equipment.
            </p>
            <p className="mt-4 text-sm">
              <Link href="/alternatives" className="text-[#2C4A73] hover:underline">
                Cross-reference Helac, HKS, Moveco or Sungji by model or OEM code &rarr;
              </Link>
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
              Mounting Styles: Rotary Actuator Block Mount, Foot, Flange &amp; Through-Shaft
            </h2>
            <p className="text-sm text-[#4A4E54] leading-relaxed">
              HMR series are offered in four mounting styles. A rotary actuator block mount bolts
              directly through the body for the most rigid, space-efficient installation and is the
              common choice for a small hydraulic rotary actuator on compact machines. Foot mounts
              suit a horizontal base, flange mounts locate on a machined face, and through-shaft
              designs drive from both ends. To select one, confirm required torque, rotation angle,
              working pressure and shaft interface, then match the envelope — send the drawing
              and HM verifies the fit.
            </p>
            <p className="mt-4 text-sm">
              <Link href="/quality" className="text-[#2C4A73] hover:underline">
                Quality, pressure testing &amp; endurance validation &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">APPLICATIONS</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Excavator', 'Attachment', 'Material Handling', 'Agricultural', 'Mining machinery'].map(
              (industry) => (
                <div
                  key={industry}
                  className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-5 text-center hover:border-[#2C4A73] transition-colors duration-200"
                >
                  <h3 className="font-heading text-[#1B1E20] text-sm font-medium">{industry}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Other rotary mechanisms */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <p className="text-xs font-semibold tracking-widest text-[#62666C] uppercase mb-2">Other mechanisms</p>
          <h2 className="font-heading text-xl md:text-2xl font-medium text-[#1B1E20] mb-4">
            HMT tilt actuators
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
            Excavator coupler and bucket-tilt solutions are available as the HMT-A / HMT-B / HMT-C /
            HMT-D public groups. Send your requirement for configuration support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {otherMechanisms.map((m) => (
              <div
                key={m.name}
                id={m.name.startsWith('DT') ? 'tilt-actuators' : undefined}
                className="p-4 border border-[rgba(44,74,115,0.10)] rounded-lg bg-[#FAFAF7]"
              >
                <div className="aspect-[4/3] mb-3 rounded-lg bg-white border border-[rgba(44,74,115,0.08)] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.image} alt={m.alt} className="w-full h-full object-contain p-2" />
                </div>
                <div className="font-medium text-[#1B1E20] mb-1">{m.fullName}</div>
                <div className="text-xs text-[#62666C]">{m.torque} · {m.pressure}</div>
                <div className="text-xs text-[#62666C] mt-1">{m.rotation}</div>
                {m.name.startsWith('DT') && (
                  <Link
                    href="/products/tilt-actuators"
                    className="inline-block mt-2 text-xs font-medium text-[#2C4A73] no-underline hover:underline"
                  >
                    View HMT tilt actuators &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 rounded-lg border border-[#2C4A73] text-[#2C4A73] text-sm font-medium no-underline hover:bg-[#2C4A73] hover:text-white transition-colors"
          >
            Contact engineering
          </Link>
        </div>
      </section>


      {/* FAQ */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-[#FAFAF7]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Buying guide</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl space-y-8">
            {rotaryFaqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">{f.q}</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-[#4A4E54]">
            Still comparing models?{' '}
            <Link href="/alternatives" className="text-[#2C4A73] hover:underline">
              Browse the cross-reference guide
            </Link>{' '}
            or{' '}
            <Link href="/quality" className="text-[#2C4A73] hover:underline">
              read about quality &amp; pressure testing
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-3">
              Need detailed specifications?
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              Request dimension drawings, performance curves, and application notes for any series.
              Our engineering team is ready to assist.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Request Documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
