// The Sustainability page (20 Nov 2026, the owner's brief): the problem and the numbers, nothing about what Tyll does.
// Each figure is drawn as a small chart beside its sentence and its source. Arabic shows the UAE's 50% target in place
// of the EU's 30%. No figure here is a Tyll result, and none may be used as one: Tyll does not calculate CO2 or
// "kg saved". The 18% row reads its sentence and source from the homepage's numbers (`home.why.cards[0]`), so the two
// always agree. Italian uses "tu", as the rest of the Italian site does.
import type { Locale } from '../i18n/routes';

const UNEP = 'https://www.unep.org/resources/publication/food-waste-index-report-2024';
const EU = 'https://food.ec.europa.eu/food-safety/food-waste/eu-food-waste-relevant-legislation/food-waste-reduction-targets_en';
const WRI = 'https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/';
const NEMA = 'https://www.wam.ae/article/aq2fed7-nema-unveils-results-hospitality-sector-trial-food';

type Source = { name: string; url: string };
export type SustainabilityCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  /** The hero's two bars: food loss and waste against aviation, one fifth as long */
  /** `times`: each bar's value against aviation, from the source's own words (almost five times aviation) */
  bars: { food: string; foodValue: string; aviation: string; times: [string, string]; caption: string; source: Source };
  /** The reduction target: the EU's 30% (UAE's 50% in Arabic), drawn as a timeline whose bar shortens by that much */
  target: { cut: number; figure: string; text: string; from: string; to: string; source: Source };
  measure: {
    title: string;
    stats: { figure: string; text: string }[];
    source: Source;
  };
  note: string;
  /** How Tyll helps, at the end (20 Nov 2026, the owner): only what the product does and the owner's own pilot offer,
      never a saving or CO2 figure for Tyll. `items` link to the solution pages named by `page`. */
  act: {
    title: string;
    lead: string;
    items: { page: 'waste' | 'stock' | 'forecasting' | 'revenue'; row?: string; text: string }[];
    offer: string;
  };
  close: { title: string; waste: string };
};

