// Browser tests for the visitor journeys in the Step 2 brief (tests A–J), plus Arabic and Italian (K–M) and the
// later refinements (N: systems → Tyll → next step, wave, hero, three-step "How Tyll helps", العربية label, booking).
// Runs against a running dev or preview server (default http://localhost:4321) using the installed Google Chrome.
//   npm run dev            (in one terminal)
//   npm run test:e2e       (in another)
// Every request to Google, Plausible or Meta is intercepted and blocked, so tests never send data to them;
// the tests only check whether the site *tried* to contact them. Results: PASS, FAIL or BLOCKED (missing setup).

import puppeteer from 'puppeteer-core';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';

// The hotel film's frame count comes from its manifest, so the tests follow a re-cut film
const FILM = JSON.parse(readFileSync(new URL('../src/content/walkthrough.json', import.meta.url), 'utf8'));
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TRACKERS = /googletagmanager\.com|google-analytics\.com|plausible\.io|connect\.facebook\.net|facebook\.com\/tr/;
const SOL = {
  en: ['log-waste', 'stock-waste', 'forecasting-purchasing', 'revenue', 'finance-money', 'pour-control'].map((s) => `/en/solutions/${s}/`),
  de: ['abfall-erfassen', 'lager-abfall', 'prognose-einkauf', 'umsatz', 'finanzen', 'pour-control'].map((s) => `/de/loesungen/${s}/`),
  ar: ['log-waste', 'stock-waste', 'forecasting-purchasing', 'revenue', 'finance-money', 'pour-control'].map((s) => `/ar/solutions/${s}/`),
  it: ['registra-sprechi', 'magazzino-sprechi', 'previsioni-acquisti', 'ricavi', 'finanza', 'pour-control'].map((s) => `/it/soluzioni/${s}/`),
};
const LANGS = ['en', 'de', 'ar', 'it'];
// Same order in every language, so index i is the same page
const PAGES = {
  en: ['/en/', '/en/book-a-call/', '/en/faq/', '/en/legal-notice/', '/en/privacy/', '/en/solutions/', ...SOL.en, '/en/how-it-works/'],
  de: ['/de/', '/de/gespraech-buchen/', '/de/faq/', '/de/impressum/', '/de/datenschutz/', '/de/loesungen/', ...SOL.de, '/de/so-funktionierts/'],
  ar: ['/ar/', '/ar/book-a-call/', '/ar/faq/', '/ar/legal-notice/', '/ar/privacy/', '/ar/solutions/', ...SOL.ar, '/ar/how-it-works/'],
  it: ['/it/', '/it/prenota-una-chiamata/', '/it/faq/', '/it/note-legali/', '/it/privacy/', '/it/soluzioni/', ...SOL.it, '/it/come-funziona/'],
};
const ALL = LANGS.flatMap((l) => PAGES[l]);

const results = [];
const record = (id, name, status, detail = '') => {
  results.push({ id, name, status, detail });
  // Progress as each check finishes, so a stalled run shows where it stopped
  console.error(`… ${id} ${status}`);
  // A failure says why, as soon as it happens, so a run that stops early still shows the reason
  if (status === 'FAIL' && detail) console.error(`    ${detail.slice(0, 1500)}`);
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });

