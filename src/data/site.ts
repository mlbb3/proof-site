// Every word on the page that is not part of the worked example lives here.
// Voice: Max's. Plain, matter-of-fact, British English, contractions, no em
// dashes, no sales gloss. The worked example (firms, rows, brief lines) is in
// trades.ts and is computed, not written.
//
// HONESTY: the three proof entries are real and were verified against the live
// builds. The cafe figure is dated in a comment and must be refreshed at build.

export const IDENTITY = {
  name: 'Max Brown',
  role: 'I build the back office for small businesses, and I run it for them.',
  // Placeholder monogram until Max drops a real photo into the repo.
  monogram: 'MB',
  whatsappNumber: '447531188098',
  phoneDisplay: '07531 188098',
};

export const WA_HREF = `https://wa.me/${IDENTITY.whatsappNumber}?text=${encodeURIComponent('Hi Max, just read the page.')}`;
export const TEL_HREF = `tel:+${IDENTITY.whatsappNumber}`;

/** Shown only when the link carries ?to=Name. */
export const PERSONAL_LINE = (name: string) => `${name}, this is what I meant on the phone.`;

export const HERO = {
  headline: 'Your admin,',
  emphasis: 'done overnight.',
  opening:
    "Most of a small business owner's week is admin. Replying to enquiries, chasing invoices, checking the rota, pulling the numbers together. I set that up to run overnight. I keep it running, and you sign off anything that goes out.",
  /** After a trade page's own first sentence. */
  openingRest:
    'Replying to enquiries, chasing invoices, checking the rota, pulling the numbers together. I set that up to run overnight. I keep it running, and you sign off anything that goes out.',
  button: 'WhatsApp me',
  ring: 'Or ring me:',
};

export const BRIEF_UI = {
  leadIn: 'Every morning, one message. This is yesterday\'s.',
  time: '07:00',
  yesterday: 'Yesterday',
  today: 'Today',
  run: 'Run last night',
  runAgain: 'Run it again',
  skip: 'Skip',
  runHint: 'Replays the night above. About eight seconds.',
  under: 'Tap any marked line to see what\'s underneath it.',
  mock: 'Made up, this one: the firm, the numbers, all of it. Two real ones are running now, further down the page.',
};

export const CAPTIONS = {
  scene1: 'Reading overnight enquiries',
  scene2: 'Reading the PDF attachment',
  scene3: 'Logging jobs from confirmation emails',
  scene4: 'Checking hours against the plan',
  scene5a: "Tallying yesterday's money",
  scene5b: 'Same part, three dates',
  scene6: 'Writing the brief',
  block1: (owner: string) => `Nothing is sent until ${owner} taps approve.`,
  block2: 'Read from the PDF the moment it landed. Nobody typed this in.',
  block3: 'Logged the moment the confirmation arrived.',
  block4: 'Checked against the totals before anything is reported.',
  block5: (owner: string) => `Chasers follow the same rule. ${owner} approves, then they go.`,
  block6: 'Kept because the invoices were read, not just filed.',
  resting: 'Sample draft. The live service is resting.',
  drafting: 'Drafting',
  waiting: 'Draft, waiting',
  approved: 'Approved',
  back: 'Back to the brief',
};

export const LIVE = {
  label: 'Type your own enquiry',
  placeholder: 'Boiler\'s leaking, can someone come Tuesday?',
  button: 'Draft',
  note: 'Real reply, drafted live. Nothing is sent anywhere.',
};

export const BODY = [
  "I set that up to run overnight, and I keep it running. Enquiries get a reply drafted in your voice, waiting for your sign-off. Invoices get filed the day they land. Bookings, staff hours and supplier costs get logged without anyone typing them in. Every morning you get one message: what happened yesterday, what needs you today.",
  "I've built this for a café in Amsterdam and a creator running her businesses from her phone, and I'm building it now for a house-clearance firm in London.",
];

export const PROOF = {
  heading: 'Two running now, a third on the way',
  entries: [
    {
      status: 'Running',
      title: 'Café, Amsterdam',
      body: 'Invoices from five suppliers read and filed without anyone opening a PDF. Staff hours and daily takings pulled in overnight. One brief every morning.',
      // Verified 2026-09-21 via live query (brief_runs, status sent): 39 briefs,
      // 2026-08-11 to 2026-09-21, last sent 05:51 UTC. Refresh at build.
      live: '39 mornings in a row since 11 August. Today\'s went out first thing.',
    },
    {
      status: 'Running',
      title: 'Creator, working from her phone',
      body: 'Leads, payments from two platforms and the content pipeline on one dashboard. A morning brief that only tells her what changed.',
    },
    {
      status: 'Building',
      title: 'House clearance, London',
      body: 'Every enquiry gets a reply drafted in the owner\'s voice, ready to send. Jobs tracked in one place with a daily sweep.',
    },
  ],
};

export const HOW = {
  heading: 'What happens next',
  body: "We've had the call. Next I write up what I'd build, in what order, and what each part costs. You pick where to start. The first build lands within days. Nothing goes to a customer without you seeing it first.",
};

export const STRAIGHT = {
  heading: 'Straight answers',
  lines: [
    "If a draft's wrong, you edit it or bin it. I fix the pattern so it doesn't happen twice.",
    'It runs on your accounts, not mine. If we ever stop, everything stays yours.',
    "It runs whether I'm at my desk or not. Anything that needs a human waits for you, not for me.",
  ],
};

export const REPLY = {
  button: 'Reply on WhatsApp',
  under: "Or call me back. You've got the number.",
};

// ---- Follow one job (brief v2) --------------------------------------------
export const FLOW = {
  sub: "This lands on your phone at 7 every morning. Tap the job to see how it got there.",
  honesty: 'Worked example. The firm and the figures are made up.',
  /** When the link carries the reader's own firm or job. */
  honestyPersonal: 'Worked example with your details in. The figures are made up.',
  follow: 'Follow this job',
  replyReady: 'Reply ready',
  beat1: {
    step: 'Step 1 of 4',
    area: 'Enquiries',
    title: "The message comes in while you're up a ladder",
    /** Split round the owner's name, which the link can change. */
    drafted: ['Drafted in ', "'s voice, two minutes later"] as const,
    approve: 'Approve and send',
    edit: 'Edit',
    sent: 'Sent',
    next: 'Next, it goes in the diary.',
    who: 'You, or whoever does your books, approves. Nothing goes out without a tap.',
    tryLabel: "Try it with a message from one of your customers",
    tryPlaceholder: "Paste or type what they sent you",
    tryButton: 'Draft a reply',
    trySample: 'Sample reply. The live service is resting.',
    tryLive: 'Drafted just now. Nothing was sent.',
  },
  close: {
    line: "We start with whatever's costing you most. The first part is live within days.",
    button: 'WhatsApp me',
    ring: 'Or ring me:',
  },
};

export const FOOTER = 'Max Brown. I build the back office for small businesses, and I run it for them.';
