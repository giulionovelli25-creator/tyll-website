// The six solution pages, in English, German, Arabic and Italian, in the demo's own order and words: Log waste, Stock,
// Predictions, Revenue, Reconciliation, Drinks control.

import type { ImageMetadata } from 'astro';
import type { Locale, SolutionKey } from '../i18n/routes';

import whyChef from '../assets/photos/why-chef.jpg';
import stockChef from '../assets/photos/stock-chef.jpg';
import forecastProduce from '../assets/photos/forecast-produce.jpg';
import statsTerminal from '../assets/photos/tyll-stats-3.jpg';
import reconciliation from '../assets/photos/reconciliation-reception.jpg';
import banquet from '../assets/photos/events-banquet.jpg';

type Text = Record<Locale, string>;
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
  /** Features of this product that are still in development */
  soonNote?: Text;
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
    intro: t('Estimates from each night’s tabs and receipts, the last count and deliveries, with what is about to run out on top.', 'Schätzungen aus den Gästerechnungen und Belegen jedes Abends, der letzten Zählung und den Lieferungen, und oben steht, was bald ausgeht.', 'تقديرات من حسابات كل ليلة وإيصالاتها وآخر جرد والتوريدات، مع ما يوشك على النفاد في الأعلى.', 'Stime dai conti e dagli scontrini di ogni sera, dall’ultimo conteggio e dalle consegne, con in cima ciò che sta per finire.'),
    problem: t('Nobody knows what is really on the shelf until something runs out, and a full count takes so long that it gets put off.', 'Niemand weiß, was wirklich im Regal steht, bis etwas ausgeht, und eine vollständige Zählung dauert so lange, dass sie verschoben wird.', 'لا أحد يعرف ما على الرف فعلًا حتى ينفد شيء، والجرد الكامل يستغرق وقتًا طويلًا فيُؤجَّل.', 'Nessuno sa cosa c’è davvero sullo scaffale finché qualcosa non finisce, e un conteggio completo è così lungo che viene rimandato.'),
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
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: reconciliation,
    photoAlt: t('A guest paying by card at a hotel reception desk beside a brass bell.', 'Ein Gast zahlt an einer Hotelrezeption neben einer Messingglocke mit Karte.', 'ضيف يدفع بالبطاقة عند مكتب استقبال فندق بجانب جرس نحاسي.', 'Un ospite paga con carta alla reception di un hotel accanto a un campanello d’ottone.'),
    photoFocus: '60% 50%',
    name: t('Reconciliation', 'Abgleich', 'المطابقة', 'Riconciliazione'),
    menu: t('Each night’s tabs and receipts, and supplier invoices, checked.', 'Gästerechnungen und Belege jedes Abends sowie Lieferantenrechnungen, geprüft.', 'حسابات كل ليلة وإيصالاتها وفواتير الموردين، مطابَقة.', 'I conti e gli scontrini di ogni sera e le fatture dei fornitori, controllati.'),
    headline: t('Know which tabs and invoices do not match.', 'Wissen, welche Gästerechnungen und Rechnungen nicht stimmen.', 'اعرف أي الحسابات والفواتير لا تتطابق.', 'Sai quali conti e fatture non coincidono.'),
    intro: t('Each night’s tabs are compared with the receipts, and each supplier invoice with the order and the delivery. Whatever differs waits for review.', 'Die Gästerechnungen jedes Abends werden mit den Belegen verglichen, jede Lieferantenrechnung mit Bestellung und Lieferung. Was abweicht, wartet auf Prüfung.', 'تُقارن حسابات كل ليلة بالإيصالات، وكل فاتورة مورّد بالطلب والتوريد. وينتظر كل فرق المراجعة.', 'I conti di ogni sera vengono confrontati con gli scontrini, e ogni fattura con ordine e consegna. Ciò che non coincide attende la revisione.'),
    problem: t('Tabs are closed and invoices paid without anyone comparing them. Small differences add up unseen, in the money and in the stock.', 'Gästerechnungen werden geschlossen und Rechnungen bezahlt, ohne dass jemand sie vergleicht. Kleine Abweichungen summieren sich unbemerkt, beim Geld und beim Bestand.', 'تُغلق الحسابات وتُدفع الفواتير من دون أن يقارنها أحد. وتتراكم الفروق الصغيرة من دون أن يلاحظها أحد، في المال وفي المخزون.', 'I conti si chiudono e le fatture si pagano senza che nessuno li confronti. Le piccole differenze si sommano senza farsi notare, nel denaro e nella merce.'),
    note: t('Tabs and receipts are not in the demo yet.', 'Gästerechnungen und Belege sind noch nicht in der Demo.', 'الحسابات والإيصالات ليست في العرض التوضيحي بعد.', 'Conti e scontrini non sono ancora nella demo.'),
  },

  pour: {
    key: 'pour',
    icon: 'pour',
    photo: banquet,
    photoAlt: t('A waiter setting a long banquet table with glasses and flowers.', 'Ein Kellner deckt eine lange Banketttafel mit Gläsern und Blumen ein.', 'نادل يُعدّ طاولة مأدبة طويلة بالكؤوس والزهور.', 'Un cameriere apparecchia un lungo tavolo da banchetto con bicchieri e fiori.'),
    photoFocus: '40% 50%',
    name: t('Drinks control', 'Drinks control', 'Drinks control', 'Drinks control'),
    menu: t('How many glasses each bottle really gave, and what the gap is worth.', 'Wie viele Gläser jede Flasche wirklich ergab, und was die Differenz wert ist.', 'كم كأسًا أعطت كل زجاجة فعلًا، وما قيمة الفرق.', 'Quanti bicchieri ha dato davvero ogni bottiglia, e quanto vale la differenza.'),
    headline: t('Know how many glasses each bottle really gave.', 'Wissen, wie viele Gläser jede Flasche wirklich ergab.', 'اعرف كم كأسًا أعطت كل زجاجة فعلًا.', 'Sai quanti bicchieri ha dato davvero ogni bottiglia.'),
    intro: t('By wine and spirit, by outlet and shift, with what the gap is worth. It is about the shift, not a person.', 'Nach Wein und Spirituose, Outlet und Schicht, mit dem Wert der Differenz. Es geht um die Schicht, nicht um eine Person.', 'حسب النبيذ والمشروبات الروحية والمنفذ والمناوبة، مع قيمة الفرق. الأمر يتعلق بالمناوبة لا بشخص.', 'Per vino e distillato, punto vendita e turno, con il valore della differenza. Riguarda il turno, non una persona.'),
    problem: t('Generous pours, unrecorded free glasses and breakage never appear on a report. The gap between bottles opened and glasses sold stays invisible.', 'Großzügiges Einschenken, nicht erfasste Gratisgläser und Bruch stehen in keinem Bericht. Die Differenz zwischen geöffneten Flaschen und verkauften Gläsern bleibt unsichtbar.', 'السكب السخي والكؤوس المجانية غير المسجلة والكسر لا تظهر في أي تقرير. ويبقى الفرق بين الزجاجات المفتوحة والكؤوس المبيعة غير مرئي.', 'Versate generose, bicchieri omaggio non registrati e rotture non compaiono in nessun report. La differenza tra bottiglie aperte e bicchieri venduti resta invisibile.'),
  },

};
