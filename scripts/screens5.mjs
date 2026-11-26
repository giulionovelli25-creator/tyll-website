// The round 5 screenshots (25 Nov 2026), at 1440 × 900 and 390 × 844, in English and Arabic, from the dev server:
// one or more per item of the brief's Part 7. Into tests/tmp/screens5/. Sending the investor form is intercepted, so
// nothing reaches Formspree.
//   node scripts/screens5.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../package.json', import.meta.url));
const puppeteer = require('puppeteer-core');

const SITE = process.env.SITE ?? 'http://localhost:4321';
const OUT = 'tests/tmp/screens5';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const P = {
  en: { home: '/en/', sus: '/en/sustainability/', finance: '/en/solutions/finance-money/', stock: '/en/solutions/stock-waste/', groups: '/en/hotel-groups/' },
  ar: { home: '/ar/', sus: '/ar/sustainability/', finance: '/ar/solutions/finance-money/', stock: '/ar/solutions/stock-waste/', groups: '/ar/hotel-groups/' },
};
const sizes = { desk: { width: 1440, height: 900 }, phone: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };

fs.mkdirSync(OUT, { recursive: true });
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] });
for (const [mode, vp] of Object.entries(sizes))
  for (const [lang, p] of Object.entries(P)) {
    const page = await b.newPage();
    await page.setViewport(vp);
    await page.setRequestInterception(true);
    page.on('request', (r) => (/formspree\.io/.test(r.url()) ? r.respond({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: '{"ok":true}' }) : r.continue()));
    const shot = async (name, full = false) => {
      await wait(400);
      await page.screenshot({ path: `${OUT}/${lang}-${mode}-${name}.png`, fullPage: full });
      console.log(lang, mode, name);
    };
    const go = async (u) => {
      await page.goto(SITE + u, { waitUntil: 'networkidle2' });
      await wait(700);
    };
    const to = async (sel, offset = 0) => {
      await page.evaluate((s, o) => {
        const el = document.querySelector(s);
        scrollTo({ top: el.getBoundingClientRect().top + scrollY - 72 + o, behavior: 'instant' });
      }, sel, offset);
      await wait(900);
    };

    // 1. More in … and the footer, one edge; the social icons
    await go(p.finance);
    await to('.others', -16);
    await shot('1-more-in-and-footer');
    // 2. Icons: the Scan strip, the Solutions menu, a page's rows
    await go(p.home);
    await to('#scan');
    await shot('2-scan-strip-icons');
    if (mode === 'desk') {
      await page.click('#solutions-trigger');
      await wait(500);
      await shot('2-solutions-menu-icons');
      await page.keyboard.press('Escape');
    } else {
      await page.click('.header__burger');
      await wait(600);
      await shot('5-phone-menu');
      await page.click('.header__burger');
    }
    await go(p.stock);
    await to('.rows', -40);
    await shot('2-feature-row-icons');
    // 3. Sustainability: the hero after 1 s, the sentence, the calculator, the timeline, the cities, the three cards
    await page.goto(SITE + p.sus, { waitUntil: 'networkidle2' });
    await wait(1000);
    await shot('3-sus-hero-after-1s');
    await to('.line', -40);
    await wait(1400);
    await shot('3-sus-sentence');
    await to('#calculator', -16);
    await shot('3-sus-calculator');
    await page.evaluate(() => {
      const n = document.querySelector('#calc-covers');
      n.value = '650';
      n.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await wait(700);
    await shot('3-sus-calculator-650-covers');
    await to('[data-back]', -16);
    await wait(600);
    await shot('3-sus-timeline');
    await to('.cities', -16);
    await shot('3-sus-cities');
    await to('.act', -16);
    await wait(1500);
    await shot('3-sus-help-cards');
    await page.evaluate(() => scrollTo(0, 0));
    await wait(300);
    await shot('3-sus-full-page', true);
    // 4. The homepage: the hero, the story tabs, the pilot, the founder, and the whole page
    await go(p.home);
    await shot('4-home-hero');
    await to('#story-tabs');
    await shot('4-home-story-tabs');
    await page.click('[data-ht-tab="2"]');
    await wait(500);
    await shot('4-home-story-tab-3');
    await to('#pilot');
    await shot('4-home-pilot');
    await to('#story', -120);
    await shot('4-home-founder');
    await page.evaluate(() => scrollTo(0, 0));
    await wait(300);
    await shot('4-home-full-page', true);
    // 5. The menu bar
    if (mode === 'desk') {
      await go(p.groups);
      await page.screenshot({ path: `${OUT}/${lang}-${mode}-5-header-bar.png`, clip: { x: 0, y: 0, width: 1440, height: 80 } });
      console.log(lang, mode, '5-header-bar');
    }
    // 6. Try this in the demo, under a film
    await go(p.stock);
    await to('.sol__rest', -420);
    await shot('6-try-in-demo-link');
    // 7. Investor enquiries: the footer link from another page, the missing fields, the thank-you
    await go(p.groups);
    await page.evaluate(() => document.querySelector('.footer a[href$="#investors"]').click());
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await wait(1200);
    await shot('7-investors-from-footer-link');
    await page.click('[data-inv] button[type="submit"]');
    await wait(400);
    await shot('7-investors-errors');
    await page.type('#inv-name', 'Test Person');
    await page.type('#inv-email', 'test@example.com');
    await page.type('#inv-firm', 'Example Fund');
    await page.click('[data-inv] button[type="submit"]');
    await wait(800);
    await shot('7-investors-thanks');
    await page.close();
  }
await b.close();
