import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Slew Drives',
  description: 'Precision slew drives — coming soon to the HM Hydraulics product range.',
};

export default function SlewDrivesPage() {
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
            <span className="text-[#1B1E20]">Slew Drives</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
          <p className="eyebrow mb-4">Coming Soon</p>
          <h1 className="font-heading text-3xl md:text-4xl font-medium text-[#1B1E20] mb-4">
            Slew Drives
          </h1>
          <p className="text-lg text-[#4A4E54] leading-relaxed max-w-xl mx-auto mb-8">
            We are expanding our product range to include precision slew drives
            for rotational positioning applications. Stay tuned for updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-[rgba(44,74,115,0.25)] text-[#2C4A73] text-sm font-medium rounded no-underline hover:bg-[rgba(44,74,115,0.04)] transition-colors duration-150"
            >
              &larr; Back to Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
            >
              Get Notified
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
