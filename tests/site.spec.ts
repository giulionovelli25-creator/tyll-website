// The site's browser tests (20 Nov 2026; round 4, 24 Nov 2026; round 5, 25 Nov 2026, with tests/round5.spec.ts). Run
// against the dev server: `npx playwright test` (config in playwright.config.ts: Chromium and WebKit at 390 × 844,
// 768 × 1024, 1280 × 720, 1440 × 900 and 1920 × 1080). Whole-site
// sweeps that do not depend on the window (every link, every page's language switch) run once per browser at 1280 px;
// everything that a visitor sees or clicks runs in all ten. Strings come from the site's own language files and
// content, so a changed word never breaks a test.
import fs from 'node:fs';
import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';
import { pages, locales, solutionKeys, legacy, type Locale, type PageKey } from '../src/i18n/routes';
import { dict } from '../src/i18n';
import type { Solution } from '../src/content/solutions';
import type { SustainabilityCopy } from '../src/content/sustainability';

// The content as data, written by tests/global-setup.ts (the content files import photographs)
const content = JSON.parse(fs.readFileSync('tests/tmp/content.json', 'utf8')) as {
  solutions: Record<(typeof solutionKeys)[number], Solution>;
  sections: { id: string; keys: (typeof solutionKeys)[number][] }[];
  moreKeys: (typeof solutionKeys)[number][];
  sustainability: Record<Locale, SustainabilityCopy>;
};
const { solutions, sections, moreKeys, sustainability } = content;

const width = (p: { project: { metadata: { width?: number } } }) => p.project.metadata.width ?? 1280;
const desktop = (info: Parameters<Parameters<typeof test>[1]>[1]) => width(info) >= 1100;
const sweep = (info: Parameters<Parameters<typeof test>[1]>[1]) => width(info) === 1280;
const height = (p: { project: { metadata: { height?: number } } }) => p.project.metadata.height ?? 900;
/** Words that must not appear anywhere any more (round 4): renamed or rewritten */
const gone = ['Money Back List', 'Bill and cash checks', 'Coming next', 'Tyll never sends', 'Usually nobody stands out', 'Rückholliste', 'Lista recuperi', 'قائمة استرداد الأموال', 'Rechnungs- und Bargeldprüfung', 'Controlli su conti e contanti', 'تدقيق الفواتير والنقد'];
const allPages = Object.keys(pages) as PageKey[];
const DEMO = 'https://demo.tyll.ai/';

/** Visible text of the page, without hidden elements */
const visibleText = (page: Page) => page.evaluate(() => document.body.innerText);

/** Collects console errors and failed requests to this site while a page loads */
const watch = (page: Page) => {
  const problems: string[] = [];
  page.on('console', (m: ConsoleMessage) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => problems.push(`page: ${e.message}`));
  page.on('requestfailed', (r) => {
    const err = r.failure()?.errorText ?? '';
    // A film or picture the browser stops loading on purpose (preload, leaving the page) is not a failure
    if (/ABORTED|cancelled|Load request cancelled/i.test(err)) return;
    problems.push(`failed: ${r.url()} ${err}`);
  });
  page.on('response', (r) => {
    if (r.url().startsWith('http://localhost:4321') && r.status() >= 400) problems.push(`${r.status()}: ${r.url()}`);
  });
  return problems;
};

