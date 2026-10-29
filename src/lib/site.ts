/**
 * Site-wide constants. Single source of truth for anything that appears in
 * metadata, structured data or the consent layer.
 */
export const SITE_NAME = 'HM Hydraulics';
export const SITE_URL = 'https://www.hmhydraulics.com';
export const CONTACT_EMAIL = 'hm@hmhydraulics.com';

/** Google Analytics 4 measurement ID. */
export const GA4_ID = 'G-ZPJ9PXS32N';

/**
 * localStorage key for the analytics consent decision.
 * Prefixed differently from the other site so the two never collide.
 */
export const CONSENT_STORAGE_KEY = 'hm_analytics_consent';

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
