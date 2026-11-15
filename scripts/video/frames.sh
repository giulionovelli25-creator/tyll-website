#!/bin/bash
# Cuts the frames the scroll player draws, as AVIF (2.5 to 3 times smaller than WebP for this footage, where the cobbles
# make every frame expensive), with nothing filtered out: public/hotel-walkthrough/desktop/frame-0001.avif onward at
# 1600 x 900 from the landscape master (the upscaled one when it is there, scaled down) and mobile/ at 960 x 1706 from
# the upright cut (portrait.sh). Few frames a second: the player blends the two frames around the exact film time, so
# scrubbing stays smooth. Then each hold's picture, hold-1-desktop.webp to hold-4-mobile.webp, from the middle of the
# hold (the poster and the reduced-motion stills), and writes counts, rates, sizes and the format into the manifest.
#
# Usage: scripts/video/frames.sh
# Settings: IN=assets/video/master-16x9-4k.mp4 (falls back to master-16x9.mp4), PORTRAIT=assets/video/master-9x16.mp4,
#   OUT=public/hotel-walkthrough, MANIFEST=src/content/walkthrough.json, DESKTOP_FPS=6, MOBILE_FPS=4,
#   DESKTOP_QUALITY=40, MOBILE_QUALITY=28 (AVIF), HOLD_QUALITY=85 (WebP)
set -euo pipefail
source "$(dirname "$0")/env.sh"
IN=${IN:-assets/video/master-16x9-4k.mp4}
[ -f "$IN" ] || IN=assets/video/master-16x9.mp4
PORTRAIT=${PORTRAIT:-assets/video/master-9x16.mp4}
OUT=${OUT:-public/hotel-walkthrough}
MANIFEST=${MANIFEST:-src/content/walkthrough.json}
DFPS=${DESKTOP_FPS:-6}
MFPS=${MOBILE_FPS:-4}
DQ=${DESKTOP_QUALITY:-40}
MQ=${MOBILE_QUALITY:-28}
HQ=${HOLD_QUALITY:-85}
[ -f "$PORTRAIT" ] || { echo "Missing $PORTRAIT: run scripts/video/portrait.sh"; exit 1; }
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$OUT/desktop" "$OUT/mobile" "$WORK/desktop" "$WORK/mobile"
rm -f "$OUT"/desktop/frame-* "$OUT"/mobile/frame-* "$OUT"/hold-*.webp
"$FF" -y -hide_banner -loglevel error -i "$IN" -vf "fps=$DFPS,scale=1600:900:flags=lanczos" -start_number 1 "$WORK/desktop/frame-%04d.png"
"$FF" -y -hide_banner -loglevel error -i "$PORTRAIT" -vf "fps=$MFPS,scale=960:1706:flags=lanczos" -start_number 1 "$WORK/mobile/frame-%04d.png"
node -e '
const sharp = require("sharp");
const fs = require("fs");
const [work, out, dq, mq] = process.argv.slice(1);
(async () => {
  for (const [dir, q] of [["desktop", +dq], ["mobile", +mq]]) {
    const files = fs.readdirSync(`${work}/${dir}`).sort();
    for (let k = 0; k < files.length; k += 8) {
      await Promise.all(files.slice(k, k + 8).map((f) => sharp(`${work}/${dir}/${f}`).avif({ quality: q, effort: 4 }).toFile(`${out}/${dir}/${f.replace(".png", ".avif")}`)));
    }
  }
})();
' "$WORK" "$OUT" "$DQ" "$MQ"
desktop=$(find "$OUT/desktop" -name 'frame-*.avif' | wc -l | tr -d ' ')
mobile=$(find "$OUT/mobile" -name 'frame-*.avif' | wc -l | tr -d ' ')

# Each hold's picture: the middle of its plateau
i=1
for mid in $(node -p 'JSON.parse(require("fs").readFileSync(process.argv[1], "utf8")).holds.map((h) => ((h.from + h.to) / 2).toFixed(3)).join(" ")' "$MANIFEST"); do
  "$FF" -y -hide_banner -loglevel error -ss "$mid" -i "$IN" -frames:v 1 -vf "scale=1920:1080:flags=lanczos" -c:v libwebp -quality "$HQ" "$OUT/hold-$i-desktop.webp"
  "$FF" -y -hide_banner -loglevel error -ss "$mid" -i "$PORTRAIT" -frames:v 1 -vf "scale=1080:1920:flags=lanczos" -c:v libwebp -quality "$HQ" "$OUT/hold-$i-mobile.webp"
  i=$((i + 1))
done
echo "desktop: $desktop frames at $DFPS fps, 1600x900, $(du -sh "$OUT/desktop" | cut -f1); mobile: $mobile frames at $MFPS fps, 960x1706, $(du -sh "$OUT/mobile" | cut -f1)"
node -e '
const fs = require("fs");
const [f, n, m, df, mf] = process.argv.slice(1);
const j = JSON.parse(fs.readFileSync(f, "utf8"));
Object.assign(j.desk, { frames: Number(n), fps: Number(df), size: [1600, 900], ext: "avif" });
Object.assign(j.phone, { frames: Number(m), fps: Number(mf), size: [960, 1706], ext: "avif" });
fs.writeFileSync(f, JSON.stringify(j, null, 2).replace(/\[\n\s+(-?[\d.]+),\n\s+(-?[\d.]+)\n\s+\]/g, "[$1, $2]") + "\n");
console.log(`${f}: desktop ${n} frames at ${df} fps, mobile ${m} at ${mf} fps`);
' "$MANIFEST" "$desktop" "$mobile" "$DFPS" "$MFPS"
