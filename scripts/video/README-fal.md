# fal.ai for the hotel film

fal.ai runs the video models (Kling, Veo, Hailuo) and image models (Flux) that make the hotel walkthrough clips. It is
reached two ways:

| Way | Used by | Signs in with |
| --- | --- | --- |
| The fal MCP server | Claude, to find models, read their input fields and prices, and run test generations | A browser sign-in (OAuth), stored by Claude Code, never in the repo |
| fal's REST API | `scripts/video/generate.ts`, to make each clip from `video-brief.md` | `FAL_KEY` in `.env.local` (ignored by git) |

The MCP server itself is free; every model run is paid from your fal balance at fal's prices. Check the price before
each run, and only run what the owner has approved.

## How the MCP is configured

`.mcp.json` in the repo root (project scope, so it travels with the repo) holds fal's official server:

```json
{ "mcpServers": { "fal": { "type": "http", "url": "https://mcp.fal.ai/mcp-relay" } } }
```

No key or token is in it. The equivalent command, from fal's Claude Code guide, is
`claude mcp add --transport http --scope project fal https://mcp.fal.ai/mcp-relay`.

## Signing in on a new machine

1. Open the project in Claude Code (the desktop app's Code tab, or `claude` in a terminal at the repo root), and accept
   the project's MCP servers if it asks.
2. Type `/mcp`, choose **fal**, then **Authenticate**. A browser window opens. Sign in to fal.ai there and allow access.
3. Back in Claude Code, `/mcp` should show fal as connected. If its tools still do not appear, start a new session.
4. Ask Claude to "find a fal image-to-video model without running it" to check the connection.

Signing in on the fal.ai website alone does not connect Claude: the Authenticate step in `/mcp` does.

## The key for the script

1. On fal.ai: Dashboard, Keys, create a key and copy it. It is one string with a colon in the middle.
2. In a terminal at the repo root, straight after copying (it replaces any earlier FAL_KEY and never shows the key):

   ```bash
   sed -i '' '/^FAL_KEY=/d' .env.local; printf 'FAL_KEY=%s\n' "$(pbpaste)" >> .env.local && echo saved
   ```

3. Never paste the key into a chat, a commit or a script.

## ffmpeg and ffprobe

`npm install` brings both (`ffmpeg-static`, `@ffprobe-installer/ffprobe`); the scripts in `scripts/video/` find them
through `env.sh`, so nothing system-wide is needed. To also have them on the shell's PATH:

```bash
mkdir -p ~/.local/bin && cp "$(node -p 'require("ffmpeg-static")')" ~/.local/bin/ffmpeg && cp "$(node -p 'require("@ffprobe-installer/ffprobe").path')" ~/.local/bin/ffprobe && echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zprofile
```

(run at the repo root with Node on the PATH; open a new terminal afterwards). Or install Homebrew and `brew install ffmpeg`.

## Generating a clip

With Claude and the MCP: ask for the model, its price for the clip length you want, then the run; Claude shows the price
and waits for a yes. With the script (prompts, start and end frames from `video-brief.md`):

```bash
node scripts/video/generate.ts A --dry-run     # free: prints the request
node scripts/video/generate.ts A               # paid: saves assets/video/raw/city/A.mp4
```

`scripts/video/README.md` has the whole order from brief to live page.

## ffmpeg commands

Reverse a clip (for a walk back out the way it came in):

```bash
ffmpeg -i in.mp4 -vf reverse -an out-reversed.mp4
```

Stitch clips with a 0.3 s crossfade (two 5 s clips here; the offset is the first clip's length minus 0.3):

```bash
ffmpeg -i a.mp4 -i b.mp4 -filter_complex "[0][1]xfade=transition=fade:duration=0.3:offset=4.7,format=yuv420p" -an -r 24 joined.mp4
```

`scripts/video/stitch.sh` does this for the whole edit in `video-brief.md`, each join with its own length.

Extract the frames as WebP for the scroll player (desktop 16:9; the phone's frames come from the upright cut):

```bash
ffmpeg -i master-16x9-4k.mp4 -vf "fps=8,scale=1920:1080:flags=lanczos" -c:v libwebp -quality 85 -start_number 1 public/hotel-walkthrough/desktop/frame-%04d.webp
ffmpeg -i master-9x16.mp4 -vf "fps=8,scale=1080:1920:flags=lanczos" -c:v libwebp -quality 85 -start_number 1 public/hotel-walkthrough/mobile/frame-%04d.webp
```

`scripts/video/portrait.sh` makes the upright cut, panning along the manifest's track. `scripts/video/frames.sh` cuts
both sets and the hold pictures and writes the counts into `src/content/walkthrough.json`.

Upscale the master once (Topaz on fal, $0.01 a second): upload `master-16x9.mp4` with `upload_file` (prepare, then
PUT), run `fal-ai/topaz/upscale/video` with `model` Proteus, `upscale_factor` 2 and `H264_output` true, and save the
result as `assets/video/master-16x9-4k.mp4`.

Ten evenly spaced frames from a test clip:

```bash
ffmpeg -i test.mp4 -vf "fps=10/$(ffprobe -v error -show_entries format=duration -of csv=p=0 test.mp4)" -frames:v 10 -c:v libwebp -quality 80 frame-%02d.webp
```
