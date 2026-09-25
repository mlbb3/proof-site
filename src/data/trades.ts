// The per-trade worked example. One dataset per URL; the brief, all six
// evidence blocks and the replay render from it. Change a number here and it
// changes everywhere. Numbers in the brief are computed from these rows, never
// typed, so a line can never disagree with its evidence.
//
// HONESTY: every firm here is made up and the page says so. Names are ordinary,
// numbers are boring and plausible. The real, live builds (cafe, creator) are
// named separately in the proof section. Dates are relative words on purpose,
// so a static build never goes stale.

export interface Enquiry {
  time: string;
  from: string;
  place: string;
  channel: 'WhatsApp' | 'Web form' | 'Email' | 'Phone';
  summary: string;
  /** Only the first enquiry carries a visible draft. */
  draft?: string;
  /** The customer's own words, for the chat bubble. First enquiry only. */
  message?: string;
}
export interface Invoice {
  supplier: string;
  number: string;
  totalPence: number;
  /** The one invoice whose PDF outline is shown. */
  extract?: boolean;
}
export interface Job {
  when: string;
  customer: string;
  place: string;
  job: string;
  who: string;
  subject: string;
}
export interface TimesheetRow {
  name: string;
  planned: number;
  logged: number;
  note?: string;
}
export interface Overdue {
  customer: string;
  number: string;
  daysAgo: number;
  amountPence: number;
}
export interface PriceRow {
  when: string;
  supplier: string;
  unitPence: number;
  /** The row that gets the mark and the note. */
  flagged?: boolean;
}
export interface Trade {
  slug: string;
  label: string;
  /** Short line above the headline on a trade page. Absent on the home page. */
  kicker?: string;
  /** One sentence in the reader's world, before the shared opening. */
  opener?: string;
  firm: string;
  owner: string;
  /** What the firm does, for the live draft's system prompt. */
  does: string;
  staff: string[];
  enquiries: Enquiry[];
  invoices: Invoice[];
  jobs: Job[];
  timesheet: TimesheetRow[];
  invoicedPence: number;
  paidPence: number;
  overdue: Overdue[];
  part: string;
  prices: PriceRow[];
  today: string[];
}

