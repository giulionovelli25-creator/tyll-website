// New logo directions (11 Nov 2026, the owner: "scrap B for now, try something new": two or three new marks, mainly a tick,
// one completely different that has to do with hospitality and Tyll, then a font and a brand identity).
//   1 Signature: a pen tick, thick short stroke and fine long stroke, and a custom wordmark whose Y carries the same tick.
//   2 Fold:      one ribbon folded into a tick, silver behind, black in front, with the existing Tyll lettering.
//   3 Doors:     an arched double door whose gaps draw a T, with TYLL in the site's serif.
// Everything is computed. Writes SVGs and sheets to assets/logo/concepts/. Nothing on the site changes.
// Run: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/concepts.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { WORDMARK as OLD_WORD } from './original.mjs';
import { fontsCss } from '../print/lib.mjs';

const OUT = new URL('../../assets/logo/concepts/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
export const INK = '#14161a', WHITE = '#ffffff', SILVER = '#a3a9b2', SILVER_LIGHT = '#c8cdd4', NIGHT = '#0e1219';
const f = (n) => +n.toFixed(3);
const rad = (d) => (d * Math.PI) / 180;

// ---- geometry ----
// A polygon (y down) with each corner a true circular arc; r is one radius or one per corner (0 keeps it sharp).
export function rounded(points, r) {
  const n = points.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const P = points[i], A = points[(i + n - 1) % n], B = points[(i + 1) % n];
    const want = Array.isArray(r) ? r[i] : r;
    const la = Math.hypot(A[0] - P[0], A[1] - P[1]), lb = Math.hypot(B[0] - P[0], B[1] - P[1]);
    const u1 = [(A[0] - P[0]) / la, (A[1] - P[1]) / la], u2 = [(B[0] - P[0]) / lb, (B[1] - P[1]) / lb];
    const theta = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])));
    if (!want || theta > Math.PI - 1e-3) { d += `${i ? 'L' : 'M'}${f(P[0])} ${f(P[1])}`; continue; }
    let t = want / Math.tan(theta / 2);
    const tMax = Math.min(la, lb) / 2;
    const rr = t > tMax ? tMax * Math.tan(theta / 2) : want;
    t = Math.min(t, tMax);
    const T1 = [P[0] + u1[0] * t, P[1] + u1[1] * t], T2 = [P[0] + u2[0] * t, P[1] + u2[1] * t];
    const cross = (P[0] - A[0]) * (B[1] - P[1]) - (P[1] - A[1]) * (B[0] - P[0]);
    d += `${i ? 'L' : 'M'}${f(T1[0])} ${f(T1[1])}A${f(rr)} ${f(rr)} 0 0 ${cross > 0 ? 1 : 0} ${f(T2[0])} ${f(T2[1])}`;
  }
  return d + 'Z';
}
const move = (p, dx, dy, s = 1) => p.map(([x, y]) => [x * s + dx, y * s + dy]);
const box = (polys) => { const a = polys.flat(); return [Math.min(...a.map((p) => p[0])), Math.min(...a.map((p) => p[1])), Math.max(...a.map((p) => p[0])), Math.max(...a.map((p) => p[1]))]; };
// where the line through p (direction d) meets the line through q (direction e)
const cross2 = (p, d, q, e) => { const t = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / (d[0] * e[1] - d[1] * e[0]); return [p[0] + d[0] * t, p[1] + d[1] * t]; };

// ---- 1 Signature: the pen tick ----
// A short stroke of full pen width coming down at `a`, a long stroke leaving the same point at `b` and thinning from `base`
// to `tip` as the pen lifts. H is the height, `top` where the short stroke starts. One closed shape.
export function pen({ a = 63, b = 57, K = 17, base = 8, tip = 3.2, top = 48, H = 100 } = {}) {
  const ta = Math.tan(rad(a)), tb = Math.tan(rad(b)), sa = Math.sin(rad(a)), sb = Math.sin(rad(b));
  const bx = (H - top) / ta;
  const B = [bx, H], P1 = [0, top], P2 = [K / sa, top];
  const P5 = [bx + H / tb, 0], P6 = [P5[0] - tip / sb, 0], Q = [bx - base / sb, H];
  const E = cross2(P2, [1 / ta, 1], P6, [Q[0] - P6[0], Q[1] - P6[1]]);
  return [P1, P2, E, P6, P5, B];
}