/** A fresh, isolated browser profile (no stored consent) with tracker requests blocked and recorded. */
async function freshPage({ width = 1440, height = 900, mobile = false, reduce = false } = {}) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  // The dev server builds each image on first request, which can take longer than the default 30 s
  page.setDefaultNavigationTimeout(120000);
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });
  if (reduce) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  page.trackerHits = [];
  page.errors = [];
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    if (TRACKERS.test(r.url())) {
      page.trackerHits.push(r.url());
      return r.abort('blockedbyclient');
    }
    r.continue();
  });
  page.on('console', (m) => m.type() === 'error' && !/ERR_BLOCKED_BY_CLIENT|blockedbyclient/i.test(m.text()) && page.errors.push(m.text()));
  page.on('pageerror', (e) => page.errors.push(String(e)));
  page.ctx = ctx;
  return page;
}
const go = (page, path) => page.goto(BASE + path, { waitUntil: 'networkidle2' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const config = async (page) =>
  page.evaluate(() => ({
    demo: [...document.querySelectorAll('a[data-track="explore_demo_click"]')].map((a) => ({ href: a.getAttribute('href'), target: a.target, rel: a.rel, from: a.dataset.trackFrom })),
    banner: !!document.getElementById('consent-banner'),
    analytics: !!document.getElementById('consent-analytics'),
    marketing: !!document.getElementById('consent-marketing'),
  }));

// ── A, B, K, L: full journey in English, German, Arabic and Italian ───────────────────────────────
for (const lang of LANGS) {
  const id = { en: 'A', de: 'B', ar: 'K', it: 'L' }[lang];
  const page = await freshPage();
  const problems = [];
  try {
    await go(page, `/${lang}/`);
    const h1 = await page.$eval('h1', (e) => e.textContent.trim());
    if (!/Know what your hotel lost last night|Wissen, was Ihr Hotel letzte Nacht verloren hat|اعرف ما خسره فندقك|Scopri cosa ha perso il tuo hotel/.test(h1)) problems.push(`hero headline is "${h1}"`);
    // The hotel section: one full-screen film played by scrolling, its frames drawn on a canvas. It stops on four holds
    // (scroll plateaus); a hold's text and callouts show only on its plateau, never during the moves between them, and
    // a tab takes the reader to its hold. Positions come from the page (data-hs-keys), frame rates from the manifest.
    const hotel = await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const root = document.querySelector('[data-hs]');
      const holds = [...root.querySelectorAll('[data-hs-hold]')];
      const canvas = root.querySelector('[data-hs-film]');
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      const top = scrollY + root.getBoundingClientRect().top - header;
      const keys = root.dataset.hsKeys.split(',').map(Number);
      const read = () => ({ hold: root.dataset.hold, t: +root.dataset.hsT, frame: +(canvas.dataset.frame ?? -1), text: holds.filter((h) => h.classList.contains('is-on')).map((h) => +h.dataset.hsHold).join(), current: [...root.querySelectorAll('[data-hs-go]')].findIndex((g) => g.getAttribute('aria-current') === 'step'), on: [...root.querySelectorAll('.hs__spot.is-on')].map((e) => +e.dataset.hsSpot).join(), parts: root.querySelectorAll('[data-hs-hold="3"] .hs__parts li').length });
      const at = async (y) => { scrollTo({ top: top + y, behavior: 'instant' }); await wait(800); return read(); };
      const mid = (i) => (keys[2 * i] + keys[2 * i + 1]) / 2;
      const r = [];
      for (let i = 0; i < 4; i++) r.push(await at(mid(i)));
      const move = await at((keys[1] + keys[2]) / 2);
      await at(mid(3)); await wait(900); const end = read();
      root.querySelectorAll('[data-hs-go]')[2].click(); await wait(2500); const jumped = read();
      scrollTo({ top: 0, behavior: 'instant' }); await wait(200);
      const stage = root.querySelector('[data-hs-stage]').getBoundingClientRect();
      return { r, move, end, jumped, holds: holds.length, goes: root.querySelectorAll('[data-hs-go]').length, live: root.classList.contains('is-live'), pinned: getComputedStyle(root.querySelector('[data-hs-pin]')).position, canvas: !!canvas, full: Math.round(stage.width) === innerWidth, cta: root.querySelector('.hs__cta')?.getAttribute('href'), dir: root.querySelector('[data-hs-stage]').getAttribute('dir') };
    });
    const near = (s) => s.frame >= 0 && Math.abs(s.frame - Math.round(Math.min(s.t * FILM.desk.fps, FILM.desk.frames - 1))) <= 1;
    if (hotel.holds !== 4 || hotel.goes !== 4 || !hotel.live || hotel.pinned !== 'sticky' || !hotel.canvas || !hotel.full || !hotel.cta || hotel.dir !== 'ltr') problems.push(`hotel section ${JSON.stringify(hotel)}`);
    hotel.r.forEach((s, i) => {
      if (!(s.hold === String(i) && s.text === String(i) && s.current === i && s.on === (i === 3 ? '' : String(i)))) problems.push(`hotel hold ${i + 1} ${JSON.stringify(s)}`);
    });
    if (!(hotel.move.hold === 'move' && hotel.move.text === '' && hotel.move.on === '')) problems.push(`hotel move ${JSON.stringify(hotel.move)}`);
    if (!(hotel.end.parts === 3 && near(hotel.end))) problems.push(`hotel result ${JSON.stringify(hotel.end)}`);
    if (!hotel.r.slice(0, 3).every(near)) problems.push(`hotel film frames off the scroll ${JSON.stringify(hotel.r.map((s) => [s.t, s.frame]))}`);
    if (!(hotel.jumped.hold === '2' && hotel.jumped.text === '2')) problems.push(`hotel tab ${JSON.stringify(hotel.jumped)}`);
    // Why it matters, in three numbers (9 Nov 2026): three cards, two with a linked source, Book a demo on the third;
    // on a laptop the section pins and scrolling steps the cards sideways, one at a time
    const why = await page.evaluate(() => {
      const r = document.querySelector('[data-why]');
      return { cards: r.querySelectorAll('[data-why-card]').length, figures: [...r.querySelectorAll('.why__figure')].map((f) => f.textContent.trim()), sources: r.querySelectorAll('.why__source a[href^="https://"]').length, book: !!r.querySelector('[data-why-card]:nth-child(3) a[data-track="book_demo_click"]'), pin: r.classList.contains('is-pin'), dots: r.querySelectorAll('[data-why-go]').length, top: r.getBoundingClientRect().top + scrollY, range: r.offsetHeight - innerHeight };
    });
    const steps = [];
    for (const f of [0.1, 0.5, 0.9]) {
      await page.evaluate((y) => scrollTo(0, y), Math.round(why.top + f * why.range));
      await sleep(900);
      steps.push(await page.evaluate(() => ({ now: document.querySelector('[data-why-now]').textContent, on: [...document.querySelectorAll('[data-why-card]')].findIndex((c) => c.classList.contains('is-on')), visible: (() => { const c = document.querySelector('[data-why-card].is-on').getBoundingClientRect(); return c.left >= 0 && c.right <= innerWidth && c.top >= 0 && c.bottom <= innerHeight; })() })));
    }
    const figures = { en: '18% 7× €1,150', de: '18 % 7× 1.150 €', ar: '18% 7× €1,150', it: '18% 7× 1.150 €' }[lang];
    if (why.cards !== 3 || why.figures.join(' ') !== figures || why.sources !== 2 || !why.book || !why.pin || why.dots !== 3) problems.push(`why it matters ${JSON.stringify(why)}`);
    if (!steps.every((st, i) => st.now === String(i + 1) && st.on === i && st.visible)) problems.push(`why it matters steps ${JSON.stringify(steps)}`);
    // How it works on the homepage: one row of four steps and a link to the page; Getting set up and its snapping are gone
    const teaser = await page.evaluate(() => ({ steps: document.querySelectorAll('.teaser__steps li').length, link: document.querySelector('.teaser a')?.getAttribute('href'), setup: document.querySelectorAll('.setup, [data-panel]').length, snap: document.documentElement.classList.contains('setup-snap') }));
    if (teaser.steps !== 4 || teaser.link !== PAGES[lang][PAGES[lang].length - 1] || teaser.setup || teaser.snap) problems.push(`how it works teaser ${JSON.stringify(teaser)}`);
    // The systems band, straight under the hero: twenty-one real logos moving in an endless band (the set drawn twice), each
    // with its product name as alt text; logos are never links
    const band = await page.evaluate(() => {
      const set = document.querySelector('.band__set:not([aria-hidden])');
      const imgs = [...set.querySelectorAll('img')];
      const broken = imgs.filter((i) => !i.getAttribute('src').startsWith('/logos/integrations/')).length;
      const hero = document.querySelector('.hero');
      const after = (el) => {
        let next = el?.nextElementSibling;
        while (next && next.tagName !== 'SECTION') next = next.nextElementSibling;
        return next;
      };
      const next = after(hero);
      return { logos: imgs.length, sets: document.querySelectorAll('.band__set').length, alts: imgs.filter((i) => i.alt.length > 2).length, links: document.querySelectorAll('.band a').length, broken, afterHero: !!next?.matches('.works'), once: document.querySelectorAll('.works').length, spin: getComputedStyle(document.querySelector('.band__track')).animationDuration };
    });
    if (band.logos !== 21 || band.sets !== 2 || band.alts !== 21 || band.links || band.broken || !band.afterHero || band.once !== 1) problems.push(`logo band ${JSON.stringify(band)}`);
    const seconds = parseFloat(band.spin);
    if (!(seconds >= 70 && seconds <= 100)) problems.push(`logo band loop is ${band.spin}`);
    // Tyll is explained one way: the menu groups the six products into the three parts, and the homepage has no
    // second summary of them; none is marked Coming soon
    await go(page, `/${lang}/`);
    const product = await page.evaluate(() => ({
      report: !!document.querySelector('.hero__actions a[data-track="book_demo_click"]') && !!document.querySelector('#report form[data-report]'),
      parts: document.querySelectorAll('#solutions-panel .panel__head').length,
      repeats: document.querySelectorAll('.now').length,
      menuBadges: document.querySelectorAll('.panel__item .badge-soon').length,
    }));
    if (!product.report || product.parts !== 3 || product.repeats || product.menuBadges !== 0) problems.push(`homepage products ${JSON.stringify(product)}`);
    // The report form stays folded until asked for; the hero's button opens it, and it asks for one step at a time
    const form = await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const wrap = document.querySelector('[data-report-wrap]');
      const closed = !wrap.classList.contains('is-open') && document.querySelector('[data-report-panel]').getBoundingClientRect().height < 1;
      document.querySelector('[data-report-wrap] button').click();
      await wait(900);
      const panel = document.querySelector('[data-report-panel]').getBoundingClientRect().height;
      const openSteps = document.querySelectorAll('[data-step].is-open').length;
      document.querySelector('[data-step] [data-next]').click();
      await wait(200);
      const blocked = document.querySelector('[data-step]').classList.contains('is-open') && !document.querySelector('.report__error').hidden;
      return { closed, panel, openSteps, blocked };
    });
    if (!form.closed || form.panel < 200 || form.openSteps !== 1 || !form.blocked) problems.push(`report form ${JSON.stringify(form)}`);
    // The Solutions dropdown in the header still opens with all six solutions and the FAQ
    await go(page, `/${lang}/`);
    await page.click('#solutions-trigger');
    await sleep(500);
    const menu = await page.evaluate(() => ({ open: !document.getElementById('solutions-panel').hidden, items: [...document.querySelectorAll('#solutions-panel .panel__item')].map((a) => a.getAttribute('href')), faq: [...document.querySelectorAll('#solutions-panel a')].some((a) => /\/faq\/$/.test(a.getAttribute('href'))) }));
    if (!menu.open) problems.push('the Solutions dropdown did not open');
    if (menu.items.join() !== SOL[lang].join()) problems.push(`menu items ${menu.items.join()}`);
    if (!menu.faq) problems.push('FAQ missing from the Solutions menu');
    await page.keyboard.press('Escape');
    // Every solution from the menu: opens, one h1, its product explorer, and demo buttons that go to the configured demo
    for (const url of SOL[lang]) {
      await page.click('#solutions-trigger');
      await sleep(250);
      await Promise.all([page.waitForNavigation(), page.click(`#solutions-panel .panel__item[href="${url}"]`)]);
      const sol = await page.evaluate(() => ({
        path: location.pathname,
        h1: document.querySelectorAll('h1').length,
        steps: document.querySelectorAll('[data-film] [data-chapter]').length,
        demo: [...document.querySelectorAll('main a[data-track="explore_demo_click"]')].map((a) => a.getAttribute('href')),
        book: !!document.querySelector('main a[data-track="book_demo_click"]'),
      }));
      if (sol.path !== url || sol.h1 !== 1 || sol.steps < 3 || !sol.book) problems.push(`${url}: ${JSON.stringify(sol)}`);
      if (sol.demo.length && sol.demo.some((h) => !new URL(h).search && !new URL(h).pathname.match(/\/\w/))) problems.push(`${url}: demo link without a solution route`);
      // A chapter can be chosen, and the explanation follows
      await page.evaluate(() => document.querySelectorAll('[data-film] [data-chapter] button')[2].click());
      await sleep(1500);
      const part = await page.$eval('[data-film] .film__chapter.is-on', (c) => c.dataset.chapter);
      if (part !== '2') problems.push(`${url}: chapter did not change (${part})`);
    }
    await go(page, `/${lang}/`);
    // Book a Call from the header lands on the booking page
    await Promise.all([page.waitForNavigation(), page.click('.header__end a[data-track="book_demo_click"]')]);
    if (page.url() !== `${BASE}${PAGES[lang][1]}`) problems.push(`Book a Call went to ${page.url()}`);
    // Every page in this language: right lang and dir, all four hreflang links, language switch to the counterpart, no errors
    const other = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
    for (const [i, path] of PAGES[lang].entries()) {
      await go(page, path);
      const info = await page.evaluate(() => ({ lang: document.documentElement.lang, dir: document.documentElement.dir, title: document.title, desc: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href, alts: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.hreflang).join(','), h1s: document.querySelectorAll('h1').length }));
      if (info.lang !== lang) problems.push(`${path} lang=${info.lang}`);
      if (info.dir !== (lang === 'ar' ? 'rtl' : 'ltr')) problems.push(`${path} dir=${info.dir}`);
      if (!info.title || !info.desc || !info.canonical?.endsWith(path)) problems.push(`${path} missing title/description/canonical`);
      if (info.alts !== 'en,de,ar,it,x-default') problems.push(`${path} hreflang ${info.alts}`);
      if (info.h1s !== 1) problems.push(`${path} has ${info.h1s} h1`);
      await Promise.all([page.waitForNavigation(), page.evaluate((o) => document.querySelector(`.header .lang a[hreflang="${o}"]`).click(), other)]);
      if (new URL(page.url()).pathname !== PAGES[other][i]) problems.push(`switch from ${path} went to ${page.url()}`);
    }
    // FAQ: questions open and close with real buttons
    await go(page, PAGES[lang][2]);
    // Ten questions in three groups; the first is open on arrival; each is a real button that reports its state.
    const faq = await page.evaluate(() => {
      const items = [...document.querySelectorAll('.faq__item')];
      const state = (i) => ({ open: i.classList.contains('is-open'), aria: i.querySelector('button.faq__q').getAttribute('aria-expanded'), shown: getComputedStyle(i.querySelector('.faq__panel')).visibility === 'visible' });
      const first = state(items[0]);
      const second = items[1];
      const before = state(second);
      second.querySelector('button.faq__q').click();
      const opened = state(second);
      second.querySelector('button.faq__q').click();
      const closed = state(second);
      const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)).find((j) => j['@type'] === 'FAQPage') ?? {};
      return {
        count: items.length,
        groups: document.querySelectorAll('.faq__group').length,
        firstOpen: first.open && first.aria === 'true' && first.shown,
        toggles: !before.open && before.aria === 'false' && opened.open && opened.aria === 'true' && !closed.open && closed.aria === 'false',
        oneLinkEach: items.every((i) => i.querySelectorAll('.faq__answer a').length === 1),
        schemaClean: Array.isArray(schema.mainEntity) && schema.mainEntity.length > 0 && schema.mainEntity.every((q) => !/\[[^\]]+\]/.test(q.acceptedAnswer.text)),
      };
    });
    if (faq.count !== 10 || faq.groups !== 3) problems.push(`FAQ has ${faq.count} questions in ${faq.groups} groups, expected 10 in 3`);
    if (!faq.firstOpen) problems.push('FAQ: the first question is not open on arrival');
    if (!faq.toggles) problems.push('FAQ question did not open/close');
    if (!faq.oneLinkEach) problems.push('FAQ: an answer does not end with exactly one link');
    if (!faq.schemaClean) problems.push('FAQ structured data is missing or carries a placeholder');
    // Footer: email is a working mailto, cookie preferences opens the dialog
    const footer = await page.evaluate(() => ({ mail: [...document.querySelectorAll('.footer a')].some((a) => a.getAttribute('href') === 'mailto:info@tyll.ai'), prefs: !!document.querySelector('.footer [data-consent-open]') }));
    if (!footer.mail || !footer.prefs) problems.push('footer email or cookie preferences missing');
    await page.click('.footer [data-consent-open]');
    if (!(await page.$eval('#consent-dialog', (d) => d.open))) problems.push('cookie preferences did not open');
    if (page.errors.length) problems.push(`console: ${page.errors.join(' | ')}`);
    record(id, `${lang.toUpperCase()} visitor journey`, problems.length ? 'FAIL' : 'PASS', problems.join('; '));
  } catch (e) {
    // Report what went wrong, rather than letting a stuck page hide it
    record(id, `${lang.toUpperCase()} visitor journey`, 'FAIL', `${problems.join('; ')} | stopped: ${e.message}`);
  } finally {
    await Promise.race([page.ctx.close().catch(() => {}), sleep(15000)]);
  }
}

