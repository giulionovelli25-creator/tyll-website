// Where each solution page's "Try … in the Demo" button leads inside the interactive demo.
// These are real routes in the demo (github.com/giulionovelli25-creator/Demo-Tyll, checked 15 Oct 2026).
// The demo keeps the requested page through sign-in (/login?next=…), so a visitor lands on the right screen
// after choosing a demo person. If the person's role cannot open that area, the demo shows their home page.
// Change a path here if the demo's routes change. The base address comes from PUBLIC_DEMO_URL.

import { site } from './site';
import type { SolutionKey } from '../i18n/routes';

export const demoPaths: Record<SolutionKey, string> = {
  stock: '/stock?tab=where',
  finance: '/money',
  forecasting: '/forecast?tab=buy',
  events: '/events',
  rooms: '/rooms?tab=readiness',
  sales: '/events?tab=opportunities',
};

/** Full demo link for a solution, or undefined while no public demo address is configured. */
export const demoLink = (key: SolutionKey) => (site.demoUrl ? new URL(demoPaths[key], site.demoUrl).href : undefined);
