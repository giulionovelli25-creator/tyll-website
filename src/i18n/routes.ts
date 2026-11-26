export const locales = ['en', 'de', 'ar', 'it'] as const;
export type Locale = (typeof locales)[number];

/** The solution pages (round 4, 24 Nov 2026): the demo's nine, three per section (Stock and waste, Purchasing,
    Reconciliation), then Revenue and reports and Suppliers, which are shown as "More in Tyll" and not in the menu. */
export const solutionKeys = ['stock', 'expiry', 'waste', 'forecasting', 'auto', 'deliveries', 'takes', 'pour', 'finance', 'revenue', 'suppliers'] as const;
export type SolutionKey = (typeof solutionKeys)[number];

// Every page and its address in each language. The language switch uses this to land on the matching page.
export const pages = {
  home: { en: '/en/', de: '/de/', ar: '/ar/', it: '/it/' },
  solutions: { en: '/en/solutions/', de: '/de/loesungen/', ar: '/ar/solutions/', it: '/it/soluzioni/' },
  how: { en: '/en/how-it-works/', de: '/de/so-funktionierts/', ar: '/ar/how-it-works/', it: '/it/come-funziona/' },
  sustainability: { en: '/en/sustainability/', de: '/de/nachhaltigkeit/', ar: '/ar/sustainability/', it: '/it/sostenibilita/' },
  // Round 5 (25 Nov 2026): our story, and how Tyll treats your data
  about: { en: '/en/about/', de: '/de/ueber-uns/', ar: '/ar/about/', it: '/it/chi-siamo/' },
  security: { en: '/en/security/', de: '/de/sicherheit/', ar: '/ar/security/', it: '/it/sicurezza/' },
  groups: { en: '/en/hotel-groups/', de: '/de/hotelgruppen/', ar: '/ar/hotel-groups/', it: '/it/gruppi-alberghieri/' },
  waste: { en: '/en/solutions/log-waste/', de: '/de/loesungen/abfall-erfassen/', ar: '/ar/solutions/log-waste/', it: '/it/soluzioni/registra-sprechi/' },
  revenue: { en: '/en/solutions/revenue/', de: '/de/loesungen/umsatz/', ar: '/ar/solutions/revenue/', it: '/it/soluzioni/ricavi/' },
  stock: { en: '/en/solutions/stock-waste/', de: '/de/loesungen/lager-abfall/', ar: '/ar/solutions/stock-waste/', it: '/it/soluzioni/magazzino-sprechi/' },
  finance: { en: '/en/solutions/finance-money/', de: '/de/loesungen/finanzen/', ar: '/ar/solutions/finance-money/', it: '/it/soluzioni/finanza/' },
  forecasting: { en: '/en/solutions/forecasting-purchasing/', de: '/de/loesungen/prognose-einkauf/', ar: '/ar/solutions/forecasting-purchasing/', it: '/it/soluzioni/previsioni-acquisti/' },
  takes: { en: '/en/solutions/stock-takes/', de: '/de/loesungen/inventuren/', ar: '/ar/solutions/stock-takes/', it: '/it/soluzioni/inventari/' },
  auto: { en: '/en/solutions/automatic-ordering/', de: '/de/loesungen/automatische-bestellung/', ar: '/ar/solutions/automatic-ordering/', it: '/it/soluzioni/ordini-automatici/' },
  suppliers: { en: '/en/solutions/suppliers/', de: '/de/loesungen/lieferanten/', ar: '/ar/solutions/suppliers/', it: '/it/soluzioni/fornitori/' },
  expiry: { en: '/en/solutions/expiring-soon/', de: '/de/loesungen/laeuft-bald-ab/', ar: '/ar/solutions/expiring-soon/', it: '/it/soluzioni/in-scadenza/' },
  pour: { en: '/en/solutions/pour-control/', de: '/de/loesungen/pour-control/', ar: '/ar/solutions/pour-control/', it: '/it/soluzioni/pour-control/' },
  deliveries: { en: '/en/solutions/deliveries-invoices/', de: '/de/loesungen/lieferungen-rechnungen/', ar: '/ar/solutions/deliveries-invoices/', it: '/it/soluzioni/consegne-fatture/' },
  book: { en: '/en/book-a-call/', de: '/de/gespraech-buchen/', ar: '/ar/book-a-call/', it: '/it/prenota-una-chiamata/' },
  faq: { en: '/en/faq/', de: '/de/faq/', ar: '/ar/faq/', it: '/it/faq/' },
  legal: { en: '/en/legal-notice/', de: '/de/impressum/', ar: '/ar/legal-notice/', it: '/it/note-legali/' },
  privacy: { en: '/en/privacy/', de: '/de/datenschutz/', ar: '/ar/privacy/', it: '/it/privacy/' },
} as const satisfies Record<string, Record<Locale, string>>;

/** Pages folded into others: their old addresses open the page that took them in, at the row that holds them
    (`[slug].astro` writes a small redirect page for each). Expiring soon and Over pouring are pages again (round 4). */
export const legacy = {
  orders: { to: 'auto', anchor: 'approvals', from: { en: '/en/solutions/orders-approvals/', de: '/de/loesungen/bestellungen-freigaben/', ar: '/ar/solutions/orders-approvals/', it: '/it/soluzioni/ordini-approvazioni/' } },
  reports: { to: 'revenue', anchor: 'reports', from: { en: '/en/solutions/reports/', de: '/de/loesungen/berichte/', ar: '/ar/solutions/reports/', it: '/it/soluzioni/report/' } },
  cash: { to: 'finance', anchor: 'cash', from: { en: '/en/solutions/cash/', de: '/de/loesungen/bargeld/', ar: '/ar/solutions/cash/', it: '/it/soluzioni/contanti/' } },
  cases: { to: 'finance', anchor: 'cases', from: { en: '/en/solutions/money-back-list/', de: '/de/loesungen/rueckholliste/', ar: '/ar/solutions/money-back-list/', it: '/it/soluzioni/lista-recuperi/' } },
} as const;

export type PageKey = keyof typeof pages;

/** Pages that exist in only some languages. Every other page exists in all four. */
const partial: Partial<Record<PageKey, readonly Locale[]>> = {};
export const langsOf = (page: PageKey): readonly Locale[] => partial[page] ?? locales;

export const href = (page: PageKey, lang: Locale, hash = '') => pages[page][lang] + hash;

/** Right-to-left languages. */
export const isRtl = (lang: Locale) => lang === 'ar';
export const dirOf = (lang: Locale) => (isRtl(lang) ? 'rtl' : 'ltr');

/** Locale tags for dates, Open Graph and structured data. */
export const intlLocale: Record<Locale, string> = { en: 'en-GB', de: 'de-DE', ar: 'ar-AE-u-nu-latn', it: 'it-IT' };
export const ogLocale: Record<Locale, string> = { en: 'en_GB', de: 'de_DE', ar: 'ar_AE', it: 'it_IT' };

/** The last path segment of a solution page, used by the [slug] routes. */
export const slugOf = (key: SolutionKey, lang: Locale) => pages[key][lang].split('/').filter(Boolean).pop()!;
