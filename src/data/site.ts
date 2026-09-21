// All page copy and content in one place, so the voice sign-off and humanizer
// pass happen here, not scattered through markup.
//
// STATUS: DRAFT copy, in Max's voice, for Max's line-by-line sign-off and a
// humanizer pass before ship. Not final. British English, no em dashes.
//
// HONESTY: every claim here is real. The café and creator systems are live.
// The clearance firm is being built, and is stated as such. No prices, no
// client names, no private figures. The live stat is verified and dated below.

export interface ProofCard {
  kicker: string;
  heading: string;
  body: string;
  /** Optional live, dated evidence line (only where genuinely true). */
  live?: string;
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

export const HERO = {
  headline: 'You lose jobs inside your own phone.',
  headlineEmphasis: 'I stop that.',
  sub: "One setup that catches every enquiry the second it lands and chases the money you're owed. Each morning you get a plain summary of where you stand. Nothing reaches a customer without your say-so, and I keep the whole lot running.",
  ctaButton: 'Message me on WhatsApp',
  ctaLine: "Or text GO to 07531 188098 and I'll start on whatever's costing you most, this week.",
};

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
  ctaButton: 'Message me on WhatsApp',
  phoneLine: 'Or just call me on 07531 188098.',
  footer:
    'Max Brown. I build the back office for small businesses, and I run it for them.',
};
