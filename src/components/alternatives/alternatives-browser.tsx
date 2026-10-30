'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export interface SearchIndexItem {
  model: string;
  slug: string;
  originBrand: string;
  equipmentMakes?: string[];
  parts: string[];
  machines: string[];
  aliases?: string[];
  catalogVersionAlt?: {
    altModel: string;
    sizeCode: string;
    ownEdition: string;
    altEdition: string;
    rows: { label: string; own: string; alt: string; card?: boolean }[];
    note: string;
  };
  kind?: 'model' | 'part';
  image?: string;
  thumb?: string;
}

interface AlternativesBrowserProps {
  searchIndex: SearchIndexItem[];
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[-\s.]/g, '');
}

function matchesQuery(m: SearchIndexItem, raw: string): boolean {
  const q = raw.trim();
  if (!q) return false;
  const needle = normalize(q);
  if (!needle) return false;
  const fields = [
    m.model,
    m.slug,
    m.originBrand,
    ...(m.aliases ?? []),
    ...(m.equipmentMakes ?? []),
    ...m.parts,
    ...m.machines,
  ];
  return fields.some((f) => normalize(String(f)).includes(needle));
}

/**
 * HKS material numbers (S9xxx) are configuration codes layered on a base actuator model:
 * they carry valve and seal options, so the same number is never a standalone model code.
 * Recognising the shape lets the empty state explain that instead of a dead end.
 */
function looksLikeHksMaterialNumber(raw: string): boolean {
  return /^s9\d{2,5}$/i.test(raw.trim());
}

/**
 * A full Helac code ends with configuration segments that describe shaft end /
 * end-cap flange arrangement (S1, S2, L1), porting (C) and thread (H). Two units
 * can share an identical body and still differ in those last segments — the
 * customer's nameplate says S2 while the published page is S1.
 *
 * So when an exact search returns nothing, peel trailing segments off and retry
 * against the body code. That turns a dead end into "closest match + explain the
 * difference" instead of "no result".
 */
function searchWithFallback(
  items: SearchIndexItem[],
  raw: string,
): {
  items: SearchIndexItem[];
  baseQuery: string | null;
  stripped: string | null;
  mode: 'config' | 'family' | 'material' | null;
} {
  const q = raw.trim();
  if (!q) return { items: [], baseQuery: null, stripped: null, mode: null };

  const exact = items.filter((m) => matchesQuery(m, q));
  if (exact.length) return { items: exact, baseQuery: null, stripped: null, mode: null };

  // Order codes arrive as "FAMILY SIZE ANGLE-CONFIG THREAD MATERIAL" separated by spaces,
  // e.g. "M-DA-H-F5 245 180°S2,LH S9159". Peel trailing space-separated tokens first so the
  // family/size token survives and the whole family comes back as the closest match.
  const words = q.split(/\s+/).filter(Boolean);
  for (let cut = 1; cut <= 4 && words.length - cut >= 1; cut++) {
    const base = words.slice(0, words.length - cut).join(' ');
    if (base.length < 4) break;
    const hits = items.filter((m) => matchesQuery(m, base));
    if (hits.length) {
      return {
        items: hits,
        baseQuery: base,
        stripped: words.slice(words.length - cut).join(' '),
        mode: 'family',
      };
    }
  }

  const segs = q.split('-').filter(Boolean);
  // Peel trailing segments, stopping at the first cut that lands on a page. Sungji and Helac
  // order codes carry up to eight segments (SRA-110-180-CN-RF-SH-N-I, L10-3.0-E-RF-180-S1-O-H),
  // so a three-cut limit left those long codes landing on nothing even though the base page
  // exists. Peeling to a single segment also covers option suffixes customers add by hand,
  // such as RR40-S1 or L30-25-M.
  for (let cut = 1; cut <= 6; cut++) {
    if (segs.length - cut < 1) break;
    const base = segs.slice(0, segs.length - cut).join('-');
    const hits = items.filter((m) => matchesQuery(m, base));
    if (hits.length) {
      return {
        items: hits,
        baseQuery: base,
        stripped: segs.slice(segs.length - cut).join('-'),
        mode: 'config',
      };
    }
  }
  // HKS material numbers (S9xxx) are configuration codes layered on a base actuator model,
  // so there is no page of their own to land on. Show the M-DA-H-F5 family instead of a dead
  // end: that is the family a customer holding an S9xxx code is most likely looking at, and
  // the page set lets them pick the base size before confirming the build with us.
  if (looksLikeHksMaterialNumber(q)) {
    const family = items.filter((m) =>
      (m.aliases ?? []).some((a) => a.toUpperCase().startsWith('M-DA-H-F5 ')),
    );
    if (family.length) {
      return { items: family, baseQuery: 'M-DA-H-F5', stripped: q, mode: 'material' };
    }
  }

  return { items: [], baseQuery: null, stripped: null, mode: null };
}

