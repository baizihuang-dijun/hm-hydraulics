import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE, buildSearchIndex } from '@/components/alternatives/model-data';
import { AlternativesBrowser } from '@/components/alternatives/alternatives-browser';

const searchIndex = buildSearchIndex();

export const metadata: Metadata = {
  title: 'Rotary Actuator Types Compared: Helical, Rack & Pinion vs Vane',
  description:
    'Helical, rack-and-pinion and vane rotary actuators compared: torque density, rotation angle, backlash, leakage and uses. Choose the right type for your load.',
  alternates: { canonical: '/alternatives/rotary-actuator-types' },
};

const pagePath = '/alternatives/rotary-actuator-types';

const faqs = [
  {
    q: 'Which rotary actuator type gives the most torque in the smallest space?',
    a: 'The helical sliding-spline design generally delivers the highest torque for a given envelope. Its piston and shaft carry multiple-start helical splines, so a short axial stroke produces high output torque without external gears.',
  },
  {
    q: 'What is the main difference between a helical and a rack-and-pinion actuator?',
    a: 'A rack-and-pinion unit converts linear piston motion through a gear on the output shaft and often uses two opposing pistons. A helical unit uses mating helical splines on the piston and shaft, which is more compact for the same torque but more precise to manufacture.',
  },
  {
    q: 'Are vane actuators still used?',
    a: 'Yes, for lighter, lower-pressure and high-cycle duties such as automation, fixtures and small positioning tasks. For heavy, shock-loaded mining and construction loads, helical or rack-and-pinion designs are usually preferred for their torque and robustness.',
  },
  {
    q: 'Can a rotary actuator rotate continuously?',
    a: 'Most rack-and-pinion and vane units are built for fixed angles such as 90°, 180° or 360°, and helical units are typically limited to about 180°–360° per stroke. If you need unlimited continuous rotation, a hydraulic motor (or a slew drive for slow heavy swing) is usually the correct choice rather than a limited-angle actuator.',
  },
  {
    q: 'Does a higher torque rating alone make two actuators interchangeable?',
    a: 'No. Mounting interface, shaft configuration, rotation angle, port position, valve option and the load path all have to match the original unit. A similar torque number by itself does not confirm a direct replacement; the tag and mounting drawing should always be checked.',
  },
];

const typeRows = [
  {
    type: 'Helical sliding-spline',
    principle: 'Linear piston travel is turned into shaft rotation by mating multi-start helical splines on the piston and output shaft.',
    strengths: 'Highest torque for its size; compact, single-piece housing; high stiffness; integral mounting faces.',
    angle: 'Commonly 90° / 180° / up to about 360° per stroke; angle set by the spline design.',
    best: 'Heavy, space-constrained swing and positioning on mining, construction and utility equipment — the Helac L/T/H-style form factor.',
  },
  {
    type: 'Rack & pinion',
    principle: 'One or two pistons drive a linear rack that turns a pinion gear on the output shaft.',
    strengths: 'Proven and serviceable; predictable torque; wide size range; easier to find large-angle builds.',
    angle: 'Often 90° / 180° / 220° / 360°; rotation set by rack travel.',
    best: 'General industrial rotation, valve and chute positioning, and larger envelopes where compactness is not the main constraint.',
  },
  {
    type: 'Vane',
    principle: 'Pressure acts on a rotating vane inside a circular chamber, moving the shaft directly.',
    strengths: 'Simple, compact at small sizes, smooth and fast cycling, low backlash at light loads.',
    angle: 'Fixed rotation stops, commonly up to about 270°–280° depending on the vane count.',
    best: 'Light-duty, high-cycle automation, fixtures and material handling at moderate pressure.',
  },
];

const compareRows = [
  ['Torque density (torque vs size)', 'Highest', 'High', 'Low–moderate'],
  ['Typical rotation angles', '90°–360°', '90°–360°', 'Up to ~270°'],
  ['Stiffness / shock-load tolerance', 'High', 'High', 'Moderate'],
  ['Compactness on the machine', 'Best', 'Moderate (longer housing)', 'Good at small sizes'],
  ['Serviceability', 'Seal/bearing overhaul possible', 'Gear & seal service possible', 'Vane/seal service, wear-sensitive'],
  ['Typical duty', 'Heavy mining / construction swing', 'General industrial rotation', 'Light, high-cycle automation'],
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'Rotary Actuator Types', item: `${SITE}${pagePath}` },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rotary Actuator Types Compared: Helical, Rack & Pinion vs Vane',
  description:
    'Helical, rack-and-pinion and vane rotary actuators compared: torque density, rotation angle, backlash, leakage and uses. Choose the right type for your load.',
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