const plumbing: Trade = {
  slug: 'plumbing',
  label: 'Plumbing and heating',
  kicker: 'For plumbing and heating firms',
  opener: "You're on the tools all day. The admin waits for the evening.",
  firm: 'Hartley Plumbing & Heating',
  owner: 'Dan',
  does: 'a plumbing and heating firm in Kent with eight staff',
  staff: ['Tom Reeve', 'Priya Nair', 'Callum Doyle', 'Aisha Bello', 'Marcus Whitfield', 'Jodie Lam'],
  enquiries: [
    { time: '18:42', from: 'Ben Carrick', place: 'Maidstone', channel: 'WhatsApp', summary: 'Boiler making a banging noise, wants someone this week',
      message: "Hi, the boiler's making a banging noise every time the heating comes on. Can someone come this week?",
      draft: "Hi Ben, thanks for getting in touch. Tom can be with you Thursday morning if that works. Is the noise there all the time, or just when it fires up?" },
    { time: '20:15', from: 'Lena Kowalski', place: 'Tonbridge', channel: 'Web form', summary: 'Quote for moving a radiator, sends two photos' },
    { time: '22:03', from: 'Harbour View Guest House', place: 'Whitstable', channel: 'Email', summary: 'Annual gas safety certs for 9 rooms, asks for dates in October' },
  ],
  invoices: [
    { supplier: 'Kentwide Plumbing Supplies', number: 'KPS-48213', totalPence: 86240, extract: true },
    { supplier: 'Southern Heating Parts', number: 'SH-2026-1177', totalPence: 42160 },
  ],
  jobs: [
    { when: 'Mon', customer: 'Mr and Mrs Sandhu', place: 'Ashford', job: 'Bathroom refit, day 1 of 4', who: 'Priya, Callum', subject: 'Booking confirmed: Sandhu, Ashford, bathroom refit' },
    { when: 'Tue', customer: 'Greenfield Primary', place: 'Canterbury', job: 'Boiler inspection, 2 units', who: 'Marcus', subject: 'Booking confirmed: Greenfield Primary, boiler inspection' },
    { when: 'Wed', customer: 'Richard Ames', place: 'Faversham', job: 'Replace hot water cylinder', who: 'Tom', subject: 'Booking confirmed: Ames, Faversham, cylinder' },
    { when: 'Thu', customer: 'Harbour View Guest House', place: 'Whitstable', job: 'Gas safety certs, 9 rooms', who: 'Aisha', subject: 'Booking confirmed: Harbour View, gas safety certs' },
  ],
  timesheet: [
    { name: 'Tom Reeve', planned: 8, logged: 8 },
    { name: 'Priya Nair', planned: 8, logged: 8 },
    { name: 'Callum Doyle', planned: 8, logged: 7.5, note: '30 min short, Maidstone job' },
    { name: 'Aisha Bello', planned: 8, logged: 8 },
    { name: 'Marcus Whitfield', planned: 8, logged: 8 },
    { name: 'Jodie Lam', planned: 8, logged: 8 },
  ],
  invoicedPence: 312000,
  paidPence: 245000,
  overdue: [
    { customer: 'Lena Kowalski', number: 'HPH-1041', daysAgo: 38, amountPence: 64000 },
    { customer: 'Richard Ames', number: 'HPH-1052', daysAgo: 33, amountPence: 118000 },
  ],
  part: 'Unvented cylinder, 210L, indirect',
  prices: [
    { when: 'March', supplier: 'Kentwide Plumbing Supplies', unitPence: 41200 },
    { when: 'June', supplier: 'Kentwide Plumbing Supplies', unitPence: 43800 },
    { when: 'This week', supplier: 'Kentwide Plumbing Supplies', unitPence: 45700, flagged: true },
    { when: 'This week', supplier: 'Southern Heating Parts', unitPence: 41900 },
  ],
  today: [
    '09:00, boiler service, Mrs Okafor, Sevenoaks. Tom.',
    'Ashford bathroom starts. Parts arrived yesterday.',
    'Two overdue invoices. Chasers are drafted, say the word.',
  ],
};

