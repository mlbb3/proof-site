# Proof page: rebuild direction (supersedes the 14 Sep spec and plan)

Date: 15 September 2026. Supersedes `docs/superpowers/specs/2026-09-14-proof-page-design.md` (including its Version 2) and `docs/superpowers/plans/2026-09-14-proof-page.md`. Built from Astra's two-page adversarial review (the comprehensive review and its technical appendix), independently verified where it made code claims, and reconciled against Max's constraints and consulting-core.

## Why we went back to the drawing board
The 14 Sep plan proved capabilities a tradesman can already buy, using a six-workflow simulation, and asked animation to carry the claim "your admin can run itself." It did not prove the thing a buyer actually weighs: that Max has built real, dependable work. The plan also contained real defects (verified in this session): an unsafe fallback that diagnoses a boiler fault on the one path the safety test never covers; `11%%` and missing counts in the hero; a no-JavaScript cascade that leaves the form visible and leaks the enquiry into the URL; fail-open cost protection; a dead Edit button; orphaned `today[]` data; and stale Node/Vite versions. The review was right on the substance. This document is the corrected direction.

## The one change that matters most
Make the reader change one input and inspect the resulting decision through a real processing path, and back it with one permission-cleared piece of Max's actual work. Stop asking a staged simulation to prove trust.

## Keep
One page. The delivery-note discipline: white ground, near-black ink, one grotesque, selective yellow. Readable static HTML that works before any script. Ordinary anchors and native disclosure. Server-side provider keys. Safe text rendering (`textContent`). One clear reply action. Craft as a real investment, but aimed at understanding, not at looking expensive.

## Cut
The six-scene replay. The two-endpoint mandate and any second AI toy. The trade-profile library up front. The named passive open-signal. Fabricated form numbers, decorative ink/baseline effects, the camera push. The dead Edit/Approve theatre. The unsafe canned fallback. "Done overnight" as a universal promise. Unsupported present-tense claims ("15 automations live", "three that are running now") unless dated and permission-cleared. Highlighter on every heading and nearly every line.

## Add
One consequential example with a negative case. One permission-cleared real output. Max's identity and a working contact route on the first screen. An honest statement of the gap between the tools the buyer already pays for and the admin still done by hand. Explicit remaining human work. Real failure and conflict states. Fail-closed cost protection with a global budget. An evidence-freshness register. Real-device testing in the actual WhatsApp browser.

## The hard dependency (only Max can resolve)
The strongest version needs ONE real, redacted, permission-cleared output from an actual build (Papote, the café, Ellis): what the source was, what Max implemented, what the output shows, when it was checked, what stayed manual. If Max can supply one, the page is dramatically stronger and this direction is clearly right. If client confidentiality means no, the page ships honestly as "a working example / demonstration of approach", with no invented client outcomes. Do not fill the gap with unsupported claims. This decision gates the copy and the framing, not the build mechanics.

## The flagship example (one workflow, chosen from the next real prospect)
Pick the single workflow that matches a problem the next real prospect actually described. Two strong candidates from the existing fixture, both with a visible failure boundary:
- Invoice seen twice: the same supplier + invoice number does not increase the total; a conflicting amount triggers a review state, never a silent overwrite.
- Job note with a missing date: extraction fills the record, a missing appointment date stays "Not given" and the reply does not invent a slot.
Credibility rules: identity is supplier + invoice number (or job id), never a matching total; money in integer minor units, currency explicit, totals computed in code; unknown/ambiguous fields produce a check, never an invented value; cited source spans validated against the actual input; model output passes a strict schema and business validation before display; user and model text render as text. Label before interaction: "Working example. Fictional business and records. Nothing is filed in your accounts."

## The signature moment (comprehension, not flourish)
Shared-element continuity from the source text to a validated field to the owner-facing sentence. On Run, a brief highlight locates the exact source words, then a roughly 220ms transform carries the fact into its record row. If the fact is missing, the cell stays "Not given" and nothing is invented. No camera push, no count-up, no sentence typing. Moving copies live in an `aria-hidden`, `pointer-events:none` layer; the canonical readable source and result stay in the DOM. Measure in one untransformed coordinate system after layout settles; if GSAP Flip is used, add its returned tween to the owning timeline so Skip and interruption actually control it. Reduced motion performs the same state change instantly. User-edited input survives replay.

