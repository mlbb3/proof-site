# Living Proof Build Implementation Plan (Phase 0 + Phase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the proof-site foundation on Max's approved identity (faint-teal ground, finca palette, Barlow) and build the hero as an autoplay-once GSAP run of the real Papote pipeline, to the point where Max can see and critique a quasi-tangible page at 390 / 768 / 1280.

**Architecture:** Astro static site, hub-and-spoke. A typed data layer holds the pipeline's stages and figures, each carrying its real source table name; pure functions (formatting, reconciliation, comparability) are unit-tested; the visual pipeline is one vanilla GSAP timeline driven by measured DOM positions, with the finished state server-rendered so it is complete with JavaScript off. This plan reaches the FIRST TANGIBLE milestone (the hero) and stops for critique.

**Tech Stack:** Astro 7, TypeScript (strict), normal CSS with design-token custom properties, GSAP 3 (core timeline, no React, no ScrollTrigger), Barlow via Fontsource (self-hosted, no runtime Google Fonts request), Playwright + the pre-installed Chromium for screenshot gates, `node:test` for unit tests.

**Scope boundary:** This plan is Phase 0 and Phase 1 only. The `/papote` spoke (charts, levers), the live `/api/draft` surface (with its fail-closed safety architecture), the honesty-ledger data-refresh-at-build step, and the copy pass are each a separate plan, written after Max critiques the hero. That sequencing is deliberate: the design will move once it is tangible, and detailed specs for later phases would be planning on sand.

**Source of truth for design decisions:** `docs/superpowers/specs/2026-09-17-design-brief-living-proof.md` and `PRODUCT.md`. Locked by Max: spec-sheet-ledger lane; brand teal `#0a6f86`; Barlow; hub-and-spoke; autoplay-once hero with Skip and Replay; ground `#eef9fa` (faint teal) with white panels; the finca-tuned validated palette; copy last.

**Honesty rule that gates every data value:** the hero ships with SYNTHETIC values on the REAL structure, labelled "Working example". No real client figure is published in this plan. Real figures (the honesty-ledger counts) are a later, build-time-verified task. Every animated element maps to a named real table in the data layer so the structure is truthful even while the numbers are synthetic.

---

## File Structure

**Removed (the rejected precision-instrument hero):**
- `src/components/InspectableHero.astro`, `src/scripts/hero.ts`, `src/data/figures.ts`, `src/lib/format.ts` (superseded; their good ideas are carried into the new files below, so read them before deleting).

**Design tokens & type:**
- `src/styles/tokens.css` — rewritten: the finca palette, the faint-teal ground, Barlow stack, motion tokens. One place; swapping a value moves the whole site.
- `src/styles/global.css` — resets, ground on html/body, panel surface helper, Barlow application, reduced-motion base.
- `src/styles/fonts.css` — `@font-face` for self-hosted Barlow (Fontsource files copied into `public/fonts/`).

**Data layer (typed, one responsibility each):**
- `src/data/pipeline.ts` — the stage script: the ordered beats of the run, each with its label, human caption, and the real source table(s) it stands on. No GSAP, no DOM.
- `src/data/figures.ts` — the three headline figures, six bases each, synthetic values, comparability computed from bases. Carried over from the deleted file, re-typed.
- `src/data/documents.ts` — the synthetic supplier documents for the "check totals / hold one" beat: line-sum vs stated total, one that does not reconcile.

**Pure logic (unit-tested):**
- `src/lib/money.ts` — the single money-formatting boundary (integer minor units to string). Carried from the deleted `format.ts`.
- `src/lib/reconcile.ts` — `reconciles(doc)` returns whether a document's line sum equals its stated total; pure.
- `src/lib/comparability.ts` — `incomparableTo(figure)` returns the other figures and which bases differ; pure.

