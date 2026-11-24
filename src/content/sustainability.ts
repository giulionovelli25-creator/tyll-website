// The Sustainability page (round 4, 24 Nov 2026, the owner's brief): a photo hero, a wall of the global numbers, what
// they mean in the countries Tyll works in, what hotels got back, then how Tyll helps. Every figure was checked against
// its source page on 24 Nov 2026; a figure that did not match its source exactly was left out (the HotellerieSuisse
// 24-francs quote, and a three-year frame for the 7× return). The UNEP pages refuse automated reads, so the four UNEP
// figures are the report's widely quoted headline numbers and are flagged for the owner to check before publishing.
// No figure here is a Tyll result, and none may be used as one: Tyll does not calculate CO2 or "kg saved". The 18%
// reads its sentence and source from the homepage's numbers (`home.why.cards[0]`), so the two always agree. Arabic
// shows the UAE first and has no EU card. Italian uses "tu", as the rest of the Italian site does.
import type { Locale } from '../i18n/routes';

const UNEP = 'https://www.unep.org/resources/publication/food-waste-index-report-2024';
const EU = 'https://food.ec.europa.eu/food-safety/food-waste/eu-food-waste-relevant-legislation/food-waste-reduction-targets_en';
const WRI = 'https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/';
const BMLEH = 'https://www.bmleh.de/DE/themen/ernaehrung/lebensmittelverschwendung/studie-lebensmittelabfaelle-deutschland.html';
const BREG = 'https://www.bundesregierung.de/breg-de/themen/nachhaltigkeitspolitik/weniger-lebensmittelabfaelle-2029762';
const BAFU = 'https://www.bafu.admin.ch/de/foodwaste';
const NATIONAL = 'https://www.thenationalnews.com/news/uae/2024/12/08/green-hospitality-how-hotels-are-embracing-new-ideas-to-reduce-waste';

type Source = { name: string; url: string };
type Stat = { figure: string; text: string };
export type SustainabilityCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  /** The numbers wall: the global figures, counting up together. The 18% is added from the homepage's numbers. */
  wall: { title: string; stats: (Stat & { source: Source })[] };
  /** What this means where we work: a sticky column on the start side, one card per country passing on the other */
  local: { title: string; lead: string; cards: { id: 'de' | 'ch' | 'ae' | 'eu'; place: string; stats: Stat[]; sources: Source[] }[] };
  /** What hotels got back, as a timeline: year one, year two, then the return overall */
  back: { title: string; steps: { when: string; stats: Stat[] }[]; source: Source };
  note: string;
  /** How Tyll helps, at the end: only what the product does and the owner's own pilot offer, never a saving or CO2
      figure for Tyll. `items` link to the solution pages named by `page`, at a row where `row` is set. */
  act: {
    title: string;
    lead: string;
    items: { page: 'waste' | 'expiry' | 'forecasting' | 'revenue'; row?: string; text: string }[];
    offer: string;
  };
  close: { title: string; waste: string };
};

