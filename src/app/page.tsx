import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="eyebrow mb-6">
              Hydraulic Rotary Actuators & Components
            </p>

            {/* Headline */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight text-[#1B1E20] mb-6">
              Technical sourcing partner
              <br />
              <span className="text-[#2C4A73]">for core hydraulic components</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#4A4E54] leading-relaxed max-w-2xl mb-10">
              We do the technical sourcing work you&apos;d have to do
              yourself&nbsp;&mdash; already done. Lower risk, reliable delivery,
              meaningful cost savings.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
              >
                Explore Products
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-[rgba(44,74,115,0.25)] text-[#2C4A73] text-sm font-medium rounded no-underline hover:bg-[rgba(44,74,115,0.04)] transition-colors duration-150"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[rgba(44,74,115,0.03)] to-transparent pointer-events-none" />
      </section>

      {/* Three Pillars */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow mb-12">Why HM Hydraulics</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Pillar 1 */}
            <div className="group">
              <div className="mb-5">
                <div className="w-10 h-10 rounded flex items-center justify-center bg-[rgba(44,74,115,0.06)] group-hover:bg-[rgba(44,74,115,0.10)] transition-colors duration-150">
                  <svg
                    className="w-5 h-5 text-[#2C4A73]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-3">
                Lower Risk
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Every unit undergoes full performance testing before shipment.
                1,000,000-cycle fatigue validated. ISO9001 certified with full
                traceability from order to delivery.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="group">
              <div className="mb-5">
                <div className="w-10 h-10 rounded flex items-center justify-center bg-[rgba(44,74,115,0.06)] group-hover:bg-[rgba(44,74,115,0.10)] transition-colors duration-150">
                  <svg
                    className="w-5 h-5 text-[#2C4A73]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
              </div>
              <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-3">
                Reliable Delivery
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                3-tier supply chain: local stock, scheduled replenishment, and
                emergency dispatch. 24-hour response, 48-hour shipping for
                in-stock parts.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="group">
              <div className="mb-5">
                <div className="w-10 h-10 rounded flex items-center justify-center bg-[rgba(44,74,115,0.06)] group-hover:bg-[rgba(44,74,115,0.10)] transition-colors duration-150">
                  <svg
                    className="w-5 h-5 text-[#2C4A73]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
              <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-3">
                Real Cost Savings
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Direct factory pricing with no middlemen. Cross-reference
                compatibility with HKS, Helac, and other major brands at a
                fraction of the cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Preview */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="eyebrow mb-4">Product Range</p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-[#1B1E20]">
                Engineered for demanding applications
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline"
            >
              View all products
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tilt Actuators */}
            <Link
              href="/products/tilt-actuators"
              className="group block p-8 border border-[rgba(44,74,115,0.10)] rounded-md hover:border-[rgba(44,74,115,0.25)] transition-colors duration-150 no-underline bg-[#FAFAF7]"
            >
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                19 Models
              </p>
              <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-2 group-hover:text-[#2C4A73] transition-colors duration-150">
                Tilt Actuators
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
                DTA Series for excavator tilt couplers. DTD Series with
                Helac PT cross-reference compatibility.
              </p>
              <span className="text-sm font-medium text-[#2C4A73]">
                Learn more &rarr;
              </span>
            </Link>

            {/* Rotary Actuators */}
            <Link
              href="/products/rotary-actuators"
              className="group block p-8 border border-[rgba(44,74,115,0.10)] rounded-md hover:border-[rgba(44,74,115,0.25)] transition-colors duration-150 no-underline bg-[#FAFAF7]"
            >
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                9 Series &middot; 72 Specs
              </p>
              <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-2 group-hover:text-[#2C4A73] transition-colors duration-150">
                Rotary Actuators
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
                DKX-A through DKX-F, DT, TR, RT series. Covering 20Nm to
                200,000Nm torque range.
              </p>
              <span className="text-sm font-medium text-[#2C4A73]">
                Learn more &rarr;
              </span>
            </Link>

            {/* Slew Drives */}
            <div className="group p-8 border border-[rgba(44,74,115,0.10)] rounded-md bg-[#FAFAF7] opacity-70">
              <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                Coming Soon
              </p>
              <h3 className="font-heading text-xl font-medium text-[#1B1E20] mb-2">
                Slew Drives
              </h3>
              <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
                Expanding our product range to include precision slew drives
                for rotational applications.
              </p>
              <span className="text-sm font-medium text-[#62666C]">
                Stay tuned
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow mb-12">Proven Track Record</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                1M+
              </p>
              <p className="text-sm text-[#4A4E54]">
                Cycle fatigue test passed
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                72
              </p>
              <p className="text-sm text-[#4A4E54]">
                Product specifications
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                8+
              </p>
              <p className="text-sm text-[#4A4E54]">
                Patents & copyrights
              </p>
            </div>
            <div>
              <p className="font-heading text-3xl md:text-4xl font-medium text-[#2C4A73] mb-2">
                200k
              </p>
              <p className="text-sm text-[#4A4E54]">
                Nm max torque capacity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-[#2C4A73]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-white mb-4">
              Ready to simplify your hydraulic sourcing?
            </h2>
            <p className="text-lg text-[rgba(255,255,255,0.75)] leading-relaxed mb-8">
              Tell us your requirements. We&apos;ll handle the technical
              validation, quality assurance, and logistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#2C4A73] text-sm font-medium rounded no-underline hover:bg-[rgba(255,255,255,0.9)] transition-colors duration-150"
              >
                Start a Conversation
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-[rgba(255,255,255,0.3)] text-white text-sm font-medium rounded no-underline hover:bg-[rgba(255,255,255,0.08)] transition-colors duration-150"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
