// Legal details for the Legal Notice and Privacy pages: the ONE place for the operators' names and address.
// Nothing here may be guessed. Each TODO stays empty (null or []) until the owner supplies it. While any TODO is
// open, the legal pages show a "not complete yet" box, are left out of the sitemap, carry noindex, and the build
// prints a loud warning; the missing values themselves are simply not shown (no placeholder text is published).
//
// Tyll is not a registered company yet. The site is operated by the founders as private persons, so the Legal
// Notice (§ 5 DDG) names them and a postal address where they can receive mail. The fields that only apply to a
// registered company (legal form, legal representative, commercial register court and number, VAT ID) were
// removed on 31 Oct 2026; they come back here, and on the Legal Notice, once the company is registered.

import { site } from './site';
import type { Locale } from '../i18n/routes';

type Text = Record<Locale, string>;

export const legal = {
  /** Full names of the founders who operate the site, as private persons (owner, 31 Oct 2026). */
  operators: ['Giulio Novelli', 'Pawel Gruca', 'Fynn Kopitz', 'Besher Asfari'] as string[],
  /**
   * Postal address where the operators can receive mail, one line per entry. For now the owner chose CODE University
   * of Applied Sciences in Berlin (address from the imprint on code.berlin, checked 31 Oct 2026). Replace it with the
   * operators' own address as soon as possible: mail sent here must actually reach them.
   */
  address: ['c/o CODE University of Applied Sciences', 'Donaustraße 44', '12043 Berlin', 'Germany'] as string[] | null,
  /** Person responsible for editorial content under § 18 (2) MStV (owner, 31 Oct 2026). Their address is the one above. */
  contentResponsible: 'Giulio Novelli' as string | null,
  email: site.email,
  /** Optional phone number. */
  phone: null as string | null,

  /**
   * Hosting provider. Railway Corporation's address is from its Data Processing Addendum (railway.com/legal/dpa,
   * Exhibit B), checked 31 Oct 2026. Its DPA bases EU transfers to the US on the EU-U.S. Data Privacy Framework
   * where the recipient is certified, otherwise on the EU standard contractual clauses (Decision 2021/914);
   * Railway was not found on the Data Privacy Framework list, so the policy names the standard contractual clauses.
   * The DPA must be accepted in the Railway dashboard (DocuSign form linked from the DPA).
   */
  hosting: {
    name: 'Railway Corporation',
    address: '548 Market St PMB 68956, San Francisco, CA 94104, USA',
    /** The Railway service runs in the "US West" region; set to true if it moves to an EU region (EU West, Amsterdam). */
    euRegion: false,
  },
  /** How long booking enquiries and emails are kept (owner, 31 Oct 2026: 12 months after the last contact). */
  enquiryRetention: {
    en: 'We delete your enquiry and our correspondence 12 months after our last contact, unless the law requires us to keep it longer.',
    de: 'Wir löschen Ihre Anfrage und unsere Korrespondenz 12 Monate nach unserem letzten Kontakt, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
    ar: 'نحذف استفسارك ومراسلاتنا بعد 12 شهرًا من آخر تواصل بيننا، ما لم يُلزمنا القانون بالاحتفاظ بها مدة أطول.',
    it: 'Cancelliamo la tua richiesta e la nostra corrispondenza 12 mesi dopo il nostro ultimo contatto, salvo che la legge ci imponga di conservarle più a lungo.',
  } as Text | null,
  /** Date of the current version of the legal pages: the day the site was built and deployed. */
  updated: import.meta.env.BUILD_DATE as string,
};

/** The operators' names as one phrase in the page language ("A and B"), or undefined while the TODO is open. */
export function operatorNames(lang: Locale): string | undefined {
  const names = legal.operators;
  if (!names.length) return undefined;
  const and = { en: ' and ', de: ' und ', ar: ' و', it: ' e ' }[lang];
  return names.length > 1 ? `${names.slice(0, -1).join(', ')}${and}${names.at(-1)}` : names[0];
}

export type MissingItem = { key: string } & Text;

/** Required details that are still missing (the open TODOs above). */
export function legalMissing(): MissingItem[] {
  const m: MissingItem[] = [];
  if (!legal.operators.length)
    m.push({ key: 'operators', en: 'Full names of the founders who operate the site', de: 'Vollständige Namen der Gründer, die die Website betreiben', ar: 'الأسماء الكاملة للمؤسسين الذين يشغّلون الموقع', it: 'Nomi completi dei fondatori che gestiscono il sito' });
  if (!legal.address?.length) m.push({ key: 'address', en: 'Postal address where the operators can receive mail', de: 'Ladungsfähige Anschrift der Betreiber', ar: 'العنوان البريدي الذي يتلقى فيه المشغّلون البريد', it: 'Indirizzo postale presso cui i gestori ricevono la posta' });
  if (!legal.contentResponsible)
    m.push({ key: 'contentResponsible', en: 'Person responsible for content under § 18 (2) MStV', de: 'Verantwortliche Person nach § 18 Abs. 2 MStV', ar: 'الشخص المسؤول عن المحتوى بموجب المادة 18 (2) من MStV', it: 'Persona responsabile dei contenuti ai sensi del § 18 (2) MStV' });
  if (!legal.enquiryRetention)
    m.push({ key: 'retention', en: 'How long booking enquiries and emails are kept', de: 'Wie lange Terminanfragen und E-Mails gespeichert werden', ar: 'مدة الاحتفاظ بطلبات الحجز ورسائل البريد الإلكتروني', it: 'Per quanto tempo vengono conservate le richieste di appuntamento e le email' });
  return m;
}

// A loud warning in every build while a TODO is open, so an incomplete legal notice is never deployed unnoticed
const open = legalMissing();
if (open.length && import.meta.env.PROD) {
  const line = '!'.repeat(78);
  console.warn(`\n${line}\n  LEGAL PAGES INCOMPLETE: fill in the TODOs in src/config/legal.ts\n${open.map((o) => `  - ${o.en}`).join('\n')}\n${line}\n`);
}