const clearance: Trade = {
  slug: 'house-clearance',
  label: 'House clearance',
  kicker: 'For house-clearance firms',
  opener: "You're out on clearances all day. The admin waits for the evening.",
  firm: 'Fielding & Son Clearances',
  owner: 'Rob',
  does: 'a house clearance and removals firm in south London with six staff',
  staff: ['Dean Mabbott', 'Sam Okoro', 'Lewis Grant', 'Tara Byrne', 'Kofi Mensah', 'Carla Rossi'],
  enquiries: [
    { time: '18:20', from: 'Margaret Ellis', place: 'Croydon', channel: 'Phone', summary: 'Full clearance of her late father\'s flat, needs it done before the 30th',
      message: "Hello, I need my late father's flat cleared before the 30th. Could someone come and have a look?",
      draft: "Hi Margaret, thanks for calling, and sorry for your loss. We can come and take a look Wednesday afternoon if that suits. Roughly how many rooms are we clearing?" },
    { time: '19:55', from: 'Ashworth Lettings', place: 'Streatham', channel: 'Email', summary: 'End of tenancy clearance, 2 bed, keys with the agent' },
    { time: '21:30', from: 'Tom Bradley', place: 'Sutton', channel: 'WhatsApp', summary: 'Garage and shed, mostly timber and old paint tins' },
  ],
  invoices: [
    { supplier: 'Croydon Waste Transfer', number: 'CWT-20941', totalPence: 74600, extract: true },
    { supplier: 'Southside Van Hire', number: 'SVH-3312', totalPence: 38000 },
  ],
  jobs: [
    { when: 'Mon', customer: 'Mrs Patel', place: 'Norbury', job: 'Full house clearance, 3 bed', who: 'Dean, Sam, Lewis', subject: 'Booking confirmed: Patel, Norbury, full clearance' },
    { when: 'Tue', customer: 'Ashworth Lettings', place: 'Streatham', job: 'End of tenancy, 2 bed', who: 'Tara, Kofi', subject: 'Booking confirmed: Ashworth, Streatham, end of tenancy' },
    { when: 'Wed', customer: 'St Mark\'s Church', place: 'Mitcham', job: 'Hall clearance, 40 chairs and tables', who: 'Dean, Kofi', subject: 'Booking confirmed: St Mark\'s, hall clearance' },
    { when: 'Thu', customer: 'Tom Bradley', place: 'Sutton', job: 'Garage and shed', who: 'Sam', subject: 'Booking confirmed: Bradley, Sutton, garage' },
  ],
  timesheet: [
    { name: 'Dean Mabbott', planned: 8, logged: 8 },
    { name: 'Sam Okoro', planned: 8, logged: 8 },
    { name: 'Lewis Grant', planned: 8, logged: 9, note: '1 hr over, tip queue at Croydon' },
    { name: 'Tara Byrne', planned: 8, logged: 8 },
    { name: 'Kofi Mensah', planned: 8, logged: 8 },
    { name: 'Carla Rossi', planned: 6, logged: 6 },
  ],
  invoicedPence: 268000,
  paidPence: 190000,
  overdue: [
    { customer: 'Ashworth Lettings', number: 'FSC-0872', daysAgo: 41, amountPence: 89000 },
    { customer: 'J. Hargreaves', number: 'FSC-0880', daysAgo: 34, amountPence: 52000 },
  ],
  part: 'Mixed waste, per tonne, Croydon transfer station',
  prices: [
    { when: 'March', supplier: 'Croydon Waste Transfer', unitPence: 16800 },
    { when: 'June', supplier: 'Croydon Waste Transfer', unitPence: 17900 },
    { when: 'This week', supplier: 'Croydon Waste Transfer', unitPence: 18700, flagged: true },
    { when: 'This week', supplier: 'Merton Recycling', unitPence: 17100 },
  ],
  today: [
    '08:00, Patel clearance, Norbury. Two vans.',
    'Streatham keys are with the agent from 10.',
    'Two overdue invoices. Chasers are drafted, say the word.',
  ],
};