export function AlternativesBrowser({ searchIndex }: AlternativesBrowserProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
  }, []);

  const {
    l10Count,
    l20Count,
    l30Count,
    heavyCount,
    tSeriesCount,
    filtered,
    baseQuery,
    stripped,
    fallbackMode,
    actuatorChips,
    equipmentChips,
  } = useMemo(() => {
    const q = query.trim();
    const { items: filtered, baseQuery, stripped, mode: fallbackMode } = searchWithFallback(searchIndex, q);

    const l10Count = searchIndex.filter((m) => m.model.startsWith('L10-')).length;
    const l20Count = searchIndex.filter((m) => m.model.startsWith('L20-')).length;
    const l30Count = searchIndex.filter((m) => m.model.startsWith('L30-')).length;

    const heavySeries = new Set(['L40', 'HTX', 'HP']);
    const heavyCount = searchIndex.filter((m) => heavySeries.has(seriesFromModel(m.model))).length;
    const tSeriesCount = searchIndex.filter((m) => seriesFromModel(m.model).startsWith('T')).length;

    const toChips = (counts: Map<string, number>) =>
      Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([name, count]) => ({ name, count }));

    // Actuator manufacturers (the unit being replaced): models only.
    const actuatorCounts = new Map<string, number>();
    for (const m of searchIndex) {
      if (m.kind === 'part') continue;
      actuatorCounts.set(m.originBrand, (actuatorCounts.get(m.originBrand) ?? 0) + 1);
    }
    const actuatorChips = toChips(actuatorCounts);

    // Equipment makes (the machine): from model brands[] + OEM part groups.
    const equipmentCounts = new Map<string, number>();
    const bump = (name: string) =>
      equipmentCounts.set(name, (equipmentCounts.get(name) ?? 0) + 1);
    for (const m of searchIndex) {
      if (m.kind === 'part') {
        bump(m.originBrand);
      } else {
        for (const mk of m.equipmentMakes ?? []) bump(mk);
      }
    }
    const equipmentChips = toChips(equipmentCounts);

    return {
      l10Count,
      l20Count,
      l30Count,
      heavyCount,
      tSeriesCount,
      filtered,
      baseQuery,
      stripped,
      fallbackMode,
      actuatorChips,
      equipmentChips,
    };
  }, [query, searchIndex]);

  return (
    <div className="space-y-16">
      {/* Search + live count — prominent panel */}
      <div className="rounded-xl border border-[#D5A85C]/40 bg-gradient-to-b from-[#FBF4E6] to-white p-6 md:p-8 shadow-sm">
        <label htmlFor="alt-search" className="block text-sm font-semibold text-[#1B1E20] mb-3">
          Search model, part number, brand or machine
        </label>
        <div className="relative max-w-2xl">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C4A73]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            id="alt-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. L30-65, 76350018, 3128312644, Boltec, Sandvik"
            className="w-full pl-12 pr-4 py-4 text-base rounded-lg border-2 border-[#D98A1D]/50 bg-white text-[#1B1E20] shadow-sm focus:outline-none focus:border-[#D98A1D] focus:ring-2 focus:ring-[#D98A1D]/30"
          />
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#62666C] mr-1 w-32 shrink-0">
              Actuator brand:
            </span>
            {actuatorChips.map(({ name, count }) => (
              <Chip key={name} name={name} count={count} active={isActive(query, name)} onClick={() => toggle(setQuery, query, name)} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#62666C] mr-1 w-32 shrink-0">
              Equipment make:
            </span>
            {equipmentChips.map(({ name, count }) => (
              <Chip key={name} name={name} count={count} tone="equipment" active={isActive(query, name)} onClick={() => toggle(setQuery, query, name)} />
            ))}
          </div>
        </div>
      </div>

      {/* Search results */}
      {query.trim() && filtered.length > 0 && (
        <section>
          {baseQuery && (
            <div className="mb-5 p-4 border border-[rgba(196,122,0,0.35)] bg-[#FFFBF2] rounded-md">
              <p className="text-sm font-medium text-[#1B1E20] mb-1.5">
                No published page for &ldquo;{query.trim()}&rdquo;
              </p>
              {fallbackMode === 'material' ? (
                <p className="text-sm text-[#4A4E54] leading-relaxed m-0">
                  <span className="font-medium text-[#1B1E20]">{query.trim()}</span> looks like an HKS
                  material number &mdash; a configuration code carrying valve and seal options on top of a
                  base actuator model, not a standalone model number. The{' '}
                  <span className="font-medium text-[#1B1E20]">M-DA-H-F5</span> family is listed below.
                  Tell us the base size on the tag, or send the full order line or a nameplate photo, and we
                  identify the exact build and quote the equivalent.
                </p>
              ) : fallbackMode === 'family' ? (
                <p className="text-sm text-[#4A4E54] leading-relaxed m-0">
                  Showing the closest match on the{' '}
                  <span className="font-medium text-[#1B1E20]">{baseQuery}</span> family. The{' '}
                  <span className="font-medium text-[#1B1E20]">{stripped}</span> part of that line carries the
                  size, angle, hand and material-number detail on top of the family &mdash; send the full order
                  line, a nameplate photo or a drawing and we confirm the exact build before quoting.
                </p>
              ) : (
                <p className="text-sm text-[#4A4E54] leading-relaxed m-0">
                  Showing the closest match on the{' '}
                  <span className="font-medium text-[#1B1E20]">{baseQuery}</span> body. The{' '}
                  <span className="font-medium text-[#1B1E20]">{stripped}</span> segments describe shaft end,
                  end-cap flange and porting configuration &mdash; the actuator body, rotation and load ratings
                  are the same. Send a nameplate photo or drawing and we confirm the interface before quoting.
                </p>
              )}
            </div>
          )}
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-4">
            Search results ({filtered.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m) => {
              const oldNums = m.parts.filter((p) => normalize(p) !== normalize(m.model));
              const alt = m.catalogVersionAlt;
              const cardRows = alt ? alt.rows.filter((r) => r.card) : [];
              return (
                <Link
                  key={m.slug}
                  href={`/alternatives/${m.slug}`}
                  className={`flex items-center gap-3 p-3 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] hover:shadow-sm transition-all${alt ? ' flex-wrap' : ''}`}
                >
                  {m.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.thumb}
                      width={56}
                      height={56}
                      alt={`${m.originBrand} ${m.model} rotary actuator`}
                      loading="lazy"
                      decoding="async"
                      className="w-14 h-14 shrink-0 object-contain rounded border border-[rgba(44,74,115,0.08)] bg-[#FAFAF7] p-1"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="w-14 h-14 shrink-0 flex items-center justify-center rounded border border-[rgba(44,74,115,0.08)] bg-[#F2F5F9]"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#9FB0C4]" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8v8M9 10.5c0-1 1.3-1.5 3-1.5s3 .6 3 1.5-1.3 1.3-3 1.8-3 .7-3 1.7 1.3 1.5 3 1.5 3-.5 3-1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1B1E20] truncate">{m.model}</p>
                    <p className="text-xs text-[#62666C] truncate">
                      {m.kind === 'part'
                        ? `${m.originBrand} part${oldNums.length ? ` · replaces ${oldNums.join(', ')}` : ''}`
                        : `${seriesFromModel(m.model)} · ${m.originBrand}`}
                    </p>
                  </div>
                  <span className="text-[#2C4A73] shrink-0">&rarr;</span>
                  {alt && cardRows.length ? (
                    <div className="w-full rounded border border-[#B45309]/30 bg-[#FFF8ED] px-3 py-2">
                      <p className="m-0 text-[11px] font-medium leading-tight text-[#92400E]">
                        &#9888; Two catalogue editions &mdash; not the same rating
                      </p>
                      <dl className="mt-1.5 mb-0 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-[11px] leading-tight">
                        {cardRows.map((r) => (
                          <Fragment key={r.label}>
                            <dt className="m-0 break-words text-[#7C5A2E]">{r.label}</dt>
                            <dd className="m-0 text-right tabular-nums break-words">
                              <span className="font-medium text-[#1B1E20]">{r.own}</span>
                              <span className="mx-1 text-[#A08A6B]">&rarr;</span>
                              <span className="font-medium text-[#1B1E20]">{r.alt}</span>
                            </dd>
                          </Fragment>
                        ))}
                      </dl>
                      <p className="mt-1.5 mb-0 text-[11px] leading-tight text-[#7C5A2E]">
                        {m.model} &middot; {alt.ownEdition} vs {alt.altModel} &middot; {alt.altEdition}. Not a
                        verified interchangeable unit.
                      </p>
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {query.trim() && filtered.length === 0 && (
        <div className="text-sm text-[#62666C]">
          <p className="m-0">
            No published model matches &ldquo;{query}&rdquo;. Send the model code or part number and we will
            check it against our engineering records.
          </p>
          {looksLikeHksMaterialNumber(query) && (
            <p className="mt-3 p-4 m-0 border border-[rgba(44,74,115,0.15)] bg-[#FAFAF7] rounded-md leading-relaxed">
              <span className="font-medium text-[#1B1E20]">{query.trim()}</span> looks like an HKS material
              number. HKS folds valve and seal options into an S9xxx material number that sits on top of a base
              actuator model &mdash; the number identifies a configured build, not a standalone model. Send the
              full order line or a nameplate photo and we identify the base actuator, then quote the equivalent
              build.
            </p>
          )}
        </div>
      )}

      {/* Primary series cards */}
      {!query.trim() && (
        <section>
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-4">
            Browse by series
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SeriesCard
              name="L10 Series"
              count={l10Count}
              href="/alternatives/helac-l10-series"
              description="Compact helical actuators for small to mid-size drill rigs and bolters."
            />
            <SeriesCard
              name="L20 Series"
              count={l20Count}
              href="/alternatives/helac-l20-series"
              description="Mid-size actuators including compound-angle builds for mid-size equipment."
            />
            <SeriesCard
              name="L30 Series"
              count={l30Count}
              href="/alternatives/helac-l30-series"
              description="Large flange and round-flange actuators for heavy-duty rotation."
            />
          </div>
        </section>
      )}

      {/* Heavy-duty aggregate */}
      {!query.trim() && (
        <section>
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-4">
            Heavy-duty & specialty Helac-family actuators
          </p>
          <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20]">L40 · HTX · HP</h3>
              <span className="text-sm text-[#62666C]">{heavyCount} models</span>
            </div>
            <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
              Larger, splined-shaft and specialty Helac-family actuators for the biggest rotation
              duties, drill rigs and aerial platforms. Each series has its own mounting interface and
              torque envelope — they are not equivalent to the L30 series.
            </p>
            <div className="flex flex-wrap gap-3">
              <SubLink href="/alternatives/helac-l40-series" label="L40" />
              <SubLink href="/alternatives/helac-htx-series" label="HTX" />
              <SubLink href="/alternatives/helac-hp-series" label="HP" />
            </div>
          </div>
        </section>
      )}

      {/* T-series straddle */}
      {!query.trim() && (
        <section>
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-4">
            Other Helac series & variants
          </p>
          <div className="p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
              <h3 className="font-heading text-lg font-medium text-[#1B1E20]">T-series straddle</h3>
              <span className="text-sm text-[#62666C]">{tSeriesCount} models</span>
            </div>
            <p className="text-sm text-[#4A4E54] leading-relaxed mb-4">
              Dual-spline, straddle-mount T-series actuators for mid-duty rotation. These builds have a
              different housing and output-shaft arrangement than the L-series and are selected on their
              own mounting drawings.
            </p>
            <div className="flex flex-wrap gap-3">
              <SubLink href="/alternatives/t20-25-e-ft-220-s1-c-h" label="T20-25" />
              <SubLink href="/alternatives/t30-27-e-ft-220-s1-c-h" label="T30-27" />
              <SubLink href="/alternatives/t20-45-e-ft-220-s1-c-h" label="T20-45" />
              <SubLink href="/alternatives/t20-60-e-ft-220-s1-c-h" label="T20-60" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function seriesFromModel(model: string): string {
  const dash = model.indexOf('-');
  if (dash < 0) return model;
  return model.slice(0, dash);
}

function isActive(query: string, name: string): boolean {
  return normalize(query) === normalize(name);
}

function toggle(
  setQuery: (v: string) => void,
  query: string,
  name: string,
) {
  setQuery(isActive(query, name) ? '' : name);
}

function Chip({
  name,
  count,
  active,
  onClick,
  tone = 'actuator',
}: {
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
  tone?: 'actuator' | 'equipment';
}) {
  const activeCls =
    tone === 'equipment'
      ? 'bg-[#D98A1D] border-[#D98A1D] text-white'
      : 'bg-[#2C4A73] border-[#2C4A73] text-white';
  const idleCls =
    tone === 'equipment'
      ? 'bg-white border-[#D98A1D]/40 text-[#7a5310] hover:border-[#D98A1D] hover:text-[#D98A1D]'
      : 'bg-white border-[rgba(44,74,115,0.20)] text-[#4A4E54] hover:border-[#2C4A73] hover:text-[#2C4A73]';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border transition-colors ${
        active ? activeCls : idleCls
      }`}
    >
      {name}
    </button>
  );
}

function SeriesCard({
  name,
  count,
  href,
  description,
}: {
  name: string;
  count: number;
  href: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block p-6 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
    >
      <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-3">
        {count} {count === 1 ? 'model' : 'models'}
      </p>
      <h3 className="font-heading text-lg font-medium text-[#1B1E20] mb-2 group-hover:text-[#2C4A73] transition-colors">
        {name}
      </h3>
      <p className="text-sm text-[#4A4E54] leading-relaxed">{description}</p>
    </Link>
  );
}

function SubLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-4 py-2 rounded bg-[#F0F4FA] text-sm font-medium text-[#2C4A73] no-underline hover:bg-[#E2EAF5] transition-colors"
    >
      {label}
    </Link>
  );
}
