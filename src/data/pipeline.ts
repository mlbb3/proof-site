// The stage script: the ordered beats of the hero run, each with its label, its
// human caption, and the real Papote source table(s) it stands on. No GSAP, no
// DOM. The motion layer (src/scripts/run.ts) drives from these beats; the
// captions are functional placeholders, since copy is written last.
//
// Every beat names a real table so the structure is truthful even while the
// animated figures are synthetic. Working example.

export interface Beat { label: string; caption: string; source: string; }

export const BEATS: Beat[] = [
  { label: 'feedsArrive',  caption: 'Five supplier documents, the till and the rota land.', source: 'supplier_registry (5), raw_*_invoices (78), Roller, Eitje' },
  { label: 'checkTotals',  caption: 'Each document’s lines add up to its stated total.', source: 'lines_sum_excl_vat_cents = total_excl_vat_cents' },
  { label: 'holdMismatch', caption: 'One does not reconcile. It is held for review, not loaded.', source: 'raw_supplier_parse_failures' },
  { label: 'rollUp',       caption: 'The reconciled rows become three headline figures.', source: 'daily_revenue_history, dash_monthly, eitje_realised_shifts' },
  { label: 'basisAttach',  caption: 'Each figure declares its six bases. Two refuse to be compared.', source: 'figure_bases (27 figures, six bases)' },
  { label: 'briefCompose', caption: 'The Morning Brief writes itself from those figures.', source: 'brief_runs, brief_items (confidence: checked / estimate / excluded)' },
  { label: 'send',         caption: 'The brief is delivered.', source: 'brief_deliveries' },
];