const roofing: Trade = {
  slug: 'roofing',
  label: 'Roofing',
  kicker: 'For roofers',
  opener: "You're up on a roof all day. The admin waits for the evening.",
  firm: 'Ashdown Roofing',
  owner: 'Steve',
  does: 'a roofing firm in Sussex with seven staff',
  staff: ['Jack Hollis', 'Ryan Patel', 'Connor Walsh', 'Ade Bakare', 'Liam Fry', 'Nicola Dunn'],
  enquiries: [
    { time: '17:50', from: 'Paul Redmond', place: 'Uckfield', channel: 'WhatsApp', summary: 'Water coming in round the chimney after last night\'s rain',
      message: "Hi, water's coming in round the chimney after last night's rain. Can you come this week?",
      draft: "Hi Paul, thanks for the message. Jack can come and have a look Tuesday morning if that works. Is it coming through the ceiling, or just staining so far?" },
    { time: '19:30', from: 'Sarah Lindqvist', place: 'Lewes', channel: 'Web form', summary: 'Quote for a full re-roof, 1930s semi, sends three photos' },
    { time: '21:12', from: 'Oakwood Property', place: 'Haywards Heath', channel: 'Email', summary: 'Flat roof survey on a block of six, wants a date in October' },
  ],
  invoices: [
    { supplier: 'Sussex Roofing Supplies', number: 'SRS-77102', totalPence: 129400, extract: true },
    { supplier: 'Southdown Scaffold', number: 'SDS-2026-418', totalPence: 68000 },
  ],
  jobs: [
    { when: 'Mon', customer: 'Mr and Mrs Chapman', place: 'Crowborough', job: 'Re-roof, day 1 of 5', who: 'Jack, Ryan, Connor', subject: 'Booking confirmed: Chapman, Crowborough, re-roof' },
    { when: 'Tue', customer: 'Paul Redmond', place: 'Uckfield', job: 'Chimney flashing repair', who: 'Ade', subject: 'Booking confirmed: Redmond, Uckfield, flashing' },
    { when: 'Wed', customer: 'The Old Bakery', place: 'Lewes', job: 'Replace 40 slipped tiles', who: 'Liam', subject: 'Booking confirmed: Old Bakery, Lewes, tiles' },
    { when: 'Thu', customer: 'Oakwood Property', place: 'Haywards Heath', job: 'Flat roof survey, 6 units', who: 'Jack', subject: 'Booking confirmed: Oakwood, flat roof survey' },
  ],
  timesheet: [
    { name: 'Jack Hollis', planned: 8, logged: 8 },
    { name: 'Ryan Patel', planned: 8, logged: 8 },
    { name: 'Connor Walsh', planned: 8, logged: 6.5, note: '1.5 hrs short, rained off at 2' },
    { name: 'Ade Bakare', planned: 8, logged: 8 },
    { name: 'Liam Fry', planned: 8, logged: 8 },
    { name: 'Nicola Dunn', planned: 8, logged: 8 },
  ],
  invoicedPence: 486000,
  paidPence: 312000,
  overdue: [
    { customer: 'Sarah Lindqvist', number: 'AR-2210', daysAgo: 36, amountPence: 145000 },
    { customer: 'Oakwood Property', number: 'AR-2218', daysAgo: 31, amountPence: 96000 },
  ],
  part: 'Breathable membrane, 50m roll',
  prices: [
    { when: 'March', supplier: 'Sussex Roofing Supplies', unitPence: 8900 },
    { when: 'June', supplier: 'Sussex Roofing Supplies', unitPence: 9400 },
    { when: 'This week', supplier: 'Sussex Roofing Supplies', unitPence: 9900, flagged: true },
    { when: 'This week', supplier: 'Wealden Builders Merchant', unitPence: 9100 },
  ],
  today: [
    '07:30, Chapman re-roof, Crowborough. Scaffold went up Friday.',
    'Rain due after 3. Connor on the Lewes tiles first.',
    'Two overdue invoices. Chasers are drafted, say the word.',
  ],
};

const electrical: Trade = {
  slug: 'electrical',
  label: 'Electrical',
  kicker: 'For electricians',
  opener: "You're on the job all day. The admin waits for the evening.",
  firm: 'Brightwater Electrical',
  owner: 'Mike',
  does: 'an electrical contracting firm in Bristol with six staff',
  staff: ['Owen Price', 'Zara Hussain', 'Danny Coyle', 'Femi Adeyemi', 'Kate Morgan'],
  enquiries: [
    { time: '18:05', from: 'Helen Barrow', place: 'Bedminster', channel: 'WhatsApp', summary: 'Consumer unit keeps tripping, wants someone this week',
      message: "Hi, the consumer unit keeps tripping. Could someone come out this week?",
      draft: "Hi Helen, thanks for getting in touch. Owen can be with you Wednesday afternoon if that suits. Is it one circuit that trips, or the whole board?" },
    { time: '19:48', from: 'Marcus Stein', place: 'Clifton', channel: 'Web form', summary: 'Quote for an EV charger, driveway, sends a photo of the fuse board' },
    { time: '21:40', from: 'Kingsdown Dental', place: 'Kingsdown', channel: 'Email', summary: 'EICR on the practice before the lease renews, dates in October' },
  ],
  invoices: [
    { supplier: 'City Electrical Factors', number: 'CEF-501822', totalPence: 97350, extract: true },
    { supplier: 'Avon Cable & Wire', number: 'ACW-2026-909', totalPence: 31200 },
  ],
  jobs: [
    { when: 'Mon', customer: 'Mr and Mrs Lowe', place: 'Bishopston', job: 'Full rewire, day 1 of 6', who: 'Owen, Danny', subject: 'Booking confirmed: Lowe, Bishopston, rewire' },
    { when: 'Tue', customer: 'Marcus Stein', place: 'Clifton', job: 'EV charger install', who: 'Zara', subject: 'Booking confirmed: Stein, Clifton, EV charger' },
    { when: 'Wed', customer: 'Helen Barrow', place: 'Bedminster', job: 'Fault find, consumer unit', who: 'Owen', subject: 'Booking confirmed: Barrow, Bedminster, fault' },
    { when: 'Thu', customer: 'Kingsdown Dental', place: 'Kingsdown', job: 'EICR, whole practice', who: 'Femi', subject: 'Booking confirmed: Kingsdown Dental, EICR' },
  ],
  timesheet: [
    { name: 'Owen Price', planned: 8, logged: 8 },
    { name: 'Zara Hussain', planned: 8, logged: 8 },
    { name: 'Danny Coyle', planned: 8, logged: 7, note: '1 hr short, waiting on parts' },
    { name: 'Femi Adeyemi', planned: 8, logged: 8 },
    { name: 'Kate Morgan', planned: 8, logged: 8 },
  ],
  invoicedPence: 284000,
  paidPence: 221000,
  overdue: [
    { customer: 'Kingsdown Dental', number: 'BE-1188', daysAgo: 39, amountPence: 74000 },
    { customer: 'S. Whitfield', number: 'BE-1194', daysAgo: 32, amountPence: 48500 },
  ],
  part: 'Twin and earth, 2.5mm, 100m drum',
  prices: [
    { when: 'March', supplier: 'City Electrical Factors', unitPence: 7400 },
    { when: 'June', supplier: 'City Electrical Factors', unitPence: 7900 },
    { when: 'This week', supplier: 'City Electrical Factors', unitPence: 8300, flagged: true },
    { when: 'This week', supplier: 'Avon Cable & Wire', unitPence: 7500 },
  ],
  today: [
    '08:00, Lowe rewire, Bishopston. Owen and Danny.',
    'Stein EV charger, Clifton. DNO notification went in Friday.',
    'Two overdue invoices. Chasers are drafted, say the word.',
  ],
};

