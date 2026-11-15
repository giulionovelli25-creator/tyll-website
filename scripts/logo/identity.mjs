// The brand identity board for direction 1, Signature (11 Nov 2026): logo family, colour, type, the pieces in use, voice.
// Black, white and silver only; colour comes from photographs (the owner's rule). Type is the site's own: Newsreader and
// Source Sans 3; the wordmark is drawn, not typed. Writes assets/logo/concepts/identity.png.
// Run: PATH="$HOME/.local/share/node-lts/bin:$PATH" node scripts/logo/identity.mjs
import { readFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { concepts, baseCss, INK, WHITE, NIGHT } from './concepts.mjs';

const root = new URL('../../', import.meta.url).pathname;
const OUT = `${root}assets/logo/concepts/`;
const S = concepts[0];
const photo = `data:image/webp;base64,${readFileSync(`${root}public/media/hero/square-1280.webp`).toString('base64')}`;
const uri = (s) => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');
const word = (fg) => S.logo(fg), tick = (fg) => S.mark(fg);
const tickInner = (fg) => tick(fg).replace(/^<svg[^>]*>/, '').replace('</svg>', '');

const swatches = [
  ['Ink', INK, WHITE], ['White', '#ffffff', INK], ['Silver light', '#eef0f3', INK], ['Silver', '#c8cdd4', INK], ['Silver deep', '#a3a9b2', INK], ['Night', NIGHT, WHITE],
];

const seal = `<svg viewBox="0 0 300 300" class="seal"><defs><path id="ring" d="M150 150m-112 0a112 112 0 1 1 224 0a112 112 0 1 1 -224 0"/></defs>
<circle cx="150" cy="150" r="141" fill="none" stroke="${INK}" stroke-width="1.4"/><circle cx="150" cy="150" r="86" fill="none" stroke="${INK}" stroke-width="1"/>
<text font-family="'Source Sans 3'" font-weight="600" font-size="15.5" fill="${INK}"><textPath href="#ring" textLength="696" lengthAdjust="spacing">TYLL  ·  HOSPITALITY OPERATIONS  ·  TYLL  ·  HOSPITALITY OPERATIONS  ·</textPath></text>
<g transform="translate(106 104) scale(0.92)">${tickInner(INK)}</g></svg>`;

const html = `<!doctype html><meta charset="utf-8"><style>${baseCss}
body{width:1760px;padding:64px 64px 60px}
.eyebrow{font-weight:600;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#8a9099}
h1{font:300 54px/1.1 'Newsreader',serif;margin:10px 0 10px}
.lead{color:#4d535b;font-size:17px;max-width:900px}
section{margin-top:56px;padding-top:22px;border-top:1px solid #dcdfe3}
h2{font:300 28px/1.2 'Newsreader',serif;margin:6px 0 22px}
.note{color:#62686f;font-size:14px;margin-top:10px}
.g{display:grid;gap:22px}
.tile{border-radius:16px;background:#f4f5f7;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.tile.white{background:#fff;border:1px solid #e1e4e8}.tile.night{background:${NIGHT}}.tile.ink{background:${INK}}
.tile figcaption,.cap{position:absolute;left:18px;bottom:14px;font-size:12px;letter-spacing:.06em;color:#8a9099}
.tile.night .cap,.tile.ink .cap,.tile.ph .cap{color:rgba(255,255,255,.62)}
.tile.ph{background:url(${photo}) center 58%/cover}
.tile.ph::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,12,18,.42),rgba(9,12,18,.58))}
.tile.ph>svg{position:relative}
.logos{grid-template-columns:1.45fr 1fr 1fr;grid-template-rows:250px 250px}
.logos .big{grid-row:span 2}
.sw{grid-template-columns:repeat(6,1fr)}
.sw div{height:150px;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:flex-end;font-size:13.5px}
.sw b{font-weight:600;font-size:15px}
.type{grid-template-columns:230px 1fr;row-gap:30px;align-items:baseline}
.type .k{font-size:13.5px;color:#62686f}.type .k b{display:block;color:${INK};font-size:15.5px;font-weight:600}
.t-head{font:300 58px/1.08 'Newsreader',serif}
.t-num{font:300 58px/1 'Newsreader',serif;display:flex;gap:56px}
.t-body{font-size:19px;line-height:1.55;max-width:760px;color:#2a2e34}
.t-label{font-weight:600;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#62686f}
.use{grid-template-columns:1fr 1fr 0.8fr;align-items:stretch}
.cards{display:flex;gap:18px;align-items:center;justify-content:center;height:330px}
.card{width:232px;height:150px;flex:none;border-radius:7px;box-shadow:0 10px 26px rgba(20,22,26,.16),0 1px 2px rgba(20,22,26,.12);position:relative;display:flex;align-items:center;justify-content:center}
.card.f{background:#fff}.card.b{background:${INK};color:#fff;display:block;padding:16px 18px;font-size:10.5px;line-height:1.6}
.card.b svg{position:absolute;right:16px;top:16px;height:26px}
.card.b .n{font:400 15px/1.2 'Newsreader',serif;margin-top:58px}
.card.b .r{color:rgba(255,255,255,.6)}
.hdr{height:330px;display:block;padding:0}
.hdr .bar{height:64px;display:flex;align-items:center;gap:26px;padding:0 26px;color:#fff;font-size:14px;position:relative}
.hdr .bar svg{height:27px;margin-right:8px}
.hdr .bar .btn{margin-left:auto;background:#fff;color:${INK};border-radius:99px;padding:8px 16px;font-weight:600;font-size:13px}
.hdr .hl{position:relative;color:#fff;font:300 27px/1.2 'Newsreader',serif;text-align:center;margin-top:66px;padding:0 20px;white-space:nowrap}
.misc{display:flex;flex-direction:column;gap:22px}
.misc .tile{flex:1;gap:26px}
.misc .tile.white{justify-content:flex-end;padding-right:34px}
.av{width:86px;height:86px;border-radius:50%;background:${INK};display:flex;align-items:center;justify-content:center}
.av svg{height:40px;margin-left:3px}
.app{width:86px;height:86px;border-radius:20px;display:block;box-shadow:0 1px 3px rgba(0,0,0,.25)}
.seal{height:132px}
.voice{grid-template-columns:repeat(3,1fr)}
.voice div{background:#f4f5f7;border-radius:14px;padding:22px 24px}
.voice b{font:400 20px/1.25 'Newsreader',serif;display:block;margin-bottom:8px}
.voice p{color:#4d535b;font-size:14.5px}
</style>
<div class="eyebrow">Brand identity · direction 1, Signature</div>
<h1>Quiet, exact, checked.</h1>
<p class="lead">A wordmark drawn for Tyll alone, one tick, two typefaces, and black, white and silver. Colour comes only from photographs of real hotels.</p>

<section><div class="eyebrow">01</div><h2>The logo</h2>
<div class="g logos">
  <figure class="tile white big">${word(INK).replace('<svg', '<svg height="150"')}<span class="cap">Wordmark · the logo</span></figure>
  <figure class="tile">${tick(INK).replace('<svg', '<svg height="120"')}<span class="cap">The tick · icon, stamp, favicon</span></figure>
  <figure class="tile night">${word(WHITE).replace('<svg', '<svg height="84"')}<span class="cap">On night</span></figure>
  <figure class="tile ph">${word(WHITE).replace('<svg', '<svg height="84"')}<span class="cap">On photographs, always white</span></figure>
  <figure class="tile ink">${tick(WHITE).replace('<svg', '<svg height="110"')}<span class="cap">Reversed</span></figure>
</div>
<p class="note">The four letters are drawn, not typed: firm stems, fine hairlines, and a Y whose long arm is the tick. Keep clear space of one L around it. Under 80 px wide, use the tick alone.</p>
</section>

<section><div class="eyebrow">02</div><h2>Colour</h2>
<div class="g sw">${swatches.map(([n, c, t]) => `<div style="background:${c};color:${t};${c === '#ffffff' ? 'border:1px solid #e1e4e8' : ''}"><b>${n}</b>${c}</div>`).join('')}</div>
<p class="note">No accent colour. Ink for words, white for space, silver for lines and quiet surfaces, night for the dark bands. Photographs keep their own colours.</p>
</section>

<section><div class="eyebrow">03</div><h2>Type</h2>
<div class="g type">
  <div class="k"><b>Newsreader Light</b>Headlines and numbers</div><div class="t-head">Know what your hotel lost last night.</div>
  <div class="k"><b>Newsreader Light</b>Figures</div><div class="t-num"><span>18%</span><span>7×</span><span>€1,150</span></div>
  <div class="k"><b>Source Sans 3 Regular</b>Everything you read</div><div class="t-body">Tyll reads the systems your hotel already runs and shows where stock, purchasing and revenue slip. Read only. Nothing to install. Nothing to replace.</div>
  <div class="k"><b>Source Sans 3 Semibold</b>Labels, capitals, spaced</div><div class="t-label">How it works · Stock and waste · Purchasing · Revenue and reconciliation</div>
</div>
<p class="note">Both are free to use (SIL Open Font Licence) and already on the website and the print pieces. Headings stay light and open; never bold, never tightly spaced.</p>
</section>

<section><div class="eyebrow">04</div><h2>In use</h2>
<div class="g use">
  <div class="tile"><div class="cards">
    <div class="card f">${word(INK).replace('<svg', '<svg height="42"')}</div>
    <div class="card b">${tick(WHITE)}<div class="n">Name Surname</div><div class="r">Role</div><div>info@tyll.ai · tyll.ai</div></div>
  </div><span class="cap">Business card, 85 × 55 mm</span></div>
  <div class="tile ph hdr"><div class="bar">${word(WHITE)}<span>Solutions</span><span>How it works</span><span class="btn">Book a demo</span></div><div class="hl">Know what your hotel lost last night.<br>And what to buy next week.</div><span class="cap">Website header</span></div>
  <div class="misc">
    <div class="tile"><img class="app" src="${uri(S.icon(INK, WHITE))}"><div class="av">${tick(WHITE)}</div><span class="cap">App icon · profile picture</span></div>
    <div class="tile white">${seal}<span class="cap">Seal for print and packaging</span></div>
  </div>
</div>
</section>

<section><div class="eyebrow">05</div><h2>Voice</h2>
<div class="g voice">
  <div><b>Short and concrete.</b><p>One question from the reader’s day, one line, one action. “Three places your hotel loses money.”</p></div>
  <div><b>Numbers with a source.</b><p>Every figure names where it comes from. No urgency, no invented claims, no testimonials we do not have.</p></div>
  <div><b>Calm, like a good hotel.</b><p>Plain words, no exclamation marks, no jargon. The product does the convincing; the brand stays quiet.</p></div>
</div>
</section>`;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1760, height: 900, deviceScaleFactor: 2 });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: `${OUT}identity.png`, fullPage: true });
await browser.close();
console.log('wrote', OUT + 'identity.png');
