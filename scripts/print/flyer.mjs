// Tyll pamphlet: A4 across (297 x 210 mm trim, 3 mm bleed) folded twice to DIN long, a letter fold with six
// panels. German printers call it "Wickelfalz, 6-seitig, DIN lang".
//
//   PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/print/flyer.mjs
//
// 11 Nov 2026, the owner: keep the content of the earlier (turquoise) version; then "do the same thing with the
// gradient as on the banner, right now it is too boxy, and change the black with white". So: every photograph
// dissolves into white instead of ending in a hard edge, there are no black panels or blocks (the back and the
// cover's offer are white, with a soft silver gradient and the site's silver wave along the foot of the outside),
// and the cards are soft grey with no border. Black stays for type, the one Book a demo button and the QR codes.
// Colour comes only from photographs, in their own colours.
//
// Outside (page 1), left to right: the flap, 97 mm (the buffet, then "Why it matters, in three numbers") | the
// back, 100 mm ("See it on your own numbers.", Book a demo, the offer, the QR code) | the cover, 100 mm (the hotel
// square, the headline, three ticked lines with one about stock, the offer). Folds at 97 and 197 mm.
// Inside (page 2), left to right: 100 mm (the chef counting stock, what Tyll does, the three parts) | 100 mm (the
// daily report: the site's morning card, the three reassurances, the reception desk) | 97 mm (How it works in four
// steps, the vegetables, Book a demo with the QR code). Folds at 100 and 200 mm.
//
// Writes to print/flyer/: flyer_outside.svg and flyer_inside.svg (fonts and photos embedded), a trimmed preview
// and a guide sheet (bleed, trim, safe areas, folds) for each side, and flyer_print_ready.pdf (two pages,
// 303 x 216 mm, outside then inside; print double-sided, flipped on the short edge).
import { join } from 'node:path';
import { ROOT, C, mix, fontsCss, logo, wave, qrTile, openKit, render, photo, cornerShade } from './lib.mjs';

// ---- Format (mm) ----
const TRIM_W = 297;
const TRIM_H = 210;
const BLEED = 3;
const W = TRIM_W + 2 * BLEED;
const H = TRIM_H + 2 * BLEED;
const PM = 9; // text margin inside a panel
const safeBoxes = (edges) => edges.slice(0, -1).map((x, i) => ({ x0: x + (i ? 4 : 5), x1: edges[i + 1] - (i < edges.length - 2 ? 4 : 5), y0: 5, y1: TRIM_H - 5 }));
const OUT_FOLDS = [97, 197];
const IN_FOLDS = [100, 200];
const SOFT = C.pageDeep; // the soft grey of cards
const MIST = mix(C.white, C.silverLight, 1); // the silver the outside fades to at its foot

// The booking calendar ("15 min talk with Tyll"), the same address as `calendly` in src/config/site.ts.
// If that address ever changes, the printed codes stop working: keep the old one alive or reprint.
const QR_URL = 'https://calendly.com/besher-asfari-code/new-meeting';
const OFFER = ['30 days free.', 'No fee unless the pilot finds real money.'];

const kit = await openKit();
const { para, width } = kit;
const tspans = (lines, x, y0, lh) => lines.map((t, i) => `<tspan x="${x}" y="${(y0 + i * lh).toFixed(3)}">${t}</tspan>`).join('');
const photos = [];
const pic = async (o) => {
  const p = await photo({ bleed: BLEED, ...o });
  photos.push(p);
  return p.svg;
};
const tick = (x, y, fill = C.ink) =>
  `<path d="M${x} ${y - 1.1}l0.95 1 1.9-2.3" fill="none" stroke="${fill}" stroke-width="0.4" stroke-linecap="round" stroke-linejoin="round"/>`;
/** A photograph's edge dissolving into white over `len` mm (for photo({ shade })) */
const fade = (edge, len) => (wmm, hmm) => {
  const [y1, y2] = edge === 'bottom' ? [hmm - len, hmm] : [len, 0];
  return `<defs><linearGradient id="f${edge}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.62"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient></defs><rect y="${edge === 'bottom' ? hmm - len : 0}" width="${wmm}" height="${len}" fill="url(#f${edge})"/>`;
};
const both = (...fns) => (wmm, hmm) => fns.map((f) => f(wmm, hmm)).join('');

