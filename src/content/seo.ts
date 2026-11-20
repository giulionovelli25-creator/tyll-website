// Search titles and descriptions for the six solution pages. Only English and German have entries; any other
// language falls back to the page's default ("<name> | Tyll" and the headline with the intro) in SolutionPage.astro.
import type { Locale, SolutionKey } from '../i18n';

type Meta = { title: string; description: string };

export const solutionSeo: Partial<Record<SolutionKey, Partial<Record<Locale, Meta>>>> = {
  waste: {
    en: {
      title: 'Food Waste Tracking for Restaurants & Hotels | Tyll',
      description: "Log what was wasted or broken in two taps, with what it cost. See today's waste log and the month's total without a spreadsheet.",
    },
    de: {
      title: 'Lebensmittelabfall erfassen in der Gastronomie | Tyll',
      description: 'Abfall und Bruch mit zwei Tipps erfassen, inklusive Kosten. Tagesprotokoll und Monatssumme ohne Excel-Liste.',
    },
  },
  stock: {
    en: {
      title: 'Hotel Stock Levels From Sales, Deliveries & Waste | Tyll',
      description: 'Stock levels worked out from your sales, deliveries and logged waste. See what runs out first, before a guest asks for it.',
    },
    de: {
      title: 'Lagerbestand aus Verkäufen und Lieferungen | Tyll',
      description: 'Lagerbestand aus Ihren Verkäufen, Lieferungen und erfasstem Abfall berechnet. Sehen Sie, was zuerst ausgeht, bevor ein Gast danach fragt.',
    },
  },
  forecasting: {
    en: {
      title: 'Restaurant Purchasing Forecast: Know What to Order | Tyll',
      description: 'See what to order and when, from forecast covers, events and recent use. Approve each order, or let automatic ordering run within your limits.',
    },
    de: {
      title: 'Bestellmenge berechnen für die Gastronomie | Tyll',
      description: 'Was und wann bestellen: aus erwarteten Gedecken, Veranstaltungen und Verbrauch, mit Kosten bis Monatsende. Nicht mehr zu viel oder zu wenig.',
    },
  },
  revenue: {
    en: {
      title: 'Hotel Revenue & Operating Contribution by Outlet | Tyll',
      description: 'Today, the last 7 and the last 30 days of revenue from your POS, each with estimated operating contribution. No spreadsheet needed.',
    },
    de: {
      title: 'Umsatz und Betriebsbeitrag je Outlet im Hotel | Tyll',
      description: 'Umsatz von heute, den letzten 7 und 30 Tagen aus Ihrer Kasse, jeweils mit geschätztem Betriebsbeitrag. Ohne Excel-Tabelle.',
    },
  },
  finance: {
    en: {
      title: 'Three Way Match for Restaurant Supplier Invoices | Tyll',
      description: "Every supplier invoice is checked against the order and what was delivered. Only the ones that don't match wait for review.",
    },
    de: {
      title: 'Lieferantenrechnungen prüfen in der Gastronomie | Tyll',
      description: 'Jede Lieferantenrechnung wird mit Bestellung und Wareneingang abgeglichen. Nur Rechnungen mit Abweichung landen zur Prüfung bei Ihnen.',
    },
  },
  pour: {
    en: {
      title: 'Bar Inventory Variance: Pours vs Glasses Sold | Tyll',
      description: 'See how many glasses each bottle really gave, by outlet and shift, and what the gap is worth. Then see who was on, day by day.',
    },
    de: {
      title: 'Schankverlust messen: Überschenken erkennen | Tyll',
      description: 'Wie viele Gläser jede Flasche wirklich ergab, nach Outlet und Schicht, mit dem Wert der Differenz. Danach: wer Tag für Tag im Dienst war.',
    },
  },
};
