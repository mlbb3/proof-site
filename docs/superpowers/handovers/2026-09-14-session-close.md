# Session handover, 14 September 2026

proof-site, branch `claude/exciting-einstein-f45sem`, first Claude Code session: bootstrap, design docs in, tokens phase done, waiting on Max.

## 60-second orientation
Empty repo at start. Session-recording hooks, the eight design docs, GSAP skills, impeccable PRODUCT.md and DESIGN_TOKENS.css are all committed and pushed. Phase 5 (tasks) has not started and must not until Max confirms the type choice and the tokens.

## Blockers and irreversible decisions
- **USER SAID** "Do not start phase 5 until I confirm the tokens." (kickoff, 14 Sept)
- **VERIFIED** Notion MCP cannot download user-uploaded attachments. The docs came in as a zip in chat.
- **VERIFIED** fonts.google.com is blocked by the egress proxy; fonts.googleapis.com and fonts.gstatic.com are open.

## What shipped
| Commit | What it does | Verified |
|--------|-------------|----------|
| `1269207` | Session-recording hooks, settings.json, .gitignore | scripts ran by hand |
| `ef7bd1b` | Eight design docs under .design/proof-site/ | byte sizes match the zip |
| `0eb42ef` | gsap-skills (8 skills), gsap-choreography, PRODUCT.md | npx skills add exit 0 |
| `2e2e8c9` | DESIGN_TOKENS.css, type-candidates-390.png | contrasts computed, specimen rendered in Chromium |

## Type candidates (Max to choose)
Ten grotesques pulled from Google Fonts and inspected with fonttools. Three shortlisted, all with tabular figures good enough to drop the separate mono:
1. **Archivo** (recommended). Late-19th-century American grotesque, built for print and screen, tightest fit at 390px, tnum verified.
2. **Public Sans**. Libre Franklin cut for the US Web Design System, literally a government-form face, tnum verified, slightly looser.
3. **Familjen Grotesk**. Tabular by default, no feature flag needed, a touch friendlier in the a and g.
Rejected: Schibsted Grotesk (tabular digits spaced like a typewriter), Work Sans (wide), Libre Franklin (served subset has no tnum), Overpass, Atkinson Hyperlegible Next, Hanken, Rethink.

## Verified facts
| Fact | Evidence | When |
|------|----------|------|
| ink on paper 18.5:1, ink-2 8.5:1, ink-3 4.9:1, ink on mark 15.7:1 | scratchpad/oklch.py | 14 Sept |
| Archivo, Public Sans, Familjen have tnum or default tabular | fonttools GSUB read | 14 Sept |

## Blocked on user
- [ ] Type family: Archivo, Public Sans or Familjen Grotesk. Recommend Archivo.
- [ ] Confirm DESIGN_TOKENS.css (highlighter oklch(0.94 0.18 104), ink oklch(0.19 0 0)).
- [ ] Headline A/B/C, WhatsApp number, footer email, reference sites (carried from HANDOVER.md).

## Traps
- Chromium in this environment does not trust the proxy CA; web fonts do not load in headless renders. Use local woff2 files.
- Headless Chromium clamps window width around 500px; constrain the body to test 390px layouts.

## Next session priorities
1. Swap --font-text if Max chose differently. One line.
2. Phase 5: brief to tasks (TASKS.md).
3. Phase 6: build, with test/check.mjs enforcing no em dashes, light mode, backgrounds.

## Session compliance
- Rules read: yes (kickoff rules, HANDOVER.md rules, brief ban lists)
- Task and write boundary confirmed: yes
- Skills used: session-recording, impeccable (init, brand.md), design-tokens, design-flow
- Assumptions made while unattended: PRODUCT.md written from docs without interview; tokens written with Archivo before Max's choice
