// Refined versions of the Tyll check mark (11 Nov 2026, the owner: "make it 10/10 in professionalism", refine, not replace).
// Every shape is computed: both strokes share one slope (the wordmark's y, so mark and word lean together), every corner
// has the same true circular radius, and the join is either one exact offset (A, C) or one hairline seam (B).
// Writes SVGs and a comparison sheet to assets/logo/. Nothing on the site changes; src/config/mark.ts stays the official logo.
// Run: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/refine.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { SHORT, LONG, WORDMARK } from './original.mjs';

const OUT = new URL('../../assets/logo/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

// The slope of the y's long arm in the official wordmark: 63.134 down for 26.538 across (about 67.2°).
const K = (80.271 - 17.137) / (184.999 - 158.461);
const f = (n) => +n.toFixed(3);

// ---- geometry ----
// A polygon (y down) with every corner replaced by a true circular arc of radius r (shrunk where an edge is too short).
function rounded(points, r) {
  const n = points.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const P = points[i], A = points[(i + n - 1) % n], B = points[(i + 1) % n];
    const la = Math.hypot(A[0] - P[0], A[1] - P[1]), lb = Math.hypot(B[0] - P[0], B[1] - P[1]);
    const u1 = [(A[0] - P[0]) / la, (A[1] - P[1]) / la], u2 = [(B[0] - P[0]) / lb, (B[1] - P[1]) / lb];
    const theta = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])));
    let t = r / Math.tan(theta / 2);
    const tMax = Math.min(la, lb) / 2;
    const rr = t > tMax ? tMax * Math.tan(theta / 2) : r;
    t = Math.min(t, tMax);
    const T1 = [P[0] + u1[0] * t, P[1] + u1[1] * t], T2 = [P[0] + u2[0] * t, P[1] + u2[1] * t];
    const cross = (P[0] - A[0]) * (B[1] - P[1]) - (P[1] - A[1]) * (B[0] - P[0]);
    d += `${i ? 'L' : 'M'}${f(T1[0])} ${f(T1[1])}A${f(rr)} ${f(rr)} 0 0 ${cross > 0 ? 1 : 0} ${f(T2[0])} ${f(T2[1])}`;
  }
  return d + 'Z';
}
const area = (p) => p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0) / 2;
const centroid = (polys) => {
  let ax = 0, ay = 0, at = 0;
  for (const p of polys) {
    const a = area(p);
    let cx = 0, cy = 0;
    p.forEach((q, i) => { const s = p[(i + 1) % p.length], c = q[0] * s[1] - s[0] * q[1]; cx += (q[0] + s[0]) * c; cy += (q[1] + s[1]) * c; });
    ax += cx / 6; ay += cy / 6; at += a;
  }
  return [ax / at, ay / at];
};
const move = (p, dx, dy, s = 1) => p.map(([x, y]) => [x * s + dx, y * s + dy]);
const meet = (x1, k1, x2, k2) => (x2 - x1) / (k1 - k2); // y where x = x1 + y*k1 meets x = x2 + y*k2 (k in x per y)

// The check: a short "\" stroke with a level top whose foot is cut by the long stroke's slope, and a long "/" stroke with
// level ends. Both strokes lean 1/K across per unit down. W is the horizontal width of each stroke. The long stroke's inner
// edge is one straight line through the check's point; the short stroke's foot runs parallel to it, g to the left, so the
// join is one hairline of even width. `reach` is how far down that line the long stroke comes: 0 stops it level with the
// short stroke's inner corner (as the original), 1 runs it to the baseline (B).
function check({ W, top, g, reach }) {
  const s = 1 / K, tipY = 70;
  const tipX = (tipY - top) * s;
  // short stroke: left edge x = (y - top)*s, right edge x = W + (y - top)*s, foot x = tipX - g + (tipY - y)*s
  const footX0 = tipX - g + tipY * s; // foot line: x = footX0 - y*s
  const tipY2 = meet(-top * s, s, footX0, -s); // left edge meets foot
  const notchY = meet(W - top * s, s, footX0, -s); // right edge meets foot
  const short = [[0, top], [W, top], [W + (notchY - top) * s, notchY], [(tipY2 - top) * s, tipY2]];
  // long stroke: left edge x = edge0 - y*s, through the check's point
  const edge0 = tipX + tipY * s;
  const foot = notchY + reach * (tipY - notchY);
  const long = [[edge0, 0], [edge0 + W, 0], [edge0 + W - foot * s, foot], [edge0 - foot * s, foot]];
  return [short, long];
}

