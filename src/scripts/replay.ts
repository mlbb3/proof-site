// "Run last night": one GSAP timeline, six labelled scenes, about eight
// seconds. Every movement under 300ms, expo.out, nothing travels more than
// 12px. Each scene sets its own start state so the timeline can be scrubbed.
// The end state is the static HTML; the replay only hides and reveals what is
// already on the page. Reduced motion jumps straight to the end.
import gsap from 'gsap';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector(sel) as T | null;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const desktop = () => window.matchMedia('(min-width: 1100px)').matches;

function fmt(el: HTMLElement, v: number): string {
  const kind = el.dataset.format;
  if (kind === 'money') return '£' + Math.round(v).toLocaleString('en-GB');
  if (kind === 'hours') return Number.isInteger(v) ? String(v) : v.toFixed(1);
  return String(Math.round(v));
}

/** Count a figure up from 0 to its data-value. Tabular figures keep it steady. */
function countUp(tl: gsap.core.Timeline, el: HTMLElement, at: gsap.Position, dur = 0.3) {
  const target = Number(el.dataset.value ?? el.textContent);
  const o = { v: 0 };
  tl.set(el, { textContent: fmt(el, 0) }, at);
  tl.to(o, { v: target, duration: dur, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(el, o.v); } }, at);
}

function scrollTo(el: Element | null) {
  if (!el) return;
  el.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', block: 'start' });
}

