// How much the picture changes from one frame to the next (mean absolute difference, greyscale, 192 px wide), and the
// still stretches: where the camera has stopped and only people move. The holds in src/content/walkthrough.json are
// measured on the master with this: a hold is a still stretch, from where the change first drops under the threshold
// to where the camera starts again.
//
// Usage: node scripts/video/motion.mjs assets/video/master-16x9.mp4 [--below 1.5] [--min 1] [--profile]
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const FF = require('ffmpeg-static');
const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(`--${name}`) ? Number(args[args.indexOf(`--${name}`) + 1]) : fallback);
const clip = args.find((a, i) => !a.startsWith('--') && !['--below', '--min'].includes(args[i - 1]));
if (!clip) throw new Error('Usage: node scripts/video/motion.mjs <video> [--below 1.5] [--min 1] [--profile]');
const below = opt('below', 1.5);
const minSeconds = opt('min', 1);
const fps = Number(eval(execFileSync(require('@ffprobe-installer/ffprobe').path, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', clip]).toString().trim()));
const W = 192;
const H = 108;
const raw = execFileSync(FF, ['-v', 'error', '-i', clip, '-vf', `scale=${W}:${H},format=gray`, '-f', 'rawvideo', '-'], { maxBuffer: 1 << 30 });
const n = raw.length / (W * H);
const change = [0];
for (let f = 1; f < n; f++) {
  let sum = 0;
  for (let i = 0; i < W * H; i++) sum += Math.abs(raw[f * W * H + i] - raw[(f - 1) * W * H + i]);
  change.push(sum / (W * H));
}
if (args.includes('--profile')) {
  for (let f = 0; f < n; f += fps / 2) console.log(`${(f / fps).toFixed(2).padStart(6)} s  ${'#'.repeat(Math.round(change[f]))} ${change[f].toFixed(1)}`);
}
console.log(`${clip}: ${n} frames at ${fps} fps; still stretches (change under ${below} for at least ${minSeconds} s):`);
let from = -1;
for (let f = 1; f <= n; f++) {
  const still = f < n && change[f] < below;
  if (still && from < 0) from = f - 1;
  if (!still && from >= 0) {
    if ((f - from) / fps >= minSeconds) console.log(`  ${(from / fps).toFixed(2)} to ${(f / fps).toFixed(2)} s`);
    from = -1;
  }
}
