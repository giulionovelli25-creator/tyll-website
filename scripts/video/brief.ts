// Reads video-brief.md, the one place the hotel film is described: its clips (name, file, length to generate, start
// frame, end frame, scene prompt), the edit (which frames of which clip, in order, and how each piece joins the next),
// the style line added to every prompt and the negative list. generate.ts and stitch.sh use it, so prompts, frame paths
// and cut points are never pasted by hand.
//
// Usage: node scripts/video/brief.ts [list | edit | json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Clip {
  /** A, A2, B, ... */
  name: string;
  title: string;
  /** the clip on disk, relative to the repository */
  file: string;
  /** seconds to generate */
  generate: number;
  start: string;
  end: string | null;
  /** the scene text; the style line and the negative list are added when it is sent (scenePrompt) */
  prompt: string;
}

export interface Piece {
  clip: string;
  file: string;
  /** first and last frame used, counted from 0 at 24 fps */
  from: number;
  to: number;
  /** luma levels added to every frame of this piece so it matches the piece before (video levels, 16 to 235) */
  match: number;
  /** frames this piece overlaps the next one by (a crossfade); 0 for the last piece */
  overlap: number;
}

export interface Brief {
  clips: Clip[];
  edit: Piece[];
  style: string;
  negative: string;
}

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const textBlock = (md: string) => md.match(/```text\n([\s\S]*?)\n```/)?.[1].trim() ?? '';
const section = (md: string, heading: string, level = '###') => {
  const found = md.match(new RegExp(`\\n${level} ${heading}\\n([\\s\\S]*?)(?=\\n#{2,${level.length}} |$)`));
  if (!found) throw new Error(`video-brief.md has no "${level} ${heading}" section`);
  return found[1];
};

/** The full prompt as sent to a model without a negative-prompt field: scene, style, then "Avoid: ..." */
export const scenePrompt = (brief: Brief, clip: Clip, withNegative = true) =>
  [clip.prompt, brief.style, withNegative ? `Avoid: ${brief.negative}` : ''].filter(Boolean).join(' ');

export function readBrief(file = path.join(root, 'video-brief.md')): Brief {
  const md = fs.readFileSync(file, 'utf8');
  const clips: Clip[] = [];
  for (const [, name, title, body] of section(md, 'The clips', '##').matchAll(/\n### ([A-Z]\d?) · ([^\n]+)\n([\s\S]*?)(?=\n#{2,3} |$)/g)) {
    const field = (label: string) => body.match(new RegExp(`^- ${label}: (.+)$`, 'm'))?.[1].trim();
    const quoted = (label: string) => field(label)?.match(/`([^`]+)`/)?.[1] ?? null;
    const generate = parseFloat(field('Generate') ?? '');
    const file = quoted('File');
    const start = quoted('Start frame');
    const prompt = textBlock(body);
    if (!file) throw new Error(`Clip ${name} in video-brief.md: no "File"`);
    if (!start) throw new Error(`Clip ${name} in video-brief.md: no start frame`);
    if (!Number.isFinite(generate)) throw new Error(`Clip ${name} in video-brief.md: no "Generate"`);
    if (!prompt) throw new Error(`Clip ${name} in video-brief.md: no prompt`);
    clips.push({ name, title: title.trim(), file, generate, start, end: quoted('End frame'), prompt });
  }
  if (!clips.length) throw new Error('video-brief.md lists no clips (### A · ...)');

  // The edit table: | Piece | Clip | Frames | Brightness match | Into the next |
  const edit: Piece[] = [];
  for (const line of section(md, 'The edit', '##').split('\n')) {
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 5 || !/^\d+$/.test(cells[0])) continue;
    const [, name, frames, match, into] = cells;
    const clip = clips.find((c) => c.name === name);
    if (!clip) throw new Error(`The edit in video-brief.md uses clip ${name}, which is not described under "The clips"`);
    const range = frames.match(/^(\d+)\s*[–-]\s*(\d+)$/);
    if (!range) throw new Error(`The edit in video-brief.md: "${frames}" is not a frame range like 0–37`);
    const levels = match ? Number(match.replace('+', '')) : 0;
    if (!Number.isInteger(levels)) throw new Error(`The edit in video-brief.md: brightness match "${match}" is not a whole number of levels`);
    edit.push({ clip: name, file: clip.file, from: Number(range[1]), to: Number(range[2]), match: levels, overlap: parseInt(into, 10) || 0 });
  }
  if (!edit.length) throw new Error('video-brief.md has no edit table under "## The edit"');
  return { clips, edit, style: textBlock(section(md, 'Style for every prompt')), negative: textBlock(section(md, 'Negative list')) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const brief = readBrief();
  const command = process.argv[2] ?? 'list';
  if (command === 'edit') {
    // One line per piece for stitch.sh: file from to overlap match
    for (const p of brief.edit) console.log([p.file, p.from, p.to, p.overlap, p.match].join(' '));
  } else if (command === 'json') console.log(JSON.stringify(brief, null, 2));
  else {
    for (const c of brief.clips) console.log(`${c.name.padEnd(3)} ${c.title}: generate ${c.generate} s, ${c.start} to ${c.end ?? 'no end frame'}`);
    let frames = 0;
    for (const p of brief.edit) frames += p.to - p.from + 1 - p.overlap;
    console.log(`edit: ${brief.edit.length} pieces, ${frames} frames, ${(frames / 24).toFixed(3)} s at 24 fps`);
  }
}
