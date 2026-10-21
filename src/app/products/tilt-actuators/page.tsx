import type { Metadata } from 'next';
import Link from 'next/link';
import { TiltRfqForm } from '@/components/hmr/tilt-rfq-form';
import { HMT_SERIES, type HmtSeries } from '@/lib/hmt/hmt-data';

export const metadata: Metadata = {
  title: 'Tilt Actuators',
  description:
    'HMT-A and HMT-D tilt motors for excavator couplers and bucket tilt. Factory-catalogue torque, angle and weight values; mounting interface confirmed on inquiry.',
  alternates: {
    canonical: '/products/tilt-actuators',
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: '/products' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tilt Actuators',
          item: '/products/tilt-actuators',
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'HM Hydraulics HMT Tilt Actuator Series',
      itemListElement: HMT_SERIES.map((s, i) => ({
        '@type': 'Product',
        name: s.title,
        description: s.description,
        image: s.image,
        brand: { '@type': 'Brand', name: 'HM Hydraulics' },
        position: i + 1,
      })),
    },
  ],
};

const TABLE_COLS = ['HM Model', 'Rotation', 'Driving torque', 'Holding torque', 'Weight'];

function renderCell(row: HmtSeries['rows'][number], col: string) {
  switch (col) {
    case 'HM Model':
      return row.model;
    case 'Rotation':
      return `${row.rotation}°`;
    case 'Driving torque':
      return `${row.drivingNm.toLocaleString()} Nm`;
    case 'Holding torque':
      return `${row.holdingNm.toLocaleString()} Nm`;
    case 'Weight':
      return `${row.weightKg} kg`;
    default:
      return null;
  }
}

export default function TiltActuatorsPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-[#62666C]">
            <Link href="/products" className="no-underline hover:text-[#2C4A73] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Tilt Actuators</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="relative border-b border-[rgba(44,74,115,0.10)]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/applications/excavator-tilt-coupler-assembly.jpg"
            alt="Excavator tilt coupler with rotary tilt actuator in workshop"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#0F0F0F]/55" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="eyebrow text-white/90 mb-4">Tilt Actuators</p>
          <h1 className="font-heading text-3xl md:text-5xl font-medium text-white mb-6">
            HMT Tilt Actuators
          </h1>
          <p className="text-lg text-white/90 max-w-[760px]">
            Tilt motor solutions for excavator couplers and bucket tilt. Two public series — HMT-A
            (12 frame sizes, 190 bar, 100°/140°/180° rotation options) and HMT-D (7 frame sizes,
            210 bar, high holding torque). Send us any existing part code for cross-reference.
          </p>
        </div>
      </section>

      {/* Overview cards */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {HMT_SERIES.map((series) => (
            <article
              key={series.code}
              className="rounded-xl border border-[rgba(44,74,115,0.10)] bg-[#FAFAF7] overflow-hidden"
            >
              <div className="bg-white p-6 md:p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={series.image}
                  alt={series.imageAlt}
                  className="w-full max-h-[280px] object-contain mx-auto"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8">
                <h2 className="font-heading text-xl md:text-2xl font-medium text-[#1B1E20] mb-2">
                  {series.title}
                </h2>
                <p className="text-[#5A6775] mb-4">{series.description}</p>
                <p className="text-sm text-[#62666C] italic border-l-2 border-[#2C4A73] pl-3">
                  {series.crossReference}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Specification tables */}
      {HMT_SERIES.map((series) => (
        <section
          key={series.code}
          id={`hmt-${series.code.toLowerCase()}`}
          className="border-t border-[rgba(44,74,115,0.10)] bg-[#FAFAF7]"
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
            <p className="eyebrow text-[#2C4A73] mb-2">Specification table</p>
            <h2 className="font-heading text-xl md:text-2xl font-medium text-[#1B1E20] mb-2">
              {series.title}
            </h2>
            <p className="text-sm text-[#62666C] mb-6">
              Factory-catalogue values. Mounting interface confirmed on inquiry.
            </p>
            <div className="overflow-x-auto rounded-xl border border-[rgba(44,74,115,0.10)] bg-white mb-8">
              <table className="min-w-full text-sm">
                <thead className="bg-[#F0F4FA] text-left">
                  <tr>
                    {TABLE_COLS.map((col) => (
                      <th key={col} className="px-4 py-3 font-medium text-[#1B1E20]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(44,74,115,0.08)]">
                  {series.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAF7]">
                      {TABLE_COLS.map((col) => (
                        <td key={col} className="px-4 py-3 text-[#4A4E54]">
                          {renderCell(row, col)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Cross-reference tables — compact, side-by-side on desktop */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-10 md:py-12">
          <p className="eyebrow text-[#2C4A73] mb-2">Cross-reference by frame class</p>
          <p className="text-sm text-[#62666C] mb-6">
            Cross-reference by frame class for evaluation; exact interchange confirmed against your
            unit tag and mounting drawing on inquiry.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {HMT_SERIES.map((series) => (
              <div
                key={series.code}
                className="overflow-x-auto rounded-xl border border-[rgba(44,74,115,0.10)] bg-[#FAFAF7]"
              >
                <table className="min-w-full text-sm">
                  <thead className="bg-[#F0F4FA] text-left">
                    <tr>
                      <th className="px-3 py-2 font-medium text-[#1B1E20]">HM Model</th>
                      <th className="px-3 py-2 font-medium text-[#1B1E20]">Comparable model</th>
                      <th className="px-3 py-2 font-medium text-[#1B1E20]">Carrier (t)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(44,74,115,0.08)]">
                    {series.crossRefs.map((cr, idx) => (
                      <tr key={idx} className="hover:bg-white">
                        <td className="px-3 py-2 text-[#1B1E20] font-medium whitespace-nowrap">{cr.hmModel}</td>
                        <td className="px-3 py-2 text-[#4A4E54]">
                          {cr.comparable}
                          {cr.notes ? (
                            <span className="block text-xs text-[#8A9199] mt-0.5">{cr.notes}</span>
                          ) : null}
                        </td>
                        <td className="px-3 py-2 text-[#4A4E54] whitespace-nowrap">{cr.carrierWeight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ordering note */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <h2 className="font-heading text-xl md:text-2xl font-medium text-[#1B1E20] mb-4">
            Ordering guidance
          </h2>
          <p className="text-[#4A4E54] leading-relaxed max-w-3xl">
            HMT order codes are configurable for quotation. The mounting interface, port orientation,
            and shaft details must be confirmed against your coupler drawings before release.
            Contact our engineering team with machine tonnage, required tilt angle, torque, and
            comparable reference.
          </p>
        </div>
      </section>

      {/* Combined engineering review / incoming-code lookup */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[800px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-4">
            Request an engineering review
          </h2>
          <p className="text-[#5A6775] mb-8">
            Tell us your machine type / tonnage, required tilt angle, torque or comparable model.
            If you have an existing tilt motor code — such as HKS BVC/BVE, Helac PowerTilt/PT, or
            another manufacturer reference — include it below and we will cross-check it against our
            HMT-A/D build options.
          </p>
          <TiltRfqForm />
        </div>
      </section>
    </main>
  );
}
