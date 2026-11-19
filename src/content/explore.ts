// The chapters of each solution's film: what the viewer is watching at that moment, in the visitor's language.
// Every sentence describes only what the film shows. Times are in `film.json`, written when the films are recorded
// (19 Nov 2026, from the demo's feature/purchasing-stock-control, Grand Hotel Lumière, in the demo's own language).

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
        text: t('The item, then the amount. Saved straight away, with Undo.', 'Artikel, dann Menge. Sofort gespeichert, mit Rückgängig.', 'الصنف ثم الكمية. يُحفظ فورًا، مع إمكانية التراجع.', 'L’articolo, poi la quantità. Salvato subito, con Annulla.'),
      },
      {
        label: t('This week', 'Diese Woche', 'هذا الأسبوع', 'Questa settimana'),
        text: t('Waste and breakage against last week, and the top reason.', 'Abfall und Bruch gegen die Vorwoche, und der häufigste Grund.', 'الهدر والكسر مقابل الأسبوع الماضي، والسبب الأكثر تكرارًا.', 'Sprechi e rotture contro la settimana scorsa, e il motivo principale.'),
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
        label: t('Critical, low, fine', 'Kritisch, niedrig, in Ordnung', 'حرج، منخفض، جيد', 'Critico, basso, a posto'),
        text: t('Your whole stock, at a glance.', 'Ihr ganzer Bestand, auf einen Blick.', 'مخزونك كله بنظرة واحدة.', 'Tutta la merce, a colpo d’occhio.'),
      },
      {
        label: t('Critical items', 'Kritische Artikel', 'الأصناف الحرجة', 'Articoli critici'),
        text: t('What runs out before a new order arrives.', 'Was ausgeht, bevor eine neue Bestellung ankommt.', 'ما ينفد قبل وصول طلب جديد.', 'Cosa finisce prima che arrivi un nuovo ordine.'),
      },
      {
        label: t('Missing stock', 'Fehlender Bestand', 'المخزون المفقود', 'Scorte mancanti'),
        text: t('Used beyond what sales and recipes explain.', 'Verbraucht über das hinaus, was Verkäufe und Rezepte erklären.', 'ما استُخدم بما يتجاوز ما تفسّره المبيعات والوصفات.', 'Usato oltre quanto spiegano vendite e ricette.'),
      },
      {
        label: t('Expiring soon', 'Läuft bald ab', 'ينتهي قريبًا', 'In scadenza'),
        text: t('What expires, and what to do with it.', 'Was abläuft, und was damit zu tun ist.', 'ما تنتهي صلاحيته، وماذا تفعل به.', 'Cosa scade, e cosa farne.'),
      },
    ],
  },
  forecasting: {
    spots: [
      {
        label: t('Order these first', 'Zuerst bestellen', 'اطلب هذه أولًا', 'Ordina prima questi'),
        text: t('Grouped by supplier, with the reasoning beside each quantity.', 'Nach Lieferant, mit der Begründung neben jeder Menge.', 'مجمّعة حسب المورد، مع التعليل بجانب كل كمية.', 'Per fornitore, con il ragionamento accanto a ogni quantità.'),
      },
      {
        label: t('How it is calculated', 'So wird gerechnet', 'طريقة الحساب', 'Come si calcola'),
        text: t('Guests, bookings, events and the last 4 weeks of use.', 'Gäste, Buchungen, Events und der Verbrauch der letzten 4 Wochen.', 'الضيوف والحجوزات والفعاليات واستهلاك آخر 4 أسابيع.', 'Ospiti, prenotazioni, eventi e consumi delle ultime 4 settimane.'),
      },
      {
        label: t('Automatic ordering', 'Automatische Bestellung', 'الطلب التلقائي', 'Ordine automatico'),
        text: t('What Tyll ordered at 06:00, and what waits.', 'Was Tyll um 06:00 bestellt hat, und was wartet.', 'ما طلبه Tyll في 06:00، وما ينتظر.', 'Cosa ha ordinato Tyll alle 06:00, e cosa attende.'),
      },
      {
        label: t('The rules', 'Die Regeln', 'القواعد', 'Le regole'),
        text: t('Written out, so anyone can check them.', 'Ausgeschrieben, damit jeder sie prüfen kann.', 'مكتوبة ليتحقق منها أي شخص.', 'Scritte per esteso, così chiunque può controllarle.'),
      },
    ],
  },
  revenue: {
    spots: [
      {
        label: t('Last 7 days', 'Letzte 7 Tage', 'آخر 7 أيام', 'Ultimi 7 giorni'),
        text: t('Revenue, estimated operating contribution and guests.', 'Umsatz, geschätzter Betriebsbeitrag und Gäste.', 'الإيرادات والمساهمة التشغيلية التقديرية والضيوف.', 'Ricavi, contributo operativo stimato e ospiti.'),
      },
      {
        label: t('Day by day', 'Tag für Tag', 'يومًا بيوم', 'Giorno per giorno'),
        text: t('Revenue and operating contribution, per day.', 'Umsatz und Betriebsbeitrag pro Tag.', 'الإيرادات والمساهمة التشغيلية لكل يوم.', 'Ricavi e contributo operativo, giorno per giorno.'),
      },
      {
        label: t('By outlet', 'Nach Outlet', 'حسب المنفذ', 'Per punto vendita'),
        text: t('Every outlet’s revenue, estimated cost and estimated operating contribution.', 'Umsatz, geschätzte Kosten und geschätzter Betriebsbeitrag jedes Outlets.', 'إيرادات كل منفذ وتكلفته التقديرية ومساهمته التشغيلية التقديرية.', 'Ricavi, costi stimati e contributo operativo stimato di ogni punto vendita.'),
      },
    ],
  },
  finance: {
    spots: [
      {
        label: t('Deliveries and invoices', 'Lieferungen und Rechnungen', 'التوريدات والفواتير', 'Consegne e fatture'),
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
      {
        label: t('Cash per shift', 'Bargeld je Schicht', 'النقد لكل وردية', 'Contanti per turno'),
        text: t('Counted cash against the cash sales on the till.', 'Gezähltes Bargeld gegen die Barumsätze der Kasse.', 'النقد المعدود مقابل المبيعات النقدية في الصندوق.', 'Contanti contati contro le vendite in contanti della cassa.'),
      },
    ],
  },
  pour: {
    spots: [
      {
        label: t('Not billed', 'Nicht berechnet', 'غير مفوتر', 'Non fatturato'),
        text: t('What the bars poured and never billed this week.', 'Was die Bars diese Woche ausgeschenkt und nie berechnet haben.', 'ما سكبته البارات هذا الأسبوع ولم يُفوتر.', 'Cosa hanno versato i bar questa settimana senza fatturarlo.'),
      },
      {
        label: t('By the glass', 'Im Glas', 'بالكأس', 'Al calice'),
        text: t('Glasses each bottle gave, and the gap.', 'Gläser je Flasche, und die Lücke.', 'الكؤوس التي أعطتها كل زجاجة، والفرق.', 'I calici di ogni bottiglia, e la differenza.'),
      },
      {
        label: t('Who was on', 'Wer im Dienst war', 'من كان في الوردية', 'Chi era in turno'),
        text: t('Each day against the rota, tested against chance.', 'Jeder Tag neben dem Dienstplan, gegen den Zufall geprüft.', 'كل يوم مقابل جدول المناوبات، مختبرًا مقابل الصدفة.', 'Ogni giorno accanto ai turni, verificato contro il caso.'),
      },
      {
        label: t('All patterns', 'Alle Muster', 'جميع الأنماط', 'Tutti gli schemi'),
        text: t('The biggest gaps of the last 4 weeks.', 'Die größten Lücken der letzten 4 Wochen.', 'أكبر الفروق في آخر 4 أسابيع.', 'Le differenze maggiori delle ultime 4 settimane.'),
      },
    ],
  },
};
