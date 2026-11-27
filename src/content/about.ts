// The About page (rebuilt 27 Nov 2026 to the owner's brief): hero, the story, the team, the milestones, where we are,
// how we work, and a dark close. Everything here is the owner's own account of the company: the founder's night shift
// at the Mandarin Oriental Savoy, Zürich; the four founders, their roles and their LinkedIn; the pilots in Berlin and
// Zürich; the talks with a hotel group, unnamed; Singapore and Dubai; all four now study at CODE University, Berlin.
// The founder studied two years at EHL and moved to CODE University without graduating there (the owner, 27 Nov 2026),
// so nothing may call him an EHL graduate or alumnus. No customers are named, nothing is said to be "live in hotels",
// and the page carries no food waste statistics (those are on the Sustainability page). Copy rules: no dashes as
// punctuation; placeholders in square brackets stay visible until the owner gives the fact.
import type { Locale } from '../i18n/routes';

export type PersonId = 'giulio' | 'fynn' | 'pawel' | 'besher';
export type PlaceId = 'zurich' | 'berlin' | 'singapore' | 'dubai';
type Icon = 'eye' | 'plug' | 'sliders-horizontal' | 'shield-check';

export type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  hero: { label: string; title: string; text: string; team: string; creds: { label: string; value: string }[] };
  /** The story: the minutes are written as three parts, so "to" can be set apart */
  story: { label: string; title: string; text: string; turn: string; from: string; to: string; until: string; caption: string };
  team: {
    label: string;
    title: string;
    text: string;
    people: { id: PersonId; name: string; role: string; bio: string }[];
    /** The label of each photo's link to that person's LinkedIn: {name} is replaced */
    linkedin: string;
  };
  /** The milestones: `done` steps have a filled diamond, the last an outlined one */
  milestones: { title: string; started: string; steps: { label: string; value: string; done: boolean }[] };
  places: { title: string; cards: { id: PlaceId; city: string; status: string; line: string; next: boolean; alt: string }[] };
  ways: { title: string; items: { icon: Icon; title: string; text: string }[]; security: string };
  close: { title: string; investors: string; investorsLink: string };
};

const names = { giulio: 'Giulio Novelli', fynn: 'Fynn Kopitz', pawel: 'Pawel Gruca', besher: 'Besher Asfari' } as const;
/** Each founder's own LinkedIn (27 Nov 2026, the owner) */
export const linkedin: Record<PersonId, string> = {
  giulio: 'https://www.linkedin.com/in/giulio-novelli-5bb658261/',
  fynn: 'https://www.linkedin.com/in/fynnkopitz/',
  pawel: 'https://www.linkedin.com/in/pawel-gruca-544674324/',
  besher: 'https://www.linkedin.com/in/besher-asfari-40920a398/',
};

