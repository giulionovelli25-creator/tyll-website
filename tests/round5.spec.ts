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
test('the icon table: no two features share an icon', async ({}, info) => {
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
    await page.goto(pages.stock[lang]);
    await centred('.sol__chip');
    await centred('.xrow__icon');
    await centred('.others__icon');
    if (width(info) >= 1100) {
      await page.locator('#solutions-trigger').click();
      await centred('.panel__icon');
    }
  });

// ── 3. The sustainability page (rebuilt 26 Nov 2026 to the owner's design canvas) ──
/** Contrast of an element's text against the solid background behind it (its colour's alpha blended in) */
const textContrast = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((el) => {
    const rgba = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
    let bg: number[] = [255, 255, 255];
    for (let n: Element | null = el; n; n = n.parentElement) {
      const [r, g, b, a = 1] = rgba(getComputedStyle(n).backgroundColor);
      if (a > 0.99) {
        bg = [r, g, b];
        break;
      }
    }
    const [r, g, b, a = 1] = rgba(getComputedStyle(el).color);
    const fg = [r, g, b].map((c, i) => c * a + bg[i] * (1 - a));
    const L = ([x, y, z]: number[]) => {
      const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
      return 0.2126 * f(x) + 0.7152 * f(y) + 0.0722 * f(z);
    };
    const [hi, lo] = [L(fg), L(bg)].sort((m, k) => k - m);
    return (hi + 0.05) / (lo + 0.05);
  });

