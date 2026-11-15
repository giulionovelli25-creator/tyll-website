#!/bin/bash
# The colour grade of 9 Nov 2026 (the owner's brief: cleaner, more contemporary, no regeneration): the whole film at half
# strength, the bar stretch (pieces D, E and E2 of the edit, 13.25 s to 23.12 s) at full strength, eased in and out over
# 0.42 s at the doorways where those pieces cross-fade, so no cut shows. Full strength: about 400 K cooler, shadows
# lifted a little, reds and yellows (the amber) 20% less saturated, a touch more contrast; skin stays natural.
# Reads the ungraded upscaled master and writes the graded one the frame scripts read.
#
# Usage: scripts/video/grade.sh
# Settings: IN=assets/video/master-16x9-4k-ungraded.mp4, OUT=assets/video/master-16x9-4k.mp4, CRF=14
set -euo pipefail
source "$(dirname "$0")/env.sh"
IN=${IN:-assets/video/master-16x9-4k-ungraded.mp4}
OUT=${OUT:-assets/video/master-16x9-4k.mp4}
CRF=${CRF:-14}
FULL="colortemperature=temperature=6900:mix=1:pl=1,curves=all='0/0.03 0.25/0.265 0.5/0.505 0.75/0.755 1/1',huesaturation=saturation=-0.2:colors=r+y:strength=1:rw=0.333:gw=0.334:bw=0.333,eq=contrast=1.06"
HALF="colortemperature=temperature=6700:mix=1:pl=1,curves=all='0/0.015 0.25/0.2575 0.5/0.5025 0.75/0.7525 1/1',huesaturation=saturation=-0.1:colors=r+y:strength=1:rw=0.333:gw=0.334:bw=0.333,eq=contrast=1.03"
MIX="A+(B-A)*clip((T-13.25)/0.42\,0\,1)*clip((23.125-T)/0.42\,0\,1)"
"$FF" -v error -y -i "$IN" -filter_complex "[0:v]format=gbrp,split=2[a][b];[a]${HALF}[h];[b]${FULL}[f];[h][f]blend=all_expr='${MIX}',format=yuv420p[out]" \
  -map "[out]" -an -r 24 -c:v libx264 -crf "$CRF" -preset slow -movflags +faststart "$OUT.tmp.mp4"
mv "$OUT.tmp.mp4" "$OUT"
echo "$OUT: $(frames_in "$OUT") frames"
