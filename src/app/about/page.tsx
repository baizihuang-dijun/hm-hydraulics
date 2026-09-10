import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — HM Hydraulics',
  description:
    'HM Hydraulics — Technical sourcing partner for hydraulic rotary actuators and core hydraulic components. Engineering-led validation, quality oversight, supply coordination.',
};

const applications = [
  'Mining',
  'Construction',
  'Energy',
  'Marine',
  'Agriculture',
  'Industrial',
];

const partners = [
  'XCMG',
  'Liugong',
  'Hangcha',
  'Zoomlion',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero with factory aerial */}
      <section className="border-b border-[rgba(44,74,115,0.10)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/factory/aerial.jpg"
            alt="HM Hydraulics factory aerial view"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#1B1E20]/60" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <p className="eyebrow mb-4 text-white/70">ABOUT HM HYDRAULICS</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4">
            Technical sourcing partner,
            <br />
            <span className="text-white/90">not just a supplier</span>
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
            We bridge the gap between Chinese manufacturing capability and
            international quality requirements. Our role is to do the technical
            sourcing work you&apos;d have to do yourself &mdash; already done.
          </p>
        </div>
      </section>

      {/* How We Work */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">HOW WE WORK</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            One sourcing process, end to end
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider mb-2">Step 1</p>
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-1">
                Technical Review
              </h3>
              <p className="text-sm text-[#4A4E54]">
                Evaluate requirements, select components, cross-reference existing parts.
              </p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider mb-2">Step 2</p>
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-1">
                Production Coordination
              </h3>
              <p className="text-sm text-[#4A4E54]">
                Coordinate manufacturing through qualified capabilities with ISO9001 oversight.
              </p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider mb-2">Step 3</p>
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-1">
                Quality & Testing
              </h3>
              <p className="text-sm text-[#4A4E54]">
                Every unit tested before shipment. Full traceability and documentation.
              </p>
            </div>
            <div className="p-5 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider mb-2">Step 4</p>
              <h3 className="font-heading text-base font-medium text-[#1B1E20] mb-1">
                Delivery & Support
              </h3>
              <p className="text-sm text-[#4A4E54]">
                Coordinate shipping, manage replenishment, provide ongoing technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Team */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="eyebrow text-[#2C4A73] mb-4">ENGINEERING</p>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
                Engineering-led technical validation
              </h2>
              <p className="text-[#4A4E54] leading-relaxed">
                Our engineering team reviews every specification, validates
                design compatibility, and ensures manufacturability before
                production begins. CAD-driven precision from concept to
                finished component.
              </p>
            </div>
            <div className="rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)] group">
              <img
                src="/images/S1.png"
                alt="Engineering team reviewing CAD drawings"
                className="w-full h-[320px] object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="px-4 py-3 bg-[#FAFAF7] border-t border-[rgba(44,74,115,0.10)]">
                <p className="text-xs text-[#62666C] font-label uppercase tracking-wider">
                  CAD Design Review — Engineering Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Network */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">MANUFACTURING CAPABILITIES</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Production capabilities behind our network
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-2xl mb-10">
            We work with a select network of manufacturing partners and
            maintain deep involvement in every stage of production. The
            capabilities below represent the production system we manage and
            validate on behalf of our customers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                20,000+
              </p>
              <p className="text-sm text-[#4A4E54]">sqm production area</p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                80+
              </p>
              <p className="text-sm text-[#4A4E54]">CNC machines</p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                80+
              </p>
              <p className="text-sm text-[#4A4E54]">technical personnel</p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                200,000
              </p>
              <p className="text-sm text-[#4A4E54]">Nm manufacturing envelope</p>
            </div>
          </div>

          {/* Precision Manufacturing Image */}
          <div className="mb-10 rounded-md overflow-hidden border border-[rgba(44,74,115,0.10)] group">
            <img
              src="/images/A2.png"
              alt="Precision machined hydraulic component"
              className="w-full h-[280px] md:h-[340px] object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="px-4 py-3 bg-[#FAFAF7] border-t border-[rgba(44,74,115,0.10)]">
              <p className="text-xs text-[#62666C] font-label uppercase tracking-wider">
                Precision Machined Component — Helical Gear Element
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">
                Production Range
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#4A4E54]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                  Standard range: 12,000 – 25,000 Nm
                </li>
                <li className="flex items-start gap-2 text-sm text-[#4A4E54]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                  Largest batch delivered: 100,000 Nm
                </li>
                <li className="flex items-start gap-2 text-sm text-[#4A4E54]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                  Capability envelope: up to 200,000 Nm
                </li>
              </ul>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">
                Our Quality Oversight
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#4A4E54]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                  On-site inspection at critical production stages
                </li>
                <li className="flex items-start gap-2 text-sm text-[#4A4E54]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                  Pre-shipment testing witnessed and verified by our team
                </li>
                <li className="flex items-start gap-2 text-sm text-[#4A4E54]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                  Full traceability from raw material to final test report
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">APPLICATIONS</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-10">
            Where our components are used
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
            {applications.map((app) => (
              <div
                key={app}
                className="p-4 border border-[rgba(44,74,115,0.10)] rounded-md text-center"
              >
                <p className="text-sm font-medium text-[#1B1E20]">{app}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-3">
              Industry Application References
            </h3>
            <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
              Our components are used in equipment produced by leading Chinese
              manufacturers across construction, mining, and industrial sectors.
            </p>
            <div className="flex flex-wrap gap-2">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="px-3 py-1.5 bg-[rgba(44,74,115,0.06)] text-[#2C4A73] text-xs font-medium rounded"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality-First */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#2C4A73] mb-4">OUR APPROACH</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
              Quality-first, always
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              ISO9001 certified. 8+ patents. 1,000,000-cycle fatigue validated.
              Every unit tested before shipment with full traceability.
            </p>
            <Link
              href="/quality"
              className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline"
            >
              View quality details
              <svg
                className="ml-1.5 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-[#2C4A73]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-white mb-4">
              Let&apos;s discuss your requirements
            </h2>
            <p className="text-[rgba(255,255,255,0.75)] leading-relaxed mb-6">
              Whether you need an alternative sourcing option for existing components
              or a custom solution for a new application, we&apos;re ready to
              help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-[#2C4A73] text-sm font-medium rounded no-underline hover:bg-[rgba(255,255,255,0.9)] transition-colors duration-150"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
