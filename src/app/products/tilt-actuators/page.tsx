import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tilt Actuators — HM Hydraulics',
  description:
    'DTA Series (12 models) and DTD Series (7 models) tilt actuators for excavator tilt couplers. Comparable specifications to HKS BVC/BVE and Helac PT.',
};

const dtaModels = [
  { model: 'DTA-20', hksRef: 'BVC 20 / BVE 20', torque: '20 kNm', weight: '45 kg', mountPattern: 'M1' },
  { model: 'DTA-30', hksRef: 'BVC 30 / BVE 30', torque: '30 kNm', weight: '62 kg', mountPattern: 'M1' },
  { model: 'DTA-40', hksRef: 'BVC 40 / BVE 40', torque: '40 kNm', weight: '78 kg', mountPattern: 'M2' },
  { model: 'DTA-50', hksRef: 'BVC 50 / BVE 50', torque: '50 kNm', weight: '95 kg', mountPattern: 'M2' },
  { model: 'DTA-60', hksRef: 'BVC 60 / BVE 60', torque: '60 kNm', weight: '110 kg', mountPattern: 'M2' },
  { model: 'DTA-80', hksRef: 'BVC 80 / BVE 80', torque: '80 kNm', weight: '138 kg', mountPattern: 'M3' },
  { model: 'DTA-100', hksRef: 'BVC 100 / BVE 100', torque: '100 kNm', weight: '165 kg', mountPattern: 'M3' },
  { model: 'DTA-120', hksRef: 'BVC 120 / BVE 120', torque: '120 kNm', weight: '190 kg', mountPattern: 'M3' },
  { model: 'DTA-150', hksRef: 'BVC 150 / BVE 150', torque: '150 kNm', weight: '225 kg', mountPattern: 'M4' },
  { model: 'DTA-180', hksRef: 'BVC 180 / BVE 180', torque: '180 kNm', weight: '260 kg', mountPattern: 'M4' },
  { model: 'DTA-200', hksRef: 'BVC 200 / BVE 200', torque: '200 kNm', weight: '295 kg', mountPattern: 'M4' },
  { model: 'DTA-250', hksRef: 'BVC 250 / BVE 250', torque: '250 kNm', weight: '340 kg', mountPattern: 'M5' },
];

const dtdModels = [
  { model: 'DTD-30', helacRef: 'PT-30', torque: '30 kNm', weight: '58 kg', pressure: '250 bar' },
  { model: 'DTD-50', helacRef: 'PT-50', torque: '50 kNm', weight: '88 kg', pressure: '250 bar' },
  { model: 'DTD-80', helacRef: 'PT-80', torque: '80 kNm', weight: '130 kg', pressure: '280 bar' },
  { model: 'DTD-100', helacRef: 'PT-100', torque: '100 kNm', weight: '158 kg', pressure: '280 bar' },
  { model: 'DTD-120', helacRef: 'PT-120', torque: '120 kNm', weight: '182 kg', pressure: '300 bar' },
  { model: 'DTD-150', helacRef: 'PT-150', torque: '150 kNm', weight: '218 kg', pressure: '300 bar' },
  { model: 'DTD-200', helacRef: 'PT-200', torque: '200 kNm', weight: '285 kg', pressure: '320 bar' },
];

