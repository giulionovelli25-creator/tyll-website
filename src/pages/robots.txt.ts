import type { APIRoute } from 'astro';
import { site } from '../config/site';

// Preview and local builds ask crawlers to stay away entirely; production points them to the sitemap.
export const GET: APIRoute = () =>
  new Response(
    site.indexable
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
