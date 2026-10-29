#!/usr/bin/env node
/**
 * HMR order-code tool. Single source of truth: src/lib/hmr/hmr-all-series.PUBLIC.json
 * (frozen v3 dictionary — series, angles, mounts, outputs, valves, order syntax).
 *
 * Why this exists: hand-typed order codes are the one place a 1F/2F or D/E slip
 * silently changes a drawing. Everything here is generated from the dictionary
 * template, never assembled by hand and never typed by hand.
 *
 * Parsing is template-driven: the series orderSyntax is split on '-' and each
 * literal segment must match exactly, each {placeholder} is validated against
 * the dictionary. This is the only way to stay correct for series whose syntax
 * has literal segments (HMR2 has a literal FT, HMR3 a literal FF-1F).
 *
 * Usage:
 *   node scripts/hmr-code.mjs list [HMR4] [--spec 470]
 *   node scripts/hmr-code.mjs check HMR4-470-180-FT-2F-CS
 *   node scripts/hmr-code.mjs from DKX-D470-180-FT-E-C
 *   node scripts/hmr-code.mjs csv
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(
  fs.readFileSync(path.join(here, '..', 'src', 'lib', 'hmr', 'hmr-all-series.PUBLIC.json'), 'utf8'),
);

export const SERIES = DATA.series;
export const MODELS = DATA.models;

// COYO output/valve letters -> HMR codes, only where the dictionary is 1:1.
const COYO_OUT = { D: '1F', E: '2F' };
const COYO_VALVE = { C: 'CB', B: 'CS', 0: 'NV', O: 'NV' };
const COYO_SERIES = { A: 'HMR1', B: 'HMR2', C: 'HMR3', D: 'HMR4', E: 'HMR5', F: 'HMR6' };

/** Fill a series order-syntax template with concrete values. */
export function build(seriesCode, { spec, angle, mount, output, valve }) {
  const s = SERIES[seriesCode];
  if (!s) return null;
  return s.orderSyntax
    .replace('{spec}', spec)
    .replace('{angle}', angle)
    .replace('{mount}', mount ?? '')
    .replace('{output}', output ?? '')
    .replace('{valve}', valve);
}

/** Number of segments a complete code for this series must have. */
export function segmentCount(seriesCode) {
  const s = SERIES[seriesCode];
  return s ? s.orderSyntax.split('-').length : null;
}

/** Validate a full order code against the dictionary, segment by segment. */
export function check(code) {
  const rows = [];
  const p = code.split('-');
  const seriesCode = p[0];
  const s = SERIES[seriesCode];
  if (!s) return { ok: false, rows: [[seriesCode, 'unknown series']] };

  const tpl = s.orderSyntax.split('-');
  if (p.length !== tpl.length)
    return {
      ok: false,
      rows: [['shape', `expected ${tpl.length} segments (${s.orderSyntax}), got ${p.length}`]],
    };

  let model = null;
  for (let i = 0; i < tpl.length; i++) {
    const t = tpl[i];
    const v = p[i];
    if (!t.startsWith('{')) {
      if (t !== v) return { ok: false, rows: [...rows, [`seg ${i + 1}`, `expected literal ${t}, got ${v}`]] };
      rows.push([`seg ${i + 1}`, `${v} (fixed)`]);
      continue;
    }
    const key = t.slice(1, -1);
    if (key === 'spec') {
      model = MODELS.find((m) => m.hmr === `${seriesCode}-${v}`) ?? null;
      if (!model) return { ok: false, rows: [...rows, ['spec', `${v} INVALID — not a published ${seriesCode} size`]] };
      rows.push(['spec', `${v} ok — ${model.drivingNm.toLocaleString('en-US')} Nm driving`]);
    } else if (key === 'angle') {
      const legal = (model?.rotation?.length ? model.rotation : s.angles).map(String);
      rows.push(['angle', `${v} ${legal.includes(v) ? 'ok' : `INVALID — legal: ${legal.join(' / ')}`}`]);
    } else if (key === 'mount') {
      const legal = s.mounts.map((m) => m.code);
      rows.push(['mount', `${v} ${legal.includes(v) ? 'ok' : `INVALID — legal: ${legal.join(' / ')}`}`]);
    } else if (key === 'output') {
      const legal = s.outputs.map((o) => o.code);
      rows.push(['output', `${v} ${legal.includes(v) ? 'ok' : `INVALID — legal: ${legal.join(' / ')}`}`]);
    } else if (key === 'valve') {
      const legal = s.valves.map((x) => x.code);
      rows.push(['valve', `${v} ${legal.includes(v) ? 'ok' : `INVALID — legal: ${legal.join(' / ')}`}`]);
    }
  }
  const ok = rows.every(([, v]) => !v.includes('INVALID') && !v.includes('expected literal'));
  return { ok, rows, model };
}

