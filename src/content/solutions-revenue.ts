// Revenue and reconciliation: three pages (round 3, 20 Nov 2026). Menu performance and Budgets and reports are rows on Revenue; Cash per shift and the Money Back List on Bill and cash checks; late deliveries and invoice approval on Invoices and deliveries.
import type { Solution } from './solutions';
import pageRevenue from '../assets/photos/revenue-payment.jpg';
import pageBills from '../assets/photos/reconciliation-tickets.jpg';
import pageDeliveries from '../assets/photos/predictions-delivery.jpg';
import tileRevenue from '../assets/photos/revenue-payment.jpg';
import tileBills from '../assets/photos/reconciliation-reception.jpg';
import tileInvoices from '../assets/photos/tyll-problem-1.jpg';

const t = (en: string, de: string, ar: string, it: string) => ({ en, de, ar, it });

export const revenueRecon: Record<'revenue' | 'finance' | 'deliveries', Solution> = {
  revenue: {
    key: 'revenue',
    icon: 'revenue',
    tone: 'violet',
    mark: t('money', 'Geld', 'المال', 'guadagnare'),
    pagePhoto: pageRevenue,
    pagePhotoFocus: '50% 4%',
    proof: { kind: 'faq', id: 'outlets' },
    name: t('Revenue', 'Umsatz', 'الإيرادات', 'Ricavi'),
    menu: t('See which outlet earns most.', 'Sehen, welches Outlet am meisten bringt.', 'اعرف أي منفذ يكسب أكثر.', 'Vedi quale punto vendita rende di più.'),
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
          t('Revenue, estimated cost, estimated operating contribution and gross margin per outlet.', 'Umsatz, geschätzte Kosten, geschätzter Betriebsbeitrag und Bruttomarge je Outlet.', 'الإيرادات والتكلفة التقديرية والمساهمة التشغيلية التقديرية وهامش الربح الإجمالي لكل منفذ.', 'Ricavi, costi stimati, contributo operativo stimato e margine lordo per punto vendita.'),
          t('Guests and average bill.', 'Gäste und durchschnittliche Rechnung.', 'عدد الضيوف ومتوسط الفاتورة.', 'Ospiti e conto medio.'),
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
        id: 'menu',
        icon: 'revenue',
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
        film: 'reports',
        name: t('Budgets and reports', 'Budgets und Berichte', 'الميزانيات والتقارير', 'Budget e report'),
        line: t('Budget against actual, and every report.', 'Budget gegen Ist, und jeder Bericht.', 'الميزانية مقابل الفعلي، وكل تقرير.', 'Budget contro consuntivo, e ogni report.'),
        points: [
          t('Department spending: where the money went, by department and category.', 'Ausgaben je Abteilung: wohin das Geld ging, nach Abteilung und Kategorie.', 'إنفاق الأقسام: أين ذهب المال، حسب القسم والفئة.', 'Spesa per reparto: dove sono andati i soldi, per reparto e categoria.'),
          t('Sales and operational summary: revenue, direct costs and estimated contribution.', 'Umsatz- und Betriebsübersicht: Umsatz, direkte Kosten und geschätzter Beitrag.', 'ملخص المبيعات والتشغيل: الإيرادات والتكاليف المباشرة والمساهمة التقديرية.', 'Riepilogo vendite e operativo: ricavi, costi diretti e contributo stimato.'),
          t('Recipes and costs, item history and the Money Back List, ready to print.', 'Rezepte und Kosten, Artikelhistorie und die Rückholliste, druckfertig.', 'الوصفات والتكاليف وسجل الأصناف وقائمة استرداد الأموال، جاهزة للطباعة.', 'Ricette e costi, storico articoli e la Lista recuperi, pronti da stampare.'),
          t('Each hotel is shown in its own currency.', 'Jedes Hotel wird in seiner eigenen Währung gezeigt.', 'يُعرض كل فندق بعملته الخاصة.', 'Ogni hotel è mostrato nella sua valuta.'),
        ],
      },
    ],
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    tone: 'violet',
    mark: t('missing', 'Geld verloren', 'يُفقد المال', 'si perde denaro'),
    pagePhoto: pageBills,
    pagePhotoFocus: '40% 55%',
    proof: { kind: 'story', step: 2 },
    name: t('Bill and cash checks', 'Rechnungs- und Bargeldprüfung', 'تدقيق الفواتير والنقد', 'Controlli su conti e contanti'),
    menu: t('Bills and cash that don’t add up.', 'Rechnungen und Bargeld, die nicht aufgehen.', 'فواتير ونقد لا تتطابق.', 'Conti e contanti che non tornano.'),
    headline: t('Where is money going missing?', 'Wo geht Geld verloren?', 'أين يُفقد المال؟', 'Dove si perde denaro?'),
    intro: t('Bills against tickets, cash against the till. Every flag followed up.', 'Rechnungen gegen Bons, Bargeld gegen die Kasse. Jeder Hinweis wird verfolgt.', 'الفواتير مقابل التذاكر، والنقد مقابل الصندوق. وكل إشارة تُتابَع.', 'Conti contro comande, contanti contro la cassa. Ogni segnalazione seguita.'),
    see: [
      { title: t('Only the bills that break a rule', 'Nur Rechnungen, die gegen eine Regel verstoßen', 'فقط الفواتير التي تخالف قاعدة', 'Solo i conti che violano una regola'), text: t('Rules agreed with your hotel at the start.', 'Regeln, die zu Beginn mit Ihrem Hotel vereinbart werden.', 'قواعد يُتفق عليها مع فندقك منذ البداية.', 'Regole concordate con il tuo hotel all’inizio.') },
      { title: t('Cash per shift', 'Bargeld je Schicht', 'النقد لكل وردية', 'Contanti per turno'), text: t('Per outlet and shift, counted cash against the cash bills on the till.', 'Je Outlet und Schicht: gezähltes Bargeld gegen die Barrechnungen der Kasse.', 'لكل منفذ ووردية: النقد المعدود مقابل الفواتير النقدية في الصندوق.', 'Per punto vendita e turno: contanti contati contro i conti in contanti della cassa.') },
      { title: t('Every flag to an outcome', 'Jeder Hinweis bis zum Ergebnis', 'كل إشارة حتى نتيجتها', 'Ogni segnalazione fino all’esito'), text: t('Legitimate correction, confirmed loss, revenue recovered or no finding.', 'Berechtigte Korrektur, bestätigter Verlust, zurückgeholter Umsatz oder kein Befund.', 'تصحيح مشروع، أو خسارة مؤكدة، أو إيراد مسترد، أو لا نتيجة.', 'Correzione legittima, perdita confermata, ricavo recuperato o nessun riscontro.') },
    ],
    more: [
      {
        title: t('Bills', 'Gästerechnungen', 'فواتير الضيوف', 'Conti'),
        lead: t('Tyll flags the bills that break the rules agreed with your hotel:', 'Tyll markiert Gästerechnungen, die gegen die mit Ihrem Hotel vereinbarten Regeln verstoßen:', 'يشير Tyll إلى فواتير الضيوف التي تخالف القواعد المتفق عليها مع فندقك:', 'Tyll segnala i conti che violano le regole concordate con il tuo hotel:'),
        points: [
          t('Items removed after the ticket went to the kitchen or bar, without approval', 'Posten, die nach dem Bon an Küche oder Bar ohne Freigabe entfernt wurden', 'أصناف حُذفت بعد إرسال التذكرة إلى المطبخ أو البار دون موافقة', 'Articoli tolti dopo l’invio della comanda a cucina o bar, senza approvazione'),
          t('Items prepared but not charged', 'Zubereitete, aber nicht berechnete Posten', 'أصناف حُضّرت ولم تُحتسب', 'Articoli preparati ma non addebitati'),
          t('Order and bill that differ', 'Bestellung und Rechnung, die voneinander abweichen', 'طلب وفاتورة مختلفان', 'Ordine e conto che non coincidono'),
          t('Unexplained voids', 'Unerklärte Stornos', 'إلغاءات غير مبررة', 'Storni non spiegati'),
          t('Discounts above 25%, or with no reason or approval', 'Rabatte über 25 % oder ohne Grund oder Freigabe', 'خصومات تتجاوز 25% أو دون سبب أو موافقة', 'Sconti oltre il 25%, o senza motivo o approvazione'),
          t('Complimentary items above the agreed limit per order', 'Gratisartikel über dem vereinbarten Limit pro Bestellung', 'أصناف مجانية تتجاوز الحد المتفق عليه لكل طلب', 'Omaggi oltre il limite concordato per ordine'),
          t('Refunds above half a bill, late, or with no reason', 'Rückerstattungen über einer halben Rechnung, verspätet oder ohne Grund', 'مبالغ مستردة تتجاوز نصف الفاتورة، أو متأخرة، أو دون سبب', 'Rimborsi oltre metà conto, tardivi o senza motivo'),
          t('Whole orders cancelled after they were sent', 'Ganze Bestellungen, die nach dem Bonieren storniert wurden', 'طلبات كاملة أُلغيت بعد إرسالها', 'Ordini interi annullati dopo l’invio'),
          t('Usage above sales', 'Verbrauch über den Verkäufen', 'استخدام يتجاوز المبيعات', 'Consumo superiore alle vendite'),
        ],
        foot: t('A flag is a prompt to check, not a finding. Cases can be assigned, closed with an outcome and reopened, and every case lands on the Money Back List.', 'Ein Hinweis ist ein Anlass zur Prüfung, kein Befund. Fälle lassen sich zuweisen, mit Ergebnis abschließen und wieder öffnen, und jeder Fall landet auf der Rückholliste.', 'الإشارة دعوة للتحقق، وليست نتيجة. يمكن إسناد الحالات وإغلاقها بنتيجة وإعادة فتحها، وكل حالة تُضاف إلى قائمة استرداد الأموال.', 'Una segnalazione è un invito a controllare, non un risultato. I casi si possono assegnare, chiudere con un esito e riaprire, e ogni caso finisce nella Lista recuperi.'),
      },
      {
        title: t('How flags are judged', 'Wie Hinweise bewertet werden', 'كيف تُقيَّم الإشارات', 'Come si valutano le segnalazioni'),
        points: [
          t('Flags are counted per 1,000 orders by outlet, so busy and quiet outlets compare fairly.', 'Hinweise werden je 1.000 Bestellungen und Outlet gezählt, so lassen sich volle und ruhige Outlets fair vergleichen.', 'تُحسب الإشارات لكل 1,000 طلب في كل منفذ، فتُقارن المنافذ المزدحمة والهادئة بإنصاف.', 'Le segnalazioni si contano ogni 1.000 ordini per punto vendita, così punti affollati e tranquilli si confrontano in modo equo.'),
          t('A repeated pattern under one till login is flagged: at least 5 cases within 14 days.', 'Ein wiederholtes Muster unter einem Kassenlogin wird markiert: mindestens 5 Fälle in 14 Tagen.', 'يُشار إلى النمط المتكرر تحت حساب دخول واحد في الصندوق: 5 حالات على الأقل خلال 14 يومًا.', 'Uno schema ripetuto sotto un solo login di cassa viene segnalato: almeno 5 casi in 14 giorni.'),
          t('The limits (discount, complimentary items, refunds, late refunds) are agreed with each hotel at the start.', 'Die Grenzen (Rabatt, Gratisartikel, Rückerstattungen, verspätete Rückerstattungen) werden zu Beginn mit jedem Hotel vereinbart.', 'تُتفق الحدود (الخصم والأصناف المجانية والمبالغ المستردة والمبالغ المستردة المتأخرة) مع كل فندق في البداية.', 'I limiti (sconto, omaggi, rimborsi, rimborsi tardivi) si concordano con ogni hotel all’inizio.'),
        ],
      },
    ],
    photo: tileBills,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Bills against kitchen and bar tickets.', 'Rechnungen gegen Küchen- und Barbons.', 'الفواتير مقابل تذاكر المطبخ والبار.', 'Conti contro comande di cucina e bar.'),
      t('Cash in the drawer against cash sales, per shift.', 'Bargeld in der Kasse gegen Barumsätze, je Schicht.', 'النقد في الدرج مقابل المبيعات النقدية، لكل وردية.', 'Contanti nel cassetto contro vendite in contanti, per turno.'),
      t('Every flag gets an owner and an outcome.', 'Jeder Hinweis bekommt eine verantwortliche Person und ein Ergebnis.', 'لكل إشارة مسؤول ونتيجة.', 'Ogni segnalazione ha un responsabile e un esito.'),
    ],
    rows: [
      {
        id: 'cash',
        icon: 'cash',
        film: 'cash',
        name: t('Cash per shift', 'Bargeld je Schicht', 'النقد لكل وردية', 'Contanti per turno'),
        line: t('Cash in the drawer against cash sales.', 'Bargeld in der Kasse gegen Barumsätze.', 'النقد في الدرج مقابل المبيعات النقدية.', 'Contanti nel cassetto contro vendite in contanti.'),
        points: [
          t('Per outlet and per shift: the day shift closes bills before 16:00, the night shift from 16:00 to close.', 'Je Outlet und Schicht: Die Tagschicht schließt Rechnungen vor 16:00, die Nachtschicht ab 16:00 bis Schluss.', 'لكل منفذ ولكل وردية: تُغلق الوردية النهارية الفواتير قبل 16:00، والوردية الليلية من 16:00 حتى الإغلاق.', 'Per punto vendita e per turno: il turno di giorno chiude i conti prima delle 16:00, quello di notte dalle 16:00 alla chiusura.'),
          t('The counted cash is set against the cash bills on the till, net of cash refunds.', 'Das gezählte Bargeld wird den Barrechnungen der Kasse gegenübergestellt, abzüglich Bar-Rückerstattungen.', 'يُقارن النقد المعدود بالفواتير النقدية في الصندوق، بعد خصم المبالغ النقدية المستردة.', 'I contanti contati si confrontano con i conti in contanti della cassa, al netto dei rimborsi in contanti.'),
          t('Small differences (€10, or 1% of the shift’s cash) are not flagged. Each difference can carry a note, for example “tip left in the drawer”.', 'Kleine Differenzen (10 € oder 1 % des Bargelds der Schicht) werden nicht markiert. Jede Differenz kann eine Notiz tragen, zum Beispiel „Trinkgeld in der Kasse gelassen“.', 'لا يُشار إلى الفروق الصغيرة (€10 أو 1% من نقد الوردية). ويمكن إرفاق ملاحظة بكل فرق، مثل «إكرامية تُركت في الدرج».', 'Le piccole differenze (10 € o l’1% dei contanti del turno) non vengono segnalate. Ogni differenza può avere una nota, per esempio «mancia lasciata nel cassetto».'),
        ],
        next: t('A cash difference is something to check with the shift manager, not a finding about anyone.', 'Eine Bargelddifferenz klären Sie mit der Schichtleitung; sie ist kein Befund über eine Person.', 'فرق النقد أمر يُراجع مع مدير الوردية، وليس حكمًا على أي شخص.', 'Una differenza di cassa è da verificare con il responsabile del turno, non un giudizio su qualcuno.'),
      },
      {
        id: 'money-back-list',
        icon: 'cases',
        film: 'cases',
        name: t('Money Back List', 'Rückholliste', 'قائمة استرداد الأموال', 'Lista recuperi'),
        line: t('Every flag, followed up to an outcome.', 'Jeder Hinweis, bis zum Ergebnis verfolgt.', 'كل إشارة تُتابَع حتى نتيجتها.', 'Ogni segnalazione, seguita fino all’esito.'),
        points: [
          t('Cases come from flagged bills and from stock used beyond what sales explain.', 'Fälle entstehen aus markierten Rechnungen und aus Bestand, der über das hinaus verbraucht wurde, was Verkäufe erklären.', 'تأتي الحالات من الفواتير المُعلَّمة ومن مخزون استُخدم بما يتجاوز ما تفسّره المبيعات.', 'I casi nascono dai conti segnalati e dalle scorte usate oltre quanto spiegano le vendite.'),
          t('Filter by type, outcome, who follows it up and date.', 'Filtern nach Art, Ergebnis, verantwortlicher Person und Datum.', 'التصفية حسب النوع والنتيجة والمسؤول والتاريخ.', 'Filtra per tipo, esito, responsabile e data.'),
          t('Cases past their deadline are marked.', 'Fälle nach Ablauf ihrer Frist werden markiert.', 'تُميَّز الحالات التي تجاوزت موعدها النهائي.', 'I casi oltre la scadenza vengono segnalati.'),
          t('Cases are closed with the verified cause and the corrective action, and can be reopened.', 'Fälle werden mit der bestätigten Ursache und der Gegenmaßnahme geschlossen und lassen sich wieder öffnen.', 'تُغلق الحالات مع السبب المؤكَّد والإجراء التصحيحي، ويمكن إعادة فتحها.', 'I casi si chiudono con la causa verificata e l’azione correttiva, e si possono riaprire.'),
        ],
        next: t('A case is a prompt to check, not a finding about anyone.', 'Ein Fall ist ein Anlass zur Prüfung, kein Befund über eine Person.', 'الحالة دعوة للتحقق، وليست حكمًا على أحد.', 'Un caso è uno spunto per verificare, non un giudizio su qualcuno.'),
      },
    ],
    soon: {
      lead: t('Coming next. Checks we are building now:', 'Als Nächstes. Prüfungen, an denen wir gerade arbeiten:', 'قريبًا. عمليات تحقق نعمل على بنائها الآن:', 'In arrivo. Controlli che stiamo costruendo ora:'),
      items: [
        t('Room charges: POS room charges against what was posted to the guest bill (missing, wrong amount, wrong room).', 'Zimmerbelastungen: Zimmerbelastungen aus dem POS gegen die Buchung auf der Gästerechnung (fehlend, falscher Betrag, falsches Zimmer).', 'رسوم الغرف: رسوم الغرف في نظام نقاط البيع مقابل ما سُجّل على فاتورة الضيف (مفقودة، أو بمبلغ خاطئ، أو على غرفة خاطئة).', 'Addebiti in camera: gli addebiti in camera del POS contro quanto registrato sul conto dell’ospite (mancanti, importo sbagliato, camera sbagliata).'),
        t('Bills reopened and changed after payment.', 'Rechnungen, die nach der Zahlung wieder geöffnet und geändert wurden.', 'فواتير أُعيد فتحها وتعديلها بعد الدفع.', 'Conti riaperti e modificati dopo il pagamento.'),
        t('Booked covers against billed covers, per outlet and shift.', 'Gebuchte Gedecke gegen berechnete Gedecke, je Outlet und Schicht.', 'عدد الضيوف المحجوز مقابل عدد الضيوف في الفواتير، لكل منفذ ووردية.', 'Coperti prenotati contro coperti fatturati, per punto vendita e turno.'),
        t('A cheaper item rung up instead of the one served (house wine billed while premium stock drops, single measures billed while doubles are poured).', 'Ein günstigerer Artikel boniert statt des servierten (Hauswein berechnet, während der Premiumbestand sinkt; einfache Maße berechnet, während doppelte ausgeschenkt werden).', 'صنف أرخص يُسجَّل بدل الصنف المقدَّم (مياه عادية تُفوتر بينما ينخفض مخزون المياه الفاخرة، أو حصة صغيرة تُفوتر بينما تُقدَّم حصة كبيرة).', 'Un articolo più economico battuto al posto di quello servito (vino della casa fatturato mentre cala la scorta premium, dosi singole fatturate mentre si versano doppie).'),
        t('Open items, the misc button and manual price overrides.', 'Offene Artikel, die Diverses-Taste und manuelle Preisänderungen.', 'الأصناف المفتوحة، وزر «متفرقات»، والتعديلات اليدوية على الأسعار.', 'Articoli aperti, il tasto varie e le modifiche manuali di prezzo.'),
        t('Drinks per guest by server, against others on the same shift.', 'Getränke pro Gast je Servicekraft, im Vergleich zu anderen in derselben Schicht.', 'المشروبات لكل ضيف حسب النادل، مقارنة بزملائه في الوردية نفسها.', 'Bevande per ospite per cameriere, rispetto agli altri nello stesso turno.'),
        t('In-house guests against breakfast and outlet charges.', 'Hausgäste gegen Frühstücks- und Outletbelastungen.', 'النزلاء المقيمون مقابل رسوم الإفطار والمنافذ.', 'Ospiti in casa contro addebiti di colazione e punti vendita.'),
        t('Double rings and quantity typos.', 'Doppelbuchungen und Tippfehler bei Mengen.', 'التسجيل المزدوج وأخطاء الكميات.', 'Doppie battute ed errori di quantità.'),
      ],
    },
  },

  deliveries: {
    key: 'deliveries',
    icon: 'deliveries',
    tone: 'violet',
    mark: t('never received', 'nie ankam', 'لم تستلمها', 'mai ricevuta'),
    pagePhoto: pageDeliveries,
    pagePhotoFocus: '55% 40%',
    name: t('Invoices and deliveries', 'Rechnungen und Lieferungen', 'الفواتير والتوريدات', 'Fatture e consegne'),
    menu: t('Pay only for what arrived.', 'Nur bezahlen, was angekommen ist.', 'ادفع فقط ثمن ما وصل.', 'Paga solo ciò che è arrivato.'),
    headline: t('Are you paying for things you never received?', 'Zahlen Sie für Ware, die nie ankam?', 'هل تدفع ثمن أشياء لم تستلمها؟', 'Stai pagando merce mai ricevuta?'),
    intro: t('Every delivery and invoice against what you ordered.', 'Jede Lieferung und Rechnung gegen Ihre Bestellung.', 'كل توريد وفاتورة مقابل ما طلبته.', 'Ogni consegna e fattura contro quanto ordinato.'),
    see: [
      { title: t('Delivery against order', 'Lieferung gegen Bestellung', 'التوريد مقابل الطلب', 'Consegna contro ordine'), text: t('What was ordered and what arrived, with any difference.', 'Was bestellt wurde und was ankam, mit jeder Abweichung.', 'ما طُلب وما وصل، مع أي فرق.', 'Cosa è stato ordinato e cosa è arrivato, con ogni differenza.') },
      { title: t('Invoice against delivery and agreed price', 'Rechnung gegen Lieferung und vereinbarten Preis', 'الفاتورة مقابل التوريد والسعر المتفق عليه', 'Fattura contro consegna e prezzo concordato'), text: t('Ordered, received and invoiced, side by side.', 'Bestellt, erhalten und berechnet, nebeneinander.', 'المطلوب والمستلم والمفوتر جنبًا إلى جنب.', 'Ordinato, ricevuto e fatturato, fianco a fianco.') },
      { title: t('One decision per invoice', 'Eine Entscheidung pro Rechnung', 'قرار واحد لكل فاتورة', 'Una decisione per fattura'), text: t('Flag it, correct it or approve it. Approving one that still has a difference needs a short note why.', 'Markieren, korrigieren oder freigeben. Wer eine Rechnung mit Abweichung freigibt, schreibt kurz, warum.', 'أشر إليها أو صحّحها أو اعتمدها. واعتماد فاتورة ما زال بها فرق يحتاج إلى ملاحظة قصيرة توضح السبب.', 'Segnala, correggi o approva. Per approvarne una che ha ancora una differenza serve una breve nota sul perché.') },
    ],
    more: [
      {
        points: [
          t('Every delivery checked three ways: ordered, delivered and invoiced, with the difference in units and money.', 'Jede Lieferung dreifach geprüft: bestellt, geliefert und berechnet, mit der Differenz in Einheiten und Geld.', 'يُفحص كل توريد بثلاث طرق: المطلوب والمسلَّم والمفوتر، مع الفرق بالوحدات والمال.', 'Ogni consegna controllata in tre modi: ordinato, consegnato e fatturato, con la differenza in unità e in denaro.'),
        ],
      },
    ],
    photo: tileInvoices,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Every delivery against the order.', 'Jede Lieferung gegen die Bestellung.', 'كل توريد مقابل الطلب.', 'Ogni consegna contro l’ordine.'),
      t('Every invoice against delivery and agreed price.', 'Jede Rechnung gegen Lieferung und vereinbarten Preis.', 'كل فاتورة مقابل التوريد والسعر المتفق عليه.', 'Ogni fattura contro consegna e prezzo concordato.'),
      t('An alert when a delivery doesn’t arrive.', 'Eine Warnung, wenn eine Lieferung nicht ankommt.', 'تنبيه عندما لا يصل توريد.', 'Un avviso quando una consegna non arriva.'),
    ],
    rows: [
      {
        id: 'late-deliveries',
        icon: 'suppliers',
        name: t('Late deliveries', 'Verspätete Lieferungen', 'التوريدات المتأخرة', 'Consegne in ritardo'),
        line: t('An alert when a confirmed delivery has not arrived.', 'Eine Warnung, wenn eine bestätigte Lieferung nicht angekommen ist.', 'تنبيه عندما لا يصل توريد مؤكَّد.', 'Un avviso quando una consegna confermata non arriva.'),
        points: [
          t('Tyll alerts when a confirmed delivery has not arrived, for example “Fresh fish delivery due 15:00 has not arrived”, with two actions: call the supplier, or order from the backup supplier.', 'Tyll warnt, wenn eine bestätigte Lieferung nicht angekommen ist, zum Beispiel „Frischfisch-Lieferung, fällig um 15:00, ist nicht angekommen“, mit zwei Aktionen: den Lieferanten anrufen oder beim Ersatzlieferanten bestellen.', 'ينبّه Tyll عندما لا يصل توريد مؤكد، مثل «توريد السمك الطازج المقرر في 15:00 لم يصل»، مع إجراءين: الاتصال بالمورد، أو الطلب من المورد البديل.', 'Tyll avvisa quando una consegna confermata non è arrivata, per esempio «La consegna di pesce fresco prevista alle 15:00 non è arrivata», con due azioni: chiamare il fornitore o ordinare dal fornitore di riserva.'),
        ],
      },
      {
        id: 'invoice-approval',
        icon: 'orders',
        name: t('Invoice approval', 'Rechnungsfreigabe', 'اعتماد الفواتير', 'Approvazione fatture'),
        line: t('Invoices approved on their own, after the order.', 'Rechnungen werden einzeln freigegeben, nach der Bestellung.', 'تُعتمد الفواتير وحدها، بعد الطلب.', 'Le fatture si approvano da sole, dopo l’ordine.'),
        points: [
          t('Supplier invoices are approved on their own, after the order.', 'Lieferantenrechnungen werden eigens freigegeben, getrennt von der Bestellung.', 'تُعتمد فواتير الموردين بشكل منفصل عن الطلب.', 'Le fatture dei fornitori si approvano a parte, separate dall’ordine.'),
          t('A delivery with a difference offers a credit request: a polite email to copy. Tyll never sends it. Once a credit is recorded, it counts as money saved.', 'Eine Lieferung mit Differenz bietet eine Gutschriftanfrage an: eine höfliche E-Mail zum Kopieren. Tyll schickt sie nie selbst. Sobald eine Gutschrift erfasst ist, zählt sie als gespartes Geld.', 'يقدّم التوريد الذي به فرق طلب إشعار دائن: رسالة بريد إلكتروني مهذبة للنسخ. لا يرسلها Tyll أبدًا. وعند تسجيل الإشعار الدائن يُحتسب مالًا موفَّرًا.', 'Una consegna con una differenza propone una richiesta di nota di credito: un’email cortese da copiare. Tyll non la invia mai. Una volta registrato, il credito conta come denaro risparmiato.'),
        ],
      },
    ],
  },
};
