import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.hmhydraulics.com' },
};

export default function NotFoundPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 text-center">
      <h1 className="text-3xl font-medium text-[#1B1E20] mb-4">Page not found</h1>
      <p className="text-[#4A4E54] mb-8">
        The page you requested does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#2C4A73] text-white text-sm font-medium no-underline hover:bg-[#1E3A5F]"
      >
        Return to homepage
      </Link>
    </main>
  );
}
