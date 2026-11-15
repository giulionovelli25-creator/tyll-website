// NOT IN USE (11 Nov 2026): the owner kept the original logo, and the site's icons were restored from git. Running this
// would overwrite them with the set-aside Signature tick. Kept only as a record of that trial.
// The site's icons from the official tick (assets/logo/signature/app-icon.svg, written by concepts.mjs): public/favicon.svg (a rounded
// square that flips to white in dark mode), public/favicon.ico (16 and 32 px PNGs) and public/media/tyll-icon-512.png
// (the touch icon: full bleed, the platforms round it themselves). Black, white and the site's ink only.
// Run after concepts.mjs: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const root = new URL('../../', import.meta.url).pathname;
const appIcon = readFileSync(`${root}assets/logo/signature/app-icon.svg`, 'utf8');
const paths = [...appIcon.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
const INK = '#14161a';

// Favicon: the mark larger than on the app icon (a tab icon has no room to spare), on a rounded square.
const group = `<g transform="translate(512 512) scale(1.3) translate(-512 -512)">${paths.map((d) => `<path d="${d}"/>`).join('')}</g>`;
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><style>rect{fill:${INK}}path{fill:#fff}@media (prefers-color-scheme:dark){rect{fill:#fff}path{fill:${INK}}}</style><rect width="1024" height="1024" rx="230"/>${group}</svg>`;
writeFileSync(`${root}public/favicon.svg`, favicon);

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
const shot = async (svg, n) => {
  await page.setViewport({ width: n, height: n, deviceScaleFactor: 1 });
  await page.setContent(`<style>*{margin:0}body{background:transparent}img{display:block;width:${n}px;height:${n}px}</style><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}">`);
  await page.waitForFunction(() => document.images[0].complete);
  return page.screenshot({ omitBackground: true, type: 'png' });
};
const touch = await shot(appIcon, 512);
writeFileSync(`${root}public/media/tyll-icon-512.png`, touch);
const light = favicon.replace(/@media[^}]+}[^}]+}[^}]+}/, ''); // the .ico has no dark mode
const pngs = [await shot(light, 16), await shot(light, 32)];
await browser.close();

// ICO with PNG entries: a 6-byte header, a 16-byte entry per image, then the images.
const head = Buffer.alloc(6 + 16 * pngs.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
let offset = head.length;
pngs.forEach((png, i) => {
  const n = [16, 32][i], e = 6 + 16 * i;
  head.writeUInt8(n, e); head.writeUInt8(n, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
  head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6); head.writeUInt32LE(png.length, e + 8); head.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
writeFileSync(`${root}public/favicon.ico`, Buffer.concat([head, ...pngs]));
console.log('wrote favicon.svg, favicon.ico (16, 32), media/tyll-icon-512.png');
