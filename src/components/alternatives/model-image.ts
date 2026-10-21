import type { ModelData } from '@/components/alternatives/model-data';

export const MODEL_IMAGE_PLACEHOLDER = '/images/products/hm-model-placeholder.png';

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function stemFromPath(url: string): string {
  const lastSlash = url.lastIndexOf('/');
  const filename = lastSlash >= 0 ? url.slice(lastSlash + 1) : url;
  return filename.replace(/\.[^.]+$/, '');
}

export function resolveModelImage(record: ModelData): string {
  const image = record.image;

  // JLG / frozen part-number images are never swapped out.
  if (image.startsWith('/images/jlg/')) return image;

  // Explicit product-image overrides (e.g. T-series using HMR6 product photo).
  if (image.startsWith('/images/products/')) return image;

  // Alternatives images must be verified against the model code stem.
  if (image.startsWith('/images/alternatives/')) {
    let stem = stemFromPath(image);
    // Strip known brand prefixes.
    for (const prefix of ['helac-', 'hks-', 'moveco-', 'sungji-', 'eckart-']) {
      if (stem.startsWith(prefix)) {
        stem = stem.slice(prefix.length);
        break;
      }
    }
    const modelNorm = normalize(record.model);
    const stemNorm = normalize(stem);
    if (modelNorm.startsWith(stemNorm) || stemNorm.startsWith(modelNorm)) {
      return image;
    }
  }

  return MODEL_IMAGE_PLACEHOLDER;
}
