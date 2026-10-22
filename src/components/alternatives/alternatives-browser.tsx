'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export interface SearchIndexItem {
  model: string;
  slug: string;
  originBrand: string;
  parts: string[];
  machines: string[];
  kind?: 'model' | 'part';
  image?: string;
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
  const fields = [m.model, m.slug, m.originBrand, ...m.parts, ...m.machines];
  return fields.some((f) => normalize(String(f)).includes(needle));
}

export function AlternativesBrowser({ searchIndex }: AlternativesBrowserProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
  }, []);

  const {
    helacCount,
    crossCount,
    totalCount,
    modelCount,
    partCount,
    l10Count,
    l20Count,
    l30Count,
    heavyCount,
    tSeriesCount,
    filtered,
    brandChips,
  } = useMemo(() => {
    const q = query.trim();
    const filtered = q ? searchIndex.filter((m) => matchesQuery(m, q)) : [];

    const totalCount = searchIndex.length;
    const partCount = searchIndex.filter((m) => m.kind === 'part').length;
    const modelCount = totalCount - partCount;
    const helacCount = searchIndex.filter(
      (m) => m.originBrand === 'Helac' && m.kind !== 'part',
    ).length;
    const crossCount = modelCount - helacCount;

    const l10Count = searchIndex.filter((m) => m.model.startsWith('L10-')).length;
    const l20Count = searchIndex.filter((m) => m.model.startsWith('L20-')).length;
    const l30Count = searchIndex.filter((m) => m.model.startsWith('L30-')).length;

    const heavySeries = new Set(['L40', 'HTX', 'HP']);
    const heavyCount = searchIndex.filter((m) => heavySeries.has(seriesFromModel(m.model))).length;
    const tSeriesCount = searchIndex.filter((m) => seriesFromModel(m.model).startsWith('T')).length;

    const counts = new Map<string, number>();
    for (const m of searchIndex) {
      counts.set(m.originBrand, (counts.get(m.originBrand) ?? 0) + 1);
    }
    const brandChips = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));

    return {
      helacCount,
      crossCount,
      totalCount,
      modelCount,
      partCount,
      l10Count,
      l20Count,
      l30Count,
      heavyCount,
      tSeriesCount,
      filtered,
      brandChips,
    };
  }, [query, searchIndex]);

  return (
    <div className="space-y-16">
      {/* Search + live count */}
      <div>
        <div className="max-w-xl">
          <label htmlFor="alt-search" className="block text-sm font-medium text-[#1B1E20] mb-2">
            Search model, part number or brand
          </label>
          <input
            id="alt-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. L30-65, 76350018, HKS F5 200"
            className="w-full px-4 py-3 rounded-lg border border-[rgba(44,74,115,0.15)] bg-white text-sm focus:outline-none focus:border-[#D98A1D] focus:ring-1 focus:ring-[#D98A1D]"
          />
        </div>
        <p className="mt-3 text-sm text-[#62666C]">
          {helacCount} Helac models · {crossCount} cross-brand models · {partCount} OEM part
          numbers · {totalCount} pages
        </p>
        {brandChips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#62666C] mr-1">Browse by brand:</span>
            {brandChips.map(({ name, count }) => {
              const active = normalize(query) === normalize(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setQuery(active ? '' : name)}
                  className={[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs border transition-colors',
                    active
                      ? 'bg-[#2C4A73] border-[#2C4A73] text-white'
                      : 'bg-white border-[rgba(44,74,115,0.20)] text-[#4A4E54] hover:border-[#2C4A73] hover:text-[#2C4A73]',
                  ].join(' ')}
                >
                  {name} <span className="ml-1.5 opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Search results */}
      {query.trim() && filtered.length > 0 && (
        <section>
          <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-4">
            Search results ({filtered.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m) => {
              const oldNums = m.parts.filter((p) => normalize(p) !== normalize(m.model));
              return (
                <Link
                  key={m.slug}
                  href={`/alternatives/${m.slug}`}
                  className="flex items-center gap-3 p-3 border border-[rgba(44,74,115,0.10)] rounded-md bg-white no-underline hover:border-[rgba(44,74,115,0.25)] transition-colors"
                >
                  {m.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.image}
                      alt={`${m.originBrand} ${m.model} rotary actuator`}
                      loading="lazy"
                      className="w-14 h-14 shrink-0 object-contain rounded border border-[rgba(44,74,115,0.08)] bg-[#FAFAF7] p-1"
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1B1E20] truncate">{m.model}</p>
                    <p className="text-xs text-[#62666C] truncate">
                      {m.kind === 'part'
                        ? `${m.originBrand} part${oldNums.length ? ` · replaces ${oldNums.join(', ')}` : ''}`
                        : `${seriesFromModel(m.model)} · ${m.originBrand}`}
                    </p>
                  </div>
                  <span className="text-[#2C4A73] shrink-0">&rarr;</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {query.trim() && filtered.length === 0 && (
        <p className="text-sm text-[#62666C]">
          No published model matches &ldquo;{query}&rdquo;. Send the model code or part number and we will check
          it against our engineering records.
        </p>
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
