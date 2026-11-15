// Shared by the print pieces (roll-up.mjs, flyer.mjs): brand colours, embedded fonts, the official logo, the site's
// silver wave, the QR code, text measuring, and the Chrome render to PNG previews and a print PDF with exact page boxes.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { inflateSync } from 'node:zlib';
import puppeteer from 'puppeteer-core';
import { SHORT, LONG, WORDMARK } from '../../src/config/mark.ts';
import { ribbon } from '../../src/scripts/wave.ts';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const MM = 96 / 25.4; // CSS px per mm
const PT = 72 / 25.4; // PDF points per mm

// ---- Brand (src/styles/global.css) ----
export const C = {
  night0: '#090c12',
  night1: '#0e1219',
  white: '#ffffff',
  silver: '#c8cdd4',
  silverLight: '#eef0f3',
  silverDeep: '#a3a9b2',
  ink: '#14161a',
  pageDeep: '#f4f5f7',
  sand300: '#e6e8eb',
  sand600: '#c8ccd2',
  grey: '#5d636b', // secondary text on white, dark enough for small print
  // No accent colour in print (the owner, 11 Nov 2026: black, white and silver; colour comes from photographs)
};

const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
/** Colour a mixed with b by t (0…1), as an opaque hex: how transparency is baked in for print */
export const mix = (a, b, t) =>
  '#' + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, '0')).join('');

// ---- Fonts, embedded so the SVG and PDF never fall back ----
// Newsreader Light (300) is the brand's heading weight. `serif-r` is the same family at Regular (400), from the
// website's own font file (it declares 300 to 400): for type that must carry across a hall, where Light thins out.
const FONT_FILES = { serif: 'Newsreader-300.ttf', sans: 'SourceSans3-400.ttf', 'sans-b': 'SourceSans3-600.ttf' };
const CSS_FONT = { serif: `300 1000px 'Newsreader'`, 'serif-r': `400 1000px 'Newsreader'`, sans: `400 1000px 'Source Sans 3'`, 'sans-b': `600 1000px 'Source Sans 3'` };
const font = (file) => readFileSync(join(homedir(), 'Library', 'Fonts', file)).toString('base64');
export const fontsCss = () => `
@font-face{font-family:'Newsreader';font-weight:300;src:url(data:font/ttf;base64,${font(FONT_FILES.serif)}) format('truetype')}
@font-face{font-family:'Newsreader';font-weight:400;src:url(data:font/woff2;base64,${readFileSync(join(ROOT, 'public', 'fonts', 'newsreader-latin.woff2')).toString('base64')}) format('woff2')}
@font-face{font-family:'Source Sans 3';font-weight:400;src:url(data:font/ttf;base64,${font(FONT_FILES.sans)}) format('truetype')}
@font-face{font-family:'Source Sans 3';font-weight:600;src:url(data:font/ttf;base64,${font(FONT_FILES['sans-b'])}) format('truetype')}
.serif{font-family:'Newsreader',serif;font-weight:300}
.serif-r{font-family:'Newsreader',serif;font-weight:400}
.sans{font-family:'Source Sans 3',sans-serif;font-weight:400}
.sans-b{font-family:'Source Sans 3',sans-serif;font-weight:600}`;

// ---- The official logo (224 x 81 drawing), never redrawn ----
export const logo = ({ x, y, w, fill, id = 'logo' }) =>
  `<g id="${id}" data-safe="" fill="${fill}" transform="translate(${x} ${y}) scale(${w / 224})"><path d="${SHORT}"/><path d="${LONG}"/>${WORDMARK.map((d) => `<path d="${d}"/>`).join('')}</g>`;

