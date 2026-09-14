# Proof page: design spec

Date: 14 September 2026. Author: Claude Code session on branch `claude/exciting-einstein-f45sem`.
Register: brand. Platform: web. Aesthetic lane: **precision instrument** (confirmed by Max, 14 Sep).

This spec is the single source of truth for the build. It supersedes nothing in `.design/proof-site/`
(those docs remain the source for copy, data and the storyboard); it adds the decisions taken in the
planning session and the aesthetic direction, so that the task-by-task plan can be executed by a model
with no access to this conversation. Where this spec and a `.design/proof-site/` doc disagree, this spec
wins on **stack, aesthetic and structure**; `COPY.md` and `content.js` win on **copy and data** and are
locked.

> **SCOPE RAISED 14 Sep (Max):** this is now a permanent LIVING PROOF SYSTEM and Max's calling card, not a one-off send, and copy is reopened. See **Version 2** at the end of this document; it supersedes sections 1, 2 and 5.1 where they conflict. The aesthetic system (3), stack (4), accessibility (10) and ship gates (15) still hold.

---

## 1. Goal

One hosted page, sent to a small-business owner after a phone call, that runs the admin machine in front
of him instead of describing it. It must do two jobs at once:

1. **Prove the system works.** A tap-to-run replay shows overnight paperwork being read and turned into
   one morning brief, and one genuinely live control (type an enquiry, get a drafted reply from Claude).
2. **Prove the builder is credible.** The page itself must be visibly, unmistakably well made. In 2026 a
   mediocre-looking page reads as lazy and AI-generated, which destroys the pitch no matter how good the
   demo is. Craft is not decoration here; it is evidence.

Success is a reply on WhatsApp, or the prospect asking for the scoping call. Not SEO, not a funnel.

## 2. Non-goals

Carried from `DESIGN_BRIEF.md` Out of Scope, still binding. No second page, nav, pricing, FAQ,
testimonials, logos, newsletter, cookie banner, analytics, dark mode. No `?biz=` switch. No editing the
draft reply. **Nothing on the page sends anything except the one draft API call.** No autoplay. The full
30-tell ban list and the impeccable ban list apply.

## 3. Aesthetic system: precision instrument

The reference points are Dieter Rams, Teenage Engineering, a laboratory balance, a well-set delivery
note. The page is a single white sheet, ruled in near-black, marked in one signal colour exactly where a
human would mark it. Impressiveness comes from precision and restraint executed flawlessly, never from
effects. The following are **requirements**, not suggestions; each exists because a weaker model will skip
it by default.

### 3.1 Grid and space
- A strict layout grid. Content sits in a measured column, not edge to edge. Outer margins are generous
  and deliberate (the confidence of empty space is part of the look).
- One vertical rhythm unit governs all vertical spacing (`--space-*` in `DESIGN_TOKENS.css`). No ad-hoc
  margins.
- Above 1100px: two columns. The brief sits in a sticky measured left column; evidence scrolls on the
  right. A single hairline column rule separates them.

### 3.2 Rules (lines)
- Structural rules are true 1px, hairline, never heavier. Header/section rules use `--rule-strong` (ink);
  row rules use `--rule` (mid-grey). The ruling is the primary visual texture of the page.
- On high-DPR screens the hairline may be rendered at sub-pixel weight via a `1px` border on a
  `transform: scaleY(0.5)` pseudo-element **only if** it stays crisp; otherwise 1px is correct. Do not use
  box-shadows to fake rules.

### 3.3 Figures
- Every number, date, ID, time, currency value uses `--font-figures` with `font-variant-numeric:
  tabular-nums lining-nums`. Numbers are right-aligned in table number columns; decimal points and
  currency signs align vertically. During the replay's count-ups the width never changes, so nothing
  jitters.
- Prose never uses tabular figures. This is enforced by a check (see section 9).

### 3.4 The one signal colour (highlighter)
- `--mark` appears **only** behind text that needs the owner's attention (marked brief lines, flagged
  table rows, "Draft, waiting" status) and as the **fill** of exactly two buttons (Run last night, Reply
  on WhatsApp). Nowhere else. Its rarity is the craft; overuse destroys the effect.
- The mark reads as a marker stroke, not a filled box: `--radius-mark` on its ends, tight horizontal
  padding, sits behind the text baseline like a highlighter pass.
- Default value: a tuned signal yellow (`--mark: oklch(0.94 0.18 104)`, ink-on-mark contrast 15.7:1).
  Max may swap it; it is one token.