export const about: Record<Locale, AboutCopy> = {
  en: {
    metaTitle: 'About Tyll: Built From a Hotel Night Shift | Tyll',
    metaDescription: 'Tyll was built by hoteliers, from six months on a Zürich hotel’s night shift. Meet the team, see our pilots and markets, and learn how we work with hotels.',
    hero: {
      label: 'About Tyll',
      title: 'Built by hoteliers, from the night shift up.',
      text: 'Tyll began with six months of closing a Zürich hotel’s night by hand. Now it checks every line, every night, so nobody has to.',
      team: 'Meet the team',
      creds: [
        { label: 'Studied at', value: 'EHL, TU Delft and CODE University' },
        { label: 'Experience at', value: 'Mandarin Oriental Savoy, Zürich' },
        { label: 'On the ground in', value: 'Zürich and Singapore' },
      ],
    },
    story: {
      label: 'Where Tyll comes from',
      title: 'It started on the night shift.',
      text: 'Six months at the Mandarin Oriental Savoy, Zürich. What leaked never showed in a total.',
      turn: 'That became Tyll.',
      from: '45',
      to: 'to',
      until: '60',
      caption: 'minutes every night, comparing totals by hand.',
    },
    team: {
      label: 'The team',
      title: 'Hotel people who build software.',
      text: 'We have run the operations Tyll fixes: nights at the Mandarin Oriental, stock for consumer brands, a café in Berlin and software for stealth startups. Shaped by EHL and TU Delft, and now all four at CODE University, Berlin.',
      people: [
        { id: 'giulio', name: names.giulio, role: 'Founder & CEO', bio: 'Closed the night at the Mandarin Oriental Savoy, Zürich, where Tyll was born. Two years at EHL, a world-leading hospitality school, then CODE University.' },
        { id: 'fynn', name: names.fynn, role: 'CGO', bio: 'Entrepreneurial roots in Bangkok’s startup scene. Ran inventory and stock for direct-to-consumer brands.' },
        { id: 'pawel', name: names.pawel, role: 'Co-founder & CTO', bio: 'Software engineer and TU Delft alumnus. Shipped working software for stealth startups in electrical engineering.' },
        { id: 'besher', name: names.besher, role: 'CSO', bio: 'Leads sales and hotel partnerships at Tyll, from the first call to the pilot. Also owns a café in central Berlin.' },
      ],
      linkedin: '{name} on LinkedIn',
    },
    milestones: {
      title: 'From one hotel to the next market.',
      started: 'Started September 2026',
      steps: [
        { label: 'The first build', value: 'Hotel hackathon', done: true },
        { label: 'Pilots', value: 'Berlin and Zürich', done: true },
        { label: 'In talks', value: 'A major international hotel group', done: true },
        { label: 'Next', value: 'Middle East and Southeast Asia', done: false },
      ],
    },
    places: {
      title: 'Where we are.',
      cards: [
        { id: 'zurich', city: 'Zürich', status: 'Started here', line: 'Where the night shift happened. Pilot running.', next: false, alt: 'The old town of Zürich along the Limmat, with the tower of St. Peter’s church.' },
        { id: 'berlin', city: 'Berlin', status: 'Built here', line: 'Where the product is built. Pilot running.', next: false, alt: 'The Spree in Berlin, with a bridge and the TV tower behind it.' },
        { id: 'singapore', city: 'Singapore', status: 'On the ground', line: 'Our team for Southeast Asia.', next: false, alt: 'The Singapore River, with old shophouses in front of the city’s towers.' },
        { id: 'dubai', city: 'Dubai', status: 'Next', line: 'Our next market in the Middle East.', next: true, alt: 'The Dubai skyline with the Burj Khalifa at sunset.' },
      ],
    },
    ways: {
      title: 'How we work.',
      items: [
        { icon: 'eye', title: 'Read only', text: 'Never changes, deletes or posts anything in your systems.' },
        { icon: 'plug', title: 'Nothing to install', text: 'Read only access or a sales export is enough.' },
        { icon: 'sliders-horizontal', title: 'You decide', text: 'Orders wait for your approval, or go out within your limits.' },
        { icon: 'shield-check', title: 'No result, no fee', text: 'Free 30 day pilot on your own data. No savings found, nothing to pay.' },
      ],
      security: 'How we keep your data safe →',
    },
    close: { title: 'See it on your hotel.', investors: 'Investing in hospitality software?', investorsLink: 'Investor enquiries →' },
  },
  de: {
    metaTitle: 'Über Tyll: Aus der Nachtschicht eines Hotels | Tyll',
    metaDescription: 'Tyll wurde von Hoteliers gebaut, aus sechs Monaten Nachtschicht in einem Zürcher Hotel. Lernen Sie das Team kennen, unsere Piloten, Märkte und Arbeitsweise.',
    hero: {
      label: 'Über Tyll',
      title: 'Von Hoteliers gebaut, aus der Nachtschicht heraus.',
      text: 'Tyll begann mit sechs Monaten, in denen die Nacht eines Zürcher Hotels von Hand abgeschlossen wurde. Heute prüft es jede Zeile, jede Nacht, damit es niemand mehr tun muss.',
      team: 'Das Team kennenlernen',
      creds: [
        { label: 'Studiert an', value: 'EHL, TU Delft und CODE University' },
        { label: 'Erfahrung bei', value: 'Mandarin Oriental Savoy, Zürich' },
        { label: 'Vor Ort in', value: 'Zürich und Singapur' },
      ],
    },
    story: {
      label: 'Woher Tyll kommt',
      title: 'Es begann in der Nachtschicht.',
      text: 'Sechs Monate im Mandarin Oriental Savoy, Zürich. Was verloren ging, zeigte sich nie in einer Summe.',
      turn: 'Daraus wurde Tyll.',
      from: '45',
      to: 'bis',
      until: '60',
      caption: 'Minuten jede Nacht, um Summen von Hand zu vergleichen.',
    },
    team: {
      label: 'Das Team',
      title: 'Hotelleute, die Software bauen.',
      text: 'Wir kennen den Alltag, den Tyll in Ordnung bringt, aus eigener Arbeit: Nächte im Mandarin Oriental, Bestände für Konsumgütermarken, ein Café in Berlin und Software für Stealth-Startups. Geprägt von EHL und TU Delft, heute alle vier an der CODE University, Berlin.',
      people: [
        { id: 'giulio', name: names.giulio, role: 'Gründer & CEO', bio: 'Nachtabschluss im Mandarin Oriental Savoy, Zürich, wo Tyll entstand. Zwei Jahre an der EHL, einer weltweit führenden Hotelhochschule, dann CODE University.' },
        { id: 'fynn', name: names.fynn, role: 'CGO', bio: 'Unternehmerische Wurzeln in der Startup-Szene von Bangkok. Hat Lager und Bestände für Direct-to-Consumer-Marken verantwortet.' },
        { id: 'pawel', name: names.pawel, role: 'Mitgründer & CTO', bio: 'Softwareingenieur und Absolvent der TU Delft. Hat Software für Stealth-Startups in der Elektrotechnik gebaut und ausgeliefert.' },
        { id: 'besher', name: names.besher, role: 'CSO', bio: 'Verantwortet bei Tyll Vertrieb und Hotelpartnerschaften, vom ersten Gespräch bis zum Pilot. Besitzt außerdem ein Café im Zentrum Berlins.' },
      ],
      linkedin: '{name} auf LinkedIn',
    },
    milestones: {
      title: 'Von einem Hotel zum nächsten Markt.',
      started: 'Gestartet im September 2026',
      steps: [
        { label: 'Der erste Prototyp', value: 'Hackathon für Hotels', done: true },
        { label: 'Piloten', value: 'Berlin und Zürich', done: true },
        { label: 'Im Gespräch', value: 'Eine große internationale Hotelgruppe', done: true },
        { label: 'Als Nächstes', value: 'Naher Osten und Südostasien', done: false },
      ],
    },
    places: {
      title: 'Wo wir sind.',
      cards: [
        { id: 'zurich', city: 'Zürich', status: 'Hier gestartet', line: 'Wo die Nachtschicht war. Pilot läuft.', next: false, alt: 'Die Altstadt von Zürich an der Limmat, mit dem Turm von St. Peter.' },
        { id: 'berlin', city: 'Berlin', status: 'Hier gebaut', line: 'Wo das Produkt entsteht. Pilot läuft.', next: false, alt: 'Die Spree in Berlin, mit einer Brücke und dem Fernsehturm dahinter.' },
        { id: 'singapore', city: 'Singapur', status: 'Vor Ort', line: 'Unser Team für Südostasien.', next: false, alt: 'Der Singapore River mit alten Ladenhäusern vor den Hochhäusern der Stadt.' },
        { id: 'dubai', city: 'Dubai', status: 'Als Nächstes', line: 'Unser nächster Markt im Nahen Osten.', next: true, alt: 'Die Skyline von Dubai mit dem Burj Khalifa bei Sonnenuntergang.' },
      ],
    },
    ways: {
      title: 'So arbeiten wir.',
      items: [
        { icon: 'eye', title: 'Nur lesend', text: 'Ändert, löscht oder bucht nie etwas in Ihren Systemen.' },
        { icon: 'plug', title: 'Nichts zu installieren', text: 'Ein Lesezugriff oder ein Umsatzexport genügt.' },
        { icon: 'sliders-horizontal', title: 'Sie entscheiden', text: 'Bestellungen warten auf Ihre Freigabe oder gehen innerhalb Ihrer Grenzen raus.' },
        { icon: 'shield-check', title: 'Kein Ergebnis, keine Gebühr', text: 'Kostenloser Pilot über 30 Tage mit Ihren eigenen Daten. Keine Einsparung, nichts zu zahlen.' },
      ],
      security: 'So schützen wir Ihre Daten →',
    },
    close: { title: 'Sehen Sie es in Ihrem Hotel.', investors: 'Sie investieren in Software für die Hotellerie?', investorsLink: 'Anfragen von Investoren →' },
  },
  it: {
    metaTitle: 'Chi siamo: Tyll nasce da un turno di notte in hotel | Tyll',
    metaDescription: 'Tyll è stato costruito da albergatori, da sei mesi di turni di notte in un hotel di Zurigo. Conosci il team, i nostri piloti, i mercati e il nostro metodo.',
    hero: {
      label: 'Chi siamo',
      title: 'Costruito da albergatori, a partire dal turno di notte.',
      text: 'Tyll è nato da sei mesi passati a chiudere a mano la notte di un hotel di Zurigo. Oggi controlla ogni riga, ogni notte, così nessuno deve più farlo.',
      team: 'Conosci il team',
      creds: [
        { label: 'Formazione', value: 'EHL, TU Delft e CODE University' },
        { label: 'Esperienza al', value: 'Mandarin Oriental Savoy, Zurigo' },
        { label: 'Presenti a', value: 'Zurigo e Singapore' },
      ],
    },
    story: {
      label: 'Da dove viene Tyll',
      title: 'È iniziato con il turno di notte.',
      text: 'Sei mesi al Mandarin Oriental Savoy di Zurigo. Ciò che si perdeva non compariva mai in un totale.',
      turn: 'Così è nato Tyll.',
      from: '45',
      to: 'a',
      until: '60',
      caption: 'minuti ogni notte, a confrontare i totali a mano.',
    },
    team: {
      label: 'Il team',
      title: 'Persone d’albergo che costruiscono software.',
      text: 'Abbiamo gestito in prima persona ciò che Tyll sistema: notti al Mandarin Oriental, scorte per marchi di consumo, un caffè a Berlino e software per startup in stealth. Formati tra EHL e TU Delft, oggi tutti e quattro alla CODE University di Berlino.',
      people: [
        { id: 'giulio', name: names.giulio, role: 'Fondatore & CEO', bio: 'Ha chiuso le notti al Mandarin Oriental Savoy di Zurigo, dove è nato Tyll. Due anni all’EHL, scuola di ospitalità di livello mondiale, poi la CODE University.' },
        { id: 'fynn', name: names.fynn, role: 'CGO', bio: 'Radici imprenditoriali nella scena startup di Bangkok. Ha guidato inventario e scorte per marchi direct-to-consumer.' },
        { id: 'pawel', name: names.pawel, role: 'Cofondatore & CTO', bio: 'Ingegnere del software e alumnus della TU Delft. Ha rilasciato software funzionante per startup in stealth nell’ingegneria elettrica.' },
        { id: 'besher', name: names.besher, role: 'CSO', bio: 'Guida vendite e partnership con gli hotel per Tyll, dalla prima chiamata al pilota. Possiede anche un caffè nel centro di Berlino.' },
      ],
      linkedin: '{name} su LinkedIn',
    },
    milestones: {
      title: 'Da un hotel al prossimo mercato.',
      started: 'Iniziato a settembre 2026',
      steps: [
        { label: 'Il primo prototipo', value: 'Hackathon per hotel', done: true },
        { label: 'Progetti pilota', value: 'Berlino e Zurigo', done: true },
        { label: 'In trattativa', value: 'Un grande gruppo alberghiero internazionale', done: true },
        { label: 'Prossimo passo', value: 'Medio Oriente e Asia sudorientale', done: false },
      ],
    },
    places: {
      title: 'Dove siamo.',
      cards: [
        { id: 'zurich', city: 'Zurigo', status: 'Qui è iniziato', line: 'Dove c’era il turno di notte. Pilota in corso.', next: false, alt: 'La città vecchia di Zurigo lungo la Limmat, con il campanile di San Pietro.' },
        { id: 'berlin', city: 'Berlino', status: 'Qui lo costruiamo', line: 'Dove nasce il prodotto. Pilota in corso.', next: false, alt: 'La Sprea a Berlino, con un ponte e la torre della televisione sullo sfondo.' },
        { id: 'singapore', city: 'Singapore', status: 'Sul posto', line: 'Il nostro team per l’Asia sudorientale.', next: false, alt: 'Il Singapore River, con le vecchie shophouse davanti ai grattacieli della città.' },
        { id: 'dubai', city: 'Dubai', status: 'Prossimo', line: 'Il nostro prossimo mercato in Medio Oriente.', next: true, alt: 'Lo skyline di Dubai con il Burj Khalifa al tramonto.' },
      ],
    },
    ways: {
      title: 'Come lavoriamo.',
      items: [
        { icon: 'eye', title: 'Solo lettura', text: 'Non modifica, cancella né registra nulla nei tuoi sistemi.' },
        { icon: 'plug', title: 'Niente da installare', text: 'Basta un accesso in sola lettura o un export delle vendite.' },
        { icon: 'sliders-horizontal', title: 'Decidi tu', text: 'Gli ordini aspettano la tua approvazione o partono entro i tuoi limiti.' },
        { icon: 'shield-check', title: 'Nessun risultato, nessun costo', text: 'Pilota gratuito di 30 giorni sui tuoi dati. Nessun risparmio trovato, niente da pagare.' },
      ],
      security: 'Come proteggiamo i tuoi dati →',
    },
    close: { title: 'Guardalo sul tuo hotel.', investors: 'Investi in software per l’ospitalità?', investorsLink: 'Richieste degli investitori →' },
  },
  ar: {
    metaTitle: 'عن Tyll: وُلد من مناوبة ليلية في فندق | Tyll',
    metaDescription: 'بنى Tyll أهلُ فنادق، انطلاقًا من ستة أشهر من المناوبة الليلية في فندق في زيورخ. تعرّف على الفريق وتجاربنا وأسواقنا وطريقة عملنا مع الفنادق خطوة بخطوة.',
    hero: {
      label: 'عن Tyll',
      title: 'بناه أهل الفنادق، انطلاقًا من المناوبة الليلية.',
      text: 'بدأ Tyll بستة أشهر من إغلاق ليلة فندق في زيورخ يدويًا. اليوم يدقق في كل بند، كل ليلة، كي لا يضطر أحد إلى ذلك.',
      team: 'تعرّف على الفريق',
      creds: [
        { label: 'الدراسة في', value: 'EHL وTU Delft وCODE University' },
        { label: 'خبرة في', value: 'ماندارين أورينتال سافوي، زيورخ' },
        { label: 'على الأرض في', value: 'زيورخ وسنغافورة' },
      ],
    },
    story: {
      label: 'من أين جاء Tyll',
      title: 'بدأ كل شيء في المناوبة الليلية.',
      text: 'ستة أشهر في ماندارين أورينتال سافوي، زيورخ. ما كان يتسرب لم يظهر قط في أي مجموع.',
      turn: 'ومن هنا وُلد Tyll.',
      from: '45',
      to: 'إلى',
      until: '60',
      caption: 'دقيقة كل ليلة، لمقارنة المجاميع يدويًا.',
    },
    team: {
      label: 'الفريق',
      title: 'أهل فنادق يبنون البرمجيات.',
      text: 'أدرنا بأنفسنا ما يصلحه Tyll: ليالٍ في ماندارين أورينتال، ومخزون لعلامات استهلاكية، ومقهى في برلين، وبرمجيات لشركات ناشئة غير معلنة. تكوّنّا بين EHL وTU Delft، ونحن الأربعة اليوم في CODE University في برلين.',
      people: [
        { id: 'giulio', name: names.giulio, role: 'المؤسس وCEO', bio: 'أغلق الليالي في ماندارين أورينتال سافوي، زيورخ، حيث وُلد Tyll. عامان في EHL، إحدى أبرز مدارس الضيافة عالميًا، ثم CODE University.' },
        { id: 'fynn', name: names.fynn, role: 'CGO', bio: 'جذور ريادية في مشهد الشركات الناشئة في بانكوك. أدار المخزون والبضائع لعلامات تجارية تبيع مباشرة للمستهلك.' },
        { id: 'pawel', name: names.pawel, role: 'شريك مؤسس وCTO', bio: 'مهندس برمجيات وخريج TU Delft. أطلق برمجيات عاملة لشركات ناشئة غير معلنة في مجال الهندسة الكهربائية.' },
        { id: 'besher', name: names.besher, role: 'CSO', bio: 'يقود مبيعات Tyll وشراكاته مع الفنادق، من أول مكالمة حتى التجربة. ويملك أيضًا مقهى في وسط برلين.' },
      ],
      linkedin: '{name} على LinkedIn',
    },
    milestones: {
      title: 'من فندق واحد إلى السوق التالية.',
      started: 'بدأنا في سبتمبر 2026',
      steps: [
        { label: 'النسخة الأولى', value: 'هاكاثون للفنادق', done: true },
        { label: 'التجارب', value: 'برلين وزيورخ', done: true },
        { label: 'في محادثات', value: 'مع مجموعة فندقية دولية كبرى', done: true },
        { label: 'التالي', value: 'الشرق الأوسط وجنوب شرق آسيا', done: false },
      ],
    },
    places: {
      title: 'أين نحن.',
      cards: [
        { id: 'zurich', city: 'زيورخ', status: 'هنا بدأنا', line: 'حيث كانت المناوبة الليلية. التجربة جارية.', next: false, alt: 'البلدة القديمة في زيورخ على نهر ليمات، مع برج كنيسة القديس بطرس.' },
        { id: 'berlin', city: 'برلين', status: 'هنا نبني', line: 'حيث يُبنى المنتج. التجربة جارية.', next: false, alt: 'نهر شبريه في برلين، مع جسر وبرج التلفزيون خلفه.' },
        { id: 'singapore', city: 'سنغافورة', status: 'على الأرض', line: 'فريقنا لجنوب شرق آسيا.', next: false, alt: 'نهر سنغافورة، مع البيوت التجارية القديمة أمام أبراج المدينة.' },
        { id: 'dubai', city: 'دبي', status: 'التالي', line: 'سوقنا التالية في الشرق الأوسط.', next: true, alt: 'أفق دبي مع برج خليفة عند الغروب.' },
      ],
    },
    ways: {
      title: 'كيف نعمل.',
      items: [
        { icon: 'eye', title: 'قراءة فقط', text: 'لا يغيّر ولا يحذف ولا ينشر أي شيء في أنظمتك.' },
        { icon: 'plug', title: 'لا شيء لتثبيته', text: 'يكفي وصول للقراءة فقط أو تصدير للمبيعات.' },
        { icon: 'sliders-horizontal', title: 'القرار لك', text: 'تنتظر الطلبات موافقتك، أو تُرسل ضمن الحدود التي تضعها.' },
        { icon: 'shield-check', title: 'لا نتيجة، لا رسوم', text: 'تجربة مجانية لمدة 30 يومًا على بياناتك. إن لم نجد توفيرًا، فلا تدفع شيئًا.' },
      ],
      security: 'كيف نحمي بياناتك ←',
    },
    close: { title: 'شاهده في فندقك.', investors: 'تستثمر في برمجيات الضيافة؟', investorsLink: 'استفسارات المستثمرين ←' },
  },
};
