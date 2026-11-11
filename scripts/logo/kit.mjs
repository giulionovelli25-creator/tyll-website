// The Tyll logo kit (11 Nov 2026, the owner: "put it in a way that I can save how the font looks"): everything needed to
// keep and reuse the logo, in brand/tyll-logo-kit/ and zipped as brand/tyll-logo-kit.zip. Built from src/config/mark.ts,
// so it always matches the website. Files:
//   svg/   logo and check, black and white (vector, any size)
//   png/   logo at 600, 1200 and 2400 px wide and the check at 512 and 1024, black and white, transparent
//   pdf/   logo, black and white (vector, for print shops)
//   demo/  tyll-lockup-ink-tyll.png, a drop-in for the demo's public/brand/ (same name and 556 x 195 crop; @2x too)
//   tyll-logo-sheet.pdf and .png   one page: the logo, how the letters are built, clear space, sizes, colours
// Run: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/kit.mjs
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import puppeteer from 'puppeteer-core';
import { SHORT, LONG, WORDMARK } from '../../src/config/mark.ts';
import { fontsCss } from '../print/lib.mjs';

const root = new URL('../../', import.meta.url).pathname;
const KIT = `${root}brand/tyll-logo-kit/`;
rmSync(KIT, { recursive: true, force: true });
for (const d of ['svg', 'png', 'pdf', 'demo']) mkdirSync(KIT + d, { recursive: true });
const INK = '#14161a', WHITE = '#ffffff';

// The drawing is 224 x 81; the marks themselves span x 0 to 223.2 and y 0 to 80.3. Tight boxes, with a hair of air.
const LOGO_BOX = [-0.5, -0.5, 224, 81.3];
const CHECK_BOX = [-0.5, -0.5, 76.3, 71.3];
const svg = (box, paths, fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.join(' ')}" fill="${fill}">${paths.map((d) => `<path d="${d}"/>`).join('')}</svg>`;
const logo = (fill) => svg(LOGO_BOX, [SHORT, LONG, ...WORDMARK], fill);
const check = (fill) => svg(CHECK_BOX, [SHORT, LONG], fill);

for (const [n, fill] of [['black', INK], ['white', WHITE]]) {
  writeFileSync(`${KIT}svg/tyll-logo-${n}.svg`, logo(fill));
  writeFileSync(`${KIT}svg/tyll-check-${n}.svg`, check(fill));
}

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
const shot = async (markup, w, h, file, bg) => {
  await page.setViewport({ width: Math.round(w), height: Math.round(h), deviceScaleFactor: 1 });
  await page.setContent(`<style>*{margin:0}html,body{background:${bg ?? 'transparent'}}svg{display:block;width:${w}px;height:${h}px}</style>${markup}`);
  await page.screenshot({ path: file, omitBackground: !bg, type: 'png' });
};
const ratio = LOGO_BOX[3] / LOGO_BOX[2], cratio = CHECK_BOX[3] / CHECK_BOX[2];
for (const [n, fill] of [['black', INK], ['white', WHITE]]) {
  for (const w of [600, 1200, 2400]) await shot(logo(fill), w, w * ratio, `${KIT}png/tyll-logo-${n}-${w}.png`);
  for (const w of [512, 1024]) await shot(check(fill), w, w * cratio, `${KIT}png/tyll-check-${n}-${w}.png`);
}
// The demo's file: same name, 556 x 195, the logo filling it edge to edge as the old one did
const DEMO = [-0.3, 0.6, 224, 78.6]; // 556:195
await shot(svg(DEMO, [SHORT, LONG, ...WORDMARK], INK), 556, 195, `${KIT}demo/tyll-lockup-ink-tyll.png`);
await shot(svg(DEMO, [SHORT, LONG, ...WORDMARK], INK), 1112, 390, `${KIT}demo/tyll-lockup-ink-tyll@2x.png`);
writeFileSync(`${KIT}demo/README.txt`, `Tyll logo for the demo (Demo-Tyll), 11 Nov 2026.

tyll-lockup-ink-tyll.png replaces public/brand/tyll-lockup-ink-tyll.png in the demo: same name, same 556 x 195 size,
so src/components/brand.tsx needs no change. The @2x file is the same at double size, for sharper screens.
The check (tyll-mark-ink.png, tyll-icon-512.png) is unchanged: only the letters of "Tyll" are new.
Vector versions are in ../svg/.
`);