// The wordmark's letters, drawn rather than typed: cap height 100, stems K, hairlines h. T, Y, L and L are all straight
// strokes, so the whole word can be custom. The Y's arms are the tick: a full-width left arm, a fine right arm that keeps
// rising past the cap height (`flick`).
// Two cuts, as type has optical sizes: `display` for large use and print, `text` with sturdier hairlines for the website
// header and anything under about 40 px of cap height.
export const CUTS = { display: { K: 13, h: 5, base: 6.6, tip: 3.6 }, text: { K: 14.5, h: 8, base: 9.4, tip: 6.2 } };
const LETTER = {
  T: ({ K, h }) => ({ p: [[0, 0], [72, 0], [72, h], [36 + K / 2, h], [36 + K / 2, 100], [36 - K / 2, 100], [36 - K / 2, h], [0, h]], w: 72 }),
  L: ({ K, h }) => ({ p: [[0, 0], [K, 0], [K, 100 - h], [50, 100 - h], [50, 100], [0, 100]], w: 50 }),
  Y: ({ K, base, tip }, flick = 44) => {
    const a = 63, b = 57, J = 56, J2 = 62;
    const ta = Math.tan(rad(a)), tb = Math.tan(rad(b)), sa = Math.sin(rad(a)), sb = Math.sin(rad(b));
    const xL = J / ta, xR = xL + K;
    const outer = (y) => xR + (J2 - y) / tb;
    const tipR = [outer(-flick), -flick], tipL = [tipR[0] - tip / sb, -flick], baseL = [xR - base / sb, J2];
    const crotch = cross2([K / sa, 0], [1 / ta, 1], tipL, [baseL[0] - tipL[0], baseL[1] - tipL[1]]);
    return { p: [[0, 0], [K / sa, 0], crotch, tipL, tipR, [xR, J2], [xR, 100], [xL, 100], [xL, J]], w: outer(0) };
  },
};
// The tick as two overlapping parts, so it can draw itself stroke by stroke (src/scripts/checkmark.ts): the short stroke
// down to the long stroke's inner edge, and the long stroke carried through to the point. Together they are pen() exactly.
export function penParts(o) {
  const [P1, P2, E, P6, P5, B] = pen(o);
  const G = cross2(P1, [B[0] - P1[0], B[1] - P1[1]], P6, [E[0] - P6[0], E[1] - P6[1]]);
  const M = [(G[0] + B[0]) / 2, (G[1] + B[1]) / 2];
  return { short: [P1, P2, E, M], long: [G, P6, P5, B] };
}
export function signatureWord(cut = CUTS.display, flick = 44) {
  const gaps = [0, 15, 21, 17];
  const letters = [LETTER.T(cut), LETTER.Y(cut, flick), LETTER.L(cut), LETTER.L(cut)];
  let x = 0;
  const polys = letters.map((l, i) => { x += gaps[i]; const p = move(l.p, x, 0); x += l.w; return p; });
  return { polys, w: x, top: -flick, bottom: 100 };
}

