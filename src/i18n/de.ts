import type { Dict } from './en';

const de: Dict = {
  langName: 'Deutsch',
  skip: 'Zum Inhalt springen',
  nav: {
    label: 'Hauptnavigation',
    how: 'So funktioniert’s',
    solutions: 'Lösungen',
    faq: 'FAQ',
    menu: 'Menü',
    close: 'Menü schließen',
    language: 'Sprache',
  },
  cta: {
    book: 'Gespräch buchen →',
    demo: 'Demo ansehen →',
    demoLong: 'Interaktive Demo ansehen →',
    tryDemo: 'Tyll selbst ausprobieren →',
  },
  hero: {
    title: 'Ein Hotel. Viele Systeme. Endlich verbunden.',
    body: [
      'Hotels arbeiten mit unterschiedlicher Software für Zimmer, Restaurants, Lager, Finanzen und Personal.',
      'Tyll bringt die wichtigen Informationen und Teams an einem Ort zusammen – damit Sie Probleme finden, handeln und den Überblick behalten.',
    ],
    pause: 'Hintergrundvideo anhalten',
    play: 'Hintergrundvideo abspielen',
    videoLabel: 'Eine ruhige, gedämpft beleuchtete Luxushotel-Rezeption mit warmen Pendelleuchten.',
  },
  problem: {
    title: 'Ein Hotel zu führen sollte nicht so kompliziert sein.',
    intro:
      'Jede Abteilung arbeitet mit eigenen Systemen. Informationen liegen verstreut, Mitarbeitende wechseln ständig zwischen Programmen, und wichtige Probleme bleiben unbemerkt.',
    without: 'Ohne Tyll',
    with: 'Mit Tyll',
    withoutItems: [
      'Zu viele getrennte Systeme',
      'Viel Zeit für die Suche nach Antworten',
      'Langsame Abstimmung zwischen Abteilungen',
      'Probleme, die schwer nachzuverfolgen sind',
    ],
    withItems: [
      'Wichtige Informationen an einem Ort',
      'Probleme klar erklärt',
      'Die richtigen Personen verbunden',
      'Maßnahmen und Ergebnisse leicht nachvollziehbar',
    ],
    note: 'Tyll arbeitet mit Ihren bestehenden Systemen zusammen und ersetzt sie nicht.',
    evidenceTitle: 'Was unabhängige Studien zeigen',
    evidenceNote: 'Branchenstudien mit Quellenangabe. Dies sind keine Ergebnisse von Tyll.',
    source: 'Quelle',
    evidence: [
      {
        figure: '7:1',
        text: 'In einer Studie mit 42 Hotels in 15 Ländern sparte das durchschnittliche Hotel 7 US-Dollar für jeden US-Dollar, der in die Reduzierung von Küchenabfällen investiert wurde.',
        context: 'Branchenstudie zu Programmen gegen Lebensmittelabfälle, kein Ergebnis von Tyll.',
        source: 'WRI und WRAP für Champions 12.3, 2018',
        url: 'https://champions123.org/the-business-case-for-reducing-food-loss-and-waste-hotels/',
      },
      {
        figure: '42 %',
        text: 'der befragten Restaurantbetreiber in den USA gaben an, dass ihre Restaurants 2025 nicht profitabel waren.',
        context: 'Daten aus US-Restaurants, kein Durchschnitt für Hotels oder den Nahen Osten.',
        source: 'National Restaurant Association, 2026',
        url: 'https://restaurant.org/education-and-resources/resource-library/report-sales-to-hit-$1-55t-in-2026-despite-challenging-business-environment/',
      },
    ],
  },
  how: {
    title: 'Vom Problem zur Lösung in vier einfachen Schritten.',
    intro: 'Tyll hilft Ihrem Team zu sehen, was passiert, zu verstehen, was Aufmerksamkeit braucht, und Dinge zu erledigen.',
    steps: [
      { name: 'Verbinden', text: 'Informationen aus Ihren bestehenden Hotelsystemen zusammenführen.' },
      { name: 'Finden', text: 'Fehlenden Bestand, ungewöhnliche Kosten und offene Probleme erkennen.' },
      { name: 'Handeln', text: 'Aufgaben und Anfragen an die richtigen Personen senden.' },
      { name: 'Messen', text: 'Sehen, was behoben wurde und was sich verändert hat.' },
    ],
    demoTitle: 'So sieht es im Produkt aus',
    demoIntro: 'Ein Beispiel aus der Tyll-Demo: acht Dosen Coca-Cola, die sich durch die Verkäufe nicht erklären lassen.',
    demoNote: 'Echte Ansichten aus der Tyll-Demo. Hotels, Personen und Zahlen sind fiktiv.',
    demoFrames: [
      {
        title: 'Eine Bestandsabweichung erscheint',
        text: 'Tyll meldet einen ungeklärten Coca-Cola-Verbrauch auf The Terrace.',
        alt: 'Tyll-Stock-Seite mit dem Hinweis auf ungeklärten Coca-Cola-Verbrauch auf The Terrace und einer Schaltfläche „Investigate“.',
      },
      {
        title: 'Die Managerin öffnet die Prüfung',
        text: 'Zählungen, Lieferungen und Verkäufe nebeneinander: 8 Dosen ungeklärt.',
        alt: 'Prüfungsseite „8 cans of Coca-Cola unexplained at The Terrace“ mit Ort und möglichem Betrag.',
      },
      {
        title: 'Tyll zeigt die Belege',
        text: 'Eine Cola wurde von einer Rechnung entfernt, nachdem sie an die Bar ging.',
        alt: 'Zeitleiste der Bestandsperiode, darunter „Coca-Cola removed after it was sent, TRC-1013-198, not on the bill“, und mögliche Erklärungen.',
      },
      {
        title: 'Die Managerin weist die Folgeaufgabe zu',
        text: 'Der F&B-Direktor übernimmt die Verantwortung, mit Frist.',
        alt: 'Bereich „Manage this case“: verantwortlich Marco Bellini, Frist Donnerstag, 15. Oktober, mit Bestätigung der Zuweisung.',
      },
      {
        title: 'Die richtige Person sieht es',
        text: 'Der Fall wartet in der eigenen Liste des F&B-Direktors.',
        alt: 'Money Back List, angemeldet als Marco Bellini, gefiltert auf seine Fälle, mit dem ihm zugewiesenen Coca-Cola-Fall.',
      },
    ],
    pause: 'Vorführung anhalten',
    play: 'Vorführung abspielen',
    step: 'Schritt',
  },
  solutions: {
    title: 'Ein Ort, an dem Ihr Hotel besser zusammenarbeitet.',
    intro: 'Vom Restaurantlager bis zum Gästeservice: Tyll hält Ihre Abteilungen verbunden.',
    examples: 'Beispiele',
    explore: 'In der Demo ansehen →',
    categories: [
      {
        name: 'Lager & Finanzen',
        text: 'Fehlenden Bestand finden, Abfall erfassen und ungewöhnliche Kosten verstehen.',
        examples: ['Bestandsprüfungen', 'Abfall und Bruch', 'Auffällige Bestellungen', 'Finanzieller Überblick'],
        path: '/stock?tab=where',
        alt: 'Tyll Stock „Where did it go?“: Artikel, deren Verbrauch über Verkäufe und Abfall hinausgeht, etwa 8 Dosen Coca-Cola.',
      },
      {
        name: 'Einkauf & Prognose',
        text: 'Wissen, was bestellt und vorbereitet werden muss und wer es freigibt.',
        examples: ['Zutatenprognosen', 'Bestellanforderungen', 'Einkaufsfreigaben', 'Vorbereitung in der Küche'],
        path: '/forecast?tab=buy',
        alt: 'Tyll Forecast „What to buy“: empfohlene Mengen für die nächsten drei Tage, markiert, wo der Bestand vor der Lieferung knapp wird.',
      },
      {
        name: 'Hotelbetrieb',
        text: 'Ihre Teams bei Veranstaltungen, Personal, Zimmern und Gästewünschen unterstützen.',
        examples: ['Veranstaltungen', 'Personalunterstützung', 'Housekeeping', 'Guest Connect', 'Gepäck- und Pagenaufgaben'],
        path: '/rooms?tab=readiness',
        alt: 'Tyll Room readiness: heutige Anreisen, welche Zimmer bereit sind und welche Gäste warten müssen.',
      },
    ],
    integrationsTitle: 'Behalten Sie die Systeme, die Sie bereits nutzen.',
    integrationsText:
      'Tyll ist darauf ausgelegt, mit Ihrer bestehenden Hotelsoftware zusammenzuarbeiten. Es bündelt die wichtigen Informationen, ohne dass Sie Ihre Kernsysteme ersetzen müssen.',
    integrationsDetail:
      'Informationen aus Kassensystem, PMS, Warenwirtschaft und Buchhaltung lassen sich über unterstützte Schnittstellen oder vereinbarte Datenexporte anbinden. Was möglich ist, hängt von Ihren Systemen ab – das klären wir gemeinsam.',
    securityTitle: 'Ihr Hotel. Ihre Informationen. Der richtige Zugriff.',
    securityText:
      'Tyll ist auf rollenbasierten Zugriff ausgelegt: Jede Person sieht, was ihre Rolle erfordert. Outlet-Manager sehen ihr eigenes Outlet, Mitarbeitende sehen ihre Aufgaben statt Umsätzen oder Kosten, und Management-Kennzahlen sind durch eine persönliche PIN geschützt.',
    securityLink: 'Fragen zu Ihren Daten →',
  },
  start: {
    title: 'Sehen Sie, was Tyll für Ihr Hotel tun könnte.',
    text: 'Entdecken Sie unsere interaktive Demo oder buchen Sie ein Gespräch mit uns – über Ihr Hotel und das, was Sie verbessern möchten.',
    steps: [
      { name: 'Gespräch buchen', text: 'Erzählen Sie uns von Ihrem Hotel.' },
      { name: 'Pilotprojekt besprechen', text: 'Wählen Sie, wo Tyll zuerst helfen könnte.' },
      { name: 'Ergebnisse messen', text: 'Sehen Sie, ob es wirklich einen Unterschied macht.' },
    ],
    note: 'Ein Vorschlag für den Einstieg. Umfang und Ergebnisse werden mit Ihnen vereinbart, nie vorausgesetzt.',
  },
  footer: {
    tagline: 'Ein Hotel. Viele Systeme. Endlich verbunden.',
    explore: 'Entdecken',
    company: 'Unternehmen',
    contact: 'Kontakt',
    legal: 'Impressum',
    privacy: 'Datenschutz',
    cookies: 'Cookie-Einstellungen',
    demoNote: 'Die interaktive Demo verwendet fiktive Daten.',
    rights: 'Tyll',
  },
  meta: {
    homeTitle: 'Tyll – Ein Hotel. Viele Systeme. Endlich verbunden.',
    homeDescription:
      'Tyll bündelt Informationen aus den bestehenden Systemen Ihres Hotels, zeigt Probleme auf, verbindet Abteilungen und macht sichtbar, was erledigt wurde.',
  },
};

export default de;