// ── 1 and 9. Every internal link answers 200, no link to a removed place, no console errors or failed requests ──
test.describe('every page', () => {
  test('internal links answer 200, anchors exist, nothing links to removed places', async ({ page, request }, info) => {
    test.skip(!sweep(info), 'runs once per browser');
    test.setTimeout(600_000);
    const seen = new Map<string, Set<string>>();
    for (const key of allPages)
      for (const lang of locales) {
        const url = pages[key][lang];
        const res = await request.get(url);
        expect(res.status(), url).toBe(200);
        const html = await res.text();
        for (const m of html.matchAll(/href="([^"]+)"/g)) {
          const h = m[1];
          if (!h.startsWith('/') || h.startsWith('//')) continue;
          expect(h, `${url} links to ${h}`).not.toMatch(/#report(?!s)|#sustainability|\/guides\/|\/ratgeber\//);
          const [path, hash] = h.split('#');
          if (!seen.has(path)) seen.set(path, new Set());
          if (hash) seen.get(path)!.add(hash);
        }
      }
    for (const [path, hashes] of seen) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      if (hashes.size && res.headers()['content-type']?.includes('html')) {
        const html = await res.text();
        for (const id of hashes) expect(html, `${path}#${id}`).toContain(`id="${id}"`);
      }
    }
  });

  test('no console errors or failed requests, Arabic is right to left, no English on other languages', async ({ page }, info) => {
    test.skip(!sweep(info), 'runs once per browser');
    test.setTimeout(900_000);
    const english = ['Book a demo', 'Watch it work', 'Coming next', 'Try the demo', 'All solutions', 'How it works', 'Sustainability', 'Solutions', 'Read more'];
    for (const key of allPages)
      for (const lang of locales) {
        const problems = watch(page);
        await page.goto(pages[key][lang], { waitUntil: 'load' });
        await page.waitForTimeout(400);
        expect(problems, `${pages[key][lang]}`).toEqual([]);
        page.removeAllListeners('console');
        page.removeAllListeners('pageerror');
        page.removeAllListeners('requestfailed');
        page.removeAllListeners('response');
        const dir = await page.getAttribute('html', 'dir');
        expect(dir, pages[key][lang]).toBe(lang === 'ar' ? 'rtl' : 'ltr');
        const text = await visibleText(page);
        for (const g of gone) expect(text, `${pages[key][lang]} still says "${g}"`).not.toContain(g);
        if (lang !== 'en') for (const w of english) expect(text, `${pages[key][lang]} shows English "${w}"`).not.toContain(w);
      }
  });
});

// ── 2. The header ──
for (const lang of locales) {
  test.describe(`header ${lang}`, () => {
    test('holds exactly Solutions, How it works, Sustainability, About us, languages and Book a demo', async ({ page }, info) => {
      // 25 Nov 2026, the owner after round 5: the bar as before; Hotel groups only in the footer, no Try the demo
      const d = dict[lang];
      await page.goto(pages.solutions[lang]);
      const header = page.locator('#site-header');
      const bar = header.locator('.header__bar');
      const book = bar.locator('.header__book');
      await expect(book).toBeVisible();
      await expect(book).toHaveText(d.cta.book);
      await expect(header.locator('.header__logo')).toBeVisible();
      if (desktop(info)) {
        const nav = bar.locator('.header__nav > :visible');
        await expect(nav).toHaveCount(4);
        expect((await nav.allInnerTexts()).map((x) => x.trim())).toEqual([d.nav.solutions, d.nav.how, d.nav.sustainability, d.nav.about]);
        await expect(nav.nth(3)).toHaveAttribute('href', pages.about[lang]);
        await expect(nav.nth(2)).toHaveAttribute('href', pages.sustainability[lang]);
        await expect(bar.locator('[data-langdrop]')).toBeVisible();
        await expect(bar.locator('.header__end > :visible')).toHaveCount(2);
        for (const el of await nav.all()) expect(await el.evaluate((e) => e.getClientRects().length), await el.innerText()).toBe(1);
      } else {
        await bar.locator('.header__burger').click();
        const menu = header.locator('#mobile-menu');
        await expect(menu).toBeVisible();
        const order = await menu.locator('nav > :visible').evaluateAll((els) => els.map((e) => e.className.split(' ')[0]));
        expect(order).toEqual(['mobile-menu__group', 'mobile-menu__how', 'mobile-menu__how', 'mobile-menu__how', 'lang', 'mobile-menu__actions']);
      }
      // FAQ and Hotel groups live in the footer; the header never links to the demo
      expect(await bar.innerText()).not.toContain(d.nav.faqShort);
      expect(await header.locator(`a[href="${pages.faq[lang]}"], a[href="${pages.groups[lang]}"]`).count()).toBe(0);
      expect(await header.locator('a[href*="#report"], a[href*="#sustainability"], a[href*="demo.tyll.ai"]').count()).toBe(0);
      await expect(page.locator(`.footer a[href="${pages.groups[lang]}"]`)).toHaveCount(1);
    });

    // ── 4. The Solutions menu, desktop and phone ──
    test('Solutions menu opens, closes and leads to every section and page', async ({ page, request }, info) => {
      await page.goto(pages.how[lang]);
      if (desktop(info)) {
        const trigger = page.locator('#solutions-trigger');
        const panel = page.locator('#solutions-panel');
        await trigger.click();
        await expect(panel).toBeVisible();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        await page.keyboard.press('Escape');
        await expect(panel).toBeHidden();
        await expect(trigger).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(panel).toBeVisible();
        await page.mouse.click(5, 600);
        await expect(panel).toBeHidden();
        await trigger.focus();
        await page.keyboard.press('Space');
        await expect(panel).toBeVisible();
        await panel.locator('a').first().focus();
        await page.keyboard.press('Escape');
        await expect(trigger).toBeFocused();
        await trigger.click();
        await expect(panel.locator('.panel__part')).toHaveCount(3);
        for (const col of await panel.locator('.panel__part').all()) {
          await expect(col.locator('[data-solution]')).toHaveCount(3);
          await expect(col.locator('[data-solution] .panel__icon svg')).toHaveCount(3);
        }
        await expect(panel.locator('a')).toHaveCount(10);
        // the nine names, column by column, as in the demo's menu
        const names = await panel.locator('[data-solution]').evaluateAll((as) => as.map((a) => (a.querySelector('.panel__name') ?? a).textContent!.trim()));
        const want = sections.flatMap((sec) => sec.keys.map((k) => solutions[k].name[lang]));
        for (const n of want) expect(names.some((x) => x.startsWith(n)), n).toBe(true);
        for (const k of moreKeys) expect(names.some((x) => x.startsWith(solutions[k].name[lang])), `${k} not in the menu`).toBe(false);
        await expect(panel.locator('.panel__faq')).toHaveCount(0);
        for (const href of await panel.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) expect((await request.get(href)).status(), href).toBe(200);
        await panel.locator('.panel__all').click();
        await expect(page).toHaveURL(new RegExp(`${pages.solutions[lang]}$`));
      } else {
        await page.locator('.header__burger').click();
        const menu = page.locator('#mobile-menu');
        await expect(menu.locator('[data-solution]')).toHaveCount(9);
        await expect(menu.locator('[data-solution] svg')).toHaveCount(9);
        for (const href of await menu.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) expect((await request.get(href)).status(), href).toBe(200);
        await page.keyboard.press('Escape');
        await expect(menu).toBeHidden();
        await expect(page.locator('.header__burger')).toBeFocused();
      }
    });

    // ── 3. The only way into the demo ──
    test('Watch it work appears once and opens the demo in this language', async ({ page }) => {
      await page.goto(pages.home[lang]);
      const watchLabel = dict[lang].hero.watch;
      const links = page.locator('a', { hasText: watchLabel });
      await expect(links).toHaveCount(1);
      await expect(links).toHaveAttribute('href', `${DEMO}?lang=${lang}`);
      await expect(links).toHaveAttribute('target', '_blank');
      // every demo link on the page opens in a new tab, in this language
      for (const a of await page.locator('a[href*="demo.tyll.ai"]').all()) {
        await expect(a).toHaveAttribute('target', '_blank');
        expect(await a.getAttribute('href')).toContain(`lang=${lang}`);
      }
    });
  });
}