// ---- 2 Fold: a ribbon folded once ----
// A strip of width w comes down at `t`, folds over a level crease and leaves at the mirrored angle: the short arm is the
// back of the ribbon (silver), the long arm its face. The crease corners stay sharp, the cut ends are rounded.
export function fold({ t = 62, w = 22, top = 42, H = 100 } = {}) {
  const tt = Math.tan(rad(t)), cw = w / Math.sin(rad(t));
  const x0 = (H - top) / tt;
  const long = [[x0, H], [x0 + H / tt, 0], [x0 + cw + H / tt, 0], [x0 + cw, H]];
  const short = [[0, top], [cw, top], [x0 + cw, H], [x0, H]];
  // one colour: the short arm stops a hairline before the long arm's edge
  const g = 3.4 / Math.sin(rad(t));
  const cut = cross2([cw, top], [1 / tt, 1], [x0 - g, H], [1 / tt, -1]);
  const shortMono = [[0, top], [cw, top], cut, [x0 - g, H]];
  return { long, short, shortMono, r: 2.6 };
}

// ---- 3 Doors: an arched double door, its gaps a T ----
export function doors({ W = 64, H = 100, g = 6.5, bar = 41, r = 1.6 } = {}) {
  const R = W / 2, x1 = R - g / 2, x2 = R + g / 2, y2 = bar + g;
  return [
    `M0 ${bar - r}V${R}A${R} ${R} 0 0 1 ${W} ${R}V${bar - r}A${r} ${r} 0 0 1 ${W - r} ${bar}H${r}A${r} ${r} 0 0 1 0 ${bar - r}Z`,
    rounded([[0, y2], [x1, y2], [x1, H], [0, H]], r),
    rounded([[x2, y2], [W, y2], [W, H], [x2, H]], r),
  ];
}

// ---- drawing ----
const svgOpen = (vb, style = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map(f).join(' ')}" style="${style}">`;
const paths = (ds, fill) => ds.map((d) => `<path d="${d}" fill="${fill}"/>`).join('');
const pad = ([x0, y0, x1, y1], m = 1) => [x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m];

const P = pen(), PS = pen({ K: 19, base: 11.5, tip: 6.2, top: 47 }); // PS: the cut for small sizes, a sturdier long stroke
const F = fold();
const D = doors();
const SW = signatureWord();
const oldWord = OLD_WORD.map((d) => d); // the existing Tyll lettering, as drawn (T at x 96.5, baseline 60, l top 2.746)

export const concepts = [
  {
    id: 'signature', name: '1 · Signature',
    idea: 'The tick as a pen writes it: a firm short stroke, a fine long one. The same tick is the Y of a custom-drawn wordmark, so the name itself is checked.',
    mark: (fg) => svgOpen(pad(box([P]))) + paths([rounded(P, 0.7)], fg) + '</svg>',
    logo: (fg) => svgOpen([-2, SW.top - 2, SW.w + 4, SW.bottom - SW.top + 4]) + paths(SW.polys.map((p) => rounded(p, 0.5)), fg) + '</svg>',
    logoH: 92,
    icon: (bg, fg) => iconSvg(bg, paths([rounded(centre([PS], 0.5), 6)], fg)),
  },
  {
    id: 'fold', name: '2 · Fold',
    idea: 'One ribbon folded into a tick, like a turned-down sheet: silver behind, black in front. Bold, modern, and silver becomes part of the mark. Keeps today’s Tyll lettering.',
    mark: (fg, grey) => svgOpen(pad(box([F.long, F.short]))) + foldPaths(F, fg, grey, 1, 0, 0) + '</svg>',
    logo: (fg, grey) => {
      const s = (60 - 2.746) / 100, mw = box([F.long])[2] * s, dx = mw + 21 - 96.476;
      return svgOpen([-1, 1.5, mw + 21 + (223.203 - 96.476) + 2, 80]) + foldPaths(F, fg, grey, s, 0, 2.746) + `<g transform="translate(${f(dx)} 0)">${paths(oldWord, fg)}</g></svg>`;
    },
    logoH: 74,
    icon: (bg, fg, grey) => { const [m, k] = fit([F.long, F.short], 0.54); return iconSvg(bg, foldPaths(F, fg, grey, k, m[0], m[1])); },
  },
  {
    id: 'doors', name: '3 · Doors',
    idea: 'No tick. An arched double door, the first thing a guest meets, and the gaps between its three panels draw a T. Set with TYLL in the site’s own serif, the way hotels write their names.',
    mark: (fg) => svgOpen([-1, -1, 66, 102]) + paths(D, fg) + '</svg>',
    logo: (fg) => `<span class="lock">${svgOpen([-1, -1, 66, 102], 'height:1.62em') + paths(D, fg) + '</svg>'}<span class="caps" style="color:${fg}">TYLL</span></span>`,
    logoH: 74,
    icon: (bg, fg) => iconSvg(bg, `<g transform="translate(${512 - 32 * 5.6} ${512 - 50 * 5.6}) scale(5.6)">${paths(D, fg)}</g>`),
  },
];

