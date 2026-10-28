import { HMR_ALL_DATA, type HmrComparable, type HmrModel } from './hmr-all-series';
import { modelPages } from '@/components/alternatives/model-data';

/**
 * Base model code used for cross-brand matching.
 * Full order codes (L20-15-E-CL-180/90-S1-O-H) collapse to the base (L20-15);
 * codes that already carry a space (M-DA-H 50, F5 115) are used as-is.
 */
export function baseModelCode(model: string): string {
  // Some pages cover two codes at once ("DA-H 125 / I-DA-H 125"); the base is the first one.
  const trimmed = model.split('/')[0].trim();
  if (trimmed.includes(' ')) return trimmed.toUpperCase();
  return trimmed.split('-').slice(0, 2).join('-').toUpperCase();
}

type BaseEntry = { slug: string; seriesSlug?: string };

const PAGES_BY_BASE = new Map<string, BaseEntry[]>();
for (const m of modelPages) {
  const entry = { slug: m.slug, seriesSlug: m.seriesSlug || undefined };
  // Register every code the page covers, so "I-DA-H 125" resolves to the same page as "DA-H 125".
  const keys = new Set(
    m.model.split('/').map((part) => baseModelCode(part)).filter((k) => k.length > 0),
  );
  for (const key of keys) {
    const list = PAGES_BY_BASE.get(key) ?? [];
    list.push(entry);
    PAGES_BY_BASE.set(key, list);
  }
}

/** Slug for a base model code, or undefined when no page exists for it. */
export function slugForBase(base: string): string | undefined {
  return PAGES_BY_BASE.get(base.trim().toUpperCase())?.[0]?.slug;
}

/**
 * Best landing page for a base model code. When the base has several builds
 * (FT / FF / RF / CL, different angles) and a series page exists, the series page
 * is the right target because it lists every build; otherwise the first build page.
 */
export function linkForBase(base: string): string | undefined {
  const list = PAGES_BY_BASE.get(base.trim().toUpperCase());
  if (!list || list.length === 0) return undefined;
  const withSeries = list.find((x) => x.seriesSlug);
  if (withSeries?.seriesSlug) return withSeries.seriesSlug;
  return list[0].slug;
}

/** Every page that shares this base model code (other mounts, angles, valve builds). */
export function getSameBaseVariants(slug: string): { slug: string; model: string; rotation?: string }[] {
  const page = modelPages.find((m) => m.slug === slug);
  if (!page) return [];
  const key = baseModelCode(page.model);
  return (PAGES_BY_BASE.get(key) ?? [])
    .filter((x) => x.slug !== slug)
    .map((x) => {
      const rec = modelPages.find((m) => m.slug === x.slug)!;
      return { slug: rec.slug, model: rec.model, rotation: rec.rotation };
    });
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
