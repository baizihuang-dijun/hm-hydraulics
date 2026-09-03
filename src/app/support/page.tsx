import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Technical & After-Sales Support — HM Hydraulics',
  description:
    'Technical support and after-sales service for hydraulic actuators. Warranty coverage, service kits, maintenance guidance, and supply coordination.',
};

const servicePackages = [
  {
    name: 'Cylinder Seal Kit',
    description:
      'Complete seal replacement set for cylinder bodies. Includes all O-rings, backup rings, and rod seals.',
    interval: 'Recommended at 2,000–3,000 hours',
  },
  {
    name: 'Manifold Service Kit',
    description:
      'Port seal and valve element replacement kit for manifold blocks. Restores optimal flow characteristics.',
    interval: 'Recommended at 2,000–3,000 hours',
  },
  {
    name: 'Bidirectional Relief Valve',
    description:
      'Complete relief valve assembly for system overpressure protection. Pre-set and tested to specification.',
    interval: 'Inspect at each service interval',
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">TECHNICAL & AFTER-SALES SUPPORT</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            Support that keeps you operational
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            From warranty coverage to maintenance guidance and spare parts coordination.
            We work with you to minimize downtime and keep your equipment running.
          </p>
        </div>
      </section>

      {/* Warranty & Response */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                Coverage
              </p>
              <p className="font-heading text-3xl font-medium text-[#2C4A73] mb-2">
                12 Months
              </p>
              <p className="text-sm text-[#4A4E54]">
                Full warranty on all actuators from date of delivery. Covers
                manufacturing defects and material failures.
              </p>
            </div>
            <div className="p-8 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                Response Time
              </p>
              <p className="font-heading text-3xl font-medium text-[#2C4A73] mb-2">
                24 Hours
              </p>
              <p className="text-sm text-[#4A4E54]">
                Initial response within 24 hours. Technical assessment and
                resolution plan provided promptly.
              </p>
            </div>
            <div className="p-8 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                Spare Parts
              </p>
              <p className="font-heading text-3xl font-medium text-[#2C4A73] mb-2">
                Coordinated
              </p>
              <p className="text-sm text-[#4A4E54]">
                Spare parts and service kits coordinated through our production
                network. Planned ahead to minimize lead times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supply Continuity */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">SUPPLY CONTINUITY</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            How we ensure parts availability
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-2xl mb-10">
            We coordinate production planning and scheduling to keep spare parts
            and replacement components available when you need them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2C4A73] flex items-center justify-center">
                  <span className="text-white text-xs font-medium">1</span>
                </div>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20]">
                  Production Planning
                </h3>
              </div>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                We plan production runs around known demand and service intervals,
                so common replacement parts are ready when needed.
              </p>
            </div>
            <div className="relative p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2C4A73] flex items-center justify-center">
                  <span className="text-white text-xs font-medium">2</span>
                </div>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20]">
                  Scheduled Replenishment
                </h3>
              </div>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                Regular production cycles ensure continuous availability.
                Planned replenishment aligned with your maintenance schedules.
              </p>
            </div>
            <div className="relative p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2C4A73] flex items-center justify-center">
                  <span className="text-white text-xs font-medium">3</span>
                </div>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20]">
                  Expedited Coordination
                </h3>
              </div>
              <p className="text-sm text-[#4A4E54] leading-relaxed">
                For urgent requirements, we coordinate expedited production
                to minimize equipment downtime in critical situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">SERVICE KITS</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Maintenance Service Packages
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-2xl mb-10">
            Pre-configured service kits for scheduled maintenance. Each kit
            contains all components needed for a complete service interval.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.name}
                className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md"
              >
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
                  {pkg.description}
                </p>
                <p className="font-label text-xs text-[#2C4A73] uppercase tracking-wider">
                  {pkg.interval}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Guidance */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#2C4A73] mb-4">MAINTENANCE</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
              Recommended Service Intervals
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-8">
              For optimal performance and maximum service life, we recommend
              scheduled maintenance every 2,000 to 3,000 operating hours,
              depending on application severity and operating conditions.
            </p>

            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-[#FAFAF7]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-1">
                    DTD Assembly & Maintenance Manual
                  </h3>
                  <p className="text-sm text-[#4A4E54]">
                    Complete installation, maintenance, and troubleshooting
                    reference for DTD series actuators.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150 whitespace-nowrap"
                >
                  Request Manual
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-3">
              Need support?
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              Contact our technical support team for warranty claims, spare
              parts orders, or maintenance guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
              >
                Contact Support
              </Link>
              <a
                href="mailto:bai@hmhydraulics.com"
                className="inline-flex items-center px-5 py-2.5 border border-[rgba(44,74,115,0.25)] text-[#2C4A73] text-sm font-medium rounded no-underline hover:bg-[rgba(44,74,115,0.04)] transition-colors duration-150"
              >
                bai@hmhydraulics.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
