// Defect-register guard. Runs in `npm run check`, after `astro check`.
// Each entry here is a structural fix for a verified defect from the old build
// (see docs/superpowers/specs/2026-09-15-proof-page-rebuild.md, "Defect register").
// This grows as the build grows; today it enforces the hard, always-true rules.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src';
const EXTS = ['.astro', '.css', '.ts', '.js', '.mjs', '.md'];
const failures = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXTS.some((e) => p.endsWith(e))) checkFile(p);
  }
}

function checkFile(path) {
  const text = readFileSync(path, 'utf8');

  // Hard rule: no em dash anywhere (British English, and Max's first check).
  if (text.includes('—')) {
    failures.push(`${path}: em dash (U+2014) found; use a comma, colon or full stop`);
  }

  // Hard rule: light mode only. No dark-scheme media query may exist.
  if (/prefers-color-scheme:\s*dark/.test(text)) {
    failures.push(`${path}: dark-mode media query found; this page is light only`);
  }

  // Guard against the old string-templating defect: an unresolved token like
  // {n}% or a doubled percent (the "11%%" bug) must never reach a template.
  if (/%%/.test(text)) {
    failures.push(`${path}: doubled percent "%%" found (the 11%% defect)`);
  }
}

walk(SRC);

if (failures.length) {
  console.error('check.mjs FAILED:');
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
console.log('check.mjs passed: ' + SRC + ' clean');
