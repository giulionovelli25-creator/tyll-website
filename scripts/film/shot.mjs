// A still of a demo screen, to plan a film (round 4). node scripts/film/shot.mjs <route> <out.png> [desk|phone] [lang]
import { createRequire } from 'node:module';
import { BASE, CHROME, prepare } from './probe.mjs';
const require = createRequire(new URL('../../package.json', import.meta.url));
const puppeteer = require('puppeteer-core');

const [route, out, mode = 'desk', lang = 'en'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const ctx = await b.createBrowserContext();
const p = await ctx.newPage();
if (mode === 'phone') {
  await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1');
  await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
} else await p.setViewport({ width: 1440, height: 900 });
await prepare(p, lang);
await p.goto(BASE + route, { waitUntil: 'networkidle2' });
await new Promise((x) => setTimeout(x, 2000));
await p.screenshot({ path: out });
await b.close();
