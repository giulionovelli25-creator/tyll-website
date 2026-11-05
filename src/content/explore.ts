// The chapters of each solution's film: what the viewer is watching at that moment, in the visitor's language.
// Every sentence describes only what the film shows. Times are in `film.json`, written when the films are recorded.

import type { Locale, SolutionKey } from '../i18n/routes';

type Text = Record<Locale, string>;
export type Spot = { label: Text; text: Text };
export type Explore = { spots: Spot[] };

const t = (en: string, de: string, ar: string, it: string): Text => ({ en, de, ar, it });

export const explore: Record<SolutionKey, Explore> = {
  waste: {
    spots: [
      {
        label: t('Two taps', 'Zwei Tipps', 'نقرتان', 'Due tocchi'),
        text: t('Choose Food, Beverage or Inventory, then the item.', 'Food, Beverage oder Inventory wählen, dann den Artikel.', 'اختر Food أو Beverage أو Inventory، ثم الصنف.', 'Scegli Food, Beverage o Inventory, poi l’articolo.'),
      },
      {
        label: t('Lost today', 'Heutiger Verlust', 'خسارة اليوم', 'Perso oggi'),
        text: t('AED 337 lost today, split into wasted and broken.', 'AED 337 Verlust heute, aufgeteilt in verdorben und zerbrochen.', 'خسارة 337 درهمًا اليوم، مقسّمة بين الهدر والكسر.', 'AED 337 persi oggi, divisi tra sprecato e rotto.'),
      },
      {
        label: t('Today’s log', 'Heutiges Protokoll', 'سجل اليوم', 'Registro di oggi'),
        text: t('Eleven entries with amount, reason, outlet and cost.', 'Elf Einträge mit Menge, Grund, Outlet und Kosten.', 'أحد عشر إدخالًا بالكمية والسبب والمنفذ والتكلفة.', 'Undici voci con quantità, motivo, punto vendita e costo.'),
      },
    ],
  },
  stock: {
    spots: [
      {
        label: t('Critical, low, fine', 'Critical, low, fine', 'Critical وlow وfine', 'Critical, low, fine'),
        text: t('5 critical, 10 low, 48 fine, with Start count beside them.', '5 critical, 10 low, 48 fine, daneben Start count.', '5 حرجة و10 منخفضة و48 جيدة، وبجانبها Start count.', '5 critical, 10 low, 48 fine, con accanto Start count.'),
      },
      {
        label: t('Critical items', 'Kritische Artikel', 'الأصناف الحرجة', 'Articoli critici'),
        text: t('An order placed today would arrive too late. Each item shows what is left and when it runs out.', 'Eine heutige Bestellung käme zu spät. Jeder Artikel zeigt den Rest und wann er ausgeht.', 'طلب يُرسل اليوم سيصل متأخرًا. يبيّن كل صنف ما بقي ومتى ينفد.', 'Un ordine di oggi arriverebbe troppo tardi. Ogni articolo mostra cosa resta e quando finisce.'),
      },
      {
        label: t('Stock count', 'Zählung', 'الجرد', 'Conteggio'),
        text: t('The expected amount is filled in. Change it only if it differs, then go to the next item.', 'Die erwartete Menge ist eingetragen. Nur ändern, wenn sie abweicht, dann zum nächsten Artikel.', 'الكمية المتوقعة مُدخلة. غيّرها فقط إن اختلفت، ثم انتقل إلى الصنف التالي.', 'La quantità prevista è già inserita. Cambiala solo se è diversa, poi passa all’articolo successivo.'),
      },
    ],
  },
  forecasting: {
    spots: [
      {
        label: t('Order today', 'Heute bestellen', 'اطلب اليوم', 'Ordina oggi'),
        text: t('Five items to order today, each with the amount and what it costs.', 'Fünf Artikel für heute, jeweils mit Menge und Kosten.', 'خمسة أصناف للطلب اليوم، لكلٍّ منها الكمية والتكلفة.', 'Cinque articoli da ordinare oggi, ognuno con quantità e costo.'),
      },
      {
        label: t('To month end', 'Bis Monatsende', 'حتى نهاية الشهر', 'A fine mese'),
        text: t('AED 310.7k to 31 October, 51 items to order, next order today.', 'AED 310,7k bis 31. Oktober, 51 Artikel, nächste Bestellung heute.', '310.7 ألف درهم حتى 31 أكتوبر، 51 صنفًا، والطلب التالي اليوم.', 'AED 310,7k fino al 31 ottobre, 51 articoli, prossimo ordine oggi.'),
      },
      {
        label: t('How it is calculated', 'So wird gerechnet', 'طريقة الحساب', 'Come si calcola'),
        text: t('10,994 forecast covers, 1 event and the last 4 weeks of usage. Confidence high.', '10.994 erwartete Gedecke, 1 Veranstaltung und der Verbrauch der letzten 4 Wochen. Sicherheit hoch.', '10,994 ضيفًا متوقعًا وفعالية واحدة واستهلاك آخر 4 أسابيع. الثقة عالية.', '10.994 coperti previsti, 1 evento e i consumi delle ultime 4 settimane. Affidabilità alta.'),
      },
      {
        label: t('Build order', 'Build order', 'Build order', 'Build order'),
        text: t('One draft of 51 items from 6 suppliers. Nothing is sent until it is approved.', 'Ein Entwurf mit 51 Artikeln von 6 Lieferanten. Nichts wird ohne Freigabe gesendet.', 'مسودة واحدة من 51 صنفًا و6 مورّدين. لا يُرسل شيء قبل الاعتماد.', 'Una bozza di 51 articoli da 6 fornitori. Nulla viene inviato prima dell’approvazione.'),
      },
    ],
  },
  revenue: {
    spots: [
      {
        label: t('Revenue and profit', 'Umsatz und Gewinn', 'الإيرادات والربح', 'Ricavi e profitto'),
        text: t('Revenue and estimated profit over the last 14 days, on one chart.', 'Umsatz und geschätzter Gewinn der letzten 14 Tage in einem Diagramm.', 'الإيرادات والربح المقدّر خلال آخر 14 يومًا في رسم واحد.', 'Ricavi e profitto stimato degli ultimi 14 giorni in un grafico.'),
      },
      {
        label: t('Three totals', 'Drei Summen', 'ثلاثة إجماليات', 'Tre totali'),
        text: t('Today so far, the last 7 days and the last 30 days, each with its change and estimated profit.', 'Heute bisher, die letzten 7 und 30 Tage, jeweils mit Veränderung und geschätztem Gewinn.', 'اليوم حتى الآن وآخر 7 أيام وآخر 30 يومًا، ولكلٍّ منها التغيّر والربح المقدّر.', 'Oggi finora, ultimi 7 e ultimi 30 giorni, ognuno con variazione e profitto stimato.'),
      },
      {
        label: t('By outlet', 'Nach Outlet', 'حسب المنفذ', 'Per punto vendita'),
        text: t('Five outlets, 7 to 13 October, with revenue, cost and net profit estimates.', 'Fünf Outlets, 7. bis 13. Oktober, mit Umsatz sowie geschätzten Kosten und Nettogewinn.', 'خمسة منافذ، من 7 إلى 13 أكتوبر، بالإيرادات وتقديرات التكلفة وصافي الربح.', 'Cinque punti vendita, dal 7 al 13 ottobre, con ricavi e stime di costi e utile netto.'),
      },
    ],
  },
  finance: {
    spots: [
      {
        label: t('Supplier invoices', 'Lieferantenrechnungen', 'فواتير الموردين', 'Fatture fornitori'),
        text: t('Invoice, supplier, date, total, difference and status, with 23 to review.', 'Rechnung, Lieferant, Datum, Summe, Abweichung und Status, 23 zu prüfen.', 'الفاتورة والمورّد والتاريخ والإجمالي والفرق والحالة، و23 للمراجعة.', 'Fattura, fornitore, data, totale, differenza e stato, con 23 da rivedere.'),
      },
      {
        label: t('One invoice', 'Eine Rechnung', 'فاتورة واحدة', 'Una fattura'),
        text: t('Ordered AED 6,262, received AED 5,898, invoiced AED 6,262. The list shows why: 2 kg more invoiced than received.', 'Bestellt AED 6.262, erhalten AED 5.898, berechnet AED 6.262. Die Liste zeigt warum: 2 kg mehr berechnet als erhalten.', 'المطلوب 6,262 درهمًا، والمستلم 5,898، والمفوتر 6,262. وتبيّن القائمة السبب: 2 كغ مفوترة زيادة على المستلم.', 'Ordinato AED 6.262, ricevuto AED 5.898, fatturato AED 6.262. L’elenco spiega perché: 2 kg fatturati in più del ricevuto.'),
      },
      {
        label: t('Your decision', 'Ihre Entscheidung', 'قرارك', 'La tua decisione'),
        text: t('Flag the difference, request a correction, or approve with the difference accepted. Approving needs a note saying why.', 'Abweichung markieren, Korrektur anfordern oder mit akzeptierter Abweichung freigeben. Die Freigabe braucht eine Notiz mit der Begründung.', 'أشر إلى الفرق أو اطلب تصحيحًا أو اعتمد مع قبول الفرق. ويتطلب الاعتماد ملاحظة تبيّن السبب.', 'Segnala la differenza, chiedi una correzione o approva accettando la differenza. L’approvazione richiede una nota che spieghi perché.'),
      },
    ],
  },
  pour: {
    spots: [
      {
        label: t('Missing drinks', 'Fehlende Getränke', 'المشروبات المفقودة', 'Bevande mancanti'),
        text: t('What was sold against what was actually used, and what the gap is worth.', 'Was verkauft wurde gegenüber dem tatsächlichen Verbrauch, und was die Lücke wert ist.', 'ما بيع مقابل ما استُخدم فعليًا، وقيمة الفرق.', 'Il venduto rispetto a ciò che è stato usato, e quanto vale la differenza.'),
      },
      {
        label: t('Over pouring', 'Zu viel eingeschenkt', 'الإفراط في السكب', 'Versato in eccesso'),
        text: t('Wine by the glass: 61 glasses not billed this week, worth AED 3,433.', 'Wein im Glas: 61 Gläser diese Woche nicht berechnet, Wert AED 3.433.', 'النبيذ بالكأس: 61 كأسًا غير مفوترة هذا الأسبوع بقيمة 3,433 درهمًا.', 'Vino al calice: 61 calici non fatturati questa settimana, per AED 3.433.'),
      },
      {
        label: t('Where and when', 'Wo und wann', 'أين ومتى', 'Dove e quando'),
        text: t('By outlet and shift, with no names.', 'Nach Outlet und Schicht, ohne Namen.', 'حسب المنفذ والوردية، من دون أسماء.', 'Per punto vendita e turno, senza nomi.'),
      },
      {
        label: t('All patterns', 'Alle Muster', 'كل الأنماط', 'Tutti i pattern'),
        text: t('Patterns over the last 4 weeks, with the money involved.', 'Muster der letzten 4 Wochen, mit dem betroffenen Betrag.', 'الأنماط خلال آخر 4 أسابيع مع المبالغ المعنية.', 'I pattern delle ultime 4 settimane, con gli importi.'),
      },
    ],
  },
};
