import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions — HM Hydraulics',
  description:
    'From technical requirement to reliable delivery. Engineering support, manufacturing sourcing, quality coordination and delivery management for hydraulic components.',
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hm-hydraulics/images/S1.png"
            alt="Engineering review and component selection"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#1B1E20]/60" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <p className="eyebrow text-white/70 mb-4">OUR SOLUTIONS</p>
          <h1 className="font-heading text-white text-4xl md:text-[56px] font-medium leading-tight max-w-[800px] mb-6">
            From Technical Requirement
            <br />
            to Reliable Delivery
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-[680px]">
            Engineering support, manufacturing sourcing, quality coordination and delivery
            management — connected in one sourcing process.
          </p>
        </div>
      </section>

      {/* Engineering Support */}
      <section id="engineering" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">ENGINEERING SUPPORT</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Select. Adapt. Validate.
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            The right component starts with the right specification. We help evaluate applications,
            select suitable components, review existing designs and coordinate customized solutions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Component Selection
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Match torque, pressure, flow, rotation, load and application requirements to a
                suitable configuration.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Cross-Reference
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Evaluate existing components and identify suitable alternative configurations.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Custom Engineering
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Coordinate custom hydraulic components based on drawings, specifications or
                application requirements.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Technical Validation
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Review dimensions, interfaces, materials and performance requirements before
                production.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F0] border border-[rgba(44,74,115,0.10)] rounded-lg p-8 md:p-10">
            <p className="font-heading text-[#1B1E20] text-lg font-medium mb-2">
              Custom doesn&apos;t have to mean starting from zero.
            </p>
            <p className="text-[#4A4E54] leading-relaxed">
              If you have an existing part, drawing or application requirement, we can help turn
              it into a manufacturable sourcing solution.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-[#2C4A73] text-white text-sm font-medium px-6 py-3 rounded hover:bg-[#1E3A5F] transition-colors duration-150 no-underline"
            >
              Discuss a Custom Requirement
            </Link>
          </div>
        </div>
      </section>

      {/* Supply Planning */}
      <section id="supply" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">SUPPLY PLANNING</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Plan. Produce. Control.
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            For recurring requirements, we coordinate production planning, manufacturing,
            inspection and replenishment to improve delivery predictability.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Production Planning
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Plan production around agreed demand and delivery requirements.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Manufacturing Coordination
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Coordinate production through qualified manufacturing capabilities.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Quality Coordination
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Coordinate inspection, testing and documentation before shipment.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Replenishment Planning
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Establish planned replenishment schedules for recurring requirements.
              </p>
            </div>
          </div>

          <div className="bg-[rgba(44,74,115,0.03)] border border-[rgba(44,74,115,0.08)] rounded-lg p-6 md:p-8">
            <p className="font-heading text-[#1B1E20] text-base font-medium mb-2">
              Customer-Specific Inventory Strategies
            </p>
            <p className="text-[#4A4E54] text-sm leading-relaxed">
              Where demand and lead-time requirements justify it, customer-specific stocking
              arrangements can be explored as part of a broader supply continuity plan.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-[#2C4A73] text-white text-sm font-medium px-6 py-3 rounded hover:bg-[#1E3A5F] transition-colors duration-150 no-underline"
            >
              Discuss Supply Planning
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Solutions */}
      <section id="delivery" className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">DELIVERY SOLUTIONS</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Coordinate. Ship. Replenish.
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            We coordinate transportation and delivery around shipment size, urgency, destination
            and commercial requirements.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Shipping Options
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Sea, air and express options can be coordinated according to urgency and shipment
                economics.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Delivery Terms
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                EXW, FOB, DAP and DDP structures can be supported where applicable.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Shipment Coordination
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Production completion, inspection, packaging and transportation can be coordinated
                as one process.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6">
              <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                Replenishment
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Recurring shipments can be planned around agreed demand and production lead times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Tell Us What You&apos;re Trying to Source
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-8">
            Share an existing part, drawing or application requirement. We&apos;ll help identify
            the next step.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#2C4A73] text-white text-sm font-medium px-6 py-3 rounded hover:bg-[#1E3A5F] transition-colors duration-150 no-underline"
            >
              Discuss Your Requirement
            </Link>
            <Link
              href="/products"
              className="inline-block border border-[rgba(44,74,115,0.30)] text-[#2C4A73] text-sm font-medium px-6 py-3 rounded hover:bg-[rgba(44,74,115,0.05)] transition-colors duration-150 no-underline"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
