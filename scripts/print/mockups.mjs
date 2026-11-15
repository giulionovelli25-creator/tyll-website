// Mock-ups of the print pieces, drawn to scale from the real previews (run roll-up.mjs and flyer.mjs first):
// the roll-up standing on its own, the roll-up behind a 75 cm event table, and the folded flyer closed and half open.
//
//   PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/print/mockups.mjs
//
// Writes print/mockups/rollup_standing.png, rollup_at_table.png, flyer_folded.png and rollup_from_far.png. These are drawings made in Chrome,
// not photographs: they show size, placement and what a table hides, not paper or lighting.
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';
import { ROOT } from './lib.mjs';

const OUT = join(ROOT, 'print', 'mockups');
mkdirSync(OUT, { recursive: true });
const img = (p) => `data:image/png;base64,${readFileSync(join(ROOT, 'print', p)).toString('base64')}`;
const BANNER = img('roll-up/banner_preview.png');
const OUTSIDE = img('flyer/flyer_outside_preview.png'); // 297 x 210 mm: flap 97 | back 100 | cover 100
const INSIDE = img('flyer/flyer_inside_preview.png'); // 100 | 100 | 97
// One panel of a flyer side as a CSS background, k px per mm
const panel = (src, x, w, k) => `width:${w * k}px;height:${210 * k}px;background:url(${src}) ${-x * k}px 0 / ${297 * k}px ${210 * k}px no-repeat`;

// ---- Roll-up scenes: a straight-on view, 1 px = 2 mm ----
const S = 0.5; // px per mm
const mm = (v) => `${v * S}px`;
const FLOOR = 2330; // mm from the top of the picture to the floor line
const CASSETTE = 75; // mm, the base the banner rolls out of
const VISIBLE = 1900; // mm of banner above the cassette

const banner = (left) => `
<div class="stand" style="left:${mm(left)};top:${mm(FLOOR - CASSETTE - VISIBLE - 24)}">
  <div class="wall-shadow"></div>
  <div class="rail"></div>
  <div class="sheet"><img src="${BANNER}"></div>
  <div class="cassette"><i></i><i></i></div>
  <div class="floor-shadow"></div>
</div>`;

const table = (left, width) => `
<div class="table" style="left:${mm(left)};top:${mm(FLOOR - 750)};width:${mm(width)}">
  <div class="top"></div>
  <div class="cloth"></div>
  <div class="floor-shadow"></div>
  <div class="holder" style="left:${mm(width - 520)}"><div style="${panel(OUTSIDE, 197, 100, S)}"></div></div>
  <div class="pile" style="left:${mm(width - 330)}"></div>
</div>`;

const measure = (x, y0, y1, label, side = 'left') => `
<div class="measure" style="left:${mm(x)};top:${mm(y0)};height:${mm(y1 - y0)}"><span class="${side}">${label}</span></div>`;

