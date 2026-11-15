// The six solution pages, in English, German, Arabic and Italian, in the demo's own order and words: Log waste, Stock,
// Predictions, Revenue, Reconciliation, Drinks control.

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
    intro: t('Two taps log it, with what it cost.', 'Zwei Tipps erfassen es, mit den Kosten.', 'نقرتان تسجّلانه مع تكلفته.', 'Due tocchi lo registrano, con il suo costo.'),
    see: [
      { title: t('What gets thrown away', 'Was weggeworfen wird', 'ما الذي يُرمى', 'Cosa viene buttato via'), text: t('Choose the item. Two taps log it.', 'Artikel wählen. Zwei Tipps erfassen ihn.', 'اختر الصنف. نقرتان تسجّلانه.', 'Scegli l’articolo. Due tocchi lo registrano.') },
      { title: t('What each entry cost', 'Was jeder Eintrag kostet', 'تكلفة كل إدخال', 'Quanto costa ogni voce'), text: t('Today’s loss at a glance, and every entry with its cost.', 'Der heutige Verlust auf einen Blick, jeder Eintrag mit seinen Kosten.', 'خسارة اليوم بنظرة واحدة، وكل إدخال مع تكلفته.', 'La perdita di oggi a colpo d’occhio, ogni voce con il suo costo.') },
      { title: t('A daily log to check', 'Ein Tagesprotokoll zum Prüfen', 'سجل يومي للمراجعة', 'Un registro giornaliero da controllare'), text: t('Read it and see what waste costs you.', 'Lesen Sie es und sehen Sie, was Abfall kostet.', 'اقرأه واعرف كم يكلفك الهدر.', 'Leggilo e scopri quanto ti costa lo spreco.') },
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
    name: t('Stock', 'Bestand', 'المخزون', 'Magazzino'),
    menu: t('Know what runs out first.', 'Wissen, was zuerst ausgeht.', 'اعرف ما ينفد أولًا.', 'Sai cosa finisce per primo.'),
    headline: t('What’s really on your shelf?', 'Was steht wirklich im Regal?', 'ما الموجود فعلًا على رفوفك؟', 'Cosa c’è davvero sullo scaffale?'),
    intro: t('See what runs out first, before a guest asks for it.', 'Sehen Sie, was zuerst ausgeht, bevor ein Gast danach fragt.', 'اعرف ما ينفد أولًا، قبل أن يطلبه ضيف.', 'Vedi cosa finisce per primo, prima che un ospite lo chieda.'),
    see: [
      { title: t('Your team’s stock count', 'Die Zählung Ihres Teams', 'جرد يقوم به فريقك', 'Il conteggio del tuo team'), text: t('The expected amount is filled in. They just confirm.', 'Die erwartete Menge ist eingetragen. Ihr Team bestätigt nur.', 'الكمية المتوقعة مُدخلة. ما عليهم إلا التأكيد.', 'La quantità prevista è già inserita. Basta confermare.') },
      { title: t('Critical, low or fine', 'Critical, low oder fine', 'Critical أو low أو fine', 'Critical, low o fine'), text: t('Your whole stock at a glance.', 'Ihr ganzer Bestand auf einen Blick.', 'مخزونك كله بنظرة واحدة.', 'Tutta la merce a colpo d’occhio.') },
      { title: t('What runs out first', 'Was zuerst ausgeht', 'ما ينفد أولًا', 'Cosa finisce per primo'), text: t('Act on it before a guest asks for it.', 'Handeln Sie, bevor ein Gast danach fragt.', 'تصرّف قبل أن يطلبه ضيف.', 'Intervieni prima che un ospite lo chieda.') },
    ],
  },

  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    photo: forecastProduce,
    photoAlt: t('A chef chopping fresh herbs beside trays of lemons and greens.', 'Ein Koch hackt frische Kräuter neben Schalen mit Zitronen und Grün.', 'طاهٍ يفرم أعشابًا طازجة بجانب صوانٍ من الليمون والخضار.', 'Uno chef trita erbe fresche accanto a vassoi di limoni e verdure.'),
    photoFocus: '60% 45%',
    tone: 'violet',
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
      { title: t('One draft order to approve', 'Ein Entwurf zur Freigabe', 'مسودة طلب واحدة للاعتماد', 'Una bozza da approvare'), text: t('Nothing is sent until you approve it.', 'Nichts geht raus ohne Ihre Freigabe.', 'لا يُرسل شيء قبل موافقتك.', 'Nulla parte senza la tua approvazione.') },
    ],
  },

  revenue: {
    key: 'revenue',
    icon: 'revenue',
    photo: revenuePayment,
    photoAlt: t('A waiter in white gloves holds a card terminal while a guest checks the bill.', 'Ein Kellner mit weißen Handschuhen hält ein Kartenterminal, während ein Gast die Rechnung prüft.', 'نادل بقفازين أبيضين يحمل جهاز الدفع بينما يراجع ضيف الفاتورة.', 'Un cameriere con guanti bianchi tiene il terminale mentre un ospite controlla il conto.'),
    photoFocus: '55% 12%',
    tone: 'blue',
    mark: t('money', 'Geld', 'المال', 'guadagnare'),
    pagePhoto: revenuePayment,
    pagePhotoFocus: '50% 4%',
    proof: { kind: 'faq', id: 'outlets' },
    name: t('Revenue', 'Umsatz', 'الإيرادات', 'Ricavi'),
    menu: t('See which outlet earns most.', 'Sehen, welches Outlet am meisten bringt.', 'اعرف أي منفذ يكسب أكثر.', 'Vedi quale punto vendita rende di più.'),
    headline: t('Which outlet really makes you money?', 'Welches Outlet bringt wirklich Geld?', 'أي منفذ يحقق لك المال فعلًا؟', 'Quale punto vendita ti fa guadagnare davvero?'),
    intro: t('Revenue and estimated profit, by day and by outlet.', 'Umsatz und geschätzter Gewinn, nach Tag und Outlet.', 'الإيرادات والربح التقديري حسب اليوم والمنفذ.', 'Ricavi e profitto stimato, per giorno e punto vendita.'),
    see: [
      { title: t('Revenue and cost by outlet', 'Umsatz und Kosten je Outlet', 'الإيرادات والتكلفة لكل منفذ', 'Ricavi e costi per punto vendita'), text: t('For today, 7 days and 30 days.', 'Für heute, 7 Tage und 30 Tage.', 'لليوم و7 أيام و30 يومًا.', 'Per oggi, 7 giorni e 30 giorni.') },
      { title: t('Revenue beside estimated profit', 'Umsatz neben geschätztem Gewinn', 'الإيرادات بجانب الربح التقديري', 'Ricavi accanto al profitto stimato'), text: t('Side by side, by day and by outlet.', 'Nebeneinander, nach Tag und nach Outlet.', 'جنبًا إلى جنب، حسب اليوم وحسب المنفذ.', 'Fianco a fianco, per giorno e per punto vendita.') },
      { title: t('Your outlets, compared', 'Ihre Outlets im Vergleich', 'منافذك في مقارنة واحدة', 'I tuoi punti vendita a confronto'), text: t('See which one really makes you money.', 'Sehen Sie, welches wirklich Geld bringt.', 'اعرف أيّها يحقق لك المال فعلًا.', 'Vedi quale ti fa guadagnare davvero.') },
    ],
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: reconciliation,
    photoAlt: t('A guest paying by card at a hotel reception desk beside a brass bell.', 'Ein Gast zahlt an einer Hotelrezeption neben einer Messingglocke mit Karte.', 'ضيف يدفع بالبطاقة عند مكتب استقبال فندق بجانب جرس نحاسي.', 'Un ospite paga con carta alla reception di un hotel accanto a un campanello d’ottone.'),
    photoFocus: '60% 50%',
    tone: 'blue',
    mark: t('never received', 'nie ankam', 'لم تستلمها', 'mai ricevuta'),
    pagePhoto: pageReconciliation,
    pagePhotoFocus: '40% 55%',
    proof: { kind: 'story', step: 0 },
    name: t('Reconciliation', 'Abgleich', 'المطابقة', 'Riconciliazione'),
    menu: t('Catch what doesn’t match.', 'Finden, was nicht stimmt.', 'اكتشف ما لا يتطابق.', 'Trova ciò che non coincide.'),
    headline: t('Are you paying for things you never received?', 'Zahlen Sie für Ware, die nie ankam?', 'هل تدفع ثمن أشياء لم تستلمها؟', 'Stai pagando merce mai ricevuta?'),
    intro: t('Tabs against receipts. Invoices against deliveries. You only see what differs.', 'Gästerechnungen gegen Belege. Rechnungen gegen Lieferungen. Sie sehen nur, was abweicht.', 'الحسابات مقابل الإيصالات. الفواتير مقابل التوريدات. لا ترى سوى الفروق.', 'Conti contro scontrini. Fatture contro consegne. Vedi solo ciò che non coincide.'),
    see: [
      { title: t('Your supplier invoices', 'Die Rechnungen Ihrer Lieferanten', 'فواتير الموردين لديك', 'Le fatture dei tuoi fornitori'), text: t('Checked against what you ordered and what arrived.', 'Geprüft gegen Bestellung und Lieferung.', 'تُطابَق مع ما طلبته وما استلمته.', 'Controllate con ciò che hai ordinato e ricevuto.') },
      { title: t('Every invoice with a difference', 'Jede Rechnung mit einer Abweichung', 'كل فاتورة بها فرق', 'Ogni fattura con una differenza'), text: t('Ordered, received and invoiced, side by side.', 'Bestellt, erhalten und berechnet, nebeneinander.', 'المطلوب والمستلم والمفوتر جنبًا إلى جنب.', 'Ordinato, ricevuto e fatturato, fianco a fianco.') },
      { title: t('One decision per invoice', 'Eine Entscheidung pro Rechnung', 'قرار واحد لكل فاتورة', 'Una decisione per fattura'), text: t('Flag it, correct it or approve it.', 'Markieren, korrigieren oder freigeben.', 'أشر إليها أو صحّحها أو اعتمدها.', 'Segnala, correggi o approva.') },
    ],
    note: t('Tabs and receipts are not in the demo yet.', 'Gästerechnungen und Belege sind noch nicht in der Demo.', 'الحسابات والإيصالات ليست في العرض التوضيحي بعد.', 'Conti e scontrini non sono ancora nella demo.'),
  },

  pour: {
    key: 'pour',
    icon: 'pour',
    photo: banquet,
    photoAlt: t('A waiter setting a long banquet table with glasses and flowers.', 'Ein Kellner deckt eine lange Banketttafel mit Gläsern und Blumen ein.', 'نادل يُعدّ طاولة مأدبة طويلة بالكؤوس والزهور.', 'Un cameriere apparecchia un lungo tavolo da banchetto con bicchieri e fiori.'),
    photoFocus: '40% 50%',
    tone: 'rose',
    mark: t('never', 'nie', 'أبدًا', 'mai'),
    pagePhoto: pageDrinks,
    pagePhotoFocus: '50% 50%',
    proof: { kind: 'number', card: 2 },
    name: t('Drinks control', 'Drinks control', 'Drinks control', 'Drinks control'),
    menu: t('Find drinks never billed.', 'Nie berechnete Getränke finden.', 'اكتشف المشروبات غير المفوترة.', 'Trova le bevande mai fatturate.'),
    headline: t('How much of your bar never reaches a bill?', 'Wie viel von Ihrer Bar landet nie auf einer Rechnung?', 'كم من مشروبات البار لا يصل إلى الفاتورة أبدًا؟', 'Quanto del tuo bar non arriva mai in conto?'),
    intro: t('See the gap by outlet and shift, and what it is worth.', 'Die Lücke nach Outlet und Schicht, und was sie wert ist.', 'اعرف الفرق حسب المنفذ والوردية وقيمته.', 'La differenza per punto vendita e turno, e quanto vale.'),
    see: [
      { title: t('Last night’s bar sales', 'Die Barumsätze der letzten Nacht', 'مبيعات البار ليلة أمس', 'Le vendite bar di ieri sera'), text: t('Read from your POS, nothing to install.', 'Aus Ihrer Kasse gelesen, nichts zu installieren.', 'تُقرأ من نظام نقاط البيع لديك، ولا شيء للتثبيت.', 'Lette dal tuo POS, niente da installare.') },
      { title: t('Drinks poured but never billed', 'Eingeschenkt, aber nie berechnet', 'مشروبات سُكبت ولم تُفوتر', 'Versato ma mai fatturato'), text: t('Every line with its value and the reason.', 'Jede Zeile mit ihrem Wert und dem Grund.', 'كل بند مع قيمته وسببه.', 'Ogni riga con il suo valore e il motivo.') },
      { title: t('A short list to check', 'Eine kurze Liste zum Prüfen', 'قائمة قصيرة للمراجعة', 'Una breve lista da controllare'), text: t('Know which bottle and which shift to look at.', 'Sie wissen, welche Flasche und welche Schicht Sie prüfen.', 'اعرف أي زجاجة وأي وردية تراجع.', 'Sai quale bottiglia e quale turno guardare.') },
    ],
  },

};
