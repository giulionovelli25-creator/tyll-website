# Hero video: replacement brief

**Status (16 Oct 2026): the current reception film stays for now.**

The goal is a new opening that shows *the people who run a hotel*, not only a beautiful lobby, so the site reads as a company built for hotel operators.

## What was searched

About 120 clips on Pexels (free commercial licence), across ten searches:

- hotel staff
- hotel reception
- hotel manager
- concierge
- luxury hotel lobby
- hotel housekeeping
- waiter setting table
- banquet preparation
- hotel front desk night
- restaurant team kitchen

None reached the quality of the current film:

- **Dated:** many are pandemic-era footage, with masked guests and staff.
- **Staged:** others are posed, with costume bellhops and acted check-ins.
- **Off-brand:** the calm ones are bright and generic, far from the dark, warm, cinematic Tyll look.

A video-generation tool was not available in this setup. Your brief says not to replace a good video with a worse one, so none was used.

The opening was strengthened without new footage:

- the headline now rises in line by line
- the Tyll checkmark draws itself after "Finally connected."
- the hero leads straight into the scroll story

## Recommended route

Commission an original 8-second loop from a small production crew in a real luxury property, or license a premium clip from a paid library.

- **Paid libraries:** Artgrid, Musicbed/Filmsupply or Getty Premium, filtered for "hotel operations", "general manager" and "concierge" with cinematic grading.
- **Original shoot:** the property gives written permission, and every person on camera signs a model release.

## Storyboard: "Before the doors open" (8 s, one continuous feel, no hard cuts)

| Time | Shot | Notes |
| --- | --- | --- |
| 0.0–3.0 s | Wide, locked-off: a quiet luxury lobby at dusk. Warm pendant lights. A general manager in a dark suit walks slowly into frame from the left, tablet in hand, and stops near reception. | The camera barely drifts (a 2–3% slow push). The right two-thirds of the frame stays calm for the headline on the left. |
| 3.0–5.5 s | Same shot. The receptionist looks up; the manager shows something on the tablet, and both nod. Behind them, a housekeeping supervisor crosses with a folder. | Real, small gestures, no acting to camera. This is the "departments connected" moment. |
| 5.5–8.0 s | The manager steps out of frame to the right; the lobby settles back to the opening composition. | The last frame must match the first for a seamless loop. |

## Technical specification

- **Duration:** 6–10 s, seamless loop (first and last frames match), no audio track.
- **Resolution:** delivered 3840×2160; site encodes at 1920×1080 and 1280×720 (mobile).
- **Look:** dark, warm, low-key, like the current film. Skin tones natural, blacks not crushed, no teal-orange grade.
- **Composition:** subject activity in the right half. Keep the left 55% calm and dark enough for white text at 4.5:1 contrast. Also frame safely for a 9:16 mobile crop around 65% horizontally.
- **Motion:** locked-off or a very slow push. No handheld, no fast pans, no cuts.
- **People:** believable hotel staff (manager, front office, housekeeping). Modest dress suitable for Gulf audiences. No alcohol in shot.
- **Branding:** no visible third-party hotel logos or signage. No screens showing other software.
- **Delivery:**
  - ProRes 422 HQ master
  - poster still (the first frame, 2400 px wide)
  - signed licence or release paperwork

## How to swap it in

Replace `public/media/hero-reception.mp4` and `src/assets/hero-reception.jpg` (the poster) with the new files, keeping their names, or update the two paths in `src/components/home/Hero.astro`. Encode with H.264 (`-crf 23 -preset slow -movflags +faststart`, no audio) to about 1–2 MB. Optionally add a 720p version for phones.
