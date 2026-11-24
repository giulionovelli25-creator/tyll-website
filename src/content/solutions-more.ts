// More in Tyll (round 4, 24 Nov 2026): Revenue and reports and Suppliers. They keep their pages and are linked as
// "More in Tyll" under the Solutions cards and in the footer, not in the Solutions menu.
import type { Solution } from './solutions';
import pageRevenue from '../assets/photos/revenue-payment.jpg';
import pageSuppliers from '../assets/photos/stock-chef.jpg';
import tileRevenue from '../assets/photos/revenue-payment.jpg';
import tileSuppliers from '../assets/photos/predictions-delivery.jpg';

const t = (en: string, de: string, ar: string, it: string) => ({ en, de, ar, it });

export const moreInTyll: Record<'revenue' | 'suppliers', Solution> = {
  revenue: {
    key: 'revenue',
    icon: 'revenue',
    tone: 'violet',
    mark: t('money', 'Geld', 'المال', 'guadagnare'),
    pagePhoto: pageRevenue,
    pagePhotoFocus: '50% 4%',
    proof: {kind: 'faq', id: 'outlets'},
    name: t('Revenue and reports', 'Umsatz und Berichte', 'الإيرادات والتقارير', 'Ricavi e report'),
    menu: t('See which outlet earns most, and every report.', 'Sehen, welches Outlet am meisten verdient, und jeder Bericht.', 'اعرف أي منفذ يكسب أكثر، وكل التقارير.', 'Vedi quale punto vendita guadagna di più, e ogni report.'),
    headline: t('Which outlet really makes you money?', 'Welches Outlet bringt wirklich Geld?', 'أي منفذ يحقق لك المال فعلًا؟', 'Quale punto vendita ti fa guadagnare davvero?'),
    intro: t('Revenue and estimated operating contribution, by day and by outlet.', 'Umsatz und geschätzter Betriebsbeitrag, nach Tag und Outlet.', 'الإيرادات والمساهمة التشغيلية التقديرية حسب اليوم والمنفذ.', 'Ricavi e contributo operativo stimato, per giorno e punto vendita.'),
    see: [
      { title: t('Revenue and estimated cost by outlet', 'Umsatz und geschätzte Kosten je Outlet', 'الإيرادات والتكلفة التقديرية لكل منفذ', 'Ricavi e costi stimati per punto vendita'), text: t('For today, yesterday, 7 days, 30 days or a custom range.', 'Für heute, gestern, 7 Tage, 30 Tage oder einen eigenen Zeitraum.', 'لليوم أو الأمس أو 7 أيام أو 30 يومًا أو فترة تختارها.', 'Per oggi, ieri, 7 giorni, 30 giorni o un periodo a scelta.') },
      { title: t('What each dish earns', 'Was jedes Gericht einbringt', 'ما يكسبه كل طبق', 'Quanto rende ogni piatto'), text: t('Units sold, margin per dish, and which margins are falling.', 'Verkaufte Einheiten, Marge pro Gericht und welche Margen sinken.', 'الوحدات المبيعة، والهامش لكل طبق، وأي الهوامش تتراجع.', 'Unità vendute, margine per piatto e quali margini stanno calando.') },
      { title: t('Budget against actual', 'Budget gegen Ist', 'الميزانية مقابل الفعلي', 'Budget contro consuntivo'), text: t('By department: which ones are over or under their budget.', 'Je Abteilung: welche über oder unter ihrem Budget liegen.', 'لكل قسم: أيها فوق ميزانيته أو دونها.', 'Per reparto: quali sono sopra o sotto il budget.') },
    ],
    more: [
      {
        points: [
          t('All transactions, searchable by day.', 'Alle Transaktionen, nach Tag durchsuchbar.', 'كل المعاملات، قابلة للبحث حسب اليوم.', 'Tutte le transazioni, consultabili per giorno.'),
        ],
        foot: t('Every operating contribution figure is an estimate: labour comes from rostered hours and overheads are allocated.', 'Jeder Betriebsbeitrag ist eine Schätzung: Die Personalkosten kommen aus den geplanten Stunden, und die Gemeinkosten werden umgelegt.', 'كل رقم للمساهمة التشغيلية تقديري: تكلفة العمالة مأخوذة من ساعات جدول المناوبات، والتكاليف العامة موزّعة.', 'Ogni contributo operativo è una stima: il costo del personale deriva dalle ore dei turni e i costi generali sono ripartiti.'),
      },
    ],
    photo: tileRevenue,
    photoFocus: '50% 30%',
    tilePoints: [
      t('Revenue and estimated contribution per outlet.', 'Umsatz und geschätzter Beitrag je Outlet.', 'الإيرادات والمساهمة التقديرية لكل منفذ.', 'Ricavi e contributo stimato per punto vendita.'),
      t('What each dish sells and earns.', 'Was jedes Gericht verkauft und einbringt.', 'ما يبيعه كل طبق وما يكسبه.', 'Cosa vende e quanto rende ogni piatto.'),
      t('Budget against actual, and every report as PDF or CSV.', 'Budget gegen Ist, und jeder Bericht als PDF oder CSV.', 'الميزانية مقابل الفعلي، وكل تقرير بصيغة PDF أو CSV.', 'Budget contro consuntivo, e ogni report in PDF o CSV.'),
    ],
    rows: [
      {
        id: 'outlets',
        icon: 'revenue',
        film: 'revenue-outlets',
        name: t('Revenue by outlet', 'Umsatz pro Outlet', 'الإيرادات لكل منفذ', 'Ricavi per punto vendita'),
        line: t('Revenue and estimated contribution, outlet by outlet.', 'Umsatz und geschätzter Deckungsbeitrag, Outlet für Outlet.', 'الإيرادات والمساهمة التقديرية، منفذًا بمنفذ.', 'Ricavi e contributo stimato, punto vendita per punto vendita.'),
        points: [
          t('Revenue, estimated cost, estimated operating contribution and gross margin per outlet.', 'Umsatz, geschätzte Kosten, geschätzter Betriebsbeitrag und Bruttomarge je Outlet.', 'الإيرادات والتكلفة التقديرية والمساهمة التشغيلية التقديرية وهامش الربح الإجمالي لكل منفذ.', 'Ricavi, costi stimati, contributo operativo stimato e margine lordo per punto vendita.'),
          t('Guests and average bill.', 'Gäste und durchschnittliche Rechnung.', 'عدد الضيوف ومتوسط الفاتورة.', 'Ospiti e conto medio.'),
        ],
      },
      {
        id: 'menu',
        icon: 'revenue',
        film: 'revenue-menu',
        name: t('Menu performance', 'Menüleistung', 'أداء القائمة', 'Rendimento del menu'),
        line: t('What each dish sells and earns.', 'Was jedes Gericht verkauft und einbringt.', 'ما يبيعه كل طبق وما يكسبه.', 'Cosa vende e quanto rende ogni piatto.'),
        points: [
          t('Menu performance: units sold, margin per dish, and which margins are falling.', 'Menüleistung: verkaufte Einheiten, Marge pro Gericht und welche Margen sinken.', 'أداء القائمة: الوحدات المبيعة، والهامش لكل طبق، وأي الهوامش تتراجع.', 'Rendimento del menu: unità vendute, margine per piatto e quali margini stanno calando.'),
          t('Margins use each item’s recipe cost on the day it was sold.', 'Margen nutzen die Rezeptkosten jedes Artikels am Verkaufstag.', 'تعتمد الهوامش على تكلفة وصفة كل صنف في يوم بيعه.', 'I margini usano il costo di ricetta di ogni articolo nel giorno della vendita.'),
        ],
      },
      {
        id: 'reports',
        icon: 'reports',
        film: 'revenue-reports',
        name: t('Budgets and reports', 'Budgets und Berichte', 'الميزانيات والتقارير', 'Budget e report'),
        line: t('Budget against actual, and every report.', 'Budget gegen Ist, und jeder Bericht.', 'الميزانية مقابل الفعلي، وكل تقرير.', 'Budget contro consuntivo, e ogni report.'),
        points: [
          t('Department spending: where the money went, by department and category.', 'Ausgaben je Abteilung: wohin das Geld ging, nach Abteilung und Kategorie.', 'إنفاق الأقسام: أين ذهب المال، حسب القسم والفئة.', 'Spesa per reparto: dove sono andati i soldi, per reparto e categoria.'),
          t('Sales and operational summary: revenue, direct costs and estimated contribution.', 'Umsatz- und Betriebsübersicht: Umsatz, direkte Kosten und geschätzter Beitrag.', 'ملخص المبيعات والتشغيل: الإيرادات والتكاليف المباشرة والمساهمة التقديرية.', 'Riepilogo vendite e operativo: ricavi, costi diretti e contributo stimato.'),
          t('Recipes and costs, item history and the Cases, ready to print.', 'Rezepte und Kosten, Artikelhistorie und die Fälle, druckfertig.', 'الوصفات والتكاليف وسجل الأصناف والحالات، جاهزة للطباعة.', 'Ricette e costi, storico articoli e la Casi, pronti da stampare.'),
          t('Each hotel is shown in its own currency.', 'Jedes Hotel wird in seiner eigenen Währung gezeigt.', 'يُعرض كل فندق بعملته الخاصة.', 'Ogni hotel è mostrato nella sua valuta.'),
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
    rows: [
      {
        id: 'catalogue',
        icon: 'suppliers',
        film: 'suppliers-catalogue',
        name: t('Catalogue and agreed prices', 'Katalog und vereinbarte Preise', 'الكتالوج والأسعار المتفق عليها', 'Catalogo e prezzi concordati'),
        line: t('A second supplier for most items.', 'Ein zweiter Lieferant für die meisten Artikel.', 'مورّد ثانٍ لمعظم الأصناف.', 'Un secondo fornitore per la maggior parte degli articoli.'),
        points: [
          t('A catalogue per supplier with agreed prices, and a second supplier for most items. Tyll flags when the last invoice is above the agreed contract price.', 'Ein Katalog je Lieferant mit vereinbarten Preisen und einem zweiten Lieferanten für die meisten Artikel. Tyll markiert, wenn die letzte Rechnung über dem vereinbarten Vertragspreis liegt.', 'كتالوج لكل مورد بالأسعار المتفق عليها، ومورد ثانٍ لمعظم الأصناف. ويشير Tyll إلى آخر فاتورة تتجاوز سعر العقد المتفق عليه.', 'Un catalogo per fornitore con i prezzi concordati, e un secondo fornitore per la maggior parte degli articoli. Tyll segnala quando l’ultima fattura supera il prezzo di contratto.'),
        ],
      },
      {
        id: 'reliability',
        icon: 'deliveries',
        film: 'deliveries-reliability',
        name: t('Supplier reliability', 'Lieferantenzuverlässigkeit', 'موثوقية الموردين', 'Affidabilità dei fornitori'),
        line: t('Who delivers on time, and on which days they don’t.', 'Wer pünktlich liefert, und an welchen Tagen nicht.', 'من يسلّم في الوقت، وفي أي أيام يتأخر.', 'Chi consegna in orario, e in quali giorni no.'),
        points: [
          t('Each supplier’s on-time rate, how late it is when it is late, and the weekdays it runs late.', 'Die Pünktlichkeit jedes Lieferanten, wie spät er ist, wenn er zu spät ist, und an welchen Wochentagen.', 'نسبة التسليم في الوقت لكل مورّد، ومقدار تأخره حين يتأخر، وأيام الأسبوع التي يتأخر فيها.', 'La puntualità di ogni fornitore, quanto ritarda quando ritarda, e in quali giorni della settimana.'),
        ],
      },
    ],
  },
};
