'use client';

import { useEffect, useState } from 'react';
import { readConsent, writeConsent, type ConsentState } from './analytics';

export function ConsentBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setMounted(true);
    const onChange = () => setConsent(readConsent());
    window.addEventListener('consent-changed', onChange);
    return () => window.removeEventListener('consent-changed', onChange);
  }, []);

  // Render nothing until mounted (avoids hydration mismatch) or once a choice exists.
  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(44,74,115,0.10)] bg-white shadow-[0_-4px_24px_rgba(27,30,32,0.08)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="max-w-3xl text-sm leading-relaxed text-[#1B1E20]/80">
          We use Google Analytics to see which technical pages buyers actually read,
          so we know what to improve. <strong className="font-semibold text-[#1B1E20]">Nothing loads until you accept.</strong>{' '}
          You can change this any time via <em>Cookie settings</em> in the footer.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => writeConsent('denied')}
            className="border border-[rgba(44,74,115,0.25)] px-5 py-2.5 text-sm font-medium text-[#1B1E20] transition-colors hover:bg-[#F0F0EC]"
          >
            Reject analytics
          </button>
          <button
            type="button"
            onClick={() => writeConsent('granted')}
            className="bg-[#2C4A73] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A5F]"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
