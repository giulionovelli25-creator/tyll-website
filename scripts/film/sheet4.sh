#!/bin/bash
# A contact sheet of the row clips of one language and mode, one frame each (round 4): for checking what each clip shows.
#   bash scripts/film/sheet4.sh <lang> <mode> <out-dir>
set -euo pipefail
LANG_=${1:-en}
MODE=${2:-desk}
OUT=${3:?out dir}
FF=/Users/fynnkopitz/bin/ffmpeg
mkdir -p "$OUT/frames-$LANG_-$MODE"
i=0
: > "$OUT/index-$LANG_-$MODE.txt"
for f in tests/tmp/film4/"$LANG_"/*-"$MODE".webm; do
  b=$(basename "$f" ".webm")
  case "$b" in stock-"$MODE"|expiry-"$MODE"|waste-"$MODE"|forecasting-"$MODE"|auto-"$MODE"|deliveries-"$MODE"|takes-"$MODE"|pour-"$MODE"|finance-"$MODE"|revenue-"$MODE"|suppliers-"$MODE") continue ;; esac
  i=$((i + 1))
  n=$(printf "%02d" "$i")
  "$FF" -loglevel error -y -ss 5.5 -i "$f" -frames:v 1 -vf "scale=480:-1" "$OUT/frames-$LANG_-$MODE/$n.jpg"
  echo "$n $b" >> "$OUT/index-$LANG_-$MODE.txt"
done
"$FF" -loglevel error -y -framerate 1 -start_number 1 -i "$OUT/frames-$LANG_-$MODE/%02d.jpg" -frames:v 1 -vf "tile=5x4" "$OUT/rows-$LANG_-$MODE-a.jpg"
"$FF" -loglevel error -y -framerate 1 -start_number 21 -i "$OUT/frames-$LANG_-$MODE/%02d.jpg" -frames:v 1 -vf "tile=5x4" "$OUT/rows-$LANG_-$MODE-b.jpg"
tr '\n' ' ' < "$OUT/index-$LANG_-$MODE.txt"
