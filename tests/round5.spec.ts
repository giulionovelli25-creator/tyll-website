// Round 5 (25 Nov 2026, the owner's brief): the checks of its Part 7, run in Chromium and WebKit at 390 × 844,
// 768 × 1024, 1280 × 720, 1440 × 900 and 1920 × 1080, in all four languages. Strings come from the language files and
// content, never retyped. Sending forms is always intercepted: no test ever reaches Formspree.
import fs from 'node:fs';
import sharp from 'sharp';
import { test, expect, type Page } from '@playwright/test';
import { pages, locales, solutionKeys, type Locale, type PageKey } from '../src/i18n/routes';
import { dict } from '../src/i18n';
import type { Solution } from '../src/content/solutions';
import type { SustainabilityCopy } from '../src/content/sustainability';

const content = JSON.parse(fs.readFileSync('tests/tmp/content.json', 'utf8')) as {
  solutions: Record<(typeof solutionKeys)[number], Solution>;
  sections: { id: string; keys: (typeof solutionKeys)[number][] }[];
  moreKeys: (typeof solutionKeys)[number][];
  sustainability: Record<Locale, SustainabilityCopy>;
  demoRoutes: Record<string, string>;
  icons: Record<string, string>;
};
const { solutions, sustainability, demoRoutes } = content;
type Info = Parameters<Parameters<typeof test>[1]>[1];
const width = (info: Info) => (info.project.metadata.width as number) ?? 1280;
const height = (info: Info) => (info.project.metadata.height as number) ?? 900;
const once = (info: Info) => width(info) === 1440;
const DEMO = 'https://demo.tyll.ai';
const FORM = /formspree\.io/;
const allPages = Object.keys(pages) as PageKey[];