// Every internal link on every page answers 200
{
  const page = await freshPage();
  const links = new Set();
  for (const p of ALL) {
    await go(page, p);
    (await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href').split('#')[0]))).forEach((l) => links.add(l));
  }
  const bad = [];
  for (const l of links) { const r = await fetch(BASE + l); if (r.status !== 200) bad.push(`${l} ${r.status}`); }
  record('A/B', `Internal links (${links.size})`, bad.length ? 'FAIL' : 'PASS', bad.join(', '));
  await page.ctx.close();
}

// ── C: mobile ─────────────────────────────────────────────────────────────────────────────────────
{
  const page = await freshPage({ width: 390, height: 844, mobile: true });
  const problems = [];
  for (const p of ALL) {
    await go(page, p);
    const w = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: innerWidth,
      // Headings and buttons that are cut off or reach past the screen edge
      clipped: [...document.querySelectorAll('h1, h2, h3, .btn')].filter((e) => {
        const r = e.getBoundingClientRect();
        // Visually hidden headings (1px boxes for screen readers) are not on screen; cards in a sideways swipe strip
        // (Why it matters on phones) sit past the edge on purpose and are reached by swiping
        let a = e.parentElement;
        while (a && !['auto', 'scroll'].includes(getComputedStyle(a).overflowX)) a = a.parentElement;
        const inSwipe = !!a && a !== document.documentElement && a !== document.body;
        return r.width > 1 && (e.scrollWidth > e.clientWidth + 1 || (r.right > innerWidth + 1 && !inSwipe));
      }).map((e) => e.textContent.trim().slice(0, 30)),
    }));
    if (w.sw > w.iw) problems.push(`${p} scrolls sideways (${w.sw}px)`);
    if (w.clipped.length) problems.push(`${p} clipped: ${w.clipped.join(' | ')}`);
  }
  await go(page, '/de/');
  const bookVisible = await page.$eval('.header__end > a[data-track="book_demo_click"]', (a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.right <= innerWidth; });
  if (!bookVisible) problems.push('Book a Call not visible in the mobile header');
  await page.click('.header__burger');
  await sleep(300);
  const menu = await page.evaluate(() => ({ open: !document.getElementById('mobile-menu').hidden, focused: document.activeElement?.closest('#mobile-menu') != null, links: document.querySelectorAll('#mobile-menu a').length }));
  if (!menu.open || !menu.focused) problems.push('mobile menu did not open with focus inside');
  const mobileSolutions = await page.evaluate(() => document.querySelectorAll('#mobile-menu details li a').length);
  if (mobileSolutions !== 7) problems.push(`mobile menu has ${mobileSolutions} solution/FAQ links`);
  await page.keyboard.press('Escape');
  if (!(await page.$eval('#mobile-menu', (m) => m.hidden))) problems.push('Escape did not close the menu');
  // Heading and buttons fit on a phone
  const clipped = await page.evaluate(() => [...document.querySelectorAll('h1, h2, .btn')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent.trim().slice(0, 30)));
  if (clipped.length) problems.push(`clipped: ${clipped.join(', ')}`);
  record('C', 'Mobile (390px), all four languages: layout, menu, booking button', problems.length ? 'FAIL' : 'PASS', problems.join('; '));
  await page.ctx.close();
}