**Components (Astro, server-rendered finished state):**
- `src/components/Stage.astro` — the hero stage: renders the finished state of the pipeline (feeds, the held document, the three figures with bases, the composed brief) as semantic DOM with `data-stage-*` attributes. Complete with no JS.
- `src/components/Figure.astro` — one headline figure and its inspect panel (bases, source line, cannot-be-compared, the decision it drives). Reused three times.
- `src/components/Identity.astro` — the first-screen identity line and the contact row (WhatsApp + email fallback).

**Motion (one file owns GSAP):**
- `src/scripts/run.ts` — the entire hero choreography: one timeline, labels, measured positions, reset block, IntersectionObserver autoplay-once, Skip and Replay wiring, `prefers-reduced-motion` branch. This is the only file that imports gsap.

**Page:**
- `src/pages/index.astro` — the spine: Identity, Stage, then a placeholder anchor to the (not-yet-built) `/papote` spoke. Imports `run.ts` as a client module.

**Tests:**
- `test/check.mjs` — extend the existing defect-guard (em dash, dark query, doubled percent) with: ground is the token not a hardcoded hex; no `prefers-color-scheme: dark`; Barlow present.
- `test/unit/money.test.mjs`, `test/unit/reconcile.test.mjs`, `test/unit/comparability.test.mjs` — `node:test`.

**Screenshot harness (dev-only, not committed to the site):**
- Kept in the scratchpad as now (`shot.mjs`), pointed at the preview server.

---

## Phase 0: Foundation reset

### Task 0.1: Remove the rejected hero, keep the good ideas

**Files:**
- Read then delete: `src/components/InspectableHero.astro`, `src/scripts/hero.ts`, `src/data/figures.ts`, `src/lib/format.ts`
- Modify: `src/pages/index.astro` (back to a minimal placeholder so the build stays green)

- [ ] **Step 1: Read the four files** so their carried-over logic (money formatting, comparability, the six-bases shape, the JS-off-first pattern) is in hand before deletion.

- [ ] **Step 2: Reduce `src/pages/index.astro` to a minimal placeholder** importing only `Base`, so nothing references the about-to-be-deleted component:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Max Brown, back-office automation" description="Working example. Copy is written last.">
  <main><p>[ rebuilding ]</p></main>
</Base>
```

- [ ] **Step 3: Delete the four files.**

```bash
git rm src/components/InspectableHero.astro src/scripts/hero.ts src/data/figures.ts src/lib/format.ts
```

- [ ] **Step 4: Build to confirm green.** Run: `npm run build` → Expected: 2 pages built, no error.

- [ ] **Step 5: Commit.**

```bash
git add -A && git commit -m "refactor: remove rejected precision-instrument hero, keep logic to re-home"
```

### Task 0.2: Self-host Barlow

**Files:**
- Create: `src/styles/fonts.css`, `public/fonts/barlow-*.woff2`
- Add dependency: `@fontsource/barlow`

- [ ] **Step 1: Install Fontsource Barlow.** Run: `npm i @fontsource/barlow`. Expected: added to dependencies.

- [ ] **Step 2: Copy the weights actually used (400, 500, 600, 700) into `public/fonts/`** from `node_modules/@fontsource/barlow/files/`, latin subset, normal style, woff2 only. (Barlow Condensed for chart labels is a Phase 2 concern; not now.)

- [ ] **Step 3: Write `src/styles/fonts.css`** with four `@font-face` blocks, `font-display: swap`, `src: url('/fonts/barlow-latin-<wght>-normal.woff2') format('woff2')`.

- [ ] **Step 4: Build and confirm the font files land in `dist/fonts/`.** Run: `npm run build && ls dist/fonts`. Expected: the four woff2 files.

- [ ] **Step 5: Commit.**

```bash
git add -A && git commit -m "feat: self-host Barlow (Fontsource, latin, four weights)"
```

### Task 0.3: Rewrite the design tokens on the approved identity

**Files:**
- Rewrite: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Base.astro` (import fonts.css; set the ground)