// ── 5. The language switch leads to the same page in the other language ──
test('language switch maps every page, including the new ones', async ({ request }, info) => {
  test.skip(!sweep(info), 'runs once per browser');
  test.setTimeout(300_000);
  for (const key of allPages)
    for (const lang of locales) {
      const html = await (await request.get(pages[key][lang])).text();
      for (const other of locales) {
        const re = new RegExp(`<a href="${pages[key][other].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" hreflang="${other}"`);
        expect(html, `${pages[key][lang]} → ${other}`).toMatch(re);
      }
    }
});

for (const lang of locales)
  test(`language switch works by click (${lang})`, async ({ page }, info) => {
    const other = lang === 'en' ? 'de' : 'en';
    await page.goto(pages.takes[lang]);
    if (desktop(info)) {
      await page.locator('[data-langdrop] summary').click();
      await page.locator(`[data-langdrop] a[hreflang="${other}"]`).click();
    } else {
      await page.locator('.header__burger').click();
      await page.locator(`#mobile-menu a[hreflang="${other}"]`).click();
    }
    await expect(page).toHaveURL(new RegExp(`${pages.takes[other]}$`));
  });

// ── 6. Every solution page's film loads, plays and pauses; with reduced motion nothing plays ──
for (const lang of locales)
  test.describe(`films ${lang}`, () => {
    for (const key of solutionKeys)
      test(`${key} film plays and pauses`, async ({ page }, info) => {
        test.skip(width(info) === 768, 'the 768 px window shows the same desk film as 1280');
        await page.goto(pages[key][lang]);
        const video = page.locator('[data-film] video');
        await video.scrollIntoViewIfNeeded();
        await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState), { timeout: 20_000 }).toBeGreaterThanOrEqual(2);
        const src = await video.evaluate((v: HTMLVideoElement) => v.currentSrc);
        // the demo is desktop only: phones get the desktop recording too
        expect(src).toContain(`/media/film/${lang}/${key}-desk.mp4`);
        await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime), { timeout: 10_000 }).toBeGreaterThan(0.3);
        const toggle = page.locator('[data-film] .film__toggle');
        await toggle.click();
        await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
        await expect(toggle).toHaveAttribute('aria-pressed', 'true');
      });
  });

