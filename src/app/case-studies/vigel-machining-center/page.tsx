import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';

export const metadata: Metadata = {
  title: 'Rotary Actuator In-Service Case: Tilting Worktable on a Horizontal Machining Centre',
  description:
    'A field case of a helical rotary actuator driving the tilting worktable of a Vigel-class horizontal machining centre: 182° index, 210 bar, 2,500 Nm, installed 2021 and in continuous production service with no reported actuator failure. Independent alternative supply verified against the nameplate and mounting drawing.',
  alternates: { canonical: '/case-studies/vigel-machining-center' },
};

const SPECS = [
  { k: 'Application', v: 'Tilting (trunnion) worktable drive on a horizontal machining centre' },
  { k: 'Actuator type', v: 'Helical rotary actuator' },
  { k: 'Index angle', v: '182° \u00B11°' },
  { k: 'Max. working pressure', v: '210 bar' },
  { k: 'Nominal torque', v: '2,500 Nm' },
  { k: 'Platform reference', v: 'DA-H 100 envelope / D.SWZ S4117 class' },
  { k: 'Installed', v: 'October 2021' },
  { k: 'Service status', v: 'In continuous production; no reported actuator failure to date' },
];

const STEPS = [
  {
    t: '1. Nameplate & drawing review',
    d: 'We confirm the actuator model, index angle, pressure rating, bolt pattern and port/valve arrangement against the unit nameplate and the machine mounting drawing before quoting.',
  },
  {
    t: '2. Engineering match',
    d: 'We select or adapt a build to the same envelope and interface, and confirm compatibility with the existing valve assembly and position sensing on the machine.',
  },
  {
    t: '3. Build & pressure test',
    d: 'Every actuator is pressure-tested before shipment; piston and housing materials are specified for the cyclic torsional and hydraulic loads of the duty cycle.',
  },
  {
    t: '4. Fit verification & supply',
    d: 'Fit is verified on the actual machine. Once accepted, we support service units, repeat builds and batch supply for the platform.',
  },
];

const FAQS = [
  {
    q: 'Is this an original HKS or Vigel part?',
    a: 'No. HM Hydraulics supplies an independently engineered alternative unit. HKS, Vigel, Rexroth and any model/order numbers referenced on this page are the property of their respective owners and are used only for identification and compatibility reference. We do not represent the unit as an original part or imply affiliation with, or endorsement by, those companies.',
  },
  {
    q: 'Does it fit a DA-H 100 / D.SWZ S4117 directly?',
    a: 'In the documented installation the unit was built to the same external envelope and mounting-bolt pattern and used the existing valve assembly and position sensors. Because machines differ by build year and configuration, we verify the interface against your specific unit nameplate and mounting drawing before confirming any replacement.',
  },
  {
    q: 'What operating data supports the case?',
    a: 'The actuator was installed in October 2021 on a Vigel-class horizontal machining centre in China for the tilting-worktable axis at 210 bar and a 182°\u00B11° index, and has remained in continuous production service with no reported actuator failure. The figures describe this specific installation and are not a generalised warranty or service-life guarantee.',
  },
  {
    q: 'How do I get the specification sheet and mounting drawing?',
    a: 'Send the model tag, part number and a photo of your mounting face, shaft and machine nameplate using the form below or email bai@hmhydraulics.com. We provide the full specification, engineering drawing and quality documentation for your engineering team to review.',
  },
];

