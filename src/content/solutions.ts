// The six solution pages, in English and German. Every walkthrough step is a real screen from the Tyll demo
// (fictional data), and each caption describes only what that screen shows.

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

const t = (en: string, de: string): Text => ({ en, de });

export const solutions: Record<SolutionKey, Solution> = {
  stock: {
    key: 'stock',
    icon: 'stock',
    photo: stockChef,
    photoAlt: t('Chefs seasoning and plating dishes under copper heat lamps in a hotel kitchen.', 'Köche würzen und richten Gerichte unter kupfernen Wärmelampen in einer Hotelküche an.'),
    photoFocus: '40% 72%',
    name: t('Stock & Waste', 'Lager & Abfall'),
    menu: t('Find missing stock and understand waste.', 'Fehlenden Bestand finden und Abfall verstehen.'),
    headline: t('Know where your stock is going.', 'Wissen, wohin Ihr Bestand geht.'),
    intro: t(
      'See unusual stock differences, understand what happened and take action before problems continue.',
      'Ungewöhnliche Bestandsabweichungen erkennen, verstehen, was passiert ist, und handeln, bevor sich Probleme wiederholen.',
    ),
    problem: t(
      'A hotel restaurant’s stock count doesn’t match what was sold or recorded. Finding out why takes time.',
      'Die Inventur eines Hotelrestaurants passt nicht zu dem, was verkauft oder erfasst wurde. Die Ursache zu finden, kostet Zeit.',
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
    },
    walkTitle: t('Eight cans of Coca-Cola, step by step', 'Acht Dosen Coca-Cola, Schritt für Schritt'),
    frames: [
      {
        img: screen('story-1-alert'),
        title: t('A stock difference appears', 'Eine Bestandsabweichung erscheint'),
        text: t('Tyll flags Coca-Cola use at The Terrace that sales and waste don’t explain.', 'Tyll meldet Coca-Cola-Verbrauch auf The Terrace, den Verkäufe und Abfall nicht erklären.'),
        alt: t('Tyll Stock with a notice: unexplained Coca-Cola usage detected at The Terrace.', 'Tyll Stock mit dem Hinweis auf ungeklärten Coca-Cola-Verbrauch auf The Terrace.'),
      },
      {
        img: screen('story-2-case'),
        title: t('The manager opens the investigation', 'Die Managerin öffnet die Prüfung'),
        text: t('Counts, deliveries and sales side by side: 8 cans unexplained.', 'Zählungen, Lieferungen und Verkäufe nebeneinander: 8 Dosen ungeklärt.'),
        alt: t('Investigation “8 cans of Coca-Cola unexplained at The Terrace” with where it happened and the value involved.', 'Prüfung „8 cans of Coca-Cola unexplained at The Terrace“ mit Ort und betroffenem Betrag.'),
      },
      {
        img: screen('story-3-records'),
        title: t('The records are laid out', 'Die Belege liegen offen'),
        text: t('A Coke removed from a bill after it went to the bar – one of several things to check.', 'Eine Cola, die nach der Bestellung an der Bar von der Rechnung entfernt wurde – eine von mehreren Spuren.'),
        alt: t('Timeline of the stock period and a list of possible explanations, each marked as needing a check.', 'Zeitleiste der Bestandsperiode und mögliche Erklärungen, jeweils als zu prüfen markiert.'),
      },
      {
        img: screen('story-4-assign'),
        title: t('A follow-up is assigned', 'Eine Folgeaufgabe wird zugewiesen'),
        text: t('The F&B director takes responsibility, with a deadline.', 'Der F&B-Direktor übernimmt die Verantwortung, mit Frist.'),
        alt: t('Manage this case: responsible Marco Bellini, deadline 15 October, saved.', 'Fall verwalten: verantwortlich Marco Bellini, Frist 15. Oktober, gespeichert.'),
      },
      {
        img: screen('story-5-assigned'),
        title: t('The outcome is tracked', 'Das Ergebnis wird nachverfolgt'),
        text: t('The case waits in his list until it is closed with a result.', 'Der Fall bleibt in seiner Liste, bis er mit einem Ergebnis abgeschlossen ist.'),
        alt: t('Money Back List filtered to Marco Bellini, showing the assigned Coca-Cola case.', 'Money Back List, gefiltert auf Marco Bellini, mit dem zugewiesenen Coca-Cola-Fall.'),
      },
    ],
    note: t(
      'A difference is a question, not a verdict. It can come from a miscount, a missed waste entry or a drink that was never rung up.',
      'Eine Abweichung ist eine Frage, kein Urteil. Sie kann von einer Fehlzählung, nicht erfasstem Abfall oder einem nicht gebuchten Getränk kommen.',
    ),
  },

  finance: {
    key: 'finance',
    icon: 'finance',
    photo: receipts,
    photoAlt: t('Receipts and a calculator on a dark desk under a brass lamp.', 'Belege und ein Taschenrechner auf einem dunklen Tisch unter einer Messinglampe.'),
    photoFocus: '45% 60%',
    name: t('Finance & Money', 'Finanzen & Zahlungen'),
    menu: t('Understand financial differences and keep track of costs.', 'Finanzielle Abweichungen verstehen und Kosten im Blick behalten.'),
    headline: t('Know where your money stands.', 'Wissen, wo Ihr Geld steht.'),
    intro: t(
      'Spot unusual transactions, understand differences and keep financial follow-ups in one place.',
      'Ungewöhnliche Buchungen erkennen, Abweichungen verstehen und finanzielle Rückfragen an einem Ort behalten.',
    ),
    problem: t(
      'Payments, room charges, invoices and bank deposits can sit in different systems.',
      'Zahlungen, Zimmerbelastungen, Rechnungen und Bankeinzahlungen liegen oft in verschiedenen Systemen.',
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
    },
    walkTitle: t('Following the money through one evening', 'Dem Geld durch einen Abend folgen'),
    frames: [
      {
        img: screen('fin-1'),
        title: t('Restaurant mistakes, explained', 'Fehler im Restaurant, erklärt'),
        text: t('Tonight at The Terrace: an item removed after it went to the bar.', 'Heute Abend auf The Terrace: ein Artikel, entfernt nachdem er an die Bar ging.'),
        alt: t('Restaurant mistakes: a worked example of an item removed after it was sent to the bar, and flagged items by type.', 'Restaurant mistakes: ein Beispiel für einen nach Bestellung entfernten Artikel und markierte Fälle nach Art.'),
      },
      {
        img: screen('fin-2'),
        title: t('The whole order, from first item to final bill', 'Die ganze Bestellung, vom ersten Artikel bis zur Rechnung'),
        text: t('Original order, final bill and the kitchen and bar tickets.', 'Ursprüngliche Bestellung, Endrechnung sowie Küchen- und Barbons.'),
        alt: t('Order TRC-1013-198: original order AED 120, final bill AED 98, with the Coca-Cola removed after dispatch.', 'Bestellung TRC-1013-198: Bestellung AED 120, Rechnung AED 98, Coca-Cola nach Ausgabe entfernt.'),
      },
      {
        img: screen('fin-3'),
        title: t('Room charges checked', 'Zimmerbelastungen geprüft'),
        text: t('Charges that didn’t reach the guest bill are counted and listed.', 'Belastungen, die nicht auf der Gästerechnung ankamen, werden gezählt und aufgelistet.'),
        alt: t('Room charges: charges checked, what should be on guest bills, what was posted, and postings flagged by source.', 'Room charges: geprüfte Belastungen, Soll und Ist auf Gästerechnungen und markierte Buchungen nach Quelle.'),
      },
      {
        img: screen('fin-4'),
        title: t('Invoices against deliveries', 'Rechnungen gegen Lieferungen'),
        text: t('Supplier invoices that differ from what actually arrived, ready to check.', 'Lieferantenrechnungen, die von der tatsächlichen Lieferung abweichen – bereit zur Prüfung.'),
        alt: t('Invoice differences: supplier orders where less was delivered than ordered, or the invoice price was above the order price.', 'Invoice differences: Bestellungen mit weniger Lieferung als bestellt oder höherem Rechnungspreis.'),
      },
      {
        img: screen('fin-5'),
        title: t('One list for every follow-up', 'Eine Liste für jede Rückfrage'),
        text: t('Who is responsible, by when, and what came of it.', 'Wer verantwortlich ist, bis wann – und was dabei herauskam.'),
        alt: t('Money Back List: open cases, potential and confirmed losses, and each case with responsible person and deadline.', 'Money Back List: offene Fälle, mögliche und bestätigte Verluste, jeder Fall mit Verantwortlichem und Frist.'),
      },
    ],
    note: t(
      'In the demo these records are simulated. Which POS, PMS and accounting data can be connected is agreed with each hotel.',
      'In der Demo sind diese Daten simuliert. Welche Kassen-, PMS- und Buchhaltungsdaten angebunden werden, wird mit jedem Hotel vereinbart.',
    ),
  },

  forecasting: {
    key: 'forecasting',
    icon: 'forecast',
    photo: forecastProduce,
    photoAlt: t('A chef chopping fresh herbs beside trays of lemons and greens.', 'Ein Koch hackt frische Kräuter neben Schalen mit Zitronen und Grün.'),
    photoFocus: '60% 45%',
    name: t('Forecasting & Purchasing', 'Prognose & Einkauf'),
    menu: t('Know what to buy, prepare and approve.', 'Wissen, was gekauft, vorbereitet und freigegeben werden muss.'),
    headline: t('Know what to buy before you run out.', 'Wissen, was Sie kaufen müssen, bevor es ausgeht.'),
    intro: t('Plan ahead, create purchase requests and keep approvals moving.', 'Vorausplanen, Bestellanforderungen erstellen und Freigaben in Bewegung halten.'),
    problem: t(
      'Orders are harder to plan when demand, available stock and upcoming events are tracked separately.',
      'Bestellungen sind schwer zu planen, wenn Nachfrage, Bestand und anstehende Veranstaltungen getrennt erfasst werden.',
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
    },
    walkTitle: t('From expected guests to goods received', 'Von erwarteten Gästen bis zur Warenannahme'),
    frames: [
      {
        img: screen('fc-1'),
        title: t('Expected demand', 'Erwartete Nachfrage'),
        text: t('Reservations, walk-ins, occupancy and event guests for the next three days.', 'Reservierungen, Laufkundschaft, Belegung und Eventgäste für die nächsten drei Tage.'),
        alt: t('Order stock, expected demand: restaurant reservations, walk-in guests, hotel occupancy and confirmed event guests.', 'Order stock, erwartete Nachfrage: Reservierungen, Laufkundschaft, Belegung und bestätigte Eventgäste.'),
      },
      {
        img: screen('fc-2'),
        title: t('What to buy', 'Was gekauft werden muss'),
        text: t('Suggested quantities, flagged where stock runs short before a delivery.', 'Empfohlene Mengen, markiert, wo der Bestand vor einer Lieferung knapp wird.'),
        alt: t('What to buy: items with suggested quantities and prices, several marked “runs short before a delivery”.', 'What to buy: Artikel mit empfohlenen Mengen und Preisen, mehrere als vor der Lieferung knapp markiert.'),
      },
      {
        img: screen('fc-3'),
        title: t('A request goes to Purchasing', 'Die Anforderung geht an den Einkauf'),
        text: t('The manager sends it and can follow every approval step.', 'Die Managerin sendet sie ab und kann jeden Freigabeschritt verfolgen.'),
        alt: t('Purchase request PR-DXB-0001 sent to Purchasing, with its approval steps shown.', 'Bestellanforderung PR-DXB-0001 an den Einkauf gesendet, mit den Freigabeschritten.'),
      },
      {
        img: screen('fc-4'),
        title: t('Purchasing reviews it', 'Der Einkauf prüft sie'),
        text: t('Approve, request changes or reject – with the budget in view.', 'Freigeben, Änderungen anfordern oder ablehnen – mit Blick aufs Budget.'),
        alt: t('Purchasing review with Approve, Request changes and Reject, next to the budget and approval rules.', 'Prüfung durch den Einkauf mit Freigeben, Änderungen anfordern und Ablehnen, neben Budget und Freigaberegeln.'),
      },
      {
        img: screen('fc-5'),
        title: t('Goods are recorded on arrival', 'Ware wird bei Ankunft erfasst'),
        text: t('Stock rises only when the delivery is recorded – not when the order is placed.', 'Der Bestand steigt erst, wenn die Lieferung erfasst ist – nicht schon bei der Bestellung.'),
        alt: t('Record the delivery: enter what actually arrived; stock rises by these quantities.', 'Record the delivery: tatsächlich gelieferte Mengen eintragen; der Bestand steigt um diese Mengen.'),
      },
    ],
  },

  events: {
    key: 'events',
    icon: 'events',
    photo: eventsBanquet,
    photoAlt: t('Banquet staff setting a long table with flowers before an event.', 'Bankettpersonal deckt vor einer Veranstaltung eine lange Tafel mit Blumen ein.'),
    photoFocus: '72% 40%',
    name: t('Events & Staffing', 'Events & Personal'),
    menu: t('Plan events and coordinate your team.', 'Veranstaltungen planen und Ihr Team koordinieren.'),
    headline: t('Great events need great coordination.', 'Gute Veranstaltungen brauchen gute Abstimmung.'),
    intro: t('Help teams plan what they need, coordinate staff and keep everyone informed.', 'Teams planen lassen, was sie brauchen, Personal abstimmen und alle auf dem gleichen Stand halten.'),
    problem: t(
      'An upcoming event affects the kitchen, purchasing, staffing and other departments.',
      'Eine anstehende Veranstaltung betrifft Küche, Einkauf, Personal und weitere Abteilungen.',
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
    },
    walkTitle: t('A conference dinner for 180 guests', 'Ein Konferenzdinner für 180 Gäste'),
    frames: [
      {
        img: screen('ev-1'),
        title: t('A gap is spotted', 'Eine Lücke wird erkannt'),
        text: t('Thursday’s conference needs six more waiters, and other roles are short.', 'Für die Konferenz am Donnerstag fehlen sechs Servicekräfte und weitere Rollen.'),
        alt: t('Sales & Events with the notice: Thursday’s conference needs six additional waiters, and six other roles are short.', 'Sales & Events mit dem Hinweis, dass für die Konferenz sechs Servicekräfte und weitere Rollen fehlen.'),
      },
      {
        img: screen('ev-2'),
        title: t('The event at a glance', 'Die Veranstaltung auf einen Blick'),
        text: t('Estimated costs, the agreed price and what still needs doing.', 'Geschätzte Kosten, vereinbarter Preis und was noch zu tun ist.'),
        alt: t('Regional sales conference dinner: operational estimate and a list of what needs doing, with Find staff buttons.', 'Regional sales conference dinner: Kostenschätzung und offene Aufgaben mit Schaltflächen zum Finden von Personal.'),
      },
      {
        img: screen('ev-3'),
        title: t('Finding available staff', 'Verfügbares Personal finden'),
        text: t('People with the right skill who are free for the whole event.', 'Menschen mit passender Qualifikation, die für die ganze Veranstaltung frei sind.'),
        alt: t('Event staffing: waiters needed 12, confirmed 6, and a list of people who are free from 18:00 to 22:00.', 'Event staffing: 12 Servicekräfte benötigt, 6 bestätigt, und eine Liste freier Mitarbeitender von 18:00 bis 22:00.'),
      },
      {
        img: screen('ev-4'),
        title: t('Another department decides', 'Eine andere Abteilung entscheidet'),
        text: t('The restaurant manager sees the request for six waiters and responds.', 'Die Restaurantleiterin sieht die Anfrage nach sechs Servicekräften und antwortet.'),
        alt: t('Staff support for the restaurant manager: “6 waiters for Banqueting” waiting for her decision.', 'Staff support der Restaurantleiterin: „6 waiters for Banqueting“ wartet auf ihre Entscheidung.'),
      },
    ],
  },

  rooms: {
    key: 'rooms',
    icon: 'rooms',
    photo: roomsSuite,
    photoAlt: t('A calm hotel room with a made bed and soft bedside light.', 'Ein ruhiges Hotelzimmer mit gemachtem Bett und sanftem Licht.'),
    photoFocus: '50% 60%',
    name: t('Rooms & Guest Experience', 'Zimmer & Gästeerlebnis'),
    menu: t('Keep room readiness and guest requests moving.', 'Zimmerbereitschaft und Gästewünsche in Bewegung halten.'),
    headline: t('Better teamwork. Better guest experiences.', 'Bessere Zusammenarbeit. Bessere Gästeerlebnisse.'),
    intro: t('Keep room readiness, guest requests and department updates moving.', 'Zimmerbereitschaft, Gästewünsche und Rückmeldungen zwischen Abteilungen in Bewegung halten.'),
    problem: t(
      'When reception, housekeeping and other departments work separately, simple requests can take longer.',
      'Wenn Rezeption, Housekeeping und andere Abteilungen getrennt arbeiten, dauern einfache Anliegen länger.',
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
    },
    walkTitle: t('A late suite, ready in time', 'Eine verspätete Suite, rechtzeitig fertig'),
    frames: [
      {
        img: screen('rm-1'),
        title: t('Arrivals at a glance', 'Anreisen auf einen Blick'),
        text: t('Which rooms are ready, which are late, and which guests are already waiting.', 'Welche Zimmer fertig sind, welche sich verspäten und welche Gäste schon warten.'),
        alt: t('Room readiness: today’s arrivals, rooms being cleaned and guests waiting.', 'Room readiness: heutige Anreisen, Zimmer in Reinigung und wartende Gäste.'),
      },
      {
        img: screen('rm-2'),
        title: t('Front office asks for priority', 'Die Rezeption bittet um Vorrang'),
        text: t('A VIP guest is already here. One request asks housekeeping to prioritise the suite.', 'Ein VIP-Gast ist schon da. Eine Anfrage bittet das Housekeeping, die Suite vorzuziehen.'),
        alt: t('Room 1211, cleaning in progress, marked Priority, with “Priority cleaning requested”.', 'Zimmer 1211 in Reinigung, als Priorität markiert, mit „Priority cleaning requested“.'),
      },
      {
        img: screen('rm-3'),
        title: t('Housekeeping receives it', 'Das Housekeeping erhält sie'),
        text: t('The suite moves to the top of the housekeeping board.', 'Die Suite rückt im Housekeeping-Board ganz nach oben.'),
        alt: t('Housekeeping board with room 1211 under Priority, assigned to Maria Santos.', 'Housekeeping-Board mit Zimmer 1211 unter Priorität, zugewiesen an Maria Santos.'),
      },
      {
        img: screen('rm-4'),
        phone: true,
        title: t('The team updates progress', 'Das Team meldet den Fortschritt'),
        text: t('The room attendant marks it cleaned on her phone.', 'Die Zimmerreinigung meldet es auf dem Handy als gereinigt.'),
        alt: t('Tyll Staff on a phone: room 1211 with a Mark cleaned button.', 'Tyll Staff auf dem Handy: Zimmer 1211 mit der Schaltfläche Mark cleaned.'),
      },
      {
        img: screen('rm-5'),
        title: t('Front office sees the result', 'Die Rezeption sieht das Ergebnis'),
        text: t('Room 1211 is now awaiting inspection.', 'Zimmer 1211 wartet jetzt auf die Abnahme.'),
        alt: t('Room 1211 now shows “Awaiting inspection”, with the cleaning recorded in its history.', 'Zimmer 1211 zeigt jetzt „Awaiting inspection“, die Reinigung steht im Verlauf.'),
      },
    ],
  },

  sales: {
    key: 'sales',
    icon: 'sales',
    photo: laptop,
    photoAlt: t('A manager working on a laptop at a dimly lit desk.', 'Eine Führungskraft arbeitet abends an einem Laptop.'),
    photoFocus: '55% 45%',
    name: t('Sales & Performance', 'Vertrieb & Performance'),
    menu: t('Understand opportunities and see how the business is performing.', 'Chancen verstehen und sehen, wie das Geschäft läuft.'),
    headline: t('See the bigger picture.', 'Das große Ganze sehen.'),
    intro: t('Understand opportunities, follow results and make better-informed decisions.', 'Chancen verstehen, Ergebnisse verfolgen und besser informiert entscheiden.'),
    problem: t(
      'Sales opportunities and hotel performance information often live in different places.',
      'Vertriebschancen und Kennzahlen zum Hotel liegen oft an unterschiedlichen Orten.',
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
    },
    walkTitle: t('From the owner’s overview to the sales pipeline', 'Vom Überblick der Eigentümerin bis zur Vertriebspipeline'),
    frames: [
      {
        img: screen('sl-1'),
        title: t('The owner’s overview', 'Der Überblick der Eigentümerin'),
        text: t('Revenue, estimated contribution and potential losses, with what needs attention.', 'Umsatz, geschätzter Deckungsbeitrag und mögliche Verluste – mit dem, was Aufmerksamkeit braucht.'),
        alt: t('Group overview: revenue, estimated operating contribution and potential losses, and a list of issues needing attention.', 'Gruppenübersicht: Umsatz, geschätzter Deckungsbeitrag, mögliche Verluste und offene Punkte.'),
      },
      {
        img: screen('sl-2'),
        title: t('Opportunities', 'Chancen'),
        text: t('Potential business and enquiries. Expected values are estimates, not revenue.', 'Mögliches Geschäft und Anfragen. Erwartete Werte sind Schätzungen, kein Umsatz.'),
        alt: t('Opportunities: three open opportunities with expected values marked as sales estimates.', 'Opportunities: drei offene Chancen, erwartete Werte als Vertriebsschätzung markiert.'),
      },
      {
        img: screen('sl-3'),
        title: t('Proposals', 'Angebote'),
        text: t('Offers sent to customers. A proposal is never counted as confirmed.', 'An Kunden gesendete Angebote. Ein Angebot zählt nie als bestätigt.'),
        alt: t('Proposals: one wedding proposal sent and awaiting the customer’s decision.', 'Proposals: ein Hochzeitsangebot, gesendet und in Erwartung der Kundenentscheidung.'),
      },
      {
        img: screen('sl-4'),
        title: t('Confirmed business', 'Bestätigtes Geschäft'),
        text: t('Each deal links to its event. Revenue is recognised by accounting after the event.', 'Jeder Abschluss ist mit seiner Veranstaltung verknüpft. Umsatz verbucht die Buchhaltung nach dem Event.'),
        alt: t('Confirmed business: open pipeline, awaiting decision and one confirmed deal linked to its event.', 'Confirmed business: offene Pipeline, ausstehende Entscheidung und ein bestätigter Abschluss mit Veranstaltung.'),
      },
      {
        img: screen('sl-5'),
        title: t('Sales and operational summary', 'Vertriebs- und Betriebsübersicht'),
        text: t('Revenue, direct costs and estimated contribution, month to date.', 'Umsatz, direkte Kosten und geschätzter Deckungsbeitrag im laufenden Monat.'),
        alt: t('Budgets & Reports: sales and operational summary for October, and upcoming events’ cost estimates.', 'Budgets & Reports: Vertriebs- und Betriebsübersicht für Oktober und Kostenschätzungen anstehender Events.'),
      },
    ],
    note: t(
      'Pipeline values are sales estimates. They are never shown as earned revenue.',
      'Pipeline-Werte sind Vertriebsschätzungen. Sie werden nie als erzielter Umsatz dargestellt.',
    ),
  },
};