- [ ] **Step 1: Rewrite `src/styles/tokens.css`.** Full token set (light only, OKLCH where practical, hex where a validated value is fixed). Values are the locked palette:

```css
:root {
  color-scheme: light;

  /* Ground and panels */
  --ground:      #eef9fa;              /* faint teal wash. The page. */
  --panel:       #ffffff;              /* stage, ledger, charts sit on white panels */
  --panel-2:     #f2ebe0;              /* warm-stone tint band, inside panels only */

  /* Ink (grey everything that is not data) */
  --ink:         #141414;              /* 17.2:1 on ground */
  --ink-2:       #4d4d4d;              /* captions, provenance */
  --ink-3:       #717171;              /* placeholder, disabled */
  --rule:        #d7d9d9;              /* hairline rules and grid */
  --rule-strong: var(--ink);

  /* Brand */
  --teal:        #0a6f86;              /* button, pipeline, headings-as-colour. 5.8:1 on white */
  --teal-tint:   #cfe6ec;             /* captured-not-verified fill */
  --terracotta:  #c2593a;             /* warm accent, held-doc lift, series 2 */
  --terracotta-tint: #f3dcd3;
  --sage:        #5a8f52;              /* matched / decided STATE, always labelled */
  --sage-tint:   #e3ece0;

  /* Status (fixed, never a series) */
  --held:        #fab219;              /* held for review, icon + label */
  --critical:    #d03b3b;             /* reserved, real errors */

  /* Chart series (validated finca order; ochre carries direct labels) */
  --series-1: #0c789a; --series-2: #c2593a; --series-3: #4e6cb3; --series-4: #907a22;
  --series-5: #8a4f7d; --series-6: #5a8f52; --series-7: #c9962b; --series-8: #b23a3a;

  /* Type */
  --font: "Barlow", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --figures: tabular-nums lining-nums;
  --w-reg: 400; --w-med: 500; --w-semi: 600; --w-bold: 700;
  --text-sm: 0.875rem; --text-base: 1rem; --text-md: 1.0625rem;
  --text-lg: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --text-xl: clamp(1.9rem, 1.4rem + 2vw, 3rem);
  --lead-tight: 1.12; --lead-snug: 1.3; --lead-text: 1.5;

  /* Space (4px base) */
  --s1:.25rem; --s2:.5rem; --s3:.75rem; --s4:1rem; --s5:1.5rem; --s6:2rem; --s7:3rem; --s8:4rem; --s9:6rem;
  --gutter: clamp(1rem, 4vw, 2rem);
  --page-max: 72rem;

  /* Shape and motion */
  --radius: 4px;                        /* panels get a small radius; the page is not a hard grid now */
  --rule-w: 1px;
  --focus-ring: 0 0 0 2px var(--ground), 0 0 0 4px var(--teal);
  --dur-fast: 180ms; --dur-move: 240ms; --dur-reveal: 300ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* expo.out */
  --ease-cam: cubic-bezier(0.37, 0, 0.63, 1);     /* sine.inOut, camera/travel */
}

@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast:0ms; --dur-move:0ms; --dur-reveal:0ms; }
}
```

- [ ] **Step 2: Update `src/styles/global.css`** so the ground is on html and body, panels get a helper, Barlow applies, figures are tabular. Set `body { background: var(--ground); color: var(--ink); font-family: var(--font); }`, add `.panel { background: var(--panel); border-radius: var(--radius); }`, and `text-wrap: balance` on h1-h3.

- [ ] **Step 3: In `src/layouts/Base.astro` frontmatter, import fonts.css before tokens/global.** Order: `import '../styles/fonts.css'; import '../styles/tokens.css'; import '../styles/global.css';`

- [ ] **Step 4: Build.** Run: `npm run build`. Expected: green.

- [ ] **Step 5: Screenshot the placeholder page at 390 to eyeball the ground and Barlow.** Run the scratchpad `shot.mjs` against the preview server; open `hero-390.png`. Expected: faint-teal ground, Barlow rendering, no cream.

