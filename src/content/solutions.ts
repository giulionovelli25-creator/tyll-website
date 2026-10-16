// The six solution pages, in English, German, Arabic and Italian. Every walkthrough step is a real screen from the
// Tyll demo (fictional data), and each caption describes only what that screen shows. The demo itself is in English,
// so screen names quoted in the alt texts stay in English.

import type { ImageMetadata } from 'astro';
import type { Locale, SolutionKey } from '../i18n/routes';

import stockChef from '../assets/photos/stock-chef.jpg';
import forecastProduce from '../assets/photos/forecast-produce.jpg';
import eventsBanquet from '../assets/photos/events-banquet.jpg';
import roomsSuite from '../assets/photos/rooms-suite.jpg';
import receipts from '../assets/photos/tyll-problem-1.jpg';
import laptop from '../assets/photos/tyll-stats-2.jpg';

const screens = import.meta.glob<{ default: ImageMetadata }>('../assets/demo/*.png', { eager: true });
const screen = (name: string) => {
  const m = screens[`../assets/demo/${name}.png`];
  if (!m) throw new Error(`Missing demo screen ${name}`);
  return m.default;
};

type Text = Record<Locale, string>;
export type Frame = { img: ImageMetadata; phone?: boolean; title: Text; text: Text; alt: Text };
export type Solution = {
  key: SolutionKey;
  icon: 'stock' | 'finance' | 'forecast' | 'events' | 'rooms' | 'sales';
  photo: ImageMetadata;
  photoAlt: Text;
  /** Where the photo's subject sits, so cropping keeps it in view */
  photoFocus: string;
  name: Text;
  menu: Text;
  headline: Text;
  intro: Text;
  problem: Text;
  helps: Record<Locale, string[]>;
  walkTitle: Text;
  frames: Frame[];
  note?: Text;
};

const t = (en: string, de: string, ar: string, it: string): Text => ({ en, de, ar, it });

