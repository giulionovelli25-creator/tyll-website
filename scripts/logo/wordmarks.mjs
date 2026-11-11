// Lettering trials for the word beside the original check (11 Nov 2026, the owner: "keep it to the original ... maybe
// experiment with the font, not with the icon"). The icon is the official one, untouched (src/config/mark.ts); each row
// sets "Tyll" in a different face, sized so the capitals match the original's and placed as the original places them
// (icon 1.3 capitals tall, dipping 0.185 below the baseline, 0.39 away). Only fonts that are free to use (SIL OFL) and
// already on this computer. Writes assets/logo/wordmarks/wordmarks.png. Nothing on the site changes.
// Run: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/wordmarks.mjs
import { mkdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import puppeteer from 'puppeteer-core';
import { SHORT, LONG, WORDMARK } from '../../src/config/mark.ts';
import { signatureWord, CUTS, rounded } from './concepts.mjs';

const root = new URL('../../', import.meta.url).pathname;
const OUT = `${root}assets/logo/wordmarks/`;
mkdirSync(OUT, { recursive: true });
const b64 = (p) => readFileSync(p).toString('base64');
const lib = (f) => `${homedir()}/Library/Fonts/${f}`;
const INK = '#14161a';
const face = (family, weight, file, fmt) => `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/${fmt};base64,${b64(file)}) format('${fmt === 'ttf' ? 'truetype' : fmt}')}`;
const fonts = [
  face('Source Sans 3', '200 900', `${root}public/fonts/source-sans-latin.woff2`, 'woff2'),
  face('Newsreader', '300 400', `${root}public/fonts/newsreader-latin.woff2`, 'woff2'),
  face('Instrument Serif', 400, lib('InstrumentSerif-400.ttf'), 'ttf'),
  ...[400, 500, 600].map((w) => face('Inter Tight', w, lib(`InterTightTab-${w}.ttf`), 'ttf')),
].join('\n');

const icon = (fg) => `<svg class="ic" viewBox="0 0 75.3 70.2" fill="${fg}"><path d="${SHORT}"/><path d="${LONG}"/></svg>`;
// the drawn capitals of the Signature trial with a plain Y, placed beside the icon in one drawing (capitals 100 tall)
const drawn = (() => {
  const w = signatureWord(CUTS.text, 0), k = 129.6 / 70.2, x0 = 75.3 * k + 39;
  return (fg) => `<svg class="whole" viewBox="0 -11.1 ${(x0 + w.w).toFixed(1)} 129.6" fill="${fg}"><g transform="translate(0 -11.1) scale(${k})"><path d="${SHORT}"/><path d="${LONG}"/></g><g transform="translate(${x0} 0)">${w.polys.map((p) => `<path d="${rounded(p, 0.5)}"/>`).join('')}</g></svg>`;
})();
const original = (fg) => `<svg class="whole" viewBox="0 0 224 81" fill="${fg}" data-cap="54"><path d="${SHORT}"/><path d="${LONG}"/>${WORDMARK.map((d) => `<path d="${d}"/>`).join('')}</svg>`;

const text = (style, word = 'Tyll') => (fg) => `<span class="lk" style="color:${fg};${style}">${icon(fg)}<span>${word}</span></span>`;
const rows = [
  ['Original', 'Today’s logo, as on tyll.ai. The reference.', original],
  ['1 · Source Sans 3 Bold', 'The website’s own text face, so logo and site speak with one voice.', text("font-family:'Source Sans 3';font-weight:700;letter-spacing:-.005em")],
  ['2 · Source Sans 3 Semibold', 'The same, a step lighter: calmer beside the heavy check.', text("font-family:'Source Sans 3';font-weight:600")],
  ['3 · Inter Tight Semibold', 'A tighter, more modern grotesque. Closest in spirit to today’s.', text("font-family:'Inter Tight';font-weight:600;letter-spacing:-.01em")],
  ['4 · Newsreader', 'The website’s headline serif: a heavy check with a quiet, bookish word.', text("font-family:'Newsreader';font-weight:400")],
  ['5 · Instrument Serif', 'A narrower display serif, more fashion than newspaper.', text("font-family:'Instrument Serif';font-weight:400;letter-spacing:.005em")],
  ['6 · Newsreader capitals', 'TYLL spaced out in capitals, the way hotels write their own names.', text("font-family:'Newsreader';font-weight:400;letter-spacing:.2em", 'TYLL')],
  ['7 · Source Sans 3 capitals', 'Spaced sans capitals: clean, technical, a little cooler.', text("font-family:'Source Sans 3';font-weight:600;letter-spacing:.16em", 'TYLL')],
  ['8 · Drawn capitals', 'Four letters drawn for Tyll, thick stems and fine hairlines. No font, so nobody else has it.', drawn],
];

const html = `<!doctype html><meta charset="utf-8"><style>${fonts}
*{box-sizing:border-box;margin:0}
body{font:15px/1.45 'Source Sans 3',sans-serif;color:${INK};background:#fff;width:1680px;padding:60px 64px 56px}
h1{font:300 34px/1.2 'Newsreader',serif}
.sub{color:#62686f;margin:8px 0 34px;max-width:1000px}
.head,.row{display:grid;grid-template-columns:290px 1fr 1fr 250px;gap:24px;align-items:center}
.head{color:#8a9099;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid #dcdfe3}
.row{padding:20px 0;border-bottom:1px solid #e6e8eb}
.name{font:400 21px/1.2 'Newsreader',serif}.idea{color:#4d535b;font-size:14px;margin-top:6px}
.cell{height:150px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#f4f5f7;--cap:50px}
.cell.dark{background:${INK}}
.cell.sm{background:#fff;border:1px solid #e1e4e8;--cap:17.3px;justify-content:flex-start;padding-left:28px;gap:22px;font-size:14px;font-weight:600}
.lk{display:inline-flex;align-items:baseline;line-height:1;white-space:nowrap}
.lk .ic{display:block;flex:none}
.whole{display:block}
</style>
<h1>The original check, eight ways to write Tyll</h1>
<p class="sub">The icon is today’s, untouched. Only the lettering changes. Every row has the same capital height and the same spacing as the original, so the only difference you see is the typeface. The last column is the real size in the website’s header.</p>
<div class="head"><div></div><div>On white</div><div>On black</div><div>Header size</div></div>
${rows.map(([n, idea, draw]) => `<div class="row"><div><div class="name">${n}</div><div class="idea">${idea}</div></div>
<div class="cell">${draw(INK)}</div><div class="cell dark">${draw('#ffffff')}</div><div class="cell sm">${draw(INK)}<span>Solutions</span></div></div>`).join('')}
<script>
window.done = document.fonts.ready.then(() => {
  const ctx = document.createElement('canvas').getContext('2d');
  for (const cell of document.querySelectorAll('.cell')) {
    const cap = parseFloat(getComputedStyle(cell).getPropertyValue('--cap'));
    const lk = cell.querySelector('.lk'), whole = cell.querySelector('.whole');
    if (whole) { const vb = whole.viewBox.baseVal; whole.style.height = (cap * vb.height / (+whole.dataset.cap || 100)) + 'px'; continue; }
    const cs = getComputedStyle(lk);
    ctx.font = cs.fontWeight + ' 1000px ' + cs.fontFamily;
    const ratio = ctx.measureText('T').actualBoundingBoxAscent / 1000; // capital height per em
    lk.style.fontSize = (cap / ratio) + 'px';
    const ic = lk.querySelector('.ic'), ls = parseFloat(getComputedStyle(lk).letterSpacing) || 0;
    ic.style.height = (cap * 1.296) + 'px';
    ic.style.transform = 'translateY(' + (cap * 0.185) + 'px)';
    ic.style.marginRight = (cap * 0.39) + 'px';
    lk.style.marginRight = (-ls) + 'px'; // the last letter's spacing is not part of the logo
  }
});
</script>`;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1680, height: 900, deviceScaleFactor: 2 });
await page.setContent(html);
await page.evaluate(() => window.done);
await page.screenshot({ path: `${OUT}wordmarks.png`, fullPage: true });
await browser.close();
console.log('wrote', OUT + 'wordmarks.png');
