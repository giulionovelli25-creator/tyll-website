# Hero video: replacement brief

**Status (16 Oct 2026): replaced.** The homepage now opens on a 9.5-second "hotel in motion" edit in three scenes:

1. a chef seasoning a long row of plates at a bright kitchen pass
2. a housekeeper preparing a bed in a daylit room
3. a white-gloved server pouring coffee at a breakfast table with pastries and flowers

All three clips are free Pexels footage under the Pexels License; sources are in `src/assets/photos/CREDITS.md`. The scenes cross-fade gently over 0.8 seconds, and the last frame dissolves back into the first so the loop has no visible cut.

- **Encoding:** H.264 with no audio. 1920×1080 at about 2.1 MB for desktop, 1280×720 at about 0.94 MB for phones (chosen with `media`), plus a poster still.
- **Rejected:** a room-service trolley clip, because wine glasses are visible on it.
- **Still open:** the shots are free stock, so the same footage can appear on other sites. For an opening only Tyll uses, the options below still apply.

## The goal

A 9–12 second "hotel in motion" sequence that shows the people who run a hotel, not only a beautiful lobby:

1. housekeeping preparing a sunlit suite
2. a chef plating in a bright kitchen
3. a concierge or guest-service moment

The hero text stays exactly as it is.

## What was searched (free libraries)

Pexels (free commercial licence) was searched again for housekeeping, chef plating, room service, concierge, guest service, hotel staff and hotel reception. Findings:

- **Housekeeping:** usable. Two people making a bed in a bright room.
- **Chef plating:** usable. A chef garnishing a plated dish in a restaurant kitchen.
- **Concierge / guest service:** nothing usable. Clips are masked (pandemic era), staged with costume bellhops, very short or vertical. The best room-service clip is 1.9 s and vertical.

Two good scenes out of three is not a genuinely better opening than the current film, so the current film stays.

## Option A: free stock composite (no cost)

- **Preview:** `review/hero-option-A-free-stock-preview.mp4` (1600×900, about 8.4 s, 1.95 MB; not in git, review only).
- **Clips:**
  - housekeeping: https://www.pexels.com/video/two-women-in-white-aprons-are-making-a-bed-9472830/
  - chef: https://www.pexels.com/video/gourmet-chef-garnishing-elegant-dish-in-restaurant-39452967/
- **Licence:** Pexels License (free commercial use, no attribution required). It does not cover trademarks or brands visible in a clip, so the final edit must be checked for any.
- **Gap:** the concierge / guest-service scene is still missing. The sequence would be two scenes until a third is found.
- **Effort:** half a day to finish the edit, grade both clips to the Tyll look and encode.

## Option B: paid premium stock (needs budget approval)

- **Libraries:** Artgrid, Musicbed/Filmsupply or Getty Images Premium.
- **Searches:** "luxury hotel housekeeping", "chef plating", "concierge", "hotel guest service".
- **Licensing:** these libraries offer cinematic, consistently graded footage with model releases and clear commercial licences.
- **Cost:** typically a subscription or a per-clip licence. Nothing has been bought.
- **Effort:** one to two days once the clips are licensed.

## Option C: original shoot (best fit)

- **Shoot:** a small crew in a real property, following the storyboard below.
- **Rights:** the property gives written permission, and every person on camera signs a model release.
- **Result:** the only option that gives all three scenes in one consistent look, with Tyll owning the footage.

## Option D (only with approval): AI video generation

This was not used. It needs your approval and budget, and it carries a real risk of an artificial look.

## Storyboard: "A hotel in motion" (10 s, soft cross-dissolves)

| Time | Shot | Notes |
| --- | --- | --- |
| 0.0–3.5 s | Sunlit suite. A housekeeper smooths a white duvet; morning light through sheer curtains. Slow push-in. | Bright, airy, natural colour. The left half stays calm for the headline. |
| 3.5–7.0 s | Bright kitchen pass. A chef places the final garnish on a plate with tweezers; hands and plate in focus. | Clean steel and white plates, no alcohol in shot. |
| 7.0–10.0 s | Lobby or guest corridor. A concierge greets a guest with a small, real gesture, such as handing over a key card or pointing the way. | Modest dress suitable for Gulf audiences. The last frame dissolves back to the first for a seamless loop. |

## Technical specification

- **Duration:** 9–12 s, seamless loop, no audio track.
- **Resolution:** delivered 3840×2160; the site encodes 1920×1080 and 1280×720 (mobile).
- **Look:** bright and natural, skin tones true, no heavy grade. The headline needs white text at 4.5:1 contrast, so the site keeps a soft dark gradient on the text side (left in English, German and Italian; right in Arabic, where the film is mirrored).
- **Composition:** subject activity in the right half. Also frame safely for a 9:16 mobile crop around 65% horizontally.
- **Motion:** locked-off or a very slow push. No handheld, no fast pans.
- **People:** believable hotel staff. No alcohol in shot.
- **Branding:** no visible third-party hotel logos or signage. No text in shot, because the film is mirrored for Arabic.
- **Delivery:**
  - ProRes 422 HQ master
  - poster still (the first frame, 2400 px wide)
  - signed licence or release paperwork

## How to swap it in

Replace `public/media/hero-reception.mp4` and `src/assets/hero-reception.jpg` (the poster) with the new files, keeping their names, or update the two paths in `src/components/home/Hero.astro`. Encode with H.264 (`-crf 23 -preset slow -movflags +faststart`, no audio) to about 1–2 MB. Optionally add a 720p version for phones.
