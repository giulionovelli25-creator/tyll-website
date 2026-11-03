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
// Every sentence describes only what the referenced screen shows. Checked against the demo captures on 3 Nov 2026.

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
  /** The band behind the product. All six are light now; dark remains possible for a page that needs it. */
  tone: 'dark' | 'light';
};

const t = (en: string, de: string, ar: string, it: string): Text => ({ en, de, ar, it });

export const explore: Record<SolutionKey, Explore> = {
  waste: {
    tone: 'light',
    outcome: t('Your team logs waste and breakage as it happens, and you see what it cost.', 'Ihr Team erfasst Abfall und Bruch, wenn sie passieren, und Sie sehen, was es gekostet hat.', 'يسجّل فريقك الهدر والكسر فور حدوثهما، وترى كم كلّفا.', 'Il tuo team registra sprechi e rotture quando accadono, e tu vedi quanto sono costati.'),
    spots: [
      {
        frame: 0,
        label: t('Two taps', 'Zwei Tipps', 'نقرتان', 'Due tocchi'),
        text: t('Food, Drinks or Inventory, then the item and the number. A prepared dish or a note is one more link.', 'Food, Drinks oder Inventory, dann Artikel und Zahl. Ein zubereitetes Gericht oder eine Notiz ist nur ein Link mehr.', 'Food أو Drinks أو Inventory، ثم الصنف والرقم. والطبق الجاهز أو الملاحظة على بُعد رابط واحد.', 'Food, Drinks o Inventory, poi l’articolo e il numero. Un piatto pronto o una nota sono un link in più.'),
        focus: [0.1833, 0.2586, 0.7944, 0.3012],
      },
      {
        frame: 0,
        label: t('Lost today', 'Heutiger Verlust', 'خسارة اليوم', 'Perso oggi'),
        text: t('AED 337 lost today, split into wasted and broken.', 'AED 337 Verlust heute, aufgeteilt in verdorben und zerbrochen.', 'خسارة 337 درهمًا اليوم، مقسّمة بين الهدر والكسر.', 'AED 337 persi oggi, divisi tra sprecato e rotto.'),
        focus: [0.1833, 0.1602, 0.7944, 0.0855],
      },
      {
        frame: 1,
        label: t('Today’s log', 'Heutiges Protokoll', 'سجل اليوم', 'Registro di oggi'),
        text: t('Eleven entries with amount, reason, outlet and cost.', 'Elf Einträge mit Menge, Grund, Outlet und Kosten.', 'أحد عشر إدخالًا بالكمية والسبب والمنفذ والتكلفة.', 'Undici voci con quantità, motivo, punto vendita e costo.'),
        focus: [0.1833, 0.3775, 0.7944, 0.4726],
      },
    ],
  },

  stock: {
    tone: 'light',
    outcome: t('Your team sees what runs out first, and counts only what differs.', 'Ihr Team sieht, was zuerst ausgeht, und korrigiert nur, was abweicht.', 'يرى فريقك ما سينفد أولًا، ولا يعدّل إلا ما يختلف.', 'Il tuo team vede cosa finisce per primo e corregge solo ciò che è diverso.'),
    spots: [
      {
        frame: 0,
        label: t('Critical, low, fine', 'Critical, low, fine', 'Critical وlow وfine', 'Critical, low, fine'),
        text: t('5 critical, 10 low, 48 fine, with Start count beside them.', '5 critical, 10 low, 48 fine, daneben Start count.', '5 حرجة و10 منخفضة و48 جيدة، وبجانبها Start count.', '5 critical, 10 low, 48 fine, con accanto Start count.'),
        focus: [0.1833, 0.1602, 0.7944, 0.071],
      },
      {
        frame: 0,
        label: t('Critical items', 'Kritische Artikel', 'الأصناف الحرجة', 'Articoli critici'),
        text: t('An order placed today would arrive too late. Each item shows what is left and when it runs out.', 'Eine heutige Bestellung käme zu spät. Jeder Artikel zeigt den Rest und wann er ausgeht.', 'طلب يُرسل اليوم سيصل متأخرًا. يبيّن كل صنف ما بقي ومتى ينفد.', 'Un ordine di oggi arriverebbe troppo tardi. Ogni articolo mostra cosa resta e quando finisce.'),
        focus: [0.1833, 0.2924, 0.7944, 0.2338],
      },
      {
        frame: 1,
        label: t('Stock count', 'Zählung', 'الجرد', 'Conteggio'),
        text: t('The expected amount is filled in. Change it only if it differs, then Looks right, next. Whole screen shows the full step, item 1 of 63.', 'Die erwartete Menge ist eingetragen. Nur ändern, wenn sie abweicht, dann Looks right, next. Whole screen zeigt den ganzen Schritt, Artikel 1 von 63.', 'الكمية المتوقعة مكتوبة. غيّرها فقط إذا اختلفت، ثم Looks right, next. ويعرض Whole screen الخطوة كاملة، الصنف 1 من 63.', 'La quantità attesa è già inserita. Cambiala solo se è diversa, poi Looks right, next. Whole screen mostra il passaggio intero, articolo 1 di 63.'),
        focus: [0.3444, 0.79, 0.3111, 0.2],
      },
    ],
  },

  forecasting: {
    tone: 'light',
    outcome: t('Your purchasing team gets one clear list: what to buy, how much, and when.', 'Ihr Einkauf erhält eine klare Liste: was, wie viel und wann.', 'يحصل فريق المشتريات على قائمة واحدة واضحة: ماذا يشتري، وكم، ومتى.', 'Il team acquisti riceve un’unica lista chiara: cosa comprare, quanto e quando.'),
    spots: [
      {
        frame: 0,
        label: t('Order today', 'Heute bestellen', 'اطلب اليوم', 'Ordina oggi'),
        text: t('Five items to order today, each with the amount and what it costs.', 'Fünf Artikel für heute, jeweils mit Menge und Kosten.', 'خمسة أصناف للطلب اليوم، لكلٍّ منها الكمية والتكلفة.', 'Cinque articoli da ordinare oggi, ognuno con quantità e costo.'),
        focus: [0.1833, 0.2441, 0.7944, 0.2148],
      },
      {
        frame: 0,
        label: t('To month end', 'Bis Monatsende', 'حتى نهاية الشهر', 'A fine mese'),
        text: t('AED 310.7k to 31 October, 51 items to order, next order today.', 'AED 310,7k bis 31. Oktober, 51 Artikel, nächste Bestellung heute.', '310.7 ألف درهم حتى 31 أكتوبر، 51 صنفًا، والطلب التالي اليوم.', 'AED 310,7k fino al 31 ottobre, 51 articoli, prossimo ordine oggi.'),
        focus: [0.1833, 0.1602, 0.7944, 0.071],
      },
      {
        frame: 0,
        label: t('How it is calculated', 'So wird gerechnet', 'طريقة الحساب', 'Come si calcola'),
        text: t('10,994 forecast covers, 1 event and the last 4 weeks of usage. Confidence high.', '10.994 erwartete Gedecke, 1 Veranstaltung und der Verbrauch der letzten 4 Wochen. Sicherheit hoch.', '10,994 ضيفًا متوقعًا وفعالية واحدة واستهلاك آخر 4 أسابيع. الثقة عالية.', '10.994 coperti previsti, 1 evento e i consumi delle ultime 4 settimane. Affidabilità alta.'),
        focus: [0.1833, 0.5444, 0.7944, 0.44],
        fade: true,
      },
      {
        frame: 1,
        label: t('Build order', 'Build order', 'Build order', 'Build order'),
        text: t('One draft of 51 items from 6 suppliers. Nothing is sent until it is approved.', 'Ein Entwurf mit 51 Artikeln von 6 Lieferanten. Nichts wird ohne Freigabe gesendet.', 'مسودة واحدة من 51 صنفًا و6 مورّدين. لا يُرسل شيء قبل الاعتماد.', 'Una bozza di 51 articoli da 6 fornitori. Nulla viene inviato prima dell’approvazione.'),
        focus: [0.6, 0, 0.4, 0.42],
        fade: true,
      },
    ],
  },

  revenue: {
    tone: 'light',
    outcome: t('You see what each day and each outlet made, without waiting for a report.', 'Sie sehen, was jeder Tag und jedes Outlet gebracht hat, ohne auf einen Bericht zu warten.', 'ترى ما حققه كل يوم وكل منفذ، من دون انتظار تقرير.', 'Vedi quanto hanno reso ogni giorno e ogni punto vendita, senza aspettare un report.'),
    spots: [
      {
        frame: 0,
        label: t('Revenue and profit', 'Umsatz und Gewinn', 'الإيرادات والربح', 'Ricavi e profitto'),
        text: t('Revenue and estimated profit over the last 14 days, on one chart.', 'Umsatz und geschätzter Gewinn der letzten 14 Tage in einem Diagramm.', 'الإيرادات والربح المقدّر خلال آخر 14 يومًا في رسم واحد.', 'Ricavi e profitto stimato degli ultimi 14 giorni in un grafico.'),
        focus: [0.1833, 0.309, 0.7944, 0.2818],
      },
      {
        frame: 0,
        label: t('Three totals', 'Drei Summen', 'ثلاثة إجماليات', 'Tre totali'),
        text: t('Today so far, the last 7 days and the last 30 days, each with its change and estimated profit.', 'Heute bisher, die letzten 7 und 30 Tage, jeweils mit Veränderung und geschätztem Gewinn.', 'اليوم حتى الآن وآخر 7 أيام وآخر 30 يومًا، ولكلٍّ منها التغيّر والربح المقدّر.', 'Oggi finora, ultimi 7 e ultimi 30 giorni, ognuno con variazione e profitto stimato.'),
        focus: [0.1833, 0.1602, 0.7944, 0.0875],
      },
      {
        frame: 0,
        label: t('By outlet', 'Nach Outlet', 'حسب المنفذ', 'Per punto vendita'),
        text: t('Five outlets, 7 to 13 October, with revenue, cost and net profit estimates.', 'Fünf Outlets, 7. bis 13. Oktober, mit Umsatz sowie geschätzten Kosten und Nettogewinn.', 'خمسة منافذ، من 7 إلى 13 أكتوبر، بالإيرادات وتقديرات التكلفة وصافي الربح.', 'Cinque punti vendita, dal 7 al 13 ottobre, con ricavi e stime di costi e utile netto.'),
        focus: [0.1833, 0.6036, 0.7944, 0.39],
        fade: true,
      },
    ],
  },

  finance: {
    tone: 'light',
    outcome: t('A difference is reviewed with the records behind it, before the invoice is approved.', 'Eine Abweichung wird mit den zugehörigen Daten geprüft, bevor die Rechnung freigegeben wird.', 'يُراجَع الفرق مع السجلات التي تقف خلفه قبل اعتماد الفاتورة.', 'Una differenza viene esaminata con i dati che la riguardano, prima di approvare la fattura.'),
    spots: [
      {
        frame: 0,
        label: t('Supplier invoices', 'Lieferantenrechnungen', 'فواتير الموردين', 'Fatture fornitori'),
        text: t('Invoice, supplier, date, total, difference and status, with 23 to review.', 'Rechnung, Lieferant, Datum, Summe, Abweichung und Status, 23 zu prüfen.', 'الفاتورة والمورّد والتاريخ والإجمالي والفرق والحالة، و23 للمراجعة.', 'Fattura, fornitore, data, totale, differenza e stato, con 23 da rivedere.'),
        focus: [0.1833, 0.2472, 0.7944, 0.42],
        fade: true,
      },
      {
        frame: 1,
        label: t('One invoice', 'Eine Rechnung', 'فاتورة واحدة', 'Una fattura'),
        text: t('Ordered AED 6,262, received AED 5,898, invoiced AED 6,262. The list shows why: 2 kg more invoiced than received.', 'Bestellt AED 6.262, erhalten AED 5.898, berechnet AED 6.262. Die Liste zeigt warum: 2 kg mehr berechnet als erhalten.', 'المطلوب 6,262 درهمًا، والمستلم 5,898، والمفوتر 6,262. وتبيّن القائمة السبب: 2 كغ مفوترة زيادة على المستلم.', 'Ordinato AED 6.262, ricevuto AED 5.898, fatturato AED 6.262. L’elenco spiega perché: 2 kg fatturati in più del ricevuto.'),
        focus: [0.1833, 0.2359, 0.7944, 0.39],
      },
      {
        frame: 1,
        label: t('Your decision', 'Ihre Entscheidung', 'قرارك', 'La tua decisione'),
        text: t('Flag the difference, request a correction, or approve with the difference accepted. Approving needs a note saying why.', 'Abweichung markieren, Korrektur anfordern oder mit akzeptierter Abweichung freigeben. Die Freigabe braucht eine Notiz mit der Begründung.', 'أشر إلى الفرق أو اطلب تصحيحًا أو اعتمد مع قبول الفرق. ويتطلب الاعتماد ملاحظة تبيّن السبب.', 'Segnala la differenza, chiedi una correzione o approva accettando la differenza. L’approvazione richiede una nota che spieghi perché.'),
        focus: [0.1833, 0.62, 0.7944, 0.195],
      },
    ],
  },

  pour: {
    tone: 'light',
    outcome: t('You see where the gap is and what it is worth, and check pour size and measures first.', 'Sie sehen, wo die Differenz liegt und was sie wert ist, und prüfen zuerst Ausschankmenge und Maße.', 'ترى أين الفرق وما قيمته، وتتحقق أولًا من حجم السكب والمقاييس.', 'Vedi dov’è la differenza e quanto vale, e controlli prima dosi e misure.'),
    spots: [
      {
        frame: 0,
        label: t('The gap', 'Die Differenz', 'الفرق', 'La differenza'),
        text: t('61 glasses of wine not billed this week, worth AED 3,433.', '61 Gläser Wein diese Woche nicht berechnet, im Wert von AED 3.433.', '61 كأس نبيذ لم تُفوتَر هذا الأسبوع، بقيمة 3,433 درهمًا.', '61 bicchieri di vino non fatturati questa settimana, per AED 3.433.'),
        focus: [0.1833, 0.2924, 0.7944, 0.2214],
      },
      {
        frame: 0,
        label: t('Per wine', 'Je Wein', 'لكل نبيذ', 'Per vino'),
        text: t('Bottles opened, glasses sold, expected per bottle and actual yield for each wine.', 'Geöffnete Flaschen, verkaufte Gläser, Soll je Flasche und tatsächliche Ausbeute für jeden Wein.', 'الزجاجات المفتوحة والكؤوس المبيعة والمتوقع لكل زجاجة والعائد الفعلي لكل نبيذ.', 'Bottiglie aperte, bicchieri venduti, attesi per bottiglia e resa effettiva per ogni vino.'),
        focus: [0.2007, 0.5191, 0.7597, 0.3041],
      },
      {
        frame: 1,
        label: t('Where and when', 'Wo und wann', 'أين ومتى', 'Dove e quando'),
        text: t('Glasses each bottle gave, by outlet and shift. Red is below the threshold. No names.', 'Gläser pro Flasche, nach Outlet und Schicht. Rot liegt unter dem Schwellenwert. Keine Namen.', 'الكؤوس التي أعطتها كل زجاجة، حسب المنفذ والمناوبة. الأحمر دون الحد. لا أسماء.', 'Bicchieri per bottiglia, per punto vendita e turno. Il rosso è sotto soglia. Nessun nome.'),
        focus: [0.2011, 0.35, 0.3744, 0.35],
      },
      {
        frame: 1,
        label: t('Flags to check', 'Flags to check', 'Flags to check', 'Flags to check'),
        text: t('Patterns over the last 4 weeks, largest first, with the money involved.', 'Muster der letzten 4 Wochen, die größten zuerst, mit dem betroffenen Betrag.', 'أنماط آخر 4 أسابيع، الأكبر أولًا، مع المبلغ المعني.', 'Schemi delle ultime 4 settimane, prima i più grandi, con l’importo coinvolto.'),
        focus: [0.5867, 0.35, 0.3733, 0.435],
      },
    ],
  },

};