test.describe('films with reduced motion', () => {
  test.use({ colorScheme: 'light', reducedMotion: 'reduce' });
  for (const lang of locales)
    test(`nothing plays and the poster shows (${lang})`, async ({ page }, info) => {
      await page.goto(pages.finance[lang]);
      const video = page.locator('[data-film] video');
      await video.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
      const poster = await video.getAttribute('poster');
      expect(poster).toContain(`/media/film/${lang}/finance-desk.jpg`);
    });
});

// ── 7. The sustainability page: see tests/round5.spec.ts ──

// ── 8. The homepage's story, number carousel and free report form ──
for (const lang of locales)
  test.describe(`homepage ${lang}`, () => {
    test('story: Play and its label agree, a step stops it and stays highlighted with its panel', async ({ page }) => {
      await page.goto(pages.home[lang]);
      const tour = dict[lang].home.tour;
      const play = page.locator('[data-hs-play]');
      await page.locator('[data-hs-go="0"]').scrollIntoViewIfNeeded();
      if (!(await play.isVisible())) test.skip(true, 'the film player is not running in this window');
      await play.click();
      await expect(play).toHaveAttribute('aria-pressed', 'true');
      await expect(play).toHaveText(tour.pause);
      await page.locator('[data-hs-go="2"]').click();
      await expect(play).toHaveAttribute('aria-pressed', 'false');
      await expect(play).toHaveText(tour.play);
      await page.waitForTimeout(1600);
      await expect(page.locator('[data-hs-go="2"]')).toHaveAttribute('aria-current', 'step');
      await expect(page.locator('[data-hs-hold="2"]')).toHaveClass(/is-on/);
      await page.setViewportSize({ width: 900, height: 800 });
      await page.waitForTimeout(600);
      const current = await page.locator('[data-hs-go][aria-current="step"]').getAttribute('data-hs-go');
      await expect(page.locator(`[data-hs-hold="${current}"]`)).toHaveClass(/is-on/);
    });

    test('numbers: every button goes to its number on the first click', async ({ page }) => {
      await page.goto(pages.home[lang]);
      const dots = page.locator('[data-why-go]');
      await dots.first().scrollIntoViewIfNeeded();
      for (const i of [1, 2, 0, 2, 1]) {
        await dots.nth(i).click();
        await expect(dots.nth(i)).toHaveAttribute('aria-current', 'true');
        await page.waitForTimeout(1200);
        await expect(dots.nth(i)).toHaveAttribute('aria-current', 'true');
        await expect(page.locator('[data-why-now]')).toHaveText(String(i + 1));
      }
    });

    test('report form: each step names only its own fields; the send error waits for a real send', async ({ page }) => {
      const r = dict[lang].home.report;
      await page.goto(pages.home[lang]);
      await page.locator('[data-report-open], .rf button', { hasText: r.open }).first().click();
      const steps = page.locator('[data-step]');
      // the form unfolds over about half a second; click once it has settled
      await expect(steps.nth(0).locator('input[name="name"]')).toBeVisible();
      await page.waitForTimeout(700);
      await steps.nth(0).locator('[data-next]').click();
      await expect(steps.nth(0).locator('[data-check-error]')).toBeVisible();
      await expect(steps.nth(0).locator('[data-check-error]')).toHaveText(r.errorYou);
      await expect(page.locator('[data-send-error]')).toBeHidden();
      await steps.nth(0).locator('input[name="name"]').fill('Test Person');
      await steps.nth(0).locator('input[name="email"]').fill('test@example.com');
      await steps.nth(0).locator('[data-next]').click();
      await steps.nth(1).locator('[data-next]').click();
      await expect(steps.nth(1).locator('[data-check-error]')).toHaveText(r.errorVenue);
      await expect(page.locator('[data-send-error]')).toBeHidden();
    });
  });

