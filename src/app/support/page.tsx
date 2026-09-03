import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Technical & After-Sales Support — HM Hydraulics',
  description:
    'Technical support and after-sales service for hydraulic actuators. Warranty coverage, service kits, maintenance guidance, and supply coordination.',
};

const serviceKits = [
  {
    name: 'Cylinder Seal Kit',
    description: 'Complete seal replacement set for cylinder bodies. Includes O-rings, backup rings, and rod seals.',
  },
  {
    name: 'Manifold Service Kit',
    description: 'Port seal and valve element replacement kit for manifold blocks.',
  },
  {
    name: 'Relief Valve Assembly',
    description: 'Complete relief valve assembly for system overpressure protection. Pre-set and tested to specification.',
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
            Support Beyond the Purchase Order
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            From warranty coverage to spare parts coordination — we stay with you
            after the order is placed.
          </p>
        </div>
      </section>

      {/* Warranty & Response */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                Warranty
              </p>
              <p className="font-heading text-2xl font-medium text-[#2C4A73] mb-1">
                12 Months
              </p>
              <p className="text-sm text-[#4A4E54]">
                From date of delivery. Covers manufacturing defects and material failures.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                Response
              </p>
              <p className="font-heading text-2xl font-medium text-[#2C4A73] mb-1">
                24 Hours
              </p>
              <p className="text-sm text-[#4A4E54]">
                Initial response within 24 hours with technical assessment and resolution plan.
              </p>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
                Spare Parts
              </p>
              <p className="font-heading text-2xl font-medium text-[#2C4A73] mb-1">
                Planned
              </p>
              <p className="text-sm text-[#4A4E54]">
                Service kits and spare parts coordinated through our production network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supply & Replacement Coordination */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#2C4A73] mb-4">SUPPLY COORDINATION</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
              Supply & Replacement Coordination
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              For recurring requirements, production and replenishment can be
              coordinated around agreed demand and delivery schedules.
            </p>
            <p className="text-[#4A4E54] leading-relaxed">
              For urgent requirements, we coordinate expedited production to
              minimize equipment downtime in critical situations.
            </p>
          </div>
        </div>
      </section>

      {/* Service Kits */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">SERVICE KITS</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Service Kits
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-2xl mb-10">
            Maintenance components can be coordinated for supported products
            and applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceKits.map((kit) => (
              <div
                key={kit.name}
                className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md"
              >
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                  {kit.name}
                </h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">
                  {kit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#2C4A73] mb-4">DOCUMENTATION</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
              Technical Documentation
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-8">
              Installation, maintenance, and troubleshooting references for
              supported products.
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