// ── M: Arabic right-to-left on a phone ────────────────────────────────────────────────────────────
{
  const page = await freshPage({ width: 390, height: 844, mobile: true });
  const p = [];
  await go(page, '/ar/');
  const head = await page.evaluate(() => {
    const logo = document.querySelector('.header__logo').getBoundingClientRect();
    const burger = document.querySelector('.header__burger').getBoundingClientRect();
    const h1 = document.querySelector('h1').getBoundingClientRect();
    return { logoRight: logo.right > innerWidth / 2, burgerLeft: burger.left < innerWidth / 2, h1Right: Math.round(innerWidth - h1.right), font: getComputedStyle(document.body).fontFamily, cta: document.querySelector('.hero__actions .btn').firstChild.textContent.trim() };
  });
  if (!head.logoRight || !head.burgerLeft) p.push(`header not mirrored ${JSON.stringify(head)}`);
  if (head.h1Right > 40) p.push(`headline not right-aligned (${head.h1Right}px from the right)`);
  if (!/Tyll Arabic/.test(head.font)) p.push(`Arabic font missing: ${head.font}`);
  if (!head.cta.endsWith('←')) p.push(`CTA arrow does not point left: "${head.cta}"`);
  const fontLoaded = await page.evaluate(async () => { await document.fonts.ready; return [...document.fonts].some((f) => f.family.includes('Tyll Arabic') && f.status === 'loaded'); });
  if (!fontLoaded) p.push('Arabic web font did not load');
  // Menu opens, solutions and FAQ in Arabic
  await page.click('.header__burger');
  await sleep(300);
  const menu = await page.evaluate(() => ({ open: !document.getElementById('mobile-menu').hidden, links: [...document.querySelectorAll('#mobile-menu details li a')].map((a) => a.getAttribute('href')) }));
  if (!menu.open || menu.links.length !== 7 || !menu.links.every((h) => h.startsWith('/ar/'))) p.push(`mobile menu ${JSON.stringify(menu)}`);
  await page.keyboard.press('Escape');
  // The hotel story stays inside the screen, and its scene reads left to right
  const story = await page.evaluate(() => {
    const out = [];
    if (document.querySelector('[data-hs-stage]').getAttribute('dir') !== 'ltr') out.push('scene direction');
    document.querySelectorAll('.hs__tabs, .hs__copy, .hs__stage').forEach((e) => { const r = e.getBoundingClientRect(); if (r.left < -1 || r.right > innerWidth + 1) out.push(e.className.split(' ')[0]); });
    if (document.documentElement.scrollWidth > innerWidth) out.push('page scrolls sideways');
    return out;
  });
  if (story.length) p.push(`story items outside the screen: ${story.join(', ')}`);
  // Booking page: text and email in place
  await go(page, '/ar/book-a-call/');
  const book = await page.evaluate(() => ({ mail: !!document.querySelector('a[href^="mailto:info@tyll.ai"]'), h1: document.querySelector('h1').textContent.trim() }));
  if (!book.mail || !book.h1) p.push('Arabic booking page incomplete');
  if (page.errors.length) p.push(`console: ${page.errors.join(' | ')}`);
  record('M', 'Arabic right-to-left on a phone: header, font, arrows, menu, story, viewer keys', p.length ? 'FAIL' : 'PASS', p.join('; '));
  await page.ctx.close();
}

