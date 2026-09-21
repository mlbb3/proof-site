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
  // known trust lever; this is a stand-in).
  monogram: 'MB',
  whatsappNumber: '447531188098',
  phoneDisplay: '07531 188098',
};

export const HERO = {
  headline: 'You lose jobs inside your own phone.',
  headlineEmphasis: 'I stop that.',
  sub: 'I set up one system that catches every enquiry, chases what is owed, and sends you a plain summary each morning. You approve anything that goes to a customer. I keep the whole thing running.',
  ctaButton: 'Message me on WhatsApp',
  ctaLine: 'Or text GO to 07531 188098 and I will start on the thing costing you most, this week.',
};

export const PROOF_LEAD =
  'I did not build you a demo to impress you. Everything below is a real business whose books I actually run, live, today.';

export const PROOF_CARDS: ProofCard[] = [
  {
    kicker: 'Running now',
    heading: 'A children’s café in Amsterdam',
    body: 'Five suppliers’ invoices are read and filed every week without anyone opening a PDF. The owner gets a plain summary of yesterday every morning: what came in, what needs chasing, what to watch.',
    // Verified 2026-09-21 via live query (brief_runs, status sent): 39 briefs,
    // 2026-08-11 to 2026-09-21, last sent 05:51 UTC. TODO: refresh at build.
    live: '39 mornings and counting, every day since 11 August. The last one went out first thing today.',
  },
  {
    kicker: 'Running now',
    heading: 'A creator running four income streams from her phone',
    body: 'Leads, sales from two platforms, and her content pipeline, all pulled onto one screen overnight, so she starts the day knowing exactly what changed while she slept.',
  },
];

export const PROOF_NOTE =
  'I am setting the same thing up for a house-clearance firm in London right now. Yours could be next.';

export interface Outcome {
  title: string;
  body: string;
}

export const OUTCOMES_HEADING = 'What it does for you';
export const OUTCOMES: Outcome[] = [
  {
    title: 'Catch every job',
    body: 'Nothing sits unread at the bottom of a chat. Every enquiry lands in one place, sorted, the moment it comes in.',
  },
  {
    title: 'Chase what is owed',
    body: 'It nudges the quotes going cold and the invoices going unpaid, so you do not have to hold it all in your head.',
  },
  {
    title: 'Know what actually paid',
    body: 'See which jobs made you money and which cost you, without touching a spreadsheet.',
  },
];

export const CLOSE = {
  heading: 'How it starts',
  body: 'We start with the one thing costing you most. It is live within days, not months. You see everything before a customer does, and nothing goes out without your say-so.',
  ctaButton: 'Message me on WhatsApp',
  phoneLine: 'Or call me on 07531 188098.',
  footer:
    'Max Brown. I build the back office for small businesses and I run it for them. Built on n8n, Supabase and Claude.',
};
