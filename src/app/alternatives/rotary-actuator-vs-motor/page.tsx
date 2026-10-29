import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE, buildFullSearchIndex } from '@/components/alternatives/model-data';
import { AlternativesBrowser } from '@/components/alternatives/alternatives-browser';

const searchIndex = buildFullSearchIndex();

export const metadata: Metadata = {
  title: 'Rotary Actuator vs Hydraulic Motor vs Slew Drive: How to Choose',
  description:
    'Limited-angle actuator, continuous hydraulic motor or slew drive? Compare motion, torque, holding and mounting to choose the right component for swing duties.',
  alternates: { canonical: '/alternatives/rotary-actuator-vs-motor' },
};

const pagePath = '/alternatives/rotary-actuator-vs-motor';

const faqs = [
  {
    q: 'Can I replace a rotary actuator with a hydraulic motor?',
    a: 'Not directly for a fixed-angle swing. A motor turns continuously, so it needs external gearing, a brake or counterbalance and a stop or position control to repeat a fixed angle. A limited-angle actuator already provides the angle, holding torque and mounting interface in one compact unit. The motion the machine requires should drive the choice.',
  },
  {
    q: 'When is a slew drive the right choice?',
    a: 'A slewing drive suits slow, high-torque rotation of a platform or structure that also carries large axial, radial and tipping (overturning) moment loads — for example an upper-carriage swing, a crane or aerial platform rotation, or a heavy positioning table. It combines a slewing bearing with a worm-gear drive in one large-diameter assembly.',
  },
  {
    q: 'Does a rotary actuator hold position without a brake?',
    a: 'A limited-angle actuator is essentially a cylinder, so when oil is trapped and a load-holding valve is fitted it resists back-driving over a fixed angle. A hydraulic motor generally needs a separate brake or counterbalance arrangement to hold a load when stopped.',
  },
  {
    q: 'Which gives continuous 360° rotation?',
    a: 'A hydraulic motor rotates continuously, and most slewing drives can also rotate continuously. A compact rotary actuator is built for a fixed angle per stroke (commonly 90°, 180° or 360°), not unlimited turns. If the function must spin without a stop, an actuator is usually the wrong component.',
  },
  {
    q: 'How do I pick for a new machine design?',
    a: 'Start from the motion: a fixed swing favours an actuator; unlimited rotation favours a motor; a slow platform rotation under high tipping moment favours a slew drive. Then check required torque, envelope, mounting interface, holding need and duty cycle, and confirm the selection against the load calculation.',
  },
];

const optionRows = [
  {
    name: 'Rotary actuator',
    motion: 'Fixed angle per stroke (commonly 90° / 180° / 360°)',
    torque: 'High torque in a very compact, integrated housing',
    holding: 'Holds over a fixed angle when oil is trapped; counterbalance-valve builds resist an over-running load',
    mounting: 'Flange or foot mount, short rigid load path, drives the load directly',
    typical: 'Boom and jib swing, clamps and grabs, drill-feed positioning, hatch and chute rotation',
  },
  {
    name: 'Hydraulic motor',
    motion: 'Continuous, unlimited rotation',
    torque: 'Torque depends on displacement; higher torque usually needs a gearbox',
    holding: 'Needs an external brake or counterbalance/load-holding arrangement to hold when stopped',
    mounting: 'Shaft drive to a gearbox, wheel, winch or driven component',
    typical: 'Wheels and tracks, winches, fans, pumps, conveyors and continuous augers',
  },
  {
    name: 'Slew drive (slewing drive)',
    motion: 'Slow high-torque rotation, sector or continuous, through a worm-gear slewing bearing',
    torque: 'Very high output torque plus built-in resistance to axial, radial and tipping moments',
    holding: 'Self-locking tendency on many worm designs; large-diameter bearing carries the structure directly',
    mounting: 'Bolted between two large flanges / platforms',
    typical: 'Upper-carriage swing, crane and aerial-platform rotation, heavy tables, solar tracking',
  },
];

