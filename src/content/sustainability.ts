// The Sustainability page (rebuilt 26 Nov 2026 to the owner's design canvas; reworked 27 Nov 2026 at the owner's
// request): a dark hero with a drawn tree, how Tyll cuts waste at the purchase (three solution pages, each with its own
// drawing, and the chain from buying less to lower costs), the bigger picture as three figures (UNEP), and what cutting
// waste paid back in 42 hotels (WRI and WRAP) as four figures that take turns as the reader scrolls. No calculator
// (the owner, 27 Nov 2026: it made the page feel cheap), and no paragraph of figures.
//
// Every figure was opened at its source again on 26 Nov 2026 and matches it in value, year and what it refers to:
// - UNEP, Food Waste Index Report 2024 (press release on unep.org, read in a browser): "In 2022 there were 1.05 billion
//   tonnes of food waste generated ... almost one-fifth of all food available to consumers"; 19% is the report's own
//   figure for that fifth (checked on 25 Nov 2026 in an archive copy of the report's key messages); "food loss and
//   waste generates 8-10 per cent of annual global greenhouse gas (GHG) emissions". The owner's wording "about one
//   fifth (19%) of what reached consumers" stays in the 19% figure's line.
// - WRI and WRAP for Champions 12.3, The Business Case for Reducing Food Loss and Waste: Hotels, April 2018 (the PDF):
//   "42 hotel sites, located across 15 countries"; "a 21 percent reduction of food waste by weight over a 12-month
//   time frame"; "Within the first year ... over 70 percent of the sites recouped their investment. Within two years
//   ... 95 percent"; "The average benefit-cost ratio ... was nearly 7:1 over a three-year time frame" (so ~7:1, never
//   a plain 7:1). The investment is the hotels' own food-waste programmes, never Tyll.
// No figure here is a Tyll result, and none may be used as one: Tyll does not calculate CO2 or "kg saved".
// Copy rules: no dashes as punctuation (ranges are written "8 to 10%").
import type { Locale } from '../i18n/routes';

const UNEP = 'https://www.unep.org/resources/publication/food-waste-index-report-2024';
const WRI = 'https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/';


type Source = { name: string; url: string };
/** One of the bigger picture's figures: the number, an optional unit after it, and one line */
type Fact = { big: string; unit?: string; text: string };
type Figure = { label: string; figure: string; text: string };
export type SustainabilityCopy = {
  metaTitle: string;
  metaDescription: string;
  hero: { label: string; title: [string, string]; text: string; cta: string };
  /** The greenest kilo: three solution pages, then the chain from buying less to lower costs */
  less: { title: string; text: string; items: { page: 'waste' | 'expiry' | 'forecasting'; text: string }[]; chainLabel: string; chain: string[] };
  /** The bigger picture: three figures, each with a drawing; `fifth` describes the five leaves */
  world: { label: string; facts: [Fact, Fact, Fact]; fifth: string; source: Source };
  /** What hotels got back: industry figures, never Tyll's; four figures, one screen each as the reader scrolls */
  back: {
    title: string;
    sub: string;
    cut: Figure & { still: string; cut: string; bar: string };
    one: Figure & { leaves: string };
    two: Figure & { leaves: string };
    three: Figure & { spent: string; got: string };
    /** Short names of the four figures, under the progress line */
    steps: [string, string, string, string];
    source: Source;
  };
  close: { title: string; text: string; waste: string };
  /** Every figure as the page writes it, for the browser tests */
  figures: string[];
};

