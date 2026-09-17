# Kickoff: build proof-site Phase 1 (fresh session)

You are picking up Max Brown's calling-card website. Repo `mlbb3/proof-site`, branch `claude/exciting-einstein-f45sem`. Announce "Using session-recording" and keep committing and pushing after each task (the hooks are already bootstrapped). This file is a full briefing, not a pointer: read it end to end, then read the two ground-truth docs below. The context in it was gathered across a long prior session and is expensive to reconstruct, so do not skim it.

**Ground truth, read in order:**
1. `docs/superpowers/handovers/2026-09-17-rebuild-direction.md`
2. `docs/superpowers/specs/2026-09-15-proof-page-rebuild.md` (authoritative spec; the defect register and safety section are the parts most easily skimmed and least safe to skim)
Skim for constraints: `.design/proof-site/DESIGN_BRIEF.md`, `.design/proof-site/INFORMATION_ARCHITECTURE.md`, `COPY.md`. The 14 Sep spec and plan are SUPERSEDED and contain verified defects; do not build from them.

## Why this exists, and why it was rebuilt (do not repeat the first mistake)
This is Max's professional calling card: a permanent one-page site proving he builds rigorous back-office automation for small businesses. It goes to a prospect after a phone call, opened on a phone in the WhatsApp in-app browser, roughly 40 seconds of attention. The first build was scrapped after an adversarial review because it proved commodity capabilities with a staged six-scene animation AND shipped real, verified defects. The corrected direction: make the reader change one input and inspect a real decision path, and back it with Max's actual client work (Papote). Stop asking a simulation to carry trust. If you find yourself building a scripted tour or a claim without a visible source row, you are repeating the mistake.

