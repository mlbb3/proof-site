// The page's one script. Kept small for the WhatsApp in-app browser: no GSAP
// here, CSS transitions only. Everything is visible and correct without it.
//  - the link: ?to=Name&firm=&town=&job= puts the reader's details in
//  - reveals: elements with .rv rise in once as they reach the screen
//  - Approve: each one moves the job on further down the page
//  - Try it: a real customer message gets a real draft; Approve books it in
//  - call mode: step through the page on a screen-share
//  - visits: Vercel Web Analytics, with the ?to name moved into the path so
//    Max can see who opened it; the other link details are dropped
import { inject } from '@vercel/analytics';
import { PERSONAL_LINE, FLOW } from '../data/site';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
const tradeSlug = $('main')?.dataset.trade ?? 'default';
const DAYS: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday' };

/** A short job label from a customer's message: greeting off, first clause, six words. */
const TAIL = /^(the|a|an|of|over|to|in|on|at|for|with|and|or|my|our|your|is|are|it|some)$/i;
function workLabel(msg: string): string {
  const words = msg
    .replace(/^\s*(hi|hello|hey|hiya|morning|afternoon|evening|good (morning|afternoon|evening))\b( there)?[\s,.!-]*/i, '')
    .split(/[.,!?;\n]/)[0]
    .replace(/^\s*(i've got|i have|we've got|we have|got|there's|there is)\s+/i, '')
    .replace(/^(a|an|some|my|our|the)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 7);
  while (words.length > 1 && TAIL.test(words[words.length - 1])) words.pop();
  const s = words.join(' ');
  return s ? s[0].toUpperCase() + s.slice(1) : 'New job';
}

/** A real draft from /api/draft, or '' when the service is resting or fails. */
async function liveDraft(enquiry: string, owner = '', firm = ''): Promise<string> {
  try {
    const res = await fetch('/api/draft', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ enquiry, trade: tradeSlug, owner, firm }),
    });
    if (res.ok) return ((await res.json()) as { draft?: string }).draft ?? '';
  } catch {}
  return '';
}

// ---- The link ---------------------------------------------------------------
// textContent only, trimmed and capped, so nothing in a link can add markup.
const q = new URLSearchParams(location.search);
const param = (k: string, n: number) => (q.get(k) ?? '').replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
const to = param('to', 40), firm = param('firm', 40), town = param('town', 30), job = param('job', 300);
const owner = to.split(' ')[0];
const binds: Record<string, string> = {};
if (owner) binds.owner = owner;
if (firm) binds.firm = firm;
if (town) binds.town = town;
if (job) {
  const w = workLabel(job);
  Object.assign(binds, {
    customer: 'Your customer',
    first: 'there',
    'first-name': 'your customer',
    message: job,
    summary: job.length > 90 ? job.slice(0, 88).trimEnd() + '…' : job,
    work: w,
    'work-lc': 'job',
  });
}
$$('[data-bind]').forEach((el) => {
  const v = binds[el.dataset.bind ?? ''];
  if (v) el.textContent = v;
});
if (to) {
  const line = $('#personal-line');
  if (line) { line.textContent = PERSONAL_LINE(to); line.hidden = false; }
}
if (firm || job) $$('[data-honesty]').forEach((el) => (el.textContent = FLOW.honestyPersonal));

const sample = $<HTMLFormElement>('#try-form')?.dataset.sample ?? '';
if (job) {
  const d = $('[data-main-draft]');
  if (d) {
    d.textContent = 'Drafting…';
    liveDraft(job, owner, firm).then((t) => (d.textContent = t || sample));
  }
}

// ---- Start state: the job hasn't moved yet ------------------------------------
const newSlot = $('[data-new-slot]');
const slotState = $('[data-slot-state]');
const week = $('[data-week]');
newSlot?.classList.add('pending');
if (slotState) slotState.textContent = 'Pencilled in';
week?.classList.add('pre');

// ---- Reveals: enhance an already-visible default; failsafe shows all after 2.5s.
const motion = !reduce && 'IntersectionObserver' in window;
if (motion) {
  root.classList.add('motion');
  const els = $$('.rv');
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }
  }, { threshold: 0.2 });
  els.forEach((el) => io.observe(el));
  setTimeout(() => els.forEach((el) => el.classList.add('in')), 2500);
}