/** Expand one model into every legal full order code. */
export function expand(model) {
  const s = SERIES[model.series];
  const angles = (model.rotation?.length ? model.rotation : s.angles).map(String);
  const out = [];
  for (const angle of angles)
    for (const mount of s.mounts.map((m) => m.code))
      for (const output of s.outputs.map((o) => o.code))
        for (const valve of s.valves.map((v) => v.code)) {
          const code = build(model.series, { spec: model.spec, angle, mount, output, valve });
          if (code && check(code).ok) out.push({ code, model });
        }
  return out;
}

/** Convert a COYO DKX code to the HMR code. Refuses where the mapping is not 1:1. */
export function fromCoyo(dkx) {
  const p = dkx.split('-');
  if (p[0] !== 'DKX' || p.length !== 6) return { ok: false, msg: `not a 6-segment DKX code: ${dkx}` };
  const [, body, angle, mount, out, valve] = p;
  const letter = body[0];
  const spec = body.slice(1);
  const seriesCode = COYO_SERIES[letter];
  if (!seriesCode) return { ok: false, msg: `unknown COYO series letter ${letter}` };
  if (!['HMR2', 'HMR3', 'HMR4'].includes(seriesCode))
    return {
      ok: false,
      msg: `${seriesCode} output/valve letters are not the D/E, C/B scheme — convert by hand and verify`,
    };
  if (!COYO_OUT[out]) return { ok: false, msg: `unknown COYO output letter ${out}` };
  if (!(valve in COYO_VALVE)) return { ok: false, msg: `unknown COYO valve letter ${valve}` };
  const code = build(seriesCode, {
    spec,
    angle,
    mount,
    output: COYO_OUT[out],
    valve: COYO_VALVE[valve],
  });
  const v = check(code);
  return { ok: v.ok, code, rows: v.rows, msg: v.ok ? '' : 'generated code failed validation — check spec/angle/mount' };
}

/* ---------------------------------- CLI ---------------------------------- */
const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isCli) {
  const [cmd, arg, ...rest] = process.argv.slice(2);
  if (cmd === 'list') {
    const filterSeries = arg && SERIES[arg] ? arg : null;
    const specIdx = rest.indexOf('--spec');
    const filterSpec = specIdx >= 0 ? rest[specIdx + 1] : null;
    const rows = MODELS.filter(
      (m) => (!filterSeries || m.series === filterSeries) && (!filterSpec || String(m.spec) === filterSpec),
    )
      .flatMap(expand)
      .map((r) => `${r.code},${r.model.hmr},${r.model.drivingNm}`);
    console.log('code,base_model,drivingNm');
    console.log(rows.join('\n'));
  } else if (cmd === 'csv') {
    console.log('code,base_model,series,spec,drivingNm');
    for (const m of MODELS)
      for (const r of expand(m)) console.log(`${r.code},${m.hmr},${m.series},${m.spec},${m.drivingNm}`);
  } else if (cmd === 'check') {
    const r = check(arg);
    for (const [k, v] of r.rows) console.log(`${k.padEnd(8)} ${v}`);
    console.log(r.ok ? '\nVALID' : '\nINVALID');
    process.exit(r.ok ? 0 : 1);
  } else if (cmd === 'from') {
    const r = fromCoyo(arg);
    if (r.rows) for (const [k, v] of r.rows) console.log(`${k.padEnd(8)} ${v}`);
    if (r.code) console.log(`\n${arg}  ->  ${r.code}`);
    if (!r.ok) console.log(`\n${r.msg || 'FAILED'}`);
    process.exit(r.ok ? 0 : 1);
  } else {
    console.log('usage: list [SERIES] [--spec N] | check CODE | from DKX-CODE | csv');
  }
}
