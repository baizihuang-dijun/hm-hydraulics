#!/usr/bin/env node
/**
 * HMR order-code tool. Single source of truth: src/lib/hmr/hmr-all-series.PUBLIC.json
 * (frozen v3 dictionary — series, angles, mounts, outputs, valves, order syntax).
 *
 * Why this exists: hand-typed order codes are the one place a 1F/2F or D/E slip
 * silently changes a drawing. Everything here is generated from the dictionary,
 * never typed by hand.
 *
 * Usage:
 *   node scripts/hmr-code.mjs list [HMR4] [--spec 470]
 *   node scripts/hmr-code.mjs check HMR4-470-180-FT-2F-CS
 *   node scripts/hmr-code.mjs from DKX-D470-180-FT-E-C
 *   node scripts/hmr-code.mjs csv > codes.csv
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(
  fs.readFileSync(path.join(here, '..', 'src', 'lib', 'hmr', 'hmr-all-series.PUBLIC.json'), 'utf8'),
);

const SERIES = DATA.series;
const MODELS = DATA.models;

// COYO output/valve letters -> HMR codes. Only where the dictionary is 1:1.
const COYO_OUT = { D: '1F', E: '2F' };
const COYO_VALVE = { C: 'CB', B: 'CS', 0: 'NV', O: 'NV' };
const COYO_SERIES = { A: 'HMR1', B: 'HMR2', C: 'HMR3', D: 'HMR4', E: 'HMR5', F: 'HMR6' };

function seriesOf(code) {
  const s = code.split('-')[0];
  return SERIES[s] ? s : null;
}

function modelOf(code) {
  const base = code.split('-').slice(0, 2).join('-');
  return MODELS.find((m) => m.hmr === base) ?? null;
}

/** Expand one model into every legal full order code. */
function expand(model) {
  const s = SERIES[model.series];
  const angles = (model.rotation?.length ? model.rotation : s.angles).map(String);
  const mounts = s.mounts.map((m) => m.code);
  const outputs = s.outputs.map((o) => o.code);
  const valves = s.valves.map((v) => v.code);
  const out = [];
  for (const angle of angles)
    for (const mount of mounts)
      for (const output of outputs)
        for (const valve of valves)
          out.push({ code: build(model.series, model.spec, angle, mount, output, valve), model });
  return out;
}

function build(seriesCode, spec, angle, mount, output, valve) {
  const syntax = SERIES[seriesCode].orderSyntax;
  const parts = [seriesCode, spec, angle];
  if (syntax.includes('{mount}')) parts.push(mount);
  if (syntax.includes('{output}')) parts.push(output);
  parts.push(valve);
  return parts.join('-');
}

/** Validate a full order code against the dictionary, segment by segment. */
function check(code) {
  const rows = [];
  const seriesCode = seriesOf(code);
  if (!seriesCode) return { ok: false, rows: [[code.split('-')[0], 'unknown series']] };
  const s = SERIES[seriesCode];
  const syntax = s.orderSyntax;
  const hasMount = syntax.includes('{mount}');
  const hasOutput = syntax.includes('{output}');
  const parts = code.split('-');
  const expectLen = 3 + (hasMount ? 1 : 0) + (hasOutput ? 1 : 0) + 1;
  if (parts.length !== expectLen)
    return { ok: false, rows: [['shape', `expected ${expectLen} segments (${syntax}), got ${parts.length}`]] };

  let i = 0;
  const [seriesSeg, specSeg] = parts;
  rows.push(['series', `${seriesSeg} ${SERIES[seriesSeg] ? 'ok' : 'INVALID'} — ${s.familyClass}, ${s.pressureBar} bar`]);
  const model = MODELS.find((m) => m.hmr === `${seriesSeg}-${specSeg}`);
  if (!model) return { ok: false, rows: [...rows, ['spec', `${specSeg} INVALID — not a published ${seriesSeg} size`]] };
  rows.push(['spec', `${specSeg} ok — ${model.drivingNm.toLocaleString('en-US')} Nm driving`]);
  i = 2;

  const angleSeg = parts[i++];
  const legalAngles = (model.rotation?.length ? model.rotation : s.angles).map(String);
  rows.push(['angle', `${angleSeg} ${legalAngles.includes(angleSeg) ? 'ok' : `INVALID — legal: ${legalAngles.join(' / ')}`}`]);

  let mountSeg = null;
  if (hasMount) {
    mountSeg = parts[i++];
    const legal = s.mounts.map((m) => m.code);
    rows.push(['mount', `${mountSeg} ${legal.includes(mountSeg) ? 'ok' : `INVALID — legal: ${legal.join(' / ')}`}`]);
  }
  let outputSeg = null;
  if (hasOutput) {
    outputSeg = parts[i++];
    const legal = s.outputs.map((o) => o.code);
    rows.push(['output', `${outputSeg} ${legal.includes(outputSeg) ? 'ok' : `INVALID — legal: ${legal.join(' / ')}`}`]);
  }
  const valveSeg = parts[i++];
  const legalV = s.valves.map((v) => v.code);
  rows.push(['valve', `${valveSeg} ${legalV.includes(valveSeg) ? 'ok' : `INVALID — legal: ${legalV.join(' / ')}`}`]);

  const ok = rows.every(([, v]) => !v.includes('INVALID'));
  return { ok, rows, model };
}

/** Convert a COYO DKX code to the HMR code. Refuses where the mapping is not 1:1. */
function fromCoyo(dkx) {
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
      msg: `${seriesCode} output/valve letters differ from the D/E,C/B scheme — convert by hand and verify`,
    };
  if (!COYO_OUT[out]) return { ok: false, msg: `unknown COYO output letter ${out}` };
  if (!(valve in COYO_VALVE)) return { ok: false, msg: `unknown COYO valve letter ${valve}` };
  const code = build(seriesCode, spec, angle, mount, COYO_OUT[out], COYO_VALVE[valve]);
  const v = check(code);
  return { ok: v.ok, code, rows: v.rows, msg: v.ok ? '' : 'generated code failed validation — check spec/angle/mount' };
}

const [cmd, arg, ...rest] = process.argv.slice(2);

if (cmd === 'list') {
  const filterSeries = arg && SERIES[arg] ? arg : null;
  const specIdx = rest.indexOf('--spec');
  const filterSpec = specIdx >= 0 ? rest[specIdx + 1] : null;
  const rows = MODELS.filter((m) => (!filterSeries || m.series === filterSeries) && (!filterSpec || String(m.spec) === filterSpec))
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
