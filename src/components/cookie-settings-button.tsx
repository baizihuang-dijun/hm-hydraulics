'use client';

import { resetConsent } from './analytics';

/**
 * Footer entry point that reopens the consent banner, so a visitor can change
 * their mind after the first choice.
 */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  );
}
