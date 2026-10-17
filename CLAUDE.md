# Tyll marketing website

Rebuild of the public marketing website for Tyll (tyll.ai).

## About Tyll

Tyll is a hospitality operations platform. It helps hotels bring information from their existing systems together, identify problems, coordinate departments and track results.

## Audience and tone

- For hotel owners, general managers and hospitality groups.
- Luxurious and minimal.

## Brand elements to preserve

- Existing logo
- Cinematic hotel reception opening
- Premium typography
- Hand-drawn checkmark animation
- Black / white / silver visual identity

The owner provides the official brand assets, website references and research document. Use those, not approximations, wherever they exist.

## Key facts (from the Step 1 audit, see AUDIT.md)

- Live site: static HTML on Vercel. Vector logo paths, hero video and fonts are served from tyll.ai.
- Demo repo: github.com/giulionovelli25-creator/Demo-Tyll (Next.js). Read-only for this project.
- Node is at `~/.local/share/node-lts/bin`, not on the default PATH. Prefix commands with `PATH="$HOME/.local/share/node-lts/bin:$PATH"`.
- The demo's permanent local copy is `~/tyll-demo` (runs on port 3210). Never edit it, and never run `npm init`/`npm install` with the shell's working directory inside it.
- Stack: Astro 7.3, static output. Four languages (EN, DE, AR, IT) with routes in `src/i18n/routes.ts` and copy in `src/i18n/en.ts`, `de.ts`, `ar.ts`, `it.ts`; solution text in `src/content/solutions.ts` uses `t(en, de, ar, it)`.
- Arabic is right-to-left: `<html dir>` comes from `dirOf()`. Use logical CSS (`margin-inline-start`, `inset-inline-end`, `text-align: start`). In component styles, RTL overrides must be written `:global([dir='rtl']) .x`, because Astro scopes a bare `[dir='rtl']` to the component and it never matches. Arabic font: Noto Sans Arabic in `public/fonts/`, Arabic characters only. Walkthrough and step frames stay left-to-right because the demo is English. The language switch shows العربية (not AR) using a tiny font subset.
- Arabic and Italian text, and all legal pages, are drafts awaiting native-speaker and legal review.
- Architecture (16 Oct 2026, Nory-inspired): short four-section homepage (hero, connect story, one sourced finding, invitation); Solutions menu with six solution pages built from `src/content/solutions.ts`; FAQ in the menu and footer. Keep product detail off the homepage.
- Demo screenshots live in `src/assets/demo/`. Captures that create records were taken from a throwaway copy of the demo, never the real one. Photo sources are in `src/assets/photos/CREDITS.md`.
- Per-solution demo deep links: `src/config/demo.ts`.
- Homepage chapter 2 (`src/components/home/ConnectStory.astro`, 17 Oct 2026) is a ~9.5 s product sequence on a pearl stage: a POS order and a stock count float apart (PMS and Finance quieter behind), glide into a Tyll window, the Coca-Cola issue becomes prominent, then the next step and the assigned owner appear; it holds on the final view. It starts when 30% in view, pauses off screen, never touches scrolling; one button pauses, resumes or replays. Reduced motion or no JavaScript: the final view. Do not add scroll-pinning or scroll snapping here.
- Calendly's own cookie notice stays on (no `hide_gdpr_banner`), because its booking page loads its own services (Stripe, Segment, reCAPTCHA, Google Analytics) inside the iframe. The legal pages' "On this page" list is built from the rendered `<h2 id>` headings in `LegalShell.astro`.
- Marketing photos and video must not feature alcohol (Gulf market). Sources in `src/assets/photos/CREDITS.md`. The hero film (16 Oct 2026) is a three-scene Pexels edit: kitchen pass, housekeeping, breakfast service; see `docs/hero-video-brief.md`.
- Solution pages (17 Oct 2026, `SolutionPage.astro`): opening photo → warm-ivory context (the problem, how Tyll helps in three lines, a second photo bleeding to the edge; its side alternates) → one product explorer (`src/components/ProductExplorer.astro`, data in `src/content/explore.ts`) → a charcoal CTA panel with a still frame of the Tyll silver wave (`ribbon()` from `src/scripts/wave.ts`) on a light band, then the other solutions as photos. Explorer: each part is a complete block of the demo screen (focus rectangles are snapped to the gaps between cards — re-snap if a capture changes), shown sharp over a blurred whole-screen backdrop on desktop, with a ring on the detail; `fade: true` marks parts whose content carries on and offers the whole screen. Up to 900 px wide the part is shown at a readable scale (≥ 0.8) and scrolls sideways. Whole screen and an Enlarge viewer with every screen are always available. Every explanation must describe only what its screen shows.
- The closing section's silver wave is one coherent ribbon computed in `src/scripts/wave.ts` (a fixed check-like curve plus travelling swells; every line shares the shape, offset like threads). The component redraws it at about 30 fps only while on screen; a 16 s cycle loops seamlessly; reduced motion shows the first frame, which is also server-rendered.
- Hero headline is about 20% smaller than in October's first version and each sentence stays on one line from 640 px up; the supporting text is one sentence.
- UX cues are deliberately few: named demo buttons, an All Solutions link at the end of each solution page, and one line on the booking page saying what the call is. No urgency, testimonials or invented claims.
- Every Explore Solutions button links to the solutions overview page; the header's Solutions dropdown is the only dropdown.
- Book a Call is a split screen (booking left, sunlit lobby photo right); once Calendly opens, the photo hides and the calendar takes the full width. Calendly still loads only after the click.
- Demo screens are full 1440×1240 captures (2× pixels). The explorer may frame a close-up, but the whole screen must always be one click away (Whole screen, Enlarge); never stretch or edit a capture.
- Legal pages (`LegalShell.astro`): a pearl title band with a short silver rule, and an "On this page" list built from the rendered `<h2 id>` headings, sticky beside the text from 1100 px with the current section marked. The booking page has a pearl ground with a faint still silver wave.
- External settings are `PUBLIC_*` variables (see `.env.example` and LAUNCH.md). Legal details live in `src/config/legal.ts` and must never be guessed.
- `npm run launch-check` lists launch blockers. `npm run test:e2e` runs the browser tests (needs Google Chrome and the dev server).

## Rules

- **This project is ONLY the public marketing website.** The interactive Tyll software demo lives in a separate Claude Code project. Do not rebuild or modify it.
- **Do not assume the existing website's source files are available here.** They are not in this folder unless the owner adds them.
- **Ask for missing assets or repository access** instead of guessing or inventing substitutes.
- **Never publish or deploy to the live website without the owner's explicit approval**, given in chat for that specific deploy.
