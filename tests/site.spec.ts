// The site's browser tests (20 Nov 2026). Run against the dev server: `npx playwright test` (config in
// playwright.config.ts: Chromium and WebKit at 375, 768 and 1280 px). Whole-site sweeps that do not depend on the
// window (every link, every page's language switch) run once per browser at 1280 px; everything that a visitor sees or
// clicks runs in all six. Strings come from the site's own language files, so a changed word never breaks a test.
import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';
import { pages, locales, solutionKeys, legacy, type Locale, type PageKey } from '../src/i18n/routes';
import { dict } from '../src/i18n';

const width = (p: { project: { metadata: { width?: number } } }) => p.project.metadata.width ?? 1280;
const desktop = (info: Parameters<Parameters<typeof test>[1]>[1]) => width(info) >= 1100;
const sweep = (info: Parameters<Parameters<typeof test>[1]>[1]) => width(info) === 1280;
const allPages = Object.keys(pages) as PageKey[];
const DEMO = 'https://demo.tyll.ai/';
const tryLabels = locales.map((l) => dict[l].cta.demo.replace(/\s*[→←]$/, ''));

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
        for (const t of tryLabels) expect(text, `${pages[key][lang]} has "${t}"`).not.toContain(t);
        if (lang !== 'en') for (const w of english) expect(text, `${pages[key][lang]} shows English "${w}"`).not.toContain(w);
      }
  });
});

// ── 2. The header ──
for (const lang of locales) {
  test.describe(`header ${lang}`, () => {
    test('holds exactly logo, Solutions, How it works, Sustainability, languages and Book a demo', async ({ page }, info) => {
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
        await expect(nav).toHaveCount(3);
        await expect(nav.nth(0)).toHaveText(d.nav.solutions);
        await expect(nav.nth(1)).toHaveText(d.nav.how);
        await expect(nav.nth(2)).toHaveText(d.nav.sustainability);
        await expect(nav.nth(2)).toHaveAttribute('href', pages.sustainability[lang]);
        await expect(bar.locator('[data-langdrop]')).toBeVisible();
        await expect(bar.locator('.header__end > :visible')).toHaveCount(2);
      } else {
        await bar.locator('.header__burger').click();
        const menu = header.locator('#mobile-menu');
        await expect(menu).toBeVisible();
        const order = await menu.locator('nav > :visible').evaluateAll((els) => els.map((e) => e.className.split(' ')[0]));
        expect(order).toEqual(['mobile-menu__group', 'mobile-menu__how', 'mobile-menu__how', 'lang', 'mobile-menu__actions']);
      }
      const all = await header.innerText();
      for (const no of [d.nav.faqShort, d.nav.report, ...tryLabels]) expect(all).not.toContain(no);
      expect(await header.locator('a[href*="#report"], a[href*="#sustainability"], a[href*="demo.tyll.ai"]').count()).toBe(0);
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
      expect(await page.locator('a[href*="demo.tyll.ai"]').count()).toBe(1);
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
        expect(src).toContain(`/media/film/${lang}/${key}-${width(info) <= 700 ? 'phone' : 'desk'}.mp4`);
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
      expect(poster).toContain(`/media/film/${lang}/finance-${width(info) <= 700 ? 'phone' : 'desk'}.jpg`);
    });
});