// ── N: the four targeted refinements ──────────────────────────────────────────────────────────────
for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  const page = await freshPage({ width: w, height: h, mobile });
  const p = [];
  const where = mobile ? 'phone' : 'desktop';
  for (const lang of LANGS) {
    await go(page, `/${lang}/`);
    const home = await page.evaluate(() => ({
      shots: document.querySelectorAll('[data-hs-hold]').length,
      oldShelf: document.querySelectorAll('[data-story], [data-tour], .shot, .sample, .ticker').length,
      oldDiagram: document.querySelectorAll('[data-flow], [data-cine], .frag').length,
      book: !!document.querySelector('.hero__actions a.hero__book'),
      heroVideo: document.querySelectorAll('.hero video').length,
      // the owner's picture of the sunny square behind the words (10 Nov 2026), decorative; the header white on it
      heroPhoto: (() => { const i = document.querySelector('.hero__photo img'); return !!i && i.alt === '' && /\/media\/hero\/square-/.test(i.currentSrc) && i.complete && i.naturalWidth > 0; })(),
      headerTone: document.getElementById('site-header').dataset.tone,
      band: !!document.querySelector('.daily'),
      h1: document.querySelector('.hero h1').textContent.replace(/\s+/g, ' ').trim(),
      ctas: document.querySelectorAll('.hero__actions .btn').length,
      ar: document.querySelector('.lang a[hreflang="ar"]')?.textContent.trim(),
      codes: [...document.querySelectorAll('.header__end .lang a')].map((a) => a.querySelector('[aria-hidden="true"], .lang__ar').textContent.trim()).join(' '),
    }));
    if (home.shots !== 4) p.push(`${lang}: ${home.shots} holds in the hotel story`);
    if (home.oldShelf) p.push(`${lang}: removed story, example report or ticker still present`);
    if (home.oldDiagram) p.push(`${lang}: old diagram still present`);
    // Book a Call: the booking button is in the first screen, with the email and the Calendly note beside it
    await go(page, PAGES[lang][1]);
    const book = await page.evaluate(() => {
      const btn = document.querySelector('[data-booking-open]')?.getBoundingClientRect();
      return { first: btn && btn.bottom <= innerHeight, purpose: !!document.querySelector('.booking__purpose')?.textContent.trim(), mail: !!document.querySelector('.book__email a[href^="mailto:info@tyll.ai"]'), privacy: document.querySelector('.booking__privacy a')?.getAttribute('href'), photo: !!document.querySelector('.book__photo img') };
    });
    if (!book.first || !book.purpose || !book.mail || !/#calendly$/.test(book.privacy || '') || !book.photo) p.push(`${lang}: booking page ${JSON.stringify(book)}`);
    // Hero: only the headline and two buttons; the headline fits on screen
    await go(page, `/${lang}/`);
    const hero = await page.evaluate(() => {
      const h1 = document.querySelector('.hero h1'); const rg = document.createRange(); rg.selectNodeContents(h1);
      const rects = [...rg.getClientRects()].filter((x) => x.width > 0);
      return { fits: rects.every((x) => x.left >= 0 && x.right <= innerWidth), fs: parseFloat(getComputedStyle(h1).fontSize), overflow: document.documentElement.scrollWidth > innerWidth, extraText: document.querySelectorAll('.hero__inner p:not(.hero__sub)').length };
    });
    if (!hero.fits || hero.fs > 100 || hero.overflow || hero.extraText) p.push(`${lang}: hero ${JSON.stringify(hero)}`);
    // Each solution page ends with a link to all solutions
    await go(page, SOL[lang][0]);
    const all = await page.$eval('.others__all', (a) => a.getAttribute('href')).catch(() => null);
    if (all !== PAGES[lang][5]) p.push(`${lang}: All Solutions link ${all}`);
    // How it works (9 Nov 2026): a link beside Solutions in the header, and its page: four steps, three reassurances,
    // Book a demo at the top and the bottom, no sideways scroll
    await go(page, PAGES[lang][PAGES[lang].length - 1]);
    const how = await page.evaluate(() => ({ nav: document.querySelector('.header__nav .header__link')?.getAttribute('aria-current'), h1: document.querySelector('h1')?.textContent.trim(), steps: document.querySelectorAll('.steps .step').length, strip: document.querySelectorAll('.assure li').length, book: document.querySelectorAll('main a[data-track="book_demo_click"]').length, overflow: document.documentElement.scrollWidth > innerWidth }));
    if (how.steps !== 4 || how.strip !== 3 || how.book < 2 || !how.h1 || how.overflow || (!mobile && how.nav !== 'page')) p.push(`${lang}: how it works page ${JSON.stringify(how)}`);
    // The hero is a photograph with the words over it, no video; the dark How it works band is gone
    if (home.heroVideo || !home.heroPhoto || home.headerTone !== 'dark' || home.band) p.push(`${lang}: hero should be the square photograph ${JSON.stringify({ video: home.heroVideo, photo: home.heroPhoto, tone: home.headerTone, band: home.band })}`);
    if (lang === 'en' && home.h1 !== 'Know what your hotel lost last night. And what to buy next week.') p.push(`hero headline changed: "${home.h1}"`);
    if (home.ctas < 1 || home.ctas > 2 || !home.book) p.push(`${lang}: hero has ${home.ctas} buttons, book ${home.book}`);
    if (home.ar !== 'العربية') p.push(`${lang}: Arabic language label is "${home.ar}"`);
    if (!mobile && home.codes !== 'EN DE العربية IT') p.push(`${lang}: header languages "${home.codes}"`);
  }
  // The closing silver wave flows while on screen as one formation: every line changes, and all lines keep the
  // same shape (the gaps between neighbouring lines stay nearly constant along the ribbon)
  await go(page, '/en/');
  await page.$eval('.invite', (el) => el.scrollIntoView({ block: 'center' }));
  await sleep(1200);
  const wave = await page.evaluate(async () => {
    const paths = [...document.querySelectorAll('.invite__waves path')];
    const before = paths.map((x) => x.getAttribute('d'));
    await new Promise((r) => setTimeout(r, 900));
    const after = paths.map((x) => x.getAttribute('d'));
    // Sample each line's height at the same x positions and compare neighbouring lines
    const ys = paths.map((path) => [0.2, 0.4, 0.6, 0.8].map((f) => { const L = path.getTotalLength(); let lo = 0, hi = L; const box = path.getBBox(); const x = box.x + box.width * f; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (path.getPointAtLength(m).x < x) lo = m; else hi = m; } return path.getPointAtLength(lo).y; }));
    const gaps = ys.slice(1).map((row, i) => row.map((y, j) => y - ys[i][j]));
    const coherent = gaps.every((g) => g.every((v) => v > 0));
    return { lines: paths.length, changed: before.filter((d, i) => d !== after[i]).length, coherent };
  });
  if (wave.lines < 9 || wave.changed !== wave.lines || !wave.coherent) p.push(`closing wave ${JSON.stringify(wave)}`);
  // The film on every solution page: real recording, plays by itself on screen, chapters follow it, and chapters can be chosen
  for (const lang of ['en', 'ar']) {
    for (const url of SOL[lang]) {
      await go(page, url);
      await page.evaluate(() => document.querySelector('[data-film]').scrollIntoView({ block: 'center', behavior: 'instant' }));
      await sleep(2500);
      const film = await page.evaluate(async () => {
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const v = document.querySelector('[data-film] video');
        const a = { playing: !v.paused && v.currentTime > 0, src: v.currentSrc.split('/').pop(), texts: [...document.querySelectorAll('.film__text')].filter((t) => t.getBoundingClientRect().height > 0).length };
        const buttons = document.querySelectorAll('.film__chapter button');
        buttons[buttons.length - 1].click();
        await wait(1500);
        const on = document.querySelector('.film__chapter.is-on').dataset.chapter;
        document.querySelector('.film__toggle').click();
        await wait(200);
        return { ...a, on, last: String(buttons.length - 1), paused: v.paused };
      });
      if (!film.playing || film.texts !== 1 || film.on !== film.last || !film.paused) p.push(`${url}: film ${JSON.stringify(film)}`);
      if (mobile ? !/-phone\.mp4$/.test(film.src) : !/-desk\.mp4$/.test(film.src)) p.push(`${url}: wrong film ${film.src}`);
    }
  }
  if (page.errors.length) p.push(`console: ${page.errors.join(' | ')}`);
  record('N', `Refinements on ${where}: wave, product sequence, hero, solution films, العربية label, booking`, p.length ? 'FAIL' : 'PASS', p.join('; '));
  await page.ctx.close();
}

