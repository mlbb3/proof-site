# Design Brief: Proof page

Phase 2 of design-flow. Written 13 September 2026, revised 14 September after the ambition stress test and RESEARCH.md. Supersedes SPEC v2 (rejected).

## Problem

Dan runs a plumbing and heating firm with eight people. He has just had a call with Max, who told him the admin could run itself and he could get one message every morning instead of an inbox. Dan half believes it. He has heard the same promise from three Instagram accounts this month and every one of them turned out to be a chatbot and a Zapier link. He is reading this on his phone, in WhatsApp, probably in the van, probably with 40 seconds to spare. What he wants is to see it, not be told about it.

## Solution

One scrollable page that runs the machine in front of Dan rather than describing it. He presses "Run last night" and watches three messy enquiries, two supplier PDFs, a rota export and a till file get read: fields lift out of the invoice, rows land in the register, hours are checked against the total, and the morning message composes itself line by line from those rows. Then he can tap any line of that message to see the paperwork underneath. One part is real: he can type his own enquiry and a draft reply in his voice comes back from Claude in a few seconds, marked waiting for approval. A sixth line in the message shows what the data says once it exists (the supplier quietly charging him more for the same part), which is the bridge to the paid diagnostic. It reads like the documents his business already runs on, not like a software launch. At the bottom is the plainest way to reply: the WhatsApp thread he came from.

The benefit being shown has four rungs and the page must land all four: the owner stops being the database; nothing slips and nothing goes out unapproved; he gets decisions not data; and once the data exists the business becomes legible.

## Experience Principles

1. **Show the paperwork, not the product.** Every claim on the page resolves to a row Dan could point at. If a section cannot be backed by something a real build produced, it does not go on the page.
2. **Motion only where it shows a transformation.** The replay animates because mess becoming order is the whole argument. Nothing else on the page moves: no entrance fades, no hover flourishes, no decoration. The transformation is the drama; the rest is still.
3. **Real over impressive.** Numbers are boring and plausible. Names are ordinary. Dates are today's. A caption admits it is a mock-up. Credibility is the whole design.

## Aesthetic Direction

- **Physical object**: the job sheet. Black ruling on white paper, dense where it needs to be, one highlighter colour used only where a human would mark something for action. The page looks like the documents a trade already trusts, marked up by someone who read them.
- **Three brand-voice words**: plain, ruled, matter-of-fact.
- **Tone**: calm, specific, unhurried. Very slight pitch, carried by the copy, never by the visuals.
- **Colour strategy**: white at chroma zero (not cream, not sand, not warm off-white), near-black ink, ruled lines, and one highlighter. The highlighter is a marker, not an accent: it sits behind text that needs Dan's attention and on the single button. Nowhere else.
- **Type**: one grotesque family in two or three weights, chosen for how it reads on printed forms, not for looking designed. Tabular numerals for every figure. A second family only for numbers, dates and IDs if the chosen grotesque's tabular figures are weak; never for sentences. Exact families chosen in the tokens phase against the reflex-reject list.
- **Reference points**: Max to supply two or three sites. Until then: a well-set delivery note, a printed rota pinned in a workshop, the receipt from a merchant's trade counter. Things that are obviously real because nobody designed them to impress.
- **Anti-references**: the 30 tells in Max's screenshot (listed in full under Out of Scope), AI-agency Framer templates, Stripe-adjacent editorial-typographic pages (italic serif headline, small mono labels, three ruled columns), dark-mode-plus-glow, anything with a phone bezel and a chat bubble as the hero.

### Category-reflex check

- First-order: "AI consultant proof page" pulls toward SaaS cream, Inter, four cards, purple button. Rejected.
- Second-order: "not SaaS, so editorial" pulls toward Fraunces italic, mono eyebrows, ruled columns. Rejected.
- Third lane, chosen: the trade's own paperwork. Guessable from the audience, not from the category. That is the point.

## Existing Patterns

No codebase. Max has a design-system.md used for per-prospect proposals (light-mode fix for the iOS in-app browser, mono for numbers, soft pills, no emoji, current-year dates, "observed not forecast"). This page keeps the constraints (light, mobile-first, dates current, mono or tabular for figures) and drops the proposal styling (cards, pills, tinted section backgrounds) which is now the SaaS default.

## Component Inventory

| Component | Status | Notes |
|-----------|--------|-------|
| Page header line | New | Optional "Dan, this is what I meant on the phone." from `?to=` |
| Replay engine | New | "Run last night" button; GSAP timeline with labelled scenes (inbox, invoices, jobs, hours, till, compose); tap-to-run, skippable, ends in the static HTML state; reduced-motion jumps to the end. Built from gsap-choreography patterns, no fake cursor |
| Live draft input | New | One text field, "Type your own enquiry", posts to `/api/draft`, returns a draft in Dan's voice marked waiting for approval; canned fallback on error or rate limit |
| Sixth brief line | New | The legibility rung: "Kentwide charged 11% more for the same cylinder than in March. Southern Heating was £38 cheaper this week." Evidence block 6 is a small supplier price-drift table (same part, same pack, three dates, two suppliers). This is the Papote supplier-drift work, which lands for a trades firm; demand-vs-rota is a café pattern and was dropped |
| Headline + two-sentence opening | New | Plain type, no eyebrow above it |
| The brief (the morning message) | New | Rendered as a message record: sender, time, recipient, then the text. Ruled, not bubbled, no bezel. Five tappable lines with a highlighter mark. See Key Interactions |
| Evidence block ×6 | New | One per brief line. Each is a ruled table or list styled as the document it represents (enquiry log, invoice register, job book, timesheet, sales ledger). Not cards. Not stat tiles |
| Draft reply with approve/edit | New | Inside evidence block 1. The one stateful control on the page |
| PDF field extract | New | Inside evidence block 2. HTML outline of an invoice with three fields highlighted |
| Body copy | New | Two paragraphs, locked |
| Proof entries ×3 | New | Three short entries, set as a list with ruled separators, not a card grid. Unnamed clients |
| How it starts | New | Two or three sentences of prose. Not a numbered 1-2-3 |
| Reply button | New | One button, WhatsApp deep link. The only filled element on the page |
| Footer | New | Name, one line, contact |

