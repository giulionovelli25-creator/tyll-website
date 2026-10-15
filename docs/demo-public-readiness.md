# Public demo readiness (for the separate demo project)

Written from the website project after reading the demo's code without changing it: `~/tyll-demo`, commit `0a30748`, github.com/giulionovelli25-creator/Demo-Tyll. **All changes listed here belong in the demo project, not in this website.**

## Verdict: not ready for public access yet

The demo runs only on a laptop (`localhost:3210`). `demo.tyll.ai` has no DNS record. Until the points below are handled, the website hides every "Explore demo" button in production builds. `PUBLIC_DEMO_URL` is unset, and localhost addresses are ignored.

## What is already in good shape

- All hotels, people and figures are fictional (Grand Resort Dubai / Doha). There is no real customer data.
- Real server-side sign-in: salted scrypt hashes, httpOnly session cookies (Secure in production), idle and absolute timeouts.
- A management PIN, and role-filtered data on the server.
- No email is sent unless a provider is configured. Emails appear as previews in Settings.
- Deep links survive sign-in (`/login?next=…`), so the website can link to `/stock`, `/forecast` and `/rooms` directly.

## What must change before it is public

1. **Hosting with persistent storage.**
   - Records are written to JSON files in `.data/` (`auth.json`, `purchasing.json`).
   - Serverless hosting such as Vercel does not keep these files.
   - Either run it as one Node server with a disk (for example a small VM, Fly.io or Railway with a volume), or move the stores to a database.
2. **Shared state between visitors.**
   - Every visitor signs in to the same fictional accounts and shares the same records, so one visitor's actions appear for the next.
   - Options:
     - a scheduled automatic reset (for example every night and on deploy)
     - per-visitor sandboxes
     - a clear note on the sign-in page that the demo is shared
   - Investigation decisions are already kept per browser.
3. **Lockouts can be abused.**
   - Five wrong passwords lock an *account* for 15 minutes, for everyone.
   - On a public demo, a visitor could lock "Layla" or "Sara" for all other visitors.
   - Lock by IP address and account together, or skip lockouts for demo accounts while demo mode is on.
4. **Sign-in experience for visitors.**
   - Demo mode (`TYLL_DEMO_MODE=on`) lists the fictional accounts and shows their PINs, which suits a public demo.
   - Decide whether visitors should see the full account list or a simpler "Start as owner / manager / staff" choice.
   - Keep `TYLL_DEMO_MODE=on` only on the public demo deployment.
5. **Settings for the deployment.**
   - `TYLL_PUBLIC_URL=https://demo.tyll.ai`
   - No email provider (or a sandbox domain)
   - `NODE_ENV=production`, so cookies are marked Secure
6. **Reset access.**
   - Only the owner and general manager can reset shared records, and the demo accounts are public.
   - Decide whether visitors may reset (simplest for demos), or rely on the scheduled reset.
7. **Abuse protection.**
   - Basic rate limiting on `/api/*`.
   - A size limit on stored records, so the JSON files cannot grow without bound.
8. **Domain.** Point `demo.tyll.ai` at the host with the DNS record the host gives, normally a CNAME.

## Then, in the website project

Set `PUBLIC_DEMO_URL=https://demo.tyll.ai` in Vercel and redeploy. All demo buttons appear at once: header, hero, How It Works, What Tyll Can Do, final call to action, footer and mobile menu. They open the demo in a new tab.
