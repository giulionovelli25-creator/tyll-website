// Tyll roll-up banner, 850 x 2000 mm trim with 3 mm bleed, printed to PDF by Chrome.
//
//   PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/print/roll-up.mjs
//
// Writes to print/roll-up/ (850 x 2060 mm: the same files named banner_850x2060*): banner.svg (fonts and picture embedded), banner_preview.png (trimmed),
// banner_guides.png (bleed, trim, safe area and the part the stand hides) and banner_print_ready.pdf
// (856 x 2006 mm; the type, logo and QR code are vector, the ground is one picture).
//
// Seventh design (11 Nov 2026). Black, white and silver, colour only from photographs (the owner: "don't pick a
// color ... incorporate colors through pictures"). The sixth was "too split up": four hard bands. So the ground is
// one continuous picture, day to night: the website's hero (assets/video/city/h4-nano.png) dissolves into white
// under the headline, the white darkens to black for the offer, and the night runs on to the foot with the site's
// silver wave and a large tyll.ai (final, 11 Nov 2026: the chef photograph that stood there was hidden by the table
// and, standing free, its lamp glare pulled the eye from the QR code). The silver wave also runs through the change from white
// to black, tying the parts together. The pilot's €1,150 was removed: on a banner it read like a price.
// Made for an event table (Unicon Berlin, Nov 2026): everything down to the QR code sits more than 790 mm above
// the floor, so a 75 cm table in front hides none of it; the lower photograph is for when it stands free.
// The ground is one 100 dpi JPEG with all its gradients and the wave baked in, so the PDF holds no transparency.
// Real resolution of the photograph: the hotel about 82 ppi, enlarged and sharpened.
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { ROOT, C, fontsCss, logo, qrTile, openKit, render } from './lib.mjs';
import { ribbon } from '../../src/scripts/wave.ts';

const sharp = createRequire(join(ROOT, 'package.json'))('sharp');

// ---- Format (mm) ----
const TRIM_W = 850;
// Height: 2000 mm by default; BANNER_H=2060 makes the 850 x 2060 mm version (11 Nov 2026), whose extra 60 mm sits at
// the foot and winds into the cassette, so everything above keeps its place and its height above the floor.
const TRIM_H = Number(process.env.BANNER_H || 2000);
const NAME = TRIM_H === 2000 ? 'banner' : `banner_850x${TRIM_H}`;
const BLEED = 3;
const W = TRIM_W + 2 * BLEED;
const H = TRIM_H + 2 * BLEED;
// Safe area in trim coordinates: the top rail covers about 40 mm, the cassette and its foot about 150 to 200 mm.
const SAFE = { x0: 50, x1: TRIM_W - 50, y0: 80, y1: TRIM_H - 200 };
const BLACK = C.ink;

const kit = await openKit();
const { width } = kit;

// ---- Copy (unchanged, less the €1,150) ----
// The booking calendar ("15 min talk with Tyll"), the same address as `calendly` in src/config/site.ts.
// If that address ever changes, the printed codes stop working: keep the old one alive or reprint.
const QR_URL = 'https://calendly.com/besher-asfari-code/new-meeting';
const HEAD = ['Hotels lose money', 'every night.'];
const HEAD_2 = 'Tyll shows them where.';
// Three short lines with ticks; the middle one is about stock (the owner, 11 Nov 2026: "add something about stock")
const SUB = ['Every tab, receipt and invoice checked', 'Know where your stock goes', 'One order list every morning'];
const OFFER = ['30 days free.', ['No fee unless the pilot', 'finds real money.']];
const CTA = 'Scan to book a 15 minute call';

// ---- Layout (trim coordinates, mm from the top; the floor is at 2000) ----
const X = 64;
const CW = TRIM_W - 2 * X;
const LOGO_W = 300;
const LOGO_Y = 92;
const PHOTO_END = 432; // the hotel is fully white by here
const FADE_START = 290; // and starts to dissolve here

const HEAD_SIZE = (CW * 0.985) / width(HEAD[0], 'serif-r', 1); // about 90 mm
const HEAD_LH = HEAD_SIZE * 1.06;
const HEAD_Y = 478;
const HEAD_2_SIZE = 66;
const HEAD_2_Y = HEAD_Y + HEAD_LH + 78;
const SUB_SIZE = 29;
const SUB_Y = HEAD_2_Y + 62;
const SUB_LH = SUB_SIZE * 1.42;