// ── P: the film fits at every width, in every language, with no sideways scrolling ──────────────────
{
  const p = [];
  let checked = 0;
  for (const [w, h, mobile] of [[1440, 900, false], [1280, 800, false], [1024, 768, false], [768, 1024, false], [390, 844, true]]) {
    const page = await freshPage({ width: w, height: h, mobile });
    for (const lang of LANGS) {
      for (const url of SOL[lang]) {
        await go(page, url);
        const r = await page.evaluate(() => {
          const v = document.querySelector('[data-film] video').getBoundingClientRect();
          const chapters = [...document.querySelectorAll('.film__chapter')].map((c) => c.getBoundingClientRect());
          return { over: document.documentElement.scrollWidth > innerWidth, inside: v.left >= -1 && v.right <= innerWidth + 1 && v.width > 100, chapters: chapters.every((c) => c.left >= -1 && c.right <= innerWidth + 1), tall: v.height <= innerHeight };
        });
        checked++;
        if (r.over || !r.inside || !r.chapters || !r.tall) p.push(`${w}px ${url}: ${JSON.stringify(r)}`);
      }
    }
    if (page.errors.length) p.push(`console at ${w}px: ${page.errors.join(' | ')}`);
    await page.ctx.close();
  }
  record('P', `Solution films fit: ${checked} pages, 4 languages, 5 widths`, p.length ? 'FAIL' : 'PASS', p.slice(0, 12).join('; '));
}

