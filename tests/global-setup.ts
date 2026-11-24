// Before the browser tests: the solution and sustainability content as plain data (tests/tmp/content.json). The
// content files import photographs, which Playwright's loader cannot read, so esbuild bundles them with the images
// left out.
import fs from 'node:fs';
import { buildSync } from 'esbuild';
import { createRequire } from 'node:module';

export default function globalSetup() {
  const out = buildSync({
    stdin: { contents: "export { solutions, sections, moreKeys } from './src/content/solutions'; export { sustainability } from './src/content/sustainability';", resolveDir: process.cwd(), loader: 'ts' },
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    loader: { '.jpg': 'empty', '.jpeg': 'empty', '.png': 'empty', '.webp': 'empty' },
    logLevel: 'error',
  });
  const mod = { exports: {} as Record<string, unknown> };
  new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, createRequire(import.meta.url));
  fs.mkdirSync('tests/tmp', { recursive: true });
  fs.writeFileSync('tests/tmp/content.json', JSON.stringify(mod.exports));
}
