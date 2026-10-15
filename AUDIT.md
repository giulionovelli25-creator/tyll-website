# Step 1 audit — tyll.ai website rebuild

Audited 15 October 2026. Nothing has been built, changed or deployed yet.

## 1. Current live site (https://tyll.ai)

**Technology:** hand-written static HTML, CSS and a few small scripts. No framework, no build step. Hosted on **Vercel** (stated in the privacy policy). Pages are flat files: `index.html`, `de.html`, `ar.html`, `fr.html`, `book.html`, `faq.html`, `security.html`, `reviews.html`, `impressum.html`, `datenschutz.html`.

**Source repository:** not found on this Mac, and no GitHub CLI is installed to check. Not in the demo's GitHub account as far as I can see. **Needs your answer (see section 5).**

### Reusable assets on the live site

| Asset | Where | Notes |
| --- | --- | --- |
| Logo mark + "Tyll" wordmark | inline SVG in the header (`viewBox 0 0 224 81`) | Real vector paths, so no redrawing is needed. Best source for the logo. |
| Favicon | `/favicon.svg` | Logo mark on a rounded square, adapts to dark mode. |
| Hero video | `/bilder/hero-tyll.mp4` | 1920×1080, 6 s loop, 581 KB. Dark reception, brass pendant lights. |
| Hero poster | `/bilder/hero-tyll.jpg` | 2000×1125, 337 KB. |
| Fonts | `/fonts/inter-latin.woff2`, `geist-var-latin.woff2`, `noto-sans-arabic-var.woff2` | Self-hosted. Body and headlines are **Inter**; Geist is loaded but barely used. |
| Logo animation | `/logo-anim.js` (footer) | The checkmark's short stroke wipes up, then the long stroke glides out along its axis. It holds, then retracts, on a 3.6 s loop. Respects reduced motion. **I believe this is the "hand-drawn checkmark" you mean; please confirm.** |
| Preloader | `/preloader.js` | Dark screen; "tyll.ai" fades in letter by letter from a blur. Max 3 s, only for visitors arriving from outside. |
| Smooth scroll | `/vendor/lenis.min.js` | Lenis. Your brief says no scroll hijacking, so I'd drop it. |

Current palette is **warm** (`#1a1814` ink, `#faf9f8` background) with peach and teal accents. The demo uses a **cool** silver/charcoal palette. The brief asks for black / white / silver, so I'd follow the demo's cool palette and drop peach and teal.

### Things on the current site I would NOT carry over
- **Unsourced statistics:** "91% of hotels still rely on manual reporting", "4 in 5 spend one to two full days a week in spreadsheets", "3–8% of gross revenue lost to leakage", "~5% occupational fraud". No sources shown on the page.
- **Security page claims** ("processed in the EU (Ireland)", "read only, never write", "sales data only"). These describe the nightly-close product, not the broader platform. I'd need you to confirm what's true today before saying anything similar.
- **Reviews page:** empty placeholder ("first stories are on their way").
- **Instagram link:** points to `#` (broken).
- **No sitemap.xml or robots.txt** (both 404).
- **No analytics, Meta Pixel or cookie banner** currently.

### Existing integrations and legal data found
- **Calendly:** `book.html` embeds `calendly.com/besher-asfari-code/new-meeting`. This is a personal Calendly account.
- **Impressum / Datenschutz (German only):** the operator is listed as **Richard Morgner** (natural person), Alt-Hartmanndorfer Straße 18, 15528 Spreenhagen, Germany. Contact is **info@closewise.eu**, not info@tyll.ai. The page says company formation is "in preparation".
- **LinkedIn:** `linkedin.com/company/tyll.ai/posts/`.
- **Languages live today:** EN, DE, AR, FR. The new site is EN + DE only, so AR/FR need redirects so their URLs don't break.

## 2. Interactive demo (tyll-platform)