for (const lang of locales)
  test.describe(`sustainability ${lang}`, () => {
    const c = sustainability[lang];
    test('five sections in order, every figure and source in the HTML, the meta description, no dashes', async ({ page, request }) => {
      const html = await (await request.get(pages.sustainability[lang])).text();
      for (const f of c.figures) expect(html, f).toContain(f);
      for (const url of [c.world.source.url, c.back.source.url]) expect(html).toContain(url);
      await page.goto(pages.sustainability[lang]);
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBe(c.metaDescription);
      const order = await page.locator('main > section, body > section, section.hero, section.less, section.world, section.back, section.close').evaluateAll((els) =>
        [...new Set(els)].map((e) => e.className.split(' ')[0]).filter((n) => ['hero', 'less', 'world', 'back', 'close'].includes(n)),
      );
      expect(order).toEqual(['hero', 'less', 'world', 'back', 'close']);
      const text = await page.locator('section.hero, section.less, section.world, section.back, section.close').allInnerTexts();
      expect(text.join('\n')).not.toMatch(/[—–]|\s-\s/);
      // the three solution pages, by their own names, each with its drawing; the chain's four steps
      for (const key of ['waste', 'expiry', 'forecasting'] as const)
        await expect(page.locator(`.cols a[href="${pages[key][lang]}"]`)).toContainText(solutions[key].name[lang]);
      await expect(page.locator('.col__art svg.art')).toHaveCount(3);
      await expect(page.locator('.flow li')).toHaveText(c.less.chain);
      // the bigger picture is three figures, not a paragraph; the hotels' four figures sit on one board
      await expect(page.locator('.fact')).toHaveCount(3);
      await expect(page.locator('.world__sentence')).toHaveCount(0);
      await expect(page.locator('[data-stat]')).toHaveCount(4);
      // no calculator and no year buttons (the owner, 27 Nov 2026)
      await expect(page.locator('input[type="range"], [data-calc], [data-years], section.back button')).toHaveCount(0);
      // the site's own wave, twice, in the brief's light greens: in the hero and behind the close
      await expect(page.locator('section.hero svg.wave[data-wave="move"]')).toHaveCount(1);
      await expect(page.locator('section.close svg.wave[data-wave="move"]')).toHaveCount(1);
      expect(await page.locator('section.hero svg.wave stop').first().getAttribute('stop-color')).toBe('var(--sage-mist)');
      expect(await page.locator('section.close svg.wave stop').first().getAttribute('stop-color')).toBe('var(--sage-light)');
      await expect(page.locator('section.hero svg.tree')).toHaveCount(1);
      // the footer is night on this page only
      expect(await page.locator('.footer').evaluate((e) => getComputedStyle(e).backgroundColor)).toBe('rgb(14, 18, 25)');
    });

    test('the headline holds two lines on tablets and desktops', async ({ page }, info) => {
      test.skip(width(info) < 768, 'phones wrap');
      await page.goto(pages.sustainability[lang]);
      const lines = await page.locator('.hero h1 span').evaluateAll((spans) =>
        spans.map((s) => Math.round(s.getBoundingClientRect().height / (parseFloat(getComputedStyle(s.parentElement!).fontSize) * 1.04))),
      );
      expect(lines).toEqual([1, 1]);
    });

    test('text contrast of at least 4.5:1', async ({ page }) => {
      await page.goto(pages.sustainability[lang]);
      for (const sel of ['.hero .label', '.hero h1', '.hero__text', '.head__text', '.col__link', '.col__text', '.flow__label', '.world .label', '.fact__big', '.fact__unit', '.fact__text', '.world__source', '.stat .label', '.stat__big', '.stat__text', '.split__legend', '.back__source', '.close__text'])
        expect(await textContrast(page, sel), sel).toBeGreaterThanOrEqual(4.5);
    });

    test('without JavaScript: every figure and drawing shows, one under another', async ({ browser }) => {
      const ctx = await browser.newContext({ javaScriptEnabled: false });
      const page = await ctx.newPage();
      await page.goto(pages.sustainability[lang]);
      for (const stat of await page.locator('[data-stat]').all()) await expect(stat).toBeVisible();
      await expect(page.locator('[data-stat]').nth(1).locator('.dot--on')).toHaveCount(14);
      await expect(page.locator('[data-stat]').nth(2).locator('.dot--on')).toHaveCount(19);
      await expect(page.locator('[data-stat]').nth(3).locator('.ratio__bar')).toHaveCount(2);
      await expect(page.locator('.steps')).toBeHidden();
      await expect(page.locator('.fact [data-count]').first()).toHaveText(c.world.facts[0].big);
      await ctx.close();
    });

    test('the board holds still and the four hotel figures take turns as the page scrolls', async ({ page }) => {
      await page.goto(pages.sustainability[lang]);
      test.skip(!(await page.locator('[data-back]').evaluate((e) => e.classList.contains('is-pinned'))), 'stacked on short screens');
      const seen: number[] = [];
      for (const f of [0.05, 0.35, 0.6, 0.92]) {
        await page.locator('.back__track').evaluate((t, f) => {
          const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
          const r = t.getBoundingClientRect();
          scrollTo({ top: r.top + scrollY - header + (r.height - (innerHeight - header)) * f, behavior: 'instant' });
        }, f);
        await page.waitForTimeout(250);
        seen.push(await page.locator('[data-stat]').evaluateAll((els) => els.findIndex((e) => e.classList.contains('is-current'))));
      }
      expect(seen).toEqual([0, 1, 2, 3]);
      await expect(page.locator('[data-stat]').nth(3)).toHaveClass(/is-on/);
      await expect(page.locator('.steps li').nth(3)).toHaveClass(/is-current/);
      // the board stays under the header while it holds
      const top = await page.locator('.back__stage').evaluate((e) => Math.round(e.getBoundingClientRect().top));
      expect(top).toBeGreaterThan(40);
      // the figure ends on its real value after counting up
      await expect(page.locator('[data-stat]').nth(3).locator('[data-count]')).toHaveText(c.back.three.figure);
    });

    test('the bigger picture counts up to its real figures', async ({ page }) => {
      await page.goto(pages.sustainability[lang]);
      await page.locator('.facts').scrollIntoViewIfNeeded();
      for (const [i, f] of c.world.facts.entries()) await expect(page.locator('.fact [data-count]').nth(i)).toHaveText(f.big, { timeout: 4000 });
    });

    test('right to left in Arabic: the words on the right, the tree on the left', async ({ page }, info) => {
      test.skip(lang !== 'ar' || width(info) < 1000, 'Arabic, side by side');
      await page.goto(pages.sustainability[lang]);
      const copy = (await page.locator('.hero__copy').boundingBox())!;
      const tree = (await page.locator('.hero__tree').boundingBox())!;
      expect(copy.x).toBeGreaterThan(tree.x);
    });

    test.describe('reduced motion', () => {
      test.use({ reducedMotion: 'reduce' });
      test('nothing waits to animate and the board does not hold', async ({ page }) => {
        await page.goto(pages.sustainability[lang]);
        await expect(page.locator('[data-sus]')).not.toHaveClass(/is-armed/);
        await expect(page.locator('[data-back]')).not.toHaveClass(/is-pinned/);
        for (const stat of await page.locator('[data-stat]').all()) await expect(stat).toBeVisible();
      });
      test('the waves stand still', async ({ page }) => {
        await page.goto(pages.sustainability[lang]);
        const wave = page.locator('section.close svg.wave path').first();
        await wave.scrollIntoViewIfNeeded();
        const before = await wave.getAttribute('d');
        await page.waitForTimeout(700);
        expect(await wave.getAttribute('d')).toBe(before);
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

// About us (rebuilt 27 Nov 2026 to the owner's brief): seven sections, the team, milestones, places, the investors email
const aboutData = JSON.parse(fs.readFileSync('tests/tmp/content.json', 'utf8'));
const aboutCopy = aboutData.about as Record<Locale, import('../src/content/about').AboutCopy>;
const linkedinOf = aboutData.linkedin as Record<string, string>;
for (const lang of locales)
  test.describe(`About us (${lang})`, () => {
    const c = aboutCopy[lang];
    test('the seven sections, their content and links', async ({ page }) => {
      await page.goto(pages.about[lang]);
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBe(c.metaDescription);
      const order = await page.locator('[data-about] > section').evaluateAll((els) => els.map((e) => e.className.split(' ')[0]));
      expect(order).toEqual(['hero', 'story', 'team', 'miles', 'places', 'ways', 'close']);
      await expect(page.locator('.hero h1')).toHaveText(c.hero.title);
      await expect(page.locator('.hero .actions a').first()).toHaveAttribute('href', pages.book[lang]);
      await expect(page.locator('.hero .actions a').nth(1)).toHaveAttribute('href', '#team');
      await expect(page.locator('.cred')).toHaveCount(3);
      await expect(page.locator('.story__num')).toHaveText(`${c.story.from} ${c.story.to} ${c.story.until}`);
      await expect(page.locator('#team .person')).toHaveCount(4);
      for (const p of c.team.people) await expect(page.locator('#team .person', { hasText: p.name })).toContainText(p.role);
      // only the four founders, each with a photo named for them
      await expect(page.locator('.also')).toHaveCount(0);
      for (const p of c.team.people) await expect(page.locator(`#team .person img[alt="${p.name}"]`)).toHaveCount(1);
      // each photo opens that person's LinkedIn in a new tab
      for (const p of c.team.people) {
        const link = page.locator(`#team .person a[href="${linkedinOf[p.id]}"]`);
        await expect(link).toHaveCount(1);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('aria-label', new RegExp(p.name));
      }
      // the four cities' skyline in the hero, and a photo on every city card, Singapore included
      await expect(page.locator('.hero__skyline svg.skyline')).toHaveCount(1);
      // it stands on the credentials' rule and no building touches the words
      const sky = await page.evaluate(() => {
        const words = [...document.querySelectorAll('.hero h1, .hero__text, .hero .actions a, .creds .cred')].map((e) => e.getBoundingClientRect());
        let hits = 0;
        for (const p of document.querySelectorAll('.hero__skyline .b')) {
          const b = p.getBoundingClientRect();
          for (const t of words) if (b.left < t.right && b.right > t.left && b.top < t.bottom && b.bottom > t.top) hits++;
        }
        const feet = document.querySelector('.hero__skyline')!.getBoundingClientRect().bottom;
        return { hits, gap: Math.abs(feet - document.querySelector('.creds')!.getBoundingClientRect().top) };
      });
      expect(sky.hits).toBe(0);
      expect(sky.gap).toBeLessThanOrEqual(1.5);
      await expect(page.locator('.city img')).toHaveCount(4);
      // no one is called an EHL graduate or alumnus
      expect((await page.locator('[data-about]').innerText()).toLowerCase()).not.toMatch(/ehl alumn|alumni ehl|absolvent(en)? der ehl|خريج(و)? ehl/);
      await expect(page.locator('.step')).toHaveCount(4);
      await expect(page.locator('.step .diamond:not(.diamond--open)')).toHaveCount(3);
      await expect(page.locator('.city')).toHaveCount(4);
      for (const img of await page.locator('.city img').all()) expect((await img.getAttribute('alt'))!.length).toBeGreaterThan(10);
      await expect(page.locator('.way')).toHaveCount(4);
      await expect(page.locator('.ways .more')).toHaveAttribute('href', pages.security[lang]);
      await expect(page.locator('.close__investors a')).toHaveAttribute('href', `mailto:info@tyll.ai?subject=${encodeURIComponent(dict[lang].home.investors.subject)}`);
      // no "live in hotels", no food waste figures, no dashes
      const text = (await page.locator('[data-about]').innerText()).toLowerCase();
      expect(text).not.toMatch(/live in hotels|%|tonnes|tonnen|tonnellate|طن/);
      expect(text).not.toMatch(/[—–]|\s-\s/);
      // every link and button at least 44 px tall
      const short = await page.locator('[data-about] a, [data-about] button').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height < 44).map((e) => e.textContent));
      expect(short).toEqual([]);
    });

    test('without JavaScript everything shows', async ({ browser }) => {
      const ctx = await browser.newContext({ javaScriptEnabled: false });
      const page = await ctx.newPage();
      await page.goto(pages.about[lang]);
      const hidden = await page.locator('.reveal').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
      expect(hidden).toBe(0);
      await ctx.close();
    });

    test('the milestones follow the scroll: steps light up in order and the line fills', async ({ page }) => {
      await page.goto(pages.about[lang]);
      const miles = page.locator('[data-miles]');
      await expect(miles).toHaveClass(/is-live/);
      const states = () => page.locator('[data-step]').evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.state));
      const fill = () => page.locator('.track').evaluate((e) => parseFloat(getComputedStyle(e).getPropertyValue('--fill')) || 0);
      // the start of the band, then its end
      await miles.evaluate((e) => scrollTo({ top: e.getBoundingClientRect().top + scrollY - innerHeight * 0.3, behavior: 'instant' }));
      await page.waitForTimeout(400);
      const early = await states();
      const fillEarly = await fill();
      await miles.evaluate((e) => scrollTo({ top: e.getBoundingClientRect().bottom + scrollY - innerHeight * 0.75, behavior: 'instant' }));
      await page.waitForTimeout(400);
      const late = await states();
      expect(early.filter((s) => s === 'future').length).toBeGreaterThan(late.filter((s) => s === 'future').length);
      expect(late[3]).toBe('current');
      expect(await fill()).toBeGreaterThan(fillEarly);
    });

    test('parts rise in once as they come into view', async ({ page }) => {
      await page.goto(pages.about[lang]);
      await expect(page.locator('[data-about]')).toHaveClass(/is-armed/);
      const card = page.locator('.way').last();
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveClass(/is-in/);
      await expect.poll(() => card.evaluate((e) => getComputedStyle(e).opacity)).toBe('1');
    });

    test.describe('reduced motion', () => {
      test.use({ reducedMotion: 'reduce' });
      test('nothing moves', async ({ page }) => {
        await page.goto(pages.about[lang]);
        expect(await page.locator('.hero h1').evaluate((e) => getComputedStyle(e).animationName)).toBe('none');
        await expect(page.locator('[data-about]')).not.toHaveClass(/is-armed/);
        await expect(page.locator('[data-miles]')).not.toHaveClass(/is-live/);
      });
    });

    test('right to left in Arabic: the story figure sits on the left', async ({ page }, info) => {
      test.skip(lang !== 'ar' || width(info) < 1000, 'Arabic, side by side');
      await page.goto(pages.about[lang]);
      const copy = (await page.locator('.story__copy').boundingBox())!;
      const fig = (await page.locator('.story__figure').boundingBox())!;
      expect(copy.x).toBeGreaterThan(fig.x);
    });
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