const roomCss = `
*{box-sizing:border-box}
html,body{margin:0}
body{font-family:'Source Sans 3',system-ui,sans-serif}
.room{position:relative;overflow:hidden;background:linear-gradient(180deg,#f6f7f9 0%,#eceef1 70%,#e3e6ea 100%)}
.floor{position:absolute;left:0;right:0;bottom:0;top:${mm(FLOOR - 4)};background:linear-gradient(180deg,#c3c7cd 0%,#d2d5da 18%,#dcdfe3 100%)}
.floor:before{content:'';position:absolute;left:0;right:0;top:0;height:2px;background:#b3b8bf}
.stand{position:absolute;width:${mm(850)}}
.rail{position:relative;z-index:2;height:${mm(24)};margin:0 ${mm(-6)};border-radius:3px;background:linear-gradient(180deg,#f2f3f5,#b9bec5 55%,#8e949c)}
.sheet{position:relative;z-index:1;height:${mm(VISIBLE)};overflow:hidden;background:#0c0f16}
.sheet img{display:block;width:100%}
.sheet:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.05),rgba(255,255,255,0) 18%,rgba(0,0,0,0) 80%,rgba(0,0,0,.14))}
.cassette{position:relative;z-index:2;height:${mm(CASSETTE)};margin:0 ${mm(-20)};border-radius:4px;background:linear-gradient(180deg,#e9ebee 0%,#c5c9cf 30%,#9ba1a9 78%,#7d838b 100%)}
.cassette i{position:absolute;bottom:${mm(-10)};width:${mm(70)};height:${mm(12)};border-radius:2px;background:#6f757d}
.cassette i:first-child{left:${mm(60)}}.cassette i:last-child{right:${mm(60)}}
.wall-shadow{position:absolute;z-index:0;left:${mm(70)};right:${mm(-90)};top:${mm(60)};bottom:${mm(40)};background:rgba(20,24,32,.16);filter:blur(34px)}
.floor-shadow{position:absolute;z-index:0;left:-4%;right:-10%;bottom:${mm(-34)};height:${mm(70)};border-radius:50%;background:rgba(15,18,24,.34);filter:blur(13px)}
.table{position:absolute;height:${mm(750)}}
.table .top{position:absolute;z-index:3;left:${mm(-14)};right:${mm(-14)};top:0;height:${mm(30)};border-radius:3px 3px 0 0;background:linear-gradient(180deg,#2a2e36,#171a20)}
.table .cloth{position:absolute;z-index:2;inset:0;background:
  repeating-linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.035) 46px,rgba(0,0,0,.2) 92px,rgba(255,255,255,0) 150px),
  linear-gradient(180deg,#14171d,#0c0e13)}
.table .floor-shadow{left:-3%;right:-6%}
.holder{position:absolute;z-index:4;bottom:100%;padding:${mm(5)} ${mm(6)} ${mm(14)};background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(210,216,224,.5));border:1px solid rgba(160,168,178,.8);border-radius:2px;box-shadow:6px 4px 10px rgba(0,0,0,.18)}
.pile{position:absolute;z-index:4;bottom:100%;width:${mm(104)};height:${mm(30)};background:repeating-linear-gradient(180deg,#f4f5f7 0 1px,#c9cdd3 1px 2px);border:1px solid #b5bac1;box-shadow:5px 3px 8px rgba(0,0,0,.2);overflow:hidden}
.measure{position:absolute;z-index:5;width:1px;background:#8b919a}
.measure:before,.measure:after{content:'';position:absolute;left:-6px;width:13px;height:1px;background:#8b919a}
.measure:before{top:0}.measure:after{bottom:0}
.measure span{position:absolute;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:19px;color:#5d636b;letter-spacing:.02em}
.measure span.left{right:16px}.measure span.right{left:16px}
.note{position:absolute;left:0;right:0;bottom:${mm(50)};text-align:center;font-size:19px;color:#5d636b;z-index:6}`;

const room = (w, h, body) => `<!doctype html><meta charset="utf-8"><style>${roomCss}</style>
<div class="room" style="width:${mm(w)};height:${mm(h)}"><div class="floor"></div>${body}</div>`;

const H = 2640;
const standing = room(
  2500,
  H,
  banner(825) +
    measure(660, FLOOR - CASSETTE - VISIBLE - 24, FLOOR, '2.0 m') +
    `<div class="note">Roll-up open on its stand · 850 × 2000 mm</div>`,
);
const atTable = room(
  3400,
  H,
  banner(520) +
    table(380, 1800) +
    measure(250, FLOOR - 750, FLOOR, 'Table 75 cm') +
    measure(2330, FLOOR - CASSETTE - VISIBLE - 24, FLOOR, '2.0 m', 'right') +
    `<div class="note">Behind a 1.8 m table: the logo, headline, offer and QR code stay in view</div>`,
);

