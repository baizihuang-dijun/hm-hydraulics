import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE } from '@/components/alternatives/model-data';
import { HMR_ALL_DATA } from '@/lib/hmr/hmr-all-series';
import { linkForBase } from '@/lib/hmr/hmr-cross-links';
import { HMR_MODEL_PAGE_CODES } from '@/lib/hmr/hmr-model-pages';
import { SERIES_META } from '@/lib/hmr/hmr-series-meta';

export const metadata: Metadata = {
  title: 'Which Rotary Actuator Do I Need? Match the Torque Class First',
  description:
    'Pick a helical rotary actuator by rated torque class, then confirm rotation angle, mounting, shaft and valve. Torque classes across Helac, HKS, Moveco and Sungji side by side.',
  alternates: { canonical: '/alternatives/which-one-do-i-need' },
};

const pagePath = '/alternatives/which-one-do-i-need';

const BRANDS = [
  ['helac', 'Helac'],
  ['hks', 'HKS'],
  ['moveco', 'Moveco'],
  ['sungji', 'Sungji'],
] as const;

const SERIES_ORDER = ['HMR1', 'HMR2', 'HMR3', 'HMR4', 'HMR5', 'HMR6'];

const checks = [
  {
    n: '01',
    title: 'Rated driving torque at your working pressure',
    body: 'Torque is quoted at a stated pressure — 210 bar for most helical actuators, 250 bar for some makes. Compare at the pressure your machine actually runs, not at the catalogue maximum.',
  },
  {
    n: '02',
    title: 'Rotation angle',
    body: '90°, 180°, 270° and 360° are separate builds, not adjustments. A 180° unit will not swing 360° because the port timing inside the housing is different.',
  },
  {
    n: '03',
    title: 'Mounting interface',
    body: 'Foot, front flange, rear flange and valve-mount bodies do not interchange. Bolt pattern, pilot diameter and the distance from mounting face to shaft end are the three numbers that decide whether it fits.',
  },
  {
    n: '04',
    title: 'Output shaft',
    body: 'Single key, double key, splined and flange shafts are all standard across the range. Shaft diameter and keyway position must match the arm or gear you are driving.',
  },
  {
    n: '05',
    title: 'Valve and port configuration',
    body: 'Integral counterbalance, dual pilot check, or no valve at all. If the unit is holding a load with the engine off, the valve block matters as much as the torque rating.',
  },
];

const traps = [
  {
    title: 'Rated torque is not holding torque',
    body: 'The published figure is driving torque at a stated pressure. Holding capacity with the valve closed is a separate characteristic of the valve block, and it is what decides whether a raised boom creeps down overnight.',
  },
  {
    title: 'Two models in one torque class can differ by 30%',
    body: 'A torque class groups models that customers treat as interchangeable. It is not a claim that the ratings are identical — always read the reference model’s own datasheet before assuming the numbers line up.',
  },
  {
    title: 'The tag on the machine is often not the catalogue code',
    body: 'OEMs order modified builds: different shaft, different ports, sometimes a different rotation. A tag reading L30-65 does not tell you the whole build; the suffix on the tag does.',
  },
  {
    title: 'A bigger actuator is not automatically safer',
    body: 'Oversizing adds weight on the arm, changes the swing speed at the same flow, and can overload the bracket the actuator bolts to. Match the class first, then look one size up only if the duty cycle demands it.',
  },
];

