#!/bin/bash
# Reports on what the player will load: each frame set's count (and whether it matches the manifest), its total and
# average size, its largest frame, the hold pictures and the fallback films. Everything here loads only after the
# visitor has scrolled near the section, except the first hold's picture (the poster, loaded lazily).
#
# Usage: scripts/video/report.sh
# Settings: OUT=public/hotel-walkthrough, MANIFEST=src/content/walkthrough.json
set -euo pipefail
source "$(dirname "$0")/env.sh"
OUT=${OUT:-public/hotel-walkthrough}
MANIFEST=${MANIFEST:-src/content/walkthrough.json}
read -r deskListed phoneListed <<<"$(node -p 'const m = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8")); `${m.desk.frames} ${m.phone.frames}`' "$MANIFEST")"
status=0
echo "Manifest: $deskListed desktop frames, $phoneListed phone frames ($MANIFEST)"
for cut in desktop mobile; do
  dir="$OUT/$cut"
  listed=$deskListed
  [ "$cut" = mobile ] && listed=$phoneListed
  count=$(find "$dir" -name 'frame-*.avif' 2>/dev/null | wc -l | tr -d ' ')
  kb=$(du -sk "$dir" 2>/dev/null | cut -f1)
  biggest=$(find "$dir" -name 'frame-*.avif' -exec stat -f'%z %N' {} + | sort -n | tail -1)
  printf '%-8s %4s frames, %6.1f MB, average %5.1f KB, largest %s (%s KB)\n' "$cut" "$count" "$(echo "$kb / 1024" | bc -l)" "$(echo "$kb / ($count + ($count == 0))" | bc -l)" "$(basename "${biggest#* }")" "$(( ${biggest%% *} / 1024 ))"
  [ "$count" = "$listed" ] || { echo "         does not match the manifest ($listed): run frames.sh"; status=1; }
done
for f in hold-1-desktop.webp hold-1-mobile.webp hold-2-desktop.webp hold-2-mobile.webp hold-3-desktop.webp hold-3-mobile.webp hold-4-desktop.webp hold-4-mobile.webp desktop.mp4 mobile.mp4; do
  if [ -f "$OUT/$f" ]; then printf '%-20s %s\n' "$f" "$(du -h "$OUT/$f" | cut -f1)"; else echo "$f missing: run frames.sh and encode.sh"; status=1; fi
done
echo "Total: $(du -sh "$OUT" | cut -f1)"
exit $status
