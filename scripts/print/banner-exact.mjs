// The roll-up banner at exactly its trim size, no bleed around it, for printers whose upload check wants the final
// size only (berlindisplay.de, Roll-up Classic, 11 Nov 2026: "Erwartet 850 x 2060 mm, erhalten 856 x 2066 mm").
// Run roll-up.mjs with BANNER_H=2060 first; this reads its SVG.
//
//   PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/print/banner-exact.mjs
//
// Writes to print/roll-up/exact/:
//   Tyll banner 850x2060 mm.pdf   page exactly 850 x 2060 mm (vector type, logo and QR code; fonts embedded)
//   Tyll banner 850x2060 mm.jpg   4250 x 10300 px at 127 dpi = exactly 850 x 2060 mm, sRGB
//   Tyll banner 850x2060 mm.tif   the same pixels in CMYK, LZW, 127 dpi
// 127 dpi is 5 pixels per millimetre, so both pixel sizes are whole numbers and read as the exact size; it is more
// than the photographs carry (about 82 ppi) and right for a banner seen from a metre or more.
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer-core';
import { ROOT, MM, fixPdfBoxes } from './lib.mjs';

const sharp = createRequire(join(ROOT, 'package.json'))('sharp');

const TRIM_W = 850;
const TRIM_H = 2060;
const BLEED = 3;
const W = TRIM_W + 2 * BLEED;
const H = TRIM_H + 2 * BLEED;
const PX_PER_MM = 5; // 127 dpi
const OUT = join(ROOT, 'print', 'roll-up', 'exact');
const NAME = `Tyll banner ${TRIM_W}x${TRIM_H} mm`;
mkdirSync(OUT, { recursive: true });

const svg = readFileSync(join(ROOT, 'print', 'roll-up', `banner_${TRIM_W}x${TRIM_H}.svg`), 'utf8').replace(/^<\?xml[^>]*>\n/, '');
if (!svg.includes(`viewBox="0 0 ${W} ${H}"`)) throw new Error(`banner_${TRIM_W}x${TRIM_H}.svg is not ${W} x ${H} mm: rebuild it with BANNER_H=${TRIM_H}`);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:${W}mm ${H}mm;margin:0}
html,body{margin:0;padding:0;background:#000}
.page{width:${W}mm;height:${H}mm;overflow:hidden}
.page>svg{display:block;width:${W}mm;height:${H}mm}
</style></head><body><div class="page">${svg}</div></body></html>`;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();

// PDF: drawn with its bleed, then the page is cropped to the trim (MediaBox = TrimBox = 850 x 2060 mm)
await page.setViewport({ width: Math.ceil(W * MM), height: Math.ceil(H * MM), deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const pdfPath = join(OUT, `${NAME}.pdf`);
// The PDF is drawn from the same SVG cropped to its trim (viewBox from the bleed in), on a page exactly the trim
// size whose boxes all start at 0,0, so any upload check reads exactly 850 x 2060 mm.
const trimmed = svg
  .replace(`width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}"`, `width="${TRIM_W}mm" height="${TRIM_H}mm" viewBox="${BLEED} ${BLEED} ${TRIM_W} ${TRIM_H}"`);
if (trimmed === svg) throw new Error('Could not crop the SVG to its trim');
const trimHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:${TRIM_W}mm ${TRIM_H}mm;margin:0}
html,body{margin:0;padding:0;background:#000}
.page{width:${TRIM_W}mm;height:${TRIM_H}mm;overflow:hidden}
.page>svg{display:block;width:${TRIM_W}mm;height:${TRIM_H}mm}
</style></head><body><div class="page">${trimmed}</div></body></html>`;
await page.setViewport({ width: Math.ceil(TRIM_W * MM), height: Math.ceil(TRIM_H * MM), deviceScaleFactor: 1 });
await page.setContent(trimHtml, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: pdfPath, width: `${TRIM_W}mm`, height: `${TRIM_H}mm`, printBackground: true });
fixPdfBoxes(pdfPath, TRIM_W, TRIM_H, 0, 1, false, true);

// Pixels: the trim area only, at exactly 5 px per mm
await page.setViewport({ width: Math.ceil(W * MM), height: Math.ceil(H * MM), deviceScaleFactor: PX_PER_MM / MM });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: 'png', clip: { x: BLEED * MM, y: BLEED * MM, width: TRIM_W * MM, height: TRIM_H * MM } });
await browser.close();

const want = { width: TRIM_W * PX_PER_MM, height: TRIM_H * PX_PER_MM };
const raw = sharp(shot, { limitInputPixels: false });
const m = await raw.metadata();
// Chrome may land a pixel off at this size; scale to the exact count so the size reads as 850 x 2060 mm
const exact = await sharp(shot, { limitInputPixels: false }).removeAlpha().resize(want.width, want.height, { fit: 'fill', kernel: 'lanczos3' }).toBuffer();
console.log(`Screenshot ${m.width} x ${m.height} px, written at ${want.width} x ${want.height} px (127 dpi)`);

await sharp(exact, { limitInputPixels: false }).withMetadata({ density: 127 }).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(join(OUT, `${NAME}.jpg`));
await sharp(exact, { limitInputPixels: false })
  .withIccProfile('cmyk')
  .tiff({ compression: 'lzw', xres: PX_PER_MM, yres: PX_PER_MM, resolutionUnit: 'inch' }) // xres and yres are in pixels per mm; the file states 127 dpi
  .toFile(join(OUT, `${NAME}.tif`));
console.log(`Wrote print/roll-up/exact: ${NAME}.pdf, .jpg, .tif`);
