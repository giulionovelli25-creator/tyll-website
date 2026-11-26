// Search titles and descriptions for the eleven solution pages, in all four languages (round 5, 25 Nov 2026):
// every title unique, every description 140 to 160 characters and saying what the page does, not its headline.
import type { Locale, SolutionKey } from '../i18n';

type Meta = { title: string; description: string };

export const solutionSeo: Partial<Record<SolutionKey, Partial<Record<Locale, Meta>>>> = {
  stock: {
    en: { title: 'Hotel Stock Levels From Sales, Deliveries & Waste | Tyll', description: 'Stock levels worked out every night from your sales, deliveries and logged waste. See what runs out first and what each plate costs, before a guest asks.' },
    de: { title: 'Lagerbestand aus Verkäufen und Lieferungen | Tyll', description: 'Lagerbestand jede Nacht aus Verkäufen, Lieferungen und erfasstem Abfall berechnet. Sehen Sie, was zuerst ausgeht und was jeder Teller kostet.' },
    it: { title: 'Livelli di scorta da vendite, consegne e sprechi | Tyll', description: 'Le scorte calcolate ogni notte da vendite, consegne e sprechi registrati. Vedi cosa finisce per primo e quanto costa ogni piatto, prima che un ospite lo chieda.' },
    ar: { title: 'مستويات المخزون من المبيعات والتوريدات والهدر | Tyll', description: 'مستويات المخزون تُحسب كل ليلة من مبيعاتك وتوريداتك والهدر المسجّل. اعرف ما سينفد أولاً وكم يكلّف كل طبق، قبل أن يسأل عنه أي ضيف في مطعم الفندق.' },
  },
  expiry: {
    en: { title: 'Food Expiry Tracking for Hotel Kitchens | Tyll', description: 'Tyll tracks every batch with its use-by date and flags what expires soon, with what to do: use it first, move it to another outlet or serve it as a special.' },
    de: { title: 'Haltbarkeit von Lebensmitteln im Hotel im Blick | Tyll', description: 'Tyll verfolgt jede Charge mit Verbrauchsdatum und meldet, was bald abläuft, mit Vorschlag: zuerst verbrauchen, umlagern oder als Tagesgericht anbieten.' },
    it: { title: 'Scadenze degli alimenti nelle cucine d’hotel | Tyll', description: 'Tyll segue ogni lotto con la sua data di scadenza e segnala cosa scade presto, con cosa fare: usarlo per primo, spostarlo in un altro punto vendita o servirlo.' },
    ar: { title: 'تتبّع صلاحية الأغذية في مطابخ الفنادق | Tyll', description: 'يتتبّع Tyll كل دفعة مع تاريخ صلاحيتها وينبّهك إلى ما تقترب صلاحيته من الانتهاء، مع ما يجب فعله: استخدامها أولاً أو نقلها إلى منفذ آخر أو تقديمها.' },
  },
  waste: {
    en: { title: 'Food Waste and Breakage Tracking for Hotels | Tyll', description: 'Log waste and breakage in two taps: the item, the amount and the reason. See what it cost by outlet and by month, and what is thrown away most often.' },
    de: { title: 'Lebensmittelabfall und Bruch im Hotel erfassen | Tyll', description: 'Abfall und Bruch in zwei Fingertipps erfassen: Artikel, Menge und Grund. Sehen Sie die Kosten pro Outlet und Monat und was am häufigsten weggeworfen wird.' },
    it: { title: 'Sprechi alimentari e rotture negli hotel | Tyll', description: 'Registra sprechi e rotture in due tocchi: prodotto, quantità e motivo. Vedi quanto sono costati per punto vendita e per mese, e cosa si butta più spesso.' },
    ar: { title: 'تسجيل هدر الطعام والكسر في الفنادق | Tyll', description: 'سجّل الهدر والكسر بنقرتين: الصنف والكمية والسبب. اعرف تكلفته حسب المنفذ والشهر، وما الذي يُرمى أكثر من غيره، دون جداول بيانات أو أوراق أو آلات حاسبة.' },
  },
  forecasting: {
    en: { title: 'Hotel Purchasing Forecast: Know What to Order | Tyll', description: 'Tyll works out what to order from bookings, events and the last four weeks of use, so each outlet knows what to buy and how much before stock runs out.' },
    de: { title: 'Bestellmenge berechnen für Hotels | Tyll', description: 'Tyll berechnet die Bestellung aus Buchungen, Veranstaltungen und dem Verbrauch der letzten vier Wochen. So weiß jedes Outlet, was es braucht, bevor es ausgeht.' },
    it: { title: 'Previsioni d’acquisto per hotel: cosa ordinare | Tyll', description: 'Tyll calcola cosa ordinare da prenotazioni, eventi e consumi delle ultime quattro settimane, così ogni punto vendita sa cosa comprare prima di restare senza.' },
    ar: { title: 'توقعات المشتريات للفنادق: اعرف ما تطلبه | Tyll', description: 'يحسب Tyll ما يجب طلبه من الحجوزات والفعاليات واستهلاك الأسابيع الأربعة الأخيرة، فيعرف كل منفذ ما يشتريه وبأي كمية قبل أن ينفد المخزون لديه بوقت كافٍ.' },
  },
  auto: {
    en: { title: 'Automatic Purchase Orders for Hotels and Restaurants | Tyll', description: 'Routine orders go out at 06:00 by email or WhatsApp, within the limits you set. Larger orders wait for approval, and supplier replies come back into Tyll.' },
    de: { title: 'Automatische Bestellungen für Hotels | Tyll', description: 'Routinebestellungen gehen um 06:00 per E-Mail oder WhatsApp raus, im Rahmen Ihrer Limits. Größere warten auf Freigabe, Antworten der Lieferanten kommen zurück.' },
    it: { title: 'Ordini d’acquisto automatici per hotel | Tyll', description: 'Gli ordini abituali partono alle 06:00 via email o WhatsApp, entro i limiti che imposti. Quelli più grandi attendono approvazione e le risposte tornano in Tyll.' },
    ar: { title: 'أوامر شراء تلقائية للفنادق والمطاعم | Tyll', description: 'تُرسل الطلبات الروتينية في السادسة صباحًا عبر البريد أو واتساب ضمن الحدود التي تضعها. وتنتظر الطلبات الأكبر الموافقة، وتعود ردود الموردين إلى Tyll.' },
  },
  deliveries: {
    en: { title: 'Supplier Delivery and Invoice Checks for Hotels | Tyll', description: 'Every delivery note is checked against the order and the invoice. Short weights become credit requests, and only invoices that do not match wait for you.' },
    de: { title: 'Lieferungen und Lieferantenrechnungen prüfen | Tyll', description: 'Jeder Lieferschein wird mit Bestellung und Rechnung abgeglichen. Fehlmengen werden zu Gutschriftanfragen, und nur abweichende Rechnungen warten auf Sie.' },
    it: { title: 'Controllo di consegne e fatture dei fornitori | Tyll', description: 'Ogni bolla viene confrontata con l’ordine e la fattura. I cali di peso diventano richieste di nota di credito e solo le fatture che non tornano aspettano te.' },
    ar: { title: 'مطابقة توريدات الموردين وفواتيرهم | Tyll', description: 'يُطابَق كل إشعار توريد مع الطلب والفاتورة. يتحوّل النقص في الوزن إلى طلب إشعار دائن، ولا تنتظرك إلا الفواتير التي لا تتطابق مع ما تم توريده فعلًا.' },
  },
  takes: {
    en: { title: 'Hotel Stock Takes and Missing Stock | Tyll', description: 'Count the storeroom by barcode or by typing, and see every gap explained: what was sold, delivered, wasted or simply missing since the last stock take.' },
    de: { title: 'Inventur im Hotel und fehlender Bestand | Tyll', description: 'Zählen Sie das Lager per Barcode oder Eingabe und sehen Sie jede Lücke erklärt: was seit der letzten Inventur verkauft, geliefert, weggeworfen wurde oder fehlt.' },
    it: { title: 'Inventari in hotel e merce mancante | Tyll', description: 'Conta il magazzino col codice a barre o a mano e vedi ogni differenza spiegata: cosa è stato venduto, consegnato, buttato o è sparito dall’ultimo conteggio.' },
    ar: { title: 'جرد المخزون في الفنادق والمخزون المفقود | Tyll', description: 'اجرد المخزن بالباركود أو بالإدخال اليدوي، وشاهد تفسير كل فرق: ما بيع أو ورد أو أُهدر أو فُقد ببساطة منذ آخر جرد، في مكان واحد ولكل منفذ على حدة.' },
  },
  pour: {
    en: { title: 'Bar Inventory Variance: Pours vs Glasses Sold | Tyll', description: 'See how many glasses each bottle really gave, by outlet and shift, and what the gap is worth. Empty bottles are counted by label against the till each night.' },
    de: { title: 'Schankverlust messen: Überschenken erkennen | Tyll', description: 'Wie viele Gläser jede Flasche wirklich ergab, nach Outlet und Schicht, mit dem Wert der Differenz. Leere Flaschen werden jede Nacht mit der Kasse abgeglichen.' },
    it: { title: 'Versamento eccessivo al bar: bicchieri e bottiglie | Tyll', description: 'Vedi quanti bicchieri ha dato davvero ogni bottiglia, per punto vendita e turno, e quanto vale la differenza. Le vuote si contano ogni notte contro la cassa.' },
    ar: { title: 'الإفراط في السكب: الكؤوس مقابل المبيعات | Tyll', description: 'اعرف كم كأسًا أعطت كل زجاجة فعلًا، حسب المنفذ والوردية، وكم تساوي الفجوة. وتُعدّ الزجاجات الفارغة كل ليلة حسب الملصق وتُقارن بما سُجّل في نقاط البيع.' },
  },
  finance: {
    en: { title: 'Flagged Bills, Room Charges and Covers | Tyll', description: 'Every night Tyll checks bills, room charges and covers against kitchen tickets and bookings. What does not match is flagged, and open cases are tracked.' },
    de: { title: 'Auffällige Rechnungen, Zimmerbelastungen, Gedecke | Tyll', description: 'Jede Nacht prüft Tyll Rechnungen, Zimmerbelastungen und Gedecke gegen Küchenbons und Buchungen. Was nicht passt, wird markiert und als Fall verfolgt.' },
    it: { title: 'Conti segnalati, addebiti in camera e coperti | Tyll', description: 'Ogni notte Tyll confronta conti, addebiti in camera e coperti con comande e prenotazioni. Ciò che non torna viene segnalato e seguito come caso aperto.' },
    ar: { title: 'الفواتير المُعلَّمة ورسوم الغرف وعدد الضيوف | Tyll', description: 'يطابق Tyll كل ليلة فواتير الضيوف ورسوم الغرف وعدد الضيوف مع تذاكر المطبخ والحجوزات. وما لا يتطابق يُعلَّم ويُتابَع كحالة مفتوحة حتى تُغلق نهائيًا.' },
  },
  revenue: {
    en: { title: 'Hotel Revenue and Reports by Outlet | Tyll', description: 'Revenue for today, the last 7 and the last 30 days, by outlet and by menu item, with estimated operating contribution, and reports to download as PDF or CSV.' },
    de: { title: 'Umsatz und Berichte je Outlet im Hotel | Tyll', description: 'Umsatz von heute, den letzten 7 und 30 Tagen, je Outlet und Gericht, mit geschätztem Betriebsbeitrag, und Berichte zum Herunterladen als PDF oder CSV.' },
    it: { title: 'Ricavi e report per punto vendita in hotel | Tyll', description: 'I ricavi di oggi, degli ultimi 7 e 30 giorni, per punto vendita e per piatto, con il contributo operativo stimato e report da scaricare in PDF o CSV.' },
    ar: { title: 'إيرادات الفندق وتقاريره حسب المنفذ | Tyll', description: 'إيرادات اليوم وآخر 7 و30 يومًا، حسب المنفذ وحسب كل صنف في القائمة، مع المساهمة التشغيلية التقديرية، وتقارير جاهزة للتنزيل بصيغة PDF أو CSV في أي وقت.' },
  },
  suppliers: {
    en: { title: 'Hotel Supplier Catalogue and Reliability | Tyll', description: 'One catalogue of your suppliers, their prices and terms, with how reliably each one delivers: late deliveries, short weights and credits, supplier by supplier.' },
    de: { title: 'Lieferantenkatalog und Lieferzuverlässigkeit | Tyll', description: 'Ein Katalog Ihrer Lieferanten mit Preisen und Konditionen, und wie zuverlässig jeder liefert: verspätete Lieferungen, Fehlmengen und Gutschriften je Lieferant.' },
    it: { title: 'Catalogo fornitori e affidabilità delle consegne | Tyll', description: 'Un catalogo dei tuoi fornitori, con prezzi e condizioni, e quanto è affidabile ognuno: ritardi, cali di peso e note di credito, fornitore per fornitore.' },
    ar: { title: 'دليل الموردين وموثوقية التوريد | Tyll', description: 'دليل واحد لمورديك وأسعارهم وشروطهم، مع مدى موثوقية كل مورد في التوريد: التأخير ونقص الوزن والإشعارات الدائنة، موردًا بعد مورد وعلى مدى الأشهر.' },
  },
};
