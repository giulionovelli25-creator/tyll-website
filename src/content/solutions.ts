// The six solution pages, in English, German, Arabic and Italian, in the demo's own order and words: Log waste, Stock
// levels, Predictions, Revenue, Reconciliation, Over pouring (matched to demo.tyll.ai on 17 Nov 2026).

import type { ImageMetadata } from 'astro';
import type { Locale, SolutionKey } from '../i18n/routes';

import whyChef from '../assets/photos/why-chef.jpg';
import stockChef from '../assets/photos/stock-chef.jpg';
import forecastProduce from '../assets/photos/forecast-produce.jpg';
import revenuePayment from '../assets/photos/revenue-payment.jpg';
import reconciliation from '../assets/photos/reconciliation-reception.jpg';
import banquet from '../assets/photos/events-banquet.jpg';
// One real-world photograph beside each page's question (11 Nov 2026; real Pexels photographs, not generated ones, at
// the owner's request the same day; sources in src/assets/photos/CREDITS.md)
import pageWaste from '../assets/photos/waste-bin.jpg';
import pageStock from '../assets/photos/stock-shelf.jpg';
import pagePredictions from '../assets/photos/predictions-delivery.jpg';
import pageReconciliation from '../assets/photos/reconciliation-tickets.jpg';
import pageDrinks from '../assets/photos/drinks-cola.jpg';

type Text = Record<Locale, string>;
export type Solution = {
  key: SolutionKey;
  icon: 'waste' | 'stock' | 'forecast' | 'revenue' | 'finance' | 'pour';
  photo: ImageMetadata;
  photoAlt: Text;
  /** Where the photo's subject sits, so cropping keeps it in view */
  photoFocus: string;
  /** The colour this feature has in the product (Demo-Tyll's MODULE_TONE); tokens in global.css */
  tone: 'teal' | 'violet' | 'blue' | 'rose';
  /** The one word or phrase of the headline shown in that colour: an exact part of the headline in each language */
  mark: Text;
  /** The photograph beside the question on the solution's own page, and where its subject sits */
  pagePhoto: ImageMetadata;
  pagePhotoFocus: string;
  /** The number or statement shown after the film, always text the site already has: one of the homepage's three
      numbers (`home.why.cards`), one of the hotel story's problems (`home.tour.steps`) or a FAQ answer (`faq`). */
  proof: { kind: 'number'; card: 0 | 2 } | { kind: 'story'; step: 0 | 1 | 2 } | { kind: 'faq'; id: string };
  name: Text;
  menu: Text;
  headline: Text;
  intro: Text;
  /** "What you are about to see", above the film: what comes in, what Tyll shows, what you do with it */
  see: { title: Text; text: Text }[];
  /** A short extra section under the film (the demo's other features for this product): one or two groups of points,
      each with an optional title, a lead-in line and a closing line */
  more?: { title?: Text; lead?: Text; points: Text[]; foot?: Text }[];
  /** Features of this product that are still in development */
  soonNote?: Text;
  note?: Text;
};

const t = (en: string, de: string, ar: string, it: string): Text => ({ en, de, ar, it });

