import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reconciles } from '../../src/lib/reconcile.ts';
import { DOCUMENTS } from '../../src/data/documents.ts';

test('reconciles is true when line sum equals stated total', () => {
  assert.equal(reconciles({ supplier: 'x', invoiceNo: 'y', lineSumMinor: 1000, statedTotalMinor: 1000 }), true);
});

test('reconciles is false when line sum differs from stated total', () => {
  assert.equal(reconciles({ supplier: 'x', invoiceNo: 'y', lineSumMinor: 1000, statedTotalMinor: 1010 }), false);
});

test('exactly one of the five synthetic documents fails to reconcile', () => {
  const failing = DOCUMENTS.filter((d) => !reconciles(d));
  assert.equal(failing.length, 1);
  assert.equal(failing[0].invoiceNo, 'CS-0088');
});
