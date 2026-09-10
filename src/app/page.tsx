import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "HM Hydraulics | Technical Sourcing Partner for Hydraulic Components",
  description:
    "HM Hydraulics helps OEMs source hydraulic rotary actuators, tilt actuators and precision hydraulic components from qualified Chinese manufacturing capabilities.",
};

export default function HomePage() {
  return (
    <main className="font-body">
      {/* Hero */}
      <section className="home-section relative min-h-screen flex items-center">
        <img
          src="/images/H10.2.jpg"
          alt="Industrial hydraulic components"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[#0F0F0F]/65" />
        <div className="home-container relative z-10 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="home-eyebrow-v2 home-eyebrow-light mb-6 md:mb-8">
              Qingdao Hydraulic Machinery Co., Ltd.
            </p>
            <h1 className="home-hero-title mb-6 md:mb-8">
              Technical sourcing partner,{" "}
              <span className="text-white/90">not just a supplier.</span>
            </h1>
            <p className="home-hero-subtitle text-lg md:text-xl lg:text-2xl font-medium mb-6 md:mb-8 max-w-2xl">
              Rotary actuators, tilt actuators and core hydraulic components — sourced, validated and coordinated for OEMs worldwide.
            </p>
            <p className="home-hero-lead max-w-2xl mb-10 md:mb-12">
              From technical requirement to delivery, we bridge customer specifications with qualified manufacturing capability in China.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="home-button home-button-primary"
              >
                Tell us what you&apos;re trying to source
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/solutions"
                className="home-button home-button-secondary-light"
              >
                Explore Solutions
              </Link>
            </div>
            <p className="home-hero-caption mt-10 md:mt-14 max-w-2xl">
              Serving industrial OEMs across construction machinery, material handling, marine deck equipment, renewable energy and agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do — Core Process */}
      <section className="home-section home-section-alt">
        <div className="home-container home-section-padding">
          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="home-eyebrow-v2 mb-5">What We Do</p>
            <h2 className="home-title home-title-lg mb-6 md:mb-8">
              A structured approach to sourcing hydraulic components.
            </h2>
            <p className="home-lead">
              We do not simply pass orders through. We translate engineering requirements into manufacturable outcomes, coordinate validation, and follow parts through to delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {[
              {
                num: "01",
                title: "Understand",
                desc: "Capture application requirements, operating conditions and quality expectations.",
              },
              {
                num: "02",
                title: "Source",
                desc: "Match specifications to the right manufacturing process and facility.",
              },
              {
                num: "03",
                title: "Validate",
                desc: "Confirm drawings, tolerances, materials and testing protocols before production.",
              },
              {
                num: "04",
                title: "Control",
                desc: "Monitor production, inspection and documentation throughout the run.",
              },
              {
                num: "05",
                title: "Deliver",
                desc: "Coordinate final inspection, packaging and shipment to your specification.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="home-card home-card-hover home-process-step home-card-inner"
              >
                <span className="home-process-number">{step.num}</span>
                <h3 className="font-heading text-lg md:text-xl font-medium text-[#0F0F0F] mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#6B6863]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solutions */}
      <section className="home-section">
        <div className="home-container home-section-padding">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <p className="home-eyebrow-v2 mb-5">Our Solutions</p>
              <h2 className="home-title home-title-lg">
                Engineering, supply planning and delivery coordination.
              </h2>
            </div>
            <Link href="/solutions" className="home-link shrink-0">
              Explore Solutions
              <ArrowRight />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Engineering Support",
                desc: "Technical review, component selection and drawing clarification to make sure the design is manufacturable.",
              },
              {
                title: "Supply Planning",
                desc: "Production scheduling, capacity alignment and order coordination across qualified facilities.",
              },
              {
                title: "Delivery Coordination",
                desc: "Inspection alignment, packaging requirements and shipment scheduling to your destination.",
              },
            ].map((sol) => (
              <div
                key={sol.title}
                className="home-card home-card-hover home-card-inner"
              >
                <h3 className="font-heading text-xl font-medium text-[#0F0F0F] mb-4">
                  {sol.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#6B6863]">
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Product Focus */}
      <section className="home-section home-section-alt-2">
        <div className="home-container home-section-padding">
          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="home-eyebrow-v2 mb-5">Current Product Focus</p>
            <h2 className="home-title home-title-lg mb-6 md:mb-8">
              Two core actuator families plus selected hydraulic components.
            </h2>
            <p className="home-lead">
              Our sourcing and technical coordination is centered on rotary actuators, tilt actuators and complementary hydraulic components used in mobile and industrial equipment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="home-card home-card-hover overflow-hidden">
              <div className="home-image-container h-64 md:h-80 bg-[#FAFAF7] border-0 rounded-none">
                <img
                  src="/images/H4.png"
                  alt="Rotary actuators"
                  className="w-full h-full object-contain p-6"
                />
              </div>
              <div className="home-card-inner">
                <h3 className="font-heading text-2xl font-medium text-[#0F0F0F] mb-3">
                  Rotary Actuators
                </h3>
                <p className="text-[15px] leading-relaxed text-[#6B6863] mb-6">
                  Helical-spline and rack-and-pinion rotary actuators for applications from 12,000 Nm to 200,000 Nm.
                </p>
                <Link href="/products/rotary-actuators" className="home-link">
                  View Rotary Actuators
                  <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="home-card home-card-hover overflow-hidden">
              <div className="home-image-container h-64 md:h-80 bg-[#FAFAF7] border-0 rounded-none">
                <img
                  src="/images/H5.png"
                  alt="Tilt actuators"
                  className="w-full h-full object-contain p-6"
                />
              </div>
              <div className="home-card-inner">
                <h3 className="font-heading text-2xl font-medium text-[#0F0F0F] mb-3">
                  Tilt Actuators
                </h3>
                <p className="text-[15px] leading-relaxed text-[#6B6863] mb-6">
                  DTA and DTD series tilt motors for forklift mast tilting, bucket positioning and similar hydraulic functions.
                </p>
                <Link href="/products/tilt-actuators" className="home-link">
                  View Tilt Actuators
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With HM */}
      <section className="home-section home-section-alt">
        <div className="home-container home-section-padding">
          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="home-eyebrow-v2 mb-5">Why Work With HM</p>
            <h2 className="home-title home-title-lg mb-6 md:mb-8">
              Lower risk. Real cost control. Technical clarity.
            </h2>
            <p className="home-lead">
              We help OEMs reduce the uncertainty that comes with sourcing engineered components from a manufacturing network they do not manage directly.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            {[
              {
                title: "Technical Translation",
                desc: "We convert your requirements into clear manufacturing instructions and inspection criteria.",
              },
              {
                title: "Qualified Network",
                desc: "Access to facilities with relevant machining, assembly and testing capabilities for hydraulic components.",
              },
              {
                title: "Transparent Process",
                desc: "Regular updates, documented inspections and traceability through production and shipment.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="home-card home-card-hover home-card-inner"
              >
                <h3 className="font-heading text-xl font-medium text-[#0F0F0F] mb-4">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#6B6863]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="home-card p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "72+", label: "Rotary actuator configurations" },
                { value: "1M+", label: "Cycle validation reference" },
                { value: "200,000", label: "Nm manufacturing envelope" },
                { value: "100%", label: "Pre-shipment testing protocol" },
              ].map((metric) => (
                <div key={metric.label} className="text-center md:text-left">
                  <p className="home-metric-value">{metric.value}</p>
                  <p className="home-metric-label">{metric.label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6B6863] mt-10 md:mt-12 pt-6 border-t border-[rgba(15,15,15,0.08)]">
              *1M+ cycle validation and 100% pre-shipment testing refer to HM&apos;s internal quality protocols applied to sourced components. Actual figures depend on product family and customer specification.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="home-section">
        <div className="home-container home-section-padding">
          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="home-eyebrow-v2 mb-5">Applications</p>
            <h2 className="home-title home-title-lg mb-6 md:mb-8">
              Components used where reliability matters.
            </h2>
            <p className="home-lead">
              The parts we source are used in equipment where consistent performance under load is expected.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-24">
            <div className="home-image-container h-72 md:h-96">
              <img
                src="/images/H10.3.jpg"
                alt="Hydraulic component application"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="home-image-container h-72 md:h-96">
              <img
                src="/images/H10.4.jpg"
                alt="Hydraulic component application"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Construction machinery",
              "Material handling",
              "Marine & offshore",
              "Agriculture equipment",
              "Renewable energy",
              "Mining equipment",
              "Industrial automation",
              "Forestry machinery",
            ].map((app) => (
              <div
                key={app}
                className="home-app-card text-center font-medium text-[#0F0F0F] text-sm"
              >
                {app}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-section home-section-white">
        <div className="home-container home-section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <p className="home-eyebrow-v2 mb-6 md:mb-8">Start a Sourcing Discussion</p>
            <h2 className="home-title home-title-xl mb-8 md:mb-10">
              Tell us what you&apos;re trying to source.
            </h2>
            <p className="home-lead mx-auto mb-10 md:mb-12">
              Share your specification, application or target cost structure. We&apos;ll review feasibility and outline a sourcing approach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="home-button home-button-primary"
              >
                Request a Technical Review
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="home-button home-button-secondary"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