// ---- The site's silver wave, print-safe ----
// No transparency: each line gets its own opaque gradient whose stops are the site's silver stops already mixed
// with the ground behind the wave, so Chrome writes true vector shadings instead of images.
const STOPS = [
  [0, 'silver', 0],
  [0.3, 'silver', 0.35],
  [0.6, 'silverLight', 0.85],
  [0.85, 'silverDeep', 0.45],
  [1, 'silver', 0],
];
/** `s` scales the 1440 x 800 drawing to mm (`sy` flattens it), `tx`/`ty` place it, `stroke` is the printed line width in mm */
export const wave = ({ id, ground, s, sy = s, tx, ty, stroke, phase = 0.3, strength = 1, light = false }) => {
  const lines = ribbon(phase);
  // On a light ground the brightest stop becomes the deepest silver, as the site's light wave does
  const stops = light ? STOPS.map(([o, c, a]) => [o, c === 'silverLight' ? 'silverDeep' : c, a]) : STOPS;
  const defs = lines
    .map(
      (l, i) =>
        `<linearGradient id="${id}-${i}" gradientUnits="userSpaceOnUse" x1="-80" y1="0" x2="1520" y2="0">` +
        stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${mix(ground, C[c], Math.min(1, a * l.opacity * strength))}"/>`).join('') +
        `</linearGradient>`,
    )
    .join('\n');
  const body =
    `<g id="${id}" fill="none" stroke-width="${(stroke / sy).toFixed(3)}" transform="translate(${tx} ${ty}) scale(${s} ${sy})">` +
    lines.map((l, i) => `<path d="${l.d}" stroke="url(#${id}-${i})"/>`).join('') +
    `</g>`;
  return { defs, body };
};

// ---- Photographs: cropped to a box, at a set resolution, with an optional shade baked in ----
const sharpLib = createRequire(join(ROOT, 'package.json'))('sharp');
/**
 * A photograph filling a box given in trim coordinates (mm). `edges` lists the sides that sit on the page edge
 * ('t', 'r', 'b', 'l'), which are extended into the bleed. `focus` is the point of the source to keep in view
 * (0..1 each way), `zoom` crops tighter. `shade(wmm, hmm)` may return SVG shapes (in mm of the extended box) that
 * are baked into the picture, so the PDF holds one flat JPEG and no transparency.
 * Returns the <image> element in page coordinates and the real resolution in pixels per inch.
 */
export const photo = async ({ file, x, y, w, h, bleed, edges = '', dpi = 300, focus = [0.5, 0.5], zoom = 1, saturation = 1, brightness = 1, shade, grain = 0 }) => {
  const ex = { x0: x - (edges.includes('l') ? bleed : 0), y0: y - (edges.includes('t') ? bleed : 0), x1: x + w + (edges.includes('r') ? bleed : 0), y1: y + h + (edges.includes('b') ? bleed : 0) };
  const wmm = ex.x1 - ex.x0;
  const hmm = ex.y1 - ex.y0;
  const outW = Math.round((wmm / 25.4) * dpi);
  const outH = Math.round((hmm / 25.4) * dpi);
  const src = sharpLib(join(ROOT, file));
  const m = await src.metadata();
  const aspect = wmm / hmm;
  let cw = m.width;
  let ch = Math.round(cw / aspect);
  if (ch > m.height) {
    ch = m.height;
    cw = Math.round(ch * aspect);
  }
  cw = Math.round(cw / zoom);
  ch = Math.round(ch / zoom);
  const left = Math.min(m.width - cw, Math.max(0, Math.round(focus[0] * m.width - cw / 2)));
  const top = Math.min(m.height - ch, Math.max(0, Math.round(focus[1] * m.height - ch / 2)));
  const layers = [];
  if (grain) {
    layers.push({
      input: await sharpLib({ create: { width: outW, height: outH, channels: 3, background: '#808080', noise: { type: 'gaussian', mean: 128, sigma: grain } } }).greyscale().toColourspace('srgb').png().toBuffer(),
      blend: 'soft-light',
    });
  }
  let img = await sharpLib(join(ROOT, file))
    .extract({ left, top, width: cw, height: ch })
    .resize(outW, outH, { kernel: 'lanczos3' })
    .sharpen({ sigma: cw < outW ? 0.9 : 0.5 })
    .modulate({ saturation, brightness })
    .composite(layers)
    .toBuffer();
  if (shade) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${wmm} ${hmm}">${shade(wmm, hmm)}</svg>`;
    img = await sharpLib(img).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).toBuffer();
  }
  const jpg = await sharpLib(img).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toBuffer();
  const ppi = Math.round(cw / (wmm / 25.4));
  return {
    svg: `<image x="${(ex.x0 + bleed).toFixed(3)}" y="${(ex.y0 + bleed).toFixed(3)}" width="${wmm.toFixed(3)}" height="${hmm.toFixed(3)}" preserveAspectRatio="none" href="data:image/jpeg;base64,${jpg.toString('base64')}"/>`,
    ppi,
    file,
  };
};
/** A dark radial shade behind a white logo in a photograph's corner (for `photo({ shade })`) */
export const cornerShade = (cx, cy, r, colour = C.ink, strength = 0.8) =>
  `<defs><radialGradient id="cs" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${colour}" stop-opacity="${strength}"/><stop offset="0.45" stop-color="${colour}" stop-opacity="${strength * 0.68}"/><stop offset="1" stop-color="${colour}" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#cs)"/>`;

