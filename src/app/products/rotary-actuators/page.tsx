'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Rotary Actuators',
  description:
    '9 series, 72 specifications of hydraulic rotary actuators. DKX-A through DKX-F, DT, TR, RT series. Covering 20Nm to 200,000Nm.',
};

const series = [
  {
    name: 'DKX-A',
    type: 'Helical Gear',
    torque: '20 – 800 Nm',
    pressure: 'Up to 210 bar',
    rotation: 'Up to 360°',
    applications: 'Light-duty positioning, valve actuation, small manipulators',
  },
  {
    name: 'DKX-B',
    type: 'Helical Gear',
    torque: '200 – 3,000 Nm',
    pressure: 'Up to 210 bar',
    rotation: 'Up to 270° / 360°',
    applications: 'Medium-duty rotation, indexing tables, material handling',
  },
  {
    name: 'DKX-C',
    type: 'Helical Gear',
    torque: '1,000 – 12,000 Nm',
    pressure: 'Up to 250 bar',
    rotation: 'Up to 270° / 360°',
    applications: 'Heavy-duty positioning, crane rotation, conveyor diverters',
  },
  {
    name: 'DKX-D',
    type: 'Helical Gear',
    torque: '5,000 – 25,000 Nm',
    pressure: 'Up to 280 bar',
    rotation: 'Up to 270° / 360°',
    applications: 'Mining equipment, excavator attachments, industrial mixers',
  },
  {
    name: 'DKX-E',
    type: 'Helical Gear',
    torque: '15,000 – 60,000 Nm',
    pressure: 'Up to 300 bar',
    rotation: 'Up to 270° / 360°',
    applications: 'Large excavator rotation, marine deck machinery, defense systems',
  },
  {
    name: 'DKX-F',
    type: 'Helical Gear',
    torque: '40,000 – 200,000 Nm',
    pressure: 'Up to 350 bar',
    rotation: 'Up to 270° / 360°',
    applications: 'Extreme-duty applications, offshore equipment, heavy industrial',
  },
  {
    name: 'DT',
    type: 'Rack & Pinion',
    torque: '500 – 10,000 Nm',
    pressure: 'Up to 210 bar',
    rotation: 'Up to 360° (multi-turn available)',
    applications: 'General-purpose rotation, valve operators, positioning systems',
  },
  {
    name: 'TR',
    type: 'Vane Type',
    torque: '100 – 5,000 Nm',
    pressure: 'Up to 210 bar',
    rotation: '90° / 180° / 270°',
    applications: 'Compact rotation, clamping, flipping mechanisms',
  },
  {
    name: 'RT',
    type: 'Rack & Pinion',
    torque: '2,000 – 20,000 Nm',
    pressure: 'Up to 250 bar',
    rotation: 'Up to 360° (multi-turn available)',
    applications: 'Medium-duty multi-turn, damper controls, gate valves',
  },
];

// Product image groups for gallery tabs
const imageGroups = [
  {
    id: 'dkx-a',
    label: 'DKX-A',
    images: [
      { src: '/images/products/dkx-a.png', name: 'DKX-A' },
    ],
  },
  {
    id: 'dkx-b',
    label: 'DKX-B',
    images: [
      { src: '/images/products/dkx-b1.png', name: 'DKX-B1' },
      { src: '/images/products/dkx-b2.png', name: 'DKX-B2' },
      { src: '/images/products/dkx-b3.png', name: 'DKX-B3' },
    ],
  },
  {
    id: 'dkx-c',
    label: 'DKX-C',
    images: [
      { src: '/images/products/dkx-c1.png', name: 'DKX-C1' },
      { src: '/images/products/dkx-c2.png', name: 'DKX-C2' },
    ],
  },
  {
    id: 'dkx-d',
    label: 'DKX-D',
    images: [
      { src: '/images/products/dkx-d1.png', name: 'DKX-D1' },
      { src: '/images/products/dkx-d2.png', name: 'DKX-D2' },
    ],
  },
  {
    id: 'dkx-e',
    label: 'DKX-E',
    images: [
      { src: '/images/products/dkx-e1.png', name: 'DKX-E1' },
      { src: '/images/products/dkx-e3.png', name: 'DKX-E3' },
    ],
  },
  {
    id: 'dkx-f',
    label: 'DKX-F',
    images: [
      { src: '/images/products/dkx-f.png', name: 'DKX-F' },
    ],
  },
  {
    id: 'dkx-tr',
    label: 'DKX-TR',
    images: [
      { src: '/images/products/dkx-tr.png', name: 'DKX-TR' },
    ],
  },
];

export default function RotaryActuatorsPage() {
  const [activeTab, setActiveTab] = useState('dkx-a');

  const currentGroup = imageGroups.find((g) => g.id === activeTab);

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
          <p className="eyebrow mb-4">Rotary Actuators</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-[#1B1E20] mb-4">
            9 Series, 72 Specifications
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-2xl">
            Comprehensive range covering 20Nm to 200,000Nm. Helical gear,
            rack & pinion, and vane mechanisms for every torque requirement.
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
                  <p className="text-xs text-[#62666C] mt-1">{item.type}</p>
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

      {/* Product Image Gallery */}
      <section className="border-t border-[rgba(44,74,115,0.10)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Product Gallery</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            DKX Series — Visual Reference
          </h2>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-[rgba(44,74,115,0.10)] pb-4">
            {imageGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveTab(group.id)}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors duration-150 cursor-pointer ${
                  activeTab === group.id
                    ? 'bg-[#2C4A73] text-white'
                    : 'bg-[rgba(44,74,115,0.04)] text-[#4A4E54] hover:bg-[rgba(44,74,115,0.08)] hover:text-[#2C4A73]'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          {currentGroup && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentGroup.images.map((img) => (
                <div
                  key={img.name}
                  className="group relative bg-[#FAFAF7] border border-[rgba(44,74,115,0.08)] rounded-md overflow-hidden"
                >
                  <div className="aspect-square flex items-center justify-center p-6 bg-gradient-to-b from-white to-[#FAFAF7]">
                    <img
                      src={img.src}
                      alt={img.name}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out group-hover:scale-105"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                  </div>
                  <div className="px-4 py-3 border-t border-[rgba(44,74,115,0.06)]">
                    <p className="font-heading text-sm font-medium text-[#1B1E20] text-center">
                      {img.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Torque Range Visual */}
      <section className="border-t border-[rgba(44,74,115,0.10)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <p className="eyebrow mb-4">Coverage</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
            Torque Range Overview
          </h2>

          <div className="space-y-3">
            {series.map((item) => {
              const torqueMin = parseInt(
                item.torque.replace(/[^0-9]/g, '').split('–')[0].trim()
              );
              const maxScale = 200000;
              const widthPercent = Math.max(3, (torqueMin / maxScale) * 100);
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
