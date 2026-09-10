import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products — HM Hydraulics',
  description:
    'Hydraulic actuators and selected components. Technical sourcing solutions for demanding hydraulic applications.',
};

const products = [
  {
    name: 'Rotary Actuators',
    slug: 'rotary-actuators',
    badge: '9 Series · 72 Configurations',
    description:
      'Hydraulic rotary actuators covering 20 Nm to 200,000 Nm, with multiple mechanisms and rotation configurations.',
    specs: [
      'DKX-A through DKX-F helical gear series',
      'DT, TR, RT series',
      '20 Nm to 200,000 Nm torque range',
    ],
  },
  {
    name: 'Tilt Actuators',
    slug: 'tilt-actuators',
    badge: '19 Models',
    description:
      'Selected cross-reference solutions for excavator tilt and coupler applications.',
    specs: [
      'DTA Series — 12 models',
      'DTD Series — 7 models',
      'Comparable to HKS BVC/BVE, Helac PT',
    ],
  },
  {
    name: 'Other Hydraulic Components',
    slug: '/contact',
    badge: 'Hydraulic Cylinders · Motors · Valves',
    description:
      'Hydraulic cylinders, motors, and valves available through our component sourcing network.',
    specs: [
      'Hydraulic cylinders',
      'Hydraulic motors',
      'Hydraulic valves',
    ],
    isLink: true,
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">PRODUCT SOLUTIONS</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            Hydraulic Actuators & Selected Components
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            Technical sourcing solutions for demanding hydraulic applications, supported by
            qualified manufacturing capabilities and application-focused validation.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="group relative p-6 border border-[rgba(44,74,115,0.10)] bg-white rounded-md hover:border-[rgba(44,74,115,0.25)] transition-colors duration-150"
              >
                {product.name === 'Rotary Actuators' && (
                  <img
                    src="/hm-hydraulics/images/H4.png"
                    alt="Rotary actuator"
                    className="w-full h-48 object-contain mb-4 bg-[#FAFAF7] rounded"
                    loading="lazy"
                  />
                )}
                {product.name === 'Tilt Actuators' && (
                  <img
                    src="/hm-hydraulics/images/H5.png"
                    alt="Tilt actuator"
                    className="w-full h-48 object-contain mb-4 bg-[#FAFAF7] rounded"
                    loading="lazy"
                  />
                )}
                <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
                  {product.badge}
                </p>
                <h2 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                  {product.name}
                </h2>
                <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
                  {product.description}
                </p>

                <ul className="space-y-1.5 mb-5">
                  {product.specs.map((spec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-[#62666C]"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2C4A73] shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>

                {product.isLink ? (
                  <Link
                    href={product.slug}
                    className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline"
                  >
                    Discuss your requirement
                    <svg
                      className="ml-1.5 w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center text-sm font-medium text-[#2C4A73] no-underline hover:underline"
                  >
                    View details
                    <svg
                      className="ml-1.5 w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Reference Summary */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Compatibility</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Cross-Reference Guide
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-2xl mb-10">
            Cross-reference information is provided for evaluation purposes.
            Specifications are comparable to leading international brands &mdash; verify
            mounting dimensions and performance parameters before ordering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                DTA Series &harr; HKS
              </h3>
              <p className="text-sm text-[#4A4E54] mb-3">
                Comparable specifications to HKS BVC and BVE series tilt
                cylinders for excavator couplers.
              </p>
              <Link
                href="/products/tilt-actuators"
                className="text-sm font-medium text-[#2C4A73] no-underline hover:underline"
              >
                View cross-reference table &rarr;
              </Link>
            </div>
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                DTD Series &harr; Helac
              </h3>
              <p className="text-sm text-[#4A4E54] mb-3">
                Comparable specifications to Helac PT series tilt actuators.
                Verify dimensions before ordering.
              </p>
              <Link
                href="/products/tilt-actuators"
                className="text-sm font-medium text-[#2C4A73] no-underline hover:underline"
              >
                View cross-reference table &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
