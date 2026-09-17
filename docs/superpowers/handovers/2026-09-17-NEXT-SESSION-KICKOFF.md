# Kickoff: build proof-site Phase 1 (fresh session)

You are picking up Max Brown's calling-card website. Repo `mlbb3/proof-site`, branch `claude/exciting-einstein-f45sem`. Announce "Using session-recording" and keep committing and pushing after each task (the hooks are already bootstrapped).

**Before anything, read these in order and treat as ground truth:**
1. `docs/superpowers/handovers/2026-09-17-rebuild-direction.md`
2. `docs/superpowers/specs/2026-09-15-proof-page-rebuild.md`
Skim for constraints: `.design/proof-site/DESIGN_BRIEF.md`, `COPY.md`, `HANDOVER.md`. The 14 Sep spec and plan are SUPERSEDED and contain verified defects; do not build from them.

## DECIDED by Max (do not reopen or contradict)
- Permanent ONE-page calling card, proof not a funnel. A multi-page marketing site was offered and rejected.
- Scope is a "living proof system" grounded in Max's real client Papote (a children's café in Amsterdam), using its real work (Sophia the owner has granted publication consent for a redacted Morning Brief and the VAT-basis correction). The earlier fictional-plumber six-scene "run last night" animated demo is dropped.
- It should show MORE THAN ONE proof, not a single lonely example (Max's explicit steer).
- Aesthetic lane: precision instrument (Rams / Teenage Engineering / a well-set delivery note): white, near-black, one highlighter.
- Stack: Astro (Max chose it), with a TypeScript data contract, normal CSS, one small interactive module, and one server function. No React runtime, CMS, or production database. Do not use hand-written string templating (it caused the old defects).
- Copy is LAST: written against the finished build, in Max's voice (`voice.md` in the proposal-builder skill; run the humanizer; line-by-line sign-off). Never lead with copy or let unapproved copy gate the build.

## RECOMMENDED but NOT approved by Max (CONFIRM before building; do not treat as decided)
- Composition: one deep inspectable hero + three supporting proofs + a stack strip + identity/contact.
- Hero mechanic: "click any number, see its source rows, the rule that produced it, and what it cannot be compared to" (grounded in Papote's real `figure_bases` registry).
- The three proofs: (1) Morning Brief beside its evidence; (2) figures carry their basis + the 9% VAT-basis correction (accuracy, not "money saved"); (3) supplier invoices that reconcile-or-wait.
- Cutting the passive visitor open-signal (recommended on privacy grounds).
- Font Archivo and the highlighter colour (Max has not chosen).

## Hard constraints (non-negotiable)
- No em dash. British English, £. Light mode only (`color-scheme: light`; background on html, body and every section). One highlighter, only where it means "needs attention". Mobile-first, 16px+ body/decision text. Numbers tabular, prose never. Nothing sends anything except the one live server call. JS-off resilient via a real hidden/disabled pattern, not a display cascade.
- Honesty (from the Papote client briefing, authoritative): keep four labels separate, illustration / working example / client artefact / measured outcome. Never claim "runs itself", "15 automations live", hours saved, or revenue recovered without dated, defensible evidence. Re-verify every figure by live query at build. No client identity or real screenshot beyond Sophia's consent.
- State scale precisely: Papote is 118 base tables + 125 views = 243 objects (re-verify at build). Not "240+ tables".

## Build order (Phase 1)
1. Put the RECOMMENDED design decisions to Max in one short message; wait for his steer. Do not scaffold until he confirms the composition.
2. Scaffold: Astro + TypeScript + tokens + supported runtime versions + a tested lockfile.
3. Build the inspectable hero panel with synthetic-or-redacted Papote data and placeholder labels.
4. SCREENSHOT-REVIEW GATE with Max (390px, 768px, 1280px) before going further.
5. Build the three supporting proofs.
6. Wire the one server function only if a live element is confirmed.
7. Craft and motion pass; test on a real iPhone and a mid-range Android in the WhatsApp in-app browser.
8. THEN copy, in Max's voice.

## Do NOT
- Do not invent decisions Max has not made. Where this says "recommended", ask him.
- Do not build from the superseded 14 Sep spec/plan; do not reintroduce the fictional plumber or the six-scene replay.
- Do not lead with copy. Do not put an unverifiable number on the page.

## Access
- Repos in session: `mlbb3/proof-site`, `mlbb3/papote-dashboard`. Supabase project `khvwtyhgoayzoxqlbkyd` (read real figures). Data dictionary: `papote-dashboard` `ops/playbook/data-dictionary.md`.
- Env still needed from Max: ANTHROPIC_API_KEY (+ spend cap), Upstash, WhatsApp number, contact email, domain.
- Separate issue, do not fix here: 7 Papote tables have RLS disabled (anon key exposure). Flag to Max.

## First action
Read the two documents, then message Max with the RECOMMENDED design decisions for his steer. Nothing gets scaffolded until he confirms the composition.
