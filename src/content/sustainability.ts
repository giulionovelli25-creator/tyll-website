// The sustainability band (19 Nov 2026, the owner's brief, copy word for word): a headline, four sourced industry
// figures and what Tyll does about food waste. Shown on the homepage, the Log waste page and the hotel groups page.
// Arabic swaps the EU target for the UAE's national target. No figure here is a Tyll result, and none may be used
// as one: Tyll does not calculate CO2 or "kg saved". Italian uses "tu", as the rest of the Italian site does.
import type { Locale } from '../i18n/routes';

export type Stat = { figure: string; text: string; source: string; url: string };
export type Band = {
  eyebrow: string;
  title: string;
  intro: string;
  stats: Stat[];
  note: string;
  listTitle: string;
  list: string[];
  wasteLink: string;
};

const UNEP = 'https://www.unep.org/resources/publication/food-waste-index-report-2024';
const EU = 'https://food.ec.europa.eu/food-safety/food-waste/eu-food-waste-relevant-legislation/food-waste-reduction-targets_en';
const WRI = 'https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/';
// The brief's WAM link could not be reached from here (wam.ae refused every connection, 19 Nov 2026); this is the
// government's press release on the Ne'ma roadmap and its 50% target, as published on Zawya.
const NEMA = 'https://www.zawya.com/en/press-release/government-news/he-mariam-almheiri-launches-nema-food-loss-and-waste-reduction-roadmap-to-reduce-food-waste-in-the-uae-50-by-2030-ou71qwxt';