- [ ] **Step 6: Commit.**

```bash
git add -A && git commit -m "feat: rewrite tokens on the finca palette, faint-teal ground, Barlow"
```

### Task 0.4: Extend the defect-guard for the new rules

**Files:**
- Modify: `test/check.mjs`

- [ ] **Step 1: Add three checks** to `test/check.mjs`'s `checkFile`: (a) fail if a CSS file other than `tokens.css` contains a raw `#` hex in a `background` declaration (grounds/panels must use tokens); (b) keep the existing dark-query fail; (c) fail if `src/styles/global.css` does not reference `var(--font)`. Keep it plain-JS, no deps.

- [ ] **Step 2: Run.** Run: `npm run check`. Expected: `check.mjs passed`.

- [ ] **Step 3: Commit.**

```bash
git add -A && git commit -m "test: guard token-only backgrounds and Barlow application"
```

---

## Phase 1: The hero pipeline stage

### Task 1.1: The money-formatting boundary (carried over, unit-tested)

**Files:**
- Create: `src/lib/money.ts`, `test/unit/money.test.mjs`

- [ ] **Step 1: Write the failing test** `test/unit/money.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatMoney } from '../../src/lib/money.ts';

test('formats integer minor units as euro, no decimals', () => {
  assert.equal(formatMoney(118000, 'EUR'), '€1,180');
});
test('throws on non-integer minor units', () => {
  assert.throws(() => formatMoney(1.5, 'EUR'));
});
```

- [ ] **Step 2: Run, expect fail** (module missing). Run: `node --experimental-strip-types --test test/unit/money.test.mjs`. Expected: FAIL.

- [ ] **Step 3: Implement `src/lib/money.ts`** exactly as the deleted `format.ts` (SYMBOL map for EUR `€` / GBP `£`, integer guard, `Math.round(minor/100).toLocaleString('en-GB')`).

- [ ] **Step 4: Run, expect pass.**

- [ ] **Step 5: Commit.** `git add -A && git commit -m "feat: money-formatting boundary with unit tests"`

### Task 1.2: The reconciliation function (unit-tested)

**Files:**
- Create: `src/lib/reconcile.ts`, `src/data/documents.ts`, `test/unit/reconcile.test.mjs`

- [ ] **Step 1: Write `src/data/documents.ts`** — a typed `SupplierDoc { supplier: string; invoiceNo: string; lineSumMinor: number; statedTotalMinor: number }` and a synthetic array of five: four where `lineSumMinor === statedTotalMinor`, one where they differ (the held document). Comment each as synthetic, modelled on the real `raw_*_invoices` shape (`lines_sum_excl_vat_cents` vs `total_excl_vat_cents`).

- [ ] **Step 2: Write the failing test** asserting `reconciles(doc)` is true for a matching doc, false for the mismatch, and that exactly one of the five fails.

- [ ] **Step 3: Run, expect fail.**

- [ ] **Step 4: Implement `src/lib/reconcile.ts`:** `export const reconciles = (d) => d.lineSumMinor === d.statedTotalMinor;`

- [ ] **Step 5: Run, expect pass. Commit.**

### Task 1.3: The figures and comparability (unit-tested)

**Files:**
- Create: `src/data/figures.ts`, `src/lib/comparability.ts`, `test/unit/comparability.test.mjs`

- [ ] **Step 1: Recreate `src/data/figures.ts`** from the deleted version: the six-basis `FigureBases`, `BASIS_LABELS`, and the three synthetic revenue figures (open-day take, month all-days, cash arrived) with `valueMinor`, `unit`, `plainEnglish`, `sourceLine` (naming the real column), `bases`, and `decision`.

- [ ] **Step 2: Write the failing test** asserting the open-day figure is incomparable to the month figure on `population` only, and to the cash figure on several bases.

- [ ] **Step 3: Run, expect fail.**

- [ ] **Step 4: Implement `src/lib/comparability.ts`:** `incomparableTo(figure)` mapping the other figures to `{ label, differing: string[] }` from basis inequality.

