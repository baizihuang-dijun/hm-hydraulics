import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE, buildFullSearchIndex } from '@/components/alternatives/model-data';
import { AlternativesBrowser } from '@/components/alternatives/alternatives-browser';

const searchIndex = buildFullSearchIndex();

export const metadata: Metadata = {
  title: 'Rotary Actuator Troubleshooting: Drift, Weak Torque, Leaks & Noise',
  description:
    'Diagnose rotary actuator drift, weak or lost torque, external leaks and noisy motion. Safety-first checks separate an actuator fault from the valve and supply.',
  alternates: { canonical: '/alternatives/rotary-actuator-troubleshooting' },
};

const pagePath = '/alternatives/rotary-actuator-troubleshooting';

const faqs = [
  {
    q: 'Why does my actuator drift or will not hold position?',
    a: 'Position drift usually means pressure is not being held. Common causes are internal seal leakage past the piston or shaft seals, or a counterbalance / load-holding valve that is leaking, mis-adjusted or mismatched. Confirm the valve and its setting before assuming the actuator body is at fault.',
  },
  {
    q: 'What causes weak or lost torque?',
    a: 'Low supply pressure, internal bypass leakage from worn or damaged seals, or a slipping load coupling can all reduce output. Check pump and relief pressure first, inspect for internal leakage, and confirm the shaft is still positively driving the load.',
  },
  {
    q: 'Is an external oil leak always a failed shaft seal?',
    a: 'Not always. Oil at the shaft can be a worn shaft seal, but it can also come from a loose port fitting, a damaged housing face or a scored shaft surface that cuts a new seal. Wipe the unit clean, cycle it and watch where the oil first appears.',
  },
  {
    q: 'Why is the actuator noisy or moving roughly?',
    a: 'Air in the oil, contaminated fluid, cavitation from a restricted supply, or mechanical damage to splines, bearings or the shaft can cause noise and jerky motion. Bleed the system and check the fluid before opening the actuator.',
  },
  {
    q: 'Should I rebuild or replace a faulty actuator?',
    a: 'If only seals are worn and the housing, shaft and splines are sound, a seal kit can be enough. If the bore is scored, the shaft worn or the bearings failed, replacement is usually more reliable. Our rebuild-vs-replacement guide walks through the decision.',
  },
];