## Safety and the live surface
The public reply is a narrow administrative example, not free-form advice. The model may extract constrained fields; customer-facing sentences come from approved templates and never interpolate arbitrary model prose. High-risk or unsupported input returns a fixed "This example cannot assess faults or emergencies" state, never a generated appointment. Replace the fallback: sample becomes an admin question ("Thanks for getting in touch. What's the postcode for the job? I'll check availability and get back to you."), failure becomes "The live example is unavailable. This is a saved example.", kept visibly separate with no approval control. A keyword regex is not a safety architecture; the boundary is preventing the public surface from generating technical advice at all. Cost: fail closed when the limiter is unchecked; add a global request budget, a per-IP allowance, a concurrency bound and deliberate timeouts; use a dedicated provider workspace and verify its actual spend cap; require a string body, bound bytes before any model call; reject truncated or invalid output rather than treating any non-empty text as a draft.

## Page composition (mobile-first, first 40 seconds)
First screen at 390px: "Max Brown, back-office automation", the proposition, a compact finished example with its fictional disclosure, and an obvious WhatsApp link plus an ordinary email/phone route for a forwarded reader. One clear answer, not six records. Body and decision text at least 16px; comfortable targets; selective yellow only on changed fields and outstanding checks. Then the optional interaction (one input, one result, one adjacent control, no scripted tour). Then the real-work artefact and a short "how we work" paragraph answering the ordinary buying questions (what starts it, what is included, who checks customer-facing work, what happens after handover). Long tables go behind native disclosure, never shrunk to hit a height target. The page must be complete and identifiable when forwarded with no context.

## Stack
Kill the hand-written string-substitution layer; it was the source of the rendered defects. Use a typed data contract (TypeScript) and a reliable renderer: Astro is the sensible default for a new permanent prerendered page, but vanilla plus Vite remains acceptable if the templating is replaced with a real, typed, tested renderer. Normal CSS, one small interactive module, one server function. No React runtime, client router, CMS or production database. Supported runtime and build versions (Node 20 is EOL; prefer current LTS; Vite pinned to a supported major) with a committed, tested lockfile. Keep the JS-off path as resilience, implemented with a real `hidden`/disabled pattern where the handler is attached before the control is enabled, not a fragile display cascade; do not argue it from unverified WhatsApp folklore, but do test the real WhatsApp browser on iOS and Android.

## Privacy
Cut the passive named open-signal (weak value, uncertain identity, and a genuine PECR/UK GDPR question a disclosure line does not settle). Count actual replies and calls as the signal. Keep enquiry bodies out of application logs. Default the live input to a synthetic editable example and disclose plainly: "Use made-up details. Your text goes to Claude to run this example." Verify Anthropic's actual retention arrangement for this account before publishing any deletion claim; "no database" is not "no retention".

## Copy
Reopened. Run it through Max's `voice.md` (located: it lives in the proposal-builder skill references) and the humanizer, then Max signs off line by line. British English, £, no em dashes, no rule-of-three, no claim-then-restate, no kicker endings. Astra's proposed replacement lines are a starting point for that pass, not final, and must not assert unverified client results, fees, availability or maintenance terms. Delete the "most of a small business owner's week is admin" majority-of-time claim.

## Defect register (fold every one into the new build as a test)
The full list with file and line is in Astra's technical appendix. Verified in this session: unsafe fallback passing the safety gate; `11%%`; missing hero counts (mark/count key mismatch); no-JS cascade leaving controls visible and the form leaking to the URL; fail-open rate limit; dead Edit; orphaned `today[]`; stale Node/Vite. Also carry the appendix's contract fixes: typed values with one formatting boundary and build failure on unknown placeholders; honest live-control states with abort/dedupe/validation; loaded `.env` and a deploy gate that fails on missing contact details; a scenario with coherent dates and a real time basis; remove the "Max avoids prospecting" line (HANDOVER records it as wrong).

## Phase 1 that can actually ship
1. One current brief: the next prospect's problem, a reconciled coherent scenario, only the essential approved copy, real contact details, the canonical URL, one profile.
2. Complete static proof: identity, one useful result, one real artefact if available (else labelled a working example with no client claims), the next step, WhatsApp contact. Review the 390px composition before any motion.
3. One real interaction: synthetic text to a bounded record, honest missing-information state, an optional approved reply template, cost and privacy controls, safe failure. Test the actual handler and client together.
4. One craft pass: source-to-field continuity, legible type, generous controls, stable layout. No six-scene replay. Verify JS failure and a real iOS/Android WhatsApp journey.
5. Release criterion: a prospect can explain what runs automatically, what still needs them, and how to contact Max. Acceptance check: show it to five relevant owners for 40 seconds with no narration; at least four identify the automated job, the human control point, and the contact action unaided. Compare against a plain one-artefact-plus-contact page; if the interaction adds confusion, simplify it.