/** Relative luminance of an sRGB colour, 0 to 1 */
const lum = (r: number, g: number, b: number) => {
  const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

/** The contrast of white text against what is behind an element: the text is hidden, the area photographed, and
 *  every pixel measured. Returns the contrast at the 5th percentile (the brightest 5% of the background left out). */
const contrastBehind = async (page: Page, selector: string) => {
  const el = page.locator(selector);
  await el.evaluate((e) => {
    (e as HTMLElement).style.color = 'transparent';
    (e as HTMLElement).style.textShadow = 'none';
  });
  const box = (await el.boundingBox())!;
  const shot = await page.screenshot({ clip: box });
  await el.evaluate((e) => {
    (e as HTMLElement).style.color = '';
    (e as HTMLElement).style.textShadow = '';
  });
  const { data, info } = await sharp(shot).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const cs: number[] = [];
  for (let i = 0; i < data.length; i += info.channels) cs.push(1.05 / (lum(data[i], data[i + 1], data[i + 2]) + 0.05));
  cs.sort((a, b) => a - b);
  return cs[Math.floor(cs.length * 0.05)];
};

// ── 1. "More in …" and the footer share one left edge; the social marks sit in the middle of their circles ──
for (const lang of locales)
  test(`More-in block and footer share one edge; social icons centred (${lang})`, async ({ page }, info) => {
    await page.goto(pages.finance[lang]);
    const rtl = lang === 'ar';
    const edge = (sel: string) => page.locator(sel).first().evaluate((e, r) => (r ? e.getBoundingClientRect().right : e.getBoundingClientRect().left), rtl);
    const footer = await edge('.footer__brand');
    for (const sel of ['.others__head', '.others li:first-child a', ...(width(info) <= 760 ? ['.others__all'] : [])]) {
      expect(Math.abs((await edge(sel)) - footer), `${sel} at ${width(info)}`).toBeLessThanOrEqual(1);
    }
    // on phones one link per row, See all solutions last
    if (width(info) <= 760) {
      const lefts = await page.locator('.others li a').evaluateAll((as, r) => as.map((a) => Math.round(r ? a.getBoundingClientRect().right : a.getBoundingClientRect().left)), rtl);
      expect(new Set(lefts).size).toBe(1);
    }
    await expect(page.locator('.others li a .others__icon svg')).toHaveCount(2);
    for (const a of await page.locator('.footer__follow a').all()) {
      const off = await a.evaluate((link) => {
        const c = link.getBoundingClientRect();
        const i = link.querySelector('svg')!.getBoundingClientRect();
        return [i.left + i.width / 2 - (c.left + c.width / 2), i.top + i.height / 2 - (c.top + c.height / 2), i.width, i.height];
      });
      expect(Math.abs(off[0]), 'horizontal').toBeLessThanOrEqual(1);
      expect(Math.abs(off[1]), 'vertical').toBeLessThanOrEqual(1);
      expect(off[2]).toBe(18);
      expect(off[3]).toBe(18);
    }
  });

// ── 2. One icon per meaning, from one set; each icon centred in its tinted square, in Arabic too ──
test('the icon table: no two features share an icon, and the Scan strip uses its rows’ icons', async ({}, info) => {
  test.skip(!once(info), 'content check, once per browser');
  const used = new Map<string, string[]>();
  const add = (icon: string, what: string) => used.set(icon, [...(used.get(icon) ?? []), what]);
  for (const k of solutionKeys) {
    add(solutions[k].icon, k);
    for (const r of solutions[k].rows ?? []) add(r.icon, `${k}#${r.id}`);
  }
  // the one shared icon is one feature shown on two pages: delivery reliability
  for (const [icon, what] of used) {
    if (what.length > 1) expect(what.map((w) => w.split('#')[1]).every((id) => id === 'reliability'), `${icon}: ${what.join(', ')}`).toBe(true);
  }
  for (const icon of used.keys()) expect(content.icons[icon], icon).toBeTruthy();
  const strip = fs.readFileSync('src/components/home/ScanStrip.astro', 'utf8');
  for (const [icon, row] of [['clipboard-list', 'requisitions'], ['truck', null], ['bottle-wine', 'empties'], ['chef-hat', 'recipes'], ['scroll-text', 'menu-photo']] as const) {
    expect(strip).toContain(`icon: '${icon}'`);
    if (row) expect(used.get(icon)?.some((w) => w.endsWith(`#${row}`)), `${icon} = ${row}`).toBe(true);
    else expect(used.get(icon)).toEqual(['deliveries']);
  }
});

for (const lang of locales)
  test(`icons sit centred in their squares (${lang})`, async ({ page }, info) => {
    test.skip(width(info) < 1100 && width(info) !== 390, 'desktop and phone');
    const centred = async (sel: string) => {
      for (const box of await page.locator(sel).all()) {
        if (!(await box.isVisible())) continue;
        const off = await box.evaluate((b) => {
          const c = b.getBoundingClientRect();
          const i = b.querySelector('svg')!.getBoundingClientRect();
          return Math.max(Math.abs(i.left + i.width / 2 - (c.left + c.width / 2)), Math.abs(i.top + i.height / 2 - (c.top + c.height / 2)));
        });
        expect(off, sel).toBeLessThanOrEqual(1);
      }
    };
    await page.goto(pages.home[lang]);
    await centred('.scan__icon');
    await page.goto(pages.stock[lang]);
    await centred('.sol__chip');
    await centred('.xrow__icon');
    await centred('.others__icon');
    if (width(info) >= 1100) {
      await page.locator('#solutions-trigger').click();
      await centred('.panel__icon');
    }
  });

// ── 3. The sustainability page ──
for (const lang of locales)
  test.describe(`sustainability ${lang}`, () => {
    test('hero fills the screen, headline readable after 1 s, real numbers in the HTML', async ({ page, request }, info) => {
      await page.goto(pages.sustainability[lang]);
      const hero = await page.locator('section.hero').boundingBox();
      expect(hero!.height).toBeGreaterThanOrEqual(height(info) - 1);
      const fit = await page.locator('section.hero img').evaluate((i) => getComputedStyle(i).objectFit);
      expect(fit).toBe('cover');
      await page.waitForTimeout(1000);
      expect(await page.locator('.hero h1').evaluate((e) => getComputedStyle(e).opacity)).toBe('1');
      expect(await contrastBehind(page, '.hero h1'), 'headline').toBeGreaterThanOrEqual(3);
      expect(await contrastBehind(page, '.hero__text'), 'line').toBeGreaterThanOrEqual(4.5);
      const html = await (await request.get(pages.sustainability[lang])).text();
      for (const fig of sustainability[lang].sentence.text.match(/\{([^}]+)\}/g)!.map((f) => f.slice(1, -1))) expect(html).toContain(fig);
      expect(html).not.toMatch(/>0(?:[.,]00)?\s?(?:%|bn|Mrd|mld)/);
    });

    test('without JavaScript the final numbers show', async ({ browser }) => {
      const ctx = await browser.newContext({ javaScriptEnabled: false });
      const page = await ctx.newPage();
      await page.goto(pages.sustainability[lang]);
      const text = await page.locator('.line__text').innerText();
      for (const fig of sustainability[lang].sentence.text.match(/\{([^}]+)\}/g)!.map((f) => f.slice(1, -1))) expect(text).toContain(fig);
      expect(text).not.toMatch(/\b0(?:[.,]00)?\s?%/);
      await ctx.close();
    });

    test('the calculator updates live, works by keyboard and uses the right currency', async ({ page }) => {
      const c = sustainability[lang].calc;
      await page.goto(pages.sustainability[lang]);
      const out = (k: string) => page.locator(`[data-out="${k}"]`);
      const before = await out('bought').innerText();
      expect(before).toContain(lang === 'ar' ? 'AED' : '€');
      await page.locator('#calc-covers').fill('600');
      await expect.poll(() => out('bought').innerText()).not.toBe(before);
      const num = (s: string) => Number(s.replace(/[^\d]/g, ''));
      await expect.poll(async () => num(await out('bought').innerText())).toBe(Math.round((600 * c.cost.value * 365) / 1000) * 1000);
      await expect.poll(async () => num(await out('wasted').innerText())).toBe(Math.round((600 * c.cost.value * 365 * 0.18) / 1000) * 1000);
      await expect.poll(async () => num(await out('kept').innerText())).toBe(Math.round((600 * c.cost.value * 365 * 0.18 * 0.21) / 1000) * 1000);
      // the slider follows, and moves by keyboard
      await expect(page.locator('#calc-covers-range')).toHaveValue('600');
      await expect(page.locator('#calc-days, #calc-days-range')).toHaveCount(0);
      const days = page.locator('#calc-cost-range');
      await days.focus();
      const was = await out('bought').innerText();
      await page.keyboard.press(lang === 'ar' ? 'ArrowRight' : 'ArrowLeft');
      await expect.poll(() => out('bought').innerText()).not.toBe(was);
      await expect(page.locator('.calc__out')).toHaveAttribute('aria-live', 'polite');
      await expect(page.locator('label[for="calc-covers"]')).toHaveText(c.covers);
      await expect(page.locator('#calc-covers-help')).toHaveText(c.coverHelp);
      // changing a number never moves the words around it
      const labels = () => page.locator('.calc__out dt').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().left) + ':' + Math.round(e.getBoundingClientRect().width)));
      const before2 = await labels();
      await page.locator('#calc-covers').fill('2000');
      await page.waitForTimeout(500);
      expect(await labels()).toEqual(before2);
      // no source links in the calculator, one link out of it, and never "UK"
      await expect(page.locator('#calculator a[href^="http"]')).toHaveCount(0);
      await expect(page.locator('#calculator a')).toHaveCount(1);
      expect(await page.locator('#calculator').innerText()).not.toMatch(/\bUK\b|Großbritannien|Regno Unito|المملكة المتحدة/);
    });

    test('what hotels got back: industry figures, said at the top, no timeline; the page is short', async ({ page }, info) => {
      const c = sustainability[lang].back;
      await page.goto(pages.sustainability[lang]);
      const back = page.locator('.back');
      await expect(back.locator('h2')).toHaveText(c.title);
      await expect(back.locator('.back__sub')).toHaveText(c.sub);
      // the disclaimer sits under the heading, before any figure, at body size
      const subTop = await back.locator('.back__sub').evaluate((e) => e.getBoundingClientRect().top);
      const figTop = await back.locator('.back__figure').first().evaluate((e) => e.getBoundingClientRect().top);
      expect(subTop).toBeLessThan(figTop);
      expect(await back.locator('.back__sub').evaluate((e) => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16);
      await expect(back.locator('.back__lead .back__figure')).toHaveText(c.lead.figure);
      await expect(back.locator('.back__list li')).toHaveCount(3);
      await expect(back.locator('.back__label')).toHaveText(c.returnsLabel);
      await expect(back.locator('.back__source a')).toHaveAttribute('href', c.source.url);
      expect(await page.locator('.timeline, .timeline__step, .timeline__dot').count()).toBe(0);
      // no Tyll claims in this section
      expect(await back.innerText()).not.toMatch(/with Tyll|mit Tyll|con Tyll|مع Tyll/);
      if (width(info) >= 1440) {
        const screens = await page.evaluate(() => document.documentElement.scrollHeight / innerHeight);
        info.annotations.push({ type: 'screens', description: `${lang} sustainability ${screens.toFixed(2)} screens at ${width(info)} × ${height(info)}` });
        expect(screens).toBeLessThanOrEqual(6.6);
      }
      expect(await page.locator('.city, .place, [data-wall]').count()).toBe(0);
    });

    test.describe('reduced motion', () => {
      test.use({ reducedMotion: 'reduce' });
      test('nothing moves: figures final, no hero animation, clips stay posters', async ({ page }) => {
        await page.goto(pages.sustainability[lang]);
        expect(await page.locator('.hero__inner').evaluate((e) => getComputedStyle(e).animationName)).toBe('none');
        await page.locator('.line').scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        const shown = await page.locator('.line [data-count]').allInnerTexts();
        const want = sustainability[lang].sentence.text.match(/\{([^}]+)\}/g)!.map((f) => f.slice(1, -1));
        expect(shown).toEqual(want);
        await page.locator('.act').scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        for (const v of await page.locator('[data-clip]').all()) expect(await v.evaluate((x: HTMLVideoElement) => x.paused && !x.src)).toBe(true);
      });
    });
  });

