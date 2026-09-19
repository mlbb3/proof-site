import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatMoney } from '../../src/lib/money.ts';

test('formats integer minor units as euro, no decimals', () => {
  assert.equal(formatMoney(118000, 'EUR'), '€1,180');
});
test('throws on non-integer minor units', () => {
  assert.throws(() => formatMoney(1.5, 'EUR'));
});