export const sustainability: Record<Locale, SustainabilityCopy> = {
  en: {
    metaTitle: 'Food Waste and Sustainability in Hotels | Tyll',
    metaDescription: 'Food loss and waste causes 8–10% of global greenhouse gas emissions. What it means in Germany, Switzerland, the UAE and the EU, and what hotels got back by measuring kitchen waste, with every source linked.',
    title: 'Less food in the bin. Less money with it.',
    text: 'Every kilo thrown away was bought, stored and cooked first.',
    wall: {
      title: 'How much food goes to waste?',
      stats: [
        { figure: '1.05 bn', text: 'tonnes of food wasted in 2022.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
        { figure: '19%', text: 'of the food available to consumers, about one fifth.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
        { figure: '8–10%', text: 'of global greenhouse gas emissions, almost five times aviation.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
      ],
    },
    local: {
      title: 'What does this mean where we work?',
      lead: 'The same problem, counted by each country’s own government.',
      cards: [
        {
          id: 'de',
          place: 'Germany',
          stats: [
            { figure: '10.8 Mt', text: 'of food waste in 2022.' },
            { figure: '18%', text: 'of it from out-of-home catering.' },
            { figure: 'up to 35%', text: 'of prepared food in catering ends in the bin (2015 data).' },
          ],
          sources: [
            { name: 'BMLEH, food waste in Germany, 2022', url: BMLEH },
            { name: 'Federal Government, 2022 (archive)', url: BREG },
          ],
        },
        {
          id: 'ch',
          place: 'Switzerland',
          stats: [
            { figure: '2.8 Mt', text: 'of food lost each year through Swiss consumption, including abroad.' },
            { figure: '310 kg', text: 'of avoidable food loss per person per year.' },
          ],
          sources: [{ name: 'BAFU, Federal Office for the Environment', url: BAFU }],
        },
        {
          id: 'ae',
          place: 'United Arab Emirates',
          stats: [
            { figure: 'AED 6 bn', text: 'of food wasted in the Emirates each year, by Ne’ma’s estimate.' },
            { figure: 'up to 50%', text: 'less food loss and waste by 2030, the aim of the Ne’ma Pledge.' },
          ],
          sources: [{ name: 'The National, 8 December 2024', url: NATIONAL }],
        },
        {
          id: 'eu',
          place: 'European Union',
          stats: [{ figure: '30%', text: 'less food waste per person in restaurants, food services, retail and households by 2030.' }],
          sources: [{ name: 'EU Waste Framework Directive, 2025 amendment', url: EU }],
        },
      ],
    },
    back: {
      title: 'What did hotels get back?',
      steps: [
        { when: 'Year 1', stats: [{ figure: '−21%', text: 'kitchen food waste, on average.' }, { figure: '70%+', text: 'of hotels had their investment back.' }] },
        { when: 'Year 2', stats: [{ figure: '95%', text: 'of hotels had their investment back.' }] },
        { when: 'Overall', stats: [{ figure: '7×', text: 'back for every 1 invested in cutting kitchen food waste.' }] },
      ],
      source: { name: 'WRI and WRAP for Champions 12.3, 2018 (42 hotels in 15 countries)', url: WRI },
    },
    note: 'Industry figures, not Tyll results.',
    act: {
      title: 'How does Tyll help you waste less?',
      lead: 'The hotels in that study started by measuring their waste. With Tyll your team measures it every day, with no scales or cameras to install.',
      items: [
        { page: 'waste', text: 'Waste logged in two taps: the item, the amount and the reason. Food, beverage and inventory kept separate.' },
        { page: 'expiry', text: 'Expiring batches flagged with what to do: use first, move to another outlet, make it tonight’s special, or serve it as the staff meal.' },
        { page: 'forecasting', text: 'Orders built from real use, so less is bought only to expire.' },
        { page: 'revenue', row: 'reports', text: 'Waste by outlet and by month, as PDF or CSV, ready for your sustainability report.' },
      ],
      offer: 'We start with a free 30 day pilot on your own data. If the pilot finds no real money, you pay nothing.',
    },
    close: { title: 'See what your hotel throws away.', waste: 'See what waste costs you →' },
  },
  de: {
    metaTitle: 'Lebensmittelabfall und Nachhaltigkeit im Hotel | Tyll',
    metaDescription: 'Lebensmittelverluste und -abfälle verursachen 8–10 % der weltweiten Treibhausgasemissionen. Was das in Deutschland, der Schweiz, den VAE und der EU bedeutet, und was Hotels zurückbekamen, mit allen Quellen.',
    title: 'Weniger Essen im Müll. Weniger Geld gleich mit.',
    text: 'Jedes Kilo, das weggeworfen wird, wurde vorher gekauft, gelagert und gekocht.',
    wall: {
      title: 'Wie viel Essen wird weggeworfen?',
      stats: [
        { figure: '1,05 Mrd.', text: 'Tonnen Lebensmittel wurden 2022 weggeworfen.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
        { figure: '19 %', text: 'der Lebensmittel, die Verbrauchern zur Verfügung stehen, etwa ein Fünftel.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
        { figure: '8–10 %', text: 'der weltweiten Treibhausgasemissionen, fast fünfmal so viel wie die Luftfahrt.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
      ],
    },
    local: {
      title: 'Was heißt das dort, wo wir arbeiten?',
      lead: 'Dasselbe Problem, gezählt von der Regierung jedes Landes.',
      cards: [
        {
          id: 'de',
          place: 'Deutschland',
          stats: [
            { figure: '10,8 Mio. t', text: 'Lebensmittelabfälle im Jahr 2022.' },
            { figure: '18 %', text: 'davon aus der Außer-Haus-Verpflegung.' },
            { figure: 'bis zu 35 %', text: 'der zubereiteten Lebensmittel in der Gastronomie landen im Müll (Daten von 2015).' },
          ],
          sources: [
            { name: 'BMLEH, Lebensmittelabfälle in Deutschland, 2022', url: BMLEH },
            { name: 'Bundesregierung, 2022 (Archiv)', url: BREG },
          ],
        },
        {
          id: 'ch',
          place: 'Schweiz',
          stats: [
            { figure: '2,8 Mio. t', text: 'Lebensmittelverluste pro Jahr durch den Konsum der Schweiz, auch im Ausland.' },
            { figure: '310 kg', text: 'vermeidbare Lebensmittelverluste pro Person und Jahr.' },
          ],
          sources: [{ name: 'BAFU, Bundesamt für Umwelt', url: BAFU }],
        },
        {
          id: 'ae',
          place: 'Vereinigte Arabische Emirate',
          stats: [
            { figure: '6 Mrd. AED', text: 'an Lebensmitteln werden in den Emiraten jährlich verschwendet, schätzt Ne’ma.' },
            { figure: 'bis zu 50 %', text: 'weniger Lebensmittelverluste und -abfälle bis 2030, das Ziel des Ne’ma Pledge.' },
          ],
          sources: [{ name: 'The National, 8. Dezember 2024', url: NATIONAL }],
        },
        {
          id: 'eu',
          place: 'Europäische Union',
          stats: [{ figure: '30 %', text: 'weniger Lebensmittelabfall pro Kopf in Restaurants, Gastronomie, Handel und Haushalten bis 2030.' }],
          sources: [{ name: 'EU-Abfallrahmenrichtlinie, Änderung 2025', url: EU }],
        },
      ],
    },
    back: {
      title: 'Was haben Hotels zurückbekommen?',
      steps: [
        { when: 'Jahr 1', stats: [{ figure: '−21 %', text: 'Küchenabfall, im Durchschnitt.' }, { figure: '70 %+', text: 'der Hotels hatten ihre Investition zurück.' }] },
        { when: 'Jahr 2', stats: [{ figure: '95 %', text: 'der Hotels hatten ihre Investition zurück.' }] },
        { when: 'Insgesamt', stats: [{ figure: '7×', text: 'kam die Investition in weniger Küchenabfall zurück.' }] },
      ],
      source: { name: 'WRI und WRAP für Champions 12.3, 2018 (42 Hotels in 15 Ländern)', url: WRI },
    },
    note: 'Branchenzahlen, keine Tyll-Ergebnisse.',
    act: {
      title: 'Wie hilft Tyll, weniger wegzuwerfen?',
      lead: 'Die Hotels dieser Studie haben damit begonnen, ihren Abfall zu messen. Mit Tyll misst Ihr Team ihn jeden Tag, ohne Waagen oder Kameras zu installieren.',
      items: [
        { page: 'waste', text: 'Abfall in zwei Fingertipps erfasst: Artikel, Menge und Grund. Speisen, Getränke und Inventar getrennt.' },
        { page: 'expiry', text: 'Ablaufende Chargen mit klarem Vorschlag: zuerst verbrauchen, an ein anderes Outlet geben, als Tagesgericht anbieten oder fürs Personalessen nutzen.' },
        { page: 'forecasting', text: 'Bestellungen nach echtem Verbrauch, damit weniger gekauft wird, das dann abläuft.' },
        { page: 'revenue', row: 'reports', text: 'Abfall pro Outlet und Monat, als PDF oder CSV, fertig für Ihren Nachhaltigkeitsbericht.' },
      ],
      offer: 'Wir beginnen mit einem kostenlosen 30-Tage-Piloten mit Ihren eigenen Daten. Findet der Pilot kein echtes Geld, zahlen Sie nichts.',
    },
    close: { title: 'Sehen Sie, was Ihr Hotel wegwirft.', waste: 'Sehen, was Abfall Sie kostet →' },
  },
  it: {
    metaTitle: 'Spreco alimentare e sostenibilità negli hotel | Tyll',
    metaDescription: 'Perdite e sprechi alimentari causano l’8–10% delle emissioni globali di gas serra. Cosa significa in Germania, Svizzera, Emirati e UE, e cosa hanno recuperato gli hotel, con tutte le fonti.',
    title: 'Meno cibo nel cestino. E meno soldi con lui.',
    text: 'Ogni chilo buttato è stato prima comprato, conservato e cucinato.',
    wall: {
      title: 'Quanto cibo viene sprecato?',
      stats: [
        { figure: '1,05 mld', text: 'di tonnellate di cibo sprecate nel 2022.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
        { figure: '19%', text: 'del cibo disponibile ai consumatori, circa un quinto.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
        { figure: '8–10%', text: 'delle emissioni globali di gas serra, quasi cinque volte l’aviazione.', source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP } },
      ],
    },
    local: {
      title: 'Cosa significa dove lavoriamo?',
      lead: 'Lo stesso problema, contato dal governo di ogni paese.',
      cards: [
        {
          id: 'de',
          place: 'Germania',
          stats: [
            { figure: '10,8 Mt', text: 'di rifiuti alimentari nel 2022.' },
            { figure: '18%', text: 'dalla ristorazione fuori casa.' },
            { figure: 'fino al 35%', text: 'del cibo preparato nella ristorazione finisce nel bidone (dati 2015).' },
          ],
          sources: [
            { name: 'BMLEH, rifiuti alimentari in Germania, 2022', url: BMLEH },
            { name: 'Governo federale, 2022 (archivio)', url: BREG },
          ],
        },
        {
          id: 'ch',
          place: 'Svizzera',
          stats: [
            { figure: '2,8 Mt', text: 'di perdite alimentari l’anno dovute ai consumi svizzeri, anche all’estero.' },
            { figure: '310 kg', text: 'di perdite alimentari evitabili a persona l’anno.' },
          ],
          sources: [{ name: 'UFAM, Ufficio federale dell’ambiente', url: BAFU }],
        },
        {
          id: 'ae',
          place: 'Emirati Arabi Uniti',
          stats: [
            { figure: '6 mld AED', text: 'di cibo sprecato ogni anno negli Emirati, secondo le stime di Ne’ma.' },
            { figure: 'fino al 50%', text: 'in meno di perdite e sprechi alimentari entro il 2030, l’obiettivo del Ne’ma Pledge.' },
          ],
          sources: [{ name: 'The National, 8 dicembre 2024', url: NATIONAL }],
        },
        {
          id: 'eu',
          place: 'Unione europea',
          stats: [{ figure: '30%', text: 'in meno di spreco alimentare pro capite in ristoranti, ristorazione, commercio e famiglie entro il 2030.' }],
          sources: [{ name: 'Direttiva quadro UE sui rifiuti, modifica 2025', url: EU }],
        },
      ],
    },
    back: {
      title: 'Cosa hanno recuperato gli hotel?',
      steps: [
        { when: 'Anno 1', stats: [{ figure: '−21%', text: 'di spreco in cucina, in media.' }, { figure: '70%+', text: 'degli hotel ha recuperato l’investimento.' }] },
        { when: 'Anno 2', stats: [{ figure: '95%', text: 'degli hotel ha recuperato l’investimento.' }] },
        { when: 'Nel complesso', stats: [{ figure: '7×', text: 'il ritorno dell’investimento contro lo spreco in cucina.' }] },
      ],
      source: { name: 'WRI e WRAP per Champions 12.3, 2018 (42 hotel in 15 paesi)', url: WRI },
    },
    note: 'Dati di settore, non risultati Tyll.',
    act: {
      title: 'Come ti aiuta Tyll a sprecare meno?',
      lead: 'Gli hotel di quello studio hanno iniziato misurando lo spreco. Con Tyll il tuo team lo misura ogni giorno, senza bilance o telecamere da installare.',
      items: [
        { page: 'waste', text: 'Spreco registrato in due tocchi: prodotto, quantità e motivo. Cibo, bevande e inventario separati.' },
        { page: 'expiry', text: 'Lotti in scadenza segnalati con cosa fare: usarli per primi, spostarli in un altro punto vendita, farne il piatto di stasera o usarli per il pasto del personale.' },
        { page: 'forecasting', text: 'Ordini basati sul consumo reale, così si compra meno merce destinata a scadere.' },
        { page: 'revenue', row: 'reports', text: 'Spreco per punto vendita e per mese, in PDF o CSV, pronto per il tuo report di sostenibilità.' },
      ],
      offer: 'Iniziamo con un pilota gratuito di 30 giorni sui tuoi dati. Se il pilota non trova soldi veri, non paghi nulla.',
    },
    close: { title: 'Scopri cosa butta via il tuo hotel.', waste: 'Scopri quanto ti costa lo spreco →' },
  },
  ar: {
    metaTitle: 'هدر الطعام والاستدامة في الفنادق | Tyll',
    metaDescription: 'يسبب فقد الأغذية وهدرها 8–10% من انبعاثات الغازات الدفيئة في العالم. ماذا يعني ذلك في الإمارات وألمانيا وسويسرا، وما الذي استعادته الفنادق، مع كل المصادر.',
    title: 'طعام أقل في سلة المهملات، ومال أقل معه.',
    text: 'كل كيلوغرام يُرمى تم شراؤه وتخزينه وطهيه أولاً.',
    wall: {
      title: 'كم من الطعام يُهدر؟',
      stats: [
        { figure: '1.05 مليار', text: 'طن من الطعام هُدر في 2022.', source: { name: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP } },
        { figure: '19%', text: 'من الطعام المتاح للمستهلكين، أي نحو الخُمس.', source: { name: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP } },
        { figure: '8–10%', text: 'من انبعاثات الغازات الدفيئة في العالم، أي نحو خمسة أضعاف الطيران.', source: { name: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP } },
      ],
    },
    local: {
      title: 'ماذا يعني هذا حيث نعمل؟',
      lead: 'المشكلة نفسها، كما تحسبها حكومة كل بلد.',
      cards: [
        {
          id: 'ae',
          place: 'الإمارات العربية المتحدة',
          stats: [
            { figure: '6 مليارات درهم', text: 'قيمة الطعام المهدر في الإمارات سنويًا، وفق تقدير «نعمة».' },
            { figure: 'حتى 50%', text: 'خفض فقد الأغذية وهدرها بحلول 2030، هدف تعهد «نعمة».' },
          ],
          sources: [{ name: 'The National، 8 ديسمبر 2024', url: NATIONAL }],
        },
        {
          id: 'de',
          place: 'ألمانيا',
          stats: [
            { figure: '10.8 مليون طن', text: 'من نفايات الطعام في 2022.' },
            { figure: '18%', text: 'منها من الطعام خارج المنزل.' },
            { figure: 'حتى 35%', text: 'من الطعام المُحضَّر في المطاعم وخدمات الطعام ينتهي في سلة المهملات (بيانات 2015).' },
          ],
          sources: [
            { name: 'BMLEH، نفايات الطعام في ألمانيا، 2022', url: BMLEH },
            { name: 'الحكومة الاتحادية الألمانية، 2022 (أرشيف)', url: BREG },
          ],
        },
        {
          id: 'ch',
          place: 'سويسرا',
          stats: [
            { figure: '2.8 مليون طن', text: 'من فاقد الأغذية سنويًا بسبب الاستهلاك السويسري، بما في ذلك في الخارج.' },
            { figure: '310 كغ', text: 'من فاقد الأغذية الممكن تجنبه للشخص سنويًا.' },
          ],
          sources: [{ name: 'BAFU، المكتب الاتحادي السويسري للبيئة', url: BAFU }],
        },
      ],
    },
    back: {
      title: 'ماذا استعادت الفنادق؟',
      steps: [
        { when: 'السنة الأولى', stats: [{ figure: '−21%', text: 'من هدر المطبخ، في المتوسط.' }, { figure: '+70%', text: 'من الفنادق استعادت استثمارها.' }] },
        { when: 'السنة الثانية', stats: [{ figure: '95%', text: 'من الفنادق استعادت استثمارها.' }] },
        { when: 'إجمالًا', stats: [{ figure: '7×', text: 'عائد مقابل كل وحدة استُثمرت في خفض هدر المطبخ.' }] },
      ],
      source: { name: 'WRI وWRAP لصالح Champions 12.3، 2018 (42 فندقًا في 15 بلدًا)', url: WRI },
    },
    note: 'أرقام القطاع، وليست نتائج Tyll.',
    act: {
      title: 'كيف يساعدك Tyll على تقليل الهدر؟',
      lead: 'بدأت فنادق تلك الدراسة بقياس هدرها. ومع Tyll يقيسه فريقك كل يوم، دون موازين أو كاميرات للتركيب.',
      items: [
        { page: 'waste', text: 'تسجيل الهدر بنقرتين: الصنف والكمية والسبب، مع فصل الطعام والمشروبات والمستلزمات.' },
        { page: 'expiry', text: 'تنبيه بالدفعات القريبة من انتهاء الصلاحية مع الإجراء المقترح: استخدامها أولاً، أو نقلها إلى منفذ آخر، أو جعلها طبق الليلة الخاص، أو لوجبة الموظفين.' },
        { page: 'forecasting', text: 'طلبات مبنية على الاستهلاك الفعلي، لتقليل شراء ما تنتهي صلاحيته.' },
        { page: 'revenue', row: 'reports', text: 'الهدر حسب المنفذ والشهر، بصيغة PDF أو CSV، جاهز لتقرير الاستدامة.' },
      ],
      offer: 'نبدأ بتجربة مجانية مدتها 30 يومًا على بياناتك أنت. إذا لم تجد التجربة أموالًا حقيقية، فلن تدفع شيئًا.',
    },
    close: { title: 'اعرف ما يرميه فندقك.', waste: 'اعرف كم يكلفك الهدر ←' },
  },
};