### 3.5 Document realism
- Each evidence block renders as the real form it represents (enquiry log, invoice register, job book,
  timesheet, sales ledger, supplier prices), not as a card or stat tile. Real `<table>` markup with header
  cells.
- Each block carries two small marks of a real printed form: a **form number** (e.g. `HPH-LOG-01`) set in
  tracked small caps in the block header, and a fine-print caption admitting it is a simplified mock-up
  (`captions.mockup` in `content.js`). These read as authenticity, not decoration. Keep them subtle; no
  skeuomorphic paper textures, no drop shadows, no torn edges (that is the archival lane, which was
  rejected).

### 3.6 Typography
- One grotesque family, `--font-text`. Default **Archivo** (Max to confirm between Archivo, Public Sans,
  Familjen Grotesk; all three have tabular figures, so no separate mono is loaded). Three weights: 400
  text, 500 medium (labels, status, sender line, Total row), 600 heading.
- Labels (form numbers, column groups, the "the brief" label) are tracked small caps.
- Headline uses `text-wrap: balance`; body prose uses `text-wrap: pretty`; prose column capped at
  `--measure` (68ch). Hyphen and en-dash only. **No em dashes anywhere** (enforced).
- Fonts are self-hosted `woff2` (subset to Latin), `font-display: swap`, with a metric-matched fallback
  stack so the JS-off and slow-connection paths do not shift layout.

### 3.7 Colour and mode
- Light mode only. `color-scheme: light` on `:root`. An explicit background token is set on `html`,
  `body` and **every** `<section>` (WhatsApp in-app browser can otherwise paint its own ground). No dark
  palette exists in the token file and none is to be added.

### 3.8 Finished, not sparse (the razor's edge)
Precision minimalism has almost no margin for error. Executed to 95% it reads as expensive; at 80% it
reads as empty, unfinished, or cheap, which is the exact impression this page cannot afford. Two rules
guard the edge:
- **Density earns the space.** The white space is only "confident" because the documents are genuinely
  rich and full. Every evidence block must feel complete (three to four real rows, real columns, a form
  number, a caption), so the emptiness around it reads as composed, not as missing content. A block that
  looks thin is a bug.
- **The page must never look like a wireframe.** Black-on-white with one accent is not automatically
  premium; it is premium only when the grid, alignment, type and rules are exact. If a screen could be
  mistaken for an unstyled draft, it has failed, regardless of how "clean" it is.
This is the single highest execution risk in the build. It is gated in section 15.

## 4. Stack and architecture

Plain HTML, CSS and JavaScript built with **Vite**. **No React, no Tailwind, no Lenis, no ScrollTrigger.**
Rationale: the page must be complete and correct with JavaScript off inside the WhatsApp webview, and the
replay's end state is byte-identical to that static HTML. A framework fights this; vanilla serves it.

```
proof-site/
  index.html                # the whole page, semantic, complete with JS off
  src/
    styles/
      tokens.css            # = .design/proof-site/DESIGN_TOKENS.css (copied in, single source at build)
      base.css              # reset, color-scheme, backgrounds on html/body/section, fallback font metrics
      layout.css            # grid, measured column, two-column sticky at >1100px
      components.css        # tables, brief, buttons, mark, forms, evidence blocks
    data/
      content.js            # = .design/proof-site/content.js, LOCKED. imported by render + replay + api
    render/
      render.js             # builds brief lines, evidence tables, proof entries from content.js at load
      figures.js            # number/date/currency formatting helpers (tabular-safe)
    replay/
      timeline.js           # ONE GSAP timeline, labelled scenes, built from content.js + the DOM
      measure.js            # measure element positions from the DOM (never hardcode coords)
      reduced-motion.js     # matchMedia branch: jump to end state
    draft/
      draft-client.js       # live draft: POST /api/draft, render row, canned fallback, approve/edit
    main.js                 # entry: hydrate static HTML, wire Run button, live draft, line-to-evidence
  api/
    draft.js                # Vercel serverless function: the one live Claude call
  test/
    check.mjs               # static checks: no em dashes, light-mode rules, tabular-in-prose, one-viewport
    draft.test.mjs          # adversarial enquiries against the system prompt (mocked + optional live)
  public/
    og.png                  # preview card image (built separately)
    fonts/                  # self-hosted woff2 subsets
  vite.config.js
  vercel.json               # routes, so /api/draft is a function and / is static
  package.json
```

