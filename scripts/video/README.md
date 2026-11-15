# Hotel film: from brief to live page

The homepage's hotel section ("Three places your hotel loses money.") is one full-screen film, 34 s, scrubbed by
scroll, that stops on four holds (`src/components/home/HotelStory.astro`, `src/scripts/film.ts`). These scripts turn
`video-brief.md` (repo root) into that film:

1. the clips, made on fal.ai;
2. the edit, which joins them into one master;
3. one upscale;
4. the upright phone cut;
5. the frames the page draws, checked before anything is committed.

The film of 8 Nov 2026 was made this way (the brief records every prompt, request and cost). The same steps remake any
one clip.

Run everything from the repo root. Node is not on this Mac's default PATH, so start each terminal with:

```bash
export PATH="$HOME/.local/share/node-lts/bin:$PATH"
```

## What is here

| File | What it does | Costs money |
| --- | --- | --- |
| `video-brief.md` | The film: story, rules, every still and clip with its exact prompt, and the edit (which frames of which clip, and how each piece joins the next). The scripts read it, so change the brief, not the scripts. | |
| `brief.ts` | Reads the brief. `node scripts/video/brief.ts list` prints the clips and the length of the edit. | |
| `generate.ts` | Makes one clip on fal.ai by its REST API (needs `FAL_KEY`) and saves it where the brief says. `--dry-run` prints the request for free. | **Yes** |
| `sharpness.mjs` | The spec's sharpness check: Laplacian variance on 10 frames per clip, raw and contrast-normalised. | |
| `motion.mjs` | Frame-to-frame change and the still stretches, which is where the holds go. | |
| `stitch.sh` | Builds `assets/video/master-16x9.mp4` (1920 x 1080, 24 fps) from the edit, with the one grade. | |
| `grade.sh` | The one colour grade of 9 Nov 2026 on the upscaled master: half strength throughout, full strength on the bar stretch (cooler, shadows lifted, less amber, a touch more contrast). Reads `master-16x9-4k-ungraded.mp4`, writes `master-16x9-4k.mp4`. | |
| `portrait.sh` | Cuts `assets/video/master-9x16.mp4` (1080 x 1920) from the upscaled master, panning along the manifest's track. | |
| `frames.sh` | Cuts the AVIF frames (1600 px at 6 a second, 960 px at 4 a second) and the four hold pictures into `public/hotel-walkthrough/`, and writes the counts into the manifest. | |
| `encode.sh` | Makes the fallback films `desktop.mp4` and `mobile.mp4`. | |
| `report.sh` | Counts and sizes everything, and fails if anything disagrees with the manifest. | |
| `env.sh` | Shared setup for the shell scripts: the repo root, Node, ffmpeg and ffprobe. | |

Tools come from `npm install`, with nothing to install system-wide: ffmpeg 6 from `ffmpeg-static` (libx264, libwebp),
ffprobe from `@ffprobe-installer/ffprobe`, and sharp.

## One-time setup

1. Run `npm install`.
2. Connect fal to Claude: type `/mcp` in the Claude chat, choose **fal**, then **Authenticate** (`README-fal.md`).
   Every generation is paid, so Claude shows the price and waits for the owner's approval first.
3. Only for `generate.ts`: a fal key in `.env.local` as `FAL_KEY=...` (never in a chat, a commit or a script).

## From brief to live page

1. **Make the stills, then the clips.** The brief lists each one with its prompt, start and end frame. Through the fal
   MCP, or:

   ```bash
   node scripts/video/generate.ts A --dry-run
   node scripts/video/generate.ts A
   ```

   Kling O3 Pro costs $0.14 a second (8 Nov 2026). It takes a start frame, an optional end frame and 3 to 15 s.
2. **Review every clip** before going on:
   - look at it frame by frame (a 4 x 4 grid at 8 frames a second around each move shows a dissolve or a cut at once);
   - run the sharpness check:

     ```bash
     node scripts/video/sharpness.mjs assets/video/raw/city/*.mp4
     ```

   Reject warping, floating or duplicated people, melting hands, flicker, a cut, or a dissolve between two rooms. Kling
   dissolves when the start and end frames are different rooms, so give a move an end frame only when it stays in one
   space; otherwise let it run free and join it to the next clip at a doorway.
