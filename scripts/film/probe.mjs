// Reads what a demo screen says, for writing the website's copy and the film scripts (round 4, 24 Nov 2026).
// node scripts/film/probe.mjs <route> [<route> ...]   (N=chars per route; LANG=en|de|it|ar; WIDTH=1440)
// Each route opens in a fresh browser session, so the public demo starts from its own fresh workspace. The cookie
// choice is stored as "no" first, so nothing is recorded and the banner never shows.
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../package.json', import.meta.url));
const puppeteer = require('puppeteer-core');

export const BASE = process.env.DEMO ?? 'http://127.0.0.1:3299';
export const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export const prepare = async (page, lang) =>
  page.evaluateOnNewDocument((lang) => {
    localStorage.setItem('tyll-visit-consent-v1', JSON.stringify({ choice: 'no', at: new Date().toISOString() }));
    localStorage.setItem('tyll-lang-v1', JSON.stringify({ state: { lang }, version: 0 }));
  }, lang);

if (import.meta.url === `file://${process.argv[1]}`) {
  const routes = process.argv.slice(2);
  const lang = process.env.LANG_DEMO ?? 'en';
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  for (const r of routes) {
    const ctx = await b.createBrowserContext();
    const p = await ctx.newPage();
    await p.setViewport({ width: +(process.env.WIDTH ?? 1440), height: 900 });
    await prepare(p, lang);
    await p.goto(BASE + r, { waitUntil: 'networkidle2' });
    await new Promise((x) => setTimeout(x, 1500));
    const t = await p.evaluate(() => (document.querySelector('main') || document.body).innerText.replace(/\n{2,}/g, '\n'));
    console.log(`\n===== ${r} -> ${p.url().replace(BASE, '')}\n` + t.slice(0, +(process.env.N ?? 1500)));
    await ctx.close();
  }
  await b.close();
}