export const solutions: Record<SolutionKey, Solution> = {
  stock: {
    key: 'stock',
    icon: 'stock',
    photo: stockChef,
    photoAlt: t(
      'Chefs seasoning and plating dishes under copper heat lamps in a hotel kitchen.',
      'Köche würzen und richten Gerichte unter kupfernen Wärmelampen in einer Hotelküche an.',
      'طهاة يتبّلون الأطباق ويقدّمونها تحت مصابيح تسخين نحاسية في مطبخ فندق.',
      'Cuochi condiscono e impiattano sotto le lampade riscaldanti in rame nella cucina di un hotel.',
    ),
    photoFocus: '40% 72%',
    name: t('Stock & Waste', 'Lager & Abfall', 'المخزون والهدر', 'Magazzino e sprechi'),
    menu: t(
      'Find missing stock and understand waste.',
      'Fehlenden Bestand finden und Abfall verstehen.',
      'اكتشف المخزون المفقود وافهم الهدر.',
      'Trova le giacenze mancanti e capisci gli sprechi.',
    ),
    headline: t('Know where your stock is going.', 'Wissen, wohin Ihr Bestand geht.', 'اعرف أين يذهب مخزونك.', 'Sai dove va a finire il tuo magazzino.'),
    intro: t(
      'See unusual stock differences, understand what happened and take action before problems continue.',
      'Ungewöhnliche Bestandsabweichungen erkennen, verstehen, was passiert ist, und handeln, bevor sich Probleme wiederholen.',
      'لاحظ الفروقات غير المعتادة في المخزون، وافهم ما حدث، واتخذ إجراءً قبل أن تستمر المشكلات.',
      'Individua le differenze di magazzino insolite, capisci cosa è successo e intervieni prima che i problemi continuino.',
    ),
    problem: t(
      'A hotel restaurant’s stock count doesn’t match what was sold or recorded. Finding out why takes time.',
      'Die Inventur eines Hotelrestaurants passt nicht zu dem, was verkauft oder erfasst wurde. Die Ursache zu finden, kostet Zeit.',
      'جرد المخزون في مطعم الفندق لا يطابق ما بيع أو سُجّل. ومعرفة السبب تستغرق وقتًا.',
      'L’inventario del ristorante di un hotel non corrisponde a ciò che è stato venduto o registrato. Capire perché richiede tempo.',
    ),
    helps: {
      en: [
        'Tyll compares counts, deliveries, sales and recorded waste, and shows what doesn’t add up.',
        'It lists possible explanations to check, without assuming anyone did something wrong.',
        'The right person is assigned, and the outcome stays on record.',
      ],
      de: [
        'Tyll vergleicht Zählungen, Lieferungen, Verkäufe und erfassten Abfall und zeigt, was nicht aufgeht.',
        'Es nennt mögliche Erklärungen zum Prüfen – ohne jemandem etwas zu unterstellen.',
        'Die richtige Person wird zugewiesen, und das Ergebnis bleibt dokumentiert.',
      ],
      ar: [
        'يقارن Tyll الجرد والتوريدات والمبيعات والهدر المسجّل، ويُظهر ما لا يتطابق.',
        'ويعرض تفسيرات محتملة للتحقق منها، دون افتراض أن أحدًا ارتكب خطأً.',
        'يُكلَّف الشخص المناسب بالمتابعة، وتبقى النتيجة موثّقة.',
      ],
      it: [
        'Tyll confronta conteggi, consegne, vendite e sprechi registrati, e mostra ciò che non torna.',
        'Elenca le possibili spiegazioni da verificare, senza presumere che qualcuno abbia sbagliato.',
        'Viene incaricata la persona giusta e l’esito resta documentato.',
      ],
    },
    walkTitle: t(
      'Eight cans of Coca-Cola, step by step',
      'Acht Dosen Coca-Cola, Schritt für Schritt',
      'ثماني علب Coca-Cola، خطوة بخطوة',
      'Otto lattine di Coca-Cola, passo dopo passo',
    ),
    frames: [
      {
        img: screen('story-1-alert'),
        title: t('A stock difference appears', 'Eine Bestandsabweichung erscheint', 'يظهر فرق في المخزون', 'Compare una differenza di magazzino'),
        text: t(
          'Tyll flags Coca-Cola use at The Terrace that sales and waste don’t explain.',
          'Tyll meldet Coca-Cola-Verbrauch auf The Terrace, den Verkäufe und Abfall nicht erklären.',
          'ينبّه Tyll إلى استهلاك Coca-Cola في The Terrace لا تفسّره المبيعات ولا الهدر.',
          'Tyll segnala un consumo di Coca-Cola a The Terrace che vendite e sprechi non spiegano.',
        ),
        alt: t(
          'Tyll Stock with a notice: unexplained Coca-Cola usage detected at The Terrace.',
          'Tyll Stock mit dem Hinweis auf ungeklärten Coca-Cola-Verbrauch auf The Terrace.',
          'شاشة Tyll Stock مع تنبيه: رُصد استهلاك غير مبرَّر لـ Coca-Cola في The Terrace.',
          'Tyll Stock con un avviso: rilevato consumo di Coca-Cola non giustificato a The Terrace.',
        ),
      },
      {
        img: screen('story-2-case'),
        title: t('The manager opens the investigation', 'Die Managerin öffnet die Prüfung', 'تفتح المديرة التحقيق', 'La responsabile apre la verifica'),
        text: t(
          'Counts, deliveries and sales side by side: 8 cans unexplained.',
          'Zählungen, Lieferungen und Verkäufe nebeneinander: 8 Dosen ungeklärt.',
          'الجرد والتوريدات والمبيعات جنبًا إلى جنب: 8 علب غير مبرَّرة.',
          'Conteggi, consegne e vendite a confronto: 8 lattine non giustificate.',
        ),
        alt: t(
          'Investigation “8 cans of Coca-Cola unexplained at The Terrace” with where it happened and the value involved.',
          'Prüfung „8 cans of Coca-Cola unexplained at The Terrace“ mit Ort und betroffenem Betrag.',
          'التحقيق «8 cans of Coca-Cola unexplained at The Terrace» مع مكان الحدوث والقيمة المعنية.',
          'Verifica “8 cans of Coca-Cola unexplained at The Terrace” con il luogo e il valore coinvolto.',
        ),
      },
      {
        img: screen('story-3-records'),
        title: t('The records are laid out', 'Die Belege liegen offen', 'تُعرض السجلات', 'I dati vengono messi in fila'),
        text: t(
          'A Coke removed from a bill after it went to the bar – one of several things to check.',
          'Eine Cola, die nach der Bestellung an der Bar von der Rechnung entfernt wurde – eine von mehreren Spuren.',
          'علبة Coca-Cola حُذفت من الفاتورة بعد إرسالها إلى البار، وهي واحدة من عدة أمور يجب التحقق منها.',
          'Una Coca-Cola tolta dal conto dopo essere stata servita dal bar: una delle diverse cose da verificare.',
        ),
        alt: t(
          'Timeline of the stock period and a list of possible explanations, each marked as needing a check.',
          'Zeitleiste der Bestandsperiode und mögliche Erklärungen, jeweils als zu prüfen markiert.',
          'تسلسل زمني لفترة المخزون وقائمة بالتفسيرات المحتملة، كلٌّ منها معلَّم بأنه يحتاج إلى تحقق.',
          'Cronologia del periodo di inventario e un elenco di possibili spiegazioni, ognuna segnata come da verificare.',
        ),
      },
      {
        img: screen('story-4-assign'),
        title: t('A follow-up is assigned', 'Eine Folgeaufgabe wird zugewiesen', 'تُسند مهمة متابعة', 'Viene assegnato un seguito'),
        text: t(
          'The F&B director takes responsibility, with a deadline.',
          'Der F&B-Direktor übernimmt die Verantwortung, mit Frist.',
          'يتولى مدير الأغذية والمشروبات المسؤولية، مع موعد نهائي.',
          'Il direttore F&B se ne assume la responsabilità, con una scadenza.',
        ),
        alt: t(
          'Manage this case: responsible Marco Bellini, deadline 15 October, saved.',
          'Fall verwalten: verantwortlich Marco Bellini, Frist 15. Oktober, gespeichert.',
          'إدارة هذه الحالة: المسؤول Marco Bellini، الموعد النهائي 15 أكتوبر، تم الحفظ.',
          'Gestione del caso: responsabile Marco Bellini, scadenza 15 ottobre, salvato.',
        ),
      },
      {
        img: screen('story-5-assigned'),
        title: t('The outcome is tracked', 'Das Ergebnis wird nachverfolgt', 'تُتابَع النتيجة', 'L’esito viene seguito'),
        text: t(
          'The case waits in his list until it is closed with a result.',
          'Der Fall bleibt in seiner Liste, bis er mit einem Ergebnis abgeschlossen ist.',
          'تبقى الحالة في قائمته إلى أن تُغلق بنتيجة.',
          'Il caso resta nel suo elenco finché non viene chiuso con un esito.',
        ),
        alt: t(
          'Money Back List filtered to Marco Bellini, showing the assigned Coca-Cola case.',
          'Money Back List, gefiltert auf Marco Bellini, mit dem zugewiesenen Coca-Cola-Fall.',
          'قائمة Money Back List مصفّاة على Marco Bellini، وتظهر فيها حالة Coca-Cola المسندة إليه.',
          'Money Back List filtrata su Marco Bellini, con il caso Coca-Cola assegnato.',
        ),
      },
    ],
    note: t(
      'A difference is a question, not a verdict. It can come from a miscount, a missed waste entry or a drink that was never rung up.',
      'Eine Abweichung ist eine Frage, kein Urteil. Sie kann von einer Fehlzählung, nicht erfasstem Abfall oder einem nicht gebuchten Getränk kommen.',
      'الفرق سؤال وليس حكمًا. قد ينتج عن خطأ في العدّ، أو هدر لم يُسجَّل، أو مشروب لم يُدخَل في نظام البيع.',
      'Una differenza è una domanda, non un verdetto. Può dipendere da un errore di conteggio, da uno spreco non registrato o da una bevanda mai battuta in cassa.',
    ),
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: receipts,
    photoAlt: t(
      'Receipts and a calculator on a dark desk under a brass lamp.',
      'Belege und ein Taschenrechner auf einem dunklen Tisch unter einer Messinglampe.',
      'إيصالات وآلة حاسبة على مكتب داكن تحت مصباح نحاسي.',
      'Ricevute e una calcolatrice su una scrivania scura sotto una lampada in ottone.',
    ),
    photoFocus: '45% 60%',
    name: t('Finance & Money', 'Finanzen & Zahlungen', 'المالية والأموال', 'Finanza e pagamenti'),
    menu: t(
      'Understand financial differences and keep track of costs.',
      'Finanzielle Abweichungen verstehen und Kosten im Blick behalten.',
      'افهم الفروقات المالية وتابع التكاليف.',
      'Capisci le differenze finanziarie e tieni sotto controllo i costi.',
    ),
    headline: t('Know where your money stands.', 'Wissen, wo Ihr Geld steht.', 'اعرف وضع أموالك.', 'Sai sempre a che punto sono i tuoi soldi.'),
    intro: t(
      'Spot unusual transactions, understand differences and keep financial follow-ups in one place.',
      'Ungewöhnliche Buchungen erkennen, Abweichungen verstehen und finanzielle Rückfragen an einem Ort behalten.',
      'اكتشف المعاملات غير المعتادة، وافهم الفروقات، واجمع المتابعات المالية في مكان واحد.',
      'Individua le transazioni insolite, capisci le differenze e tieni le verifiche finanziarie in un unico posto.',
    ),
    problem: t(
      'Payments, room charges, invoices and bank deposits can sit in different systems.',
      'Zahlungen, Zimmerbelastungen, Rechnungen und Bankeinzahlungen liegen oft in verschiedenen Systemen.',
      'قد تتوزع المدفوعات ورسوم الغرف والفواتير والإيداعات المصرفية على أنظمة مختلفة.',
      'Pagamenti, addebiti in camera, fatture e versamenti in banca possono trovarsi in sistemi diversi.',
    ),
    helps: {
      en: [
        'Unusual voids, discounts, refunds and free items are flagged together with the order they belong to.',
        'Room charges that never reached the guest bill, and invoices that differ from the delivery, come up for review.',
        'Every flagged item has an owner and an outcome, in one shared list.',
      ],
      de: [
        'Ungewöhnliche Stornos, Rabatte, Erstattungen und Gratisartikel werden zusammen mit der zugehörigen Bestellung markiert.',
        'Zimmerbelastungen, die nie auf der Gästerechnung ankamen, und Rechnungen, die von der Lieferung abweichen, landen zur Prüfung.',
        'Jeder markierte Punkt hat eine verantwortliche Person und ein Ergebnis – in einer gemeinsamen Liste.',
      ],
      ar: [
        'تُعلَّم الإلغاءات والخصومات والمبالغ المستردة والأصناف المجانية غير المعتادة مع الطلب الذي تنتمي إليه.',
        'تُعرض للمراجعة رسوم الغرف التي لم تصل إلى فاتورة الضيف، والفواتير التي تختلف عن التوريد.',
        'لكل بند معلَّم مسؤول ونتيجة، في قائمة واحدة مشتركة.',
      ],
      it: [
        'Storni, sconti, rimborsi e omaggi insoliti vengono segnalati insieme all’ordine a cui appartengono.',
        'Gli addebiti in camera mai arrivati sul conto dell’ospite e le fatture diverse dalla consegna vengono messi in revisione.',
        'Ogni voce segnalata ha un responsabile e un esito, in un unico elenco condiviso.',
      ],
    },
    walkTitle: t(
      'Following the money through one evening',
      'Dem Geld durch einen Abend folgen',
      'تتبّع الأموال خلال أمسية واحدة',
      'Seguire i soldi nel corso di una serata',
    ),
    frames: [
      {
        img: screen('fin-1'),
        title: t('Restaurant mistakes, explained', 'Fehler im Restaurant, erklärt', 'أخطاء المطعم، مشروحة', 'Errori al ristorante, spiegati'),
        text: t(
          'Tonight at The Terrace: an item removed after it went to the bar.',
          'Heute Abend auf The Terrace: ein Artikel, entfernt nachdem er an die Bar ging.',
          'الليلة في The Terrace: صنف حُذف بعد إرساله إلى البار.',
          'Stasera a The Terrace: un articolo tolto dopo essere stato servito dal bar.',
        ),
        alt: t(
          'Restaurant mistakes: a worked example of an item removed after it was sent to the bar, and flagged items by type.',
          'Restaurant mistakes: ein Beispiel für einen nach Bestellung entfernten Artikel und markierte Fälle nach Art.',
          'شاشة Restaurant mistakes: مثال مفصّل لصنف حُذف بعد إرساله إلى البار، والبنود المعلَّمة حسب النوع.',
          'Restaurant mistakes: un esempio di articolo tolto dopo l’invio al bar e le voci segnalate per tipo.',
        ),
      },
      {
        img: screen('fin-2'),
        title: t(
          'The whole order, from first item to final bill',
          'Die ganze Bestellung, vom ersten Artikel bis zur Rechnung',
          'الطلب كاملًا، من الصنف الأول حتى الفاتورة النهائية',
          'L’intero ordine, dal primo articolo al conto finale',
        ),
        text: t(
          'Original order, final bill and the kitchen and bar tickets.',
          'Ursprüngliche Bestellung, Endrechnung sowie Küchen- und Barbons.',
          'الطلب الأصلي والفاتورة النهائية وتذاكر المطبخ والبار.',
          'Ordine originale, conto finale e comande di cucina e bar.',
        ),
        alt: t(
          'Order TRC-1013-198: original order AED 120, final bill AED 98, with the Coca-Cola removed after dispatch.',
          'Bestellung TRC-1013-198: Bestellung AED 120, Rechnung AED 98, Coca-Cola nach Ausgabe entfernt.',
          'الطلب TRC-1013-198: الطلب الأصلي AED 120، والفاتورة النهائية AED 98، مع حذف Coca-Cola بعد تقديمها.',
          'Ordine TRC-1013-198: ordine originale AED 120, conto finale AED 98, con la Coca-Cola tolta dopo l’uscita.',
        ),
      },
      {
        img: screen('fin-3'),
        title: t('Room charges checked', 'Zimmerbelastungen geprüft', 'التحقق من رسوم الغرف', 'Addebiti in camera verificati'),
        text: t(
          'Charges that didn’t reach the guest bill are counted and listed.',
          'Belastungen, die nicht auf der Gästerechnung ankamen, werden gezählt und aufgelistet.',
          'تُحصى الرسوم التي لم تصل إلى فاتورة الضيف وتُدرج في قائمة.',
          'Gli addebiti non arrivati sul conto dell’ospite vengono contati ed elencati.',
        ),
        alt: t(
          'Room charges: charges checked, what should be on guest bills, what was posted, and postings flagged by source.',
          'Room charges: geprüfte Belastungen, Soll und Ist auf Gästerechnungen und markierte Buchungen nach Quelle.',
          'شاشة Room charges: الرسوم التي تم التحقق منها، وما يجب أن يظهر في فواتير الضيوف، وما تم ترحيله، والقيود المعلَّمة حسب المصدر.',
          'Room charges: addebiti verificati, cosa dovrebbe comparire sui conti degli ospiti, cosa è stato registrato e le registrazioni segnalate per origine.',
        ),
      },
      {
        img: screen('fin-4'),
        title: t('Invoices against deliveries', 'Rechnungen gegen Lieferungen', 'الفواتير مقابل التوريدات', 'Fatture a confronto con le consegne'),
        text: t(
          'Supplier invoices that differ from what actually arrived, ready to check.',
          'Lieferantenrechnungen, die von der tatsächlichen Lieferung abweichen – bereit zur Prüfung.',
          'فواتير الموردين التي تختلف عمّا وصل فعلًا، جاهزة للتحقق.',
          'Fatture dei fornitori diverse da ciò che è arrivato davvero, pronte da verificare.',
        ),
        alt: t(
          'Invoice differences: supplier orders where less was delivered than ordered, or the invoice price was above the order price.',
          'Invoice differences: Bestellungen mit weniger Lieferung als bestellt oder höherem Rechnungspreis.',
          'شاشة Invoice differences: طلبات موردين سُلّم فيها أقل مما طُلب، أو كان سعر الفاتورة أعلى من سعر الطلب.',
          'Invoice differences: ordini ai fornitori con consegne inferiori all’ordinato o prezzi in fattura superiori a quelli dell’ordine.',
        ),
      },
      {
        img: screen('fin-5'),
        title: t('One list for every follow-up', 'Eine Liste für jede Rückfrage', 'قائمة واحدة لكل متابعة', 'Un solo elenco per ogni verifica'),
        text: t(
          'Who is responsible, by when, and what came of it.',
          'Wer verantwortlich ist, bis wann – und was dabei herauskam.',
          'مَن المسؤول، وحتى متى، وما الذي أسفرت عنه.',
          'Chi è responsabile, entro quando e con quale esito.',
        ),
        alt: t(
          'Money Back List: open cases, potential and confirmed losses, and each case with responsible person and deadline.',
          'Money Back List: offene Fälle, mögliche und bestätigte Verluste, jeder Fall mit Verantwortlichem und Frist.',
          'قائمة Money Back List: الحالات المفتوحة، والخسائر المحتملة والمؤكدة، وكل حالة مع المسؤول عنها وموعدها النهائي.',
          'Money Back List: casi aperti, perdite potenziali e confermate, e ogni caso con responsabile e scadenza.',
        ),
      },
    ],
    note: t(
      'In the demo these records are simulated. Which POS, PMS and accounting data can be connected is agreed with each hotel.',
      'In der Demo sind diese Daten simuliert. Welche Kassen-, PMS- und Buchhaltungsdaten angebunden werden, wird mit jedem Hotel vereinbart.',
      'هذه السجلات في العرض التوضيحي محاكاة. ويُتفق مع كل فندق على بيانات نقاط البيع ونظام إدارة الفندق والمحاسبة التي يمكن ربطها.',
      'Nella demo questi dati sono simulati. Quali dati di cassa, PMS e contabilità collegare viene concordato con ogni hotel.',
    ),
  },

  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    photo: forecastProduce,
    photoAlt: t(
      'A chef chopping fresh herbs beside trays of lemons and greens.',
      'Ein Koch hackt frische Kräuter neben Schalen mit Zitronen und Grün.',
      'طاهٍ يفرم أعشابًا طازجة بجانب صوانٍ من الليمون والخضار.',
      'Uno chef trita erbe fresche accanto a vassoi di limoni e verdure.',
    ),
    photoFocus: '60% 45%',
    name: t('Forecasting & Purchasing', 'Prognose & Einkauf', 'التوقعات والمشتريات', 'Previsioni e acquisti'),
    menu: t(
      'Know what to buy, prepare and approve.',
      'Wissen, was gekauft, vorbereitet und freigegeben werden muss.',
      'اعرف ما يجب شراؤه وتحضيره واعتماده.',
      'Sai cosa comprare, preparare e approvare.',
    ),
    headline: t(
      'Know what to buy before you run out.',
      'Wissen, was Sie kaufen müssen, bevor es ausgeht.',
      'اعرف ما تحتاج إلى شرائه قبل أن ينفد.',
      'Sai cosa comprare prima che finisca.',
    ),
    intro: t(
      'Plan ahead, create purchase requests and keep approvals moving.',
      'Vorausplanen, Bestellanforderungen erstellen und Freigaben in Bewegung halten.',
      'خطّط مسبقًا، وأنشئ طلبات الشراء، وحافظ على سير الموافقات.',
      'Pianifica in anticipo, crea richieste d’acquisto e fai avanzare le approvazioni.',
    ),
    problem: t(
      'Orders are harder to plan when demand, available stock and upcoming events are tracked separately.',
      'Bestellungen sind schwer zu planen, wenn Nachfrage, Bestand und anstehende Veranstaltungen getrennt erfasst werden.',
      'يصعب تخطيط الطلبات عندما تُتابَع الاحتياجات والمخزون المتاح والفعاليات القادمة كلٌّ على حدة.',
      'Gli ordini sono più difficili da pianificare quando domanda, giacenze disponibili ed eventi in arrivo sono gestiti separatamente.',
    ),
    helps: {
      en: [
        'Expected guests come from reservations, occupancy and confirmed events – and any figure can be adjusted.',
        'Tyll suggests quantities and flags what runs short before the next delivery.',
        'Requests move through purchasing, accounting and, for larger orders, the general manager.',
      ],
      de: [
        'Erwartete Gäste ergeben sich aus Reservierungen, Belegung und bestätigten Veranstaltungen – jede Zahl lässt sich anpassen.',
        'Tyll schlägt Mengen vor und markiert, was vor der nächsten Lieferung knapp wird.',
        'Anforderungen laufen über Einkauf, Buchhaltung und bei größeren Bestellungen die Direktion.',
      ],
      ar: [
        'يُحسب عدد الضيوف المتوقع من الحجوزات ونسبة الإشغال والفعاليات المؤكدة، ويمكن تعديل أي رقم.',
        'يقترح Tyll الكميات وينبّه إلى ما سينفد قبل التوريد التالي.',
        'تمر الطلبات عبر المشتريات والمحاسبة، والمدير العام في الطلبات الأكبر.',
      ],
      it: [
        'Gli ospiti attesi derivano da prenotazioni, occupazione ed eventi confermati, e ogni cifra si può modificare.',
        'Tyll suggerisce le quantità e segnala ciò che finirà prima della prossima consegna.',
        'Le richieste passano da acquisti, contabilità e, per gli ordini più grandi, dal direttore generale.',
      ],
    },
    walkTitle: t(
      'From expected guests to goods received',
      'Von erwarteten Gästen bis zur Warenannahme',
      'من الضيوف المتوقعين إلى استلام البضائع',
      'Dagli ospiti attesi alla merce ricevuta',
    ),
    frames: [
      {
        img: screen('fc-1'),
        title: t('Expected demand', 'Erwartete Nachfrage', 'الطلب المتوقع', 'Domanda prevista'),
        text: t(
          'Reservations, walk-ins, occupancy and event guests for the next three days.',
          'Reservierungen, Laufkundschaft, Belegung und Eventgäste für die nächsten drei Tage.',
          'الحجوزات والزوار دون حجز ونسبة الإشغال وضيوف الفعاليات للأيام الثلاثة القادمة.',
          'Prenotazioni, clienti senza prenotazione, occupazione e ospiti degli eventi per i prossimi tre giorni.',
        ),
        alt: t(
          'Order stock, expected demand: restaurant reservations, walk-in guests, hotel occupancy and confirmed event guests.',
          'Order stock, erwartete Nachfrage: Reservierungen, Laufkundschaft, Belegung und bestätigte Eventgäste.',
          'شاشة Order stock، الطلب المتوقع: حجوزات المطعم، والزوار دون حجز، ونسبة إشغال الفندق، وضيوف الفعاليات المؤكدة.',
          'Order stock, domanda prevista: prenotazioni del ristorante, clienti senza prenotazione, occupazione dell’hotel e ospiti degli eventi confermati.',
        ),
      },
      {
        img: screen('fc-2'),
        title: t('What to buy', 'Was gekauft werden muss', 'ما يجب شراؤه', 'Cosa comprare'),
        text: t(
          'Suggested quantities, flagged where stock runs short before a delivery.',
          'Empfohlene Mengen, markiert, wo der Bestand vor einer Lieferung knapp wird.',
          'كميات مقترحة، مع تنبيه حيث ينفد المخزون قبل التوريد.',
          'Quantità suggerite, con un avviso dove le scorte finiscono prima di una consegna.',
        ),
        alt: t(
          'What to buy: items with suggested quantities and prices, several marked “runs short before a delivery”.',
          'What to buy: Artikel mit empfohlenen Mengen und Preisen, mehrere als vor der Lieferung knapp markiert.',
          'شاشة What to buy: أصناف بكميات وأسعار مقترحة، وعدة أصناف معلَّمة بأنها ستنفد قبل التوريد.',
          'What to buy: articoli con quantità e prezzi suggeriti, diversi segnati come “in esaurimento prima di una consegna”.',
        ),
      },
      {
        img: screen('fc-3'),
        title: t('A request goes to Purchasing', 'Die Anforderung geht an den Einkauf', 'يُرسل الطلب إلى المشتريات', 'Una richiesta va agli acquisti'),
        text: t(
          'The manager sends it and can follow every approval step.',
          'Die Managerin sendet sie ab und kann jeden Freigabeschritt verfolgen.',
          'ترسله المديرة ويمكنها متابعة كل خطوة من خطوات الموافقة.',
          'La responsabile la invia e può seguire ogni passaggio di approvazione.',
        ),
        alt: t(
          'Purchase request PR-DXB-0001 sent to Purchasing, with its approval steps shown.',
          'Bestellanforderung PR-DXB-0001 an den Einkauf gesendet, mit den Freigabeschritten.',
          'طلب الشراء PR-DXB-0001 مُرسَل إلى المشتريات، مع عرض خطوات الموافقة عليه.',
          'Richiesta d’acquisto PR-DXB-0001 inviata agli acquisti, con i passaggi di approvazione.',
        ),
      },
      {
        img: screen('fc-4'),
        title: t('Purchasing reviews it', 'Der Einkauf prüft sie', 'تراجعه المشتريات', 'Gli acquisti la esaminano'),
        text: t(
          'Approve, request changes or reject – with the budget in view.',
          'Freigeben, Änderungen anfordern oder ablehnen – mit Blick aufs Budget.',
          'الموافقة أو طلب تعديلات أو الرفض، مع إبقاء الميزانية في الحسبان.',
          'Approvare, chiedere modifiche o rifiutare, con il budget sotto gli occhi.',
        ),
        alt: t(
          'Purchasing review with Approve, Request changes and Reject, next to the budget and approval rules.',
          'Prüfung durch den Einkauf mit Freigeben, Änderungen anfordern und Ablehnen, neben Budget und Freigaberegeln.',
          'مراجعة المشتريات مع أزرار Approve وRequest changes وReject، بجانب الميزانية وقواعد الموافقة.',
          'Revisione degli acquisti con Approve, Request changes e Reject, accanto a budget e regole di approvazione.',
        ),
      },
      {
        img: screen('fc-5'),
        title: t('Goods are recorded on arrival', 'Ware wird bei Ankunft erfasst', 'تُسجَّل البضائع عند وصولها', 'La merce viene registrata all’arrivo'),
        text: t(
          'Stock rises only when the delivery is recorded – not when the order is placed.',
          'Der Bestand steigt erst, wenn die Lieferung erfasst ist – nicht schon bei der Bestellung.',
          'لا يزداد المخزون إلا عند تسجيل التوريد، وليس عند تقديم الطلب.',
          'Le giacenze aumentano solo quando la consegna viene registrata, non quando si fa l’ordine.',
        ),
        alt: t(
          'Record the delivery: enter what actually arrived; stock rises by these quantities.',
          'Record the delivery: tatsächlich gelieferte Mengen eintragen; der Bestand steigt um diese Mengen.',
          'شاشة Record the delivery: أدخل ما وصل فعلًا، فيزداد المخزون بهذه الكميات.',
          'Record the delivery: si inserisce ciò che è arrivato davvero; le giacenze aumentano di queste quantità.',
        ),
      },
    ],
  },

  events: {
    key: 'events',
    icon: 'events',
    photo: eventsBanquet,
    photoAlt: t(
      'Banquet staff setting a long table with flowers before an event.',
      'Bankettpersonal deckt vor einer Veranstaltung eine lange Tafel mit Blumen ein.',
      'فريق المآدب يجهّز طاولة طويلة بالزهور قبل فعالية.',
      'Il personale di banqueting apparecchia una lunga tavola con fiori prima di un evento.',
    ),
    photoFocus: '72% 40%',
    name: t('Events & Staffing', 'Events & Personal', 'الفعاليات والموظفون', 'Eventi e personale'),
    menu: t(
      'Plan events and coordinate your team.',
      'Veranstaltungen planen und Ihr Team koordinieren.',
      'خطّط للفعاليات ونسّق عمل فريقك.',
      'Pianifica gli eventi e coordina il tuo team.',
    ),
    headline: t(
      'Great events need great coordination.',
      'Gute Veranstaltungen brauchen gute Abstimmung.',
      'الفعاليات الرائعة تحتاج إلى تنسيق رائع.',
      'I grandi eventi richiedono un grande coordinamento.',
    ),
    intro: t(
      'Help teams plan what they need, coordinate staff and keep everyone informed.',
      'Teams planen lassen, was sie brauchen, Personal abstimmen und alle auf dem gleichen Stand halten.',
      'ساعد الفرق على التخطيط لما تحتاجه، وتنسيق الموظفين، وإبقاء الجميع على اطلاع.',
      'Aiuta i team a pianificare ciò che serve, coordinare il personale e tenere tutti informati.',
    ),
    problem: t(
      'An upcoming event affects the kitchen, purchasing, staffing and other departments.',
      'Eine anstehende Veranstaltung betrifft Küche, Einkauf, Personal und weitere Abteilungen.',
      'تؤثر الفعالية القادمة في المطبخ والمشتريات وتوزيع الموظفين وأقسام أخرى.',
      'Un evento in arrivo coinvolge cucina, acquisti, personale e altri reparti.',
    ),
    helps: {
      en: [
        'Each event shows what it needs: food, drinks, ingredients to buy and staff.',
        'Missing staff can be requested from departments that have free people.',
        'The lending manager decides, and everyone sees where the event stands.',
      ],
      de: [
        'Jede Veranstaltung zeigt, was sie braucht: Speisen, Getränke, einzukaufende Zutaten und Personal.',
        'Fehlendes Personal lässt sich bei Abteilungen mit freien Mitarbeitenden anfragen.',
        'Die verleihende Abteilung entscheidet, und alle sehen, wo die Veranstaltung steht.',
      ],
      ar: [
        'تُظهر كل فعالية ما تحتاجه: الطعام والمشروبات والمكونات المطلوب شراؤها والموظفين.',
        'يمكن طلب الموظفين الناقصين من الأقسام التي لديها أشخاص متاحون.',
        'يقرر مدير القسم المُعير، ويرى الجميع أين وصلت الفعالية.',
      ],
      it: [
        'Ogni evento mostra ciò di cui ha bisogno: cibo, bevande, ingredienti da acquistare e personale.',
        'Il personale mancante si può richiedere ai reparti che hanno persone libere.',
        'Decide il responsabile del reparto che presta il personale, e tutti vedono a che punto è l’evento.',
      ],
    },
    walkTitle: t(
      'A conference dinner for 180 guests',
      'Ein Konferenzdinner für 180 Gäste',
      'عشاء مؤتمر لـ 180 ضيفًا',
      'Una cena congressuale per 180 ospiti',
    ),
    frames: [
      {
        img: screen('ev-1'),
        title: t('A gap is spotted', 'Eine Lücke wird erkannt', 'يُكتشف نقص', 'Emerge una carenza'),
        text: t(
          'Thursday’s conference needs six more waiters, and other roles are short.',
          'Für die Konferenz am Donnerstag fehlen sechs Servicekräfte und weitere Rollen.',
          'يحتاج مؤتمر يوم الخميس إلى ستة نُدُل إضافيين، وهناك نقص في أدوار أخرى.',
          'Per il congresso di giovedì servono altri sei camerieri, e mancano anche altri ruoli.',
        ),
        alt: t(
          'Sales & Events with the notice: Thursday’s conference needs six additional waiters, and six other roles are short.',
          'Sales & Events mit dem Hinweis, dass für die Konferenz sechs Servicekräfte und weitere Rollen fehlen.',
          'شاشة Sales & Events مع تنبيه: يحتاج مؤتمر يوم الخميس إلى ستة نُدُل إضافيين، وهناك نقص في ستة أدوار أخرى.',
          'Sales & Events con l’avviso: per il congresso di giovedì servono sei camerieri in più e mancano altri sei ruoli.',
        ),
      },
      {
        img: screen('ev-2'),
        title: t('The event at a glance', 'Die Veranstaltung auf einen Blick', 'الفعالية في لمحة', 'L’evento a colpo d’occhio'),
        text: t(
          'Estimated costs, the agreed price and what still needs doing.',
          'Geschätzte Kosten, vereinbarter Preis und was noch zu tun ist.',
          'التكاليف المقدّرة والسعر المتفق عليه وما لا يزال يجب إنجازه.',
          'Costi stimati, prezzo concordato e ciò che resta da fare.',
        ),
        alt: t(
          'Regional sales conference dinner: operational estimate and a list of what needs doing, with Find staff buttons.',
          'Regional sales conference dinner: Kostenschätzung und offene Aufgaben mit Schaltflächen zum Finden von Personal.',
          'شاشة Regional sales conference dinner: تقدير تشغيلي وقائمة بما يجب إنجازه، مع أزرار Find staff.',
          'Regional sales conference dinner: stima operativa e un elenco di cose da fare, con i pulsanti Find staff.',
        ),
      },
      {
        img: screen('ev-3'),
        title: t('Finding available staff', 'Verfügbares Personal finden', 'العثور على موظفين متاحين', 'Trovare personale disponibile'),
        text: t(
          'People with the right skill who are free for the whole event.',
          'Menschen mit passender Qualifikation, die für die ganze Veranstaltung frei sind.',
          'أشخاص يملكون المهارة المناسبة ومتاحون طوال الفعالية.',
          'Persone con la competenza giusta, libere per tutto l’evento.',
        ),
        alt: t(
          'Event staffing: waiters needed 12, confirmed 6, and a list of people who are free from 18:00 to 22:00.',
          'Event staffing: 12 Servicekräfte benötigt, 6 bestätigt, und eine Liste freier Mitarbeitender von 18:00 bis 22:00.',
          'شاشة Event staffing: المطلوب 12 نادلًا، والمؤكد 6، وقائمة بالأشخاص المتاحين من 18:00 إلى 22:00.',
          'Event staffing: camerieri necessari 12, confermati 6, e un elenco di persone libere dalle 18:00 alle 22:00.',
        ),
      },
      {
        img: screen('ev-4'),
        title: t('Another department decides', 'Eine andere Abteilung entscheidet', 'قسم آخر يقرر', 'Decide un altro reparto'),
        text: t(
          'The restaurant manager sees the request for six waiters and responds.',
          'Die Restaurantleiterin sieht die Anfrage nach sechs Servicekräften und antwortet.',
          'ترى مديرة المطعم طلب ستة نُدُل وتردّ عليه.',
          'La responsabile del ristorante vede la richiesta di sei camerieri e risponde.',
        ),
        alt: t(
          'Staff support for the restaurant manager: “6 waiters for Banqueting” waiting for her decision.',
          'Staff support der Restaurantleiterin: „6 waiters for Banqueting“ wartet auf ihre Entscheidung.',
          'شاشة Staff support لمديرة المطعم: «6 waiters for Banqueting» بانتظار قرارها.',
          'Staff support per la responsabile del ristorante: “6 waiters for Banqueting” in attesa della sua decisione.',
        ),
      },
    ],
  },

  rooms: {
    key: 'rooms',
    icon: 'rooms',
    photo: roomsSuite,
    photoAlt: t(
      'A calm hotel room with a made bed and soft bedside light.',
      'Ein ruhiges Hotelzimmer mit gemachtem Bett und sanftem Licht.',
      'غرفة فندقية هادئة بسرير مرتّب وإضاءة ناعمة بجانبه.',
      'Una camera d’albergo tranquilla con il letto rifatto e una luce soffusa sul comodino.',
    ),
    photoFocus: '50% 60%',
    name: t('Rooms & Guest Experience', 'Zimmer & Gästeerlebnis', 'الغرف وتجربة الضيوف', 'Camere ed esperienza degli ospiti'),
    menu: t(
      'Keep room readiness and guest requests moving.',
      'Zimmerbereitschaft und Gästewünsche in Bewegung halten.',
      'حافظ على سير جاهزية الغرف وطلبات الضيوف.',
      'Fai avanzare la preparazione delle camere e le richieste degli ospiti.',
    ),
    headline: t(
      'Better teamwork. Better guest experiences.',
      'Bessere Zusammenarbeit. Bessere Gästeerlebnisse.',
      'عمل جماعي أفضل. تجارب أفضل للضيوف.',
      'Più collaborazione. Esperienze migliori per gli ospiti.',
    ),
    intro: t(
      'Keep room readiness, guest requests and department updates moving.',
      'Zimmerbereitschaft, Gästewünsche und Rückmeldungen zwischen Abteilungen in Bewegung halten.',
      'حافظ على سير جاهزية الغرف وطلبات الضيوف وتحديثات الأقسام.',
      'Fai avanzare la preparazione delle camere, le richieste degli ospiti e gli aggiornamenti tra reparti.',
    ),
    problem: t(
      'When reception, housekeeping and other departments work separately, simple requests can take longer.',
      'Wenn Rezeption, Housekeeping und andere Abteilungen getrennt arbeiten, dauern einfache Anliegen länger.',
      'عندما يعمل الاستقبال والتدبير الفندقي والأقسام الأخرى كلٌّ على حدة، قد تستغرق الطلبات البسيطة وقتًا أطول.',
      'Quando ricevimento, housekeeping e altri reparti lavorano separatamente, anche le richieste semplici possono richiedere più tempo.',
    ),
    helps: {
      en: [
        'Front office sees which arriving guests may have to wait, and why.',
        'Requests go straight to the team that can act – including staff on their phones.',
        'Everyone sees progress as it happens, from cleaning to inspection.',
      ],
      de: [
        'Die Rezeption sieht, welche anreisenden Gäste warten müssen – und warum.',
        'Anliegen gehen direkt an das Team, das handeln kann – auch an Mitarbeitende auf dem Handy.',
        'Alle sehen den Fortschritt in Echtzeit, von der Reinigung bis zur Abnahme.',
      ],
      ar: [
        'يرى مكتب الاستقبال أي الضيوف القادمين قد يضطرون إلى الانتظار، ولماذا.',
        'تصل الطلبات مباشرة إلى الفريق القادر على التصرف، بما في ذلك الموظفون عبر هواتفهم.',
        'يرى الجميع التقدّم لحظة بلحظة، من التنظيف إلى الفحص.',
      ],
      it: [
        'Il ricevimento vede quali ospiti in arrivo potrebbero dover aspettare, e perché.',
        'Le richieste arrivano direttamente al team che può intervenire, anche al personale sul telefono.',
        'Tutti vedono i progressi in tempo reale, dalla pulizia all’ispezione.',
      ],
    },
    walkTitle: t(
      'A late suite, ready in time',
      'Eine verspätete Suite, rechtzeitig fertig',
      'جناح متأخر، جاهز في الوقت المناسب',
      'Una suite in ritardo, pronta in tempo',
    ),
    frames: [
      {
        img: screen('rm-1'),
        title: t('Arrivals at a glance', 'Anreisen auf einen Blick', 'الوصول في لمحة', 'Arrivi a colpo d’occhio'),
        text: t(
          'Which rooms are ready, which are late, and which guests are already waiting.',
          'Welche Zimmer fertig sind, welche sich verspäten und welche Gäste schon warten.',
          'أي الغرف جاهزة، وأيها متأخرة، وأي الضيوف ينتظرون بالفعل.',
          'Quali camere sono pronte, quali sono in ritardo e quali ospiti stanno già aspettando.',
        ),
        alt: t(
          'Room readiness: today’s arrivals, rooms being cleaned and guests waiting.',
          'Room readiness: heutige Anreisen, Zimmer in Reinigung und wartende Gäste.',
          'شاشة Room readiness: وصول اليوم، والغرف قيد التنظيف، والضيوف المنتظرون.',
          'Room readiness: arrivi di oggi, camere in pulizia e ospiti in attesa.',
        ),
      },
      {
        img: screen('rm-2'),
        title: t('Front office asks for priority', 'Die Rezeption bittet um Vorrang', 'الاستقبال يطلب الأولوية', 'Il ricevimento chiede la priorità'),
        text: t(
          'A VIP guest is already here. One request asks housekeeping to prioritise the suite.',
          'Ein VIP-Gast ist schon da. Eine Anfrage bittet das Housekeeping, die Suite vorzuziehen.',
          'ضيف مهم وصل بالفعل. وطلب واحد يكفي ليطلب من التدبير الفندقي إعطاء الأولوية للجناح.',
          'Un ospite VIP è già arrivato. Una sola richiesta chiede all’housekeeping di dare priorità alla suite.',
        ),
        alt: t(
          'Room 1211, cleaning in progress, marked Priority, with “Priority cleaning requested”.',
          'Zimmer 1211 in Reinigung, als Priorität markiert, mit „Priority cleaning requested“.',
          'الغرفة 1211 قيد التنظيف، معلَّمة بأولوية، مع «Priority cleaning requested».',
          'Camera 1211 in pulizia, segnata come prioritaria, con “Priority cleaning requested”.',
        ),
      },
      {
        img: screen('rm-3'),
        title: t('Housekeeping receives it', 'Das Housekeeping erhält sie', 'يستلمه التدبير الفندقي', 'L’housekeeping la riceve'),
        text: t(
          'The suite moves to the top of the housekeeping board.',
          'Die Suite rückt im Housekeeping-Board ganz nach oben.',
          'ينتقل الجناح إلى أعلى لوحة التدبير الفندقي.',
          'La suite sale in cima alla bacheca dell’housekeeping.',
        ),
        alt: t(
          'Housekeeping board with room 1211 under Priority, assigned to Maria Santos.',
          'Housekeeping-Board mit Zimmer 1211 unter Priorität, zugewiesen an Maria Santos.',
          'لوحة التدبير الفندقي والغرفة 1211 ضمن الأولوية، مسندة إلى Maria Santos.',
          'Bacheca dell’housekeeping con la camera 1211 tra le priorità, assegnata a Maria Santos.',
        ),
      },
      {
        img: screen('rm-4'),
        phone: true,
        title: t('The team updates progress', 'Das Team meldet den Fortschritt', 'الفريق يحدّث التقدّم', 'Il team aggiorna i progressi'),
        text: t(
          'The room attendant marks it cleaned on her phone.',
          'Die Zimmerreinigung meldet es auf dem Handy als gereinigt.',
          'تسجّل عاملة الغرف عبر هاتفها أن الغرفة نُظّفت.',
          'La cameriera ai piani la segna come pulita dal suo telefono.',
        ),
        alt: t(
          'Tyll Staff on a phone: room 1211 with a Mark cleaned button.',
          'Tyll Staff auf dem Handy: Zimmer 1211 mit der Schaltfläche Mark cleaned.',
          'تطبيق Tyll Staff على الهاتف: الغرفة 1211 مع زر Mark cleaned.',
          'Tyll Staff sul telefono: camera 1211 con il pulsante Mark cleaned.',
        ),
      },
      {
        img: screen('rm-5'),
        title: t('Front office sees the result', 'Die Rezeption sieht das Ergebnis', 'الاستقبال يرى النتيجة', 'Il ricevimento vede il risultato'),
        text: t(
          'Room 1211 is now awaiting inspection.',
          'Zimmer 1211 wartet jetzt auf die Abnahme.',
          'الغرفة 1211 بانتظار الفحص الآن.',
          'La camera 1211 ora è in attesa di ispezione.',
        ),
        alt: t(
          'Room 1211 now shows “Awaiting inspection”, with the cleaning recorded in its history.',
          'Zimmer 1211 zeigt jetzt „Awaiting inspection“, die Reinigung steht im Verlauf.',
          'تُظهر الغرفة 1211 الآن «Awaiting inspection»، مع تسجيل التنظيف في سجلها.',
          'La camera 1211 ora mostra “Awaiting inspection”, con la pulizia registrata nella cronologia.',
        ),
      },
    ],
  },

  sales: {
    key: 'sales',
    icon: 'sales',
    photo: laptop,
    photoAlt: t(
      'A manager working on a laptop at a dimly lit desk.',
      'Eine Führungskraft arbeitet abends an einem Laptop.',
      'مدير يعمل على حاسوب محمول على مكتب خافت الإضاءة.',
      'Un manager lavora al portatile su una scrivania in penombra.',
    ),
    photoFocus: '55% 45%',
    name: t('Sales & Performance', 'Vertrieb & Performance', 'المبيعات والأداء', 'Vendite e performance'),
    menu: t(
      'Understand opportunities and see how the business is performing.',
      'Chancen verstehen und sehen, wie das Geschäft läuft.',
      'افهم الفرص واطّلع على أداء العمل.',
      'Capisci le opportunità e guarda come sta andando il business.',
    ),
    headline: t('See the bigger picture.', 'Das große Ganze sehen.', 'شاهد الصورة الكاملة.', 'Guarda il quadro completo.'),
    intro: t(
      'Understand opportunities, follow results and make better-informed decisions.',
      'Chancen verstehen, Ergebnisse verfolgen und besser informiert entscheiden.',
      'افهم الفرص، وتابع النتائج، واتخذ قرارات مبنية على معلومات أفضل.',
      'Capisci le opportunità, segui i risultati e prendi decisioni più informate.',
    ),
    problem: t(
      'Sales opportunities and hotel performance information often live in different places.',
      'Vertriebschancen und Kennzahlen zum Hotel liegen oft an unterschiedlichen Orten.',
      'غالبًا ما تكون فرص المبيعات ومعلومات أداء الفندق في أماكن مختلفة.',
      'Le opportunità di vendita e i dati sulle performance dell’hotel si trovano spesso in posti diversi.',
    ),
    helps: {
      en: [
        'Owners and general managers see revenue, estimated contribution and open issues together.',
        'Sales follows opportunities and proposals – always kept apart from confirmed business.',
        'Confirmed deals link to their event, so operations can prepare in time.',
      ],
      de: [
        'Eigentümer und Direktion sehen Umsatz, geschätzten Deckungsbeitrag und offene Punkte zusammen.',
        'Der Vertrieb verfolgt Chancen und Angebote – immer getrennt von bestätigtem Geschäft.',
        'Bestätigte Abschlüsse sind mit ihrer Veranstaltung verknüpft, damit der Betrieb rechtzeitig planen kann.',
      ],
      ar: [
        'يرى المالكون والمديرون العامون الإيرادات والمساهمة المقدّرة والمسائل المفتوحة معًا.',
        'يتابع فريق المبيعات الفرص والعروض، مع فصلها دائمًا عن الأعمال المؤكدة.',
        'ترتبط الصفقات المؤكدة بفعالياتها، ليتمكن فريق العمليات من الاستعداد في الوقت المناسب.',
      ],
      it: [
        'Proprietari e direttori generali vedono insieme ricavi, margine stimato e questioni aperte.',
        'Le vendite seguono opportunità e proposte, sempre separate dal business confermato.',
        'Gli accordi confermati sono collegati al loro evento, così le operations possono prepararsi in tempo.',
      ],
    },
    walkTitle: t(
      'From the owner’s overview to the sales pipeline',
      'Vom Überblick der Eigentümerin bis zur Vertriebspipeline',
      'من نظرة المالكة العامة إلى مسار المبيعات',
      'Dalla panoramica della proprietaria alla pipeline di vendita',
    ),
    frames: [
      {
        img: screen('sl-1'),
        title: t('The owner’s overview', 'Der Überblick der Eigentümerin', 'نظرة المالكة العامة', 'La panoramica della proprietaria'),
        text: t(
          'Revenue, estimated contribution and potential losses, with what needs attention.',
          'Umsatz, geschätzter Deckungsbeitrag und mögliche Verluste – mit dem, was Aufmerksamkeit braucht.',
          'الإيرادات والمساهمة المقدّرة والخسائر المحتملة، مع ما يتطلب الانتباه.',
          'Ricavi, margine stimato e perdite potenziali, con ciò che richiede attenzione.',
        ),
        alt: t(
          'Group overview: revenue, estimated operating contribution and potential losses, and a list of issues needing attention.',
          'Gruppenübersicht: Umsatz, geschätzter Deckungsbeitrag, mögliche Verluste und offene Punkte.',
          'نظرة عامة على المجموعة: الإيرادات والمساهمة التشغيلية المقدّرة والخسائر المحتملة، وقائمة بالمسائل التي تتطلب الانتباه.',
          'Panoramica del gruppo: ricavi, margine operativo stimato e perdite potenziali, con un elenco di questioni che richiedono attenzione.',
        ),
      },
      {
        img: screen('sl-2'),
        title: t('Opportunities', 'Chancen', 'الفرص', 'Opportunità'),
        text: t(
          'Potential business and enquiries. Expected values are estimates, not revenue.',
          'Mögliches Geschäft und Anfragen. Erwartete Werte sind Schätzungen, kein Umsatz.',
          'أعمال محتملة واستفسارات. القيم المتوقعة تقديرات وليست إيرادات.',
          'Business potenziale e richieste. I valori attesi sono stime, non ricavi.',
        ),
        alt: t(
          'Opportunities: three open opportunities with expected values marked as sales estimates.',
          'Opportunities: drei offene Chancen, erwartete Werte als Vertriebsschätzung markiert.',
          'شاشة Opportunities: ثلاث فرص مفتوحة بقيم متوقعة معلَّمة بأنها تقديرات مبيعات.',
          'Opportunities: tre opportunità aperte con valori attesi segnati come stime di vendita.',
        ),
      },
      {
        img: screen('sl-3'),
        title: t('Proposals', 'Angebote', 'العروض', 'Proposte'),
        text: t(
          'Offers sent to customers. A proposal is never counted as confirmed.',
          'An Kunden gesendete Angebote. Ein Angebot zählt nie als bestätigt.',
          'عروض أُرسلت إلى العملاء. ولا يُحتسب العرض مؤكدًا أبدًا.',
          'Offerte inviate ai clienti. Una proposta non viene mai contata come confermata.',
        ),
        alt: t(
          'Proposals: one wedding proposal sent and awaiting the customer’s decision.',
          'Proposals: ein Hochzeitsangebot, gesendet und in Erwartung der Kundenentscheidung.',
          'شاشة Proposals: عرض حفل زفاف أُرسل وينتظر قرار العميل.',
          'Proposals: una proposta per un matrimonio inviata e in attesa della decisione del cliente.',
        ),
      },
      {
        img: screen('sl-4'),
        title: t('Confirmed business', 'Bestätigtes Geschäft', 'الأعمال المؤكدة', 'Business confermato'),
        text: t(
          'Each deal links to its event. Revenue is recognised by accounting after the event.',
          'Jeder Abschluss ist mit seiner Veranstaltung verknüpft. Umsatz verbucht die Buchhaltung nach dem Event.',
          'ترتبط كل صفقة بفعاليتها. وتعترف المحاسبة بالإيراد بعد الفعالية.',
          'Ogni accordo è collegato al suo evento. I ricavi vengono riconosciuti dalla contabilità dopo l’evento.',
        ),
        alt: t(
          'Confirmed business: open pipeline, awaiting decision and one confirmed deal linked to its event.',
          'Confirmed business: offene Pipeline, ausstehende Entscheidung und ein bestätigter Abschluss mit Veranstaltung.',
          'شاشة Confirmed business: مسار مفتوح، وقرار منتظر، وصفقة مؤكدة واحدة مرتبطة بفعاليتها.',
          'Confirmed business: pipeline aperta, decisioni in attesa e un accordo confermato collegato al suo evento.',
        ),
      },
      {
        img: screen('sl-5'),
        title: t('Sales and operational summary', 'Vertriebs- und Betriebsübersicht', 'ملخص المبيعات والعمليات', 'Riepilogo vendite e operations'),
        text: t(
          'Revenue, direct costs and estimated contribution, month to date.',
          'Umsatz, direkte Kosten und geschätzter Deckungsbeitrag im laufenden Monat.',
          'الإيرادات والتكاليف المباشرة والمساهمة المقدّرة منذ بداية الشهر.',
          'Ricavi, costi diretti e margine stimato del mese in corso.',
        ),
        alt: t(
          'Budgets & Reports: sales and operational summary for October, and upcoming events’ cost estimates.',
          'Budgets & Reports: Vertriebs- und Betriebsübersicht für Oktober und Kostenschätzungen anstehender Events.',
          'شاشة Budgets & Reports: ملخص المبيعات والعمليات لشهر أكتوبر، وتقديرات تكاليف الفعاليات القادمة.',
          'Budgets & Reports: riepilogo vendite e operations di ottobre e stime dei costi degli eventi in arrivo.',
        ),
      },
    ],
    note: t(
      'Pipeline values are sales estimates. They are never shown as earned revenue.',
      'Pipeline-Werte sind Vertriebsschätzungen. Sie werden nie als erzielter Umsatz dargestellt.',
      'قيم مسار المبيعات تقديرات للمبيعات، ولا تُعرض أبدًا على أنها إيرادات محقّقة.',
      'I valori della pipeline sono stime di vendita. Non vengono mai mostrati come ricavi realizzati.',
    ),
  },
};
