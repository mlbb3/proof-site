// Reconciliation: does a supplier document's line sum equal its stated total?
// Pure. This is the gate for the "check totals / hold one" beat: a document that
// does not reconcile is held for review, not loaded into the figures.

import type { SupplierDoc } from '../data/documents';

/** True when the document's line sum equals its stated total. */
export const reconciles = (d: SupplierDoc): boolean => d.lineSumMinor === d.statedTotalMinor;
