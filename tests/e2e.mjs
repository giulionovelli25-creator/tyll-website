// Browser tests for the visitor journeys in the Step 2 brief (tests A–J).
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
const PAGES = {
  en: ['/en/', '/en/book-a-call/', '/en/faq/', '/en/legal-notice/', '/en/privacy/'],
  de: ['/de/', '/de/gespraech-buchen/', '/de/faq/', '/de/impressum/', '/de/datenschutz/'],
};

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

// ── A + B: full journey in English and German ─────────────────────────────────────────────────────
for (const lang of ['en', 'de']) {
  const id = lang === 'en' ? 'A' : 'B';
  const page = await freshPage();
  const problems = [];
  try {
    await go(page, `/${lang}/`);
    const h1 = await page.$eval('h1', (e) => e.textContent.trim());
    if (!/One hotel|Ein Hotel/.test(h1)) problems.push(`hero headline is "${h1}"`);
    for (const [label, hash] of [['nav how', '#how'], ['nav solutions', '#solutions']]) {
      await page.evaluate((h) => document.querySelector(`.header__nav a[href$="${h}"]`).click(), hash);
      await sleep(900);
      const inView = await page.evaluate((h) => { const r = document.querySelector(h).getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }, hash);
      if (!inView) problems.push(`${label} did not scroll to ${hash}`);
    }
    // Book a Call from the header lands on the booking page
    await Promise.all([page.waitForNavigation(), page.click('.header__end a[data-track="book_call_click"]')]);
    if (page.url() !== `${BASE}${PAGES[lang][1]}`) problems.push(`Book a Call went to ${page.url()}`);
    // Every page in this language: right lang attribute, language switch to the counterpart, no errors
    const other = lang === 'en' ? 'de' : 'en';
    for (const [i, path] of PAGES[lang].entries()) {
      await go(page, path);
      const info = await page.evaluate(() => ({ lang: document.documentElement.lang, title: document.title, desc: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href, alts: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.hreflang).join(','), h1s: document.querySelectorAll('h1').length }));
      if (info.lang !== lang) problems.push(`${path} lang=${info.lang}`);
      if (!info.title || !info.desc || !info.canonical?.endsWith(path)) problems.push(`${path} missing title/description/canonical`);
      if (info.alts !== 'en,de,x-default') problems.push(`${path} hreflang ${info.alts}`);
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
  for (const p of [...PAGES.en, ...PAGES.de]) {
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
  for (const p of [...PAGES.en, ...PAGES.de]) {
    await go(page, p);
    const w = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
    if (w.sw > w.iw) problems.push(`${p} scrolls sideways (${w.sw}px)`);
  }
  await go(page, '/de/');
  const bookVisible = await page.$eval('.header__end > a[data-track="book_call_click"]', (a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.right <= innerWidth; });
  if (!bookVisible) problems.push('Book a Call not visible in the mobile header');
  await page.click('.header__burger');
  await sleep(300);
  const menu = await page.evaluate(() => ({ open: !document.getElementById('mobile-menu').hidden, focused: document.activeElement?.closest('#mobile-menu') != null, links: document.querySelectorAll('#mobile-menu a').length }));
  if (!menu.open || !menu.focused) problems.push('mobile menu did not open with focus inside');
  await page.keyboard.press('Escape');
  if (!(await page.$eval('#mobile-menu', (m) => m.hidden))) problems.push('Escape did not close the menu');
  // Heading and buttons fit on a phone
  const clipped = await page.evaluate(() => [...document.querySelectorAll('h1, h2, .btn')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent.trim().slice(0, 30)));
  if (clipped.length) problems.push(`clipped: ${clipped.join(', ')}`);
  record('C', 'Mobile (390px): layout, menu, booking button', problems.length ? 'FAIL' : 'PASS', problems.join('; '));
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
    const cookies = (await page.cookies()).map((c) => c.name).filter((n) => /^_ga|^_fb/.test(n));
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
  if (motion.playing) p.push('hero video plays despite reduced motion');
  if (motion.hiddenMarks || motion.hiddenText) p.push('content hidden under reduced motion');
  if (!motion.toggle) p.push('no video play/pause control');
  // Images have alt text, buttons and links have names
  const unnamed = await page.evaluate(() => [...document.querySelectorAll('a, button')].filter((e) => !(e.textContent.trim() || e.getAttribute('aria-label'))).length);
  const noAlt = await page.evaluate(() => [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length);
  if (unnamed) p.push(`${unnamed} links/buttons without a name`);
  if (noAlt) p.push(`${noAlt} images without alt`);
  // Headings in order on each page (no jumps such as h1 → h3)
  for (const path of [...PAGES.en, ...PAGES.de]) {
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