- [ ] **Step 5: Run, expect pass. Commit.**

### Task 1.4: The pipeline stage script (data, no motion)

**Files:**
- Create: `src/data/pipeline.ts`

- [ ] **Step 1: Write `src/data/pipeline.ts`** — the ordered beats as typed data, each `{ label, caption, source }` where `source` names the real table. Beats and their real sources are fixed by the brief:

```ts
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
```

- [ ] **Step 2: No test (pure data). Commit.** `git add -A && git commit -m "feat: pipeline beat script mapped to real Papote tables"`

### Task 1.5: The Stage component (finished state, JS-off complete)

**Files:**
- Create: `src/components/Stage.astro`, `src/components/Figure.astro`, `src/components/Identity.astro`

- [ ] **Step 1: Write `src/components/Figure.astro`** — props: one `Figure`. Renders label, value (`formatMoney`, tabular), and a native `<details>` inspect panel: plain-English, the six bases as a definition grid, source line, "cannot be set beside" (from `incomparableTo`, differing bases marked with a sage or terracotta chip, NOT the highlighter-on-everything of the rejected version), and the decision. `data-stage-figure={key}`. Works with no JS via `<details>`.

- [ ] **Step 2: Write `src/components/Identity.astro`** — the first-screen line (Max Brown, back-office automation) and the contact row: a teal WhatsApp button (`https://wa.me/447531188098`) and a plain email link placeholder. `data-stage-contact`.

- [ ] **Step 3: Write `src/components/Stage.astro`** — the finished state on a white `.panel`: the five documents (the held one carrying a terracotta lift and a `held` chip), the three `Figure`s, and the composed brief lines (one marked `estimate`, one shown excluded). Every animated node gets a `data-stage-*` attribute and a fallback coordinate is unnecessary because motion measures live. This renders fully and correctly with no JavaScript.

- [ ] **Step 4: Wire into `src/pages/index.astro`:** Identity, then Stage, then a placeholder `<a href="/papote">See the full Papote diagnosis</a>` (spoke not built yet).

- [ ] **Step 5: Build, then screenshot the FINISHED (no-JS) state at 390/768/1280.** Confirm: faint-teal ground, white stage panel, figures legible, held document distinct, brief composed. This is the reduced-motion / JS-off ground truth.

- [ ] **Step 6: Commit.** `git add -A && git commit -m "feat: hero stage finished state, complete with JavaScript off"`

### Task 1.6: The run (one GSAP timeline)

**Files:**
- Create: `src/scripts/run.ts`
- Add dependency: `gsap`
- Modify: `src/pages/index.astro` (import the client module; add Skip and Replay controls, hidden until enhanced)

- [ ] **Step 1: Install GSAP.** Run: `npm i gsap`. Expected: added.

- [ ] **Step 2: Add Skip and Replay controls to `index.astro`,** inside the stage, `hidden` by default; `run.ts` reveals them after binding (no dead controls if JS fails).

