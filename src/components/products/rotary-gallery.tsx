'use client';

import { useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryTab {
  key: string;
  label: string;
  images: GalleryImage[];
  mountOptions?: { code: string; label: string }[];
}

const TABS: GalleryTab[] = [
  {
    key: 'hmr1',
    label: 'HMR1',
    images: [
      {
        src: '/images/products/hmr1-front-flange-keyed-shaft.png',
        alt: 'HMR1 flange-mounted helical rotary actuator with keyed output shaft',
      },
    ],
  },
  {
    key: 'hmr2',
    label: 'HMR2',
    images: [
      {
        src: '/images/products/hmr2-foot-flange-disc-output.png',
        alt: 'HMR2 foot-mounted rotary actuator with flange-disc output',
      },
      {
        src: '/images/products/hmr2-foot-valve-block-flange-output.png',
        alt: 'HMR2 foot-mounted rotary actuator with integrated valve block and flange output',
      },
    ],
  },
  {
    key: 'hmr3',
    label: 'HMR3',
    images: [
      {
        src: '/images/products/hmr3-flange-flange-disc-output.png',
        alt: 'HMR3 large-bore flange-mounted rotary actuator with flange-disc output',
      },
      {
        src: '/images/products/hmr3-flange-valve-block-disc-output.png',
        alt: 'HMR3 flange-mounted rotary actuator with integrated valve block',
      },
    ],
  },
  {
    key: 'hmr4',
    label: 'HMR4',
    images: [
      {
        src: '/images/products/hmr4-foot-mount-FT.png',
        alt: 'HMR4 foot-mount (FT) heavy-duty helical rotary actuator',
        caption: 'Foot mount (FT)',
      },
      {
        src: '/images/products/hmr4-flange-mount-FF-RF.png',
        alt: 'HMR4 front-flange (FF) and rear-flange (RF) heavy-duty helical rotary actuator',
        caption: 'Front / rear flange (FF / RF)',
      },
    ],
  },
  {
    key: 'hmr5',
    label: 'HMR5',
    images: [
      {
        src: '/images/products/hmr5-heavy-duty-valve-block-photo.png',
        alt: 'HMR5 heavy-duty rotary actuator with bolted head and valve block',
      },
    ],
  },
  {
    key: 'hmr6',
    label: 'HMR6',
    images: [
      {
        src: '/images/products/hmr6-foot-through-splined-shaft.webp',
        alt: 'HMR6 foot-mounted rotary actuator with through splined shaft',
      },
    ],
  },
  {
    key: 'custom',
    label: 'Other / custom configurations — available on request',
    images: [
      {
        src: '/images/products/hm-long-stroke-rotary-actuator.png',
        alt: 'Long-stroke / custom rotary actuator configuration',
      },
      {
        src: '/images/products/hm-long-stroke-rotary-actuator.png',
        alt: 'Long-stroke / custom rotary actuator configuration',
      },
    ],
  },
];

export function RotaryGallery() {
  const [activeKey, setActiveKey] = useState('hmr4');
  const activeTab = TABS.find((t) => t.key === activeKey) ?? TABS[0];

  return (
    <section className="border-t border-[rgba(44,74,115,0.10)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <p className="eyebrow text-[#2C4A73] mb-4">Visual Reference</p>
        <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#1B1E20] mb-8">
          HMR Series — Visual Reference
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveKey(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                activeKey === tab.key
                  ? 'bg-[#2C4A73] border-[#2C4A73] text-white'
                  : 'bg-white border-[rgba(44,74,115,0.15)] text-[#1B1E20] hover:border-[#2C4A73]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[rgba(44,74,115,0.10)] bg-[#FAFAF7] p-6 md:p-10">
          {activeTab.images.length === 1 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeTab.images[0].src}
              alt={activeTab.images[0].alt}
              className="w-full max-h-[420px] object-contain mx-auto"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTab.images.map((img, i) => (
                <div key={i} className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full max-h-[420px] object-contain mx-auto"
                  />
                  {img.caption && (
                    <p className="mt-3 text-xs text-[#62666C]">{img.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
