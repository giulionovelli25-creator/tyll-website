// Purchasing: three pages (round 3, 20 Nov 2026). Next 7 days, Plan the prep and Par levels are rows on Predictions; Orders and approvals and the export on Automatic ordering.
import type { Solution } from './solutions';
import pagePredictions from '../assets/photos/problem/problem-forecasting.jpg';
import pageAuto from '../assets/photos/problem/problem-stock.jpg';
import pageSuppliers from '../assets/photos/stock-chef.jpg';
import tilePredictions from '../assets/photos/forecast-produce.jpg';
import tileAuto from '../assets/photos/problem/problem-stock.jpg';
import tileSuppliers from '../assets/photos/predictions-delivery.jpg';

const t = (en: string, de: string, ar: string, it: string) => ({ en, de, ar, it });

export const purchasing: Record<'forecasting' | 'auto' | 'suppliers', Solution> = {
  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    tone: 'blue',
    mark: t('guessing', 'Raten', 'تخمّن', 'indovinando'),
    pagePhoto: pagePredictions,
    pagePhotoFocus: '50% 50%',
    proof: { kind: 'story', step: 1 },
    name: t('Predictions', 'Prognosen', 'التوقعات', 'Previsioni'),
    menu: t('Know what to order before you run out.', 'Wissen, was zu bestellen ist, bevor etwas ausgeht.', 'اعرف ماذا تطلب قبل أن ينفد.', 'Sai cosa ordinare prima di restare senza.'),
    headline: t('Still guessing what to order?', 'Raten Sie noch, was zu bestellen ist?', 'هل ما زلت تخمّن ماذا تطلب؟', 'Stai ancora indovinando cosa ordinare?'),
    intro: t('One order, built from bookings, events and what you really use.', 'Eine Bestellung, aus Buchungen, Events und Ihrem echten Verbrauch.', 'طلب واحد مبني على الحجوزات والفعاليات وما تستهلكه فعلًا.', 'Un ordine, costruito da prenotazioni, eventi e consumi reali.'),
    see: [
      { title: t('Guests, bookings and events', 'Gäste, Buchungen und Events', 'الضيوف والحجوزات والفعاليات', 'Ospiti, prenotazioni ed eventi'), text: t('The numbers every order is built from.', 'Die Zahlen, aus denen jede Bestellung entsteht.', 'الأرقام التي يُبنى عليها كل طلب.', 'I numeri da cui nasce ogni ordine.') },
      { title: t('What to order today, and to month end', 'Was heute zu bestellen ist, und bis Monatsende', 'ماذا تطلب اليوم، وحتى نهاية الشهر', 'Cosa ordinare oggi, e fino a fine mese'), text: t('With the cost today and through to month end.', 'Mit den Kosten heute und bis Monatsende.', 'مع التكلفة اليوم وحتى نهاية الشهر.', 'Con il costo di oggi e fino a fine mese.') },
      { title: t('Plan the prep', 'Die Vorbereitung planen', 'خطط للتحضير', 'Pianifica la preparazione'), text: t('Portions per dish for tomorrow, 3 days or 7 days.', 'Portionen pro Gericht für morgen, 3 oder 7 Tage.', 'الحصص لكل طبق للغد أو 3 أيام أو 7 أيام.', 'Porzioni per piatto per domani, 3 o 7 giorni.') },
    ],
    more: [
      {
        points: [
          t('Tyll’s own forecasting model works out every quantity from sales history, bookings, events, hotel occupancy and current stock. No AI chooses a quantity.', 'Tylls eigenes Prognosemodell berechnet jede Menge aus Verkaufshistorie, Buchungen, Events, Hotelauslastung und aktuellem Bestand. Keine KI wählt eine Menge.', 'يحسب نموذج التوقعات الخاص بـ Tyll كل كمية من سجل المبيعات والحجوزات والفعاليات وإشغال الفندق والمخزون الحالي. لا يختار أي ذكاء اصطناعي كمية.', 'Il modello di previsione di Tyll calcola ogni quantità da storico vendite, prenotazioni, eventi, occupazione dell’hotel e scorte attuali. Nessuna intelligenza artificiale sceglie una quantità.'),
        ],
      },
    ],
    photo: tilePredictions,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Quantities from bookings, events, occupancy and real use. No AI picks a number.', 'Mengen aus Buchungen, Events, Belegung und echtem Verbrauch. Keine KI wählt eine Zahl.', 'كميات من الحجوزات والفعاليات والإشغال والاستهلاك الفعلي. لا يختار الذكاء الاصطناعي أي رقم.', 'Quantità da prenotazioni, eventi, occupazione e consumi reali. Nessuna IA sceglie un numero.'),
      t('One order list, grouped by supplier.', 'Eine Bestellliste, nach Lieferant gruppiert.', 'قائمة طلب واحدة، مجمّعة حسب المورد.', 'Una lista d’ordine, raggruppata per fornitore.'),
      t('A prep plan per kitchen and meal.', 'Ein Vorbereitungsplan je Küche und Mahlzeit.', 'خطة تحضير لكل مطبخ ووجبة.', 'Un piano di preparazione per cucina e pasto.'),
    ],
    rows: [
      {
        id: 'next-7-days',
        icon: 'forecast',
        name: t('Next 7 days', 'Nächste 7 Tage', 'الأيام السبعة القادمة', 'Prossimi 7 giorni'),
        line: t('Expected guests, bookings and events for each day.', 'Erwartete Gäste, Buchungen und Events für jeden Tag.', 'الضيوف المتوقعون والحجوزات والفعاليات لكل يوم.', 'Ospiti attesi, prenotazioni ed eventi per ogni giorno.'),
        points: [
          t('Next 7 days: expected guests, the share already booked, occupancy, events and confidence for each day, and guests per outlet split into booked, walk-ins and events.', 'Die nächsten 7 Tage: erwartete Gäste, der bereits gebuchte Anteil, Auslastung, Events und Verlässlichkeit für jeden Tag, und Gäste je Outlet nach gebucht, Laufkundschaft und Events.', 'الأيام السبعة المقبلة: الضيوف المتوقعون ونسبة المحجوز منهم والإشغال والفعاليات ومستوى الثقة لكل يوم، والضيوف لكل منفذ مقسّمين إلى محجوزين وقادمين دون حجز وفعاليات.', 'Prossimi 7 giorni: ospiti previsti, quota già prenotata, occupazione, eventi e affidabilità per ogni giorno, e ospiti per punto vendita divisi tra prenotati, senza prenotazione ed eventi.'),
        ],
      },
      {
        id: 'prep',
        icon: 'forecast',
        name: t('Plan the prep', 'Die Vorbereitung planen', 'خطط للتحضير', 'Pianifica la preparazione'),
        line: t('Portions per dish for tomorrow, 3 days or 7 days.', 'Portionen pro Gericht für morgen, 3 oder 7 Tage.', 'الحصص لكل طبق للغد أو 3 أيام أو 7 أيام.', 'Porzioni per piatto per domani, 3 o 7 giorni.'),
        points: [
          t('Plan the prep: choose the kitchen, the period (tomorrow, 3 days or 7 days) and the meal (breakfast, lunch or dinner), and get a kitchen plan with portions per dish and a kitchen checklist.', 'Vorbereitung planen: Küche, Zeitraum (morgen, 3 oder 7 Tage) und Mahlzeit (Frühstück, Mittag- oder Abendessen) wählen und einen Küchenplan mit Portionen pro Gericht und einer Checkliste erhalten.', 'خطط للتحضير: اختر المطبخ والفترة (الغد أو 3 أيام أو 7 أيام) والوجبة (الإفطار أو الغداء أو العشاء)، واحصل على خطة للمطبخ بالحصص لكل طبق وقائمة تحقق للمطبخ.', 'Pianifica la preparazione: scegli la cucina, il periodo (domani, 3 o 7 giorni) e il pasto (colazione, pranzo o cena), e ottieni un piano di cucina con le porzioni per piatto e una checklist.'),
        ],
      },
      {
        id: 'par-levels',
        icon: 'stock',
        name: t('Par levels', 'Meldebestände', 'مستويات المخزون الدنيا والقصوى', 'Livelli di riordino'),
        line: t('A minimum and maximum per item, suggested from the prediction.', 'Ein Minimum und Maximum je Artikel, aus der Prognose vorgeschlagen.', 'حد أدنى وأقصى لكل صنف، مقترحان من التوقع.', 'Un minimo e un massimo per articolo, suggeriti dalla previsione.'),
        points: [
          t('Par levels: a minimum and maximum per item and location, with levels suggested from the prediction.', 'Meldebestände: ein Minimum und Maximum je Artikel und Lagerort, mit Vorschlägen aus der Prognose.', 'مستويات المخزون: حد أدنى وأقصى لكل صنف وموقع، مع مستويات مقترحة من التوقعات.', 'Livelli di riordino: un minimo e un massimo per articolo e luogo, con livelli suggeriti dalla previsione.'),
          t('To order: what is below its minimum, brought back to the maximum in the supplier’s packs, less what is already on order, plus top-ups for the outlets from the main store.', 'Zu bestellen: was unter dem Minimum liegt, bis zum Maximum aufgefüllt in den Gebinden des Lieferanten, abzüglich bereits Bestelltem, dazu Nachschub für die Outlets aus dem Hauptlager.', 'للطلب: ما هو دون الحد الأدنى، يُعاد إلى الحد الأقصى بعبوات المورد، بعد خصم ما هو مطلوب بالفعل، إضافة إلى تزويد المنافذ من المخزن الرئيسي.', 'Da ordinare: ciò che è sotto il minimo, riportato al massimo nelle confezioni del fornitore, meno quanto già ordinato, più i rifornimenti dei punti vendita dal magazzino principale.'),
        ],
      },
    ],
  },

  auto: {
    key: 'auto',
    icon: 'auto',
    tone: 'blue',
    mark: t('this morning', 'heute Morgen', 'هذا الصباح', 'stamattina'),
    pagePhoto: pageAuto,
    pagePhotoFocus: '60% 50%',
    name: t('Automatic ordering', 'Automatische Bestellung', 'الطلب التلقائي', 'Ordine automatico'),
    menu: t('Orders placed at 06:00, within your limits.', 'Bestellungen um 06:00, innerhalb Ihrer Limits.', 'طلبات تُرسل في 06:00 ضمن حدودك.', 'Ordini alle 06:00, entro i tuoi limiti.'),
    headline: t('What did Tyll order for me this morning?', 'Was hat Tyll heute Morgen für mich bestellt?', 'ماذا طلب Tyll لي هذا الصباح؟', 'Cosa ha ordinato Tyll per me stamattina?'),
    intro: t('Routine orders go out at 06:00. Anything above your limits waits for a manager.', 'Routinebestellungen gehen um 06:00 raus. Alles über Ihren Limits wartet auf eine Führungskraft.', 'تُرسل الطلبات الروتينية في 06:00. وما يتجاوز حدودك ينتظر المدير.', 'Gli ordini di routine partono alle 06:00. Tutto ciò che supera i tuoi limiti aspetta un responsabile.'),
    see: [
      { title: t('At 06:00, one order per supplier', 'Um 06:00 eine Bestellung pro Lieferant', 'في 06:00، طلب واحد لكل مورد', 'Alle 06:00, un ordine per fornitore'), text: t('At the quantities on Predictions, after last night’s sales and today’s bookings are in.', 'In den Mengen aus den Prognosen, nachdem die Verkäufe der letzten Nacht und die heutigen Buchungen da sind.', 'بالكميات الواردة في التوقعات، بعد وصول مبيعات الليلة الماضية وحجوزات اليوم.', 'Con le quantità delle Previsioni, dopo che sono arrivate le vendite di ieri sera e le prenotazioni di oggi.') },
      { title: t('Small orders go out, the rest wait, each with its reason', 'Kleine Bestellungen gehen raus, der Rest wartet, jede mit ihrem Grund', 'الطلبات الصغيرة تُرسل، والباقي ينتظر، كلٌّ مع سببه', 'I piccoli ordini partono, gli altri aspettano, ognuno con il suo motivo'), text: t('Each order that waits shows why, for example over the €1,500 limit.', 'Jede wartende Bestellung zeigt den Grund, zum Beispiel über dem Limit von 1.500 €.', 'يُظهر كل طلب منتظر السبب، مثل تجاوز حد €1,500.', 'Ogni ordine in attesa mostra il motivo, per esempio oltre il limite di 1.500 €.') },
      { title: t('Your approval chain', 'Ihre Freigabekette', 'سلسلة موافقاتك', 'La tua catena di approvazione'), text: t('Purchasing, accounting, the F&B director over €2,000, the general manager over €5,000. Nobody approves their own order.', 'Einkauf, Buchhaltung, die F&B-Leitung über 2.000 €, die Direktion über 5.000 €. Niemand gibt die eigene Bestellung frei.', 'المشتريات، والمحاسبة، ومدير الأغذية والمشروبات فوق €2,000، والمدير العام فوق €5,000. لا أحد يوافق على طلبه بنفسه.', 'Acquisti, contabilità, il direttore F&B oltre 2.000 €, il direttore generale oltre 5.000 €. Nessuno approva il proprio ordine.') },
    ],
    more: [
      {
        points: [
          t('An order waits if it is over the limit, an item is more than 1.5 times its last 4 weeks of use, a fresh item covers more days than it keeps, or forecast confidence is low.', 'Eine Bestellung wartet, wenn sie über dem Limit liegt, ein Artikel mehr als das 1,5-Fache seines Verbrauchs der letzten 4 Wochen ist, frische Ware mehr Tage abdeckt, als sie hält, oder die Prognose unsicher ist.', 'ينتظر الطلب إذا تجاوز الحد، أو كان صنف فيه أكثر من 1.5 ضعف استهلاكه في آخر 4 أسابيع، أو كان صنف طازج يغطي أيامًا أكثر من مدة صلاحيته، أو كانت ثقة التوقع منخفضة.', 'Un ordine attende se supera il limite, se un articolo è oltre 1,5 volte il consumo delle ultime 4 settimane, se un fresco copre più giorni di quanti si conserva o se la previsione è poco affidabile.'),
          t('Some items can be set never to be ordered automatically, for example lobster or wagyu.', 'Einzelne Artikel lassen sich von der automatischen Bestellung ausnehmen, zum Beispiel Hummer oder Wagyu.', 'يمكن استثناء بعض الأصناف من الطلب التلقائي، مثل الكركند أو الواغيو.', 'Alcuni articoli si possono escludere dall’ordine automatico, per esempio aragosta o wagyu.'),
          t('Purchasing is told about every order that waits, the storekeeper about every delivery on its way. The rules are written out on one screen so anyone can check them.', 'Der Einkauf erfährt von jeder wartenden Bestellung, das Lager von jeder Lieferung, die unterwegs ist. Die Regeln stehen auf einem Bildschirm, damit jeder sie prüfen kann.', 'يُبلَّغ قسم المشتريات بكل طلب ينتظر، وأمين المخزن بكل توريد في الطريق. والقواعد مكتوبة في شاشة واحدة ليتحقق منها أي شخص.', 'Gli acquisti sono avvisati di ogni ordine in attesa, il magazziniere di ogni consegna in arrivo. Le regole sono scritte su una sola schermata, così chiunque può controllarle.'),
        ],
      },
    ],
    photo: tileAuto,
    photoFocus: '60% 50%',
    tilePoints: [
      t('One order per supplier at 06:00.', 'Eine Bestellung pro Lieferant um 06:00.', 'طلب واحد لكل مورد في 06:00.', 'Un ordine per fornitore alle 06:00.'),
      t('Small orders go out, the rest wait for a manager.', 'Kleine Bestellungen gehen raus, der Rest wartet auf eine Führungskraft.', 'الطلبات الصغيرة تُرسل، والباقي ينتظر المدير.', 'I piccoli ordini partono, gli altri aspettano un responsabile.'),
      t('An approval chain per hotel. Nobody approves their own order.', 'Eine Freigabekette je Hotel. Niemand gibt die eigene Bestellung frei.', 'سلسلة موافقات لكل فندق. لا أحد يوافق على طلبه بنفسه.', 'Una catena di approvazione per hotel. Nessuno approva il proprio ordine.'),
    ],
    rows: [
      {
        id: 'approvals',
        icon: 'orders',
        film: 'orders',
        name: t('Orders and approvals', 'Bestellungen und Freigaben', 'الطلبات والموافقات', 'Ordini e approvazioni'),
        line: t('Every order, and who approves it.', 'Jede Bestellung, und wer sie freigibt.', 'كل طلب، ومن يوافق عليه.', 'Ogni ordine, e chi lo approva.'),
        points: [
          t('Orders go through Draft, Waiting for approval, Approved not sent, Sent, Partly received, Received and Closed.', 'Bestellungen durchlaufen Entwurf, Wartet auf Freigabe, Freigegeben nicht gesendet, Gesendet, Teilweise eingegangen, Eingegangen und Geschlossen.', 'تمر الطلبات بمراحل: مسودة، بانتظار الموافقة، معتمد ولم يُرسل، أُرسل، مستلم جزئيًا، مستلم، مغلق.', 'Gli ordini passano per Bozza, In attesa di approvazione, Approvato non inviato, Inviato, Ricevuto in parte, Ricevuto e Chiuso.'),
          t('Each hotel sets its own limits, before VAT.', 'Jedes Hotel legt seine eigenen Limits fest, ohne MwSt.', 'يحدد كل فندق حدوده الخاصة، قبل ضريبة القيمة المضافة.', 'Ogni hotel fissa i propri limiti, IVA esclusa.'),
          t('Each purchase order goes to the supplier by email with its PDF, in the supplier’s packs, with VAT and the delivery day. Orders can also be placed by hand.', 'Jede Bestellung geht per E-Mail mit PDF an den Lieferanten, in seinen Gebinden, mit Mehrwertsteuer und Liefertag. Bestellungen lassen sich auch von Hand aufgeben.', 'يُرسل كل أمر شراء إلى المورد بالبريد الإلكتروني مع ملف PDF، بعبوات المورد، مع ضريبة القيمة المضافة ويوم التسليم. ويمكن أيضًا تقديم الطلبات يدويًا.', 'Ogni ordine d’acquisto va al fornitore via email con il suo PDF, nelle confezioni del fornitore, con IVA e giorno di consegna. Si può anche ordinare a mano.'),
          t('Nobody approves an order they raised. The storekeeper receives what arrived, and only the delivered quantity is added to stock.', 'Niemand gibt eine eigene Bestellung frei. Das Lager nimmt an, was angekommen ist, und nur die gelieferte Menge kommt in den Bestand.', 'لا أحد يعتمد طلبًا أنشأه بنفسه. ويستلم أمين المخزن ما وصل، ولا تُضاف إلى المخزون إلا الكمية المسلَّمة.', 'Nessuno approva un ordine che ha creato. Il magazziniere riceve ciò che è arrivato, e solo la quantità consegnata entra nelle scorte.'),
        ],
      },
      {
        id: 'procurement-export',
        icon: 'reports',
        name: t('Export for procurement', 'Export für den Einkauf', 'التصدير للمشتريات', 'Esporta per gli acquisti'),
        line: t('Purchase orders, goods receipts and invoices, as CSV or JSON.', 'Bestellungen, Wareneingänge und Rechnungen, als CSV oder JSON.', 'أوامر الشراء وإيصالات الاستلام والفواتير، بصيغة CSV أو JSON.', 'Ordini d’acquisto, ricevimenti merce e fatture, in CSV o JSON.'),
        points: [
          t('Orders go through Draft, Waiting for approval, Approved not sent, Sent, Partly received, Received and Closed.', 'Bestellungen durchlaufen Entwurf, Wartet auf Freigabe, Freigegeben nicht gesendet, Gesendet, Teilweise eingegangen, Eingegangen und Geschlossen.', 'تمر الطلبات بمراحل: مسودة، بانتظار الموافقة، معتمد ولم يُرسل، أُرسل، مستلم جزئيًا، مستلم، مغلق.', 'Gli ordini passano per Bozza, In attesa di approvazione, Approvato non inviato, Inviato, Ricevuto in parte, Ricevuto e Chiuso.'),
        ],
      },
    ],
  },

  suppliers: {
    key: 'suppliers',
    icon: 'suppliers',
    tone: 'blue',
    mark: t('on what terms', 'zu welchen Bedingungen', 'بأي شروط', 'a quali condizioni'),
    pagePhoto: pageSuppliers,
    pagePhotoFocus: '50% 40%',
    name: t('Suppliers', 'Lieferanten', 'المورّدون', 'Fornitori'),
    menu: t('Every supplier, with terms and prices.', 'Jeder Lieferant, mit Konditionen und Preisen.', 'كل مورد، مع الشروط والأسعار.', 'Ogni fornitore, con condizioni e prezzi.'),
    headline: t('Who do we buy from, and on what terms?', 'Bei wem kaufen wir ein, und zu welchen Bedingungen?', 'ممن نشتري، وبأي شروط؟', 'Da chi acquistiamo, e a quali condizioni?'),
    intro: t('Every supplier, catalogue and agreed price in one place.', 'Jeder Lieferant, Katalog und vereinbarte Preis an einem Ort.', 'كل مورد وكتالوج وسعر متفق عليه في مكان واحد.', 'Ogni fornitore, catalogo e prezzo concordato in un unico posto.'),
    see: [
      { title: t('Delivery days, cut-off, minimum order and payment terms', 'Liefertage, Bestellschluss, Mindestbestellwert und Zahlungsbedingungen', 'أيام التوريد وموعد الإغلاق والحد الأدنى للطلب وشروط الدفع', 'Giorni di consegna, orario limite, ordine minimo e condizioni di pagamento'), text: t('For every supplier, in one list.', 'Für jeden Lieferanten, in einer Liste.', 'لكل مورد، في قائمة واحدة.', 'Per ogni fornitore, in un’unica lista.') },
      { title: t('A catalogue with a second supplier for most items', 'Ein Katalog mit einem zweiten Lieferanten für die meisten Artikel', 'كتالوج مع مورد ثانٍ لمعظم الأصناف', 'Un catalogo con un secondo fornitore per la maggior parte degli articoli'), text: t('With the prices you agreed.', 'Mit den Preisen, die Sie vereinbart haben.', 'بالأسعار التي اتفقت عليها.', 'Con i prezzi che hai concordato.') },
      { title: t('Invoices above the agreed price, flagged', 'Rechnungen über dem vereinbarten Preis, markiert', 'الفواتير فوق السعر المتفق عليه، مُعلَّمة', 'Fatture sopra il prezzo concordato, segnalate'), text: t('Tyll flags invoices above the agreed price.', 'Tyll markiert Rechnungen über dem vereinbarten Preis.', 'يشير Tyll إلى الفواتير التي تتجاوز السعر المتفق عليه.', 'Tyll segnala le fatture sopra il prezzo concordato.') },
    ],
    more: [
      {
        points: [
          t('Every supplier with contact, delivery days, lead time, order cut-off, minimum order and payment terms.', 'Jeder Lieferant mit Kontakt, Liefertagen, Vorlaufzeit, Bestellschluss, Mindestbestellwert und Zahlungsbedingungen.', 'كل مورد مع جهة الاتصال وأيام التوريد ومدة التجهيز وموعد إغلاق الطلبات والحد الأدنى للطلب وشروط الدفع.', 'Ogni fornitore con contatto, giorni di consegna, tempi di consegna, orario limite per gli ordini, ordine minimo e condizioni di pagamento.'),
          t('A catalogue per supplier with agreed prices, and a second supplier for most items. Tyll flags when the last invoice is above the agreed contract price.', 'Ein Katalog je Lieferant mit vereinbarten Preisen und einem zweiten Lieferanten für die meisten Artikel. Tyll markiert, wenn die letzte Rechnung über dem vereinbarten Vertragspreis liegt.', 'كتالوج لكل مورد بالأسعار المتفق عليها، ومورد ثانٍ لمعظم الأصناف. ويشير Tyll إلى آخر فاتورة تتجاوز سعر العقد المتفق عليه.', 'Un catalogo per fornitore con i prezzi concordati, e un secondo fornitore per la maggior parte degli articoli. Tyll segnala quando l’ultima fattura supera il prezzo di contratto.'),
          t('Suppliers are kept per hotel, so the same company can deliver to two hotels on different days, terms and prices.', 'Lieferanten werden je Hotel geführt, so kann dieselbe Firma zwei Hotels an verschiedenen Tagen, zu anderen Konditionen und Preisen beliefern.', 'يُحفظ الموردون لكل فندق، فيمكن لنفس الشركة أن تورّد لفندقين في أيام وبشروط وأسعار مختلفة.', 'I fornitori sono tenuti per hotel, così la stessa azienda può servire due hotel in giorni, condizioni e prezzi diversi.'),
          t('What you bought from each supplier in the last 30 days, and their open orders.', 'Was Sie in den letzten 30 Tagen bei jedem Lieferanten gekauft haben, und seine offenen Bestellungen.', 'ما اشتريته من كل مورد في آخر 30 يومًا، وطلباته المفتوحة.', 'Quanto hai acquistato da ogni fornitore negli ultimi 30 giorni, e i suoi ordini aperti.'),
        ],
      },
    ],
    photo: tileSuppliers,
    photoFocus: '50% 40%',
    tilePoints: [
      t('Delivery days, cut-off, minimum order and payment terms.', 'Liefertage, Bestellschluss, Mindestbestellwert und Zahlungsbedingungen.', 'أيام التوريد وموعد الإغلاق والحد الأدنى للطلب وشروط الدفع.', 'Giorni di consegna, orario limite, ordine minimo e condizioni di pagamento.'),
      t('A catalogue with a second supplier for most items.', 'Ein Katalog mit einem zweiten Lieferanten für die meisten Artikel.', 'كتالوج مع مورد ثانٍ لمعظم الأصناف.', 'Un catalogo con un secondo fornitore per la maggior parte degli articoli.'),
      t('Invoices above the agreed price, flagged.', 'Rechnungen über dem vereinbarten Preis, markiert.', 'الفواتير فوق السعر المتفق عليه، مُعلَّمة.', 'Fatture sopra il prezzo concordato, segnalate.'),
    ],
  },
};