// ── 4. The homepage: back to its round 4 version at the owner's request (25 Nov 2026); see tests/site.spec.ts ──

// ── 6. Every "Try this in the demo →" opens the right story, in this language, in a new tab ──
for (const lang of locales)
  test(`Try this in the demo links (${lang})`, async ({ page }, info) => {
    test.skip(!once(info), 'link check, once per browser');
    for (const [key, route] of Object.entries(demoRoutes)) {
      await page.goto(pages[key as PageKey][lang]);
      const a = page.locator('a', { hasText: dict[lang].solutionPage.tryHere.replace(/\s*[→←]$/, '') });
      await expect(a, key).toHaveCount(1);
      const want = new URL(route!, DEMO);
      want.searchParams.set('lang', lang);
      await expect(a).toHaveAttribute('href', want.href);
      await expect(a).toHaveAttribute('target', '_blank');
    }
  });

// ── 7. Investor enquiries: a small footer link that opens an email, not a section (25 Nov 2026, the owner) ──
for (const lang of locales)
  test(`investor enquiries are a footer email link (${lang})`, async ({ page }) => {
    const subject = encodeURIComponent(dict[lang].home.investors.subject);
    await page.goto(pages.groups[lang]);
    const link = page.locator('.footer a', { hasText: dict[lang].footer.investors });
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('href', `mailto:info@tyll.ai?subject=${subject}`);
    await page.goto(pages.home[lang]);
    await expect(page.locator('#investors, [data-inv]')).toHaveCount(0);
    // How it works points to the story on About us instead of repeating it
    await page.goto(pages.how[lang]);
    await expect(page.locator('.origin a')).toHaveAttribute('href', pages.about[lang]);
  });