const symptomRows = [
  {
    symptom: 'Drift / will not hold position',
    likely: 'Internal seal leakage; leaking or mis-adjusted counterbalance valve; over-running load beyond the valve rating.',
    checks: 'Confirm load-holding valve type and setting; check for internal bypass; verify the load matches the original duty.',
  },
  {
    symptom: 'Weak or lost torque',
    likely: 'Low supply/relief pressure; worn piston or shaft seals causing bypass; slipping or sheared drive coupling.',
    checks: 'Check pump and relief pressure first; look for internal leakage; confirm the shaft still drives the load positively.',
  },
  {
    symptom: 'External oil leak',
    likely: 'Worn shaft seal; loose port fitting; damaged housing or flange face; scored shaft cutting the seal.',
    checks: 'Clean, cycle and locate the first oil source; torque fittings to spec; inspect shaft surface and housing faces.',
  },
  {
    symptom: 'Won’t move / moves only one way',
    likely: 'No pilot or supply pressure; blocked or reversed ports; failed counterbalance valve; seized load or actuator.',
    checks: 'Verify supply and pilot pressure; confirm plumbing; isolate the valve before condemning the actuator.',
  },
  {
    symptom: 'Noisy or jerky motion',
    likely: 'Air in the oil; cavitation from a restricted or cold supply; contaminated fluid; damaged splines or bearings.',
    checks: 'Bleed the system; check fluid condition and temperature; inspect mechanical internals if symptoms remain.',
  },
  {
    symptom: 'Ends short of full angle',
    likely: 'Internal stop-tube or mechanical stop set for a special angle; reduced flow; internal leakage near end of stroke.',
    checks: 'Read the tag for a special angle code (e.g. base/final); check flow and pressure at end of stroke.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'Troubleshooting', item: `${SITE}${pagePath}` },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rotary Actuator Troubleshooting: Drift, Weak Torque, Leaks & Noise',
  description:
    'Diagnose rotary actuator problems: position drift, weak or lost torque, external leaks, creeping, noise and rough movement, with safety-first checks.',
  author: { '@type': 'Organization', name: 'HM Hydraulics Engineering Team' },
  publisher: {
    '@type': 'Organization',
    name: 'HM Hydraulics — Qingdao Hydraulic Machinery Co., Ltd.',
    url: SITE,
  },
  datePublished: '2026-10-23',
  dateModified: '2026-10-23',
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

export default function TroubleshootingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, articleJsonLd, faqJsonLd]) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#62666C]">
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/alternatives" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">Helac Alternatives</Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Troubleshooting</span>
          </nav>
        </div>
      </section>

      {/* Safety notice */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-[#FAFAF7]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-4">
          <p className="text-sm text-[#4A4E54] leading-relaxed">
            <span className="font-medium text-[#1B1E20]">Safety first:</span> relieve hydraulic pressure and
            support any raised or rotating load before disconnecting hoses or removing an actuator. A drifting
            load can move unexpectedly when a load-holding valve is disturbed. This guide is for diagnosis;
            pressure testing and internal repairs should follow the machine service manual.
          </p>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">TROUBLESHOOTING</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            Rotary Actuator Troubleshooting: Drift, Weak Torque, Leaks &amp; Noise
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            When a swing function drifts, loses force, leaks oil or moves roughly, the actuator is not always
            the culprit — supply pressure and the load-holding valve cause many of the same symptoms. Work from
            the outside in: confirm pressure and the valve first, then look at seals, shaft and housing. This
            page maps each symptom to its likely causes and the checks that separate them.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: October 2026</p>
        </div>
      </section>

      {/* Symptom table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">Symptom-to-cause table</h2>
          <div className="space-y-5">
            {symptomRows.map((r) => (
              <div key={r.symptom} className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">{r.symptom}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-sm text-[#4A4E54] leading-relaxed">
                    <span className="font-label text-xs uppercase tracking-wider text-[#62666C]">Likely causes</span><br />
                    {r.likely}
                  </p>
                  <p className="text-sm text-[#4A4E54] leading-relaxed">
                    <span className="font-label text-xs uppercase tracking-wider text-[#62666C]">Checks</span><br />
                    {r.checks}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outside-in sequence */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">Diagnose outside-in before opening the unit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['01 · Supply & pressure', 'Verify pump flow, relief pressure and that the correct pilot/supply pressure reaches the ports. Many “weak actuator” faults start here.'],
              ['02 · Load-holding valve', 'Check the counterbalance valve for leakage, adjustment and the correct part number. A drifting load is frequently a valve issue, not a body issue.'],
              ['03 · External signs', 'Wipe clean, cycle and locate the first oil. Inspect port fittings, flange faces and the shaft surface, not just the shaft seal.'],
              ['04 · Internal condition', 'Only after the above, inspect seals for bypass, the bore for scoring and bearings/splines for wear — this decides rebuild vs replacement.'],
            ].map(([h, b]) => (
              <div key={h} className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
                <p className="eyebrow mb-3">{h}</p>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[#4A4E54] leading-relaxed max-w-3xl">
            Once you have confirmed the fault is inside the actuator, the next decision is whether a seal kit
            will restore it or whether wear to the housing, shaft or bearings makes a replacement the more
            reliable route. See our{' '}
            <Link href="/alternatives/rebuild-vs-replacement" className="text-[#2C4A73] underline">rebuild vs replacement guide</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">ENGINEERING CHECK</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">Send the symptom and the tag</h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Tell us what the actuator is doing and send a tag photo. We help you separate a supply/valve
                problem from an actuator fault and confirm whether a seal kit or a replacement unit is the
                right course before you commit to downtime.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{' '}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">hm@hmhydraulics.com</a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Actuator troubleshooting" />
            </div>
          </div>
        </div>
      </section>

      {/* Browser */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-2">Find your actuator reference</h2>
          <p className="text-sm text-[#62666C] mb-8">Search by model code or OEM part number across our cross-reference library.</p>
          <AlternativesBrowser searchIndex={searchIndex} />
        </div>
      </section>

      {/* Related guides */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">Related guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/alternatives/rebuild-vs-replacement" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Rebuild vs Replacement</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Compare seal-kit cost, downtime and risk against a new unit.</p>
            </Link>
            <Link href="/alternatives/rotary-actuator-types" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Rotary Actuator Types</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Helical, rack-and-pinion and vane designs compared.</p>
            </Link>
            <Link href="/alternatives/how-to-identify" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">How to Identify Your Actuator</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Read the model tag and code breakdown to confirm the build.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">Frequently asked questions</h2>
          <div className="max-w-3xl divide-y divide-[rgba(44,74,115,0.10)]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-heading text-base md:text-lg font-medium text-[#1B1E20]">
                  {f.q}
                  <span className="ml-4 text-[#2C4A73] text-xl leading-none transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[#4A4E54] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
          <p className="text-xs text-[#62666C] leading-relaxed max-w-4xl">
            These are general diagnostic indicators, not a service procedure. Always relieve pressure, secure
            the load and follow the equipment manufacturer’s service manual before testing or dismantling.
            Final diagnosis and the rebuild/replacement decision depend on the actual unit condition. Helac®
            and all OEM names are trademarks of their respective owners; HM Hydraulics is an independent
            manufacturer and is not affiliated with or endorsed by them.
          </p>
        </div>
      </section>
    </>
  );
}