## Decisions needed from Max
1. The real artefact: can you share one redacted, permission-cleared output, and from which build?
2. The flagship workflow: which real prospect and problem does Phase 1 target (this picks the example)?
3. Stack: Astro (recommended for a fresh permanent page) or vanilla plus Vite with a proper typed renderer?
4. Copy: confirm the voice pass runs before build, and confirm the headline direction.

## Where I add nuance to Astra (not blanket agreement)
- The real artefact is the strongest move but must not become a blocker; the honest "working example" fallback ships if permission is not obtainable quickly.
- Astro is a good default, not mandatory; the actual fix is killing string-substitution, which vanilla can also do with a typed renderer.
- Keep one meaningful motion; the review agrees, but it is worth stating that the answer to a janky six-scene replay is one honest transition, not zero craft.

---

## Papote grounding (the real system behind the proof) — added 17 Sep, from Astra's Papote briefing
Papote (the café) is a large, live business-systems build: roughly 119 tables and 125 views, a private Next.js owner dashboard, an automated Morning Brief, supplier-invoice ingestion from five feeds, and Roller/Eitje reconciliation. Its value is NOT size. It is making fragmented records agree (cash vs earned revenue, scheduled vs approved hours, invoices vs order confirmations, owner decisions vs model suggestions) and refusing to state a number it cannot prove. People: Max leads the system with AI agents; Sophia owns and operates the café; Euan reads finance; Erwan the GM has left. Attribute builds to dated evidence, never "Max wrote every line".

### Candidate flagship examples (all real; Max picks one; each needs its listed evidence before any public claim)
- **Supplier invoice reconcile-or-refuse (recommended interactive).** A document's line items must reproduce its own stated ex-VAT total to the cent, or nothing loads and it is quarantined. Demonstrate with SYNTHETIC data. The real Bidfood parse-failures are an UNRESOLVED incident and must not be shown as a solved case.
- **The Morning Brief beside its evidence (recommended real artefact).** One delivered edition, one brief line, and the evidence chain behind it, including where it says "not established" rather than inventing. Needs a specific delivered edition plus a permission-cleared image.
- **A financial-basis correction.** For example the VAT-basis defect that had understated every food-cost figure by 9%. Frame as a truth/accuracy correction, NOT "money saved".

## Publication and claim constraints (hard, from the Papote briefing)
- Any real client identity, screenshot or private figure needs Sophia's recorded publication permission; confirm the engagement's paid/proof-of-concept status before describing it commercially. Until then the page uses synthetic data and carries no client-identifying detail.
- Keep four labels strictly separate: illustration, working example, client artefact, measured outcome. The page must never let one borrow another's credibility.
- Never claim "runs itself", "all feeds healthy", "15 automations live", hours saved, or revenue recovered without dated operational evidence and a defensible measurement.
- Do not invent a testimonial, maintenance commitment or commercial result, and do not attribute every component to Max personally.

## Also found while researching: a live security exposure in Papote (separate from this page)
Seven tables in the Papote Supabase have row-level security disabled (`owner_ideas`, `owner_idea_events`, `cafe_reference`, `party_reminder_drafts`, `party_deposit_settled`, `brief_countdowns`, `staging_bookingscore_20260831`), so the public anon key can read or write them. Not touched. Fixing it needs real access policies, not just enabling RLS. Track and fix in the Papote repo, not here.

---

## Composition RESOLVED: one inspectable hero + curated real breadth (research-backed, 17 Sep)
A competitor and craft-benchmark study settles the "one example vs multiple" question. Method caveat: individual pages were egress-blocked, so findings are a web-search synthesis and specific competitor metrics are "as reported", not personally verified.