// ---- QR code: modules cached in qr.json; set QRCODE_DIR to a folder holding the `qrcode` package to add a URL ----
const QR_CACHE = join(ROOT, 'scripts', 'print', 'qr.json');
export const qr = (url) => {
  const cache = existsSync(QR_CACHE) ? JSON.parse(readFileSync(QR_CACHE, 'utf8')) : {};
  if (!cache[url]) {
    if (!process.env.QRCODE_DIR) throw new Error(`No cached QR code for ${url}: set QRCODE_DIR to a folder with the qrcode package`);
    const QRCode = createRequire(join(process.env.QRCODE_DIR, 'x.js'))('qrcode');
    const m = QRCode.create(url, { errorCorrectionLevel: 'M' }).modules;
    const rows = [];
    for (let y = 0; y < m.size; y++) {
      let r = '';
      for (let x = 0; x < m.size; x++) r += m.get(y, x) ? '1' : '0';
      rows.push(r);
    }
    cache[url] = { size: m.size, rows };
    writeFileSync(QR_CACHE, JSON.stringify(cache, null, 1) + '\n');
  }
  const { size, rows } = cache[url];
  // One path, runs of dark modules merged per row, in module units
  const path = rows
    .map((r, y) => [...r.matchAll(/1+/g)].map((run) => `M${run.index} ${y}h${run[0].length}v1h-${run[0].length}z`).join(''))
    .join('');
  return { size, path };
};
/** A white tile of `side` mm with the code inside a four-module quiet zone */
export const qrTile = ({ url, x, y, side, r = side / 20, id = 'qr', stroke = '' }) => {
  const q = qr(url);
  const u = side / (q.size + 8);
  return (
    `<g id="${id}" data-safe=""><rect x="${x}" y="${y}" width="${side}" height="${side}" rx="${r}" fill="${C.white}"${stroke}/>` +
    `<path fill="${C.ink}" d="${q.path}" transform="translate(${x + 4 * u} ${y + 4 * u}) scale(${u})"/></g>`
  );
};