## Key Interactions

0. **Run last night.** Dan taps the button. Six scenes play on one GSAP timeline, about eight seconds total, each individual movement under 300ms with ease-out-expo, no bounce. Scene order: inbox fills (three enquiries arrive), invoices are read (fields lift from the PDF outline into the register, rows land via auto-animate), jobs are logged from confirmation emails, hours are checked (the timesheet totals and one row is flagged), the till file is tallied, then the brief composes line by line (SplitText, line mode). A "Skip" link jumps to the end. The end state is identical to the page with JavaScript off.
0b. **Type your own enquiry.** Dan types, taps Draft. A row appears in the enquiry log with status "Drafting" and after the API responds the draft replaces it with status "Draft, waiting". Errors and rate limits show a canned draft with the caption "Sample draft, the live service is resting." Nothing is sent anywhere.
1. **Tap a brief line.** The page scrolls to that line's evidence block. The highlighter mark on the line and the matching mark on the block's heading are the pairing. On arrival the block's heading mark widens briefly (one short ease-out, 250ms) and settles. That is the only animation on the page.
2. **Approve a draft.** In evidence block 1, tapping Approve changes the row's status text from "Draft, waiting" to "Approved" and disables the button. Edit does nothing but focus. Resets on reload.
3. **Back to the message.** Each evidence block ends with a text link that scrolls back to the brief.
4. **Nothing else moves.** No reveal-on-scroll, no fade-up, no hover effects beyond underline and focus ring. The replay is the only sequence; the line-to-evidence pulse is the only micro-interaction.

## Responsive Behaviour

- Under 700px: single column. Message first, then the five evidence blocks in order, then copy, proof, how it starts, button, footer.
- 700px to 1100px: same single column with wider measure and larger type.
- Above 1100px: the message sits in a left column and stays in view (`position: sticky`) while the evidence blocks scroll on the right. Copy, proof and button return to a single column below. The two-column layout exists so that on a laptop the pairing between line and evidence is visible without scrolling; on a phone the tap does that job.
- Tables that are wider than the viewport scroll inside their own container. The page never scrolls sideways.

## Accessibility Requirements

- Body text contrast at least 4.5:1 on white. Ink is near-black, secondary text is a genuine grey that still passes, not a decorative light grey.
- Highlighter background with ink text at least 4.5:1.
- Every tappable brief line is a real button or link, keyboard reachable, with a visible focus ring.
- Tables are real tables with header cells.
- `prefers-reduced-motion`: the one animation becomes an instant state change.
- Page is fully readable with JavaScript off (dates fall back to "yesterday", "today"; brief lines are plain anchors).

## Live service constraints

- `/api/draft` is a Vercel serverless function. Model, system prompt and max_tokens fixed server-side. Key in a plain env var. Per-IP limit (Upstash Ratelimit or equivalent) and a monthly spend cap on the key in the Anthropic console.
- Input is capped at 300 characters, stripped of HTML, and the system prompt refuses anything that is not an enquiry to a plumbing and heating firm.
- If the function is unreachable the page is still complete; the live draft degrades to a sample.
- The system prompt forbids technical diagnosis, prices, and safety claims. The draft may acknowledge, offer a slot, and ask one clarifying question. Nothing else. A wrong sentence about gas is the single most damaging thing this page could produce.

## Length constraint (from the stress test)

Each evidence block must fit inside one 390px viewport in its end state: three to four rows, no more. The whole page should be no more than nine viewports on a phone. If a block needs more rows to make its point, the point is wrong for this page.

## Out of Scope

- Any second page, navigation, pricing, FAQ, testimonials, logos, newsletter, cookie banner, analytics script, dark mode.
- A `?biz=` switch to change the fictional firm. Version 2 at the earliest.
- Editing the draft reply. The Edit button is a placeholder for the real build's behaviour, not a feature here.
- Sending anything. No email, no WhatsApp message, no webhook fires from this page other than the draft call.
- Autoplaying the replay. It runs on tap only.
- The 30 tells from Max's screenshot, all banned: aurora blobs, gradient text, floating pill nav, fake dashboard stats (our evidence is tabular and captioned as a mock-up; no stat tiles), grain, "built with AI" badge, stock avatar stack, fake client logos, logo marquee, mouse-follow glow, fade-up everything, gradient icon squares, gradient card borders, 1-2-3 how it works, stats with no source, comparison table, "most popular" tier, FAQ, fake testimonials, tilted 3D browser, chat bubble hero, abstract 3D blobs, same CTA six times, 600px centred forever, red X vs green check, footer links to "#", GitHub stars, waitlist, newsletter, cookie banner.
- From the impeccable ban list, also: side-stripe borders, glassmorphism, hero-metric template, identical card grids, uppercase tracked eyebrows, numbered section markers, cream body background, Inter, IBM Plex, Space Grotesk, DM Sans.

## Open decisions carried from the grill

- Fictional firm: plumbing and heating, eight staff, Kent. Proceeding on this unless Max objects.
- Reference sites: Max to send when he has them. The tokens phase can start without them; they may adjust the type choice.
- The brief as a message record rather than a phone-with-bubble. Recommended because the bubble hero is a known tell and the bezel adds nothing Dan needs. The copy line "07:00, to Dan's phone" carries the meaning.