const DUSK = [SUB_Y + SUB_LH * (SUB.length - 1) + 16, 0]; // white begins to darken here
DUSK[1] = DUSK[0] + 104; // and is black by here
const OFFER_SIZE = 86;
const OFFER_Y = DUSK[1] + 74;
// The QR code, 240 mm (was 190; the owner: "make the QR code bigger"), its top level with the offer's capitals
const QR_SIDE = 240;
const QR_X = TRIM_W - X - QR_SIDE;
const QR_Y = OFFER_Y - 62;
const PILL_W = 452;
const PILL_H = 78;
const PILL_Y = QR_Y + QR_SIDE - PILL_H;
const OFFER_SUB_Y = OFFER_Y + 50;
// Three screens of the demo as bubbles, scattered across the night below the offer (the owner: "some bubbles
// where it shows off the demo at the bottom"), one per part of Tyll, each labelled with the screen's own question.
// The crops are from the demo films' posters (public/media/film/en/*-desk.jpg, 1360 x 860, Demo-Tyll's own data).
// Zigzag: each screen on one side, its question beside it on the other, so nothing stacks.
const Q0 = QR_Y + QR_SIDE; // the QR code's foot
const BUBBLES = [
  { file: 'stock-desk.jpg', crop: [252, 62, 760, 238], x: 36, y: Q0 + 56, w: 430, rot: -2.4, label: ['How much', 'stock is left?'], side: 'right' },
  { file: 'forecasting-desk.jpg', crop: [252, 62, 760, 238], x: 386, y: Q0 + 218, w: 430, rot: 2.0, label: ['What do I', 'need to order?'], side: 'left' },
  { file: 'finance-desk.jpg', crop: [252, 128, 860, 370], x: 36, y: Q0 + 382, w: 400, rot: -1.2, label: ['Do the invoices', 'match?'], side: 'right' },
];
const URL_Y = 1780; // tyll.ai at the foot, right, just above the stand

// ---- The ground: one picture, day to night, at 100 dpi ----
const DPI = 100;
const px = (v) => Math.round((v / 25.4) * DPI);
const IW = px(W);
const IH = px(H);
const B = BLEED;
const crop = async (file, wmm, hmm, focus) => {
  const m = await sharp(join(ROOT, file)).metadata();
  const aspect = wmm / hmm;
  let cw = m.width;
  let ch = Math.round(cw / aspect);
  if (ch > m.height) {
    ch = m.height;
    cw = Math.round(ch * aspect);
  }
  const left = Math.max(0, Math.min(m.width - cw, Math.round(focus[0] * m.width - cw / 2)));
  const top = Math.max(0, Math.min(m.height - ch, Math.round(focus[1] * m.height - ch / 2)));
  console.log(`${file.split('/').pop()}: ${Math.round(cw / (wmm / 25.4))} ppi`);
  return sharp(join(ROOT, file)).extract({ left, top, width: cw, height: ch }).resize(px(wmm), px(hmm), { kernel: 'lanczos3' }).sharpen({ sigma: 0.9 }).modulate({ saturation: 1.06 }).toBuffer();
};
const hotel = await crop('assets/video/city/h4-nano.png', W, PHOTO_END + B, [0.5, 0.4]);
const grain = await sharp({ create: { width: IW, height: IH, channels: 3, background: '#808080', noise: { type: 'gaussian', mean: 128, sigma: 7 } } }).greyscale().toColourspace('srgb').png().toBuffer();

// The silver wave, as on the site, running through the dusk
const WS = 0.92;
const WSY = 0.24;
const wy = DUSK[0] + 110 - 668 * WSY;
const footWave = ribbon(0.62)
  .map((l) => `<path d="${l.d}" opacity="${l.opacity}"/>`)
  .join('');
// The ribbon's sweeping part (drawing x 400 to 1500) across the width: its dip low on the left above tyll.ai,
// rising to the upper right towards the QR code, as the site's closing section does
const FWS = 0.78;
const FWSY = 0.8;
const FTX = -400 * FWS;
const fwy = 1610 - 668 * FWSY;
const waveLines = ribbon(0.3)
  .map((l) => `<path d="${l.d}" opacity="${l.opacity}"/>`)
  .join('');
