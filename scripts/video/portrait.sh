#!/bin/bash
# Cuts the upright film for phones from the landscape master: a 9:16 window the full height of the frame, which pans
# across the frame along the track in src/content/walkthrough.json (portraitCrop.track: [film seconds, centre from 0 to
# 1 of the frame's width], straight lines between the points), so the chef, the bartender and the entrance stay in
# view. The page maps the callouts through the same track. Writes assets/video/master-9x16.mp4 (1080 x 1920, 24 fps).
# Uses the upscaled master (master-16x9-4k.mp4) when it is there, so the window is 1216 px wide before it is scaled
# down to 1080, not 608 px scaled up.
#
# Usage: scripts/video/portrait.sh
# Settings: IN=assets/video/master-16x9-4k.mp4 (falls back to master-16x9.mp4), OUT=assets/video/master-9x16.mp4,
#   MANIFEST=src/content/walkthrough.json, CRF=14
set -euo pipefail
source "$(dirname "$0")/env.sh"
IN=${IN:-assets/video/master-16x9-4k.mp4}
[ -f "$IN" ] || IN=assets/video/master-16x9.mp4
OUT=${OUT:-assets/video/master-9x16.mp4}
MANIFEST=${MANIFEST:-src/content/walkthrough.json}
CRF=${CRF:-14}
IFS=, read -r W H <<<"$("$FP" -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$IN")"
# The window: 9:16 of the full height, an even number of pixels; its left edge follows the track, kept inside the frame
CW=$(((H * 9 / 16 + 1) / 2 * 2))
X=$(node -e '
const m = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
const [W, CW] = [Number(process.argv[2]), Number(process.argv[3])];
const track = m.portraitCrop.track;
// centre(t) as nested ifs: straight lines between the points, flat before the first and after the last
let e = String(track[track.length - 1][1]);
for (let k = track.length - 2; k >= 0; k--) {
  const [t0, c0] = track[k];
  const [t1, c1] = track[k + 1];
  e = `if(lt(t,${t1}),${c0}+(t-${t0})*${(c1 - c0) / (t1 - t0 || 1)},${e})`;
}
console.log(`max(0,min(${W - CW},(${e})*${W}-${CW / 2}))`);
' "$MANIFEST" "$W" "$CW")
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
printf "crop=w=%s:h=%s:x='%s':y=0,scale=1080:1920:flags=lanczos,format=yuv420p" "$CW" "$H" "$X" >"$WORK/graph.txt"
"$FF" -y -hide_banner -loglevel error -i "$IN" -an -filter_script:v "$WORK/graph.txt" -c:v libx264 -crf "$CRF" -preset slow -movflags +faststart "$OUT"
echo "$OUT: $(frames_in "$OUT") frames, from $IN ($W x $H, a $CW px window)"
