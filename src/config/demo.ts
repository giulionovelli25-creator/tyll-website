// The way into the interactive demo. Since 20 Nov 2026 the only demo link on the site is the homepage hero's
// "Watch it work", which opens the demo in the visitor's language (`?lang=`). The base address comes from
// PUBLIC_DEMO_URL (default https://demo.tyll.ai, `src/config/site.ts`).

import { site } from './site';
import type { Locale } from '../i18n/routes';

/** The demo in the visitor's language, or undefined while no public demo address is configured. */
export const demoHref = (lang: Locale, path = '/') => {
  if (!site.demoUrl) return undefined;
  const url = new URL(path, site.demoUrl);
  url.searchParams.set('lang', lang);
  return url.href;
};

/** Where each solution's "Try this in the demo →" opens (round 5, the owner's brief): the exact story in the demo. */
export const demoRoutes: Partial<Record<string, string>> = {
  stock: '/stock',
  expiry: '/stock?tab=expiry',
  waste: '/waste',
  forecasting: '/forecast',
  auto: '/forecast?tab=auto',
  deliveries: '/deliveries#notes',
  takes: '/stock?tab=takes',
  pour: '/drinks?open=empties',
  finance: '/money?tab=flags',
  groups: '/',
};