// ================= Outside: flap | back | cover =================
const FLAP = { x: 0, w: 97 };
const BACK = { x: 97, w: 100 };
const COVER = { x: 197, w: 100 };
let o = '';
const addO = (p) => ((o += p.svg + '\n'), p);
let oImages = '';
const MIST_Y = 150; // the outside turns from white to silver below here

// ---- Cover: the hotel square dissolving into white, the headline, three ticked lines, the offer ----
const cx = COVER.x + PM;
const cw = COVER.w - 2 * PM;
const COVER_PHOTO_H = 108;
oImages += await pic({
  file: 'assets/video/city/h4-nano.png', x: COVER.x, y: 0, w: COVER.w, h: COVER_PHOTO_H, edges: 'tr', focus: [0.52, 0.42], saturation: 1.05,
  shade: both(() => cornerShade(22, 18, 62, C.ink, 0.78), fade('bottom', 40)),
});
const HEAD = ['Hotels lose money', 'every night.'];
const HS = (cw * 0.985) / width(HEAD[0], 'serif-r', 1);
const HLH = HS * 1.06;
const HY = COVER_PHOTO_H + 4;
o += logo({ x: cx, y: 11, w: 31, fill: C.white, id: 'c-logo' }) + '\n';
o += `<text id="c-head-1" data-safe="" class="serif-r" font-size="${HS.toFixed(3)}" fill="${C.ink}">${tspans(HEAD, cx, HY, HLH)}</text>\n`;
addO(para({ id: 'c-head-2', text: 'Tyll shows them where.', x: cx, y: HY + HLH + 9.4, f: 'serif-r', size: 7.4, fill: C.grey }));
['Every tab, receipt and invoice checked', 'Know where your stock goes', 'One order list every morning'].forEach((t, i) => {
  const y = HY + HLH + 18.6 + i * 4.8;
  o += tick(cx + 0.2, y) + '\n';
  addO(para({ text: t, x: cx + 4.6, y, f: 'sans', size: 3.15, fill: C.ink }));
});
addO(para({ id: 'c-offer', text: OFFER[0], x: cx, y: 184, f: 'serif-r', size: 8.6, fill: C.ink }));
addO(para({ text: OFFER[1], x: cx, y: 190.6, f: 'sans', size: 3.0, fill: C.grey }));
addO(para({ id: 'c-url', text: 'tyll.ai', x: cx, y: 200, f: 'sans-b', size: 3.0, fill: C.ink }));

// ---- Flap: the buffet dissolving into white, then why it matters, in three numbers ----
const fx = FLAP.x + PM;
const fw = FLAP.w - 2 * PM;
const FLAP_PHOTO_H = 70;
oImages += await pic({ file: 'src/assets/photos/sales-buffet.jpg', x: FLAP.x, y: 0, w: FLAP.w, h: FLAP_PHOTO_H, edges: 'tl', focus: [0.6, 0.45], saturation: 1.03, shade: fade('bottom', 28) });
const fh = addO(para({ id: 'f-head', text: 'Why it matters, in three numbers.', x: fx, y: FLAP_PHOTO_H + 5, f: 'serif', size: 5.4, lh: 6.6, max: fw, fill: C.ink }));
const NUMBERS = [
  ['18%', 'of everything a kitchen buys is thrown away.', 'WRAP, UK Food Waste and Food Surplus Key Facts, July 2025. Across food service, not a Tyll result.'],
  ['7×', 'return for every euro hotels invested in cutting kitchen waste.', 'WRI and WRAP for Champions 12.3, 2018. 42 hotels, not a Tyll result.'],
  ['€1,150', 'lost on one item, in one bar, in one month.', 'Measured in a Tyll pilot, one hotel bar, one month. 190 Cokes sent, then taken off the bill with no reason. Nobody noticed until Tyll did.'],
];
let ny = fh.bottom + 6.5;
for (const [figure, title, source] of NUMBERS) {
  o += `<line x1="${fx}" x2="${fx + fw}" y1="${ny.toFixed(2)}" y2="${ny.toFixed(2)}" stroke="${C.sand600}" stroke-width="0.25"/>\n`;
  addO(para({ text: figure, x: fx - 0.3, y: ny + 12.4, f: 'serif-r', size: 11.5, fill: C.ink }));
  const t = addO(para({ text: title, x: fx, y: ny + 18.4, f: 'sans', size: 3.1, lh: 4.2, max: fw, fill: C.ink }));
  const sp = addO(para({ text: source, x: fx, y: t.bottom + 4.4, f: 'sans', size: 2.2, lh: 3.0, max: fw, fill: C.grey }));
  ny = sp.bottom + 5.4;
}

