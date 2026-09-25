# Shape brief: follow one job (v2, 25 Sep 2026, revised after stress test, AWAITING CONFIRMATION)

v1 kept in git history. Changes come from STRESS_TEST_follow-one-job.md.

## 1. What it is
One page per trade (home + 7 trades) showing Max's system through one job. It
opens on the 07:00 email the owner gets, which lists several things from
yesterday; one line in it is the job we then follow down, from first message to
paid; then it zooms back out to the week. Works as a phone link after a call and
as a click-through on a screen-share.

## 2. The one thing they should get
"This runs my whole back office, and I (or whoever does my books) still approve
everything." Then reply on WhatsApp.

## 3. Look
Papote v5 language: soft tinted ground, white cards, plain-word labels, pictures
over text.
**Colour means state, not area** (validator: area hues fail colour-blind checks):
- teal: the system at work / Max's side (and the one filled button)
- yellow: needs you (only at the two approve moments and overdue asks)
- green: done / paid / filed
- red: overdue / price up
- everything else neutral ink and grey
Business area is carried by an **icon + word** on each beat, not by colour.
No blur, no glassmorphism, restrained shadows (WebView performance).
Scene: a roofer in his van at 6pm, phone in hand, half-sceptical; or Max on a
laptop walking an owner through it.
References: Papote Morning Brief v5 (tiles, plain words); Monzo/Starling money
summaries (meters and stat tiles, calm); Green Camel (quick headline up front,
detail on tap, show the machine thinking).

## 4. Scope
Production-ready, all 8 URLs, interactive, polish until it ships. Built in slices:
beat 1 + email mock first, screenshot, then the rest.

## 5. Layout: open, follow, zoom out
**Top (first screen on a phone):** Max's line, the headline, and the 07:00 email
on a phone mock: 4 or 5 tiles (new enquiries, jobs booked, money in vs owed,
one price alert, today). One tile is marked "follow this one". "Worked example,
made-up firm" sits inline under it.

**Four beats on the phone** (each fits one phone screen, each a different shape):
1. *The message and the reply.* WhatsApp bubble at 18:42; a reply drafted in his
   voice; **Approve**. Includes "Type your own customer's message" (live draft
   when the API key is in; sample otherwise).
2. *Booked, done, invoiced.* Approving in beat 1 visibly drops the job into a
   week grid; then the invoice slip.
3. *Chased to paid.* Day 14, amber "unpaid"; chaser drafted; **Approve**; the
   slip turns green "Paid".
4. *Your week.* Zoom out: one stacked bar (paid / owed / overdue) that has just
   absorbed this job's money, and one line chart (a supplier's price creeping,
   rival in grey). The followed job is one sliver among many.

Then one line ("Where we start") and the WhatsApp button, with "Worked example,
made-up firm" repeated beside it. Bottom proof section removed (Max's call; see
open decision).

**Call mode** splits the four beats into seven stops (message, reply, booked,
invoiced, chased, paid, week) for narrating.

## 6. Interaction
- **Approve has consequences.** Beat 1's Approve books the slot in beat 2; beat
  3's Approve turns the invoice to Paid and grows the paid segment in beat 4. If
  the reader skips Approve, the page still shows the end state as it scrolls
  (never gated).
- **Phone:** normal scroll. Each beat's picture plays once when it arrives, on
  top of an already-visible default. No fixed tracker, no fixed banner; progress
  is an in-flow "step 2 of 4" line at the top of each beat.
- **Call mode ("Walk me through", laptop only):** one stop at a time, full
  screen, right/left arrows and space, a dot row, visible "next" button for
  mouse users. Each stop holds until advanced; animations replay on every visit;
  expanded detail is shown by default because Max is narrating. Esc exits.

## 7. Charts (dataviz)
- No comparison rings. At most one familiar progress fill, if any.
- Money: one horizontal stacked bar, three states, direct labels, 2px gaps.
- Hours / targets: straight meters.
- Supplier price: line, emphasis on the rising supplier, rival grey, endpoint
  labels only, one axis.
- Email tiles: stat tiles with proportional figures; no hero-metric template.
- Every chart has a readable text twin.

## 8. Density budget
Each beat fits one phone screen at rest. Expanded detail max 4 rows. Whole phone
page max 7 screens. Max ~25 words of prose per beat.

## 9. People
Wording says "you, or whoever does your books" at approve moments, so the office
manager is in the story.

## 10. States
Phone scroll; call mode; JS off (all beats in end state, call button hidden);
reduced motion (no transitions, end states); ?to=Name (personal line and
"Morning, Name" in the email mock); live draft with and without the API key;
after each Approve; slow network.

## 11. Build aids
impeccable layout, animate, colorize, typeset; dataviz marks + anatomy and the
validator on the state palette; GSAP only for call mode and small transforms.

## Open decision (Max)
All four simulated prospects and the evidence review flagged that removing every
sign of a real client leaves a sceptic nothing real. Max has asked for the proof
section to go. Option: keep one quiet line under the CTA ("This runs every
morning at a café in Amsterdam, 39 mornings in a row so far"), or nothing.
