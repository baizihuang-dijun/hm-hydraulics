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

/**
 * Every key a base code should answer to.
 *
 * HKS uses four spellings for one and the same base size, and HM's cross-reference database
 * mixes all of them:
 *   F5 115             short form the database stores
 *   M-DA-H-F5 115      programme-prefixed form printed on the datasheet
 *   M-DA-H-F10 115     flange-mount build, identical performance table, only S2 unavailable
 *   I-DA-H 115         second HKS numbering series for the same frame (pages show "DA-H 115")
 *
 * Collapsing every spelling onto one canonical key before expanding it again means a
 * database row written as "F10 115" or "I-DA-H 115" resolves to the page a customer sees,
 * instead of silently dropping out of the cross-reference block.
 */
export function baseKeys(code: string): string[] {
  const key = baseModelCode(code);
  if (!key) return [];
  const out = new Set<string>([key]);

  let canon = key;
  const bare = canon.match(/^(F\d+\s+.+)$/);
  if (bare) canon = `M-DA-H-${bare[1]}`;
  const iDah = canon.match(/^I-DA-H\s+(.+)$/);
  if (iDah) canon = `DA-H ${iDah[1]}`;
  out.add(canon);

  // Only F5 and F10 are the foot/flange pair of one base size. F7, F8 and F9 are separate
  // frames with their own torque tables and must not be folded together.
  const flangePair = canon.match(/^M-DA-H-(F5|F10)\s+(.+)$/);
  if (flangePair) {
    out.add(`M-DA-H-F5 ${flangePair[2]}`);
    out.add(`M-DA-H-F10 ${flangePair[2]}`);
    out.add(`F5 ${flangePair[2]}`);
    out.add(`F10 ${flangePair[2]}`);
  }

  const dah = canon.match(/^DA-H\s+(.+)$/);
  if (dah) out.add(`I-DA-H ${dah[1]}`);

  return [...out];
}

type BaseEntry = { slug: string; seriesSlug?: string };

const PAGES_BY_BASE = new Map<string, BaseEntry[]>();
for (const m of modelPages) {
  const entry = { slug: m.slug, seriesSlug: m.seriesSlug || undefined };
  // Register every code the page covers, so "I-DA-H 125" resolves to the same page as "DA-H 125",
  // and "F5 115" resolves to the page titled "M-DA-H-F5 115".
  const keys = new Set(m.model.split('/').flatMap((part) => baseKeys(part)));
  for (const key of keys) {
    const list = PAGES_BY_BASE.get(key) ?? [];
    list.push(entry);
    PAGES_BY_BASE.set(key, list);
  }
}

/** Entries registered under any spelling of this base code. */
function entriesForBase(base: string): BaseEntry[] {
  const merged = new Map<string, BaseEntry>();
  for (const key of baseKeys(base)) {
    for (const entry of PAGES_BY_BASE.get(key) ?? []) merged.set(entry.slug, entry);
  }
  return [...merged.values()];
}

/** Slug for a base model code, or undefined when no page exists for it. */
export function slugForBase(base: string): string | undefined {
  return entriesForBase(base)[0]?.slug;
}

/**
 * Best landing page for a base model code. When the base has several builds
 * (FT / FF / RF / CL, different angles) and a series page exists, the series page
 * is the right target because it lists every build; otherwise the first build page.
 */
export function linkForBase(base: string): string | undefined {
  const list = entriesForBase(base);
  if (list.length === 0) return undefined;
  const withSeries = list.find((x) => x.seriesSlug);
  if (withSeries?.seriesSlug) return withSeries.seriesSlug;
  return list[0].slug;
}

/** Every page that shares this base model code (other mounts, angles, valve builds). */
export function getSameBaseVariants(slug: string): { slug: string; model: string; rotation?: string }[] {
  const page = modelPages.find((m) => m.slug === slug);
  if (!page) return [];
  return entriesForBase(page.model)
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
  const seen = new Set<string>();
  for (const key of BRAND_KEYS) {
    for (const ref of hmrModel.comparable[key] ?? []) {
      const slug = slugForBase(ref);
      // F5 175 and F10 175 both land on the same page; list it once.
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      // HKS pages are titled with the datasheet programme prefix (M-DA-H-F5 175) while the
      // database stores the short form (F5 175). Show the page title so the cross-reference
      // block reads the same as the model cards; other brands keep the short reference.
      const target = modelPages.find((m) => m.slug === slug);
      const label = target && /^M-DA-H/.test(target.model) ? target.model : ref;
      out.push({ slug, label, brand: BRAND_LABELS[key], hmr: hmrModel.hmr });
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
  const bases = new Set(baseKeys(page.model));
  const peers: CrossLink[] = [];
  const seen = new Set<string>([slug]);
  for (const hmrModel of HMR_ALL_DATA.models) {
    const refs = BRAND_KEYS.flatMap((k) =>
      ((hmrModel.comparable as HmrComparable)[k] ?? []).map((r) => r.toUpperCase()),
    );
    if (!refs.some((r) => bases.has(r))) continue;
    for (const link of crossLinksForHmr(hmrModel)) {
      if (seen.has(link.slug)) continue;
      seen.add(link.slug);
      peers.push(link);
    }
  }
  return peers.slice(0, limit);
}