// ── 7. The sustainability page ──
for (const lang of locales)
  test.describe(`sustainability ${lang}`, () => {
    const figures = (page: Page) => page.locator('[data-sus] .figure').allInnerTexts();
    test('every chart ends in its final state after scrolling; the right target for the language', async ({ page }) => {
      await page.goto(pages.sustainability[lang]);
      const final = await page.locator('[data-sus] .figure').evaluateAll((els) => els.map((e) => e.getAttribute('data-final')));
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 300) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
      });
      await page.waitForTimeout(1800);
      // the charts a visitor sees: the sticky stage's on desktop, the stacked ones on phones
      const sticky = await page.evaluate(() => document.documentElement.classList.contains('sus-story'));
      const charts = page.locator(sticky ? '[data-sus] .stage__chart' : '[data-sus] .step__chart');
      const n = await charts.count();
      expect(n).toBe(6);
      for (let i = 0; i < n; i++) await expect(charts.nth(i)).toHaveClass(/is-in/);
      expect(await figures(page)).toEqual(final);
      const text = await visibleText(page);
      if (lang === 'ar') {
        expect(text).toContain('50%');
        expect(await page.locator('a[href*="wam.ae"]').count()).toBe(1);
      } else {
        expect(await page.locator('a[href*="food.ec.europa.eu"]').count()).toBe(1);
        expect(await page.locator('[data-sus] .target__cut').first().innerText()).toContain('30');
      }
      for (const a of await page.locator('[data-sus] .source a').all()) {
        await expect(a).toHaveAttribute('target', '_blank');
        await expect(a.locator('.visually-hidden')).toHaveText(dict[lang].cta.newTab);
      }
    });

    test.describe('reduced motion', () => {
      test.use({ reducedMotion: 'reduce' });
      test('shows every chart in its final state at once', async ({ page }) => {
        await page.goto(pages.sustainability[lang]);
        expect(await page.evaluate(() => document.documentElement.classList.contains('sus-motion'))).toBe(false);
        expect(await page.evaluate(() => document.documentElement.classList.contains('sus-story'))).toBe(false);
        await expect(page.locator('.step__chart').first()).toBeVisible();
        const fill = page.locator('.step__chart .bars__fill--air');
        const scale = await fill.evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).a);
        expect(scale).toBeCloseTo(0.2, 2);
        const on = page.locator('.step__chart .squares li.on').first();
        await expect(on).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      });
    });
  });

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

// ── Round 3 (20 Nov 2026) ──

// The six folded pages redirect to the page that took them in, and open the row that holds them
for (const lang of locales)
  test(`old addresses open the right row (${lang})`, async ({ page }, info) => {
    test.skip(!sweep(info), 'runs once per browser');
    for (const x of Object.values(legacy)) {
      await page.goto(x.from[lang]);
      await expect(page).toHaveURL(new RegExp(`${pages[x.to][lang]}#${x.anchor}$`));
      await expect(page.locator(`#${x.anchor} .xrow__head`)).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator(`#${x.anchor} .xrow__panel`)).toBeVisible();
    }
  });

// The rows under "Also in …": one open at a time, and a row's clip loads only when it opens
for (const lang of locales)
  test(`rows open one at a time and load their clip on opening (${lang})`, async ({ page }) => {
    const clips: string[] = [];
    page.on('request', (r) => r.url().includes('/media/film/') && r.url().endsWith('.mp4') && clips.push(r.url()));
    await page.goto(pages.finance[lang]);
    const rows = page.locator('[data-row]');
    await expect(rows).toHaveCount(2);
    await page.waitForTimeout(500);
    expect(clips.filter((u) => /\/(cash|cases)-/.test(u))).toEqual([]);
    await rows.nth(0).locator('.xrow__head').click();
    await expect(rows.nth(0).locator('.xrow__panel')).toBeVisible();
    await expect.poll(() => clips.filter((u) => /\/cash-/.test(u)).length).toBeGreaterThan(0);
    await rows.nth(1).locator('.xrow__head').click();
    await expect(rows.nth(0).locator('.xrow__head')).toHaveAttribute('aria-expanded', 'false');
    await expect(rows.nth(1).locator('.xrow__head')).toHaveAttribute('aria-expanded', 'true');
    const clip = rows.nth(1).locator('video');
    await expect.poll(() => clip.evaluate((v: HTMLVideoElement) => v.readyState), { timeout: 20_000 }).toBeGreaterThanOrEqual(2);
  });

