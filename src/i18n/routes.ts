export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

/** The six solutions, in menu order. */
export const solutionKeys = ['stock', 'finance', 'forecasting', 'events', 'rooms', 'sales'] as const;
export type SolutionKey = (typeof solutionKeys)[number];

// Every page and its address in each language. The language switch uses this to land on the matching page.
export const pages = {
  home: { en: '/en/', de: '/de/' },
  solutions: { en: '/en/solutions/', de: '/de/loesungen/' },
  stock: { en: '/en/solutions/stock-waste/', de: '/de/loesungen/lager-abfall/' },
  finance: { en: '/en/solutions/finance-money/', de: '/de/loesungen/finanzen/' },
  forecasting: { en: '/en/solutions/forecasting-purchasing/', de: '/de/loesungen/prognose-einkauf/' },
  events: { en: '/en/solutions/events-staffing/', de: '/de/loesungen/events-personal/' },
  rooms: { en: '/en/solutions/rooms-guest-experience/', de: '/de/loesungen/zimmer-gaeste/' },
  sales: { en: '/en/solutions/sales-performance/', de: '/de/loesungen/vertrieb-performance/' },
  book: { en: '/en/book-a-call/', de: '/de/gespraech-buchen/' },
  faq: { en: '/en/faq/', de: '/de/faq/' },
  legal: { en: '/en/legal-notice/', de: '/de/impressum/' },
  privacy: { en: '/en/privacy/', de: '/de/datenschutz/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pages;

export const href = (page: PageKey, lang: Locale, hash = '') => pages[page][lang] + hash;

export const otherLocale = (lang: Locale): Locale => (lang === 'en' ? 'de' : 'en');

/** The last path segment of a solution page, used by the [slug] routes. */
export const slugOf = (key: SolutionKey, lang: Locale) => pages[key][lang].split('/').filter(Boolean).pop()!;
