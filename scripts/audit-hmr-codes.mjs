#!/usr/bin/env node
/**
 * Site-wide audit of HMR order codes in the built static output.
 *
 * Catches the class of bug found on 2026-10-29: a model page showing another
 * model's order code (the HMR4-470 page displayed HMR4-500-180-FT-2F-CS).
 *
 * Checks, per HTML file under out/:
 *   1. every complete HMR code is legal per the frozen dictionary
 *   2. every partial code has legal segments so far (lists like HMR4-470-180-FT/FF/RF)
 *   3. on a model page, every COMPLETE code must belong to that model
 *   4. on a series hub page, every complete code must belong to that series
 *
 * Usage: node scripts/audit-hmr-codes.mjs [outDir]
 */
import fs from 'node:fs';
import path from 'node:path';
import { SERIES, MODELS, check, segmentCount } from './hmr-code.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const outDir = process.argv[2] ?? path.join(here, '..', 'out');
if (!fs.existsSync(outDir)) {
  console.error(`no build output at ${outDir} — build first, or pass a directory`);
  process.exit(2);
}

const TOKEN = /HMR[1-6]-[0-9]{2,4}(?:-[A-Z0-9]{1,4})*/g;

/** Validate a token that may be complete or a prefix of a list. */
function judge(tok) {
  const p = tok.split('-');
  const seriesCode = p[0];
  const s = SERIES[seriesCode];
  if (!s) return { level: 'bad', why: `unknown series ${seriesCode}` };
  const model = MODELS.find((m) => m.hmr === `${seriesCode}-${p[1]}`);
  if (!model) return { level: 'bad', why: `unknown size ${p[1]} in ${seriesCode}` };

  const want = segmentCount(seriesCode);
  if (p.length > want) return { level: 'bad', why: `${p.length} segments, syntax has ${want}` };
  if (p.length === want) {
    const r = check(tok);
    return r.ok ? { level: 'ok', model } : { level: 'bad', why: r.rows.find(([, v]) => /INVALID|expected/.test(v))?.[1] ?? 'invalid' };
  }
  // partial: validate the segments that are present, by template position
  const tpl = s.orderSyntax.split('-');
  for (let i = 1; i < p.length; i++) {
    const t = tpl[i];
    if (!t?.startsWith('{')) {
      if (t !== p[i]) return { level: 'bad', why: `segment ${i + 1}: expected ${t}, got ${p[i]}` };
      continue;
    }
    const key = t.slice(1, -1);
    const legal =
      key === 'angle'
        ? (model.rotation?.length ? model.rotation : s.angles).map(String)
        : key === 'mount'
          ? s.mounts.map((m) => m.code)
          : key === 'output'
            ? s.outputs.map((o) => o.code)
            : key === 'valve'
              ? s.valves.map((v) => v.code)
              : null;
    if (legal && !legal.includes(p[i])) return { level: 'bad', why: `${key} ${p[i]} not legal (${legal.join('/')})` };
  }
  return { level: 'partial', model };
}

function pageScope(file) {
  const rel = path.relative(outDir, file).replace(/\\/g, '/');
  const model = rel.match(/^products\/rotary-actuators\/(hmr[1-6]-\d{2,4})\.html$/);
  if (model) return { kind: 'model', key: model[1].toUpperCase() };
  const hub = rel.match(/^products\/rotary-actuators\/(hmr[1-6])\.html$/);
  if (hub) return { kind: 'series', key: hub[1].toUpperCase() };
  return { kind: 'other' };
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const files = walk(outDir);
const problems = [];
const seen = new Map();
let occurrences = 0;

// per-series bookkeeping, so the run doubles as a series-by-series sign-off
const stats = {};
for (const k of Object.keys(SERIES)) stats[k] = { pages: 0, codes: new Set(), bad: 0 };

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const scope = pageScope(f);
  const rel = path.relative(outDir, f).replace(/\\/g, '/');
  if (scope.kind === 'model') stats[scope.key.split('-')[0]].pages++;
  for (const tok of new Set(html.match(TOKEN) ?? [])) {
    occurrences++;
    const sr = tok.split('-')[0];
    if (stats[sr]) stats[sr].codes.add(tok);
    const j = judge(tok);
    if (j.level === 'bad') {
      if (stats[sr]) stats[sr].bad++;
      problems.push({ file: rel, code: tok, why: j.why });
      continue;
    }
    if (j.level !== 'ok') continue;
    const base = tok.split('-').slice(0, 2).join('-');
    if (scope.kind === 'model' && base !== scope.key)
      problems.push({ file: rel, code: tok, why: `complete code belongs to ${base}, page is ${scope.key}` });
    if (scope.kind === 'series' && tok.split('-')[0] !== scope.key)
      problems.push({ file: rel, code: tok, why: `code belongs to ${tok.split('-')[0]}, page is ${scope.key} hub` });
    seen.set(tok, (seen.get(tok) ?? 0) + 1);
  }
}

console.log(`scanned ${files.length} html files, ${occurrences} code occurrences, ${seen.size} distinct codes\n`);
console.log('series  model_pages  distinct_codes  bad');
for (const [k, v] of Object.entries(stats))
  console.log(`${k.padEnd(7)} ${String(v.pages).padStart(11)}  ${String(v.codes.size).padStart(14)}  ${String(v.bad).padStart(3)}`);
if (!problems.length) {
  console.log('\nOK — no illegal or mismatched order codes found');
  process.exit(0);
}
console.log(`\n${problems.length} problem(s):`);
for (const p of problems) console.log(`  ${p.file}\n    ${p.code}  —  ${p.why}`);
process.exit(1);