export const solutions: Record<SolutionKey, Solution> = {
  waste: {
    key: 'waste',
    icon: 'waste',
    photo: whyChef,
    photoAlt: t('A chef\'s hands placing a garnish on a plate with tweezers.', 'Die Hände eines Kochs setzen mit einer Pinzette eine Garnitur auf einen Teller.', 'يدا طاهٍ تضعان زينة على طبق بملقط صغير.', 'Le mani di uno chef posano una guarnizione su un piatto con una pinzetta.'),
    photoFocus: '50% 50%',
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
        title: t('What staff log', 'Was das Team erfasst', 'ما يسجله الموظفون', 'Cosa registra il personale'),
        points: [
          t('Food, beverage and inventory (glassware, plates, linen) are logged separately.', 'Speisen, Getränke und Inventar (Gläser, Teller, Wäsche) werden getrennt erfasst.', 'تُسجَّل الأطعمة والمشروبات والمستلزمات (الأواني الزجاجية والأطباق والبياضات) كلٌّ على حدة.', 'Cibo, bevande e inventario (bicchieri, piatti, biancheria) si registrano separatamente.'),
          t('Waste and breakage are tracked separately, per outlet.', 'Abfall und Bruch werden getrennt verfolgt, je Outlet.', 'يُتابَع الهدر والكسر كلٌّ على حدة، لكل منفذ.', 'Sprechi e rotture sono tracciati separatamente, per punto vendita.'),
          t('Prepared dishes and notes can be logged too.', 'Auch zubereitete Gerichte und Notizen lassen sich erfassen.', 'يمكن تسجيل الأطباق المحضّرة والملاحظات أيضًا.', 'Si possono registrare anche piatti preparati e note.'),
          t('Expired is its own reason, so food that passed its date shows apart from spoilage.', 'Abgelaufen ist ein eigener Grund, so erscheint Ware nach ihrem Datum getrennt vom Verderb.', '«منتهي الصلاحية» سبب مستقل، فيظهر ما تجاوز تاريخه منفصلًا عن التلف.', 'Scaduto è un motivo a sé, così ciò che ha superato la data appare separato dal deterioramento.'),
          t('Late entries are marked, and a correction is added without overwriting the original.', 'Späte Einträge werden markiert, und eine Korrektur kommt hinzu, ohne das Original zu überschreiben.', 'تُميَّز الإدخالات المتأخرة، ويُضاف التصحيح دون استبدال الأصل.', 'Le voci tardive sono segnate, e una correzione si aggiunge senza sovrascrivere l’originale.'),
        ],
      },
      {
        title: t('What managers see', 'Was die Führung sieht', 'ما يراه المديرون', 'Cosa vedono i responsabili'),
        points: [
          t('Today’s log and the month’s total, split into food, beverage and inventory.', 'Das heutige Protokoll und die Monatssumme, aufgeteilt in Speisen, Getränke und Inventar.', 'سجل اليوم وإجمالي الشهر، مقسّمين إلى أطعمة ومشروبات ومستلزمات.', 'Il registro di oggi e il totale del mese, divisi tra cibo, bevande e inventario.'),
          t('Waste and breakage this week against last week, and the last 30 days day by day.', 'Abfall und Bruch dieser Woche gegen die Vorwoche, und die letzten 30 Tage Tag für Tag.', 'الهدر والكسر هذا الأسبوع مقابل الأسبوع الماضي، وآخر 30 يومًا يومًا بيوم.', 'Sprechi e rotture di questa settimana contro la precedente, e gli ultimi 30 giorni giorno per giorno.'),
          t('The top reason and the top item each week.', 'Der häufigste Grund und der häufigste Artikel jeder Woche.', 'السبب الأكثر تكرارًا والصنف الأكثر هدرًا كل أسبوع.', 'Il motivo e l’articolo principali di ogni settimana.'),
          t('Possible reasons and how to help, by outlet and reason, worked out by fixed rules. To check, not proven.', 'Mögliche Ursachen und was hilft, je Outlet und Grund, nach festen Regeln ermittelt. Zum Prüfen, nicht bewiesen.', 'الأسباب المحتملة وكيفية المساعدة، لكل منفذ وسبب، وفق قواعد ثابتة. للتحقق، وليست مثبتة.', 'Cause possibili e come aiutare, per punto vendita e motivo, calcolate con regole fisse. Da verificare, non provate.'),
        ],
      },
    ],
  },

  stock: {
    key: 'stock',
    icon: 'stock',
    photo: stockChef,
    photoAlt: t('Chefs seasoning and plating dishes under copper heat lamps in a hotel kitchen.', 'Köche würzen und richten Gerichte unter kupfernen Wärmelampen in einer Hotelküche an.', 'طهاة يتبّلون الأطباق ويقدّمونها تحت مصابيح تسخين نحاسية في مطبخ فندق.', 'Chef condiscono e impiattano sotto lampade di rame nella cucina di un hotel.'),
    photoFocus: '50% 40%',
    tone: 'teal',
    mark: t('really', 'wirklich', 'فعلًا', 'davvero'),
    pagePhoto: pageStock,
    pagePhotoFocus: '50% 60%',
    proof: { kind: 'story', step: 1 },
    name: t('Stock levels', 'Lagerbestand', 'مستويات المخزون', 'Livelli di scorta'),
    menu: t('Know what runs out first.', 'Wissen, was zuerst ausgeht.', 'اعرف ما ينفد أولًا.', 'Sai cosa finisce per primo.'),
    headline: t('What’s really on your shelf?', 'Was steht wirklich im Regal?', 'ما الموجود فعلًا على رفوفك؟', 'Cosa c’è davvero sullo scaffale?'),
    intro: t('See what runs out first, before a guest asks for it.', 'Sehen Sie, was zuerst ausgeht, bevor ein Gast danach fragt.', 'اعرف ما ينفد أولًا، قبل أن يطلبه ضيف.', 'Vedi cosa finisce per primo, prima che un ospite lo chieda.'),
    see: [
      { title: t('Critical, low or fine', 'Kritisch, niedrig oder in Ordnung', 'حرج أو منخفض أو جيد', 'Critico, basso o a posto'), text: t('Your whole stock at a glance.', 'Ihr ganzer Bestand auf einen Blick.', 'مخزونك كله بنظرة واحدة.', 'Tutta la merce a colpo d’occhio.') },
      { title: t('What runs out first', 'Was zuerst ausgeht', 'ما ينفد أولًا', 'Cosa finisce per primo'), text: t('Act on it before a guest asks for it.', 'Handeln Sie, bevor ein Gast danach fragt.', 'تصرّف قبل أن يطلبه ضيف.', 'Intervieni prima che un ospite lo chieda.') },
      { title: t('Why did we use more than we sold?', 'Warum haben wir mehr verbraucht als verkauft?', 'لماذا استخدمنا أكثر مما بعنا؟', 'Perché abbiamo usato più di quanto venduto?'), text: t('Use between two counts, against what the recipes of what was sold explain.', 'Verbrauch zwischen zwei Zählungen, gegen das, was die Rezepte des Verkauften erklären.', 'الاستخدام بين عمليتي جرد، مقابل ما تفسّره وصفات ما بيع.', 'Il consumo tra due conteggi, contro ciò che spiegano le ricette di quanto venduto.') },
    ],
    more: [
      {
        title: t('Why did we use more than we sold?', 'Warum haben wir mehr verbraucht als verkauft?', 'لماذا استخدمنا أكثر مما بعنا؟', 'Perché abbiamo usato più di quanto venduto?'),
        points: [
          t('Between two counts, Tyll compares what was actually used with what the recipes of what was sold explain, after logged waste and transfers. For example: wagyu beef mince use at Mercado is 1.8 kg above the recipes, €86.', 'Zwischen zwei Zählungen vergleicht Tyll den tatsächlichen Verbrauch mit dem, was die Rezepte des Verkauften erklären, nach erfasstem Abfall und Umbuchungen. Zum Beispiel: Der Verbrauch von Wagyu-Rinderhack im Mercado liegt 1,8 kg über den Rezepten, 86 €.', 'بين عمليتي جرد، يقارن Tyll ما استُخدم فعلًا بما تفسّره وصفات ما بيع، بعد الهدر المسجّل والتحويلات. مثلًا: استخدام لحم واغيو المفروم في Mercado أعلى من الوصفات بـ 1.8 كغ، أي €86.', 'Tra due conteggi, Tyll confronta quanto si è usato davvero con quanto spiegano le ricette di ciò che è stato venduto, dopo sprechi registrati e trasferimenti. Per esempio: il consumo di macinato di manzo wagyu al Mercado è 1,8 kg oltre le ricette, 86 €.'),
          t('The case shows the counts, deliveries and sales in order, and the possible causes with what the records show for each: dishes not charged, comps, portions larger than the recipe, prep waste not logged, wrong recipe, staff meals, spoilage, wrong count, transfers not recorded, stock taken without authorisation.', 'Der Fall zeigt Zählungen, Lieferungen und Verkäufe der Reihe nach und die möglichen Ursachen mit dem, was die Daten zu jeder zeigen: nicht berechnete Gerichte, Gratisartikel, größere Portionen als im Rezept, nicht erfasster Vorbereitungsabfall, falsches Rezept, Personalessen, Verderb, falsche Zählung, nicht erfasste Umbuchungen, ohne Genehmigung entnommener Bestand.', 'تعرض الحالة الجرد والتوريدات والمبيعات بالترتيب، والأسباب المحتملة مع ما تُظهره السجلات لكل منها: أطباق لم تُحتسب، وأصناف مجانية، وحصص أكبر من الوصفة، وهدر تحضير غير مسجّل، ووصفة خاطئة، ووجبات الموظفين، والتلف، وجرد خاطئ، وتحويلات غير مسجّلة، ومخزون أُخذ دون تصريح.', 'Il caso mostra in ordine conteggi, consegne e vendite, e le cause possibili con ciò che i dati dicono di ciascuna: piatti non addebitati, omaggi, porzioni più grandi della ricetta, scarti di preparazione non registrati, ricetta sbagliata, pasti del personale, deterioramento, conteggio sbagliato, trasferimenti non registrati, scorte prelevate senza autorizzazione.'),
          t('The manager can record a recount, log missed waste or correct the recipe. Corrections are added and never replace the records.', 'Die Führungskraft kann eine Nachzählung erfassen, vergessenen Abfall nachtragen oder das Rezept korrigieren. Korrekturen kommen hinzu und ersetzen nie die Daten.', 'يمكن للمدير تسجيل إعادة جرد، أو تسجيل هدر فائت، أو تصحيح الوصفة. وتُضاف التصحيحات ولا تحل أبدًا محل السجلات.', 'Il responsabile può registrare un riconteggio, aggiungere sprechi dimenticati o correggere la ricetta. Le correzioni si aggiungono e non sostituiscono mai i dati.'),
          t('Every case has an owner, a deadline and one outcome: legitimate correction, confirmed loss, revenue recovered or no finding, with the verified cause and the corrective action. The Money Back List can be exported as CSV.', 'Jeder Fall hat eine verantwortliche Person, eine Frist und ein Ergebnis: berechtigte Korrektur, bestätigter Verlust, zurückgeholter Umsatz oder kein Befund, mit der bestätigten Ursache und der Gegenmaßnahme. Die Rückholliste lässt sich als CSV exportieren.', 'لكل حالة مسؤول وموعد نهائي ونتيجة واحدة: تصحيح مشروع، أو خسارة مؤكدة، أو إيراد مسترد، أو لا نتيجة، مع السبب المؤكَّد والإجراء التصحيحي. ويمكن تصدير قائمة استرداد الأموال بصيغة CSV.', 'Ogni caso ha un responsabile, una scadenza e un esito: correzione legittima, perdita confermata, ricavo recuperato o nessun riscontro, con la causa verificata e l’azione correttiva. La Lista recuperi si può esportare in CSV.'),
        ],
        foot: t('The case explanation is assembled by rules from the recorded facts, not by a language model.', 'Die Erklärung des Falls wird nach Regeln aus den erfassten Fakten zusammengesetzt, nicht von einem Sprachmodell.', 'يُجمع شرح الحالة وفق قواعد من الوقائع المسجّلة، وليس بواسطة نموذج لغوي.', 'La spiegazione del caso è composta con regole dai fatti registrati, non da un modello linguistico.'),
      },
      {
        title: t('What expires in the next days, and what do we do with it?', 'Was läuft in den nächsten Tagen ab, und was machen wir damit?', 'ما الذي تنتهي صلاحيته في الأيام المقبلة، وماذا نفعل به؟', 'Cosa scade nei prossimi giorni, e cosa ne facciamo?'),
        points: [
          t('Batches come from deliveries, with their use-by date.', 'Chargen kommen aus den Lieferungen, mit ihrem Verbrauchsdatum.', 'تأتي الدفعات من التوريدات مع تاريخ انتهاء صلاحيتها.', 'I lotti arrivano dalle consegne, con la loro data di scadenza.'),
          t('Tyll shows what expires in 1, 2, 3 or 7 days and its value.', 'Tyll zeigt, was in 1, 2, 3 oder 7 Tagen abläuft, und seinen Wert.', 'يُظهر Tyll ما تنتهي صلاحيته خلال 1 أو 2 أو 3 أو 7 أيام وقيمته.', 'Tyll mostra cosa scade in 1, 2, 3 o 7 giorni e quanto vale.'),
          t('It suggests what to do with each batch by fixed rules: normal use first, then a transfer to the outlet that uses it most, then a special, then the staff meal.', 'Für jede Charge schlägt es nach festen Regeln vor, was zu tun ist: zuerst normal verbrauchen, dann an das Outlet umbuchen, das am meisten davon braucht, dann ein Tagesangebot, dann das Personalessen.', 'ويقترح ما يُفعل بكل دفعة وفق قواعد ثابتة: الاستخدام العادي أولًا، ثم التحويل إلى المنفذ الأكثر استخدامًا لها، ثم طبق خاص، ثم وجبة الموظفين.', 'Per ogni lotto suggerisce cosa fare con regole fisse: prima l’uso normale, poi un trasferimento al punto vendita che lo usa di più, poi un piatto del giorno, poi il pasto del personale.'),
          t('Stock is used first expiring, first out.', 'Verbraucht wird, was zuerst abläuft.', 'يُستخدم المخزون حسب الأقرب انتهاءً أولًا.', 'Si usa prima ciò che scade prima.'),
        ],
      },
      {
        title: t('Stock takes', 'Inventuren', 'عمليات الجرد', 'Inventari'),
        points: [
          t('Stock only changes once a count is approved.', 'Der Bestand ändert sich erst, wenn eine Zählung freigegeben ist.', 'لا يتغير المخزون إلا بعد اعتماد الجرد.', 'Le scorte cambiano solo quando un conteggio è approvato.'),
          t('A month-end report lists approved stock takes and the variance for accounting.', 'Ein Monatsabschlussbericht listet die freigegebenen Inventuren und die Abweichungen für die Buchhaltung.', 'يسرد تقرير نهاية الشهر عمليات الجرد المعتمدة والفروق لقسم المحاسبة.', 'Un report di fine mese elenca gli inventari approvati e gli scostamenti per la contabilità.'),
          t('The missing stock list, and stock valued at the hotel’s chosen method, weighted average cost by default.', 'Die Liste des fehlenden Bestands, und der Bestand bewertet nach der Methode des Hotels, standardmäßig zum gewichteten Durchschnittspreis.', 'قائمة المخزون المفقود، والمخزون مقيّمًا بالطريقة التي يختارها الفندق، بمتوسط التكلفة المرجّح افتراضيًا.', 'La lista delle scorte mancanti, e le scorte valorizzate con il metodo scelto dall’hotel, di norma al costo medio ponderato.'),
        ],
      },
      {
        title: t('Recipes and costs', 'Rezepte und Kosten', 'الوصفات والتكاليف', 'Ricette e costi'),
        points: [
          t('Cost per portion at today’s ingredient prices, every ingredient line with its price, against the selling price, with gross profit, margin and cost change.', 'Kosten pro Portion zu heutigen Zutatenpreisen, jede Zutat mit ihrem Preis, gegen den Verkaufspreis, mit Rohertrag, Marge und Kostenänderung.', 'تكلفة الحصة بأسعار المكونات اليوم، وكل مكوّن بسعره، مقابل سعر البيع، مع إجمالي الربح والهامش وتغير التكلفة.', 'Costo per porzione ai prezzi di oggi degli ingredienti, ogni ingrediente con il suo prezzo, contro il prezzo di vendita, con utile lordo, margine e variazione del costo.'),
        ],
      },
    ],
  },

  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    photo: forecastProduce,
    photoAlt: t('A chef chopping fresh herbs beside trays of lemons and greens.', 'Ein Koch hackt frische Kräuter neben Schalen mit Zitronen und Grün.', 'طاهٍ يفرم أعشابًا طازجة بجانب صوانٍ من الليمون والخضار.', 'Uno chef trita erbe fresche accanto a vassoi di limoni e verdure.'),
    photoFocus: '60% 45%',
    tone: 'blue',
    mark: t('guessing', 'Raten', 'تخمّن', 'indovinando'),
    pagePhoto: pagePredictions,
    pagePhotoFocus: '55% 40%',
    proof: { kind: 'story', step: 2 },
    name: t('Predictions', 'Prognosen', 'التوقعات', 'Previsioni'),
    menu: t('One order, ready to approve.', 'Eine Bestellung, bereit zur Freigabe.', 'طلب واحد جاهز للاعتماد.', 'Un ordine, pronto da approvare.'),
    headline: t('Still guessing what to order?', 'Raten Sie noch, was zu bestellen ist?', 'هل ما زلت تخمّن ماذا تطلب؟', 'Stai ancora indovinando cosa ordinare?'),
    intro: t('Get one draft order, built from covers, events and real usage.', 'Ein Bestellentwurf aus Gedecken, Events und echtem Verbrauch.', 'مسودة طلب واحدة مبنية على الأغطية والفعاليات والاستهلاك الفعلي.', 'Una bozza d’ordine da coperti, eventi e consumi reali.'),
    see: [
      { title: t('Covers, events and real usage', 'Gedecke, Events und echter Verbrauch', 'الأغطية والفعاليات والاستهلاك الفعلي', 'Coperti, eventi e consumi reali'), text: t('The numbers every order is built from.', 'Die Zahlen, aus denen jede Bestellung entsteht.', 'الأرقام التي يُبنى عليها كل طلب.', 'I numeri da cui nasce ogni ordine.') },
      { title: t('What to order today', 'Was heute zu bestellen ist', 'ماذا تطلب اليوم', 'Cosa ordinare oggi'), text: t('With the cost today and through to month end.', 'Mit den Kosten heute und bis Monatsende.', 'مع التكلفة اليوم وحتى نهاية الشهر.', 'Con il costo di oggi e fino a fine mese.') },
      { title: t('One draft order to approve', 'Ein Entwurf zur Freigabe', 'مسودة طلب واحدة للاعتماد', 'Una bozza da approvare'), text: t('You approve it, or automatic ordering sends it within your limits.', 'Sie geben ihn frei, oder die automatische Bestellung sendet ihn innerhalb Ihrer Limits.', 'تعتمدها أنت، أو يرسلها الطلب التلقائي ضمن حدودك.', 'La approvi tu, oppure l’ordine automatico la invia entro i tuoi limiti.') },
      { title: t('What did Tyll order for me this morning?', 'Was hat Tyll heute Morgen für mich bestellt?', 'ماذا طلب Tyll لي هذا الصباح؟', 'Cosa ha ordinato Tyll per me stamattina?'), text: t('At 06:00, one order per supplier. Small orders go out, the rest wait.', 'Um 06:00 eine Bestellung je Lieferant. Kleine gehen raus, der Rest wartet.', 'في 06:00، طلب واحد لكل مورد. الطلبات الصغيرة تُرسل، والباقي ينتظر.', 'Alle 06:00, un ordine per fornitore. I piccoli partono, gli altri attendono.') },
    ],
    more: [
      {
        title: t('Automatic ordering', 'Automatische Bestellung', 'الطلب التلقائي', 'Ordine automatico'),
        points: [
          t('Runs every morning at 06:00, after last night’s sales, today’s bookings and events are in.', 'Läuft jeden Morgen um 06:00, wenn die Umsätze der Nacht, die Buchungen und Events des Tages vorliegen.', 'يعمل كل صباح في 06:00، بعد وصول مبيعات الليلة الماضية وحجوزات اليوم وفعالياته.', 'Parte ogni mattina alle 06:00, quando ci sono le vendite della notte, le prenotazioni e gli eventi del giorno.'),
          t('One order per supplier, at the quantities on Predictions. Orders of €1,500 or less from the usual supplier with nothing to review go straight out; the rest wait for approval.', 'Eine Bestellung je Lieferant, in den Mengen aus den Prognosen. Bestellungen bis 1.500 € beim üblichen Lieferanten, bei denen nichts zu prüfen ist, gehen direkt raus; der Rest wartet auf Freigabe.', 'طلب واحد لكل مورد، بالكميات الظاهرة في التوقعات. الطلبات بقيمة €1,500 أو أقل من المورد المعتاد ولا شيء فيها للمراجعة تُرسل مباشرة، والباقي ينتظر الموافقة.', 'Un ordine per fornitore, con le quantità delle Previsioni. Gli ordini fino a 1.500 € dal fornitore abituale, senza nulla da verificare, partono subito; gli altri attendono l’approvazione.'),
          t('An order waits if it is over the limit, an item is more than 1.5 times its last 4 weeks of use, a fresh item covers more days than it keeps, or forecast confidence is low.', 'Eine Bestellung wartet, wenn sie über dem Limit liegt, ein Artikel mehr als das 1,5-Fache seines Verbrauchs der letzten 4 Wochen ist, frische Ware mehr Tage abdeckt, als sie hält, oder die Prognose unsicher ist.', 'ينتظر الطلب إذا تجاوز الحد، أو كان صنف فيه أكثر من 1.5 ضعف استهلاكه في آخر 4 أسابيع، أو كان صنف طازج يغطي أيامًا أكثر من مدة صلاحيته، أو كانت ثقة التوقع منخفضة.', 'Un ordine attende se supera il limite, se un articolo è oltre 1,5 volte il consumo delle ultime 4 settimane, se un fresco copre più giorni di quanti si conserva o se la previsione è poco affidabile.'),
          t('Some items can be set never to be ordered automatically, for example lobster or wagyu.', 'Einzelne Artikel lassen sich von der automatischen Bestellung ausnehmen, zum Beispiel Hummer oder Wagyu.', 'يمكن استثناء بعض الأصناف من الطلب التلقائي، مثل الكركند أو الواغيو.', 'Alcuni articoli si possono escludere dall’ordine automatico, per esempio aragosta o wagyu.'),
          t('Purchasing is told about every order that waits, the storekeeper about every delivery on its way. The rules are written out on one screen so anyone can check them.', 'Der Einkauf erfährt von jeder wartenden Bestellung, das Lager von jeder Lieferung, die unterwegs ist. Die Regeln stehen auf einem Bildschirm, damit jeder sie prüfen kann.', 'يُبلَّغ قسم المشتريات بكل طلب ينتظر، وأمين المخزن بكل توريد في الطريق. والقواعد مكتوبة في شاشة واحدة ليتحقق منها أي شخص.', 'Gli acquisti sono avvisati di ogni ordine in attesa, il magazziniere di ogni consegna in arrivo. Le regole sono scritte su una sola schermata, così chiunque può controllarle.'),
        ],
      },
      {
        title: t('How quantities are worked out', 'So werden Mengen berechnet', 'كيف تُحسب الكميات', 'Come si calcolano le quantità'),
        points: [
          t('Tyll’s own forecasting model works out every quantity from sales history, bookings, events, hotel occupancy and current stock. No AI chooses a quantity.', 'Tylls eigenes Prognosemodell berechnet jede Menge aus Verkaufshistorie, Buchungen, Events, Hotelauslastung und aktuellem Bestand. Keine KI wählt eine Menge.', 'يحسب نموذج التوقعات الخاص بـ Tyll كل كمية من سجل المبيعات والحجوزات والفعاليات وإشغال الفندق والمخزون الحالي. لا يختار أي ذكاء اصطناعي كمية.', 'Il modello di previsione di Tyll calcola ogni quantità da storico vendite, prenotazioni, eventi, occupazione dell’hotel e scorte attuali. Nessuna intelligenza artificiale sceglie una quantità.'),
          t('Next 7 days: expected guests, the share already booked, occupancy, events and confidence for each day, and guests per outlet split into booked, walk-ins and events.', 'Die nächsten 7 Tage: erwartete Gäste, der bereits gebuchte Anteil, Auslastung, Events und Verlässlichkeit für jeden Tag, und Gäste je Outlet nach gebucht, Laufkundschaft und Events.', 'الأيام السبعة المقبلة: الضيوف المتوقعون ونسبة المحجوز منهم والإشغال والفعاليات ومستوى الثقة لكل يوم، والضيوف لكل منفذ مقسّمين إلى محجوزين وقادمين دون حجز وفعاليات.', 'Prossimi 7 giorni: ospiti previsti, quota già prenotata, occupazione, eventi e affidabilità per ogni giorno, e ospiti per punto vendita divisi tra prenotati, senza prenotazione ed eventi.'),
          t('Plan the prep: choose the kitchen, the period (tomorrow, 3 days or 7 days) and the meal (breakfast, lunch or dinner), and get a kitchen plan with portions per dish and a kitchen checklist.', 'Vorbereitung planen: Küche, Zeitraum (morgen, 3 oder 7 Tage) und Mahlzeit (Frühstück, Mittag- oder Abendessen) wählen und einen Küchenplan mit Portionen pro Gericht und einer Checkliste erhalten.', 'خطط للتحضير: اختر المطبخ والفترة (الغد أو 3 أيام أو 7 أيام) والوجبة (الإفطار أو الغداء أو العشاء)، واحصل على خطة للمطبخ بالحصص لكل طبق وقائمة تحقق للمطبخ.', 'Pianifica la preparazione: scegli la cucina, il periodo (domani, 3 o 7 giorni) e il pasto (colazione, pranzo o cena), e ottieni un piano di cucina con le porzioni per piatto e una checklist.'),
        ],
      },
      {
        title: t('Par levels and purchase orders', 'Meldebestände und Bestellungen', 'مستويات المخزون وأوامر الشراء', 'Livelli di riordino e ordini d’acquisto'),
        points: [
          t('Par levels: a minimum and maximum per item and location, with levels suggested from the prediction.', 'Meldebestände: ein Minimum und Maximum je Artikel und Lagerort, mit Vorschlägen aus der Prognose.', 'مستويات المخزون: حد أدنى وأقصى لكل صنف وموقع، مع مستويات مقترحة من التوقعات.', 'Livelli di riordino: un minimo e un massimo per articolo e luogo, con livelli suggeriti dalla previsione.'),
          t('To order: what is below its minimum, brought back to the maximum in the supplier’s packs, less what is already on order, plus top-ups for the outlets from the main store.', 'Zu bestellen: was unter dem Minimum liegt, bis zum Maximum aufgefüllt in den Gebinden des Lieferanten, abzüglich bereits Bestelltem, dazu Nachschub für die Outlets aus dem Hauptlager.', 'للطلب: ما هو دون الحد الأدنى، يُعاد إلى الحد الأقصى بعبوات المورد، بعد خصم ما هو مطلوب بالفعل، إضافة إلى تزويد المنافذ من المخزن الرئيسي.', 'Da ordinare: ciò che è sotto il minimo, riportato al massimo nelle confezioni del fornitore, meno quanto già ordinato, più i rifornimenti dei punti vendita dal magazzino principale.'),
          t('Each purchase order goes to the supplier by email with its PDF, in the supplier’s packs, with VAT and the delivery day. Orders can also be placed by hand.', 'Jede Bestellung geht per E-Mail mit PDF an den Lieferanten, in seinen Gebinden, mit Mehrwertsteuer und Liefertag. Bestellungen lassen sich auch von Hand aufgeben.', 'يُرسل كل أمر شراء إلى المورد بالبريد الإلكتروني مع ملف PDF، بعبوات المورد، مع ضريبة القيمة المضافة ويوم التسليم. ويمكن أيضًا تقديم الطلبات يدويًا.', 'Ogni ordine d’acquisto va al fornitore via email con il suo PDF, nelle confezioni del fornitore, con IVA e giorno di consegna. Si può anche ordinare a mano.'),
        ],
      },
      {
        title: t('Orders and approval limits', 'Bestellungen und Freigabelimits', 'الطلبات وحدود الموافقة', 'Ordini e limiti di approvazione'),
        points: [
          t('Orders go through Draft, Waiting for approval, Approved not sent, Sent, Partly received, Received and Closed.', 'Bestellungen durchlaufen Entwurf, Wartet auf Freigabe, Freigegeben nicht gesendet, Gesendet, Teilweise eingegangen, Eingegangen und Geschlossen.', 'تمر الطلبات بمراحل: مسودة، بانتظار الموافقة، معتمد ولم يُرسل، أُرسل، مستلم جزئيًا، مستلم، مغلق.', 'Gli ordini passano per Bozza, In attesa di approvazione, Approvato non inviato, Inviato, Ricevuto in parte, Ricevuto e Chiuso.'),
          t('Each hotel sets its own approval chain. For example: purchasing reviews every order, accounting approves every order, the F&B director approves orders over €2,000 and the general manager also approves orders over €5,000.', 'Jedes Hotel legt seine eigene Freigabekette fest. Zum Beispiel: Der Einkauf prüft jede Bestellung, die Buchhaltung gibt jede Bestellung frei, der F&B-Direktor gibt Bestellungen über 2.000 € frei und die Hoteldirektion zusätzlich Bestellungen über 5.000 €.', 'يضع كل فندق سلسلة الموافقة الخاصة به. مثلًا: يراجع قسم المشتريات كل طلب، ويعتمد قسم المحاسبة كل طلب، ويعتمد مدير الأغذية والمشروبات الطلبات التي تتجاوز €2,000، ويعتمد المدير العام أيضًا الطلبات التي تتجاوز €5,000.', 'Ogni hotel imposta la sua catena di approvazione. Per esempio: gli acquisti esaminano ogni ordine, la contabilità approva ogni ordine, il direttore F&B approva gli ordini oltre 2.000 € e il direttore generale anche quelli oltre 5.000 €.'),
          t('Nobody approves an order they raised. The storekeeper receives what arrived, and only the delivered quantity is added to stock.', 'Niemand gibt eine eigene Bestellung frei. Das Lager nimmt an, was angekommen ist, und nur die gelieferte Menge kommt in den Bestand.', 'لا أحد يعتمد طلبًا أنشأه بنفسه. ويستلم أمين المخزن ما وصل، ولا تُضاف إلى المخزون إلا الكمية المسلَّمة.', 'Nessuno approva un ordine che ha creato. Il magazziniere riceve ciò che è arrivato, e solo la quantità consegnata entra nelle scorte.'),
        ],
      },
      {
        title: t('Suppliers and catalogue', 'Lieferanten und Katalog', 'الموردون والكتالوج', 'Fornitori e catalogo'),
        points: [
          t('Every supplier with contact, delivery days, lead time, order cut-off, minimum order and payment terms.', 'Jeder Lieferant mit Kontakt, Liefertagen, Vorlaufzeit, Bestellschluss, Mindestbestellwert und Zahlungsbedingungen.', 'كل مورد مع جهة الاتصال وأيام التوريد ومدة التجهيز وموعد إغلاق الطلبات والحد الأدنى للطلب وشروط الدفع.', 'Ogni fornitore con contatto, giorni di consegna, tempi di consegna, orario limite per gli ordini, ordine minimo e condizioni di pagamento.'),
          t('A catalogue per supplier with agreed prices, and a second supplier for most items. Tyll flags when the last invoice is above the agreed contract price.', 'Ein Katalog je Lieferant mit vereinbarten Preisen und einem zweiten Lieferanten für die meisten Artikel. Tyll markiert, wenn die letzte Rechnung über dem vereinbarten Vertragspreis liegt.', 'كتالوج لكل مورد بالأسعار المتفق عليها، ومورد ثانٍ لمعظم الأصناف. ويشير Tyll إلى آخر فاتورة تتجاوز سعر العقد المتفق عليه.', 'Un catalogo per fornitore con i prezzi concordati, e un secondo fornitore per la maggior parte degli articoli. Tyll segnala quando l’ultima fattura supera il prezzo di contratto.'),
          t('Suppliers are kept per hotel, so the same company can deliver to two hotels on different days, terms and prices.', 'Lieferanten werden je Hotel geführt, so kann dieselbe Firma zwei Hotels an verschiedenen Tagen, zu anderen Konditionen und Preisen beliefern.', 'يُحفظ الموردون لكل فندق، فيمكن لنفس الشركة أن تورّد لفندقين في أيام وبشروط وأسعار مختلفة.', 'I fornitori sono tenuti per hotel, così la stessa azienda può servire due hotel in giorni, condizioni e prezzi diversi.'),
        ],
      },
    ],
  },

  revenue: {
    key: 'revenue',
    icon: 'revenue',
    photo: revenuePayment,
    photoAlt: t('A waiter in white gloves holds a card terminal while a guest checks the bill.', 'Ein Kellner mit weißen Handschuhen hält ein Kartenterminal, während ein Gast die Rechnung prüft.', 'نادل بقفازين أبيضين يحمل جهاز الدفع بينما يراجع ضيف الفاتورة.', 'Un cameriere con guanti bianchi tiene il terminale mentre un ospite controlla il conto.'),
    photoFocus: '55% 12%',
    tone: 'violet',
    mark: t('money', 'Geld', 'المال', 'guadagnare'),
    pagePhoto: revenuePayment,
    pagePhotoFocus: '50% 4%',
    proof: { kind: 'faq', id: 'outlets' },
    name: t('Revenue', 'Umsatz', 'الإيرادات', 'Ricavi'),
    menu: t('See which outlet earns most.', 'Sehen, welches Outlet am meisten bringt.', 'اعرف أي منفذ يكسب أكثر.', 'Vedi quale punto vendita rende di più.'),
    headline: t('Which outlet really makes you money?', 'Welches Outlet bringt wirklich Geld?', 'أي منفذ يحقق لك المال فعلًا؟', 'Quale punto vendita ti fa guadagnare davvero?'),
    intro: t('Revenue and estimated operating contribution, by day and by outlet.', 'Umsatz und geschätzter Betriebsbeitrag, nach Tag und Outlet.', 'الإيرادات والمساهمة التشغيلية التقديرية حسب اليوم والمنفذ.', 'Ricavi e contributo operativo stimato, per giorno e punto vendita.'),
    see: [
      { title: t('Revenue and estimated cost by outlet', 'Umsatz und geschätzte Kosten je Outlet', 'الإيرادات والتكلفة التقديرية لكل منفذ', 'Ricavi e costi stimati per punto vendita'), text: t('For today, yesterday, 7 days, 30 days or a custom range.', 'Für heute, gestern, 7 Tage, 30 Tage oder einen eigenen Zeitraum.', 'لليوم أو الأمس أو 7 أيام أو 30 يومًا أو فترة تختارها.', 'Per oggi, ieri, 7 giorni, 30 giorni o un periodo a scelta.') },
      { title: t('Revenue beside estimated operating contribution', 'Umsatz neben geschätztem Betriebsbeitrag', 'الإيرادات بجانب المساهمة التشغيلية التقديرية', 'Ricavi accanto al contributo operativo stimato'), text: t('Side by side, by day and by outlet.', 'Nebeneinander, nach Tag und nach Outlet.', 'جنبًا إلى جنب، حسب اليوم وحسب المنفذ.', 'Fianco a fianco, per giorno e per punto vendita.') },
      { title: t('Your outlets, compared', 'Ihre Outlets im Vergleich', 'منافذك في مقارنة واحدة', 'I tuoi punti vendita a confronto'), text: t('See which one really makes you money.', 'Sehen Sie, welches wirklich Geld bringt.', 'اعرف أيّها يحقق لك المال فعلًا.', 'Vedi quale ti fa guadagnare davvero.') },
    ],
    more: [
      {
        points: [
          t('Revenue, estimated cost, estimated operating contribution and gross margin per outlet.', 'Umsatz, geschätzte Kosten, geschätzter Betriebsbeitrag und Bruttomarge je Outlet.', 'الإيرادات والتكلفة التقديرية والمساهمة التشغيلية التقديرية وهامش الربح الإجمالي لكل منفذ.', 'Ricavi, costi stimati, contributo operativo stimato e margine lordo per punto vendita.'),
          t('Guests and average bill.', 'Gäste und durchschnittliche Rechnung.', 'عدد الضيوف ومتوسط الفاتورة.', 'Ospiti e conto medio.'),
          t('All transactions, searchable by day.', 'Alle Transaktionen, nach Tag durchsuchbar.', 'كل المعاملات، قابلة للبحث حسب اليوم.', 'Tutte le transazioni, consultabili per giorno.'),
          t('Menu performance: units sold, margin per dish, and which margins are falling.', 'Menüleistung: verkaufte Einheiten, Marge pro Gericht und welche Margen sinken.', 'أداء القائمة: الوحدات المبيعة، والهامش لكل طبق، وأي الهوامش تتراجع.', 'Rendimento del menu: unità vendute, margine per piatto e quali margini stanno calando.'),
        ],
        foot: t('Every operating contribution figure is an estimate: labour comes from rostered hours and overheads are allocated.', 'Jeder Betriebsbeitrag ist eine Schätzung: Die Personalkosten kommen aus den geplanten Stunden, und die Gemeinkosten werden umgelegt.', 'كل رقم للمساهمة التشغيلية تقديري: تكلفة العمالة مأخوذة من ساعات جدول المناوبات، والتكاليف العامة موزّعة.', 'Ogni contributo operativo è una stima: il costo del personale deriva dalle ore dei turni e i costi generali sono ripartiti.'),
      },
    ],
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: reconciliation,
    photoAlt: t('A guest paying by card at a hotel reception desk beside a brass bell.', 'Ein Gast zahlt an einer Hotelrezeption neben einer Messingglocke mit Karte.', 'ضيف يدفع بالبطاقة عند مكتب استقبال فندق بجانب جرس نحاسي.', 'Un ospite paga con carta alla reception di un hotel accanto a un campanello d’ottone.'),
    photoFocus: '60% 50%',
    tone: 'violet',
    mark: t('never received', 'nie ankam', 'لم تستلمها', 'mai ricevuta'),
    pagePhoto: pageReconciliation,
    pagePhotoFocus: '40% 55%',
    proof: { kind: 'story', step: 0 },
    name: t('Reconciliation', 'Abgleich', 'المطابقة', 'Riconciliazione'),
    menu: t('Catch what doesn’t match.', 'Finden, was nicht stimmt.', 'اكتشف ما لا يتطابق.', 'Trova ciò che non coincide.'),
    headline: t('Are you paying for things you never received?', 'Zahlen Sie für Ware, die nie ankam?', 'هل تدفع ثمن أشياء لم تستلمها؟', 'Stai pagando merce mai ricevuta?'),
    intro: t('Bills against tickets. Invoices against deliveries. You only see what differs.', 'Gästerechnungen gegen Bons. Lieferantenrechnungen gegen Lieferungen. Sie sehen nur, was abweicht.', 'فواتير الضيوف مقابل التذاكر. فواتير الموردين مقابل التوريدات. لا ترى سوى الفروق.', 'Conti contro comande. Fatture contro consegne. Vedi solo ciò che non coincide.'),
    see: [
      { title: t('Your supplier invoices', 'Die Rechnungen Ihrer Lieferanten', 'فواتير الموردين لديك', 'Le fatture dei tuoi fornitori'), text: t('Checked against what you ordered and what arrived.', 'Geprüft gegen Bestellung und Lieferung.', 'تُطابَق مع ما طلبته وما استلمته.', 'Controllate con ciò che hai ordinato e ricevuto.') },
      { title: t('Every invoice with a difference', 'Jede Rechnung mit einer Abweichung', 'كل فاتورة بها فرق', 'Ogni fattura con una differenza'), text: t('Ordered, received and invoiced, side by side.', 'Bestellt, erhalten und berechnet, nebeneinander.', 'المطلوب والمستلم والمفوتر جنبًا إلى جنب.', 'Ordinato, ricevuto e fatturato, fianco a fianco.') },
      { title: t('One decision per invoice', 'Eine Entscheidung pro Rechnung', 'قرار واحد لكل فاتورة', 'Una decisione per fattura'), text: t('Flag it, correct it or approve it. Approving one that still has a difference needs a short note why.', 'Markieren, korrigieren oder freigeben. Wer eine Rechnung mit Abweichung freigibt, schreibt kurz, warum.', 'أشر إليها أو صحّحها أو اعتمدها. واعتماد فاتورة ما زال بها فرق يحتاج إلى ملاحظة قصيرة توضح السبب.', 'Segnala, correggi o approva. Per approvarne una che ha ancora una differenza serve una breve nota sul perché.') },
      { title: t('Does the cash in the drawer match the cash the till took?', 'Stimmt das Bargeld in der Kasse mit den Barumsätzen überein?', 'هل يطابق النقد في الدرج النقد الذي سجله الصندوق؟', 'I contanti nel cassetto corrispondono a quelli incassati dalla cassa?'), text: t('Per outlet and shift, counted cash against the cash bills on the till.', 'Je Outlet und Schicht: gezähltes Bargeld gegen die Barrechnungen der Kasse.', 'لكل منفذ ووردية: النقد المعدود مقابل الفواتير النقدية في الصندوق.', 'Per punto vendita e turno: contanti contati contro i conti in contanti della cassa.') },
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
          t('Room charges missing, duplicated or with a different amount', 'Zimmerbelastungen, die fehlen, doppelt sind oder einen anderen Betrag haben', 'رسوم غرف مفقودة أو مكررة أو بمبلغ مختلف', 'Addebiti in camera mancanti, doppi o con un importo diverso'),
          t('Usage above sales', 'Verbrauch über den Verkäufen', 'استخدام يتجاوز المبيعات', 'Consumo superiore alle vendite'),
        ],
        foot: t('A flag is a prompt to check, not a finding. Cases can be assigned, closed with an outcome and reopened, and every case lands on the Money Back List.', 'Ein Hinweis ist ein Anlass zur Prüfung, kein Befund. Fälle lassen sich zuweisen, mit Ergebnis abschließen und wieder öffnen, und jeder Fall landet auf der Rückholliste.', 'الإشارة دعوة للتحقق، وليست نتيجة. يمكن إسناد الحالات وإغلاقها بنتيجة وإعادة فتحها، وكل حالة تُضاف إلى قائمة استرداد الأموال.', 'Una segnalazione è un invito a controllare, non un risultato. I casi si possono assegnare, chiudere con un esito e riaprire, e ogni caso finisce nella Lista recuperi.'),
      },
      {
        title: t('How flags are judged', 'Wie Hinweise bewertet werden', 'كيف تُقيَّم الإشارات', 'Come si valutano le segnalazioni'),
        points: [
          t('Flags are counted per 1,000 orders by outlet, so busy and quiet outlets compare fairly.', 'Hinweise werden je 1.000 Bestellungen und Outlet gezählt, so lassen sich volle und ruhige Outlets fair vergleichen.', 'تُحسب الإشارات لكل 1,000 طلب في كل منفذ، فتُقارن المنافذ المزدحمة والهادئة بإنصاف.', 'Le segnalazioni si contano ogni 1.000 ordini per punto vendita, così punti affollati e tranquilli si confrontano in modo equo.'),
          t('A repeated pattern under one till login is flagged: at least 5 cases within 14 days.', 'Ein wiederholtes Muster unter einem Kassenlogin wird markiert: mindestens 5 Fälle in 14 Tagen.', 'يُشار إلى النمط المتكرر تحت حساب دخول واحد في الصندوق: 5 حالات على الأقل خلال 14 يومًا.', 'Uno schema ripetuto sotto un solo login di cassa viene segnalato: almeno 5 casi in 14 giorni.'),
          t('The limits (discount, complimentary items, refunds, late refunds, room charge tolerance) are agreed with each hotel at the start.', 'Die Grenzen (Rabatt, Gratisartikel, Rückerstattungen, verspätete Rückerstattungen, Toleranz bei Zimmerbelastungen) werden zu Beginn mit jedem Hotel vereinbart.', 'تُتفق الحدود (الخصم والأصناف المجانية والمبالغ المستردة والمبالغ المستردة المتأخرة وهامش رسوم الغرف) مع كل فندق في البداية.', 'I limiti (sconto, omaggi, rimborsi, rimborsi tardivi, tolleranza sugli addebiti in camera) si concordano con ogni hotel all’inizio.'),
          t('The demo has a worked example that shows how one flag is found, step by step.', 'Die Demo zeigt an einem Beispiel Schritt für Schritt, wie ein Hinweis entsteht.', 'يتضمن العرض التوضيحي مثالًا يوضح خطوة بخطوة كيف تُكتشف إشارة واحدة.', 'La demo ha un esempio che mostra passo per passo come nasce una segnalazione.'),
        ],
      },
      {
        title: t('Does the cash in the drawer match the cash the till took?', 'Stimmt das Bargeld in der Kasse mit den Barumsätzen überein?', 'هل يطابق النقد في الدرج النقد الذي سجله الصندوق؟', 'I contanti nel cassetto corrispondono a quelli incassati dalla cassa?'),
        points: [
          t('Per outlet and per shift: the day shift closes bills before 16:00, the night shift from 16:00 to close.', 'Je Outlet und Schicht: Die Tagschicht schließt Rechnungen vor 16:00, die Nachtschicht ab 16:00 bis Schluss.', 'لكل منفذ ولكل وردية: تُغلق الوردية النهارية الفواتير قبل 16:00، والوردية الليلية من 16:00 حتى الإغلاق.', 'Per punto vendita e per turno: il turno di giorno chiude i conti prima delle 16:00, quello di notte dalle 16:00 alla chiusura.'),
          t('The counted cash is set against the cash bills on the till, net of cash refunds.', 'Das gezählte Bargeld wird den Barrechnungen der Kasse gegenübergestellt, abzüglich Bar-Rückerstattungen.', 'يُقارن النقد المعدود بالفواتير النقدية في الصندوق، بعد خصم المبالغ النقدية المستردة.', 'I contanti contati si confrontano con i conti in contanti della cassa, al netto dei rimborsi in contanti.'),
          t('Small differences (€10, or 1% of the shift’s cash) are not flagged. Each difference can carry a note, for example “tip left in the drawer”.', 'Kleine Differenzen (10 € oder 1 % des Bargelds der Schicht) werden nicht markiert. Jede Differenz kann eine Notiz tragen, zum Beispiel „Trinkgeld in der Kasse gelassen“.', 'لا يُشار إلى الفروق الصغيرة (€10 أو 1% من نقد الوردية). ويمكن إرفاق ملاحظة بكل فرق، مثل «إكرامية تُركت في الدرج».', 'Le piccole differenze (10 € o l’1% dei contanti del turno) non vengono segnalate. Ogni differenza può avere una nota, per esempio «mancia lasciata nel cassetto».'),
        ],
        foot: t('A cash difference is something to check with the shift manager, not a finding about anyone.', 'Eine Bargelddifferenz klären Sie mit der Schichtleitung; sie ist kein Befund über eine Person.', 'فرق النقد أمر يُراجع مع مدير الوردية، وليس حكمًا على أي شخص.', 'Una differenza di cassa è da verificare con il responsabile del turno, non un giudizio su qualcuno.'),
      },
      {
        title: t('Deliveries and invoices', 'Lieferungen und Rechnungen', 'التوريدات والفواتير', 'Consegne e fatture'),
        points: [
          t('Every delivery checked three ways: ordered, delivered and invoiced, with the difference in units and money.', 'Jede Lieferung dreifach geprüft: bestellt, geliefert und berechnet, mit der Differenz in Einheiten und Geld.', 'يُفحص كل توريد بثلاث طرق: المطلوب والمسلَّم والمفوتر، مع الفرق بالوحدات والمال.', 'Ogni consegna controllata in tre modi: ordinato, consegnato e fatturato, con la differenza in unità e in denaro.'),
          t('Supplier invoices are approved on their own, after the order.', 'Lieferantenrechnungen werden eigens freigegeben, getrennt von der Bestellung.', 'تُعتمد فواتير الموردين بشكل منفصل عن الطلب.', 'Le fatture dei fornitori si approvano a parte, separate dall’ordine.'),
          t('A delivery with a difference offers a credit request: a polite email to copy. Tyll never sends it. Once a credit is recorded, it counts as money saved.', 'Eine Lieferung mit Differenz bietet eine Gutschriftanfrage an: eine höfliche E-Mail zum Kopieren. Tyll schickt sie nie selbst. Sobald eine Gutschrift erfasst ist, zählt sie als gespartes Geld.', 'يقدّم التوريد الذي به فرق طلب إشعار دائن: رسالة بريد إلكتروني مهذبة للنسخ. لا يرسلها Tyll أبدًا. وعند تسجيل الإشعار الدائن يُحتسب مالًا موفَّرًا.', 'Una consegna con una differenza propone una richiesta di nota di credito: un’email cortese da copiare. Tyll non la invia mai. Una volta registrato, il credito conta come denaro risparmiato.'),
          t('Tyll alerts when a confirmed delivery has not arrived, for example “Fresh fish delivery due 15:00 has not arrived”, with two actions: call the supplier, or order from the backup supplier.', 'Tyll warnt, wenn eine bestätigte Lieferung nicht angekommen ist, zum Beispiel „Frischfisch-Lieferung, fällig um 15:00, ist nicht angekommen“, mit zwei Aktionen: den Lieferanten anrufen oder beim Ersatzlieferanten bestellen.', 'ينبّه Tyll عندما لا يصل توريد مؤكد، مثل «توريد السمك الطازج المقرر في 15:00 لم يصل»، مع إجراءين: الاتصال بالمورد، أو الطلب من المورد البديل.', 'Tyll avvisa quando una consegna confermata non è arrivata, per esempio «La consegna di pesce fresco prevista alle 15:00 non è arrivata», con due azioni: chiamare il fornitore o ordinare dal fornitore di riserva.'),
        ],
      },
      {
        title: t('Budgets and payments', 'Budgets und Zahlungen', 'الميزانيات والمدفوعات', 'Budget e pagamenti'),
        points: [
          t('Budgets and reports: budget against actual by department, purchasing commitments and cost exceptions.', 'Budgets und Berichte: Budget gegen Ist je Abteilung, Einkaufsverpflichtungen und Kostenausnahmen.', 'الميزانيات والتقارير: الميزانية مقابل الفعلي لكل قسم، والتزامات الشراء، واستثناءات التكلفة.', 'Budget e report: budget contro consuntivo per reparto, impegni di acquisto ed eccezioni di costo.'),
          t('Card payments are reconciled by your payment provider. Matching the till against card company and bank statements runs as a separate Tyll product.', 'Kartenzahlungen gleicht Ihr Zahlungsanbieter ab. Der Abgleich der Kasse mit den Abrechnungen der Kartenanbieter und den Kontoauszügen ist ein eigenes Tyll-Produkt.', 'يطابق مزوّد الدفع لديك مدفوعات البطاقات. ومطابقة الصندوق مع كشوف شركات البطاقات والبنوك منتج منفصل من Tyll.', 'I pagamenti con carta li riconcilia il tuo fornitore di pagamenti. Il confronto della cassa con gli estratti dei circuiti delle carte e delle banche è un prodotto Tyll separato.'),
          t('Tyll never changes your systems. Tyll does not record payments.', 'Tyll ändert nie etwas in Ihren Systemen. Tyll erfasst keine Zahlungen.', 'لا يغيّر Tyll أي شيء في أنظمتك أبدًا. ولا يسجّل Tyll المدفوعات.', 'Tyll non modifica mai i tuoi sistemi. Tyll non registra pagamenti.'),
        ],
      },
    ],
  },

  pour: {
    key: 'pour',
    icon: 'pour',
    photo: banquet,
    photoAlt: t('A waiter setting a long banquet table with glasses and flowers.', 'Ein Kellner deckt eine lange Banketttafel mit Gläsern und Blumen ein.', 'نادل يُعدّ طاولة مأدبة طويلة بالكؤوس والزهور.', 'Un cameriere apparecchia un lungo tavolo da banchetto con bicchieri e fiori.'),
    photoFocus: '40% 50%',
    tone: 'teal',
    mark: t('never', 'nie', 'أبدًا', 'mai'),
    pagePhoto: pageDrinks,
    pagePhotoFocus: '50% 50%',
    proof: { kind: 'number', card: 2 },
    name: t('Over pouring', 'Überschenken', 'الإفراط في السكب', 'Versamento eccessivo'),
    menu: t('Find drinks never billed.', 'Nie berechnete Getränke finden.', 'اكتشف المشروبات غير المفوترة.', 'Trova le bevande mai fatturate.'),
    headline: t('How much of your bar never reaches a bill?', 'Wie viel von Ihrer Bar landet nie auf einer Rechnung?', 'كم من مشروبات البار لا يصل إلى الفاتورة أبدًا؟', 'Quanto del tuo bar non arriva mai in conto?'),
    intro: t('See the gap by outlet and shift, and what it is worth.', 'Die Lücke nach Outlet und Schicht, und was sie wert ist.', 'اعرف الفرق حسب المنفذ والوردية وقيمته.', 'La differenza per punto vendita e turno, e quanto vale.'),
    see: [
      { title: t('Last night’s bar sales', 'Die Barumsätze der letzten Nacht', 'مبيعات البار ليلة أمس', 'Le vendite bar di ieri sera'), text: t('Read from your POS, nothing to install.', 'Aus Ihrer Kasse gelesen, nichts zu installieren.', 'تُقرأ من نظام نقاط البيع لديك، ولا شيء للتثبيت.', 'Lette dal tuo POS, niente da installare.') },
      { title: t('Drinks poured but never billed', 'Eingeschenkt, aber nie berechnet', 'مشروبات سُكبت ولم تُفوتر', 'Versato ma mai fatturato'), text: t('Each line shows what was not billed and what it is worth.', 'Jede Zeile zeigt, was nicht berechnet wurde und was es wert ist.', 'يُظهر كل بند ما لم يُفوتر وكم قيمته.', 'Ogni riga mostra cosa non è stato fatturato e quanto vale.') },
      { title: t('A short list to check', 'Eine kurze Liste zum Prüfen', 'قائمة قصيرة للمراجعة', 'Una breve lista da controllare'), text: t('Know which bottle and which shift to look at.', 'Sie wissen, welche Flasche und welche Schicht Sie prüfen.', 'اعرف أي زجاجة وأي وردية تراجع.', 'Sai quale bottiglia e quale turno guardare.') },
    ],
    more: [
      {
        title: t('Two views', 'Zwei Ansichten', 'عرضان', 'Due viste'),
        points: [
          t('Where and when: by outlet and shift, with no names.', 'Wo und wann: nach Outlet und Schicht, ohne Namen.', 'أين ومتى: حسب المنفذ والوردية، دون أسماء.', 'Dove e quando: per punto vendita e turno, senza nomi.'),
          t('Who was on, day by day: what was not billed each day, set against the rota. For each person: role, shifts worked, how many of the 5 costliest days they were on, and the amount not billed per shift when they were on against when they were off.', 'Wer im Dienst war, Tag für Tag: was jeden Tag nicht berechnet wurde, neben dem Dienstplan. Für jede Person: Rolle, gearbeitete Schichten, an wie vielen der 5 teuersten Tage sie im Dienst war, und der nicht berechnete Betrag pro Schicht mit ihr gegenüber ohne sie.', 'من كان في الوردية، يومًا بيوم: ما لم يُفوتر كل يوم مقارنةً بجدول المناوبات. ولكل شخص: دوره، والورديات التي عملها، وعدد الأيام التي كان فيها في الوردية من أكثر 5 أيام تكلفة، والمبلغ غير المفوتر لكل وردية حين كان فيها مقابل حين لم يكن.', 'Chi era in turno, giorno per giorno: cosa non è stato fatturato ogni giorno, accanto ai turni. Per ogni persona: ruolo, turni lavorati, in quanti dei 5 giorni più costosi era in turno, e l’importo non fatturato per turno quando c’era contro quando non c’era.'),
          t('Tyll tests whether anyone stands out beyond chance. Usually it says: “Nobody stands out here: the differences between people are within what a changing rota produces by chance.”', 'Tyll prüft, ob jemand über den Zufall hinaus auffällt. Meist lautet das Ergebnis: „Hier fällt niemand auf: Die Unterschiede zwischen den Personen liegen in dem, was ein wechselnder Dienstplan zufällig ergibt.“', 'يختبر Tyll ما إذا كان أي شخص يبرز بما يتجاوز الصدفة. وغالبًا تكون النتيجة: «لا أحد يبرز هنا: الفروق بين الأشخاص ضمن ما ينتجه جدول مناوبات متغير بالصدفة.»', 'Tyll verifica se qualcuno si distingue oltre il caso. Di solito il risultato è: «Qui nessuno si distingue: le differenze tra le persone rientrano in ciò che un turno che cambia produce per caso.»'),
        ],
        foot: t('Being on shift is not proof of who poured. Use it to decide who to coach first, then confirm with a count on their next shift.', 'Im Dienst zu sein ist kein Beweis dafür, wer eingeschenkt hat. Nutzen Sie es, um zu entscheiden, wen Sie zuerst schulen, und bestätigen Sie es mit einer Zählung in der nächsten Schicht.', 'التواجد في الوردية ليس دليلًا على من قام بالسكب. استخدمه لتقرر من تدرّبه أولًا، ثم تأكد بجرد في ورديته التالية.', 'Essere in turno non prova chi ha versato. Usalo per decidere chi formare per primo, poi conferma con un conteggio al turno successivo.'),
      },
      {
        title: t('What Tyll checks', 'Was Tyll prüft', 'ما يتحقق منه Tyll', 'Cosa controlla Tyll'),
        points: [
          t('How many glasses each bottle really gave.', 'Wie viele Gläser jede Flasche wirklich ergab.', 'كم كأسًا أعطت كل زجاجة فعلًا.', 'Quanti bicchieri ha dato davvero ogni bottiglia.'),
          t('Wine by the glass and spirits by the measure.', 'Wein im Glas und Spirituosen nach Maß.', 'المشروبات بالكأس وبالمعيار.', 'Vino al calice e distillati a misura.'),
          t('Missing drinks between counts.', 'Fehlende Getränke zwischen zwei Zählungen.', 'المشروبات المفقودة بين عمليتي جرد.', 'Bevande mancanti tra due conteggi.'),
          t('All patterns over the last 4 weeks.', 'Alle Muster der letzten 4 Wochen.', 'جميع الأنماط في آخر 4 أسابيع.', 'Tutti gli schemi delle ultime 4 settimane.'),
          t('Each pattern lists possible reasons and how to help, by fixed rules, labelled to check, not proven.', 'Zu jedem Muster stehen mögliche Ursachen und was hilft, nach festen Regeln, gekennzeichnet als zu prüfen, nicht bewiesen.', 'يعرض كل نمط الأسباب المحتملة وكيفية المساعدة وفق قواعد ثابتة، مع وسم «للتحقق، وليس مثبتًا».', 'Ogni schema elenca cause possibili e come aiutare, con regole fisse, segnate come da verificare, non provate.'),
        ],
        foot: t('A gap means generous pours, glasses not rung up or breakage. Tyll never says which.', 'Eine Lücke bedeutet großzügiges Einschenken, nicht bonierte Gläser oder Bruch. Tyll sagt nie, was davon.', 'الفرق يعني سكبًا سخيًا أو كؤوسًا لم تُسجَّل أو كسرًا. ولا يحدد Tyll أبدًا أيّها.', 'Una differenza significa versamenti generosi, bicchieri non battuti o rotture. Tyll non dice mai quale.'),
      },
    ],
  },

};