const decideRows = [
  ['Motion required', 'A fixed, repeatable swing', 'Unlimited rotation', 'Slow rotation of a whole platform or structure'],
  ['Dominant load', 'Torque in a tight envelope', 'Continuous torque / speed', 'High tipping (overturning) moment'],
  ['Holding at rest', 'Built-in with a valve option', 'Separate brake usually needed', 'Large slewing bearing, often self-locking worm'],
  ['Mounting', 'Compact flange / foot', 'Shaft to gearbox or wheel', 'Large-diameter flange-to-flange'],
  ['Typical answer', 'Rotary actuator', 'Hydraulic motor', 'Slew drive'],
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Helac Alternatives', item: `${SITE}/alternatives` },
    { '@type': 'ListItem', position: 3, name: 'Actuator vs Motor vs Slew Drive', item: `${SITE}${pagePath}` },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Rotary Actuator vs Hydraulic Motor vs Slew Drive: How to Choose',
  description:
    'Choose between a limited-angle rotary actuator, a continuous hydraulic motor and a slewing drive by motion, torque, holding, mounting and moment loads.',
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

export default function ActuatorVsMotorPage() {
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
            <span className="text-[#1B1E20]">Actuator vs Motor vs Slew Drive</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">SELECTION GUIDE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-[#1B1E20] leading-tight mb-6">
            Rotary Actuator vs Hydraulic Motor vs Slew Drive
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            All three turn hydraulic power into rotation, but they answer different questions. A compact rotary
            actuator swings a load through a fixed angle and holds it there. A hydraulic motor spins continuously.
            A slew drive slowly rotates a large platform while carrying heavy overturning moment loads. Choosing
            correctly starts with the motion the machine actually needs — not with a torque number alone.
          </p>
          <p className="text-sm text-[#62666C]">Last reviewed: October 2026</p>
        </div>
      </section>

      {/* Three options */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">The three options at a glance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {optionRows.map((o) => (
              <div key={o.name} className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white flex flex-col">
                <p className="eyebrow mb-3">{o.name}</p>
                <dl className="space-y-4 text-sm text-[#4A4E54] leading-relaxed">
                  <div><dt className="font-medium text-[#1B1E20]">Motion</dt><dd>{o.motion}</dd></div>
                  <div><dt className="font-medium text-[#1B1E20]">Torque</dt><dd>{o.torque}</dd></div>
                  <div><dt className="font-medium text-[#1B1E20]">Holding</dt><dd>{o.holding}</dd></div>
                  <div><dt className="font-medium text-[#1B1E20]">Mounting</dt><dd>{o.mounting}</dd></div>
                  <div><dt className="font-medium text-[#1B1E20]">Typical uses</dt><dd>{o.typical}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision table */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-6">Decision matrix</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[rgba(44,74,115,0.20)]">
                  <th className="py-3 pr-4 font-heading text-sm font-medium text-[#1B1E20]">Factor</th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">Rotary actuator</th>
                  <th className="py-3 px-4 font-heading text-sm font-medium text-[#1B1E20]">Hydraulic motor</th>
                  <th className="py-3 pl-4 font-heading text-sm font-medium text-[#1B1E20]">Slew drive</th>
                </tr>
              </thead>
              <tbody className="text-[#4A4E54]">
                {decideRows.slice(0, 4).map((r) => (
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

      {/* Why not swap */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-5">Why an actuator is not simply a slow motor</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-[#4A4E54] leading-relaxed mb-4">
                A compact rotary actuator is, mechanically, a hydraulic cylinder arranged to produce rotation:
                oil moves an internal element and the shaft turns through a defined angle until it reaches its
                stop. Trapping the oil locks that position, and an integral counterbalance valve can hold an
                over-running load. The angle, the holding force and the mounting faces are all built into one
                compact body.
              </p>
              <p className="text-[#4A4E54] leading-relaxed">
                To do the same job with a continuous motor you would normally add a gearbox for torque, a brake
                or valve for holding, and a stop or position control to repeat the same angle — then engineer a
                mounting frame to tie it all together. That is the right system for continuous duties, but it is
                a roundabout way to swing a boom through 180°.
              </p>
            </div>
            <div className="p-6 bg-[#FAFAF7] border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-3">Quick rule of thumb</p>
              <ul className="space-y-3 text-sm text-[#4A4E54] leading-relaxed">
                <li>• Does the part stop at a fixed angle and hold? → <strong className="text-[#1B1E20]">rotary actuator</strong></li>
                <li>• Does it spin without stopping? → <strong className="text-[#1B1E20]">hydraulic motor</strong></li>
                <li>• Does a whole platform rotate slowly under heavy tipping load? → <strong className="text-[#1B1E20]">slew drive</strong></li>
              </ul>
              <p className="mt-5 text-xs text-[#62666C] leading-relaxed">
                HM Hydraulics supplies compact rotary actuators today. Our worm-gear slew drive range is in
                preparation — see the{' '}
                <Link href="/products/slew-drives" className="text-[#2C4A73] underline">slew drives page</Link>{' '}
                and tell us your requirement; we are taking sourcing enquiries ahead of the launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="rfq" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">ENGINEERING CHECK</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">Tell us the motion and the load</h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Replacing an existing unit or designing a new function? Send the model code or describe the
                required angle, torque, mounting and holding duty. We help confirm the right component and match
                the replacement build before you order.
              </p>
              <p className="text-sm text-[#62666C]">
                Or email directly:{' '}
                <a href="mailto:hm@hmhydraulics.com" className="text-[#2C4A73] no-underline hover:underline">hm@hmhydraulics.com</a>
              </p>
            </div>
            <div className="p-6 md:p-8 bg-white border border-[rgba(44,74,115,0.10)] rounded-md">
              <RfqForm context="Actuator vs motor selection" />
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
            <Link href="/alternatives/rotary-actuator-types" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">Rotary Actuator Types</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Helical, rack-and-pinion and vane designs compared.</p>
            </Link>
            <Link href="/alternatives/how-to-identify" className="block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">How to Identify Your Actuator</h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">Read the model tag and code breakdown to confirm the build.</p>
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
            This is a general selection guide based on typical component characteristics. Final component choice
            and sizing depend on the application load calculation, required safety factors, mounting interface
            and the machine service manual. Helac® and all OEM names are trademarks of their respective owners;
            HM Hydraulics is an independent manufacturer and is not affiliated with or endorsed by them.
          </p>
        </div>
      </section>
    </>
  );
}