const building: Trade = {
  slug: 'building',
  label: 'Building',
  kicker: 'For builders',
  opener: "You're on site all day. The admin waits for the evening.",
  firm: 'Marlow & Dean Building',
  owner: 'Gary',
  does: 'a general building firm in Leeds with nine staff',
  staff: ['Pete Holroyd', 'Josh Kaur', 'Andy Ferris', 'Luke Obi', 'Shaun Beck', 'Emma Lister'],
  enquiries: [
    { time: '18:15', from: 'Claire Denton', place: 'Horsforth', channel: 'WhatsApp', summary: 'Single storey rear extension, has plans, wants a quote',
      message: "Hi, we've got plans for a single storey rear extension. Could you come and quote for it?",
      draft: "Hi Claire, thanks for the message. Pete can come round Thursday morning to walk through the plans if that works. Have you got building regs drawings as well, or just the planning set?" },
    { time: '19:20', from: 'Nadia Rahman', place: 'Roundhay', channel: 'Web form', summary: 'Garage conversion to a home office, sends four photos' },
    { time: '21:55', from: 'Kirkstall Lettings', place: 'Kirkstall', channel: 'Email', summary: 'Damp survey and repair on two flats, wants dates in October' },
  ],
  invoices: [
    { supplier: 'Yorkshire Builders Merchant', number: 'YBM-88410', totalPence: 214800, extract: true },
    { supplier: 'Aire Valley Skips', number: 'AVS-2026-771', totalPence: 36000 },
  ],
  jobs: [
    { when: 'Mon', customer: 'Mr and Mrs Whittaker', place: 'Headingley', job: 'Extension, week 3 of 8', who: 'Pete, Josh, Andy', subject: 'Booking confirmed: Whittaker, Headingley, extension' },
    { when: 'Tue', customer: 'Nadia Rahman', place: 'Roundhay', job: 'Garage conversion, day 1', who: 'Luke, Shaun', subject: 'Booking confirmed: Rahman, Roundhay, garage' },
    { when: 'Wed', customer: 'Kirkstall Lettings', place: 'Kirkstall', job: 'Damp survey, two flats', who: 'Pete', subject: 'Booking confirmed: Kirkstall Lettings, damp survey' },
    { when: 'Thu', customer: 'The Fox and Hounds', place: 'Bramhope', job: 'Repoint front elevation', who: 'Andy', subject: 'Booking confirmed: Fox and Hounds, repointing' },
  ],
  timesheet: [
    { name: 'Pete Holroyd', planned: 8, logged: 8 },
    { name: 'Josh Kaur', planned: 8, logged: 8 },
    { name: 'Andy Ferris', planned: 8, logged: 8 },
    { name: 'Luke Obi', planned: 8, logged: 7, note: '1 hr short, skip not delivered' },
    { name: 'Shaun Beck', planned: 8, logged: 8 },
    { name: 'Emma Lister', planned: 8, logged: 8 },
  ],
  invoicedPence: 742000,
  paidPence: 410000,
  overdue: [
    { customer: 'Kirkstall Lettings', number: 'MD-0419', daysAgo: 44, amountPence: 186000 },
    { customer: 'R. Coleman', number: 'MD-0427', daysAgo: 35, amountPence: 92000 },
  ],
  part: 'Facing brick, per 1,000, Ibstock red',
  prices: [
    { when: 'March', supplier: 'Yorkshire Builders Merchant', unitPence: 61000 },
    { when: 'June', supplier: 'Yorkshire Builders Merchant', unitPence: 64500 },
    { when: 'This week', supplier: 'Yorkshire Builders Merchant', unitPence: 67800, flagged: true },
    { when: 'This week', supplier: 'Calder Building Supplies', unitPence: 62200 },
  ],
  today: [
    '07:30, Whittaker extension, Headingley. Steel arrives at 10.',
    'Rahman garage starts. Skip booked for 8.',
    'Two overdue invoices. Chasers are drafted, say the word.',
  ],
};

