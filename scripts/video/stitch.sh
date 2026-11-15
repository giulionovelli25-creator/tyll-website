#!/bin/bash
# Joins the raw clips into one film, following the edit in video-brief.md: each piece is a run of frames from one clip,
# at its own speed (24 fps, nothing retimed), with its colour match if it has one, and overlaps the next piece by the
# frames the edit gives: 10 (0.4 s) where the camera passes a doorway or a dark or bright frame, 3 where two clips meet
# on the same frame, 1 where a retake starts on the very next frame of the clip it replaces. A brightness match is added
# to the luma only (lutyuv): an RGB filter would round-trip the colour and darken the piece by itself. Then one grade over the
# whole film. Writes assets/video/master-16x9.mp4 (1920 x 1080, 24 fps) and prints where each piece starts, which the
# manifest's holds are measured from (scripts/video/holds.mjs).
#
# Usage: scripts/video/stitch.sh
# Settings: OUT=assets/video, GRADE="curves=...,eq=..." (the one grade; GRADE= for none), CRF=14
set -euo pipefail
source "$(dirname "$0")/env.sh"
OUT=${OUT:-assets/video}
GRADE=${GRADE-"curves=all='0/0 0.25/0.24 0.5/0.5 0.75/0.76 1/1',eq=saturation=0.94"}
CRF=${CRF:-14}
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$OUT"

# 1. Each piece: its frames, its brightness match, 1920 x 1080 (cover, centred), 24 fps
PIECES=()
while IFS= read -r line; do PIECES+=("$line"); done < <(node scripts/video/brief.ts edit)
inputs=()
lens=()
overlaps=()
for k in "${!PIECES[@]}"; do
  read -r file from to overlap luma <<<"${PIECES[$k]}"
  [ -f "$file" ] || { echo "Missing $file: video-brief.md, The clips, says how it was made"; exit 1; }
  match=""
  if [ "$luma" != "0" ]; then match="lutyuv=y='val+($luma)',"; fi
  "$FF" -y -hide_banner -loglevel error -i "$file" -an \
    -vf "trim=start_frame=$from:end_frame=$((to + 1)),setpts=PTS-STARTPTS,${match}scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,fps=24,format=yuv420p" \
    -c:v libx264 -crf 8 -preset fast "$WORK/$k.mp4"
  have=$(frames_in "$WORK/$k.mp4")
  [ "$have" = "$((to - from + 1))" ] || { echo "$file frames $from-$to: got $have frames"; exit 1; }
  inputs+=(-i "$WORK/$k.mp4")
  lens+=("$have")
  overlaps+=("$overlap")
done

# 2. The joins: piece k+1 starts where piece k ends, less their overlap; each crossfade lasts the overlap
graph=""
last="0:v"
start=0
starts=("0")
for ((k = 1; k < ${#lens[@]}; k++)); do
  start=$((start + lens[k - 1] - overlaps[k - 1]))
  starts+=("$start")
  graph+="[$last][$k:v]xfade=transition=fade:duration=$(printf '%.9f' "$(echo "${overlaps[k - 1]} / 24" | bc -l)"):offset=$(printf '%.9f' "$(echo "$start / 24" | bc -l)")[x$k];"
  last="x$k"
done
graph+="[$last]${GRADE:+$GRADE,}format=yuv420p[out]"
"$FF" -y -hide_banner -loglevel error "${inputs[@]}" -filter_complex "$graph" -map "[out]" -an -fps_mode cfr -r 24 \
  -c:v libx264 -crf "$CRF" -preset slow -movflags +faststart "$OUT/master-16x9.mp4"

total=$((start + lens[${#lens[@]} - 1]))
for k in "${!PIECES[@]}"; do
  read -r file from to overlap _ <<<"${PIECES[$k]}"
  printf '%-36s frames %3d-%3d  starts at %4d = %7.3f s\n' "$file" "$from" "$to" "${starts[$k]}" "$(echo "${starts[$k]} / 24" | bc -l)"
done
echo "$OUT/master-16x9.mp4: $(frames_in "$OUT/master-16x9.mp4") frames (edit: $total), $(seconds_in "$OUT/master-16x9.mp4") s"
