import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Section 01 — Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#2C4A73] mb-6">
              TECHNICAL SOURCING FOR HYDRAULIC COMPONENTS
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight text-[#1B1E20] mb-6">
              Your Technical Sourcing Partner
              <br />
              <span className="text-[#2C4A73]">for Hydraulic Components</span>
            </h1>
            <p className="text-lg md:text-xl text-[#4A4E54] leading-relaxed max-w-2xl mb-4">
              We handle the supplier search, technical matching, quality verification and supply
              coordination — so you don't have to manage the sourcing process alone.
            </p>
            <p className="text-[#62666C] text-base leading-relaxed max-w-2xl mb-10">
              Built around qualified manufacturing partners, with technical oversight from inquiry
              to delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
              >
                Discuss Your Requirement
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center px-6 py-3 border border-[rgba(44,74,115,0.30)] text-[#2C4A73] text-sm font-medium rounded no-underline hover:bg-[rgba(44,74,115,0.05)] transition-colors duration-150"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 — What We Actually Do */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">HOW WE WORK</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            What We Actually Do
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            Finding a factory is easy. Finding the right one — and making sure it can reliably
            deliver what you need — is the harder part.
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                num: '01',
                title: 'Understand',
                desc: 'We clarify the application, technical requirements, quantities, delivery expectations and commercial priorities behind your requirement.',
              },
              {
                num: '02',
                title: 'Source',
                desc: 'We identify suitable manufacturing capabilities based on technical requirements, quality expectations and commercial needs.',
              },
              {
                num: '03',
                title: 'Validate',
                desc: 'We review specifications, drawings, dimensions, interfaces, materials and performance requirements before production.',
              },
              {
                num: '04',
                title: 'Control',
                desc: 'We coordinate production, inspection, testing and documentation throughout the supply process.',
              },
              {
                num: '05',
                title: 'Deliver',
                desc: 'We coordinate packaging, transportation and delivery so the process continues through to the customer\'s receiving point.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6"
              >
                <span className="font-label text-[#2C4A73] text-xs font-medium mb-2 block">
                  {step.num}
                </span>
                <h3 className="font-heading text-[#1B1E20] text-base font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-[#4A4E54] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[#4A4E54] text-base leading-relaxed max-w-[680px] mt-10">
            You don't need to manage multiple factories, verify every drawing yourself, or chase
            production updates. We coordinate the process for you.
          </p>
        </div>
      </section>

      {/* Section 03 — Our Solutions */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">OUR SOLUTIONS</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Our Solutions
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            Different sourcing requirements need different levels of support. From selecting an
            existing component to developing a customized solution and coordinating ongoing supply,
            we help manage the process from requirement to delivery.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Engineering */}
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <p className="eyebrow text-[#2C4A73] mb-3">ENGINEERING SUPPORT</p>
              <h3 className="font-heading text-[#1B1E20] text-xl font-medium mb-3">
                Select. Adapt. Validate.
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed mb-6">
                The right component starts with the right specification. We support application
                review, component selection, cross-reference and technical clarification before
                production begins.
              </p>
              <ul className="space-y-2">
                {[
                  'Component Selection',
                  'Custom Engineering',
                  'Technical Validation',
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[#4A4E54] text-sm flex items-start gap-2"
                  >
                    <span className="text-[#2C4A73] mt-1.5 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Supply */}
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <p className="eyebrow text-[#2C4A73] mb-3">SUPPLY PLANNING</p>
              <h3 className="font-heading text-[#1B1E20] text-xl font-medium mb-3">
                Plan. Produce. Control.
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed mb-6">
                For recurring requirements, we can coordinate production planning, manufacturing,
                inspection and replenishment schedules to improve delivery predictability and reduce
                supply interruptions.
              </p>
              <ul className="space-y-2">
                {[
                  'Production Planning',
                  'Manufacturing Coordination',
                  'Supply Continuity',
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[#4A4E54] text-sm flex items-start gap-2"
                  >
                    <span className="text-[#2C4A73] mt-1.5 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery */}
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <p className="eyebrow text-[#2C4A73] mb-3">DELIVERY SOLUTIONS</p>
              <h3 className="font-heading text-[#1B1E20] text-xl font-medium mb-3">
                Coordinate. Ship. Replenish.
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed mb-6">
                We coordinate transportation and delivery solutions based on shipment size, urgency,
                destination and commercial requirements.
              </p>
              <ul className="space-y-2">
                {[
                  'Shipping Options',
                  'Delivery Terms',
                  'Shipment Coordination',
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[#4A4E54] text-sm flex items-start gap-2"
                  >
                    <span className="text-[#2C4A73] mt-1.5 shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/solutions"
              className="inline-flex items-center text-[#2C4A73] text-sm font-medium no-underline hover:text-[#1E3A5F] transition-colors duration-150"
            >
              Learn more about our solutions
              <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 04 — Current Product Focus */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">PRODUCT FOCUS</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Current Product Focus
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            Our current focus is hydraulic rotary actuators, supported by selected actuator and
            hydraulic component solutions for demanding industrial applications.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <p className="eyebrow text-[#2C4A73] mb-2">CORE PRODUCT</p>
              <h3 className="font-heading text-[#1B1E20] text-xl font-medium mb-3">
                Rotary Actuators
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed mb-6">
                Rotary actuator solutions covering compact positioning applications through
                high-torque industrial rotation, with multiple torque ranges, mechanisms and
                rotation configurations.
              </p>
              <Link
                href="/products/rotary-actuators"
                className="inline-flex items-center text-[#2C4A73] text-sm font-medium no-underline hover:text-[#1E3A5F] transition-colors duration-150"
              >
                Explore Rotary Actuators
                <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <p className="eyebrow text-[#2C4A73] mb-2">CROSS-REFERENCE</p>
              <h3 className="font-heading text-[#1B1E20] text-xl font-medium mb-3">
                Tilt Actuators
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed mb-6">
                Selected cross-reference solutions for excavator tilt and coupler applications, with
                application-specific verification before replacement.
              </p>
              <Link
                href="/products/tilt-actuators"
                className="inline-flex items-center text-[#2C4A73] text-sm font-medium no-underline hover:text-[#1E3A5F] transition-colors duration-150"
              >
                View Tilt Actuators
                <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-8">
              <p className="eyebrow text-[#2C4A73] mb-2">CUSTOM SOLUTIONS</p>
              <h3 className="font-heading text-[#1B1E20] text-xl font-medium mb-3">
                Custom Hydraulic Components
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed mb-6">
                Custom hydraulic components can be developed around existing drawings, components or
                application requirements through qualified manufacturing capabilities.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-[#2C4A73] text-sm font-medium no-underline hover:text-[#1E3A5F] transition-colors duration-150"
              >
                Discuss a Custom Requirement
                <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05 — Why Work With HM */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">WHY HM</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-12">
            Why Work With HM
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Lower Sourcing Risk
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Technical validation before you commit. We help verify specifications,
                compatibility, manufacturing capability and quality requirements before production.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                More Reliable Supply
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                A managed supply process, not just a factory contact. We coordinate production,
                inspection, documentation and delivery through qualified manufacturing capabilities.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-[#1B1E20] text-lg font-medium mb-3">
                Better Total Cost
              </h3>
              <p className="text-[#4A4E54] text-sm leading-relaxed">
                Competitive sourcing without sacrificing technical control. We help balance
                manufacturing cost, capability, quality and delivery requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 06 — Quality & Technical Validation */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">QUALITY EVIDENCE</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Quality & Technical Validation
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            Quality is not something we check only at the end. Technical requirements, manufacturing
            coordination and pre-shipment verification are part of the sourcing process.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '1M+', label: 'Cycle Validation', note: 'Selected models' },
              { value: '72+', label: 'Configurations' },
              { value: '200,000 Nm', label: 'Max Design Capability' },
              { value: '100%', label: 'Pre-Shipment Testing' },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6"
              >
                <div className="font-heading text-[#2C4A73] text-2xl md:text-3xl font-medium mb-1">
                  {metric.value}
                </div>
                <div className="text-[#1B1E20] text-sm font-medium mb-1">{metric.label}</div>
                {metric.note && (
                  <div className="text-[#62666C] text-xs">{metric.note}</div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F0] border border-[rgba(44,74,115,0.10)] rounded-lg p-8 md:p-10">
            <p className="text-[#4A4E54] leading-relaxed">
              A selected actuator model completed an independently conducted full-load fatigue test
              at 150 bar for 1,000,000 cycles, with zero actuator failures recorded.
            </p>
            <p className="text-[#62666C] text-sm mt-3">
              Test documentation available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* Section 07 — Where Our Components Are Used */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-3">APPLICATIONS</p>
          <h2 className="font-heading text-[#1B1E20] text-3xl md:text-4xl font-medium mb-4">
            Where Our Components Are Used
          </h2>
          <p className="text-[#4A4E54] text-lg leading-relaxed max-w-[680px] mb-12">
            Hydraulic actuators are application-specific components. We focus on understanding the
            equipment and operating conditions behind each requirement.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Construction Equipment',
              'Mining & Heavy Equipment',
              'Marine Equipment',
              'Industrial Machinery',
              'Material Handling',
              'Specialized Equipment',
            ].map((app) => (
              <div
                key={app}
                className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-6"
              >
                <h3 className="font-heading text-[#1B1E20] text-base font-medium">{app}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 08 — Final CTA */}
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
