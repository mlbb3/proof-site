// Every word on the page that is not part of the worked example lives here.
// Voice: Max's. Plain, matter-of-fact, British English, contractions, no em
// dashes, no sales gloss. The worked example (firms, rows, figures) is in
// trades.ts and is computed, not written.
//
// HONESTY: no real clients are named anywhere on the page, by rule. The worked
// example is labelled as made up wherever it appears.

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