export default function TiltActuatorsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-[#62666C]">
            <Link href="/products" className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Tilt Actuators</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hm-hydraulics/images/TA1.jpg"
            alt="Tilt actuator in manufacturing facility"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#1B1E20]/60" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-white/70 mb-4">TILT ACTUATORS</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4">
            For Excavator Tilt Couplers
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
            19 models across two series, with specifications comparable to leading international brands.
            Final model selection should be verified against your existing mounting dimensions and operating parameters.
          </p>
        </div>
      </section>

      {/* DTA Series */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="mb-10">
            <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
              Series 01
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
              DTA Series
            </h2>
            <p className="text-[#4A4E54] leading-relaxed max-w-2xl">
              12 models with specifications comparable to the HKS BVC and BVE series.
              Cross-reference provided for evaluation purposes — verify mounting dimensions and performance parameters before ordering.
            </p>
          </div>

          {/* DTA Product Image */}
          <div className="mb-10 border border-[rgba(44,74,115,0.10)] rounded-lg bg-white p-8 flex items-center justify-center min-h-[320px]">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto bg-[#F5F5F2] rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-105">
                <img
                  src="/hm-hydraulics/images/H5.png"
                  alt="DTA Series Tilt Actuator - Tilt Motor V2"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="font-label text-sm text-[#62666C]">DTA Series — Tilt Motor V2</p>
            </div>
          </div>

          {/* DTA Table */}
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <div className="inline-block min-w-full px-6 md:px-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(44,74,115,0.15)]">
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      HM Model
                    </th>
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      HKS Cross-Ref
                    </th>
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      Torque
                    </th>
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      Weight
                    </th>
                    <th className="text-left py-3 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      Mount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dtaModels.map((item) => (
                    <tr
                      key={item.model}
                      className="border-b border-[rgba(44,74,115,0.06)] hover:bg-[rgba(44,74,115,0.02)] transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium text-[#1B1E20]">
                        {item.model}
                      </td>
                      <td className="py-3 pr-4 text-[#4A4E54]">
                        {item.hksRef}
                      </td>
                      <td className="py-3 pr-4 text-[#4A4E54]">
                        {item.torque}
                      </td>
                      <td className="py-3 pr-4 text-[#4A4E54]">
                        {item.weight}
                      </td>
                      <td className="py-3 text-[#62666C]">
                        {item.mountPattern}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* DTD Series */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="mb-10">
            <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">
              Series 02
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-3">
              DTD Series
            </h2>
            <p className="text-[#4A4E54] leading-relaxed max-w-2xl">
              7 models with specifications comparable to the Helac PT series.
              Cross-reference provided for evaluation — verify mounting patterns and operating parameters before ordering.
            </p>
          </div>

          {/* DTD Product Image */}
          <div className="mb-10 border border-[rgba(44,74,115,0.10)] rounded-lg bg-[#FAFAF7] p-8 flex items-center justify-center min-h-[320px]">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto bg-[#F5F5F2] rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-105">
                <img
                  src="/hm-hydraulics/images/H5.png"
                  alt="DTD Series Tilt Actuator - Tilt Motor V1"
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <p className="font-label text-sm text-[#62666C]">DTD Series — Tilt Motor V1</p>
            </div>
          </div>

          {/* DTD Table */}
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <div className="inline-block min-w-full px-6 md:px-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(44,74,115,0.15)]">
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      HM Model
                    </th>
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      Helac Cross-Ref
                    </th>
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      Torque
                    </th>
                    <th className="text-left py-3 pr-4 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      Weight
                    </th>
                    <th className="text-left py-3 font-label text-xs uppercase tracking-wider text-[#62666C] font-medium">
                      Max Pressure
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dtdModels.map((item) => (
                    <tr
                      key={item.model}
                      className="border-b border-[rgba(44,74,115,0.06)] hover:bg-[rgba(44,74,115,0.02)] transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium text-[#1B1E20]">
                        {item.model}
                      </td>
                      <td className="py-3 pr-4 text-[#4A4E54]">
                        {item.helacRef}
                      </td>
                      <td className="py-3 pr-4 text-[#4A4E54]">
                        {item.torque}
                      </td>
                      <td className="py-3 pr-4 text-[#4A4E54]">
                        {item.weight}
                      </td>
                      <td className="py-3 text-[#62666C]">
                        {item.pressure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Assembly Manual CTA */}
          <div className="mt-10 p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-[#FAFAF7]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-1">
                  DTD Assembly & Maintenance Manual
                </h3>
                <p className="text-sm text-[#4A4E54]">
                  Detailed installation guide, maintenance procedures, and
                  troubleshooting reference.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150 whitespace-nowrap"
              >
                Request Manual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-3">
              Need help selecting the right model?
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              Share your application requirements and our engineering team will
              recommend the optimal configuration.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Contact Engineering
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
