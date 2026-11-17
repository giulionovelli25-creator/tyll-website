// The six solution pages, in English, German, Arabic and Italian, in the demo's own order and words: Log waste, Stock
// levels, Predictions, Revenue, Reconciliation, Over pouring (matched to demo.tyll.ai on 17 Nov 2026).

import type { ImageMetadata } from 'astro';
import type { Locale, SolutionKey } from '../i18n/routes';

import whyChef from '../assets/photos/why-chef.jpg';
import stockChef from '../assets/photos/stock-chef.jpg';
import forecastProduce from '../assets/photos/forecast-produce.jpg';
import revenuePayment from '../assets/photos/revenue-payment.jpg';
import reconciliation from '../assets/photos/reconciliation-reception.jpg';
import banquet from '../assets/photos/events-banquet.jpg';
// One real-world photograph beside each page's question (11 Nov 2026; real Pexels photographs, not generated ones, at
// the owner's request the same day; sources in src/assets/photos/CREDITS.md)
import pageWaste from '../assets/photos/waste-bin.jpg';
import pageStock from '../assets/photos/stock-shelf.jpg';
import pagePredictions from '../assets/photos/predictions-delivery.jpg';
import pageReconciliation from '../assets/photos/reconciliation-tickets.jpg';
import pageDrinks from '../assets/photos/drinks-cola.jpg';

