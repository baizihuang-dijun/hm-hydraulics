// Public-only HMR1-HMR6 unified data. Generated from hmr-all-series.PUBLIC.json.
export type HmrSeriesSchema = {
  pressureBar: number;
  familyClass: string;
  angles: string[];
  mounts: { code: string; label?: string; implicit?: boolean }[];
  outputs: { code: string; label?: string; implicit?: boolean }[];
  valves: { code: string; label?: string; implicit?: boolean }[];
  orderSyntax: string;
  shortSyntax?: string;
  example: string;
  note?: string;
};

export type HmrComparable = { helac: string[]; hks: string[]; moveco: string[]; sungji: string[] };

export type HmrModel = {
  hmr: string;
  series: string;
  spec: string;
  drivingNm: number;
  rotation: string[];
  comparable: HmrComparable;
  comparableNote?: string;
  availability?: 'standard' | 'engineered' | string;
};

export type HmrAllData = {
  generated: string;
  dataSource: string;
  usage: string;
  compareNotice: string;
  series: Record<string, HmrSeriesSchema>;
  models: HmrModel[];
};

import rawData from './hmr-all-series.PUBLIC.json';
export const HMR_ALL_DATA: HmrAllData = rawData as HmrAllData;

export const HMR_SERIES_CODES = ['HMR1','HMR2','HMR3','HMR4','HMR5','HMR6'] as const;
export const HMR_MODELS = HMR_ALL_DATA.models;
export const HMR_SERIES = HMR_ALL_DATA.series;
export const HMR_COMPARE_NOTICE = HMR_ALL_DATA.compareNotice;

const OUTPUT_LABELS: Record<string, string> = {
  KS: 'Keyed solid shaft',
  SS: 'Splined solid shaft',
  KB: 'Keyed hollow shaft',
  BS: 'Bolted flange shaft',
  '1F': 'Single flange shaft',
  '2F': 'Double flange shaft',
  SQ: 'Square shaft',
  DS: 'Through double spline shaft',
};

for (const s of HMR_SERIES_CODES) {
  const schema = HMR_SERIES[s];
  for (const o of schema.outputs) {
    if (!o.label && OUTPUT_LABELS[o.code]) {
      o.label = OUTPUT_LABELS[o.code];
    }
  }
}

