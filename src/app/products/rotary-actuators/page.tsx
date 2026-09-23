import type { Metadata } from 'next';
import Link from 'next/link';
import { RotaryGallery } from '@/components/products/rotary-gallery';

export const metadata: Metadata = {
  title: 'Rotary Actuators — HM Hydraulics',
  description:
    '9 series, 72 configurations of hydraulic rotary actuators. 100 Nm to 42,900 Nm standard torque range.',
};

const series = [
  {
    name: 'DKX-A',
    torqueMax: 22200,
    torque: '210 – 22,200 Nm',
    pressure: 'Up to 210 bar',
    rotation: '90° / 180° / 360°',
    applications: 'Robotic arms, horizontal & vertical moving tools, door/hatch actuation',
  },
  {
    name: 'DKX-B',
    torqueMax: 5870,
    torque: '508 – 5,870 Nm',
    pressure: 'Up to 210 bar',
    rotation: '180°',
    applications: 'Aerial work platforms, straight-arm & knuckle-arm swing mechanisms',
  },
  {
    name: 'DKX-C',
    torqueMax: 2825,
    torque: '190 – 2,825 Nm',
    pressure: 'Up to 210 bar',
    rotation: '180° / 360°',
    applications: 'Steering mechanisms, mechanical arms, manipulators',
  },
  {
    name: 'DKX-D',
    torqueMax: 42900,
    torque: '1,920 – 42,900 Nm',
    pressure: 'Up to 210 bar',
    rotation: '180° / 360°',
    applications: 'Tunnel drills, mining equipment, heavy-duty machinery rotation',
  },
  {
    name: 'DKX-E',
    torqueMax: 32000,
    torque: '125 – 32,000 Nm',
    pressure: 'Up to 135 bar',
    rotation: '90°',
    applications: 'Valve actuation — petrochemical, marine, industrial valves',
  },
  {
    name: 'DKX-F',
    torqueMax: 6780,
    torque: '2,830 – 6,780 Nm',
    pressure: 'Up to 210 bar',
    rotation: '220°',
    applications: 'Sanitation truck lifter systems, waste container tipping mechanisms',
  },
  {
    name: 'DT',
    torqueMax: 10000,
    torque: '500 – 10,000 Nm',
    pressure: 'Up to 210 bar',
    rotation: 'Up to 360° (multi-turn available)',
    applications: 'General-purpose rotation, valve operators, positioning systems',
  },
  {
    name: 'TR',
    torqueMax: 5000,
    torque: '100 – 5,000 Nm',
    pressure: 'Up to 210 bar',
    rotation: '90° / 180° / 270°',
    applications: 'Compact rotation, clamping, flipping mechanisms',
  },
  {
    name: 'RT',
    torqueMax: 20000,
    torque: '2,000 – 20,000 Nm',
    pressure: 'Up to 250 bar',
    rotation: 'Up to 360° (multi-turn available)',
    applications: 'Medium-duty multi-turn, damper controls, gate valves',
  },
];

const maxScale = Math.max(...series.map(s => s.torqueMax));

export default function RotaryActuatorsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-[#62666C]">
            <Link
              href="/products"
              className="no-underline text-[#62666C] hover:text-[#2C4A73] transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-[#1B1E20]">Rotary Actuators</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">ROTARY ACTUATORS</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            9 Series. 72 Configurations. One Sourcing Point.
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            Rotary actuator solutions covering 100 Nm to 42,900 Nm across nine standard series,
            with multiple mechanisms and rotation configurations for industrial applications.
          </p>
        </div>
      </section>

      {/* Series Overview */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="space-y-0">
            {series.map((item, index) => (
              <div
                key={item.name}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 border-b border-[rgba(44,74,115,0.08)] first:border-t"
              >
                {/* Series Name */}
                <div className="md:col-span-2">
                  <h3 className="font-heading text-lg font-medium text-[#1B1E20]">
                    {item.name}
                  </h3>
                </div>

                {/* Specs */}
                <div className="md:col-span-3">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                    Torque Range
                  </p>
                  <p className="text-sm text-[#1B1E20] font-medium">
                    {item.torque}
                  </p>
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1 mt-3">
                    Max Pressure
                  </p>
                  <p className="text-sm text-[#1B1E20]">{item.pressure}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                    Rotation
                  </p>
                  <p className="text-sm text-[#1B1E20]">{item.rotation}</p>
                </div>

                {/* Applications */}
                <div className="md:col-span-5">
                  <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-1">
                    Typical Applications
                  </p>
                  <p className="text-sm text-[#4A4E54] leading-relaxed">
                    {item.applications}
                  </p>
                </div>

                {/* Sequence number */}
                <div className="hidden md:block md:col-span-0" />
                <div className="sr-only">{String(index + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Image Gallery (Client Component) */}
      <RotaryGallery />

      {/* Torque Range Visual */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Coverage</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Torque Range Overview
          </h2>

          <div className="space-y-3">
            {series.map((item) => {
              const widthPercent = Math.max(3, (item.torqueMax / maxScale) * 100);
              return (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="font-label text-xs text-[#62666C] w-16 shrink-0 text-right">
                    {item.name}
                  </span>
                  <div className="flex-1 h-6 bg-[rgba(44,74,115,0.04)] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#2C4A73] rounded-sm transition-all duration-300"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#62666C] w-28 shrink-0">
                    {item.torque}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-[#62666C] max-w-3xl">
            Standard series cover 100 Nm to 42,900 Nm. Our manufacturing envelope extends up to
            200,000 Nm for engineered, non-standard builds — send the required torque and duty
            cycle and we confirm the configuration.
          </p>
        </div>
      </section>

      {/* Applications */ }
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow text-[#2C4A73] mb-4">APPLICATIONS</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Excavator',
              'Attachment',
              'Material Handling',
              'Agricultural',
              'Mining machinery',
            ].map((industry) => (
              <div
                key={industry}
                className="bg-white border border-[rgba(44,74,115,0.10)] rounded-lg p-5 text-center hover:border-[#2C4A73] transition-colors duration-200"
              >
                <h3 className="font-heading text-[#1B1E20] text-sm font-medium">
                  {industry}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-medium text-[#1B1E20] mb-3">
              Need detailed specifications?
            </h2>
            <p className="text-[#4A4E54] leading-relaxed mb-6">
              Request dimension drawings, performance curves, and application
              notes for any series. Our engineering team is ready to assist.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Request Documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