// ---- Approve: what each tap sets off further down ---------------------------
const effects: Record<string, (card: HTMLElement) => void> = {
  book() {
    newSlot?.classList.remove('pending');
    if (slotState) slotState.textContent = 'Booked';
  },
  paid() {
    const st = $('[data-invoice-state]');
    st?.classList.replace('sent', 'paid');
    const label = $('[data-invoice-label]');
    if (label) label.textContent = 'Paid';
    week?.classList.remove('pre');
  },
  cascade(card) {
    if (!newSlot) return;
    const label = workLabel($<HTMLTextAreaElement>('#try-input')?.value ?? '');
    // The next free day in the diary, else Friday.
    const free = $('[data-free]');
    const day = (free?.closest<HTMLElement>('[data-day]') ?? $<HTMLElement>('[data-day="Fri"]'))!;
    const dayKey = day.dataset.day ?? 'Fri';
    $('[data-cascade-slot]')?.remove();
    // Clone the followed slot so it keeps its styles, then make it this job.
    const slot = newSlot.cloneNode(true) as HTMLElement;
    slot.removeAttribute('data-new-slot');
    slot.dataset.cascadeSlot = '';
    slot.classList.remove('pending');
    slot.querySelectorAll('[data-bind],[data-slot-state]').forEach((n) => { n.removeAttribute('data-bind'); n.removeAttribute('data-slot-state'); });
    slot.querySelector('.s-time')!.textContent = '10:00';
    slot.querySelector('.s-who')!.textContent = 'Your customer';
    slot.querySelector('.s-what')!.textContent = label;
    slot.querySelector('.chip-new')!.textContent = 'Just added';
    if (free) free.hidden = true;
    day.querySelector('.slots')?.prepend(slot);
    const when = card.querySelector('[data-cascade-when]');
    if (when) when.textContent = `${DAYS[dayKey]} 10:00`;
    const line = $('[data-cascade-line]');
    const text = $('[data-cascade-text]');
    if (text) text.textContent = `Booked: ${label}, ${dayKey} 10:00`;
    if (line) line.hidden = false;
  },
};

$$<HTMLButtonElement>('[data-approve]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest<HTMLElement>('[data-draft]');
    if (!card) return;
    card.querySelector('[data-text]')?.setAttribute('contenteditable', 'false');
    const actions = btn.parentElement;
    if (actions) actions.hidden = true;
    const done = card.querySelector<HTMLElement>('[data-done]');
    if (done) done.hidden = false;
    effects[card.dataset.effect ?? '']?.(card);
  });
});

// Edit: the draft really is editable before it goes.
$$<HTMLButtonElement>('[data-edit]').forEach((btn) => {
  const label = btn.textContent ?? 'Edit';
  btn.addEventListener('click', () => {
    const text = btn.closest('[data-draft]')?.querySelector<HTMLElement>('[data-text]');
    if (!text) return;
    const on = text.getAttribute('contenteditable') !== 'true';
    text.setAttribute('contenteditable', on ? 'true' : 'false');
    btn.textContent = on ? btn.dataset.doneLabel ?? 'Done' : label;
    if (on) {
      text.focus();
      const r = document.createRange(); r.selectNodeContents(text); r.collapse(false);
      const sel = window.getSelection(); sel?.removeAllRanges(); sel?.addRange(r);
    }
  });
});

// ---- Try it with your own customer's message --------------------------------
const form = $<HTMLFormElement>('#try-form');
if (form) {
  form.hidden = false;
  const input = $<HTMLTextAreaElement>('#try-input')!;
  const button = $<HTMLButtonElement>('#try-btn')!;
  const out = $('#try-out')!;
  const text = $('#try-text')!;
  const note = $('#try-note')!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const enquiry = input.value.replace(/\s+/g, ' ').trim().slice(0, 300);
    if (!enquiry) return;
    button.disabled = true;
    const draft = await liveDraft(enquiry, owner, firm);
    text.textContent = draft || form.dataset.sample || '';
    text.setAttribute('contenteditable', 'false');
    note.textContent = draft ? form.dataset.live ?? '' : form.dataset.resting ?? '';
    // A fresh draft waits for a fresh tap.
    const actions = out.querySelector<HTMLElement>('.d-actions');
    const done = out.querySelector<HTMLElement>('[data-done]');
    if (actions) actions.hidden = false;
    if (done) done.hidden = true;
    out.hidden = false;
    button.disabled = false;
  });
}

