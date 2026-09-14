# Adversarial review brief for Astra (v2, raised scope)

You are reviewing a design spec and an implementation plan for what is now a permanent web presence, with no prior context. Your job is to attack them from every useful angle and make them dramatically better, or tell me the whole approach is wrong. Be ruthless and be ambitious. This is the author's professional calling card and he is willing to spend heavily to make it exceptional, so "cut this, it is over-built" and "this is not ambitious enough, here is what world-class looks like" are both exactly what I want. I would rather you overreach than be polite. I have listed what I already know is weak at the end; go past it.

## What you are reviewing (attach these)
1. `2026-09-14-proof-page-design.md` (the SPEC, including the "Version 2: Living proof system" section at the end, which is the current scope).
2. `2026-09-14-proof-page.md` (the PLAN, task-by-task build instructions; written for the pre-v2 one-off scope, so judge it as the Phase 1 spine, not the whole system).
3. Context, not under review: `DESIGN_BRIEF.md`, `INFORMATION_ARCHITECTURE.md`, `STORYBOARD.md`, `COPY.md`, `content.js`, `RESEARCH.md`, `HANDOVER.md`.

## Who this is for and what it must do
Max is a solo AI-automation consultant. After a call with a small-business owner he sends them a single hosted page as proof that "your admin can run itself." The page must do two jobs at once: prove the system works, and prove Max can build to a standard that makes a skeptical owner trust him. In 2026 a mediocre-looking page reads as AI slop and kills the pitch. The fictional prospect is Dan, an eight-person plumbing firm in Kent, reading on his phone in the WhatsApp in-app browser, in 40 seconds, already burned by three chatbot-and-Zapier pitches this month. Success is a reply on WhatsApp or a booked scoping call.

**As of this version the scope is raised.** It is no longer a throwaway send. It is a permanent LIVING PROOF SYSTEM and Max's calling card, one page with two front doors (a generic root, and a `?to=Name&trade=...` version reconfigured per prospect), two genuinely live surfaces, one signature craft moment, and a privacy-clean signal back to Max when a prospect opens it. It is phased so a Phase 1 page can ship within days and the system layers on top. Full detail is in the spec's Version 2 section.

## Decisions made (tell me if any are wrong)
- **Aesthetic lane: "precision instrument"** (Rams / Teenage Engineering / a lab balance / a well-set delivery note): white sheet, near-black ink, hairline rules, one highlighter used only on marks and two buttons, tabular figures. Rejected alternatives: "archival ledger" (warm, real-paper; too close to the banned cream/editorial look) and "operations console" (mono, data-dense; reads as a dev tool to a tradesman).
- **One page, proof not funnel.** A multi-page marketing site was explicitly rejected as inviting comparison-shopping and undercutting the proof-not-pitch positioning.
- **Stack: vanilla HTML/CSS/JS + Vite, GSAP, Vercel functions. No React, no Tailwind, no scroll-triggered motion.** Driven by a requirement that the page be complete with JavaScript OFF in the WhatsApp webview. The raised scope reopens this: a living, personalised, multi-endpoint system is a stronger case for a light framework. I want your verdict.
- **Two live surfaces, both text, both safe:** the draft reply (Claude Haiku, fixed server-side prompt, rate-limited, canned fallback), and a live "paste messy text, watch it become structured rows." NO file upload in v1 (a real invoice = third-party PII + legal + cost).
- **A privacy-clean open-signal to Max:** no cookies, no third-party analytics, no fingerprinting, no storing viewer input; the only identifier is the name Max put in his own link.
- **Copy is OPEN.** It gets a rewrite pass in Max's voice before build. Critique it hard; propose stronger lines. It currently reads calm, plain, matter-of-fact, no hype, British English.

## Hard constraints (client-set; you may argue they hurt the outcome, the build still honours them)
No em dash. Light mode only (the WhatsApp webview mishandles dark). One highlighter colour. Numbers tabular, prose never. No scroll-linked motion, no fixed overlays, no fake cursor. Nothing on the page sends anything except the live calls. Mobile-first; the 40-second phone read is the primary context. A 30-item "vibe-coded tells" ban list applies (aurora gradients, gradient text, glassmorphism, stat tiles, 1-2-3 how-it-works, fake testimonials, chat-bubble hero, and so on).

## Where I want you to push hardest
Speak from whichever seat is most damaging per point: skeptical staff frontend engineer; a designer with genuine taste (Rams / Teenage Engineering literate); a conversion strategist; a security and privacy reviewer; and Dan, the tradesman on his phone.

1. **Is the concept too clever?** Does a "run last night" replay of paperwork actually convert a skeptical tradesman in 40 seconds on a phone, or is it a designer's idea of proof he will not sit through? What is the simplest thing that would convert better, and does the ambitious version beat it?
2. **Precision-instrument for THIS audience.** Does Dan read hairline minimalism as "expensive and trustworthy" or "empty and unfinished"? Is his real trust signal warmer or more concrete (a Checkatrade badge, a bank, Screwfix)? Land somewhere, do not just list both.
3. **The raised scope: which parts earn their place and which are gold-plating?** Rate each against the single goal (reply / call): per-trade reconfiguration, the second live surface, the signature craft moment, the open-signal to Max, the two-front-doors structure. Cut what does not earn it. Add what a world-class version would have that is missing.
4. **The live surfaces as liabilities.** Two public LLM endpoints on Max's key. Attack cost/abuse, brand safety (a screenshot-worthy bad output), and the worst case (a wrong sentence about gas safety in front of a prospect). Is the mitigation enough? Is "paste messy text" genuinely lower-risk than file upload, or does it open its own holes?
5. **The open-signal: ethics and privacy.** Is pinging Max when a prospect opens his link defensible, creepy, or a liability under UK GDPR/PECR? Where exactly is the line, and how should the page disclose it, if at all?
6. **Vanilla + Vite at this scope.** Is the JS-off requirement even real for a WhatsApp send, or over-caution that forfeits maintainability for a living system Max will run for years? What would you build it on and why?
7. **The replay build risk.** Worth the complexity and the jank risk on a mid-range Android in a webview? Where does "impressive" tip into "broken on the one device that matters"? Should Phase 1 ship a simpler motion?
8. **Positioning and copy.** Given it is now a permanent calling card, does one-page-proof still hold, or does Max need a small amount more (an about, his real work) without becoming a funnel? Attack the copy: what is weak, what is missing, what would you write instead.
9. **Executable by a weaker model?** The plan is meant to be built by a cheaper model. Where does it go wrong, produce mediocrity, or stall? Which tasks are under-specified?

## Weaknesses I already found (go deeper, do not just re-report)
- Craft was described with adjectives, not encodable values; a weak model turns adjectives into slop. Partly fixed with concrete tokens and an early screenshot gate, but "does it look finished" is still the top execution risk.
- The demo data (6 staff, 4 jobs) contradicts the "3-4 rows, one viewport per block" rule.
- The replay is specced as patterns plus a skeleton, not full keyframes: highest craft risk if a weak model builds it.
- The author's own failure pattern is building instead of sending; the raised scope risks becoming a beautiful thing that never ships. Phasing is meant to counter this. Attack whether the phasing is real or a fig leaf.

## What I want back
Ranked findings, most damaging first. For each: the seat you speak from, the specific claim, the concrete change. Explicitly separate "cut, over-built" from "add, under-built." If the whole approach is wrong, lead with that and give me the alternative. Two closing lines: "what makes this fail in front of the first real prospect," and "what would make a peer designer or engineer stop and ask how it was built."

Do not soften and do not defer to the constraints. Tell me where they are hurting the outcome; I will reconcile.
