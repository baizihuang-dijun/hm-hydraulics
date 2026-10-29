import type { Metadata } from 'next';
import Link from 'next/link';
import { RfqForm } from '@/components/alternatives/rfq-form';
import { SITE } from '@/components/alternatives/model-data';

export const metadata: Metadata = {
  title: 'Two-Axis Hydraulic Rotary Actuators: Integrated vs. Combined Designs',
  description:
    'Explore two-axis hydraulic rotary actuator configurations for OEM machinery, including actuator sizing, mounting interfaces, bolt access and engineering requirements.',
  alternates: { canonical: '/solutions/two-axis-hydraulic-rotary-actuators' },
};

const pagePath = '/solutions/two-axis-hydraulic-rotary-actuators';

const faqs = [
  {
    q: 'Can two different hydraulic rotary actuators be used in a two-axis assembly?',
    a: 'Sizes can differ where each axis carries a different torque, rotation angle and envelope, which is common. That usually means an engineered mounting interface, and a check of hydraulic flow, pressure, control functions and hose routing against each actuator\u2019s own requirement. It is a per-project engineering review rather than a catalogue combination: the allowable external loads of each unit, the structural support between them and the available space decide whether the pairing is practical.',
  },
  {
    q: 'Is a combined two-axis arrangement interchangeable with an integrated actuator?',
    a: 'Interchangeability cannot be assumed. A purpose-designed integrated assembly and a combination of two single-axis actuators differ in load paths, mounting interfaces, stiffness and envelope, even when the torque and angle figures look comparable. Any substitution has to be verified axis by axis against the machine, including mounting, external loads and assembly access.',
  },
  {
    q: 'What drawings and operating data are needed before requesting a quotation?',
    a: 'Start with the required torque, rotation angle, speed and duty cycle for each axis, together with the available installation space, mounting interfaces and hydraulic supply conditions. A machine-joint sketch or drawing is particularly helpful for evaluating possible configurations and assembly access. Additional details may be requested during the engineering review.',
  },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE}/solutions` },
    { '@type': 'ListItem', position: 3, name: 'Two-Axis Rotary Actuators', item: `${SITE}${pagePath}` },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Two-Axis Hydraulic Rotary Actuators: Integrated vs. Combined Designs',
  description:
    'Two-axis hydraulic rotary actuator configurations for OEM machinery: actuator sizing, mounting interfaces, external loads, bolt access and the engineering data needed for an assessment.',
  author: { '@type': 'Organization', name: 'HM Hydraulics Engineering Team' },
  publisher: {
    '@type': 'Organization',
    name: 'HM Hydraulics — Qingdao Hydraulic Machinery Co., Ltd.',
    url: SITE,
  },
  datePublished: '2026-10-28',
  dateModified: '2026-10-28',
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

export default function TwoAxisPage() {
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
            <Link href="/" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/solutions" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Solutions
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Two-Axis Rotary Actuators</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">APPLICATION NOTE</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.6rem] font-medium text-[#1B1E20] leading-tight mb-6 max-w-4xl">
            Two-Axis Hydraulic Rotary Actuator Solutions for OEM Applications
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl mb-4">
            Some machines need rotary motion in two directions at the same point in the kinematic
            chain — a swing plus a tilt, a boom rotation plus a jib rotation, a drilling arm that both
            indexes and tilts. The requirement is clear; what is not clear is whether to use one
            purpose-designed integrated assembly or a combination of two single-axis actuators, and how
            either choice survives the mounting and service-access constraints of a real machine.
          </p>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-3xl">
            Two-axis selection is not only about torque and rotation angle. Mounting interfaces,
            external loads and assembly access can determine whether a proposed configuration is
            practical at all. This note walks through the five questions OEM engineers actually ask.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-14 md:py-16">
          {/* 1 */}
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-4">
            1. What is a two-axis hydraulic rotary actuator?
          </h2>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            A two-axis arrangement produces <strong className="text-[#1B1E20]">two independent
            rotary outputs</strong>. Typically one axis carries the primary motion — swing, boom
            rotation or arm indexing — and the second carries a secondary motion such as tilt, wrist
            rotation or jib movement.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            The important point for specification is that the two axes are <em>not</em> one larger
            actuator. Each has its own required torque, rotation angle, speed and load path, and each
            is subject to a different moment. A unit that is adequate on the primary axis can still be
            wrong on the secondary one, and the reverse. That is why two-axis selection starts with two
            separate requirement sets rather than a single torque figure.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-8">
            Two-axis rotary motion can be achieved through a purpose-designed{' '}
            <strong className="text-[#1B1E20]">integrated assembly</strong> or a{' '}
            <strong className="text-[#1B1E20]">combination of separate single-axis actuators</strong>.
            The mechanical architecture varies by application and manufacturer, so the useful question
            for a machine project is not which family is better in general, but which one the mounting
            envelope, load paths and service access will actually allow.
          </p>

          {/* Comparison table */}
          <div className="mb-10 rounded-lg border border-[rgba(44,74,115,0.14)] bg-[#FAFAF7] px-5 pt-5 pb-4">
            <p className="text-sm text-[#62666C] leading-relaxed mb-4">
              Neither family is better in general. What differs is what each one asks of the machine.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <caption className="sr-only">
                  Comparison of an integrated two-axis assembly and two combined single-axis actuators
                </caption>
                <thead>
                  <tr className="border-b border-[rgba(44,74,115,0.20)]">
                    <th scope="col" className="py-2.5 pr-4 font-heading text-xs font-medium text-[#1B1E20] w-[22%]">
                      Factor
                    </th>
                    <th scope="col" className="py-2.5 px-3 font-heading text-xs font-medium text-[#1B1E20]">
                      Integrated assembly
                    </th>
                    <th scope="col" className="py-2.5 pl-3 font-heading text-xs font-medium text-[#1B1E20]">
                      Two combined actuators
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#4A4E54]">
                  <tr className="border-b border-[rgba(44,74,115,0.10)]">
                    <th scope="row" className="py-2.5 pr-4 text-xs font-medium text-[#1B1E20] text-left">
                      Load path
                    </th>
                    <td className="py-2.5 px-3 text-xs leading-relaxed">
                      Both axes act inside one housing, so the second-axis moment closes in the body.
                    </td>
                    <td className="py-2.5 pl-3 text-xs leading-relaxed">
                      Unit 2 sits at an offset from axis 1, so its mass and working load reach axis 1 as
                      an overhung moment.
                    </td>
                  </tr>
                  <tr className="border-b border-[rgba(44,74,115,0.10)]">
                    <th scope="row" className="py-2.5 pr-4 text-xs font-medium text-[#1B1E20] text-left">
                      Allowable external loads
                    </th>
                    <td className="py-2.5 px-3 text-xs leading-relaxed">
                      Set by the design of the assembly; radial, axial and tilting-moment limits have to
                      be published and checked.
                    </td>
                    <td className="py-2.5 pl-3 text-xs leading-relaxed">
                      Checked on unit 1 against its own published limits. This is often the item that
                      decides feasibility.
                    </td>
                  </tr>
                  <tr className="border-b border-[rgba(44,74,115,0.10)]">
                    <th scope="row" className="py-2.5 pr-4 text-xs font-medium text-[#1B1E20] text-left">
                      Interfaces added
                    </th>
                    <td className="py-2.5 px-3 text-xs leading-relaxed">
                      None between the axes — one mounting interface, one set of ports.
                    </td>
                    <td className="py-2.5 pl-3 text-xs leading-relaxed">
                      Connecting structure, a second bolt pattern, a second set of ports and hoses, and
                      an alignment to hold over life.
                    </td>
                  </tr>
                  <tr className="border-b border-[rgba(44,74,115,0.10)]">
                    <th scope="row" className="py-2.5 pr-4 text-xs font-medium text-[#1B1E20] text-left">
                      Envelope and mass
                    </th>
                    <td className="py-2.5 px-3 text-xs leading-relaxed">
                      Usually compact at the joint, but the geometry is fixed once chosen.
                    </td>
                    <td className="py-2.5 pl-3 text-xs leading-relaxed">
                      Larger at the joint, and the mass of unit 2 is carried on unit 1.
                    </td>
                  </tr>
                  <tr className="border-b border-[rgba(44,74,115,0.10)]">
                    <th scope="row" className="py-2.5 pr-4 text-xs font-medium text-[#1B1E20] text-left">
                      Sizing per axis
                    </th>
                    <td className="py-2.5 px-3 text-xs leading-relaxed">
                      Both axes are defined by the integrated design.
                    </td>
                    <td className="py-2.5 pl-3 text-xs leading-relaxed">
                      Each axis is sized on its own duty — useful when the two torque requirements differ
                      widely.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2.5 pr-4 text-xs font-medium text-[#1B1E20] text-left">
                      Service access
                    </th>
                    <td className="py-2.5 px-3 text-xs leading-relaxed">
                      Bearings and seals are shared in one body; access is decided at design stage.
                    </td>
                    <td className="py-2.5 pl-3 text-xs leading-relaxed">
                      Either unit can be removed on its own, provided the connecting structure and the
                      assembly sequence allow it.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2 */}
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-4">
            2. Can two single-axis rotary actuators be combined?
          </h2>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            Combining two single-axis actuators is technically possible in some applications, but
            feasibility depends on the actuator&rsquo;s allowable external loads, mounting interfaces,
            structural support and available space.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            Where two actuators are used, they are arranged around{' '}
            <strong className="text-[#1B1E20]">two distinct rotational axes</strong> and connected
            through an engineered mounting structure. The axes may be orthogonal, or set at whatever
            angle the machine kinematics require; the layout is defined by the application rather than
            by a standard assembly, and it has to be drawn for the specific machine.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            Such a layout changes the load path in ways that are easy to underestimate. The second
            actuator and its attached components introduce additional forces and moments into the
            assembly. How these loads are distributed between the first actuator, its bearings, the
            connecting structure and any external supports depends on the mechanical design. Whether an
            actuator may carry them directly depends on its published allowable external loads: radial
            and axial load limits, tilting moment and mounting stiffness. Some rotary actuators are not
            intended to absorb a cantilevered second unit.{' '}
            <strong className="text-[#1B1E20]">Where necessary, external bearings or structural
            supports may be required</strong> to carry loads that should not be transmitted directly
            through the actuator.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-8">
            A combined arrangement also adds interfaces: the connecting structure, an additional bolt
            pattern, and a second set of ports and hoses. Each interface adds tolerance stack-up and a
            place where alignment can drift. That is the cost of flexibility, and it is why combined
            solutions are assessed against the specific machine rather than selected from a table.
          </p>

          {/* 3 */}
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-4">
            3. Can different actuator sizes be used for each axis?
          </h2>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            In principle yes, and it is often the sensible answer, because the two axes rarely carry
            equal torque. A large swing axis with a small tilt axis is a normal requirement. Sizing each
            axis independently also keeps the envelope and mass down compared with over-sizing both to
            the heavier duty.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-8">
            The trade-off is that different sizes may require an engineered mounting interface and
            careful coordination of hydraulic flow, pressure, control functions and hose routing. The
            two axes do not have to share a control concept — standard valves and conventional control
            elements can often be used — but flow and pressure have to be checked against each
            actuator&rsquo;s own requirement. So mixed sizing is an engineering review against per-axis
            torque, angle and space requirements, not a catalogue selection, and the interface has to be
            drawn before the concept can be costed.
          </p>

          {/* 4 */}
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-4">
            4. How are the actuators mounted, and how is bolt access maintained?
          </h2>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            Mounting and bolt access can be decisive factors in whether a two-axis concept is
            practical. Even when torque and rotation requirements can be met, the arrangement must
            still allow proper assembly, fastening and maintenance. The items that repeatedly cause
            problems:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#4A4E54] mb-4">
            <li>
              <strong className="text-[#1B1E20]">Fastener entry direction and tool swing radius</strong>{' '}
              — there must be room for the socket and the wrench handle to rotate, not just for the bolt
              head to sit flush.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Assembly-sequence access</strong> — a bolt that is
              reachable on a bare housing can become unreachable once the arm, hoses and guard are on.
              Access has to be checked in the order the machine is actually assembled.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Access for the specified tightening method</strong> —
              the assembly process must provide sufficient access for the specified tightening method at
              the stage when each fastener is installed, which is not always the finished state.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Blind holes and thread engagement</strong> — shallow
              bosses and blind threads limit usable engagement and increase the risk of pull-out under
              reversing load.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Clearance through the full range of motion</strong> —
              hose runs, brackets and the second axis itself move. Clearance should be checked
              throughout the full range of motion, including intermediate positions and any simultaneous
              movement of both axes.
            </li>
            <li>
              <strong className="text-[#1B1E20]">Service access</strong> — replacing a seal or a hose
              should not require dismantling the whole arm.
            </li>
          </ul>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            A typical example, and one that is easy to miss when each actuator is reviewed separately:
            an actuator may have accessible shaft mounting bolts when installed on its own, but those
            bolts can become inaccessible once a second actuator and its connecting structure are
            assembled. This is not inevitable in every two-axis layout — it depends on the geometry and
            the assembly order — but it is the kind of constraint that decides the concept.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-8">
            The working rule is to design for the wrench, not just for the bolt. Mounting and bolt
            accessibility must be verified by engineering against the real envelope — they cannot be
            confirmed from a general arrangement drawing alone, and no assembly sequence should be
            treated as proven until it has been checked that way.
          </p>

          {/* 5 */}
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-4">
            5. What information is needed to evaluate a two-axis solution?
          </h2>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            An assessment can only be as good as the requirement set behind it. For each axis, the
            minimum input is:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#4A4E54] mb-4">
            <li>required torque — continuous and peak, with the direction of the load moment;</li>
            <li>rotation angle, including any special or limited-swing requirement;</li>
            <li>speed and duty cycle, since these drive both sizing and thermal behaviour;</li>
            <li>space envelope and mass budget at the mounting point.</li>
          </ul>
          <p className="text-[#4A4E54] leading-relaxed mb-4">For the assembly as a whole:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#4A4E54] mb-8">
            <li>mounting interface — bolt pattern, pilot register, shaft or spline type;</li>
            <li>hydraulic supply pressure and flow, port type and position;</li>
            <li>control arrangement, sequencing between the two axes, and position feedback;</li>
            <li>environment — dust, water, temperature and duty severity for mining or outdoor work;</li>
            <li>
              if replacing an existing unit, a nameplate photo plus mounting-face, shaft and port
              photos.
            </li>
          </ul>

          {/* How HM works */}
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-4">
            How HM can support a two-axis evaluation
          </h2>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            HM Hydraulics supplies and sources rotary actuators and supports the early stage of a
            two-axis requirement. Within that scope we can:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#4A4E54] mb-4">
            <li>review the initial requirements with you, axis by axis — torque, angle, envelope and mounting interface;</li>
            <li>
              identify potential actuator configurations, whether a purpose-designed integrated assembly
              or a combination of single-axis units, that suit the machine layout;
            </li>
            <li>
              flag mounting, external-load and bolt-access risks early, before a concept is costed;
            </li>
            <li>
              coordinate further feasibility assessment with our engineering and manufacturing partners
              where a project moves beyond the initial stage.
            </li>
          </ul>
          <p className="text-[#4A4E54] leading-relaxed mb-4">
            What we do not do is treat a two-axis requirement as a catalogue item. There is no
            pre-verified off-the-shelf answer to be quoted from a code: mounting, bolt accessibility and
            the interface between the two axes have to be verified for the machine in question.
          </p>
          <p className="text-[#4A4E54] leading-relaxed mb-8">
            The three stages are distinct. An initial technical discussion and requirement review can
            start now. A feasibility assessment beyond that is carried out with our engineering and
            manufacturing partners and is confirmed per project. A complete design, validation and
            delivery programme for a new two-axis assembly is not a standard offering; where a project
            needs it, the scope is defined and agreed separately.
          </p>

          <div className="rounded-lg border border-[rgba(44,74,115,0.14)] bg-[#FAFAF7] p-6 mb-4">
            <p className="font-label text-xs uppercase tracking-wider text-[#62666C] mb-3">
              Related reading
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/solutions"
                className="inline-flex items-center rounded border border-[rgba(44,74,115,0.18)] bg-white px-3 py-1.5 text-xs font-medium text-[#2C4A73] no-underline hover:border-[#2C4A73] hover:bg-[#F0F4FA] transition-colors"
              >
                Engineering &amp; sourcing solutions
              </Link>
              <Link
                href="/alternatives/mining-drill-rigs"
                className="inline-flex items-center rounded border border-[rgba(44,74,115,0.18)] bg-white px-3 py-1.5 text-xs font-medium text-[#2C4A73] no-underline hover:border-[#2C4A73] hover:bg-[#F0F4FA] transition-colors"
              >
                Rotary actuators on mining drill rigs
              </Link>
              <Link
                href="/alternatives/how-to-identify"
                className="inline-flex items-center rounded border border-[rgba(44,74,115,0.18)] bg-white px-3 py-1.5 text-xs font-medium text-[#2C4A73] no-underline hover:border-[#2C4A73] hover:bg-[#F0F4FA] transition-colors"
              >
                How to identify a rotary actuator
              </Link>
              <Link
                href="/alternatives/cross-reference-guide"
                className="inline-flex items-center rounded border border-[rgba(44,74,115,0.18)] bg-white px-3 py-1.5 text-xs font-medium text-[#2C4A73] no-underline hover:border-[#2C4A73] hover:bg-[#F0F4FA] transition-colors"
              >
                Cross-reference guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technical inquiry */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <p className="eyebrow text-[#2C4A73] mb-3">TECHNICAL INQUIRY</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Discuss Your Two-Axis Actuator Application
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-4">
                Send the per-axis torque, angle, envelope and mounting interface, plus a sketch or
                photos of the machine joint. We review the requirements against the possible
                configurations, tell you what can be assessed now, and what would need a deeper
                feasibility review with our engineering and manufacturing partners.
              </p>
              <p className="text-[#4A4E54] leading-relaxed mb-4">
                Torque, rotation angle and available installation space for each axis are the most
                useful starting points. If you have a joint drawing or a sketch, mention it in the
                message and we will reply with a direct address for larger files.
              </p>
              <p className="text-sm text-[#62666C] leading-relaxed">
                This is an early-stage engineering review, not an off-the-shelf quotation. Mounting,
                external loads and bolt accessibility are checked during review, not assumed from a
                drawing.
              </p>
            </div>
            <div className="bg-[#F7F8F5] border border-[rgba(44,74,115,0.12)] rounded p-5">
              <RfqForm
                context="Two-axis rotary actuator engineering review"
                submitLabel="Discuss your application"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14 md:py-16">
          <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl">
            {faqs.map((f) => (
              <div key={f.q}>
                <p className="text-sm font-medium text-[#1B1E20] mb-1.5">{f.q}</p>
                <p className="text-sm text-[#4A4E54] leading-relaxed m-0">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#8A8E94] leading-relaxed max-w-3xl mt-12 mb-0">
            Third-party product names are used for identification and technical reference only. HM
            Hydraulics is an independent supplier and is not affiliated with or endorsed by the
            respective trademark owners. Two-axis solutions are evaluated per project; no configuration
            is represented as a verified interchangeable replacement for any specific product.
          </p>
        </div>
      </section>
    </>
  );
}
