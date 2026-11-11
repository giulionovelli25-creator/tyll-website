// Sharper versions of the original Tyll lettering (11 Nov 2026, the owner: keep the original check; "I like the idea of
// a fat font like the original but maybe working a bit on how the letters look, making them sharper"). The check is
// untouched (src/config/mark.ts). Every variant starts from the original T, y, l, l outlines (scripts/logo/original.mjs):
// same weight, same positions, same 224 x 81 drawing; only the shapes of the letters change.
//   1 Cut:        terminals cut on a slant: the l's tops rise to the right, the y's tail ends in a point. (A T bar leaning
//                 like the check was tried and dropped: it read as a mistake.)
//   2 Ink traps:  sharp notches cut into every inside corner, as engineered type does.
//   3 Split y:    the y built like the check: a long stroke and a short one, cut parallel to it across the same gap.
//   4 Cut + split: 1 and 3 together.
//   5 Split + traps: 3 with 2's notches, made finer.
// Writes assets/logo/lettering/ (an SVG per variant and lettering.png). Nothing on the site changes.
// Run: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/lettering.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { SHORT, LONG } from './original.mjs';
import { fontsCss } from '../print/lib.mjs';

const OUT = new URL('../../assets/logo/lettering/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const INK = '#14161a';
const f = (n) => +n.toFixed(3);

// ---- the original letters, as drawn ----
const BASE = 60, ASC = 2.746, XH = 17.137, DESC = 80.271;
const T0 = [[96.4758, 5.99569], [136.089, 5.99569], [136.089, 14.7385], [121.698, 14.7385], [121.698, BASE], [110.867, BASE], [110.867, 14.7385], [96.4758, 14.7385]];
const Y0 = [[184.999, XH], [158.461, DESC], [146.933, DESC], [156.217, 58.9168], [139.041, XH], [151.188, XH], [162.252, 47.0792], [173.471, XH]];
const L1 = [[190.838, ASC], [201.67, ASC], [201.67, BASE], [190.838, BASE]];
const L2 = [[212.371, ASC], [223.203, ASC], [223.203, BASE], [212.371, BASE]];

// ---- geometry ----
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const unit = (v) => { const l = Math.hypot(v[0], v[1]); return [v[0] / l, v[1] / l]; };
// where the line through p along d meets the line through q along e
const meet = (p, d, q, e) => { const t = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / (d[0] * e[1] - d[1] * e[0]); return [p[0] + d[0] * t, p[1] + d[1] * t]; };
const path = (p) => 'M' + p.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z';

// The check's long stroke leans 26.538 across for 63.134 down, as does the y's long arm: one slope for every slanted cut.
const LEAN = [26.538, -63.134]; // up and to the right
// Terminal cut: the l's tops and the y's foot rise 4.5 across a stem (about 23°)
const RISE = 4.5 / (201.67 - 190.838);

// 1 Cut
function cutT() {
  const s = (14.7385 - 5.99569) * (26.538 / 63.134); // the bar's ends lean like the check
  return [[96.4758 + s, 5.99569], [136.089, 5.99569], [136.089 - s, 14.7385], [121.698, 14.7385], [121.698, BASE], [110.867, BASE], [110.867, 14.7385], [96.4758, 14.7385]];
}
const cutL = (L) => [[L[0][0], ASC + 4.5], L[1], L[2], L[3]];
function cutTail(y) {
  // replace the level foot (points 1 and 2) by one cut rising to the right from the foot's left corner
  const left = y[2], outerTop = y[0], outerBot = y[1];
  const tip = meet(left, [1, -RISE], outerTop, sub(outerBot, outerTop));
  return [y[0], tip, left, ...y.slice(3)];
}

// 2 Ink traps: a sharp notch into the solid at each inside corner (index i of polygon p): d along each edge, k deep
function trap(p, i, d = 2.4, k = 2.3) {
  const P = p[i], A0 = p[(i + p.length - 1) % p.length], B0 = p[(i + 1) % p.length];
  const u1 = unit(sub(A0, P)), u2 = unit(sub(B0, P));
  const into = unit([-(u1[0] + u2[0]), -(u1[1] + u2[1])]);
  const pts = [[P[0] + u1[0] * d, P[1] + u1[1] * d], [P[0] + into[0] * k, P[1] + into[1] * k], [P[0] + u2[0] * d, P[1] + u2[1] * d]];
  return [...p.slice(0, i), ...pts, ...p.slice(i + 1)];
}
const trapT = (t) => trap(trap(t, 6, 1.5, 1.7), 3, 1.5, 1.7); // stem joins (index 6 first, so index 3 is unchanged)
const trapY = (y) => trap(trap(y, 6, 1.6, 2.6), 3, 1.5, 1.6); // the crotch, deeper; the left arm's foot

// 3 Split y: the long stroke is the y's right arm and tail; the short left arm stops short of it, cut parallel to it,
// a gap g across (the check's own gap, about 3.5).
function splitY({ g = 3.5, tail } = {}) {
  let long = [[173.471, XH], [184.999, XH], [158.461, DESC], [146.933, DESC]];
  if (tail) long = [[173.471, XH], [184.999, XH], meet([146.933, DESC], [1, -RISE], [184.999, XH], [-26.538, 63.134]), [146.933, DESC]];
  const cut = [173.471 - g, XH]; // the cut line runs parallel to the long stroke's inner edge, g to its left
  const dir = [-26.538, 63.134];
  const a = meet([151.188, XH], sub([162.252, 47.0792], [151.188, XH]), cut, dir); // the arm's right edge
  const b = meet([139.041, XH], sub([156.217, 58.9168], [139.041, XH]), cut, dir); // the arm's left edge
  const short = [[139.041, XH], [151.188, XH], a, b];
  return [long, short];
}

const variants = [
  { id: 'original', name: 'Original', note: 'Today’s logo, as on tyll.ai.', word: [T0, Y0, L1, L2] },
  { id: 'cut', name: '1 · Cut', note: 'Slanted ends: the l’s tops rise to the right, the y’s tail ends in a point.', word: [T0, cutTail(Y0), cutL(L1), cutL(L2)] },
  { id: 'traps', name: '2 · Ink traps', note: 'Fine notches cut into each inside corner. Crisp and engineered up close, invisible when small.', word: [trapT(T0), trapY(Y0), L1, L2] },
  { id: 'split', name: '3 · Split y', note: 'The y built like the check: a long stroke and a short one, across the same gap. The word repeats the icon.', word: [T0, ...splitY(), L1, L2] },
  { id: 'cut-split', name: '4 · Cut + split', note: '1 and 3 together: slanted ends and the split y.', word: [T0, ...splitY({ tail: true }), cutL(L1), cutL(L2)] },
  { id: 'split-traps', name: '5 \u00b7 Split + traps', note: 'The split y with fine notches at the T: the quietest of the sharp versions.', word: [trapT(T0), ...splitY(), L1, L2] },
];

const svg = (v, fg, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 81" fill="${fg}" ${extra}><path d="${SHORT}"/><path d="${LONG}"/>${v.word.map((p) => `<path d="${path(p)}"/>`).join('')}</svg>`;
const wordOnly = (v, fg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="94 0 132 82" fill="${fg}">${v.word.map((p) => `<path d="${path(p)}"/>`).join('')}</svg>`;
for (const v of variants) writeFileSync(`${OUT}${v.id}.svg`, svg(v, INK));
// the chosen lettering's paths, for src/config/mark.ts (the owner picked 4, Cut + split, on 11 Nov 2026)
writeFileSync(`${OUT}cut-split-word.json`, JSON.stringify(variants.find((v) => v.id === 'cut-split').word.map(path), null, 1));

const html = `<!doctype html><meta charset="utf-8"><style>${fontsCss()}
*{box-sizing:border-box;margin:0}
body{font:15px/1.45 'Source Sans 3',sans-serif;color:${INK};background:#fff;width:1720px;padding:60px 64px 56px}
h1{font:300 34px/1.2 'Newsreader',serif}
.sub{color:#62686f;margin:8px 0 34px;max-width:1000px}
.head,.row{display:grid;grid-template-columns:250px 470px 1fr 230px;gap:24px;align-items:center}
.head{color:#8a9099;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid #dcdfe3}
.row{padding:22px 0;border-bottom:1px solid #e6e8eb}
.name{font:400 21px/1.2 'Newsreader',serif}.note{color:#4d535b;font-size:14px;margin-top:6px}
.cell{height:210px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#f4f5f7}
.cell.big svg{height:170px}
.cell.pair{gap:34px;background:#fff;border:1px solid #e1e4e8}
.cell.pair .dark{background:${INK};border-radius:10px;padding:16px 20px;display:flex}
.cell.pair svg{height:70px}
.cell.sm{flex-direction:column;gap:22px;background:#fff;border:1px solid #e1e4e8}
.cell.sm .bar{display:flex;align-items:center;gap:24px;font-weight:600;font-size:14px}
.cell.sm .bar svg{height:26px}
.cell.sm .bar.d{background:${INK};color:#fff;padding:10px 16px;border-radius:8px}
</style>
<h1>The original, sharpened</h1>
<p class="sub">The check is today’s, untouched. The letters keep their weight, size and spacing; only their shapes change. The big column shows the word alone so the details are visible; the last column is the real size in the website’s header.</p>
<div class="head"><div></div><div>The word, close up</div><div>The logo, white and black</div><div>Header size</div></div>
${variants.map((v) => `<div class="row"><div><div class="name">${v.name}</div><div class="note">${v.note}</div></div>
<div class="cell big">${wordOnly(v, INK)}</div>
<div class="cell pair">${svg(v, INK)}<div class="dark">${svg(v, '#fff')}</div></div>
<div class="cell sm"><div class="bar">${svg(v, INK)}<span>Solutions</span></div><div class="bar d">${svg(v, '#fff')}<span>Solutions</span></div></div></div>`).join('')}`;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1720, height: 900, deviceScaleFactor: 2 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${OUT}lettering.png`, fullPage: true });
await browser.close();
console.log('wrote', OUT + 'lettering.png');
