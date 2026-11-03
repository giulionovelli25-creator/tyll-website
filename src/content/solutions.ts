// The six solution pages, in English, German, Arabic and Italian, in the demo's own order and words: Log waste, Stock,
// Predictions, Revenue, Reconciliation, Pour Control. Every screen is a real capture of the current demo (fictional data),
// and each caption describes only what that screen shows. The demo is in English, so screen names stay in English.

import type { ImageMetadata } from 'astro';
import type { Locale, SolutionKey } from '../i18n/routes';

import whyChef from '../assets/photos/why-chef.jpg';
import stockChef from '../assets/photos/stock-chef.jpg';
import forecastProduce from '../assets/photos/forecast-produce.jpg';
import statsTerminal from '../assets/photos/tyll-stats-3.jpg';
import reconciliation from '../assets/photos/reconciliation-reception.jpg';
import banquet from '../assets/photos/events-banquet.jpg';
import probBuffet from '../assets/photos/sales-buffet.jpg';
import probStock from '../assets/photos/problem/problem-stock.jpg';
import probForecast from '../assets/photos/problem/problem-forecasting.jpg';
import probReceipts from '../assets/photos/tyll-problem-1.jpg';
import probFinance from '../assets/photos/problem/problem-finance.jpg';
import probFrontdesk from '../assets/photos/problem/problem-sales-frontdesk.jpg';

const screens = import.meta.glob<{ default: ImageMetadata }>('../assets/demo/*.png', { eager: true });
const screen = (name: string) => {
  const m = screens[`../assets/demo/${name}.png`];
  if (!m) throw new Error(`Missing demo screen ${name}`);
  return m.default;
};

type Text = Record<Locale, string>;
export type Frame = { img: ImageMetadata; phone?: boolean; title: Text; text: Text; alt: Text };
/** One step of "How Tyll helps": a short label, the matching sentence from `helps`, and a walkthrough screen (by index) that shows it. */
export type Step = { label: Text; frame: number };
export type Solution = {
  key: SolutionKey;
  icon: 'waste' | 'stock' | 'forecast' | 'revenue' | 'finance' | 'pour';
  photo: ImageMetadata;
  photoAlt: Text;
  /** Where the photo's subject sits, so cropping keeps it in view */
  photoFocus: string;
  name: Text;
  menu: Text;
  headline: Text;
  intro: Text;
  problem: Text;
  /** A photograph beside the problem statement, different from the opening photo */
  problemPhoto: ImageMetadata;
  problemPhotoAlt: Text;
  problemFocus: string;
  helps: Record<Locale, string[]>;
  /** Three steps, in the same order as `helps` */
  steps: [Step, Step, Step];
  /** Independent research shown with the problem, always with its source */
  proof?: { text: Text; context: Text; source: Text; url: string };
  /** Features of this product that are still in development, shown as a small Coming soon note */
  soonNote?: Text;
  walkTitle: Text;
  frames: Frame[];
  note?: Text;
};

const t = (en: string, de: string, ar: string, it: string): Text => ({ en, de, ar, it });

