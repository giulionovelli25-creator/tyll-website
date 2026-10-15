import en from './en';
import de from './de';
import type { Locale } from './routes';

export const dict = { en, de } as const;
export const t = (lang: Locale) => dict[lang];

export * from './routes';