function foldPaths(F, fg, grey, s, dx, dy) {
  const m = (p) => move(p, dx, dy, s);
  return paths([rounded(m(F.short), [F.r * s, F.r * s, 0, 0])], grey) + paths([rounded(m(F.long), [0, F.r * s, F.r * s, 0])], fg);
}
// scale and offset that sit a set of polygons in the middle of a 1024 icon, `share` of its width
function fit(polys, share) {
  const [x0, y0, x1, y1] = box(polys);
  const k = (1024 * share) / Math.max(x1 - x0, y1 - y0);
  return [[512 - ((x0 + x1) / 2) * k, 512 - ((y0 + y1) / 2) * k], k];
}
function centre(polys, share) { const [m, k] = fit(polys, share); return move(polys[0], m[0], m[1], k); }
function iconSvg(bg, inner) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="${bg}"/>${inner}</svg>`; }

// ---- files ----
const uri = (s) => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');
for (const c of concepts) {
  writeFileSync(`${OUT}${c.id}-mark.svg`, c.mark(INK, SILVER));
  writeFileSync(`${OUT}${c.id}-app-icon.svg`, c.icon(INK, WHITE, '#8b929c'));
  if (c.id !== 'doors') writeFileSync(`${OUT}${c.id}-logo.svg`, c.logo(INK, SILVER));
}

// ---- Signature, the owner's pick (11 Nov 2026): the final files and the vectors src/config/mark.ts takes ----
{
  const DIR = new URL('../../assets/logo/signature/', import.meta.url).pathname;
  mkdirSync(DIR, { recursive: true });
  const R = 0.7;
  const parts = penParts();
  const word = (cut) => { const w = signatureWord(cut), dy = -w.top; return { d: w.polys.map((p) => rounded(move(p, 0, dy), 0.5)), width: f(w.w), height: f(w.bottom - w.top), capTop: f(dy) }; };
  const text = word(CUTS.text), display = word(CUTS.display);
  const axis = (deg, up) => [f(Math.cos(rad(deg))), f((up ? -1 : 1) * Math.sin(rad(deg)))];
  const reach = (poly, a) => { const t = poly.map(([x, y]) => x * a[0] + y * a[1]); return Math.ceil(Math.max(...t) - Math.min(...t)) + 1; };
  const shortAxis = axis(63, false), longAxis = axis(57, true);
  const vectors = {
    SHORT: rounded(parts.short, [R, R, 0, 0]), LONG: rounded(parts.long, [0, R, R, R]), markBox: box([P]).map(f),
    text, display, shortAxis, longAxis, shortLen: reach(parts.short, shortAxis), longLen: reach(parts.long, longAxis),
  };
  writeFileSync(`${DIR}vectors.json`, JSON.stringify(vectors, null, 1));
  const file = (w, fg) => svgOpen([0, 0, w.width, w.height]) + paths(w.d, fg) + '</svg>';
  for (const [name, w] of [['wordmark', display], ['wordmark-small', text]]) {
    writeFileSync(`${DIR}${name}.svg`, file(w, INK));
    writeFileSync(`${DIR}${name}-white.svg`, file(w, WHITE));
  }
  writeFileSync(`${DIR}tick.svg`, concepts[0].mark(INK));
  writeFileSync(`${DIR}tick-white.svg`, concepts[0].mark(WHITE));
  writeFileSync(`${DIR}app-icon.svg`, concepts[0].icon(INK, WHITE));
}

// ---- the sheet ----
export const baseCss = `${fontsCss()}
*{box-sizing:border-box;margin:0}
body{font:15px/1.45 'Source Sans 3',sans-serif;color:${INK};background:#fff}
.caps{font-family:'Newsreader',serif;font-weight:400;letter-spacing:.24em;margin-right:-.24em;line-height:1}
.lock{display:inline-flex;align-items:center;gap:.62em;font-size:46px}
.lock svg{display:block}`;

const html = `<!doctype html><meta charset="utf-8"><style>${baseCss}
body{width:1760px;padding:60px 64px 56px}
h1{font:300 34px/1.2 'Newsreader',serif}
.sub{color:#62686f;margin:8px 0 38px;max-width:980px}
.head,.row{display:grid;grid-template-columns:250px 210px 360px 360px 150px 1fr;gap:26px;align-items:center}
.head{color:#8a9099;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid #dcdfe3}
.row{padding:34px 0;border-bottom:1px solid #e6e8eb}
.name{font:400 23px/1.2 'Newsreader',serif}.idea{color:#4d535b;font-size:14px;margin-top:8px}
.cell{height:190px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#f4f5f7}
.cell.dark{background:${INK}}
.cell.mk svg{height:112px}
.cell.lg>svg{height:var(--h)}
.icon img{width:124px;height:124px;border-radius:28px;display:block;box-shadow:0 1px 3px rgba(0,0,0,.25)}
.px{display:flex;gap:16px;align-items:flex-end}
.px figure{text-align:center;color:#8a9099;font-size:11.5px}
.px canvas{display:block;width:64px;height:64px;image-rendering:pixelated;border:1px solid #e1e4e8;margin-bottom:6px}
</style>
<h1>Tyll, three new directions</h1>
<p class="sub">Two new ticks and one mark with no tick at all. Each is shown as a mark, as a logo on white and on black, as an app icon, and at real small sizes (16, 32 and 64 pixels, enlarged).</p>
<div class="head"><div></div><div>Mark</div><div>Logo</div><div>On black</div><div>App icon</div><div>16 px · 32 px · 64 px</div></div>
${concepts.map((c) => `<div class="row">
  <div><div class="name">${c.name}</div><div class="idea">${c.idea}</div></div>
  <div class="cell mk">${c.mark(INK, SILVER)}</div>
  <div class="cell lg" style="--h:${c.logoH}px">${c.logo(INK, SILVER)}</div>
  <div class="cell lg dark" style="--h:${c.logoH}px">${c.logo(WHITE, '#8b929c')}</div>
  <div class="icon"><img src="${uri(c.icon(INK, WHITE, '#8b929c'))}"></div>
  <div class="px">${[16, 32, 64].map((n) => `<figure><canvas data-src="${uri(c.icon(INK, WHITE, '#8b929c'))}" data-n="${n}"></canvas>${n} px</figure>`).join('')}</div>
</div>`).join('')}
<script>
window.done = Promise.all([...document.querySelectorAll('canvas')].map((c) => new Promise((ok) => {
  const n = +c.dataset.n, img = new Image();
  img.onload = () => { c.width = n; c.height = n; c.getContext('2d').drawImage(img, 0, 0, n, n); ok(); };
  img.src = c.dataset.src;
})));
</script>`;

if (process.argv[1].endsWith('concepts.mjs')) {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1760, height: 900, deviceScaleFactor: 2 });
  await page.setContent(html);
  await page.evaluate(() => Promise.all([window.done, document.fonts.ready]));
  await page.screenshot({ path: `${OUT}concepts.png`, fullPage: true });
  await browser.close();
  console.log('wrote', OUT + 'concepts.png');
}
