# Handover: proof-site rebuild direction (17 Sep 2026)

**Read `docs/superpowers/specs/2026-09-15-proof-page-rebuild.md` first. It is the authoritative spec.** The 14 Sep spec and plan are banner-marked SUPERSEDED; they contain verified defects; do not build from them.

## 60-second orientation
proof-site, branch `claude/exciting-einstein-f45sem`. This is Max Brown's professional calling card: a permanent one-page site that proves he builds rigorous back-office automation for small businesses. The original "run last night" six-workflow animated demo was superseded after an adversarial review (Astra, two Notion pages) showed it proved commodity capabilities and shipped real defects. The current direction is grounded in Max's real client system, Papote (a children's café in Amsterdam).

## The locked direction
- **One page, proof not funnel.** Permanent calling card at Max's domain.
- **Composition: one deep INSPECTABLE hero + three real proofs + a stack strip + identity/contact.** No flat grid, no staged demo. Research (competitors + craft benchmarks) confirmed: the best sites lead with one deep interactive moment and nest breadth inside it, and NO automation competitor shows a live inspectable proof, that is the gap Max owns.
- **The hero = "click the number, see the receipt."** Click any figure and it shows the source rows, the rule that produced it, and what it cannot be compared to. Challenge it and it refuses to invent, quarantines a non-reconciling document, or says "not established." This is Papote's real architecture (the `figure_bases` registry: 27 headline figures each declaring six bases, comparable only if all six match, is the signature no competitor has).
- **The three proofs (real, named):** 1) the Morning Brief beside its evidence (brief_runs/brief_items/brief_deliveries); 2) figures that carry their basis (figure_bases + the VAT-basis correction that had understated food cost by 9%, framed as accuracy not savings); 3) invoices that reconcile or wait (five supplier feeds; a document whose lines don't reproduce its own total is quarantined; ~23 Bidfood docs currently held, described as held-for-review, an unresolved incident not a solved case).
- **Papote scale (verified, data dictionary 31 Aug, re-verify at build):** 118 base tables + 125 views = 243 objects. Reconciles Roller, Eitje, five supplier feeds, accounting GL, weather/holiday/flu.
- **Consent:** Sophia (café owner) has granted publication consent for a redacted real Morning Brief and the VAT correction. Keep the four labels separate (illustration / working example / client artefact / measured outcome). Never claim "runs itself", "15 automations live", hours saved or revenue recovered.
- **Stack:** Astro + TypeScript data contract + normal CSS + one small interactive module + one Vercel server function. Kill the hand-written string templating (source of the old defects). Supported runtime versions, tested lockfile. JS-off resilient. Aesthetic: precision-instrument, white/near-black/one highlighter, light-only, no em dash, mobile-first, 16px+ body.
- **COPY IS LAST** (Max, 17 Sep). Build with placeholder labels; write copy against the finished thing, in Max's voice (voice.md is in the proposal-builder skill references; run the humanizer; line-by-line sign-off). Unapproved terse copy exists only in chat.

## Access / environment
- `mlbb3/papote-dashboard` added to the session (read). Supabase project `khvwtyhgoayzoxqlbkyd`.
- Security flag (separate from this page): 7 Papote tables have RLS disabled (owner_ideas, owner_idea_events, cafe_reference, party_reminder_drafts, party_deposit_settled, brief_countdowns, staging_bookingscore_20260831). Anon key can read/write. Fix with real policies in the Papote repo, not here.
- Voice profile: `.../proposal-builder/references/voice.md`. Env still needs: ANTHROPIC_API_KEY (+ spend cap), Upstash, WhatsApp number, contact email.

## Next action
Design and build the inspectable hero panel first (Astro scaffold, then the click-a-number-see-its-source component with synthetic-or-redacted Papote data). Not copy.

## Session compliance
- Rules read: yes (rebuild spec, Astra reviews, Papote briefing, voice.md, consulting-core).
- Skills used: session-recording, brainstorming, writing-plans, stress-test, consulting-core, impeccable, design-tokens/flow, claude-api, gsap-*, humanizer.
- Durable state is the committed spec + this handover (the .session-log.md is gitignored/local).
