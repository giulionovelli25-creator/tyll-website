// Search titles and descriptions for the six solution pages. Only English and German have entries; any other
// language falls back to the page's default ("<name> | Tyll" and the headline with the intro) in SolutionPage.astro.
import type { Locale, SolutionKey } from '../i18n';

type Meta = { title: string; description: string };

export const solutionSeo: Record<SolutionKey, Partial<Record<Locale, Meta>>> = {
  waste: {
    en: {
      title: 'Food Waste Tracking for Restaurants & Hotels | Tyll',
      description: "Log what was wasted or broken in two taps, with what it cost. See today's waste log and the month's total without a spreadsheet. Try the demo.",
    },
    de: {
      title: 'Lebensmittelabfall erfassen in der Gastronomie | Tyll',
      description: 'Abfall und Bruch mit zwei Tipps erfassen, inklusive Kosten. Tagesprotokoll und Monatssumme ohne Excel-Liste. Testen Sie die Demo.',
    },
  },
  stock: {
    en: {
      title: 'Restaurant Stock Count & Stocktake App | Tyll',
      description: 'Count stock on your phone and know what is left between stocktakes, from your last count, deliveries and sales. See what runs out next. Try the demo.',
    },
    de: {
      title: 'Bestand & Inventur per Handy für die Gastronomie | Tyll',
      description: 'Inventur per Handy und wissen, was zwischen zwei Zählungen noch da ist: aus letzter Zählung, Lieferungen und Verkäufen. Testen Sie die Demo.',
    },
  },
  forecasting: {
    en: {
      title: 'Restaurant Purchasing Forecast: Know What to Order | Tyll',
      description: 'See what to order and when, from forecast covers, events and recent use, with your cost to month end. Stop over-ordering and running short. Try the demo.',
    },
    de: {
      title: 'Bestellmenge berechnen für die Gastronomie | Tyll',
      description: 'Was und wann bestellen: aus erwarteten Gedecken, Veranstaltungen und Verbrauch, mit Kosten bis Monatsende. Nicht mehr zu viel oder zu wenig.',
    },
  },
  revenue: {
    en: {
      title: 'Restaurant End of Day Revenue & Profit Report | Tyll',
      description: 'Today, the last 7 and the last 30 days of revenue from your POS, each with estimated profit. No spreadsheet needed. Try the demo.',
    },
    de: {
      title: 'Tagesumsatz und Gewinn für Gastronomie & Hotels | Tyll',
      description: 'Umsatz von heute, den letzten 7 und 30 Tagen aus Ihrer Kasse, jeweils mit geschätztem Gewinn. Ohne Excel-Tabelle. Testen Sie die Demo.',
    },
  },
  finance: {
    en: {
      title: 'Three Way Match for Restaurant Supplier Invoices | Tyll',
      description: "Every supplier invoice is checked against the order and what was delivered. Only the ones that don't match wait for review. Try the demo.",
    },
    de: {
      title: 'Lieferantenrechnungen prüfen in der Gastronomie | Tyll',
      description: 'Jede Lieferantenrechnung wird mit Bestellung und Wareneingang abgeglichen. Nur Rechnungen mit Abweichung landen zur Prüfung bei Ihnen.',
    },
  },
  pour: {
    en: {
      title: 'Bar Inventory Variance: Pours vs Glasses Sold | Tyll',
      description: 'See how many glasses each bottle really gave, by outlet and shift, and what the gap is worth. Then see who was on, day by day. Try the demo.',
    },
    de: {
      title: 'Schankverlust messen: Überschenken erkennen | Tyll',
      description: 'Wie viele Gläser jede Flasche wirklich ergab, nach Outlet und Schicht, mit dem Wert der Differenz. Danach: wer Tag für Tag im Dienst war.',
    },
  },
};
