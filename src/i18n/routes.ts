export const locales = ['en', 'de', 'ar', 'it'] as const;
export type Locale = (typeof locales)[number];

/** The six solutions, in menu order. */
export const solutionKeys = ['stock', 'finance', 'forecasting', 'events', 'rooms', 'sales'] as const;
export type SolutionKey = (typeof solutionKeys)[number];

// Every page and its address in each language. The language switch uses this to land on the matching page.
export const pages = {
  home: { en: '/en/', de: '/de/', ar: '/ar/', it: '/it/' },
  solutions: { en: '/en/solutions/', de: '/de/loesungen/', ar: '/ar/solutions/', it: '/it/soluzioni/' },
  stock: { en: '/en/solutions/stock-waste/', de: '/de/loesungen/lager-abfall/', ar: '/ar/solutions/stock-waste/', it: '/it/soluzioni/magazzino-sprechi/' },
  finance: { en: '/en/solutions/finance-money/', de: '/de/loesungen/finanzen/', ar: '/ar/solutions/finance-money/', it: '/it/soluzioni/finanza/' },
  forecasting: { en: '/en/solutions/forecasting-purchasing/', de: '/de/loesungen/prognose-einkauf/', ar: '/ar/solutions/forecasting-purchasing/', it: '/it/soluzioni/previsioni-acquisti/' },
  events: { en: '/en/solutions/events-staffing/', de: '/de/loesungen/events-personal/', ar: '/ar/solutions/events-staffing/', it: '/it/soluzioni/eventi-personale/' },
  rooms: { en: '/en/solutions/rooms-guest-experience/', de: '/de/loesungen/zimmer-gaeste/', ar: '/ar/solutions/rooms-guest-experience/', it: '/it/soluzioni/camere-ospiti/' },
  sales: { en: '/en/solutions/sales-performance/', de: '/de/loesungen/vertrieb-performance/', ar: '/ar/solutions/sales-performance/', it: '/it/soluzioni/vendite-performance/' },
  book: { en: '/en/book-a-call/', de: '/de/gespraech-buchen/', ar: '/ar/book-a-call/', it: '/it/prenota-una-chiamata/' },
  faq: { en: '/en/faq/', de: '/de/faq/', ar: '/ar/faq/', it: '/it/faq/' },
  legal: { en: '/en/legal-notice/', de: '/de/impressum/', ar: '/ar/legal-notice/', it: '/it/note-legali/' },
  privacy: { en: '/en/privacy/', de: '/de/datenschutz/', ar: '/ar/privacy/', it: '/it/privacy/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pages;

export const href = (page: PageKey, lang: Locale, hash = '') => pages[page][lang] + hash;

/** Right-to-left languages. */
export const isRtl = (lang: Locale) => lang === 'ar';
export const dirOf = (lang: Locale) => (isRtl(lang) ? 'rtl' : 'ltr');

/** Locale tags for dates, Open Graph and structured data. */
export const intlLocale: Record<Locale, string> = { en: 'en-GB', de: 'de-DE', ar: 'ar-AE-u-nu-latn', it: 'it-IT' };
export const ogLocale: Record<Locale, string> = { en: 'en_GB', de: 'de_DE', ar: 'ar_AE', it: 'it_IT' };

/** The last path segment of a solution page, used by the [slug] routes. */
export const slugOf = (key: SolutionKey, lang: Locale) => pages[key][lang].split('/').filter(Boolean).pop()!;