const faqs = [
  {
    q: 'How do I find out which rotary actuator I need?',
    a: 'Start with the rated driving torque your load needs at your working pressure, then the rotation angle, then the mounting interface, then the shaft, then the valve. Torque decides the size class; the other four decide whether that size will physically fit and hold.',
  },
  {
    q: 'Can I use a model from another make in the same torque class?',
    a: 'Not without checking the other four dimensions. A model in the same torque class is a comparable reference — the mounting pattern, shaft, rotation angle and valve ports still have to be compared against your unit before anything is quoted.',
  },
  {
    q: 'What if I only have the OEM part number and no model code?',
    a: 'Send the part number, the machine make and model, and a photo of the actuator tag. We work back from the OEM number and the measured mounting pattern to the size class, and confirm before quoting.',
  },
  {
    q: 'Do you publish torque ratings for the models from other makes?',
    a: 'No. The table below groups models by the torque class customers put them in. For the reference model’s own rating, use the manufacturer’s datasheet — we quote ratings for HM builds only.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'Which One Do I Need', item: `${SITE}${pagePath}` },
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

export default function WhichOneDoINeedPage() {
  const groups = SERIES_ORDER.map((series) => {
    const models = HMR_ALL_DATA.models
      .filter((m) => m.series === series)
      .sort((a, b) => a.drivingNm - b.drivingNm);
    const min = models[0]?.drivingNm ?? 0;
    const max = models[models.length - 1]?.drivingNm ?? 0;
    return { series, models, min, max };
  });

  const totalModels = HMR_ALL_DATA.models.length;
  const withRef = HMR_ALL_DATA.models.filter(
    (m) => BRANDS.some(([key]) => ((m.comparable as Record<string, string[] | undefined>)[key] ?? []).length > 0),
  ).length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, faqJsonLd]) }}
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
            <span className="text-[#1B1E20]">Which One Do I Need</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">SELECTION</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            Which Rotary Actuator Do I Need? Match the Torque Class First
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            Five numbers decide the unit: rated driving torque, rotation angle, mounting interface, output shaft
            and valve configuration. Torque picks the size class; the other four decide whether that size will
            bolt on and hold. Below is the same order we work in, followed by the torque classes our six series
            cover next to the models from other makes that turn up in the same enquiries.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: October 2026</p>
        </div>
      </section>

      {/* Five checks */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-2">The five checks, in order</h2>
          <p className="text-[#4A4E54] max-w-3xl mb-8">
            Working in this order stops the common mistake: buying on torque alone and finding the mounting
            pattern is 12 mm out.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {checks.map((c) => (
              <div key={c.n} className="p-6 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
                <p className="font-mono text-xs text-[#62666C] mb-2">{c.n}</p>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">{c.title}</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{c.body}</p>
              </div>
            ))}
            <div className="p-6 bg-[#2C4A73] rounded-md flex flex-col justify-between">
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Send the tag details and we run these five checks against our range and answer with the build that
                suits — usually within one working day.
              </p>
              <a
                href="#rfq"
                className="inline-block text-sm font-medium text-white no-underline border-b border-white/40 pb-1 self-start hover:border-white"
              >
                Send your details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Torque class table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <p className="eyebrow mb-4">TORQUE CLASSES</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            {totalModels} torque classes, four makes side by side
          </h2>
          <p className="text-[#4A4E54] max-w-3xl mb-2">
            Each row is one HM size with its rated driving torque. The four columns on the right list the models
            from other makes that come up in the same enquiries — comparable references, not validated
            substitutions. {withRef} of the {totalModels} classes have at least one published reference.
          </p>
          <p className="text-sm text-[#62666C] max-w-3xl mb-8">
            Codes starting with <span className="font-mono">I-</span> or <span className="font-mono">M-</span> are
            the same housing with a different valve block. A dash means we hold no reference for that class.
          </p>

          <div className="overflow-x-auto border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
            <table className="w-full text-sm min-w-[860px]">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
                  <th className="text-left py-3 px-4 font-medium text-[#1B1E20]">HM model</th>
                  <th className="text-right py-3 px-4 font-medium text-[#1B1E20] whitespace-nowrap">Driving torque</th>
                  {BRANDS.map(([key, label]) => (
                    <th key={key} className="text-left py-3 px-4 font-medium text-[#1B1E20]">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <Fragment key={g.series}>
                    <tr className="bg-[#EEF1F5] border-b border-[rgba(44,74,115,0.10)]">
                      <td colSpan={6} className="py-2.5 px-4">
                        <Link
                          href={`/products/rotary-actuators/${g.series.toLowerCase()}`}
                          className="text-xs font-medium text-[#2C4A73] no-underline hover:underline"
                        >
                          {g.series} — {SERIES_META[g.series]?.label ?? ''}, {g.min.toLocaleString('en-US')}–
                          {g.max.toLocaleString('en-US')} Nm, {g.models.length} sizes
                        </Link>
                      </td>
                    </tr>
                    {g.models.map((m) => {
                      const hasPage = HMR_MODEL_PAGE_CODES.includes(m.hmr);
                      return (
                        <tr key={m.hmr} className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0">
                          <td className="py-3 px-4 whitespace-nowrap">
                            {hasPage ? (
                              <Link
                                href={`/products/rotary-actuators/${m.hmr.toLowerCase()}`}
                                className="font-mono text-xs text-[#2C4A73] no-underline hover:underline"
                              >
                                {m.hmr}
                              </Link>
                            ) : (
                              <span className="font-mono text-xs text-[#1B1E20]">{m.hmr}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right text-[#4A4E54] whitespace-nowrap tabular-nums">
                            {m.drivingNm.toLocaleString('en-US')} Nm
                          </td>
                          {BRANDS.map(([key]) => {
                            const refs = (m.comparable as Record<string, string[] | undefined>)[key] ?? [];
                            return (
                              <td key={key} className="py-3 px-4 text-[#4A4E54]">
                                {refs.length === 0 ? (
                                  <span className="text-[#B8BCC2]">—</span>
                                ) : (
                                  <span className="font-mono text-xs">
                                    {refs.map((ref, i) => {
                                      const href = linkForBase(ref);
                                      return (
                                        <span key={ref}>
                                          {i > 0 ? ', ' : ''}
                                          {href ? (
                                            <Link
                                              href={`/alternatives/${href}`}
                                              className="text-[#2C4A73] no-underline hover:underline"
                                            >
                                              {ref}
                                            </Link>
                                          ) : (
                                            <span>{ref}</span>
                                          )}
                                        </span>
                                      );
                                    })}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#62666C] max-w-3xl mt-4">{HMR_ALL_DATA.compareNotice}</p>
        </div>
      </section>

      {/* Where the numbers mislead */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Where the numbers mislead
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {traps.map((t) => (
              <div key={t.title} className="p-6 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">{t.title}</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">Common questions</h2>
          <div className="max-w-3xl space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-[rgba(44,74,115,0.08)] pb-6 last:border-b-0">
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">{f.q}</h3>
                <p className="text-[#4A4E54] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">SELECTION HELP</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Send the Tag Details and We Size It
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Model code or OEM part number, the machine it is on, and the rotation angle if you know it. We run
                the five checks and come back with the build that suits — usually within one working day.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{' '}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">
                  hm@hmhydraulics.com
                </a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Actuator selection help" />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: '/alternatives/cross-reference-guide',
                title: 'Cross-reference guide',
                body: 'How to read an OEM part number and match it dimension by dimension.',
              },
              {
                href: '/alternatives/how-to-identify',
                title: 'How to identify an actuator',
                body: 'What to measure when the tag is missing or unreadable.',
              },
              {
                href: '/alternatives/rotary-actuator-types',
                title: 'Rotary actuator types',
                body: 'Helical, rack-and-pinion and vane: which one suits which duty.',
              },
              {
                href: '/products/rotary-actuators',
                title: 'HMR series overview',
                body: 'All six series and 56 sizes with torque, pressure and mounting.',
              },
              {
                href: '/alternatives/rebuild-vs-replacement',
                title: 'Rebuild or replace',
                body: 'When a seal kit is enough and when the housing is past saving.',
              },
              {
                href: '/alternatives/rotary-actuator-troubleshooting',
                title: 'Troubleshooting',
                body: 'Creep, drift, lost torque: what each symptom points at.',
              },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block p-6 bg-white border border-[rgba(44,74,115,0.10)] rounded-md no-underline hover:border-[#2C4A73] transition-colors"
              >
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">{l.title}</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{l.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
