// The Security page (round 5, 25 Nov 2026, the owner: "the security page: all the details. It's read-only, we don't
// store anything, and it integrates with everything. You can make it less subtle"). Every line is something the site
// already states (the FAQ's "Data and trust" answers, the hotel groups page's trust and roles, the integrations list),
// worded plainly. Two things the owner said are made precise rather than repeated: Tyll does keep the sales, stock and
// invoice data it works with (encrypted, in the EU), so the page says what it never stores (card numbers, guest personal
// data) instead of "nothing"; and it connects to the systems in the logo list plus a free custom connection for pilot
// partners, so the page says that instead of "everything".
import type { Locale } from '../i18n/routes';

export type SecurityIcon = 'eye' | 'ban' | 'lock' | 'map-pin' | 'user-cog' | 'history' | 'shield-check';
export type SecurityCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  /** The picture under the title: your systems on one side, Tyll on the other, data going one way only */
  flow: { systems: string; tyll: string; brief: string; readOnly: string; never: string };
  pillars: { title: string; items: { icon: SecurityIcon; title: string; text: string }[] };
  connect: { title: string; text: string; all: string; pms: string; pos: string; payments: string; more: string; exports: string; start: string };
  close: string;
};

export const security: Record<Locale, SecurityCopy> = {
  en: {
    metaTitle: 'Security and Data Protection: Read Only, Hosted in the EU | Tyll',
    metaDescription: 'Tyll is read only: it never changes anything in your systems. Encrypted, hosted in the EU under the GDPR, no card numbers or guest data, never sold.',
    title: 'Read only. Your systems stay exactly as they are.',
    text: 'Tyll reads your sales, deliveries and invoices. It never changes, deletes or posts anything, and it needs no visit and no IT project.',
    flow: { systems: 'Your POS, PMS and invoices', tyll: 'Tyll', brief: 'Your morning brief', readOnly: 'Read only', never: 'Never writes back' },
    pillars: {
      title: 'What that means, in detail',
      items: [
        { icon: 'eye', title: 'Read only, always', text: 'Tyll never changes, deletes or posts anything in your systems. Read-only access or a sales export is enough.' },
        { icon: 'ban', title: 'No card numbers. No guest data.', text: 'Tyll does not store card numbers or guest personal data. It works with sales, stock, deliveries and invoices.' },
        { icon: 'lock', title: 'Encrypted', text: 'Your data is encrypted at rest and in transit.' },
        { icon: 'map-pin', title: 'Hosted in the EU', text: 'On AWS via Supabase, handled under the GDPR.' },
        { icon: 'user-cog', title: 'Each role sees its own', text: 'A head chef sees their kitchen, a financial controller the whole group. Besides your team, only the Tyll people supporting your pilot can see your data.' },
        { icon: 'history', title: 'Every change has a name', text: 'An audit trail records who changed what. Nobody approves an order they raised.' },
        { icon: 'shield-check', title: 'Never sold, never shared', text: 'Your data is used to run Tyll for you, and for nothing else.' },
      ],
    },
    connect: {
      title: 'Works with the systems you already run',
      text: 'Tyll reads from your POS, your PMS and your payments. Pick a group to see who we connect to.',
      all: 'All',
      pms: 'PMS',
      pos: 'POS',
      payments: 'Payments',
      more: 'Using something else? Ask us and we will check your system. For pilot partners, a custom connection to an in-house system is free.',
      exports: 'Out of Tyll: purchase orders, goods receipts and supplier invoices as CSV or JSON, for your procurement or accounting system.',
      start: 'No connection yet? A sales export is enough to start.',
    },
    close: 'Questions about your data? Ask us on a call.',
  },
  de: {
    metaTitle: 'Sicherheit und Datenschutz: nur lesend, in der EU | Tyll',
    metaDescription: 'Tyll liest nur: Es ändert nichts in Ihren Systemen. Verschlüsselt, in der EU nach DSGVO gehostet, keine Kartennummern oder Gästedaten, nie verkauft.',
    title: 'Nur lesend. Ihre Systeme bleiben genau, wie sie sind.',
    text: 'Tyll liest Ihre Verkäufe, Lieferungen und Rechnungen. Es ändert, löscht oder bucht nichts und braucht weder einen Besuch noch ein IT-Projekt.',
    flow: { systems: 'Ihre Kasse, Ihr PMS und Ihre Rechnungen', tyll: 'Tyll', brief: 'Ihr Morgenbericht', readOnly: 'Nur lesend', never: 'Schreibt nie zurück' },
    pillars: {
      title: 'Was das im Einzelnen heißt',
      items: [
        { icon: 'eye', title: 'Immer nur lesend', text: 'Tyll ändert, löscht oder bucht nichts in Ihren Systemen. Lesezugriff oder ein Verkaufsexport genügt.' },
        { icon: 'ban', title: 'Keine Kartennummern. Keine Gästedaten.', text: 'Tyll speichert keine Kartennummern und keine personenbezogenen Gästedaten. Es arbeitet mit Verkäufen, Bestand, Lieferungen und Rechnungen.' },
        { icon: 'lock', title: 'Verschlüsselt', text: 'Ihre Daten sind gespeichert und bei der Übertragung verschlüsselt.' },
        { icon: 'map-pin', title: 'In der EU gehostet', text: 'Auf AWS über Supabase, nach der DSGVO behandelt.' },
        { icon: 'user-cog', title: 'Jede Rolle sieht nur ihres', text: 'Ein Küchenchef sieht seine Küche, ein Controller die ganze Gruppe. Neben Ihrem Team sehen nur die Tyll-Leute, die Ihren Piloten betreuen, Ihre Daten.' },
        { icon: 'history', title: 'Jede Änderung hat einen Namen', text: 'Ein Prüfprotokoll hält fest, wer was geändert hat. Niemand gibt eine Bestellung frei, die er selbst angelegt hat.' },
        { icon: 'shield-check', title: 'Nie verkauft, nie weitergegeben', text: 'Ihre Daten dienen nur dazu, Tyll für Sie zu betreiben.' },
      ],
    },
    connect: {
      title: 'Arbeitet mit den Systemen, die Sie schon nutzen',
      text: 'Tyll liest aus Ihrer Kasse, Ihrem PMS und Ihren Zahlungen. Wählen Sie eine Gruppe, um zu sehen, mit wem wir verbinden.',
      all: 'Alle',
      pms: 'PMS',
      pos: 'Kasse',
      payments: 'Zahlungen',
      more: 'Sie nutzen etwas anderes? Fragen Sie uns, wir prüfen Ihr System. Für Pilotpartner ist eine eigene Anbindung an ein hauseigenes System kostenlos.',
      exports: 'Aus Tyll heraus: Bestellungen, Wareneingänge und Lieferantenrechnungen als CSV oder JSON, für Ihr Einkaufs- oder Buchhaltungssystem.',
      start: 'Noch keine Anbindung? Ein Verkaufsexport genügt für den Start.',
    },
    close: 'Fragen zu Ihren Daten? Fragen Sie uns im Gespräch.',
  },
  it: {
    metaTitle: 'Sicurezza e protezione dei dati: sola lettura, nell’UE | Tyll',
    metaDescription: 'Tyll è in sola lettura: non cambia nulla nei tuoi sistemi. Dati cifrati, ospitati nell’UE secondo il GDPR, senza numeri di carta né dati degli ospiti.',
    title: 'Sola lettura. I tuoi sistemi restano esattamente come sono.',
    text: 'Tyll legge vendite, consegne e fatture. Non cambia, non cancella e non registra nulla, e non servono visite né progetti IT.',
    flow: { systems: 'La tua cassa, il PMS e le fatture', tyll: 'Tyll', brief: 'Il tuo brief del mattino', readOnly: 'Sola lettura', never: 'Non scrive mai indietro' },
    pillars: {
      title: 'Cosa significa, nel dettaglio',
      items: [
        { icon: 'eye', title: 'Sempre in sola lettura', text: 'Tyll non cambia, non cancella e non registra nulla nei tuoi sistemi. Basta un accesso in sola lettura o un export delle vendite.' },
        { icon: 'ban', title: 'Niente numeri di carta. Niente dati degli ospiti.', text: 'Tyll non conserva numeri di carta né dati personali degli ospiti. Lavora con vendite, scorte, consegne e fatture.' },
        { icon: 'lock', title: 'Cifrati', text: 'I tuoi dati sono cifrati sia archiviati sia in transito.' },
        { icon: 'map-pin', title: 'Ospitati nell’UE', text: 'Su AWS tramite Supabase, trattati secondo il GDPR.' },
        { icon: 'user-cog', title: 'Ogni ruolo vede il suo', text: 'Uno chef vede la sua cucina, un controller tutto il gruppo. Oltre al tuo team, solo le persone di Tyll che seguono il tuo pilota vedono i tuoi dati.' },
        { icon: 'history', title: 'Ogni modifica ha un nome', text: 'Un registro tiene traccia di chi ha cambiato cosa. Nessuno approva un ordine che ha creato lui stesso.' },
        { icon: 'shield-check', title: 'Mai venduti, mai condivisi', text: 'I tuoi dati servono solo a far funzionare Tyll per te.' },
      ],
    },
    connect: {
      title: 'Funziona con i sistemi che usi già',
      text: 'Tyll legge dalla tua cassa, dal PMS e dai pagamenti. Scegli un gruppo per vedere a cosa ci colleghiamo.',
      all: 'Tutti',
      pms: 'PMS',
      pos: 'Cassa',
      payments: 'Pagamenti',
      more: 'Usi altro? Chiedici e verifichiamo il tuo sistema. Per i partner del pilota, un collegamento su misura a un sistema interno è gratuito.',
      exports: 'In uscita da Tyll: ordini, entrate merci e fatture dei fornitori in CSV o JSON, per il tuo sistema di acquisti o contabilità.',
      start: 'Nessun collegamento ancora? Per iniziare basta un export delle vendite.',
    },
    close: 'Domande sui tuoi dati? Chiedicelo in una chiamata.',
  },
  ar: {
    metaTitle: 'الأمان وحماية البيانات: للقراءة فقط، في الاتحاد الأوروبي | Tyll',
    metaDescription: 'يعمل Tyll للقراءة فقط ولا يغيّر شيئًا في أنظمتك. بيانات مشفّرة ومستضافة في الاتحاد الأوروبي وفق اللائحة العامة لحماية البيانات، ولا تُباع أبدًا.',
    title: 'للقراءة فقط. تبقى أنظمتك كما هي تمامًا.',
    text: 'يقرأ Tyll مبيعاتك وتوريداتك وفواتيرك. لا يغيّر ولا يحذف ولا يسجّل أي شيء، ولا يحتاج إلى زيارة أو مشروع تقنية معلومات.',
    flow: { systems: 'نظام نقاط البيع ونظام إدارة الفندق والفواتير', tyll: 'Tyll', brief: 'ملخصك الصباحي', readOnly: 'للقراءة فقط', never: 'لا يكتب أبدًا في أنظمتك' },
    pillars: {
      title: 'ماذا يعني ذلك بالتفصيل',
      items: [
        { icon: 'eye', title: 'للقراءة فقط، دائمًا', text: 'لا يغيّر Tyll ولا يحذف ولا يسجّل أي شيء في أنظمتك. يكفي وصول للقراءة فقط أو تصدير للمبيعات.' },
        { icon: 'ban', title: 'لا أرقام بطاقات. لا بيانات ضيوف.', text: 'لا يحتفظ Tyll بأرقام البطاقات ولا بالبيانات الشخصية للضيوف. يعمل بالمبيعات والمخزون والتوريدات والفواتير.' },
        { icon: 'lock', title: 'مشفّرة', text: 'بياناتك مشفّرة أثناء التخزين وأثناء النقل.' },
        { icon: 'map-pin', title: 'مستضافة في الاتحاد الأوروبي', text: 'على AWS عبر Supabase، وتُعالَج وفق اللائحة العامة لحماية البيانات.' },
        { icon: 'user-cog', title: 'كل دور يرى ما يخصه', text: 'يرى رئيس الطهاة مطبخه، ويرى المراقب المالي المجموعة كلها. وإلى جانب فريقك، لا يرى بياناتك إلا فريق Tyll الذي يدعم تجربتك.' },
        { icon: 'history', title: 'لكل تغيير اسم', text: 'سجل تدقيق يحفظ من غيّر ماذا. ولا يوافق أحد على طلب أنشأه بنفسه.' },
        { icon: 'shield-check', title: 'لا تُباع ولا تُشارك أبدًا', text: 'تُستخدم بياناتك لتشغيل Tyll لك فقط، ولا شيء غير ذلك.' },
      ],
    },
    connect: {
      title: 'يعمل مع الأنظمة التي تستخدمها أصلًا',
      text: 'يقرأ Tyll من نظام نقاط البيع ونظام إدارة الفندق والمدفوعات. اختر مجموعة لترى الأنظمة التي نتصل بها.',
      all: 'الكل',
      pms: 'إدارة الفندق',
      pos: 'نقاط البيع',
      payments: 'المدفوعات',
      more: 'تستخدم نظامًا آخر؟ اسألنا وسنتحقق منه. ولشركاء التجربة، الربط المخصص بنظام داخلي مجاني.',
      exports: 'من Tyll إلى أنظمتك: أوامر الشراء وإيصالات الاستلام وفواتير الموردين بصيغة CSV أو JSON، لنظام المشتريات أو المحاسبة.',
      start: 'لا يوجد ربط بعد؟ يكفي تصدير للمبيعات للبدء.',
    },
    close: 'أسئلة عن بياناتك؟ اسألنا في مكالمة.',
  },
};