const y = (v) => v + B; // trim to page
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${IW}" height="${IH}" viewBox="0 0 ${W} ${H}">
<defs>
 <linearGradient id="dayfade" x1="0" y1="${y(FADE_START)}" x2="0" y2="${y(PHOTO_END)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.55" stop-color="#fff" stop-opacity="0.7"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>
 <linearGradient id="dusk" x1="0" y1="${y(DUSK[0])}" x2="0" y2="${y(DUSK[1])}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0.22" stop-color="${C.silverLight}"/><stop offset="0.48" stop-color="${C.silverDeep}"/><stop offset="0.74" stop-color="#4a4f57"/><stop offset="1" stop-color="${BLACK}"/></linearGradient>
 <radialGradient id="corner" gradientUnits="userSpaceOnUse" cx="140" cy="120" r="440"><stop offset="0" stop-color="${BLACK}" stop-opacity="0.78"/><stop offset="0.45" stop-color="${BLACK}" stop-opacity="0.52"/><stop offset="1" stop-color="${BLACK}" stop-opacity="0"/></radialGradient>
 <linearGradient id="silver" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="1520" y2="0">
  <stop offset="0" stop-color="${C.silverDeep}" stop-opacity="0"/><stop offset="0.3" stop-color="${C.silverDeep}" stop-opacity="0.55"/>
  <stop offset="0.6" stop-color="${C.silver}" stop-opacity="0.95"/><stop offset="0.85" stop-color="${C.silverLight}" stop-opacity="0.6"/><stop offset="1" stop-color="${C.silver}" stop-opacity="0"/>
 </linearGradient>