// ---- Chrome: text measuring and rendering ----
export const openKit = async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><style>${fontsCss()}</style><p class="serif">a</p><p class="serif-r">a</p><p class="sans">a</p><p class="sans-b">a</p>`);
  await page.evaluate(() => document.fonts.ready);
  // Advance width of every character we may print, at 1000 px, per font (kerning ignored: close enough to wrap by)
  const chars = [...new Set([...Array.from({ length: 351 }, (_, i) => String.fromCharCode(32 + i)), ...'’‘“”·×€→–…'])];
  const widths = await page.evaluate(
    (fonts, list) => {
      const ctx = document.createElement('canvas').getContext('2d');
      const out = {};
      for (const [k, f] of Object.entries(fonts)) {
        ctx.font = f;
        out[k] = Object.fromEntries(list.map((ch) => [ch, ctx.measureText(ch).width / 1000]));
      }
      return out;
    },
    CSS_FONT,
    chars,
  );
  const width = (str, f, size, tracking = 0) => [...str].reduce((n, ch) => n + (widths[f][ch] ?? 0.55) * size + tracking, 0);
  /** Greedy wrap to `max` mm */
  const wrap = (str, f, size, max, tracking = 0) => {
    const lines = [];
    let line = '';
    for (const word of str.split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (line && width(next, f, size, tracking) > max) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  };
  /** A wrapped paragraph as one <text>; returns the markup and the last baseline */
  const para = ({ text, x, y, f = 'sans', size, lh = size * 1.4, max, fill, tracking = 0, upper = false, anchor = 'start', id = '' }) => {
    const str = upper ? text.toUpperCase() : text;
    const lines = max ? wrap(str, f, size, max, tracking) : str.split('\n');
    const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const svg =
      `<text${id ? ` id="${id}"` : ''} data-safe="" class="${f}" font-size="${size}" fill="${fill}"${tracking ? ` letter-spacing="${tracking}"` : ''}${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}>` +
      lines.map((t, i) => `<tspan x="${x}" y="${(y + i * lh).toFixed(3)}">${esc(t)}</tspan>`).join('') +
      `</text>`;
    return { svg, bottom: y + (lines.length - 1) * lh, lines: lines.length };
  };
  return { browser, page, width, wrap, para };
};

/**
 * Renders the pages (SVG strings sized w x h mm, bleed included) to previews, guide sheets and one PDF.
 * `safe` is the safe area in trim coordinates (a page may carry its own `safe`, one box per panel, and `folds`);
 * everything marked data-safe must fall inside one of the boxes.
 */
export const render = async ({ kit, outDir, pages, w, h, bleed, safe, pxPerMm, pdf, hiddenNote }) => {
  mkdirSync(outDir, { recursive: true });
  const { page } = kit;
  const trimW = w - 2 * bleed;
  const trimH = h - 2 * bleed;
  for (const p of pages) writeFileSync(join(outDir, `${p.name}.svg`), p.svg);

  // Guide sheet: bleed in red, trim in cyan, safe areas dashed green, folds dashed magenta
  const u = w / 850; // line weight that reads at any page size
  const guide = (p) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;width:100%;height:100%">
 <rect x="${bleed / 2}" y="${bleed / 2}" width="${w - bleed}" height="${h - bleed}" fill="none" stroke="#ff2d55" stroke-opacity="0.7" stroke-width="${bleed}"/>
 <rect x="${bleed}" y="${bleed}" width="${trimW}" height="${trimH}" fill="none" stroke="#00e5ff" stroke-width="${u}"/>
 ${[p.safe ?? safe].flat().map((r) => `<rect x="${bleed + r.x0}" y="${bleed + r.y0}" width="${r.x1 - r.x0}" height="${r.y1 - r.y0}" fill="none" stroke="#7CFC00" stroke-width="${u}" stroke-dasharray="${w / 100} ${w / 140}"/>`).join('')}
 ${(p.folds ?? []).map((x) => `<line x1="${bleed + x}" x2="${bleed + x}" y1="0" y2="${h}" stroke="#ff00ff" stroke-width="${u}" stroke-dasharray="${w / 60} ${w / 120}"/>`).join('')}
 ${hiddenNote ? `<rect x="0" y="${bleed + safe.y1}" width="${w}" height="${h - bleed - safe.y1}" fill="#ff9500" fill-opacity="0.18"/><text x="${bleed + 12}" y="${bleed + safe.y1 + 40}" font-family="sans-serif" font-size="22" fill="#ff9500">${hiddenNote}</text>` : ''}
</svg>`;
  const html = (withGuides) => `<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:${w}mm ${h}mm;margin:0}
html,body{margin:0;padding:0;background:#000}
.page{position:relative;width:${w}mm;height:${h}mm;overflow:hidden;break-after:page}
.page:last-child{break-after:auto}
.page>svg:first-child{display:block;width:${w}mm;height:${h}mm}
</style></head><body>${pages.map((p) => `<div class="page">${p.svg.replace(/^<\?xml[^>]*>\n/, '')}${withGuides ? guide(p) : ''}</div>`).join('')}</body></html>`;

  await page.setViewport({ width: Math.ceil(w * MM), height: Math.ceil(h * MM * pages.length), deviceScaleFactor: pxPerMm / MM });
  await page.setContent(html(false), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  // Safe-area check, measured from what Chrome actually drew
  const boxes = await page.evaluate((mm) =>
    [...document.querySelectorAll('.page')].flatMap((pg, n) => {
      const o = pg.getBoundingClientRect();
      return [...pg.querySelectorAll('[data-safe]')].map((el) => {
        const b = el.getBoundingClientRect();
        return { page: n, id: el.id || el.textContent.slice(0, 18), x0: (b.left - o.left) / mm, y0: (b.top - o.top) / mm, x1: (b.right - o.left) / mm, y1: (b.bottom - o.top) / mm };
      });
    }), MM);
  let ok = true;
  for (const b of boxes) {
    const t = { x0: b.x0 - bleed, y0: b.y0 - bleed, x1: b.x1 - bleed, y1: b.y1 - bleed };
    const inside = [pages[b.page].safe ?? safe].flat().some((r) => t.x0 >= r.x0 - 0.01 && t.x1 <= r.x1 + 0.01 && t.y0 >= r.y0 - 0.01 && t.y1 <= r.y1 + 0.01);
    ok &&= inside;
    if (!inside || process.env.VERBOSE) console.log(`${inside ? 'ok  ' : 'OUT '} ${pages[b.page].name} ${b.id.padEnd(18)} x ${t.x0.toFixed(1)}-${t.x1.toFixed(1)}  y ${t.y0.toFixed(1)}-${t.y1.toFixed(1)} mm`);
  }
  console.log(ok ? `Safe area: all ${boxes.length} items inside.` : 'Safe area: some items are OUTSIDE.');

  for (const [n, p] of pages.entries())
    await page.screenshot({ path: join(outDir, `${p.name}_preview.png`), clip: { x: bleed * MM, y: (n * h + bleed) * MM, width: trimW * MM, height: trimH * MM } });
  await page.pdf({ path: join(outDir, pdf), width: `${w}mm`, height: `${h}mm`, printBackground: true });
  fixPdfBoxes(join(outDir, pdf), w, h, bleed, pages.length);

  await page.setContent(html(true), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  for (const [n, p] of pages.entries())
    await page.screenshot({ path: join(outDir, `${p.name}_guides.png`), clip: { x: 0, y: n * h * MM, width: w * MM, height: h * MM } });
  return ok;
};

/**
 * Chrome rounds the page up to whole pixels and starts the content one pixel down. This reads where the content
 * really sits from each page's own drawing commands, sets the MediaBox to exactly w x h mm around it, adds
 * BleedBox and TrimBox, and shifts the cross-reference offsets to match.
 */
export const fixPdfBoxes = (file, w, h, bleed, expectPages) => {
  const pdf = readFileSync(file, 'latin1');
  const n = (v) => String(Math.round(v * 1000) / 1000);
  const stream = (num) => {
    const m = new RegExp(`(?:^|\\n)${num} 0 obj\\n<<([^>]*)>>\\s*stream\\n`).exec(pdf);
    const raw = Buffer.from(pdf.substr(m.index + m[0].length, Number(/\/Length (\d+)/.exec(m[1])[1])), 'latin1');
    return (/FlateDecode/.test(m[1]) ? inflateSync(raw) : raw).toString('latin1');
  };
  const edits = [];
  for (const m of pdf.matchAll(/\/MediaBox \[0 0 ([\d.]+) ([\d.]+)\]/g)) {
    // The page object around this MediaBox names its content stream, which opens with the page transform
    // ("s 0 0 -s 0 top cm") and then the content's own offset ("k 0 0 k tx ty cm")
    const objStart = pdf.lastIndexOf(' 0 obj', m.index);
    const obj = pdf.slice(objStart, pdf.indexOf('endobj', m.index));
    const cms = [...stream(/\/Contents (\d+) 0 R/.exec(obj)[1]).slice(0, 400).matchAll(/^([\d.-]+) 0 0 ([\d.-]+) ([\d.-]+) ([\d.-]+) cm$/gm)].map((c) => c.slice(1).map(Number));
    if (cms.length < 2 || cms[0][1] >= 0) throw new Error('Unexpected PDF page transform: check the page boxes by hand');
    const s = cms[0][0];
    const left = cms[0][2] + cms[1][2] * s;
    const top = cms[0][3] - cms[1][3] * s;
    const box = (inset) => `${n(left + inset * PT)} ${n(top - (h - inset) * PT)} ${n(left + (w - inset) * PT)} ${n(top - inset * PT)}`;
    if (left < -0.01 || top - h * PT < -0.01 || left + w * PT > Number(m[1]) + 0.01) throw new Error(`PDF page smaller than ${w} x ${h} mm`);
    edits.push({ at: m.index, from: m[0].length, to: `/MediaBox [${box(0)}] /BleedBox [${box(0)}] /TrimBox [${box(bleed)}]` });
  }
  if (edits.length !== expectPages) throw new Error(`Expected ${expectPages} PDF pages, found ${edits.length}`);
  const shift = (off) => off + edits.reduce((d, e) => (e.at < off ? d + e.to.length - e.from : d), 0);
  const xrefAt = pdf.lastIndexOf('\nxref\n') + 1;
  const head = pdf.slice(0, xrefAt);
  let tail = pdf.slice(xrefAt);
  tail = tail.replace(/(\d{10}) (\d{5}) n/g, (_, off, gen) => `${String(shift(Number(off))).padStart(10, '0')} ${gen} n`);
  tail = tail.replace(/startxref\n\d+/, `startxref\n${shift(xrefAt)}`);
  let out = '';
  let last = 0;
  for (const e of edits) {
    out += head.slice(last, e.at) + e.to;
    last = e.at + e.from;
  }
  writeFileSync(file, out + head.slice(last) + tail, 'latin1');
};
