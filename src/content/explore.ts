// The product explorer on each solution page: one real demo screen, presented large, with the parts a visitor can
// explore. Each spot names a part of the interface, says in one or two sentences what it shows, and points the
// "camera" at it. A spot on another screen opens that screen as a panel over the first one, like a detail view.
//
// Rectangles are fractions of the full 1440 × 1240 capture: [x, y, width, height].
//   focus  – what the camera frames on wider screens
//   mark   – the exact part to highlight (optional)
//   fade   – the content carries on below the frame (a long list or form); the frame fades out and points to the
//            whole screen
// Focus rectangles are snapped to the gaps between cards, so a frame never cuts through a block of the interface.
// Every sentence describes only what the referenced screen shows. Checked against the demo captures on 17 Oct 2026.

import type { Locale, SolutionKey } from '../i18n/routes';

type Text = Record<Locale, string>;
export type Rect = [number, number, number, number];
export type Spot = {
  /** Index into the solution's `frames` */
  frame: number;
  label: Text;
  text: Text;
  focus: Rect;
  mark?: Rect;
  fade?: boolean;
  /** A stage of a genuine workflow (Forecasting only) */
  stage?: Text;
};
export type Explore = {
  spots: Spot[];
  /** What the team can do as a result, shown with the final call to action. Describes the demo, claims no results. */
  outcome: Text;
  /** The stage behind the product: charcoal for contrast, or light stone */
  tone: 'dark' | 'light';
};

const t = (en: string, de: string, ar: string, it: string): Text => ({ en, de, ar, it });

const plan = t('Plan', 'Planen', 'التخطيط', 'Pianifica');
const order = t('Order', 'Bestellen', 'الطلب', 'Ordina');
const approve = t('Approve', 'Freigeben', 'الاعتماد', 'Approva');
const receive = t('Receive', 'Annehmen', 'الاستلام', 'Ricevi');

