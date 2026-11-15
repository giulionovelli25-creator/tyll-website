import type { APIRoute } from 'astro';
import { site } from '../config/site';

// Search and AI answer crawlers named explicitly, so each one finds its own allow group.
const crawlers = ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Bingbot'];

// Preview and local builds ask crawlers to stay away entirely; production points them to the sitemap.
export const GET: APIRoute = () =>
  new Response(
    site.indexable
      ? `User-agent: *\nAllow: /\n\n${crawlers.map((c) => `User-agent: ${c}\nAllow: /\n`).join('\n')}\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
