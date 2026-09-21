import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatMoney } from '../../src/lib/money.ts';

test('formats integer minor units as euro, no decimals', () => {
  assert.equal(formatMoney(118000, 'EUR'), '€1,180');
});
test('throws on non-integer minor units', () => {
  assert.throws(() => formatMoney(1.5, 'EUR'));
});

import { formatMoneyExact } from '../../src/lib/money.ts';
test('formats pence exactly for invoice rows', () => {
  assert.equal(formatMoneyExact(86240, 'GBP'), '£862.40');
  assert.equal(formatMoneyExact(129400, 'GBP'), '£1,294.00');
});
