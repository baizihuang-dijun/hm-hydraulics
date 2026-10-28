import type { ModelData } from '@/components/alternatives/model-data';

export const MODEL_IMAGE_PLACEHOLDER = '/images/products/hm-model-placeholder.png';

/**
 * Single source of truth for which image an actuator reference actually shows.
 *
 * Search cards, series pages and the model detail page MUST all resolve through
 * here so a thumbnail and its detail image can never disagree. Three tiers:
 *  - 'exact'         : file stem matches the model code, or a curated override
 *                      (part-number-named physical photos, slash/suffix variants).
 *  - 'representative': a verified same-class / same-frame reference photo shared
 *                      across cross-brand codes (Helac frame used for HKS / Moveco /
 *                      Sungji equivalents). Must never be labelled as the exact unit.
 *  - 'placeholder'   : no usable reference image.
 */
export type ModelImageTier = 'exact' | 'representative' | 'placeholder';

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function stemFromPath(url: string): string {
  const lastSlash = url.lastIndexOf('/');
  const filename = lastSlash >= 0 ? url.slice(lastSlash + 1) : url;
  return filename.replace(/\.[^.]+$/, '');
}

const BRAND_DIRS = [
  '/images/alternatives/',
  '/images/sandvik/',
  '/images/atlas-copco/',
  '/images/epiroc/',
  '/images/resemin/',
  '/images/putzmeister/',
];

// Physical unit photos whose file name carries the OEM part number rather than a
// Helac-style code, plus slash/suffix naming variants. Each entry is verified to
// belong to the single record that references it.
const EXACT_OVERRIDES = new Set<string>([
  '/images/sandvik/bg00391147-rotary-actuator.webp',
  '/images/sandvik/bg01035613-rotary-actuator.webp',
  '/images/sandvik/eckart-sz-sm3-215-357-bg00334414-rotary-actuator.webp',
  '/images/sandvik/eckart-sz-sm3-170-357-bg00334337-rotary-actuator.webp',
  // File on disk is the 240° build; the record covers the 240/190 dual-angle code.
  '/images/atlas-copco/l30-65-s-ft-240-s1-c-h-rotary-actuator.webp',
]);

// Verified same-frame reference photos shared by cross-brand / cross-size codes
// at the same performance class. Keyed by file name stem.
const REPRESENTATIVE_STEMS = new Set<string>([
  'l20-15-e-cl-180-90',
  'l30-65-s-rf-360',
  'l10-5-5-m-rf-360',
  'l30-25-m-ft-180',
  'l10-9-5-m-rf-185',
  'l10-3-0-e-rf-180',
  'l30-42-m-ft-180',
  'l40-110-m-rf-360',
  // Same SRA-110 frame photographed on the 360° build; the 240° record reuses it
  // as a clearly labelled representative reference, never as the exact unit.
  'putzmeister-sra-110-360-co-rf-sh-n',
]);

function stemMatchesModel(stem: string, model: string): boolean {
  let code = stem;
  for (const prefix of [
    'helac-',
    'hks-',
    'moveco-',
    'sungji-',
    'eckart-',
    'putzmeister-',
    'resemin-',
  ]) {
    if (code.startsWith(prefix)) {
      code = code.slice(prefix.length);
      break;
    }
  }
  code = code.replace(/-rotary-actuator$/i, '');
  const modelNorm = normalize(model);
  const codeNorm = normalize(code);
  return modelNorm.startsWith(codeNorm) || codeNorm.startsWith(modelNorm);
}

export function modelImageTier(record: ModelData): ModelImageTier {
  const { image, model } = record;

  if (!image || image.includes('placeholder')) return 'placeholder';

  // Frozen part-number pages and explicit product overrides are exact.
  if (image.startsWith('/images/jlg/') || image.startsWith('/images/products/')) {
    return 'exact';
  }

  if (EXACT_OVERRIDES.has(image)) return 'exact';

  if (BRAND_DIRS.some((dir) => image.startsWith(dir))) {
    const stem = stemFromPath(image);
    if (stemMatchesModel(stem, model)) return 'exact';
    if (REPRESENTATIVE_STEMS.has(stem)) return 'representative';
  }

  return 'placeholder';
}

export function resolveModelImage(record: ModelData): string {
  const tier = modelImageTier(record);
  return tier === 'placeholder' ? MODEL_IMAGE_PLACEHOLDER : (record.image ?? MODEL_IMAGE_PLACEHOLDER);
}

/** Alt text that never claims a shared reference photo is the exact unit. */
export function resolveModelAlt(record: ModelData): string {
  const tier = modelImageTier(record);
  if (tier === 'placeholder') {
    return `${record.model} rotary actuator — correct unit drawing available on request`;
  }
  if (tier === 'representative') {
    // Hand-written alts already state what the photo shows and that it is not the
    // exact unit; prefer them over the generic template.
    if (record.imageAlt) return record.imageAlt;
    return `${record.series} class rotary actuator — representative reference`;
  }
  return record.imageAlt;
}
