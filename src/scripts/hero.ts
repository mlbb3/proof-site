// Hero enhancement. Turns the server-rendered "all panels visible" hero into a
// compact click-to-inspect view. Resilience: handlers are bound before the
// compact class is added, so a failure here leaves the full static hero intact.

export function enhanceHero(): void {
  const heroes = document.querySelectorAll<HTMLElement>('[data-hero]');
  heroes.forEach(setup);
}

function setup(hero: HTMLElement): void {
  const figs = Array.from(hero.querySelectorAll<HTMLAnchorElement>('[data-fig]'));
  const panels = Array.from(hero.querySelectorAll<HTMLElement>('[data-panel]'));
  if (figs.length === 0 || panels.length === 0) return;

  const select = (key: string): void => {
    for (const p of panels) {
      if (p.dataset.panel === key) p.setAttribute('data-selected', 'true');
      else p.removeAttribute('data-selected');
    }
    for (const f of figs) {
      f.setAttribute('aria-current', f.dataset.fig === key ? 'true' : 'false');
    }
  };

  for (const fig of figs) {
    fig.addEventListener('click', (event) => {
      const key = fig.dataset.fig;
      if (!key) return;
      event.preventDefault();
      select(key);
    });
  }

  // Handlers are bound; now switch on the compact view.
  hero.classList.add('is-enhanced');

  // Ensure exactly one panel is selected to start.
  const current = figs.find((f) => f.getAttribute('aria-current') === 'true') ?? figs[0];
  if (current?.dataset.fig) select(current.dataset.fig);
}
