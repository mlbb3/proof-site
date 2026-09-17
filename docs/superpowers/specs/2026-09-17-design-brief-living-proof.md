# Design brief: the living proof (spine + Papote spoke)

Date: 17 September 2026. Impeccable `shape` output, brand register. Supersedes the precision-instrument aesthetic (rejected by Max on sight, 17 Sep) and the "one page" composition (Max chose hub-and-spoke, 17 Sep). Keeps every honesty rule from `2026-09-15-proof-page-rebuild.md`; reopens motion, colour and register.

Status: PLANNING ONLY, by Max's instruction (17 Sep): no building until he says so, and frugal with credits. Locked by Max: the spec-sheet ledger lane, the deep teal, Barlow. Colour finalised from Max's own finca palette (terracotta, sage, ochre, warm stone as tints).

## 1. Feature summary

Max Brown's permanent calling card. A hub-and-spoke site: a spine at `/` that proves, in the 40 seconds a prospect gives it on a phone in the WhatsApp browser, that Max builds real, rigorous, useful back-office systems, by SHOWING the Papote machine run rather than describing it; and deep spokes (`/papote` first) for the same person at a laptop that evening, wanting the working, the trends, the levers and the judgement. Both readers, one identity, Max's own style.

The proof escalates in three layers:
1. Rigour: every figure knows what it is and what it cannot be compared to (`figure_bases`, 27 figures, six bases each).
2. The system that runs: five supplier feeds reconciled or refused, figures rolled up with their basis, a Morning Brief composed and sent 34 times since 11 August with zero fallbacks.
3. Judgement, the value-add: the diagnostic editions and the trading snapshot, turned into charts and levers a business acts on. Labelled as the diagnosis Max builds with the client, distinct from the automation.

## 2. Primary user action

Watch the machine run once, and understand three things unaided: what runs automatically, where the human control point is, and how to reach Max. Then either message him on WhatsApp or go deeper into `/papote`. This is the acceptance test from the rebuild spec: four of five owners, 40 seconds, no narration.

## 3. Design direction

### Register and lane
Brand register (design is the product). Max's OWN lane, not the cafe's: Papote's dashboard is the bar for depth and visual coherence, never a template.

**Recommended lane: the spec-sheet ledger.** Three things nobody in the solo-consultant space combines: tool-brand colour commitment (one saturated hue on white, the way Makita or Bosch own a colour), newsroom-grade chart discipline (FT Visual, Reuters Graphics, Datawrapper: grey everything that is not data so one highlight lands; direct labels; annotations written as sentences), and Pudding-style proof where the reader watches numbers get captured, reconciled and settle into a decision on screen. The page reads like a printed spec sheet that has come alive: dates, counts and versions on the page (Field Notes honesty), one typeface family doing all the work, motion only where a number changes state. Research (17 Sep, search snippets; fetches were egress-blocked) found no competitor doing this.

LOCKED by Max, 17 Sep: the spec-sheet ledger. (Newsroom-first was offered and not chosen.)

Avoid, explicitly: editorial-typographic (italic serif, mono labels, three ruled columns), SaaS cream with cards, dark mode with glow, Stripe purple gradients, Linear dark minimalism, Framer agency templates, the rejected Braun flatness, and any copy of Papote's cafe brand (Baloo, pink and mint, rounded cards).