3. **Retake only what failed.** Extract the last clean frame of the clip (before the camera moves or the defect
   starts) and use it as the retake's start frame, so the hold before it stays untouched. Add the retake to the brief
   and to the edit, starting on that frame.
4. **Build the master** from the edit table in the brief:

   ```bash
   scripts/video/stitch.sh
   ```

   It prints where each piece starts. A retake often comes out a little darker than the frame it started from: measure
   the step on the join frame and set the piece's brightness match.
5. **Upscale once**, through the fal MCP:
   - upload `assets/video/master-16x9.mp4` (up to 90 MB);
   - run `fal-ai/topaz/upscale/video` with `model` Proteus, `upscale_factor` 2 and `H264_output` true. This costs
     $0.01 a second, $0.34 for the 34 s film;
   - save the result as `assets/video/master-16x9-4k.mp4`.

   Without it the scripts fall back to the 1080p master. The phone window is then 608 px wide, scaled up.
6. **Measure the holds** and set them in `src/content/walkthrough.json` (`holds`, film seconds), inside the still
   stretches:

   ```bash
   node scripts/video/motion.mjs assets/video/master-16x9.mp4
   ```

7. **Set the phone track** (`portraitCrop.track`: film seconds and the centre of the 9:16 window across the frame, 0 to
   1), so the people and the entrance stay in view. Then:

   ```bash
   scripts/video/grade.sh
   scripts/video/portrait.sh
   scripts/video/frames.sh
   scripts/video/encode.sh
   scripts/video/report.sh
   ```

8. **Place the callouts** in the manifest:
   - `x` and `y` are fractions of the landscape frame, at the hold;
   - `side` is where the card sits: `up`, `start` or `end`;
   - `phone`, if given, is another point for tall screens (still in landscape fractions, inside the phone window) and
     its side;
   - `hub` is where the Tyll mark sits in the result.
9. **Check it**, with the dev server running:

   ```bash
   npm run test:e2e
   ```

   Then scroll the section at desktop and phone width, down and back up. The holds' text must leave before the camera
   moves, and nothing may cover the entrance.
10. **Commit** the frames, hold pictures, films and manifest, never `config/`:

    ```bash
    git add -A -- . ':!config'
    ```

    Then wait for the owner's go-ahead for this specific deploy. The live site goes out with `git pull` and
    `railway up` from the deploying clone.

## One bad clip

Only that clip is paid for again. Remake it with its prompt from the brief, save it under the same name (the old take
is kept as `<clip>.take-<time>.mp4` by `generate.ts`), check its joins, then:

```bash
scripts/video/stitch.sh
```

Then upscale again (step 5) and run step 7.

## Settings

Each script reads these from the environment and falls back to the default shown.

| Script | Settings |
| --- | --- |
| `generate.ts` | `--model kling-o3` (default; or `kling`, `veo`, `hailuo`), `--endpoint <fal model id>`, `--dry-run`. `FAL_KEY` comes from `.env.local` or the environment. |
| `stitch.sh` | `OUT=assets/video`, `GRADE=` (the one grade; empty for none), `CRF=14` |
| `portrait.sh` | `IN=assets/video/master-16x9-4k.mp4`, `OUT=assets/video/master-9x16.mp4`, `MANIFEST=src/content/walkthrough.json`, `CRF=14` |
| `frames.sh` | `IN=assets/video/master-16x9-4k.mp4`, `PORTRAIT=assets/video/master-9x16.mp4`, `OUT=public/hotel-walkthrough`, `DESKTOP_FPS=12`, `MOBILE_FPS=10`, `DESKTOP_QUALITY=40`, `MOBILE_QUALITY=28`, `HOLD_QUALITY=85`, `MANIFEST=src/content/walkthrough.json` |
| `encode.sh` | `IN=assets/video/master-16x9-4k.mp4`, `PORTRAIT=assets/video/master-9x16.mp4`, `OUT=public/hotel-walkthrough`, `CRF=24` (the film of 8 Nov 2026 used 28) |
| `report.sh` | `OUT=public/hotel-walkthrough`, `MANIFEST=src/content/walkthrough.json` |

Raw clips, stills and masters stay on this Mac: `assets/video/raw/`, `assets/video/city/` and
`assets/video/master-*.mp4` are in `.gitignore`. Their fal addresses are in the brief. Back them up elsewhere if they
matter, because the frames alone cannot be re-cut.
