# Implementation plan

Decisions so far (15 Oct 2026): Astro, rebuilt from scratch, reusing assets downloaded from tyll.ai. The footer logo animation is the checkmark motion to reuse. Legal operator: decide later, so the legal pages ship with marked gaps and are blocked from going live until filled. Contact: info@tyll.ai everywhere.

## Stack

- **Astro**, static output. Almost no client JavaScript: small inline scripts for the header, video, checkmarks, consent and menu.
- **Plain CSS** with design tokens as custom properties. No CSS framework.
- **Hosting:** Vercel, same as today. Nothing is deployed without approval.
- **Settings** come from environment variables (`.env.example` lists them). Anything unset hides or disables its feature instead of producing a broken link.

| Variable | Used for |
| --- | --- |
| `PUBLIC_SITE_URL` | canonical URLs, sitemap, Open Graph |
| `PUBLIC_DEMO_URL` | every "Explore demo" button |
| `PUBLIC_CALENDLY_URL` | Book a Call embed |
| `PUBLIC_LINKEDIN_URL`, `PUBLIC_INSTAGRAM_URL` | footer |
| `PUBLIC_ANALYTICS_PROVIDER` + id | analytics, consent-gated |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel, marketing consent only |

## Routes

| English | German |
| --- | --- |
| `/en/` | `/de/` |
| `/en/book-a-call/` | `/de/gespraech-buchen/` |
| `/en/faq/` | `/de/faq/` |
| `/en/legal-notice/` | `/de/impressum/` |
| `/en/privacy/` | `/de/datenschutz/` |

- `/` goes to `/en/`.
- The language switch maps each page to its counterpart.
- The old URLs redirect permanently: `index.html`, `de.html`, `ar.html`, `fr.html`, `book.html`, `faq.html`, `security.html`, `reviews.html`, `impressum.html` and `datenschutz.html`.

## Build order (matches the brief)

1. **Foundation:** tokens, fonts, logo, header, footer, layout, SEO head, i18n, config. *Stop for review.*
2. **Homepage:** the five sections in order: Hero, Problem, How It Works, What Tyll Can Do, Final CTA.
3. **Pages:** Book a Call, FAQ, Legal Notice, Privacy.
4. **German:** full translation of everything.
5. **Integrations:** Calendly, demo URL, mailto, social links, cookie consent, analytics, Pixel.
6. **Animations:** logo checkmark, step checkmarks, reveals, video fade.
7. **Testing:** the 18 tests from Part 14, at desktop, tablet and phone widths.
8. **Review:** preview plus the final report. No deploy.

## Waiting on you

- **Research PDF.** Copy it into this folder. It's needed for the Problem section's evidence.
- **Calendly event, Instagram URL, analytics provider and Pixel ID.** Needed for launch, not to build.
- **Legal operator details.** These block publishing, not building.
- **Real demo screenshots/recording for How It Works.** I can capture these from the demo myself, read-only, if you agree.
