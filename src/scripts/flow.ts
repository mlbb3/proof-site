// The page's one script. Kept small for the WhatsApp in-app browser: no GSAP
// here, CSS transitions only. Everything is visible without it.
//  - ?to=Name: personal line + "Morning, Name." in the email subject
//  - reveals: elements with .rv rise in once as they reach the screen
//  - Approve: sends the drafted reply (the job moves on)
//  - Try it: posts a real customer message to /api/draft
import { PERSONAL_LINE } from '../data/site';

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ?to=Name
try {
  const raw = new URLSearchParams(location.search).get('to');
  const name = raw ? raw.trim().slice(0, 40) : '';
  if (name) {
    const line = document.getElementById('personal-line');
    if (line) { line.textContent = PERSONAL_LINE(name); line.hidden = false; }
    const greet = document.getElementById('mail-greet');
    if (greet) greet.textContent = `Morning, ${name.split(' ')[0]}.`;
  }
} catch {}

// Reveals: enhance an already-visible default; failsafe shows all after 2.5s.
if (!reduce && 'IntersectionObserver' in window) {
  root.classList.add('motion');
  const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }
  }, { threshold: 0.2 });
  els.forEach((el) => io.observe(el));
  setTimeout(() => els.forEach((el) => el.classList.add('in')), 2500);
}

// Approve
document.querySelectorAll<HTMLButtonElement>('[data-approve]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('[data-draft]');
    const done = card?.querySelector<HTMLElement>('[data-done]');
    const actions = btn.parentElement;
    if (actions) actions.hidden = true;
    if (done) done.hidden = false;
  });
});

// Try it with your own customer's message
const form = document.getElementById('try-form') as HTMLFormElement | null;
if (form) {
  form.hidden = false;
  const input = document.getElementById('try-input') as HTMLTextAreaElement;
  const button = document.getElementById('try-btn') as HTMLButtonElement;
  const out = document.getElementById('try-out') as HTMLElement;
  const text = document.getElementById('try-text') as HTMLElement;
  const note = document.getElementById('try-note') as HTMLElement;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const enquiry = input.value.replace(/\s+/g, ' ').trim().slice(0, 300);
    if (!enquiry) return;
    button.disabled = true;
    let draft = '';
    try {
      const res = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ enquiry, trade: form.dataset.trade }),
      });
      if (res.ok) draft = ((await res.json()) as { draft?: string }).draft ?? '';
    } catch {}
    text.textContent = draft || form.dataset.sample || '';
    note.textContent = draft ? form.dataset.live ?? '' : form.dataset.resting ?? '';
    out.hidden = false;
    button.disabled = false;
  });
}
