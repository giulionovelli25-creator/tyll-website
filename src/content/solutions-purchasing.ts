// Purchasing (round 4, 24 Nov 2026): Predictions, Automatic ordering and Deliveries and invoices, as in the demo.
// Every feature is a row with its own clip (public/media/film/<lang>/<key>-<row>-{desk,phone}.mp4).
import type { Solution } from './solutions';
import pagePredictions from '../assets/photos/problem/problem-forecasting.jpg';
import pageAuto from '../assets/photos/problem/problem-stock.jpg';
import pageDeliveries from '../assets/photos/predictions-delivery.jpg';
import tilePredictions from '../assets/photos/forecast-produce.jpg';
import tileAuto from '../assets/photos/problem/problem-stock.jpg';
import tileDeliveries from '../assets/photos/tyll-problem-1.jpg';

const t = (en: string, de: string, ar: string, it: string) => ({ en, de, ar, it });

export const purchasing: Record<'forecasting' | 'auto' | 'deliveries', Solution> = {
  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    tone: 'blue',
    mark: t('guessing', 'Raten', 'تخمّن', 'indovinando'),
    pagePhoto: pagePredictions,
    pagePhotoFocus: '50% 50%',
    proof: { kind: 'story', step: 1 },
    name: t('Predictions', 'Prognosen', 'التوقعات', 'Previsioni'),
    menu: t('Know what to order before you run out.', 'Wissen, was zu bestellen ist, bevor es ausgeht.', 'اعرف ما تطلبه قبل أن ينفد.', 'Sai cosa ordinare prima di restare senza.'),
    headline: t('Still guessing what to order?', 'Raten Sie noch, was zu bestellen ist?', 'هل ما زلت تخمّن ما تطلبه؟', 'Stai ancora indovinando cosa ordinare?'),
    intro: t('One order, built from bookings, events and what you really use.', 'Eine Bestellung, berechnet aus Reservierungen, Events und Ihrem echten Verbrauch.', 'طلب واحد، مبني على الحجوزات والفعاليات وما تستخدمه فعلًا.', 'Un solo ordine, costruito da prenotazioni, eventi e consumi reali.'),
    see: [
      { title: t('What to order, and by when', 'Was zu bestellen ist, und bis wann', 'ماذا تطلب، ومتى', 'Cosa ordinare, ed entro quando'), text: t('Each item with its order-by date and cost, grouped by supplier.', 'Jeder Artikel mit Bestellfrist und Kosten, nach Lieferant gruppiert.', 'كل صنف مع آخر موعد لطلبه وتكلفته، مجمّعة حسب المورّد.', 'Ogni articolo con la data entro cui ordinarlo e il costo, per fornitore.') },
      { title: t('Stock used, then predicted', 'Verbrauch, dann Prognose', 'الاستهلاك، ثم التوقع', 'Consumo, poi previsione'), text: t('The last 30 days, then predicted use to month end.', 'Die letzten 30 Tage, dann der erwartete Verbrauch bis Monatsende.', 'آخر 30 يومًا، ثم الاستهلاك المتوقع حتى نهاية الشهر.', 'Gli ultimi 30 giorni, poi il consumo previsto fino a fine mese.') },
      { title: t('Deliveries at risk', 'Lieferungen mit Risiko', 'توصيلات معرضة للتأخير', 'Consegne a rischio'), text: t('A supplier likely to be late, and what runs short before lunch.', 'Ein Lieferant, der wohl zu spät kommt, und was vor dem Mittag knapp wird.', 'مورّد يُرجّح تأخره، وما ينقص قبل الغداء.', 'Un fornitore probabilmente in ritardo, e cosa manca prima di pranzo.') },
    ],
    more: [
      {
        points: [
          t('Tyll’s own forecasting model works out every quantity from sales history, bookings, events, hotel occupancy and current stock. No AI chooses a quantity.', 'Tylls eigenes Prognosemodell berechnet jede Menge aus Verkaufshistorie, Reservierungen, Events, Hotelbelegung und aktuellem Bestand. Keine KI wählt eine Menge.', 'يحسب نموذج التوقعات الخاص بـ Tyll كل كمية من سجل المبيعات والحجوزات والفعاليات وإشغال الفندق والمخزون الحالي. لا يختار الذكاء الاصطناعي أي كمية.', 'Il modello di previsione di Tyll calcola ogni quantità da storico vendite, prenotazioni, eventi, occupazione dell’hotel e scorte attuali. Nessuna IA sceglie una quantità.'),
          t('For example, a supplier late on 7 of the last 10 Wednesdays becomes the alert “Wagyu beef mince short before lunch tomorrow”, with two actions: order from the backup supplier, or call the supplier.', 'Zum Beispiel wird ein Lieferant, der an 7 der letzten 10 Mittwoche zu spät kam, zum Hinweis „Wagyu-Hackfleisch vor dem Mittagessen morgen knapp“, mit zwei Aktionen: beim Ersatzlieferanten bestellen oder den Lieferanten anrufen.', 'مثلًا، مورّد تأخر في 7 من آخر 10 أيام أربعاء يصبح تنبيه «لحم واغيو المفروم ينقص قبل غداء الغد»، مع إجراءين: الطلب من المورّد البديل، أو الاتصال بالمورّد.', 'Per esempio, un fornitore in ritardo 7 degli ultimi 10 mercoledì diventa l’avviso “Carne macinata di wagyu insufficiente prima del pranzo di domani”, con due azioni: ordinare dal fornitore di riserva o chiamare il fornitore.'),
        ],
      },
    ],
    photo: tilePredictions,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Quantities from bookings, events, occupancy and real use. No AI picks a number.', 'Mengen aus Reservierungen, Events, Belegung und echtem Verbrauch. Keine KI wählt eine Zahl.', 'كميات من الحجوزات والفعاليات والإشغال والاستهلاك الفعلي. لا يختار الذكاء الاصطناعي أي رقم.', 'Quantità da prenotazioni, eventi, occupazione e consumi reali. Nessuna IA sceglie un numero.'),
      t('Par levels and top-ups for every outlet.', 'Meldebestände und Auffüllungen für jedes Outlet.', 'مستويات المخزون وتزويد كل منفذ.', 'Livelli di riordino e rifornimenti per ogni punto vendita.'),
      t('Deliveries at risk, before they run you short.', 'Lieferungen mit Risiko, bevor etwas fehlt.', 'التوصيلات المعرضة للتأخير، قبل أن ينقصك شيء.', 'Consegne a rischio, prima che ti manchi qualcosa.'),
    ],
    rows: [
      {
        id: 'to-order',
        icon: 'stock',
        film: 'forecasting-to-order',
        name: t('To order and par levels', 'Zu bestellen und Meldebestände', 'ما يجب طلبه ومستويات المخزون', 'Da ordinare e livelli di riordino'),
        line: t('A minimum and maximum per item, and what to order to get back there.', 'Ein Minimum und Maximum pro Artikel, und was zu bestellen ist, um dorthin zurückzukommen.', 'حد أدنى وأقصى لكل صنف، وما يجب طلبه للعودة إليه.', 'Un minimo e un massimo per articolo, e cosa ordinare per tornarci.'),
        points: [
          t('Par levels per item and location, with a starting level suggested from the prediction.', 'Meldebestände pro Artikel und Lagerort, mit einem aus der Prognose vorgeschlagenen Ausgangsniveau.', 'مستويات المخزون لكل صنف وموقع، مع مستوى ابتدائي مقترح من التوقع.', 'Livelli di riordino per articolo e luogo, con un livello iniziale suggerito dalla previsione.'),
          t('To order: what is below its minimum, brought back to the maximum in the supplier’s packs, less what is already on order.', 'Zu bestellen: was unter dem Minimum liegt, aufgefüllt bis zum Maximum in den Gebinden des Lieferanten, abzüglich dessen, was schon bestellt ist.', 'ما يجب طلبه: ما هو دون حده الأدنى، يُعاد إلى الحد الأقصى بعبوات المورّد، مطروحًا منه ما طُلب بالفعل.', 'Da ordinare: ciò che è sotto il minimo, riportato al massimo nelle confezioni del fornitore, meno quanto già ordinato.'),
        ],
      },
      {
        id: 'top-ups',
        icon: 'orders',
        film: 'forecasting-top-ups',
        name: t('Outlet top-ups', 'Auffüllungen der Outlets', 'تزويد المنافذ', 'Rifornimenti dei punti vendita'),
        line: t('Each outlet topped up from the main store.', 'Jedes Outlet aus dem Hauptlager aufgefüllt.', 'كل منفذ يُزوَّد من المخزن الرئيسي.', 'Ogni punto vendita rifornito dal magazzino centrale.'),
        points: [
          t('Outlet stock against each outlet’s own par level, from the last count at close.', 'Der Bestand im Outlet gegen seinen eigenen Meldebestand, aus der letzten Zählung bei Schichtende.', 'مخزون المنفذ مقابل مستواه الخاص، من آخر عدّ عند الإغلاق.', 'Le scorte del punto vendita contro il suo livello di riordino, dall’ultimo conteggio a fine servizio.'),
          t('The top-up comes from the main store, and the outlet is charged for it.', 'Die Auffüllung kommt aus dem Hauptlager, und das Outlet wird dafür belastet.', 'يأتي التزويد من المخزن الرئيسي، ويُحمَّل المنفذ تكلفته.', 'Il rifornimento arriva dal magazzino centrale, e il punto vendita lo paga.'),
        ],
      },
      {
        id: 'prep',
        icon: 'forecast',
        film: 'forecasting-prep',
        name: t('Plan the prep', 'Die Vorbereitung planen', 'خطط للتحضير', 'Pianifica la preparazione'),
        line: t('Portions per dish for tomorrow, 3 days or 7 days.', 'Portionen pro Gericht für morgen, 3 oder 7 Tage.', 'الحصص لكل طبق للغد أو 3 أيام أو 7 أيام.', 'Porzioni per piatto per domani, 3 o 7 giorni.'),
        points: [
          t('Choose the kitchen, the period and the meal (breakfast, lunch or dinner), and get portions per dish with a kitchen checklist.', 'Küche, Zeitraum und Mahlzeit (Frühstück, Mittag- oder Abendessen) wählen, und Sie erhalten Portionen pro Gericht mit einer Küchen-Checkliste.', 'اختر المطبخ والفترة والوجبة (فطور أو غداء أو عشاء)، واحصل على الحصص لكل طبق مع قائمة تحقق للمطبخ.', 'Scegli la cucina, il periodo e il pasto (colazione, pranzo o cena) e ottieni le porzioni per piatto con una checklist di cucina.'),
        ],
      },
      {
        id: 'next-7-days',
        icon: 'forecast',
        film: 'forecasting-next-7-days',
        name: t('Next 7 days', 'Nächste 7 Tage', 'الأيام السبعة القادمة', 'Prossimi 7 giorni'),
        line: t('Expected guests, bookings and events for each day.', 'Erwartete Gäste, Reservierungen und Events für jeden Tag.', 'الضيوف المتوقعون والحجوزات والفعاليات لكل يوم.', 'Ospiti attesi, prenotazioni ed eventi per ogni giorno.'),
        points: [
          t('Expected guests, the share already booked, occupancy, events and confidence for each day.', 'Erwartete Gäste, der schon reservierte Anteil, Belegung, Events und Sicherheit der Prognose für jeden Tag.', 'الضيوف المتوقعون، والنسبة المحجوزة بالفعل، والإشغال، والفعاليات، ودرجة الثقة لكل يوم.', 'Ospiti attesi, la quota già prenotata, occupazione, eventi e affidabilità per ogni giorno.'),
          t('Guests per outlet, split into booked, walk-ins and events.', 'Gäste pro Outlet, aufgeteilt in Reservierungen, Laufkundschaft und Events.', 'الضيوف لكل منفذ، مقسّمين إلى حجوزات وزوار دون حجز وفعاليات.', 'Ospiti per punto vendita, divisi tra prenotati, clienti di passaggio ed eventi.'),
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
    name: t('Automatic ordering', 'Automatische Bestellung', 'الطلب التلقائي', 'Ordini automatici'),
    menu: t('Orders sent at 06:00, within your limits.', 'Bestellungen um 06:00 gesendet, in Ihren Grenzen.', 'طلبات تُرسل الساعة 06:00، ضمن حدودك.', 'Ordini inviati alle 06:00, entro i tuoi limiti.'),
    headline: t('What did Tyll order for me this morning?', 'Was hat Tyll heute Morgen für mich bestellt?', 'ماذا طلب Tyll لي هذا الصباح؟', 'Cosa ha ordinato Tyll per me stamattina?'),
    intro: t('Routine orders go out at 06:00. Anything above your limits waits for a manager.', 'Routinebestellungen gehen um 06:00 raus. Alles über Ihren Grenzen wartet auf eine Führungskraft.', 'تُرسل الطلبات الروتينية الساعة 06:00. وما يتجاوز حدودك ينتظر المدير.', 'Gli ordini di routine partono alle 06:00. Tutto ciò che supera i tuoi limiti aspetta un responsabile.'),
    see: [
      { title: t('At 06:00, one order per supplier', 'Um 06:00 eine Bestellung pro Lieferant', 'الساعة 06:00، طلب واحد لكل مورّد', 'Alle 06:00, un ordine per fornitore'), text: t('Small orders go out. The rest wait, each with its reason.', 'Kleine Bestellungen gehen raus. Der Rest wartet, jede mit ihrem Grund.', 'تُرسل الطلبات الصغيرة. والباقي ينتظر، ولكل منها سببه.', 'Gli ordini piccoli partono. Gli altri aspettano, ognuno con il suo motivo.') },
      { title: t('The rules, on one screen', 'Die Regeln, auf einem Bildschirm', 'القواعد، على شاشة واحدة', 'Le regole, in una schermata'), text: t('For example, orders up to €1,500 go without approval.', 'Zum Beispiel gehen Bestellungen bis 1.500 € ohne Freigabe raus.', 'مثلًا، تُرسل الطلبات حتى 1,500 يورو دون موافقة.', 'Per esempio, gli ordini fino a 1.500 € partono senza approvazione.') },
      { title: t('Order sent on WhatsApp', 'Bestellung per WhatsApp gesendet', 'أُرسل الطلب عبر واتساب', 'Ordine inviato su WhatsApp'), text: t('The supplier’s reply becomes changes to apply, or not.', 'Die Antwort des Lieferanten wird zu Änderungen, die Sie übernehmen oder nicht.', 'رد المورّد يصبح تغييرات تطبّقها أو لا.', 'La risposta del fornitore diventa modifiche da applicare, o no.') },
    ],
    more: [
      {
        points: [
          t('An order waits if it is over the limit, an item is more than 1.5 times its last 4 weeks of use, a fresh item covers more days than it keeps, or forecast confidence is low.', 'Eine Bestellung wartet, wenn sie über der Grenze liegt, ein Artikel mehr als das 1,5-Fache der letzten 4 Wochen ist, frische Ware länger reicht als sie hält, oder die Prognose unsicher ist.', 'ينتظر الطلب إذا تجاوز الحد، أو كان صنف أكثر من 1.5 مرة من استهلاك آخر 4 أسابيع، أو غطّى صنف طازج أيامًا أكثر مما يدوم، أو كانت الثقة في التوقع منخفضة.', 'Un ordine aspetta se supera il limite, se un articolo è oltre 1,5 volte il consumo delle ultime 4 settimane, se un prodotto fresco copre più giorni di quanti si conserva, o se la previsione è incerta.'),
          t('Some items can be set never to be ordered automatically, for example lobster or wagyu.', 'Manche Artikel lassen sich von der automatischen Bestellung ausnehmen, zum Beispiel Hummer oder Wagyu.', 'يمكن ضبط بعض الأصناف ألا تُطلب تلقائيًا أبدًا، مثل الكركند أو الواغيو.', 'Alcuni articoli si possono escludere dall’ordine automatico, per esempio aragosta o wagyu.'),
          t('Purchasing is told about every order that waits, the storekeeper about every delivery on its way.', 'Der Einkauf erfährt von jeder wartenden Bestellung, der Lagerist von jeder Lieferung unterwegs.', 'تُبلَّغ المشتريات بكل طلب ينتظر، وأمين المخزن بكل توريد في الطريق.', 'Gli acquisti sono avvisati di ogni ordine in attesa, il magazziniere di ogni consegna in arrivo.'),
        ],
      },
    ],
    photo: tileAuto,
    photoFocus: '60% 50%',
    tilePoints: [
      t('One order per supplier at 06:00.', 'Eine Bestellung pro Lieferant um 06:00.', 'طلب واحد لكل مورّد الساعة 06:00.', 'Un ordine per fornitore alle 06:00.'),
      t('Sent by email or WhatsApp, within your limits.', 'Per E-Mail oder WhatsApp gesendet, in Ihren Grenzen.', 'يُرسل بالبريد الإلكتروني أو واتساب، ضمن حدودك.', 'Inviato per email o WhatsApp, entro i tuoi limiti.'),
      t('Supplier replies read into proposed changes.', 'Antworten der Lieferanten als vorgeschlagene Änderungen gelesen.', 'ردود المورّدين تُقرأ كتغييرات مقترحة.', 'Le risposte dei fornitori lette come modifiche proposte.'),
    ],
    rows: [
      {
        id: 'approvals',
        icon: 'orders',
        film: 'auto-approvals',
        name: t('Orders and approvals', 'Bestellungen und Freigaben', 'الطلبات والموافقات', 'Ordini e approvazioni'),
        line: t('Every order, and who approves it.', 'Jede Bestellung, und wer sie freigibt.', 'كل طلب، ومن يوافق عليه.', 'Ogni ordine, e chi lo approva.'),
        points: [
          t('Orders go through Draft, Waiting for approval, Approved not sent, Sent, Supplier reply, Needs a person, Late, Partly received, Received and Closed.', 'Bestellungen durchlaufen Entwurf, Wartet auf Freigabe, Freigegeben nicht gesendet, Gesendet, Antwort des Lieferanten, Braucht eine Person, Verspätet, Teilweise erhalten, Erhalten und Abgeschlossen.', 'تمر الطلبات بمراحل: مسودة، بانتظار الموافقة، موافق عليه لم يُرسل، مُرسل، رد المورد، يحتاج إلى شخص، متأخر، مستلم جزئيًا، مستلم، مغلق.', 'Gli ordini passano per Bozza, In attesa di approvazione, Approvato non inviato, Inviato, Risposta del fornitore, Serve una persona, In ritardo, Ricevuto in parte, Ricevuto e Chiuso.'),
          t('Each hotel sets its own limits, before VAT. For example the F&B director signs over €2,000 and the general manager over €5,000.', 'Jedes Hotel legt eigene Grenzen fest, netto. Zum Beispiel zeichnet der F&B-Direktor über 2.000 € und der General Manager über 5.000 €.', 'يضع كل فندق حدوده، قبل ضريبة القيمة المضافة. مثلًا يوقّع مدير الأغذية والمشروبات فوق 2,000 يورو والمدير العام فوق 5,000 يورو.', 'Ogni hotel fissa i propri limiti, IVA esclusa. Per esempio il direttore F&B firma oltre 2.000 € e il direttore generale oltre 5.000 €.'),
          t('Nobody approves an order they raised. The storekeeper receives what arrived, and only the delivered quantity is added to stock.', 'Niemand gibt eine eigene Bestellung frei. Der Lagerist nimmt an, was ankam, und nur die gelieferte Menge kommt in den Bestand.', 'لا أحد يوافق على طلب أنشأه. يستلم أمين المخزن ما وصل، ولا يُضاف إلى المخزون إلا الكمية المسلّمة.', 'Nessuno approva un ordine che ha creato. Il magazziniere riceve ciò che è arrivato, e solo la quantità consegnata entra in magazzino.'),
        ],
      },
      {
        id: 'channels',
        icon: 'deliveries',
        film: 'auto-channels',
        name: t('Each supplier’s channel', 'Der Kanal jedes Lieferanten', 'قناة كل مورّد', 'Il canale di ogni fornitore'),
        line: t('Email, WhatsApp or the supplier’s ordering system.', 'E-Mail, WhatsApp oder das Bestellsystem des Lieferanten.', 'البريد الإلكتروني أو واتساب أو نظام طلبات المورّد.', 'Email, WhatsApp o il sistema ordini del fornitore.'),
        points: [
          t('Each order goes out the way its supplier takes orders: email or WhatsApp with the PDF, or the supplier’s ordering system.', 'Jede Bestellung geht so raus, wie der Lieferant Bestellungen annimmt: per E-Mail oder WhatsApp mit dem PDF, oder über sein Bestellsystem.', 'يُرسل كل طلب بالطريقة التي يستقبل بها المورّد الطلبات: بالبريد الإلكتروني أو واتساب مع ملف PDF، أو عبر نظام طلباته.', 'Ogni ordine parte come il fornitore riceve gli ordini: email o WhatsApp con il PDF, o il suo sistema ordini.'),
          t('Orders are sent automatically once fully approved. This is a setting. Suppliers who take orders by phone wait for purchasing to call.', 'Bestellungen gehen nach vollständiger Freigabe automatisch raus. Das ist eine Einstellung. Lieferanten, die telefonisch bestellen lassen, warten auf den Anruf des Einkaufs.', 'تُرسل الطلبات تلقائيًا بعد اكتمال الموافقات، وهذا إعداد قابل للتغيير. والمورّدون الذين يستقبلون الطلبات هاتفيًا ينتظرون اتصال المشتريات.', 'Gli ordini partono in automatico a piena approvazione. È un’impostazione. I fornitori che ordinano per telefono aspettano la chiamata degli acquisti.'),
        ],
      },
      {
        id: 'replies',
        icon: 'suppliers',
        film: 'auto-replies',
        name: t('WhatsApp replies read', 'WhatsApp-Antworten gelesen', 'قراءة ردود واتساب', 'Risposte WhatsApp lette'),
        line: t('A supplier’s reply becomes proposed changes to the order.', 'Die Antwort eines Lieferanten wird zu vorgeschlagenen Änderungen der Bestellung.', 'رد المورّد يصبح تغييرات مقترحة على الطلب.', 'La risposta di un fornitore diventa modifiche proposte all’ordine.'),
        points: [
          t('“Only 8 kg salmon tomorrow, price now €38.50/kg” becomes two proposed changes. Apply each one, or keep the order as it is.', '„Morgen nur 8 kg Lachs, Preis jetzt 38,50 €/kg“ wird zu zwei vorgeschlagenen Änderungen. Jede übernehmen oder die Bestellung lassen, wie sie ist.', '«فقط 8 كغ سلمون غدًا، السعر الآن 38.50 يورو للكيلو» يصبح تغييرين مقترحين. طبّق كلًا منهما، أو أبقِ الطلب كما هو.', '“Solo 8 kg di salmone domani, prezzo ora 38,50 €/kg” diventa due modifiche proposte. Applicale una per una, o lascia l’ordine com’è.'),
          t('Fixed rules, no AI, in English, Portuguese and Arabic. A reply it can’t read needs a person.', 'Feste Regeln, keine KI, auf Englisch, Portugiesisch und Arabisch. Eine Antwort, die es nicht lesen kann, braucht eine Person.', 'قواعد ثابتة، دون ذكاء اصطناعي، بالإنجليزية والبرتغالية والعربية. والرد الذي لا يمكن قراءته يحتاج إلى شخص.', 'Regole fisse, nessuna IA, in inglese, portoghese e arabo. Una risposta che non sa leggere richiede una persona.'),
          t('In the demo the replies are simulated. A live version needs the WhatsApp Business API.', 'In der Demo sind die Antworten simuliert. Eine echte Anbindung braucht die WhatsApp Business API.', 'في العرض التجريبي الردود محاكاة. والنسخة الفعلية تحتاج إلى WhatsApp Business API.', 'Nella demo le risposte sono simulate. Una versione reale richiede la WhatsApp Business API.'),
        ],
      },
      {
        id: 'procurement-export',
        icon: 'reports',
        film: 'auto-export',
        name: t('Procurement export', 'Beschaffungsexport', 'تصدير المشتريات', 'Esportazione acquisti'),
        line: t('Purchase orders, goods receipts and invoices, as CSV or JSON.', 'Bestellungen, Wareneingänge und Rechnungen, als CSV oder JSON.', 'أوامر الشراء وإيصالات الاستلام والفواتير، بصيغة CSV أو JSON.', 'Ordini, ricevimenti merce e fatture, in CSV o JSON.'),
        points: [
          t('For the group’s procurement or accounting system, one record per document with its lines.', 'Für das Einkaufs- oder Buchhaltungssystem der Gruppe, ein Datensatz pro Beleg mit seinen Positionen.', 'لنظام المشتريات أو المحاسبة في المجموعة، سجل واحد لكل مستند مع بنوده.', 'Per il sistema acquisti o contabile del gruppo, un record per documento con le sue righe.'),
        ],
      },
    ],
  },

  deliveries: {
    key: 'deliveries',
    icon: 'deliveries',
    tone: 'blue',
    mark: t('never received', 'nie ankam', 'لم تستلمها', 'mai ricevuta'),
    pagePhoto: pageDeliveries,
    pagePhotoFocus: '55% 40%',
    name: t('Deliveries and invoices', 'Lieferungen und Rechnungen', 'التوصيلات والفواتير', 'Consegne e fatture'),
    menu: t('Pay only for what arrived.', 'Nur zahlen, was ankam.', 'ادفع فقط ثمن ما وصل.', 'Paga solo ciò che è arrivato.'),
    headline: t('Are you paying for things you never received?', 'Zahlen Sie für Ware, die nie ankam?', 'هل تدفع ثمن أشياء لم تستلمها؟', 'Stai pagando merce mai ricevuta?'),
    intro: t('Photograph the delivery note. Tyll finds any difference and asks the supplier for the money.', 'Lieferschein fotografieren. Tyll findet jede Abweichung und fordert das Geld beim Lieferanten an.', 'صوّر إشعار التسليم. يجد Tyll أي فرق ويطلب المال من المورّد.', 'Fotografa la bolla. Tyll trova ogni differenza e chiede i soldi al fornitore.'),
    see: [
      { title: t('Delivery note', 'Lieferschein', 'إشعار التسليم', 'Bolla di consegna'), text: t('Photograph the note. Tyll sets it against the order.', 'Lieferschein fotografieren. Tyll legt ihn neben die Bestellung.', 'صوّر الإشعار. يقارنه Tyll بالطلب.', 'Fotografa la bolla. Tyll la confronta con l’ordine.') },
      { title: t('Receiving photos', 'Fotos beim Wareneingang', 'صور الاستلام', 'Foto al ricevimento'), text: t('A scale, damage or label photo on any line, then confirm.', 'Ein Waagen-, Schadens- oder Etikettenfoto an jeder Position, dann bestätigen.', 'صورة للميزان أو التلف أو الملصق على أي بند، ثم التأكيد.', 'Una foto di bilancia, danno o etichetta su qualsiasi riga, poi conferma.') },
      { title: t('Credit requests', 'Gutschriftsanfragen', 'طلبات الإشعار الدائن', 'Richieste di nota di credito'), text: t('Sent with their photos, chased and recorded.', 'Mit ihren Fotos gesendet, nachverfolgt und festgehalten.', 'تُرسل مع صورها، وتُتابَع وتُسجَّل.', 'Inviate con le loro foto, sollecitate e registrate.') },
    ],
    more: [
      {
        points: [
          t('Every delivery checked three ways: ordered, delivered and invoiced, with the difference in units and money.', 'Jede Lieferung dreifach geprüft: bestellt, geliefert und berechnet, mit der Abweichung in Einheiten und Geld.', 'كل توريد يُفحص بثلاث طرق: المطلوب والمسلَّم والمفوتر، مع الفرق بالوحدات والمال.', 'Ogni consegna controllata in tre modi: ordinato, consegnato e fatturato, con la differenza in unità e denaro.'),
          t('Stock counts what was delivered, not what was invoiced.', 'Der Bestand zählt, was geliefert wurde, nicht was berechnet wurde.', 'يحسب المخزون ما سُلّم، لا ما فُوتر.', 'Le scorte contano ciò che è stato consegnato, non ciò che è stato fatturato.'),
        ],
      },
    ],
    photo: tileDeliveries,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Every delivery against the order.', 'Jede Lieferung gegen die Bestellung.', 'كل توريد مقابل الطلب.', 'Ogni consegna contro l’ordine.'),
      t('Photos of the scale, damage or label as proof.', 'Fotos von Waage, Schaden oder Etikett als Nachweis.', 'صور الميزان أو التلف أو الملصق دليلًا.', 'Foto di bilancia, danno o etichetta come prova.'),
      t('Credit requests sent and chased.', 'Gutschriftsanfragen gesendet und nachverfolgt.', 'طلبات إشعار دائن تُرسل وتُتابَع.', 'Richieste di nota di credito inviate e sollecitate.'),
    ],
    rows: [
      {
        id: 'short-weight',
        icon: 'stock',
        film: 'deliveries-short-weight',
        name: t('Short weight', 'Untergewicht', 'نقص في الوزن', 'Peso inferiore'),
        line: t('More than 2% under the delivery note.', 'Mehr als 2 % unter dem Lieferschein.', 'أقل من إشعار التسليم بأكثر من 2%.', 'Oltre il 2% sotto la bolla.'),
        points: [
          t('When the receiving scale shows more than 2% less than the delivery note, the line becomes a short weight difference with a credit request. Smaller gaps are ordinary variation.', 'Zeigt die Wareneingangswaage mehr als 2 % weniger als der Lieferschein, wird die Position zur Abweichung Untergewicht mit Gutschriftsanfrage. Kleinere Abweichungen sind normale Schwankung.', 'عندما يُظهر ميزان الاستلام أقل من إشعار التسليم بأكثر من 2%، يصبح البند فرق نقص في الوزن مع طلب إشعار دائن. والفروق الأصغر تباين عادي.', 'Quando la bilancia al ricevimento mostra oltre il 2% in meno della bolla, la riga diventa una differenza di peso inferiore con richiesta di nota di credito. Scarti minori sono variazione normale.'),
        ],
      },
      {
        id: 'credits',
        icon: 'cases',
        film: 'deliveries-credits',
        name: t('Credit requests', 'Gutschriftsanfragen', 'طلبات الإشعار الدائن', 'Richieste di nota di credito'),
        line: t('Money suppliers owe back, asked for and chased.', 'Geld, das Lieferanten schulden, angefordert und nachverfolgt.', 'المال المستحق على المورّدين، يُطلب ويُتابَع.', 'Il denaro che i fornitori devono restituire, chiesto e sollecitato.'),
        points: [
          t('Tyll sends the credit request by email or WhatsApp, with its photos, and sends reminders until there is an answer.', 'Tyll sendet die Gutschriftsanfrage per E-Mail oder WhatsApp, mit ihren Fotos, und erinnert, bis eine Antwort da ist.', 'يرسل Tyll طلب الإشعار الدائن بالبريد الإلكتروني أو واتساب مع صوره، ويرسل تذكيرات حتى يصل رد.', 'Tyll invia la richiesta di nota di credito per email o WhatsApp, con le foto, e manda promemoria finché non c’è una risposta.'),
          t('The outcome is recorded, and a credit counts as money saved.', 'Das Ergebnis wird festgehalten, und eine Gutschrift zählt als gespartes Geld.', 'تُسجَّل النتيجة، ويُحسب الإشعار الدائن مالًا موفّرًا.', 'L’esito viene registrato, e una nota di credito conta come denaro risparmiato.'),
        ],
      },
      {
        id: 'invoice-approval',
        icon: 'orders',
        film: 'deliveries-invoices',
        name: t('Invoice approval', 'Rechnungsfreigabe', 'اعتماد الفواتير', 'Approvazione fatture'),
        line: t('Invoice against delivery and agreed price.', 'Rechnung gegen Lieferung und vereinbarten Preis.', 'الفاتورة مقابل التوريد والسعر المتفق عليه.', 'Fattura contro consegna e prezzo concordato.'),
        points: [
          t('Ordered, received and invoiced side by side. Supplier invoices are approved on their own, after the order.', 'Bestellt, erhalten und berechnet nebeneinander. Lieferantenrechnungen werden eigenständig freigegeben, nach der Bestellung.', 'المطلوب والمستلم والمفوتر جنبًا إلى جنب. وتُعتمد فواتير المورّدين وحدها، بعد الطلب.', 'Ordinato, ricevuto e fatturato fianco a fianco. Le fatture dei fornitori si approvano a parte, dopo l’ordine.'),
          t('One decision per invoice: flag it, correct it or approve it. Approving one that still has a difference needs a short note why.', 'Eine Entscheidung pro Rechnung: markieren, korrigieren oder freigeben. Wer eine mit Abweichung freigibt, schreibt kurz, warum.', 'قرار واحد لكل فاتورة: تعليمها أو تصحيحها أو اعتمادها. واعتماد فاتورة فيها فرق يحتاج إلى ملاحظة قصيرة بالسبب.', 'Una decisione per fattura: segnalarla, correggerla o approvarla. Approvarne una con una differenza richiede una breve nota sul perché.'),
        ],
      },
      {
        id: 'reliability',
        icon: 'suppliers',
        film: 'deliveries-reliability',
        name: t('Supplier reliability', 'Lieferantenzuverlässigkeit', 'موثوقية الموردين', 'Affidabilità dei fornitori'),
        line: t('Who delivers on time, and on which days they don’t.', 'Wer pünktlich liefert, und an welchen Tagen nicht.', 'من يسلّم في الوقت، وفي أي أيام يتأخر.', 'Chi consegna in orario, e in quali giorni no.'),
        points: [
          t('Each supplier’s on-time rate, how late it is when it is late, and the weekdays it runs late.', 'Die Pünktlichkeit jedes Lieferanten, wie spät er ist, wenn er zu spät ist, und an welchen Wochentagen.', 'نسبة التسليم في الوقت لكل مورّد، ومقدار تأخره حين يتأخر، وأيام الأسبوع التي يتأخر فيها.', 'La puntualità di ogni fornitore, quanto ritarda quando ritarda, e in quali giorni della settimana.'),
          t('Tyll alerts when a confirmed delivery has not arrived, with two actions: call the supplier, or order from the backup supplier.', 'Tyll meldet, wenn eine bestätigte Lieferung nicht angekommen ist, mit zwei Aktionen: Lieferanten anrufen oder beim Ersatzlieferanten bestellen.', 'ينبّه Tyll عندما لا يصل توريد مؤكد، مع إجراءين: الاتصال بالمورّد أو الطلب من المورّد البديل.', 'Tyll avvisa quando una consegna confermata non è arrivata, con due azioni: chiamare il fornitore o ordinare dal fornitore di riserva.'),
        ],
      },
    ],
  },
};