export function mountReplay() {
  const run = $('#run') as HTMLButtonElement | null;
  const skip = $('#skip') as HTMLButtonElement | null;
  const caption = $('#caption');
  const controls = $('#brief-controls');
  const brief = $('#brief');
  const lines = $$('#brief-lines li');
  const today = $('#brief-today');
  const reading = $('#brief-reading');
  if (!run || !skip || !caption || !controls || !brief || !lines.length || !today) return;
  // Hoisted functions below cannot see the narrowing above, so rebind non-null.
  const run$ = run;
  const skip$ = skip;
  const cap$ = caption;

  controls.hidden = false; // JS is on: show the button

  const blocks = {
    enq: $('#enquiry-log'),
    inv: $('#invoice-register'),
    job: $('#job-book'),
    hrs: $('#timesheet'),
    led: $('#sales-ledger'),
    pri: $('#supplier-prices'),
  };
  const cap = (text: string) => () => { cap$.textContent = text; };

  const composeBrief = (tl: gsap.core.Timeline, at: gsap.Position) => {
    tl.set(lines, { autoAlpha: 0, y: 6 }, at);
    tl.set(today, { autoAlpha: 0 }, at);
    tl.to(lines, { autoAlpha: 1, y: 0, duration: 0.26, ease: 'expo.out', stagger: 0.24 }, at);
    tl.to(today, { autoAlpha: 1, duration: 0.24, ease: 'expo.out' }, '>-0.05');
  };

  // First view: the brief composes itself once, quietly. No pipeline, no scroll.
  let composed = false;
  const io = new IntersectionObserver((entries) => {
    if (composed || !entries.some((e) => e.isIntersecting)) return;
    composed = true;
    io.disconnect();
    if (reduce()) return;
    const tl = gsap.timeline();
    composeBrief(tl, 0);
  }, { threshold: 0.35 });
  io.observe(brief);

  let tl: gsap.core.Timeline | null = null;

  function build(): gsap.core.Timeline {
    const t = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 0.24 } });

    // Before the tap: brief empties, blocks empty, caption strip appears.
    t.addLabel('start', 0);
    t.set(lines, { autoAlpha: 0, y: 6 }, 'start');
    t.set(today, { autoAlpha: 0 }, 'start');
    t.call(() => { reading?.classList.add('on'); skip$.hidden = false; }, undefined, 'start');
    for (const b of Object.values(blocks)) {
      if (!b) continue;
      t.set($$('[data-row]', b), { autoAlpha: 0, y: 8 }, 'start');
      t.set($$('[data-reveal]', b), { autoAlpha: 0 }, 'start');
    }

    // Scene 1: inbox fills.
    t.addLabel('s1', 0.25);
    t.call(cap('Reading overnight enquiries'), undefined, 's1');
    t.call(() => scrollTo(blocks.enq), undefined, 's1');
    if (blocks.enq) {
      const rows = $$('[data-row]', blocks.enq);
      t.to(rows, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.3 }, 's1+=0.1');
      const marks = $$('[data-status]', blocks.enq);
      t.set(marks, { textContent: '' }, 's1');
      marks.forEach((m, i) => {
        t.set(m, { textContent: m.dataset.status ?? '' }, `s1+=${1.0 + i * 0.06}`);
      });
      const draft = $('[data-reveal="draft"]', blocks.enq);
      if (draft) t.to(draft, { autoAlpha: 1, duration: 0.22 }, 's1+=1.2');
    }

    // Scene 2: the invoice is read.
    t.addLabel('s2', 1.5);
    t.call(cap('Reading the PDF attachment'), undefined, 's2');
    t.call(() => scrollTo(blocks.inv), undefined, 's2');
    if (blocks.inv) {
      const outline = $('[data-reveal="pdf"]', blocks.inv);
      const fields = $$('.pdf-field', blocks.inv);
      const rows = $$('[data-row]', blocks.inv);
      if (outline) t.to(outline, { autoAlpha: 1, duration: 0.2 }, 's2+=0.05');
      t.set(fields, { clipPath: 'inset(0 100% 0 0)' }, 's2');
      fields.forEach((f, i) => {
        t.to(f, { clipPath: 'inset(0 0% 0 0)', duration: 0.24 }, `s2+=${0.3 + i * 0.25}`);
      });
      t.to(rows, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.18 }, 's2+=1.05');
    }

    // Scene 3: jobs are logged.
    t.addLabel('s3', 3.0);
    t.call(cap('Logging jobs from confirmation emails'), undefined, 's3');
    t.call(() => scrollTo(blocks.job), undefined, 's3');
    if (blocks.job) {
      const subjects = $$('[data-subject]', blocks.job);
      const rows = $$('[data-row]', blocks.job);
      t.set(subjects, { autoAlpha: 0 }, 's3');
      t.to(subjects, { autoAlpha: 1, duration: 0.15, stagger: 0.08 }, 's3+=0.05');
      t.to(rows, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.1 }, 's3+=0.5');
      t.to(subjects, { color: 'var(--ink-3)', duration: 0.15 }, 's3+=0.9');
    }

    // Scene 4: hours are checked.
    t.addLabel('s4', 4.0);
    t.call(cap('Checking hours against the plan'), undefined, 's4');
    t.call(() => scrollTo(blocks.hrs), undefined, 's4');
    if (blocks.hrs) {
      const rows = $$('[data-row]', blocks.hrs);
      t.to(rows, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.06 }, 's4+=0.05');
      $$('[data-value]', blocks.hrs).forEach((el) => countUp(t, el, 's4+=0.45'));
      const gap = $('[data-reveal="gap"]', blocks.hrs);
      if (gap) t.to(gap, { autoAlpha: 1, duration: 0.2 }, 's4+=0.85');
    }

    // Scene 5: till and prices.
    t.addLabel('s5', 5.0);
    t.call(cap("Tallying yesterday's money"), undefined, 's5');
    t.call(() => scrollTo(blocks.led), undefined, 's5');
    if (blocks.led) {
      $$('[data-value]', blocks.led).forEach((el) => countUp(t, el, 's5+=0.05'));
      t.to($$('[data-row]', blocks.led), { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.12 }, 's5+=0.35');
    }
    t.call(cap('Same part, three dates'), undefined, 's5+=0.6');
    if (blocks.pri) {
      t.to($$('[data-row]', blocks.pri), { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.08 }, 's5+=0.65');
      const note = $('[data-reveal="drift"]', blocks.pri);
      if (note) t.to(note, { autoAlpha: 1, duration: 0.2 }, 's5+=0.95');
    }

    // Scene 6: the brief composes.
    t.addLabel('s6', 6.0);
    t.call(cap('Writing the brief'), undefined, 's6');
    t.call(() => { scrollTo(brief); reading?.classList.remove('on'); }, undefined, 's6');
    composeBrief(t, 's6+=0.1');
    t.call(() => { cap$.textContent = ''; skip$.hidden = true; }, undefined, '>');

    t.eventCallback('onComplete', () => {
      ($('#run-label') as HTMLElement).textContent = run$.dataset.again ?? 'Run it again';
      run$.disabled = false;
    });
    return t;
  }

  function finish() {
    if (!tl) return;
    tl.progress(1);
    cap$.textContent = '';
    skip$.hidden = true;
    reading?.classList.remove('on');
    scrollTo(brief);
  }

  run$.addEventListener('click', () => {
    if (tl) tl.kill();
    composed = true;
    tl = build();
    if (reduce()) {
      finish();
      ($('#run-label') as HTMLElement).textContent = run$.dataset.again ?? 'Run it again';
      return;
    }
    run$.disabled = true;
    tl.play(0);
  });

  skip$.addEventListener('click', () => {
    finish();
    ($('#run-label') as HTMLElement).textContent = run$.dataset.again ?? 'Run it again';
    run$.disabled = false;
  });

  // Desktop only, for live calls: click an evidence block to pause or resume.
  for (const b of Object.values(blocks)) {
    b?.addEventListener('click', (e) => {
      if (!desktop() || !tl || (e.target as HTMLElement).closest('a, button, input')) return;
      if (tl.isActive()) tl.pause();
      else if (tl.progress() > 0 && tl.progress() < 1) tl.play();
    });
  }
}
