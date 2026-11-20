// Stock and waste: three pages (round 3, 20 Nov 2026). Expiring soon and Recipes are rows on Stock levels; Missing stock and Over pouring on Stock takes.
import type { Solution } from './solutions';
import pageStock from '../assets/photos/stock-shelf.jpg';
import pageTakes from '../assets/photos/how-count-jars.jpg';
import pageWaste from '../assets/photos/waste-bin.jpg';
import tileStock from '../assets/photos/stock-chef.jpg';
import tileTakes from '../assets/photos/how-count-jars.jpg';
import tileWaste from '../assets/photos/why-chef.jpg';

const t = (en: string, de: string, ar: string, it: string) => ({ en, de, ar, it });

export const stockWaste: Record<'stock' | 'takes' | 'waste', Solution> = {
  stock: {
    key: 'stock',
    icon: 'stock',
    tone: 'teal',
    mark: t('really', 'wirklich', 'فعلًا', 'davvero'),
    pagePhoto: pageStock,
    pagePhotoFocus: '50% 60%',
    proof: { kind: 'story', step: 0 },
    name: t('Stock levels', 'Lagerbestand', 'مستويات المخزون', 'Livelli di scorta'),
    menu: t('Know what runs out, and what expires.', 'Wissen, was ausgeht und was abläuft.', 'اعرف ما ينفد وما تنتهي صلاحيته.', 'Sai cosa finisce e cosa scade.'),
    headline: t('What’s really on your shelf?', 'Was steht wirklich im Regal?', 'ما الموجود فعلًا على رفوفك؟', 'Cosa c’è davvero sullo scaffale?'),
    intro: t('See what runs out and what expires, before a guest asks for it.', 'Sehen Sie, was ausgeht und was abläuft, bevor ein Gast danach fragt.', 'اعرف ما ينفد وما تنتهي صلاحيته، قبل أن يطلبه ضيف.', 'Vedi cosa finisce e cosa scade, prima che un ospite lo chieda.'),
    see: [
      { title: t('Critical, low or fine', 'Kritisch, niedrig oder in Ordnung', 'حرج أو منخفض أو جيد', 'Critico, basso o a posto'), text: t('Your whole stock at a glance.', 'Ihr ganzer Bestand auf einen Blick.', 'مخزونك كله بنظرة واحدة.', 'Tutta la merce a colpo d’occhio.') },
      { title: t('What runs out before the next delivery', 'Was vor der nächsten Lieferung ausgeht', 'ما ينفد قبل التوريد التالي', 'Cosa finisce prima della prossima consegna'), text: t('Act on it before a guest asks for it.', 'Handeln Sie, bevor ein Gast danach fragt.', 'تصرّف قبل أن يطلبه ضيف.', 'Intervieni prima che un ospite lo chieda.') },
      { title: t('What expires next, and what to do with it', 'Was als Nächstes abläuft, und was damit zu tun ist', 'ما تنتهي صلاحيته تاليًا، وماذا تفعل به', 'Cosa scade per primo, e cosa farne'), text: t('Use it first, move it to another outlet, a special or the staff meal.', 'Zuerst verbrauchen, an ein anderes Outlet umbuchen, ein Tagesangebot oder das Personalessen.', 'استخدمها أولًا، أو انقلها إلى منفذ آخر، أو اجعلها طبقًا خاصًا أو وجبة للموظفين.', 'Usarlo per primo, spostarlo in un altro punto vendita, un piatto del giorno o il pasto del personale.') },
    ],
    more: [
      {
        points: [
          t('Stock worked out every night from sales, deliveries and logged waste.', 'Der Bestand wird jede Nacht aus Verkäufen, Lieferungen und erfasstem Abfall berechnet.', 'يُحسب المخزون كل ليلة من المبيعات والتوريدات والهدر المسجّل.', 'Le scorte calcolate ogni notte da vendite, consegne e sprechi registrati.'),
          t('Food, beverage and inventory, each item with what is left and when it runs out.', 'Speisen, Getränke und Inventar, jeder Artikel mit Restmenge und wann er ausgeht.', 'الأطعمة والمشروبات والمستلزمات، كل صنف مع المتبقي منه وموعد نفاده.', 'Cibo, bevande e inventario, ogni articolo con quanto resta e quando finisce.'),
          t('Stock valued at the hotel’s chosen method, weighted average cost by default.', 'Der Bestand wird nach der Methode des Hotels bewertet, standardmäßig zum gewichteten Durchschnittspreis.', 'يُقيَّم المخزون بالطريقة التي يختارها الفندق، وبمتوسط التكلفة المرجّح افتراضيًا.', 'Le scorte valorizzate con il metodo scelto dall’hotel, di norma al costo medio ponderato.'),
        ],
      },
    ],
    photo: tileStock,
    photoFocus: '50% 40%',
    tilePoints: [
      t('Stock worked out every night from sales, deliveries and waste.', 'Bestand jede Nacht aus Verkäufen, Lieferungen und Abfall berechnet.', 'مخزون يُحسب كل ليلة من المبيعات والتوريدات والهدر.', 'Scorte calcolate ogni notte da vendite, consegne e sprechi.'),
      t('What runs out before the next delivery.', 'Was vor der nächsten Lieferung ausgeht.', 'ما ينفد قبل التوريد التالي.', 'Cosa finisce prima della prossima consegna.'),
      t('Expiring batches, with what to do with each.', 'Ablaufende Chargen, und was mit jeder zu tun ist.', 'دفعات تقترب من انتهاء صلاحيتها، مع ما يجب فعله بكل منها.', 'Lotti in scadenza, con cosa fare di ognuno.'),
    ],
    rows: [
      {
        id: 'expiring',
        icon: 'expiry',
        film: 'expiry',
        name: t('Expiring soon', 'Läuft bald ab', 'ينتهي قريباً', 'In scadenza'),
        line: t('Use it before it expires.', 'Verbrauchen, bevor es abläuft.', 'استخدمه قبل أن تنتهي صلاحيته.', 'Usalo prima che scada.'),
        points: [
          t('Batches come from deliveries, with their use-by date.', 'Chargen kommen aus den Lieferungen, mit ihrem Verbrauchsdatum.', 'تأتي الدفعات من التوريدات مع تاريخ انتهاء صلاحيتها.', 'I lotti arrivano dalle consegne, con la loro data di scadenza.'),
          t('It suggests what to do with each batch by fixed rules: normal use first, then a transfer to the outlet that uses it most, then a special, then the staff meal.', 'Für jede Charge schlägt es nach festen Regeln vor, was zu tun ist: zuerst normal verbrauchen, dann an das Outlet umbuchen, das am meisten davon braucht, dann ein Tagesangebot, dann das Personalessen.', 'ويقترح ما يُفعل بكل دفعة وفق قواعد ثابتة: الاستخدام العادي أولًا، ثم التحويل إلى المنفذ الأكثر استخدامًا لها، ثم طبق خاص، ثم وجبة الموظفين.', 'Per ogni lotto suggerisce cosa fare con regole fisse: prima l’uso normale, poi un trasferimento al punto vendita che lo usa di più, poi un piatto del giorno, poi il pasto del personale.'),
          t('At risk: what normal use will not finish in time, with its value.', 'Gefährdet: was der normale Verbrauch nicht rechtzeitig aufbraucht, mit seinem Wert.', 'المعرّض للخطر: ما لن يكفي الاستخدام العادي لإنهائه في الوقت المناسب، مع قيمته.', 'A rischio: ciò che l’uso normale non finirà in tempo, con il suo valore.'),
          t('Expired on the shelf, counted apart.', 'Auf dem Regal abgelaufen, getrennt gezählt.', 'ما انتهت صلاحيته على الرف يُحسب منفصلًا.', 'Scaduto sullo scaffale, contato a parte.'),
        ],
      },
      {
        id: 'recipes',
        icon: 'stock',
        name: t('Recipes and costs', 'Rezepte und Kosten', 'الوصفات والتكاليف', 'Ricette e costi'),
        line: t('What each dish costs to make, at today’s prices.', 'Was jedes Gericht in der Herstellung kostet, zu heutigen Preisen.', 'كم يكلّف تحضير كل طبق، بأسعار اليوم.', 'Quanto costa preparare ogni piatto, ai prezzi di oggi.'),
        points: [
          t('Cost per portion at today’s ingredient prices, every ingredient line with its price, against the selling price, with gross profit, margin and cost change.', 'Kosten pro Portion zu heutigen Zutatenpreisen, jede Zutat mit ihrem Preis, gegen den Verkaufspreis, mit Rohertrag, Marge und Kostenänderung.', 'تكلفة الحصة بأسعار المكونات اليوم، وكل مكوّن بسعره، مقابل سعر البيع، مع إجمالي الربح والهامش وتغير التكلفة.', 'Costo per porzione ai prezzi di oggi degli ingredienti, ogni ingrediente con il suo prezzo, contro il prezzo di vendita, con utile lordo, margine e variazione del costo.'),
        ],
      },
    ],
  },

  takes: {
    key: 'takes',
    icon: 'takes',
    tone: 'teal',
    mark: t('more than we sold', 'mehr verbraucht', 'أكثر مما بعنا', 'più di quanto venduto'),
    pagePhoto: pageTakes,
    pagePhotoFocus: '50% 45%',
    name: t('Stock takes', 'Inventuren', 'الجرد', 'Inventari'),
    menu: t('Count on a phone, see what went missing.', 'Auf dem Handy zählen, sehen, was fehlt.', 'اجرد على الهاتف، واعرف ما فُقد.', 'Conta sul telefono, vedi cosa manca.'),
    headline: t('Why did we use more than we sold?', 'Warum haben wir mehr verbraucht als verkauft?', 'لماذا استخدمنا أكثر مما بعنا؟', 'Perché abbiamo usato più di quanto venduto?'),
    intro: t('Count on a phone. Tyll explains every gap, in the kitchen and at the bar.', 'Auf dem Handy zählen. Tyll erklärt jede Lücke, in der Küche und an der Bar.', 'اجرد على الهاتف. ويشرح Tyll كل فرق، في المطبخ وفي البار.', 'Conta sul telefono. Tyll spiega ogni differenza, in cucina e al bar.'),
    see: [
      { title: t('Count on a phone', 'Auf dem Handy zählen', 'الجرد على الهاتف', 'Conta sul telefono'), text: t('Walk the storeroom in order, tap “Looks right” or change it. Scan a barcode or type.', 'Gehen Sie das Lager der Reihe nach ab, tippen Sie „Stimmt, weiter“ oder ändern Sie die Menge. Barcode scannen oder eintippen.', 'تجوّل في المخزن بالترتيب، وانقر «صحيح، التالي» أو غيّر الكمية. امسح الباركود أو اكتب.', 'Percorri il magazzino in ordine, tocca “Corretto, avanti” o cambia la quantità. Scansiona un codice a barre o digita.') },
      { title: t('Approve the count', 'Zählung freigeben', 'اعتماد الجرد', 'Approva il conteggio'), text: t('Stock only changes once the count is approved.', 'Der Bestand ändert sich erst, wenn die Zählung freigegeben ist.', 'لا يتغير المخزون إلا بعد اعتماد الجرد.', 'Le scorte cambiano solo quando il conteggio è approvato.') },
      { title: t('Every gap explained', 'Jede Lücke erklärt', 'تفسير كل فرق', 'Ogni differenza spiegata'), text: t('Use against what sales and recipes explain, the possible causes, then a recount or a correction.', 'Verbrauch gegen das, was Verkäufe und Rezepte erklären, die möglichen Ursachen, dann eine Nachzählung oder Korrektur.', 'الاستخدام مقابل ما تفسّره المبيعات والوصفات، والأسباب المحتملة، ثم إعادة جرد أو تصحيح.', 'Il consumo contro ciò che spiegano vendite e ricette, le cause possibili, poi un riconteggio o una correzione.') },
    ],
    more: [
      {
        points: [
          t('A month-end report lists approved stock takes and the variance for accounting.', 'Ein Monatsabschlussbericht listet die freigegebenen Inventuren und die Abweichungen für die Buchhaltung.', 'يسرد تقرير نهاية الشهر عمليات الجرد المعتمدة والفروق لقسم المحاسبة.', 'Un report di fine mese elenca gli inventari approvati e gli scostamenti per la contabilità.'),
          t('Blind counts for audits hide what is expected.', 'Blindzählungen für Prüfungen verbergen den Sollbestand.', 'الجرد الأعمى للتدقيق يخفي الكمية المتوقعة.', 'I conteggi alla cieca per le verifiche nascondono le quantità attese.'),
        ],
        foot: t('The case explanation is assembled by rules from the recorded facts, not by a language model.', 'Die Erklärung des Falls wird nach Regeln aus den erfassten Fakten zusammengesetzt, nicht von einem Sprachmodell.', 'يُجمع شرح الحالة وفق قواعد من الوقائع المسجّلة، وليس بواسطة نموذج لغوي.', 'La spiegazione del caso è composta con regole dai fatti registrati, non da un modello linguistico.'),
      },
    ],
    photo: tileTakes,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Count on a phone, by barcode or by typing.', 'Auf dem Handy zählen, per Barcode oder Eingabe.', 'اجرد على الهاتف، بالباركود أو بالكتابة.', 'Conta sul telefono, con il codice a barre o digitando.'),
      t('Used against sold, with the possible causes.', 'Verbrauch gegen Verkauf, mit den möglichen Ursachen.', 'المستخدم مقابل المباع، مع الأسباب المحتملة.', 'Usato contro venduto, con le cause possibili.'),
      t('Drinks poured but never billed, by outlet and shift.', 'Ausgeschenkte, nie berechnete Getränke, je Outlet und Schicht.', 'مشروبات سُكبت ولم تُفوتر، حسب المنفذ والوردية.', 'Bevande versate ma mai fatturate, per punto vendita e turno.'),
    ],
    rows: [
      {
        id: 'missing-stock',
        icon: 'takes',
        name: t('Missing stock', 'Fehlender Bestand', 'المخزون المفقود', 'Scorte mancanti'),
        line: t('Used against sold, with the possible causes.', 'Verbrauch gegen Verkauf, mit den möglichen Ursachen.', 'المستخدم مقابل المباع، مع الأسباب المحتملة.', 'Usato contro venduto, con le cause possibili.'),
        points: [
          t('Between two counts, Tyll compares what was actually used with what the recipes of what was sold explain, after logged waste and transfers. For example: wagyu beef mince use at Mercado is 1.8 kg above the recipes, €86.', 'Zwischen zwei Zählungen vergleicht Tyll den tatsächlichen Verbrauch mit dem, was die Rezepte des Verkauften erklären, nach erfasstem Abfall und Umbuchungen. Zum Beispiel: Der Verbrauch von Wagyu-Rinderhack im Mercado liegt 1,8 kg über den Rezepten, 86 €.', 'بين عمليتي جرد، يقارن Tyll ما استُخدم فعلًا بما تفسّره وصفات ما بيع، بعد الهدر المسجّل والتحويلات. مثلًا: استخدام لحم واغيو المفروم في Mercado أعلى من الوصفات بـ 1.8 كغ، أي €86.', 'Tra due conteggi, Tyll confronta quanto si è usato davvero con quanto spiegano le ricette di ciò che è stato venduto, dopo sprechi registrati e trasferimenti. Per esempio: il consumo di macinato di manzo wagyu al Mercado è 1,8 kg oltre le ricette, 86 €.'),
          t('The case shows the counts, deliveries and sales in order, and the possible causes with what the records show for each: dishes not charged, comps, portions larger than the recipe, prep waste not logged, wrong recipe, staff meals, spoilage, wrong count, transfers not recorded, stock taken without authorisation.', 'Der Fall zeigt Zählungen, Lieferungen und Verkäufe der Reihe nach und die möglichen Ursachen mit dem, was die Daten zu jeder zeigen: nicht berechnete Gerichte, Gratisartikel, größere Portionen als im Rezept, nicht erfasster Vorbereitungsabfall, falsches Rezept, Personalessen, Verderb, falsche Zählung, nicht erfasste Umbuchungen, ohne Genehmigung entnommener Bestand.', 'تعرض الحالة الجرد والتوريدات والمبيعات بالترتيب، والأسباب المحتملة مع ما تُظهره السجلات لكل منها: أطباق لم تُحتسب، وأصناف مجانية، وحصص أكبر من الوصفة، وهدر تحضير غير مسجّل، ووصفة خاطئة، ووجبات الموظفين، والتلف، وجرد خاطئ، وتحويلات غير مسجّلة، ومخزون أُخذ دون تصريح.', 'Il caso mostra in ordine conteggi, consegne e vendite, e le cause possibili con ciò che i dati dicono di ciascuna: piatti non addebitati, omaggi, porzioni più grandi della ricetta, scarti di preparazione non registrati, ricetta sbagliata, pasti del personale, deterioramento, conteggio sbagliato, trasferimenti non registrati, scorte prelevate senza autorizzazione.'),
          t('The manager can record a recount, log missed waste or correct the recipe. Corrections are added and never replace the records.', 'Die Führungskraft kann eine Nachzählung erfassen, vergessenen Abfall nachtragen oder das Rezept korrigieren. Korrekturen kommen hinzu und ersetzen nie die Daten.', 'يمكن للمدير تسجيل إعادة جرد، أو تسجيل هدر فائت، أو تصحيح الوصفة. وتُضاف التصحيحات ولا تحل أبدًا محل السجلات.', 'Il responsabile può registrare un riconteggio, aggiungere sprechi dimenticati o correggere la ricetta. Le correzioni si aggiungono e non sostituiscono mai i dati.'),
        ],
      },
      {
        id: 'over-pouring',
        icon: 'pour',
        film: 'pour',
        name: t('Over pouring', 'Überschenken', 'الإفراط في السكب', 'Versamento eccessivo'),
        line: t('Find drinks never billed.', 'Nie berechnete Getränke finden.', 'اكتشف المشروبات غير المفوترة.', 'Trova le bevande mai fatturate.'),
        points: [
          t('How many glasses each bottle gave, once bottles opened are recorded.', 'Wie viele Gläser jede Flasche ergab, sobald geöffnete Flaschen erfasst sind.', 'كم كأسًا أعطت كل زجاجة، بمجرد تسجيل الزجاجات المفتوحة.', 'Quanti bicchieri ha dato ogni bottiglia, una volta registrate le bottiglie aperte.'),
          t('Wine by the glass and spirits by the measure.', 'Wein im Glas und Spirituosen nach Maß.', 'المشروبات بالكأس وبالمعيار.', 'Vino al calice e distillati a misura.'),
          t('Missing drinks between counts.', 'Fehlende Getränke zwischen zwei Zählungen.', 'المشروبات المفقودة بين عمليتي جرد.', 'Bevande mancanti tra due conteggi.'),
          t('Where and when: by outlet and shift, with no names.', 'Wo und wann: nach Outlet und Schicht, ohne Namen.', 'أين ومتى: حسب المنفذ والوردية، دون أسماء.', 'Dove e quando: per punto vendita e turno, senza nomi.'),
        ],
        next: t('Today the bottles opened come from your counts. Next: a quick scan of each empty bottle before it is binned, and later smart pourers and flow meters.', 'Heute kommen die geöffneten Flaschen aus Ihren Zählungen. Als Nächstes: ein kurzer Scan jeder leeren Flasche, bevor sie entsorgt wird, und später intelligente Ausgießer und Durchflussmesser.', 'اليوم تأتي الزجاجات المفتوحة من عمليات الجرد لديك. والخطوة التالية: مسح سريع لكل زجاجة فارغة قبل رميها، ثم لاحقًا سكّابات ذكية وعدّادات تدفق.', 'Oggi le bottiglie aperte arrivano dai tuoi conteggi. Prossimo passo: una rapida scansione di ogni bottiglia vuota prima di buttarla, e più avanti dosatori intelligenti e misuratori di flusso.'),
      },
    ],
    soon: {
      lead: t('Coming next.', 'Als Nächstes.', 'قريبًا.', 'In arrivo.'),
      items: [
        t('Stock per item that starts from that item’s first count, so you don’t need a full opening count.', 'Bestand je Artikel ab seiner ersten Zählung, damit Sie keine vollständige Eröffnungsinventur brauchen.', 'مخزون لكل صنف يبدأ من أول جرد له، فلا تحتاج إلى جرد افتتاحي كامل.', 'Scorte per articolo a partire dal primo conteggio di quell’articolo, così non serve un inventario iniziale completo.'),
      ],
    },
  },

  waste: {
    key: 'waste',
    icon: 'waste',
    tone: 'teal',
    mark: t('throw away', 'weggeworfen', 'رميت', 'buttato'),
    pagePhoto: pageWaste,
    pagePhotoFocus: '50% 62%',
    proof: { kind: 'number', card: 0 },
    name: t('Log waste', 'Abfall erfassen', 'تسجيل الهدر', 'Registra sprechi'),
    menu: t('See what waste costs you.', 'Sehen, was Abfall kostet.', 'اعرف كم يكلفك الهدر.', 'Scopri quanto ti costa lo spreco.'),
    headline: t('What did you throw away today?', 'Was haben Sie heute weggeworfen?', 'ماذا رميت اليوم؟', 'Cosa hai buttato oggi?'),
    intro: t('Two taps: the item, then the amount. Add a reason if you want.', 'Zwei Tipps: Artikel, dann Menge. Ein Grund ist optional.', 'نقرتان: الصنف ثم الكمية. وأضف السبب إن أردت.', 'Due tocchi: l’articolo, poi la quantità. Il motivo, se vuoi.'),
    see: [
      { title: t('What gets thrown away', 'Was weggeworfen wird', 'ما الذي يُرمى', 'Cosa viene buttato via'), text: t('Tap the item, tap the amount. Two taps, with Undo.', 'Artikel tippen, Menge tippen. Zwei Tipps, mit Rückgängig.', 'انقر الصنف ثم الكمية. نقرتان، مع إمكانية التراجع.', 'Tocca l’articolo, tocca la quantità. Due tocchi, con Annulla.') },
      { title: t('What each entry cost', 'Was jeder Eintrag kostet', 'تكلفة كل إدخال', 'Quanto costa ogni voce'), text: t('Today’s loss at a glance, and every entry with its cost.', 'Der heutige Verlust auf einen Blick, jeder Eintrag mit seinen Kosten.', 'خسارة اليوم بنظرة واحدة، وكل إدخال مع تكلفته.', 'La perdita di oggi a colpo d’occhio, ogni voce con il suo costo.') },
      { title: t('A daily log to check', 'Ein Tagesprotokoll zum Prüfen', 'سجل يومي للمراجعة', 'Un registro giornaliero da controllare'), text: t('Read it and see what waste costs you.', 'Lesen Sie es und sehen Sie, was Abfall kostet.', 'اقرأه واعرف كم يكلفك الهدر.', 'Leggilo e scopri quanto ti costa lo spreco.') },
    ],
    more: [
      {
        points: [
          t('Food, beverage and inventory (glassware, plates, linen) are logged separately.', 'Speisen, Getränke und Inventar (Gläser, Teller, Wäsche) werden getrennt erfasst.', 'تُسجَّل الأطعمة والمشروبات والمستلزمات (الأواني الزجاجية والأطباق والبياضات) كلٌّ على حدة.', 'Cibo, bevande e inventario (bicchieri, piatti, biancheria) si registrano separatamente.'),
          t('Waste and breakage are tracked separately, per outlet.', 'Abfall und Bruch werden getrennt verfolgt, je Outlet.', 'يُتابَع الهدر والكسر كلٌّ على حدة، لكل منفذ.', 'Sprechi e rotture sono tracciati separatamente, per punto vendita.'),
          t('Expired is its own reason, so food that passed its date shows apart from spoilage.', 'Abgelaufen ist ein eigener Grund, so erscheint Ware nach ihrem Datum getrennt vom Verderb.', '«منتهي الصلاحية» سبب مستقل، فيظهر ما تجاوز تاريخه منفصلًا عن التلف.', 'Scaduto è un motivo a sé, così ciò che ha superato la data appare separato dal deterioramento.'),
          t('Late entries are marked, and a correction is added without overwriting the original.', 'Späte Einträge werden markiert, und eine Korrektur kommt hinzu, ohne das Original zu überschreiben.', 'تُميَّز الإدخالات المتأخرة، ويُضاف التصحيح دون استبدال الأصل.', 'Le voci tardive sono segnate, e una correzione si aggiunge senza sovrascrivere l’originale.'),
          t('Waste and breakage this week against last week, and the last 30 days day by day.', 'Abfall und Bruch dieser Woche gegen die Vorwoche, und die letzten 30 Tage Tag für Tag.', 'الهدر والكسر هذا الأسبوع مقابل الأسبوع الماضي، وآخر 30 يومًا يومًا بيوم.', 'Sprechi e rotture di questa settimana contro la precedente, e gli ultimi 30 giorni giorno per giorno.'),
          t('Possible reasons and how to help, by outlet and reason, worked out by fixed rules. To check, not proven.', 'Mögliche Ursachen und was hilft, je Outlet und Grund, nach festen Regeln ermittelt. Zum Prüfen, nicht bewiesen.', 'الأسباب المحتملة وكيفية المساعدة، لكل منفذ وسبب، وفق قواعد ثابتة. للتحقق، وليست مثبتة.', 'Cause possibili e come aiutare, per punto vendita e motivo, calcolate con regole fisse. Da verificare, non provate.'),
        ],
      },
    ],
    photo: tileWaste,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Two taps: the item, then the amount.', 'Zwei Tipps: Artikel, dann Menge.', 'نقرتان: الصنف ثم الكمية.', 'Due tocchi: l’articolo, poi la quantità.'),
      t('Food, beverage and inventory kept apart.', 'Speisen, Getränke und Inventar getrennt.', 'الأطعمة والمشروبات والمستلزمات كلٌّ على حدة.', 'Cibo, bevande e inventario separati.'),
      t('What waste cost you today and this month.', 'Was Abfall Sie heute und diesen Monat gekostet hat.', 'كم كلّفك الهدر اليوم وهذا الشهر.', 'Quanto ti è costato lo spreco oggi e questo mese.'),
    ],
  },
};
