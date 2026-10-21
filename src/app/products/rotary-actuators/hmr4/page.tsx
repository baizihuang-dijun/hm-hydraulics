import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HMR4 Series',
  description: 'HMR4 helical hydraulic rotary actuators are now part of the unified HMR selector.',
  alternates: { canonical: '/products/rotary-actuators' },
};

export default function Hmr4RedirectPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/products/rotary-actuators#selector" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace('/products/rotary-actuators#selector');`,
        }}
      />
      <main className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 text-center">
        <h1 className="text-2xl font-medium text-[#1B1E20] mb-4">HMR4 Series</h1>
        <p className="text-[#4A4E54] mb-6">
          HMR4 is now configured through the unified HMR selector on the rotary actuators page.
        </p>
        <a
          href="/products/rotary-actuators#selector"
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#2C4A73] text-white text-sm font-medium no-underline hover:bg-[#1E3A5F]"
        >
          Go to selector
        </a>
      </main>
    </>
  );
}
