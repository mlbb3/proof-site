// The inspectable hero's data contract.
//
// Grounded in Papote's real `figure_bases` registry (27 figures, each declaring
// six bases; two figures are comparable only if all six match). The STRUCTURE is
// real; the VALUES here are synthetic and clearly labelled a working example, so
// no client figure is published. Three real revenue figures are modelled because
// they look interchangeable and are not: same word, different basis.
//
// Copy is written last. The labels and prose here are functional placeholders.
// Comparability is computed in src/lib/comparability.ts from these bases.

import type { Currency } from '../lib/money';

/** The six bases every figure must declare. Comparable only if all six match. */
export interface FigureBases {
  vat: string;
  tips: string;
  statusFilter: string;
  population: string;
  refunds: string;
  grossOrNet: string;
}

export const BASIS_LABELS: Record<keyof FigureBases, string> = {
  vat: 'VAT',
  tips: 'Tips',
  statusFilter: 'Status',
  population: 'Population',
  refunds: 'Refunds',
  grossOrNet: 'Gross or net',
};

export interface Figure {
  key: string;
  /** Placeholder label. */
  label: string;
  /** Money as integer minor units; formatted once, at the boundary. */
  valueMinor: number;
  currency: Currency;
  /** A per-day figure and a monthly figure carry different units; state it. */
  unit: 'per open day' | 'for the month' | 'on the day';
  plainEnglish: string;
  sourceLine: string;
  bases: FigureBases;
  /** The lever the figure informs: rigour in service of a decision, not pedantry. */
  decision: string;
}

// Synthetic values, faithful to the real bases. Working example.
export const FIGURES: Figure[] = [
  {
    key: 'open_day_take',
    label: 'What an open day takes',
    valueMinor: 118000,
    currency: 'EUR',
    unit: 'per open day',
    plainEnglish:
      'What the cafe took on an average day it was actually open, once VAT and tips are taken out.',
    sourceLine: 'daily net-of-tip takings ÷ 1.09, averaged over days flagged open',
    bases: {
      vat: 'removed at 9%',
      tips: 'removed',
      statusFilter: 'completed payments only',
      population: 'open days only',
      refunds: 'not established',
      grossOrNet: 'net',
    },
    decision:
      'Plan the rota, stock and prices against this, aimed at the winter climb, not the summer dip.',
  },
  {
    key: 'month_all_days',
    label: 'What came in over the month',
    valueMinor: 2860000,
    currency: 'EUR',
    unit: 'for the month',
    plainEnglish:
      'Everything that came in that month, including the days the cafe was shut to walk-ins but ran a party.',
    sourceLine: 'daily net-of-tip takings ÷ 1.09, every day with money, no open-day filter',
    bases: {
      vat: 'removed at 9%',
      tips: 'removed',
      statusFilter: 'completed payments only',
      population: 'every day money came in, open and closed',
      refunds: 'not established',
      grossOrNet: 'net',
    },
    decision:
      'This carries closed-day party income. Do not read it as walk-in trading strength.',
  },
  {
    key: 'cash_recent_day',
    label: 'Money that arrived',
    valueMinor: 214000,
    currency: 'EUR',
    unit: 'on the day',
    plainEnglish:
      'Money that landed in the account that day. A party paid for weeks ago arrives on the day it was paid, not the day it happens.',
    sourceLine: 'funds received that day, straight from the till pipe',
    bases: {
      vat: 'included',
      tips: 'not established',
      statusFilter: 'money actually received',
      population: 'a single recent day',
      refunds: 'not established',
      grossOrNet: 'gross',
    },
    decision:
      'This is cash timing, not sales made. Do not run the kitchen or the rota off it.',
  },
];
