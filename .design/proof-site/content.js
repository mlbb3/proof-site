// content.js
// The one dataset the page reads from. Brief lines, evidence blocks and the replay
// all render from this object. Change a number here and it changes everywhere.
// Dates are offsets from "today" at render time; never hardcode a date.

export const firm = {
  name: "Hartley Plumbing & Heating",
  owner: "Dan",
  region: "Kent",
  currency: "GBP",
};

export const people = {
  engineers: ["Tom Reeve", "Priya Nair", "Callum Doyle", "Aisha Bello", "Marcus Whitfield"],
  office: "Jodie Lam",
};

// dayOffset: 0 = today, -1 = yesterday, +5 = five days ahead
export const enquiries = [
  {
    time: "18:42",
    from: "Ben Carrick",
    place: "Maidstone",
    channel: "WhatsApp",
    summary: "Boiler making a banging noise, wants someone this week",
    status: "Draft, waiting",
    draft:
      "Hi Ben, thanks for getting in touch. A banging noise from the boiler is usually air in the system or a pump issue, both quick to sort. Tom can be with you Thursday morning if that works. If it's making the noise constantly rather than just on start-up, let me know and we'll get someone out sooner.",
  },
  {
    time: "20:15",
    from: "Lena Kowalski",
    place: "Tonbridge",
    channel: "Web form",
    summary: "Quote for moving a radiator, sends two photos",
    status: "Draft, waiting",
  },
  {
    time: "22:03",
    from: "Harbour View Guest House",
    place: "Whitstable",
    channel: "Email",
    summary: "Annual gas safety certs for 9 rooms, asks for dates in October",
    status: "Draft, waiting",
  },
];

export const invoices = [
  { supplier: "Kentwide Plumbing Supplies", number: "KPS-48213", dayOffset: -1, total: 862.4, status: "Filed", showExtraction: true },
  { supplier: "Southern Heating Parts", number: "SH-2026-1177", dayOffset: -1, total: 421.6, status: "Filed", showExtraction: false },
];

export const jobs = [
  { dayOffset: 5, customer: "Mr and Mrs Sandhu", place: "Ashford", job: "Bathroom refit, day 1 of 4", engineers: ["Priya", "Callum"], subject: "Booking confirmed: Sandhu, Ashford, bathroom refit" },
  { dayOffset: 6, customer: "Greenfield Primary", place: "Canterbury", job: "Boiler inspection, 2 units", engineers: ["Marcus"], subject: "Booking confirmed: Greenfield Primary, boiler inspection" },
  { dayOffset: 7, customer: "Richard Ames", place: "Faversham", job: "Replace hot water cylinder", engineers: ["Tom"], subject: "Booking confirmed: Ames, Faversham, cylinder" },
  { dayOffset: 8, customer: "Harbour View Guest House", place: "Whitstable", job: "Gas safety certs, 9 rooms", engineers: ["Aisha"], subject: "Booking confirmed: Harbour View, gas safety certs" },
];

export const timesheet = {
  rows: [
    { name: "Tom Reeve", planned: 8.0, logged: 8.0 },
    { name: "Priya Nair", planned: 8.0, logged: 8.0 },
    { name: "Callum Doyle", planned: 8.0, logged: 7.5, note: "30 min short, Maidstone job" },
    { name: "Aisha Bello", planned: 8.0, logged: 8.0 },
    { name: "Marcus Whitfield", planned: 8.0, logged: 8.0 },
    { name: "Jodie Lam", planned: 8.0, logged: 8.0 },
  ],
  // totals are computed, never typed
};

export const money = {
  invoicedYesterday: 3120,
  paidYesterday: 2450,
  overdue: [
    { customer: "Lena Kowalski", number: "HPH-1041", raisedDayOffset: -38, amount: 640.0 },
    { customer: "Richard Ames", number: "HPH-1052", raisedDayOffset: -33, amount: 1180.0 },
  ],
};

// Same part, same pack size, unit price ex VAT. The point is the drift.
export const supplierPrices = {
  part: "Unvented cylinder, 210L, indirect",
  rows: [
    { monthLabel: "March", supplier: "Kentwide Plumbing Supplies", unit: 412.0 },
    { monthLabel: "June", supplier: "Kentwide Plumbing Supplies", unit: 438.0 },
    { monthLabel: "This week", supplier: "Kentwide Plumbing Supplies", unit: 457.0, flagged: true },
    { monthLabel: "This week", supplier: "Southern Heating Parts", unit: 419.0 },
  ],
  // percentage and difference are computed from rows, never typed
};

export const today = [
  { time: "09:00", text: "Boiler service, Mrs Okafor, Sevenoaks. Tom." },
  { text: "Ashford bathroom starts. Parts arrived yesterday." },
  { text: "Chase the two overdue invoices? Drafts ready." },
];

// Brief lines are templates over the data above. {n} placeholders are filled at render.
export const briefLines = [
  { anchor: "enquiry-log",     mark: "{count} new enquiries.",            rest: "Replies drafted, waiting for you." },
  { anchor: "invoice-register", mark: "{count} supplier invoices in,",     rest: "{total} total. Filed." },
  { anchor: "job-book",        mark: "{count} jobs booked",               rest: "for next week from email confirmations." },
  { anchor: "timesheet",       mark: "Hours:",                            rest: "{logged} logged against {planned} planned. One gap flagged." },
  { anchor: "sales-ledger",    mark: "Invoiced {invoiced}.",              rest: "Paid {paid}. Two now over 30 days." },
  { anchor: "supplier-prices", mark: "{supplier} charged {pct}% more",    rest: "for the same cylinder than in March." },
];

export const captions = {
  scene1: "Reading overnight enquiries",
  scene2: "Reading the PDF attachment",
  scene3: "Logging jobs from confirmation emails",
  scene4: "Checking hours against the plan",
  scene5a: "Tallying yesterday's money",
  scene5b: "Same part, three dates",
  block1: "Nothing is sent until Dan taps approve.",
  block2: "Read from the PDF attachment. Nobody typed this in.",
  block3: "Logged the moment the confirmation arrived.",
  block4: "Checked against the totals before anything is reported.",
  block5: "Chasers follow the same rule. Dan approves, then they go.",
  block6: "Kept because the invoices were read, not filed.",
  mockup: "Simplified mock-up of a real build. Names and numbers are made up. The live versions track the actual business.",
  liveResting: "Sample draft, the live service is resting.",
};

// Live draft: what the serverless function is told. Kept here so the page and the
// function share one source; the function imports this string.
export const draftSystemPrompt = `You draft short replies for Dan Hartley, owner of Hartley Plumbing & Heating in Kent, to enquiries from potential customers. Write as Dan: friendly, plain, brief, British English. Two to four sentences. You may thank them, say roughly when someone could come (offer a weekday morning or afternoon), and ask one clarifying question. You must not diagnose the fault, quote or estimate any price, mention gas safety or any regulation, promise a specific time, or give any technical advice. If the message is not an enquiry to a plumbing and heating firm, reply only: "Thanks for the message. Could you tell me a bit more about the job?" No greeting line longer than three words. No sign-off. No em dashes.`;