// ── Round 4 (24 Nov 2026) ──

// Pages folded into others redirect to the page that holds them, and open its row; Expiring soon and Over pouring are
// pages again
for (const lang of locales)
  test(`old addresses open the right row; Expiring soon and Over pouring are pages (${lang})`, async ({ page, request }, info) => {
    test.skip(!sweep(info), 'runs once per browser');
    for (const x of Object.values(legacy)) {
      await page.goto(x.from[lang]);
      await expect(page).toHaveURL(new RegExp(`${pages[x.to][lang]}#${x.anchor}$`));
      await expect(page.locator(`#${x.anchor} .xrow__head`)).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator(`#${x.anchor} .xrow__panel`)).toBeVisible();
    }
    for (const k of ['expiry', 'pour'] as const) {
      const html = await (await request.get(pages[k][lang])).text();
      expect(html).toContain('id="sol-title"');
      expect(html).not.toContain('http-equiv="refresh"');
    }
  });

// Every film and clip exists in every language, with its poster
test('every film and row clip exists in all four languages, with a poster', async ({}, info) => {
  test.skip(!sweep(info), 'runs once per browser');
  const clips = [...solutionKeys, ...solutionKeys.flatMap((k) => (solutions[k].rows ?? []).map((r) => r.film).filter(Boolean) as string[])];
  for (const lang of locales)
    for (const c of new Set(clips))
      for (const mode of ['desk'])
        for (const ext of ['mp4', 'jpg']) {
          const f = `public/media/film/${lang}/${c}-${mode}.${ext}`;
          expect(fs.existsSync(f), f).toBe(true);
          if (ext === 'mp4') expect(fs.statSync(f).size, `${f} under about 3 MB`).toBeLessThan(3.2 * 1024 * 1024);
        }
});

