import Link from 'next/link';

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Section 01 — Hero */}
      <section className="home-section relative overflow-hidden">
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
        <div className="home-container home-section-padding relative">
          <div className="max-w-3xl">
            <p className="home-eyebrow mb-6 home-eyebrow-light">
              Technical Sourcing for Hydraulic Components
            </p>
            <h1 className="home-hero-title home-hero-title-xl mb-6">
              Your Technical Sourcing Partner
              <br />
              <span className="home-hero-subtitle">for Hydraulic Components</span>
            </h1>
            <p className="home-hero-lead text-lg md:text-xl leading-relaxed max-w-2xl mb-3">
              We handle the technical matching, sourcing, quality verification and supply
              coordination behind your hydraulic component requirements.
            </p>
            <p className="home-hero-caption text-base mb-10">
              From technical requirement to delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="home-button home-button-primary">
                Discuss Your Requirement
              </Link>
              <Link href="/solutions" className="home-button home-button-secondary-light">
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — What We Do */}
      <section className="home-section">
        <div className="home-container home-section-padding">
          <p className="home-eyebrow mb-3">How We Work</p>
          <h2 className="home-title home-title-lg mb-4">
            What We Do
          </h2>
          <p className="home-lead max-w-[680px] mb-12">
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
                className="home-card home-card-hover home-process-step home-card-inner"
              >
                <span className="home-process-number block">{step.num}</span>
                <h3 className="home-title home-title-md mb-2">
                  {step.title}
                </h3>
                <p className="home-body">{step.desc}</p>
              </div>
            ))}
          </div>

          <p className="home-body text-[#0F0F0F] font-medium mt-10">
            One technical and commercial interface from requirement to delivery.
          </p>
        </div>
      </section>

      {/* Section 03 — Our Solutions */}
      <section className="home-section home-section-alt">
        <div className="home-container home-section-padding">
          <p className="home-eyebrow mb-3">Our Solutions</p>
          <h2 className="home-title home-title-lg mb-4">
            Our Solutions
          </h2>
          <p className="home-lead max-w-[680px] mb-12">
            Support that goes beyond finding a supplier.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="home-card home-card-hover home-card-inner">
              <p className="home-eyebrow mb-4">01</p>
              <h3 className="home-title home-title-md mb-3">
                Engineering
              </h3>
              <p className="home-body mb-5">
                Component selection, cross-reference review, and technical validation for new and existing requirements.
              </p>
            </div>

            <div className="home-card home-card-hover home-card-inner">
              <p className="home-eyebrow mb-4">02</p>
              <h3 className="home-title home-title-md mb-3">
                Supply Planning
              </h3>
              <p className="home-body mb-5">
                Production planning, manufacturing coordination, and quality oversight across the supply chain.
              </p>
            </div>

            <div className="home-card home-card-hover home-card-inner">
              <p className="home-eyebrow mb-4">03</p>
              <h3 className="home-title home-title-md mb-3">
                Delivery Coordination
              </h3>
              <p className="home-body mb-5">
                Shipping coordination, delivery scheduling, and terms management for your project timeline.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/solutions" className="home-link">
              Explore Solutions
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 04 — Current Product Focus */}
      <section className="home-section">
        <div className="home-container home-section-padding">
          <p className="home-eyebrow mb-3">Product Focus</p>
          <h2 className="home-title home-title-lg mb-4">
            Current Product Focus
          </h2>
          <p className="home-lead max-w-[680px] mb-12">
            Our current core product is hydraulic rotary actuators, supported by selected
            actuator and hydraulic component solutions.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="home-card home-card-hover overflow-hidden">
              <div className="home-image-container border-0 border-b rounded-none">
                <img
                  src="/images/H4.png"
                  alt="Rotary actuator product render"
                  className="w-full h-56 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="home-card-inner">
                <p className="home-eyebrow mb-3">Core Product</p>
                <h3 className="home-title home-title-md mb-3">
                  Rotary Actuators
                </h3>
                <p className="home-body mb-5">
                  20 Nm–200,000 Nm across multiple series, mechanisms and application requirements.
                </p>
                <Link href="/products/rotary-actuators" className="home-link">
                  Explore Rotary Actuators
                  <ArrowRight />
                </Link>
              </div>
            </div>

            <div className="home-card home-card-hover overflow-hidden">
              <div className="home-image-container border-0 border-b rounded-none">
                <img
                  src="/images/H5.png"
                  alt="Tilt actuator product render"
                  className="w-full h-56 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="home-card-inner">
                <h3 className="home-title home-title-md mb-3">
                  Tilt Actuators
                </h3>
                <p className="home-body mb-5">
                  Selected cross-reference solutions for excavator tilt and coupler applications.
                </p>
                <Link href="/products/tilt-actuators" className="home-link">
                  View Products
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05 — Why HM / Evidence */}
      <section className="home-section home-section-alt">
        <div className="home-container home-section-padding">
          <p className="home-eyebrow mb-3">Why HM</p>
          <h2 className="home-title home-title-lg mb-14">
            Why Work With HM
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div>
              <h3 className="home-title home-title-md mb-3">
                Technical Fit
              </h3>
              <p className="home-body text-[#A31919] font-medium mb-2">
                Validate before you commit.
              </p>
              <p className="home-body">
                Application, specification and compatibility review before production.
              </p>
            </div>
            <div>
              <h3 className="home-title home-title-md mb-3">
                Supply Control
              </h3>
              <p className="home-body text-[#A31919] font-medium mb-2">
                More than a factory contact.
              </p>
              <p className="home-body">
                Production, inspection and delivery coordination through qualified
                manufacturing capabilities.
              </p>
            </div>
            <div>
              <h3 className="home-title home-title-md mb-3">
                Total Cost
              </h3>
              <p className="home-body text-[#A31919] font-medium mb-2">
                Balance cost with capability.
              </p>
              <p className="home-body">
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
                className="home-card home-card-inner text-center"
              >
                <div className="home-metric-value mb-2">
                  {metric.value}
                </div>
                <div className="home-caption">{metric.label}</div>
              </div>
            ))}
          </div>
          <p className="home-caption mt-5 leading-relaxed">
            *Applies to selected models / capabilities where specified. Technical details and
            supporting documentation available upon request.
          </p>
        </div>
      </section>

      {/* Section 06 — Applications */}
      <section className="home-section">
        <div className="home-container home-section-padding">
          <p className="home-eyebrow mb-3">Applications</p>
          <h2 className="home-title home-title-lg mb-4">
            Where Our Components Are Used
          </h2>
          <p className="home-lead max-w-[680px] mb-12">
            Application-specific hydraulic solutions for demanding equipment and machinery.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="home-image-container overflow-hidden">
              <img
                src="/images/H10.3.jpg"
                alt="Hydraulic machinery in industrial application"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
            <div className="home-image-container overflow-hidden">
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
                className="home-app-card"
              >
                <h3 className="home-title home-title-md">{app}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 07 — Final CTA */}
      <section className="home-section-alt">
        <div className="home-container home-section-padding">
          <div className="max-w-3xl">
            <h2 className="home-title home-title-lg mb-5">
              Tell Us What You&apos;re Trying to Source
            </h2>
            <p className="home-lead mb-10">
              Share an existing part, drawing or application requirement. We&apos;ll help
              identify the next step.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="home-button home-button-primary">
                Discuss Your Requirement
              </Link>
              <Link href="/products" className="home-button home-button-secondary">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