const lettings: Trade = {
  slug: 'lettings',
  label: 'Lettings',
  kicker: 'For letting agents',
  opener: "You're out on viewings all day. The admin waits for the evening.",
  firm: 'Northgate Lettings',
  owner: 'Sophie',
  does: 'an independent letting agency in Manchester managing around 140 properties with five staff',
  staff: ['Amy Chen', 'Jordan Mills', 'Priya Shah', 'Ben Tully', 'Hannah Reid'],
  enquiries: [
    { time: '18:30', from: 'Daniel Okafor', place: 'Didsbury', channel: 'Web form', summary: 'Wants to view the 2 bed on Barlow Moor Road this week',
      message: "Hi, is the 2 bed on Barlow Moor Road still available? Could I view it this week?",
      draft: "Hi Daniel, thanks for getting in touch. We can show you round Wednesday afternoon if that suits. Would you be looking to move in before the end of the month?" },
    { time: '19:10', from: 'Mrs Patterson (landlord)', place: 'Chorlton', channel: 'Email', summary: 'Tenant reports boiler not firing, flat 3, wants it sorted' },
    { time: '21:25', from: 'Lucy Grant', place: 'Withington', channel: 'WhatsApp', summary: 'Asking if the studio on Wilmslow Road allows a cat' },
  ],
  invoices: [
    { supplier: 'Manchester Gas Safe', number: 'MGS-30281', totalPence: 54000, extract: true },
    { supplier: 'City Clean & Inventory', number: 'CCI-2026-1902', totalPence: 28500 },
  ],
  jobs: [
    { when: 'Mon', customer: 'Barlow Moor Road, flat 2', place: 'Didsbury', job: 'Viewing, 2 bed', who: 'Amy', subject: 'Booking confirmed: viewing, Barlow Moor Road' },
    { when: 'Tue', customer: 'Chorlton, flat 3', place: 'Chorlton', job: 'Boiler callout, Gas Safe', who: 'Jordan', subject: 'Booking confirmed: boiler callout, Chorlton' },
    { when: 'Wed', customer: 'Wilmslow Road studio', place: 'Withington', job: 'Check-in inventory', who: 'Priya', subject: 'Booking confirmed: inventory, Wilmslow Road' },
    { when: 'Thu', customer: 'Palatine Road, house', place: 'Didsbury', job: 'Mid-tenancy inspection', who: 'Ben', subject: 'Booking confirmed: inspection, Palatine Road' },
  ],
  timesheet: [
    { name: 'Amy Chen', planned: 8, logged: 8 },
    { name: 'Jordan Mills', planned: 8, logged: 8 },
    { name: 'Priya Shah', planned: 8, logged: 7.5, note: '30 min short, no-show viewing' },
    { name: 'Ben Tully', planned: 8, logged: 8 },
    { name: 'Hannah Reid', planned: 8, logged: 8 },
  ],
  invoicedPence: 196000,
  paidPence: 158000,
  overdue: [
    { customer: 'Mr Ashworth (landlord)', number: 'NL-3390', daysAgo: 37, amountPence: 42000 },
    { customer: 'Wilmslow Road, flat 5', number: 'NL-3402', daysAgo: 31, amountPence: 89500 },
  ],
  part: 'Gas safety certificate, per property',
  prices: [
    { when: 'March', supplier: 'Manchester Gas Safe', unitPence: 7200 },
    { when: 'June', supplier: 'Manchester Gas Safe', unitPence: 7800 },
    { when: 'This week', supplier: 'Manchester Gas Safe', unitPence: 8100, flagged: true },
    { when: 'This week', supplier: 'Salford Heating Services', unitPence: 6900 },
  ],
  today: [
    '09:30, viewing on Barlow Moor Road. Amy.',
    'Chorlton boiler. Gas Safe engineer booked for 11.',
    'Two overdue. Rent chaser and an invoice chaser drafted, say the word.',
  ],
};

