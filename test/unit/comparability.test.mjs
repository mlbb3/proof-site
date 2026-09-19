import { test } from 'node:test';
import assert from 'node:assert/strict';
import { incomparableTo } from '../../src/lib/comparability.ts';
import { FIGURES } from '../../src/data/figures.ts';

const byKey = (k) => FIGURES.find((f) => f.key === k);

test('open-day figure is incomparable to the month figure on population only', () => {
  const openDay = byKey('open_day_take');
  const month = byKey('month_all_days');
  const result = incomparableTo(openDay);
  const vsMonth = result.find((r) => r.label === month.label);
  assert.deepEqual(vsMonth.differing, ['Population']);
});

test('open-day figure is incomparable to the cash figure on several bases', () => {
  const openDay = byKey('open_day_take');
  const cash = byKey('cash_recent_day');
  const result = incomparableTo(openDay);
  const vsCash = result.find((r) => r.label === cash.label);
  assert.deepEqual(vsCash.differing, ['VAT', 'Tips', 'Status', 'Population', 'Gross or net']);
});

test('a figure is never listed as incomparable to itself', () => {
  const openDay = byKey('open_day_take');
  const result = incomparableTo(openDay);
  assert.equal(result.length, FIGURES.length - 1);
  assert.ok(!result.some((r) => r.label === openDay.label));
});
