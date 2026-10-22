import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quality & Technical Validation',
  description:
    'Pressure testing, dimensional inspection and batch traceability on every rotary actuator before shipment. Request test records with your quote.',
  alternates: { canonical: '/quality' },
};

const milestones = [
  {
    phase: 'Phase 1',
    title: 'Production Planning & Quality Management',
    description:
      'Manufactured through ISO 9001-certified partner facilities. Each sales order gets a unique Production Order ID linking the controlled drawing revision, BOM, routing and inspection records.',
  },
  {
    phase: 'Phase 2',
    title: 'Pre-Shipment Testing',
    description:
      'Every rotary actuator follows a controlled routing — turning, grinding, gear cutting and assembly — with self, peer and QC inspection at each step. Nonconformances are logged with disposition and corrective action before they can flow downstream.',
  },
  {
    phase: 'Phase 3',
    title: 'Independent Fatigue Validation',
    description:
      'Documented 1,000,000-cycle full-load endurance test at 150 bar on a helical rotary actuator, run independently by an overseas customer in 2017. PASSED with no structural damage and zero actuator failures.',
  },
  {
    phase: 'Phase 4',
    title: 'Field Validation',
    description:
      'Field performance review helps confirm that products meet expected operational requirements under real application conditions.',
  },
];

const testItems = [
  { name: 'Start-up Pressure', description: 'Minimum pressure to begin rotation under no-load conditions.' },
  { name: 'Rotation Angle', description: 'Actual angular displacement vs. specified requirement.' },
  { name: 'Internal Leakage', description: 'Oil bypass across actuator chambers under rated pressure.' },
  { name: 'External Leakage', description: 'No visible leakage at seals, ports, or welded joints.' },
  { name: 'Low-Speed Crawling', description: 'Smooth motion during slow, controlled rotation.' },
  { name: 'Return-to-Zero Confirmation', description: 'Accurate return to neutral position after actuation.' },
];

export default function QualityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[620px] overflow-hidden">
        <img
          src="/images/quality/Q1.png"
          alt="Quality inspection of a precision hydraulic component"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F172A]/75" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20 w-full">
            <p className="eyebrow text-white/70 mb-4">QUALITY & TECHNICAL VALIDATION</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 max-w-3xl">
              Built to Perform. Proven to Last.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
              From production planning to field validation. Every unit follows a controlled quality path before it reaches your application.
            </p>
          </div>
        </div>
      </section>

      {/* 1M Cycle Validation */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="eyebrow text-[#2C4A73] mb-4">FATIGUE VALIDATION</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                1,000,000-Cycle Rotary Actuator Endurance Test
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Our helical rotary actuator design completed a documented 1,000,000-cycle full-load endurance test at 150 bar, run independently by an overseas customer from May to July 2017 on a large HMR-class unit built against an HKS-level benchmark. The customer&apos;s own test-rig mechanical load arm failed from metal fatigue at 600,000 cycles — the actuator completed all 1,000,000. Full teardown showed no structural damage and zero actuator failures, with only marginal end-cap seepage near the end of the run. The full test report is available on request.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
                  <p className="font-heading text-2xl font-medium text-[#2C4A73]">1M+</p>
                  <p className="text-xs text-[#4A4E54] mt-1">Cycles</p>
                </div>
                <div className="p-4 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
                  <p className="font-heading text-2xl font-medium text-[#2C4A73]">150</p>
                  <p className="text-xs text-[#4A4E54] mt-1">bar</p>
                </div>
                <div className="p-4 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
                  <p className="font-heading text-2xl font-medium text-[#2C4A73]">Full</p>
                  <p className="text-xs text-[#4A4E54] mt-1">Load</p>
                </div>
                <div className="p-4 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
                  <p className="font-heading text-2xl font-medium text-[#2C4A73]">0</p>
                  <p className="text-xs text-[#4A4E54] mt-1">Failures</p>
                </div>
              </div>
              <p className="text-xs text-[#62666C]">
                Tested on a large HMR-class helical rotary actuator by an independent overseas customer in 2017. Report available on request.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)]">
              <img
                src="/images/quality/Q2.jpg"
                alt="Large rotary actuator mounted on a hydraulic test bench"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Journey */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">QUALITY JOURNEY</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            From production planning to field validation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone) => (
              <div
                key={milestone.phase}
                className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white"
              >
                <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider mb-3">
                  {milestone.phase}
                </p>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities Behind Our Products */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">MANUFACTURING CAPABILITIES</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Production capabilities behind our products
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-10">
            We coordinate production through a qualified manufacturing network equipped for precision machining, assembly, and testing of hydraulic rotary actuators and related components.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="aspect-[4/3] rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)]">
              <img
                src="/images/quality/Q3.1.png"
                alt="CNC precision machining of a hydraulic component"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <div className="aspect-[4/3] rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)]">
              <img
                src="/images/quality/Q3.2.png"
                alt="Machining a large precision cylinder"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <div className="aspect-[4/3] rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)]">
              <img
                src="/images/quality/Q3.3.png"
                alt="Five-axis CNC machining of a rotary actuator part"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
              <p className="font-heading text-2xl font-medium text-[#2C4A73]">20,000+</p>
              <p className="text-xs text-[#4A4E54] mt-1">sqm production area</p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
              <p className="font-heading text-2xl font-medium text-[#2C4A73]">80+</p>
              <p className="text-xs text-[#4A4E54] mt-1">CNC machines</p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
              <p className="font-heading text-2xl font-medium text-[#2C4A73]">80+</p>
              <p className="text-xs text-[#4A4E54] mt-1">technical personnel</p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md text-center">
              <p className="font-heading text-2xl font-medium text-[#2C4A73]">200k</p>
              <p className="text-xs text-[#4A4E54] mt-1">Nm manufacturing envelope</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Shipment Testing */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">PRE-SHIPMENT TESTING</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Standard Protocol for Every Shipped Unit
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-10">
            Each actuator undergoes a comprehensive 6-point test protocol before leaving our facility.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {testItems.map((item) => (
              <div
                key={item.name}
                className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md bg-white"
              >
                <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-[#4A4E54]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Inspection */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">QUALITY INSPECTION</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Measured, recorded, and traceable
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl mb-10">
            Components are inspected during production and before shipment using calibrated measuring equipment. Results, measured values and lot photos are archived against each Production Order ID for warranty and claim support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)]">
              <img
                src="/images/factory/quality-inspection.jpg"
                alt="Quality inspection with measuring tools"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)]">
              <img
                src="/images/factory/batch-iso.jpg"
                alt="Batch of finished rotary actuators prepared for shipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">CERTIFICATIONS</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            Documented quality systems
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                Certified Production Partners
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Rotary actuators are manufactured in partner facilities certified to ISO 9001:2015. We coordinate quality planning, incoming inspection and document control on every order.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                Engineering Documentation
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Controlled drawing releases, dimensional drawings, torque verification and mounting interface documentation, backed by application engineering support.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                Full Traceability
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Unique Production Order ID per sales order. Complete linkage: BOM, work orders, inspections, and final test records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-3">
              Request quality documentation
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              Request pressure test records, dimensional inspection reports and batch traceability documentation for any order.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Request Documents
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
