import { HMR_ALL_DATA, type HmrComparable, type HmrModel } from './hmr-all-series';
import { modelPages } from '@/components/alternatives/model-data';

/**
 * Base model code used for cross-brand matching.
 * Full order codes (L20-15-E-CL-180/90-S1-O-H) collapse to the base (L20-15);
 * codes that already carry a space (M-DA-H 50, F5 115) are used as-is.
 */
export function baseModelCode(model: string): string {
  const trimmed = model.trim();
  if (trimmed.includes(' ')) return trimmed.toUpperCase();
  return trimmed.split('-').slice(0, 2).join('-').toUpperCase();
}

const SLUG_BY_BASE = new Map<string, string>();
for (const m of modelPages) {
  const key = baseModelCode(m.model);
  if (!SLUG_BY_BASE.has(key)) SLUG_BY_BASE.set(key, m.slug);
}

/** Slug for a base model code, or undefined when no page exists for it. */
export function slugForBase(base: string): string | undefined {
  return SLUG_BY_BASE.get(base.trim().toUpperCase());
}

const BRAND_KEYS = ['helac', 'hks', 'moveco', 'sungji'] as const;
const BRAND_LABELS: Record<string, string> = {
  helac: 'Helac',
  hks: 'HKS',
  moveco: 'Moveco',
  sungji: 'Sungji',
};

export type CrossLink = { slug: string; label: string; brand: string; hmr: string };

/** Every comparable reference that has a page on this site. */
export function crossLinksForHmr(hmrModel: Pick<HmrModel, 'hmr' | 'comparable'>): CrossLink[] {
  const out: CrossLink[] = [];
  for (const key of BRAND_KEYS) {
    for (const ref of hmrModel.comparable[key] ?? []) {
      const slug = slugForBase(ref);
      if (slug) out.push({ slug, label: ref, brand: BRAND_LABELS[key], hmr: hmrModel.hmr });
    }
  }
  return out;
}

/**
 * Other-brand pages that sit in the same torque class, resolved through the HMR
 * cross-reference. Used to build reciprocal links between brand islands.
 */
export function getCrossBrandPeers(slug: string, limit = 4): CrossLink[] {
  const page = modelPages.find((m) => m.slug === slug);
  if (!page) return [];
  const base = baseModelCode(page.model);
  const peers: CrossLink[] = [];
  const seen = new Set<string>([slug]);
  for (const hmrModel of HMR_ALL_DATA.models) {
    const refs = BRAND_KEYS.flatMap((k) => ((hmrModel.comparable as HmrComparable)[k] ?? []).map((r) => r.toUpperCase()));
    if (!refs.includes(base)) continue;
    for (const link of crossLinksForHmr(hmrModel)) {
      if (seen.has(link.slug)) continue;
      seen.add(link.slug);
      peers.push(link);
    }
  }
  return peers.slice(0, limit);
}
