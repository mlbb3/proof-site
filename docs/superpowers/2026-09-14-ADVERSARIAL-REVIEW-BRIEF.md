# Adversarial review brief for Astra

You are reviewing a design spec and an implementation plan for a one-page website, with no prior context. Your job is to attack them from every useful angle and make them better, or tell me the approach is wrong. Be ruthless. I have already found several weaknesses myself (listed at the end); go past them. I would rather you overreach and be wrong than be polite.

## What you are looking at (attach these to this chat)
1. `2026-09-14-proof-page-design.md` (the SPEC, the thing under review).
2. `2026-09-14-proof-page.md` (the PLAN, task-by-task build instructions, also under review).
3. Context, not under review but needed to judge the above: `DESIGN_BRIEF.md`, `INFORMATION_ARCHITECTURE.md`, `STORYBOARD.md`, `COPY.md`, `content.js`, `RESEARCH.md`, `HANDOVER.md`. These are the locked inputs the spec was built from.

## The situation
Max is a solo AI-automation consultant. He calls a small-business owner, then sends them a single hosted web page as proof that "your admin can run itself." The fictional prospect on the page is Dan, who runs an eight-person plumbing and heating firm in Kent. Dan reads it on his phone, inside the WhatsApp in-app browser, in about 40 seconds, in the van, and he is skeptical because three Instagram accounts sold him the same promise this month and all were a chatbot plus a Zapier link.

The page has to do two jobs at once:
1. **Prove the system works.** A tap-to-run "replay" animates overnight paperwork (messy enquiries, supplier PDFs, a rota export, a till file) being read and turned into one morning brief. One control is genuinely live: Dan types an enquiry and a reply drafts in his voice via a real Claude call.
2. **Prove Max can build.** In 2026 a mediocre-looking page reads as lazy and AI-generated, which kills the pitch no matter how good the demo is. So the page itself must look unmistakably well made. Max's own words: if it looks like shit he would click off before the demo even loads, and he would not trust his business to someone who cannot build a good page.

Success = a reply on WhatsApp, or the prospect asking for the paid scoping call. It is not SEO, not a funnel, not a product.

## The decisions already made (tell me if any are wrong)
- **Aesthetic lane: "precision instrument"** (Dieter Rams, Teenage Engineering, a lab balance, a well-set delivery note). White sheet, near-black ink, hairline rules, one highlighter colour used only where a human marks something, tabular figures. Two other lanes were considered and rejected: "archival ledger" (warm, real-paper, felt-tip; rejected as drifting toward the cream/editorial look that is banned) and "operations console" (mono, data-dense; rejected as reading like a dev tool to a tradesman).
- **Stack: vanilla HTML/CSS/JS + Vite, GSAP for the replay, one Vercel serverless function for the live draft. No React, no Tailwind, no scroll-triggered motion.** Reason: the page must be complete and correct with JavaScript OFF inside the WhatsApp webview, and the replay's end state is byte-identical to that static HTML.
- **The brief object (the morning message) leads the page; the marketing headline is present but quiet above it.**
- **The live draft uses Claude Haiku** through a serverless function; model, prompt and token cap are fixed server-side; rate-limited; canned fallback on any error.

## What is LOCKED (do not propose changing these; they are client constraints)
- All copy is locked in `COPY.md` and `content.js`. Do not rewrite wording. You may say copy is wrong, but the build does not touch it.
- No em dash anywhere. Light mode only (`color-scheme: light`, background on html/body/every section) because the WhatsApp webview mishandles dark. One highlighter colour only. Mono or tabular figures for numbers only, never prose. No scroll-linked motion, no fixed overlays, no fake cursor. Nothing on the page sends anything except the one draft API call. Each evidence block should fit one 390px-tall phone viewport. A 30-item "vibe-coded tells" ban list applies (aurora gradients, gradient text, glassmorphism, stat tiles, 1-2-3 how-it-works, fake testimonials, chat-bubble hero, etc.).

## Where I want you to push hardest
Attack these, from whichever expert seat is most damaging (skeptical senior frontend engineer; conversion/marketing strategist; a designer with real taste; a security reviewer; and Dan the actual tradesman on his phone):

1. **Is the core concept too clever?** Does a "run last night" replay of paperwork actually land with a skeptical tradesman in 40 seconds on a phone, or is it a designer's idea of proof that a plumber will not sit through? Would something simpler convert better?
2. **Precision-instrument for THIS audience.** Rams-minimalism is beloved by designers. Does Dan read hairline rules and big margins as "expensive and trustworthy," or as "empty and unfinished"? Is his trust signal actually something warmer/more solid (a Checkatrade-badge, a bank, a Screwfix)? Argue both sides and land somewhere.
3. **The live draft as a liability.** It is a public LLM endpoint on Max's key. Attack it on cost (abuse, hammering), brand safety (someone makes it say something screenshot-worthy), and the worst case: a wrong sentence about gas safety in front of a prospect. Is the mitigation (fixed server-side prompt, rate limit, adversarial test gate, canned fallback, no logging) enough? What is missing?
4. **Vanilla + Vite: right call or penny-wise?** The JS-off requirement drove it. Is that requirement even real for a page sent by WhatsApp, or is it over-caution that forfeits the ergonomics of a framework? Would a tiny framework or a different architecture be safer to build and maintain?
5. **The replay is the hardest thing to build.** Is it worth the complexity and the jank risk on a mid-range Android in a webview? Where is the line where "impressive" tips into "broken on the one device that matters"?
6. **What is missing entirely?** The page has no analytics by rule, so Max cannot tell if it worked. Is that right for a proof page, or a mistake? Anything else absent that a first-rate version would have?
7. **Is the plan executable by a weaker model?** The plan is meant to be handed to a cheaper model to build. Where will a weaker model go wrong, produce something mediocre, or get stuck? Which tasks are under-specified?

## Weaknesses I already found (go deeper than these, do not just re-report them)
- The spec described craft with adjectives ("generous margins", "flawless hairlines") rather than encodable values; a weak model turns adjectives into mediocrity. Partly addressed by concrete tokens and an early screenshot gate, but "does it look finished" is still the top execution risk.
- The data (6 staff, 4 jobs) contradicts the "3-4 rows, one viewport per block" rule. Unresolved; a decision is pending.
- The replay task is specced as patterns plus a skeleton, not full keyframes. Highest craft risk if a weak model builds it.
- Asset serving and the headless-browser path had bugs (now fixed: CSS is static, browser auto-resolves).
- Without the rate-limit service provisioned, only a monthly spend cap protects the API key.

## What I want back
Ranked findings, most damaging first. For each: the seat you are speaking from, the specific claim, and the concrete change. Call out anything over-engineered (cut it) and anything under-built (add it). If you think the whole approach is wrong, lead with that and say what you would do instead. A one-line "what would make this fail in front of the first real prospect" at the end.

Do not soften. I will reconcile your review against my own and Max's constraints; I do not need you to respect the constraints, I need you to tell me where they are hurting the outcome.
