// Turns the recordings in tests/tmp/film4/<lang>/*.webm into the site's films (round 4, 24 Nov 2026):
// public/media/film/<lang>/<clip>-<mode>.mp4 (H.264, no audio, fast start, under about 3 MB) and a poster .jpg taken
// at 2 s, then writes the main films' chapter times into src/content/film.json. A main film longer than 20 s is played
// a little faster to fit 19.5 s, a row clip longer than 10.5 s to fit 10 s; the chapter times follow.
//   node scripts/film/encode4.mjs [lang ...]
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const FF = process.env.FF ?? '/Users/fynnkopitz/bin/ffmpeg';
const SRC = 'tests/tmp/film4';
const DST = 'public/media/film';
const MAX = 3 * 1024 * 1024;
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ['en', 'de', 'it', 'ar'];
const MAIN = ['stock', 'expiry', 'waste', 'forecasting', 'auto', 'deliveries', 'takes', 'pour', 'finance'];

const run = (args) => execFileSync(FF, ['-loglevel', 'error', '-y', ...args]);
const chaptersOf = (lang, mode) => {
  const f = `${SRC}/chapters-${lang}-${mode}.json`;
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
};
/** How much faster a clip plays: 1, or enough to bring it to its longest length */
const speedOf = (key, dur) => {
  if (!dur) return 1;
  const [limit, target] = MAIN.includes(key) || key === 'revenue' || key === 'suppliers' ? [20, 19.5] : [10.5, 10];
  return dur > limit ? dur / target : 1;
};
const timed = {};
for (const lang of langs) {
  const dir = `${SRC}/${lang}`;
  if (!fs.existsSync(dir)) continue;
  fs.mkdirSync(`${DST}/${lang}`, { recursive: true });
  // desk only: the demo is desktop only, so the site never shows it in a phone layout
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('-desk.webm'))) {
    const base = f.replace(/\.webm$/, '');
    const phone = base.endsWith('-phone');
    const out = `${DST}/${lang}/${base}.mp4`;
    // desk at 1440 wide; phone at 1.5× its 390 px width, sharp enough and small
    const mode = phone ? 'phone' : 'desk';
    const key = base.replace(/-(desk|phone)$/, '');
    const ch = chaptersOf(lang, mode)[key];
    const speed = speedOf(key, ch?.dur);
    if (ch) ((timed[lang] ??= {})[mode] ??= {})[key] = { marks: ch.marks.map((m) => +(m / speed).toFixed(1)), dur: +(ch.dur / speed).toFixed(1) };
    // JSON_ONLY=1 only rewrites film.json (after encoding the languages side by side)
    if (process.env.JSON_ONLY) continue;
    const vf = `${speed > 1 ? `setpts=PTS/${speed.toFixed(4)},` : ''}${phone ? 'scale=586:-2' : 'scale=1440:-2'}`;
    for (const crf of [30, 33, 36]) {
      run(['-i', `${dir}/${f}`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-r', '25', '-vf', vf, '-movflags', '+faststart', out]);
      if (fs.statSync(out).size <= MAX) break;
    }
    run(['-ss', '2', '-i', out, '-frames:v', '1', '-q:v', '4', `${DST}/${lang}/${base}.jpg`]);
    console.log(lang, base, (ch ? (ch.dur / speed).toFixed(1) + ' s, ' : '') + (fs.statSync(out).size / 1048576).toFixed(2) + ' MB');
  }
}

// chapter times of the main films, per language and mode
const film = fs.existsSync('src/content/film.json') ? JSON.parse(fs.readFileSync('src/content/film.json', 'utf8')) : {};
for (const lang of langs) {
  const next = {};
  const ch = timed[lang]?.desk ?? {};
  for (const k of [...MAIN, 'revenue', 'suppliers']) if (ch[k]) next[k] = { desk: ch[k] };
  if (Object.keys(next).length) film[lang] = { ...Object.fromEntries(Object.entries(film[lang] ?? {}).map(([k, v]) => [k, { desk: v.desk }])), ...next };
}
fs.writeFileSync('src/content/film.json', JSON.stringify(film, null, 1) + '\n');
console.log('film.json written for', langs.join(', '));
