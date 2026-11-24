// The round 4 screenshots (24 Nov 2026), at 1440 × 900 and 390 × 844, in English and Arabic, from the dev server:
// the homepage's Scan strip, the Solutions menu open, /solutions/ with a card open, every solution page's first
// screen, one row open, and the sustainability page's four parts. Into tests/tmp/screens4/.
//   node scripts/screens4.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../package.json', import.meta.url));
const puppeteer = require('puppeteer-core');

const SITE = process.env.SITE ?? 'http://localhost:4321';
const OUT = 'tests/tmp/screens4';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const P = {
  en: { home: '/en/', solutions: '/en/solutions/', sus: '/en/sustainability/', sol: ['stock-waste', 'expiring-soon', 'log-waste', 'forecasting-purchasing', 'automatic-ordering', 'deliveries-invoices', 'stock-takes', 'pour-control', 'finance-money', 'revenue', 'suppliers'].map((s) => `/en/solutions/${s}/`) },
  ar: { home: '/ar/', solutions: '/ar/solutions/', sus: '/ar/sustainability/', sol: ['stock-waste', 'expiring-soon', 'log-waste', 'forecasting-purchasing', 'automatic-ordering', 'deliveries-invoices', 'stock-takes', 'pour-control', 'finance-money', 'revenue', 'suppliers'].map((s) => `/ar/solutions/${s}/`) },
};
const sizes = { desk: { width: 1440, height: 900 }, phone: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };

fs.mkdirSync(OUT, { recursive: true });
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
for (const [mode, vp] of Object.entries(sizes))
  for (const [lang, p] of Object.entries(P)) {
    const page = await b.newPage();
    await page.setViewport(vp);
    const shot = async (name) => {
      await wait(500);
      await page.screenshot({ path: `${OUT}/${lang}-${mode}-${name}.png` });
      console.log(lang, mode, name);
    };
    const go = async (u) => {
      await page.goto(SITE + u, { waitUntil: 'networkidle2' });
      await wait(900);
    };
    // the homepage's Scan strip
    await go(p.home);
    await page.evaluate(() => document.querySelector('#scan').scrollIntoView({ block: 'start' }));
    await wait(700);
    await shot('home-scan');
    // the Solutions menu (the phone menu on phones)
    await go(p.solutions);
    if (mode === 'desk') await page.click('#solutions-trigger');
    else await page.click('.header__burger');
    await wait(600);
    await shot('menu');
    // /solutions/ with the first card open
    await go(p.solutions);
    await page.evaluate(() => document.querySelector('.tile__btn').click());
    await wait(2200);
    await page.evaluate(() => document.querySelector('.tile.is-open').scrollIntoView({ block: 'center' }));
    await wait(800);
    await shot('solutions-card-open');
    // every solution page's first screen, with its film running
    for (const u of p.sol) {
      await go(u);
      await wait(2600);
      await shot('page-' + u.split('/').filter(Boolean).pop());
    }
    // one row open, with its clip
    await go(p.sol[0] + '#margin');
    await wait(3000);
    await shot('row-open');
    // sustainability: hero, numbers wall, where we work, timeline
    await go(p.sus);
    await shot('sus-hero');
    for (const [sel, name] of [['[data-wall]', 'sus-numbers'], ['.local', 'sus-where'], ['.back', 'sus-timeline']]) {
      await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'start' }), sel);
      await wait(1800);
      await shot(name);
    }
    await page.close();
  }
await b.close();