- **GitHub:** `github.com/giulionovelli25-creator/Demo-Tyll`, branch `main`, commit `0a30748`. Fully pushed; only two untracked local files (`.claude/`, `skills-lock.json`).
- **⚠️ The local copy lives in a temporary folder from an earlier Claude chat.** Deleting that chat deletes the folder. The code is safe on GitHub, but the local demo data in `.data/` is not. I have **not** touched it.
- **Stack:** Next.js 16, React 19, Tailwind v4, TypeScript. Needs Node (installed at `~/.local/share/node-lts`, v24, not on the default PATH).
- **Public access:** every page requires sign-in with a demo account plus a management PIN. A visitor clicking "Explore demo" lands on the sign-in page, so deep links per category won't open the feature directly.
- **Hosting:** not deployed anywhere public. The server writes records to JSON files in `.data/`, which won't persist on Vercel's serverless hosting. It needs a server with a disk, or a storage change, before `demo.tyll.ai` can exist. **That's demo-project work, out of scope here.**
- **Brand files in the demo** (`public/brand/`): app icon (PNG/WebP), banner, wave background (`tyll-waves.webp`, only 10 KB), ink lockups (PNG). All raster; no SVG.
- **Demo palette:** ink `#14161a`, graphite `#343840`, steel `#666c75`, fog `#9299a3`, line `#e2e5e9`, mist `#f4f5f7`, cloud `#fafbfc`.

## 3. Brand images you sent in chat

1. A screenshot of the current hero (matches the live site).
2. The silver glass app icon with the black mark (same as the demo's `tyll-icon`).
3. The silver wave banner with the "Tyll.ai" lockup (same as the demo's `tyll-banner`).

These are fine as references. For the site itself I'd use the live site's **vector** logo, plus the highest-resolution wave artwork you have.

## 4. Research PDF

**Not read yet.** macOS blocks access to your Documents folder. Please copy `tyll-ai-stock-sales-bank-strategy.pdf` into the `tyll-website` folder (or drag it into the chat).

## 5. What I need from you before Step 2

**Blocking:**
1. **Research PDF:** copy it into `tyll-website` (see above).
2. **Website source code:** does the live tyll.ai site have a Git repository or Vercel project I can access? If not, I'll rebuild from scratch, reusing the logo, video, poster, fonts and favicon from the live site. Downloading those from tyll.ai needs your OK.
3. **Legal details:** is Richard Morgner / Spreenhagen / info@closewise.eu still the correct operator for the Impressum, or has the company been formed? Should contact be info@tyll.ai everywhere?

**Needed before launch, not before building:**

4. **Calendly:** keep `besher-asfari-code/new-meeting`, or a different event? Is `book.tyll.ai` set up anywhere?
5. **Checkmark animation:** confirm it's the footer logo animation described above.
6. **Instagram URL** (LinkedIn I have).
7. **Analytics:** which provider (e.g. Plausible, Google Analytics 4, Vercel Analytics)? And the Meta Pixel ID, if you want it at launch.
8. **Security wording:** what is true about the current platform (data location, access control, certifications)? Until then I'll keep it to role-based access, which the demo actually implements.
9. **Higher-resolution wave artwork**, if you have it.
10. **Demo public URL:** this stays a configurable placeholder until the demo is deployed.

## 6. Proposed approach for Step 2 (for your decision)

The brief says to keep the existing stack unless there's a compelling reason to change. The new site has 2 languages × 6 page types, a shared header and footer, a cookie banner, consent-gated analytics and Pixel, and environment-based config (Calendly, demo URL, Pixel ID). Hand-maintaining 12+ duplicated HTML files would make translations drift.

**Recommendation: Astro.** It outputs plain static HTML like today, ships almost no JavaScript, has built-in EN/DE routing with `hreflang`, reads settings from environment variables, and deploys to Vercel the same way. It's separate from the demo's Next.js project.

The alternative is plain static HTML, as today. It's simpler tooling but means more duplication.