// About us: the story draws, the cities keep their sources, the investors line leads home
for (const lang of locales)
  test(`About us (${lang})`, async ({ page }) => {
    await page.goto(pages.about[lang]);
    await expect(page.locator('.story__step')).toHaveCount(4);
    await expect(page.locator('.city')).toHaveCount(3);
    for (const a of await page.locator('.city__source a').all()) await expect(a).toHaveAttribute('target', '_blank');
    await expect(page.locator(`.investors a`)).toHaveAttribute('href', `mailto:info@tyll.ai?subject=${encodeURIComponent(dict[lang].home.investors.subject)}`);
    await expect(page.locator('.ways__more')).toHaveAttribute('href', pages.security[lang]);
    await page.locator('.story__line').evaluate((e) => scrollTo({ top: e.getBoundingClientRect().top + scrollY - innerHeight * 0.3, behavior: 'instant' }));
    await expect.poll(() => page.locator('[data-story]').evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue('--p')))).toBeGreaterThan(0.5);
  });

// Security: the seven details, every system's logo, the filter by kind
for (const lang of locales)
  test(`Security (${lang})`, async ({ page }) => {
    await page.goto(pages.security[lang]);
    await expect(page.locator('.pillar')).toHaveCount(7);
    const all = await page.locator('.logos__item').count();
    expect(all).toBeGreaterThan(15);
    await page.locator('[data-kind="pms"]').click();
    await expect(page.locator('[data-kind="pms"]')).toHaveAttribute('aria-pressed', 'true');
    const pms = await page.locator('.logos__item:visible').count();
    expect(pms).toBeGreaterThan(0);
    expect(pms).toBeLessThan(all);
    await page.locator('[data-kind="all"]').click();
    await expect(page.locator('.logos__item:visible')).toHaveCount(all);
    // every logo fits its tile
    const over = await page.locator('.logos__item').evaluateAll((lis) =>
      lis.filter((e) => [...e.children].some((c) => c.getBoundingClientRect().width > e.getBoundingClientRect().width + 0.5)).map((e) => e.textContent),
    );
    expect(over).toEqual([]);
  });


// ── 8. Every page has its own title and a description of 140 to 160 characters ──
test('titles are unique and descriptions are 140 to 160 characters', async ({ request }, info) => {
  test.skip(!once(info), 'whole-site sweep, once per browser');
  const titles = new Map<string, string>();
  for (const key of allPages)
    for (const lang of locales) {
      const url = pages[key][lang];
      const html = await (await request.get(url)).text();
      if (/http-equiv="refresh"/.test(html)) continue;
      const title = html.match(/<title>([^<]*)<\/title>/)![1];
      const desc = html.match(/<meta name="description" content="([^"]*)"/)![1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      expect(titles.has(title), `${url} repeats the title of ${titles.get(title)}`).toBe(false);
      titles.set(title, url);
      expect(desc.length, `${url}: ${desc}`).toBeGreaterThanOrEqual(140);
      expect(desc.length, `${url}: ${desc}`).toBeLessThanOrEqual(160);
    }
});
