'use client';

import { useState } from 'react';

const imageGroups = [
  {
    id: 'dkx-a',
    label: 'DKX-A',
    images: [{ src: '/images/products/dkx-a.png', name: 'DKX-A' }],
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
    images: [{ src: '/images/products/dkx-f.png', name: 'DKX-F' }],
  },
  {
    id: 'dkx-tr',
    label: 'DKX-TR',
    images: [{ src: '/images/products/dkx-tr.png', name: 'DKX-TR' }],
  },
];

export function RotaryGallery() {
  const [activeTab, setActiveTab] = useState('dkx-a');
  const currentGroup = imageGroups.find((g) => g.id === activeTab);

  return (
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
  );
}
