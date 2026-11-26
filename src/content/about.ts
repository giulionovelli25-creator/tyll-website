// The About page (round 5, 25 Nov 2026, the owner: "an About Us page at the top, where you talk about where the tool
// comes from, our story; make it nice and interactive"). Everything here is something the site already says (the
// founder's nights in Zürich from the company deck, live in Berlin and Zürich, Dubai next, read only, the free pilot)
// or a sourced fact. The three cities moved here from the Sustainability page; their sources were checked on
// 25 Nov 2026 (see src/content/sustainability.ts). No customers are named and no team members are invented.
import type { Locale } from '../i18n/routes';

const BMLEH = 'https://www.bmleh.de/DE/themen/ernaehrung/lebensmittelverschwendung/studie-lebensmittelabfaelle-deutschland.html';
const SWISS = 'https://www.newsd.admin.ch/newsd/message/attachments/71456.pdf';
const NATIONAL = 'https://www.thenationalnews.com/news/uae/2024/12/08/green-hospitality-how-hotels-are-embracing-new-ideas-to-reduce-waste';

type Source = { name: string; url: string };
export type CityId = 'berlin' | 'zurich' | 'dubai';
export type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  /** The story, told as an editorial piece (26 Nov 2026, the owner: the four-dot timeline read as AI): the minutes the
      CEO spent every night as one large figure, two short paragraphs around one pull line, then the route Zürich,
      Berlin, Dubai */
  story: { title: string; figure: string; caption: string; before: string; pull: string; after: string; route: { city: string; note: string }[] };
  /** How we work: four things the product keeps to */
  ways: { title: string; items: { icon: 'eye' | 'plug' | 'sliders-horizontal' | 'shield-check'; title: string; text: string }[]; security: string };
  cities: { title: string; cards: { id: CityId; place: string; line: string; fact: string; source: Source }[] };
  investors: { text: string; link: string };
};