## DECIDED by Max (do not reopen or contradict)
- Permanent ONE-page calling card, proof not a funnel. A multi-page marketing site was offered and rejected.
- Scope is a "living proof system" grounded in Max's real client Papote (a children's café in Amsterdam), using its real work. Sophia the owner has granted publication consent for a redacted Morning Brief and the VAT-basis correction. The earlier fictional-plumber six-scene "run last night" animated demo is dropped.
- It should show MORE THAN ONE proof, not a single lonely example (Max's explicit steer).
- Aesthetic lane: precision instrument (Rams / Teenage Engineering / a well-set delivery note): white, near-black, one highlighter.
- Stack: Astro (Max chose it), with a TypeScript data contract, normal CSS, one small interactive module, and one server function. No React runtime, CMS, or production database. Do not use hand-written string templating (it caused the old defects).
- Copy is LAST: written against the finished build, in Max's voice; never lead with copy or let unapproved copy gate the build.

## RECOMMENDED but NOT approved by Max (CONFIRM before building; do not treat as decided)
- Composition: one deep inspectable hero + three supporting proofs + a stack strip + identity/contact.
- Hero mechanic: "click any number, see its source rows, the rule that produced it, and what it cannot be compared to" (grounded in Papote's real `figure_bases` registry).
- The three proofs: (1) Morning Brief beside its evidence; (2) figures carry their basis + the 9% VAT-basis correction (accuracy, not "money saved"); (3) supplier invoices that reconcile-or-wait.
- Cutting the passive visitor open-signal (recommended on privacy grounds; PECR/UK GDPR question, weak value).
- Font Archivo and the highlighter colour (a full token set exists as a recommendation; see Existing assets).

## What this session learned the hard way (fold in; do not rediscover)

### The defect traps (each becomes a test in the new build)
These were verified in the old code and are why it read as "dross". Prevent every one structurally, not with a comment:
- Unsafe fallback that passed the safety regex and diagnosed a boiler fault on the one path the test never covered. A keyword regex is not a safety architecture.
- `11%%` (a percent formatter returning "11%" into a "{n}%" template) and missing hero counts (a "mark"/"count" key mismatch). Root cause: hand-written string substitution with no build-time failure on unknown placeholders.
- A no-JavaScript cascade that left the form visible and leaked the enquiry into the URL via a GET. JS-off must be a real `hidden`/disabled pattern where the handler attaches before the control is enabled, never a display cascade.
- Fail-open rate limiting (cost protection that failed open when the limiter was unchecked).
- A dead Edit button, orphaned `today[]` data, stale Node 20 (EOL) and Vite 5.
Contract fixes to carry: typed values with ONE formatting boundary; build fails on unknown placeholders; honest live-control states with abort/dedupe/validation; a deploy gate that fails on missing contact details; user and model text rendered as text (`textContent`).

### The safety boundary (the single most dangerous thing this page can do)
The public live surface must be structurally incapable of generating technical/gas/pricing advice, not merely filtered. The model may extract constrained fields only; any customer-facing sentence comes from approved templates and never interpolates arbitrary model prose. High-risk or unsupported input returns a fixed "this example cannot assess faults or emergencies" state, never a generated appointment. Cost: fail CLOSED when the limiter is unchecked; global request budget + per-IP allowance + concurrency bound + timeouts; a dedicated provider workspace with a verified spend cap; bound the request bytes before any model call; reject invalid/truncated output rather than treating any non-empty text as a draft.

### The honesty framework (from the Papote client briefing, authoritative)
Keep four labels strictly separate and never let one borrow another's credibility: illustration / working example / client artefact / measured outcome. Never claim "runs itself", "all feeds healthy", "15 automations live", hours saved, or revenue recovered without dated, defensible evidence. Do not invent a testimonial, maintenance commitment or commercial result, and do not attribute every component to Max personally (he leads the system with AI agents). Re-verify every figure by live query at build.

### Why the inspectable hero (research, with its caveat)
A competitor and craft study settled the "one vs many" tension: the AI-automation category is saturated with static case studies and metric tiles, and NOT ONE competitor showed a genuinely live, inspectable proof. That is the gap Max owns. Peer-impressive craft sites all lead with ONE signature interactive moment that demonstrates the exact skill being sold, and nest breadth inside it, never a flat grid. Caveat: individual competitor pages were egress-blocked, so specific competitor metrics are "as reported", not personally verified; the structural finding is sound, the numbers are not yours to cite.

### The acceptance test (design toward this from the start)
Show the finished page to five relevant owners for 40 seconds with no narration. At least four must identify, unaided: the automated job, the human control point, and the contact action. Also compare against a plain one-artefact-plus-contact page; if the interaction adds confusion rather than comprehension, simplify it. The page must be complete and identifiable when forwarded with no context.

## Existing assets (do not rebuild these)
- **`.design/proof-site/DESIGN_TOKENS.css`** is a complete, considered token set: OKLCH throughout, light-only. Paper `oklch(1 0 0)` (chroma 0, true white), ink `oklch(0.19 0 0)`, highlighter `oklch(0.94 0.18 104)` used only where something needs attention, focus ring in ink not yellow, Archivo as the recommended grotesque with tabular figures, a 1.25 type scale, motion capped at 300ms per movement with a reduced-motion branch. Port it into the Astro build; adjust the font/highlighter only if Max steers otherwise. The comment header explains every choice.
- `.design/proof-site/` also holds DESIGN_BRIEF, INFORMATION_ARCHITECTURE, COPY (locked-but-reopened), RESEARCH, STORYBOARD (the six-scene replay in STORYBOARD is superseded), content.js (old fictional dataset; `content.js:28` is the unsafe boiler sample, a cautionary artefact, not a source).
- Voice: `voice.md` lives in the proposal-builder skill references (install/read the skill; it is not repo content). Run the humanizer; Max signs off line by line.

## Hard constraints (non-negotiable)
- No em dash. British English, £. Light mode only (`color-scheme: light`; background on html, body and every section). One highlighter, only where it means "needs attention". Mobile-first, 16px+ body/decision text. Numbers tabular, prose never. Nothing sends anything except the one live server call. JS-off resilient via a real hidden/disabled pattern.
- State scale precisely: Papote is 118 base tables + 125 views = 243 objects (re-verify at build). Not "240+ tables".
- Privacy: default the live input to a synthetic editable example; disclose plainly ("use made-up details; your text goes to Claude to run this example"). Verify Anthropic's actual retention arrangement for this account before publishing any deletion claim; "no database" is not "no retention".

## Build order (Phase 1)
1. Put the RECOMMENDED design decisions to Max in one short message; wait for his steer. Do not scaffold until he confirms the composition.
2. Scaffold: Astro + TypeScript + tokens (port DESIGN_TOKENS.css) + current-LTS runtime + a tested lockfile.
3. Build the inspectable hero panel with synthetic-or-redacted Papote data and placeholder labels.
4. SCREENSHOT-REVIEW GATE with Max (390px, 768px, 1280px) before going further.
5. Build the three supporting proofs.
6. Wire the one server function only if a live element is confirmed (apply the safety boundary above in full).
7. Craft and motion pass (one meaningful transition: source text to validated field, roughly 220ms, reduced-motion does it instantly); test on a real iPhone and a mid-range Android in the WhatsApp in-app browser.
8. THEN copy, in Max's voice.

## Do NOT
- Do not invent decisions Max has not made. Where this says "recommended", ask him.
- Do not build from the superseded 14 Sep spec/plan; do not reintroduce the fictional plumber or the six-scene replay.
- Do not lead with copy. Do not put an unverifiable number on the page. Do not cite a competitor metric as verified.

## Access / environment
- Repos in session: `mlbb3/proof-site`, `mlbb3/papote-dashboard`. Supabase project `khvwtyhgoayzoxqlbkyd` (read real figures at build). Data dictionary: `papote-dashboard` `ops/playbook/data-dictionary.md`.
- Env still needed from Max: ANTHROPIC_API_KEY (+ spend cap), Upstash, WhatsApp number, contact email, domain.
- Separate security issue, do NOT fix here: 7 Papote tables have RLS disabled (owner_ideas, owner_idea_events, cafe_reference, party_reminder_drafts, party_deposit_settled, brief_countdowns, staging_bookingscore_20260831). Anon key can read/write. Fix with real policies in the Papote repo. Flag to Max.

## First action
Read the two ground-truth docs, then message Max with the RECOMMENDED design decisions for his steer. Nothing gets scaffolded until he confirms the composition.
