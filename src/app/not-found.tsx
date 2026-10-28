import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.hmhydraulics.com' },
};

/**
 * Paths carried over from the pre-rebuild site. Static hosting cannot issue a
 * server-side 301, so the 404 page maps them client-side to the closest live page.
 * Keys are stored without the trailing slash.
 */
const legacyPaths: Record<string, string> = {
  '/cartridge-valve': '/products',
  '/hmx-rotary-actuators': '/products/rotary-actuators',
  '/hmx-dt-series-tilt-actuators': '/products/tilt-actuators',
  '/rotary-actuator-hmx-tr-series': '/products/rotary-actuators',
};

const recoveryScript = `
(function () {
  try {
    var legacy = ${JSON.stringify(legacyPaths)};
    var path = window.location.pathname;
    var trimmed = path.replace(/\\/+$/, '');
    var target = legacy[trimmed];
    if (target) {
      window.location.replace(target + window.location.search + window.location.hash);
      return;
    }
    if (trimmed && trimmed !== path) {
      window.location.replace(trimmed + window.location.search + window.location.hash);
    }
  } catch (e) {}
})();
`;

export default function NotFoundPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 md:px-8 py-20 text-center">
      <script dangerouslySetInnerHTML={{ __html: recoveryScript }} />
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
