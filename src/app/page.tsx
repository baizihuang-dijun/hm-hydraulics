import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Section 01 — Hero */}
      <section className="border-b border-[rgba(15,15,15,0.08)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/H10.2.jpg"
            alt="Hydraulic actuator on heavy equipment"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#0F0F0F]/60" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="home-eyebrow mb-6 text-white/70">
              TECHNICAL SOURCING FOR HYDRAULIC COMPONENTS
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight text-white mb-6">
              Your Technical Sourcing Partner
              <br />
              <span className="text-white/90">for Hydraulic Components</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-3">
              We handle the technical matching, sourcing, quality verification and supply
              coordination behind your hydraulic component requirements.
            </p>
            <p className="text-white/70 text-base mb-10">
              From technical requirement to delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 home-bg-accent text-white text-sm font-medium rounded no-underline hover:home-bg-accent-deep transition-colors duration-150"
              >
                Discuss Your Requirement
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white text-sm font-medium rounded no-underline hover:bg-white/10 transition-colors duration-150"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — What We Do */}
      <section className="border-b border-[rgba(15,15,15,0.08)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="home-eyebrow mb-3">HOW WE WORK</p>
          <h2 className="font-heading text-[#0F0F0F] text-3xl md:text-4xl font-medium mb-4">
            What We Do
          </h2>
          <p className="home-text-secondary text-lg leading-relaxed max-w-[680px] mb-12">
            We help turn hydraulic component requirements into workable sourcing solutions.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Understand', desc: 'Clarify the requirement' },
              { num: '02', title: 'Source', desc: 'Match manufacturing capability' },
              { num: '03', title: 'Validate', desc: 'Check technical fit' },
              { num: '04', title: 'Control', desc: 'Coordinate quality & production' },
              { num: '05', title: 'Deliver', desc: 'Coordinate shipment & supply' },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-5"
              >
                <span className="font-label home-accent text-xs font-medium mb-2 block">
                  {step.num}
                </span>
                <h3 className="font-heading text-[#0F0F0F] text-base font-medium mb-1">
                  {step.title}
                </h3>
                <p className="home-text-secondary text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[#0F0F0F] text-base font-medium mt-8">
            One technical and commercial interface from requirement to delivery.
          </p>
        </div>
      </section>

      {/* Section 03 — Our Solutions */}
      <section className="border-b border-[rgba(15,15,15,0.08)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="home-eyebrow mb-3">OUR SOLUTIONS</p>
          <h2 className="font-heading text-[#0F0F0F] text-3xl md:text-4xl font-medium mb-4">
            Our Solutions
          </h2>
          <p className="home-text-secondary text-lg leading-relaxed max-w-[680px] mb-12">
            Support that goes beyond finding a supplier.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-6">
              <p className="home-eyebrow mb-3">01</p>
              <h3 className="font-heading text-[#0F0F0F] text-lg font-medium mb-2">
                Engineering
              </h3>
              <p className="home-text-secondary text-sm leading-relaxed mb-4">
                Component selection, cross-reference review, and technical validation for new and existing requirements.
              </p>
            </div>

            <div className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-6">
              <p className="home-eyebrow mb-3">02</p>
              <h3 className="font-heading text-[#0F0F0F] text-lg font-medium mb-2">
                Supply Planning
              </h3>
              <p className="home-text-secondary text-sm leading-relaxed mb-4">
                Production planning, manufacturing coordination, and quality oversight across the supply chain.
              </p>
            </div>

            <div className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-6">
              <p className="home-eyebrow mb-3">03</p>
              <h3 className="font-heading text-[#0F0F0F] text-lg font-medium mb-2">
                Delivery Coordination
              </h3>
              <p className="home-text-secondary text-sm leading-relaxed mb-4">
                Shipping coordination, delivery scheduling, and terms management for your project timeline.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/solutions"
              className="inline-flex items-center home-accent text-sm font-medium no-underline hover:text-[#8A1515] transition-colors duration-150"
            >
              Explore Solutions
              <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 04 — Current Product Focus */}
      <section className="border-b border-[rgba(15,15,15,0.08)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="home-eyebrow mb-3">PRODUCT FOCUS</p>
          <h2 className="font-heading text-[#0F0F0F] text-3xl md:text-4xl font-medium mb-4">
            Current Product Focus
          </h2>
          <p className="home-text-secondary text-lg leading-relaxed max-w-[680px] mb-12">
            Our current core product is hydraulic rotary actuators, supported by selected
            actuator and hydraulic component solutions.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-6">
              <p className="home-eyebrow mb-2">CORE PRODUCT</p>
              <h3 className="font-heading text-[#0F0F0F] text-lg font-medium mb-2">
                Rotary Actuators
              </h3>
              <p className="home-text-secondary text-sm leading-relaxed mb-4">
                20 Nm–200,000 Nm across multiple series, mechanisms and application requirements.
              </p>
              <Link
                href="/products/rotary-actuators"
                className="inline-flex items-center home-accent text-sm font-medium no-underline hover:text-[#8A1515] transition-colors duration-150"
              >
                Explore Rotary Actuators
                <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-6">
              <h3 className="font-heading text-[#0F0F0F] text-lg font-medium mb-2">
                Tilt Actuators
              </h3>
              <p className="home-text-secondary text-sm leading-relaxed mb-4">
                Selected cross-reference solutions for excavator tilt and coupler applications.
              </p>
              <Link
                href="/products/tilt-actuators"
                className="inline-flex items-center home-accent text-sm font-medium no-underline hover:text-[#8A1515] transition-colors duration-150"
              >
                View Products
                <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Section 05 — Why HM / Evidence */}
      <section className="border-b border-[rgba(15,15,15,0.08)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="home-eyebrow mb-3">WHY HM</p>
          <h2 className="font-heading text-[#0F0F0F] text-3xl md:text-4xl font-medium mb-12">
            Why Work With HM
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div>
              <h3 className="font-heading text-[#0F0F0F] text-base font-medium mb-2">
                Technical Fit
              </h3>
              <p className="home-accent text-sm font-medium mb-1">
                Validate before you commit.
              </p>
              <p className="home-text-secondary text-sm leading-relaxed">
                Application, specification and compatibility review before production.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[#0F0F0F] text-base font-medium mb-2">
                Supply Control
              </h3>
              <p className="home-accent text-sm font-medium mb-1">
                More than a factory contact.
              </p>
              <p className="home-text-secondary text-sm leading-relaxed">
                Production, inspection and delivery coordination through qualified
                manufacturing capabilities.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[#0F0F0F] text-base font-medium mb-2">
                Total Cost
              </h3>
              <p className="home-accent text-sm font-medium mb-1">
                Balance cost with capability.
              </p>
              <p className="home-text-secondary text-sm leading-relaxed">
                Competitive sourcing without sacrificing technical requirements or
                supply reliability.
              </p>
            </div>
          </div>

          {/* Evidence Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '72+', label: 'Configurations' },
              { value: '1M+', label: 'Cycle Validation*' },
              { value: '200,000 Nm', label: 'Manufacturing Envelope*' },
              { value: '100%', label: 'Pre-Shipment Testing*' },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-5 text-center"
              >
                <div className="font-heading home-accent text-2xl md:text-3xl font-medium mb-1">
                  {metric.value}
                </div>
                <div className="home-text-secondary text-xs">{metric.label}</div>
              </div>
            ))}
          </div>
          <p className="home-text-secondary text-xs mt-4 leading-relaxed">
            *Applies to selected models / capabilities where specified. Technical details and
            supporting documentation available upon request.
          </p>
        </div>
      </section>

      {/* Section 06 — Applications */}
      <section className="border-b border-[rgba(15,15,15,0.08)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="home-eyebrow mb-3">APPLICATIONS</p>
          <h2 className="font-heading text-[#0F0F0F] text-3xl md:text-4xl font-medium mb-4">
            Where Our Components Are Used
          </h2>
          <p className="home-text-secondary text-lg leading-relaxed max-w-[680px] mb-12">
            Application-specific hydraulic solutions for demanding equipment and machinery.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="rounded-lg overflow-hidden border border-[rgba(15,15,15,0.08)]">
              <img
                src="/images/H10.3.jpg"
                alt="Hydraulic machinery in industrial application"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden border border-[rgba(15,15,15,0.08)]">
              <img
                src="/images/H10.4.jpg"
                alt="Specialized equipment with hydraulic systems"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Construction',
              'Mining & Heavy Equipment',
              'Marine',
              'Industrial Machinery',
              'Material Handling',
              'Specialized Equipment',
            ].map((app) => (
              <div
                key={app}
                className="bg-white border border-[rgba(15,15,15,0.08)] rounded-lg p-5"
              >
                <h3 className="font-heading text-[#0F0F0F] text-sm font-medium">{app}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 07 — Final CTA */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <h2 className="font-heading text-[#0F0F0F] text-3xl md:text-4xl font-medium mb-4">
            Tell Us What You&apos;re Trying to Source
          </h2>
          <p className="home-text-secondary text-lg leading-relaxed max-w-[680px] mb-8">
            Share an existing part, drawing or application requirement. We&apos;ll help
            identify the next step.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block home-bg-accent text-white text-sm font-medium px-6 py-3 rounded hover:home-bg-accent-deep transition-colors duration-150 no-underline"
            >
              Discuss Your Requirement
            </Link>
            <Link
              href="/products"
              className="inline-block border border-[rgba(15,15,15,0.20)] home-accent text-sm font-medium px-6 py-3 rounded hover:home-bg-tint transition-colors duration-150 no-underline"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