// ── Q: demo links carry the visitor's language ────────────────────────────────────────
{
  const p = [];
  const page = await freshPage();
  for (const lang of LANGS) {
    await go(page, SOL[lang][1]);
    const links = await page.$$eval('a[data-track="explore_demo_click"]', (a) => a.map((x) => x.href));
    if (links.some((h) => new URL(h).searchParams.get('lang') !== lang)) p.push(`${lang}: ${links.join(' ')}`);
  }
  await page.ctx.close();
  record('Q', 'Demo links carry the language', p.length ? 'FAIL' : 'PASS', p.join('; '));
}

// ── D + E: consent ────────────────────────────────────────────────────────────────────────────────
{
  const page = await freshPage();
  await go(page, '/en/');
  const cfg = await config(page);
  if (!cfg.banner) {
    record('D', 'Cookie rejection', 'BLOCKED', 'no analytics or Meta Pixel ID configured, so there is nothing to consent to and no banner');
    record('E', 'Cookie acceptance', 'BLOCKED', 'no analytics or Meta Pixel ID configured');
    if (page.trackerHits.length) record('D', 'No trackers without configuration', 'FAIL', page.trackerHits.join(', '));
    await page.ctx.close();
  } else {
    // D: reject
    const p1 = [];
    if (page.trackerHits.length) p1.push(`tracker requested before any choice: ${page.trackerHits[0]}`);
    if (!(await page.$eval('#consent-banner', (b) => !b.hidden))) p1.push('banner not shown on first visit');
    await page.click('[data-consent="reject"]');
    await sleep(800);
    await go(page, '/en/faq/');
    await sleep(800);
    if (await page.$eval('#consent-banner', (b) => !b.hidden)) p1.push('banner shown again after rejecting');
    if (page.trackerHits.length) p1.push(`tracker requested after rejecting: ${page.trackerHits[0]}`);
    const cookies = (await page.browserContext().cookies()).map((c) => c.name).filter((n) => /^_ga|^_fb/.test(n));
    if (cookies.length) p1.push(`tracking cookies set: ${cookies}`);
    record('D', 'Cookie rejection: nothing loads, choice remembered', p1.length ? 'FAIL' : 'PASS', p1.join('; '));
    await page.ctx.close();

    // E: accept, then withdraw marketing
    const page2 = await freshPage();
    const p2 = [];
    await go(page2, '/en/');
    await page2.click('[data-consent="accept"]');
    await sleep(1500);
    const ga = page2.trackerHits.some((u) => /googletagmanager|plausible/.test(u));
    const fb = page2.trackerHits.some((u) => /connect\.facebook\.net/.test(u));
    if (cfg.analytics && !ga) p2.push('analytics did not load after accepting');
    if (cfg.marketing && !fb) p2.push('Meta Pixel did not load after accepting');
    // Change preferences later: switch marketing off
    await page2.click('.footer [data-consent-open]');
    if (cfg.marketing) await page2.click('#consent-marketing');
    await page2.click('#consent-dialog button[value="save"]');
    await sleep(300);
    const stored = await page2.evaluate(() => JSON.parse(localStorage.getItem('tyll-consent')));
    if (cfg.marketing && stored.marketing) p2.push('marketing still stored as allowed after switching off');
    page2.trackerHits = [];
    await go(page2, '/en/book-a-call/');
    await sleep(1200);
    if (cfg.marketing && page2.trackerHits.some((u) => /facebook/.test(u))) p2.push('Meta Pixel loaded after consent was withdrawn');
    if (cfg.analytics && !page2.trackerHits.some((u) => /googletagmanager|plausible/.test(u))) p2.push('analytics stopped although still allowed');
    record('E', 'Cookie acceptance and later withdrawal', p2.length ? 'FAIL' : 'PASS', p2.join('; '));
    await page2.ctx.close();
  }
}

// ── F: booking ────────────────────────────────────────────────────────────────────────────────────
{
  const page = await freshPage();
  await go(page, '/en/book-a-call/');
  const state = await page.evaluate(() => document.querySelector('[data-booking]')?.dataset.state ?? (document.querySelector('.booking__unavailable') ? 'unavailable' : 'none'));
  if (state === 'unavailable') {
    const mail = await page.$eval('.booking__unavailable a', (a) => a.getAttribute('href'));
    record('F', 'Booking with Calendly', 'BLOCKED', `no approved Calendly event configured; page offers email instead (${mail.split('?')[0]})`);
  } else {
    const p = [];
    let calendlyBeforeClick = 0;
    page.on('request', (r) => /calendly/.test(r.url()) && calendlyBeforeClick++);
    if (state !== 'consent' || calendlyBeforeClick) p.push('Calendly loaded before the visitor chose to open it');
    await page.click('[data-booking-open]');
    for (let i = 0; i < 20 && (await page.$eval('[data-booking]', (b) => b.dataset.state)) === 'loading'; i++) await sleep(1000);
    const after = await page.$eval('[data-booking]', (b) => b.dataset.state);
    if (after !== 'ready') p.push(`calendar state after opening: ${after}`);
    record('F', 'Booking calendar opens after consent (no booking made)', p.length ? 'FAIL' : 'PASS', p.join('; '));
  }
  await page.ctx.close();
}

// ── G: demo ───────────────────────────────────────────────────────────────────────────────────────
{
  const page = await freshPage();
  await go(page, '/en/');
  const { demo } = await config(page);
  await page.ctx.close();
  if (!demo.length) record('G', 'Public demo link', 'BLOCKED', 'PUBLIC_DEMO_URL not set or localhost in a production build: demo buttons hidden');
  else {
    const hosts = [...new Set(demo.map((d) => new URL(d.href).host))];
    const local = hosts.some((h) => /localhost|127\.0\.0\.1/.test(h));
    const unsafe = demo.filter((d) => d.target !== '_blank' || !d.rel.includes('noopener'));
    let reachable = true;
    try { await fetch(demo[0].href, { redirect: 'manual' }); } catch { reachable = false; }
    const where = demo.map((d) => d.from).join(', ');
    if (unsafe.length) record('G', 'Demo links', 'FAIL', `missing target/rel on ${unsafe.map((d) => d.from)}`);
    else if (local) record('G', 'Public demo link', 'BLOCKED', `buttons (${where}) point to a local demo (${hosts}); not publicly available`);
    else record('G', 'Public demo link', reachable ? 'PASS' : 'FAIL', `${hosts} on ${where}`);
  }
}

