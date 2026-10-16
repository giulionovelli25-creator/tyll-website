// Browser tests for the visitor journeys in the Step 2 brief (tests A–J), plus Arabic and Italian (K–M) and the
// four targeted refinements (N: story without connector, hero footage, three-step "How Tyll helps", العربية label).
// Runs against a running dev or preview server (default http://localhost:4321) using the installed Google Chrome.
//   npm run dev            (in one terminal)
//   npm run test:e2e       (in another)
// Every request to Google, Plausible or Meta is intercepted and blocked, so tests never send data to them;
// the tests only check whether the site *tried* to contact them. Results: PASS, FAIL or BLOCKED (missing setup).

import puppeteer from 'puppeteer-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';

const BASE = process.env.BASE_URL || 'http://localhost:4321';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TRACKERS = /googletagmanager\.com|google-analytics\.com|plausible\.io|connect\.facebook\.net|facebook\.com\/tr/;
const SOL = {
  en: ['stock-waste', 'finance-money', 'forecasting-purchasing', 'events-staffing', 'rooms-guest-experience', 'sales-performance'].map((s) => `/en/solutions/${s}/`),
  de: ['lager-abfall', 'finanzen', 'prognose-einkauf', 'events-personal', 'zimmer-gaeste', 'vertrieb-performance'].map((s) => `/de/loesungen/${s}/`),
  ar: ['stock-waste', 'finance-money', 'forecasting-purchasing', 'events-staffing', 'rooms-guest-experience', 'sales-performance'].map((s) => `/ar/solutions/${s}/`),
  it: ['magazzino-sprechi', 'finanza', 'previsioni-acquisti', 'eventi-personale', 'camere-ospiti', 'vendite-performance'].map((s) => `/it/soluzioni/${s}/`),
};
const LANGS = ['en', 'de', 'ar', 'it'];
// Same order in every language, so index i is the same page
const PAGES = {
  en: ['/en/', '/en/book-a-call/', '/en/faq/', '/en/legal-notice/', '/en/privacy/', '/en/solutions/', ...SOL.en],
  de: ['/de/', '/de/gespraech-buchen/', '/de/faq/', '/de/impressum/', '/de/datenschutz/', '/de/loesungen/', ...SOL.de],
  ar: ['/ar/', '/ar/book-a-call/', '/ar/faq/', '/ar/legal-notice/', '/ar/privacy/', '/ar/solutions/', ...SOL.ar],
  it: ['/it/', '/it/prenota-una-chiamata/', '/it/faq/', '/it/note-legali/', '/it/privacy/', '/it/soluzioni/', ...SOL.it],
};
const ALL = LANGS.flatMap((l) => PAGES[l]);

const results = [];
const record = (id, name, status, detail = '') => results.push({ id, name, status, detail });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });

