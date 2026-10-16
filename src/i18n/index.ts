import en from './en';
import de from './de';
import ar from './ar';
import it from './it';
import type { Locale } from './routes';

export const dict = { en, de, ar, it } as const;
export const t = (lang: Locale) => dict[lang];

export * from './routes';
