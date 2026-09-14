# Research: what to steal, and from where

14 September 2026. Every item below was found and read in this session. Nothing is from memory. Where a claim could not be verified it says so.

## 1. The orchestration layer (the replay)

**Costumary/gsap-choreography** (github.com/Costumary/gsap-choreography). AI-agent instructions for scripted, multi-scene GSAP product walkthroughs: a fake cursor walks the product while scenes transition on one choreographed timeline. Covers cursor, click feedback, scene transitions, typed text, layout morphing. Pure DOM, no video; the author's own hero runs a 4-scene, 26-second walkthrough at ~57kb of animation JS. Ships as a Claude Code skill. **This is the closest thing to our "Run last night" sequence that exists as reusable knowledge.** Steal: scene structure, typed-text pattern, click-feedback timing. Do not steal the fake cursor; our replay is documents being read, not a user clicking.

**GSAP** (github.com/greensock/gsap). 100% free including all plugins since the Webflow acquisition. Official skills repo at github.com/greensock/gsap-skills, installable with `npx skills add`. Use: timelines with labels for the replay, SplitText for the brief composing itself line by line, `gsap.matchMedia()` for the reduced-motion branch. Do not use ScrollTrigger or ScrollSmoother anywhere; the WhatsApp webview constraint stands.

**formkit/auto-animate** (github.com/formkit/auto-animate, 13.9k stars, ~3kb). Zero-config transitions when children are added to a parent; respects prefers-reduced-motion by default. Use: rows landing in the invoice register and job book during the replay, and the live-draft row appearing after the API call. One line per container.

## 2. The extraction pattern (invoice card)

**Reducto Studio's two-way citations.** Each extracted field carries a bounding box on the source document; click a field to highlight where it came from, click a region to jump to the field. This is the model for evidence card 2 (fields lifting out of the PDF) and, generalised, for the whole page: tap a brief line, see its source. Build it in HTML/CSS with `clip-path` reveals, not an image.

## 3. Motion taste (what not to do)

**Rauno Freiberg, "Invisible Details of Interaction Design"** (rauno.me/craft/interaction-design) and **Devouring Details** (devouringdetails.com). Principles: responsiveness before decoration, interruptible motion, object permanence as the reason to animate at all.

**Emil Kowalski's rules**, as encoded in the design-motion-principles skill (aiuxplayground.com/skills/design-motion-principles): UI animations under 300ms, 180ms feels more responsive than 400ms, never scale from 0, custom curves not default `ease`, transform-origin from the trigger, no bounce outside playful contexts. The replay is a directed sequence so it can run longer than 300ms in total, but every individual movement inside it obeys these.

**impeccable** (github.com/mindcollaps/impeccable). Already installed. 23 commands, 45 deterministic detector rules, brand vs product register. Use `reference/brand.md` for register, `reference/animate.md` for motion, and run `/impeccable audit` and `/impeccable critique` on the built page before Max sees it.

## 4. Anti-slop tooling for the build agent

Verified as existing and relevant: **anthropic frontend-design** skill (baseline), **impeccable** (deeper, installed), **nutlope/hallmark** (anti-slop gates, OKLCH themes, emits a portable design.md; 27.7k stars per the March 2026 survey, not independently re-verified), **Vercel Web Interface Guidelines skill** (100+ rule accessibility/UX audit in file:line format, per Firecrawl's September 2026 list). Recommendation: impeccable for taste, the Vercel guidelines skill as the quality gate at the end. Do not install hallmark as well; two taste skills fight.

Seen and rejected: **scroll-world** and **scroll-craft** (scroll-driven camera flights and pinned sections). Wrong register for a trades owner in a webview, and both are the "immersive" reflex.

## 5. The live Claude call

Pattern confirmed in two repos: static `index.html` plus an `api/*.js` serverless function; Vercel auto-detects the `api/` folder with no config. Key lives in a plain (not `VITE_`-prefixed) env var so it never reaches the bundle. The function fixes model, system prompt and `max_tokens` server-side so the client cannot escalate cost. Rate limit per IP (Upstash Ratelimit is the connectionless option built for Vercel; a 10-per-hour default is what one repo ships) and set a monthly usage limit on the key in the Anthropic console as the backstop.

## 6. What I looked for and did not find

- A public repo that animates a *document pipeline* (inbox → extraction → ledger → summary) as a landing-page demo. Nothing close. The replay will be built from the pieces above, not cloned.
- Reference sites in the "trade paperwork" aesthetic lane. Search did not surface any; this needs Max's own links or a browse of Are.na / Siteinspire with the right terms, which I cannot verify from here.

## 7. Decisions this research forces

1. GSAP timelines for the replay, auto-animate for row insertion, CSS clip-path for extraction. No other animation dependency.
2. The replay is tap-to-run, not autoplay, and its end state is the static HTML. Reduced motion jumps to the end.
3. The live draft is a real Haiku call through `api/draft.js`, rate limited, with canned fallbacks.
4. Install `gsap-skills` and `gsap-choreography` into the build repo before the agent starts; run impeccable audit and the Vercel guidelines skill before handover.
