# Launch guide

Nothing in this guide has been done yet. **Do not deploy to tyll.ai, change DNS or move domains without the owner's explicit approval.**

Run `npm run launch-check` at any time to list what is still missing.

## Where things stand (15 Oct 2026)

| Destination | Today | Needed |
| --- | --- | --- |
| **tyll.ai** | Old static site, served by Vercel (DNS `A 216.198.79.1`). **www** is a Vercel CNAME. | Deploy this project to Vercel, then move the domains to it (step 3). |
| **book.tyll.ai** | No DNS record. Does not resolve. | Add it to the new Vercel project (step 4). |
| **demo.tyll.ai** | No DNS record. The demo runs only on a laptop. | Separate work in the demo project; see [docs/demo-public-readiness.md](docs/demo-public-readiness.md). |

## 1. Settings (Vercel → Project → Settings → Environment Variables)

All of these are **public** values that end up in the page. They are not secrets. This site needs no secret keys at all; never put passwords or private tokens in `.env` or in Vercel variables for this project.

| Variable | What to put | If empty |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | `https://tyll.ai` | defaults to `https://tyll.ai` |
| `PUBLIC_DEMO_URL` | `https://demo.tyll.ai` once the demo is live | every "Explore demo" and "Try … in the Demo" button is hidden |
| `PUBLIC_CALENDLY_URL` | `https://calendly.com/besher-asfari-code/new-meeting` (approved by the owner, 15 Oct 2026) | booking page offers email instead |
| `PUBLIC_LINKEDIN_URL` | `https://www.linkedin.com/company/tyll.ai/` (taken from the current site) | left out of footer |
| `PUBLIC_INSTAGRAM_URL` | official Instagram profile | left out of footer |
| `PUBLIC_ANALYTICS_PROVIDER` | `ga4` or `plausible` | no statistics, no consent banner for them |
| `PUBLIC_ANALYTICS_ID` | GA4 measurement ID (`G-…`) or the Plausible site domain | — |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel ID (digits) | no Pixel, no marketing consent option |

The privacy policy and cookie banner adjust themselves to these settings. Set them for **Production** and redeploy.

Search engines may index **only** the production deployment (`VERCEL_ENV=production`). Every preview and local build is `noindex` with `Disallow: /` in robots.txt, so previews never compete with the real site.

Each solution page's demo button opens a specific area of the demo. The paths are kept in `src/config/demo.ts` (for example Stock & Waste → `/stock?tab=where`). They are real demo routes, and the demo keeps them through sign-in.

## 2. Create the Vercel project

1. Put this folder in a Git repository Tyll controls, e.g. a **private** GitHub repo `tyll-website`. There is no remote yet.
2. In Vercel: **Add New → Project**, import the repo. Framework preset **Astro**, build command `npm run build`, output `dist`, Node 20 or later.
3. Add the variables from step 1.
4. Deploy. You get a preview URL like `tyll-website-xyz.vercel.app`. Review it there first; it is `noindex`.

## 3. Move tyll.ai to the new site (needs approval)

The old site is a Vercel project too. Who owns that Vercel account is not known from here.

- **Same Vercel team:** Project → Settings → Domains on the new project → add `tyll.ai` and `www.tyll.ai`. Vercel asks to move them from the old project. No DNS change is needed.
- **Different Vercel account:** the domain must be removed from the old project first, then added here. Vercel may ask for a TXT record to prove ownership.
- Choose `tyll.ai` as primary and redirect `www` to it, as today.
- Old URLs (`/de.html`, `/book.html`, `/impressum.html` …) are already redirected in `vercel.json`. `/ar.html` and `/fr.html` go to the English homepage, because the new site is EN/DE only.
- **Rollback:** keep the old project. Moving the domains back restores the old site within minutes.

## 4. book.tyll.ai

Calendly does not support custom domains for booking pages. So `book.tyll.ai` points to **this site's own booking page**, which embeds Calendly behind a privacy click and keeps the Tyll design.

1. New Vercel project → Settings → Domains → add `book.tyll.ai`.
2. At the DNS provider for tyll.ai, add the record Vercel shows, normally `CNAME book → cname.vercel-dns.com`.
3. `vercel.json` already redirects every `book.tyll.ai` request to `https://tyll.ai/en/book-a-call/`.

## 5. Calendly

1. Approved event: `https://calendly.com/besher-asfari-code/new-meeting` ("15 min talk with Tyll", host shown as "Tyll Admin"). It is set in the local `.env`. Set the same value in Vercel.
2. In the event's **Booking questions** (Name and Email are built in), add:
   - **Hotel or company** (required)
   - **Job title** (optional)
   - **What would you like to improve?** (optional)
3. Make sure Calendly sends its confirmation and calendar invitation emails (the default).
4. Calendly's own wording follows the visitor's browser language, or the event's language setting. If German visitors should always see German, check the event's language options in Calendly.
5. Test with a real booking you then cancel. Not done yet: no test booking has been made.

The website shows "Your call is booked" only when Calendly reports the event as scheduled, and counts `booking_confirmed` only then.

## 6. Analytics (optional)

- **GA4:** create a property in **Tyll's own** Google account. Copy the measurement ID (`G-…`). Set `PUBLIC_ANALYTICS_PROVIDER=ga4` and `PUBLIC_ANALYTICS_ID`.
- **Plausible** (EU-hosted, cookieless, paid): add the site `tyll.ai`. Set `PUBLIC_ANALYTICS_PROVIDER=plausible` and `PUBLIC_ANALYTICS_ID=tyll.ai`.

Events sent (with only a location label and the page language): `book_call_click`, `explore_demo_click`, `explore_solutions_click`, `connect_story_played`, `booking_calendar_opened`, `booking_started`, `booking_confirmed`, `language_changed`, `video_play`, `video_pause`, `faq_opened`, `email_click`, `linkedin_click`. In GA4, mark `booking_confirmed` as a key event.

## 7. Meta Pixel (optional)

Create the Pixel in Tyll's Meta Business account and set `PUBLIC_META_PIXEL_ID`. It loads only after marketing consent. It sends one `PageView` per page and a `Schedule` event only for a confirmed Calendly booking.

## 8. Legal

1. Fill in `src/config/legal.ts`:
   - operator
   - address
   - representative
   - register
   - VAT ID
   - person responsible for content
   - hosting confirmation
   - retention period
2. Have the Legal Notice and Privacy pages reviewed by a qualified lawyer. Both are drafts.
3. Once nothing is missing, the warning boxes disappear, and both pages become indexable and appear in the sitemap automatically.
4. Confirm that `info@tyll.ai` receives mail. Everything points to it.

## Launch checklist

- [ ] Legal details supplied in `src/config/legal.ts`, and pages reviewed by a lawyer
- [ ] `info@tyll.ai` confirmed working
- [x] Calendly event approved (`besher-asfari-code/new-meeting`)
- [ ] Calendly booking questions added, `PUBLIC_CALENDLY_URL` set in Vercel, test booking made and cancelled
- [ ] Public demo deployed at `demo.tyll.ai` and `PUBLIC_DEMO_URL` set, or a decision to launch without demo buttons
- [ ] Instagram URL supplied, or a decision to launch without it
- [ ] Analytics provider and ID chosen (optional)
- [ ] Meta Pixel ID (optional)
- [ ] Research PDF checked against the two quoted statistics
- [ ] Vercel project created, preview URL reviewed on desktop and phone
- [ ] `npm run launch-check` shows nothing required
- [ ] **Owner approval** to move `tyll.ai` / `www.tyll.ai` to the new project and to add `book.tyll.ai`
