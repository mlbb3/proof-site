# Shape brief: follow one job (v1, 2026-09-25, UNCONFIRMED, under stress test)

Supersedes the "Run last night" static-evidence page for the spine. Built from Max's
answers: show the system (not just the email) by following ONE job; Papote Morning
Brief v5 visual language (approved 20 Aug); used equally on a screen-share call and as
a phone link after the call.

## 1. What it is
One page per trade (home + 7 trade URLs) that follows a single job through Max's
system, from the first WhatsApp message to the morning email and the week's money
view. A roofer sees *his* job handled end to end. Works as a link after a call and
as a click-through on a screen-share.

## 2. The one thing they should get
"That's my job, handled, and I still approve everything." Then reply on WhatsApp.

## 3. Look
Papote v5: soft tinted ground, white cards on it, not bare white. One pastel colour
per part of the business (enquiries, diary, money, suppliers), used consistently.
Yellow only for "needs you". Pictures carry it: rings, bars, a price line, a phone.
Plain-word labels.
Scene: a roofer in his van at 6pm, phone in hand, half-sceptical after a good call;
or Max on a laptop walking an owner through it.
References: Papote Morning Brief v5 (pastel section tiles, rings); Apple Fitness
rings (Sophia's stated reference); Green Camel microsite (scannable spine, expandable
depth, show the machine thinking).

## 4. Scope
Production-ready, all 8 URLs, interactive, polish until it ships.

## 5. Layout: seven steps, one job
Each step: its colour, one picture, one line. Detail hidden until tapped.
1. 18:42, a message lands (WhatsApp bubble) while he's up a ladder
2. Reply drafted in his voice, he taps Approve
3. Booked: a slot appears in a week's diary
4. Job done: the invoice goes out
5. Day 14 unpaid: chaser drafted, he approves, status flips to Paid
6. 07:00: the morning email, in a phone frame (tiles, rings)
7. Friday: the week's money (in vs owed) and a supplier price creeping up
A small tracker follows him down the page (Enquiry > Booked > Invoiced > Paid).
"Worked example, made-up firm" label always visible. Ends with one line and the
WhatsApp button. The bottom proof section goes (Max's call).

## 6. States
Phone scroll; call mode; JS off (all seven steps simply show); reduced motion;
?to=Name line; live draft reply (real reply once the API key is in, sample until);
after Approve; the final step.

## 7. How it moves
Phone: each picture plays once as you reach it; tapping Approve moves the job along.
Laptop: "Walk me through" opens one step at a time, full screen; right arrow on,
left arrow back, a row of dots for progress. Same job, bigger, to talk over.

## 8. Build aids
impeccable layout/animate/colorize/typeset; dataviz for rings, bars, price line;
GSAP for call mode.

## Standing constraints (from earlier in the project)
No prices on the page. No fabricated clients or testimonials. Worked example must be
labelled as made up. British English, no em dashes. Light mode only (by rule). Opens
inside the WhatsApp in-app browser: no ScrollTrigger / scroll-jacking / fixed
overlays that fight the webview. Audience: UK trades owners, non-technical, 40 seconds
on a phone. Existing stack: Astro static + one Vercel function, Barlow, finca palette
tokens (teal #0a6f86, sage, terracotta, amber), GSAP installed.