const VARIANTS = [
  { id: 'a', name: 'A · Faithful', note: 'Today’s floating long stroke, now tucked beside the short one across one even hairline.', W: 22, top: 27, g: 3.6, r: 3, reach: 0.5 },
  { id: 'b', name: 'B · Seam', note: 'The long stroke runs to the baseline; the short one leans on it across one hairline.', W: 22, top: 27, g: 3.6, r: 3, reach: 1 },
  { id: 'c', name: 'C · Refined', note: 'A, with lighter strokes and a longer short stroke. Calmer, more hotel.', W: 17.5, top: 22, g: 3.6, r: 2.6, reach: 0.5 },
];

// ---- wordmark: the official glyphs (straight-sided), respaced, with corners matched to the mark ----
const toPoly = (d) => {
  const pts = []; let x = 0, y = 0;
  for (const [, c, a] of d.matchAll(/([MLHVZ])([^MLHVZ]*)/g)) {
    const n = a.trim().split(/[\s,]+/).filter(Boolean).map(Number);
    if (c === 'M' || c === 'L') [x, y] = n; else if (c === 'H') x = n[0]; else if (c === 'V') y = n[0]; else continue;
    pts.push([x, y]);
  }
  const [a, b] = [pts[0], pts.at(-1)];
  if (Math.abs(a[0] - b[0]) < 1e-6 && Math.abs(a[1] - b[1]) < 1e-6) pts.pop();
  return pts;
};
const GLYPHS = WORDMARK.map(toPoly); // T, y, l, l
const xr = (p) => [Math.min(...p.map((q) => q[0])), Math.max(...p.map((q) => q[0]))];
const CAP_TOP = 2.746, DESC = 80.271; // the l's top and the y's foot: the word's full height

function lockup(v, polys) {
  // Mark as tall as the word (l top to y foot); a pointed foot overshoots the line by 1 so it looks aligned.
  const ys = polys.flat().map((p) => p[1]);
  const h0 = Math.max(...ys) - Math.min(...ys);
  const over = v.reach === 1 ? 0 : 1.2;
  const s = (DESC - CAP_TOP + over) / h0;
  const mark = polys.map((p) => move(p, -Math.min(...polys.flat().map((q) => q[0])) * s, CAP_TOP - Math.min(...ys) * s, s));
  const mw = Math.max(...mark.flat().map((p) => p[0]));
  // Spacing: mark to T = one stroke width; T tucks over the y as drawn; y to l and l to l evened to the stems.
  const gaps = [v.W * s * 1.08, 2.95, 7.4, 10.83];
  let x = mw;
  const word = GLYPHS.map((g, i) => { const [l, r] = xr(g); const out = move(g, x + gaps[i] - l, 0); x += gaps[i] + (r - l); return out; });
  const rWord = 1.1 * (v.r / 3); // the letters are about half the mark's weight, so about a third of its radius reads the same
  return { d: [...mark.map((p) => rounded(p, v.r * s)), ...word.map((p) => rounded(p, rWord))], w: x, h: DESC, mark };
}

// The vectors src/config/mark.ts takes, in the logo's own frame (the mark at the left, the word's baseline at 60), with the
// mark's box and how far each stroke must slide along its own slope to start fully hidden (src/scripts/checkmark.ts).
function vectors(lock) {
  const [short, long] = lock.mark;
  const all = lock.mark.flat();
  const box = [Math.min(...all.map((p) => p[0])), Math.min(...all.map((p) => p[1])), Math.max(...all.map((p) => p[0])), Math.max(...all.map((p) => p[1]))];
  const axis = (dx, dy) => { const l = Math.hypot(dx, dy); return [dx / l, dy / l]; };
  const reach = (poly, a) => { const t = poly.map(([x, y]) => x * a[0] + y * a[1]); return Math.max(...t) - Math.min(...t); };
  const sA = axis(1 / K, 1), lA = axis(1 / K, -1);
  return {
    SHORT: lock.d[0], LONG: lock.d[1], WORDMARK: lock.d.slice(2),
    width: f(lock.w), height: f(lock.h + 1), markBox: box.map(f),
    shortAxis: sA.map(f), longAxis: lA.map(f), shortLen: Math.ceil(reach(short, sA)) + 1, longLen: Math.ceil(reach(long, lA)) + 1,
  };
}

