// What Tyll sells today and what is still being built. The homepage's "Available now" and "What we're building
// next" sections, the Coming soon badges in the Solutions menu and on the All Solutions page, and the banner on the
// solution pages all read from here. Move a key from `comingSoon` to `available` when a product launches.
import type { SolutionKey } from '../i18n/routes';

/** Sold today, in the order the homepage shows them. Each links to its existing solution page. */
export const available = ['waste', 'stock', 'forecasting', 'revenue', 'finance', 'pour'] as const satisfies readonly SolutionKey[];

/** In development: shown with a "Coming soon" badge; their pages stay live with a banner. */
export const comingSoon: SolutionKey[] = [];

export const isComingSoon = (key: SolutionKey) => comingSoon.includes(key);
