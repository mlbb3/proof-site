# Session Handover: proof page planning (9 to 14 September 2026)

Written by the chat session on 14 September 2026. Ground truth is the files in `.design/proof-site/`; this handover ranks what matters.

## 1. Blocking

- **Reference sites.** Max has not supplied the two or three sites he likes and dislikes. The tokens phase (type, highlighter colour) can start without them but must be re-checked once they arrive.
- **Headline, WhatsApp number, footer email.** Not decided. Build proceeds with headline option A and placeholders.
- **New repo.** This build needs its own repository. Suggested name `proof-page`. Bootstrap the session-recording hooks in the first Claude Code session (the skill's Step 1 to 5) before any other work.

## 2. Irreversible decisions

- **[USER SAID, 9 Sept]** One hosted page sent after a phone call, not a website. Not SEO, not a funnel.
- **[USER SAID, 12 Sept]** The design-flow sequence runs in full before any spec: grill, brief, IA, tokens, tasks, build. A top-down spec written without it was rejected as "absolute dross".
- **[USER SAID, 13 Sept]** Register: calm, specific, no hype. Proof with a very slight pitch. CTA is reply on WhatsApp. Must not look vibe-coded; the 30-tell list in the brief's Out of Scope is a ban list.
- **[USER SAID, 14 Sept]** Be ambitious: the page should showcase everything, not a static mock-up. Do another research round and steal best practice; do not hallucinate.

## 3. Overturned beliefs

- **Was:** the page shows static paperwork. **Is:** the page runs the pipeline in front of the reader ("Run last night"), with one genuinely live Claude call and a sixth brief line showing the legibility rung. Evidence: ambition stress test, 14 Sept.
- **Was:** the paperwork lane risks being dull. **Is:** the paperwork is the material and the transformation is the drama; motion is allowed where it shows a transformation and nowhere else.
- **Was:** sixth line was demand-vs-rota. **Is:** supplier price drift. Demand-vs-rota is a café pattern; price drift lands for a trades firm and is real Papote work. Evidence: audience-sim lens, 14 Sept.
- **Was:** Ellis had Google Ads built by Max. **Is:** he did not. Do not credit it.
- **Was:** "four businesses" for Charlotte. **Is:** unverified; removed from proof copy.

## 4. Completed work (files)

- `.design/proof-site/DESIGN_BRIEF.md` (revised 14 Sept with replay, live draft, sixth line, live-service constraints, length constraint)
- `.design/proof-site/INFORMATION_ARCHITECTURE.md`
- `.design/proof-site/RESEARCH.md` (repos and practices, all verified in-session)
- `.design/proof-site/STORYBOARD.md` (shot list for the replay, mapped to live workflows)
- `.design/proof-site/content.js` (single dataset and live-draft system prompt)
- `.design/proof-site/COPY.md` (locked copy)
- `COPY.md` holds the locked copy. The earlier root SPEC.md and CLAUDE.md have been deleted.

## 5. Failed

- **Tried:** writing SPEC v2 top-down without the design flow. **Result:** rejected. **Don't repeat:** never skip phases 1 and 2.
- **Tried:** cream background, Inter, uppercase eyebrows, fade-up reveals, 1-2-3 how-it-works, chat-bubble hero, stat tiles. **Result:** nine matches against the vibe-coded tell list. **Don't repeat:** run the ban list before every visual decision.
- **Tried:** claiming Max was avoiding prospecting. **Result:** wrong; he was mid-prospecting. **Don't repeat:** never raise it.

## 6. Rules (active)

- Copy is locked by Max; the build agent does not write copy.
- No em dashes anywhere. Enforced by `grep` in `test/check.mjs`.
- Light mode only; `color-scheme: light`; background on html, body, every section. Enforced by check script.
- Mono or tabular figures for numbers only, never sentences. Prose only.
- No ScrollTrigger, no scroll-linked motion, no fixed overlays (WhatsApp webview). Prose only; audit with impeccable.
- Every figure in the proof entries verified against live builds. Prose; Max signs off.
- The live draft may acknowledge, offer a slot, ask one question. No diagnosis, prices or safety claims. Enforced by the system prompt and a test in `test/check.mjs` that posts three adversarial enquiries.

## 7. Next phases

4. Design tokens (against RESEARCH.md and the reflex-reject lists; OKLCH; white at chroma 0; one highlighter; a grotesque not on the ban list; a mono not on the ban list or tabular figures in the same family).
5. Brief to tasks (`TASKS.md`), sequenced static end state → evidence blocks → replay → live draft → OG and meta → audit.
6. Build in Claude Code with gsap-skills, gsap-choreography and impeccable installed.

The kickoff prompt lives in `KICKOFF.md`.
