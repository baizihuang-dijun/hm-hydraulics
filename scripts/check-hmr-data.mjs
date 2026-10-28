#!/usr/bin/env node
/**
 * Build gate for the public HMR dataset.
 *
 * Blocks the build when:
 *   1. a comparable brand outside the four cleared public brands appears (in-house-only
 *      sources must never be published as comparable);
 *   2. any published torque figure drifts from the authority snapshot;
 *   3. a published model is missing from the authority snapshot, or vice versa;
 *   4. source-brand tokens leak into src/.
 *
 * Fix the data, not the gate. Regenerate the snapshot with
 * scripts/export-hmr-torque-authority.py after an approved DB change.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DATA = join(ROOT, 'src/lib/hmr/hmr-all-series.PUBLIC.json');
const AUTH = join(ROOT, 'src/lib/hmr/hmr-torque-authority.json');

const failures = [];
const fail = (msg) => failures.push(msg);

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const auth = JSON.parse(readFileSync(AUTH, 'utf8'));

if (!Array.isArray(data.models) || !data.models.length) fail('public dataset has no models');
if (!auth.models || typeof auth.models !== 'object') fail('authority snapshot has no models map');

// ---- 1. comparable brands ----
const allowed = new Set(auth.publicBrands ?? []);
if (allowed.size === 0) fail('authority snapshot declares no publicBrands');
for (const m of data.models ?? []) {
  for (const brand of Object.keys(m.comparable ?? {})) {
    if (!allowed.has(brand)) {
      fail(`${m.hmr}: comparable brand "${brand}" is not cleared for publication`);
    }
  }
}

// ---- 2. forbidden tokens anywhere in the shipped data ----
const forbidden = /coyo|dkx[-_ ]?[a-f]\b|中颐|zhongyi/i;
const walk = (node, path) => {
  if (typeof node === 'string') {
    if (forbidden.test(node)) fail(`${path}: forbidden source token in published string "${node.slice(0, 60)}"`);
    return;
  }
  if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (forbidden.test(k)) fail(`${path}: forbidden source token in key "${k}"`);
      walk(v, `${path}.${k}`);
    }
  }
};
walk(data, 'PUBLIC');

// ---- 3. torque parity ----
const authoritative = { ...(auth.models ?? {}) };
for (const [id, e] of Object.entries(auth.engineered ?? {})) authoritative[id] = e.drivingNm;

const seen = new Set();
for (const m of data.models ?? []) {
  if (seen.has(m.hmr)) fail(`${m.hmr}: duplicate model id`);
  seen.add(m.hmr);
  if (!(m.hmr in authoritative)) {
    fail(`${m.hmr}: published but absent from the authority snapshot`);
    continue;
  }
  if (Number(m.drivingNm) !== Number(authoritative[m.hmr])) {
    fail(`${m.hmr}: drivingNm ${m.drivingNm} != authority ${authoritative[m.hmr]}`);
  }
}
for (const id of Object.keys(authoritative)) {
  if (!seen.has(id)) fail(`${id}: in the authority snapshot but missing from the published dataset`);
}

// ---- 4. source tokens in source tree ----
const SRC = join(ROOT, 'src');
const skip = new Set(['hmr-torque-authority.json']);
const scan = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) { scan(full); continue; }
    if (skip.has(entry)) continue;
    if (!/\.(ts|tsx|js|jsx|json|md|mdx|css)$/.test(entry)) continue;
    const text = readFileSync(full, 'utf8');
    if (forbidden.test(text)) fail(`${relative(ROOT, full)}: forbidden source token in src/`);
  }
};
scan(SRC);

if (failures.length) {
  console.error('\n✗ HMR data gate failed:\n');
  for (const f of failures) console.error('  - ' + f);
  console.error('\nFix the data source, then regenerate the authority snapshot.\n');
  process.exit(1);
}

console.log(
  `✓ HMR data gate passed — ${data.models.length} models, ${allowed.size} cleared brands, torque parity exact.`
);
