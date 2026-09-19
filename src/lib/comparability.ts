// Comparability: which other figures a figure cannot be set beside, and why.
// Pure. Computed from the bases, not hand-written, so the page cannot drift from
// the data: two figures are comparable only if all six bases match.

import { FIGURES, BASIS_LABELS } from '../data/figures.ts';
import type { Figure, FigureBases } from '../data/figures.ts';

/**
 * Which other figures this one cannot be compared to, and which bases differ.
 * Computed from the bases, not hand-written, so the page cannot drift from the data.
 */
export function incomparableTo(figure: Figure): Array<{ label: string; differing: string[] }> {
  const keys = Object.keys(BASIS_LABELS) as Array<keyof FigureBases>;
  return FIGURES.filter((other) => other.key !== figure.key).map((other) => {
    const differing = keys
      .filter((k) => other.bases[k] !== figure.bases[k])
      .map((k) => BASIS_LABELS[k]);
    return { label: other.label, differing };
  });
}
