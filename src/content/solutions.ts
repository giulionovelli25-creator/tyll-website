// The six solution pages, in English, German, Arabic and Italian, in the demo's own order and words: Log waste, Stock,
// Predictions, Revenue, Reconciliation, Drinks control.

import type { ImageMetadata } from 'astro';
import type { Locale, SolutionKey } from '../i18n/routes';

import whyChef from '../assets/photos/why-chef.jpg';
import stockChef from '../assets/photos/stock-chef.jpg';
import forecastProduce from '../assets/photos/forecast-produce.jpg';
import statsTerminal from '../assets/photos/tyll-stats-3.jpg';
import reconciliation from '../assets/photos/reconciliation-reception.jpg';
import banquet from '../assets/photos/events-banquet.jpg';

type Text = Record<Locale, string>;
export type Solution = {
  key: SolutionKey;
  icon: 'waste' | 'stock' | 'forecast' | 'revenue' | 'finance' | 'pour';
  photo: ImageMetadata;
  photoAlt: Text;
  /** Where the photo's subject sits, so cropping keeps it in view */
  photoFocus: string;
  name: Text;
  menu: Text;
  headline: Text;
  intro: Text;
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
    name: t('Log waste', 'Abfall erfassen', 'تسجيل الهدر', 'Registra sprechi'),
    menu: t('See what waste costs you.', 'Sehen, was Abfall kostet.', 'اعرف كم يكلفك الهدر.', 'Scopri quanto ti costa lo spreco.'),
    headline: t('What did you throw away today?', 'Was haben Sie heute weggeworfen?', 'ماذا رميت اليوم؟', 'Cosa hai buttato oggi?'),
    intro: t('Two taps log it, with what it cost.', 'Zwei Tipps erfassen es, mit den Kosten.', 'نقرتان تسجّلانه مع تكلفته.', 'Due tocchi lo registrano, con il suo costo.'),
  },

  stock: {
    key: 'stock',
    icon: 'stock',
    photo: stockChef,
    photoAlt: t('Chefs seasoning and plating dishes under copper heat lamps in a hotel kitchen.', 'Köche würzen und richten Gerichte unter kupfernen Wärmelampen in einer Hotelküche an.', 'طهاة يتبّلون الأطباق ويقدّمونها تحت مصابيح تسخين نحاسية في مطبخ فندق.', 'Chef condiscono e impiattano sotto lampade di rame nella cucina di un hotel.'),
    photoFocus: '50% 40%',
    name: t('Stock', 'Bestand', 'المخزون', 'Magazzino'),
    menu: t('Know what runs out first.', 'Wissen, was zuerst ausgeht.', 'اعرف ما ينفد أولًا.', 'Sai cosa finisce per primo.'),
    headline: t('What’s really on your shelf?', 'Was steht wirklich im Regal?', 'ما الموجود فعلًا على رفوفك؟', 'Cosa c’è davvero sullo scaffale?'),
    intro: t('See what runs out first, before a guest asks for it.', 'Sehen Sie, was zuerst ausgeht, bevor ein Gast danach fragt.', 'اعرف ما ينفد أولًا، قبل أن يطلبه ضيف.', 'Vedi cosa finisce per primo, prima che un ospite lo chieda.'),
  },

  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    photo: forecastProduce,
    photoAlt: t('A chef chopping fresh herbs beside trays of lemons and greens.', 'Ein Koch hackt frische Kräuter neben Schalen mit Zitronen und Grün.', 'طاهٍ يفرم أعشابًا طازجة بجانب صوانٍ من الليمون والخضار.', 'Uno chef trita erbe fresche accanto a vassoi di limoni e verdure.'),
    photoFocus: '60% 45%',
    name: t('Predictions', 'Prognosen', 'التوقعات', 'Previsioni'),
    menu: t('One order, ready to approve.', 'Eine Bestellung, bereit zur Freigabe.', 'طلب واحد جاهز للاعتماد.', 'Un ordine, pronto da approvare.'),
    headline: t('Still guessing what to order?', 'Raten Sie noch, was zu bestellen ist?', 'هل ما زلت تخمّن ماذا تطلب؟', 'Stai ancora indovinando cosa ordinare?'),
    intro: t('Get one draft order, built from covers, events and real usage.', 'Ein Bestellentwurf aus Gedecken, Events und echtem Verbrauch.', 'مسودة طلب واحدة مبنية على الأغطية والفعاليات والاستهلاك الفعلي.', 'Una bozza d’ordine da coperti, eventi e consumi reali.'),
  },

  revenue: {
    key: 'revenue',
    icon: 'revenue',
    photo: statsTerminal,
    photoAlt: t('A card terminal and a printed receipt on a dark counter.', 'Ein Kartenterminal und ein gedruckter Beleg auf einer dunklen Theke.', 'جهاز بطاقات وإيصال مطبوع على منضدة داكنة.', 'Un terminale di pagamento e uno scontrino su un banco scuro.'),
    photoFocus: '60% 50%',
    name: t('Revenue', 'Umsatz', 'الإيرادات', 'Ricavi'),
    menu: t('See which outlet earns most.', 'Sehen, welches Outlet am meisten bringt.', 'اعرف أي منفذ يكسب أكثر.', 'Vedi quale punto vendita rende di più.'),
    headline: t('Which outlet really makes you money?', 'Welches Outlet bringt wirklich Geld?', 'أي منفذ يحقق لك المال فعلًا؟', 'Quale punto vendita ti fa guadagnare davvero?'),
    intro: t('Revenue and estimated profit, by day and by outlet.', 'Umsatz und geschätzter Gewinn, nach Tag und Outlet.', 'الإيرادات والربح التقديري حسب اليوم والمنفذ.', 'Ricavi e profitto stimato, per giorno e punto vendita.'),
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: reconciliation,
    photoAlt: t('A guest paying by card at a hotel reception desk beside a brass bell.', 'Ein Gast zahlt an einer Hotelrezeption neben einer Messingglocke mit Karte.', 'ضيف يدفع بالبطاقة عند مكتب استقبال فندق بجانب جرس نحاسي.', 'Un ospite paga con carta alla reception di un hotel accanto a un campanello d’ottone.'),
    photoFocus: '60% 50%',
    name: t('Reconciliation', 'Abgleich', 'المطابقة', 'Riconciliazione'),
    menu: t('Catch what doesn’t match.', 'Finden, was nicht stimmt.', 'اكتشف ما لا يتطابق.', 'Trova ciò che non coincide.'),
    headline: t('Are you paying for things you never received?', 'Zahlen Sie für Ware, die nie ankam?', 'هل تدفع ثمن أشياء لم تستلمها؟', 'Stai pagando merce mai ricevuta?'),
    intro: t('Tabs against receipts. Invoices against deliveries. You only see what differs.', 'Gästerechnungen gegen Belege. Rechnungen gegen Lieferungen. Sie sehen nur, was abweicht.', 'الحسابات مقابل الإيصالات. الفواتير مقابل التوريدات. لا ترى سوى الفروق.', 'Conti contro scontrini. Fatture contro consegne. Vedi solo ciò che non coincide.'),
    note: t('Tabs and receipts are not in the demo yet.', 'Gästerechnungen und Belege sind noch nicht in der Demo.', 'الحسابات والإيصالات ليست في العرض التوضيحي بعد.', 'Conti e scontrini non sono ancora nella demo.'),
  },

  pour: {
    key: 'pour',
    icon: 'pour',
    photo: banquet,
    photoAlt: t('A waiter setting a long banquet table with glasses and flowers.', 'Ein Kellner deckt eine lange Banketttafel mit Gläsern und Blumen ein.', 'نادل يُعدّ طاولة مأدبة طويلة بالكؤوس والزهور.', 'Un cameriere apparecchia un lungo tavolo da banchetto con bicchieri e fiori.'),
    photoFocus: '40% 50%',
    name: t('Drinks control', 'Drinks control', 'Drinks control', 'Drinks control'),
    menu: t('Find drinks never billed.', 'Nie berechnete Getränke finden.', 'اكتشف المشروبات غير المفوترة.', 'Trova le bevande mai fatturate.'),
    headline: t('How much of your bar never reaches a bill?', 'Wie viel von Ihrer Bar landet nie auf einer Rechnung?', 'كم من مشروبات البار لا يصل إلى الفاتورة أبدًا؟', 'Quanto del tuo bar non arriva mai in conto?'),
    intro: t('See the gap by outlet and shift, and what it is worth.', 'Die Lücke nach Outlet und Schicht, und was sie wert ist.', 'اعرف الفرق حسب المنفذ والوردية وقيمته.', 'La differenza per punto vendita e turno, e quanto vale.'),
  },

};
