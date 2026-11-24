// Stock and waste (round 4, 24 Nov 2026): Stock levels, Expiring soon and Waste and breakage, as in the demo.
// Every feature is a row with its own clip (public/media/film/<lang>/<key>-<row>-{desk,phone}.mp4).
import type { Solution } from './solutions';
import pageStock from '../assets/photos/stock-shelf.jpg';
import pageExpiry from '../assets/photos/forecast-produce.jpg';
import pageWaste from '../assets/photos/waste-bin.jpg';
import tileStock from '../assets/photos/stock-chef.jpg';
import tileExpiry from '../assets/photos/sales-buffet.jpg';
import tileWaste from '../assets/photos/why-chef.jpg';

const t = (en: string, de: string, ar: string, it: string) => ({ en, de, ar, it });

export const stockWaste: Record<'stock' | 'expiry' | 'waste', Solution> = {
  stock: {
    key: 'stock',
    icon: 'stock',
    tone: 'teal',
    mark: t('really', 'wirklich', 'فعلًا', 'davvero'),
    pagePhoto: pageStock,
    pagePhotoFocus: '50% 60%',
    proof: { kind: 'story', step: 0 },
    name: t('Stock levels', 'Bestand', 'مستويات المخزون', 'Livelli di scorta'),
    menu: t('Know what runs out first.', 'Wissen, was zuerst ausgeht.', 'اعرف ما ينفد أولًا.', 'Sai cosa finisce per primo.'),
    headline: t('What’s really on your shelf?', 'Was steht wirklich im Regal?', 'ما الموجود فعلًا على رفوفك؟', 'Cosa c’è davvero sullo scaffale?'),
    intro: t('See what runs out before the next delivery, and order it from the same screen.', 'Sehen Sie, was vor der nächsten Lieferung ausgeht, und bestellen Sie es auf demselben Bildschirm.', 'اعرف ما ينفد قبل التوريد التالي، واطلبه من الشاشة نفسها.', 'Vedi cosa finisce prima della prossima consegna e ordinalo dalla stessa schermata.'),
    see: [
      { title: t('Critical, low or fine', 'Kritisch, niedrig oder in Ordnung', 'حرج أو منخفض أو جيد', 'Critico, basso o a posto'), text: t('Your whole stock at a glance, worked out every night.', 'Ihr ganzer Bestand auf einen Blick, jede Nacht neu berechnet.', 'مخزونك كله بنظرة واحدة، يُحسب كل ليلة.', 'Tutte le scorte a colpo d’occhio, calcolate ogni notte.') },
      { title: t('Critical items', 'Kritische Artikel', 'الأصناف الحرجة', 'Articoli critici'), text: t('An order placed today would arrive too late.', 'Eine heute aufgegebene Bestellung käme zu spät.', 'طلب يُرسل اليوم سيصل متأخرًا.', 'Un ordine fatto oggi arriverebbe troppo tardi.') },
      { title: t('Order now', 'Jetzt bestellen', 'اطلب الآن', 'Ordina ora'), text: t('The suggested quantity from the usual supplier, sent for approval.', 'Die vorgeschlagene Menge beim üblichen Lieferanten, zur Freigabe geschickt.', 'الكمية المقترحة من المورّد المعتاد، تُرسل للموافقة.', 'La quantità suggerita dal fornitore abituale, inviata per l’approvazione.') },
    ],
    more: [
      {
        points: [
          t('Stock worked out every night from sales, deliveries and logged waste.', 'Der Bestand wird jede Nacht aus Verkäufen, Lieferungen und erfasstem Abfall berechnet.', 'يُحسب المخزون كل ليلة من المبيعات والتوريدات والهدر المسجّل.', 'Le scorte calcolate ogni notte da vendite, consegne e sprechi registrati.'),
          t('Food, beverage and inventory, each item with what is left and when it runs out.', 'Speisen, Getränke und Inventar, jeder Artikel mit Restmenge und wann er ausgeht.', 'الأطعمة والمشروبات والمستلزمات، كل صنف مع المتبقي منه وموعد نفاده.', 'Cibo, bevande e inventario, ogni articolo con quanto resta e quando finisce.'),
          t('Stock valued at the hotel’s chosen method, weighted average cost by default.', 'Bewertet nach der Methode des Hotels, standardmäßig zum gewichteten Durchschnittspreis.', 'يُقيَّم المخزون بالطريقة التي يختارها الفندق، وبمتوسط التكلفة المرجّح افتراضيًا.', 'Scorte valorizzate con il metodo scelto dall’hotel, di norma al costo medio ponderato.'),
          t('A quick spot check counts a few items between full counts.', 'Eine kurze Stichprobe zählt einige Artikel zwischen zwei Inventuren.', 'فحص سريع يعدّ بضعة أصناف بين جردين كاملين.', 'Un controllo rapido conta alcuni articoli tra due inventari.'),
        ],
      },
    ],
    photo: tileStock,
    photoFocus: '50% 40%',
    tilePoints: [
      t('What runs out before the next delivery.', 'Was vor der nächsten Lieferung ausgeht.', 'ما ينفد قبل التوريد التالي.', 'Cosa finisce prima della prossima consegna.'),
      t('Requisitions from outlets, read from a paper slip.', 'Anforderungen der Outlets, auch vom Papierzettel gelesen.', 'طلبات المنافذ، تُقرأ من ورقة الطلب.', 'Richieste dei punti vendita, lette dal foglio di carta.'),
      t('Recipe costs, and an alert when a price cuts a margin.', 'Rezeptkosten, und ein Hinweis, wenn ein Preis die Marge senkt.', 'تكاليف الوصفات، وتنبيه عندما يخفض سعر هامشًا.', 'Costi delle ricette, e un avviso quando un prezzo taglia un margine.'),
    ],
    rows: [
      {
        id: 'requisitions',
        icon: 'orders',
        film: 'stock-requisitions',
        name: t('Requisitions and transfers', 'Anforderungen und Umbuchungen', 'طلبات الصرف والتحويلات', 'Richieste e trasferimenti'),
        line: t('Outlets ask the main store, and pay for what it issues.', 'Outlets fordern beim Hauptlager an und zahlen, was es ausgibt.', 'تطلب المنافذ من المخزن الرئيسي، وتدفع ثمن ما يصرفه.', 'I punti vendita chiedono al magazzino centrale e pagano ciò che emette.'),
        points: [
          t('An outlet asks in Tyll, or photographs its paper slip. Tyll reads it, the storekeeper confirms.', 'Ein Outlet fordert in Tyll an oder fotografiert seinen Papierzettel. Tyll liest ihn, der Lagerist bestätigt.', 'يطلب المنفذ عبر Tyll، أو يصوّر ورقة الطلب. يقرأها Tyll، ويؤكدها أمين المخزن.', 'Un punto vendita chiede in Tyll o fotografa il foglio di carta. Tyll lo legge, il magazziniere conferma.'),
          t('Fixed rules turn the slip into stock units, for example 1 kg of lemons is about 8 lemons and a bottle of gin is 70 cl.', 'Feste Regeln rechnen den Zettel in Lagereinheiten um, zum Beispiel 1 kg Zitronen sind etwa 8 Zitronen und eine Flasche Gin 70 cl.', 'تحوّل قواعد ثابتة الورقة إلى وحدات المخزون، فمثلًا 1 كغ من الليمون يساوي نحو 8 ليمونات.', 'Regole fisse convertono il foglio in unità di magazzino, per esempio 1 kg di limoni sono circa 8 limoni e una bottiglia di gin è 70 cl.'),
          t('It becomes a requisition to the main store, and the outlet is charged when the store issues it.', 'Daraus wird eine Anforderung an das Hauptlager, und das Outlet wird belastet, wenn das Lager ausgibt.', 'تصبح طلب صرف إلى المخزن الرئيسي، ويُحمَّل المنفذ التكلفة عند الصرف.', 'Diventa una richiesta al magazzino centrale, e il punto vendita paga quando il magazzino emette.'),
          t('Stock issued without a request, or above it, is flagged to check. It is not proof of anything.', 'Ware, die ohne oder über eine Anforderung hinaus ausgegeben wird, wird zur Prüfung markiert. Ein Beweis ist das nicht.', 'ما يُصرف دون طلب أو بأكثر منه يُعلَّم للتحقق، وليس دليلًا على شيء.', 'La merce emessa senza richiesta, o oltre, viene segnalata da controllare. Non è una prova.'),
        ],
      },
      {
        id: 'expected',
        icon: 'takes',
        film: 'stock-expected',
        name: t('Expected against actual', 'Soll gegen Ist', 'المتوقع مقابل الفعلي', 'Atteso contro reale'),
        line: t('What should be left, against what was counted.', 'Was übrig sein sollte, gegen das, was gezählt wurde.', 'ما يجب أن يتبقى، مقابل ما تم عدّه.', 'Cosa dovrebbe restare, contro cosa è stato contato.'),
        points: [
          t('Stock used per day comes from the recipes of what sold, plus logged waste.', 'Der Verbrauch pro Tag ergibt sich aus den Rezepten des Verkauften plus erfasstem Abfall.', 'الاستهلاك اليومي يأتي من وصفات ما بيع، مضافًا إليه الهدر المسجّل.', 'Il consumo al giorno viene dalle ricette di ciò che è stato venduto, più gli sprechi registrati.'),
          t('Gaps over 5% and over €5 are highlighted.', 'Abweichungen über 5 % und über 5 € werden hervorgehoben.', 'تُبرَز الفروق التي تتجاوز 5% و5 يورو.', 'Gli scarti oltre il 5% e oltre 5 € sono evidenziati.'),
        ],
      },
      {
        id: 'recipes',
        icon: 'stock',
        film: 'stock-recipes',
        name: t('Recipes and costs', 'Rezepte und Kosten', 'الوصفات والتكاليف', 'Ricette e costi'),
        line: t('What each dish costs to make, at today’s prices.', 'Was jedes Gericht kostet, zu heutigen Preisen.', 'كم يكلّف تحضير كل طبق، بأسعار اليوم.', 'Quanto costa ogni piatto, ai prezzi di oggi.'),
        points: [
          t('Cost per portion at today’s prices, every ingredient with its price, against the selling price, with gross profit, margin and cost change.', 'Kosten pro Portion zu heutigen Preisen, jede Zutat mit Preis, gegen den Verkaufspreis, mit Rohertrag, Marge und Kostenänderung.', 'تكلفة الحصة بأسعار اليوم، وكل مكوّن بسعره، مقابل سعر البيع، مع إجمالي الربح والهامش وتغير التكلفة.', 'Costo per porzione ai prezzi di oggi, ogni ingrediente con il suo prezzo, contro il prezzo di vendita, con utile lordo, margine e variazione del costo.'),
          t('Photograph a recipe card to add it. A whole sea bass gives about 45% fillet, house sub-recipes are linked, and “a handful of parsley” is flagged as a rule of thumb.', 'Fotografieren Sie eine Rezeptkarte, um sie anzulegen. Ein ganzer Wolfsbarsch ergibt etwa 45 % Filet, Grundrezepte des Hauses werden verknüpft, und „eine Handvoll Petersilie“ wird als Faustregel markiert.', 'صوّر بطاقة الوصفة لإضافتها. سمكة قاروص كاملة تعطي نحو 45% فيليه، وتُربط الوصفات الفرعية للمطبخ، و«حفنة من البقدونس» تُعلَّم كتقدير تقريبي.', 'Fotografa una scheda ricetta per aggiungerla. Un branzino intero dà circa il 45% di filetto, le basi della casa vengono collegate e “una manciata di prezzemolo” è segnalata come regola a occhio.'),
          t('Then cost per plate and margin. A person checks every field before it is saved.', 'Danach Kosten pro Teller und Marge. Ein Mensch prüft jedes Feld, bevor es gespeichert wird.', 'ثم تكلفة الطبق والهامش. يراجع شخص كل حقل قبل حفظه.', 'Poi costo per piatto e margine. Una persona controlla ogni campo prima che venga salvato.'),
        ],
      },
      {
        id: 'menu-photo',
        icon: 'revenue',
        film: 'stock-menu-photo',
        name: t('Menu photo', 'Foto der Speisekarte', 'صورة قائمة الطعام', 'Foto del menù'),
        line: t('Photograph the menu. Only the differences show.', 'Speisekarte fotografieren. Nur die Unterschiede erscheinen.', 'صوّر القائمة. تظهر الفروق فقط.', 'Fotografa il menù. Compaiono solo le differenze.'),
        points: [
          t('Tyll reads dishes and prices and compares them with the till, for example “the till says €9.00, which is right?”', 'Tyll liest Gerichte und Preise und vergleicht sie mit der Kasse, zum Beispiel „Die Kasse sagt 9,00 €, was stimmt?“', 'يقرأ Tyll الأطباق والأسعار ويقارنها بنظام نقاط البيع، مثل «نظام نقاط البيع يقول 9.00 يورو، أيّهما الصحيح؟»', 'Tyll legge piatti e prezzi e li confronta con la cassa, per esempio “la cassa dice 9,00 €, quale è giusto?”'),
        ],
      },
      {
        id: 'menu-sync',
        icon: 'reports',
        film: 'stock-menu-sync',
        name: t('Menu sync', 'Abgleich der Speisekarte', 'مزامنة القائمة', 'Sincronizzazione del menù'),
        line: t('The till’s menu, read each morning.', 'Die Speisekarte der Kasse, jeden Morgen gelesen.', 'قائمة نظام نقاط البيع، تُقرأ كل صباح.', 'Il menù della cassa, letto ogni mattina.'),
        points: [
          t('Each morning Tyll reads the menu from the till: new dishes, price changes and dishes removed.', 'Jeden Morgen liest Tyll die Speisekarte aus der Kasse: neue Gerichte, Preisänderungen und entfernte Gerichte.', 'كل صباح يقرأ Tyll القائمة من نظام نقاط البيع: أطباق جديدة، وتغييرات الأسعار، وأطباق أُزيلت.', 'Ogni mattina Tyll legge il menù dalla cassa: piatti nuovi, prezzi cambiati e piatti tolti.'),
          t('New dishes are listed until they have a recipe. Margins use the new price.', 'Neue Gerichte bleiben gelistet, bis sie ein Rezept haben. Margen rechnen mit dem neuen Preis.', 'تبقى الأطباق الجديدة في القائمة حتى تُضاف وصفتها. وتُحسب الهوامش بالسعر الجديد.', 'I piatti nuovi restano in elenco finché non hanno una ricetta. I margini usano il nuovo prezzo.'),
        ],
      },
      {
        id: 'margin',
        icon: 'finance',
        film: 'stock-margin',
        name: t('Margin alerts', 'Margen-Hinweise', 'تنبيهات الهامش', 'Avvisi sul margine'),
        line: t('A price rise, worked through the recipe.', 'Eine Preiserhöhung, durch das Rezept gerechnet.', 'ارتفاع في السعر، محسوب عبر الوصفة.', 'Un aumento di prezzo, calcolato sulla ricetta.'),
        points: [
          t('When a supplier price cuts a dish’s margin by 3 points or more, the F&B director and the head chef get an alert.', 'Senkt ein Lieferantenpreis die Marge eines Gerichts um 3 Punkte oder mehr, erhalten F&B-Direktor und Küchenchef einen Hinweis.', 'عندما يخفض سعر مورّد هامش طبق بـ 3 نقاط أو أكثر، يصل تنبيه إلى مدير الأغذية والمشروبات ورئيس الطهاة.', 'Quando un prezzo del fornitore taglia il margine di un piatto di 3 punti o più, il direttore F&B e lo chef ricevono un avviso.'),
          t('For example lobster tail from €85 to €98 per kg takes lobster linguine down 5 points, about €238 a month at current sales.', 'Zum Beispiel Hummerschwanz von 85 € auf 98 € pro kg: Hummer-Linguine verlieren 5 Punkte, etwa 238 € im Monat bei heutigen Verkäufen.', 'مثلًا ذيل الكركند من 85 إلى 98 يورو للكيلو يخفض هامش لينغويني الكركند 5 نقاط، نحو 238 يورو شهريًا بالمبيعات الحالية.', 'Per esempio la coda di aragosta da 85 € a 98 € al kg porta le linguine all’aragosta giù di 5 punti, circa 238 € al mese alle vendite attuali.'),
          t('Four options, each with the margin it gives: raise the price, switch supplier, adjust the portion or accept. The decision is recorded with a name and the time.', 'Vier Möglichkeiten, jede mit der Marge, die sie ergibt: Preis erhöhen, Lieferant wechseln, Portion anpassen oder akzeptieren. Die Entscheidung wird mit Name und Uhrzeit gespeichert.', 'أربعة خيارات، لكل منها الهامش الذي يعطيه: رفع السعر، أو تغيير المورّد، أو تعديل الحصة، أو القبول. ويُسجَّل القرار مع الاسم والوقت.', 'Quattro opzioni, ognuna con il margine che dà: alzare il prezzo, cambiare fornitore, ridurre la porzione o accettare. La decisione è registrata con nome e ora.'),
        ],
      },
    ],
  },

  expiry: {
    key: 'expiry',
    icon: 'expiry',
    tone: 'teal',
    mark: t('expires', 'läuft ab', 'تنتهي صلاحيته', 'scade'),
    pagePhoto: pageExpiry,
    pagePhotoFocus: '50% 50%',
    name: t('Expiring soon', 'Läuft bald ab', 'ينتهي قريباً', 'In scadenza'),
    menu: t('Use it before it expires.', 'Verbrauchen, bevor es abläuft.', 'استخدمه قبل أن تنتهي صلاحيته.', 'Usalo prima che scada.'),
    headline: t('What expires before you use it?', 'Was läuft ab, bevor Sie es verbrauchen?', 'ما الذي تنتهي صلاحيته قبل أن تستخدمه؟', 'Cosa scade prima che tu lo usi?'),
    intro: t('Every batch with its use-by date, and what to do with it before it reaches the bin.', 'Jede Charge mit ihrem Verbrauchsdatum, und was damit zu tun ist, bevor sie im Müll landet.', 'كل دفعة مع تاريخ انتهاء صلاحيتها، وما يجب فعله بها قبل أن تصل إلى سلة المهملات.', 'Ogni lotto con la sua data di scadenza, e cosa farne prima che finisca nel bidone.'),
    see: [
      { title: t('Use today', 'Heute verbrauchen', 'استخدمه اليوم', 'Da usare oggi'), text: t('What expires by tomorrow, and what has already expired.', 'Was bis morgen abläuft, und was schon abgelaufen ist.', 'ما تنتهي صلاحيته بحلول الغد، وما انتهت صلاحيته بالفعل.', 'Cosa scade entro domani, e cosa è già scaduto.') },
      { title: t('What normal use won’t finish', 'Was der normale Verbrauch nicht schafft', 'ما لن يكفي الاستخدام العادي لإنهائه', 'Cosa l’uso normale non finirà'), text: t('With its value, and the quantity to use another way.', 'Mit seinem Wert und der Menge, die anders verwendet werden muss.', 'مع قيمته، والكمية التي يجب استخدامها بطريقة أخرى.', 'Con il suo valore, e la quantità da usare in altro modo.') },
      { title: t('Tonight’s special', 'Das Tagesgericht heute Abend', 'طبق الليلة الخاص', 'Il piatto del giorno di stasera'), text: t('For example sea bass fillet that won’t be used in time becomes tonight’s special.', 'Zum Beispiel Wolfsbarschfilet, das nicht rechtzeitig verbraucht wird, wird zum Tagesgericht.', 'مثلًا فيليه القاروص الذي لن يُستخدم في وقته يصبح طبق الليلة الخاص.', 'Per esempio il filetto di branzino che non verrà usato in tempo diventa il piatto di stasera.') },
    ],
    more: [
      {
        points: [
          t('At risk: what normal use will not finish in time, with its value.', 'Gefährdet: was der normale Verbrauch nicht rechtzeitig aufbraucht, mit seinem Wert.', 'المعرّض للخطر: ما لن يكفي الاستخدام العادي لإنهائه في الوقت المناسب، مع قيمته.', 'A rischio: ciò che l’uso normale non finirà in tempo, con il suo valore.'),
          t('Expired on the shelf is counted apart, to remove and log as waste.', 'Auf dem Regal Abgelaufenes wird getrennt gezählt, zum Entfernen und Erfassen als Abfall.', 'ما انتهت صلاحيته على الرف يُحسب منفصلًا، لإزالته وتسجيله هدرًا.', 'Lo scaduto sullo scaffale è contato a parte, da togliere e registrare come spreco.'),
        ],
      },
    ],
    photo: tileExpiry,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Every batch with its use-by date.', 'Jede Charge mit Verbrauchsdatum.', 'كل دفعة مع تاريخ انتهاء صلاحيتها.', 'Ogni lotto con la sua data di scadenza.'),
      t('What normal use won’t finish, with its value.', 'Was der normale Verbrauch nicht schafft, mit Wert.', 'ما لن يكفي الاستخدام العادي لإنهائه، مع قيمته.', 'Cosa l’uso normale non finirà, con il suo valore.'),
      t('Tonight’s special, another outlet or the staff meal.', 'Tagesgericht, ein anderes Outlet oder das Personalessen.', 'طبق الليلة الخاص، أو منفذ آخر، أو وجبة الموظفين.', 'Piatto del giorno, un altro punto vendita o il pasto del personale.'),
    ],
    rows: [
      {
        id: 'batches',
        icon: 'expiry',
        film: 'expiry-batches',
        name: t('Batches and use-by dates', 'Chargen und Verbrauchsdaten', 'الدفعات وتواريخ انتهاء الصلاحية', 'Lotti e date di scadenza'),
        line: t('Within 1, 2, 3 or 7 days, each with what to do.', 'In 1, 2, 3 oder 7 Tagen, jede mit dem, was zu tun ist.', 'خلال يوم أو يومين أو 3 أو 7 أيام، ولكل منها ما يجب فعله.', 'Entro 1, 2, 3 o 7 giorni, ognuno con cosa fare.'),
        points: [
          t('Batches come from deliveries, with their use-by date.', 'Chargen kommen aus den Lieferungen, mit ihrem Verbrauchsdatum.', 'تأتي الدفعات من التوريدات مع تاريخ انتهاء صلاحيتها.', 'I lotti arrivano dalle consegne, con la loro data di scadenza.'),
          t('Fixed rules suggest what to do with each: normal use first, then a transfer to the outlet that uses it most, then a special, then the staff meal.', 'Feste Regeln schlagen für jede vor, was zu tun ist: zuerst normal verbrauchen, dann an das Outlet umbuchen, das am meisten braucht, dann ein Tagesgericht, dann das Personalessen.', 'تقترح قواعد ثابتة ما يُفعل بكل دفعة: الاستخدام العادي أولًا، ثم التحويل إلى المنفذ الأكثر استخدامًا لها، ثم طبق خاص، ثم وجبة الموظفين.', 'Regole fisse suggeriscono cosa fare di ognuno: prima l’uso normale, poi un trasferimento al punto vendita che lo usa di più, poi un piatto del giorno, poi il pasto del personale.'),
        ],
      },
      {
        id: 'use-by',
        icon: 'deliveries',
        film: 'expiry-use-by',
        name: t('Use-by dates from delivery notes', 'Verbrauchsdaten vom Lieferschein', 'تواريخ الصلاحية من إشعارات التسليم', 'Scadenze dalle bolle di consegna'),
        line: t('The date on the label goes straight to Expiring soon.', 'Das Datum auf dem Etikett geht direkt zu Läuft bald ab.', 'التاريخ على الملصق ينتقل مباشرة إلى «ينتهي قريباً».', 'La data sull’etichetta va direttamente a In scadenza.'),
        points: [
          t('When the storekeeper confirms a photographed delivery note, each batch’s use-by date is saved with it.', 'Bestätigt der Lagerist einen fotografierten Lieferschein, wird das Verbrauchsdatum jeder Charge gespeichert.', 'عندما يؤكد أمين المخزن إشعار تسليم مصوّرًا، يُحفظ تاريخ صلاحية كل دفعة معها.', 'Quando il magazziniere conferma una bolla fotografata, la scadenza di ogni lotto viene salvata.'),
          t('A label photo on the line keeps the proof.', 'Ein Foto des Etiketts an der Position hält den Nachweis fest.', 'صورة الملصق على البند تحفظ الدليل.', 'Una foto dell’etichetta sulla riga conserva la prova.'),
        ],
      },
    ],
  },

  waste: {
    key: 'waste',
    icon: 'waste',
    tone: 'teal',
    mark: t('throw away', 'weggeworfen', 'رميت', 'buttato'),
    pagePhoto: pageWaste,
    pagePhotoFocus: '50% 62%',
    proof: { kind: 'number', card: 0 },
    name: t('Waste and breakage', 'Abfall und Bruch', 'الهدر والكسر', 'Scarti e rotture'),
    menu: t('See what waste costs you.', 'Sehen, was Abfall Sie kostet.', 'اعرف كم يكلّفك الهدر.', 'Vedi quanto ti costano gli sprechi.'),
    headline: t('What did you throw away today?', 'Was haben Sie heute weggeworfen?', 'ماذا رميت اليوم؟', 'Cosa hai buttato oggi?'),
    intro: t('Two taps: the item, then the amount. Add a reason if you want.', 'Zwei Fingertipps: der Artikel, dann die Menge. Ein Grund, wenn Sie möchten.', 'نقرتان: الصنف ثم الكمية. وأضف السبب إن أردت.', 'Due tocchi: l’articolo, poi la quantità. Aggiungi un motivo se vuoi.'),
    see: [
      { title: t('What gets thrown away', 'Was weggeworfen wird', 'ما يُرمى', 'Cosa si butta'), text: t('Tap the item, tap the amount. Two taps, with Undo.', 'Artikel antippen, Menge antippen. Zwei Fingertipps, mit Rückgängig.', 'انقر الصنف، ثم الكمية. نقرتان، مع إمكانية التراجع.', 'Tocca l’articolo, tocca la quantità. Due tocchi, con Annulla.') },
      { title: t('What each entry cost', 'Was jeder Eintrag kostet', 'كم كلّف كل إدخال', 'Quanto è costata ogni voce'), text: t('Today’s loss at a glance, and every entry with its cost.', 'Der heutige Verlust auf einen Blick, und jeder Eintrag mit seinen Kosten.', 'خسارة اليوم بنظرة واحدة، وكل إدخال بتكلفته.', 'La perdita di oggi a colpo d’occhio, e ogni voce con il suo costo.') },
      { title: t('Empty bottles', 'Leere Flaschen', 'الزجاجات الفارغة', 'Bottiglie vuote'), text: t('Scan or tap each empty. It counts as used, not as waste.', 'Jede leere Flasche scannen oder antippen. Sie zählt als verbraucht, nicht als Abfall.', 'امسح كل زجاجة فارغة أو انقرها. تُحسب مستخدمة، لا هدرًا.', 'Scansiona o tocca ogni vuoto. Conta come usato, non come spreco.') },
    ],
    more: [
      {
        points: [
          t('Food, beverage and inventory (glassware, plates, linen) are logged separately.', 'Speisen, Getränke und Inventar (Gläser, Teller, Wäsche) werden getrennt erfasst.', 'تُسجَّل الأطعمة والمشروبات والمستلزمات (الأكواب والأطباق والبياضات) كلٌّ على حدة.', 'Cibo, bevande e inventario (bicchieri, piatti, biancheria) si registrano separatamente.'),
          t('Waste and breakage are tracked separately, per outlet.', 'Abfall und Bruch werden getrennt erfasst, pro Outlet.', 'يُتابَع الهدر والكسر بشكل منفصل، لكل منفذ.', 'Sprechi e rotture sono seguiti separatamente, per punto vendita.'),
          t('Expired is its own reason, so food that passed its date shows apart from spoilage.', 'Abgelaufen ist ein eigener Grund, so erscheint Ware nach dem Datum getrennt von Verderb.', '«منتهي الصلاحية» سبب مستقل، فيظهر الطعام الذي تجاوز تاريخه بمعزل عن التلف.', 'Scaduto è un motivo a sé, così il cibo oltre la data si vede separato dal deterioramento.'),
          t('Late entries are marked, and a correction is added without overwriting the original.', 'Späte Einträge werden markiert, und eine Korrektur wird ergänzt, ohne das Original zu überschreiben.', 'تُعلَّم الإدخالات المتأخرة، ويُضاف التصحيح دون استبدال الأصل.', 'Le voci tardive sono segnate, e una correzione si aggiunge senza sovrascrivere l’originale.'),
        ],
      },
    ],
    photo: tileWaste,
    photoFocus: '50% 50%',
    tilePoints: [
      t('Two taps: the item, then the amount.', 'Zwei Fingertipps: Artikel, dann Menge.', 'نقرتان: الصنف ثم الكمية.', 'Due tocchi: l’articolo, poi la quantità.'),
      t('Empty bottles count as used, not waste.', 'Leere Flaschen zählen als verbraucht, nicht als Abfall.', 'الزجاجات الفارغة تُحسب مستخدمة، لا هدرًا.', 'Le bottiglie vuote contano come usate, non come spreco.'),
      t('What waste cost you today and this month.', 'Was Abfall heute und diesen Monat gekostet hat.', 'كم كلّفك الهدر اليوم وهذا الشهر.', 'Quanto ti sono costati gli sprechi oggi e questo mese.'),
    ],
    rows: [
      {
        id: 'prepared',
        icon: 'waste',
        film: 'waste-prepared',
        name: t('Prepared dishes and notes', 'Zubereitete Gerichte und Notizen', 'الأطباق المحضّرة والملاحظات', 'Piatti preparati e note'),
        line: t('A whole dish, or a note on any entry.', 'Ein ganzes Gericht, oder eine Notiz zu jedem Eintrag.', 'طبق كامل، أو ملاحظة على أي إدخال.', 'Un piatto intero, o una nota su qualsiasi voce.'),
        points: [
          t('Log a prepared dish, for example a banquet menu that was not served, and its ingredients are costed for you.', 'Erfassen Sie ein zubereitetes Gericht, zum Beispiel ein nicht serviertes Bankettmenü, und seine Zutaten werden für Sie bewertet.', 'سجّل طبقًا محضّرًا، مثل قائمة مأدبة لم تُقدَّم، وتُحسب تكلفة مكوناته تلقائيًا.', 'Registra un piatto preparato, per esempio un menù di banchetto non servito, e i suoi ingredienti vengono valorizzati per te.'),
          t('Add a note to explain an entry.', 'Eine Notiz erklärt einen Eintrag.', 'أضف ملاحظة لتوضيح أي إدخال.', 'Aggiungi una nota per spiegare una voce.'),
        ],
      },
      {
        id: 'empties',
        icon: 'pour',
        film: 'waste-empties',
        name: t('Empty bottles', 'Leere Flaschen', 'الزجاجات الفارغة', 'Bottiglie vuote'),
        line: t('Scanned or tapped, counted as used.', 'Gescannt oder angetippt, als verbraucht gezählt.', 'تُمسح أو تُنقر، وتُحسب مستخدمة.', 'Scansionate o toccate, contate come usate.'),
        points: [
          t('Scan the barcode, or tap the bottle. Tapping saves it.', 'Barcode scannen oder die Flasche antippen. Antippen speichert sie.', 'امسح الرمز الشريطي، أو انقر الزجاجة. النقر يحفظها.', 'Scansiona il codice a barre, o tocca la bottiglia. Toccarla la salva.'),
          t('It counts as a bottle used, not waste, and Over pouring uses it to find drinks never billed.', 'Sie zählt als verbrauchte Flasche, nicht als Abfall, und Überausschank nutzt sie, um nie abgerechnete Getränke zu finden.', 'تُحسب زجاجة مستخدمة لا هدرًا، ويستخدمها «السكب الزائد» لإيجاد المشروبات التي لم تُحتسب.', 'Conta come bottiglia usata, non spreco, e Mescita eccessiva la usa per trovare le bevande mai battute.'),
        ],
      },
      {
        id: 'trend',
        icon: 'reports',
        film: 'waste-trend',
        name: t('Reasons and the 30-day trend', 'Gründe und der 30-Tage-Verlauf', 'الأسباب واتجاه 30 يومًا', 'Motivi e andamento di 30 giorni'),
        line: t('Where waste comes from, and whether it is falling.', 'Woher der Abfall kommt, und ob er sinkt.', 'من أين يأتي الهدر، وهل ينخفض.', 'Da dove vengono gli sprechi, e se calano.'),
        points: [
          t('Waste and breakage this week against last week, and the last 30 days day by day.', 'Abfall und Bruch dieser Woche gegen die letzte, und die letzten 30 Tage Tag für Tag.', 'الهدر والكسر هذا الأسبوع مقابل الماضي، وآخر 30 يومًا يومًا بيوم.', 'Sprechi e rotture di questa settimana contro la scorsa, e gli ultimi 30 giorni giorno per giorno.'),
          t('The top reason and top item, and possible reasons by outlet, worked out by fixed rules. To check, not proven.', 'Häufigster Grund und Artikel, und mögliche Gründe pro Outlet, nach festen Regeln ermittelt. Zum Prüfen, nicht bewiesen.', 'السبب الأول والصنف الأول، والأسباب المحتملة لكل منفذ وفق قواعد ثابتة. للتحقق، وليست مثبتة.', 'Il motivo e l’articolo principali, e i motivi possibili per punto vendita, con regole fisse. Da verificare, non provati.'),
        ],
      },
    ],
  },
};
