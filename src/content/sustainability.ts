// The Sustainability page (round 5, 25 Nov 2026, the owner's brief): a full-screen photo hero, one sentence of the
// world's numbers, a calculator, what hotels got back (a timeline that draws itself), the three cities, three ways Tyll
// helps (with the solution pages' clips), and a dark close. About four screens on a desktop.
//
// Every figure was opened at its source on 25 Nov 2026 and matches it in value, year and what it refers to:
// - UNEP, Food Waste Index Report 2024: 1.05 billion tonnes wasted in 2022; one fifth (19%) of food available to
//   consumers; food loss and waste 8–10% of global GHG emissions, "almost five times" aviation. unep.org refuses
//   automated reads; checked on web.archive.org copies of the press release and the key-messages PDF.
// - WRAP, UK Food Waste and Food Surplus Key Facts, July 2025: hospitality and food service waste is 18% "of the
//   amounts of food purchased" (2021 data; WRAP's food waste includes inedible parts such as bones and peel). Used only
//   in the calculator, labelled as that UK average.
// - WRI and WRAP for Champions 12.3, 2018 (42 hotel sites in 15 countries): 21% less food waste by weight in the
//   first year; over 70% of sites had their investment back within one year, 95% within two; a benefit-cost ratio of
//   "nearly 7:1 over a three-year time frame" (in dollars, so no "per euro" wording).
// - EU Waste Framework Directive, amended 2025: food waste in retail and consumption (restaurants, food services and
//   households) down 30% per person by 2030, against the 2021–2023 average.
// - The National, 8 Dec 2024: Ne'ma estimates AED 6 billion of food is wasted in the Emirates each year; the Ne'ma
//   Pledge aims "to cut food loss and waste by up to 50 per cent by 2030".
// - German Food Ministry (BMLEH), 2022 reporting year: 10.8 million tonnes of food waste, 18% (2 million tonnes) from
//   out-of-home catering. Not UBA or BLE: UBA's own out-of-home share (16%) is for 2023.
// - Andreas Züllig, President of HotellerieSuisse, in the federal food waste agreement's testimonials (May 2022,
//   newsd.admin.ch attachment 71456): 24 francs saved per kilogram of food not wasted. German original kept on the
//   German page; the other languages translate it and say so.
// No figure here is a Tyll result, and none may be used as one: Tyll does not calculate CO2 or "kg saved".
import type { Locale } from '../i18n/routes';

const UNEP = 'https://www.unep.org/resources/publication/food-waste-index-report-2024';
const WRAP = 'https://www.wrap.ngo/sites/default/files/2025-06/WRAP-UK-Food-Waste-and-Food-Surplus-Key-Facts-July-2025-v5.pdf';
const EU = 'https://food.ec.europa.eu/food-safety/food-waste/eu-food-waste-relevant-legislation/food-waste-reduction-targets_en';
const WRI = 'https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/';
const BMLEH = 'https://www.bmleh.de/DE/themen/ernaehrung/lebensmittelverschwendung/studie-lebensmittelabfaelle-deutschland.html';
const SWISS = 'https://www.newsd.admin.ch/newsd/message/attachments/71456.pdf';
const NATIONAL = 'https://www.thenationalnews.com/news/uae/2024/12/08/green-hospitality-how-hotels-are-embracing-new-ideas-to-reduce-waste';

