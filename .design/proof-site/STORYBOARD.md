# Storyboard: "Run last night"

14 September 2026. The replay is the page's argument, so it gets a shot list. Every scene mirrors a workflow that is live at a real client, named here so Max can say on a call "this exact thing runs at the café in Amsterdam". All data comes from `content.js`; nothing in the animation is hand-typed.

Total running time 8.0s at normal speed. Each individual movement is under 300ms with `expo.out`. No bounce. "Skip" is visible throughout and jumps to the end state. The end state is byte-identical to the page with JavaScript off.

Timing convention: `t` in seconds from the tap on "Run last night". Elements are referred to by the IDs in INFORMATION_ARCHITECTURE.md (`#enquiry-log`, `#invoice-register`, `#job-book`, `#timesheet`, `#sales-ledger`, `#supplier-prices`, `#brief`).

---

## Before the tap

The page is in its end state: brief composed, six marked lines, evidence blocks full. On tap:

- `t=0.00` The six brief lines lose their text (SplitText lines set to `autoAlpha:0`), the "Yesterday" block collapses to a single muted line reading `Reading last night…`. The evidence blocks empty (rows set to `autoAlpha:0`, tables keep their header row so nothing jumps). Page scrolls to `#enquiry-log` with the brief still visible above on desktop; on mobile the brief scrolls out and the log fills the viewport. 250ms.
- A thin caption strip appears under the Run button: it will show the scene caption. Font 13px, muted.

Real-world anchor: the whole sequence is what runs between 02:00 and 07:00 at Papote.

---

## Scene 1: Inbox fills (t=0.25 to 1.50)

