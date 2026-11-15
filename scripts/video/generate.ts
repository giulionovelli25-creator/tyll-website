// Generates one clip of the hotel film with fal.ai, by its REST API. Its scene prompt (with the style line and, for a
// model without a negative-prompt field, "Avoid: " and the negative list added, exactly as the film's clips were sent),
// start frame, end frame and length come from video-brief.md; the fal key comes from .env.local (FAL_KEY=...) and is
// never printed. The request goes to fal's queue; the script polls until the clip is done and saves it where the brief
// says (assets/video/raw/city/<clip>.mp4), with a .json beside it recording what was asked (never the key). An earlier
// take of the same clip is kept, renamed <clip>.take-<time>.mp4, so one bad clip can be redone without touching the
// others. (The film of 8 Nov 2026 was made through the fal MCP instead, with the same inputs; scripts/video/README.md.)
//
// Usage: node scripts/video/generate.ts <clip> [--model kling-o3|kling|veo|hailuo] [--endpoint <fal model id>] [--dry-run]
//   --dry-run  prints the request it would send (images shortened) and spends nothing
// Every real run is paid on fal: check the model's price first (scripts/video/README.md).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { readBrief, root, scenePrompt } from './brief.ts';

// Problems with a fix (a missing keyframe, an unknown segment or model) are thrown as errors: print only the message
process.on('uncaughtException', (e) => {
  console.error(e.message);
  process.exit(1);
});

interface Model {
  endpoint: string;
  start: string;
  end?: string;
  negative?: string;
  duration: (seconds: number) => string;
  extra?: Record<string, unknown>;
}

// fal model ids and their input field names. Confirm them after signing in to fal (its get_model_schema tool, or the
// model's API page) and edit here if fal has renamed anything; the script also checks the model's published schema
// before it spends anything and stops if a field is missing.
const MODELS: Record<string, Model> = {
  // The film of 8 Nov 2026 was made with this one: start and end frame, 3 to 15 s, $0.14 a second, no negative prompt
  'kling-o3': {
    endpoint: 'fal-ai/kling-video/o3/pro/image-to-video',
    start: 'image_url',
    end: 'end_image_url',
    duration: (s) => String(Math.min(15, Math.max(3, Math.round(s)))),
    extra: { generate_audio: false, shot_type: 'customize' },
  },
  kling: {
    endpoint: 'fal-ai/kling-video/v2.1/pro/image-to-video',
    start: 'image_url',
    end: 'tail_image_url',
    negative: 'negative_prompt',
    duration: (s) => (s <= 5 ? '5' : '10'),
    extra: { cfg_scale: 0.5 },
  },
  veo: {
    endpoint: 'fal-ai/veo3.1/first-last-frame-to-video',
    start: 'first_frame_url',
    end: 'last_frame_url',
    negative: 'negative_prompt',
    duration: () => '8s',
    extra: { resolution: '1080p', generate_audio: false, aspect_ratio: '16:9' },
  },
  hailuo: {
    endpoint: 'fal-ai/minimax/hailuo-02/pro/image-to-video',
    start: 'image_url',
    end: 'end_image_url',
    duration: (s) => (s <= 6 ? '6' : '10'),
    extra: { prompt_optimizer: false },
  },
};

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = args.includes('--dry-run');
const clipName = args.find((a, i) => !a.startsWith('--') && !['--model', '--endpoint'].includes(args[i - 1] ?? ''));
const brief = readBrief();
const clip = brief.clips.find((c) => c.name === clipName);
if (!clip) throw new Error(`Usage: node scripts/video/generate.ts <clip> [--model kling-o3|kling|veo|hailuo] [--dry-run]. Clips: ${brief.clips.map((c) => c.name).join(', ')}`);
const modelName = flag('model') ?? 'kling-o3';
const preset = MODELS[modelName];
if (!preset) throw new Error(`Unknown model "${modelName}": ${Object.keys(MODELS).join(', ')}`);
const model: Model = { ...preset, endpoint: flag('endpoint') ?? preset.endpoint };

// A keyframe as a data URI: 1920 x 1080 JPEG, so the request stays a few MB
const dataUri = async (file: string) => {
  const abs = path.resolve(root, file);
  if (!fs.existsSync(abs)) throw new Error(`Missing keyframe ${file}: video-brief.md, Keyframes, says how to make it.`);
  const jpeg = await sharp(abs).resize(1920, 1080, { fit: 'cover' }).jpeg({ quality: 92 }).toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
};

const input: Record<string, unknown> = {
  prompt: scenePrompt(brief, clip, !model.negative),
  [model.start]: await dataUri(clip.start),
  duration: model.duration(clip.generate),
  ...model.extra,
};
if (clip.end && model.end) input[model.end] = await dataUri(clip.end);
if (model.negative) input[model.negative] = brief.negative;
const shown = Object.fromEntries(Object.entries(input).map(([k, v]) => [k, typeof v === 'string' && v.startsWith('data:') ? `${v.slice(0, 40)}… (${Math.round(v.length / 1024)} KB)` : v]));