export const sustainability: Record<Locale, SustainabilityCopy> = {
  en: {
    metaTitle: 'Food Waste and Sustainability in Hotels | Tyll',
    metaDescription: 'Food loss and waste causes 8–10% of global greenhouse gas emissions. What the research says hotels gain by measuring kitchen waste, with every source linked.',
    title: 'Less food in the bin. Less money with it.',
    text: 'Every kilo thrown away was bought, stored and cooked first.',
    bars: {
      food: 'Food loss and waste',
      foodValue: '8–10% of global greenhouse gas emissions',
      aviation: 'Aviation',
      times: ['almost 5×', '1×'],
      caption: 'Food loss and waste causes almost five times the emissions of aviation.',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    target: {
      cut: 30,
      figure: '30%',
      text: 'EU countries must cut food waste in restaurants, food services, retail and households by 30% per person by 2030.',
      from: '2021–2023 average',
      to: '2030',
      source: { name: 'EU Waste Framework Directive, 2025 amendment', url: EU },
    },
    measure: {
      title: 'Hotels that measure their waste, save.',
      stats: [
        { figure: '7×', text: 'back for every 1 invested in cutting kitchen food waste.' },
        { figure: '−21%', text: 'less kitchen food waste in the first year, on average.' },
        { figure: '70%+', text: 'of hotels had their investment back within a year.' },
      ],
      source: { name: 'WRI and WRAP for Champions 12.3, 2018 (42 hotels in 15 countries)', url: WRI },
    },
    note: 'Industry figures, not Tyll results.',
    act: {
      title: 'How does Tyll help you waste less?',
      lead: 'The hotels in that study started by measuring their waste. With Tyll your team measures it every day, with no scales or cameras to install.',
      items: [
        { page: 'waste', text: 'Waste logged in two taps: the item, the amount and the reason. Food, beverage and inventory kept separate.' },
        { page: 'stock', row: 'expiring', text: 'Expiring batches flagged with what to do: use first, move to another outlet, run a special, or serve it as the staff meal.' },
        { page: 'forecasting', text: 'Orders built from real use, so less is bought only to expire.' },
        { page: 'revenue', row: 'reports', text: 'Waste by outlet and by month, as PDF or CSV, ready for your sustainability report.' },
      ],
      offer: 'We start with a free 30 day pilot on your own data. If the pilot finds no real money, you pay nothing.',
    },
    close: { title: 'See what your hotel throws away.', waste: 'See what waste costs you →' },
  },
  de: {
    metaTitle: 'Lebensmittelabfall und Nachhaltigkeit im Hotel | Tyll',
    metaDescription: 'Lebensmittelverluste und -abfälle verursachen 8–10 % der weltweiten Treibhausgasemissionen. Was Hotels laut Studien gewinnen, wenn sie Küchenabfall messen, mit allen Quellen.',
    title: 'Weniger Essen im Müll. Weniger Geld gleich mit.',
    text: 'Jedes Kilo, das weggeworfen wird, wurde vorher gekauft, gelagert und gekocht.',
    bars: {
      food: 'Lebensmittelverluste und -abfälle',
      foodValue: '8–10 % der weltweiten Treibhausgasemissionen',
      aviation: 'Luftfahrt',
      times: ['fast 5×', '1×'],
      caption: 'Lebensmittelverluste und -abfälle verursachen fast fünfmal so viele Emissionen wie die Luftfahrt.',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    target: {
      cut: 30,
      figure: '30 %',
      text: 'EU-Länder müssen den Lebensmittelabfall in Restaurants, Gastronomie, Handel und Haushalten bis 2030 um 30 % pro Kopf senken.',
      from: 'Durchschnitt 2021–2023',
      to: '2030',
      source: { name: 'EU-Abfallrahmenrichtlinie, Änderung 2025', url: EU },
    },
    measure: {
      title: 'Hotels, die ihren Abfall messen, sparen.',
      stats: [
        { figure: '7×', text: 'zurück für jeden Euro, der in weniger Küchenabfall investiert wurde.' },
        { figure: '−21 %', text: 'weniger Küchenabfall im ersten Jahr, im Schnitt.' },
        { figure: '70 %+', text: 'der Hotels hatten ihre Investition innerhalb eines Jahres wieder herein.' },
      ],
      source: { name: 'WRI und WRAP für Champions 12.3, 2018 (42 Hotels in 15 Ländern)', url: WRI },
    },
    note: 'Branchenzahlen, keine Tyll-Ergebnisse.',
    act: {
      title: 'Wie hilft Tyll, weniger wegzuwerfen?',
      lead: 'Die Hotels dieser Studie haben damit begonnen, ihren Abfall zu messen. Mit Tyll misst Ihr Team ihn jeden Tag, ohne Waagen oder Kameras zu installieren.',
      items: [
        { page: 'waste', text: 'Abfall in zwei Taps erfasst: Artikel, Menge und Grund. Speisen, Getränke und Inventar getrennt.' },
        { page: 'stock', row: 'expiring', text: 'Ablaufende Chargen mit klarem Vorschlag: zuerst verbrauchen, an ein anderes Outlet geben, als Special anbieten oder fürs Personalessen nutzen.' },
        { page: 'forecasting', text: 'Bestellungen nach echtem Verbrauch, damit weniger gekauft wird, das dann abläuft.' },
        { page: 'revenue', row: 'reports', text: 'Abfall pro Outlet und Monat, als PDF oder CSV, fertig für Ihren Nachhaltigkeitsbericht.' },
      ],
      offer: 'Wir beginnen mit einem kostenlosen 30-Tage-Piloten mit Ihren eigenen Daten. Findet der Pilot kein echtes Geld, zahlen Sie nichts.',
    },
    close: { title: 'Sehen Sie, was Ihr Hotel wegwirft.', waste: 'Sehen, was Abfall Sie kostet →' },
  },
  it: {
    metaTitle: 'Spreco alimentare e sostenibilità negli hotel | Tyll',
    metaDescription: 'Perdite e sprechi alimentari causano l’8–10% delle emissioni globali di gas serra. Cosa guadagnano gli hotel che misurano lo spreco in cucina, con tutte le fonti.',
    title: 'Meno cibo nel cestino. E meno soldi con lui.',
    text: 'Ogni chilo buttato è stato prima comprato, conservato e cucinato.',
    bars: {
      food: 'Perdite e sprechi alimentari',
      foodValue: '8–10% delle emissioni globali di gas serra',
      aviation: 'Aviazione',
      times: ['quasi 5×', '1×'],
      caption: 'Perdite e sprechi alimentari causano quasi cinque volte le emissioni dell’aviazione.',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    target: {
      cut: 30,
      figure: '30%',
      text: 'I paesi dell’UE devono ridurre lo spreco alimentare in ristoranti, ristorazione, commercio e famiglie del 30% pro capite entro il 2030.',
      from: 'Media 2021–2023',
      to: '2030',
      source: { name: 'Direttiva quadro UE sui rifiuti, modifica 2025', url: EU },
    },
    measure: {
      title: 'Gli hotel che misurano lo spreco risparmiano.',
      stats: [
        { figure: '7×', text: 'di ritorno per ogni euro investito per ridurre lo spreco in cucina.' },
        { figure: '−21%', text: 'di spreco in cucina in meno nel primo anno, in media.' },
        { figure: 'Oltre il 70%', text: 'degli hotel ha recuperato l’investimento entro un anno.' },
      ],
      source: { name: 'WRI e WRAP per Champions 12.3, 2018 (42 hotel in 15 paesi)', url: WRI },
    },
    note: 'Dati di settore, non risultati Tyll.',
    act: {
      title: 'Come ti aiuta Tyll a sprecare meno?',
      lead: 'Gli hotel di quello studio hanno iniziato misurando lo spreco. Con Tyll il tuo team lo misura ogni giorno, senza bilance o telecamere da installare.',
      items: [
        { page: 'waste', text: 'Spreco registrato in due tocchi: prodotto, quantità e motivo. Cibo, bevande e inventario separati.' },
        { page: 'stock', row: 'expiring', text: 'Lotti in scadenza segnalati con cosa fare: usarli per primi, spostarli in un altro punto vendita, proporli come special o usarli per il pasto del personale.' },
        { page: 'forecasting', text: 'Ordini basati sul consumo reale, così si compra meno merce destinata a scadere.' },
        { page: 'revenue', row: 'reports', text: 'Spreco per punto vendita e per mese, in PDF o CSV, pronto per il tuo report di sostenibilità.' },
      ],
      offer: 'Iniziamo con un pilota gratuito di 30 giorni sui tuoi dati. Se il pilota non trova soldi veri, non paghi nulla.',
    },
    close: { title: 'Scopri cosa butta via il tuo hotel.', waste: 'Scopri quanto ti costa lo spreco →' },
  },
  ar: {
    metaTitle: 'هدر الطعام والاستدامة في الفنادق | Tyll',
    metaDescription: 'يسبب فقد الأغذية وهدرها 8–10% من انبعاثات الغازات الدفيئة في العالم. ما تكسبه الفنادق التي تقيس هدر مطابخها وفق الأبحاث، مع كل المصادر.',
    title: 'طعام أقل في سلة المهملات، ومال أقل معه.',
    text: 'كل كيلوغرام يُرمى تم شراؤه وتخزينه وطهيه أولاً.',
    bars: {
      food: 'فقد الأغذية وهدرها',
      foodValue: '8–10% من انبعاثات الغازات الدفيئة في العالم',
      aviation: 'الطيران',
      times: ['نحو 5×', '1×'],
      caption: 'يسبب فقد الأغذية وهدرها نحو خمسة أضعاف انبعاثات الطيران.',
      source: { name: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP },
    },
    target: {
      cut: 50,
      figure: '50%',
      text: 'الهدف الوطني لدولة الإمارات هو خفض فقد الأغذية وهدرها بنسبة 50% بحلول 2030.',
      from: 'اليوم',
      to: '2030',
      source: { name: 'نعمة، المبادرة الوطنية لخفض فقد وهدر الغذاء', url: NEMA },
    },
    measure: {
      title: 'الفنادق التي تقيس هدرها توفّر.',
      stats: [
        { figure: '7×', text: 'عائد مقابل كل وحدة تُستثمر في خفض هدر المطبخ.' },
        { figure: '−21%', text: 'أقل في هدر المطبخ في السنة الأولى، في المتوسط.' },
        { figure: 'أكثر من 70%', text: 'من الفنادق استعادت استثمارها خلال سنة واحدة.' },
      ],
      source: { name: 'WRI وWRAP لصالح Champions 12.3، 2018 (42 فندقًا في 15 دولة)', url: WRI },
    },
    note: 'أرقام القطاع، وليست نتائج Tyll.',
    act: {
      title: 'كيف يساعدك Tyll على تقليل الهدر؟',
      lead: 'بدأت فنادق تلك الدراسة بقياس هدرها. ومع Tyll يقيسه فريقك كل يوم، دون موازين أو كاميرات للتركيب.',
      items: [
        { page: 'waste', text: 'تسجيل الهدر بلمستين: الصنف والكمية والسبب، مع فصل الطعام والمشروبات والمعدات.' },
        { page: 'stock', row: 'expiring', text: 'تنبيه بالدفعات القريبة من انتهاء الصلاحية مع الإجراء المقترح: استخدامها أولاً، أو نقلها إلى منفذ آخر، أو تقديمها كطبق خاص، أو لوجبة الموظفين.' },
        { page: 'forecasting', text: 'طلبات مبنية على الاستهلاك الفعلي، لتقليل شراء ما تنتهي صلاحيته.' },
        { page: 'revenue', row: 'reports', text: 'الهدر حسب المنفذ والشهر، بصيغة PDF أو CSV، جاهز لتقرير الاستدامة.' },
      ],
      offer: 'نبدأ بتجربة مجانية مدتها 30 يومًا على بياناتك أنت. إذا لم تجد التجربة أموالًا حقيقية، فلن تدفع شيئًا.',
    },
    close: { title: 'اعرف ما يرميه فندقك.', waste: 'اعرف كم يكلفك الهدر ←' },
  },
};