const gardening: Trade = {
  slug: 'gardening',
  label: 'Landscaping and gardening',
  kicker: 'For landscapers and gardeners',
  opener: "You're out on the grounds all day. The admin waits for the evening.",
  firm: 'Greenacre Landscapes',
  owner: 'Chris',
  does: 'a landscaping and garden maintenance firm in Surrey with five staff',
  staff: ['Will Turner', 'Meg Foster', 'Alfie Doyle', 'Raj Sandhu', 'Jo Barratt'],
  enquiries: [
    { time: '17:40', from: 'Alison Reeve', place: 'Guildford', channel: 'WhatsApp', summary: 'Wants the back garden landscaped, patio and lawn, before spring',
      message: "Hi, we'd like the back garden done, patio and lawn, before spring. Could you come and have a look?",
      draft: "Hi Alison, thanks for the message. Will can come round Tuesday afternoon to have a look if that works. Roughly what size is the garden, and is it level?" },
    { time: '19:05', from: 'The Willows Care Home', place: 'Godalming', channel: 'Email', summary: 'Fortnightly grounds maintenance contract, asks for a quote' },
    { time: '20:50', from: 'Ian Blackwood', place: 'Farnham', channel: 'Web form', summary: 'Two large conifers taken down, sends a photo' },
  ],
  invoices: [
    { supplier: 'Surrey Turf & Topsoil', number: 'STT-11903', totalPence: 68200, extract: true },
    { supplier: 'Hillside Plant Nursery', number: 'HPN-2026-560', totalPence: 24300 },
  ],
  jobs: [
    { when: 'Mon', customer: 'Mr and Mrs Fenwick', place: 'Cranleigh', job: 'Patio and lawn, day 1 of 4', who: 'Will, Alfie', subject: 'Booking confirmed: Fenwick, Cranleigh, patio' },
    { when: 'Tue', customer: 'The Willows Care Home', place: 'Godalming', job: 'Grounds, fortnightly visit', who: 'Meg, Raj', subject: 'Booking confirmed: Willows, grounds maintenance' },
    { when: 'Wed', customer: 'Ian Blackwood', place: 'Farnham', job: 'Two conifers, fell and clear', who: 'Will', subject: 'Booking confirmed: Blackwood, Farnham, conifers' },
    { when: 'Thu', customer: 'Alison Reeve', place: 'Guildford', job: 'Site visit and measure up', who: 'Will', subject: 'Booking confirmed: Reeve, Guildford, site visit' },
  ],
  timesheet: [
    { name: 'Will Turner', planned: 8, logged: 8 },
    { name: 'Meg Foster', planned: 8, logged: 8 },
    { name: 'Alfie Doyle', planned: 8, logged: 6.5, note: '1.5 hrs short, rained off' },
    { name: 'Raj Sandhu', planned: 8, logged: 8 },
    { name: 'Jo Barratt', planned: 6, logged: 6 },
  ],
  invoicedPence: 218000,
  paidPence: 163000,
  overdue: [
    { customer: 'The Willows Care Home', number: 'GL-0655', daysAgo: 40, amountPence: 58000 },
    { customer: 'P. Whitmore', number: 'GL-0661', daysAgo: 33, amountPence: 37500 },
  ],
  part: 'Screened topsoil, bulk bag',
  prices: [
    { when: 'March', supplier: 'Surrey Turf & Topsoil', unitPence: 6200 },
    { when: 'June', supplier: 'Surrey Turf & Topsoil', unitPence: 6600 },
    { when: 'This week', supplier: 'Surrey Turf & Topsoil', unitPence: 7000, flagged: true },
    { when: 'This week', supplier: 'Wey Valley Aggregates', unitPence: 6300 },
  ],
  today: [
    '07:30, Fenwick patio, Cranleigh. Turf arrives at 9.',
    'Willows grounds visit. Meg and Raj.',
    'Two overdue invoices. Chasers are drafted, say the word.',
  ],
};

