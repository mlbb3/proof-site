// All page copy and content in one place, so the voice sign-off and humanizer
// pass happen here, not scattered through markup.
//
// STATUS: DRAFT copy, in Max's voice, for Max's line-by-line sign-off and a
// humanizer pass before ship. Not final. British English, no em dashes.
//
// HONESTY: every claim here is real. The café and creator systems are live.
// The clearance firm is being built, and is stated as such. No prices, no
// client names, no private figures. The live stat is verified and dated below.
//
// STRUCTURE: one shared body (proof, outcomes, close) plus a SEGMENTS map. The
// only thing that changes per URL is the hero, so a trade link speaks that
// trade's language. Personalisation (a prospect's name) is an optional ?to=
// on the link, injected at view time. No names are baked into the repo or the
// routes, so a dead lead leaves nothing behind.

export interface Hero {
  /** Optional static line above the H1 (e.g. the trade). */
  kicker?: string;
  headline: string;
  /** Optional tail clause, shown in teal. */
  headlineEmphasis?: string;
  sub: string;
  ctaButton: string;
  ctaLine: string;
}

export interface Segment {
  /** URL slug under /for/. The home page uses the 'default' entry at '/'. */
  slug: string;
  /** Internal label, not shown. */
  label: string;
  hero: Hero;
}

export const IDENTITY = {
  name: 'Max Brown',
  role: 'I build the back office for small businesses, and I run it for them.',
  // Placeholder monogram until Max supplies a real photo (a real face is a
  // known trust lever; this is a stand-in). Max to drop the photo into the
  // repo once the trades system is actually built.
  monogram: 'MB',
  whatsappNumber: '447531188098',
  phoneDisplay: '07531 188098',
};

const CTA_BUTTON = 'Message me on WhatsApp';
const CTA_LINE =
  "Or text GO to 07531 188098 and I'll start on whatever's costing you most, this week.";

// The shared close of every hero sub. Trade heroes lead with one line in the
// reader's own world, then this promise.
const HERO_PROMISE =
  "I catch every enquiry, chase what you're owed, and send you a plain summary each morning. Nothing reaches a customer without your say-so, and I keep the whole lot running.";

function tradeHero(kicker: string, opener: string, firm: string): Hero {
  return {
    kicker,
    headline: `I build the back office for ${firm},`,
    headlineEmphasis: 'and I run it for you.',
    sub: `${opener} ${HERO_PROMISE}`,
    ctaButton: CTA_BUTTON,
    ctaLine: CTA_LINE,
  };
}

// The home page. Grounded, no claim about the reader's business. Whoever lands
// here cold gets a plain account of what Max does.
const DEFAULT_HERO: Hero = {
  headline: 'I build the back office for small businesses,',
  headlineEmphasis: 'and I run it for them.',
  sub: "The enquiries, the chasing, the daily numbers. Set up once, kept running, and yours to keep. You approve anything before it reaches a customer.",
  ctaButton: CTA_BUTTON,
  ctaLine: CTA_LINE,
};

export const SEGMENTS: Record<string, Segment> = {
  default: { slug: 'default', label: 'Home', hero: DEFAULT_HERO },
  'house-clearance': {
    slug: 'house-clearance',
    label: 'House clearance',
    hero: tradeHero('For house-clearance firms', "You're out on clearances, not sat chasing paperwork.", 'a house-clearance firm'),
  },
  roofing: {
    slug: 'roofing',
    label: 'Roofing',
    hero: tradeHero('For roofers', "You're up on the roof, not chasing invoices.", 'a roofing firm'),
  },
  plumbing: {
    slug: 'plumbing',
    label: 'Plumbing',
    hero: tradeHero('For plumbers', "You're on the tools, not stuck doing admin at 9pm.", 'a plumbing business'),
  },
  electrical: {
    slug: 'electrical',
    label: 'Electrical',
    hero: tradeHero('For electricians', "You're on the job, not buried in quotes and chasing.", 'an electrical firm'),
  },
  building: {
    slug: 'building',
    label: 'Building',
    hero: tradeHero('For builders', "You're on site, not sat on paperwork of an evening.", 'a building firm'),
  },
  lettings: {
    slug: 'lettings',
    label: 'Lettings',
    hero: tradeHero('For letting agents', "You're managing properties, not drowning in enquiries and chasing rent.", 'a letting agency'),
  },
  gardening: {
    slug: 'gardening',
    label: 'Gardening',
    hero: tradeHero('For landscapers and gardeners', "You're out on the grounds, not stuck at a desk.", 'a gardening business'),
  },
};

/** Every non-default segment, for static route generation. */
export const TRADE_SEGMENTS = Object.values(SEGMENTS).filter((s) => s.slug !== 'default');

export interface ProofCard {
  kicker: string;
  heading: string;
  body: string;
  /** Optional live, dated evidence line (only where genuinely true). */
  live?: string;
}

export const PROOF_LEAD =
  "This isn't a demo. Everything below is a real business whose books I run, right now, today.";

export const PROOF_CARDS: ProofCard[] = [
  {
    kicker: 'Running now',
    heading: "A children's café in Amsterdam",
    body: "Every week, five suppliers' invoices get read and filed on their own. Nobody opens a PDF. Each morning the owner gets a plain rundown of the day before: what came in, what's still owed, and what to keep an eye on.",
    // Verified 2026-09-21 via live query (brief_runs, status sent): 39 briefs,
    // 2026-08-11 to 2026-09-21, last sent 05:51 UTC. TODO: refresh at build.
    live: "39 mornings and counting, every day since 11 August. Today's went out first thing.",
  },
  {
    kicker: 'Running now',
    heading: 'A creator with four income streams',
    body: "Four income streams, two sales platforms, a wall of leads. It all lands on one screen overnight, so she wakes up knowing exactly what moved while she slept, instead of piecing it together across five apps first thing.",
  },
];

export const PROOF_NOTE =
  "Right now I'm building the same setup for a house-clearance firm in London. Same mess, same fix.";

export interface Outcome {
  title: string;
  body: string;
}

export const OUTCOMES_HEADING = 'What you get out of it';
export const OUTCOMES: Outcome[] = [
  {
    title: 'Catch every job',
    body: "Nothing rots at the bottom of a chat. Every enquiry lands in one place, sorted, the moment it comes in.",
  },
  {
    title: "Chase what you're owed",
    body: "It goes after the quotes going cold and the invoices going unpaid, so that job isn't sat in your head at 11pm.",
  },
  {
    title: 'Know what actually paid',
    body: 'Which jobs made you money, which ones cost you. No spreadsheet, no guessing.',
  },
];

export const CLOSE = {
  heading: 'Where we start',
  body: "We start with the one thing bleeding you most. It's live in days, not months. You see everything before a customer does, and nothing goes out without your say-so.",
  ctaButton: CTA_BUTTON,
  phoneLine: 'Or just call me on 07531 188098.',
  footer:
    'Max Brown. I build the back office for small businesses, and I run it for them.',
};
