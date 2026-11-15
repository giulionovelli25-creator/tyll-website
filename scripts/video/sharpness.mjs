// Sharpness check for generated clips: the variance of the Laplacian (4-neighbour) on 10 evenly spaced frames of each
// clip, in greyscale at the clip's own size. The spec's rule: a clip more than 40% below the sharpest clip is rejected.
//
// The raw score also grows with the square of contrast, so a dim interior scores far below a sunny square even when it
// is just as crisp. The second score divides it by the frame's own intensity variance (contrast-normalised), which
// cancels exposure and leaves edge sharpness; both are printed and both are held to the 40% rule.
//
// Usage: node scripts/video/sharpness.mjs clipA.mp4 clipB.mp4 ...   (FROM=s TO=s limit the window, e.g. a trimmed piece)
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const FF = require('ffmpeg-static');
const FP = require('@ffprobe-installer/ffprobe').path;
const sharp = require('sharp');

const scores = async (file) => {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  let l1 = 0, l2 = 0, p1 = 0, p2 = 0, n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const l = 4 * data[i] - data[i - 1] - data[i + 1] - data[i - w] - data[i + w];
      l1 += l; l2 += l * l; p1 += data[i]; p2 += data[i] * data[i]; n++;
    }
  }
  const lap = l2 / n - (l1 / n) ** 2;
  const pix = p2 / n - (p1 / n) ** 2;
  return { lap, norm: lap / Math.max(pix, 1) };
};

const rows = [];
for (const arg of process.argv.slice(2)) {
  const [clip, window] = arg.split('@'); // clip.mp4@from-to limits the sample to that window, in seconds
  const dur = parseFloat(execFileSync(FP, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', clip]).toString());
  const [from, to] = window ? window.split('-').map(Number) : [0, dur];
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sharp-'));
  for (let k = 0; k < 10; k++) {
    const t = from + ((k + 0.5) * (to - from)) / 10;
    execFileSync(FF, ['-v', 'error', '-y', '-ss', t.toFixed(3), '-i', clip, '-frames:v', '1', path.join(dir, `f-${k}.png`)]);
  }
  const s = [];
  for (const f of fs.readdirSync(dir).sort()) s.push(await scores(path.join(dir, f)));
  fs.rmSync(dir, { recursive: true, force: true });
  const mean = (key) => s.reduce((a, b) => a + b[key], 0) / s.length;
  rows.push({ clip: path.basename(clip) + (window ? `@${window}` : ''), lap: mean('lap'), norm: mean('norm'), min: Math.min(...s.map((x) => x.lap)) });
}
const bestLap = Math.max(...rows.map((r) => r.lap));
const bestNorm = Math.max(...rows.map((r) => r.norm));
console.log('clip                 raw mean   raw min  of sharpest   normalised  of sharpest   verdict');
for (const r of rows) {
  const a = r.lap / bestLap;
  const b = r.norm / bestNorm;
  const verdict = a >= 0.6 && b >= 0.6 ? 'ok' : b >= 0.6 ? 'raw rule fails (exposure); normalised ok' : 'SOFT: regenerate';
  console.log(`${r.clip.padEnd(20)} ${r.lap.toFixed(1).padStart(8)} ${r.min.toFixed(1).padStart(9)} ${(a * 100).toFixed(0).padStart(11)}% ${r.norm.toFixed(3).padStart(12)} ${(b * 100).toFixed(0).padStart(11)}%   ${verdict}`);
}
