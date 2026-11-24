// Records the solution films and row clips from a local copy of the demo (round 4, 24 Nov 2026).
//   node scripts/film/rec4.mjs <desk|phone> <lang> <clip,clip,...|main|rows|all>
// Each clip opens in a fresh browser session, so the public demo starts from its own fresh workspace; the cookie
// choice is stored as "no" (nothing recorded, no banner), the language is set through localStorage, the guided path is
// closed, and the session enters as the role the demo's own guided story uses. Button and heading texts are looked up
// in the demo's translations (src/lib/i18n/messages.json), so the same script plays in all four languages.
// Output: tests/tmp/film4/<lang>/<clip>-<mode>.webm, and chapter times in tests/tmp/film4/chapters-<lang>-<mode>.json.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { BASE, CHROME, prepare } from './probe.mjs';
const require = createRequire(new URL('../../package.json', import.meta.url));
const puppeteer = require('puppeteer-core');

const [mode = 'desk', lang = 'en', which = 'all'] = process.argv.slice(2);
// The demo is desktop only (the owner, 24 Nov 2026): the site never shows it in a phone layout, so nothing is recorded
// in one.
if (mode !== 'desk') {
  console.log('Only desk recordings are made: the demo is desktop only.');
  process.exit(0);
}
const phone = mode === 'phone';
const OUT = 'tests/tmp/film4';
const FF = process.env.FF ?? '/Users/fynnkopitz/bin/ffmpeg';
const MSG = JSON.parse(fs.readFileSync(process.env.DEMO_MSG, 'utf8'));
const IDX = { de: 0, it: 1, ar: 2 }[lang];
/** The demo's own words for an English label, in the recording's language. A label can be a template with its
    values, ['{0}, today', 'Peixaria Atlântico']; a value left out cuts the label there, so it matches as a prefix. */