// ---- The folded flyer: closed, half open from the inside, half open from the outside ----
const K = 3; // px per mm
const FOLD = 38; // degrees each side panel is turned
const lit = (deg) => `linear-gradient(${deg}deg,rgba(0,0,0,.2),rgba(0,0,0,0) 70%)`;
const folded = `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0}
body{font-family:'Source Sans 3',system-ui,sans-serif}
.desk{position:relative;width:2400px;height:1240px;overflow:hidden;background:linear-gradient(180deg,#f5f6f8 0%,#eceef1 62%,#dfe2e6 62%,#e9ebee 100%);perspective:3200px;perspective-origin:50% 22%}
.obj{position:absolute;bottom:300px;display:flex;transform-style:preserve-3d}
.p{position:relative;flex:none;transform-style:preserve-3d;box-shadow:0 0 0 .5px rgba(0,0,0,.12)}
.p:after{content:'';position:absolute;inset:0}
.shadow{position:absolute;bottom:268px;height:70px;border-radius:50%;background:rgba(18,22,30,.3);filter:blur(22px)}
.cap{position:absolute;bottom:120px;font-size:26px;color:#5d636b;text-align:center}
</style>
<div class="desk">
  <div class="shadow" style="left:130px;width:380px"></div>
  <div class="shadow" style="left:640px;width:820px"></div>
  <div class="shadow" style="left:1560px;width:760px"></div>

  <div class="obj" style="left:170px;transform:rotateY(14deg)">
    <div class="p" style="${panel(OUTSIDE, 197, 100, K)};box-shadow:-3px 0 0 #1b1f27,-6px 0 0 #2a2f38,0 0 0 .5px rgba(0,0,0,.2)"></div>
  </div>
  <div class="cap" style="left:120px;width:400px">Folded: 100 × 210 mm</div>

  <div class="obj" style="left:${1050 - 150 * K}px">
    <div class="p" style="${panel(INSIDE, 0, 100, K)};transform-origin:right center;transform:rotateY(${FOLD}deg)"><i style="position:absolute;inset:0;background:${lit(270)}"></i></div>
    <div class="p" style="${panel(INSIDE, 100, 100, K)}"></div>
    <div class="p" style="${panel(INSIDE, 200, 97, K)};transform-origin:left center;transform:rotateY(${-FOLD}deg)"><i style="position:absolute;inset:0;background:${lit(90)}"></i></div>
  </div>
  <div class="cap" style="left:700px;width:700px">Open, inside</div>

  <div class="obj" style="left:${1940 - 147 * K}px">
    <div class="p" style="${panel(OUTSIDE, 0, 97, K)};transform-origin:right center;transform:rotateY(${-FOLD}deg)"><i style="position:absolute;inset:0;background:${lit(90)}"></i></div>
    <div class="p" style="${panel(OUTSIDE, 97, 100, K)}"></div>
    <div class="p" style="${panel(OUTSIDE, 197, 100, K)};transform-origin:left center;transform:rotateY(${FOLD}deg)"><i style="position:absolute;inset:0;background:${lit(270)}"></i></div>
  </div>
  <div class="cap" style="left:1590px;width:700px">Open, outside: flap, back, cover</div>
</div>`;

// ---- The banner from a distance: the same banner at the size it takes up in your view from 5, 10 and 20 m ----
// Sized for a screen read at about 50 cm (a 2 m banner 10 m away looks as tall as 10 cm at 50 cm), so it is a
// rough guide to what still reads, not a measurement.
const farSizes = [
  [5, 760],
  [10, 380],
  [20, 190],
];
const far = `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0}
body{font-family:'Source Sans 3',system-ui,sans-serif}
.hall{width:1500px;height:980px;display:flex;align-items:flex-end;justify-content:center;gap:150px;background:linear-gradient(180deg,#f6f7f9,#e6e8ec);padding-bottom:120px;box-sizing:border-box;position:relative}
.b{display:flex;flex-direction:column;align-items:center}
.b img{display:block;box-shadow:0 8px 22px rgba(20,24,32,.22)}
.b span{position:absolute;bottom:56px;font-size:24px;color:#5d636b;white-space:nowrap}
.b{position:relative}
.hall>p{position:absolute;left:0;right:0;top:34px;margin:0;text-align:center;font-size:24px;color:#5d636b}
</style>
<div class="hall"><p>How large the banner looks from a distance (screen at about 50 cm)</p>
${farSizes.map(([m, h]) => `<div class="b"><img src="${BANNER}" style="height:${h}px"><span style="bottom:-52px">From ${m} m</span></div>`).join('')}
</div>`;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
const shot = async (html, w, h, file) => {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(OUT, file), clip: { x: 0, y: 0, width: w, height: h } });
};
await shot(standing, 2500 * S, H * S, 'rollup_standing.png');
await shot(atTable, 3400 * S, H * S, 'rollup_at_table.png');
await shot(folded, 2400, 1240, 'flyer_folded.png');
await shot(far, 1500, 980, 'rollup_from_far.png');
await browser.close();
console.log('Wrote print/mockups: rollup_standing.png, rollup_at_table.png, flyer_folded.png, rollup_from_far.png');
