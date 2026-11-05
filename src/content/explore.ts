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
        text: t('Choose the item. Two taps.', 'Artikel wählen. Zwei Tipps.', 'اختر الصنف. نقرتان فقط.', 'Scegli l’articolo. Due tocchi.'),
      },
      {
        label: t('Lost today', 'Heutiger Verlust', 'خسارة اليوم', 'Perso oggi'),
        text: t('Today’s loss, at a glance.', 'Der heutige Verlust, auf einen Blick.', 'خسارة اليوم بنظرة واحدة.', 'La perdita di oggi, a colpo d’occhio.'),
      },
      {
        label: t('Today’s log', 'Heutiges Protokoll', 'سجل اليوم', 'Registro di oggi'),
        text: t('Every entry, with its cost.', 'Jeder Eintrag, mit seinen Kosten.', 'كل إدخال مع تكلفته.', 'Ogni voce, con il suo costo.'),
      },
    ],
  },
  stock: {
    spots: [
      {
        label: t('Critical, low, fine', 'Critical, low, fine', 'Critical وlow وfine', 'Critical, low, fine'),
        text: t('Your whole stock, at a glance.', 'Ihr ganzer Bestand, auf einen Blick.', 'مخزونك كله بنظرة واحدة.', 'Tutta la merce, a colpo d’occhio.'),
      },
      {
        label: t('Critical items', 'Kritische Artikel', 'الأصناف الحرجة', 'Articoli critici'),
        text: t('What runs out before a new order arrives.', 'Was ausgeht, bevor eine neue Bestellung ankommt.', 'ما ينفد قبل وصول طلب جديد.', 'Cosa finisce prima che arrivi un nuovo ordine.'),
      },
      {
        label: t('Stock count', 'Zählung', 'الجرد', 'Conteggio'),
        text: t('The expected amount is filled in. Just confirm.', 'Die erwartete Menge ist eingetragen. Nur bestätigen.', 'الكمية المتوقعة مُدخلة. ما عليك إلا التأكيد.', 'La quantità prevista è già inserita. Basta confermare.'),
      },
    ],
  },
  forecasting: {
    spots: [
      {
        label: t('Order today', 'Heute bestellen', 'اطلب اليوم', 'Ordina oggi'),
        text: t('What to order today, and the cost.', 'Was heute zu bestellen ist, mit den Kosten.', 'ماذا تطلب اليوم وبكم.', 'Cosa ordinare oggi, e il costo.'),
      },
      {
        label: t('To month end', 'Bis Monatsende', 'حتى نهاية الشهر', 'A fine mese'),
        text: t('The cost through to month end.', 'Die Kosten bis Monatsende.', 'التكلفة حتى نهاية الشهر.', 'Il costo fino a fine mese.'),
      },
      {
        label: t('How it is calculated', 'So wird gerechnet', 'طريقة الحساب', 'Come si calcola'),
        text: t('Built from covers, events and usage.', 'Aus Gedecken, Events und Verbrauch.', 'مبني على الأغطية والفعاليات والاستهلاك.', 'Da coperti, eventi e consumi.'),
      },
      {
        label: t('Build order', 'Build order', 'Build order', 'Build order'),
        text: t('One draft. Nothing is sent until you approve.', 'Ein Entwurf. Nichts geht raus ohne Ihre Freigabe.', 'مسودة واحدة. لا يُرسل شيء قبل موافقتك.', 'Una bozza. Nulla parte senza la tua approvazione.'),
      },
    ],
  },
  revenue: {
    spots: [
      {
        label: t('Revenue and profit', 'Umsatz und Gewinn', 'الإيرادات والربح', 'Ricavi e profitto'),
        text: t('Revenue and estimated profit, side by side.', 'Umsatz und geschätzter Gewinn, nebeneinander.', 'الإيرادات والربح التقديري جنبًا إلى جنب.', 'Ricavi e profitto stimato, fianco a fianco.'),
      },
      {
        label: t('Three totals', 'Drei Summen', 'ثلاثة إجماليات', 'Tre totali'),
        text: t('Today, 7 days and 30 days.', 'Heute, 7 Tage und 30 Tage.', 'اليوم و7 أيام و30 يومًا.', 'Oggi, 7 giorni e 30 giorni.'),
      },
      {
        label: t('By outlet', 'Nach Outlet', 'حسب المنفذ', 'Per punto vendita'),
        text: t('Every outlet’s revenue, cost and profit.', 'Umsatz, Kosten und Gewinn jedes Outlets.', 'إيرادات كل منفذ وتكلفته وربحه.', 'Ricavi, costi e profitto di ogni punto vendita.'),
      },
    ],
  },
  finance: {
    spots: [
      {
        label: t('Supplier invoices', 'Lieferantenrechnungen', 'فواتير الموردين', 'Fatture fornitori'),
        text: t('Every invoice with a difference.', 'Jede Rechnung mit einer Abweichung.', 'كل فاتورة بها فرق.', 'Ogni fattura con una differenza.'),
      },
      {
        label: t('One invoice', 'Eine Rechnung', 'فاتورة واحدة', 'Una fattura'),
        text: t('Ordered, received and invoiced, side by side.', 'Bestellt, erhalten und berechnet, nebeneinander.', 'المطلوب والمستلم والمفوتر جنبًا إلى جنب.', 'Ordinato, ricevuto e fatturato, fianco a fianco.'),
      },
      {
        label: t('Your decision', 'Ihre Entscheidung', 'قرارك', 'La tua decisione'),
        text: t('Flag it, correct it or approve it.', 'Markieren, korrigieren oder freigeben.', 'أشر إليها أو صحّحها أو اعتمدها.', 'Segnala, correggi o approva.'),
      },
    ],
  },
  pour: {
    spots: [
      {
        label: t('Missing drinks', 'Fehlende Getränke', 'المشروبات المفقودة', 'Bevande mancanti'),
        text: t('Sold against actually used.', 'Verkauft gegenüber tatsächlich verbraucht.', 'المبيع مقابل المستخدم فعليًا.', 'Venduto contro usato davvero.'),
      },
      {
        label: t('Over pouring', 'Zu viel eingeschenkt', 'الإفراط في السكب', 'Versato in eccesso'),
        text: t('Glasses not billed, and what they cost.', 'Nicht berechnete Gläser, und was sie kosten.', 'الكؤوس غير المفوترة وتكلفتها.', 'I calici non fatturati, e quanto costano.'),
      },
      {
        label: t('Where and when', 'Wo und wann', 'أين ومتى', 'Dove e quando'),
        text: t('By outlet and shift, with no names.', 'Nach Outlet und Schicht, ohne Namen.', 'حسب المنفذ والوردية، من دون أسماء.', 'Per punto vendita e turno, senza nomi.'),
      },
      {
        label: t('All patterns', 'Alle Muster', 'كل الأنماط', 'Tutti i pattern'),
        text: t('The biggest gaps of the last 4 weeks.', 'Die größten Lücken der letzten 4 Wochen.', 'أكبر الفروق في آخر 4 أسابيع.', 'Le differenze maggiori delle ultime 4 settimane.'),
      },
    ],
  },
};
