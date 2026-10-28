/**
 * HMR model pages — batch 1.
 *
 * Codes listed here are the sizes that carry at least one published comparable
 * reference in the controlled cross-reference set (HMR2, HMR3 and HMR4 ranges).
 * HMR2-050 keeps its own static route directory, so it is excluded from the
 * dynamic route params to avoid generating the same path twice.
 */
export const HMR_MODEL_PAGE_CODES = [
  // HMR2 — foot mount, 210 bar, 180°
  'HMR2-050',
  'HMR2-095',
  'HMR2-180',
  'HMR2-280',
  'HMR2-300',
  'HMR2-450',
  // HMR3 — compact front flange, 210 bar, 180° / 360°
  'HMR3-020',
  'HMR3-030',
  'HMR3-060',
  'HMR3-100',
  'HMR3-160',
  'HMR3-280',
  // HMR4 — heavy duty, 210 bar, 180° / 360°, FT / FF / RF
  'HMR4-200',
  'HMR4-280',
  'HMR4-300',
  'HMR4-470',
  'HMR4-500',
  'HMR4-750',
  'HMR4-1000',
  'HMR4-1150',
  'HMR4-1400',
  'HMR4-1800',
  'HMR4-2500',
  'HMR4-4200',
  'HMR4-8300',
];

/** Codes served by a dedicated static route directory rather than the [code] route. */
export const HMR_STATIC_PAGE_CODES = ['HMR2-050'];

export const HMR_DYNAMIC_PAGE_CODES = HMR_MODEL_PAGE_CODES.filter(
  (code) => !HMR_STATIC_PAGE_CODES.includes(code),
);
