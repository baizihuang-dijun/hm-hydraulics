import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Hydraulic rotary actuators, tilt actuators, and core hydraulic components. 9 series, 72 specifications covering 20Nm to 200,000Nm.',
};

const products = [
  {
    name: 'Tilt Actuators',
    slug: 'tilt-actuators',
    badge: '19 Models',
    description:
      'DTA Series: 12 models for excavator tilt couplers with HKS BVC/BVE cross-reference. DTD Series: 7 models with Helac PT compatibility.',
    specs: [
      'DTA Series — 12 models',
      'DTD Series — 7 models',
      'Cross-reference: HKS BVC/BVE, Helac PT',
      'For excavator tilt couplers',
    ],
  },
  {
    name: 'Rotary Actuators',
    slug: 'rotary-actuators',
    badge: '9 Series · 72 Specs',
    description:
      'Comprehensive range from DKX-A through DKX-F, plus DT, TR, and RT series. Covering 20Nm to 200,000Nm for industrial, mining, marine, and defense applications.',
    specs: [
      'DKX-A, DKX-B, DKX-C, DKX-D, DKX-E, DKX-F',
      'DT, TR, RT series',
      '20 Nm to 200,000 Nm torque range',
      'Helical gear & rack-pinion mechanisms',
    ],
  },
  {
    name: 'Slew Drives',
    slug: 'slew-drives',
    badge: 'Coming Soon',
    description:
      'Precision slew drives for rotational positioning applications. Expanding our product range to complement our actuator lineup.',
    specs: ['Precision worm gear drives', 'High torque output', 'Compact design'],
    comingSoon: true,
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Product Catalog</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            Hydraulic Actuators & Components
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            Engineered and manufactured for demanding industrial applications.
            From compact tilt actuators to high-torque rotary units covering
            20Nm to 200,000Nm.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.slug}
                className={`group relative p-8 border rounded-md transition-colors duration-150 ${
                  product.comingSoon
                    ? 'border-[rgba(44,74,115,0.08)] bg-[#FAFAF7] opacity-60'
                    : 'border-[rgba(44,74,115,0.10)] bg-white hover:border-[rgba(44,74,115,0.25)]'
                }`}
              >
                <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-4">
                  {product.badge}
                </p>
                <h2 className="font-heading text-xl font-medium text-[#1B1E20] mb-3">
                  {product.name}
                </h2>
                <p className="text-sm text-[#4A4E54] leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Specs list */}
                <ul className="space-y-2 mb-6">
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

                {!product.comingSoon ? (
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
                ) : (
                  <span className="text-sm text-[#62666C]">
                    Coming soon
                  </span>
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
            Our products are designed as direct replacements for leading
            international brands. Verify compatibility with your existing
            systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2">
                DTA Series &harr; HKS
              </h3>
              <p className="text-sm text-[#4A4E54] mb-3">
                Direct cross-reference with HKS BVC and BVE series tilt
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
                Compatible with Helac PT series tilt actuators. Drop-in
                replacement for existing installations.
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
