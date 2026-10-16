// Legal details for the Legal Notice and Privacy pages. Nothing here may be guessed: leave a value null
// until the owner supplies it. Missing required values are listed on the pages themselves and by
// `npm run launch-check`, and the pages stay out of search results until they are complete.

import { site } from './site';
import type { Locale } from '../i18n/routes';

type Text = Record<Locale, string>;

export const legal = {
  /** Registered company name with legal form (e.g. "Tyll GmbH"), or the full name of the person operating the site. */
  operator: null as string | null,
  /** Postal address lines for service of documents. A P.O. box is not enough. */
  address: null as string[] | null,
  /** Managing director(s) or other legal representative. Only for companies. */
  representative: null as string | null,
  /** Commercial register court and number, if registered (e.g. "Amtsgericht Berlin-Charlottenburg, HRB 000000"). */
  register: null as string | null,
  /** VAT identification number under § 27a UStG, if one has been issued. */
  vatId: null as string | null,
  /** Person responsible for editorial content under § 18 (2) MStV, with address if different. */
  contentResponsible: null as string | null,
  email: site.email,
  /** Optional phone number. */
  phone: null as string | null,

  /** Website hosting provider and whether a data processing agreement is in place for this site. */
  hosting: {
    name: 'Vercel Inc.' as string | null,
    // From vercel.com/legal/privacy-policy, checked 15 Oct 2026. The live site still shows an older address.
    address: '440 N Barranca Avenue #4133, Covina, CA 91723, USA' as string | null,
    /** Set to true once this site is deployed on Vercel and the data processing agreement is confirmed. */
    confirmed: false,
  },
  /** How long booking enquiries and emails are kept after the conversation, in plain words. */
  enquiryRetention: null as Text | null,
  /** Date of the current version of the legal pages. */
  updated: '2026-10-15',
};

export type MissingItem = { key: string } & Text;

/** Required details that are still missing. Optional ones (register, VAT ID, phone) are listed as "if applicable". */
export function legalMissing(): MissingItem[] {
  const m: MissingItem[] = [];
  if (!legal.operator)
    m.push({ key: 'operator', en: 'Name of the operator: registered company name and legal form, or full name of the person', de: 'Name des Anbieters: Firma mit Rechtsform oder vollständiger Name der Person', ar: 'اسم المشغّل: الاسم التجاري المسجّل والشكل القانوني، أو الاسم الكامل للشخص', it: 'Nome del gestore: ragione sociale con forma giuridica, oppure nome completo della persona' });
  if (!legal.address) m.push({ key: 'address', en: 'Postal address of the operator', de: 'Ladungsfähige Anschrift des Anbieters', ar: 'العنوان البريدي للمشغّل', it: 'Indirizzo postale del gestore' });
  if (!legal.representative)
    m.push({ key: 'representative', en: 'Legal representative (e.g. managing director), if the operator is a company', de: 'Vertretungsberechtigte Person (z. B. Geschäftsführung), falls der Anbieter eine Gesellschaft ist', ar: 'الممثل القانوني (مثل المدير التنفيذي)، إذا كان المشغّل شركة', it: 'Rappresentante legale (ad es. amministratore), se il gestore è una società' });
  if (!legal.register) m.push({ key: 'register', en: 'Commercial register court and number, if registered', de: 'Registergericht und Registernummer, falls eingetragen', ar: 'محكمة السجل التجاري ورقم القيد، إن وُجد تسجيل', it: 'Tribunale del registro delle imprese e numero di iscrizione, se iscritto' });
  if (!legal.vatId) m.push({ key: 'vatId', en: 'VAT identification number, if one exists', de: 'Umsatzsteuer-Identifikationsnummer, falls vorhanden', ar: 'رقم التعريف الضريبي لضريبة القيمة المضافة، إن وُجد', it: 'Partita IVA, se esistente' });
  if (!legal.contentResponsible)
    m.push({ key: 'contentResponsible', en: 'Person responsible for content under § 18 (2) MStV', de: 'Verantwortliche Person nach § 18 Abs. 2 MStV', ar: 'الشخص المسؤول عن المحتوى بموجب المادة 18 (2) من MStV', it: 'Persona responsabile dei contenuti ai sensi del § 18 (2) MStV' });
  if (!legal.hosting.confirmed || !legal.hosting.address)
    m.push({ key: 'hosting', en: 'Confirm that this site is hosted on Vercel under a data processing agreement', de: 'Bestätigen, dass diese Website bei Vercel mit Auftragsverarbeitungsvertrag gehostet wird', ar: 'تأكيد أن هذا الموقع مستضاف لدى Vercel بموجب اتفاقية معالجة بيانات', it: 'Confermare che il sito è ospitato su Vercel con un accordo sul trattamento dei dati' });
  if (!legal.enquiryRetention)
    m.push({ key: 'retention', en: 'How long booking enquiries and emails are kept', de: 'Wie lange Terminanfragen und E-Mails gespeichert werden', ar: 'مدة الاحتفاظ بطلبات الحجز ورسائل البريد الإلكتروني', it: 'Per quanto tempo vengono conservate le richieste di appuntamento e le email' });
  return m;
}