// The demo is desktop only (the owner, 24 Nov 2026): no page ever shows or loads it in a phone layout
test('no page shows the demo in a phone layout', async ({ request }, info) => {
  test.skip(!sweep(info), 'runs once per browser');
  for (const key of allPages)
    for (const lang of locales) {
      const html = await (await request.get(pages[key][lang])).text();
      expect(html, pages[key][lang]).not.toMatch(/\/media\/film\/[^"']*-phone\./);
    }
  expect(fs.readdirSync('public/media/film', { recursive: true }).filter((f) => String(f).includes('-phone.'))).toEqual([]);
});

// On desktops the film and its three steps fit under the header without scrolling
for (const lang of locales)
  test(`solution pages: film and steps fit the first screen (${lang})`, async ({ page }, info) => {
    test.skip(width(info) < 1280, 'tablets and phones stack the page');
    for (const k of solutionKeys) {
      await page.goto(pages[k][lang]);
      const bottom = await page.locator('.film__bar-row').evaluate((e) => e.getBoundingClientRect().bottom);
      const frame = await page.locator('.film__frame').evaluate((e) => e.getBoundingClientRect().top);
      expect(bottom, `${k} at ${width(info)} × ${height(info)}`).toBeLessThanOrEqual(height(info));
      expect(frame, k).toBeGreaterThanOrEqual(72);
      await expect(page.locator('.film__chapter')).toHaveCount(3);
    }
  });

// The rows: one open at a time, a row's clip loads only when it opens, and an address with a row's #id opens it
for (const lang of locales)
  test(`rows open one at a time and load their clip on opening (${lang})`, async ({ page }) => {
    const clips: string[] = [];
    page.on('request', (r) => r.url().includes('/media/film/') && r.url().endsWith('.mp4') && clips.push(r.url()));
    const rowsOf = solutions.finance.rows!;
    await page.goto(pages.finance[lang]);
    const rows = page.locator('[data-row]');
    await expect(rows).toHaveCount(rowsOf.length);
    await page.waitForTimeout(500);
    for (const r of rowsOf) expect(clips.filter((u) => u.includes(`/${r.film}-`))).toEqual([]);
    await rows.nth(0).locator('.xrow__head').click();
    await expect(rows.nth(0).locator('.xrow__panel')).toBeVisible();
    await expect.poll(() => clips.filter((u) => u.includes(`/${rowsOf[0].film}-`)).length).toBeGreaterThan(0);
    await rows.nth(1).locator('.xrow__head').click();
    await expect(rows.nth(0).locator('.xrow__head')).toHaveAttribute('aria-expanded', 'false');
    await expect(rows.nth(1).locator('.xrow__head')).toHaveAttribute('aria-expanded', 'true');
    const clip = rows.nth(1).locator('video');
    await expect.poll(() => clip.evaluate((v: HTMLVideoElement) => v.readyState), { timeout: 20_000 }).toBeGreaterThanOrEqual(2);
    // every row on every page has its own clip
    for (const k of solutionKeys) for (const r of solutions[k].rows ?? []) expect(r.film, `${k}#${r.id}`).toBeTruthy();
    await page.goto(pages.stock[lang] + '#margin');
    await expect(page.locator('#margin .xrow__head')).toHaveAttribute('aria-expanded', 'true');
  });

// /solutions/: nine photo cards, three per row on desktop, one open at a time, each with a clip loaded on opening;
// then More in Tyll and the In development line
for (const lang of locales)
  test(`solution cards open and close, with their clip; More in Tyll (${lang})`, async ({ page, request }, info) => {
    const clips: string[] = [];
    page.on('request', (r) => r.url().includes('/media/film/') && r.url().endsWith('.mp4') && clips.push(r.url()));
    await page.goto(pages.solutions[lang]);
    const btns = page.locator('.tile__btn');
    await expect(btns).toHaveCount(9);
    if (width(info) >= 1280) {
      const tops = await page.locator('.tiles').first().locator('.tile').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
      expect(new Set(tops).size).toBe(1);
    }
    await page.waitForTimeout(400);
    expect(clips).toEqual([]);
    const panel = async (i: number) => page.locator(`#${await btns.nth(i).getAttribute('aria-controls')}`);
    await btns.nth(0).click();
    await expect(btns.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect((await panel(0)).locator('li')).toHaveCount(3);
    await expect((await panel(0)).locator('a')).toBeVisible();
    await expect.poll(() => clips.filter((u) => u.includes(`/${lang}/stock-desk.mp4`)).length).toBeGreaterThan(0);
    await btns.nth(1).click();
    await expect(btns.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(btns.nth(1)).toHaveAttribute('aria-expanded', 'true');
    expect(await (await panel(0)).locator('video').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await btns.nth(1).click();
    await expect(btns.nth(1)).toHaveAttribute('aria-expanded', 'false');
    await btns.nth(2).focus();
    await page.keyboard.press('Enter');
    await expect(btns.nth(2)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(btns.nth(2)).toHaveAttribute('aria-expanded', 'false');
    await expect(btns.nth(2)).toBeFocused();
    await expect(page.locator('.tile.is-open')).toHaveCount(0);
    const more = page.locator('#more-in-tyll a');
    await expect(more).toHaveCount(4);
    for (const href of await more.evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) expect((await request.get(href.split('#')[0])).status(), href).toBe(200);
    await expect(page.locator('.index__soon')).toHaveText(dict[lang].home.parts.soon);
  });

// The homepage: the hero line, the steps' order and links, and the Scan strip
for (const lang of locales)
  test(`homepage hero line, steps and the Scan strip (${lang})`, async ({ page, request }) => {
    const d = dict[lang];
    await page.goto(pages.home[lang]);
    await expect(page.locator('.hero__sub')).toHaveText(d.hero.sub);
    if (lang === 'en') expect(d.hero.sub.split(/\s+/).length).toBe(25);
    const labels = await page.locator('[data-hs-go] .hs__l').allInnerTexts();
    expect(labels.slice(0, 3)).toEqual([d.home.tour.steps[0].label, d.home.tour.steps[1].label, d.home.tour.steps[2].label]);
    const hrefs = await page.locator('.hs__more').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.slice(0, 3)).toEqual([`${pages.solutions[lang]}#stock-waste`, `${pages.solutions[lang]}#purchasing`, `${pages.solutions[lang]}#reconciliation`]);
    const scan = page.locator('#scan');
    await expect(scan.locator('h2')).toHaveText(d.solutionPage.scan.title);
    const items = scan.locator('.scan__item');
    await expect(items).toHaveCount(5);
    await expect(scan.locator('.scan__honest')).toHaveText(d.solutionPage.scan.honest);
    for (const href of await items.evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) {
      const [path, id] = href.split('#');
      const html = await (await request.get(path)).text();
      expect(html, href).toContain(`id="${id}"`);
    }
  });