</defs>
<rect width="${W}" height="${y(PHOTO_END) + 1}" fill="url(#corner)"/>
<rect y="${y(FADE_START)}" width="${W}" height="${PHOTO_END - FADE_START + 0.5}" fill="url(#dayfade)"/>
<rect y="${y(PHOTO_END)}" width="${W}" height="${DUSK[0] - PHOTO_END + 0.5}" fill="#fff"/>
<rect y="${y(DUSK[0])}" width="${W}" height="${DUSK[1] - DUSK[0] + 0.5}" fill="url(#dusk)"/>
<rect y="${y(DUSK[1])}" width="${W}" height="${H - y(DUSK[1])}" fill="${BLACK}"/>
<g fill="none" stroke="url(#silver)" stroke-width="${(1.4 / WSY).toFixed(2)}" transform="translate(${B - 60} ${y(wy)}) scale(${WS} ${WSY})">${waveLines}</g>
<g fill="none" stroke="url(#silver)" stroke-width="${(1.5 / FWSY).toFixed(2)}" transform="translate(${B + FTX} ${y(fwy)}) scale(${FWS} ${FWSY})">${footWave}</g>
</svg>`;
// Each bubble: the screen with rounded corners and a thin silver rim, a soft shadow, tilted a little, baked into the
// ground so the PDF holds no transparency. Its label is vector type, placed on the card's upper left.
const bubbleLayers = [];
for (const bu of BUBBLES) {
  const [l, t, cw, ch] = bu.crop;
  const wpx = px(bu.w);
  const hpx = Math.round((wpx * ch) / cw);
  bu.h = (hpx / DPI) * 25.4;
  const r = px(10);
  const rim = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${wpx}" height="${hpx}"><rect x="1" y="1" width="${wpx - 2}" height="${hpx - 2}" rx="${r}" fill="none" stroke="${C.silver}" stroke-width="3"/></svg>`);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${wpx}" height="${hpx}"><rect width="${wpx}" height="${hpx}" rx="${r}" fill="#fff"/></svg>`);
  const card = await sharp(join(ROOT, 'public', 'media', 'film', 'en', bu.file))
    .extract({ left: l, top: t, width: cw, height: ch })
    .resize(wpx, hpx, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.7 })
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }, { input: rim }])
    .png()
    .toBuffer();
  console.log(`${bu.file}: ${Math.round(cw / (bu.w / 25.4))} ppi`);
  const pad = px(30);
  const shadow = await sharp({ create: { width: wpx + 2 * pad, height: hpx + 2 * pad, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${wpx}" height="${hpx}"><rect width="${wpx}" height="${hpx}" rx="${r}" fill="#000" fill-opacity="0.7"/></svg>`), left: pad, top: pad }])
    .blur(px(9))
    .png()
    .toBuffer();
  const tilt = async (buf) => sharp(buf).rotate(bu.rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer({ resolveWithObject: true });
  const c = await tilt(card);
  const sh = await tilt(shadow);
  const cx = px(bu.x + B + bu.w / 2);
  const cy = px(bu.y + B + bu.h / 2);
  bubbleLayers.push({ input: sh.data, left: Math.round(cx - sh.info.width / 2), top: Math.round(cy - sh.info.height / 2 + px(10)) });
  bubbleLayers.push({ input: c.data, left: Math.round(cx - c.info.width / 2), top: Math.round(cy - c.info.height / 2) });
}
const groundJpg = await sharp({ create: { width: IW, height: IH, channels: 3, background: '#ffffff' } })
  .composite([
    { input: hotel, top: 0, left: 0 },
    { input: grain, blend: 'soft-light' },
    { input: Buffer.from(overlay), top: 0, left: 0 },
    ...bubbleLayers,
  ])
  .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
  .toBuffer();

const tspans = (lines, x, y0, lh) => lines.map((t, i) => `<tspan x="${x}" y="${(y0 + i * lh).toFixed(2)}">${t}</tspan>`).join('');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">
<title>Tyll roll-up banner, 850 x ${TRIM_H} mm, 3 mm bleed</title>
<defs><style>${fontsCss()}</style></defs>
<image x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none" href="data:image/jpeg;base64,${groundJpg.toString('base64')}"/>
<g transform="translate(${BLEED} ${BLEED})">
 ${logo({ x: X, y: LOGO_Y, w: LOGO_W, fill: C.white })}

 <text id="head-1" data-safe="" class="serif-r" font-size="${HEAD_SIZE.toFixed(2)}" fill="${C.ink}">${tspans(HEAD, X, HEAD_Y, HEAD_LH)}</text>
 <text id="head-2" data-safe="" class="serif-r" font-size="${HEAD_2_SIZE}" fill="${C.grey}" x="${X}" y="${HEAD_2_Y.toFixed(2)}">${HEAD_2}</text>
 <g id="sub" data-safe="">${SUB.map((t, i) => `<path d="M${X + 1} ${(SUB_Y + i * SUB_LH - 9).toFixed(2)}l7 7.5 14-17" fill="none" stroke="${C.ink}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}<text class="sans" font-size="${SUB_SIZE}" fill="${C.ink}">${tspans(SUB, X + 32, SUB_Y, SUB_LH)}</text></g>

 <g id="offer" data-safe="">
  <text class="serif-r" font-size="${OFFER_SIZE}" fill="${C.white}" x="${X - 3}" y="${OFFER_Y.toFixed(2)}">${OFFER[0]}</text>
  <text class="sans" font-size="27" fill="${C.silver}">${tspans(OFFER[1], X, OFFER_SUB_Y, 36)}</text>
  <rect x="${X}" y="${PILL_Y.toFixed(2)}" width="${PILL_W}" height="${PILL_H}" rx="${PILL_H / 2}" fill="${C.white}"/>
  <text class="sans-b" font-size="27" fill="${C.ink}" x="${X + 34}" y="${(PILL_Y + 49).toFixed(2)}">${CTA}</text>
  <path d="M${X + PILL_W - 66} ${(PILL_Y + PILL_H / 2).toFixed(2)}h30m-11 -10l11 10l-11 10" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
 </g>
 ${qrTile({ url: QR_URL, x: QR_X, y: QR_Y, side: QR_SIDE, r: 10 })}
 ${BUBBLES.map((bu, i) => {
   // A plain caption beside its screen, no box (the owner found white pills goofy): a short silver rule, then the
   // screen's question in the headline serif, white, centred on the screen's height.
   const tx = bu.side === 'right' ? bu.x + bu.w + 40 : X;
   const mid = bu.y + bu.h / 2;
   const ty = mid - 2;
   return `<g id="bubble-${i}" data-safe=""><line x1="${tx}" x2="${tx + 60}" y1="${(ty - 52).toFixed(2)}" y2="${(ty - 52).toFixed(2)}" stroke="${C.silverDeep}" stroke-width="1.2"/><text class="serif-r" font-size="34" fill="${C.white}">${tspans(bu.label, tx, ty, 41)}</text></g>`;
 }).join('\n ')}
 <text id="url" data-safe="" class="serif-r" font-size="70" fill="${C.white}" x="${X + CW}" y="${URL_Y}" text-anchor="end">tyll.ai</text>
 <text id="note" data-safe="" class="sans" font-size="14" fill="${C.silverDeep}" x="${X}" y="${URL_Y}">Example screens from the Tyll demo, fictional data.</text>
</g>
</svg>
`;

const ok = await render({
  kit,
  outDir: join(ROOT, 'print', 'roll-up'),
  pages: [{ name: NAME, svg }],
  w: W,
  h: H,
  bleed: BLEED,
  safe: SAFE,
  pxPerMm: 2,
  pdf: `${NAME}_print_ready.pdf`,
  hiddenNote: 'Hidden by the stand (about 150-200 mm)',
});
await kit.browser.close();
console.log(`Headline ${HEAD_SIZE.toFixed(1)} mm. Dusk ${Math.round(DUSK[0])} to ${Math.round(DUSK[1])} mm. QR code foot: ${Math.round(2000 - (QR_Y + QR_SIDE))} mm above the floor (visible height 2000 mm).`);
console.log(`Wrote print/roll-up: ${NAME}.svg, ${NAME}_preview.png, ${NAME}_guides.png, ${NAME}_print_ready.pdf`);
process.exit(ok ? 0 : 1);