// The home page uses the plumbing example with no trade framing.
const home: Trade = { ...plumbing, slug: 'default', label: 'Small businesses', kicker: undefined, opener: undefined };

export const TRADES: Record<string, Trade> = {
  default: home,
  plumbing,
  'house-clearance': clearance,
  roofing,
  electrical,
  building,
  lettings,
  gardening,
};

/** Every trade page, for static route generation. */
export const TRADE_PAGES = Object.values(TRADES).filter((t) => t.slug !== 'default');

// ---------------------------------------------------------------------------
// Derived figures. Computed once from the rows, so the brief and the evidence
// can never disagree.
// ---------------------------------------------------------------------------

export function invoiceTotalPence(t: Trade): number {
  return t.invoices.reduce((s, i) => s + i.totalPence, 0);
}
export function plannedHours(t: Trade): number {
  return t.timesheet.reduce((s, r) => s + r.planned, 0);
}
export function loggedHours(t: Trade): number {
  return t.timesheet.reduce((s, r) => s + r.logged, 0);
}
export function priceDriftPct(t: Trade): number {
  const flagged = t.prices.find((p) => p.flagged) ?? t.prices[t.prices.length - 1];
  const first = t.prices[0];
  return Math.round(((flagged.unitPence - first.unitPence) / first.unitPence) * 100);
}
export function cheaperByPence(t: Trade): number {
  const flagged = t.prices.find((p) => p.flagged)!;
  const rival = t.prices.find((p) => p.when === flagged.when && p.supplier !== flagged.supplier);
  return rival ? flagged.unitPence - rival.unitPence : 0;
}
export function hoursGapRow(t: Trade): TimesheetRow | undefined {
  return t.timesheet.find((r) => r.note);
}
export function fmtHours(h: number): string {
  return Number.isInteger(h) ? String(h) : h.toFixed(1);
}

/** The draft the live endpoint tells Claude to write. */
export function draftSystemPrompt(t: Trade): string {
  return (
    `You draft short replies for ${t.owner}, the owner of ${t.firm}, ${t.does}, to enquiries from potential customers. ` +
    `Write as ${t.owner}: friendly, plain, brief, British English. Two to four sentences. ` +
    `You may thank them, say roughly when someone could come (offer a weekday morning or afternoon), and ask one clarifying question. ` +
    `You must not diagnose the problem, quote or estimate any price, mention regulations or safety, promise a specific time, or give technical advice. ` +
    `If the message is not an enquiry to this kind of business, reply only: "Thanks for the message. Could you tell me a bit more about the job?" ` +
    `No greeting longer than three words. No sign-off. Never use an em dash.`
  );
}
