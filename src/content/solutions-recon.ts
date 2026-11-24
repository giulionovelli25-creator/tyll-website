// Reconciliation (round 4, 24 Nov 2026): Stock takes and missing stock, Over pouring and Flagged transactions, as in
// the demo. Every feature is a row with its own clip (public/media/film/<lang>/<key>-<row>-{desk,phone}.mp4).
import type { Solution } from './solutions';
import pageTakes from '../assets/photos/how-count-jars.jpg';
import pagePour from '../assets/photos/drinks-cola.jpg';
import pageFlags from '../assets/photos/reconciliation-tickets.jpg';
import tileTakes from '../assets/photos/how-count-jars.jpg';
import tilePour from '../assets/photos/events-banquet.jpg';
import tileFlags from '../assets/photos/reconciliation-reception.jpg';

const t = (en: string, de: string, ar: string, it: string) => ({ en, de, ar, it });

export const reconciliation: Record<'takes' | 'pour' | 'finance', Solution> = {
  takes: {
    key: 'takes',
    icon: 'takes',
    tone: 'violet',
    mark: t('more than we sold', 'mehr verbraucht', 'أكثر مما بعنا', 'più di quanto venduto'),
    pagePhoto: pageTakes,
    pagePhotoFocus: '50% 45%',
    name: t('Stock takes and missing stock', 'Inventuren und fehlender Bestand', 'الجرد والمخزون المفقود', 'Inventari e scorte mancanti'),
    menu: t('Count the storeroom, every gap explained.', 'Lager zählen, jede Lücke erklärt.', 'اجرد المخزن، ولكل فرق تفسير.', 'Conta il magazzino, ogni scarto spiegato.'),
    headline: t('Why did we use more than we sold?', 'Warum haben wir mehr verbraucht als verkauft?', 'لماذا استهلكنا أكثر مما بعنا؟', 'Perché abbiamo usato più di quanto venduto?'),
    intro: t('Count the storeroom in Tyll. It explains every gap, in the kitchen and at the bar.', 'Zählen Sie das Lager in Tyll. Es erklärt jede Lücke, in der Küche und an der Bar.', 'اجرد المخزن في Tyll. يفسّر كل فرق، في المطبخ وفي البار.', 'Conta il magazzino in Tyll. Spiega ogni scarto, in cucina e al bar.'),
    see: [
      { title: t('Stock count review', 'Prüfung der Inventur', 'مراجعة الجرد', 'Revisione dell’inventario'), text: t('Every difference with its value, before anything moves.', 'Jede Abweichung mit ihrem Wert, bevor sich etwas ändert.', 'كل فرق بقيمته، قبل أن يتغير أي شيء.', 'Ogni differenza con il suo valore, prima che cambi qualcosa.') },
      { title: t('Approve it or send it back', 'Freigeben oder zurückschicken', 'اعتمده أو أعده', 'Approvarlo o rimandarlo'), text: t('Stock only changes once the count is approved.', 'Der Bestand ändert sich erst, wenn die Inventur freigegeben ist.', 'لا يتغير المخزون إلا بعد اعتماد الجرد.', 'Le scorte cambiano solo dopo l’approvazione dell’inventario.') },
      { title: t('Bought against used', 'Gekauft gegen verbraucht', 'المشتريات مقابل الاستخدام', 'Acquistato contro usato'), text: t('What was bought in 30 days but never used. An estimate.', 'Was in 30 Tagen gekauft, aber nie verbraucht wurde. Eine Schätzung.', 'ما اشتُري خلال 30 يومًا ولم يُستخدم. تقدير.', 'Cosa è stato comprato in 30 giorni ma mai usato. Una stima.') },
    ],
    more: [
      {
        points: [
          t('Walk the storeroom in order, tap “Looks right” or change it. Scan a barcode or type.', 'Das Lager der Reihe nach ablaufen, „Stimmt“ antippen oder ändern. Barcode scannen oder tippen.', 'امشِ في المخزن بالترتيب، وانقر «يبدو صحيحًا» أو عدّله. امسح الرمز الشريطي أو اكتب.', 'Percorri il magazzino in ordine, tocca “Sembra giusto” o correggi. Scansiona un codice a barre o digita.'),
        ],
        foot: t('The case explanation is assembled by rules from the recorded facts, not by a language model.', 'Die Erklärung eines Falls wird nach Regeln aus den erfassten Fakten zusammengesetzt, nicht von einem Sprachmodell.', 'يُجمَّع تفسير الحالة وفق قواعد من الوقائع المسجلة، لا بواسطة نموذج لغوي.', 'La spiegazione del caso è composta con regole dai fatti registrati, non da un modello linguistico.'),
      },
    ],
    soon: {
      lead: t('In development.', 'In Entwicklung.', 'قيد التطوير.', 'In sviluppo.'),
      items: [t('Stock per item that starts from that item’s first count, so you don’t need a full opening count.', 'Bestand pro Artikel ab dessen erster Zählung, sodass keine vollständige Eröffnungsinventur nötig ist.', 'مخزون لكل صنف يبدأ من أول عدّ له، فلا تحتاج إلى جرد افتتاحي كامل.', 'Scorte per articolo a partire dal primo conteggio di quell’articolo, senza un inventario iniziale completo.')],
    },
    photo: tileTakes,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Count by barcode or by typing.', 'Zählen per Barcode oder Eingabe.', 'اجرد بالرمز الشريطي أو بالكتابة.', 'Conta con codice a barre o digitando.'),
      t('Each count reviewed, then approved or sent back.', 'Jede Inventur geprüft, dann freigegeben oder zurückgeschickt.', 'كل جرد يُراجَع، ثم يُعتمد أو يُعاد.', 'Ogni inventario rivisto, poi approvato o rimandato.'),
      t('Used against sold, with the possible causes.', 'Verbraucht gegen verkauft, mit den möglichen Ursachen.', 'المستهلك مقابل المبيع، مع الأسباب المحتملة.', 'Usato contro venduto, con le possibili cause.'),
    ],
    rows: [
      {
        id: 'missing-stock',
        icon: 'takes',
        film: 'takes-missing',
        name: t('Missing stock', 'Fehlender Bestand', 'المخزون المفقود', 'Scorte mancanti'),
        line: t('Used against sold, with the possible causes.', 'Verbraucht gegen verkauft, mit den möglichen Ursachen.', 'المستهلك مقابل المبيع، مع الأسباب المحتملة.', 'Usato contro venduto, con le possibili cause.'),
        points: [
          t('Between two counts, Tyll compares what was used with what the recipes of what sold explain, after waste and transfers. For example wagyu beef mince at Mercado is 1.8 kg above the recipes, €86.', 'Zwischen zwei Inventuren vergleicht Tyll den Verbrauch mit dem, was die Rezepte des Verkauften erklären, nach Abfall und Umbuchungen. Zum Beispiel liegt Wagyu-Hackfleisch im Mercado 1,8 kg über den Rezepten, 86 €.', 'بين جردين، يقارن Tyll ما استُهلك بما تفسّره وصفات ما بيع، بعد الهدر والتحويلات. مثلًا لحم الواغيو المفروم في Mercado أعلى من الوصفات بـ 1.8 كغ، أي 86 يورو.', 'Tra due inventari, Tyll confronta quanto usato con quanto spiegano le ricette del venduto, dopo sprechi e trasferimenti. Per esempio la carne macinata di wagyu al Mercado è 1,8 kg sopra le ricette, 86 €.'),
          t('The case shows the counts, deliveries and sales in order, and the possible causes with what the records show for each: dishes not charged, comps, larger portions, prep waste not logged, wrong recipe, staff meals, spoilage, wrong count, transfers not recorded, stock taken without authorisation.', 'Der Fall zeigt Inventuren, Lieferungen und Verkäufe der Reihe nach, und die möglichen Ursachen mit dem, was die Daten jeweils zeigen: nicht berechnete Gerichte, Einladungen, größere Portionen, nicht erfasster Vorbereitungsabfall, falsches Rezept, Personalessen, Verderb, falsche Zählung, nicht erfasste Umbuchungen, unerlaubte Entnahme.', 'تعرض الحالة الجرد والتوريدات والمبيعات بالترتيب، والأسباب المحتملة مع ما تُظهره السجلات لكل منها: أطباق لم تُحتسب، ضيافة مجانية، حصص أكبر، هدر تحضير غير مسجّل، وصفة خاطئة، وجبات موظفين، تلف، عدّ خاطئ، تحويلات غير مسجلة، أخذ مخزون دون إذن.', 'Il caso mostra conteggi, consegne e vendite in ordine, e le possibili cause con ciò che i dati mostrano per ognuna: piatti non battuti, omaggi, porzioni più grandi, scarti di preparazione non registrati, ricetta sbagliata, pasti del personale, deterioramento, conteggio sbagliato, trasferimenti non registrati, prelievi non autorizzati.'),
          t('The manager can record a recount, log missed waste or correct the recipe. Corrections are added and never replace the records.', 'Die Leitung kann eine Nachzählung erfassen, vergessenen Abfall nachtragen oder das Rezept korrigieren. Korrekturen werden ergänzt und ersetzen nie die Daten.', 'يمكن للمدير تسجيل إعادة عدّ، أو تسجيل هدر فائت، أو تصحيح الوصفة. تُضاف التصحيحات ولا تستبدل السجلات أبدًا.', 'Il responsabile può registrare un riconteggio, uno spreco dimenticato o correggere la ricetta. Le correzioni si aggiungono e non sostituiscono mai i dati.'),
        ],
      },
      {
        id: 'bought',
        icon: 'stock',
        film: 'takes-bought',
        name: t('Bought against used', 'Gekauft gegen verbraucht', 'المشتريات مقابل الاستخدام', 'Acquistato contro usato'),
        line: t('What came in, against what sales and waste explain.', 'Was hereinkam, gegen das, was Verkäufe und Abfall erklären.', 'ما دخل، مقابل ما تفسّره المبيعات والهدر.', 'Cosa è entrato, contro cosa spiegano vendite e sprechi.'),
        points: [
          t('Over 30 days, what was bought against what the recipes of what sold and the logged waste explain.', 'Über 30 Tage: was gekauft wurde, gegen das, was die Rezepte des Verkauften und der erfasste Abfall erklären.', 'خلال 30 يومًا، ما اشتُري مقابل ما تفسّره وصفات ما بيع والهدر المسجّل.', 'In 30 giorni, cosa è stato comprato contro cosa spiegano le ricette del venduto e gli sprechi registrati.'),
          t('For example, cans of Coca-Cola bought but not accounted for. The value is an estimate and the case is a prompt to check.', 'Zum Beispiel gekaufte Dosen Coca-Cola, die nicht nachvollziehbar sind. Der Wert ist eine Schätzung, der Fall ein Anlass zur Prüfung.', 'مثلًا علب كوكا كولا اشتُريت ولا يُعرف مصيرها. القيمة تقدير، والحالة دعوة للتحقق.', 'Per esempio lattine di Coca-Cola comprate ma non giustificate. Il valore è una stima e il caso un invito a controllare.'),
        ],
      },
      {
        id: 'month-end',
        icon: 'reports',
        film: 'takes-month-end',
        name: t('Month-end report', 'Monatsabschluss', 'تقرير نهاية الشهر', 'Report di fine mese'),
        line: t('Approved stock takes and the variance, for accounting.', 'Freigegebene Inventuren und die Abweichung, für die Buchhaltung.', 'الجرود المعتمدة والفروق، للمحاسبة.', 'Inventari approvati e la varianza, per la contabilità.'),
        points: [
          t('Approved stock takes only, month by month, with the net difference.', 'Nur freigegebene Inventuren, Monat für Monat, mit der Nettoabweichung.', 'الجرود المعتمدة فقط، شهرًا بشهر، مع صافي الفرق.', 'Solo inventari approvati, mese per mese, con la differenza netta.'),
        ],
      },
      {
        id: 'blind',
        icon: 'takes',
        film: 'takes-blind',
        name: t('Blind counts', 'Blindzählung', 'العدّ دون عرض الكمية', 'Conteggio alla cieca'),
        line: t('For audits, the expected quantity is hidden.', 'Für Prüfungen wird die erwartete Menge ausgeblendet.', 'للتدقيق، تُخفى الكمية المتوقعة.', 'Per le verifiche, la quantità attesa è nascosta.'),
        points: [
          t('The counter sees the item, not what Tyll expects to find.', 'Wer zählt, sieht den Artikel, nicht was Tyll erwartet.', 'يرى من يعدّ الصنف، لا ما يتوقع Tyll أن يجده.', 'Chi conta vede l’articolo, non cosa Tyll si aspetta di trovare.'),
        ],
      },
    ],
  },

  pour: {
    key: 'pour',
    icon: 'pour',
    tone: 'violet',
    mark: t('unbilled', 'unberechnet', 'دون فاتورة', 'non battute'),
    pagePhoto: pagePour,
    pagePhotoFocus: '50% 50%',
    name: t('Over pouring', 'Überausschank', 'السكب الزائد', 'Mescita eccessiva'),
    menu: t('Find drinks never billed.', 'Nie abgerechnete Getränke finden.', 'اعثر على المشروبات التي لم تُحتسب.', 'Trova le bevande mai battute.'),
    headline: t('Where do drinks go unbilled?', 'Wo bleiben Getränke unberechnet?', 'أين تذهب المشروبات دون فاتورة؟', 'Dove finiscono le bevande non battute?'),
    intro: t('Empty bottles against glasses sold, by outlet and shift.', 'Leere Flaschen gegen verkaufte Gläser, pro Outlet und Schicht.', 'الزجاجات الفارغة مقابل الكؤوس المبيعة، لكل منفذ ووردية.', 'Bottiglie vuote contro bicchieri venduti, per punto vendita e turno.'),
    see: [
      { title: t('Empty bottles', 'Leere Flaschen', 'الزجاجات الفارغة', 'Bottiglie vuote'), text: t('Photograph the crate. Tyll counts the bottles by label against the till.', 'Kiste fotografieren. Tyll zählt die Flaschen nach Etikett gegen die Kasse.', 'صوّر الصندوق. يعدّ Tyll الزجاجات حسب الملصق مقابل نظام نقاط البيع.', 'Fotografa la cassa. Tyll conta le bottiglie per etichetta contro la cassa.') },
      { title: t('One to count by hand', 'Eine zum Nachzählen', 'واحدة تُعدّ يدويًا', 'Una da contare a mano'), text: t('A bottle it can’t see clearly is flagged, not guessed.', 'Eine Flasche, die es nicht klar erkennt, wird markiert, nicht geraten.', 'الزجاجة التي لا يراها بوضوح تُعلَّم، ولا يُخمَّن عددها.', 'Una bottiglia che non vede bene viene segnalata, non indovinata.') },
      { title: t('Who was on', 'Wer im Dienst war', 'من كان في الوردية', 'Chi era in turno'), text: t('Day by day, to coach a shift, not to blame a person.', 'Tag für Tag, um eine Schicht zu schulen, nicht um jemanden zu beschuldigen.', 'يومًا بيوم، لتدريب الوردية، لا لإلقاء اللوم على شخص.', 'Giorno per giorno, per formare un turno, non per incolpare qualcuno.') },
    ],
    more: [
      {
        points: [
          t('Once the empties are photographed, the gap is marked “Based on empty bottles photographed”.', 'Sind die Leergüter fotografiert, wird die Lücke als „Auf Basis fotografierter Leergüter“ markiert.', 'بعد تصوير الزجاجات الفارغة، يُعلَّم الفرق بأنه «مبني على الزجاجات الفارغة المصوّرة».', 'Fotografati i vuoti, lo scarto è segnato “In base alle bottiglie vuote fotografate”.'),
          t('Tyll tests whether anyone stands out beyond chance. When someone does, it says so, and suggests a fix, for example a 175 ml measure at every station before the Friday late shift.', 'Tyll prüft, ob jemand über den Zufall hinaus auffällt. Wenn ja, sagt es das und schlägt eine Lösung vor, zum Beispiel ein 175-ml-Maß an jeder Station vor der Freitag-Spätschicht.', 'يختبر Tyll ما إذا كان أحد يبرز بما يتجاوز الصدفة. وإن حدث ذلك يقوله، ويقترح حلًا، مثل مكيال 175 مل في كل محطة قبل وردية الجمعة المتأخرة.', 'Tyll verifica se qualcuno si distingue oltre il caso. Se succede lo dice, e suggerisce un rimedio, per esempio un misurino da 175 ml in ogni postazione prima del turno serale del venerdì.'),
          t('A gap means generous pours, glasses not rung up or breakage. Tyll never says which.', 'Eine Lücke bedeutet großzügiges Einschenken, nicht gebuchte Gläser oder Bruch. Tyll sagt nie, was davon.', 'الفرق يعني سكبًا سخيًا أو كؤوسًا غير مسجّلة أو كسرًا. ولا يقول Tyll أبدًا أيها.', 'Uno scarto indica versate abbondanti, bicchieri non battuti o rotture. Tyll non dice mai quale.'),
        ],
      },
    ],
    soon: {
      lead: t('In development.', 'In Entwicklung.', 'قيد التطوير.', 'In sviluppo.'),
      items: [t('Smart pourers and flow meters.', 'Intelligente Ausgießer und Durchflussmesser.', 'سكّابات ذكية وعدّادات تدفق.', 'Versatori intelligenti e flussometri.')],
    },
    photo: tilePour,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Empty bottles photographed and counted by label.', 'Leere Flaschen fotografiert und nach Etikett gezählt.', 'الزجاجات الفارغة تُصوَّر وتُعدّ حسب الملصق.', 'Bottiglie vuote fotografate e contate per etichetta.'),
      t('Drinks poured but never billed, by outlet and shift.', 'Ausgeschenkt, aber nie abgerechnet, pro Outlet und Schicht.', 'مشروبات سُكبت ولم تُحتسب، لكل منفذ ووردية.', 'Bevande versate ma mai battute, per punto vendita e turno.'),
      t('A fix to try, not a person to blame.', 'Eine Lösung zum Ausprobieren, niemand zum Beschuldigen.', 'حل يمكن تجربته، لا شخص يُلام.', 'Un rimedio da provare, non qualcuno da incolpare.'),
    ],
    rows: [
      {
        id: 'patterns',
        icon: 'pour',
        film: 'pour-patterns',
        name: t('All patterns', 'Alle Muster', 'كل الأنماط', 'Tutti gli schemi'),
        line: t('By outlet, shift and item, from closed days only.', 'Pro Outlet, Schicht und Artikel, nur aus abgeschlossenen Tagen.', 'لكل منفذ ووردية وصنف، من الأيام المغلقة فقط.', 'Per punto vendita, turno e articolo, solo da giorni chiusi.'),
        points: [
          t('How many glasses each bottle gave, by the glass and by the measure.', 'Wie viele Gläser jede Flasche ergab, pro Glas und pro Maß.', 'كم كأسًا أعطت كل زجاجة، بالكأس وبالمكيال.', 'Quanti bicchieri ha dato ogni bottiglia, al bicchiere e alla misura.'),
          t('Patterns use closed days up to yesterday, so a shift still running never moves them.', 'Muster nutzen abgeschlossene Tage bis gestern, eine laufende Schicht verändert sie also nie.', 'تعتمد الأنماط على الأيام المغلقة حتى أمس، فلا تغيّرها وردية ما زالت جارية.', 'Gli schemi usano giorni chiusi fino a ieri, quindi un turno in corso non li cambia mai.'),
        ],
      },
      {
        id: 'missing-drinks',
        icon: 'takes',
        film: 'pour-missing',
        name: t('Missing drinks', 'Fehlende Getränke', 'المشروبات المفقودة', 'Bevande mancanti'),
        line: t('Used, not sold, between two counts.', 'Verbraucht, nicht verkauft, zwischen zwei Zählungen.', 'مستهلكة وغير مبيعة، بين جردين.', 'Usate, non vendute, tra due conteggi.'),
        points: [
          t('Bottles that left the shelf between two counts with no sale to explain them, with their value.', 'Flaschen, die zwischen zwei Zählungen das Regal verließen, ohne dass ein Verkauf sie erklärt, mit ihrem Wert.', 'زجاجات خرجت من الرف بين جردين دون بيع يفسّرها، مع قيمتها.', 'Bottiglie uscite dallo scaffale tra due conteggi senza una vendita che le spieghi, con il loro valore.'),
        ],
      },
    ],
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    tone: 'violet',
    mark: t('missing', 'Geld verloren', 'يُفقد المال', 'si perde denaro'),
    pagePhoto: pageFlags,
    pagePhotoFocus: '40% 55%',
    proof: { kind: 'story', step: 2 },
    name: t('Flagged transactions', 'Markierte Buchungen', 'المعاملات المُعلَّمة', 'Transazioni segnalate'),
    menu: t('Bills that broke a rule, and why.', 'Rechnungen, die eine Regel brechen, und warum.', 'فواتير خالفت قاعدة، ولماذا.', 'Conti che violano una regola, e perché.'),
    headline: t('Where is money going missing?', 'Wo geht Geld verloren?', 'أين يُفقد المال؟', 'Dove si perde denaro?'),
    intro: t('Bills, room charges and covers checked against tickets and bookings. Every flag followed up.', 'Rechnungen, Zimmerbelastungen und Gedecke gegen Bons und Reservierungen geprüft. Jede Markierung wird verfolgt.', 'الفواتير وقيود الغرف وعدد الضيوف تُفحص مقابل التذاكر والحجوزات. وكل تنبيه يُتابَع.', 'Conti, addebiti in camera e coperti controllati contro comande e prenotazioni. Ogni segnalazione seguita.'),
    see: [
      { title: t('Only the bills that break a rule', 'Nur Rechnungen, die eine Regel brechen', 'الفواتير التي تخالف قاعدة فقط', 'Solo i conti che violano una regola'), text: t('Rules agreed with your hotel at the start.', 'Regeln, die zu Beginn mit Ihrem Hotel vereinbart werden.', 'قواعد يُتفق عليها مع فندقك في البداية.', 'Regole concordate con il tuo hotel all’inizio.') },
      { title: t('A worked example', 'Ein durchgerechnetes Beispiel', 'مثال عملي', 'Un esempio guidato'), text: t('The order, the bill and the rule it broke, side by side.', 'Bestellung, Rechnung und die gebrochene Regel, nebeneinander.', 'الطلب والفاتورة والقاعدة التي خالفتها، جنبًا إلى جنب.', 'L’ordine, il conto e la regola violata, fianco a fianco.') },
      { title: t('Every flag to an outcome', 'Jede Markierung zu einem Ergebnis', 'كل تنبيه حتى نتيجة', 'Ogni segnalazione fino a un esito'), text: t('Legitimate correction, confirmed loss, revenue recovered or no finding.', 'Berechtigte Korrektur, bestätigter Verlust, zurückgeholter Umsatz oder kein Befund.', 'تصحيح مشروع، أو خسارة مؤكدة، أو إيراد مسترد، أو لا شيء.', 'Correzione legittima, perdita confermata, ricavo recuperato o nessun riscontro.') },
    ],
    more: [
      {
        title: t('How flags are judged', 'Wie Markierungen bewertet werden', 'كيف تُقيَّم التنبيهات', 'Come si valutano le segnalazioni'),
        points: [
          t('Flags are counted per 1,000 orders by outlet, so busy and quiet outlets compare fairly.', 'Markierungen werden pro 1.000 Bestellungen je Outlet gezählt, damit volle und ruhige Outlets fair vergleichbar sind.', 'تُحسب التنبيهات لكل 1,000 طلب في كل منفذ، فتُقارن المنافذ المزدحمة والهادئة بعدل.', 'Le segnalazioni si contano ogni 1.000 ordini per punto vendita, così quelli affollati e quelli tranquilli si confrontano in modo equo.'),
          t('A repeated pattern under one till login is flagged: at least 5 cases within 14 days.', 'Ein wiederholtes Muster unter einem Kassen-Login wird markiert: mindestens 5 Fälle in 14 Tagen.', 'يُعلَّم النمط المتكرر تحت حساب واحد في نظام نقاط البيع: 5 حالات على الأقل خلال 14 يومًا.', 'Uno schema ripetuto sotto un login di cassa viene segnalato: almeno 5 casi in 14 giorni.'),
          t('The limits for discounts, complimentary items and refunds are agreed with each hotel at the start.', 'Die Grenzen für Rabatte, Einladungen und Erstattungen werden zu Beginn mit jedem Hotel vereinbart.', 'تُتفق حدود الخصومات والأصناف المجانية والمبالغ المستردة مع كل فندق في البداية.', 'I limiti per sconti, omaggi e rimborsi sono concordati con ogni hotel all’inizio.'),
        ],
        foot: t('A flag is a prompt to check, not a finding.', 'Eine Markierung ist ein Anlass zur Prüfung, kein Befund.', 'التنبيه دعوة للتحقق، لا استنتاج.', 'Una segnalazione è un invito a controllare, non un riscontro.'),
      },
    ],
    photo: tileFlags,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Bills and room charges against tickets.', 'Rechnungen und Zimmerbelastungen gegen Bons.', 'الفواتير وقيود الغرف مقابل التذاكر.', 'Conti e addebiti in camera contro le comande.'),
      t('Booked covers against billed covers.', 'Reservierte gegen abgerechnete Gedecke.', 'الضيوف المحجوزون مقابل المفوترين.', 'Coperti prenotati contro coperti fatturati.'),
      t('Every flag becomes a case with an outcome.', 'Jede Markierung wird ein Fall mit Ergebnis.', 'كل تنبيه يصبح حالة لها نتيجة.', 'Ogni segnalazione diventa un caso con un esito.'),
    ],
    rows: [
      {
        id: 'room-charges',
        icon: 'finance',
        film: 'finance-rooms',
        name: t('Room charges', 'Zimmerbelastungen', 'قيود الغرف', 'Addebiti in camera'),
        line: t('Charges to a room against the guest bill.', 'Belastungen aufs Zimmer gegen die Gästerechnung.', 'القيود على الغرفة مقابل فاتورة النزيل.', 'Addebiti in camera contro il conto dell’ospite.'),
        points: [
          t('Missing, posted twice, wrong amount, wrong room, or posted after check-out.', 'Fehlend, doppelt gebucht, falscher Betrag, falsches Zimmer oder nach dem Check-out gebucht.', 'مفقود، أو مُسجّل مرتين، أو بمبلغ خاطئ، أو على غرفة خاطئة، أو بعد المغادرة.', 'Mancante, registrato due volte, importo sbagliato, camera sbagliata o dopo il check-out.'),
        ],
      },
      {
        id: 'bills',
        icon: 'cash',
        film: 'finance-bills',
        name: t('Bills', 'Rechnungen', 'الفواتير', 'Conti'),
        line: t('Bills against what the kitchen and bar received.', 'Rechnungen gegen das, was Küche und Bar erhielten.', 'الفواتير مقابل ما وصل إلى المطبخ والبار.', 'Conti contro ciò che hanno ricevuto cucina e bar.'),
        points: [
          t('Reopened after payment, a cheaper item rung up, an open item or a price set by hand, rung twice or an unusual quantity.', 'Nach der Zahlung wieder geöffnet, ein billigerer Artikel gebucht, ein offener Artikel oder ein von Hand gesetzter Preis, doppelt gebucht oder eine ungewöhnliche Menge.', 'فاتورة أُعيد فتحها بعد الدفع، أو صنف أرخص سُجّل، أو صنف مفتوح أو سعر يدوي، أو تسجيل مكرر أو كمية غير معتادة.', 'Riaperto dopo il pagamento, un articolo più economico battuto, un articolo aperto o un prezzo a mano, battuto due volte o una quantità insolita.'),
          t('Removed after it was sent, prepared but not charged, order and bill that differ, and unexplained voids.', 'Nach dem Senden entfernt, zubereitet aber nicht berechnet, Bestellung und Rechnung, die abweichen, und ungeklärte Stornos.', 'صنف أُزيل بعد إرساله، أو حُضّر ولم يُحتسب، أو اختلاف بين الطلب والفاتورة، أو إلغاء دون تفسير.', 'Tolto dopo l’invio, preparato ma non battuto, ordine e conto diversi, e storni non spiegati.'),
          t('Unusual discounts (above 25%, or with no reason or approval), complimentary items above the agreed limit, and unusual refunds (above half a bill, late, or with no reason).', 'Ungewöhnliche Rabatte (über 25 % oder ohne Grund oder Freigabe), Einladungen über der vereinbarten Grenze, und ungewöhnliche Erstattungen (über einer halben Rechnung, spät oder ohne Grund).', 'خصومات غير معتادة (أكثر من 25%، أو دون سبب أو موافقة)، وأصناف مجانية فوق الحد المتفق عليه، ومبالغ مستردة غير معتادة (أكثر من نصف الفاتورة، أو متأخرة، أو دون سبب).', 'Sconti insoliti (oltre il 25%, o senza motivo o approvazione), omaggi oltre il limite concordato e rimborsi insoliti (oltre metà conto, tardivi o senza motivo).'),
        ],
      },
      {
        id: 'covers',
        icon: 'revenue',
        film: 'finance-covers',
        name: t('Tables and guests', 'Tische und Gäste', 'الطاولات والضيوف', 'Tavoli e ospiti'),
        line: t('Booked covers against billed covers.', 'Reservierte gegen abgerechnete Gedecke.', 'الضيوف المحجوزون مقابل المفوترين.', 'Coperti prenotati contro coperti fatturati.'),
        points: [
          t('A seated table with no bill, and an in-house guest’s breakfast not charged.', 'Ein platzierter Tisch ohne Rechnung, und ein nicht berechnetes Frühstück eines Hotelgasts.', 'طاولة جلس عليها ضيوف دون فاتورة، وفطور نزيل لم يُحتسب.', 'Un tavolo occupato senza conto, e la colazione di un ospite dell’hotel non addebitata.'),
          t('A meal with no drink shows as an opportunity, not a loss.', 'Ein Essen ohne Getränk erscheint als Chance, nicht als Verlust.', 'الوجبة دون مشروب تظهر فرصة، لا خسارة.', 'Un pasto senza bevanda appare come un’opportunità, non una perdita.'),
        ],
      },
      {
        id: 'stock-checks',
        icon: 'takes',
        film: 'finance-stock',
        name: t('Stock checks', 'Bestandsprüfungen', 'فحوص المخزون', 'Controlli sulle scorte'),
        line: t('Stock used beyond what sales explain.', 'Verbrauch über das hinaus, was Verkäufe erklären.', 'مخزون استُهلك بما يتجاوز ما تفسّره المبيعات.', 'Scorte usate oltre ciò che spiegano le vendite.'),
        points: [
          t('Usage above sales, a stock shortfall, and bought more than used.', 'Verbrauch über den Verkäufen, ein Bestandsfehlbetrag, und mehr gekauft als verbraucht.', 'استهلاك أعلى من المبيعات، ونقص في المخزون، وشراء أكثر من الاستهلاك.', 'Consumo sopra le vendite, un ammanco di scorte, e acquistato più di quanto usato.'),
        ],
      },
      {
        id: 'waiters',
        icon: 'pour',
        film: 'finance-waiters',
        name: t('Drinks per guest by waiter', 'Getränke pro Gast je Servicekraft', 'المشروبات لكل ضيف حسب النادل', 'Bevande per ospite per cameriere'),
        line: t('Each waiter against colleagues on the same shift.', 'Jede Servicekraft gegen Kollegen derselben Schicht.', 'كل نادل مقارنة بزملائه في الوردية نفسها.', 'Ogni cameriere contro i colleghi dello stesso turno.'),
        points: [
          t('A low figure is a prompt to coach, not proof of anything else.', 'Ein niedriger Wert ist ein Anlass zum Schulen, kein Beweis für etwas anderes.', 'الرقم المنخفض دعوة للتدريب، لا دليل على شيء آخر.', 'Un valore basso è un invito alla formazione, non la prova di altro.'),
        ],
      },
      {
        id: 'cash',
        icon: 'cash',
        film: 'finance-cash',
        name: t('Cash per shift', 'Bargeld je Schicht', 'النقد لكل وردية', 'Contanti per turno'),
        line: t('Cash in the drawer against cash sales.', 'Bargeld in der Kasse gegen Barverkäufe.', 'النقد في الدرج مقابل المبيعات النقدية.', 'Contanti nel cassetto contro vendite in contanti.'),
        points: [
          t('Per outlet and shift: the day shift closes bills before 16:00, the night shift from 16:00 to close.', 'Pro Outlet und Schicht: Die Tagschicht schließt Rechnungen vor 16:00, die Abendschicht von 16:00 bis Schluss.', 'لكل منفذ ووردية: وردية النهار تغلق الفواتير قبل 16:00، ووردية الليل من 16:00 حتى الإغلاق.', 'Per punto vendita e turno: il turno di giorno chiude i conti prima delle 16:00, quello serale dalle 16:00 alla chiusura.'),
          t('The counted cash is set against the cash bills on the till, net of cash refunds.', 'Das gezählte Bargeld wird den Barrechnungen der Kasse gegenübergestellt, abzüglich Barerstattungen.', 'يُقارن النقد المعدود بالفواتير النقدية في نظام نقاط البيع، بعد خصم المبالغ النقدية المستردة.', 'I contanti contati sono confrontati con i conti in contanti della cassa, al netto dei rimborsi in contanti.'),
          t('Small differences (€10, or 1% of the shift’s cash) are not flagged. Each difference can carry a note, for example “tip left in the drawer”.', 'Kleine Differenzen (10 € oder 1 % des Schichtbargelds) werden nicht markiert. Jede Differenz kann eine Notiz tragen, zum Beispiel „Trinkgeld in der Kasse gelassen“.', 'لا تُعلَّم الفروق الصغيرة (10 يورو، أو 1% من نقد الوردية). ويمكن إرفاق ملاحظة بكل فرق، مثل «إكرامية تُركت في الدرج».', 'Le piccole differenze (10 €, o l’1% dei contanti del turno) non sono segnalate. Ogni differenza può avere una nota, per esempio “mancia lasciata nel cassetto”.'),
        ],
        next: t('A cash difference is something to check with the shift manager, not a finding about anyone.', 'Eine Kassendifferenz ist mit der Schichtleitung zu klären, kein Befund über jemanden.', 'فرق النقد أمر يُراجع مع مسؤول الوردية، وليس استنتاجًا بحق أحد.', 'Una differenza di cassa va verificata con il responsabile di turno, non è un giudizio su qualcuno.'),
      },
      {
        id: 'cases',
        icon: 'cases',
        film: 'finance-cases',
        name: t('Cases', 'Fälle', 'الحالات', 'Casi'),
        line: t('Every flag, followed up to an outcome.', 'Jede Markierung, verfolgt bis zu einem Ergebnis.', 'كل تنبيه يُتابَع حتى نتيجة.', 'Ogni segnalazione, seguita fino a un esito.'),
        points: [
          t('Cases come from flagged bills and from stock used beyond what sales explain.', 'Fälle entstehen aus markierten Rechnungen und aus Verbrauch über das hinaus, was Verkäufe erklären.', 'تأتي الحالات من الفواتير المُعلَّمة ومن مخزون استُهلك بما يتجاوز ما تفسّره المبيعات.', 'I casi nascono dai conti segnalati e dalle scorte usate oltre ciò che spiegano le vendite.'),
          t('Filter by type, outcome, who follows it up and date. Cases past their deadline are marked. Export as CSV.', 'Filtern nach Art, Ergebnis, Zuständigkeit und Datum. Überfällige Fälle werden markiert. Export als CSV.', 'صفِّ حسب النوع والنتيجة ومن يتابع والتاريخ. وتُعلَّم الحالات التي تجاوزت موعدها. وتُصدَّر بصيغة CSV.', 'Filtra per tipo, esito, chi la segue e data. I casi oltre la scadenza sono segnati. Esporta in CSV.'),
          t('A case is closed with the verified cause and the corrective action, and can be reopened.', 'Ein Fall wird mit geprüfter Ursache und Korrekturmaßnahme geschlossen und kann wieder geöffnet werden.', 'تُغلق الحالة بالسبب المؤكد والإجراء التصحيحي، ويمكن إعادة فتحها.', 'Un caso si chiude con la causa verificata e l’azione correttiva, e si può riaprire.'),
        ],
        next: t('A case is a prompt to check, not a finding about anyone.', 'Ein Fall ist ein Anlass zur Prüfung, kein Befund über jemanden.', 'الحالة دعوة للتحقق، وليست استنتاجًا بحق أحد.', 'Un caso è un invito a controllare, non un giudizio su qualcuno.'),
      },
    ],
  },
};
