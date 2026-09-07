import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Technical & After-Sales Support — HM Hydraulics',
  description:
    'Technical support and after-sales service for hydraulic actuators. Documentation, warranty coordination, replacement support, and supply coordination.',
};

const supportCapabilities = [
  {
    title: 'Technical Support',
    description: 'Application and technical questions after delivery.',
  },
  {
    title: 'Documentation',
    description:
      'Drawings, manuals, test records and relevant technical documents can be provided as required.',
  },
  {
    title: 'Warranty Coordination',
    description:
      'We coordinate technical review and communication when a warranty issue arises.',
  },
  {
    title: 'Replacement Support',
    description:
      'We help review replacement requirements and coordinate the appropriate solution when required.',
  },
  {
    title: 'Spare Parts',
    description:
      'Service parts and replacement components can be coordinated based on the product and application.',
  },
  {
    title: 'Service Kits',
    description:
      'Maintenance components can be coordinated for supported products and applications.',
  },
];

const supportSteps = [
  {
    number: '01',
    title: 'Request',
    description: 'Tell us what you need help with.',
  },
  {
    number: '02',
    title: 'Technical Review',
    description: 'We review the product, application or issue.',
  },
  {
    number: '03',
    title: 'Coordination',
    description:
      'We coordinate the appropriate technical, manufacturing or supply response.',
  },
  {
    number: '04',
    title: 'Resolution',
    description: 'We follow through on the agreed next step.',
  },
];

export default function SupportPage() {
  return (
    <>
      {/* 01 — Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="eyebrow text-[#2C4A73] mb-4">
            TECHNICAL & AFTER-SALES SUPPORT
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-5">
            Support Beyond the Purchase Order
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl mb-8">
            From technical questions and documentation to warranty coordination
            and replacement support, we stay involved when support is required.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
          >
            Contact HM
          </Link>
        </div>
      </section>

      {/* 02 — Support Capabilities */}
      <section className="border-b border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
            Support Capabilities
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-2xl mb-12">
            Practical support for technical questions, documentation and
            post-purchase requirements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCapabilities.map((capability) => (
              <div
                key={capability.title}
                className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md"
              >
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                  {capability.title}
                </h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — How Support Works */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-12">
            How Support Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md"
              >
                <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                  {step.number}
                </p>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4A4E54] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Final CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
              Need Support?
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              Tell us what you need help with.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
              >
                Contact HM
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center px-5 py-2.5 border border-[rgba(44,74,115,0.25)] text-[#2C4A73] text-sm font-medium rounded no-underline hover:bg-[rgba(44,74,115,0.04)] transition-colors duration-150"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
