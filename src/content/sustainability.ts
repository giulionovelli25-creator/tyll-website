// The Sustainability page (round 5, 25 Nov 2026; trimmed 26 Nov 2026, the owner): a full-screen photo hero, the world's
// numbers as three short stats that count up, what hotels got back from cutting food waste (industry research, never
// Tyll's), three ways Tyll helps (with the solution pages' films), and a dark close. The calculator was removed on
// 26 Nov 2026 at the owner's request, and the three cities moved to the About page (src/content/about.ts).
//
// Every figure was opened at its source on 25 Nov 2026 and matches it in value, year and what it refers to:
// - UNEP, Food Waste Index Report 2024: 1.05 billion tonnes wasted in 2022; one fifth (19%) of food available to
//   consumers; food loss and waste 8–10% of global GHG emissions, "almost five times" aviation. unep.org refuses
//   automated reads; checked on web.archive.org copies of the press release and the key-messages PDF.
// - WRI and WRAP for Champions 12.3, 2018 (42 hotel sites in 15 countries): "21 percent reduction of food waste by
//   weight over a 12-month time frame"; "within the first year ... over 70 percent of the sites recouped their
//   investment. Within two years ... 95 percent"; an average benefit-cost ratio "nearly 7:1 over a three-year time
//   frame" (shown as ~7:1). The investment is the hotels' own food-waste programmes, never Tyll.
// No figure here is a Tyll result, and none may be used as one: Tyll does not calculate CO2 or "kg saved".
import type { Locale } from '../i18n/routes';

const UNEP = 'https://www.unep.org/resources/publication/food-waste-index-report-2024';
const WRI = 'https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/';

type Source = { name: string; url: string };
export type SustainabilityCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  /** The world's numbers (26 Nov 2026, the owner: the sentence was too much): three short stats, counting up */
  world: { title: string; stats: { figure: string; text: string }[]; source: Source };
  /** What hotels got back: industry figures, never Tyll's. The waste cut on its own, then the return on the hotels' own
      programs as three figures side by side (no timeline: they are not steps in a sequence). */
  back: { title: string; sub: string; lead: { figure: string; text: string }; returnsLabel: string; returns: { figure: string; text: string }[]; source: Source };
  /** Three ways Tyll helps, each with its solution page's own film */
  act: { title: string; items: { page: 'waste' | 'expiry' | 'forecasting'; text: string }[]; offer: string };
  close: { title: string; waste: string };
};