export const about: Record<Locale, AboutCopy> = {
  en: {
    metaTitle: 'About Tyll: Built From a Hotel Night Shift | Tyll',
    metaDescription: 'Tyll began with six months of closing a Zürich hotel’s night by hand. Built in Berlin, live in hotels in Berlin and Zürich, and heading to Dubai next.',
    title: 'Built from six months of closing the night by hand.',
    text: 'Tyll comes from a hotel night shift in Zürich. It is built in Berlin, live in hotels in Berlin and Zürich, and heading to Dubai.',
    story: {
      title: 'Where Tyll comes from',
      figure: '45–60',
      caption: 'minutes, every night, for six months',
      before: 'That is how long our CEO spent closing the night by hand at a luxury hotel in Zürich, comparing totals.',
      pull: 'What leaks never shows in a total.',
      after: 'A bill, a delivery or a bottle could go missing while the totals still matched. So we built the check: Tyll reads the systems a hotel already uses and checks every line, every night.',
      route: [
        { city: 'Zürich', note: 'Where it started. Live today.' },
        { city: 'Berlin', note: 'Where it is built. Live today.' },
        { city: 'Dubai', note: 'Next.' },
      ],
    },
    ways: {
      title: 'How we work',
      items: [
        { icon: 'eye', title: 'Read only', text: 'Tyll never changes, deletes or posts anything in your systems.' },
        { icon: 'plug', title: 'Nothing to install', text: 'No visit and no IT project. Read-only access or a sales export is enough.' },
        { icon: 'sliders-horizontal', title: 'You decide', text: 'Every order can wait for approval, or go out by itself within the limits you set.' },
        { icon: 'shield-check', title: 'No result, no fee', text: 'A free 30 day pilot on your own data. If it finds no real money, you pay nothing.' },
      ],
      security: 'How we keep your data safe →',
    },
    cities: {
      title: 'Where we work',
      cards: [
        { id: 'berlin', place: 'Berlin', line: 'Where Tyll is built, and live in hotels.', fact: 'About 18% of Germany’s food waste in 2022, 2 of 10.8 million tonnes, came from eating out: restaurants, canteens and catering.', source: { name: 'German Federal Ministry of Food and Agriculture, 2022', url: BMLEH } },
        { id: 'zurich', place: 'Zürich', line: 'Where our CEO closed the night by hand for six months, and where Tyll is live today.', fact: '“Every kilogram of food that is not wasted also saves 24 francs.” Andreas Züllig, President of HotellerieSuisse, 2022 (translated).', source: { name: 'Swiss food waste agreement, testimonials, 2022', url: SWISS } },
        { id: 'dubai', place: 'Dubai', line: 'Where we are heading next.', fact: 'The UAE’s food waste initiative Ne’ma estimates AED 6 billion of food is wasted in the Emirates each year.', source: { name: 'The National, 8 December 2024', url: NATIONAL } },
      ],
    },
    investors: { text: 'Investing in hospitality or food-waste software?', link: 'Investor enquiries →' },
  },
  de: {
    metaTitle: 'Über Tyll: Entstanden aus der Nachtschicht im Hotel | Tyll',
    metaDescription: 'Tyll begann mit sechs Monaten, in denen ein Zürcher Hotel die Nacht von Hand abschloss. Gebaut in Berlin, im Einsatz in Berlin und Zürich, bald in Dubai.',
    title: 'Entstanden aus sechs Monaten Nachtabschluss von Hand.',
    text: 'Tyll kommt aus einer Hotel-Nachtschicht in Zürich. Gebaut wird es in Berlin, im Einsatz ist es in Hotels in Berlin und Zürich, als Nächstes geht es nach Dubai.',
    story: {
      title: 'Woher Tyll kommt',
      figure: '45–60',
      caption: 'Minuten, jede Nacht, sechs Monate lang',
      before: 'So lange hat unser CEO in einem Luxushotel in Zürich die Nacht von Hand abgeschlossen und Summen verglichen.',
      pull: 'Was verloren geht, zeigt sich nie in einer Summe.',
      after: 'Eine Rechnung, eine Lieferung oder eine Flasche konnte fehlen, während die Summen stimmten. Also haben wir die Prüfung gebaut: Tyll liest die Systeme, die ein Hotel schon nutzt, und prüft jede Zeile, jede Nacht.',
      route: [
        { city: 'Zürich', note: 'Hier hat es angefangen. Heute im Einsatz.' },
        { city: 'Berlin', note: 'Hier wird es gebaut. Heute im Einsatz.' },
        { city: 'Dubai', note: 'Als Nächstes.' },
      ],
    },
    ways: {
      title: 'Wie wir arbeiten',
      items: [
        { icon: 'eye', title: 'Nur lesend', text: 'Tyll ändert, löscht oder bucht nichts in Ihren Systemen.' },
        { icon: 'plug', title: 'Nichts zu installieren', text: 'Kein Besuch und kein IT-Projekt. Lesezugriff oder ein Verkaufsexport genügt.' },
        { icon: 'sliders-horizontal', title: 'Sie entscheiden', text: 'Jede Bestellung kann auf Freigabe warten oder im Rahmen Ihrer Limits von selbst rausgehen.' },
        { icon: 'shield-check', title: 'Kein Ergebnis, keine Kosten', text: 'Ein kostenloser 30-Tage-Pilot mit Ihren eigenen Daten. Findet er kein echtes Geld, zahlen Sie nichts.' },
      ],
      security: 'So schützen wir Ihre Daten →',
    },
    cities: {
      title: 'Wo wir arbeiten',
      cards: [
        { id: 'berlin', place: 'Berlin', line: 'Hier wird Tyll gebaut, und hier läuft es in Hotels.', fact: 'Rund 18 % der Lebensmittelabfälle in Deutschland 2022, 2 von 10,8 Millionen Tonnen, kamen aus der Außer-Haus-Verpflegung.', source: { name: 'Bundesministerium für Landwirtschaft, Ernährung und Heimat, 2022', url: BMLEH } },
        { id: 'zurich', place: 'Zürich', line: 'Hier hat unser CEO sechs Monate lang die Nacht von Hand abgeschlossen, und hier läuft Tyll heute.', fact: '„… spart auch 24 Franken pro Kilogramm Lebensmittel, welches nicht verschwendet wurde.“ Andreas Züllig, Präsident von HotellerieSuisse, 2022.', source: { name: 'Branchenvereinbarung Food Waste, Testimonials, 2022', url: SWISS } },
        { id: 'dubai', place: 'Dubai', line: 'Hierhin gehen wir als Nächstes.', fact: 'Die Initiative Ne’ma der VAE schätzt, dass in den Emiraten jedes Jahr Lebensmittel im Wert von 6 Milliarden AED verschwendet werden.', source: { name: 'The National, 8. Dezember 2024', url: NATIONAL } },
      ],
    },
    investors: { text: 'Sie investieren in Software für Hotellerie oder gegen Lebensmittelabfall?', link: 'Anfragen von Investoren →' },
  },
  it: {
    metaTitle: 'Chi siamo: Tyll nasce da un turno di notte in hotel | Tyll',
    metaDescription: 'Tyll è nato da sei mesi passati a chiudere a mano la notte di un hotel di Zurigo. Costruito a Berlino, attivo a Berlino e Zurigo, presto a Dubai.',
    title: 'Nato da sei mesi passati a chiudere la notte a mano.',
    text: 'Tyll nasce da un turno di notte in un hotel di Zurigo. Lo costruiamo a Berlino, è attivo in hotel a Berlino e Zurigo e la prossima tappa è Dubai.',
    story: {
      title: 'Da dove nasce Tyll',
      figure: '45–60',
      caption: 'minuti, ogni notte, per sei mesi',
      before: 'Tanto impiegava il nostro CEO per chiudere a mano la notte in un hotel di lusso a Zurigo, confrontando i totali.',
      pull: 'Ciò che si perde non si vede mai in un totale.',
      after: 'Un conto, una consegna o una bottiglia potevano sparire mentre i totali tornavano. Così abbiamo costruito il controllo: Tyll legge i sistemi che l’hotel usa già e controlla ogni riga, ogni notte.',
      route: [
        { city: 'Zurigo', note: 'Dove tutto è iniziato. Attivo oggi.' },
        { city: 'Berlino', note: 'Dove lo costruiamo. Attivo oggi.' },
        { city: 'Dubai', note: 'La prossima.' },
      ],
    },
    ways: {
      title: 'Come lavoriamo',
      items: [
        { icon: 'eye', title: 'Sola lettura', text: 'Tyll non cambia, non cancella e non registra nulla nei tuoi sistemi.' },
        { icon: 'plug', title: 'Niente da installare', text: 'Nessuna visita e nessun progetto IT. Basta un accesso in sola lettura o un export delle vendite.' },
        { icon: 'sliders-horizontal', title: 'Decidi tu', text: 'Ogni ordine può attendere l’approvazione o partire da solo entro i limiti che imposti.' },
        { icon: 'shield-check', title: 'Nessun risultato, nessun costo', text: 'Un pilota gratuito di 30 giorni sui tuoi dati. Se non trova soldi veri, non paghi nulla.' },
      ],
      security: 'Come proteggiamo i tuoi dati →',
    },
    cities: {
      title: 'Dove lavoriamo',
      cards: [
        { id: 'berlin', place: 'Berlino', line: 'Dove nasce Tyll, ed è attivo in hotel.', fact: 'Circa il 18% dello spreco alimentare in Germania nel 2022, 2 su 10,8 milioni di tonnellate, veniva dalla ristorazione fuori casa.', source: { name: 'Ministero federale tedesco dell’Alimentazione, 2022', url: BMLEH } },
        { id: 'zurich', place: 'Zurigo', line: 'Dove il nostro CEO ha chiuso la notte a mano per sei mesi, e dove oggi Tyll è attivo.', fact: '«Ogni chilogrammo di cibo non sprecato fa risparmiare anche 24 franchi.» Andreas Züllig, presidente di HotellerieSuisse, 2022 (tradotto).', source: { name: 'Accordo svizzero contro lo spreco alimentare, testimonianze, 2022', url: SWISS } },
        { id: 'dubai', place: 'Dubai', line: 'Dove andremo dopo.', fact: 'L’iniziativa degli Emirati contro lo spreco, Ne’ma, stima che ogni anno negli Emirati si sprechi cibo per 6 miliardi di AED.', source: { name: 'The National, 8 dicembre 2024', url: NATIONAL } },
      ],
    },
    investors: { text: 'Investi in software per l’ospitalità o contro lo spreco alimentare?', link: 'Richieste degli investitori →' },
  },
  ar: {
    metaTitle: 'من نحن: Tyll وُلد من مناوبة ليلية في فندق | Tyll',
    metaDescription: 'بدأ Tyll بستة أشهر من إغلاق الحسابات الليلية يدويًا في فندق في زيورخ. يُبنى في برلين، ويعمل في فنادق برلين وزيورخ، ووجهته التالية دبي في الإمارات.',
    title: 'وُلد من ستة أشهر من إغلاق الحسابات الليلية يدويًا.',
    text: 'جاء Tyll من مناوبة ليلية في فندق في زيورخ. يُبنى في برلين، ويعمل في فنادق في برلين وزيورخ، ووجهته التالية دبي.',
    story: {
      title: 'من أين جاء Tyll',
      figure: '45–60',
      caption: 'دقيقة كل ليلة، لمدة ستة أشهر',
      before: 'هذا ما كان يقضيه رئيسنا التنفيذي في إغلاق الحسابات الليلية يدويًا في فندق فاخر في زيورخ، يقارن الإجماليات.',
      pull: 'ما يتسرّب لا يظهر أبدًا في الإجمالي.',
      after: 'قد تختفي فاتورة أو توريد أو زجاجة بينما تتطابق الإجماليات. فبنينا أداة المراجعة: يقرأ Tyll الأنظمة التي يستخدمها الفندق أصلًا ويراجع كل سطر، كل ليلة.',
      route: [
        { city: 'زيورخ', note: 'هنا بدأت القصة. يعمل اليوم.' },
        { city: 'برلين', note: 'هنا يُبنى. يعمل اليوم.' },
        { city: 'دبي', note: 'التالية.' },
      ],
    },
    ways: {
      title: 'كيف نعمل',
      items: [
        { icon: 'eye', title: 'للقراءة فقط', text: 'لا يغيّر Tyll ولا يحذف ولا يسجّل أي شيء في أنظمتك.' },
        { icon: 'plug', title: 'لا شيء لتثبيته', text: 'لا زيارة ولا مشروع تقنية معلومات. يكفي وصول للقراءة فقط أو تصدير للمبيعات.' },
        { icon: 'sliders-horizontal', title: 'القرار لك', text: 'يمكن لكل طلب أن ينتظر الموافقة، أو أن يُرسل تلقائيًا ضمن الحدود التي تضعها.' },
        { icon: 'shield-check', title: 'لا نتيجة، لا رسوم', text: 'تجربة مجانية لمدة 30 يومًا على بياناتك. إذا لم تجد أموالًا حقيقية، فلن تدفع شيئًا.' },
      ],
      security: 'كيف نحمي بياناتك ←',
    },
    cities: {
      title: 'أين نعمل',
      cards: [
        { id: 'dubai', place: 'دبي', line: 'وجهتنا التالية.', fact: 'تقدّر مبادرة «نعمة» الإماراتية أن طعامًا بقيمة 6 مليارات درهم يُهدر في الإمارات كل عام.', source: { name: 'The National، 8 ديسمبر 2024', url: NATIONAL } },
        { id: 'berlin', place: 'برلين', line: 'حيث يُبنى Tyll، ويعمل في الفنادق.', fact: 'نحو 18% من هدر الطعام في ألمانيا عام 2022، أي 2 من 10.8 مليون طن، جاء من الأكل خارج المنزل.', source: { name: 'وزارة الأغذية والزراعة الألمانية، 2022', url: BMLEH } },
        { id: 'zurich', place: 'زيورخ', line: 'حيث أغلق رئيسنا التنفيذي الحسابات الليلية يدويًا لستة أشهر، وحيث يعمل Tyll اليوم.', fact: '«كل كيلوغرام من الطعام لا يُهدر يوفّر أيضًا 24 فرنكًا.» أندرياس تسوليغ، رئيس HotellerieSuisse، 2022 (مترجم).', source: { name: 'الاتفاق السويسري لمكافحة هدر الطعام، شهادات، 2022', url: SWISS } },
      ],
    },
    investors: { text: 'هل تستثمر في برمجيات الضيافة أو الحد من هدر الطعام؟', link: 'استفسارات المستثمرين ←' },
  },
};
