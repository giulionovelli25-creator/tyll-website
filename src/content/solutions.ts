// The solution pages (round 4, 24 Nov 2026): the demo's nine, three per section (Stock and waste, Purchasing,
// Reconciliation), plus Revenue and reports and Suppliers, shown as "More in Tyll". Every page uses the same template: a
// question, one line, what you are about to see (three steps, which are also the film's chapters), the film and "Also
// in …", where the smaller features it took in are collapsed rows. The pages live in one file per section; this file
// holds the shape and the sections.

import type { ImageMetadata } from 'astro';
import type { Locale, SolutionKey } from '../i18n/routes';
import { stockWaste } from './solutions-stock';
import { purchasing } from './solutions-purchasing';
import { reconciliation } from './solutions-recon';
import { moreInTyll } from './solutions-more';

type Text = Record<Locale, string>;
export type Solution = {
  key: SolutionKey;
  icon: 'waste' | 'stock' | 'forecast' | 'revenue' | 'finance' | 'pour' | 'expiry' | 'takes' | 'auto' | 'orders' | 'suppliers' | 'deliveries' | 'cash' | 'cases' | 'reports';
  /** The colour of the solution's section in the product: Stock and waste teal, Purchasing blue, Reconciliation violet */
  tone: 'teal' | 'violet' | 'blue' | 'rose';
  /** The one word or phrase of the headline shown in that colour: an exact part of the headline in each language */
  mark: Text;
  /** The photograph beside the question, and where its subject sits */
  pagePhoto: ImageMetadata;
  pagePhotoFocus: string;
  /** The number or statement shown after the film, always text the site already has: one of the homepage's three
      numbers (`home.why.cards`), one of the hotel story's problems (`home.tour.steps`) or a FAQ answer (`faq`). */
  proof?: { kind: 'number'; card: 0 | 2 } | { kind: 'story'; step: 0 | 1 | 2 } | { kind: 'faq'; id: string };
  name: Text;
  /** The page's one line: under its name in the Solutions menu and on the Solutions page's card */
  menu: Text;
  headline: Text;
  intro: Text;
  /** "What you are about to see": three steps, in the film's order; their titles are the film's chapters */
  see: { title: Text; text: Text }[];
  /** "Also in …" under the film: usually one list of three to six points */
  more: { title?: Text; lead?: Text; points: Text[]; foot?: Text; next?: Text }[];
  /** Checks still being built, shown small and muted after "Also in …" */
  soon?: { lead: Text; items: Text[] };
  /** The photo card on the Solutions page: its photograph, where its subject sits, and the three points it opens to */
  photo: ImageMetadata;
  photoFocus: string;
  tilePoints: Text[];
  /** The smaller features this page took in, as collapsed rows under "Also in …". `id` is the row's anchor (old
      addresses redirect to it); `film` names its clip in public/media/film/<lang>/, loaded when the row opens. */
  rows?: { id: string; icon: Solution['icon']; film?: string; name: Text; line: Text; points: Text[]; next?: Text }[];
};

export const solutions: Record<SolutionKey, Solution> = { ...stockWaste, ...purchasing, ...reconciliation, ...moreInTyll };

const t = (en: string, de: string, ar: string, it: string): Text => ({ en, de, ar, it });

/** The three sections, as in the demo's menu. `id` is the anchor on the Solutions page; `keys` are its three pages in
    the demo's order, listed the same way in the Solutions menu and on the Solutions page. */
export const sections = [
  {
    id: 'stock-waste',
    name: t('Stock and waste', 'Bestand und Abfall', 'المخزون والهدر', 'Scorte e sprechi'),
    text: t('What you have, what expires and what goes in the bin.', 'Was Sie haben, was abläuft und was im Müll landet.', 'ما لديك، وما تنتهي صلاحيته، وما ينتهي في سلة المهملات.', 'Cosa hai, cosa scade e cosa finisce nel bidone.'),
    keys: ['stock', 'expiry', 'waste'],
  },
  {
    id: 'purchasing',
    name: t('Purchasing', 'Einkauf', 'المشتريات', 'Acquisti'),
    text: t('What to order, how it is sent and what arrives.', 'Was zu bestellen ist, wie es rausgeht und was ankommt.', 'ماذا تطلب، وكيف يُرسل، وماذا يصل.', 'Cosa ordinare, come parte e cosa arriva.'),
    keys: ['forecasting', 'auto', 'deliveries'],
  },
  {
    id: 'reconciliation',
    name: t('Reconciliation', 'Abgleich', 'المطابقة', 'Riconciliazione'),
    text: t('Where stock, drinks and money go missing.', 'Wo Ware, Getränke und Geld verloren gehen.', 'أين تُفقد البضائع والمشروبات والأموال.', 'Dove si perdono merce, bevande e denaro.'),
    keys: ['takes', 'pour', 'finance'],
  },
] as const satisfies readonly { id: string; name: Text; text: Text; keys: readonly SolutionKey[] }[];

export type SectionId = (typeof sections)[number]['id'];
/** The section a page belongs to; Revenue and reports and Suppliers belong to none ("More in Tyll"). */
export const sectionOf = (key: SolutionKey) => sections.find((s) => (s.keys as readonly SolutionKey[]).includes(key));
/** The pages outside the nine, linked as "More in Tyll" under the Solutions cards and in the footer. */
export const moreKeys = ['revenue', 'suppliers'] as const satisfies readonly SolutionKey[];
