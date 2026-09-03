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
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <p className="eyebrow text-[#2C4A73] mb-4">OUR SOLUTIONS</p>
          <h1 className="font-heading text-[#1B1E20] text-4xl md:text-[56px] font-medium leading-tight max-w-[800px] mb-6">
            From Technical Requirement
            <br />
            to Reliable Delivery
          </h1>
          <p className="text-[#4A4E54] text-lg md:text-xl leading-relaxed max-w-[680px]">
            We combine engineering support, manufacturing sourcing, quality coordination and
            delivery management to simplify the process of sourcing hydraulic components.
          </p>
        </div>
      </section>

      {/* Engineering Support */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">ENGINEERING SUPPORT</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Select. Adapt. Validate.
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            The right component starts with the right specification. We support application review,
            component selection, cross-reference and technical clarification before production
            begins.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Component Selection
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Help identify suitable actuator or hydraulic component configurations based on
                torque, pressure, flow, rotation, load and application requirements.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Custom Engineering
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Have a drawing or a non-standard requirement? We can coordinate custom hydraulic
                components based on your drawings, specifications or application requirements.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Technical Validation
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Review drawings, dimensions, materials, interfaces and performance requirements
                before production.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F0] border border-[rgba(44,74,115,0.10)] rounded-lg p-8 md:p-10">
            <p className="font-heading text-[#1B1E20] text-lg font-medium mb-2">
              Custom doesn't have to mean starting from zero.
            </p>
            <p className="text-[#4A4E54] leading-relaxed">
              If you already have a drawing, an existing component or simply an application
              requirement, we can help translate it into a manufacturable solution through our
              qualified manufacturing network.
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
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">SUPPLY PLANNING</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Plan. Produce. Control.
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            For recurring requirements, we can coordinate production planning, manufacturing,
            inspection and replenishment schedules to improve delivery predictability and reduce
            supply interruptions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Production Planning
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Production can be planned around agreed demand and delivery requirements rather than
                handled order by order.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Manufacturing Coordination
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                We coordinate production, inspection and documentation through qualified
                manufacturing capabilities.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Supply Continuity
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                For recurring requirements, we can help evaluate production schedules, replenishment
                plans and other supply continuity strategies.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F0] border border-[rgba(44,74,115,0.10)] rounded-lg p-8 md:p-10">
            <p className="font-heading text-[#1B1E20] text-lg font-medium mb-2">
              Customer-Specific Inventory Strategies
            </p>
            <p className="text-[#4A4E54] leading-relaxed">
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
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">DELIVERY SOLUTIONS</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Coordinate. Ship. Replenish.
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            We coordinate transportation and delivery solutions based on shipment size, urgency,
            destination and commercial requirements.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Shipping Options
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Sea, air and express options can be coordinated based on urgency and shipment
                economics.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Delivery Terms
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                We can support different delivery structures depending on the project, including
                EXW, FOB, DAP and DDP where applicable.
              </p>
            </div>
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Shipment Coordination
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Production completion, inspection, packaging and transportation can be coordinated
                as one delivery process.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F0] border border-[rgba(44,74,115,0.10)] rounded-lg p-8 md:p-10">
            <p className="text-[#4A4E54] leading-relaxed">
              HM is not a freight forwarder. Logistics coordination is part of our end-to-end
              sourcing solution — from production completion to your receiving point.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Tell Us What You're Trying to Source
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-8">
            Share your existing component, drawing or application requirement. We'll help identify
            the technical requirements, suitable sourcing options and next steps.
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