export default function RotaryActuatorTypesPage() {
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
            <span className="text-[#1B1E20]">Rotary Actuator Types</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">SELECTION GUIDE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            Rotary Actuator Types Compared: Helical, Rack &amp; Pinion and Vane
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            Hydraulic rotary actuators turn oil pressure into a controlled swing through a fixed angle —
            not continuous rotation. Three designs dominate: the helical sliding-spline, the rack-and-pinion
            and the vane. They differ in how they convert motion, how much torque they fit into a given
            space, the angles they reach, and how they behave under heavy, dirty, shock-loaded duty.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: October 2026</p>
        </div>
      </section>

      {/* Three types */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">The three main designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {typeRows.map((t) => (
              <div key={t.type} className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
                <p className="eyebrow mb-3">{t.type}</p>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">How it works</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">{t.principle}</p>
                <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">Strengths</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">{t.strengths}</p>
                <p className="text-xs text-[#62666C] leading-relaxed mb-2"><span className="font-medium text-[#1B1E20]">Angle:</span> {t.angle}</p>
                <p className="text-xs text-[#62666C] leading-relaxed"><span className="font-medium text-[#1B1E20]">Typical use:</span> {t.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Helical deep dive */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">
            Why the helical sliding-spline fits heavy equipment
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-[#4A4E54] leading-relaxed mb-4">
                Inside a helical actuator, the piston and output shaft carry mating multi-start helical
                splines. When oil moves the piston axially, the angled splines force the shaft to rotate.
                Because the &ldquo;gear&rdquo; is wrapped around the piston rather than placed beside it, a
                short, stout cylinder produces high torque — there is no external pinion, no long rack
                housing and no gear mesh to take up backlash.
              </p>
              <p className="text-[#4A4E54] leading-relaxed">
                That torque density is why the form factor is common on booms, jibs, grabs, clamps and drill
                positioning where the mounting envelope is tight and the load is dynamic. The shaft is
                supported within the housing and the mounting flanges are integral, which keeps the load
                path short and rigid.
              </p>
            </div>
            <div className="p-6 bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-3">What this means on the machine</p>
              <ul className="space-y-3 text-sm text-[#4A4E54] leading-relaxed">
                <li>• High torque from a compact, often flange- or foot-mounted body.</li>
                <li>• Fixed, repeatable angles (commonly 180°/360°) with positive stops.</li>
                <li>• Stiff under side and shock loads typical of mining and construction.</li>
                <li>• Counterbalance-valve builds can hold an over-running load in position.</li>
                <li>• Replacement must match mounting, shaft, angle and valve — not just torque.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">Side-by-side comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.20)]">
                  <th className="py-3 pr-4 font-heading text-sm font-medium text-[#1B1E20]">Criterion</th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">Helical sliding-spline</th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">Rack &amp; pinion</th>
                  <th className="py-3 pl-4 font-heading text-sm font-medium text-[#1B1E20]">Vane</th>
                </tr>
              </thead>
              <tbody className="text-[#4A4E54]">
                {compareRows.map((r) => (
                  <tr key={r[0]} className="border-b border-[rgba(44,74,115,0.10)]">
                    <td className="py-3 pr-4 font-medium text-[#1B1E20]">{r[0]}</td>
                    <td className="py-3 px-4 text-sm">{r[1]}</td>
                    <td className="py-3 px-4 text-sm">{r[2]}</td>
                    <td className="py-3 pl-4 text-sm">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to choose */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">How to choose for the application</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Required angle and motion', 'Fixed swing under roughly 360° points to a limited-angle actuator; unlimited rotation points to a hydraulic motor. See our actuator-vs-motor guide.'],
              ['Available envelope', 'If the mounting space is tight and torque is high, the helical design usually wins. A longer rack housing is acceptable in many industrial frames.'],
              ['Load and duty cycle', 'Heavy shock loads and contamination favour helical or rack-and-pinion; clean, fast, light cycles suit a vane.'],
              ['Holding requirement', 'Over-running or suspended loads may need a counterbalance-valve build, not just a bigger actuator — confirm the valve option on the original tag.'],
              ['Replacement vs new design', 'When replacing an existing unit, match the exact model code and interface. When designing fresh, size from the load curve, then check the mounting and angle.'],
            ].map(([h, b]) => (
              <div key={h} className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
                <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-2">{h}</h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#2C4A73]">
            Comparing a rotary actuator with continuous-rotation options? Read{' '}
            <Link href="/alternatives/rotary-actuator-vs-motor" className="underline">Rotary Actuator vs Hydraulic Motor vs Slew Drive</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">ENGINEERING CHECK</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">Not sure which type is fitted?</h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Send the model code, a tag photo and the machine it is fitted to. We identify the type and
                confirm the replacement build — mounting, rotation, shaft and valve option — before you order.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{' '}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">hm@hmhydraulics.com</a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Rotary actuator type selection" />
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
            <Link href="/alternatives/rotary-actuator-vs-motor" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Actuator vs Motor vs Slew Drive</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Choose between a limited-angle actuator, a continuous hydraulic motor and a slew drive.</p>
            </Link>
            <Link href="/alternatives/how-to-identify" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">How to Identify Your Actuator</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Read the model tag, stamped numbers and code breakdown.</p>
            </Link>
            <Link href="/alternatives/rotary-actuator-troubleshooting" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Troubleshooting Guide</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Diagnose drift, weak torque, leaks and noise.</p>
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
            This guide describes general rotary-actuator operating principles for selection purposes.
            Actual performance, rotation angles and interfaces vary by manufacturer and model and are
            confirmed against the unit nameplate, the mounting drawing and the application. Helac® and all
            OEM names are trademarks of their respective owners; HM Hydraulics is an independent
            manufacturer and is not affiliated with or endorsed by them.
          </p>
        </div>
      </section>
    </>
  );
}
