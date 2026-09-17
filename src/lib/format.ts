// The single formatting boundary.
// Money lives as integer minor units + an explicit currency everywhere else in
// the app; it becomes a string in exactly one place, here. This is the structural
// fix for the old doubled-percent / stringly-typed defects: nothing
// interpolates a pre-formatted number into another template.

export type Currency = 'EUR' | 'GBP';

const SYMBOL: Record<Currency, string> = {
  EUR: '€',
  GBP: '£',
};

/** Format integer minor units (cents/pence) as a currency string, no decimals. */
export function formatMoney(minorUnits: number, currency: Currency): string {
  if (!Number.isInteger(minorUnits)) {
    throw new Error(`formatMoney expects integer minor units, got ${minorUnits}`);
  }
  const major = Math.round(minorUnits / 100);
  return SYMBOL[currency] + major.toLocaleString('en-GB');
}