// ---- Back: white, see it on your own numbers ----
const bx = BACK.x + PM;
const bw = BACK.w - 2 * PM;
o += logo({ x: bx, y: 11, w: 30, fill: C.ink, id: 'b-logo' }) + '\n';
o += `<text id="b-final" data-safe="" class="serif" font-size="8.2" fill="${C.ink}">${tspans(['See it on your', 'own numbers.'], bx, 52, 9.4)}</text>\n`;
o += `<g id="b-cta" data-safe=""><rect x="${bx}" y="70" width="46" height="11.6" rx="5.8" fill="${C.ink}"/><text class="sans-b" font-size="3.9" fill="${C.white}" x="${bx + 23}" y="77.2" text-anchor="middle">Book a demo</text></g>\n`;
addO(para({ text: OFFER[0], x: bx, y: 91.4, f: 'sans-b', size: 3.2, fill: C.ink }));
addO(para({ text: OFFER[1], x: bx, y: 96.4, f: 'sans', size: 3.1, lh: 4.4, max: bw, fill: C.grey }));
const QR_SIDE = 36;
const qrY = 106;
o += qrTile({ url: QR_URL, x: bx, y: qrY, side: QR_SIDE, r: 1.8, id: 'b-qr', stroke: ` stroke="${C.ink}" stroke-width="0.35"` }) + '\n';
// a drawn arrow from the word "Scan" to the code
const ax = bx + QR_SIDE + 4;
o += `<path d="M${ax + 13} ${qrY + 10.5} C ${ax + 9} ${qrY + 15}, ${ax + 4} ${qrY + 16.5}, ${ax + 0.6} ${qrY + 14.4}" fill="none" stroke="${C.ink}" stroke-width="0.35" stroke-linecap="round"/><path d="M${ax + 2.6} ${qrY + 12.4} L${ax + 0.6} ${qrY + 14.4} L${ax + 3.3} ${qrY + 15.3}" fill="none" stroke="${C.ink}" stroke-width="0.35" stroke-linecap="round" stroke-linejoin="round"/>\n`;
addO(para({ id: 'b-scan', text: 'Scan', x: ax + 9.5, y: qrY + 7.5, f: 'serif', size: 4.6, fill: C.ink }));
addO(para({ text: 'Scan to book a 15 minute call', x: bx, y: qrY + QR_SIDE + 6.2, f: 'sans-b', size: 3.0, fill: C.ink }));
addO(para({ id: 'b-url', text: 'tyll.ai', x: bx, y: qrY + QR_SIDE + 18.5, f: 'serif', size: 6.4, fill: C.ink }));
addO(para({ id: 'b-mail', text: 'info@tyll.ai', x: bx, y: qrY + QR_SIDE + 25.5, f: 'sans', size: 3.3, fill: C.grey }));

// The silver wave along the foot of the flap and the back, on the silver mist (kept off the cover's offer)
const silver = wave({ id: 'o-wave', ground: mix(C.white, MIST, 0.8), s: 0.14, sy: 0.07, tx: -8, ty: 203 - 668 * 0.07, stroke: 0.16, light: true, strength: 1.2 });

