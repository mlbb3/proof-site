// "Type your own enquiry": the one genuinely live call. A row lands in the
// enquiry log with status "Drafting", the endpoint answers, and the draft
// replaces it marked "Draft, waiting". On any failure or rate limit the page
// shows a sample draft with the resting caption. Nothing is sent anywhere.
import gsap from 'gsap';

export function mountLive() {
  const form = document.getElementById('live-form') as HTMLFormElement | null;
  const input = document.getElementById('live-input') as HTMLInputElement | null;
  const button = document.getElementById('live-button') as HTMLButtonElement | null;
  const row = document.getElementById('live-row');
  const cell = document.getElementById('live-summary');
  const status = document.getElementById('live-status');
  const out = document.getElementById('live-draft');
  const text = document.getElementById('live-draft-text');
  const note = document.getElementById('live-note');
  const trade = document.querySelector('main')?.getAttribute('data-trade') ?? 'default';
  if (!form || !input || !button || !row || !cell || !status || !out || !text || !note) return;

  form.hidden = false; // JS is on: show the field
  const sample = out.dataset.sample ?? '';
  const captions = {
    drafting: status.dataset.drafting ?? 'Drafting',
    waiting: status.dataset.waiting ?? 'Draft, waiting',
    resting: note.dataset.resting ?? 'Sample draft. The live service is resting.',
  };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const enquiry = input.value.replace(/\s+/g, ' ').trim().slice(0, 300);
    if (!enquiry) return;
    button.disabled = true;
    cell.textContent = enquiry;
    status.textContent = captions.drafting;
    status.classList.remove('mark');
    row.hidden = false;
    out.hidden = true;
    note.textContent = '';
    if (!reduce) gsap.fromTo(row, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: 'expo.out' });

    let draft = '';
    let live = false;
    try {
      const res = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ enquiry, trade }),
      });
      if (res.ok) {
        const data = (await res.json()) as { draft?: string };
        if (data.draft) { draft = data.draft; live = true; }
      }
    } catch {}
    if (!draft) draft = sample;

    text.textContent = draft;
    status.textContent = captions.waiting;
    status.classList.add('mark');
    note.textContent = live ? (note.dataset.live ?? '') : captions.resting;
    out.hidden = false;
    if (!reduce) gsap.fromTo(out, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: 'expo.out' });
    button.disabled = false;
  });

  // Approve: the one stateful control. Resets on reload.
  document.querySelectorAll<HTMLButtonElement>('[data-approve]').forEach((b) => {
    b.addEventListener('click', () => {
      const target = document.getElementById(b.dataset.approve ?? '');
      if (target) {
        target.textContent = target.dataset.approved ?? 'Approved';
        target.classList.remove('mark');
        target.classList.add('ok');
      }
      b.disabled = true;
    });
  });
}
