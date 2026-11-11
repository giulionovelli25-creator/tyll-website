// The share images, public/media/og-<lang>.jpg (1200 x 630, the picture a link shows when posted): the hero photograph
// under a dark shade, the logo, and the homepage headline in that language, read from src/i18n/<lang>.ts so the two
// never drift apart. Arabic is set right to left in Noto Naskh Arabic, the logo at its start edge.
// Run: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/og.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { SHORT, LONG, WORDMARK } from '../../src/config/mark.ts';
import { fontsCss } from '../print/lib.mjs';

const root = new URL('../../', import.meta.url).pathname;
const b64 = (p) => readFileSync(root + p).toString('base64');
const photo = `data:image/webp;base64,${b64('public/media/hero/square-1920.webp')}`;
const headline = (lang) => {
  const m = readFileSync(`${root}src/i18n/${lang}.ts`, 'utf8').match(/hero:\s*{\s*title:\s*'((?:[^'\\]|\\.)*)'/);
  if (!m) throw new Error(`no hero title in ${lang}.ts`);
  return m[1].replace(/\\'/g, "'").split(/(?<=\.)\s+/); // one line per sentence
};
const SIZE = { en: 64, de: 54, it: 58, ar: 62 };
const logo = `<svg class="logo" viewBox="0 0 224 81" fill="#fff">${[SHORT, LONG, ...WORDMARK].map((d) => `<path d="${d}"/>`).join('')}</svg>`;

const page = (lang) => `<!doctype html><html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><meta charset="utf-8"><style>${fontsCss()}
@font-face{font-family:'Naskh';src:url(data:font/woff2;base64,${b64('public/fonts/noto-naskh-arabic.woff2')}) format('woff2')}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;position:relative;overflow:hidden;background:#0e1219 url(${photo}) center 52%/cover;color:#fff}
body::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,12,18,.62) 0%,rgba(9,12,18,.5) 38%,rgba(9,12,18,.82) 100%)}
.logo{position:absolute;top:52px;inset-inline-start:64px;height:52px}
h1{position:absolute;inset-inline:64px;bottom:96px;font:300 ${SIZE[lang]}px/1.12 'Newsreader',serif;text-wrap:balance}
h1 span{display:block}
[dir=rtl] h1{font-family:'Naskh',serif;font-weight:400;line-height:1.5;bottom:84px}
p{position:absolute;inset-inline-start:64px;bottom:44px;font:400 22px/1 'Source Sans 3',sans-serif;letter-spacing:.02em;color:rgba(255,255,255,.78);direction:ltr}
</style>${logo}<h1>${headline(lang).map((s) => `<span>${s}</span>`).join('')}</h1><p>tyll.ai</p></html>`;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const tab = await browser.newPage();
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const lang of ['en', 'de', 'ar', 'it']) {
  await tab.setContent(page(lang));
  await tab.evaluate(() => document.fonts.ready);
  const jpg = await tab.screenshot({ type: 'jpeg', quality: 86 });
  writeFileSync(`${root}public/media/og-${lang}.jpg`, jpg);
  console.log(`og-${lang}.jpg`, Math.round(jpg.length / 1024) + ' KB');
}
await browser.close();