const outside = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">
<title>Tyll pamphlet, outside: flap, back, cover. A4 with 3 mm bleed, folds at 97 and 197 mm</title>
<defs>
<style>${fontsCss()}</style>
<clipPath id="w-clip"><rect x="${-BLEED}" y="${-BLEED}" width="${COVER.x + BLEED - 2}" height="${H}"/></clipPath>
<linearGradient id="mist" x1="0" y1="${MIST_Y + BLEED}" x2="0" y2="${H}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.white}"/><stop offset="1" stop-color="${MIST}"/></linearGradient>
${silver.defs}
</defs>
<rect width="${W}" height="${H}" fill="${C.white}"/>
<rect y="${MIST_Y + BLEED}" width="${W}" height="${H - MIST_Y - BLEED}" fill="url(#mist)"/>
${oImages}
<g transform="translate(${BLEED} ${BLEED})">
<g clip-path="url(#w-clip)">${silver.body}</g>
${o}</g>
</svg>
`;

// ================= Inside: what Tyll does | the daily report | how it works =================
const P1 = { x: 0, w: 100 };
const P2 = { x: 100, w: 100 };
const P3 = { x: 200, w: 97 };
let n = '';
const addN = (p) => ((n += p.svg + '\n'), p);
let nImages = '';

// ---- Panel 1: the chef counting stock dissolving into white, what Tyll does, the three parts ----
const x1 = P1.x + PM;
const w1 = P1.w - 2 * PM;
const STOCK_H = 84;
nImages += await pic({ file: 'assets/video/city/H2.png', x: P1.x, y: 0, w: P1.w, h: STOCK_H, edges: 'tl', focus: [0.72, 0.5], saturation: 1, shade: fade('bottom', 30) });
const intro = addN(para({ id: 'i-intro', text: 'Tyll reconciles every tab, receipt and invoice overnight, then turns the numbers into a stock count and an order list your team can act on.', x: x1, y: STOCK_H + 3, f: 'serif', size: 5.1, lh: 6.7, max: w1, fill: C.ink }));
const PARTS = [
  ['Stock and Waste', 'Know where your stock goes. One ten minute count on a phone, and the gap is explained.'],
  ['Purchasing', 'Order what you will sell, not a guess. One list per supplier, built from the count and the forecast.'],
  ['Revenue and Reconciliation', 'Find the money that left without a reason. Each night’s tabs checked against the receipts.'],
];
let py = intro.bottom + 9;
for (const [title, text] of PARTS) {
  n += `<line x1="${x1}" x2="${x1 + w1}" y1="${py.toFixed(2)}" y2="${py.toFixed(2)}" stroke="${C.sand600}" stroke-width="0.25"/>\n`;
  addN(para({ text: title, x: x1, y: py + 5.5, f: 'sans-b', size: 2.45, tracking: 0.3, upper: true, fill: C.ink }));
  const t = addN(para({ text, x: x1, y: py + 11, f: 'sans', size: 3.0, lh: 4.25, max: w1, fill: C.grey }));
  py = t.bottom + 6.6;
}

// ---- Panel 2: the daily report (the site's morning card, soft grey, no border), the reassurances, the desk ----
const x2 = P2.x + PM;
const w2 = P2.w - 2 * PM;
const h2 = addN(para({ id: 'i-morning', text: 'Every morning: what went missing yesterday, and what it cost you.', x: x2, y: 21, f: 'serif', size: 6.0, lh: 7.4, max: w2, fill: C.ink }));
// the morning card (hero.card), with the no-alcohol items the Arabic site uses
const MC = {
  title: 'This morning · Bar & restaurant',
  count: '3 lines to check',
  total: '€264',
  rows: [
    ['Mocktail', 'Sent, then removed. No reason given.', '€68', 'TAB 2094'],
    ['Fresh orange juice', 'Poured, never billed.', '€52', 'TAB 2099'],
    ['2 × Club sandwich', 'Room service, missing from room 517.', '€144', 'CHK 3384'],
  ],
  cta: 'Open the full list →',
};
const mcY = h2.bottom + 8;
const ROW = 14.6;
const mcH = 21 + ROW * 3 + 10;
n += `<rect x="${x2}" y="${mcY.toFixed(2)}" width="${w2}" height="${mcH}" rx="3.2" fill="${SOFT}"/>\n`;
addN(para({ text: MC.title, x: x2 + 4.4, y: mcY + 7.4, f: 'sans', size: 2.35, fill: C.grey }));
addN(para({ text: MC.count, x: x2 + 4.4, y: mcY + 15.2, f: 'serif-r', size: 5, fill: C.ink }));
addN(para({ text: MC.total, x: x2 + w2 - 4.4, y: mcY + 15.2, f: 'serif-r', size: 5, fill: C.ink, anchor: 'end' }));
MC.rows.forEach(([name, reason, amount, ticket], i) => {
  const ry = mcY + 21 + i * ROW;
  n += `<line x1="${x2 + 4.4}" x2="${x2 + w2 - 4.4}" y1="${ry.toFixed(2)}" y2="${ry.toFixed(2)}" stroke="${C.sand600}" stroke-width="0.2"/>\n`;
  n += `<g transform="translate(${x2 + 4} ${(ry + 3.6).toFixed(2)}) scale(${4.4 / 16})" fill="none" stroke="${C.ink}" stroke-width="0.85" stroke-linejoin="round" stroke-linecap="round"><path d="M4 2.5h8v11l-2-1.2-2 1.2-2-1.2-2 1.2Z"/><path d="M6.2 6.2l3.6 3.6M9.8 6.2l-3.6 3.6"/></g>\n`;
  addN(para({ text: name, x: x2 + 11.2, y: ry + 6.6, f: 'sans-b', size: 2.75, fill: C.ink }));
  addN(para({ text: reason, x: x2 + 11.2, y: ry + 10.4, f: 'sans', size: 2.3, lh: 3.1, max: w2 - 11.2 - 4.4 - 13, fill: C.grey }));
  addN(para({ text: amount, x: x2 + w2 - 4.4, y: ry + 6.6, f: 'sans-b', size: 2.75, fill: C.ink, anchor: 'end' }));
  addN(para({ text: ticket, x: x2 + w2 - 4.4, y: ry + 10.2, f: 'sans', size: 1.95, fill: C.grey, anchor: 'end' }));
});
const ctaY = mcY + 21 + ROW * 3;
n += `<line x1="${x2 + 4.4}" x2="${x2 + w2 - 4.4}" y1="${ctaY.toFixed(2)}" y2="${ctaY.toFixed(2)}" stroke="${C.sand600}" stroke-width="0.2"/>\n`;
addN(para({ text: MC.cta, x: x2 + 4.4, y: ctaY + 6.3, f: 'sans-b', size: 2.5, fill: C.ink }));
const noteY = mcY + mcH + 5;
addN(para({ text: 'Example screens use fictional data.', x: x2, y: noteY, f: 'sans', size: 2.2, fill: C.grey }));
['Read only', 'Nothing to replace', 'No fee unless the pilot finds real money'].forEach((t, i) => {
  const y = noteY + 9.5 + i * 5;
  n += tick(x2 + 0.2, y) + '\n';
  addN(para({ text: t, x: x2 + 4.4, y, f: 'sans', size: 2.95, fill: C.ink }));
});
const P2_PHOTO_Y = noteY + 9.5 + 2 * 5 + 2;
nImages += await pic({ file: 'src/assets/photos/reconciliation-reception.jpg', x: P2.x, y: P2_PHOTO_Y, w: P2.w, h: TRIM_H - P2_PHOTO_Y, edges: 'b', focus: [0.45, 0.55], saturation: 1.03, shade: fade('top', 22) });

// ---- Panel 3: how it works in four steps, the vegetables rising from white, Book a demo on a white card ----
const x3 = P3.x + PM;
const w3 = P3.w - 2 * PM;
const h3 = addN(para({ id: 'i-how', text: 'Four steps. Then every morning you see what your hotel lost.', x: x3, y: 21, f: 'serif', size: 6.0, lh: 7.4, max: w3, fill: C.ink }));
// (no subtitle here: "Read only. Nothing to replace." is already ticked on the middle panel)
const h3s = { bottom: h3.bottom + 2 };
const STEPS = [
  ['Book a 15 minute call', 'We look at your outlets together and check that Tyll fits.'],
  ['Free stock count', 'We count your bar with your team. About 10 minutes per person.'],
  ['We read your POS', 'Tyll reads last night’s sales from the system you already use.'],
  ['Your daily report', 'Every morning: what went missing yesterday, and what it cost you. Free for 30 days.'],
];
const S0 = h3s.bottom + 10;
const PITCH = 18.5;
n += `<line x1="${x3 + 3}" x2="${x3 + 3}" y1="${S0}" y2="${S0 + PITCH * 3}" stroke="${C.sand600}" stroke-width="0.25"/>\n`;
STEPS.forEach(([title, text], i) => {
  const cy = S0 + i * PITCH;
  n += `<circle cx="${x3 + 3}" cy="${cy}" r="3" fill="${C.white}" stroke="${C.ink}" stroke-width="0.3"/>\n`;
  addN(para({ text: String(i + 1), x: x3 + 3, y: cy + 1, f: 'sans-b', size: 2.8, fill: C.ink, anchor: 'middle' }));
  addN(para({ text: title, x: x3 + 9.5, y: cy + 1, f: 'sans-b', size: 3.1, fill: C.ink }));
  addN(para({ text, x: x3 + 9.5, y: cy + 5.6, f: 'sans', size: 2.75, lh: 3.8, max: w3 - 9.5, fill: C.grey }));
});
const P3_PHOTO_Y = S0 + PITCH * 3 + 10;
nImages += await pic({ file: 'src/assets/photos/forecast-produce.jpg', x: P3.x, y: P3_PHOTO_Y, w: P3.w, h: TRIM_H - P3_PHOTO_Y, edges: 'rb', focus: [0.55, 0.45], saturation: 1.03, shade: fade('top', 24) });
const BOX = { x: x3 - 3, w: w3 + 6, h: 31 };
BOX.y = TRIM_H - 7 - BOX.h;
n += `<rect x="${BOX.x}" y="${BOX.y.toFixed(2)}" width="${BOX.w}" height="${BOX.h}" rx="3.2" fill="${C.white}"/>\n`;
addN(para({ id: 'i-book', text: 'Book a demo', x: BOX.x + 5, y: BOX.y + 12.4, f: 'serif', size: 6.2, fill: C.ink }));
addN(para({ text: 'Scan to book a 15 minute call', x: BOX.x + 5, y: BOX.y + 18.8, f: 'sans-b', size: 2.7, fill: C.ink }));
addN(para({ text: 'tyll.ai  ·  info@tyll.ai', x: BOX.x + 5, y: BOX.y + 24.4, f: 'sans', size: 2.7, fill: C.grey }));
n += qrTile({ url: QR_URL, x: BOX.x + BOX.w - 4.5 - 22, y: BOX.y + (BOX.h - 22) / 2, side: 22, r: 1.2, id: 'i-qr', stroke: ` stroke="${C.ink}" stroke-width="0.3"` }) + '\n';

const inside = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">
<title>Tyll pamphlet, inside. A4 with 3 mm bleed, folds at 100 and 200 mm</title>
<defs><style>${fontsCss()}</style></defs>
<rect width="${W}" height="${H}" fill="${C.white}"/>
${nImages}
<g transform="translate(${BLEED} ${BLEED})">
${n}</g>
</svg>
`;

const ok = await render({
  kit,
  outDir: join(ROOT, 'print', 'flyer'),
  pages: [
    { name: 'flyer_outside', svg: outside, safe: safeBoxes([0, ...OUT_FOLDS, TRIM_W]), folds: OUT_FOLDS },
    { name: 'flyer_inside', svg: inside, safe: safeBoxes([0, ...IN_FOLDS, TRIM_W]), folds: IN_FOLDS },
  ],
  w: W,
  h: H,
  bleed: BLEED,
  safe: { x0: 5, x1: TRIM_W - 5, y0: 5, y1: TRIM_H - 5 },
  pxPerMm: 8,
  pdf: 'flyer_print_ready.pdf',
});
await kit.browser.close();
console.log(`Photographs: ${photos.map((p) => `${p.file.split('/').pop()} ${p.ppi} ppi`).join(', ')}`);
console.log('Wrote print/flyer: flyer_outside.svg, flyer_inside.svg, previews, guides, flyer_print_ready.pdf');
process.exit(ok ? 0 : 1);