**Principle: the DOM is the source, JS enhances it.** `index.html` (optionally emitted by a tiny build
step from `content.js` so data lives in one place) contains the full end state: the composed brief, all
six evidence tables filled, proof entries, copy, buttons. `main.js` attaches behaviour. If `main.js`
never runs, the page is complete and correct.

### 4.1 Progressive enhancement contract
- **JS off / failed:** full static page. Run button and live-draft input are hidden via a `.js-only`
  class that is only un-hidden by `main.js`. Brief lines are plain `#anchor` links to their evidence
  blocks. Dates render server-side/build-time as "yesterday"/"today" fallbacks where offsets cannot be
  computed.
- **`prefers-reduced-motion`:** Run button remains; pressing it jumps straight to the end state (already
  the DOM state) and the caption strip shows each scene caption briefly then clears. The line-to-evidence
  mark-widen becomes an instant colour change.
- **Slow connection:** metric-matched fallback fonts hold layout until the woff2 swaps in.

## 5. Page structure (DOM order)

Follows `INFORMATION_ARCHITECTURE.md`. DOM order is the mobile reading order.

1. Optional personal line, only when `?to=Name` is present and sanitised (`COPY.md`: "{Name}, this is
   what I meant on the phone.").
2. Headline (quiet) + two-sentence opening. Present but visually subordinate to the brief.
3. **The brief object (hero).** A ruled message record: sender line (firm name), time ("07:00"), the word
   "the brief", then the composed lines. Each line has a highlighter mark on its front clause and is a
   real button/link to its evidence block. This leads the page.
4. Run last night button + Skip link (both `.js-only`), with a caption strip beneath.
5. Evidence blocks 1-6, in brief order, each a ruled form with a form number, a mock-up caption, and a
   "Back to the brief" link. Block 1 contains the live-draft input and the one Approve control.
6. Body copy (two locked paragraphs).
7. Three proof entries, ruled list with separators, unnamed clients.
8. How it starts (prose, not numbered).
9. Reply on WhatsApp (the one filled button besides Run).
10. Footer: name, one line, contact.

### 5.1 Length constraint (hard)
Each evidence block fits inside one 390px-tall viewport in its end state: three to four rows maximum. The
whole page is at most nine phone viewports. Enforced by a check (section 9).

## 6. The replay engine

One `gsap.timeline()`, built in `src/replay/timeline.js`, following the storyboard in
`.design/proof-site/STORYBOARD.md` shot for shot. Total ~8.0s at normal speed; every individual movement
under 300ms with `--ease-out` (expo.out); no bounce.

- **Trigger:** tap on Run last night only. Never autoplay.
- **Labels** name owner actions, not animations (per gsap-choreography: `inboxFill`, `invoiceRead`,
  `jobsLogged`, `hoursChecked`, `tillTally`, `briefCompose`). Everything positions relative to labels with
  `+=` offsets; no absolute seconds.
- **No fake cursor.** The subject is documents being read, not a user clicking. This is the single
  most important deviation from the gsap-choreography example, which uses a cursor.
- **Techniques:** GSAP core tweens; SplitText (line mode) for the brief composing; Flip for the three
  invoice fields travelling from the PDF outline into the register row; auto-animate (or equivalent GSAP
  `.from`) for rows landing; `clip-path` inset reveals for the highlighter sweep and the draft expand;
  a GSAP number tween with an `onUpdate` writing tabular figures for count-ups. A subtle camera push
  (`transform: scale`/translate on a zoom wrapper, sine.inOut, 3-6% only) into the invoice during scene 2.
  No ScrollTrigger, no ScrollSmoother.
- **Measurement:** every target position is measured from the actual DOM via `measure.js`
  (`getBoundingClientRect` relative to the frame, divided by any active scale). No hardcoded coordinates.
  Fallback coordinates stored for the zero-measurement (test) case.
- **Reset block at position 0** restores every animated property so re-runs ("Run it again") start clean.
- **End state === DOM.** After the timeline completes, the page equals the JS-off page exactly. Skip
  (`timeline.progress(1)`) reaches the same state in <100ms.
- **Reduced motion:** `reduced-motion.js` builds the end state and registers a paused empty timeline so
  the Run control does not crash.
- **Pause on tap (desktop only):** clicking an evidence block while playing pauses/resumes, for live-call
  narration. On mobile a tap is a scroll.
- Nothing in the replay is the only place a fact appears; if the timeline never fires, the page is whole.

### 6.1 Performance budget (the replay is the one impressive thing; it must not be janky)
The replay runs inside the WhatsApp in-app browser on mid-range Android, the worst target on the page.
SplitText, Flip, clip-path reveals and a camera scale running together can drop frames there, and a janky
"wow" moment is worse than none.
- Animate only `transform` and `opacity` (and bounded `clip-path`). Never animate layout properties.
- One camera/zoom wrapper, scale 3-6% only. `will-change` applied only to the elements in the currently
  playing scene, removed after.
- Hold to a budget of >=50fps on a mid-range Android (test on 4x CPU throttle in DevTools as a proxy, and
  on a real device before ship).
- **Lite-motion fallback:** if the full timeline cannot hold the budget, a `data-motion="lite"` path drops
  the camera move and the Flip field-travel, keeping only the row entrances, count-ups and brief compose.
  This is distinct from the reduced-motion path (which jumps straight to the end); lite-motion still plays,
  just cheaper. Gated in section 15.

## 7. The live draft

The one live control. `src/draft/draft-client.js` + `api/draft.js`.

- **Client:** input labelled "Type your own enquiry", capped at 300 characters, HTML stripped. On Draft,
  a row appears in the enquiry log with status "Drafting"; on response the draft replaces it with status
  "Draft, waiting" and an Approve/Edit pair. Approve flips status to "Approved" and disables; Edit focuses
  only. Resets on reload. **Nothing is sent anywhere.**
- **Server (`api/draft.js`, Vercel function):** fixes model, system prompt (`draftSystemPrompt` imported
  from `content.js`) and `max_tokens` server-side so the client cannot escalate cost. API key in a plain
  (non-`VITE_`) env var so it never reaches the bundle. Per-IP rate limit (Upstash Ratelimit, ~10/hour).
  Monthly spend cap set on the key in the Anthropic console as the backstop. Input re-validated and
  re-capped server-side. `GET` returns 405.
- **Abuse and prompt injection:** the input is arbitrary public text. The system prompt treats the user
  message as an enquiry to draft a reply to, never as instructions, and refuses anything that is not an
  enquiry with the fixed line in `draftSystemPrompt`. The function does not echo the user's input back
  into the page as HTML (text nodes only). **No user input or model output is logged or persisted** (no
  database, no analytics, no third-party logging); the request is stateless.
- **Model:** Claude Haiku (fast, cheap, sufficient for a two-to-four sentence reply). Exact model id
  pinned in the plan from the claude-api reference.
- **Fallback:** on any error, rate-limit, or timeout, the client shows a canned sample draft with the
  caption "Sample draft, the live service is resting." The page never appears broken.
- **Safety (highest stakes on the page):** the system prompt forbids diagnosis, prices and safety/gas
  claims; permits acknowledge, offer a weekday slot, ask one question. A wrong sentence about gas is the
  most damaging thing this page could output. `draft.test.mjs` posts adversarial enquiries (a gas leak, a
  price request, a non-enquiry) and asserts the reply stays within bounds.

## 8. Data flow

`content.js` is the only dataset. Brief lines, evidence tables and the replay all render from it; the API
function imports the same system prompt string from it. Dates are offsets from render-time "today", never
hardcoded. Changing a number in `content.js` changes it everywhere. Three things are designed to change
over time, each a single value: the headline, the three proof entries, the fictional dataset.

## 9. Testing and quality gates

`test/check.mjs` (run in CI and before every push) asserts:
- No em dash (`—`, U+2014) anywhere in `index.html`, `src/**`, `content.js`.
- `color-scheme: light` present; a background token set on `html`, `body`, and every `<section>`.
- No `tabular-nums` applied to a prose element; figures helper used for all numeric cells.
- Each evidence block's end-state height <= 390px at 390px width (measured via headless Chromium).
- No banned dependency present (react, tailwind, lenis, scrolltrigger, gsap ScrollSmoother).
- Page has no horizontal scroll at 390px.

`draft.test.mjs` asserts the draft safety bounds (section 7).

Before handoff: run impeccable `audit` and `critique` on the built page, and the Vercel Web Interface
Guidelines pass, per `RESEARCH.md`.

## 10. Accessibility

Body text >=4.5:1 on white (ink 18.5:1, secondary 8.5:1). Highlighter with ink text 15.7:1. Every
tappable brief line is a real button/link, keyboard reachable, visible ink focus ring (not the
highlighter, so focus never reads as "needs action"). Real tables with header cells. `prefers-reduced-
motion` honoured. Page fully readable and operable with JavaScript off.

## 11. Deployment

Static `index.html` + assets served by Vercel; `api/draft.js` auto-detected as a function. `vercel.json`
pins routes. Canonical URL is the Vercel deployment until a domain is bought; `og:url` and `og:image`
absolute and updated when the domain lands. Ship to the Vercel URL first; buy a domain after it has gone
to three prospects.

## 12. Open items (spec proceeds on the defaults; each is a one-line change)
- **Font family:** Archivo (recommended) vs Public Sans vs Familjen Grotesk. Swap `--font-text`.
- **Highlighter colour:** tuned signal yellow default. Swap `--mark` / `--mark-strong`.
- **Headline:** A (default) vs B vs C in `COPY.md`.
- **WhatsApp number and footer email:** clearly-marked placeholders until supplied.
- **Reference sites Max likes/dislikes:** may fine-tune type; not blocking.

### 12.1 Explicit v2 hooks (design for them, do not build them now)
- **A second live surface: invoice extraction.** The replay currently simulates fields lifting from the
  PDF. In v2 this could be genuinely live (paste or point at a sample invoice, Claude extracts the fields),
  mirroring the real Bidfood parser and adding a second real proof. Keep the extraction UI a separate
  component so it can be made live later without reworking the block.
- **Per-trade personalisation.** Today only the `?to=Name` greeting personalises. A `?biz=` switch to make
  the fictional firm match the prospect's trade (a real lever for a page sent after a call) is v2 per the
  brief. Keep the firm a single data object so a second one drops in cleanly.

## 13. Build order (feeds the implementation plan)
1. Project scaffold (Vite, package.json, vercel.json, tokens/base/layout CSS, fonts).
2. Static end state: `index.html` + `render.js` + `figures.js`, all six evidence blocks, brief, copy,
   proof, buttons, footer. Passes every check with JS off.
3. Evidence-block precision pass (rules, alignment, form numbers, one-viewport fit).
4. Live draft: `api/draft.js` + `draft-client.js` + `draft.test.mjs`.
5. Replay: `timeline.js` + `measure.js` + `reduced-motion.js`, scene by scene against the storyboard.
6. OG image + meta + `?to=` personal line.
7. Audit: impeccable audit/critique, Vercel guidelines, final checks, deploy.

The static page (steps 1-3) is a complete, shippable product on its own. The replay and live draft are
additive. This ordering means the page is never in a broken half-state.

## 14. What Max must provide (build is blocked on these; call out early, do not stall silently)
- **Anthropic API key** for the live draft, plus a **monthly spend cap** set on that key in the console.
- **Vercel account/project** for hosting and the serverless function.
- **Upstash Redis** (or equivalent) for the per-IP rate limit, or an explicit decision to ship the draft
  without a rate limit behind the spend cap only (higher risk).
- **WhatsApp number and footer email** for the CTA (placeholders until then).
- **Font choice and highlighter sign-off** (defaults stand until changed).
The static page (build steps 1-3) needs none of these and must be shippable without them. Only the live
draft (step 4) is blocked. Sequence so the page is demonstrable before any account setup.

## 15. Ship gates (each is a hard stop; falsifiable, not vibes)
1. **Finished-not-sparse gate (highest priority).** After the static page (build steps 1-3) and before any
   replay work, capture screenshots at 390px, 768px and 1280px and put them in front of Max. If his honest
   reaction is "this looks plain / unfinished / like a wireframe," stop and add visual weight (grid, type
   scale, rule detail, density) before continuing. This early gate exists so the craft is corrected cheaply,
   on the static page, not discovered after the whole thing is built. Also run impeccable `critique`; a
   heuristic score below its "good" bar blocks ship.
2. **Motion-performance gate.** The full replay must hold >=50fps on a mid-range Android in the WhatsApp
   webview. If it cannot, ship the lite-motion path (section 6.1), not the janky full one.
3. **Draft-safety gate.** `draft.test.mjs` must pass every adversarial case (gas leak, price request, non-
   enquiry, prompt injection). Any failure blocks the live draft; the page ships with the sample-draft
   fallback until fixed.
4. **Static-quality gate.** `test/check.mjs` passes (no em dash, light-mode backgrounds, no tabular figures
   in prose, no banned dependency, no horizontal scroll at 390px, every evidence block <=390px tall).
5. **Copy-fidelity gate.** Every visible string matches `COPY.md` / `content.js` verbatim. The build agent
   does not write or edit copy.

### Falsification summary (what would say the approach is wrong)
- Max sees the static page and it reads as unfinished -> the precision-instrument lane or its execution is
  wrong for this audience; revisit before building further.
- The replay cannot hit 50fps even in lite-motion on a real mid-range phone -> the motion ambition is too
  high for the target; cut scenes.
- The adversarial draft test cannot be made to pass without neutering the draft to uselessness -> the live
  call is not worth the risk; ship the sample-only draft.


---

## Version 2: Living proof system (raised scope, supersedes the one-off framing)

Decision by Max, 14 Sep: the page is his calling card, permanent, at his own domain, and copy is reopened for a rewrite pass. This reverses the original brief's "not a website, not a funnel" on Max's explicit instruction. What is reversed and what is held:

**Held (non-negotiable, unchanged):** still ONE page, proof not a funnel (a multi-page site was offered and rejected, correctly, as it invites comparison-shopping and undercuts proof-not-pitch). Still mobile-first, light-only, one highlighter, no em dash, tabular figures for numbers only, JS-off complete, nothing sends except the live calls, forced-light survival at 390px (consulting-core HTML check).

**New capabilities.** Each is justified against the single goal (get the reply, or the call); anything that does not serve that is gold-plating and is cut.

1. **Two front doors, one page.** Root (no query) is Max's permanent calling card: the generic proof, who he is, the three real builds, the reply. The personalised door (`?to=Name&trade=...&town=...`) is the same page reconfigured for a named prospect, sent after a call.

2. **Per-trade reconfiguration.** The `?biz=` the brief deferred, now core. A small set of hand-built trade profiles (start with the trades Max actually prospects: plumbing, café, salon, house-clearance, creator), each a data object shaped like `content.js`, each with Max's sign-off on names, numbers and trade specifics. Generic fallback when the trade is unknown. NEVER auto-generate a trade at request time: a fabricated specific that is subtly wrong (a thing a real plumber would never say) is worse than generic and destroys the credibility the whole page is built on.

3. **Two genuinely live surfaces, both text, both safe.** (a) the draft reply, as specced. (b) **live text-to-structure:** the viewer pastes messy text (an email, a list, a WhatsApp enquiry) and watches Claude turn it into structured rows in front of them, the "mess into order" thesis made interactive on their own words. NO file upload in v1: a real invoice carries third-party PII, legal and cost exposure; uploaded-document extraction is a later, gated capability, not part of this scope.

4. **One signature craft moment.** A single, subtle, technically-extraordinary flourish inside the precision-instrument register (candidates: the highlighter rendered as a real ink stroke, or a device-accurate ruled baseline the brief snaps to). One, earned, still precision and never decoration. This does the "prove Max can build" job that separates expensive from clean, and is the thing a prompt-built page never reaches.

5. **Quiet, privacy-clean engagement signal.** When a prospect opens their `?to=` link, Max gets a single server-side notification (opened, ran the replay, drafted). NO cookies, NO third-party analytics, NO fingerprinting, NO storing the viewer's input; the only identifier is the name Max himself placed in the link. This answers the "no analytics means Max is blind" gap and is itself a proof point (Max knows because he built the system). **Ethics gate: Max decides on principle; the page may state honestly that it notifies him.** This is the one item that needs an explicit yes from Max before build.

**Phasing (the ship-fast spine; consulting-core avoidance check).** Max's logged pattern is building instead of sending; an ever-grander calling card is how that trap looks. Ambition is bound to Phase 1 shipping first.
- **Phase 1 (ship within days):** the one-page proof for ONE real trade profile plus the draft reply, at frontier craft. This is the existing plan at the raised craft bar. Sendable to a live prospect. Nothing below delays this.
- **Phase 2:** per-trade reconfiguration (2-3 profiles), the `?to=` personalisation, the engagement ping.
- **Phase 3:** the second live surface (text-to-structure) and the signature craft moment.
- **Later, gated:** uploaded-invoice extraction.

**Copy (reopened).** A copywriting pass in Max's voice runs before Phase 1 build. Per consulting-core copy check: read Max's `voice.md` and run the humanizer BEFORE presenting any copy; Max signs off line by line; British English, £ symbol, no em dashes, no casual phrasing hardened into fact. Until that pass completes and Max signs off, `COPY.md` remains the working text.

**Stack, reopened.** A living, personalised, multi-endpoint system is a stronger case for a light framework than a one-off page was. Flagged for the adversarial review; default remains vanilla plus Vite unless a stronger case is made.