// ── H: accessibility basics ───────────────────────────────────────────────────────────────────────
{
  const page = await freshPage({ reduce: true });
  const p = [];
  await go(page, '/en/');
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => ({ cls: document.activeElement.className, outline: getComputedStyle(document.activeElement).outlineStyle }));
  if (!String(first.cls).includes('skip-link')) p.push('first Tab stop is not the skip link');
  // Reduced motion: video does not start, checkmarks are fully drawn, step text visible
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1200);
  const motion = await page.evaluate(() => ({
    playing: !!document.querySelector('.hero video'),
    hiddenMarks: [...document.querySelectorAll('.ck-s, .ck-l')].filter((e) => (e.getAttribute('transform') || 'translate(0 0)') !== 'translate(0 0)').length,
    hiddenText: [...document.querySelectorAll('.step__text')].filter((e) => getComputedStyle(e).opacity !== '1').length,
    toggle: !!document.querySelector('.hero__toggle:not([hidden])'),
  }));
  const still = await page.evaluate(() => {
    const hs = document.querySelector('[data-hs]');
    const band = document.querySelector('.band__set[aria-hidden]');
    return { hotelStill: hs.classList.contains('is-still'), stillsOn: hs.querySelectorAll('.hs__still.is-on').length, canvasShown: getComputedStyle(hs.querySelector('[data-hs-film]')).display !== 'none', bandAnimation: getComputedStyle(document.querySelector('.band__track')).animationName, secondSet: getComputedStyle(band).display, wrap: getComputedStyle(document.querySelector('.band__set')).flexWrap };
  });
  if (!still.hotelStill || still.stillsOn !== 1 || still.canvasShown) p.push(`hotel film not shown as one still per stage under reduced motion: ${JSON.stringify(still)}`);
  if (still.bandAnimation !== 'none' || still.secondSet !== 'none' || still.wrap !== 'wrap') p.push(`logo band not a still grid under reduced motion: ${JSON.stringify(still)}`);
  // Reduced motion: the three numbers are stacked
  const calm = await page.evaluate(() => ({ pin: document.querySelector('[data-why]').classList.contains('is-pin'), track: getComputedStyle(document.querySelector('[data-why-track]')).display }));
  if (calm.pin || calm.track !== 'grid') p.push(`three numbers not stacked under reduced motion: ${JSON.stringify(calm)}`);
  if (motion.playing) p.push('hero video plays despite reduced motion');
  const wavePaused = await page.evaluate(async () => {
    const path = document.querySelector('.invite__waves path');
    const d = path.getAttribute('d');
    await new Promise((r) => setTimeout(r, 600));
    return path.getAttribute('d') === d;
  });
  if (!wavePaused) p.push('closing wave moves despite reduced motion');
  if (motion.hiddenMarks || motion.hiddenText) p.push('content hidden under reduced motion');
  if (motion.toggle) p.push('a video play/pause control is left in the still hero');
  // Images have alt text, buttons and links have names
  const unnamed = await page.evaluate(() => [...document.querySelectorAll('a, button')].filter((e) => !(e.textContent.trim() || e.getAttribute('aria-label'))).length);
  const noAlt = await page.evaluate(() => [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length);
  if (unnamed) p.push(`${unnamed} links/buttons without a name`);
  if (noAlt) p.push(`${noAlt} images without alt`);
  // Headings in order on each page (no jumps such as h1 → h3)
  for (const path of ALL) {
    await go(page, path);
    const jumps = await page.evaluate(() => { const l = [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map((h) => +h.tagName[1]); return l.filter((v, i) => i && v > l[i - 1] + 1).length; });
    if (jumps) p.push(`${path}: heading level skipped`);
  }
  record('H', 'Accessibility: keyboard, reduced motion, names, headings', p.length ? 'FAIL' : 'PASS', p.join('; '));
  await page.ctx.close();
}

// ── I: weight of the first homepage load ──────────────────────────────────────────────────────────
{
  const page = await freshPage({ width: 390, height: 844, mobile: true });
  let bytes = 0;
  const big = [];
  page.on('response', async (r) => {
    const len = +(r.headers()['content-length'] || 0) || (await r.buffer().then((b) => b.length).catch(() => 0));
    bytes += len;
    if (len > 300_000) big.push(`${r.url().split('/').pop().slice(0, 40)} ${Math.round(len / 1024)} KB`);
  });
  await go(page, '/en/');
  await sleep(1500);
  const kb = Math.round(bytes / 1024);
  record('I', `Homepage first load on a phone: ${kb} KB`, kb < 2500 ? 'PASS' : 'FAIL', big.length ? `large: ${big.join(', ')}` : '');
  await page.ctx.close();
}

// ── J: the demo project is untouched ──────────────────────────────────────────────────────────────
{
  const demo = `${homedir()}/tyll-demo`;
  if (!existsSync(demo)) record('J', 'Demo project untouched', 'BLOCKED', `${demo} not found`);
  else {
    const changed = execSync(`git -C "${demo}" status --porcelain --untracked-files=no`).toString().trim();
    const head = execSync(`git -C "${demo}" rev-parse --short HEAD`).toString().trim();
    record('J', 'Demo project untouched', changed ? 'FAIL' : 'PASS', changed ? changed : `no tracked changes, HEAD ${head}`);
  }
}

await browser.close();

const icon = { PASS: '✓', FAIL: '✗', BLOCKED: '–' };
for (const r of results) console.log(`${icon[r.status]} ${r.status.padEnd(7)} ${r.id.padEnd(4)} ${r.name}${r.detail ? `\n                ${r.detail}` : ''}`);
const counts = Object.fromEntries(['PASS', 'FAIL', 'BLOCKED'].map((s) => [s, results.filter((r) => r.status === s).length]));
console.log(`\n${counts.PASS} passed, ${counts.FAIL} failed, ${counts.BLOCKED} blocked by missing setup`);
process.exitCode = counts.FAIL ? 1 : 0;