function normalizeToken(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const COMPETITOR_BRAND_PREFIXES = ['helac','hks','moveco','sungji'];

function cleanQuery(v: string): string {
  let s = v.trim();
  COMPETITOR_BRAND_PREFIXES.forEach(p => { s = s.replace(new RegExp('\\b'+p+'\\b','gi'),' '); });
  return s.replace(/\s+/g,' ').trim();
}

const FAMILY_GROUPS: {
  brand: keyof HmrComparable;
  prefixes: string[];
  display: string;
}[] = [
  { brand: 'hks', prefixes: ['f5', 'f10'], display: 'F5/F10' },
  { brand: 'hks', prefixes: ['m-dah-f7', 'm-dah'], display: 'M-DA-H' },
  { brand: 'helac', prefixes: ['l10'], display: 'L10' },
  { brand: 'helac', prefixes: ['l20'], display: 'L20' },
  { brand: 'helac', prefixes: ['l30'], display: 'L30' },
  { brand: 'helac', prefixes: ['t20'], display: 'T20' },
  { brand: 'helac', prefixes: ['t30'], display: 'T30' },
  { brand: 'moveco', prefixes: ['rp'], display: 'RP' },
  { brand: 'moveco', prefixes: ['rr'], display: 'RR' },
  { brand: 'sungji', prefixes: ['sra'], display: 'SRA' },
  { brand: 'sungji', prefixes: ['srb'], display: 'SRB' },
  { brand: 'sungji', prefixes: ['src'], display: 'SRC' },
  { brand: 'sungji', prefixes: ['srs'], display: 'SRS' },
];

function sortMatches(matches: HmrModel[]): HmrModel[] {
  return [...matches].sort((a, b) => a.drivingNm - b.drivingNm || a.hmr.localeCompare(b.hmr));
}

function matchesFamily(refs: string[], prefixNorm: string): boolean {
  return refs.some((r) => normalizeToken(r).startsWith(prefixNorm));
}

export function findModelsByCompetitorReference(value: string): CompetitorMatchResult {
  const raw = value.trim();
  if (raw.length < 2) return { matches: [], note: null, direct: null };
  const queryNorm = normalizeToken(raw);
  if (!queryNorm) return { matches: [], note: null, direct: null };
  const isNumericOnly = /^\d+$/.test(queryNorm);

  // 1. Full part-number direct evaluation (v7).
  const direct = evaluateCompetitorCode(raw);
  if (direct) return { matches: [direct.model], note: null, direct };

  // 2. Exact or partial full-reference match.
  const exactMatches = new Set<HmrModel>();
  for (const m of HMR_MODELS) {
    const pools = [...m.comparable.helac, ...m.comparable.hks, ...m.comparable.moveco, ...m.comparable.sungji];
    for (const c of pools) {
      const compNorm = normalizeToken(c);
      if (!compNorm || compNorm.length < 4 || !/[a-z]/.test(compNorm)) continue;
      if (queryNorm === compNorm || queryNorm.includes(compNorm) || compNorm.includes(queryNorm)) {
        exactMatches.add(m);
      }
    }
  }
  if (exactMatches.size) {
    return { matches: sortMatches(Array.from(exactMatches)), note: null, direct: null };
  }

  // 2. Brand name.
  const brand = COMPETITOR_BRAND_PREFIXES.find((p) => queryNorm === p || queryNorm.startsWith(p));
  if (brand) {
    const matches = HMR_MODELS.filter((m) => m.comparable[brand as keyof HmrComparable].length > 0);
    return {
      matches: sortMatches(matches),
      note: `Showing all comparable ${brand.toUpperCase()} references.`,
      direct: null,
    };
  }

  // 3. Family prefix.
  for (const group of FAMILY_GROUPS) {
    for (const prefix of group.prefixes) {
      if (queryNorm === prefix || queryNorm.startsWith(prefix)) {
        const matches = HMR_MODELS.filter((m) =>
          m.comparable[group.brand].some((r) => normalizeToken(r).startsWith(prefix))
        );
        if (matches.length) {
          return {
            matches: sortMatches(matches),
            note: `Showing ${group.display} family references.`,
            direct: null,
          };
        }
      }
    }
  }

  // 4. Token fallback: extract any known family token from the query.
  const fallbackMatches = new Set<HmrModel>();
  const fallbackFamilies: string[] = [];
  // HKS F5/F10 is the most specific HKS token; prefer it when present.
  const f5f10 = FAMILY_GROUPS.find((g) => g.brand === 'hks' && g.display === 'F5/F10')!;
  const hasF5F10 = f5f10.prefixes.some((p) => queryNorm.includes(p));
  if (hasF5F10) {
    for (const prefix of f5f10.prefixes) {
      HMR_MODELS.filter((m) => matchesFamily(m.comparable.hks, prefix)).forEach((m) => fallbackMatches.add(m));
    }
    fallbackFamilies.push('F5/F10');
  } else {
    for (const group of FAMILY_GROUPS) {
      for (const prefix of group.prefixes) {
        if (queryNorm.includes(prefix)) {
          HMR_MODELS.filter((m) => matchesFamily(m.comparable[group.brand], prefix)).forEach((m) =>
            fallbackMatches.add(m)
          );
          fallbackFamilies.push(group.display);
          break;
        }
      }
    }
  }
  if (fallbackMatches.size) {
    return {
      matches: sortMatches(Array.from(fallbackMatches)),
      note: `No exact match for "${raw}". Showing matching ${[...new Set(fallbackFamilies)].join('/')} reference families.`,
      direct: null,
    };
  }

  // 5. Numeric-only reference: try to match it as a competitor size code (e.g. HKS F5/F10 350).
  if (isNumericOnly) {
    const numericMatches = new Set<HmrModel>();
    for (const m of HMR_MODELS) {
      const pools = [...m.comparable.helac, ...m.comparable.hks, ...m.comparable.moveco, ...m.comparable.sungji];
      for (const c of pools) {
        const compNorm = normalizeToken(c);
        if (new RegExp(`(^|\\D)${queryNorm}(\\D|$)`).test(compNorm)) {
          numericMatches.add(m);
        }
      }
    }
    if (numericMatches.size) {
      return {
        matches: sortMatches(Array.from(numericMatches)),
        note: `Reference "${raw}" matched as a competitor size code. Verify torque class and mounting interface with engineering.`,
        direct: null,
      };
    }
  }

  return { matches: [], note: null, direct: null };
}

export function findModelByTorque(requiredNm: number, angle?: string): HmrModel | null {
  const sorted = [...HMR_MODELS].sort((a,b)=>a.drivingNm-b.drivingNm);
  for (const m of sorted) {
    if (m.drivingNm >= requiredNm) {
      if (angle == null || angle === 'Any') return m;
      if (m.rotation.includes(angle)) return m;
    }
  }
  return null;
}

const TORQUE_CANDIDATE_SERIES_ORDER = ['HMR1','HMR4','HMR2','HMR3','HMR6'] as const;

/**
 * Torque-only search returns one candidate per helical rotary-actuator series
 * (HMR1/2/3/4/6). HMR5 is excluded because it is a valve actuator family.
 */
export function findModelsByTorque(requiredNm: number, angle?: string): HmrModel[] {
  const candidates: HmrModel[] = [];
  for (const code of TORQUE_CANDIDATE_SERIES_ORDER) {
    const eligible = HMR_MODELS.filter(
      (m) =>
        m.series === code &&
        m.drivingNm >= requiredNm &&
        (angle == null || angle === 'Any' || m.rotation.includes(angle))
    ).sort((a, b) => a.drivingNm - b.drivingNm);
    if (eligible.length) {
      candidates.push(eligible[0]);
    }
  }
  return candidates.sort((a, b) => {
    const idxA = TORQUE_CANDIDATE_SERIES_ORDER.indexOf(a.series as typeof TORQUE_CANDIDATE_SERIES_ORDER[number]);
    const idxB = TORQUE_CANDIDATE_SERIES_ORDER.indexOf(b.series as typeof TORQUE_CANDIDATE_SERIES_ORDER[number]);
    if (idxA !== idxB) return idxA - idxB;
    return (a.drivingNm - requiredNm) - (b.drivingNm - requiredNm);
  });
}

export type ParsedOrder =
  | { ok: true; series: string; spec: string; angle: string; mount: string; output: string; valve: string; model: HmrModel }
  | { ok: false; error: string };

function firstImplicitCode(list: { code: string; implicit?: boolean }[]): string {
  return list.find((x) => x.implicit)?.code || list[0]?.code || '';
}

export function parseOrderCodeInput(input: string): ParsedOrder {
  const trimmed = input.trim().toUpperCase().replace(/\s+/g, '');
  const parts = trimmed.split('-');
  if (parts.length < 2) {
    return { ok: false, error: 'Please enter a complete HMR order code (e.g. HMR2-280-180-FT-1F-NV).' };
  }
  const seriesCode = parts[0];
  if (!HMR_SERIES_CODES.includes(seriesCode as (typeof HMR_SERIES_CODES)[number])) {
    return { ok: false, error: `Unknown series code "${seriesCode}".` };
  }
  const schema = HMR_SERIES[seriesCode];
  const spec = parts[1];
  const model = HMR_MODELS.find((m) => m.series === seriesCode && m.spec === spec);
  if (!model) {
    return { ok: false, error: `${seriesCode}-${spec} is not a standard catalogue model.` };
  }

  const syntaxes = [schema.orderSyntax];
  if (schema.shortSyntax) syntaxes.push(schema.shortSyntax);

  let parsed: { angle: string; mount: string; output: string; valve: string } | null = null;

  for (const syntax of syntaxes) {
    const tokens = syntax.split('-');
    if (parts.length !== tokens.length) continue;
    const map: Record<string, string> = {};
    let ok = true;
    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.startsWith('{') && token.endsWith('}')) {
        map[token.slice(1, -1)] = parts[i];
      } else if (token !== parts[i]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (map.angle && !schema.angles.includes(map.angle) && !model.rotation.includes(map.angle)) continue;
    if (map.mount && !schema.mounts.some((x) => x.code === map.mount)) continue;
    if (map.output && !schema.outputs.some((x) => x.code === map.output)) continue;
    if (map.valve && !schema.valves.some((x) => x.code === map.valve)) continue;

    parsed = {
      angle: map.angle || model.rotation[0] || schema.angles[0] || '',
      mount: map.mount || firstImplicitCode(schema.mounts),
      output: map.output || firstImplicitCode(schema.outputs),
      valve: map.valve || schema.valves[0]?.code || '',
    };
    break;
  }

  if (!parsed) {
    if (parts.length === 2) {
      parsed = {
        angle: model.rotation[0] || schema.angles[0] || '',
        mount: firstImplicitCode(schema.mounts),
        output: firstImplicitCode(schema.outputs),
        valve: schema.valves[0]?.code || '',
      };
    } else {
      return {
        ok: false,
        error: `Invalid order code format for ${seriesCode}. Expected ${schema.orderSyntax}${schema.shortSyntax ? ` or ${schema.shortSyntax}` : ''}.`,
      };
    }
  }

  if (!model.rotation.includes(parsed.angle)) {
    return {
      ok: false,
      error: `${model.hmr} does not support ${parsed.angle}° rotation. Available: ${model.rotation.join('/')}°.`,
    };
  }

  return { ok: true, series: seriesCode, spec, ...parsed, model };
}

// --- Competitor full part-number parser (v7) ---

export type ConfidenceLevel = 'A' | 'B' | 'C';

export type CompetitorDirectResult = {
  model: HmrModel;
  angle: string;
  mount: string;
  output: string;
  valve: string;
  extras: string[];
  warnings: string[];
  layers: {
    parse: { level: ConfidenceLevel; note: string };
    manufacturing: { level: ConfidenceLevel; note: string };
    install: { level: ConfidenceLevel; note: string };
  };
};

export type CompetitorMatchResult = {
  matches: HmrModel[];
  note: string | null;
  direct: CompetitorDirectResult | null;
};

const HKS_VALVE_NOTICE =
  'Valve/seal options on HKS references are coded inside the FU / S9xxxx material number — confirm required valve, seals and rotation with engineering before ordering.';

function numericToken(tokens: string[]): string | null {
  for (const t of tokens) {
    const m = t.match(/^(\d+)/);
    if (m) return m[1];
  }
  return null;
}

function findModelsByAnchor(brand: keyof HmrComparable, anchor: string): HmrModel[] {
  return HMR_MODELS.filter((m) => m.comparable[brand].includes(anchor));
}

function findModelByAnchor(brand: keyof HmrComparable, anchor: string): HmrModel | null {
  const matches = findModelsByAnchor(brand, anchor);
  return matches.length === 1 ? matches[0] : null;
}

function parseAngle(value: string, model: HmrModel): string | null {
  const digits = value.match(/^(\d+)/)?.[1] || value;
  if (model.rotation.includes(digits)) return digits;
  return null;
}

function firstValidMount(seriesCode: string): string {
  const schema = HMR_SERIES[seriesCode];
  return schema.mounts.find((m) => m.implicit)?.code || schema.mounts[0]?.code || '';
}

function firstValidOutput(seriesCode: string): string {
  const schema = HMR_SERIES[seriesCode];
  return schema.outputs.find((o) => o.implicit)?.code || schema.outputs[0]?.code || '';
}

function firstValidValve(seriesCode: string): string {
  return HMR_SERIES[seriesCode].valves[0]?.code || '';
}

function parseHelac(input: string): CompetitorDirectResult | null {
  const raw = input;
  const familyMatch = raw.match(/\b(L10|L20|L30|L40|T20|T30)\b/i);
  if (!familyMatch) return null;
  const family = familyMatch[1].toUpperCase();
  const before = raw.slice(0, familyMatch.index);
  const after = raw.slice(familyMatch.index! + family.length);
  const tokens = after.split(/[-\s/]+/).filter(Boolean);
  const size = tokens[0];
  if (!size || !/^\d+$/.test(size)) return null;
  const anchor = `${family}-${size}`;
  const model = findModelByAnchor('helac', anchor);
  if (!model) return null;

  const schema = HMR_SERIES[model.series];
  const extras: string[] = [];
  let angle = model.rotation[0];
  let mount = firstValidMount(model.series);
  let valve = firstValidValve(model.series);

  for (let i = 1; i < tokens.length; i++) {
    const t = tokens[i].toUpperCase();
    if (['FT', 'RF', 'FF'].includes(t)) {
      if (schema.mounts.some((m) => m.code === t)) mount = t;
      else return null;
      continue;
    }
    const parsedAngle = parseAngle(t, model);
    if (parsedAngle) {
      angle = parsedAngle;
      continue;
    }
    if (t === 'S1' || t === 'S2') {
      extras.push(`bearing ${t}`);
      continue;
    }
    if (t === 'C') {
      valve = 'CB';
      continue;
    }
    if (t === '0') {
      valve = 'NV';
      continue;
    }
    if (t === 'H' || t === 'V') {
      extras.push(`seal ${t === 'H' ? 'NBR' : 'Viton'}`);
      continue;
    }
    if (t === 'E' || t === 'M') {
      extras.push(`port ${t === 'E' ? 'SAE/UNF (imperial)' : 'BSPP/G (metric)'}`);
      continue;
    }
    if (t) extras.push(t);
  }

  const output = firstValidOutput(model.series);
  const installLevel = extras.some((e) => e.startsWith('seal') || e.startsWith('port')) ? 'C' : 'B';
  return {
    model,
    angle,
    mount,
    output,
    valve,
    extras,
    warnings: [],
    layers: {
      parse: { level: 'A', note: 'Family and size recognised from published Helac catalogue segments.' },
      manufacturing: { level: 'A', note: 'Selected HMR size covers the comparable torque class.' },
      install: {
        level: installLevel,
        note:
          installLevel === 'C'
            ? 'Mount/angle can be mapped, but seal/port and installation dimensions need engineering drawing review.'
            : 'Mount/angle mapped from code segments; installation still requires engineering drawing review.',
      },
    },
  };
}

function parseHks(input: string): CompetitorDirectResult | null {
  const raw = input;
  const familyMatch = raw.match(/\b(M-DA-H-F5|M-DA-H-F10|M-DA-H-F7|M-DA-H|DA-H)\b/i);
  if (!familyMatch) return null;
  const familyRaw = familyMatch[1];
  const family = familyRaw.toUpperCase();
  const after = raw.slice(familyMatch.index! + familyRaw.length);
  const tokens = after.split(/[\s,]+/).filter(Boolean);
  const size = numericToken(tokens);
  if (!size) return null;

  let anchor: string;
  let mount: string;
  if (family === 'M-DA-H-F5') {
    anchor = `F5 ${size}`;
    mount = 'FT';
  } else if (family === 'M-DA-H-F10') {
    anchor = `F10 ${size}`;
    mount = 'FF';
  } else if (family === 'M-DA-H-F7') {
    anchor = `M-DA-H-F7 ${size}`;
    mount = 'FT';
  } else if (family === 'M-DA-H') {
    anchor = `M-DA-H ${size}`;
    mount = 'FF';
  } else {
    anchor = `DA-H ${size}`;
    mount = 'FL';
  }

  const model = findModelByAnchor('hks', anchor);
  if (!model) return null;

  const schema = HMR_SERIES[model.series];
  const extras: string[] = [];
  let angle = model.rotation[0];

  for (const t of tokens) {
    const u = t.toUpperCase();
    const parsedAngle = parseAngle(u, model);
    if (parsedAngle) {
      angle = parsedAngle;
      continue;
    }
    if (u === 'S1' || u === 'S2') {
      extras.push(`bearing ${u}`);
      continue;
    }
    if (u === 'LH' || u === 'RH') {
      extras.push(`rotation ${u}`);
      continue;
    }
    if (u === 'FU' || /^S9\d{3,}$/i.test(u)) {
      extras.push(u);
      continue;
    }
    if (/^\d+$/.test(u)) continue; // size already handled
    extras.push(u);
  }

  const output = firstValidOutput(model.series);
  const valve = firstValidValve(model.series); // never preselect
  return {
    model,
    angle,
    mount,
    output,
    valve,
    extras,
    warnings: [HKS_VALVE_NOTICE],
    layers: {
      parse: { level: 'A', note: 'HKS family and size number recognised from published designation.' },
      manufacturing: { level: 'A', note: 'Selected HMR size covers the comparable torque class.' },
      install: {
        level: 'C',
        note: 'HKS valve/seal options are coded inside the FU / S9xxxx material number; installation requires engineering drawing review.',
      },
    },
  };
}

function parseMoveco(input: string): CompetitorDirectResult | null {
  const raw = input;
  const familyMatch = raw.match(/\b(RR|RB|RC|RM|RL|RP)\b/i);
  if (!familyMatch) return null;
  const family = familyMatch[1].toUpperCase();
  const after = raw.slice(familyMatch.index! + family.length);
  const sizeMatch = after.match(/\b(\d+)\b/);
  if (!sizeMatch) return null;
  const size = sizeMatch[1];
  const anchor = `${family}${size}`;
  const model = findModelByAnchor('moveco', anchor);
  if (!model) return null;

  const suffix = after.replace(sizeMatch[0], '').trim();
  const extras: string[] = [];
  if (suffix && !/^[-/\s]*$/.test(suffix)) {
    extras.push(`Moveco suffix "${suffix}" not public; confirm with engineering`);
  }
  if (model.comparableNote) extras.push(model.comparableNote);

  const angle = model.rotation[0];
  const mount = firstValidMount(model.series);
  const output = firstValidOutput(model.series);
  const valve = firstValidValve(model.series);
  return {
    model,
    angle,
    mount,
    output,
    valve,
    extras,
    warnings: [],
    layers: {
      parse: {
        level: 'B',
        note: 'Moveco publishes only the short family+size designation; longer suffixes are not public.',
      },
      manufacturing: { level: 'A', note: 'Selected HMR size covers the comparable torque class.' },
      install: {
        level: 'C',
        note: 'Suffix details and installation dimensions must be confirmed with engineering drawings.',
      },
    },
  };
}

function parseSungji(input: string): CompetitorDirectResult | null {
  const raw = input;
  const familyMatch = raw.match(/\b(SRA|SRC|SRS)\b/i);
  if (!familyMatch) return null;
  const family = familyMatch[1].toUpperCase();
  const tokens = raw.split(/[-\s/]+/).filter(Boolean);
  const sizeIdx = tokens.findIndex((t) => t.toUpperCase() === family) + 1;
  const size = tokens[sizeIdx];
  if (!size || !/^\d+$/.test(size)) return null;
  const anchor = `${family}-${size}`;
  const model = findModelByAnchor('sungji', anchor);
  if (!model) return null;

  const schema = HMR_SERIES[model.series];
  const extras: string[] = [];
  let angle = model.rotation[0];
  let mount = firstValidMount(model.series);
  let valve = firstValidValve(model.series);

  for (let i = sizeIdx + 1; i < tokens.length; i++) {
    const t = tokens[i].toUpperCase();
    const parsedAngle = parseAngle(t, model);
    if (parsedAngle) {
      angle = parsedAngle;
      continue;
    }
    if (['FT', 'RF', 'FF', 'CL'].includes(t)) {
      if (schema.mounts.some((m) => m.code === t)) mount = t;
      else return null;
      continue;
    }
    if (t === 'CN' || t === 'CG') {
      valve = 'CB';
      continue;
    }
    if (t === 'CO') {
      valve = 'NV';
      continue;
    }
    if (t === 'SH' || t === 'SE') {
      extras.push(`shaft end ${t}`);
      continue;
    }
    if (t === 'N' || t === 'I') {
      extras.push(t === 'N' ? 'standard seal' : 'version I');
      continue;
    }
    extras.push(t);
  }

  const output = firstValidOutput(model.series);
  const hasNonPublicSegments = extras.length > 0;
  return {
    model,
    angle,
    mount,
    output,
    valve,
    extras,
    warnings: [],
    layers: {
      parse: {
        level: hasNonPublicSegments ? 'B' : 'A',
        note: hasNonPublicSegments
          ? 'Sungji family, size and most option segments are public; some suffixes need confirmation.'
          : 'Sungji family, size and option segments recognised from published catalogue.',
      },
      manufacturing: { level: 'A', note: 'Selected HMR size covers the comparable torque class.' },
      install: {
        level: hasNonPublicSegments ? 'C' : 'B',
        note: hasNonPublicSegments
          ? 'Some suffix details and installation dimensions need engineering drawing review.'
          : 'Mount/angle/valve mapped from code segments; installation still requires engineering drawing review.',
      },
    },
  };
}

export function evaluateCompetitorCode(input: string): CompetitorDirectResult | null {
  const trimmed = input.trim();
  if (!trimmed || /^\d+$/.test(trimmed)) return null;
  return (
    parseHelac(trimmed) || parseHks(trimmed) || parseMoveco(trimmed) || parseSungji(trimmed) || null
  );
}

export function buildOrderCode(
  seriesCode: string,
  spec: string,
  angle: string,
  mountCode: string,
  outputCode: string,
  valveCode: string
): string {
  const schema = HMR_SERIES[seriesCode];
  return schema.orderSyntax
    .replace('{spec}', spec)
    .replace('{angle}', angle)
    .replace('{mount}', mountCode)
    .replace('{output}', outputCode)
    .replace('{valve}', valveCode);
}

export function getSeriesImage(seriesCode: string, mountCode?: string): string {
  if (seriesCode === 'HMR4') {
    return mountCode === 'FF' || mountCode === 'RF'
      ? '/images/products/hmr4-flange-mount-FF-RF.png'
      : '/images/products/hmr4-foot-mount-FT.png';
  }
  const map: Record<string,string> = {
    HMR1: '/images/products/hmr1-front-flange-keyed-shaft.png',
    HMR2: '/images/products/hmr2-foot-flange-disc-output.png',
    HMR3: '/images/products/hmr3-flange-flange-disc-output.png',
    HMR5: '/images/products/hmr5-heavy-duty-valve-block-photo.png',
    HMR6: '/images/products/hmr6-foot-through-splined-shaft.png',
  };
  return map[seriesCode] || '';
}

export function getMaxDrivingNm(): number {
  return Math.max(...HMR_MODELS.map(m=>m.drivingNm));
}
