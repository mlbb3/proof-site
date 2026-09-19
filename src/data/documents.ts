// The synthetic supplier documents for the "check totals / hold one" beat.
//
// Modelled on Papote's real raw_*_invoices shape: every parsed invoice carries a
// lines_sum_excl_vat_cents (the sum of its line items) and a total_excl_vat_cents
// (the total the supplier stated on the document). A document reconciles when the
// two agree; when they do not, it is held for review rather than loaded, so a
// mis-parsed or mis-stated invoice never silently enters the figures.
//
// The STRUCTURE is real; these VALUES are synthetic and clearly a working example,
// so no client figure is published. Four reconcile; one does not (the held doc).

export interface SupplierDoc {
  supplier: string;
  invoiceNo: string;
  /** Sum of the document's line items, integer minor units. lines_sum_excl_vat_cents. */
  lineSumMinor: number;
  /** The total the supplier stated on the document, integer minor units. total_excl_vat_cents. */
  statedTotalMinor: number;
}

// Synthetic. Working example.
export const DOCUMENTS: SupplierDoc[] = [
  // Reconciles: line sum equals stated total.
  { supplier: 'Distribuidora del Valle', invoiceNo: 'DV-4471', lineSumMinor: 84250, statedTotalMinor: 84250 },
  // Reconciles.
  { supplier: 'Panaderia Rosales', invoiceNo: 'PR-1902', lineSumMinor: 31600, statedTotalMinor: 31600 },
  // Does not reconcile: line sum and stated total disagree. Held for review.
  { supplier: 'Cafes del Sur', invoiceNo: 'CS-0088', lineSumMinor: 52740, statedTotalMinor: 53100 },
  // Reconciles.
  { supplier: 'Lacteos La Vega', invoiceNo: 'LV-7315', lineSumMinor: 19880, statedTotalMinor: 19880 },
  // Reconciles.
  { supplier: 'Suministros Norte', invoiceNo: 'SN-2260', lineSumMinor: 46030, statedTotalMinor: 46030 },
];