// App icon: a full-bleed square (the platforms add their own mask), mark centred between its box and its visual mass.
function icon(polys, r, size = 1024, fill = 0.56) {
  const all = polys.flat();
  const [x0, x1] = [Math.min(...all.map((p) => p[0])), Math.max(...all.map((p) => p[0]))];
  const [y0, y1] = [Math.min(...all.map((p) => p[1])), Math.max(...all.map((p) => p[1]))];
  const s = (size * fill) / Math.max(x1 - x0, y1 - y0);
  const [cx, cy] = centroid(polys);
  const ox = ((x0 + x1) / 2 + cx) / 2, oy = ((y0 + y1) / 2 + cy) / 2;
  return polys.map((p) => rounded(move(p, size / 2 - ox * s, size / 2 - oy * s, s), r * s));
}

const svg = (vb, paths, fg, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}<g fill="${fg}">${paths.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;

// ---- build ----
const rows = [];
const official = { id: 'original', name: 'Original', note: 'The live logo, untouched.', markVB: '-1 -1 77 72', mark: [SHORT, LONG], lock: { d: [SHORT, LONG, ...WORDMARK], w: 224, h: 81 } };
{
  // the official mark in a full-bleed icon, centred the same way, for a fair comparison
  const o = { ...official, icon: [`<g transform="translate(232 262) scale(7.6)"><path d="${SHORT}"/><path d="${LONG}"/></g>`] };
  rows.push(o);
}
for (const v of VARIANTS) {
  const polys = check(v);
  const all = polys.flat();
  const x0 = Math.min(...all.map((p) => p[0])), y0 = Math.min(...all.map((p) => p[1]));
  const norm = polys.map((p) => move(p, -x0, -y0));
  const nw = Math.max(...norm.flat().map((p) => p[0])), nh = Math.max(...norm.flat().map((p) => p[1]));
  const markPaths = norm.map((p) => rounded(p, v.r));
  const lock = lockup(v, norm);
  const iconPaths = icon(norm, v.r);
  const vb = `-1 -1 ${f(nw + 2)} ${f(nh + 2)}`;
  writeFileSync(`${OUT}${v.id}-mark.svg`, svg(vb, markPaths, '#14161a'));
  writeFileSync(`${OUT}${v.id}-logo.svg`, svg(`0 0 ${f(lock.w)} ${f(lock.h + 1)}`, lock.d, '#14161a'));
  writeFileSync(`${OUT}${v.id}-logo-white.svg`, svg(`0 0 ${f(lock.w)} ${f(lock.h + 1)}`, lock.d, '#ffffff'));
  writeFileSync(`${OUT}${v.id}-app-icon.svg`, svg('0 0 1024 1024', iconPaths, '#ffffff', '#14161a'));
  writeFileSync(`${OUT}${v.id}-vectors.json`, JSON.stringify(vectors(lock), null, 1));
  rows.push({ ...v, markVB: vb, mark: markPaths, lock, icon: iconPaths.map((d) => `<path d="${d}"/>`) });
  console.log(v.name, 'slope', (Math.atan(K) * 180 / Math.PI).toFixed(1) + '°', 'mark', f(nw), '×', f(nh));
}

// ---- comparison sheet ----
const markSvg = (r, fg, bg = '') => svg(r.markVB, r.mark, fg, bg);
const lockSvg = (r, fg) => svg(`0 0 ${f(r.lock.w)} ${f(r.lock.h + 1)}`, r.lock.d, fg);
const iconSvg = (r) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="#14161a"/><g fill="#fff">${r.icon.join('')}</g></svg>`;
const uri = (s) => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');

const html = `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{font:15px/1.4 -apple-system,'Helvetica Neue',sans-serif;color:#14161a;background:#fff;width:1720px;padding:56px 64px 64px}
h1{font-weight:400;font-size:30px;letter-spacing:-.01em}
.sub{color:#5c626b;margin:6px 0 40px}
.head,.row{display:grid;grid-template-columns:210px 200px 330px 330px 150px 1fr;gap:28px;align-items:center}
.head{color:#8a9099;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid #d9dce0}
.row{padding:30px 0;border-bottom:1px solid #e6e8eb}
.name{font-size:19px}.note{color:#5c626b;font-size:13.5px;margin-top:6px}
.cell{height:150px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#f4f5f6}
.cell.dark{background:#14161a}
.cell img{max-height:100px;max-width:82%}
.cell.mk img{height:104px}
.icon img{width:118px;height:118px;border-radius:27px;box-shadow:0 1px 3px rgba(0,0,0,.25)}
.px{display:flex;gap:18px;align-items:flex-end}
.px figure{text-align:center;color:#8a9099;font-size:11.5px}
.px canvas{display:block;width:64px;height:64px;image-rendering:pixelated;border:1px solid #e1e3e6;margin-bottom:6px}
</style>
<h1>Tyll logo, refined</h1>
<p class="sub">Same check, drawn exactly. Both strokes lean at the wordmark’s own angle (${(Math.atan(K) * 180 / Math.PI).toFixed(1)}°), every corner has one radius, the mark is as tall as the word. Small sizes are real pixels, enlarged.</p>
<div class="head"><div></div><div>Mark</div><div>Logo</div><div>On black</div><div>App icon</div><div>16 px · 32 px · 64 px</div></div>
${rows.map((r) => `<div class="row">
  <div><div class="name">${r.name}</div><div class="note">${r.note}</div></div>
  <div class="cell mk"><img src="${uri(markSvg(r, '#14161a'))}"></div>
  <div class="cell"><img src="${uri(lockSvg(r, '#14161a'))}"></div>
  <div class="cell dark"><img src="${uri(lockSvg(r, '#ffffff'))}"></div>
  <div class="icon"><img src="${uri(iconSvg(r))}"></div>
  <div class="px">${[16, 32, 64].map((n) => `<figure><canvas data-src="${uri(iconSvg(r))}" data-n="${n}"></canvas>${n} px</figure>`).join('')}
    ${[16, 32].map((n) => `<figure><canvas data-src="${uri(markSvg(r, '#14161a', '#ffffff'))}" data-n="${n}"></canvas>tab ${n}</figure>`).join('')}</div>
</div>`).join('')}
<script>
window.done = Promise.all([...document.querySelectorAll('canvas')].map((c) => new Promise((ok) => {
  const n = +c.dataset.n, img = new Image();
  img.onload = () => { c.width = n; c.height = n; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, n, n);
    const s = Math.min(n / img.naturalWidth, n / img.naturalHeight) * (c.dataset.src.length && img.naturalWidth === img.naturalHeight ? 1 : 0.92);
    const w = img.naturalWidth * s, h = img.naturalHeight * s; x.drawImage(img, (n - w) / 2, (n - h) / 2, w, h); ok(); };
  img.src = c.dataset.src;
})));
</script>`;
writeFileSync(`${OUT}compare.html`, html);

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1720, height: 900, deviceScaleFactor: 2 });
await page.setContent(html);
await page.evaluate(() => window.done);
await page.screenshot({ path: `${OUT}compare.png`, fullPage: true });
await page.setViewport({ width: 1720, height: 100, deviceScaleFactor: 2 }); // a close-up of the marks alone, large
await page.setContent(`<body style="margin:0;background:#fff;display:flex;gap:60px;padding:60px;width:max-content">${rows.map((r) => `<div style="text-align:center;font:15px -apple-system,sans-serif;color:#5c626b"><img style="height:300px;display:block;margin-bottom:18px" src="${uri(markSvg(r, '#14161a'))}">${r.name}</div>`).join('')}</body>`);
await page.screenshot({ path: `${OUT}marks-large.png`, fullPage: true });
await browser.close();
console.log('wrote', OUT);