- [ ] **Step 3: Write `src/scripts/run.ts`** following gsap-choreography's rules, adapted to vanilla Astro: a single `gsap.timeline({ paused: true })`; a `measure(el)` helper reading `getBoundingClientRect` relative to the stage; initial-state `gsap.set` for every animated node; a reset block at position 0; the seven beats positioned by label with the brief's timings (0.8-1.5s breathing room after `holdMismatch`, `basisAttach`, `send`; `sine.inOut` travel, `expo.out` for the brief arrival, `none` for the brief's typed lines); Skip seeks to the end label; Replay calls the reset then `restart()`; an IntersectionObserver at 50% that plays once then unobserves; and a `prefers-reduced-motion` guard that leaves the finished state and hides Replay. The timeline never gates content visibility on a class (the finished state is already visible); it animates FROM the finished state's values, so a headless render or a hidden tab still shows the real page.

- [ ] **Step 4: Import `run.ts`** as a module script in `index.astro` (`<script>import '../scripts/run.ts'</script>`), which Astro bundles.

- [ ] **Step 5: Build; run the preview; drive it with Playwright** (autoplay fires, Skip jumps to end, Replay resets and replays) and capture a mid-run frame plus the settled frame at 1280. Confirm no layout shift, held document reads, brief composes.

- [ ] **Step 6: Reduced-motion pass.** Screenshot with Playwright `colorScheme`/`reducedMotion: 'reduce'`; confirm the finished state shows instantly, Replay hidden.

- [ ] **Step 7: Commit.** `git add -A && git commit -m "feat: hero run, one GSAP timeline, autoplay once, skip, replay, reduced-motion"`

### Task 1.7: FIRST TANGIBLE milestone — screenshot gate with Max

- [ ] **Step 1: Capture the full set:** finished state and mid-run at 390, 768, 1280, plus a short screen capture or frame sequence of the run.
- [ ] **Step 2: Push the branch.**
- [ ] **Step 3: Send Max the screenshots and STOP.** He critiques the tangible hero. Do not build the spoke, the live surface, or write copy until he has responded. Log his critique as DECISION/FAILED entries and, if the direction holds, write the Phase 2 plan (`/papote` spoke) then.

---

## Roadmap (later phases, each its own plan after the hero critique)

- **Phase 2, the `/papote` spoke.** Charts (the two-cafes thesis, the year, the day, the week-ahead test) built to the dataviz skill: SVG or a light chart lib, the validated series, grey-everything-not-data, direct labels, table view per chart, draw-in once in view. The levers with a working slider. The honesty key (`* †` marks) carried on every figure. Client artefacts shown in their own skin. Figures re-verified from source with client-data-audit at build.
- **Phase 3, the honesty ledger on the spine.** Replace synthetic counts with real ones, fetched by live query at build (34 briefs, 488/492 lines, 54/58 reconciled, etc.), each with its source and date. A build step that fails if a figure cannot be verified.
- **Phase 4, the live `/api/draft` surface.** Vercel function, the full fail-closed safety architecture from the rebuild spec: constrained fields only, approved templates, fixed refusal state, global budget + per-IP + concurrency + timeouts, dedicated provider workspace with a verified cap, byte-bounded input, strict output validation. Stress-tested before wiring.
- **Phase 5, copy.** voice.md + humanizer + line-by-line sign-off, against the finished build. Then deploy gate (fails on missing contact details), OG image, real-device WhatsApp test on iOS and a mid-range Android.

---

## Self-Review

**Spec coverage (this plan's scope = Phase 0 + Phase 1):** foundation reset (tokens, ground, Barlow) — Tasks 0.1-0.4. Hero as real pipeline run — Tasks 1.4-1.6. Inspect mechanic — Task 1.5. JS-off completeness — Task 1.5 step 5, Task 1.6 step 3. Reduced motion — Task 1.6 step 6. Autoplay once + Skip + Replay — Task 1.6. Honesty (synthetic on real structure, sources named) — Tasks 1.2-1.4. Palette/type/ground locked values — Task 0.3. The spoke, live surface, real-count ledger and copy are explicitly deferred to named later plans, per the scope boundary. No gap within scope.

**Placeholder scan:** the deferred phases are a roadmap, not tasks with hidden work; every in-scope step names its file, command and expected result. The one intentional placeholder in the built code (the `/papote` link and the email address) is called out as such and belongs to a later phase.

**Type consistency:** `formatMoney(minor, currency)`, `reconciles(doc)`, `incomparableTo(figure)`, `Beat`, `FigureBases`, `data-stage-*` are used identically wherever they appear. `documents.ts` field names (`lineSumMinor`, `statedTotalMinor`) match the reconcile test and function.

**Credit note (Max's constraint):** Phase 1 stops at the first tangible hero on purpose. It is the cheapest point at which the whole direction can be judged, and everything after it is re-planned once judged.