type Text = Record<Locale, string>;
export type Solution = {
  key: SolutionKey;
  icon: 'waste' | 'stock' | 'forecast' | 'revenue' | 'finance' | 'pour';
  photo: ImageMetadata;
  photoAlt: Text;
  /** Where the photo's subject sits, so cropping keeps it in view */
  photoFocus: string;
  /** The colour this feature has in the product (Demo-Tyll's MODULE_TONE); tokens in global.css */
  tone: 'teal' | 'violet' | 'blue' | 'rose';
  /** The one word or phrase of the headline shown in that colour: an exact part of the headline in each language */
  mark: Text;
  /** The photograph beside the question on the solution's own page, and where its subject sits */
  pagePhoto: ImageMetadata;
  pagePhotoFocus: string;
  /** The number or statement shown after the film, always text the site already has: one of the homepage's three
      numbers (`home.why.cards`), one of the hotel story's problems (`home.tour.steps`) or a FAQ answer (`faq`). */
  proof: { kind: 'number'; card: 0 | 2 } | { kind: 'story'; step: 0 | 1 | 2 } | { kind: 'faq'; id: string };
  name: Text;
  menu: Text;
  headline: Text;
  intro: Text;
  /** "What you are about to see", above the film: what comes in, what Tyll shows, what you do with it */
  see: { title: Text; text: Text }[];
  /** A short extra section under the film (the demo's other features for this product): one or two groups of points,
      each with an optional title, a lead-in line and a closing line */
  more?: { title?: Text; lead?: Text; points: Text[]; foot?: Text }[];
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
    tone: 'teal',
    mark: t('throw away', 'weggeworfen', 'رميت', 'buttato'),
    pagePhoto: pageWaste,
    pagePhotoFocus: '50% 62%',
    proof: { kind: 'number', card: 0 },
    name: t('Log waste', 'Abfall erfassen', 'تسجيل الهدر', 'Registra sprechi'),
    menu: t('See what waste costs you.', 'Sehen, was Abfall kostet.', 'اعرف كم يكلفك الهدر.', 'Scopri quanto ti costa lo spreco.'),
    headline: t('What did you throw away today?', 'Was haben Sie heute weggeworfen?', 'ماذا رميت اليوم؟', 'Cosa hai buttato oggi?'),
    intro: t('Two taps: the item, then the amount. Add a reason if you want.', 'Zwei Tipps: Artikel, dann Menge. Ein Grund ist optional.', 'نقرتان: الصنف ثم الكمية. وأضف السبب إن أردت.', 'Due tocchi: l’articolo, poi la quantità. Il motivo, se vuoi.'),
    see: [
      { title: t('What gets thrown away', 'Was weggeworfen wird', 'ما الذي يُرمى', 'Cosa viene buttato via'), text: t('Tap the item, tap the amount. Two taps, with Undo.', 'Artikel tippen, Menge tippen. Zwei Tipps, mit Rückgängig.', 'انقر الصنف ثم الكمية. نقرتان، مع إمكانية التراجع.', 'Tocca l’articolo, tocca la quantità. Due tocchi, con Annulla.') },
      { title: t('What each entry cost', 'Was jeder Eintrag kostet', 'تكلفة كل إدخال', 'Quanto costa ogni voce'), text: t('Today’s loss at a glance, and every entry with its cost.', 'Der heutige Verlust auf einen Blick, jeder Eintrag mit seinen Kosten.', 'خسارة اليوم بنظرة واحدة، وكل إدخال مع تكلفته.', 'La perdita di oggi a colpo d’occhio, ogni voce con il suo costo.') },
      { title: t('A daily log to check', 'Ein Tagesprotokoll zum Prüfen', 'سجل يومي للمراجعة', 'Un registro giornaliero da controllare'), text: t('Read it and see what waste costs you.', 'Lesen Sie es und sehen Sie, was Abfall kostet.', 'اقرأه واعرف كم يكلفك الهدر.', 'Leggilo e scopri quanto ti costa lo spreco.') },
    ],
    more: [
      {
        points: [
          t('Food, beverage and inventory (glassware, plates, linen) are logged separately.', 'Speisen, Getränke und Inventar (Gläser, Teller, Wäsche) werden getrennt erfasst.', 'تُسجَّل الأطعمة والمشروبات والمستلزمات (الأواني الزجاجية والأطباق والبياضات) كلٌّ على حدة.', 'Cibo, bevande e inventario (bicchieri, piatti, biancheria) si registrano separatamente.'),
          t('Waste and breakage are tracked separately.', 'Abfall und Bruch werden getrennt verfolgt.', 'يُتابَع الهدر والكسر كلٌّ على حدة.', 'Sprechi e rotture sono tracciati separatamente.'),
          t('The top reason and the top item each week.', 'Der häufigste Grund und der häufigste Artikel jeder Woche.', 'السبب الأكثر تكرارًا والصنف الأكثر هدرًا كل أسبوع.', 'Il motivo e l’articolo principali di ogni settimana.'),
          t('Today’s log and the month’s total, split into food, beverage and inventory.', 'Das heutige Protokoll und die Monatssumme, aufgeteilt in Speisen, Getränke und Inventar.', 'سجل اليوم وإجمالي الشهر، مقسّمين إلى أطعمة ومشروبات ومستلزمات.', 'Il registro di oggi e il totale del mese, divisi tra cibo, bevande e inventario.'),
          t('Prepared dishes and notes can be logged too.', 'Auch zubereitete Gerichte und Notizen lassen sich erfassen.', 'يمكن تسجيل الأطباق المحضّرة والملاحظات أيضًا.', 'Si possono registrare anche piatti preparati e note.'),
        ],
      },
    ],
  },

  stock: {
    key: 'stock',
    icon: 'stock',
    photo: stockChef,
    photoAlt: t('Chefs seasoning and plating dishes under copper heat lamps in a hotel kitchen.', 'Köche würzen und richten Gerichte unter kupfernen Wärmelampen in einer Hotelküche an.', 'طهاة يتبّلون الأطباق ويقدّمونها تحت مصابيح تسخين نحاسية في مطبخ فندق.', 'Chef condiscono e impiattano sotto lampade di rame nella cucina di un hotel.'),
    photoFocus: '50% 40%',
    tone: 'teal',
    mark: t('really', 'wirklich', 'فعلًا', 'davvero'),
    pagePhoto: pageStock,
    pagePhotoFocus: '50% 60%',
    proof: { kind: 'story', step: 1 },
    name: t('Stock levels', 'Lagerbestand', 'مستويات المخزون', 'Livelli di scorta'),
    menu: t('Know what runs out first.', 'Wissen, was zuerst ausgeht.', 'اعرف ما ينفد أولًا.', 'Sai cosa finisce per primo.'),
    headline: t('What’s really on your shelf?', 'Was steht wirklich im Regal?', 'ما الموجود فعلًا على رفوفك؟', 'Cosa c’è davvero sullo scaffale?'),
    intro: t('See what runs out first, before a guest asks for it.', 'Sehen Sie, was zuerst ausgeht, bevor ein Gast danach fragt.', 'اعرف ما ينفد أولًا، قبل أن يطلبه ضيف.', 'Vedi cosa finisce per primo, prima che un ospite lo chieda.'),
    see: [
      { title: t('Your team’s stock count', 'Die Zählung Ihres Teams', 'جرد يقوم به فريقك', 'Il conteggio del tuo team'), text: t('The expected amount is filled in. They just confirm.', 'Die erwartete Menge ist eingetragen. Ihr Team bestätigt nur.', 'الكمية المتوقعة مُدخلة. ما عليهم إلا التأكيد.', 'La quantità prevista è già inserita. Basta confermare.') },
      { title: t('Critical, low or fine', 'Critical, low oder fine', 'Critical أو low أو fine', 'Critical, low o fine'), text: t('Your whole stock at a glance.', 'Ihr ganzer Bestand auf einen Blick.', 'مخزونك كله بنظرة واحدة.', 'Tutta la merce a colpo d’occhio.') },
      { title: t('What runs out first', 'Was zuerst ausgeht', 'ما ينفد أولًا', 'Cosa finisce per primo'), text: t('Act on it before a guest asks for it.', 'Handeln Sie, bevor ein Gast danach fragt.', 'تصرّف قبل أن يطلبه ضيف.', 'Intervieni prima che un ospite lo chieda.') },
    ],
    more: [
      {
        points: [
          t('Count modes: a total check in walking order, by category, key items only, or a blind count for audits that hides the expected amount.', 'Zählarten: Gesamtprüfung in Laufreihenfolge, nach Kategorie, nur wichtige Artikel oder eine Blindzählung für Audits, die die erwartete Menge verbirgt.', 'أنماط الجرد: فحص كامل بترتيب المرور، أو حسب الفئة، أو الأصناف الرئيسية فقط، أو جرد أعمى للتدقيق يُخفي الكمية المتوقعة.', 'Modalità di conteggio: controllo totale nell’ordine di percorso, per categoria, solo articoli chiave, o un conteggio alla cieca per gli audit che nasconde la quantità prevista.'),
          t('Five spot checks a day: the expected amount appears only after staff enter their count.', 'Fünf Stichproben am Tag: Die erwartete Menge erscheint erst, wenn das Team seine Zählung eingegeben hat.', 'خمسة فحوص عشوائية يوميًا: لا تظهر الكمية المتوقعة إلا بعد أن يُدخل الموظفون جردهم.', 'Cinque controlli a campione al giorno: la quantità prevista appare solo dopo che il personale ha inserito il conteggio.'),
          t('Glassware counted by dishwasher rack.', 'Gläser werden nach Spülkorb gezählt.', 'تُجرد الأواني الزجاجية حسب حامل الغسالة.', 'I bicchieri si contano per cestello.'),
          t('Counts and missing stock: what should have been used (sales × recipe, including complimentary items) against what was actually used (opening count + deliveries − closing count), per outlet, with Open a case.', 'Zählungen und Fehlbestand: was verbraucht sein sollte (Verkäufe × Rezept, inklusive Gratisartikel) gegen den tatsächlichen Verbrauch (Anfangsbestand + Lieferungen − Endbestand), je Outlet, mit „Fall eröffnen“.', 'الجرد والمخزون المفقود: ما كان يجب استخدامه (المبيعات × الوصفة، بما فيها الأصناف المجانية) مقابل ما استُخدم فعلًا (جرد البداية + التوريدات − جرد النهاية)، لكل منفذ، مع زر «افتح حالة».', 'Conteggi e scorte mancanti: quanto si sarebbe dovuto usare (vendite × ricetta, omaggi inclusi) contro quanto si è usato davvero (conteggio iniziale + consegne − conteggio finale), per punto vendita, con «Apri un caso».'),
          t('Recipes and costs: cost per portion at today’s prices, margin and cost change.', 'Rezepte und Kosten: Kosten pro Portion zu heutigen Preisen, Marge und Kostenänderung.', 'الوصفات والتكاليف: تكلفة الحصة بأسعار اليوم، والهامش، وتغير التكلفة.', 'Ricette e costi: costo per porzione ai prezzi di oggi, margine e variazione del costo.'),
        ],
      },
    ],
  },

  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    photo: forecastProduce,
    photoAlt: t('A chef chopping fresh herbs beside trays of lemons and greens.', 'Ein Koch hackt frische Kräuter neben Schalen mit Zitronen und Grün.', 'طاهٍ يفرم أعشابًا طازجة بجانب صوانٍ من الليمون والخضار.', 'Uno chef trita erbe fresche accanto a vassoi di limoni e verdure.'),
    photoFocus: '60% 45%',
    tone: 'violet',
    mark: t('guessing', 'Raten', 'تخمّن', 'indovinando'),
    pagePhoto: pagePredictions,
    pagePhotoFocus: '55% 40%',
    proof: { kind: 'story', step: 2 },
    name: t('Predictions', 'Prognosen', 'التوقعات', 'Previsioni'),
    menu: t('One order, ready to approve.', 'Eine Bestellung, bereit zur Freigabe.', 'طلب واحد جاهز للاعتماد.', 'Un ordine, pronto da approvare.'),
    headline: t('Still guessing what to order?', 'Raten Sie noch, was zu bestellen ist?', 'هل ما زلت تخمّن ماذا تطلب؟', 'Stai ancora indovinando cosa ordinare?'),
    intro: t('Get one draft order, built from covers, events and real usage.', 'Ein Bestellentwurf aus Gedecken, Events und echtem Verbrauch.', 'مسودة طلب واحدة مبنية على الأغطية والفعاليات والاستهلاك الفعلي.', 'Una bozza d’ordine da coperti, eventi e consumi reali.'),
    see: [
      { title: t('Covers, events and real usage', 'Gedecke, Events und echter Verbrauch', 'الأغطية والفعاليات والاستهلاك الفعلي', 'Coperti, eventi e consumi reali'), text: t('The numbers every order is built from.', 'Die Zahlen, aus denen jede Bestellung entsteht.', 'الأرقام التي يُبنى عليها كل طلب.', 'I numeri da cui nasce ogni ordine.') },
      { title: t('What to order today', 'Was heute zu bestellen ist', 'ماذا تطلب اليوم', 'Cosa ordinare oggi'), text: t('With the cost today and through to month end.', 'Mit den Kosten heute und bis Monatsende.', 'مع التكلفة اليوم وحتى نهاية الشهر.', 'Con il costo di oggi e fino a fine mese.') },
      { title: t('One draft order to approve', 'Ein Entwurf zur Freigabe', 'مسودة طلب واحدة للاعتماد', 'Una bozza da approvare'), text: t('Nothing is sent until you approve it.', 'Nichts geht raus ohne Ihre Freigabe.', 'لا يُرسل شيء قبل موافقتك.', 'Nulla parte senza la tua approvazione.') },
    ],
    more: [
      {
        points: [
          t('Built from forecast guests, hotel occupancy, bookings from the reservation book, events and the last 4 weeks of use, with a confidence level.', 'Grundlage: erwartete Gäste, Hotelauslastung, Buchungen aus dem Reservierungsbuch, Events und der Verbrauch der letzten 4 Wochen, mit einer Verlässlichkeitsangabe.', 'مبنية على الضيوف المتوقعين وإشغال الفندق والحجوزات من دفتر الحجز والفعاليات واستهلاك آخر 4 أسابيع، مع مستوى ثقة.', 'Si basa su ospiti previsti, occupazione dell’hotel, prenotazioni dal libro prenotazioni, eventi e consumi delle ultime 4 settimane, con un livello di affidabilità.'),
          t('Order today: grouped by supplier, with arrival date and days covered.', 'Heute bestellen: nach Lieferant gruppiert, mit Liefertag und abgedeckten Tagen.', 'اطلب اليوم: مجمّعة حسب المورد، مع تاريخ الوصول والأيام المغطاة.', 'Ordina oggi: raggruppato per fornitore, con data di arrivo e giorni coperti.'),
          t('Plan the prep: portions per dish, per kitchen, for tomorrow, the next 3 days or the next 7 days.', 'Vorbereitung planen: Portionen pro Gericht und Küche, für morgen, die nächsten 3 oder die nächsten 7 Tage.', 'خطط للتحضير: الحصص لكل طبق ولكل مطبخ، للغد أو للأيام الثلاثة أو السبعة المقبلة.', 'Pianifica la preparazione: porzioni per piatto e per cucina, per domani, i prossimi 3 o i prossimi 7 giorni.'),
          t('Next 7 days: expected guests per outlet, booked against walk-ins.', 'Die nächsten 7 Tage: erwartete Gäste je Outlet, gebucht gegenüber Laufkundschaft.', 'الأيام السبعة المقبلة: الضيوف المتوقعون لكل منفذ، المحجوزون مقابل القادمين دون حجز.', 'Prossimi 7 giorni: ospiti previsti per punto vendita, prenotati contro senza prenotazione.'),
          t('Orders go from draft to waiting for approval to awaiting delivery. Nothing is sent to a supplier until it is approved.', 'Bestellungen gehen vom Entwurf über die Freigabe zur erwarteten Lieferung. Nichts geht an einen Lieferanten, bevor es freigegeben ist.', 'تنتقل الطلبات من مسودة إلى بانتظار الموافقة ثم بانتظار التسليم. لا يُرسل شيء إلى مورد قبل اعتماده.', 'Gli ordini passano da bozza ad attesa di approvazione ad attesa di consegna. Nulla va a un fornitore finché non è approvato.'),
        ],
      },
    ],
  },

  revenue: {
    key: 'revenue',
    icon: 'revenue',
    photo: revenuePayment,
    photoAlt: t('A waiter in white gloves holds a card terminal while a guest checks the bill.', 'Ein Kellner mit weißen Handschuhen hält ein Kartenterminal, während ein Gast die Rechnung prüft.', 'نادل بقفازين أبيضين يحمل جهاز الدفع بينما يراجع ضيف الفاتورة.', 'Un cameriere con guanti bianchi tiene il terminale mentre un ospite controlla il conto.'),
    photoFocus: '55% 12%',
    tone: 'blue',
    mark: t('money', 'Geld', 'المال', 'guadagnare'),
    pagePhoto: revenuePayment,
    pagePhotoFocus: '50% 4%',
    proof: { kind: 'faq', id: 'outlets' },
    name: t('Revenue', 'Umsatz', 'الإيرادات', 'Ricavi'),
    menu: t('See which outlet earns most.', 'Sehen, welches Outlet am meisten bringt.', 'اعرف أي منفذ يكسب أكثر.', 'Vedi quale punto vendita rende di più.'),
    headline: t('Which outlet really makes you money?', 'Welches Outlet bringt wirklich Geld?', 'أي منفذ يحقق لك المال فعلًا؟', 'Quale punto vendita ti fa guadagnare davvero?'),
    intro: t('Revenue and estimated profit, by day and by outlet.', 'Umsatz und geschätzter Gewinn, nach Tag und Outlet.', 'الإيرادات والربح التقديري حسب اليوم والمنفذ.', 'Ricavi e profitto stimato, per giorno e punto vendita.'),
    see: [
      { title: t('Revenue and estimated cost by outlet', 'Umsatz und geschätzte Kosten je Outlet', 'الإيرادات والتكلفة التقديرية لكل منفذ', 'Ricavi e costi stimati per punto vendita'), text: t('For today, yesterday, 7 days, 30 days or a custom range.', 'Für heute, gestern, 7 Tage, 30 Tage oder einen eigenen Zeitraum.', 'لليوم أو الأمس أو 7 أيام أو 30 يومًا أو فترة تختارها.', 'Per oggi, ieri, 7 giorni, 30 giorni o un periodo a scelta.') },
      { title: t('Revenue beside estimated profit', 'Umsatz neben geschätztem Gewinn', 'الإيرادات بجانب الربح التقديري', 'Ricavi accanto al profitto stimato'), text: t('Side by side, by day and by outlet.', 'Nebeneinander, nach Tag und nach Outlet.', 'جنبًا إلى جنب، حسب اليوم وحسب المنفذ.', 'Fianco a fianco, per giorno e per punto vendita.') },
      { title: t('Your outlets, compared', 'Ihre Outlets im Vergleich', 'منافذك في مقارنة واحدة', 'I tuoi punti vendita a confronto'), text: t('See which one really makes you money.', 'Sehen Sie, welches wirklich Geld bringt.', 'اعرف أيّها يحقق لك المال فعلًا.', 'Vedi quale ti fa guadagnare davvero.') },
    ],
    more: [
      {
        points: [
          t('Revenue, estimated cost, estimated profit and gross margin per outlet.', 'Umsatz, geschätzte Kosten, geschätzter Gewinn und Bruttomarge je Outlet.', 'الإيرادات والتكلفة التقديرية والربح التقديري وهامش الربح الإجمالي لكل منفذ.', 'Ricavi, costi stimati, profitto stimato e margine lordo per punto vendita.'),
          t('Guests and average bill.', 'Gäste und durchschnittliche Rechnung.', 'عدد الضيوف ومتوسط الفاتورة.', 'Ospiti e conto medio.'),
          t('All transactions, searchable by day.', 'Alle Transaktionen, nach Tag durchsuchbar.', 'كل المعاملات، قابلة للبحث حسب اليوم.', 'Tutte le transazioni, consultabili per giorno.'),
          t('Menu performance: units sold, margin per dish, and which margins are falling.', 'Menüleistung: verkaufte Einheiten, Marge pro Gericht und welche Margen sinken.', 'أداء القائمة: الوحدات المبيعة، والهامش لكل طبق، وأي الهوامش تتراجع.', 'Rendimento del menu: unità vendute, margine per piatto e quali margini stanno calando.'),
        ],
        foot: t('Every profit figure is an estimate, because labour comes from rostered hours.', 'Jeder Gewinn ist eine Schätzung, weil die Personalkosten aus den geplanten Stunden kommen.', 'كل رقم للربح تقديري، لأن تكلفة العمالة مأخوذة من ساعات جدول المناوبات.', 'Ogni profitto è una stima, perché il costo del personale deriva dalle ore dei turni.'),
      },
    ],
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: reconciliation,
    photoAlt: t('A guest paying by card at a hotel reception desk beside a brass bell.', 'Ein Gast zahlt an einer Hotelrezeption neben einer Messingglocke mit Karte.', 'ضيف يدفع بالبطاقة عند مكتب استقبال فندق بجانب جرس نحاسي.', 'Un ospite paga con carta alla reception di un hotel accanto a un campanello d’ottone.'),
    photoFocus: '60% 50%',
    tone: 'blue',
    mark: t('never received', 'nie ankam', 'لم تستلمها', 'mai ricevuta'),
    pagePhoto: pageReconciliation,
    pagePhotoFocus: '40% 55%',
    proof: { kind: 'story', step: 0 },
    name: t('Reconciliation', 'Abgleich', 'المطابقة', 'Riconciliazione'),
    menu: t('Catch what doesn’t match.', 'Finden, was nicht stimmt.', 'اكتشف ما لا يتطابق.', 'Trova ciò che non coincide.'),
    headline: t('Are you paying for things you never received?', 'Zahlen Sie für Ware, die nie ankam?', 'هل تدفع ثمن أشياء لم تستلمها؟', 'Stai pagando merce mai ricevuta?'),
    intro: t('Bills against tickets. Invoices against deliveries. You only see what differs.', 'Gästerechnungen gegen Bons. Lieferantenrechnungen gegen Lieferungen. Sie sehen nur, was abweicht.', 'فواتير الضيوف مقابل التذاكر. فواتير الموردين مقابل التوريدات. لا ترى سوى الفروق.', 'Conti contro comande. Fatture contro consegne. Vedi solo ciò che non coincide.'),
    see: [
      { title: t('Your supplier invoices', 'Die Rechnungen Ihrer Lieferanten', 'فواتير الموردين لديك', 'Le fatture dei tuoi fornitori'), text: t('Checked against what you ordered and what arrived.', 'Geprüft gegen Bestellung und Lieferung.', 'تُطابَق مع ما طلبته وما استلمته.', 'Controllate con ciò che hai ordinato e ricevuto.') },
      { title: t('Every invoice with a difference', 'Jede Rechnung mit einer Abweichung', 'كل فاتورة بها فرق', 'Ogni fattura con una differenza'), text: t('Ordered, received and invoiced, side by side.', 'Bestellt, erhalten und berechnet, nebeneinander.', 'المطلوب والمستلم والمفوتر جنبًا إلى جنب.', 'Ordinato, ricevuto e fatturato, fianco a fianco.') },
      { title: t('One decision per invoice', 'Eine Entscheidung pro Rechnung', 'قرار واحد لكل فاتورة', 'Una decisione per fattura'), text: t('Flag it, correct it or approve it. Approving one that still has a difference needs a short note why.', 'Markieren, korrigieren oder freigeben. Wer eine Rechnung mit Abweichung freigibt, schreibt kurz, warum.', 'أشر إليها أو صحّحها أو اعتمدها. واعتماد فاتورة ما زال بها فرق يحتاج إلى ملاحظة قصيرة توضح السبب.', 'Segnala, correggi o approva. Per approvarne una che ha ancora una differenza serve una breve nota sul perché.') },
    ],
    more: [
      {
        title: t('Bills', 'Gästerechnungen', 'فواتير الضيوف', 'Conti'),
        lead: t('Tyll flags the bills that break the rules agreed with your hotel:', 'Tyll markiert Gästerechnungen, die gegen die mit Ihrem Hotel vereinbarten Regeln verstoßen:', 'يشير Tyll إلى فواتير الضيوف التي تخالف القواعد المتفق عليها مع فندقك:', 'Tyll segnala i conti che violano le regole concordate con il tuo hotel:'),
        points: [
          t('Items removed after the ticket went to the kitchen or bar, without approval', 'Posten, die nach dem Bon an Küche oder Bar ohne Freigabe entfernt wurden', 'أصناف حُذفت بعد إرسال التذكرة إلى المطبخ أو البار دون موافقة', 'Articoli tolti dopo l’invio della comanda a cucina o bar, senza approvazione'),
          t('Items the kitchen marked ready that are not on the final bill', 'Posten, die die Küche als fertig gemeldet hat und die auf der Schlussrechnung fehlen', 'أصناف أعلن المطبخ جاهزيتها وليست في الفاتورة النهائية', 'Articoli segnati pronti dalla cucina che mancano nel conto finale'),
          t('Discounts above 25%, or with no reason or approval', 'Rabatte über 25 % oder ohne Grund oder Freigabe', 'خصومات تتجاوز 25% أو دون سبب أو موافقة', 'Sconti oltre il 25%, o senza motivo o approvazione'),
          t('Complimentary items above the agreed limit per order', 'Gratisartikel über dem vereinbarten Limit pro Bestellung', 'أصناف مجانية تتجاوز الحد المتفق عليه لكل طلب', 'Omaggi oltre il limite concordato per ordine'),
          t('Refunds above half a bill, late, or with no reason', 'Rückerstattungen über einer halben Rechnung, verspätet oder ohne Grund', 'مبالغ مستردة تتجاوز نصف الفاتورة، أو متأخرة، أو دون سبب', 'Rimborsi oltre metà conto, tardivi o senza motivo'),
          t('Whole orders cancelled after they were sent', 'Ganze Bestellungen, die nach dem Bonieren storniert wurden', 'طلبات كاملة أُلغيت بعد إرسالها', 'Ordini interi annullati dopo l’invio'),
          t('Room charges that don’t match the guest bill', 'Zimmerbelastungen, die nicht zur Gästerechnung passen', 'رسوم غرف لا تطابق فاتورة الضيف', 'Addebiti in camera che non corrispondono al conto dell’ospite'),
        ],
        foot: t('A flag is a prompt to check, not a finding. Cases can be assigned, closed with an outcome and reopened, and every case lands on the Money Back List.', 'Ein Hinweis ist ein Anlass zur Prüfung, kein Befund. Fälle lassen sich zuweisen, mit Ergebnis abschließen und wieder öffnen, und jeder Fall landet auf der Rückholliste.', 'الإشارة دعوة للتحقق، وليست نتيجة. يمكن إسناد الحالات وإغلاقها بنتيجة وإعادة فتحها، وكل حالة تُضاف إلى قائمة استرداد الأموال.', 'Una segnalazione è un invito a controllare, non un risultato. I casi si possono assegnare, chiudere con un esito e riaprire, e ogni caso finisce nella Lista recuperi.'),
      },
      {
        title: t('Budgets and payments', 'Budgets und Zahlungen', 'الميزانيات والمدفوعات', 'Budget e pagamenti'),
        points: [
          t('Budgets and reports: budget against actual by department, purchasing commitments and cost exceptions.', 'Budgets und Berichte: Budget gegen Ist je Abteilung, Einkaufsverpflichtungen und Kostenausnahmen.', 'الميزانيات والتقارير: الميزانية مقابل الفعلي لكل قسم، والتزامات الشراء، واستثناءات التكلفة.', 'Budget e report: budget contro consuntivo per reparto, impegni di acquisto ed eccezioni di costo.'),
          t('Matching the till against card company and bank statements runs as a separate Tyll product.', 'Der Abgleich der Kasse mit den Abrechnungen der Kartenanbieter und den Kontoauszügen ist ein eigenes Tyll-Produkt.', 'مطابقة الصندوق مع كشوف شركات البطاقات والبنوك منتج منفصل من Tyll.', 'Il confronto della cassa con gli estratti dei circuiti delle carte e delle banche è un prodotto Tyll separato.'),
          t('Tyll never changes your systems. Tyll does not record payments.', 'Tyll ändert nie etwas in Ihren Systemen. Tyll erfasst keine Zahlungen.', 'لا يغيّر Tyll أي شيء في أنظمتك أبدًا. ولا يسجّل Tyll المدفوعات.', 'Tyll non modifica mai i tuoi sistemi. Tyll non registra pagamenti.'),
        ],
      },
    ],
  },

  pour: {
    key: 'pour',
    icon: 'pour',
    photo: banquet,
    photoAlt: t('A waiter setting a long banquet table with glasses and flowers.', 'Ein Kellner deckt eine lange Banketttafel mit Gläsern und Blumen ein.', 'نادل يُعدّ طاولة مأدبة طويلة بالكؤوس والزهور.', 'Un cameriere apparecchia un lungo tavolo da banchetto con bicchieri e fiori.'),
    photoFocus: '40% 50%',
    tone: 'rose',
    mark: t('never', 'nie', 'أبدًا', 'mai'),
    pagePhoto: pageDrinks,
    pagePhotoFocus: '50% 50%',
    proof: { kind: 'number', card: 2 },
    name: t('Over pouring', 'Überschenken', 'الإفراط في السكب', 'Versamento eccessivo'),
    menu: t('Find drinks never billed.', 'Nie berechnete Getränke finden.', 'اكتشف المشروبات غير المفوترة.', 'Trova le bevande mai fatturate.'),
    headline: t('How much of your bar never reaches a bill?', 'Wie viel von Ihrer Bar landet nie auf einer Rechnung?', 'كم من مشروبات البار لا يصل إلى الفاتورة أبدًا؟', 'Quanto del tuo bar non arriva mai in conto?'),
    intro: t('See the gap by outlet and shift, and what it is worth.', 'Die Lücke nach Outlet und Schicht, und was sie wert ist.', 'اعرف الفرق حسب المنفذ والوردية وقيمته.', 'La differenza per punto vendita e turno, e quanto vale.'),
    see: [
      { title: t('Last night’s bar sales', 'Die Barumsätze der letzten Nacht', 'مبيعات البار ليلة أمس', 'Le vendite bar di ieri sera'), text: t('Read from your POS, nothing to install.', 'Aus Ihrer Kasse gelesen, nichts zu installieren.', 'تُقرأ من نظام نقاط البيع لديك، ولا شيء للتثبيت.', 'Lette dal tuo POS, niente da installare.') },
      { title: t('Drinks poured but never billed', 'Eingeschenkt, aber nie berechnet', 'مشروبات سُكبت ولم تُفوتر', 'Versato ma mai fatturato'), text: t('Each line shows what was not billed and what it is worth.', 'Jede Zeile zeigt, was nicht berechnet wurde und was es wert ist.', 'يُظهر كل بند ما لم يُفوتر وكم قيمته.', 'Ogni riga mostra cosa non è stato fatturato e quanto vale.') },
      { title: t('A short list to check', 'Eine kurze Liste zum Prüfen', 'قائمة قصيرة للمراجعة', 'Una breve lista da controllare'), text: t('Know which bottle and which shift to look at.', 'Sie wissen, welche Flasche und welche Schicht Sie prüfen.', 'اعرف أي زجاجة وأي وردية تراجع.', 'Sai quale bottiglia e quale turno guardare.') },
    ],
    more: [
      {
        title: t('Two views', 'Zwei Ansichten', 'عرضان', 'Due viste'),
        points: [
          t('Where and when: by outlet and shift, with no names.', 'Wo und wann: nach Outlet und Schicht, ohne Namen.', 'أين ومتى: حسب المنفذ والوردية، دون أسماء.', 'Dove e quando: per punto vendita e turno, senza nomi.'),
          t('Who was on, day by day: what was not billed each day, set against the rota, for example “Aisha Rahman at Lobby Lounge stands out against the rota”.', 'Wer im Dienst war, Tag für Tag: was jeden Tag nicht berechnet wurde, neben dem Dienstplan, zum Beispiel „Aisha Rahman in der Lobby Lounge fällt im Dienstplan auf“.', 'من كان في الوردية، يومًا بيوم: ما لم يُفوتر كل يوم مقارنةً بجدول المناوبات، مثل «Aisha Rahman في Lobby Lounge تبرز مقارنةً بجدول المناوبات».', 'Chi era in turno, giorno per giorno: cosa non è stato fatturato ogni giorno, accanto ai turni, per esempio «Aisha Rahman al Lobby Lounge si distingue rispetto ai turni».'),
        ],
        foot: t('Being on shift is not proof of who poured. Use it to decide who to coach first, then confirm with a count on their next shift.', 'Im Dienst zu sein ist kein Beweis dafür, wer eingeschenkt hat. Nutzen Sie es, um zu entscheiden, wen Sie zuerst schulen, und bestätigen Sie es mit einer Zählung in der nächsten Schicht.', 'التواجد في الوردية ليس دليلًا على من قام بالسكب. استخدمه لتقرر من تدرّبه أولًا، ثم تأكد بجرد في ورديته التالية.', 'Essere in turno non prova chi ha versato. Usalo per decidere chi formare per primo, poi conferma con un conteggio al turno successivo.'),
      },
      {
        title: t('What Tyll checks', 'Was Tyll prüft', 'ما يتحقق منه Tyll', 'Cosa controlla Tyll'),
        points: [
          t('Wine by the glass and spirits by the measure.', 'Wein im Glas und Spirituosen nach Maß.', 'المشروبات بالكأس وبالمعيار.', 'Vino al calice e distillati a misura.'),
          t('Missing drinks between counts.', 'Fehlende Getränke zwischen zwei Zählungen.', 'المشروبات المفقودة بين عمليتي جرد.', 'Bevande mancanti tra due conteggi.'),
          t('All patterns over the last 4 weeks.', 'Alle Muster der letzten 4 Wochen.', 'جميع الأنماط في آخر 4 أسابيع.', 'Tutti gli schemi delle ultime 4 settimane.'),
        ],
        foot: t('A gap means generous pours, glasses not rung up or breakage. Tyll never says which.', 'Eine Lücke bedeutet großzügiges Einschenken, nicht bonierte Gläser oder Bruch. Tyll sagt nie, was davon.', 'الفرق يعني سكبًا سخيًا أو كؤوسًا لم تُسجَّل أو كسرًا. ولا يحدد Tyll أبدًا أيّها.', 'Una differenza significa versamenti generosi, bicchieri non battuti o rotture. Tyll non dice mai quale.'),
      },
    ],
  },

};