// ---- Laptop: the left column sticks, bottom-aligned if it's taller than the screen.
const colA = $('#col-a');
const stick = () => {
  if (colA) root.style.setProperty('--stick-top', `${Math.min(16, innerHeight - colA.offsetHeight - 16)}px`);
};
stick();
addEventListener('resize', stick);
if (colA && 'ResizeObserver' in window) new ResizeObserver(stick).observe(colA);

// ---- Call mode --------------------------------------------------------------
const walk = $<HTMLButtonElement>('#walk');
const bar = $('#callbar');
const stops = $$('[data-stop]');
const groups = $$('.beat, .close');
const dots = $('#call-dots');
const count = $('#call-count');
let cur = -1;

function show(i: number) {
  cur = Math.max(0, Math.min(stops.length - 1, i));
  stops.forEach((s, k) => {
    s.classList.toggle('past', k < cur);
    s.classList.toggle('ahead', k > cur);
  });
  // A whole beat stays hidden until its first stop comes up; the close waits for the end.
  groups.forEach((g) => {
    const first = stops.findIndex((s) => g.contains(s));
    g.classList.toggle('ahead', first === -1 ? cur < stops.length - 1 : first > cur);
  });
  const el = stops[cur];
  if (motion) {
    el.querySelectorAll('.rv').forEach((r) => r.classList.remove('in'));
    requestAnimationFrame(() => requestAnimationFrame(() => el.querySelectorAll('.rv').forEach((r) => r.classList.add('in'))));
  }
  const tall = el.getBoundingClientRect().height > innerHeight * 0.7;
  el.scrollIntoView({ block: tall ? 'start' : 'center', behavior: reduce ? 'auto' : 'smooth' });
  if (dots) dots.querySelectorAll('i').forEach((d, k) => d.className = k === cur ? 'on' : k < cur ? 'done' : '');
  if (count) count.textContent = `${cur + 1} of ${stops.length}`;
  const next = bar?.querySelector<HTMLElement>('.call-next');
  if (next) next.hidden = cur === stops.length - 1;
}

function enter() {
  root.classList.add('call');
  if (bar) bar.hidden = false;
  if (walk) walk.hidden = true;
  if (dots && !dots.childElementCount) stops.forEach(() => dots.append(document.createElement('i')));
  show(0);
  bar?.querySelector<HTMLButtonElement>('.call-next')?.focus({ preventScroll: true });
}

function exit() {
  root.classList.remove('call');
  if (bar) bar.hidden = true;
  if (walk) walk.hidden = false;
  [...stops, ...groups].forEach((s) => s.classList.remove('past', 'ahead'));
  stops.forEach((s) => s.querySelectorAll('.rv').forEach((r) => r.classList.add('in')));
  cur = -1;
}

if (walk && bar && stops.length) {
  walk.hidden = false;
  walk.addEventListener('click', enter);
  bar.addEventListener('click', (e) => {
    const act = (e.target as HTMLElement).closest<HTMLElement>('[data-call]')?.dataset.call;
    if (act === 'next') show(cur + 1);
    else if (act === 'prev') show(cur - 1);
    else if (act === 'exit') exit();
  });
  addEventListener('keydown', (e) => {
    if (!root.classList.contains('call')) return;
    const t = e.target as HTMLElement;
    if (t.closest('textarea, input, [contenteditable="true"]')) return;
    if (t.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); show(cur + 1); }
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); show(cur - 1); }
    else if (e.key === 'Escape') exit();
  });
}

// ---- Visits -------------------------------------------------------------------
// /for/roofing/?to=Steve+Harris is recorded as /for/roofing/to/Steve Harris.
// Firm, town and the customer's message never leave the page.
inject({
  beforeSend(event) {
    const u = new URL(event.url);
    const who = u.searchParams.get('to')?.trim().slice(0, 40);
    u.search = '';
    if (who) u.pathname = `${u.pathname.replace(/\/?$/, '/')}to/${encodeURIComponent(who)}`;
    return { ...event, url: u.toString() };
  },
});