// /solutions/: nine photo cards, three per row on desktop, one open at a time
for (const lang of locales)
  test(`solution cards open and close (${lang})`, async ({ page }, info) => {
    await page.goto(pages.solutions[lang]);
    const btns = page.locator('.tile__btn');
    await expect(btns).toHaveCount(9);
    if (width(info) >= 1280) {
      const tops = await page.locator('.tiles').first().locator('.tile').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top)));
      expect(new Set(tops).size).toBe(1);
    }
    const panel = async (i: number) => page.locator(`#${await btns.nth(i).getAttribute("aria-controls")}`);
    await btns.nth(0).click();
    await expect(btns.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect((await panel(0)).locator('li')).toHaveCount(3);
    await expect((await panel(0)).locator('a')).toBeVisible();
    await btns.nth(1).click();
    await expect(btns.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(btns.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await btns.nth(1).click();
    await expect(btns.nth(1)).toHaveAttribute('aria-expanded', 'false');
    await btns.nth(2).focus();
    await page.keyboard.press('Enter');
    await expect(btns.nth(2)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(btns.nth(2)).toHaveAttribute('aria-expanded', 'false');
    await expect(btns.nth(2)).toBeFocused();
    await expect(page.locator('.tile.is-open')).toHaveCount(0);
  });

// The sticky story: on desktop the chart column stays put, the chart changes per stat, and the wheel still scrolls
for (const lang of locales)
  test(`sustainability story sticks and never blocks the scroll (${lang})`, async ({ page }, info) => {
    test.skip(width(info) < 768, 'phones get the stacked version');
    await page.goto(pages.sustainability[lang]);
    expect(await page.evaluate(() => document.documentElement.classList.contains('sus-story'))).toBe(true);
    const steps = page.locator('[data-story]').first().locator('[data-step]');
    const stage = page.locator('[data-story]').first().locator('.story__stage');
    // the first stat's middle a little past the middle of the screen: the column is stuck, with two stats still to come
    await steps.nth(0).evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY + el.offsetHeight / 2 - innerHeight / 2 + 100));
    await page.waitForTimeout(700);
    const top1 = await stage.evaluate((e) => Math.round(e.getBoundingClientRect().top));
    const active1 = await stage.locator('.stage__chart.is-active').getAttribute('data-i');
    const y1 = await page.evaluate(() => scrollY);
    await page.mouse.move(400, 400);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(900);
    const y2 = await page.evaluate(() => scrollY);
    expect(y2).toBeGreaterThan(y1 + 400);
    const top2 = await stage.evaluate((e) => Math.round(e.getBoundingClientRect().top));
    const active2 = await stage.locator('.stage__chart.is-active').getAttribute('data-i');
    expect(top2).toBe(top1);
    expect(active2).not.toBe(active1);
  });

// The homepage leads with stock and purchasing
for (const lang of locales)
  test(`homepage hero line and step order (${lang})`, async ({ page }) => {
    const d = dict[lang];
    await page.goto(pages.home[lang]);
    await expect(page.locator('.hero__sub')).toHaveText(d.hero.sub);
    if (lang === 'en') expect(d.hero.sub.split(/\s+/).length).toBe(25);
    const labels = await page.locator('[data-hs-go] .hs__l').allInnerTexts();
    expect(labels.slice(0, 3)).toEqual(d.home.parts.cards.map((c) => c.title).length ? [d.home.tour.steps[0].label, d.home.tour.steps[1].label, d.home.tour.steps[2].label] : []);
    expect(d.home.tour.steps[0].label.toLowerCase()).toContain(lang === 'en' ? 'stock' : '');
    const hrefs = await page.locator('.hs__more').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.slice(0, 3)).toEqual([`${pages.solutions[lang]}#stock-waste`, `${pages.solutions[lang]}#purchasing`, `${pages.solutions[lang]}#revenue-reconciliation`]);
  });
