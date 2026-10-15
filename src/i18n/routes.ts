export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

// Every page and its address in each language. The language switch uses this to land on the matching page.
export const pages = {
  home: { en: '/en/', de: '/de/' },
  book: { en: '/en/book-a-call/', de: '/de/gespraech-buchen/' },
  faq: { en: '/en/faq/', de: '/de/faq/' },
  legal: { en: '/en/legal-notice/', de: '/de/impressum/' },
  privacy: { en: '/en/privacy/', de: '/de/datenschutz/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof pages;

export const href = (page: PageKey, lang: Locale, hash = '') => pages[page][lang] + hash;

export const otherLocale = (lang: Locale): Locale => (lang === 'en' ? 'de' : 'en');