export const sustainability: Record<Locale, SustainabilityCopy> = {
  en: {
    metaTitle: 'Food Waste and Sustainability in Hotels | Tyll',
    metaDescription: 'How much food the world wastes, what cutting kitchen waste paid back in 42 hotels, and how Tyll stops waste where it starts. Every figure links to its source.',
    hero: {
      label: 'Sustainability',
      title: ['Less food in the bin.', 'Less money with it.'],
      text: 'Tyll cuts waste where it starts: in what your kitchen buys.',
      cta: 'See what waste costs you →',
    },
    less: {
      title: 'The greenest kilo is the one you never buy.',
      text: 'Every kilo in the bin was bought, stored and often cooked first. Tyll stops it earlier.',
      items: [
        { page: 'waste', text: 'Logged in two taps, with a reason if you want one.' },
        { page: 'expiry', text: 'Batches near their date, with what to do: use first, move, or make it tonight’s special.' },
        { page: 'forecasting', text: 'Orders built from real use, so nothing is bought just to expire.' },
      ],
      chainLabel: 'What buying less leads to',
      chain: ['Less bought', 'Less wasted', 'Lower emissions', 'Lower costs'],
    },
    world: {
      label: 'The bigger picture',
      facts: [
        { big: '1.05', unit: 'billion tonnes', text: 'of food wasted worldwide in 2022' },
        { big: '19%', text: 'of what reached consumers was wasted: about one fifth' },
        { big: '8 to 10%', text: 'of global greenhouse gas emissions come from food loss and waste' },
      ],
      fifth: 'One in five',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    back: {
      title: 'Cutting waste paid for itself, fast.',
      sub: 'What 42 hotel sites got back from their own waste programmes. Industry research, not Tyll data.',
      cut: {
        label: 'Waste in year one',
        figure: '21%',
        text: 'less kitchen food waste by weight, on average.',
        still: 'Still wasted',
        cut: 'Cut',
        bar: 'Of every 100 kilos, 21 cut and 79 still wasted',
      },
      one: { label: 'Paid back in year one', figure: '70%+', text: 'of sites had paid back within one year', leaves: '14 of 20 leaves filled' },
      two: { label: 'Paid back by year two', figure: '95%', text: 'of sites had paid back within two years', leaves: '19 of 20 leaves filled' },
      three: { label: 'Return over three years', figure: '~7:1', text: 'back for every 1 spent, over three years', spent: 'Spent', got: 'Got back' },
      steps: ['Less waste', 'Year 1', 'Year 2', 'Year 3'],
      source: { name: 'Source: WRI and WRAP for Champions 12.3, 2018', url: WRI },
    },
    close: {
      title: 'See what your hotel throws away.',
      text: 'Free 30 day pilot on your own data. No savings found, nothing to pay.',
      waste: 'See what waste costs you →',
    },
    figures: ['1.05 billion tonnes', '19%', '8 to 10%', '21%', '70%+', '95%', '~7:1'],
  },
  de: {
    metaTitle: 'Lebensmittelabfall und Nachhaltigkeit im Hotel | Tyll',
    metaDescription: 'Wie viel Essen die Welt verschwendet, was weniger Küchenabfall 42 Hotels brachte und wie Tyll Abfall beim Einkauf stoppt. Jede Zahl ist mit Quelle verlinkt.',
    hero: {
      label: 'Nachhaltigkeit',
      title: ['Weniger Essen im Müll.', 'Weniger Geld gleich mit.'],
      text: 'Tyll senkt Abfall dort, wo er entsteht: beim Einkauf Ihrer Küche.',
      cta: 'Sehen, was Abfall Sie kostet →',
    },
    less: {
      title: 'Das grünste Kilo ist das, das Sie nie kaufen.',
      text: 'Jedes Kilo im Müll wurde gekauft, gelagert und oft schon gekocht. Tyll setzt früher an.',
      items: [
        { page: 'waste', text: 'In zwei Fingertipps erfasst, auf Wunsch mit Grund.' },
        { page: 'expiry', text: 'Chargen kurz vor dem Ablauf, mit klarem Vorschlag: zuerst verbrauchen, umlagern oder als Tagesgericht anbieten.' },
        { page: 'forecasting', text: 'Bestellungen nach echtem Verbrauch, damit nichts nur zum Ablaufen gekauft wird.' },
      ],
      chainLabel: 'Wozu weniger Einkauf führt',
      chain: ['Weniger gekauft', 'Weniger verschwendet', 'Weniger Emissionen', 'Weniger Kosten'],
    },
    world: {
      label: 'Das große Bild',
      facts: [
        { big: '1,05', unit: 'Milliarden Tonnen', text: 'Lebensmittel hat die Welt 2022 verschwendet' },
        { big: '19 %', text: 'dessen, was bei Verbrauchern ankam, wurde verschwendet: etwa ein Fünftel' },
        { big: '8 bis 10 %', text: 'der weltweiten Treibhausgasemissionen verursachen Lebensmittelverluste und Lebensmittelabfälle' },
      ],
      fifth: 'Eins von fünf',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    back: {
      title: 'Weniger Abfall hat sich schnell bezahlt gemacht.',
      sub: 'Was 42 Hotels mit ihren eigenen Programmen gegen Lebensmittelabfall zurückbekamen. Branchenforschung, keine Daten von Tyll.',
      cut: {
        label: 'Abfall im ersten Jahr',
        figure: '21 %',
        text: 'weniger Küchenabfall nach Gewicht, im Durchschnitt.',
        still: 'Noch verschwendet',
        cut: 'Eingespart',
        bar: 'Von 100 Kilo sind 21 eingespart und 79 noch verschwendet',
      },
      one: { label: 'Zurück im ersten Jahr', figure: '70 %+', text: 'der Hotels hatten ihre Investition innerhalb eines Jahres zurück', leaves: '14 von 20 Blättern gefüllt' },
      two: { label: 'Zurück nach zwei Jahren', figure: '95 %', text: 'der Hotels hatten sie innerhalb von zwei Jahren zurück', leaves: '19 von 20 Blättern gefüllt' },
      three: { label: 'Ertrag über drei Jahre', figure: '~7:1', text: 'zurück für jeden eingesetzten Euro, über drei Jahre', spent: 'Eingesetzt', got: 'Zurück' },
      steps: ['Weniger Abfall', 'Jahr 1', 'Jahr 2', 'Jahr 3'],
      source: { name: 'Quelle: WRI und WRAP für Champions 12.3, 2018', url: WRI },
    },
    close: {
      title: 'Sehen Sie, was Ihr Hotel wegwirft.',
      text: 'Kostenloser Pilot über 30 Tage mit Ihren eigenen Daten. Findet er keine Einsparung, zahlen Sie nichts.',
      waste: 'Sehen, was Abfall Sie kostet →',
    },
    figures: ['1,05 Milliarden Tonnen', '19 %', '8 bis 10 %', '21 %', '70 %+', '95 %', '~7:1'],
  },
  it: {
    metaTitle: 'Spreco alimentare e sostenibilità negli hotel | Tyll',
    metaDescription: 'Quanto cibo spreca il mondo, cosa ha reso ridurre lo spreco in cucina in 42 hotel e come Tyll lo ferma già all’acquisto. Ogni cifra è collegata alla sua fonte.',
    hero: {
      label: 'Sostenibilità',
      title: ['Meno cibo nel cestino.', 'E meno soldi con lui.'],
      text: 'Tyll riduce lo spreco dove nasce: in ciò che compra la tua cucina.',
      cta: 'Scopri quanto ti costa lo spreco →',
    },
    less: {
      title: 'Il chilo più verde è quello che non compri mai.',
      text: 'Ogni chilo nel cestino è stato comprato, conservato e spesso cucinato. Tyll interviene prima.',
      items: [
        { page: 'waste', text: 'Registrati in due tocchi, con il motivo se vuoi.' },
        { page: 'expiry', text: 'Lotti vicini alla scadenza, con cosa fare: usarli per primi, spostarli o farne il piatto di stasera.' },
        { page: 'forecasting', text: 'Ordini basati sul consumo reale, così nulla si compra solo per farlo scadere.' },
      ],
      chainLabel: 'A cosa porta comprare meno',
      chain: ['Meno acquisti', 'Meno sprechi', 'Meno emissioni', 'Meno costi'],
    },
    world: {
      label: 'Il quadro generale',
      facts: [
        { big: '1,05', unit: 'miliardi di tonnellate', text: 'di cibo sprecate nel mondo nel 2022' },
        { big: '19%', text: 'di ciò che è arrivato ai consumatori è stato sprecato: circa un quinto' },
        { big: 'dall’8 al 10%', text: 'delle emissioni globali di gas serra viene da perdite e sprechi alimentari' },
      ],
      fifth: 'Uno su cinque',
      source: { name: 'UNEP, Food Waste Index Report 2024', url: UNEP },
    },
    back: {
      title: 'Ridurre lo spreco si è ripagato in fretta.',
      sub: 'Cosa hanno ottenuto 42 hotel dai propri programmi contro lo spreco. Ricerca di settore, non dati Tyll.',
      cut: {
        label: 'Spreco nel primo anno',
        figure: '21%',
        text: 'di spreco alimentare in cucina in meno, in peso, in media.',
        still: 'Ancora sprecato',
        cut: 'Ridotto',
        bar: 'Su 100 chili, 21 in meno e 79 ancora sprecati',
      },
      one: { label: 'Ripagato nel primo anno', figure: '70%+', text: 'degli hotel ha recuperato l’investimento entro un anno', leaves: '14 foglie piene su 20' },
      two: { label: 'Ripagato entro il secondo anno', figure: '95%', text: 'degli hotel lo ha recuperato entro due anni', leaves: '19 foglie piene su 20' },
      three: { label: 'Ritorno in tre anni', figure: '~7:1', text: 'di ritorno per ogni 1 speso, in tre anni', spent: 'Speso', got: 'Recuperato' },
      steps: ['Meno spreco', 'Anno 1', 'Anno 2', 'Anno 3'],
      source: { name: 'Fonte: WRI e WRAP per Champions 12.3, 2018', url: WRI },
    },
    close: {
      title: 'Scopri cosa butta via il tuo hotel.',
      text: 'Pilota gratuito di 30 giorni sui tuoi dati. Nessun risparmio trovato, niente da pagare.',
      waste: 'Scopri quanto ti costa lo spreco →',
    },
    figures: ['1,05 miliardi di tonnellate', '19%', 'dall’8 al 10%', '21%', '70%+', '95%', '~7:1'],
  },
  ar: {
    metaTitle: 'هدر الطعام والاستدامة في الفنادق | Tyll',
    metaDescription: 'كم من الطعام يهدره العالم، وماذا استعادت 42 فندقًا بعد خفض هدر المطبخ، وكيف يوقف Tyll الهدر من حيث يبدأ عند الشراء. كل رقم هنا مرتبط بمصدره الأصلي.',
    hero: {
      label: 'الاستدامة',
      title: ['طعام أقل في سلة المهملات.', 'ومال أقل معه.'],
      text: 'يخفض Tyll الهدر من حيث يبدأ: فيما يشتريه مطبخك.',
      cta: 'اعرف كم يكلفك الهدر ←',
    },
    less: {
      title: 'أنظف كيلوغرام للبيئة هو الذي لا تشتريه أبدًا.',
      text: 'كل كيلوغرام في سلة المهملات تم شراؤه وتخزينه وغالبًا طهيه أولاً. يوقفه Tyll قبل ذلك.',
      items: [
        { page: 'waste', text: 'يُسجَّل بنقرتين، مع السبب إن أردت.' },
        { page: 'expiry', text: 'دفعات تقترب من تاريخ انتهائها، مع ما يجب فعله: استخدامها أولاً أو نقلها أو تقديمها طبقًا لليوم.' },
        { page: 'forecasting', text: 'طلبات مبنية على الاستهلاك الفعلي، فلا يُشترى شيء لتنتهي صلاحيته فقط.' },
      ],
      chainLabel: 'إلى أين يقود شراء أقل',
      chain: ['شراء أقل', 'هدر أقل', 'انبعاثات أقل', 'تكاليف أقل'],
    },
    world: {
      label: 'الصورة الأكبر',
      facts: [
        { big: '1.05', unit: 'مليار طن', text: 'من الطعام هدرها العالم في عام 2022' },
        { big: '19%', text: 'مما وصل إلى المستهلكين هُدر، أي نحو الخُمس' },
        { big: '8 إلى 10%', text: 'من انبعاثات الغازات الدفيئة في العالم سببها فقد الأغذية وهدرها' },
      ],
      fifth: 'واحد من كل خمسة',
      source: { name: 'UNEP، تقرير مؤشر هدر الأغذية 2024', url: UNEP },
    },
    back: {
      title: 'خفض الهدر استرد تكلفته بسرعة.',
      sub: 'ما استعادته 42 فندقًا من برامجها الخاصة لخفض الهدر. بحث من القطاع، وليست بيانات Tyll.',
      cut: {
        label: 'الهدر في السنة الأولى',
        figure: '21%',
        text: 'أقل من هدر الطعام في المطبخ وزنًا، في المتوسط.',
        still: 'ما زال مهدرًا',
        cut: 'تم خفضه',
        bar: 'من كل 100 كيلوغرام، خُفض 21 وما زال 79 مهدرًا',
      },
      one: { label: 'الاسترداد في السنة الأولى', figure: '+70%', text: 'من الفنادق استعادت استثمارها خلال عام واحد', leaves: '14 ورقة ممتلئة من 20' },
      two: { label: 'الاسترداد بحلول السنة الثانية', figure: '95%', text: 'من الفنادق استعادته خلال عامين', leaves: '19 ورقة ممتلئة من 20' },
      three: { label: 'العائد على مدى ثلاث سنوات', figure: '~7:1', text: 'عائد مقابل كل 1 يُنفق، على مدى ثلاث سنوات', spent: 'المُنفق', got: 'المُستعاد' },
      steps: ['هدر أقل', 'السنة 1', 'السنة 2', 'السنة 3'],
      source: { name: 'المصدر: WRI وWRAP لصالح Champions 12.3، 2018', url: WRI },
    },
    close: {
      title: 'اعرف ما يرميه فندقك.',
      text: 'تجربة مجانية لمدة 30 يومًا على بياناتك أنت. إن لم نجد توفيرًا، فلا تدفع شيئًا.',
      waste: 'اعرف كم يكلفك الهدر ←',
    },
    figures: ['1.05 مليار طن', '19%', '8 إلى 10%', '21%', '+70%', '95%', '~7:1'],
  },
};
