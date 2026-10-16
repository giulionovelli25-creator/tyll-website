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
- Arabic is right-to-left: `<html dir>` comes from `dirOf()`. Use logical CSS (`margin-inline-start`, `inset-inline-end`, `text-align: start`). In component styles, RTL overrides must be written `:global([dir='rtl']) .x`, because Astro scopes a bare `[dir='rtl']` to the component and it never matches. Arabic font: Noto Sans Arabic in `public/fonts/`, Arabic characters only. The hero film is mirrored in Arabic; walkthrough frames stay left-to-right because the demo is English.
- Arabic and Italian text, and all legal pages, are drafts awaiting native-speaker and legal review.
- Architecture (16 Oct 2026, Nory-inspired): short four-section homepage (hero, connect story, one sourced finding, invitation); Solutions menu with six solution pages built from `src/content/solutions.ts`; FAQ in the menu and footer. Keep product detail off the homepage.
- Demo screenshots live in `src/assets/demo/`. Captures that create records were taken from a throwaway copy of the demo, never the real one. Photo sources are in `src/assets/photos/CREDITS.md`.
- Per-solution demo deep links: `src/config/demo.ts`.
- Homepage chapter 2 (`src/components/home/ConnectStory.astro`) is a scroll-driven sticky story (Before Tyll → With Tyll); with reduced motion it renders two still pictures. Do not add scroll snapping: it fought the pinned story and was removed.
- Marketing photos must not feature alcohol (Gulf market). Sources in `src/assets/photos/CREDITS.md`. The hero film stays until a better one exists; see `docs/hero-video-brief.md`.
- Walkthrough screens are full 1440×1240 demo captures (2× pixels) in a browser frame, shown with object-fit: contain, plus a viewer; never crop them.
- External settings are `PUBLIC_*` variables (see `.env.example` and LAUNCH.md). Legal details live in `src/config/legal.ts` and must never be guessed.
- `npm run launch-check` lists launch blockers. `npm run test:e2e` runs the browser tests (needs Google Chrome and the dev server).

## Rules

- **This project is ONLY the public marketing website.** The interactive Tyll software demo lives in a separate Claude Code project. Do not rebuild or modify it.
- **Do not assume the existing website's source files are available here.** They are not in this folder unless the owner adds them.
- **Ask for missing assets or repository access** instead of guessing or inventing substitutes.
- **Never publish or deploy to the live website without the owner's explicit approval**, given in chat for that specific deploy.