/** A fresh, isolated browser profile (no stored consent) with tracker requests blocked and recorded. */
async function freshPage({ width = 1440, height = 900, mobile = false, reduce = false } = {}) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
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
    if (!/One hotel|Ein Hotel|فندق واحد|Un hotel/.test(h1)) problems.push(`hero headline is "${h1}"`);
    // The Before → With Tyll story follows scroll position, reverses, and lets the page continue afterwards
    const story = await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const track = document.querySelector('.story__track');
      const top = track.getBoundingClientRect().top + scrollY;
      const op = (sel) => +getComputedStyle(document.querySelector(sel)).opacity;
      const at = async (y) => { scrollTo({ top: y, behavior: 'instant' }); await wait(500); return { before: op('.label--before'), after: op('.label--after'), view: op('.view') }; };
      const start = await at(top - 72);
      const end = await at(top - 72 + track.offsetHeight - (innerHeight - 72));
      const back = await at(top - 72);
      scrollTo({ top: top + track.offsetHeight + 200, behavior: 'instant' }); await wait(300);
      const beyond = scrollY > top + track.offsetHeight;
      return { scrolly: document.querySelector('.story').classList.contains('is-scrolly'), start, end, back, beyond };
    });
    if (!story.scrolly) problems.push('story is not scroll-driven');
    if (!(story.start.before > 0.9 && story.start.after < 0.1)) problems.push(`story start ${JSON.stringify(story.start)}`);
    if (!(story.end.after > 0.9 && story.end.view > 0.9 && story.end.before < 0.1)) problems.push(`story end ${JSON.stringify(story.end)}`);
    if (!(story.back.before > 0.9 && story.back.after < 0.1)) problems.push('story did not reverse when scrolling back');
    if (!story.beyond) problems.push('page did not continue past the story');
    // "Explore Solutions" in the hero and the closing section go to the overview page with all six solutions
    for (const sel of ['.hero__actions a[data-track="explore_solutions_click"]', '.invite__actions a[data-track="explore_solutions_click"]']) {
      await go(page, `/${lang}/`);
      await page.$eval(sel, (a) => a.scrollIntoView({ block: 'center' }));
      await Promise.all([page.waitForNavigation(), page.click(sel)]);
      const overview = await page.evaluate(() => ({ path: location.pathname, tiles: [...document.querySelectorAll('.tiles a')].map((a) => a.getAttribute('href')) }));
      if (overview.path !== PAGES[lang][5] || overview.tiles.join() !== SOL[lang].join()) problems.push(`Explore Solutions (${sel.split(' ')[0]}) → ${JSON.stringify(overview)}`);
    }
    // The Solutions dropdown in the header still opens with all six solutions and the FAQ
    await go(page, `/${lang}/`);
    await page.click('#solutions-trigger');
    await sleep(500);
    const menu = await page.evaluate(() => ({ open: !document.getElementById('solutions-panel').hidden, items: [...document.querySelectorAll('#solutions-panel .panel__item')].map((a) => a.getAttribute('href')), faq: [...document.querySelectorAll('#solutions-panel a')].some((a) => /\/faq\/$/.test(a.getAttribute('href'))) }));
    if (!menu.open) problems.push('the Solutions dropdown did not open');
    if (menu.items.join() !== SOL[lang].join()) problems.push(`menu items ${menu.items.join()}`);
    if (!menu.faq) problems.push('FAQ missing from the Solutions menu');
    await page.keyboard.press('Escape');
    // Every solution from the menu: opens, one h1, its walkthrough, and demo buttons that go to the configured demo
    for (const url of SOL[lang]) {
      await page.click('#solutions-trigger');
      await sleep(250);
      await Promise.all([page.waitForNavigation(), page.click(`#solutions-panel .panel__item[href="${url}"]`)]);
      const sol = await page.evaluate(() => ({
        path: location.pathname,
        h1: document.querySelectorAll('h1').length,
        steps: document.querySelectorAll('[data-walk] .walk__step').length,
        demo: [...document.querySelectorAll('main a[data-track="explore_demo_click"]')].map((a) => a.getAttribute('href')),
        book: !!document.querySelector('main a[data-track="book_call_click"]'),
      }));
      if (sol.path !== url || sol.h1 !== 1 || sol.steps < 4 || !sol.book) problems.push(`${url}: ${JSON.stringify(sol)}`);
      if (sol.demo.length && sol.demo.some((h) => !new URL(h).search && !new URL(h).pathname.match(/\/\w/))) problems.push(`${url}: demo link without a solution route`);
      // The walkthrough steps can be chosen
      await page.evaluate(() => document.querySelectorAll('[data-walk] .walk__step')[2].click());
      if (!(await page.$eval('[data-walk] .walk__step:nth-child(1)', () => document.querySelectorAll('[data-walk] .walk__step')[2].hasAttribute('aria-current')))) problems.push(`${url}: walkthrough step did not change`);
    }
    await go(page, `/${lang}/`);
    // Book a Call from the header lands on the booking page
    await Promise.all([page.waitForNavigation(), page.click('.header__end a[data-track="book_call_click"]')]);
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
    // FAQ: questions open and close with the keyboard-accessible <details>
    await go(page, PAGES[lang][2]);
    const faqOk = await page.evaluate(() => { const d = document.querySelector('.faq__item'); d.querySelector('summary').click(); const opened = d.open; d.querySelector('summary').click(); return opened && !d.open; });
    if (!faqOk) problems.push('FAQ question did not open/close');
    // Footer: email is a working mailto, cookie preferences opens the dialog
    const footer = await page.evaluate(() => ({ mail: [...document.querySelectorAll('.footer a')].some((a) => a.getAttribute('href') === 'mailto:info@tyll.ai'), prefs: !!document.querySelector('.footer [data-consent-open]') }));
    if (!footer.mail || !footer.prefs) problems.push('footer email or cookie preferences missing');
    await page.click('.footer [data-consent-open]');
    if (!(await page.$eval('#consent-dialog', (d) => d.open))) problems.push('cookie preferences did not open');
    if (page.errors.length) problems.push(`console: ${page.errors.join(' | ')}`);
    record(id, `${lang.toUpperCase()} visitor journey`, problems.length ? 'FAIL' : 'PASS', problems.join('; '));
  } finally {
    await page.ctx.close();
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
        // Visually hidden headings (1px boxes for screen readers) are not on screen
        return r.width > 1 && (e.scrollWidth > e.clientWidth + 1 || r.right > innerWidth + 1);
      }).map((e) => e.textContent.trim().slice(0, 30)),
      // Every walkthrough screen fits inside its frame (never cropped)
      cropped: [...document.querySelectorAll('.walk__slide img, .steps__frame img')].filter((img) => {
        const f = img.closest('.walk__frame, .steps__frame').getBoundingClientRect();
        const r = img.getBoundingClientRect();
        return r.top < f.top - 1 || r.bottom > f.bottom + 1 || r.left < f.left - 1 || r.right > f.right + 1;
      }).map((img) => img.getAttribute('src').split('?')[0].split('/').pop().slice(0, 30)),
    }));
    if (w.sw > w.iw) problems.push(`${p} scrolls sideways (${w.sw}px)`);
    if (w.cropped.length) problems.push(`${p} walkthrough screens cut off: ${w.cropped.join(', ')}`);
    if (w.clipped.length) problems.push(`${p} clipped: ${w.clipped.join(' | ')}`);
  }
  await go(page, '/de/');
  const bookVisible = await page.$eval('.header__end > a[data-track="book_call_click"]', (a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.right <= innerWidth; });
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
    return { logoRight: logo.right > innerWidth / 2, burgerLeft: burger.left < innerWidth / 2, h1Right: Math.round(innerWidth - h1.right), font: getComputedStyle(document.body).fontFamily, cta: document.querySelector('.hero__actions .btn').textContent.trim() };
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
  // The story labels stay inside the screen at start and end
  const story = await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const t = document.querySelector('.story__track');
    const top = t.getBoundingClientRect().top + scrollY;
    const out = [];
    for (const f of [0.05, 1]) {
      scrollTo({ top: top + (t.offsetHeight - innerHeight) * f, behavior: 'instant' });
      await wait(500);
      document.querySelectorAll('.story .label, .story h2, .story .frag, .story .view').forEach((e) => {
        const r = e.getBoundingClientRect();
        if (+getComputedStyle(e).opacity > 0.5 && r.width && (r.left < -1 || r.right > innerWidth + 1)) out.push(e.className.split(' ')[0]);
      });
    }
    return out;
  });
  if (story.length) p.push(`story items outside the screen: ${story.join(', ')}`);
  // Walkthrough: the viewer's arrow keys follow the reading direction
  await go(page, '/ar/solutions/rooms-guest-experience/');
  await page.evaluate(() => document.querySelector('.walk__slide.is-active').click());
  await sleep(500);
  const t0 = await page.$eval('.viewer__title', (e) => e.textContent);
  await page.keyboard.press('ArrowLeft');
  await sleep(300);
  const t1 = await page.$eval('.viewer__title', (e) => e.textContent);
  if (!t0.includes('1 /') || !t1.includes('2 /')) p.push(`ArrowLeft in Arabic should go to the next screen: ${t0} → ${t1}`);
  await page.keyboard.press('Escape');
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
      connector: document.querySelectorAll('.story .link, .story svg path[d=""]').length,
      env: !!document.querySelector('.stage .env__wall') && !document.querySelector('.stage__photo, .stage__veil'),
      slots: [...document.querySelectorAll('.view [data-target]')].map((e) => e.dataset.target).sort().join(),
      frags: document.querySelectorAll('.story [data-frag]').length,
      sources: [...document.querySelectorAll('.hero video source')].map((s) => s.getAttribute('src')),
      h1: document.querySelector('.hero h1').textContent.replace(/\s+/g, ' ').trim(),
      ctas: document.querySelectorAll('.hero__actions .btn').length,
      ar: document.querySelector('.lang a[hreflang="ar"]')?.textContent.trim(),
      codes: [...document.querySelectorAll('.header__end .lang a')].map((a) => a.querySelector('[aria-hidden="true"], .lang__ar').textContent.trim()).join(' '),
    }));
    if (home.connector) p.push(`${lang}: the POS–Stock connector is still in the story`);
    if (home.frags !== 4) p.push(`${lang}: story has ${home.frags} fragments`);
    if (!home.env) p.push(`${lang}: story background is not the new pearl environment`);
    if (home.slots !== 'ev-pos,ev-stock,task-0,task-1') p.push(`${lang}: overview places ${home.slots}`);
    // Book a Call: the booking button is in the first screen, with the email and the Calendly note beside it
    await go(page, PAGES[lang][1]);
    const book = await page.evaluate(() => {
      const btn = document.querySelector('[data-booking-open]')?.getBoundingClientRect();
      return { first: btn && btn.bottom <= innerHeight, purpose: !!document.querySelector('.booking__purpose')?.textContent.trim(), mail: !!document.querySelector('.book__email a[href^="mailto:info@tyll.ai"]'), privacy: document.querySelector('.booking__privacy a')?.getAttribute('href'), photo: !!document.querySelector('.book__photo img') };
    });
    if (!book.first || !book.purpose || !book.mail || !/#calendly$/.test(book.privacy || '') || !book.photo) p.push(`${lang}: booking page ${JSON.stringify(book)}`);
    // Hero: headline fits on screen, one supporting sentence
    await go(page, `/${lang}/`);
    const hero = await page.evaluate(() => {
      const h1 = document.querySelector('.hero h1'); const rg = document.createRange(); rg.selectNodeContents(h1);
      const rects = [...rg.getClientRects()].filter((x) => x.width > 0);
      return { fits: rects.every((x) => x.left >= 0 && x.right <= innerWidth), fs: parseFloat(getComputedStyle(h1).fontSize), sentences: document.querySelector('.hero__body').textContent.trim().split(/[.!?。]\s|\.$/).filter(Boolean).length };
    });
    if (!hero.fits || hero.fs > 100 || hero.sentences !== 1) p.push(`${lang}: hero ${JSON.stringify(hero)}`);
    // Each solution page ends with a link to all solutions
    await go(page, SOL[lang][0]);
    const all = await page.$eval('.others__all', (a) => a.getAttribute('href')).catch(() => null);
    if (all !== PAGES[lang][5]) p.push(`${lang}: All Solutions link ${all}`);
    if (!home.sources.some((s) => /hero-operations/.test(s)) || home.sources.some((s) => /reception/.test(s))) p.push(`${lang}: hero video sources ${home.sources}`);
    if (lang === 'en' && home.h1 !== 'One hotel. Many systems. Finally connected.') p.push(`hero headline changed: "${home.h1}"`);
    if (home.ctas !== 2) p.push(`${lang}: hero has ${home.ctas} buttons`);
    if (home.ar !== 'العربية') p.push(`${lang}: Arabic language label is "${home.ar}"`);
    if (!mobile && home.codes !== 'EN DE العربية IT') p.push(`${lang}: header languages "${home.codes}"`);
  }
  // "See what changes ↓" invites the first scroll on wide screens and disappears once the change starts
  if (!mobile) {
    await go(page, '/en/');
    const cue = await page.evaluate(async () => {
      const t = document.querySelector('.story__track'); const c = document.querySelector('.cue');
      const at = async (f) => { scrollTo({ top: t.getBoundingClientRect().top + scrollY - 72 + (t.offsetHeight - innerHeight + 72) * f, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 400)); return +getComputedStyle(c).opacity; };
      return { start: await at(0), later: await at(0.2) };
    });
    if (!(cue.start > 0.9 && cue.later < 0.05)) p.push(`story cue ${JSON.stringify(cue)}`);
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
  // The video actually plays (when motion is allowed) and can be paused
  await go(page, '/en/');
  await sleep(1500);
  const video = await page.evaluate(async () => {
    const v = document.querySelector('.hero video');
    const playing = !v.paused && v.currentTime > 0;
    document.querySelector('.hero__toggle').click();
    await new Promise((r) => setTimeout(r, 200));
    return { playing, src: v.currentSrc.split('/').pop(), pausedAfter: v.paused, w: v.videoWidth };
  });
  if (!video.playing || !video.pausedAfter) p.push(`hero video ${JSON.stringify(video)}`);
  if (mobile ? video.w !== 1280 : video.w !== 1920) p.push(`hero video on ${where} is ${video.w}px wide (${video.src})`);
  // Three steps on every solution page: click or tap, keyboard, one panel at a time, nothing cropped
  for (const lang of ['en', 'ar']) {
    for (const url of SOL[lang]) {
      await go(page, url);
      await page.evaluate(() => document.querySelector('.steps').scrollIntoView({ block: 'center' }));
      const tabs = await page.$$('.steps__tab');
      if (tabs.length !== 3) { p.push(`${url}: ${tabs.length} steps`); continue; }
      const state = () => page.evaluate(() => ({
        selected: [...document.querySelectorAll('.steps__tab')].findIndex((t) => t.getAttribute('aria-selected') === 'true'),
        visible: [...document.querySelectorAll('.steps__panel')].filter((x) => getComputedStyle(x).visibility === 'visible').length,
        inert: [...document.querySelectorAll('.steps__panel')].filter((x) => x.inert).length,
        text: document.querySelector('.steps__panel.is-active .steps__text')?.textContent.trim().length,
      }));
      if (mobile) await tabs[1].tap(); else await tabs[1].click();
      await sleep(600);
      const a = await state();
      await page.focus('.steps__tab[aria-selected="true"]');
      await page.keyboard.press(lang === 'ar' ? 'ArrowLeft' : 'ArrowRight');
      await sleep(600);
      const b = await state();
      await page.keyboard.press('Home');
      await sleep(600);
      const c = await state();
      if (a.selected !== 1 || b.selected !== 2 || c.selected !== 0) p.push(`${url}: steps selected ${a.selected}/${b.selected}/${c.selected}`);
      if (a.visible !== 1 || a.inert !== 2 || !a.text) p.push(`${url}: panels ${JSON.stringify(a)}`);
      const shot = await page.evaluate(() => {
        const img = document.querySelector('.steps__panel.is-active .steps__frame img');
        const f = img.closest('.steps__frame').getBoundingClientRect();
        const r = img.getBoundingClientRect();
        return { fits: r.top >= f.top - 1 && r.bottom <= f.bottom + 1 && r.left >= f.left - 1 && r.right <= f.right + 1, fit: getComputedStyle(img).objectFit, loaded: img.complete && img.naturalWidth > 0 };
      });
      if (!shot.fits || shot.fit !== 'contain' || !shot.loaded) p.push(`${url}: step screen ${JSON.stringify(shot)}`);
    }
  }
  if (page.errors.length) p.push(`console: ${page.errors.join(' | ')}`);
  record('N', `Refinements on ${where}: wave, story environment and places, hero footage, three steps, العربية label, booking`, p.length ? 'FAIL' : 'PASS', p.join('; '));
  await page.ctx.close();
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
    playing: !document.querySelector('.hero video').paused,
    hiddenMarks: [...document.querySelectorAll('.ck-s, .ck-l')].filter((e) => (e.getAttribute('transform') || 'translate(0 0)') !== 'translate(0 0)').length,
    hiddenText: [...document.querySelectorAll('.step__text')].filter((e) => getComputedStyle(e).opacity !== '1').length,
    toggle: !!document.querySelector('.hero__toggle:not([hidden])'),
  }));
  const still = await page.evaluate(() => ({ scrolly: document.querySelector('.story').classList.contains('is-scrolly'), before: getComputedStyle(document.querySelector('.label--before')).opacity, after: getComputedStyle(document.querySelector('.label--after')).opacity }));
  if (still.scrolly || still.before !== '1' || still.after !== '1') p.push(`story not shown as still pictures: ${JSON.stringify(still)}`);
  if (motion.playing) p.push('hero video plays despite reduced motion');
  const wavePaused = await page.evaluate(async () => {
    const path = document.querySelector('.invite__waves path');
    const d = path.getAttribute('d');
    await new Promise((r) => setTimeout(r, 600));
    return path.getAttribute('d') === d;
  });
  if (!wavePaused) p.push('closing wave moves despite reduced motion');
  if (motion.hiddenMarks || motion.hiddenText) p.push('content hidden under reduced motion');
  if (!motion.toggle) p.push('no video play/pause control');
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
