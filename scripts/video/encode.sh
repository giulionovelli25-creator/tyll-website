#!/bin/bash
# Makes the player's fallback films, into public/hotel-walkthrough/: desktop.mp4 (1920 x 1080, from the landscape
# master) and mobile.mp4 (1080 x 1920, from the upright cut). H.264 plays everywhere, faststart, a keyframe every half
# second so the fallback can seek, no audio. They load only when the frames cannot, so they are encoded light.
#
# Usage: scripts/video/encode.sh
# Settings: IN=assets/video/master-16x9-4k.mp4 (falls back to master-16x9.mp4), PORTRAIT=assets/video/master-9x16.mp4,
#   OUT=public/hotel-walkthrough, CRF=24
set -euo pipefail
source "$(dirname "$0")/env.sh"
IN=${IN:-assets/video/master-16x9-4k.mp4}
[ -f "$IN" ] || IN=assets/video/master-16x9.mp4
PORTRAIT=${PORTRAIT:-assets/video/master-9x16.mp4}
OUT=${OUT:-public/hotel-walkthrough}
CRF=${CRF:-24}
mkdir -p "$OUT"
rm -f "$OUT"/poster-*.jpg # the first hold's picture is the poster now (frames.sh)
for cut in desktop mobile; do
  if [ "$cut" = desktop ]; then src="$IN"; size="1920:1080"; else src="$PORTRAIT"; size="1080:1920"; fi
  "$FF" -y -hide_banner -loglevel error -i "$src" -an -vf "scale=$size:flags=lanczos,format=yuv420p" \
    -c:v libx264 -crf "$CRF" -preset slow -g 12 -movflags +faststart "$OUT/$cut.mp4"
  echo "$cut.mp4: $(du -h "$OUT/$cut.mp4" | cut -f1)"
done