// Vector PDFs, one page each, the page the size of the logo (at 80 mm wide)
for (const [n, fill, bg] of [['black', INK, WHITE], ['white', WHITE, INK]]) {
  const wmm = 80, hmm = (wmm * ratio).toFixed(2);
  await page.setContent(`<style>@page{size:${wmm}mm ${hmm}mm;margin:0}*{margin:0}html,body{background:${n === 'white' ? 'transparent' : 'transparent'}}svg{display:block;width:${wmm}mm;height:${hmm}mm}</style>${logo(fill)}`);
  writeFileSync(`${KIT}pdf/tyll-logo-${n}.pdf`, await page.pdf({ width: `${wmm}mm`, height: `${hmm}mm`, printBackground: false, pageRanges: '1' }));
}

// ---- the sheet: one A4 landscape page ----
const word = (fill) => svg([94, -0.5, 131, 81.3], WORDMARK, fill);
const guide = `<svg viewBox="-28 -30 280 141" class="guide">
  <rect x="-28" y="-30" width="280" height="141" fill="#f4f5f7"/>
  <rect x="-24.4" y="-24.4" width="272.8" height="129.8" fill="none" stroke="#a3a9b2" stroke-width=".5" stroke-dasharray="2 2"/>
  <g fill="${INK}">${[SHORT, LONG, ...WORDMARK].map((d) => `<path d="${d}"/>`).join('')}</g>
  <line x1="-28" x2="252" y1="60" y2="60" stroke="#a3a9b2" stroke-width=".35"/>
  <line x1="-28" x2="252" y1="17.137" y2="17.137" stroke="#a3a9b2" stroke-width=".35"/>
  <line x1="-28" x2="252" y1="2.746" y2="2.746" stroke="#a3a9b2" stroke-width=".35"/>
  <text x="250" y="58.5" text-anchor="end" font-size="4.2" fill="#62686f">baseline</text>
  <text x="250" y="15.6" text-anchor="end" font-size="4.2" fill="#62686f">x-height</text>
  <text x="250" y="1.3" text-anchor="end" font-size="4.2" fill="#62686f">ascender</text>
  <text x="-24.4" y="-27" font-size="4.2" fill="#62686f">clear space: the height of the T's bar × 2.8 on every side</text>
</svg>`;
const html = `<!doctype html><meta charset="utf-8"><style>${fontsCss()}
@page{size:297mm 210mm;margin:0}
*{box-sizing:border-box;margin:0}
body{width:297mm;height:210mm;overflow:hidden;padding:12mm 16mm;font:9.5pt/1.45 'Source Sans 3',sans-serif;color:${INK};background:#fff;display:grid;grid-template-columns:1.25fr 1fr;grid-template-rows:auto minmax(0,1fr) auto;gap:6mm 12mm}
header{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline;border-bottom:.3mm solid #dcdfe3;padding-bottom:4mm}
h1{font:300 21pt/1.1 'Newsreader',serif}
.eyebrow{font-weight:600;font-size:7.5pt;letter-spacing:.14em;text-transform:uppercase;color:#8a9099}
h2{font:400 12pt/1.2 'Newsreader',serif;margin:0 0 2.5mm}
p{color:#3d424a;margin-bottom:2mm}
.hero{display:grid;grid-template-rows:1fr 1fr;gap:5mm}
.tile{border-radius:3mm;display:flex;align-items:center;justify-content:center;background:#f4f5f7}
.tile.dark{background:${INK}}
.tile svg{width:62%}
.right{display:flex;flex-direction:column;gap:3.5mm;min-height:0}
.close{background:#f4f5f7;border-radius:3mm;padding:3.5mm;display:flex;justify-content:center}
.close svg{height:19mm}
.guide{width:100%;height:36mm;display:block;border-radius:3mm}
ul{padding-left:4mm;color:#3d424a;font-size:9pt}li{margin-bottom:.8mm}
footer{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,1fr) 2.2fr;gap:4mm;align-items:end}
.sw{height:13mm;border-radius:2mm;padding:2mm 2.5mm;display:flex;flex-direction:column;justify-content:flex-end;font-size:7.5pt}
.sw b{font-weight:600;font-size:8pt}
.sizes{display:flex;gap:6mm;align-items:flex-end;justify-content:flex-end;color:#8a9099;font-size:7pt}
.sizes div{display:flex;flex-direction:column;gap:1.5mm;align-items:flex-start}
</style>
<header><div><div class="eyebrow">Tyll · logo</div><h1>The check, and the word, sharpened.</h1></div><div class="eyebrow">11 November 2026</div></header>
<div class="hero"><div class="tile">${logo(INK)}</div><div class="tile dark">${logo(WHITE)}</div></div>
<div class="right">
  <div><h2>The letters</h2>
  <div class="close">${word(INK)}</div></div>
  <ul>
    <li><b>Heavy, as before.</b> Same weight, size and spacing as the original Tyll letters; only their shapes changed.</li>
    <li><b>The y is a check.</b> A long stroke ending in a point and a short one cut parallel to it, across the same gap the check has.</li>
    <li><b>The l’s are cut.</b> Their tops rise to the right, the way the check rises.</li>
    <li><b>One slope.</b> The check, the y and every slanted cut lean at 67°.</li>
    <li><b>Drawn, not typed.</b> No font file: use the logo files, never retype the word.</li>
  </ul>
  ${guide}
</div>
<footer>
  <div class="sw" style="background:${INK};color:#fff"><b>Ink</b>#14161A</div>
  <div class="sw" style="background:#fff;border:.3mm solid #dcdfe3"><b>White</b>#FFFFFF</div>
  <div class="sw" style="background:#c8cdd4"><b>Silver</b>#C8CDD4</div>
  <div class="sw" style="background:#0e1219;color:#fff"><b>Night</b>#0E1219</div>
  <div class="sizes">
    <div>${logo(INK).replace('<svg', '<svg style="width:24mm"')}Print: at least 24 mm wide</div>
    <div>${logo(INK).replace('<svg', '<svg style="width:72px"')}Screen: at least 72 px wide</div>
    <div>${check(INK).replace('<svg', '<svg style="width:6mm"')}Smaller: the check alone</div>
  </div>
</footer>`;
await page.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
writeFileSync(`${KIT}tyll-logo-sheet.pdf`, await page.pdf({ width: '297mm', height: '210mm', printBackground: true }));
await page.screenshot({ path: `${KIT}tyll-logo-sheet.png`, clip: { x: 0, y: 0, width: 1123, height: 794 } });
await browser.close();