const L = (en) => {
  const [tpl, ...args] = Array.isArray(en) ? en : [en];
  let s = lang === 'en' ? tpl : (MSG[tpl]?.[IDX] ?? tpl);
  args.forEach((a, i) => (s = s.replace(`{${i}}`, a)));
  const cut = s.indexOf('{');
  return cut < 0 ? s : s.slice(0, cut).replace(/[\s,]+$/, '');
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- the clips ----------------------------------------------------------------------------------------------------
// `who`: the demo role; `url`: where it starts; `run(h)`: what happens. h.ch() marks a chapter (main films only).
const p_top = (h) => h.glide(-4000);
const MAIN = {
  stock: { who: 'u-chef', url: '/stock', run: async (h) => { h.ch(); await h.show('Critical', { left: true }); await wait(1800); h.ch(); await h.show('Critical items', { left: true }); await wait(1800); h.ch(); if (!(await h.tap('Order now', { quiet: true }))) { await h.tap('Show all items'); await h.tap('Order now'); } await wait(2600); await h.dlg(260); await wait(1600); } },
  expiry: { who: 'u-chef', url: '/stock?tab=expiry', run: async (h) => { h.ch(); await h.show('Use today', { left: true }); await wait(2200); h.ch(); await h.show('Sea bass fillet', { left: true }); await wait(2400); h.ch(); await h.tap('Make it tonight’s special'); await wait(3200); } },
  waste: { who: 'u-fnb', url: '/waste', run: async (h) => { h.ch(); await h.tap('Sliced bread'); await wait(1400); await h.num(); await wait(1800); h.ch(); await h.show("Today's log", { left: true }); await wait(2200); h.ch(); await h.show('Empty wine and spirit bottles', { left: true }); await wait(1000); await h.tap('House red'); await wait(2400); } },
  forecasting: { who: 'u-fnb', url: '/forecast', run: async (h) => { h.ch(); await h.show('What to order', { left: true }); await wait(1200); await h.glide(260); await wait(1600); h.ch(); await h.show('Stock used, then predicted', { left: true }); await wait(2200); h.ch(); await h.show('Deliveries at risk', { left: true, block: 'start' }); await wait(1200); await h.glide(200); await wait(2000); } },
  auto: { who: 'u-buy', url: '/forecast?tab=auto', run: async (h) => { h.ch(); await h.show(["This morning's orders, {0} at {1}"], { left: true, prefix: true }); await wait(1200); await h.glide(240); await wait(1400); h.ch(); await h.tap('The rules'); await wait(1200); await h.glide(200); await wait(1600); h.ch(); await h.go('/forecast?tab=approvals&request=PR-LIS-0902'); await wait(1600); await h.dlg(300); await wait(1400); await h.dlg(300); await wait(1800); } },
  deliveries: { who: 'u-buy', url: '/deliveries#notes', run: async (h) => { h.ch(); await h.tap('Use a sample delivery note'); await wait(500); await h.tap(['{0}, today', 'Peixaria Atlântico']); await wait(2600); await h.dlg(240); await wait(800); h.ch(); await h.tap('Scale photo'); await wait(1400); await h.dlg(300); await wait(1000); h.ch(); await h.tap('Confirm delivery', { quiet: true }); await wait(1200); await h.esc(); await h.show('Credit requests', { left: true, block: 'start' }); await wait(2600); } },
  takes: { who: 'u-fnb', url: '/stock?tab=takes', run: async (h) => { h.ch(); await h.tapRow(0); await wait(2400); await h.dlg(300); await wait(1400); h.ch(); await h.dlg(400); await wait(1800); h.ch(); await h.esc(); await p_top(h); await h.tap('Bought against used'); await wait(1400); await h.glide(200); await wait(2000); } },
  pour: { who: 'u-lby', url: '/drinks?open=empties&scan=empties', run: async (h) => { h.ch(); await wait(800); await h.tap(['{0}, Friday late shift', 'Bar Azulejo']); await wait(3200); await h.dlg(260); await wait(1200); h.ch(); await h.dlg(320); await wait(1800); h.ch(); await h.esc(); await h.show('Who was on, day by day', { left: true, block: 'start', prefix: true }); await wait(1200); await h.glide(220); await wait(1600); } },
  revenue: { who: 'u-fnb', url: '/money', run: async (h) => { h.ch(); await wait(1400); await h.glide(300); await wait(1600); await h.glide(260); await wait(1400); h.ch(); await h.go('/stock?tab=recipes'); await h.glide(420); await wait(1200); await h.glide(240); await wait(1600); h.ch(); await h.go('/money?tab=reports'); await wait(800); await h.glide(240); await wait(2000); } },
  suppliers: { who: 'u-buy', url: '/forecast?tab=reliability', run: async (h) => { h.ch(); await h.tap('Catalogue and prices'); await wait(1600); await h.glide(200); await wait(1400); h.ch(); await h.glide(260); await wait(2000); h.ch(); await h.tap('Reliability'); await wait(1200); await h.glide(200); await wait(1800); } },
  finance: { who: 'u-fc', url: '/money?tab=flags', run: async (h) => { h.ch(); await h.show('Open flags', { left: true }); await wait(1400); await h.show('Cases', { left: true, block: 'start' }); await wait(1400); h.ch(); await h.tapRow(0); await wait(2600); await h.dlg(300); await wait(1600); h.ch(); await h.dlg(400); await wait(2000); } },
};
const ROWS = {
  'stock-requisitions': { who: 'u-buy', url: '/stock?tab=requisitions&scan=slip', run: async (h) => { await wait(600); await h.tap(['{0}, notepad slip', 'Bar Azulejo']); await wait(3000); await h.dlg(300); await wait(2000); } },
  'stock-expected': { who: 'u-fnb', url: '/stock', run: async (h) => { await h.tap('Analysis'); await wait(1000); await h.glide(200); await wait(1600); await h.glide(260); await wait(1800); } },
  'stock-recipes': { who: 'u-chef', url: '/stock?tab=recipes&view=new&scan=recipe', run: async (h) => { await wait(600); await h.tap('Sea bass, handwritten'); await wait(3200); await h.dlg(300); await wait(2000); } },
  'stock-menu-photo': { who: 'u-fnb', url: '/stock?tab=recipes&scan=menu', run: async (h) => { await wait(600); await h.tap(['{0}, new winter menu', 'Mercado']); await wait(3200); await h.dlg(300); await wait(2000); } },
  'stock-menu-sync': { who: 'u-chef', url: '/stock?tab=recipes&view=new', run: async (h) => { await h.show(['Menu synced from Simphony at {0}: {1} new dishes, {2} price change, {3} dish removed'], { left: true, prefix: true }); await wait(2200); await h.glide(240); await wait(2200); } },
  'stock-margin': { who: 'u-fnb', url: '/alerts?margin=first', run: async (h) => { await h.show(['Margin alert: {0}'], { left: true, block: 'start', prefix: true }); await wait(1800); await h.glide(260); await wait(2000); } },
  'expiry-batches': { who: 'u-chef', url: '/stock?tab=expiry', run: async (h) => { await h.show('Batches by use-by date', { left: true, block: 'start' }); await wait(1600); await h.glide(240); await wait(2000); } },
  'expiry-use-by': { who: 'u-buy', url: '/deliveries#notes', run: async (h) => { await h.tap('Use a sample delivery note'); await wait(900); await h.tap(['{0}, today', 'Peixaria Atlântico']); await wait(3000); await h.dlg(420); await wait(2200); } },
  'waste-prepared': { who: 'u-fnb', url: '/waste', run: async (h) => { await h.tap('Log a prepared dish or add a note'); await wait(1400); await h.glide(200); await wait(2200); } },
  'waste-empties': { who: 'u-fnb', url: '/waste', run: async (h) => { await h.show('Empty wine and spirit bottles', { left: true }); await wait(1200); await h.tap('House red'); await wait(1600); await h.tap('Prosecco'); await wait(1600); } },
  'waste-trend': { who: 'u-fnb', url: '/waste', run: async (h) => { await h.show('Waste this week', { left: true }); await wait(1600); await h.glide(240); await wait(2400); } },
  'forecasting-to-order': { who: 'u-buy', url: '/forecast?tab=toorder', run: async (h) => { await wait(800); await h.glide(160); await wait(1600); await h.glide(240); await wait(2000); } },
  'forecasting-top-ups': { who: 'u-buy', url: '/forecast?tab=toorder', run: async (h) => { await h.show('Outlet top-ups', { left: true }); await wait(1600); await h.glide(220); await wait(2000); } },
  'forecasting-prep': { who: 'u-chef', url: '/forecast?tab=prep', run: async (h) => { await wait(800); await h.glide(220); await wait(1800); await h.glide(240); await wait(1800); } },
  'forecasting-next-7-days': { who: 'u-fnb', url: '/forecast', run: async (h) => { if (!(await h.tap(['Next {0} days', '7'], { quiet: true }))) await h.tabN(2); await wait(1600); await h.glide(220); await wait(2000); } },
  'auto-approvals': { who: 'u-buy', url: '/forecast?tab=approvals', run: async (h) => { await h.show('Waiting for approval', { left: true }); await wait(1400); await h.glide(260); await wait(2200); } },
  'auto-channels': { who: 'u-buy', url: '/forecast?tab=approvals&request=PR-LIS-0902', run: async (h) => { await wait(1400); await h.dlg(240); await wait(2400); } },
  'auto-replies': { who: 'u-buy', url: '/forecast?tab=approvals&request=PR-LIS-0902', run: async (h) => { await wait(600); await h.dlg(520); await wait(1600); await h.dlg(300); await wait(2000); } },
  'auto-export': { who: 'u-fc', url: '/forecast?tab=approvals', run: async (h) => { await h.tap('Procurement export'); await wait(1800); await h.dlg(220); await wait(2000); } },
  'deliveries-short-weight': { who: 'u-buy', url: '/deliveries#notes', run: async (h) => { await h.tap('Use a sample delivery note'); await wait(900); await h.tap(['{0}, today', 'Peixaria Atlântico']); await wait(3000); await h.tap('Scale photo'); await wait(1600); await h.show('Short weight', { left: true, quiet: true }); await wait(2200); } },
  'deliveries-credits': { who: 'u-buy', url: '/deliveries', run: async (h) => { await h.show('Credit requests', { left: true, block: 'start' }); await wait(1600); await h.glide(220); await wait(2000); } },
  'deliveries-invoices': { who: 'u-fc', url: '/deliveries', run: async (h) => { await h.show('Only deliveries with a difference', { left: true, block: 'start' }); await wait(1600); await h.glide(220); await wait(2000); } },
  'deliveries-reliability': { who: 'u-buy', url: '/forecast?tab=reliability', run: async (h) => { await h.show('Least reliable first', { left: true, block: 'start' }); await wait(1600); await h.glide(260); await wait(2000); } },
  'takes-missing': { who: 'u-fnb', url: '/stock?tab=takes', run: async (h) => { await h.tap('Missing stock'); await wait(1600); await h.glide(220); await wait(2000); } },
  'takes-bought': { who: 'u-fnb', url: '/stock?tab=takes', run: async (h) => { await h.tap('Bought against used'); await wait(1600); await h.glide(220); await wait(1800); } },
  'takes-month-end': { who: 'u-fnb', url: '/stock?tab=takes', run: async (h) => { await h.show('Month-end report', { left: true, block: 'start' }); await wait(1400); await h.glide(160); await wait(2400); } },
  'takes-blind': { who: 'u-fnb', url: '/stock?tab=takes', run: async (h) => { await h.tap('Start a stock take'); await wait(1600); await h.dlg(240); await wait(2200); } },
  'pour-patterns': { who: 'u-fnb', url: '/drinks', run: async (h) => { await h.show('Flagged patterns', { left: true }); await wait(1200); await h.tap('All patterns', { quiet: true }); await wait(1200); await h.glide(220); await wait(1800); } },
  'pour-missing': { who: 'u-fnb', url: '/drinks', run: async (h) => { await h.show('Missing drinks', { left: true }); await wait(1400); await h.tap('Missing drinks', { left: true, quiet: true }); await wait(1400); await h.glide(220); await wait(1600); } },
  'finance-rooms': { who: 'u-fc', url: '/money?tab=flags', run: async (h) => { await h.show('Cases', { left: true, block: 'start' }); await wait(1000); await h.glide(320); await wait(2000); await h.glide(200); await wait(1800); } },
  'finance-bills': { who: 'u-fc', url: '/money?tab=flags', run: async (h) => { await h.show('Cases', { left: true, block: 'start' }); await wait(1000); await h.show('Cheaper item rung up', { left: true }); await wait(1600); await h.glide(200); await wait(1800); } },
  'finance-covers': { who: 'u-fc', url: '/money?tab=covers', run: async (h) => { await wait(1200); await h.show('Tables to check', { left: true, block: 'start' }); await wait(1600); await h.glide(220); await wait(1800); } },
  'finance-stock': { who: 'u-fc', url: '/money?tab=flags', run: async (h) => { await h.show('Bought more than used', { left: true }); await wait(1800); await h.glide(200); await wait(1800); } },
  'finance-waiters': { who: 'u-fnb', url: '/money?tab=waiters', run: async (h) => { await wait(1200); await h.glide(380); await wait(1600); await h.glide(200); await wait(1800); } },
  'finance-cash': { who: 'u-fc', url: '/money?tab=cash', run: async (h) => { await wait(1200); await h.glide(320); await wait(1600); await h.glide(200); await wait(1800); } },
  'finance-cases': { who: 'u-fc', url: '/money?tab=flags', run: async (h) => { await h.show('Cases', { left: true, block: 'start' }); await wait(1400); await h.tap('Closed'); await wait(1600); await h.glide(200); await wait(1600); } },
  'revenue-outlets': { who: 'u-fnb', url: '/money', run: async (h) => { await wait(1200); await h.glide(300); await wait(1600); await h.glide(260); await wait(2000); } },
  'revenue-menu': { who: 'u-fnb', url: '/stock?tab=recipes', run: async (h) => { await h.glide(420); await wait(1400); await h.glide(260); await wait(2000); } },
  'revenue-reports': { who: 'u-fnb', url: '/money?tab=reports', run: async (h) => { await wait(1200); await h.glide(220); await wait(1800); await h.glide(220); await wait(1600); } },
  'suppliers-catalogue': { who: 'u-buy', url: '/forecast?tab=reliability', run: async (h) => { await h.tap('Catalogue and prices'); await wait(1600); await h.glide(220); await wait(2000); } },
};

const list = which === 'all' ? [...Object.keys(MAIN), ...Object.keys(ROWS)] : which === 'main' ? Object.keys(MAIN) : which === 'rows' ? Object.keys(ROWS) : which.split(',');

// ---- the browser --------------------------------------------------------------------------------------------------
// SKIP=1 leaves out clips already recorded in this language and mode (after a crash)
const SKIP = !!process.env.SKIP;
const launch = () => puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'], protocolTimeout: 240000 });
let b = await launch();
fs.mkdirSync(`${OUT}/${lang}`, { recursive: true });
const chaptersFile = `${OUT}/chapters-${lang}-${mode}.json`;
const chapters = fs.existsSync(chaptersFile) ? JSON.parse(fs.readFileSync(chaptersFile, 'utf8')) : {};

const finder = `(t, o) => {
  const norm = (s) => (s || '').replace(/\\s+/g, ' ').trim();
  const dlgs = [...document.querySelectorAll('[role=dialog]')];
  const root = dlgs[dlgs.length - 1] || document.querySelector('main') || document.body;
  let best = null, exact = null;
  for (const e of root.querySelectorAll('*')) {
    if (e.closest('svg')) continue;
    const x = norm(e.innerText);
    if (!(o.prefix ? x.startsWith(t) : x === t || x.startsWith(t))) continue;
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (x === t && (!exact || r.width * r.height < exact.r.width * exact.r.height)) exact = { e, r };
    if (!best || r.width * r.height < best.r.width * best.r.height) best = { e, r };
  }
  return (exact || best)?.e;
}`;

async function record(key, spec) {
  const ctx = await b.createBrowserContext();
  const p = await ctx.newPage();
  p.setDefaultNavigationTimeout(120000);
  if (phone) {
    await p.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1');
    await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  } else await p.setViewport({ width: 1440, height: 900 });
  await prepare(p, lang);
  // the guided path and any running walkthrough are closed
  await p.evaluateOnNewDocument(() => {
    localStorage.setItem('tyll-guide-v1', JSON.stringify({ state: { scenario: null, step: 0, min: true }, version: 0 }));
    localStorage.setItem('tyll-walkthrough-v1', JSON.stringify({ state: { steps: null, at: 0, dir: 1 }, version: 0 }));
  });
  const dress = () =>
    p.evaluate(() => {
      document.querySelectorAll('nextjs-portal,[data-sonner-toaster]').forEach((e) => e.remove());
      if (document.getElementById('rec-cursor')) return;
      const s = document.createElement('style');
      s.textContent = 'nextjs-portal{display:none!important}#rec-cursor{position:fixed;left:0;top:0;width:24px;height:24px;margin:-12px 0 0 -12px;border-radius:50%;background:rgba(20,22,26,.22);border:2px solid rgba(20,22,26,.75);z-index:2147483647;pointer-events:none;transition:transform .7s cubic-bezier(.3,.7,.2,1),scale .18s}';
      document.head.append(s);
      const c = document.createElement('div');
      c.id = 'rec-cursor';
      c.style.transform = `translate(${innerWidth / 2}px,${innerHeight * 0.6}px)`;
      document.body.append(c);
    });
  const go = async (u) => {
    for (let i = 0; i < 4; i++) {
      try {
        await p.goto(BASE + u, { waitUntil: 'networkidle2' });
        break;
      } catch (e) {
        if (i === 3) throw e;
        await wait(2500);
      }
    }
    await wait(1400);
    await dress();
  };
  // enter as the story's role, and put the guided stories back to their start
  await p.goto(BASE + '/stock', { waitUntil: 'networkidle2' });
  await p.evaluate(async (who) => {
    const post = (u, body) => fetch(u, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    await post('/api/auth/demo', { userId: who });
    await post('/api/demo/story', { story: 'hero' });
    await post('/api/demo/story', { story: 'all-photo' });
  }, spec.who);
  await go(spec.url);

  const show = async (en, o = {}) => {
    const t = L(en);
    const ok = await p.evaluate(
      async (t, finder, o) => {
        const f = eval(finder);
        let e = f(t, o);
        for (let i = 0; !e && i < (o.quiet ? 4 : 30); i++) {
          await new Promise((r) => setTimeout(r, 200));
          e = f(t, o);
        }
        if (!e) return false;
        e.scrollIntoView({ block: o.block || 'center', behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 750));
        const r = e.getBoundingClientRect();
        const c = document.getElementById('rec-cursor');
        const rtl = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
        const x = o.left ? (rtl ? r.right - Math.min(70, r.width / 2) : r.left + Math.min(70, r.width / 2)) : r.left + r.width / 2;
        if (c) c.style.transform = `translate(${x}px,${r.top + Math.min(r.height / 2, 40)}px)`;
        return true;
      },
      t,
      finder,
      o,
    );
    if (!ok && !o.quiet) console.log('  MISS', key, JSON.stringify(t));
    await wait(ok ? 550 : 0);
    return ok;
  };
  const press = (sel) =>
    p.evaluate(async () => {
      const c = document.getElementById('rec-cursor');
      if (c) c.style.scale = '0.65';
      await new Promise((r) => setTimeout(r, 160));
      if (c) c.style.scale = '1';
    });
  const tap = async (en, o = {}) => {
    if (!(await show(en, o))) return false;
    await press();
    await p.evaluate(
      (t, finder, o) => {
        const e = eval(finder)(t, o);
        let x = e;
        while (x && !x.matches('button,a,summary,[role=button],[role=tab],label,tr[tabindex],[tabindex="0"]')) x = x.parentElement;
        (x || e).click();
      },
      L(en),
      finder,
      o,
    );
    await wait(800);
    await dress();
    return true;
  };
  // the first button in the open dialog (or the first sample photo with `img`)
  const first = async (o = {}) => {
    const ok = await p.evaluate(async (o) => {
      for (let i = 0; i < 25; i++) {
        const d = [...document.querySelectorAll('[role=dialog]')].pop();
        const scope = d || document.querySelector('main');
        const btns = [...scope.querySelectorAll('button')].filter((b) => b.offsetWidth && !b.disabled && (!o.img || b.querySelector('img,picture,svg image')) && !/close|schließen|chiudi|إغلاق/i.test(b.getAttribute('aria-label') || ''));
        const pick = o.img ? btns[0] : btns.find((b) => /\d/.test(b.innerText)) || btns[0];
        if (pick) {
          const r = pick.getBoundingClientRect();
          const c = document.getElementById('rec-cursor');
          if (c) c.style.transform = `translate(${r.left + r.width / 2}px,${r.top + Math.min(r.height / 2, 40)}px)`;
          await new Promise((res) => setTimeout(res, 800));
          pick.click();
          return true;
        }
        await new Promise((res) => setTimeout(res, 200));
      }
      return false;
    }, o);
    if (!ok) console.log('  MISS first', key);
    await wait(900);
    await dress();
  };
  // the first amount button (a button whose whole text is a number), as in Log waste's "How many?"
  const num = async () => {
    const ok = await p.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        const b = [...document.querySelectorAll('main button, [role=dialog] button')].find((x) => x.offsetWidth && /^\d+$/.test(x.innerText.trim()));
        if (b) {
          const r = b.getBoundingClientRect();
          const c = document.getElementById('rec-cursor');
          if (c) c.style.transform = `translate(${r.left + r.width / 2}px,${r.top + r.height / 2}px)`;
          await new Promise((res) => setTimeout(res, 800));
          b.click();
          return true;
        }
        await new Promise((res) => setTimeout(res, 200));
      }
      return false;
    });
    if (!ok) console.log('  MISS num', key);
    await wait(900);
    await dress();
  };
  // the nth tab of the page (when its label is written differently in a language)
  const tabN = async (n) => {
    await p.evaluate(async (n) => {
      const t = [...document.querySelectorAll('main [role=tab]')].filter((x) => x.offsetWidth)[n];
      if (!t) return;
      const r = t.getBoundingClientRect();
      const c = document.getElementById('rec-cursor');
      if (c) c.style.transform = `translate(${r.left + r.width / 2}px,${r.top + r.height / 2}px)`;
      await new Promise((res) => setTimeout(res, 800));
      t.click();
    }, n);
    await wait(1000);
    await dress();
  };
  // the first row of the page's main table
  const tapRow = async (n) => {
    await p.evaluate(async (n) => {
      const rows = [...document.querySelectorAll('main tbody tr')].filter((r) => r.offsetHeight);
      const r = rows[n];
      if (!r) return;
      r.scrollIntoView({ block: 'center', behavior: 'smooth' });
      await new Promise((res) => setTimeout(res, 800));
      const b = r.getBoundingClientRect();
      const c = document.getElementById('rec-cursor');
      if (c) c.style.transform = `translate(${b.left + 120}px,${b.top + b.height / 2}px)`;
      await new Promise((res) => setTimeout(res, 700));
      (r.querySelector('a,button') || r).click();
    }, n);
    await wait(1200);
    await dress();
  };
  // scroll the open dialog (or the page) smoothly
  const dlg = async (px) => {
    await p.evaluate(async (px) => {
      const d = [...document.querySelectorAll('[role=dialog]')].pop();
      let e = null;
      if (d) for (const x of [d, ...d.querySelectorAll('*')]) if (x.scrollHeight > x.clientHeight + 20 && /auto|scroll/.test(getComputedStyle(x).overflowY)) { e = x; break; }
      (e || window).scrollBy({ top: px, behavior: 'smooth' });
      await new Promise((r) => setTimeout(r, 900));
    }, px);
  };
  const glide = (px) => p.evaluate(async (px) => { window.scrollBy({ top: px, behavior: 'smooth' }); await new Promise((r) => setTimeout(r, 900)); }, px);
  const esc = async () => {
    await p.keyboard.press('Escape');
    await wait(700);
  };

  const file = `${OUT}/${lang}/${key}-${mode}.webm`;
  const rec = await p.screencast({ path: file, ffmpegPath: FF });
  const t0 = Date.now();
  const marks = [];
  await wait(500);
  const h = { ch: () => marks.push(+((Date.now() - t0) / 1000).toFixed(1)), show, tap, first, num, tabN, tapRow, dlg, glide, esc, go };
  try {
    await spec.run(h);
  } catch (e) {
    console.log('  ERROR', key, e.message);
  }
  await wait(600);
  const dur = +((Date.now() - t0) / 1000).toFixed(1);
  await rec.stop();
  chapters[key] = { marks, dur };
  console.log(lang, mode, key, dur + 's', marks.length ? JSON.stringify(marks) : '');
  await ctx.close().catch(() => {});
}

for (const key of list) {
  const spec = MAIN[key] ?? ROWS[key];
  if (!spec) {
    console.log('unknown clip', key);
    continue;
  }
  if (SKIP && chapters[key] && fs.existsSync(`${OUT}/${lang}/${key}-${mode}.webm`)) continue;
  // one retry in a fresh browser if the browser goes away mid-clip
  for (let i = 0; i < 2; i++) {
    try {
      if (!b.connected) b = await launch();
      await record(key, spec);
      break;
    } catch (e) {
      console.log('  RETRY', key, e.message);
      await b.close().catch(() => {});
      b = await launch();
    }
  }
  fs.writeFileSync(chaptersFile, JSON.stringify(chapters, null, 1));
}
await b.close();
process.exit(0);