### Colour strategy: Committed, with a validated chart palette
- Ground: a faint teal wash, `#eef9fa` (oklch 0.975 0.012 200), a tint toward the brand hue, with the stage, the honesty ledger and every chart sitting on pure white panels on top of it. Recommended over pure white at Max's steer (17 Sep: "I like faint pastels and tints"). Why it works: white-on-tint gives layering and depth with no shadows, cards or glow; the brand hue is on every screen; ink stays 17.2:1, the teal 5.4:1, the terracotta 4.1:1, and the full chart series re-validates against it (all hard checks PASS). Research: the FT's salmon paper `#FFF1E5` is a brand-defining tinted ground with black text at maximum contrast; Datawrapper's rule is a very bright, barely saturated background, which this is; the 2026 direction is whites with a subtle cast toward the brand hue rather than stark #FFFFFF. Impeccable permits tinted neutrals at 0.005 to 0.015 chroma toward the brand hue; only the warm cream band (hue 40 to 100) is the AI tell, and this sits at hue 200. Alternative: faint sage `#f7fbf6` (the finca kitchen). Fallback: pure white with warm stone tints. Light mode remains a technical constraint (the WhatsApp in-app browser mishandles dark schemes); on a cheap Android screen the tint fades toward white, a graceful failure. Comparison sheet: grounds.png, 17 Sep.
- Primary: a committed deep teal, the trades' blue and the finca's blue-painted shutters (Makita `#007083` and Bosch `#003E64` territory). Brand primary `#0a6f86`: 5.8:1 on white, so it carries text, the button, pipeline nodes and active states, 30 to 60% of the hero stage. One hue, two steps: chart series slot 1 is the same hue stepped up to clear the dataviz chroma floor, `#0c789a` (5.0:1). The deep step alone reads grey beside other series.
- Terracotta: the warm accent, from Max's own palette (Finca Ojen: "strong ochre / terracotta / warm stone", herringbone terracotta floors). `#c2593a`, 4.4:1: the held-document lift, the one warm emphasis in the stage, series slot 2. Never a background.
- Green as a STATE, and it is sage: reconciled, matched, decision made. `#5a8f52`, 3.8:1, the kitchen-cabinet sage from the finca, not an electric green. Always paired with a label or mark. Doubles as the positive series when a series means good.
- Held for review: the dataviz status warning amber `#fab219` with an icon and label (sub-3:1 by design; the pairing is the mitigation). A held document is a review, not an error; red `#d03b3b` is reserved for critical.
- Tints, the pastels Max likes: light steps of the teal (`#cfe6ec`, `#e6f2f5`), terracotta (`#f3dcd3`), sage (`#e3ece0`) and a warm stone (`#f2ebe0`), for chart fills, table bands and the captured-not-yet-verified state inside the stage. The warm stone is a fill, never the page ground: Inside Ibiza's sand walls become stone-against-white here, because a sand page ground is the 2026 AI-cream tell and the WhatsApp browser wants a light scheme.
- Grey: everything that is not data (Datawrapper's rule). Ink `#141414`, secondary `#4d4d4d` (8.5:1), rules and grid in light greys.
- Chart palette, the earthy series, validated 17 Sep (light, surface #ffffff, all hard checks PASS: chroma floor, CVD worst adjacent dE 8.1, normal-vision floor 16.1): `#0c789a` teal, `#c2593a` terracotta, `#4e6cb3` shutter blue, `#907a22` olive, `#8a4f7d` plum, `#5a8f52` sage, `#c9962b` ochre, `#b23a3a` rust. The order is the colourblind-safety mechanism and is fixed. One WARN: ochre sits under 3:1 on white, so that series always carries direct labels or a table view (the relief rule). Sequential ramp: the teal's own hue, 100 to 700, generated and validated with `--ordinal` at build. Diverging: teal vs rust with a grey midpoint. Status colours fixed and never reused as series.

### Scene sentence (forces the theme)
A cafe owner or a plumber, on a phone inside WhatsApp, in daylight, half-sceptical, forty seconds; then the same person at a laptop that evening wanting to see the working. Light, high contrast, confident colour, no glow.

### Anchor references
Verified by search snippet (fetches egress-blocked); named so the lane is checkable, not adjectives.
- FT Visual & Data: a limited chart vocabulary, one highlight against grey, series labelled directly, annotations as sentences. Steal all of that; not their pink ground.
- Reuters Graphics (public style guide): scroll-triggered chart builds, a strict split between thematic colour and data colour.
- The Pudding: the reader can query the proof themselves; scroll drives the analysis. Steal the queryable proof; not the playful branding.
- Datawrapper: white ground, grey first, one accent, annotation discipline. The baseline.
- Field Notes / Draplin: utilitarian spec-sheet honesty, sold "from bait shops to barbershops", one typeface. Steal the printed-spec feel and the dated counts on the page; not the kraft brown or retro badges.
- Makita, Bosch Professional: one colour owns everything, product on white. Steal the commitment; not the retail grid.
- Contrast only, do not copy: Stripe, Linear, Braun/Rams.

### Typography
One family doing all the work (brand.md: a single well-chosen family with committed weight and size contrast beats a timid pair). Three candidates, all Google Fonts, all with tabular figures confirmed, none on the reflex-reject list:
- **Barlow** (LOCKED by Max, 17 Sep). A straight-sided grotesk drawn from California licence plates, highway signs and buses. The most blue-collar-native voice available; 3 widths by 9 weights, so Barlow Condensed handles axis and unit labels without a mono. Tabular numerals listed.
- **Public Sans** (USWDS). Built "to allow for good data design with tabular figures"; civic, honest, no SaaS baggage. Slightly cooler voice.
- **Red Hat Text** with Red Hat Display. Warmer and rounder, very comfortable at 16px; tabular figures confirmed. The softest of the three.
Rules: body 16px minimum on the phone; decision lines 17px; modular scale 1.25 or more; `text-wrap: balance` on headings; tabular figures on every number column, proportional figures on a lone hero figure; no separate mono anywhere.

## 4. Scope
- Fidelity: production-ready. This is the calling card; Max will not put his name to a sketch.
- Breadth: the spine (`/`) and the first spoke (`/papote`). Further spokes reuse the same components and data contract.
- Interactivity: shipped quality. The hero is a directed GSAP sequence; charts are interactive (hover tooltip, direct labels, table view); the inspect mechanic is real; the live "type your own" surface is wired at build-order step 4 with the full fail-closed safety architecture.
- Time intent: polish until it ships, with the screenshot gate at 390 / 768 / 1280 before any motion pass.

## 5. Layout strategy

### The spine, top to bottom
1. **Identity and the stage (fold 1 at 390px).** One line: Max Brown, what he builds. Below it the stage, which is the hero: the Papote pipeline drawn as a live schematic. Contact (WhatsApp, and an ordinary email route for a forwarded reader) sits at the foot of fold 1. The reader never has to find it.
2. **The run.** Autoplays once when the stage is in view, roughly 8 to 10 seconds, with Skip and Replay. Beats below. The finished state is the page with JavaScript off.
3. **Inspect.** After the run, the three headline figures are tappable: plain-English meaning, six bases, what the figure cannot be set beside, the decision it informs. The mechanic from the rejected hero, re-housed inside the stage where the figures were just assembled, so provenance is a continuation of the run rather than a table.
4. **The honesty ledger.** The system's real counts, dated, each with its source table: 34 briefs sent since 11 Aug, 0 fallbacks; 488 of 492 lines checked, 88 excluded rather than guessed; 5 supplier feeds, 78 documents; 54 of 58 reproduce their own total, 4 marked. Rendered as a ruled ledger with provenance per row, not stat tiles (the hero-metric template is banned).
5. **Three proofs, each a door into the spoke.** The Morning Brief beside its evidence (a real redacted edition, consent granted). Figures that know their basis, with the dated VAT correction (11 Aug 2026, accuracy not savings). Ingestion that reconciles or refuses. Each is a compact, animated preview that links to its full section in `/papote`.
6. **Track record and stack.** A factual, dated block of what has shipped (evidence-shaped, no mission copy), the stack (n8n, Supabase, Claude), and contact again.

### The spoke, `/papote`
Summary-first, sticky anchor rail, method and numbers as evidence below. Every spoke carries a one-line "who I am and back to the overview" anchor so a forwarded spoke never orphans its reader.
1. **The thesis in one chart.** "Papote is two cafes sharing a rent." Children per open day, February to September (70, 33, 31, 26, 22, 23, 38), animating in as the reader arrives. Source: Roller attendance and the till; re-verified from source exports at build.
2. **The year.** Takings and payslips month by month; labour share 46% to 94% by month; the two salaries leaving. From the people-cost edition, page 2.
3. **The day.** People rostered against money served, hour by hour, the 18% surplus concentrated at one to three in the afternoon. The yardstick stated plainly (money in the hour divided by 74 euro a person-hour, never fewer than two on the floor). Page 3.
4. **Could it be seen coming.** The week-ahead test: 76% of the surplus visible seven days out. Page 4.
5. **The levers.** The three moves that need no formula, plus the trading snapshot's gap tool rebuilt in Max's style: a slider for the target labour share and stackable levers, each figure marked as a model. This is where "the levers they pull to run the business better" lives.
6. **The honesty key.** The edition's own marking system made visual and carried across the whole spoke: no mark = a payslip, an invoice or the till; one mark = the roster at loaded rates; two marks = the yardstick applied, a model. Every figure on the spoke wears its mark.
7. **The artefacts as delivered.** Pages of the two editions and the trading snapshot, shown in their own delivered skin and labelled client artefact, so the reader sees what a client actually receives and the page never borrows their credibility as its own.

## 6. Key states

Hero stage
- Idle before autoplay: the stage drawn, feeds waiting, nothing invented.
- Running: the beats in section 7. Skip visible throughout; the reader is never trapped.
- Skipped or finished: the end state. Identical to the JavaScript-off render.
- Replay: full reset block, then the run again.
- Reduced motion: the finished state, no run, Replay hidden.
- JavaScript off: finished state, every inspect panel visible, figures are anchors to their panels. No dead controls.
- Narrow (390) and wide (1280): the same DOM in two layouts, vertical flow on the phone and horizontal on the desktop. The timeline measures positions at runtime; nothing is hard-coded.

Charts (spoke)
- Static data baked at build from verified sources, so no loading state.
- Draw-in once when in view, under 500ms per chart, total stagger under half a second.
- Hover: crosshair and tooltip on lines, per-mark tooltip on bars and cells; hit targets larger than the mark.
- Table view: every chart has one, one tap away.
- Reduced motion: no draw-in.

Live surface (built at step 4, listed here so the design allows for it)
- Idle with a synthetic editable example and the plain disclosure.
- Running with abort.
- Result: constrained fields, template sentence, honest "not given" cells.
- Refused: the fixed "this example cannot assess faults or emergencies" state.
- Unavailable or rate-limited: "The live example is unavailable. This is a saved example." Visibly separate, no approval control.

## 7. Interaction model: the run, beat by beat

One GSAP timeline owns the run (gsap-choreography). Labels are named by what happens. Every element that moves is a real DOM node with a `data-stage-*` attribute and a named real source. Nothing fictional. Positions are measured from the DOM, never hard-coded, so the same timeline drives both layouts.

| Label | What the reader sees | Real source it stands on |
|---|---|---|
| `feedsArrive` | Five supplier documents, a till file and a rota land on the stage, staggered 0.06s. | `supplier_registry` (5 rows, each with evidence docs), the raw feed tables (78 documents), Roller, Eitje |
| `checkTotals` | Each document's lines add up in front of the reader; the sum meets the stated total. | `lines_sum_excl_vat_cents` = `total_excl_vat_cents`, `line_arithmetic_checked` |
| `holdMismatch` | One document's lines do not reproduce its total. It is marked and held, not loaded. A short breath. | The 4 marked documents (1 overhead, 3 freelance) as of 17 Sep; `raw_supplier_parse_failures` for the quarantine mechanism (0 held today, stated as such) |
| `rollUp` | Reconciled rows travel into three headline figures. | `daily_revenue_history`, `dash_monthly`, `eitje_realised_shifts` via the figures' `source_line` |
| `basisAttach` | Each figure's six bases click on beside it; two figures are shown NOT joining because a basis differs. | `figure_bases`: vat, tips, status_filter, population, refunds, gross_or_net |
| `briefCompose` | The Morning Brief writes itself line by line from those figures; one line arrives marked "estimate", one candidate line is excluded rather than guessed. Typed text at constant speed. | `brief_runs` (34, all sent, 0 fallback), `brief_items` (confidence: 488 checked, 3 estimate; 88 excluded via `exclusion_code`), `source_refs_jsonb` |
| `send` | The brief is delivered; a dated delivery line appears. | `brief_deliveries` (32) |
| `settle` | Breathing room. The three figures become tappable. Skip and Replay remain. | The inspect mechanic, `figure_bases` |

Timing: 8 to 10 seconds total; 0.8 to 1.5 seconds of breathing room after `holdMismatch`, `basisAttach` and `send`; cut 20 to 30% after the first working version. Easing: `sine.inOut` for travel, `expo.out` for the one dramatic arrival (the brief), `none` for typed text, no bounce anywhere. Materials: transform and opacity by default; clip-path for the brief lines revealing; a soft shadow lift on the held document only. Autoplay via IntersectionObserver at 50% visibility, unobserved after firing once.

After the run: tapping a figure opens its inspect panel with a 220ms settle. Charts on the spoke animate once in view. Nothing else on either page moves on scroll.

## 8. Content requirements

- Labels and prose: placeholders until the copy pass (voice.md, humanizer, line-by-line sign-off). Copy is last.
- Data on the spine: the real counts in section 5.4, each with its source table and the date verified; re-verified by live query at build (they move daily).
- Data on the spoke: the people-cost and after-the-call figures, re-verified from the source exports with client-data-audit before any appears; each wears its honesty mark.
- The held document in `holdMismatch`: one of the real four, with supplier name kept (a business), invoice number and amounts redacted or synthesised, labelled.
- The Morning Brief: one real delivered edition, redacted of any customer or staff name, labelled client artefact (consent granted).
- Media roles: the pipeline stage is semantic DOM and SVG, not raster. Client artefacts are images of the delivered pages and a screenshot or embed of the trading snapshot, in their own skin. No stock photography anywhere.
- Honesty labels as a visible system: client artefact, working example, illustration, measured outcome; plus the three-level figure marks on the spoke.
- Contact: WhatsApp 447531188098; email and domain still to come from Max; the deploy gate fails on a missing contact detail.

## 9. Recommended references during build
impeccable: `animate.md`, `layout.md`, `colorize.md`, `typeset.md`, then `audit` and `critique` before Max sees it. dataviz: `marks-and-anatomy.md`, `interaction.md`, `anti-patterns.md`, and the validator on every palette change. gsap-choreography for the timeline architecture and the reset block. The rebuild spec's defect register, every entry as a test.

## 10. Open questions for Max
1. Confirm the finca-tuned palette on the swatch sheet (teal, terracotta, sage, ochre, warm stone tints; electric series dropped).
2. The ground: faint teal wash `#eef9fa` with white panels (recommended), faint sage `#f7fbf6`, or pure white with stone tints. Seen side by side on grounds.png.
3. When to start building. Nothing is built until Max says go; the first build step is the pipeline stage, then the 390 / 768 / 1280 screenshot gate.

Locked: lane (spec-sheet ledger), brand teal `#0a6f86`, Barlow, autoplay once with Skip and Replay, hub-and-spoke, production fidelity, the honesty ledger as a ruled ledger not tiles, the held document shown real and redacted, client artefacts in their own skin, copy last.
