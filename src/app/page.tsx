import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HM Hydraulics — Technical Sourcing Partner for Hydraulic Components',
  description: 'From technical requirement to reliable delivery. HM Hydraulics sources, validates and delivers hydraulic rotary actuators, tilt actuators and selected hydraulic components.',
};

const processSteps = [
  { num: '01', title: 'Understand', desc: 'Requirement, application, constraints' },
  { num: '02', title: 'Source', desc: 'Identify matching component or solution' },
  { num: '03', title: 'Validate', desc: 'Technical review, drawings, testing' },
  { num: '04', title: 'Control', desc: 'Quality coordination and pre-shipment checks' },
  { num: '05', title: 'Deliver', desc: 'Shipping coordination and documentation' },
];

const solutions = [
  { label: 'Engineering', action: 'Select. Adapt. Validate.', desc: 'Component selection, cross-reference support and technical validation.' },
  { label: 'Supply', action: 'Plan. Produce. Control.', desc: 'Production planning, quality coordination and replenishment scheduling.' },
  { label: 'Delivery', action: 'Coordinate. Ship. Replenish.', desc: 'Shipping coordination, documentation and ongoing supply alignment.' },
];

const stats = [
  { value: '72+', label: 'Configurations', note: 'Across 9 rotary actuator series' },
  { value: '1M+', label: 'Cycle Validation*', note: 'Fatigue-tested configurations' },
  { value: '200,000', unit: 'Nm', label: 'Maximum Design Capability*', note: 'Largest configured actuator' },
  { value: '100%', label: 'Pre-Shipment Testing*', note: 'Pressure, function and leakage' },
];

