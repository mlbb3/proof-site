# Kickoff: first Claude Code session (proof-page repo)

The eight design files live on a Notion page: "Proof page, build docs (14 Sep 2026)", under the AI Consulting hub. The repo is empty except main. This prompt tells Claude Code to pull the docs from Notion into the repo first, so nothing needs moving by hand.

Paste everything below as the first message in a Claude Code session opened on the proof-page repo.

---

You are in the empty proof-page repo. Do these in order.

1. Using session-recording, bootstrap the hooks (skill steps 1 to 5) and commit.

2. From Notion, open the page "Proof page, build docs (14 Sep 2026)" (search it, or use the Notion connector). It has eight attached files: HANDOVER.md, DESIGN_BRIEF.md, INFORMATION_ARCHITECTURE.md, RESEARCH.md, STORYBOARD.md, COPY.md, content.js, and this KICKOFF.md. Download all eight and write them into the repo under `.design/proof-site/`. Commit with message "Add design docs from Notion". If you cannot reach Notion, stop and tell me; do not invent the contents.

3. Read in full, in this order, and do not summarise back to me: `.design/proof-site/HANDOVER.md`, `DESIGN_BRIEF.md`, `INFORMATION_ARCHITECTURE.md`, `RESEARCH.md`, `STORYBOARD.md`, `content.js`, `COPY.md`.

4. Install `gsap-skills` and `gsap-choreography` (`npx skills add`), confirm `impeccable` is available, run `/impeccable init` with register set to brand.

5. Run design-flow phase 4, design tokens, following the design-tokens skill. Constraints: OKLCH throughout; page white at chroma 0; near-black ink; one highlighter colour used as a marker behind text and as the fill of the two buttons; no cream, no purple, no terracotta. Type: follow impeccable `reference/brand.md`. Voice words are plain, ruled, matter-of-fact; physical object is the job sheet. Reject Inter, Geist, IBM Plex, Space Grotesk, DM Sans, Fraunces, Instrument Serif. Browse a real catalogue and show me three candidate families with one line each on why, and whether each has tabular figures good enough to drop the separate mono. I choose. Then present the token file and stop.

Rules that do not bend: copy is locked in COPY.md and content.js; no em dashes; light mode only with `color-scheme: light` and background on html, body and every section; mono or tabular figures for numbers only, never sentences; no scroll-linked motion, no fixed overlays, no fake cursor; nothing on this page sends anything except the draft call; each evidence block fits one 390px viewport.

Reply in under 150 words unless showing code or the token file. If something is ambiguous, pick the simplest reading, do it, log it as ASSUMED in `.session-log.md`. Do not start phase 5 until I confirm the tokens.

6. At session end, write the session close back to the same Notion page as a new sub-section, so the record stays current.