export const solutions: Record<SolutionKey, Solution> = {
  waste: {
    key: 'waste',
    icon: 'waste',
    photo: whyChef,
    photoAlt: t('A chef\'s hands placing a garnish on a plate with tweezers.', 'Die Hände eines Kochs setzen mit einer Pinzette eine Garnitur auf einen Teller.', 'يدا طاهٍ تضعان زينة على طبق بملقط صغير.', 'Le mani di uno chef posano una guarnizione su un piatto con una pinzetta.'),
    photoFocus: '50% 50%',
    name: t('Log waste', 'Abfall erfassen', 'تسجيل الهدر', 'Registra sprechi'),
    menu: t('What was wasted or broken, logged in two taps.', 'Was verdorben oder zerbrochen ist, mit zwei Tipps erfasst.', 'ما أُهدر أو انكسر، مسجَّل بنقرتين.', 'Cosa è stato sprecato o rotto, registrato in due tocchi.'),
    headline: t('Know what was wasted or broken today.', 'Wissen, was heute verdorben oder zerbrochen ist.', 'اعرف ما أُهدر أو انكسر اليوم.', 'Sai cosa è stato sprecato o rotto oggi.'),
    intro: t('Tap the item, tap the number. It is saved to today’s log straight away, with what it cost.', 'Artikel antippen, Zahl antippen. Es steht sofort im heutigen Protokoll, mit den Kosten.', 'انقر على الصنف، ثم على الرقم. يُحفظ فورًا في سجل اليوم مع تكلفته.', 'Tocca l’articolo, tocca il numero. Viene salvato subito nel registro di oggi, con il suo costo.'),
    problem: t('Waste and breakage get written down late, or not at all. At month end nobody can say what was lost or what it cost.', 'Abfall und Bruch werden spät oder gar nicht notiert. Am Monatsende kann niemand sagen, was verloren ging oder was es gekostet hat.', 'يُدوَّن الهدر والكسر متأخرًا أو لا يُدوَّن أصلًا. وفي نهاية الشهر لا يستطيع أحد أن يقول ما الذي ضاع أو كم كلّف.', 'Sprechi e rotture vengono annotati tardi, o per niente. A fine mese nessuno sa dire cosa si è perso o quanto è costato.'),
    problemPhoto: probBuffet,
    problemPhotoAlt: t('A hotel buffet with plates and bread ready for service.', 'Ein Hotelbuffet mit Tellern und Brot, bereit für den Service.', 'بوفيه فندق بأطباق وخبز جاهز للخدمة.', 'Un buffet d’hotel con piatti e pane pronti per il servizio.'),
    problemFocus: '50% 50%',
    steps: [{ label: t('Tap', 'Tippen', 'انقر', 'Tocca'), frame: 0 }, { label: t('Log', 'Erfassen', 'سجّل', 'Registra'), frame: 1 }, { label: t('See', 'Sehen', 'اطّلع', 'Vedi'), frame: 1 }],
    helps: {
      en: ['Choose Food, Drinks or Inventory, then tap the item and the number.', 'It goes into today’s log straight away, with the amount and the cost.', 'See what was lost today and this month, wasted and broken.'],
      de: ['Wählen Sie Food, Drinks oder Inventory, dann Artikel und Zahl antippen.', 'Es steht sofort im heutigen Protokoll, mit Menge und Kosten.', 'Sehen Sie, was heute und diesen Monat verloren ging, verdorben und zerbrochen.'],
      ar: ['اختر Food أو Drinks أو Inventory، ثم انقر على الصنف والرقم.', 'يدخل فورًا في سجل اليوم مع الكمية والتكلفة.', 'اطّلع على ما ضاع اليوم وهذا الشهر، هدرًا وكسرًا.'],
      it: ['Scegli Food, Drinks o Inventory, poi tocca l’articolo e il numero.', 'Entra subito nel registro di oggi, con quantità e costo.', 'Vedi cosa si è perso oggi e questo mese, tra sprechi e rotture.'],
    },
    walkTitle: t('What was wasted or broken?', 'Was ist verdorben oder zerbrochen?', 'ما الذي أُهدر أو انكسر؟', 'Cosa è stato sprecato o rotto?'),
    frames: [
      {
        img: screen('waste-1'),
        title: t('Log waste', 'Log waste', 'Log waste', 'Log waste'),
        text: t('Lost today at the top. Below it Food, Drinks and Inventory, with the items as large buttons.', 'Oben der heutige Verlust. Darunter Food, Drinks und Inventory, mit den Artikeln als große Schaltflächen.', 'في الأعلى خسارة اليوم. وتحتها Food وDrinks وInventory، والأصناف أزرار كبيرة.', 'In alto la perdita di oggi. Sotto Food, Drinks e Inventory, con gli articoli come grandi pulsanti.'),
        alt: t('The Log waste screen: AED 337 lost today, and buttons for twelve food items.', 'Die Ansicht Log waste: AED 337 Verlust heute und Schaltflächen für zwölf Lebensmittel.', 'شاشة Log waste: خسارة 337 درهمًا اليوم وأزرار لاثني عشر صنفًا غذائيًا.', 'La schermata Log waste: AED 337 persi oggi e pulsanti per dodici alimenti.'),
      },
      {
        img: screen('waste-2'),
        title: t('Today’s log', 'Today’s log', 'Today’s log', 'Today’s log'),
        text: t('Every entry today with its amount, reason, outlet and cost.', 'Jeder heutige Eintrag mit Menge, Grund, Outlet und Kosten.', 'كل إدخال اليوم مع الكمية والسبب والمنفذ والتكلفة.', 'Ogni voce di oggi con quantità, motivo, punto vendita e costo.'),
        alt: t('Today’s log: 11 entries with amount, reason, outlet and cost, AED 337 in total.', 'Today’s log: 11 Einträge mit Menge, Grund, Outlet und Kosten, insgesamt AED 337.', 'Today’s log: أحد عشر إدخالًا بالكمية والسبب والمنفذ والتكلفة، بإجمالي 337 درهمًا.', 'Today’s log: 11 voci con quantità, motivo, punto vendita e costo, AED 337 in totale.'),
      },
    ],
    note: t('In the demo these records are simulated. Which POS, PMS and accounting data can be connected is agreed with each hotel.', 'In der Demo sind diese Daten simuliert. Welche Kassen-, PMS- und Buchhaltungsdaten angebunden werden, wird mit jedem Hotel vereinbart.', 'هذه السجلات في العرض التوضيحي محاكاة. ويُتفق مع كل فندق على بيانات نقاط البيع وإدارة الفندق والمحاسبة التي يمكن ربطها.', 'Nella demo questi dati sono simulati. Quali dati di cassa, PMS e contabilità collegare viene concordato con ogni hotel.'),
  },

  stock: {
    key: 'stock',
    icon: 'stock',
    photo: stockChef,
    photoAlt: t('Chefs seasoning and plating dishes under copper heat lamps in a hotel kitchen.', 'Köche würzen und richten Gerichte unter kupfernen Wärmelampen in einer Hotelküche an.', 'طهاة يتبّلون الأطباق ويقدّمونها تحت مصابيح تسخين نحاسية في مطبخ فندق.', 'Chef condiscono e impiattano sotto lampade di rame nella cucina di un hotel.'),
    photoFocus: '50% 40%',
    name: t('Stock', 'Bestand', 'المخزون', 'Magazzino'),
    menu: t('How much stock is left, and a count that walks the storeroom.', 'Wie viel Bestand noch da ist, und eine Zählung, die dem Lager folgt.', 'كم بقي من المخزون، وجرد يسير بك في المخزن.', 'Quanta merce resta, e un conteggio che segue il magazzino.'),
    headline: t('Know how much stock is left.', 'Wissen, wie viel Bestand noch da ist.', 'اعرف كم بقي من المخزون.', 'Sai quanta merce resta.'),
    intro: t('Estimates from the last count, deliveries and sales, with what is about to run out on top.', 'Schätzungen aus der letzten Zählung, Lieferungen und Verkäufen, und oben steht, was bald ausgeht.', 'تقديرات من آخر جرد والتوريدات والمبيعات، وفي الأعلى ما يوشك أن ينفد.', 'Stime dall’ultimo conteggio, dalle consegne e dalle vendite, con in cima ciò che sta per finire.'),
    problem: t('Nobody knows what is really on the shelf until something runs out, and a full count takes so long that it gets put off.', 'Niemand weiß, was wirklich im Regal steht, bis etwas ausgeht, und eine vollständige Zählung dauert so lange, dass sie verschoben wird.', 'لا أحد يعرف ما على الرف فعلًا حتى ينفد شيء، والجرد الكامل يستغرق وقتًا طويلًا فيُؤجَّل.', 'Nessuno sa cosa c’è davvero sullo scaffale finché qualcosa non finisce, e un conteggio completo è così lungo che viene rimandato.'),
    problemPhoto: probStock,
    problemPhotoAlt: t('A busy hotel kitchen with shelves of pans and ingredients.', 'Eine belebte Hotelküche mit Regalen voller Pfannen und Zutaten.', 'مطبخ فندق مزدحم برفوف من المقالي والمكوّنات.', 'Una cucina d’hotel in piena attività con scaffali di pentole e ingredienti.'),
    problemFocus: '50% 50%',
    steps: [{ label: t('See', 'Sehen', 'اطّلع', 'Vedi'), frame: 0 }, { label: t('Act', 'Handeln', 'تصرّف', 'Agisci'), frame: 1 }, { label: t('Count', 'Zählen', 'اجرد', 'Conta'), frame: 1 }],
    helps: {
      en: ['Every item is marked critical, low or fine.', 'Critical means an order placed today would arrive too late.', 'Start count walks the storeroom in order, with the expected amount filled in.'],
      de: ['Jeder Artikel ist als critical, low oder fine markiert.', 'Critical heißt: Eine heute aufgegebene Bestellung käme zu spät.', 'Start count führt der Reihe nach durch das Lager, die erwartete Menge ist schon eingetragen.'],
      ar: ['كل صنف مصنّف critical أو low أو fine.', 'يعني critical أن طلبًا يُرسل اليوم سيصل متأخرًا.', 'يسير بك Start count في المخزن بالترتيب، والكمية المتوقعة مكتوبة مسبقًا.'],
      it: ['Ogni articolo è segnato critical, low o fine.', 'Critical significa che un ordine fatto oggi arriverebbe troppo tardi.', 'Start count percorre il magazzino in ordine, con la quantità attesa già inserita.'],
    },
    walkTitle: t('How much stock is left?', 'Wie viel Bestand ist noch da?', 'كم بقي من المخزون؟', 'Quanta merce resta?'),
    frames: [
      {
        img: screen('stock-1'),
        title: t('Stock', 'Stock', 'Stock', 'Stock'),
        text: t('Critical, low and fine at the top, then the critical items with what is left.', 'Oben critical, low und fine, darunter die kritischen Artikel mit dem Restbestand.', 'في الأعلى critical وlow وfine، ثم الأصناف الحرجة وما بقي منها.', 'In alto critical, low e fine, poi gli articoli critici con ciò che resta.'),
        alt: t('The Stock screen: 5 critical, 10 low and 48 fine, with five critical items listed.', 'Die Ansicht Stock: 5 critical, 10 low und 48 fine, mit fünf kritischen Artikeln.', 'شاشة Stock: 5 حرجة و10 منخفضة و48 جيدة، مع قائمة بخمسة أصناف حرجة.', 'La schermata Stock: 5 critici, 10 bassi e 48 a posto, con cinque articoli critici.'),
      },
      {
        img: screen('stock-2'),
        title: t('Stock count', 'Stock count', 'Stock count', 'Stock count'),
        text: t('One item at a time, in walking order, with the expected amount filled in.', 'Ein Artikel nach dem anderen, in Laufreihenfolge, die erwartete Menge ist eingetragen.', 'صنف واحد في كل مرة، بترتيب السير، والكمية المتوقعة مكتوبة.', 'Un articolo alla volta, nell’ordine del percorso, con la quantità attesa inserita.'),
        alt: t('A stock count screen: item 1 of 63, beef tenderloin, 15.4 kg expected, with a button reading Looks right, next.', 'Eine Zählung: Artikel 1 von 63, Rinderfilet, 15,4 kg erwartet, mit der Schaltfläche Looks right, next.', 'شاشة جرد: الصنف 1 من 63، لحم بقري، 15.4 كغ متوقعة، مع زر Looks right, next.', 'Un conteggio: articolo 1 di 63, filetto di manzo, 15,4 kg attesi, con il pulsante Looks right, next.'),
      },
    ],
    note: t('In the demo these records are simulated. Which POS, PMS and accounting data can be connected is agreed with each hotel.', 'In der Demo sind diese Daten simuliert. Welche Kassen-, PMS- und Buchhaltungsdaten angebunden werden, wird mit jedem Hotel vereinbart.', 'هذه السجلات في العرض التوضيحي محاكاة. ويُتفق مع كل فندق على بيانات نقاط البيع وإدارة الفندق والمحاسبة التي يمكن ربطها.', 'Nella demo questi dati sono simulati. Quali dati di cassa, PMS e contabilità collegare viene concordato con ogni hotel.'),
  },

  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    photo: forecastProduce,
    photoAlt: t('A chef chopping fresh herbs beside trays of lemons and greens.', 'Ein Koch hackt frische Kräuter neben Schalen mit Zitronen und Grün.', 'طاهٍ يفرم أعشابًا طازجة بجانب صوانٍ من الليمون والخضار.', 'Uno chef trita erbe fresche accanto a vassoi di limoni e verdure.'),
    photoFocus: '60% 45%',
    name: t('Predictions', 'Prognosen', 'التوقعات', 'Previsioni'),
    menu: t('What to order and how much, through to month end.', 'Was und wie viel zu bestellen ist, bis zum Monatsende.', 'ماذا تطلب وكم، حتى نهاية الشهر.', 'Cosa ordinare e quanto, fino a fine mese.'),
    headline: t('Know what to buy before you run out.', 'Wissen, was Sie kaufen müssen, bevor es ausgeht.', 'اعرف ما تحتاج إلى شرائه قبل أن ينفد.', 'Sai cosa comprare prima che finisca.'),
    intro: t('An estimate from forecast covers, events and recent use: the cost to month end, the items to order and the next order date.', 'Eine Schätzung aus erwarteten Gedecken, Veranstaltungen und jüngstem Verbrauch: Kosten bis Monatsende, zu bestellende Artikel und nächstes Bestelldatum.', 'تقدير من أعداد الضيوف المتوقعة والفعاليات والاستهلاك الأخير: التكلفة حتى نهاية الشهر، والأصناف المطلوبة، وموعد الطلب التالي.', 'Una stima dai coperti previsti, dagli eventi e dai consumi recenti: costo a fine mese, articoli da ordinare e data del prossimo ordine.'),
    problem: t('Without a clear view of what you actually use each week, purchasing guesses. You over-order or run short.', 'Ohne klaren Blick darauf, was Sie pro Woche tatsächlich verbrauchen, schätzt der Einkauf, und bestellt zu viel oder zu wenig.', 'من دون رؤية واضحة لما تستهلكه فعلًا كل أسبوع، تعتمد المشتريات على التخمين، فتطلب أكثر من اللازم أو ينفد المخزون.', 'Senza una visione chiara di ciò che consumi davvero ogni settimana, gli acquisti vanno a intuito: si ordina troppo o si resta senza.'),
    problemPhoto: probForecast,
    problemPhotoAlt: t('A chef plating a long row of dishes before a large event.', 'Ein Koch richtet vor einer großen Veranstaltung eine lange Reihe Teller an.', 'طاهٍ يُعدّ صفًا طويلًا من الأطباق قبل فعالية كبيرة.', 'Uno chef impiatta una lunga fila di piatti prima di un grande evento.'),
    problemFocus: '50% 45%',
    steps: [{ label: t('Predict', 'Vorhersagen', 'توقّع', 'Prevedi'), frame: 0 }, { label: t('Order today', 'Heute bestellen', 'اطلب اليوم', 'Ordina oggi'), frame: 1 }, { label: t('Build order', 'Build order', 'Build order', 'Build order'), frame: 1 }],
    helps: {
      en: ['Tyll looks at forecast covers, events and the last 4 weeks of usage.', 'It shows what to order today, how much and what it costs.', 'Build order makes one draft, grouped by supplier. Nothing is sent until it is approved.'],
      de: ['Tyll wertet erwartete Gedecke, Veranstaltungen und den Verbrauch der letzten 4 Wochen aus.', 'Es zeigt, was heute zu bestellen ist, wie viel und was es kostet.', 'Build order erstellt einen Entwurf, nach Lieferanten gruppiert. Nichts wird ohne Freigabe gesendet.'],
      ar: ['ينظر Tyll في أعداد الضيوف المتوقعة والفعاليات واستهلاك آخر 4 أسابيع.', 'يبيّن ما يجب طلبه اليوم وكم وما تكلفته.', 'ينشئ Build order مسودة واحدة مجمّعة حسب المورّد. لا يُرسل شيء قبل الاعتماد.'],
      it: ['Tyll guarda i coperti previsti, gli eventi e i consumi delle ultime 4 settimane.', 'Mostra cosa ordinare oggi, quanto e quanto costa.', 'Build order crea una bozza unica, raggruppata per fornitore. Nulla viene inviato prima dell’approvazione.'],
    },
    walkTitle: t('What do I need to order?', 'Was muss ich bestellen?', 'ماذا عليّ أن أطلب؟', 'Cosa devo ordinare?'),
    frames: [
      {
        img: screen('forecast-1'),
        title: t('Predictions', 'Predictions', 'Predictions', 'Predictions'),
        text: t('The cost to month end, the items to order, and what must go today.', 'Die Kosten bis Monatsende, die zu bestellenden Artikel und was heute raus muss.', 'التكلفة حتى نهاية الشهر، والأصناف المطلوبة، وما يجب طلبه اليوم.', 'Il costo a fine mese, gli articoli da ordinare e cosa va ordinato oggi.'),
        alt: t('The Predictions screen: AED 310.7k to 31 October, 51 items to order, next order today.', 'Die Ansicht Predictions: AED 310,7k bis 31. Oktober, 51 Artikel, nächste Bestellung heute.', 'شاشة Predictions: 310.7 ألف درهم حتى 31 أكتوبر، 51 صنفًا، والطلب التالي اليوم.', 'La schermata Predictions: AED 310,7k fino al 31 ottobre, 51 articoli, prossimo ordine oggi.'),
      },
      {
        img: screen('forecast-2'),
        title: t('Draft order', 'Draft order', 'Draft order', 'Draft order'),
        text: t('Build order makes one draft, grouped by supplier.', 'Build order erstellt einen Entwurf, nach Lieferanten gruppiert.', 'ينشئ Build order مسودة واحدة مجمّعة حسب المورّد.', 'Build order crea una bozza unica, raggruppata per fornitore.'),
        alt: t('A draft order panel: 51 items from 6 suppliers, nothing sent until it is approved.', 'Ein Bestellentwurf: 51 Artikel von 6 Lieferanten, nichts wird ohne Freigabe gesendet.', 'مسودة طلب: 51 صنفًا من 6 مورّدين، ولا يُرسل شيء قبل الاعتماد.', 'Una bozza d’ordine: 51 articoli da 6 fornitori, nulla inviato prima dell’approvazione.'),
      },
    ],
    note: t('In the demo these records are simulated. Which POS, PMS and accounting data can be connected is agreed with each hotel.', 'In der Demo sind diese Daten simuliert. Welche Kassen-, PMS- und Buchhaltungsdaten angebunden werden, wird mit jedem Hotel vereinbart.', 'هذه السجلات في العرض التوضيحي محاكاة. ويُتفق مع كل فندق على بيانات نقاط البيع وإدارة الفندق والمحاسبة التي يمكن ربطها.', 'Nella demo questi dati sono simulati. Quali dati di cassa, PMS e contabilità collegare viene concordato con ogni hotel.'),
  },

  revenue: {
    key: 'revenue',
    icon: 'revenue',
    photo: statsTerminal,
    photoAlt: t('A card terminal and a printed receipt on a dark counter.', 'Ein Kartenterminal und ein gedruckter Beleg auf einer dunklen Theke.', 'جهاز بطاقات وإيصال مطبوع على منضدة داكنة.', 'Un terminale di pagamento e uno scontrino su un banco scuro.'),
    photoFocus: '60% 50%',
    name: t('Revenue', 'Umsatz', 'الإيرادات', 'Ricavi'),
    menu: t('How much you made, by day and by outlet, with estimated profit.', 'Wie viel Sie eingenommen haben, nach Tag und Outlet, mit geschätztem Gewinn.', 'كم حققت، حسب اليوم والمنفذ، مع الربح المقدّر.', 'Quanto hai incassato, per giorno e punto vendita, con il profitto stimato.'),
    headline: t('Know how much you made.', 'Wissen, wie viel Sie eingenommen haben.', 'اعرف كم حققت.', 'Sai quanto hai incassato.'),
    intro: t('Today, the last 7 days and the last 30 days, with estimated profit beside each.', 'Heute, die letzten 7 und die letzten 30 Tage, jeweils mit geschätztem Gewinn.', 'اليوم وآخر 7 أيام وآخر 30 يومًا، وبجانب كلٍّ منها الربح المقدّر.', 'Oggi, gli ultimi 7 giorni e gli ultimi 30, ognuno con il profitto stimato.'),
    problem: t('Sales sit in the POS and costs sit somewhere else. Knowing what a week really made means a spreadsheet nobody has time for.', 'Verkäufe liegen in der Kasse, Kosten woanders. Zu wissen, was eine Woche wirklich gebracht hat, heißt: eine Tabelle, für die niemand Zeit hat.', 'المبيعات في نظام نقاط البيع والتكاليف في مكان آخر. ومعرفة ما حققه الأسبوع فعلًا تعني جدولًا لا يجد أحد وقتًا له.', 'Le vendite stanno nella cassa e i costi altrove. Sapere quanto ha reso davvero una settimana vuol dire un foglio di calcolo per cui nessuno ha tempo.'),
    problemPhoto: probReceipts,
    problemPhotoAlt: t('Hands working through receipts beside a calculator.', 'Hände gehen Belege neben einem Taschenrechner durch.', 'يدان تراجعان إيصالات بجانب آلة حاسبة.', 'Mani che controllano scontrini accanto a una calcolatrice.'),
    problemFocus: '50% 50%',
    steps: [{ label: t('Totals', 'Summen', 'الإجماليات', 'Totali'), frame: 0 }, { label: t('Trend', 'Verlauf', 'الاتجاه', 'Andamento'), frame: 0 }, { label: t('Detail', 'Details', 'التفاصيل', 'Dettaglio'), frame: 0 }],
    helps: {
      en: ['See revenue and estimated profit for today, 7 days and 30 days.', 'Follow both on one chart over the last 14 days.', 'Open each outlet, or search all transactions.'],
      de: ['Sehen Sie Umsatz und geschätzten Gewinn für heute, 7 und 30 Tage.', 'Verfolgen Sie beides in einem Diagramm über die letzten 14 Tage.', 'Öffnen Sie jedes Outlet oder durchsuchen Sie alle Transaktionen.'],
      ar: ['اطّلع على الإيرادات والربح المقدّر لليوم و7 أيام و30 يومًا.', 'تابع الاثنين في رسم بياني واحد على مدى آخر 14 يومًا.', 'افتح كل منفذ، أو ابحث في جميع المعاملات.'],
      it: ['Vedi ricavi e profitto stimato di oggi, 7 giorni e 30 giorni.', 'Segui entrambi in un grafico sugli ultimi 14 giorni.', 'Apri ogni punto vendita, o cerca in tutte le transazioni.'],
    },
    walkTitle: t('How much did we make?', 'Wie viel haben wir eingenommen?', 'كم حققنا؟', 'Quanto abbiamo incassato?'),
    frames: [
      {
        img: screen('revenue-1'),
        title: t('Revenue', 'Revenue', 'Revenue', 'Revenue'),
        text: t('Three totals, the last 14 days on one chart, and each outlet.', 'Drei Summen, die letzten 14 Tage in einem Diagramm und jedes Outlet.', 'ثلاثة إجماليات، وآخر 14 يومًا في رسم واحد، وكل منفذ.', 'Tre totali, gli ultimi 14 giorni in un grafico e ogni punto vendita.'),
        alt: t('The Revenue screen: AED 47.0k today, AED 567.1k in 7 days, AED 2.47M in 30 days, with a chart of revenue and estimated profit.', 'Die Ansicht Revenue: AED 47,0k heute, AED 567,1k in 7 Tagen, AED 2,47 Mio. in 30 Tagen, mit Diagramm von Umsatz und geschätztem Gewinn.', 'شاشة Revenue: 47.0 ألف درهم اليوم، و567.1 ألفًا في 7 أيام، و2.47 مليون في 30 يومًا، مع رسم للإيرادات والربح المقدّر.', 'La schermata Revenue: AED 47,0k oggi, AED 567,1k in 7 giorni, AED 2,47M in 30 giorni, con un grafico di ricavi e profitto stimato.'),
      },
    ],
    note: t('In the demo these records are simulated. Which POS, PMS and accounting data can be connected is agreed with each hotel.', 'In der Demo sind diese Daten simuliert. Welche Kassen-, PMS- und Buchhaltungsdaten angebunden werden, wird mit jedem Hotel vereinbart.', 'هذه السجلات في العرض التوضيحي محاكاة. ويُتفق مع كل فندق على بيانات نقاط البيع وإدارة الفندق والمحاسبة التي يمكن ربطها.', 'Nella demo questi dati sono simulati. Quali dati di cassa, PMS e contabilità collegare viene concordato con ogni hotel.'),
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: reconciliation,
    photoAlt: t('A guest paying by card at a hotel reception desk beside a brass bell.', 'Ein Gast zahlt an einer Hotelrezeption neben einer Messingglocke mit Karte.', 'ضيف يدفع بالبطاقة عند مكتب استقبال فندق بجانب جرس نحاسي.', 'Un ospite paga con carta alla reception di un hotel accanto a un campanello d’ottone.'),
    photoFocus: '60% 50%',
    name: t('Reconciliation', 'Abgleich', 'المطابقة', 'Riconciliazione'),
    menu: t('Supplier invoices checked against orders and deliveries.', 'Lieferantenrechnungen, abgeglichen mit Bestellungen und Lieferungen.', 'فواتير الموردين مطابَقة مع الطلبات والتوريدات.', 'Fatture dei fornitori confrontate con ordini e consegne.'),
    headline: t('Know which invoices do not match.', 'Wissen, welche Rechnungen nicht stimmen.', 'اعرف أي الفواتير لا تتطابق.', 'Sai quali fatture non coincidono.'),
    intro: t('Each invoice is compared with the purchase order and what was received. Those with a difference wait for review.', 'Jede Rechnung wird mit der Bestellung und dem Wareneingang verglichen. Rechnungen mit Abweichung warten auf Prüfung.', 'تُقارن كل فاتورة بأمر الشراء وبما تم استلامه. وتنتظر الفواتير التي بها فرق المراجعة.', 'Ogni fattura viene confrontata con l’ordine e con quanto ricevuto. Quelle con una differenza attendono la revisione.'),
    problem: t('Invoices get paid without anyone comparing them to the order and the delivery. Small differences add up unseen.', 'Rechnungen werden bezahlt, ohne dass jemand sie mit Bestellung und Lieferung vergleicht. Kleine Abweichungen summieren sich unbemerkt.', 'تُدفع الفواتير من دون أن يقارنها أحد بالطلب والتوريد. وتتراكم الفروق الصغيرة من دون أن يلاحظها أحد.', 'Le fatture vengono pagate senza che nessuno le confronti con ordine e consegna. Le piccole differenze si sommano senza farsi notare.'),
    problemPhoto: probFinance,
    problemPhotoAlt: t('A manager working through paperwork at a desk in a hotel office.', 'Eine Führungskraft bearbeitet Unterlagen an einem Schreibtisch im Hotelbüro.', 'مدير يراجع أوراقًا على مكتب في إدارة فندق.', 'Una responsabile controlla documenti alla scrivania nell’ufficio di un hotel.'),
    problemFocus: '50% 50%',
    steps: [{ label: t('Compare', 'Vergleichen', 'قارن', 'Confronta'), frame: 0 }, { label: t('Flag', 'Markieren', 'أشر', 'Segnala'), frame: 1 }, { label: t('Decide', 'Entscheiden', 'قرّر', 'Decidi'), frame: 1 }],
    helps: {
      en: ['Each invoice is compared with the purchase order and what was received.', 'Differences are marked Difference to check, with the amount.', 'Open one to see the item behind it, then flag it, request a correction or approve it with a note.'],
      de: ['Jede Rechnung wird mit der Bestellung und dem Wareneingang verglichen.', 'Abweichungen sind als Difference to check markiert, mit dem Betrag.', 'Öffnen Sie eine, um den Artikel dahinter zu sehen, und markieren, korrigieren oder mit Notiz freigeben.'],
      ar: ['تُقارن كل فاتورة بأمر الشراء وبما تم استلامه.', 'تُعلَّم الفروق بعبارة Difference to check مع المبلغ.', 'افتح إحداها لترى الصنف وراءها، ثم أشر إليها أو اطلب تصحيحًا أو اعتمدها بملاحظة.'],
      it: ['Ogni fattura viene confrontata con l’ordine e con quanto ricevuto.', 'Le differenze sono segnate Difference to check, con l’importo.', 'Aprine una per vedere l’articolo, poi segnalala, chiedi una correzione o approvala con una nota.'],
    },
    walkTitle: t('Supplier invoices', 'Lieferantenrechnungen', 'فواتير الموردين', 'Fatture dei fornitori'),
    frames: [
      {
        img: screen('recon-1'),
        title: t('Invoice reconciliation', 'Invoice reconciliation', 'Invoice reconciliation', 'Invoice reconciliation'),
        text: t('Every supplier invoice with its total, difference and status.', 'Jede Lieferantenrechnung mit Summe, Abweichung und Status.', 'كل فاتورة مورّد مع إجماليها وفرقها وحالتها.', 'Ogni fattura fornitore con totale, differenza e stato.'),
        alt: t('Invoice reconciliation: a list of supplier invoices, each marked Difference to check with an amount.', 'Invoice reconciliation: eine Liste von Lieferantenrechnungen, jede als Difference to check mit Betrag markiert.', 'Invoice reconciliation: قائمة فواتير موردين، كلٌّ منها معلَّمة Difference to check مع مبلغ.', 'Invoice reconciliation: un elenco di fatture fornitori, ognuna segnata Difference to check con un importo.'),
      },
      {
        img: screen('recon-2'),
        title: t('One invoice', 'One invoice', 'One invoice', 'One invoice'),
        text: t('Ordered, received and invoiced side by side, item by item.', 'Bestellt, erhalten und berechnet nebeneinander, Artikel für Artikel.', 'المطلوب والمستلم والمفوتر جنبًا إلى جنب، صنفًا صنفًا.', 'Ordinato, ricevuto e fatturato fianco a fianco, articolo per articolo.'),
        alt: t('One invoice: ordered AED 6,262, received AED 5,898, invoiced AED 6,262, with 2 kg more invoiced than received.', 'Eine Rechnung: bestellt AED 6.262, erhalten AED 5.898, berechnet AED 6.262, mit 2 kg mehr berechnet als erhalten.', 'فاتورة واحدة: المطلوب 6,262 درهمًا، والمستلم 5,898، والمفوتر 6,262، و2 كغ مفوترة زيادة على المستلم.', 'Una fattura: ordinato AED 6.262, ricevuto AED 5.898, fatturato AED 6.262, con 2 kg fatturati in più del ricevuto.'),
      },
    ],
    note: t('In the demo these records are simulated. Which POS, PMS and accounting data can be connected is agreed with each hotel.', 'In der Demo sind diese Daten simuliert. Welche Kassen-, PMS- und Buchhaltungsdaten angebunden werden, wird mit jedem Hotel vereinbart.', 'هذه السجلات في العرض التوضيحي محاكاة. ويُتفق مع كل فندق على بيانات نقاط البيع وإدارة الفندق والمحاسبة التي يمكن ربطها.', 'Nella demo questi dati sono simulati. Quali dati di cassa, PMS e contabilità collegare viene concordato con ogni hotel.'),
  },

  pour: {
    key: 'pour',
    icon: 'pour',
    photo: banquet,
    photoAlt: t('A waiter setting a long banquet table with glasses and flowers.', 'Ein Kellner deckt eine lange Banketttafel mit Gläsern und Blumen ein.', 'نادل يُعدّ طاولة مأدبة طويلة بالكؤوس والزهور.', 'Un cameriere apparecchia un lungo tavolo da banchetto con bicchieri e fiori.'),
    photoFocus: '40% 50%',
    name: t('Pour Control', 'Pour Control', 'Pour Control', 'Pour Control'),
    menu: t('How many glasses each bottle really gave, and what the gap is worth.', 'Wie viele Gläser jede Flasche wirklich ergab, und was die Differenz wert ist.', 'كم كأسًا أعطت كل زجاجة فعلًا، وما قيمة الفرق.', 'Quanti bicchieri ha dato davvero ogni bottiglia, e quanto vale la differenza.'),
    headline: t('Know how many glasses each bottle really gave.', 'Wissen, wie viele Gläser jede Flasche wirklich ergab.', 'اعرف كم كأسًا أعطت كل زجاجة فعلًا.', 'Sai quanti bicchieri ha dato davvero ogni bottiglia.'),
    intro: t('By wine and spirit, by outlet and shift, with what the gap is worth. It is about the shift, not a person.', 'Nach Wein und Spirituose, Outlet und Schicht, mit dem Wert der Differenz. Es geht um die Schicht, nicht um eine Person.', 'حسب النبيذ والمشروبات الروحية والمنفذ والمناوبة، مع قيمة الفرق. الأمر يتعلق بالمناوبة لا بشخص.', 'Per vino e distillato, punto vendita e turno, con il valore della differenza. Riguarda il turno, non una persona.'),
    problem: t('Generous pours, unrecorded free glasses and breakage never appear on a report. The gap between bottles opened and glasses sold stays invisible.', 'Großzügiges Einschenken, nicht erfasste Gratisgläser und Bruch stehen in keinem Bericht. Die Differenz zwischen geöffneten Flaschen und verkauften Gläsern bleibt unsichtbar.', 'السكب السخي والكؤوس المجانية غير المسجلة والكسر لا تظهر في أي تقرير. ويبقى الفرق بين الزجاجات المفتوحة والكؤوس المبيعة غير مرئي.', 'Versate generose, bicchieri omaggio non registrati e rotture non compaiono in nessun report. La differenza tra bottiglie aperte e bicchieri venduti resta invisibile.'),
    problemPhoto: probFrontdesk,
    problemPhotoAlt: t('A quiet hotel lobby lounge with a reception desk and armchairs.', 'Eine ruhige Hotellobby mit Empfangstresen und Sesseln.', 'ردهة فندق هادئة بمكتب استقبال ومقاعد وثيرة.', 'Una lounge d’hotel tranquilla con reception e poltrone.'),
    problemFocus: '50% 50%',
    steps: [{ label: t('Compare', 'Vergleichen', 'قارن', 'Confronta'), frame: 0 }, { label: t('Where and when', 'Wo und wann', 'أين ومتى', 'Dove e quando'), frame: 1 }, { label: t('Check', 'Prüfen', 'تحقّق', 'Controlla'), frame: 1 }],
    helps: {
      en: ['Compare bottles opened with glasses sold, for each wine.', 'See where and when it happens, by outlet and shift, with no names.', 'Flags to check list the largest patterns first, with the money involved.'],
      de: ['Vergleichen Sie geöffnete Flaschen mit verkauften Gläsern, für jeden Wein.', 'Sehen Sie, wo und wann es passiert, nach Outlet und Schicht, ohne Namen.', 'Flags to check zeigt die größten Muster zuerst, mit dem betroffenen Betrag.'],
      ar: ['قارن الزجاجات المفتوحة بالكؤوس المبيعة لكل نبيذ.', 'اطّلع على المكان والوقت، حسب المنفذ والمناوبة، من دون أسماء.', 'تعرض Flags to check أكبر الأنماط أولًا مع المبلغ المعني.'],
      it: ['Confronta bottiglie aperte e bicchieri venduti, per ogni vino.', 'Vedi dove e quando succede, per punto vendita e turno, senza nomi.', 'Flags to check elenca prima gli schemi più grandi, con l’importo coinvolto.'],
    },
    walkTitle: t('Where is money going missing?', 'Wo geht Geld verloren?', 'أين يضيع المال؟', 'Dove si perde denaro?'),
    frames: [
      {
        img: screen('pour-1'),
        title: t('Pour Control', 'Pour Control', 'Pour Control', 'Pour Control'),
        text: t('The gap today, this week and this month, then each wine by the glass.', 'Die Differenz heute, diese Woche und diesen Monat, dann jeder offene Wein.', 'الفرق اليوم وهذا الأسبوع وهذا الشهر، ثم كل نبيذ بالكأس.', 'La differenza di oggi, della settimana e del mese, poi ogni vino al bicchiere.'),
        alt: t('Pour Control: 61 glasses of wine not billed this week, AED 3,433, with a table per wine.', 'Pour Control: 61 Gläser Wein diese Woche nicht berechnet, AED 3.433, mit einer Tabelle je Wein.', 'Pour Control: 61 كأس نبيذ لم تُفوتَر هذا الأسبوع، 3,433 درهمًا، مع جدول لكل نبيذ.', 'Pour Control: 61 bicchieri di vino non fatturati questa settimana, AED 3.433, con una tabella per vino.'),
      },
      {
        img: screen('pour-2'),
        title: t('Where and when', 'Where and when', 'Where and when', 'Where and when'),
        text: t('Glasses per bottle by outlet and shift, and the patterns to check.', 'Gläser pro Flasche nach Outlet und Schicht, und die zu prüfenden Muster.', 'الكؤوس لكل زجاجة حسب المنفذ والمناوبة، والأنماط التي يجب التحقق منها.', 'Bicchieri per bottiglia per punto vendita e turno, e gli schemi da controllare.'),
        alt: t('A table of glasses per bottle by outlet and shift, beside a list of flags to check.', 'Eine Tabelle mit Gläsern pro Flasche nach Outlet und Schicht, daneben eine Liste von Flags to check.', 'جدول للكؤوس لكل زجاجة حسب المنفذ والمناوبة، بجانب قائمة Flags to check.', 'Una tabella dei bicchieri per bottiglia per punto vendita e turno, accanto a un elenco di Flags to check.'),
      },
    ],
    note: t('In the demo, glasses sold come from the POS and bottles opened are simulated, because the POS does not record them. A low yield usually means generous pours, unrecorded free glasses or breakage, and says nothing about any one person.', 'In der Demo stammen die verkauften Gläser aus der Kasse, die geöffneten Flaschen sind simuliert, weil die Kasse sie nicht erfasst. Eine niedrige Ausbeute bedeutet meist großzügiges Einschenken, nicht erfasste Gratisgläser oder Bruch und sagt nichts über eine einzelne Person.', 'في العرض التوضيحي تأتي الكؤوس المبيعة من نظام نقاط البيع، أما الزجاجات المفتوحة فمحاكاة لأن النظام لا يسجلها. وانخفاض العائد يعني عادة سكبًا سخيًا أو كؤوسًا مجانية غير مسجلة أو كسرًا، ولا يقول شيئًا عن أي شخص بعينه.', 'Nella demo i bicchieri venduti vengono dalla cassa e le bottiglie aperte sono simulate, perché la cassa non le registra. Una resa bassa di solito indica versate generose, omaggi non registrati o rotture, e non dice nulla su una singola persona.'),
  },

};