writeFileSync(`${KIT}README.txt`, `Tyll logo kit, 11 November 2026

The logo is the original Tyll check with its own heavy letters, sharpened: the y is built like the check (a long stroke
and a short one across the same gap) and the l's tops rise to the right. It is drawn, not typed: there is no font file,
so always use these files rather than retyping "Tyll".

svg/   vector logo and check, black and white: use these wherever possible (websites, design tools, print).
png/   pictures with transparent backgrounds: tyll-logo-<colour>-<width>.png and tyll-check-<colour>-<width>.png.
pdf/   vector logo for print shops.
demo/  the file for the demo's public/brand/ folder (same name and size as the one it replaces).
tyll-logo-sheet.pdf   one page: the logo, how the letters are built, clear space, minimum sizes, colours.

Colours: ink #14161A, white #FFFFFF, silver #C8CDD4, night #0E1219. Black logo on light grounds, white on dark grounds
and photographs. Minimum size: 24 mm wide in print, 72 px on screen; below that, the check alone.
Source: src/config/mark.ts in the Tyll website project; rebuild with scripts/logo/kit.mjs.
`);
execFileSync('/usr/bin/zip', ['-qr', '../tyll-logo-kit.zip', '.'], { cwd: KIT });
console.log('wrote brand/tyll-logo-kit/ and brand/tyll-logo-kit.zip');