console.log(`${clip.name} · ${clip.title}: ${clip.generate} s on ${model.endpoint}`);
if (clip.end && !model.end) console.log(`Note: ${modelName} takes no end frame here, so the clip will not land exactly on ${clip.end}.`);
if (dryRun) {
  console.log(JSON.stringify(shown, null, 2));
  console.log('Dry run: nothing sent, nothing spent.');
  process.exit(0);
}

// The fal key: .env.local or the environment, never printed
const env: Record<string, string> = {};
const envFile = path.join(root, '.env.local');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}
const key = process.env.FAL_KEY || env.FAL_KEY;
if (!key) {
  console.error('No fal key. Create one at fal.ai (Dashboard, Keys) and put FAL_KEY=... in .env.local; never paste it in a chat.');
  process.exit(1);
}

// Before spending: the model's published input fields must include every field this request uses
try {
  const spec = await (await fetch(`https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=${encodeURIComponent(model.endpoint)}`)).json();
  const schemas: Record<string, { properties?: Record<string, unknown> }> = spec?.components?.schemas ?? {};
  const inputSchema = Object.entries(schemas).find(([name]) => /Input$/.test(name))?.[1];
  const known = Object.keys(inputSchema?.properties ?? {});
  const unknown = Object.keys(input).filter((k) => known.length && !known.includes(k));
  if (unknown.length) {
    console.error(`${model.endpoint} does not take: ${unknown.join(', ')}. It takes: ${known.join(', ')}. Edit MODELS in this script.`);
    process.exit(1);
  }
  if (!known.length) console.log('Could not read the model schema; sending anyway, fal will refuse a malformed request before charging.');
} catch {
  console.log('Could not read the model schema; sending anyway, fal will refuse a malformed request before charging.');
}

const headers = { Authorization: `Key ${key}`, 'Content-Type': 'application/json' };
const started = Date.now();
const submitted = await fetch(`https://queue.fal.run/${model.endpoint}`, { method: 'POST', headers, body: JSON.stringify(input) });
if (!submitted.ok) {
  console.error(`fal refused the request (${submitted.status}): ${(await submitted.text()).slice(0, 600)}`);
  process.exit(1);
}
const job = (await submitted.json()) as { request_id: string; status_url: string; response_url: string };
console.log(`Queued: request ${job.request_id}`);
for (;;) {
  await new Promise((r) => setTimeout(r, 5000));
  const status = (await (await fetch(job.status_url, { headers })).json()) as { status: string; queue_position?: number };
  process.stdout.write(`\r${status.status}${status.queue_position != null ? `, queue position ${status.queue_position}` : ''}, ${Math.round((Date.now() - started) / 1000)} s     `);
  if (status.status === 'COMPLETED') break;
  if (Date.now() - started > 30 * 60 * 1000) throw new Error(`Gave up after 30 minutes; fal request ${job.request_id}`);
}
process.stdout.write('\n');
const result = await fetch(job.response_url, { headers });
if (!result.ok) {
  console.error(`fal could not make the clip (${result.status}): ${(await result.text()).slice(0, 600)}`);
  process.exit(1);
}
const output = (await result.json()) as { video?: { url?: string }; videos?: { url?: string }[] };
const url = output.video?.url ?? output.videos?.[0]?.url;
if (!url) throw new Error(`No video in fal's answer: ${JSON.stringify(output).slice(0, 400)}`);
const video = Buffer.from(await (await fetch(url)).arrayBuffer());

const target = path.join(root, clip.file);
const rawDir = path.dirname(target);
fs.mkdirSync(rawDir, { recursive: true });
if (fs.existsSync(target)) {
  const stamp = new Date(fs.statSync(target).mtime).toISOString().replace(/[:.]/g, '-');
  fs.renameSync(target, path.join(rawDir, `${clip.name}.take-${stamp}.mp4`));
  if (fs.existsSync(target.replace(/\.mp4$/, '.json'))) fs.renameSync(target.replace(/\.mp4$/, '.json'), path.join(rawDir, `${clip.name}.take-${stamp}.json`));
}
fs.writeFileSync(target, video);
fs.writeFileSync(
  target.replace(/\.mp4$/, '.json'),
  JSON.stringify({ clip: clip.name, title: clip.title, model: modelName, endpoint: model.endpoint, request: job.request_id, input: shown, seconds: Math.round((Date.now() - started) / 1000), made: new Date().toISOString() }, null, 2),
);
console.log(`Saved ${path.relative(root, target)} (${(video.length / 1048576).toFixed(1)} MB) in ${Math.round((Date.now() - started) / 1000)} s. The price is on fal's dashboard under request ${job.request_id}.`);
