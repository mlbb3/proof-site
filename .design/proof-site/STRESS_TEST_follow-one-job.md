# Stress Test: "Follow one job" shape brief (v1)

Full mode. 25 Sep 2026. Inputs: impeccable (shape, brand register, bans), dataviz
(form choice, anti-patterns, palette validator run), stress-test lenses, and three
blind reviewers (audience simulation x4 personas, independent evidence with web
search, information architecture vs the prior brief and impeccable rules).

## Position (as stated)
Show the system by following ONE job through seven steps (message, drafted reply +
Approve, booked, invoiced, chased to paid, 07:00 email, Friday money), in Papote v5
language (tinted ground, a pastel per business area, yellow for "needs you", rings
and charts), equal on phone and on a screen-share "Walk me through" mode.

## Decomposed claims
1. A single job's journey communicates "a whole back office". ASSUMPTION
2. Seven steps will be seen on a phone in ~40s. ASSUMPTION (unverified; no data exists)
3. Four pastel area colours give "rhyme and reason". EMPIRICAL (tested: fails)
4. Rings are the right chart language. EMPIRICAL (evidence weakens)
5. One content model serves phone and call equally. ASSUMPTION
6. Tapping Approve makes it interactive in a way that persuades. ASSUMPTION
7. A sticky tracker helps. VALUE JUDGEMENT (contradicts the webview rule)
8. Hiding detail behind taps fixes density. ASSUMPTION
9. The WhatsApp in-app browser will run it smoothly. DEPENDENCY

## Lens findings

### Steelman
- A job is the unit a tradesman already thinks in; following one is the most
  legible possible frame (Rob, house clearance: step 5, the day-14 chase, is
  "exactly my weekly pain").
- It gives Max a script for free: every step is a sentence he can say on a call.
- It keeps the owner in the loop at every step, which answers the #1 objection
  from earlier red teams ("the chatbot sellers said it runs itself").

### Strawman
- **Claim 3 fails the validator.** Teal vs blue: normal-vision dE 7.4 (hard fail,
  below 15). Sage vs terracotta: deutan dE 3.5 (red-green blindness, ~1 in 12 men).
  No four-hue set from the finca series passes; the dataviz rule caps "any two can
  sit side by side" forms at three hues, and even the best three only pass with a
  secondary cue. Colour cannot carry business-area identity. Period.
- **Claim 1 is backwards.** A single thread structurally argues "it handled one
  job once". Breadth (many enquiries, the whole day) only appears at step 6, which
  the phone reader never reaches.
- **Claim 7 contradicts the brief's own standing constraint** ("no fixed overlays
  that fight the webview").

### Pre-mortem (it is March; it failed)
- Steve opened it in the van, saw a WhatsApp bubble and a pastel diary, thought
  "job app", closed it at step 2. The morning email, the actual product, sat at
  step 6 below the fold of his patience.
- On calls Max fumbled arrow keys while talking; step 6 felt like a second product
  bolted on because nothing bridged "one job" to "your whole week".
- The office manager at a 12-person firm read "he taps Approve" as "they don't
  need me" and quietly killed the deal.
- On a mid-range Android in WhatsApp the GSAP transitions and soft shadows
  stuttered; it felt cheap.

### Inversion (how to guarantee losing Steve)
- Make him scroll to find out what it is. (v1 does: the payoff is step 6.)
- Make it look like the Instagram tools that burned him: glossy consumer rings,
  pastel confetti. (v1 risks it.)
- Make interactions that change nothing. (v1's Approve only flips its own label.)

### Second-order
- Colour per area forces a legend; a legend on a phone is density again.
- Hiding detail in expanders with no budget recreates the old wall one tap down.
- Removing all proof leaves zero anchors of realness for the sceptic (all four
  personas noticed; Max has asked for it to go).

### Independent assessment (sources in the evidence review)
- Interactive-demo conversion stats are vendor-published, SaaS-trial funnels, and
  self-selected (people who click demos already intend to buy). Plausible, unproven
  for this audience.
- No published data on step count vs completion. "Seven" is a guess.
- Radial/ring charts underperform bars for comparison (arXiv:1907.13534;
  Nightingale). Apple rings work because they are three familiar single-value fills.
- WebView JS/GPU is slower than the native browser, notably Android (shadows,
  blur); caution must extend to animation, not just scroll.

### Dataviz form check
- Rings for "in vs owed" or "hours vs planned" = the wrong form. A single ratio
  against a limit is a **meter** (straight bar). Part-to-whole (paid / owed /
  overdue) is a **single stacked bar**. Price creep over three dates is a **line
  with emphasis**: the rising supplier in the accent, the rival in grey, endpoint
  labels only. The diary is not a chart; it is a week grid. The email tiles are
  **stat tiles**: proportional figures, no gradient, no hero-metric template.

### Ambition
- The one real thing on the page is already built: "type your own enquiry" drafts
  a reply live. Put it at the moment of the first message, so the sceptic writes
  his own customer's message and watches it get answered. That, not an animation,
  is what converts.
- `?to=Rob` can put "Morning, Rob" in the email subject line on the phone mock.
  Costs nothing, lands hard.
- On a call Max can type the prospect's real enquiry from this week. That turns
  the demo into their business.

## Verdict
**Revise, then build.** Keep "follow one job" as the spine, but restructure the arc,
change what colour means, and cut to four beats on the phone. Specifically:
(1) open on the morning email, where one line in it is the followed job, so the
system is visible in the first screen; (2) follow that line down in four beats;
(3) zoom back out to the week; (4) colour = state, never area; (5) Approve has
real consequences downstream; (6) no fixed overlays; (7) meters, stacked bar and
an emphasis line in place of rings; (8) a hard density budget.

## Falsification criteria
- Send to the next 5 post-call prospects. If fewer than 2 reply on WhatsApp within
  48 hours, the format is wrong; revisit before sending more.
- On a mid-range Android inside WhatsApp, if first paint of the email mock exceeds
  2.5s or any beat transition visibly stutters, strip GSAP to CSS transforms.
- On Max's first real screen-share, if he has to scroll or hunt for a control more
  than twice, call mode's controls are wrong.
- If a colour-blind tester (or the dataviz validator on any new colour) cannot
  tell paid from overdue, the state palette is wrong.

## Recommended next action
Max confirms the revised brief (v2); then build beat 1 plus the email mock as a
single slice, screenshot on phone and at 1280, before the rest.