Findings:
- The AI-automation agency category is saturated with multiple static case studies, metric tiles and client logos, and NOT ONE competitor in the sample showed a genuinely live, inspectable proof. The interactivity ceiling is "filter case studies by industry". That is the gap Max can own outright.
- Category best-practice sources favour fewer, deeper, provable: "one automation you can demo live beats five you can only describe"; "three hero case studies beat thirty generic ones".
- The peer-impressive craft sites (Bruno Simon, Devouring Details, Rauno Freiberg, Cassie Evans, Emil Kowalski, Josh Comeau) all LEAD with ONE signature interactive moment and NEST breadth inside it, never a flat grid of equal tiles. In every case the interactive thing is a live demonstration of the exact skill being sold (Cassie proves SVG with SVG; Emil proves motion with live motion).

Resolved structure (this supersedes the earlier "one consequential example only" framing; it keeps its rigor, the hero is the one deep inspectable thing, and honours the client's correct instinct to show breadth):
1. **HERO: one deep, interactive, inspectable proof.** The differentiator ("never states a number it cannot prove") is SHOWN, not claimed. The visitor clicks any headline figure and watches it trace to its source rows, the deterministic rule, and the step that produced it: "click the number, see the receipt." This is Papote's actual architecture (evidence routes, figure_bases, deterministic Supabase rules) made visible, and it is the one thing no competitor offers. It doubles as the challenge-it moment: alter a messy input and watch it refuse to invent, holding a conflict for review rather than overwriting.
2. **SUPPORTING BREADTH: exactly 3 (max 4) tight, real proofs**, each in the discipline's own format, trigger -> logic -> verified outcome, with every number shown next to its provenance. Pick the 3 strongest once the data dictionary is read. Candidates: the Morning Brief beside its evidence; the VAT-basis correction (framed as accuracy, not savings); the reconciliation-of-many-sources thesis (the real scale, ~119 tables and ~125 views that must agree); the supplier reconcile-or-refuse mechanism. Each honestly labelled per the four-label rule (illustration / working example / client artefact / measured outcome).
3. **A short capabilities strip** (n8n, Supabase, Claude) and Max's identity plus contact, early and on the first screen.

Rules: breadth sits inside the hero's gravity (one shell, work nested), never a flat grid; never more than 4 proofs; never a decorative interaction; never a number without a visible source. The one axis every competitor ignores, and the one Max wins on, is making the proof inspectable.

---

## Real scope, verified from the data dictionary (live count 31 Aug 2026; re-verify at build)
Papote is 118 base tables + 125 views = 243 objects (state it precisely; it is not "240+ tables"). It reconciles Roller (14,382 till transactions, 15,851 lifetime bookings, 9,642 attendance), Eitje labour (planned / realised / schedule), five supplier feeds (Bidfood, Steans, Ulmus, Zuivelrijck, rent/overhead) each with its own parse-failure quarantine, accounting GL (680 entries), and weather/holiday/flu demand context. The rigour is architectural and real: `figure_bases` (27 headline figures, each declaring six bases; two figures may only be compared, divided or subtracted if all six match), `dash_data_health` / `dash_feed_health` / `data_coverage` (count-based completeness that never guesses what it has not seen), per-supplier parse-failure quarantines, reconciliation views (period-vs-GL, payroll, daily revenue), and the Morning Brief with durable run/item/delivery history (brief_runs, brief_items, brief_deliveries). Any figure quoted on the page is re-verified by live query at build, per the client's own ethos.

## The hero, made concrete (grounded in real architecture)
"Click the number, see the receipt, and see what it may be compared to." The visitor clicks a headline figure; it expands to show the source rows/feed, the deterministic rule that produced it, and its declared basis (the six bases from `figure_bases`), including what it must NOT be compared to. That last part is the signature no competitor offers. The challenge-it interaction: alter a messy input and watch it refuse to invent, quarantine a non-reconciling document, or say "not established" rather than guess. Built with synthetic or redacted data; a real slice is available under Sophia's granted publication consent.

## The three supporting proofs (real, named objects)
1. **The Morning Brief beside its evidence** (brief_runs / brief_items / brief_deliveries; one delivered edition, one line, the evidence chain behind it, including a "not established").
2. **Figures that know their basis** (`figure_bases` plus the VAT-basis correction that had understated every food-cost figure by 9%; framed as accuracy, never "money saved").
3. **Ingestion that refuses to lie** (five supplier feeds; a document whose line items do not reproduce its own stated total is quarantined, not loaded; parse-failure counts shown honestly, and the unresolved Bidfood queue described as held-for-review, not a solved case).
Plus a short stack strip (n8n, Supabase, Claude) and Max's identity and contact on the first screen. Sophia's publication consent is granted, so the real Morning Brief and the VAT correction are on the table.