const applications = [
  'Construction',
  'Mining & Heavy Equipment',
  'Marine',
  'Industrial Machinery',
  'Material Handling',
  'Specialized Equipment',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* 1. HERO — Asymmetrical Editorial Composition */}
      <section className="section-container pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          {/* Left: Massive typography */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-[1px] bg-[#A31919]"></span>
              <span className="font-label text-[11px] uppercase tracking-[0.14em] text-[#A31919]">Technical Sourcing Partner</span>
            </div>
            <h1 className="font-heading text-[clamp(42px,7vw,92px)] leading-[0.92] font-semibold text-[#0F0F0F] tracking-tight">
              <span className="block">TECHNICAL</span>
              <span className="block">SOURCING</span>
              <span className="block text-[#A31919]">PARTNER</span>
            </h1>
          </div>

          {/* Right: Secondary headline + supporting text */}
          <div className="lg:col-span-5 lg:pb-4">
            <div className="border-l border-[rgba(15,15,15,0.12)] pl-6 lg:pl-8">
              <p className="font-heading text-[clamp(24px,3vw,34px)] leading-[1.15] font-medium text-[#0F0F0F] mb-6">
                FOR HYDRAULIC<br />COMPONENTS
              </p>
              <p className="font-body text-[16px] leading-[1.65] text-[#6B6863] max-w-[360px]">
                From technical requirement to reliable delivery. We source, validate and deliver hydraulic rotary actuators, tilt actuators and selected components.
              </p>
              <div className="mt-8 flex items-center gap-6">
                <Link href="/contact" className="inline-flex items-center gap-2 home-bg-accent text-white font-label text-[12px] uppercase tracking-[0.08em] px-6 py-3 rounded hover:bg-[#8A1515] transition-colors duration-150 no-underline">
                  Start an Inquiry <ArrowRight size={14} />
                </Link>
                <Link href="/products" className="font-label text-[12px] uppercase tracking-[0.08em] text-[#0F0F0F] hover:text-[#A31919] transition-colors duration-150 no-underline">
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom technical bar */}
        <div className="mt-16 md:mt-24 pt-6 border-t border-[rgba(15,15,15,0.08)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.12em] text-[#6B6863] block mb-1">Core Product</span>
              <span className="font-heading text-[15px] font-medium text-[#0F0F0F]">Hydraulic Rotary Actuators</span>
            </div>
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.12em] text-[#6B6863] block mb-1">Torque Range</span>
              <span className="font-heading text-[15px] font-medium text-[#0F0F0F]">20 Nm – 200,000 Nm</span>
            </div>
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.12em] text-[#6B6863] block mb-1">Location</span>
              <span className="font-heading text-[15px] font-medium text-[#0F0F0F]">Qingdao, China</span>
            </div>
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.12em] text-[#6B6863] block mb-1">Model</span>
              <span className="font-heading text-[15px] font-medium text-[#0F0F0F]">Technical Sourcing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO — Horizontal Process */}
      <section className="section-container py-20 md:py-28 border-t border-[rgba(15,15,15,0.08)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.14em] text-[#A31919] block mb-3">What We Do</span>
            <h2 className="font-heading text-[clamp(28px,4vw,44px)] leading-[1.1] font-semibold text-[#0F0F0F]">
              From Requirement<br />to Delivery
            </h2>
          </div>
          <p className="font-body text-[16px] leading-[1.65] text-[#6B6863] max-w-[420px]">
            We connect your technical requirements to the right component, coordinating validation, quality and delivery through one sourcing point.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-[26px] left-[60px] right-[60px] h-[1px] bg-[rgba(15,15,15,0.10)]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
            {processSteps.map((step, idx) => (
              <div key={step.num} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-label text-[12px] text-[#A31919] tracking-[0.1em]">{step.num}</span>
                  <span className="font-heading text-[20px] md:text-[22px] font-semibold text-[#0F0F0F]">{step.title}</span>
                </div>
                <p className="font-body text-[14px] leading-[1.6] text-[#6B6863]">{step.desc}</p>
                {idx < processSteps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-5 left-0 w-8 h-[1px] bg-[rgba(15,15,15,0.10)]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR SOLUTIONS — Integrated Connected System */}
      <section className="section-container py-20 md:py-28 border-t border-[rgba(15,15,15,0.08)]">
        <div className="mb-14">
          <span className="font-label text-[11px] uppercase tracking-[0.14em] text-[#A31919] block mb-3">Our Solutions</span>
          <h2 className="font-heading text-[clamp(28px,4vw,44px)] leading-[1.1] font-semibold text-[#0F0F0F]">
            One Sourcing Point.<br />Three Coordinated Functions.
          </h2>
        </div>

        <div className="space-y-0 border-t border-[rgba(15,15,15,0.08)]">
          {solutions.map((sol, idx) => (
            <div key={sol.label} className="py-8 md:py-10 border-b border-[rgba(15,15,15,0.08)] group">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                <div className="md:col-span-3 flex items-center gap-4">
                  <span className="font-label text-[11px] text-[#A31919] tracking-[0.1em]">0{idx + 1}</span>
                  <h3 className="font-heading text-[24px] md:text-[28px] font-semibold text-[#0F0F0F]">{sol.label}</h3>
                </div>
                <div className="md:col-span-4">
                  <p className="font-heading text-[18px] md:text-[20px] font-medium text-[#0F0F0F]">{sol.action}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="font-body text-[15px] leading-[1.65] text-[#6B6863]">{sol.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3">
          <span className="font-label text-[11px] uppercase tracking-[0.12em] text-[#6B6863]">See the full approach</span>
          <ArrowRight size={14} className="text-[#A31919]" />
          <Link href="/solutions" className="font-label text-[11px] uppercase tracking-[0.12em] text-[#A31919] hover:text-[#8A1515] transition-colors duration-150 no-underline">
            Solutions
          </Link>
        </div>
      </section>

      {/* 4. CURRENT PRODUCT FOCUS — Visual Anchor */}
      <section className="section-container py-20 md:py-28 border-t border-[rgba(15,15,15,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Product typography + specs */}
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.14em] text-[#A31919] block mb-4">Current Product Focus</span>
            <h2 className="font-heading text-[clamp(36px,6vw,72px)] leading-[0.95] font-semibold text-[#0F0F0F] mb-8">
              HYDRAULIC<br />
              <span className="text-[#A31919]">ROTARY</span><br />
              ACTUATORS
            </h2>
            
            <div className="flex items-end gap-6 mb-8">
              <div>
                <span className="font-heading text-[clamp(48px,8vw,96px)] leading-[0.9] font-semibold text-[#0F0F0F]">20</span>
                <span className="font-label text-[12px] text-[#6B6863] ml-1">Nm</span>
              </div>
              <div className="pb-4 flex-1 h-[1px] bg-[rgba(15,15,15,0.12)] relative">
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 font-label text-[10px] text-[#A31919]">RANGE</span>
              </div>
              <div>
                <span className="font-heading text-[clamp(48px,8vw,96px)] leading-[0.9] font-semibold text-[#0F0F0F]">200,000</span>
                <span className="font-label text-[12px] text-[#6B6863] ml-1">Nm</span>
              </div>
            </div>

            <p className="font-body text-[16px] leading-[1.65] text-[#6B6863] max-w-[460px] mb-8">
              Nine series, 72 configurations. Helical, rack-and-pinion and specialty designs for construction, marine, industrial and heavy-equipment applications.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/products/rotary-actuators" className="inline-flex items-center gap-2 home-bg-accent text-white font-label text-[12px] uppercase tracking-[0.08em] px-5 py-3 rounded hover:bg-[#8A1515] transition-colors duration-150 no-underline">
                Browse Rotary Actuators <ArrowRight size={14} />
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 border border-[rgba(15,15,15,0.15)] text-[#0F0F0F] font-label text-[12px] uppercase tracking-[0.08em] px-5 py-3 rounded hover:bg-[rgba(163,25,25,0.05)] transition-colors duration-150 no-underline">
                All Products
              </Link>
            </div>
          </div>

          {/* Right: Product image */}
          <div className="relative">
            <div className="aspect-[4/3] relative bg-[#F0EEEA] rounded overflow-hidden">
              <Image
                src="/images/products/dkx-a.png"
                alt="Hydraulic rotary actuator DKX series"
                fill
                className="object-contain p-6 md:p-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-label text-[10px] uppercase tracking-[0.12em] text-[#6B6863]">DKX Series</span>
              <span className="font-label text-[10px] uppercase tracking-[0.12em] text-[#6B6863]">Helical Rotary Actuator</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EVIDENCE — Technical Data Composition */}
      <section className="section-container py-20 md:py-28 border-t border-[rgba(15,15,15,0.08)]">
        <div className="mb-14">
          <span className="font-label text-[11px] uppercase tracking-[0.14em] text-[#A31919] block mb-3">Evidence</span>
          <h2 className="font-heading text-[clamp(28px,4vw,44px)] leading-[1.1] font-semibold text-[#0F0F0F]">
            Technical Validation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[rgba(15,15,15,0.08)]">
          {stats.map((stat) => (
            <div key={stat.label} className="p-8 md:p-10 border-b border-r border-[rgba(15,15,15,0.08)]">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-heading text-[clamp(48px,6vw,72px)] leading-[0.9] font-semibold text-[#A31919]">{stat.value}</span>
                {stat.unit && <span className="font-heading text-[24px] font-medium text-[#0F0F0F]">{stat.unit}</span>}
              </div>
              <p className="font-heading text-[16px] md:text-[18px] font-medium text-[#0F0F0F] mb-2">{stat.label}</p>
              <p className="font-body text-[14px] leading-[1.6] text-[#6B6863]">{stat.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-body text-[13px] leading-[1.6] text-[#6B6863]">
          * Refer to product-specific documentation for detailed test conditions, qualifications and applicable configurations.
        </p>
      </section>

      {/* 6. APPLICATIONS — Technical Index */}
      <section className="section-container py-20 md:py-28 border-t border-[rgba(15,15,15,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-1">
            <span className="font-label text-[11px] uppercase tracking-[0.14em] text-[#A31919] block mb-3">Applications</span>
            <h2 className="font-heading text-[clamp(28px,4vw,44px)] leading-[1.1] font-semibold text-[#0F0F0F]">
              Where Our Components Are Used
            </h2>
          </div>

          <div className="lg:col-span-2">
            <div className="border-t border-[rgba(15,15,15,0.08)]">
              {applications.map((app, idx) => (
                <div key={app} className="flex items-baseline gap-6 py-4 border-b border-[rgba(15,15,15,0.08)] group">
                  <span className="font-label text-[12px] text-[#A31919] tracking-[0.1em] w-8">0{idx + 1}</span>
                  <span className="font-heading text-[18px] md:text-[22px] font-medium text-[#0F0F0F] group-hover:text-[#A31919] transition-colors duration-150">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA — Simple and Confident */}
      <section className="section-container py-24 md:py-32 border-t border-[rgba(15,15,15,0.08)]">
        <div className="max-w-[880px]">
          <h2 className="font-heading text-[clamp(32px,5vw,56px)] leading-[1.05] font-semibold text-[#0F0F0F] mb-8">
            Tell Us What You're<br />Trying to Source
          </h2>
          <p className="font-body text-[17px] leading-[1.65] text-[#6B6863] max-w-[520px] mb-10">
            Send your requirement, drawing or product reference. We'll review it and respond with a practical sourcing approach.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 home-bg-accent text-white font-label text-[13px] uppercase tracking-[0.08em] px-8 py-4 rounded hover:bg-[#8A1515] transition-colors duration-150 no-underline">
            Contact HM <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