export default function VigelCasePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="eyebrow text-[#2C4A73] mb-4">FIELD CASE &middot; CNC MACHINE TOOLS</p>
            <h1 className="font-heading text-[#1B1E20] text-3xl md:text-[44px] font-medium leading-tight mb-5">
              Rotary actuator on a horizontal machining centre tilting table
            </h1>
            <p className="text-[#4A4E54] text-lg leading-relaxed mb-4">
              An independently engineered helical rotary actuator, installed in October 2021 on a
              Vigel-class machining centre in China, indexing the tilting worktable through{' '}
              <strong>182°&plusmn;1° at 210&nbsp;bar</strong> &mdash; in continuous production service
              with <strong>no reported actuator failure to date</strong>.
            </p>
            <p className="text-sm text-[#62666C] leading-relaxed">
              Documented as an in-service validation record. Identification references to the
              original equipment are used for compatibility only; HM Hydraulics is an independent
              supplier.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#get-the-spec"
                className="inline-flex items-center rounded-md bg-[#2C4A73] px-5 py-3 text-sm font-medium text-white no-underline hover:bg-[#24405f]"
              >
                Request spec sheet &amp; drawing
              </Link>
              <Link
                href="/alternatives"
                className="inline-flex items-center rounded-md border border-[#2C4A73]/30 px-5 py-3 text-sm font-medium text-[#2C4A73] no-underline hover:bg-[#2C4A73]/5"
              >
                Cross-reference search
              </Link>
            </div>
          </div>
          <figure className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/vigel-installed-actuator.webp"
              alt="HM Hydraulics helical rotary actuator installed on the tilting worktable axis of a horizontal machining centre"
              width={937}
              height={1149}
              loading="eager"
              fetchPriority="high"
              className="w-full h-auto rounded-lg border border-[rgba(44,74,115,0.12)] bg-white object-contain"
            />
            <figcaption className="text-xs text-[#62666C] mt-2">
              Actuator in service on the tilting-worktable axis (installed 2021-10).
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Application specs */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-3">THE APPLICATION</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            A demanding indexing duty on a production machine
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-3xl mb-10">
            Horizontal machining centres use a compact helical rotary actuator to tilt and index the
            worktable. The duty combines high hydraulic pressure, repeated torsional reversals and a
            tight angular tolerance &mdash; on a machine that is expected to run for years without
            unplanned stops.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(44,74,115,0.10)] rounded-lg overflow-hidden border border-[rgba(44,74,115,0.10)]">
            {SPECS.map((s) => (
              <div key={s.k} className="bg-white p-5">
                <p className="text-xs text-[#62666C] uppercase tracking-wide mb-1.5">{s.k}</p>
                <p className="text-sm text-[#1B1E20] font-medium leading-snug">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background / failure mode */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="eyebrow text-[#2C4A73] mb-3">FIELD BACKGROUND</p>
            <h2 className="font-heading text-[#1B1E20] text-2xl md:text-3xl font-medium mb-4">
              Repeated piston cracking on earlier units
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-4">
              A Chinese manufacturer operating machining centres of this platform (originally
              commissioned in 2016) reported two rotary-actuator failures within a single month
              during normal production. In both units the internal piston body had cracked.
            </p>
            <p className="text-[#4A4E54] leading-relaxed mb-4">
              The reported failure mode was fatigue of the monolithic bronze-alloy piston under
              repeated torsional and hydraulic loading at operating speed. End-stop damping was
              checked and found to be within its normal range, and no external mechanical overload
              was identified; the machine had run without incident for several years beforehand.
            </p>
            <p className="text-[#4A4E54] leading-relaxed">
              We describe the observed failure mode factually and make no claim about the general
              quality or design of any original-equipment manufacturer&apos;s product. Failure causes
              are application-specific and are confirmed per unit.
            </p>
          </div>
          <figure className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/vigel-hydraulic-valve-connections.webp"
              alt="Hydraulic valve block and pipework connections on the installed rotary actuator"
              width={575}
              height={387}
              loading="lazy"
              className="w-full h-auto rounded-lg border border-[rgba(44,74,115,0.12)] bg-white object-cover"
            />
            <figcaption className="text-xs text-[#62666C] mt-2">
              Existing hydraulic valve assembly and connections retained on the machine.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* HM solution */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-3">THE HM HYDRAULICS BUILD</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-10">
            Engineered to the same interface, built for the load cycle
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                t: 'Piston material upgrade',
                d: 'The piston is specified in an upgraded material and heat-treatment to remove the bronze-alloy cracking mode observed in the failed units under cyclic torsional and hydraulic loading.',
              },
              {
                t: 'Matched envelope and bolt pattern',
                d: 'Built to the same external envelope and mounting-bolt pattern for the platform. Fit is confirmed against the individual machine drawing rather than assumed from a catalogue match.',
              },
              {
                t: 'Valve and sensor compatibility',
                d: 'Designed to work with the existing hydraulic valve assembly and position sensors already on the machine, avoiding changes to the control and hydraulic systems.',
              },
              {
                t: 'Rated to the duty',
                d: 'Rated to 210 bar working pressure for the 182°\u00B11° tilting index, with every actuator pressure-tested before shipment.',
              },
            ].map((c) => (
              <div key={c.t} className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
                <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">{c.t}</h3>
                <p className="text-[#4A4E54] text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-[#1B1E20]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 text-center">
          <p className="eyebrow text-[#D5A85C] mb-4">RESULT</p>
          <p className="font-heading text-white text-3xl md:text-5xl font-medium leading-tight max-w-3xl mx-auto mb-6">
            Installed October 2021 &mdash; continuous production service, no reported actuator failure
          </p>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            The platform has since been supported with repeat and batch builds. The record reflects
            this specific installation and duty cycle; results vary with application and maintenance.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-3">HOW WE QUALIFY A REPLACEMENT</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-10">
            Verified per unit, not assumed from a code
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.t} className="border-l-2 border-[#D98A1D]/60 pl-5">
                <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">{s.t}</h3>
                <p className="text-[#4A4E54] text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-[#1B1E20] text-2xl md:text-3xl font-medium mb-8">
            Questions
          </h2>
          <div className="divide-y divide-[rgba(44,74,115,0.10)] border-y border-[rgba(44,74,115,0.10)]">
            {FAQS.map((f) => (
              <details key={f.q} className="py-5 group">
                <summary className="cursor-pointer list-none flex justify-between items-start gap-4 font-medium text-[#1B1E20]">
                  {f.q}
                  <span className="text-[#2C4A73] group-open:rotate-45 transition-transform text-xl leading-none shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-[#4A4E54] text-sm leading-relaxed mt-3 pr-8">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Lead gate CTA + form */}
      <section id="get-the-spec" className="bg-[#FBF4E6] border-b border-[#D5A85C]/40">
        <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="eyebrow text-[#7a5310] mb-3">ENGINEERING PACK ON REQUEST</p>
            <h2 className="font-heading text-[#1B1E20] text-2xl md:text-3xl font-medium mb-4">
              Get the specification sheet and mounting drawing
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-4">
              Full dimensional drawing, torque/pressure curves, port and valve details and quality
              documentation are provided for your engineering team to review &mdash; on request, not
              posted publicly.
            </p>
            <p className="text-[#4A4E54] leading-relaxed mb-4">
              Send the model tag, part number and photos of the mounting face, shaft and machine
              nameplate. We confirm the interface against your exact unit and return the matching
              build and documents.
            </p>
            <p className="text-sm text-[#62666C]">
              Or email Kevin Bai directly at{' '}
              <a className="text-[#2C4A73] underline" href="mailto:bai@hmhydraulics.com">
                bai@hmhydraulics.com
              </a>
              .
            </p>
          </div>
          <div className="bg-white rounded-lg border border-[rgba(44,74,115,0.12)] p-6">
            <RfqForm context="Vigel-class machining centre tilting-table rotary actuator case study" />
          </div>
        </div>
      </section>
    </main>
  );
}
