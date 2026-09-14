# Information Architecture: Proof page

Phase 3 of design-flow. 14 September 2026. Reads from DESIGN_BRIEF.md (revised) and RESEARCH.md.

## Site Map

One page. No navigation.

- Proof page `/`
  - Live draft endpoint `/api/draft` (POST only, not a page)
- Preview image `/og.png`

Everything else that could be a page (pricing, about, case studies) is deliberately absent; those conversations happen on the call.

## Navigation Model

- **Primary navigation**: none. The page is read top to bottom.
- **In-page navigation**: the six brief lines are the navigation. Each one is a link to its evidence block; each evidence block ends with a link back to the brief. That is the only wayfinding on the page and it is content, not chrome.
- **Utility navigation**: none. No header, no footer links beyond a mailto.
- **Mobile navigation**: identical. Nothing collapses because nothing exists to collapse.

## Content Hierarchy

Ordered by what Dan needs to see first, given 40 seconds and a phone.

1. **The brief, already composed** (static end state visible immediately): the destination is shown before the journey so a reader who never taps anything still gets the point.
2. **"Run last night"**: the invitation to watch it happen. Placed directly under the brief, above the evidence, because the replay is the argument.
3. **Headline and two-sentence opening**: above the brief in the DOM but visually quieter; it frames, it does not compete.
4. **Evidence blocks 1 to 6**: the paperwork under each line, in brief order. Block 1 contains the live draft input because the enquiry is the thing Dan most wants to test.
5. **Body copy (two paragraphs)**: what Max sets up. After the evidence, because by now Dan has seen it and the words confirm rather than claim.
6. **Three proof entries**: real builds, unnamed. Establishes this is not Dan's firm alone.
7. **How it starts**: prose, two or three sentences. Removes the "what happens next" question.
8. **Reply on WhatsApp**: the one button.
9. **Footer**: name, one line, contact.

On desktop above 1100px, items 1 and 2 sit in a sticky left column while item 4 scrolls on the right; items 3 and 5 to 9 are single column above and below.

## User Flows

### A. Post-call read (the primary flow)
1. Dan receives the link in WhatsApp from Max, with `?to=Dan`.
2. WhatsApp shows the preview card: `og.png` and the headline.
3. Dan taps. In-app browser opens. First screen: "Dan, this is what I meant on the phone.", the headline, the brief already composed, and the Run button.
   - If Dan taps Run → replay plays about eight seconds, skippable, lands on the composed brief with evidence below.
   - If Dan scrolls past → he reads the static brief and the evidence blocks; nothing is lost.
4. Dan taps a brief line → scrolls to its evidence, mark pulses once.
5. Dan reads the enquiry block, sees the draft, may type his own enquiry.
   - If the API responds → draft appears in his voice, "Draft, waiting".
   - If it fails or he is rate-limited → sample draft with the resting caption.
6. Dan scrolls through copy, proof, how it starts.
7. Dan taps Reply on WhatsApp → returns to the thread with a prefilled message, or closes the page and replies later.

### B. Live call demo (secondary flow)
1. Max screen-shares the page during a call, no `?to=`.
2. Max presses Run and narrates each scene as it plays.
3. Max asks the prospect for a real enquiry they had this week, types it, the draft appears.
4. Max scrolls to the sixth line (supplier price drift) and evidence block 6 to open the diagnostic conversation.
This flow means the replay must be legible at 1280px with the timing slow enough to talk over: eight seconds is the floor, with pause on tap.

### C. Degraded environments
- JavaScript off or failed: the page is the end state. Run button hidden. Live draft input hidden. Brief lines are plain anchors.
- `prefers-reduced-motion`: Run button remains; pressing it jumps straight to the end state and reveals the evidence. Line-to-evidence pulse becomes an instant colour change.
- Slow connection: fonts swap in; layout does not shift because sizes are set on the fallback stack too.

## Naming Conventions

| Concept | Label in UI | Notes |
|---------|-------------|-------|
| The morning message | the brief | Never "dashboard", "report", "summary", "digest". One word, used in copy and in the back-links ("Back to the brief") |
| The animated sequence | Run last night | Button label. Not "demo", not "play", not "simulate" |
| The paperwork under a line | evidence | Section headings use the document's real name (Enquiry log, Invoice register, Job book, Timesheet, Sales ledger, Supplier prices). "Evidence" is the internal name only |
| A drafted reply awaiting sign-off | Draft, waiting | Status text. After Approve: "Approved" |
| The one stateful button | Approve | Not "Send". Nothing on this page sends |
| The live input | Type your own enquiry | Field label. Button: "Draft" |
| The fictional firm | Hartley Plumbing & Heating | Appears in the brief header only |
| The owner | Dan | First name only, as the brief addresses him |
| The reader | (never named on the page except via `?to=`) | |
| The reply button | Reply on WhatsApp | |

## Component Reuse Map

| Component | Used on | Behaviour differences |
|-----------|---------|----------------------|
| Ruled table | Evidence blocks 1 to 6, proof entries | Same ruling and type; column sets differ. Scrolls inside its container when wider than the viewport |
| Highlighter mark | Brief lines, evidence headings, flagged rows, the Run button, the Reply button | Same colour everywhere. On the two buttons it is a fill; elsewhere a background behind text |
| Status text | Enquiry log, invoice register, sales ledger | Plain text with the highlighter behind it when action is needed; no pill shapes |
| Back-to-brief link | End of every evidence block | Identical |
| Document outline (PDF) | Evidence block 2 only | Static in the end state; animated during scene 2 |
| Prose column | Headline, opening, body copy, how it starts, footer | Same measure (max 68ch), left-aligned, not centred |

## What changes over time

Only three things, each a single value in `content.js` or the page constants: the headline, the three proof entries, and the fictional dataset. A second fictional firm (version 2) is a second data object feeding the same components, never a second page.

## URL Strategy

- Pattern: `/` only.
- Query parameters: `?to=Name` (personal line, sanitised as in the brief). Anything else is ignored.
- API: `POST /api/draft` with `{ "enquiry": "<300 chars" }`, returns `{ "draft": "..." }` or an error the page maps to the sample draft. GET returns 405.
- No hash routing. Brief-line links use `#enquiry-log`, `#invoice-register`, `#job-book`, `#timesheet`, `#sales-ledger`, `#supplier-prices`, and `#brief` for the way back. These are anchors, not routes.
- Canonical URL is the Vercel deployment until a domain is bought; `og:url` and `og:image` must be absolute and updated when the domain lands.
