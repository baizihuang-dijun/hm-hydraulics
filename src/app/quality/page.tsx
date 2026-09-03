import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quality & Validation',
  description:
    'ISO9001 certified. 1,000,000-cycle fatigue test passed. Full QA traceability. Every unit tested before shipment.',
};

const milestones = [
  {
    phase: 'Phase 1',
    title: 'Design & Manufacturing',
    description:
      'Each unit manufactured under ISO9001 quality management system. Unique Production Order ID assigned per sales order, linking BOM, work orders, and inspection records.',
  },
  {
    phase: 'Phase 2',
    title: 'Pre-Shipment Testing',
    description:
      'Every unit undergoes comprehensive testing: start-up pressure, rotation angle, internal/external leakage, low-speed crawling, and return-to-zero confirmation.',
  },
  {
    phase: 'Phase 3',
    title: 'Independent Fatigue Validation',
    description:
      '1,000,000-cycle full-load fatigue test at 150 bar, independently conducted by international customer. Result: PASSED with zero actuator failures.',
  },
  {
    phase: 'Phase 4',
    title: 'Customer Benchmark Comparison',
    description:
      'Customer teardown inspection and benchmark comparison against Helac products. Customer confirmed quality satisfaction across all critical dimensions.',
  },
];

const testItems = [
  { name: 'Start-Up Pressure', desc: 'Minimum pressure to initiate movement' },
  { name: 'Rotation Angle', desc: 'Angular accuracy verification' },
  { name: 'Internal Leakage', desc: 'Seal integrity under rated pressure' },
  { name: 'External Leakage', desc: 'Housing and port seal verification' },
  { name: 'Low-Speed Crawling', desc: 'Smooth operation at minimum speed' },
  { name: 'Return-to-Zero', desc: 'Positional accuracy confirmation' },
];

export default function QualityPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Quality & Validation</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            Proven at every stage
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            From manufacturing to independent customer validation. Our quality
            system ensures every unit meets the highest standards before it
            leaves our facility.
          </p>
        </div>
      </section>

      {/* Fatigue Test Highlight */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider mb-3">
                Key Evidence
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                1,000,000-Cycle Fatigue Test
              </h2>
              <p className="text-[#4A4E54] leading-relaxed mb-6">
                Full-load fatigue test conducted independently by an
                international customer at 150 bar operating pressure. The test
                ran for 1 million cycles under continuous full-load conditions.
              </p>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-heading text-4xl font-medium text-[#2C4A73]">
                  PASSED
                </span>
                <span className="text-sm text-[#62666C]">
                  Zero actuator failures
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md">
                <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                  Test Duration
                </p>
                <p className="font-heading text-2xl font-medium text-[#1B1E20]">
                  1,000,000 cycles
                </p>
              </div>
              <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md">
                <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                  Operating Pressure
                </p>
                <p className="font-heading text-2xl font-medium text-[#1B1E20]">
                  150 bar (full load)
                </p>
              </div>
              <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md">
                <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                  Result
                </p>
                <p className="font-heading text-2xl font-medium text-[#2C4A73]">
                  Zero failures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Timeline */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Quality Journey</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-12">
            From factory floor to field validation
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[rgba(44,74,115,0.15)] hidden md:block" />

            <div className="space-y-10">
              {milestones.map((item, index) => (
                <div key={item.phase} className="relative flex gap-6 md:gap-10">
                  {/* Timeline dot */}
                  <div className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-[#2C4A73] items-center justify-center z-10">
                    <span className="text-white text-xs font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider mb-1">
                      {item.phase}
                    </p>
                    <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4A4E54] leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Shipment Testing */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Every Unit, Every Time</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Pre-Shipment Testing
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-2xl mb-10">
            Each actuator undergoes a comprehensive 6-point test protocol
            before leaving our facility. No exceptions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testItems.map((item) => (
              <div
                key={item.name}
                className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[rgba(44,74,115,0.08)] flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-[#2C4A73]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m9 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-sm text-[#1B1E20]">
                    {item.name}
                  </h3>
                </div>
                <p className="text-xs text-[#62666C] leading-relaxed pl-9">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Certifications & IP</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            Certified quality, proprietary technology
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                ISO9001 Certified
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Full quality management system compliance. Documented processes
                for every stage from incoming material to final inspection.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                8+ Patents
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Utility model patents for helical rotary actuator mechanisms.
                Software copyrights for control systems and testing procedures.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                Full Traceability
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Unique Production Order ID per sales order. Complete linkage:
                BOM, work orders, inspections, and final test records.
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
              We can provide test reports, certification copies, and detailed
              traceability records for any order.
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