**Mirrors:** Papote Email Drafter (7-category classification, drafts in the owner's voice, human approval gate). Ellis email drafter.

**On screen before:** `#enquiry-log` with header row only.

**Motion:**
- `t=0.25` Caption: `Reading overnight enquiries`
- `t=0.35` Row 1 (Ben Carrick, WhatsApp) slides in from `y:8`, 220ms. Its channel cell reads `WhatsApp`.
- `t=0.65` Row 2 (Lena Kowalski, web form). Same.
- `t=0.95` Row 3 (Harbour View Guest House, email). Same.
- `t=1.20` The status cell of each row types `Draft, waiting` (SplitText chars, 12ms per char, stagger 60ms between rows). The highlighter mark fades in behind the three status cells, 180ms.
- `t=1.45` Under row 1, the draft reply block expands (`height:auto` via `clip-path: inset(0 0 100% 0)` to `inset(0)`, 220ms). Text is already there; it is revealed, not typed. Approve and Edit buttons appear with it.

**After:** three rows, three marks, one expanded draft. Caption clears.

**Reduced motion:** rows and draft set to visible instantly; caption shows for 600ms then clears.

---

## Scene 2: The invoice is read (t=1.50 to 3.00)

**Mirrors:** Bidfood PDF Parser (Claude reads factuur PDFs), Steans, Zuivelrijck and Ulmus parsers, Filed Invoice Capture.

**On screen before:** `#invoice-register` with header row only, and above it the PDF outline (`#pdf-outline`): a ruled rectangle at document proportions containing muted placeholder lines and three real strings in position: `Invoice KPS-48213`, the date, `Total £862.40`.

**Motion:**
- `t=1.50` Caption: `Reading the PDF attachment`
- `t=1.55` Outline fades in, 200ms.
- `t=1.80` Highlighter mark sweeps across `Invoice KPS-48213` left to right (`clip-path: inset(0 100% 0 0)` to `inset(0)`, 240ms). `t=2.05` same on the date. `t=2.30` same on the total.
- `t=2.55` A copy of each highlighted string travels to its cell in the register's first row (GSAP `Flip` from outline position to cell position, 260ms, staggered 60ms). The originals stay marked in the outline.
- `t=2.85` Row 2 (Southern Heating Parts) appears via auto-animate without the outline sequence; the point has been made once. Status cells read `Filed`, no mark (nothing needs Dan).

**After:** outline with three marks, two rows, both `Filed`. Small caption in the block: `Read from the PDF attachment. Nobody typed this in.`

**Reduced motion:** outline and both rows visible instantly.

---

## Scene 3: Jobs are logged (t=3.00 to 4.00)

**Mirrors:** Papote Roller Booking Parser (forward bookings pulled from confirmation emails), BookingsCore.

**On screen before:** `#job-book` with header row only. Above it a four-line list of email subject lines, hidden.

**Motion:**
- `t=3.00` Caption: `Logging jobs from confirmation emails`
- `t=3.05` Four subject lines fade in stacked, 150ms each, stagger 80ms: `Booking confirmed: Sandhu, Ashford, bathroom refit` and so on.
- `t=3.50` Four rows land in the job book via auto-animate, stagger 100ms. Each row's `Source` cell reads `Email confirmation`.
- `t=3.90` Subject lines fade to muted (they stay, as provenance).

**After:** four rows. Caption in block: `Logged the moment the confirmation arrived.`

---

## Scene 4: Hours are checked (t=4.00 to 5.00)

**Mirrors:** Eitje Daily Labour Sweep (three exports, self-healing, reconciles to the totals row). This is the verification layer, the billable thing.

**On screen before:** `#timesheet` with header row and an empty totals row.

**Motion:**
- `t=4.00` Caption: `Checking hours against the plan`
- `t=4.05` Six rows appear via auto-animate, stagger 60ms. Planned column filled; Logged column empty.
- `t=4.45` Logged values count up (GSAP number tween, 300ms, tabular figures so nothing jitters).
- `t=4.75` Totals row fills: `48.0` planned, `47.5` logged. A 300ms pause on the comparison.
- `t=4.85` Callum's row gets the highlighter and its note types in: `30 min short, Maidstone job`.

**After:** full timesheet, one marked row. Caption: `Checked against the totals before anything is reported.`

---

## Scene 5: Till and prices (t=5.00 to 6.00)

**Mirrors:** Papote Roller Daily Revenue Pipe (daily POS export) and the supplier price-drift analysis (same product, same pack, across dates).

**On screen before:** `#sales-ledger` (three figures and two overdue rows) and `#supplier-prices` (a three-row table: date, supplier, unit price for the same cylinder), both empty.

**Motion:**
- `t=5.00` Caption: `Tallying yesterday's money`
- `t=5.05` Three figures count up: invoiced `£3,120`, paid `£2,450`, over 30 days `2`. 300ms.
- `t=5.35` Two overdue rows land, each with a marked `Draft chaser ready`.
- `t=5.60` Caption: `Same part, three dates`
- `t=5.65` Three rows land in supplier prices: March £412, June £438, this week £457 from Kentwide; and one row from Southern Heating at £419. The Kentwide this-week price gets the mark and the note `+11% since March`.

**After:** both blocks full. Captions: `Chasers follow the same rule. Dan approves, then they go.` and `Kept because the invoices were read, not filed.`

---

## Scene 6: The brief composes (t=6.00 to 8.00)

**Mirrors:** Papote Morning Brief and Flossie (delta-based, escalation ladder).

**On screen before:** page scrolls back to `#brief` (250ms). The "Yesterday" block shows `Reading last night…`.

**Motion:**
- `t=6.00` Caption strip clears.
- `t=6.10` `Reading last night…` fades out. The six lines type in, one every 280ms, SplitText line mode with a 120ms `autoAlpha` fade per line rather than character typing (character typing is the tell). As each line lands, its highlighter mark widens in from the left, 180ms.
- `t=7.80` "Today" block fades in as a whole, 200ms.
- `t=8.00` Done. Run button label changes to `Run it again`. Caption strip removed.

**After:** exactly the first screen.

---

## Skip

Visible from `t=0` as a text link under the caption strip. On tap: `timeline.progress(1)`, all captions removed, scroll to `#brief`. Under 100ms.

## Pause on tap (desktop only, for live calls)

Clicking anywhere on an evidence block while the timeline is playing pauses it; clicking again resumes. Not on mobile; a tap there is a scroll.

## What must never happen

- No fake cursor.
- No character-by-character typing of sentences (numbers and short status words only).
- No element moves more than 12px on entrance.
- No scene depends on the previous one having animated; each scene sets its own start state so the timeline can be scrubbed.
- Nothing in the replay is the only place a fact appears. If the timeline never fires, the page is complete.
