import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { legalMissing } from '../config/legal';
import { pages, locales, solutionKeys, type PageKey } from '../i18n/routes';

// Legal pages stay out of the sitemap (and carry noindex) until their required details are filled in.
const listed: PageKey[] = ['home', 'solutions', ...solutionKeys, 'book', 'faq', ...(legalMissing().length ? [] : (['legal', 'privacy'] as const))];

export const GET: APIRoute = () => {
  const abs = (p: string) => new URL(p, site.url).href;
  const urls = listed.flatMap((key) =>
    locales.map((lang) => {
      const alternates = locales
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(pages[key][l])}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${abs(pages[key][lang])}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pages[key].en)}"/>\n  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
