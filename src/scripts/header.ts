// The header's behaviour: the language dropdown, the white-on-dark switch over dark sections, the Solutions panel
// (click, Enter or Space; closes on outside click and Escape, focus back to the button) and the phone menu.
// Moved out of Header.astro on 20 Nov 2026 to keep that file under 500 lines.
const header = document.getElementById('site-header')!;
const langdrop = header.querySelector<HTMLDetailsElement>('[data-langdrop]');
if (langdrop) {
  document.addEventListener('click', (e) => {
    if (langdrop.open && !langdrop.contains(e.target as Node)) langdrop.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langdrop.open) {
      langdrop.open = false;
      langdrop.querySelector('summary')?.focus();
    }
  });
}
const trigger = document.getElementById('solutions-trigger') as HTMLButtonElement;
const panel = document.getElementById('solutions-panel')!;
const burger = header.querySelector<HTMLButtonElement>('.header__burger')!;
const menu = document.getElementById('mobile-menu')!;
const label = burger.querySelector<HTMLElement>('[data-open-label]')!;

// White-on-dark while a dark chapter (film, photo, cans section, closing section) sits under the header,
// light over everything else. Only the strip behind the header counts.
const darks = [...document.querySelectorAll('[data-dark]')];
if (darks.length) {
  const under = new Set<Element>();
  const setTone = () => {
    const dark = under.size > 0;
    header.dataset.tone = dark ? 'dark' : 'light';
    header.classList.toggle('on-dark', dark);
  };
  let io: IntersectionObserver | undefined;
  const watch = () => {
    io?.disconnect();
    under.clear();
    const h = header.offsetHeight;
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target)));
        setTone();
      },
      // The top pixel is left out: a dark section ending exactly at the top of the window is not under the header
      { rootMargin: `-1px 0px -${Math.max(0, innerHeight - h)}px 0px` },
    );
    darks.forEach((el) => io!.observe(el));
  };
  watch();
  addEventListener('resize', watch);
}
const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Solutions panel: opens on click, Enter or Space (it is a button); closes on outside click, Escape or a second
// click, and focus goes back to the button whenever it was inside the panel ──
const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';
const setPanel = (open: boolean, focusFirst = false) => {
  const hadFocus = panel.contains(document.activeElement);
  trigger.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
  header.classList.toggle('is-open', open);
  if (open && focusFirst) panel.querySelector<HTMLElement>('a')?.focus();
  if (!open && hadFocus) trigger.focus();
};
trigger.addEventListener('click', () => setPanel(!isOpen()));
trigger.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setPanel(true, true);
  }
});

// Arrow keys move between the panel's links
panel.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  e.preventDefault();
  const links = [...panel.querySelectorAll<HTMLElement>('a')];
  const i = links.indexOf(document.activeElement as HTMLElement);
  links[(i + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length]?.focus();
});

document.addEventListener('click', (e) => {
  if (isOpen() && !trigger.contains(e.target as Node) && !panel.contains(e.target as Node)) setPanel(false);
});
// A link to a section of the page you are on closes the menu
panel.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a')) setPanel(false);
});
header.addEventListener('focusout', (e) => {
  const to = e.relatedTarget as Node | null;
  if (isOpen() && to && !panel.contains(to) && to !== trigger) setPanel(false);
});

// ── Mobile menu ──
const setMenu = (open: boolean) => {
  burger.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
  label.textContent = open ? label.dataset.closeLabel! : label.dataset.openLabel!;
  document.documentElement.style.overflow = open ? 'hidden' : '';
  if (open) menu.querySelector<HTMLElement>('a, summary')?.focus();
};
burger.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => {
  if ((e.target as Element).closest('a')) setMenu(false);
});

addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (isOpen()) {
    setPanel(false);
    trigger.focus();
    return;
  }
  if (!menu.hidden) {
    setMenu(false);
    burger.focus();
  }
});
matchMedia('(min-width: 1100px)').addEventListener('change', (e) => e.matches && setMenu(false));
