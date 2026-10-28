/**
 * HMR model pages — batch 1.
 *
 * Codes listed here are the sizes that carry at least one published comparable
 * reference in the controlled cross-reference set (HMR2, HMR3 and HMR4 ranges).
 * HMR2-050 keeps its own static route directory, so it is excluded from the
 * dynamic route params to avoid generating the same path twice.
 */
export const HMR_MODEL_PAGE_CODES = [
  // HMR1 — flange mount, 210 bar, 90° / 180° / 270° / 360°
  'HMR1-020',
  'HMR1-035',
  'HMR1-065',
  'HMR1-135',
  'HMR1-250',
  'HMR1-500',
  'HMR1-700',
  'HMR1-1100',
  'HMR1-1600',
  'HMR1-2200',
  'HMR1-3200',
  'HMR1-3900',
  'HMR1-4400',
  'HMR1-6000',
  'HMR1-7600',
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
  // HMR6 — through-shaft straddle mount, 210 bar, 220° standard / 180° special
  'HMR6-180',
  'HMR6-280',
  'HMR6-300',
  'HMR6-500',
  'HMR6-680',
  // HMR5 — valve-mount, 135 bar, 90°
  'HMR5-012',
  'HMR5-025',
  'HMR5-050',
  'HMR5-100',
  'HMR5-200',
  'HMR5-400',
  'HMR5-800',
  'HMR5-1600',
  'HMR5-3200',
];

/** Codes served by a dedicated static route directory rather than the [code] route. */
export const HMR_STATIC_PAGE_CODES = ['HMR2-050'];

export const HMR_DYNAMIC_PAGE_CODES = HMR_MODEL_PAGE_CODES.filter(
  (code) => !HMR_STATIC_PAGE_CODES.includes(code),
);