export const band: Record<Locale, Band> = {
  en: {
    eyebrow: 'Sustainability',
    title: 'Less food in the bin. Less money with it.',
    intro: 'Every kilo thrown away was bought, stored and cooked first. Tyll shows which items, outlets and reasons waste the most, and orders from what you really use, so less is bought only to be thrown away.',
    stats: [
      { figure: '8–10%', text: 'of global greenhouse gas emissions come from food loss and waste.', source: 'UNEP, Food Waste Index Report 2024', url: UNEP },
      { figure: '30%', text: 'less food waste per person in restaurants, food services, retail and households: the EU’s binding target for 2030.', source: 'EU Waste Framework Directive, 2025 amendment', url: EU },
      { figure: '−21%', text: 'kitchen food waste in the first year, on average, in hotels that measured it.', source: 'WRI and WRAP for Champions 12.3, 2018 (42 hotels, 15 countries)', url: WRI },
      { figure: '70%+', text: 'of those hotels had their investment back within a year.', source: 'WRI and WRAP for Champions 12.3, 2018', url: WRI },
    ],
    note: 'Industry figures, not Tyll results.',
    listTitle: 'What Tyll does about it',
    list: [
      'Waste logged in two taps: the item, the amount and the reason. Food, beverage and inventory kept separate.',
      'Orders built from real use, so less is bought only to expire.',
      'Expiring batches flagged with what to do: use first, move to another outlet, run a special, or serve it as the staff meal.',
      'No scales or cameras to install.',
      'Waste by outlet and by month, as PDF or CSV, ready for your sustainability report.',
    ],
    wasteLink: 'See what waste costs you →',
  },
  de: {
    eyebrow: 'Nachhaltigkeit',
    title: 'Weniger Essen im Müll. Weniger Geld gleich mit.',
    intro: 'Jedes Kilo, das weggeworfen wird, wurde vorher gekauft, gelagert und gekocht. Tyll zeigt, welche Artikel, Outlets und Gründe den meisten Abfall verursachen, und bestellt nach dem, was Sie wirklich verbrauchen. So wird weniger gekauft, nur um es wegzuwerfen.',
    stats: [
      { figure: '8–10 %', text: 'der weltweiten Treibhausgasemissionen stammen aus Lebensmittelverlusten und -abfällen.', source: 'UNEP, Food Waste Index Report 2024', url: UNEP },
      { figure: '30 %', text: 'weniger Lebensmittelabfall pro Kopf in Restaurants, Gastronomie, Handel und Haushalten: das verbindliche EU-Ziel für 2030.', source: 'EU-Abfallrahmenrichtlinie, Änderung 2025', url: EU },
      { figure: '−21 %', text: 'Küchenabfall im ersten Jahr, im Schnitt, in Hotels, die ihn gemessen haben.', source: 'WRI und WRAP für Champions 12.3, 2018; 42 Hotels, 15 Länder', url: WRI },
      { figure: '70 %+', text: 'dieser Hotels hatten ihre Investition innerhalb eines Jahres wieder herein.', source: 'WRI und WRAP für Champions 12.3, 2018', url: WRI },
    ],
    note: 'Branchenzahlen, keine Tyll-Ergebnisse.',
    listTitle: 'Was Tyll dagegen tut',
    list: [
      'Abfall in zwei Taps erfasst: Artikel, Menge und Grund. Speisen, Getränke und Inventar getrennt.',
      'Bestellungen nach echtem Verbrauch, damit weniger gekauft wird, das dann abläuft.',
      'Ablaufende Chargen mit klarem Vorschlag: zuerst verbrauchen, an ein anderes Outlet geben, als Special anbieten oder fürs Personalessen nutzen.',
      'Keine Waagen oder Kameras zu installieren.',
      'Abfall pro Outlet und Monat, als PDF oder CSV, fertig für Ihren Nachhaltigkeitsbericht.',
    ],
    wasteLink: 'Sehen, was Abfall Sie kostet →',
  },
  it: {
    eyebrow: 'Sostenibilità',
    title: 'Meno cibo nel cestino. E meno soldi con lui.',
    intro: 'Ogni chilo buttato è stato prima comprato, conservato e cucinato. Tyll mostra quali prodotti, punti vendita e motivi generano più spreco, e ordina in base a ciò che usi davvero, così si compra meno solo per buttarlo.',
    stats: [
      { figure: '8–10%', text: 'delle emissioni globali di gas serra deriva da perdite e sprechi alimentari.', source: 'UNEP, Food Waste Index Report 2024', url: UNEP },
      { figure: '30%', text: 'in meno di spreco alimentare pro capite in ristoranti, ristorazione, commercio e famiglie: l’obiettivo vincolante dell’UE per il 2030.', source: 'Direttiva quadro UE sui rifiuti, modifica 2025', url: EU },
      { figure: '−21%', text: 'di spreco in cucina nel primo anno, in media, negli hotel che lo hanno misurato.', source: 'WRI e WRAP per Champions 12.3, 2018; 42 hotel, 15 paesi', url: WRI },
      { figure: 'Oltre il 70%', text: 'di questi hotel ha recuperato l’investimento entro un anno.', source: 'WRI e WRAP per Champions 12.3, 2018', url: WRI },
    ],
    note: 'Dati di settore, non risultati Tyll.',
    listTitle: 'Cosa fa Tyll',
    list: [
      'Spreco registrato in due tocchi: prodotto, quantità e motivo. Cibo, bevande e inventario separati.',
      'Ordini basati sul consumo reale, così si compra meno merce destinata a scadere.',
      'Lotti in scadenza segnalati con cosa fare: usarli per primi, spostarli in un altro punto vendita, proporli come special o usarli per il pasto del personale.',
      'Nessuna bilancia o telecamera da installare.',
      'Spreco per punto vendita e per mese, in PDF o CSV, pronto per il tuo report di sostenibilità.',
    ],
    wasteLink: 'Scopri quanto ti costa lo spreco →',
  },
  ar: {
    eyebrow: 'الاستدامة',
    title: 'طعام أقل في سلة المهملات، ومال أقل معه.',
    intro: 'كل كيلوغرام يُرمى تم شراؤه وتخزينه وطهيه أولاً. يُظهر Tyll الأصناف والمنافذ والأسباب الأكثر هدراً، ويطلب بناءً على ما تستهلكونه فعلاً، فتشترون أقل مما ينتهي في القمامة.',
    stats: [
      { figure: '8–10%', text: 'من انبعاثات الغازات الدفيئة في العالم مصدرها فقد الأغذية وهدرها.', source: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP },
      { figure: '50%', text: 'هدف الإمارات الوطني لخفض فقد الأغذية وهدرها بحلول 2030.', source: 'نعمة، المبادرة الوطنية لخفض فقد وهدر الغذاء', url: NEMA },
      { figure: '−21%', text: 'من هدر المطبخ في السنة الأولى في المتوسط، في الفنادق التي قاست هدرها.', source: 'WRI وWRAP لصالح Champions 12.3، 2018؛ 42 فندقاً في 15 دولة', url: WRI },
      { figure: 'أكثر من 70%', text: 'من هذه الفنادق استعادت استثمارها خلال سنة واحدة.', source: 'WRI وWRAP لصالح Champions 12.3، 2018', url: WRI },
    ],
    note: 'أرقام القطاع، وليست نتائج Tyll.',
    listTitle: 'ما يفعله Tyll',
    list: [
      'تسجيل الهدر بلمستين: الصنف والكمية والسبب، مع فصل الطعام والمشروبات والمعدات.',
      'طلبات مبنية على الاستهلاك الفعلي، لتقليل شراء ما تنتهي صلاحيته.',
      'تنبيه بالدفعات القريبة من انتهاء الصلاحية مع الإجراء المقترح: استخدامها أولاً، أو نقلها إلى منفذ آخر، أو تقديمها كطبق خاص، أو لوجبة الموظفين.',
      'لا موازين ولا كاميرات للتركيب.',
      'الهدر حسب المنفذ والشهر، بصيغة PDF أو CSV، جاهز لتقرير الاستدامة.',
    ],
    wasteLink: 'اعرف كم يكلفك الهدر ←',
  },
};