export const explore: Record<SolutionKey, Explore> = {
  stock: {
    tone: 'dark',
    outcome: t(
      'A stock difference is surfaced with its evidence, checked by the right person and closed with a recorded outcome.',
      'Eine Bestandsabweichung wird mit ihren Belegen sichtbar, von der richtigen Person geprüft und mit dokumentiertem Ergebnis abgeschlossen.',
      'يظهر فرق المخزون مع أدلته، ويتحقق منه الشخص المناسب، ويُغلق بنتيجة موثّقة.',
      'Una differenza di magazzino emerge con le sue prove, viene verificata dalla persona giusta e chiusa con un esito documentato.',
    ),
    spots: [
      {
        frame: 1,
        label: t('Counts against sales', 'Zählung gegen Verkäufe', 'الجرد مقابل المبيعات', 'Conteggi e vendite'),
        text: t(
          'Stock counts on one side, sales and recipes on the other: 38 cans used, 30 explained. The 8-can difference is what needs checking.',
          'Zählungen auf der einen Seite, Verkäufe und Rezepturen auf der anderen: 38 Dosen verbraucht, 30 erklärt. Die Differenz von 8 Dosen ist zu prüfen.',
          'الجرد في جهة، والمبيعات والوصفات في الجهة الأخرى: استُهلكت 38 علبة، وتفسّر السجلات 30 منها. فرق العلب الثماني هو ما يحتاج إلى تحقق.',
          'Da una parte i conteggi, dall’altra vendite e ricette: 38 lattine usate, 30 spiegate. La differenza di 8 lattine è ciò che va verificato.',
        ),
        focus: [0.1799, 0.3863, 0.5125, 0.4847],
        mark: [0.207, 0.682, 0.466, 0.152],
      },
      {
        frame: 1,
        label: t('Value involved', 'Betroffener Wert', 'القيمة المعنية', 'Valore coinvolto'),
        text: t(
          'AED 28 at today’s price. It is not a confirmed loss: it becomes one only if the outcome says so.',
          'AED 28 zum heutigen Preis. Das ist kein bestätigter Verlust – erst das Ergebnis der Prüfung macht ihn dazu.',
          '28 درهمًا بسعر اليوم. وهي ليست خسارة مؤكدة، ولا تصبح كذلك إلا إذا أثبتت النتيجة ذلك.',
          'AED 28 al prezzo di oggi. Non è una perdita confermata: lo diventa solo se l’esito lo stabilisce.',
        ),
        focus: [0.1799, 0.0556, 0.8187, 0.354],
        mark: [0.705, 0.25, 0.27, 0.135],
      },
      {
        frame: 2,
        label: t('Possible explanations', 'Mögliche Erklärungen', 'التفسيرات المحتملة', 'Possibili spiegazioni'),
        text: t(
          'Each possible cause is listed with what the records show. Nothing is concluded until a manager checks.',
          'Jede mögliche Ursache steht mit dem, was die Daten zeigen. Entschieden ist nichts, bis jemand prüft.',
          'يُعرض كل سبب محتمل مع ما تُظهره السجلات، ولا يُستنتج شيء قبل أن يتحقق مدير.',
          'Ogni possibile causa è elencata con ciò che mostrano i dati. Nulla è stabilito finché un responsabile non verifica.',
        ),
        focus: [0.1799, 0.4129, 0.5125, 0.3919],
        mark: [0.207, 0.505, 0.465, 0.045],
      },
      {
        frame: 3,
        label: t('Who follows up', 'Wer nachfasst', 'من يتابع', 'Chi se ne occupa'),
        text: t(
          'The F&B director takes the case, with a deadline. It stays on his list until an outcome is recorded.',
          'Der F&B-Direktor übernimmt den Fall mit Frist. Er bleibt auf seiner Liste, bis ein Ergebnis dokumentiert ist.',
          'يتولى مدير الأغذية والمشروبات الحالة مع موعد نهائي، وتبقى في قائمته حتى تُسجَّل نتيجة.',
          'Il direttore F&B prende in carico il caso, con una scadenza. Resta nella sua lista finché non viene registrato un esito.',
        ),
        focus: [0.6792, 0.1298, 0.3194, 0.315],
        mark: [0.705, 0.192, 0.27, 0.04],
      },
      {
        frame: 1,
        label: t('Recording the outcome', 'Ergebnis festhalten', 'تسجيل النتيجة', 'Registrare l’esito'),
        text: t(
          'When the check is done, the manager records what it found: a legitimate correction, a confirmed loss, revenue recovered or no finding.',
          'Nach der Prüfung wird festgehalten, was sie ergab: eine berechtigte Korrektur, ein bestätigter Verlust, zurückgeholter Umsatz oder kein Befund.',
          'بعد التحقق، يسجّل المدير ما توصل إليه: تصحيح مشروع، أو خسارة مؤكدة، أو إيراد مسترد، أو عدم وجود نتيجة.',
          'A verifica conclusa, il responsabile registra cosa è emerso: una correzione legittima, una perdita confermata, un ricavo recuperato o nessun riscontro.',
        ),
        focus: [0.6792, 0.7145, 0.3194, 0.2798],
        mark: [0.705, 0.745, 0.265, 0.25],
      },
    ],
  },

  finance: {
    tone: 'dark',
    outcome: t(
      'A mismatch is reviewed with the records behind it, instead of disappearing inside separate reports.',
      'Eine Abweichung wird mit den zugehörigen Daten geprüft, statt in getrennten Berichten unterzugehen.',
      'يُراجَع عدم التطابق مع السجلات التي تقف خلفه، بدلًا من أن يضيع في تقارير منفصلة.',
      'Una discrepanza viene esaminata con i dati che la riguardano, invece di perdersi in report separati.',
    ),
    spots: [
      {
        frame: 1,
        label: t('The flag', 'Der Hinweis', 'التنبيه', 'La segnalazione'),
        text: t(
          'One order at The Terrace: a Coca-Cola removed six minutes after it was sent to the bar, with AED 22 involved.',
          'Eine Bestellung auf The Terrace: eine Coca-Cola, sechs Minuten nach der Bestellung an der Bar entfernt, AED 22 betroffen.',
          'طلب واحد في The Terrace: حُذفت Coca-Cola بعد ست دقائق من إرسالها إلى البار، بقيمة 22 درهمًا.',
          'Un ordine a The Terrace: una Coca-Cola tolta sei minuti dopo l’invio al bar, con AED 22 coinvolti.',
        ),
        focus: [0.1799, 0.0556, 0.8187, 0.2782],
        mark: [0.198, 0.255, 0.776, 0.062],
      },
      {
        frame: 1,
        label: t('Order against bill', 'Bestellung gegen Rechnung', 'الطلب مقابل الفاتورة', 'Ordine e conto'),
        text: t(
          'The original order and the final bill side by side. The AED 22 difference is the drink that was removed.',
          'Ursprüngliche Bestellung und Endrechnung nebeneinander. Die Differenz von AED 22 ist das entfernte Getränk.',
          'الطلب الأصلي والفاتورة النهائية جنبًا إلى جنب. فرق الـ 22 درهمًا هو المشروب الذي حُذف.',
          'L’ordine originale e il conto finale fianco a fianco. La differenza di AED 22 è la bevanda tolta.',
        ),
        focus: [0.1799, 0.3185, 0.8187, 0.2387],
        mark: [0.598, 0.475, 0.375, 0.03],
      },
      {
        frame: 1,
        label: t('Every step, in order', 'Jeder Schritt der Reihe nach', 'كل خطوة بالترتيب', 'Ogni passaggio, in ordine'),
        text: t(
          'Each step at the point of sale, including the removal, which has no reason or approval on record.',
          'Jeder Schritt an der Kasse, auch die Entfernung – ohne erfassten Grund oder Freigabe.',
          'كل خطوة في نقطة البيع، بما فيها الحذف، دون سبب أو موافقة مسجّلة.',
          'Ogni passaggio alla cassa, compresa la rimozione, senza motivo né approvazione registrati.',
        ),
        focus: [0.1799, 0.5435, 0.4146, 0.4508],
        mark: [0.205, 0.8, 0.38, 0.045],
      },
      {
        frame: 2,
        label: t('Room charges', 'Zimmerbelastungen', 'رسوم الغرف', 'Addebiti in camera'),
        text: t(
          'Charges from outlets are matched to guest bills: 1,882 checked this week, an AED 576 difference and 17 postings flagged.',
          'Belastungen aus den Outlets werden mit den Gästerechnungen abgeglichen: 1.882 diese Woche geprüft, AED 576 Differenz, 17 Buchungen markiert.',
          'تُطابَق رسوم المنافذ مع فواتير الضيوف: فُحص 1,882 رسمًا هذا الأسبوع، بفرق 576 درهمًا، ورُصد 17 قيدًا.',
          'Gli addebiti dei punti vendita vengono confrontati con i conti degli ospiti: 1.882 controllati questa settimana, una differenza di AED 576 e 17 registrazioni segnalate.',
        ),
        focus: [0.1799, 0.2371, 0.8187, 0.3089],
        mark: [0.205, 0.335, 0.69, 0.065],
      },
      {
        frame: 3,
        label: t('Invoices against deliveries', 'Rechnungen gegen Lieferungen', 'الفواتير مقابل التوريدات', 'Fatture e consegne'),
        text: t(
          'Supplier invoices that bill for more than arrived, or above the agreed price, are listed with the amount to check.',
          'Lieferantenrechnungen, die mehr berechnen als ankam oder über dem vereinbarten Preis liegen, stehen mit dem zu prüfenden Betrag in der Liste.',
          'تُدرج فواتير الموردين التي تحتسب أكثر مما وصل، أو بسعر أعلى من المتفق عليه، مع المبلغ الذي يجب التحقق منه.',
          'Le fatture dei fornitori che addebitano più di quanto arrivato, o sopra il prezzo concordato, sono elencate con l’importo da verificare.',
        ),
        focus: [0.1799, 0.2573, 0.8187, 0.3298],
        fade: true,
        mark: [0.2, 0.35, 0.775, 0.035],
      },
    ],
  },

  forecasting: {
    tone: 'light',
    outcome: t(
      'Purchasing is planned from expected guests, and every request moves through clear approvals to the delivery.',
      'Der Einkauf wird anhand der erwarteten Gäste geplant, und jede Anforderung durchläuft klare Freigaben bis zur Lieferung.',
      'تُخطَّط المشتريات وفق عدد الضيوف المتوقع، ويمرّ كل طلب بموافقات واضحة حتى الاستلام.',
      'Gli acquisti si pianificano sugli ospiti attesi, e ogni richiesta segue approvazioni chiare fino alla consegna.',
    ),
    spots: [
      {
        frame: 0,
        stage: plan,
        label: t('Expected guests', 'Erwartete Gäste', 'الضيوف المتوقعون', 'Ospiti attesi'),
        text: t(
          'Reservations, recent walk-in patterns, hotel occupancy and Thursday’s conference add up to 589 expected guests. Any figure can be changed.',
          'Reservierungen, Laufkundschaft der letzten Wochen, Hotelauslastung und die Konferenz am Donnerstag ergeben 589 erwartete Gäste. Jede Zahl lässt sich anpassen.',
          'تجتمع الحجوزات وأنماط الزوار دون حجز وإشغال الفندق ومؤتمر الخميس لتعطي 589 ضيفًا متوقعًا. ويمكن تعديل أي رقم.',
          'Prenotazioni, clienti senza prenotazione delle ultime settimane, occupazione e la conferenza di giovedì danno 589 ospiti attesi. Ogni cifra si può modificare.',
        ),
        focus: [0.1799, 0.2798, 0.8187, 0.5855],
        mark: [0.205, 0.712, 0.33, 0.032],
      },
      {
        frame: 1,
        stage: order,
        label: t('What to buy', 'Was zu kaufen ist', 'ما يجب شراؤه', 'Cosa comprare'),
        text: t(
          '15 items need ordering, each with a suggested quantity, an order-by date and whether it runs short before the next delivery.',
          '15 Artikel müssen bestellt werden, jeweils mit Mengenvorschlag, Bestelldatum und dem Hinweis, ob sie vor der nächsten Lieferung knapp werden.',
          '15 صنفًا تحتاج إلى طلب، لكلٍّ منها كمية مقترحة وتاريخ أقصى للطلب، وما إذا كان سينفد قبل التوريد التالي.',
          '15 articoli da ordinare, ognuno con quantità suggerita, data entro cui ordinare e se finisce prima della prossima consegna.',
        ),
        focus: [0.1799, 0.2798, 0.8187, 0.5073],
        fade: true,
        mark: [0.205, 0.383, 0.122, 0.04],
      },
      {
        frame: 2,
        stage: order,
        label: t('The purchase request', 'Die Bestellanforderung', 'طلب الشراء', 'La richiesta d’acquisto'),
        text: t(
          'The request goes to Purchasing, and every approval step is visible: purchasing, accounting and, above AED 5,000, the general manager.',
          'Die Anforderung geht an den Einkauf, und jeder Freigabeschritt ist sichtbar: Einkauf, Buchhaltung und ab AED 5.000 der General Manager.',
          'يذهب الطلب إلى المشتريات، وتظهر كل خطوة موافقة: المشتريات، ثم المحاسبة، ثم المدير العام للطلبات التي تتجاوز 5,000 درهم.',
          'La richiesta va agli Acquisti e ogni passaggio di approvazione è visibile: acquisti, contabilità e, sopra AED 5.000, il direttore generale.',
        ),
        focus: [0.1799, 0.2782, 0.8187, 0.2444],
        mark: [0.205, 0.455, 0.68, 0.04],
      },
      {
        frame: 3,
        stage: approve,
        label: t('Purchasing review', 'Prüfung im Einkauf', 'مراجعة المشتريات', 'Revisione acquisti'),
        text: t(
          'Purchasing approves, asks for changes or rejects, with the budget left after this request in view. Budgets are demo planning figures.',
          'Der Einkauf gibt frei, fordert Änderungen an oder lehnt ab – mit dem Budget, das nach dieser Anforderung bleibt. Budgets sind Planungszahlen der Demo.',
          'توافق المشتريات أو تطلب تعديلات أو ترفض، مع رؤية الميزانية المتبقية بعد هذا الطلب. والميزانيات أرقام تخطيطية في العرض التوضيحي.',
          'Gli Acquisti approvano, chiedono modifiche o rifiutano, con il budget residuo dopo questa richiesta sotto gli occhi. I budget sono cifre di pianificazione della demo.',
        ),
        focus: [0.1799, 0.454, 0.8187, 0.2984],
        mark: [0.208, 0.633, 0.24, 0.034],
      },
      {
        frame: 4,
        stage: receive,
        label: t('Goods received', 'Ware angenommen', 'استلام البضائع', 'Merce ricevuta'),
        text: t(
          'Stock rises only when the delivery is recorded, not when the order is placed.',
          'Der Bestand steigt erst, wenn die Lieferung erfasst ist – nicht schon bei der Bestellung.',
          'لا يرتفع المخزون إلا عند تسجيل التوريد، وليس عند إرسال الطلب.',
          'Le giacenze aumentano solo quando la consegna viene registrata, non quando si ordina.',
        ),
        focus: [0.1799, 0.0573, 0.8187, 0.4427],
        fade: true,
        mark: [0.205, 0.118, 0.37, 0.022],
      },
    ],
  },

  events: {
    tone: 'dark',
    outcome: t(
      'A staffing request reaches the department that can help, and everyone can follow the decision.',
      'Eine Personalanfrage erreicht die Abteilung, die helfen kann, und alle können die Entscheidung verfolgen.',
      'يصل طلب الموظفين إلى القسم القادر على المساعدة، ويستطيع الجميع متابعة القرار.',
      'Una richiesta di personale raggiunge il reparto che può aiutare, e tutti possono seguire la decisione.',
    ),
    spots: [
      {
        frame: 1,
        label: t('The event', 'Das Event', 'الفعالية', 'L’evento'),
        text: t(
          'The regional sales conference dinner: 180 guests on Thursday in the Grand Ballroom, still in planning.',
          'Das Abendessen der regionalen Vertriebskonferenz: 180 Gäste am Donnerstag im Grand Ballroom, noch in Planung.',
          'عشاء مؤتمر المبيعات الإقليمي: 180 ضيفًا يوم الخميس في Grand Ballroom، وما زال قيد التخطيط.',
          'La cena della conferenza vendite regionale: 180 ospiti giovedì nel Grand Ballroom, ancora in pianificazione.',
        ),
        focus: [0.1799, 0.3218, 0.8187, 0.45],
        mark: [0.205, 0.348, 0.77, 0.046],
      },
      {
        frame: 1,
        label: t('Cost and price', 'Kosten und Preis', 'التكلفة والسعر', 'Costi e prezzo'),
        text: t(
          'Food, drinks and labour are estimated against the agreed price. Demo estimates, not accounting figures.',
          'Speisen, Getränke und Personal werden gegen den vereinbarten Preis geschätzt. Schätzwerte der Demo, keine Buchhaltungszahlen.',
          'تُقدَّر تكلفة الطعام والمشروبات والعمالة مقابل السعر المتفق عليه. تقديرات العرض التوضيحي، وليست أرقامًا محاسبية.',
          'Cibo, bevande e personale sono stimati rispetto al prezzo concordato. Stime della demo, non dati contabili.',
        ),
        focus: [0.1799, 0.3218, 0.8187, 0.45],
        mark: [0.207, 0.5, 0.375, 0.06],
      },
      {
        frame: 1,
        label: t('What still needs doing', 'Was noch fehlt', 'ما يزال مطلوبًا', 'Cosa manca ancora'),
        text: t(
          'Six more waiters and other roles still to fill, plus ingredients to buy. Each line leads to the place to act on it.',
          'Sechs weitere Servicekräfte und andere Rollen sind offen, dazu Zutaten zum Einkaufen. Jede Zeile führt dorthin, wo man handeln kann.',
          'ما يزال هناك ستة نُدُل إضافيين وأدوار أخرى يجب شغلها، إضافة إلى مكونات للشراء. وكل سطر يقود إلى المكان المناسب للتصرف.',
          'Mancano altri sei camerieri e altri ruoli, più ingredienti da comprare. Ogni riga porta al punto in cui intervenire.',
        ),
        focus: [0.1799, 0.3218, 0.8187, 0.45],
        mark: [0.59, 0.433, 0.375, 0.026],
      },
      {
        frame: 2,
        label: t('Finding staff', 'Personal finden', 'إيجاد الموظفين', 'Trovare personale'),
        text: t(
          'Waiters: 12 needed, 6 confirmed. Tyll lists the people with the right skill who are free for the whole event.',
          'Servicekräfte: 12 benötigt, 6 bestätigt. Tyll zeigt die Personen mit passender Qualifikation, die das ganze Event über frei sind.',
          'النُدُل: المطلوب 12، والمؤكد 6. ويعرض Tyll الأشخاص ذوي المهارة المناسبة المتفرغين طوال الفعالية.',
          'Camerieri: 12 necessari, 6 confermati. Tyll elenca le persone con la competenza giusta libere per tutto l’evento.',
        ),
        focus: [0.1799, 0.3218, 0.8187, 0.3476],
        fade: true,
        mark: [0.68, 0.433, 0.3, 0.03],
      },
      {
        frame: 3,
        label: t('The request', 'Die Anfrage', 'الطلب', 'La richiesta'),
        text: t(
          'Six waiters are requested from another department. The restaurant manager sees the request, and it shows 0 of 6 confirmed until she decides.',
          'Sechs Servicekräfte werden bei einer anderen Abteilung angefragt. Die Restaurantleiterin sieht die Anfrage; bis sie entscheidet, steht dort 0 von 6 bestätigt.',
          'يُطلب ستة نُدُل من قسم آخر. ترى مديرة المطعم الطلب، ويظهر «0 من 6 مؤكد» حتى تتخذ قرارها.',
          'Sei camerieri vengono richiesti a un altro reparto. La responsabile del ristorante vede la richiesta, che mostra 0 su 6 confermati finché non decide.',
        ),
        focus: [0.1799, 0.1927, 0.8187, 0.3306],
        mark: [0.2, 0.365, 0.78, 0.033],
      },
    ],
  },

  rooms: {
    tone: 'light',
    outcome: t(
      'Front office, housekeeping and the room attendant work from the same picture, so a late room gets the attention it needs.',
      'Rezeption, Housekeeping und Zimmerreinigung arbeiten mit demselben Bild, damit ein spätes Zimmer die nötige Aufmerksamkeit bekommt.',
      'يعمل الاستقبال والتدبير الفندقي وعامل الغرف من الصورة نفسها، فتحظى الغرفة المتأخرة بالاهتمام الذي تحتاجه.',
      'Ricevimento, housekeeping e addetti alle camere lavorano sullo stesso quadro, così una camera in ritardo riceve l’attenzione necessaria.',
    ),
    spots: [
      {
        frame: 0,
        label: t('Today’s arrivals', 'Heutige Anreisen', 'وصول اليوم', 'Arrivi di oggi'),
        text: t(
          'Front office sees that 4 arriving guests may have to wait: 12 rooms ready, 4 being cleaned and 3 waiting to be cleaned.',
          'Die Rezeption sieht, dass 4 anreisende Gäste warten könnten: 12 Zimmer fertig, 4 in Reinigung, 3 warten auf Reinigung.',
          'يرى الاستقبال أن 4 ضيوف قادمين قد ينتظرون: 12 غرفة جاهزة، و4 قيد التنظيف، و3 بانتظار التنظيف.',
          'Il ricevimento vede che 4 ospiti in arrivo potrebbero dover aspettare: 12 camere pronte, 4 in pulizia e 3 in attesa di pulizia.',
        ),
        focus: [0.1799, 0.2371, 0.8187, 0.1726],
        mark: [0.205, 0.335, 0.42, 0.04],
      },
      {
        frame: 0,
        label: t('Rooms running late', 'Verspätete Zimmer', 'غرف متأخرة', 'Camere in ritardo'),
        text: t(
          'Each room shows its cleaning status, an estimated ready time and how long a guest has been waiting. Estimates, not guarantees.',
          'Jedes Zimmer zeigt Reinigungsstatus, voraussichtliche Fertigstellung und wie lange ein Gast schon wartet. Schätzungen, keine Zusagen.',
          'تعرض كل غرفة حالة تنظيفها والوقت المتوقع لجاهزيتها ومدة انتظار الضيف. تقديرات وليست ضمانات.',
          'Ogni camera mostra lo stato della pulizia, l’orario stimato in cui sarà pronta e da quanto un ospite aspetta. Stime, non garanzie.',
        ),
        focus: [0.1799, 0.396, 0.8187, 0.2935],
        fade: true,
        mark: [0.2, 0.48, 0.78, 0.045],
      },
      {
        frame: 1,
        label: t('A priority request', 'Eine Prioritätsanfrage', 'طلب أولوية', 'Una richiesta prioritaria'),
        text: t(
          'The VIP guest for suite 1211 is already here. Front office asks housekeeping to prioritise the suite, and the request is recorded in the room’s history.',
          'Der VIP-Gast für Suite 1211 ist schon da. Die Rezeption bittet das Housekeeping um Vorrang, und die Anfrage steht im Verlauf des Zimmers.',
          'وصل الضيف المهم لجناح 1211 بالفعل. يطلب الاستقبال من التدبير الفندقي إعطاء الأولوية للجناح، ويُسجَّل الطلب في سجل الغرفة.',
          'L’ospite VIP della suite 1211 è già arrivato. Il ricevimento chiede all’housekeeping di dare priorità alla suite, e la richiesta resta nella cronologia della camera.',
        ),
        focus: [0.1799, 0.2734, 0.8187, 0.5121],
        mark: [0.205, 0.305, 0.775, 0.13],
      },
      {
        frame: 2,
        label: t('Housekeeping board', 'Housekeeping-Übersicht', 'لوحة التدبير الفندقي', 'Bacheca housekeeping'),
        text: t(
          'The suite moves to the top of the housekeeping board, where the team also sees which rooms are waiting and who is assigned.',
          'Die Suite rückt im Housekeeping nach oben, wo das Team auch sieht, welche Zimmer warten und wer zugeteilt ist.',
          'ينتقل الجناح إلى أعلى لوحة التدبير الفندقي، حيث يرى الفريق أيضًا الغرف المنتظرة ومن كُلّف بها.',
          'La suite sale in cima alla bacheca dell’housekeeping, dove il team vede anche quali camere aspettano e a chi sono assegnate.',
        ),
        focus: [0.1799, 0.2371, 0.8187, 0.3105],
        mark: [0.2, 0.49, 0.78, 0.035],
      },
      {
        frame: 4,
        label: t('Awaiting inspection', 'Wartet auf Abnahme', 'بانتظار الفحص', 'In attesa di ispezione'),
        text: t(
          'The room attendant marks it cleaned on her phone. Front office then sees suite 1211 awaiting inspection.',
          'Die Zimmerreinigung meldet es auf dem Smartphone als gereinigt. Die Rezeption sieht Suite 1211 dann als „wartet auf Abnahme“.',
          'تضع عاملة الغرف علامة «تم التنظيف» من هاتفها، فيرى الاستقبال الجناح 1211 بانتظار الفحص.',
          'L’addetta lo segna come pulito dal telefono. Il ricevimento vede quindi la suite 1211 in attesa di ispezione.',
        ),
        focus: [0.1799, 0.2734, 0.8187, 0.5323],
        mark: [0.205, 0.305, 0.235, 0.026],
      },
    ],
  },

  sales: {
    tone: 'dark',
    outcome: t(
      'Owners, managers and sales see performance and the pipeline in one place, with estimates clearly marked.',
      'Eigentümer, Management und Vertrieb sehen Performance und Pipeline an einem Ort – Schätzungen klar gekennzeichnet.',
      'يرى الملّاك والمديرون وفريق المبيعات الأداء وفرص البيع في مكان واحد، مع تمييز التقديرات بوضوح.',
      'Proprietà, direzione e vendite vedono performance e pipeline in un unico posto, con le stime chiaramente indicate.',
    ),
    spots: [
      {
        frame: 0,
        label: t('Revenue and contribution', 'Umsatz und Beitrag', 'الإيراد والمساهمة', 'Ricavi e contributo'),
        text: t(
          'Owners and general managers see revenue, estimated operating contribution and potential losses for the week, each with its trend.',
          'Eigentümer und General Manager sehen Umsatz, geschätzten Betriebsbeitrag und mögliche Verluste der Woche, jeweils mit Trend.',
          'يرى الملّاك والمديرون العامون الإيراد والمساهمة التشغيلية المقدّرة والخسائر المحتملة للأسبوع، مع اتجاه كلٍّ منها.',
          'Proprietà e direttori generali vedono ricavi, contributo operativo stimato e perdite potenziali della settimana, ciascuno con il suo andamento.',
        ),
        focus: [0.1799, 0.3363, 0.8187, 0.4758],
        mark: [0.198, 0.352, 0.78, 0.12],
      },
      {
        frame: 0,
        label: t('What needs attention', 'Was Aufmerksamkeit braucht', 'ما يتطلب الانتباه', 'Cosa richiede attenzione'),
        text: t(
          'The open issues behind the figures, with the value involved, their priority and who is on them.',
          'Die offenen Punkte hinter den Zahlen – mit betroffenem Wert, Priorität und wer sich darum kümmert.',
          'المسائل المفتوحة وراء الأرقام، مع القيمة المعنية وأولويتها ومن يتولاها.',
          'Le questioni aperte dietro i numeri, con il valore coinvolto, la priorità e chi se ne occupa.',
        ),
        focus: [0.1799, 0.3363, 0.8187, 0.4758],
        mark: [0.205, 0.585, 0.77, 0.155],
      },
      {
        frame: 1,
        label: t('Opportunities', 'Verkaufschancen', 'فرص البيع', 'Opportunità'),
        text: t(
          'Sales follows open opportunities and the next step for each. Expected values are sales estimates, never shown as revenue.',
          'Der Vertrieb verfolgt offene Verkaufschancen und den nächsten Schritt. Erwartete Werte sind Vertriebsschätzungen, nie Umsatz.',
          'يتابع فريق المبيعات الفرص المفتوحة والخطوة التالية لكل منها. والقيم المتوقعة تقديرات بيعية، ولا تُعرض أبدًا كإيراد.',
          'Le vendite seguono le opportunità aperte e il prossimo passo di ciascuna. I valori attesi sono stime commerciali, mai mostrate come ricavi.',
        ),
        focus: [0.1799, 0.2863, 0.8187, 0.2516],
        mark: [0.205, 0.315, 0.45, 0.04],
      },
      {
        frame: 3,
        label: t('Confirmed business', 'Bestätigtes Geschäft', 'الأعمال المؤكدة', 'Affari confermati'),
        text: t(
          'Each confirmed deal links to its event, so operations can see what it needs. This conference still needs 15 staff.',
          'Jeder bestätigte Abschluss ist mit seinem Event verknüpft, so sieht der Betrieb, was gebraucht wird. Für diese Konferenz fehlen noch 15 Mitarbeitende.',
          'ترتبط كل صفقة مؤكدة بفعاليتها، فترى العمليات ما تحتاجه. وما يزال هذا المؤتمر بحاجة إلى 15 موظفًا.',
          'Ogni affare confermato è collegato al suo evento, così l’operatività vede cosa serve. Per questa conferenza mancano ancora 15 persone.',
        ),
        focus: [0.1792, 0.2371, 0.8194, 0.2484],
        mark: [0.205, 0.425, 0.775, 0.035],
      },
      {
        frame: 4,
        label: t('Monthly summary', 'Monatsübersicht', 'الملخص الشهري', 'Riepilogo mensile'),
        text: t(
          'Revenue, direct costs and estimated operating contribution, month to date. The screen states that this is not net profit.',
          'Umsatz, direkte Kosten und geschätzter Betriebsbeitrag im laufenden Monat. Die Ansicht sagt klar, dass dies kein Nettogewinn ist.',
          'الإيراد والتكاليف المباشرة والمساهمة التشغيلية المقدّرة منذ بداية الشهر. وتوضح الشاشة أن هذا ليس صافي الربح.',
          'Ricavi, costi diretti e contributo operativo stimato del mese in corso. La schermata precisa che non si tratta di utile netto.',
        ),
        focus: [0.1799, 0.2573, 0.8187, 0.4694],
        mark: [0.205, 0.44, 0.42, 0.03],
      },
    ],
  },
};