type Source = { name: string; url: string };
export type CityId = 'berlin' | 'zurich' | 'dubai';
export type SustainabilityCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  /** One sentence of the world's numbers. Text in {braces} is a figure: set larger, and its digits count up. */
  sentence: { text: string; source: Source };
  /** The calculator: a rough estimate from two averages, never a Tyll result */
  calc: {
    title: string;
    lead: string;
    currency: 'EUR' | 'AED';
    /** The default food cost per cover, and the slider's range, in that currency */
    cost: { value: number; min: number; max: number; step: number };
    covers: string;
    /** What a cover is, under its slider */
    coverHelp: string;
    costLabel: string;
    days: string;
    bought: string;
    wasted: string;
    wastedNote: string;
    kept: string;
    keptNote: string;
    perYear: string;
    note: string;
    measure: string;
    demo: string;
    sources: Source[];
    /** One line under the calculator: the EU's 2030 target (the UAE's on the Arabic page) */
    target: { text: string; source: Source };
  };
  back: { title: string; steps: { when: string; stats: { figure: string; text: string }[] }[]; source: Source };
  note: string;
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
    sentence: {
      text: 'In 2022 the world wasted {1.05 billion} tonnes of food, about {one fifth} of what reached consumers, causing {8–10%} of global greenhouse gas emissions, almost {five times} aviation.',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    calc: {
      title: 'What could your kitchen be throwing away?',
      lead: 'Set your covers and food cost. The estimate updates as you go.',
      currency: 'EUR',
      cost: { value: 8, min: 2, max: 40, step: 0.5 },
      covers: 'Covers per day',
      coverHelp: 'A cover is one guest’s meal: one plate served at breakfast, lunch or dinner.',
      costLabel: 'Food cost per cover',
      days: 'Days open per year',
      bought: 'Food bought',
      wasted: 'Likely thrown away',
      wastedNote: 'About 18% of it, the food service average',
      kept: 'Kept by a first-year cut of 21%',
      keptNote: 'The average first-year cut in hotels that measured their waste',
      perYear: 'a year',
      note: 'An estimate from industry averages, not your numbers. A 30-day pilot measures yours.',
      measure: 'Measure my hotel’s waste →',
      demo: 'Try it in the demo →',
      sources: [
        { name: 'WRAP, UK Food Waste and Food Surplus Key Facts, July 2025', url: WRAP },
        { name: 'WRI and WRAP for Champions 12.3, 2018', url: WRI },
      ],
      target: {
        text: 'EU countries must cut food waste in retail, restaurants, food services and households by 30% per person by 2030, against their 2021–2023 average.',
        source: { name: 'EU Waste Framework Directive, 2025 amendment', url: EU },
      },
    },
    back: {
      title: 'What did hotels get back?',
      steps: [
        { when: 'First year', stats: [{ figure: '−21%', text: 'less kitchen food waste by weight, on average.' }] },
        { when: 'Within a year', stats: [{ figure: '70%+', text: 'of the hotels had their investment back.' }] },
        { when: 'Within two years', stats: [{ figure: '95%', text: 'of the hotels had their investment back.' }] },
        { when: 'Over three years', stats: [{ figure: '7×', text: 'nearly: what came back for what they invested.' }] },
      ],
      source: { name: 'WRI and WRAP for Champions 12.3, 2018 (42 hotel sites in 15 countries)', url: WRI },
    },
    note: 'Industry figures, not Tyll results.',
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
    sentence: {
      text: '2022 wurden weltweit {1,05 Milliarden} Tonnen Lebensmittel weggeworfen, etwa {ein Fünftel} dessen, was bei Verbrauchern ankam. Das verursacht {8–10 %} der weltweiten Treibhausgasemissionen, fast {fünfmal} so viel wie die Luftfahrt.',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    calc: {
      title: 'Was könnte Ihre Küche wegwerfen?',
      lead: 'Gedecke und Wareneinsatz einstellen. Die Schätzung passt sich sofort an.',
      currency: 'EUR',
      cost: { value: 8, min: 2, max: 40, step: 0.5 },
      covers: 'Gedecke pro Tag',
      coverHelp: 'Ein Gedeck ist die Mahlzeit eines Gastes: ein Teller zum Frühstück, Mittag- oder Abendessen.',
      costLabel: 'Wareneinsatz pro Gedeck',
      days: 'Öffnungstage pro Jahr',
      bought: 'Eingekaufte Lebensmittel',
      wasted: 'Davon vermutlich weggeworfen',
      wastedNote: 'Rund 18 % davon, der Durchschnitt in der Gastronomie',
      kept: 'Gespart mit 21 % weniger im ersten Jahr',
      keptNote: 'Die durchschnittliche Senkung im ersten Jahr in Hotels, die ihren Abfall gemessen haben',
      perYear: 'pro Jahr',
      note: 'Eine Schätzung aus Branchendurchschnitten, nicht Ihre Zahlen. Ein 30-Tage-Pilot misst Ihre.',
      measure: 'Abfall in meinem Hotel messen →',
      demo: 'In der Demo ausprobieren →',
      sources: [
        { name: 'WRAP, UK Food Waste and Food Surplus Key Facts, Juli 2025', url: WRAP },
        { name: 'WRI und WRAP für Champions 12.3, 2018', url: WRI },
      ],
      target: {
        text: 'Die EU-Länder müssen den Lebensmittelabfall in Handel, Restaurants, Gastronomie und Haushalten bis 2030 um 30 % pro Kopf senken, gegenüber dem Durchschnitt von 2021 bis 2023.',
        source: { name: 'EU-Abfallrahmenrichtlinie, Änderung 2025', url: EU },
      },
    },
    back: {
      title: 'Was haben Hotels zurückbekommen?',
      steps: [
        { when: 'Erstes Jahr', stats: [{ figure: '−21 %', text: 'weniger Küchenabfall nach Gewicht, im Durchschnitt.' }] },
        { when: 'Innerhalb eines Jahres', stats: [{ figure: '70 %+', text: 'der Hotels hatten ihre Investition zurück.' }] },
        { when: 'Innerhalb von zwei Jahren', stats: [{ figure: '95 %', text: 'der Hotels hatten ihre Investition zurück.' }] },
        { when: 'Über drei Jahre', stats: [{ figure: '7×', text: 'fast: so viel kam für das Investierte zurück.' }] },
      ],
      source: { name: 'WRI und WRAP für Champions 12.3, 2018 (42 Hotels in 15 Ländern)', url: WRI },
    },
    note: 'Branchenzahlen, keine Tyll-Ergebnisse.',
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
    sentence: {
      text: 'Nel 2022 il mondo ha sprecato {1,05 miliardi} di tonnellate di cibo, circa {un quinto} di quello arrivato ai consumatori, causando l’{8–10%} delle emissioni globali di gas serra, quasi {cinque volte} l’aviazione.',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    calc: {
      title: 'Quanto potrebbe buttare la tua cucina?',
      lead: 'Imposta coperti e costo del cibo. La stima si aggiorna subito.',
      currency: 'EUR',
      cost: { value: 8, min: 2, max: 40, step: 0.5 },
      covers: 'Coperti al giorno',
      coverHelp: 'Un coperto è il pasto di un ospite: un piatto servito a colazione, pranzo o cena.',
      costLabel: 'Costo del cibo per coperto',
      days: 'Giorni di apertura l’anno',
      bought: 'Cibo acquistato',
      wasted: 'Probabilmente buttato',
      wastedNote: 'Circa il 18%, la media della ristorazione',
      kept: 'Risparmiato con un taglio del 21% nel primo anno',
      keptNote: 'Il taglio medio del primo anno negli hotel che hanno misurato lo spreco',
      perYear: 'l’anno',
      note: 'Una stima da medie di settore, non i tuoi numeri. Un pilota di 30 giorni misura i tuoi.',
      measure: 'Misura lo spreco del mio hotel →',
      demo: 'Provalo nella demo →',
      sources: [
        { name: 'WRAP, UK Food Waste and Food Surplus Key Facts, luglio 2025', url: WRAP },
        { name: 'WRI e WRAP per Champions 12.3, 2018', url: WRI },
      ],
      target: {
        text: 'I paesi UE devono ridurre lo spreco alimentare in commercio, ristoranti, ristorazione e famiglie del 30% pro capite entro il 2030, rispetto alla media 2021–2023.',
        source: { name: 'Direttiva quadro UE sui rifiuti, modifica 2025', url: EU },
      },
    },
    back: {
      title: 'Cosa hanno recuperato gli hotel?',
      steps: [
        { when: 'Primo anno', stats: [{ figure: '−21%', text: 'di spreco in cucina, in peso, in media.' }] },
        { when: 'Entro un anno', stats: [{ figure: '70%+', text: 'degli hotel ha recuperato l’investimento.' }] },
        { when: 'Entro due anni', stats: [{ figure: '95%', text: 'degli hotel ha recuperato l’investimento.' }] },
        { when: 'In tre anni', stats: [{ figure: '7×', text: 'quasi: quanto è tornato per ciò che hanno investito.' }] },
      ],
      source: { name: 'WRI e WRAP per Champions 12.3, 2018 (42 hotel in 15 paesi)', url: WRI },
    },
    note: 'Dati di settore, non risultati di Tyll.',
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
    sentence: {
      text: 'في 2022 هدر العالم {1.05 مليار} طن من الطعام، أي نحو {الخُمس} مما وصل إلى المستهلكين، وتسبّب ذلك في {8–10%} من انبعاثات الغازات الدفيئة في العالم، أي نحو {خمسة أضعاف} انبعاثات الطيران.',
      source: { name: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP },
    },
    calc: {
      title: 'كم قد يرمي مطبخك؟',
      lead: 'اضبط عدد الوجبات وتكلفة الطعام. يتغير التقدير فورًا.',
      currency: 'AED',
      cost: { value: 30, min: 10, max: 160, step: 1 },
      covers: 'عدد الوجبات يوميًا',
      coverHelp: 'الوجبة هنا هي ما يتناوله ضيف واحد: طبق يُقدَّم في الإفطار أو الغداء أو العشاء.',
      costLabel: 'تكلفة الطعام لكل وجبة',
      days: 'أيام العمل في السنة',
      bought: 'الطعام المُشترى',
      wasted: 'ما يُرمى على الأرجح',
      wastedNote: 'نحو 18% منه، متوسط قطاع خدمات الطعام',
      kept: 'ما يُوفَّر بخفض 21% في السنة الأولى',
      keptNote: 'متوسط الخفض في السنة الأولى في الفنادق التي قاست هدرها',
      perYear: 'سنويًا',
      note: 'تقدير من متوسطات القطاع، وليس أرقامك. تجربة لمدة 30 يومًا تقيس أرقامك أنت.',
      measure: 'قِس هدر فندقي ←',
      demo: 'جرّبه في العرض التوضيحي ←',
      sources: [
        { name: 'WRAP، حقائق هدر الطعام في المملكة المتحدة، يوليو 2025', url: WRAP },
        { name: 'WRI وWRAP لصالح Champions 12.3، 2018', url: WRI },
      ],
      target: {
        text: 'تهدف الإمارات من خلال تعهد «نعمة» إلى خفض فقد الأغذية وهدرها بنسبة تصل إلى 50% بحلول 2030.',
        source: { name: 'The National، 8 ديسمبر 2024', url: NATIONAL },
      },
    },
    back: {
      title: 'ماذا استعادت الفنادق؟',
      steps: [
        { when: 'السنة الأولى', stats: [{ figure: '−21%', text: 'هدر أقل في المطبخ وزنًا، في المتوسط.' }] },
        { when: 'خلال عام', stats: [{ figure: '+70%', text: 'من الفنادق استعادت استثمارها.' }] },
        { when: 'خلال عامين', stats: [{ figure: '95%', text: 'من الفنادق استعادت استثمارها.' }] },
        { when: 'على مدى 3 سنوات', stats: [{ figure: '7×', text: 'تقريبًا: ما عاد مقابل ما استُثمر.' }] },
      ],
      source: { name: 'WRI وWRAP لصالح Champions 12.3، 2018 (42 فندقًا في 15 دولة)', url: WRI },
    },
    note: 'أرقام القطاع، وليست نتائج Tyll.',
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