export const sustainability: Record<Locale, SustainabilityCopy> = {
  en: {
    metaTitle: 'Food Waste and Sustainability in Hotels | Tyll',
    metaDescription: 'How much food hotels throw away, what cutting it paid back in 42 hotels, and a calculator for your own kitchen. Every figure is linked to its source.',
    title: 'Less food in the bin. Less money with it.',
    text: 'Every kilo thrown away was bought, stored and cooked first.',
    world: {
      title: 'How much food goes to waste?',
      stats: [
        { figure: '1.05', text: 'billion tonnes of food wasted worldwide in 2022' },
        { figure: '19%', text: 'of the food that reached consumers, about one fifth' },
        { figure: '8–10%', text: 'of global greenhouse gas emissions come from food loss and waste' },
      ],
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    back: {
      title: 'What hotels got back from cutting food waste',
      sub: 'Results from 42 hotel sites that ran their own food-waste programs. Industry research, not Tyll data.',
      lead: { figure: '−21%', text: 'kitchen food waste by weight in the first year, on average' },
      returnsLabel: 'Return on their waste programs',
      returns: [
        { figure: '70%+', text: 'of sites recouped their investment within 1 year' },
        { figure: '95%', text: 'within 2 years' },
        { figure: '~7:1', text: 'average benefit for every 1 spent, over 3 years' },
      ],
      source: { name: 'Source: WRI & WRAP for Champions 12.3, 2018', url: WRI },
    },
    act: {
      title: 'Where Tyll helps',
      items: [
        { page: 'waste', text: 'Waste and breakage logged in two taps: the item and the amount, with a reason if you want one.' },
        { page: 'expiry', text: 'Batches about to expire, with what to do: use first, move, or make it tonight’s special.' },
        { page: 'forecasting', text: 'Orders built from real use, so less is bought only to expire.' },
      ],
      offer: 'We start with a free 30 day pilot on your own data. If the pilot finds no real money, you pay nothing.',
    },
    close: { title: 'See what your hotel throws away.', waste: 'See what waste costs you →' },
  },
  de: {
    metaTitle: 'Lebensmittelabfall und Nachhaltigkeit im Hotel | Tyll',
    metaDescription: 'Wie viel Essen Hotels wegwerfen, was weniger Abfall 42 Hotels zurückbrachte, und ein Rechner für Ihre eigene Küche. Jede Zahl mit ihrer Quelle verlinkt.',
    title: 'Weniger Essen im Müll. Weniger Geld gleich mit.',
    text: 'Jedes Kilo, das weggeworfen wird, wurde vorher gekauft, gelagert und gekocht.',
    world: {
      title: 'Wie viel Essen wird weggeworfen?',
      stats: [
        { figure: '1,05', text: 'Milliarden Tonnen Lebensmittel weltweit verschwendet, 2022' },
        { figure: '19 %', text: 'der Lebensmittel, die bei Verbrauchern ankamen, etwa ein Fünftel' },
        { figure: '8–10 %', text: 'der weltweiten Treibhausgasemissionen stammen aus Lebensmittelverlusten und -abfällen' },
      ],
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    back: {
      title: 'Was Hotels zurückbekamen, als sie Lebensmittelabfall senkten',
      sub: 'Ergebnisse aus 42 Hotels, die eigene Programme gegen Lebensmittelabfall umsetzten. Branchenforschung, keine Tyll-Daten.',
      lead: { figure: '−21 %', text: 'Küchenabfall nach Gewicht im ersten Jahr, im Durchschnitt' },
      returnsLabel: 'Rendite ihrer Abfallprogramme',
      returns: [
        { figure: '70 %+', text: 'der Hotels hatten ihre Investition innerhalb eines Jahres zurück' },
        { figure: '95 %', text: 'innerhalb von 2 Jahren' },
        { figure: '~7:1', text: 'durchschnittlicher Nutzen für jeden eingesetzten Euro, über 3 Jahre' },
      ],
      source: { name: 'Quelle: WRI & WRAP für Champions 12.3, 2018', url: WRI },
    },
    act: {
      title: 'Wo Tyll hilft',
      items: [
        { page: 'waste', text: 'Abfall und Bruch in zwei Fingertipps erfasst: Artikel und Menge, auf Wunsch mit Grund.' },
        { page: 'expiry', text: 'Chargen kurz vor dem Ablauf, mit klarem Vorschlag: zuerst verbrauchen, umlagern oder als Tagesgericht anbieten.' },
        { page: 'forecasting', text: 'Bestellungen nach echtem Verbrauch, damit weniger gekauft wird, das dann abläuft.' },
      ],
      offer: 'Wir beginnen mit einem kostenlosen 30-Tage-Piloten mit Ihren eigenen Daten. Findet der Pilot kein echtes Geld, zahlen Sie nichts.',
    },
    close: { title: 'Sehen Sie, was Ihr Hotel wegwirft.', waste: 'Sehen, was Abfall Sie kostet →' },
  },
  it: {
    metaTitle: 'Spreco alimentare e sostenibilità negli hotel | Tyll',
    metaDescription: 'Quanto cibo buttano gli hotel, cosa ha reso ridurlo in 42 hotel e un calcolatore per la tua cucina. Ogni cifra è collegata alla sua fonte originale.',
    title: 'Meno cibo nel cestino. E meno soldi con lui.',
    text: 'Ogni chilo buttato è stato prima comprato, conservato e cucinato.',
    world: {
      title: 'Quanto cibo viene sprecato?',
      stats: [
        { figure: '1,05', text: 'miliardi di tonnellate di cibo sprecate nel mondo nel 2022' },
        { figure: '19%', text: 'del cibo arrivato ai consumatori, circa un quinto' },
        { figure: '8–10%', text: 'delle emissioni globali di gas serra vengono da perdite e sprechi alimentari' },
      ],
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    back: {
      title: 'Cosa hanno ottenuto gli hotel riducendo lo spreco alimentare',
      sub: 'Risultati di 42 hotel che hanno avviato i propri programmi contro lo spreco. Ricerca di settore, non dati Tyll.',
      lead: { figure: '−21%', text: 'di spreco in cucina, in peso, nel primo anno, in media' },
      returnsLabel: 'Ritorno dei loro programmi contro lo spreco',
      returns: [
        { figure: '70%+', text: 'degli hotel ha recuperato l’investimento entro 1 anno' },
        { figure: '95%', text: 'entro 2 anni' },
        { figure: '~7:1', text: 'beneficio medio per ogni 1 speso, in 3 anni' },
      ],
      source: { name: 'Fonte: WRI e WRAP per Champions 12.3, 2018', url: WRI },
    },
    act: {
      title: 'Dove aiuta Tyll',
      items: [
        { page: 'waste', text: 'Sprechi e rotture registrati in due tocchi: prodotto e quantità, con il motivo se vuoi.' },
        { page: 'expiry', text: 'Lotti in scadenza, con cosa fare: usarli per primi, spostarli o farne il piatto di stasera.' },
        { page: 'forecasting', text: 'Ordini basati sul consumo reale, così si compra meno merce destinata a scadere.' },
      ],
      offer: 'Iniziamo con un pilota gratuito di 30 giorni sui tuoi dati. Se il pilota non trova soldi veri, non paghi nulla.',
    },
    close: { title: 'Scopri cosa butta via il tuo hotel.', waste: 'Scopri quanto ti costa lo spreco →' },
  },
  ar: {
    metaTitle: 'هدر الطعام والاستدامة في الفنادق | Tyll',
    metaDescription: 'كم من الطعام ترميه الفنادق، وماذا استعادت 42 فندقًا بعد خفضه، وحاسبة لمطبخك أنت. كل رقم مرتبط بمصدره الأصلي، من الأمم المتحدة إلى مبادرة «نعمة» في الإمارات.',
    title: 'طعام أقل في سلة المهملات، ومال أقل معه.',
    text: 'كل كيلوغرام يُرمى تم شراؤه وتخزينه وطهيه أولاً.',
    world: {
      title: 'كم من الطعام يُهدر؟',
      stats: [
        { figure: '1.05', text: 'مليار طن من الطعام هُدرت في العالم عام 2022' },
        { figure: '19%', text: 'من الطعام الذي وصل إلى المستهلكين، أي نحو الخُمس' },
        { figure: '8–10%', text: 'من انبعاثات الغازات الدفيئة في العالم مصدرها فقد الأغذية وهدرها' },
      ],
      source: { name: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP },
    },
    back: {
      title: 'ماذا استعادت الفنادق من خفض هدر الطعام',
      sub: 'نتائج من 42 فندقًا نفّذت برامجها الخاصة لخفض هدر الطعام. بحث من القطاع، وليست بيانات Tyll.',
      lead: { figure: '−21%', text: 'من هدر المطبخ وزنًا في السنة الأولى، في المتوسط' },
      returnsLabel: 'العائد على برامجها لخفض الهدر',
      returns: [
        { figure: '+70%', text: 'من الفنادق استعادت استثمارها خلال عام واحد' },
        { figure: '95%', text: 'خلال عامين' },
        { figure: '~7:1', text: 'متوسط العائد مقابل كل 1 يُنفق، على مدى 3 سنوات' },
      ],
      source: { name: 'المصدر: WRI وWRAP لصالح Champions 12.3، 2018', url: WRI },
    },
    act: {
      title: 'أين يساعد Tyll',
      items: [
        { page: 'waste', text: 'تسجيل الهدر والكسر بنقرتين: الصنف والكمية، مع السبب إن أردت.' },
        { page: 'expiry', text: 'دفعات قريبة من انتهاء الصلاحية مع ما يجب فعله: استخدامها أولاً أو نقلها أو تقديمها طبقًا لليوم.' },
        { page: 'forecasting', text: 'طلبات مبنية على الاستهلاك الفعلي، لتقليل شراء ما تنتهي صلاحيته.' },
      ],
      offer: 'نبدأ بتجربة مجانية مدتها 30 يومًا على بياناتك أنت. إذا لم تجد التجربة أموالًا حقيقية، فلن تدفع شيئًا.',
    },
    close: { title: 'اعرف ما يرميه فندقك.', waste: 'اعرف كم يكلفك الهدر ←' },
  },
};
