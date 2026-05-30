import type { Lang } from "./lang";

type Entry = { en: string; af?: string; zu?: string; xh?: string };

export const T = {
  // Home
  "home.hero.title":         { en: "Health information you can trust.", af: "Gesondheidsinligting wat jy kan vertrou.", xh: "Ulwazi lwezempilo onokuluthemba." },
  "home.hero.disclaimer":    {
    en: "MyMedic provides general health information only and does not offer medical advice, diagnosis, or treatment, and it should not be used as a replacement for consultation with a qualified healthcare professional or doctor.",
    af: "MyMedic verskaf slegs algemene gesondheidsinligting en bied nie mediese advies, diagnose of behandeling nie, en dit moet nie gebruik word as 'n vervanging vir konsultasie met 'n gekwalifiseerde gesondheidswerker of dokter nie.",
    xh: "IMyMedic ibonelela ngolwazi lwezempilo jikelele kuphela kwaye ayiniki eluleko lwezonyango, ukuqondiswa okanye unyango, kwaye ayimele isetyenziswe endaweni yokubonisana nengcali yezempilo eqeqeshiweyo okanye ugqirha.",
  },
  "home.browse.title":       { en: "Browse by category", af: "Blaai per kategorie", xh: "Khangela ngeendidi" },
  "home.browse.subtitle":    { en: "Tap any category to see the conditions inside.", af: "Tik enige kategorie om die toestande binne te sien.", xh: "Cofa naluphi na udidi ukuze ubone iimeko ezingaphakathi." },
  "home.footer.line1":       { en: "© MyMedic ·", af: "© MyMedic ·", xh: "© MyMedic ·" },
  "home.footer.developedBy": { en: "developed by", af: "ontwikkel deur", xh: "yakhiwe ngu" },
  "home.footer.line2":       { en: "Medical information for South Africa", af: "Mediese inligting vir Suid-Afrika", xh: "Ulwazi lwezonyango lwaseMzantsi Afrika" },

  // Cards / counts
  "conditions.singular":     { en: "condition", af: "toestand", xh: "imeko" },
  "conditions.plural":       { en: "conditions", af: "toestande", xh: "iimeko" },
  "contentComingSoon":       { en: "Content coming soon", af: "Inhoud kom binnekort", xh: "Umxholo uyeza kungekudala" },

  // Breadcrumbs
  "nav.allCategories":       { en: "All categories", af: "Alle kategorieë", xh: "Zonke iindidi" },

  // Disease meta
  "meta.medicallyReviewed":  { en: "Review pending", af: "Hersiening hangende", xh: "Uphononongo lusalindile" },
  "meta.minRead":            { en: "min read", af: "min lees", xh: "imiz yokufunda" },

  // Section kickers
  "section.urgent":          { en: "Urgent — call now", af: "Dringend — bel nou", xh: "Kaxakeka — tsalela umnxeba ngoku" },
  "section.whatIsIt":        { en: "What is it", af: "Wat is dit", xh: "Yintoni le?" },
  "section.knowThis":        { en: "Know this", af: "Weet dit", xh: "Yazi oku" },
  "section.signs":           { en: "Signs to look for", af: "Tekens om op te let", xh: "Iimpawu ekufuneka uzijongile" },
  "section.spreads":         { en: "How it spreads", af: "Hoe dit versprei", xh: "Indlela esasazeka ngayo" },
  "section.myths":           { en: "Myths and facts", af: "Mites en feite", xh: "Iintsomi neenyani" },
  "section.prevention":      { en: "Prevention", af: "Voorkoming", xh: "Uthintelo" },
  "section.actionSteps":     { en: "What to do", af: "Wat om te doen", xh: "Into omawuyenze" },
  "section.getHelp":         { en: "Get help", af: "Kry hulp", xh: "Fumana uncedo" },
  "section.learnMore":       { en: "Read more", af: "Lees meer" },

  // Spreads / Myths labels
  "spreads.does":            { en: "Does spread by", af: "Versprei deur", xh: "Isasazeka ngo" },
  "spreads.doesNot":         { en: "Does NOT spread by", af: "Versprei NIE deur", xh: "AYIsasazeki ngo" },
  "myth.myth":               { en: "Myth", af: "Mite", xh: "Intsomi" },
  "myth.fact":               { en: "Fact", af: "Feit", xh: "Inyani" },

  // Disclaimer
  "disclaimer.reviewed":     { en: "Review pending", af: "Hersiening hangende", xh: "Uphononongo lusalindile" },
  "disclaimer.reviewedBy":   { en: "Review status", af: "Hersieningstatus", xh: "Imeko yophononongo" },
  "disclaimer.lastReview":   { en: "Last review", af: "Laaste hersiening", xh: "Uphononongo lokugqibela" },
  "disclaimer.nextReview":   { en: "Next review due", af: "Volgende hersiening", xh: "Uphononongo olulandelayo" },
  "disclaimer.sources":      { en: "Sources", af: "Bronne", xh: "Imithombo" },
  "disclaimer.findMoreInfo": { en: "Find more information here", af: "Kry meer inligting hier", xh: "Fumana ulwazi olungakumbi apha" },
  "disclaimer.important":    { en: "Important", af: "Belangrik", xh: "Kubalulekile" },
  "disclaimer.body":         { en: "The information on this page is for general education only. It is not medical advice and does not replace seeing a doctor or pharmacist. If you have specific questions about your health, please contact a healthcare professional or call one of the helplines above.",
                               af: "Die inligting op hierdie bladsy is slegs vir algemene opvoeding. Dit is nie mediese advies nie en vervang nie 'n besoek aan 'n dokter of apteker nie. Vir spesifieke vrae oor jou gesondheid, kontak asseblief 'n gesondheidsorgwerker of skakel een van die hulplyne hierbo." },

  // Chatbot
  "chatbot.title":           { en: "Ask MyMedic", af: "Vra MyMedic", xh: "Buza iMyMedic" },
  "chatbot.subtitle":        { en: "Medical & pharmacy questions · EN · AF · ZU · XH", af: "Mediese & apteekvrae · EN · AF · ZU · XH", xh: "Imibuzo yezonyango neye-fama · EN · AF · ZU · XH" },
  "chatbot.placeholder":     { en: "Type or speak your question...", af: "Tik of sê jou vraag...", xh: "Bhala okanye uthethe umbuzo wakho..." },
  "chatbot.prompt1":         { en: "I have a headache that won't go away",                                    af: "Ek het 'n hoofpyn wat nie wegtrek nie" },
  "chatbot.prompt2":         { en: "Is this rash dangerous?",                                                 af: "Is hierdie uitslag gevaarlik?" },
  "chatbot.prompt3":         { en: "What does my BP reading mean?",                                           af: "Wat beteken my bloeddruklesing?" },
  "chatbot.disclaimer":      { en: "MyMedic gives general information only and is not a substitute for medical advice.",
                               af: "MyMedic gee net algemene inligting en is nie 'n plaasvervanger vir mediese advies nie." },

  "chatbot.error.send":      { en: "Failed to send message. Please try again.", af: "Kon nie die boodskap stuur nie. Probeer asseblief weer.", xh: "Kusilele ukuthumela umyalezo. Zama kwakhona." },
  "chatbot.error.noAudio":   { en: "No audio recorded", af: "Geen klank opgeneem nie", xh: "Akukho sandi sibhaliweyo" },
  "chatbot.error.tooShort":  { en: "Recording too short", af: "Opname te kort", xh: "Ukurekhoda kufutshane kakhulu" },
  "chatbot.error.transcribe":{ en: "Failed to transcribe", af: "Kon nie transkribeer nie", xh: "Kusilele ukukhuphela amazwi abe sisicatshulwa" },
  "chatbot.error.micDenied": { en: "Microphone access denied", af: "Mikrofoontoegang geweier", xh: "Ufikelelo lwemakrofoni lwenqatshiwe" },
  "chatbot.error.recordFail":{ en: "Could not start recording", af: "Kon nie opname begin nie", xh: "Ayikwazanga ukuqalisa ukurekhoda" },
  "chatbot.aria.stopRec":    { en: "Stop recording", af: "Stop opname", xh: "Misa ukurekhoda" },
  "chatbot.aria.voice":      { en: "Voice input", af: "Steminvoer", xh: "Ungeniso lwelizwi" },
  "chatbot.aria.send":       { en: "Send", af: "Stuur", xh: "Thumela" },
  "chatbot.aria.clearInput": { en: "Clear text", af: "Maak teks skoon", xh: "Cima isicatshulwa" },
  "chatbot.clearChat":       { en: "Clear chat", af: "Maak klets skoon", xh: "Cima incoko" },
  "chatbot.recording":       { en: "Recording... tap stop when done", af: "Besig om op te neem... tik stop wanneer jy klaar is", xh: "Kuyarekhodwa... cofa u-misa xa ugqibile" },
  "chatbot.emergencyTitle":  { en: "Emergency?", af: "Noodgeval?", xh: "Ungxamiseko?" },
  "chatbot.emergencyPrefix": { en: "Call", af: "Bel", xh: "Tsalela umnxeba ku-" },
  "chatbot.emergencyMiddle": { en: "(ambulance) or", af: "(ambulans) of", xh: "(i-ambulensi) okanye ku-" },
  "chatbot.emergencySuffix": { en: "(mobile). MyMedic cannot handle emergencies.", af: "(selfoon). MyMedic kan nie noodgevalle hanteer nie.", xh: "(iselula). IMyMedic ayikwazi ukuphatha iimeko zongxamiseko." },

  // Translation pending notice
  "notice.fallbackAf":       { en: "",
                               af: "Hierdie artikel se inhoud word nog na Afrikaans vertaal. Die opskrifte is in Afrikaans; die hoofteks wys voorlopig in Engels." },
  "notice.langSoon":         { en: "Coming soon", af: "Kom binnekort", xh: "Kuza kungekudala" },

  // Clinic finder
  "clinicFinder.title":      { en: "Find nearby help", af: "Vind hulp naby jou", xh: "Fumana uncedo olukufuphi" },
  "clinicFinder.subtitle":   { en: "Locate clinics, hospitals, pharmacies, and emergency rooms near you.", af: "Vind klinieke, hospitale, apteke en noodkamers naby jou.", xh: "Fumana iikliniki, izibhedlele, iifama, namasebe ongxamiseko akufuphi kuwe." },
  "clinicFinder.backHome":   { en: "Back to home", af: "Terug na tuisblad", xh: "Buyela ekhaya" },
  "clinicFinder.clinic":     { en: "Clinic", af: "Kliniek", xh: "Ikliniki" },
  "clinicFinder.hospital":   { en: "Hospital", af: "Hospitaal", xh: "Isibhedlele" },
  "clinicFinder.pharmacy":   { en: "Pharmacy", af: "Apteek", xh: "Ifama" },
  "clinicFinder.emergency":  { en: "Emergency", af: "Noodgeval", xh: "Ungxamiseko" },
  "clinicFinder.enableLoc":  { en: "Enable location access",                                                  af: "Aktiveer liggingtoegang" },
  "clinicFinder.locReason":  { en: "We need your location to find the nearest facilities. Your location is never stored.", af: "Ons het jou ligging nodig om die naaste fasiliteite te vind. Jou ligging word nooit gestoor nie." },
  "clinicFinder.useMyLoc":   { en: "Use my location",                                                         af: "Gebruik my ligging" },
  "clinicFinder.gettingLoc": { en: "Getting your location...",                                                af: "Kry jou ligging..." },
  "clinicFinder.locUnavail": { en: "Location unavailable",                                                    af: "Ligging onbeskikbaar" },
  "clinicFinder.tryAgain":   { en: "Try again", af: "Probeer weer", xh: "Zama kwakhona" },
  "clinicFinder.openNow":    { en: "Open now", af: "Nou oop", xh: "Vuliwe ngoku" },
  "clinicFinder.closed":     { en: "Closed", af: "Gesluit", xh: "Kuvaliwe" },
  "clinicFinder.directions": { en: "Directions", af: "Aanwysings", xh: "Izikhokelo" },
  "clinicFinder.details":    { en: "Details", af: "Besonderhede", xh: "Iinkcukacha" },
  "clinicFinder.emergency1": { en: "In a life-threatening emergency", af: "In 'n lewensgevaarlike noodgeval", xh: "Kwimeko esongela ubomi" },
  "clinicFinder.emergency2": { en: "Call 10177 (ambulance) or 112 (emergency from mobile)", af: "Bel 10177 (ambulans) of 112 (nood vanaf selfoon)", xh: "Tsalela umnxeba ku-10177 (i-ambulensi) okanye ku-112 (ungxamiseko kwiselula)" },
  "quickLinks.title":        { en: "Find nearby", af: "Vind naby", xh: "Fumana okufuphi" },
  "quickLinks.findClinic":   { en: "Find clinic", af: "Vind kliniek", xh: "Fumana ikliniki" },
  "quickLinks.findHospital": { en: "Find hospital", af: "Vind hospitaal", xh: "Fumana isibhedlele" },
  "quickLinks.findPharmacy": { en: "Find pharmacy", af: "Vind apteek", xh: "Fumana ifama" },
  "quickLinks.emergencyRoom":{ en: "Emergency room", af: "Noodkamer", xh: "Isebe likaxakeka" },
  "quickLinks.nearestMedicalFacility": { en: "Nearest medical facility", af: "Naaste mediese fasiliteit", xh: "Eyona ndawo yonyango ikufuphi" },
  "quickLinks.nearestPharmacy": { en: "Nearest pharmacy", af: "Naaste apteek", xh: "Eyona farmasi ikufuphi" },
  "emergencySection.title":  { en: "Emergency ambulance", af: "Noodambulans", xh: "I-ambulensi engxamisekileyo" },
  "emergencySection.subtitle": { en: "Tap to call immediately", af: "Tik om dadelik te bel", xh: "Cofa ukuze utsalele umnxeba ngoku" },
  "emergencySection.footerBefore": { en: "Call", af: "Bel", xh: "Tsalela umnxeba ku-" },
  "emergencySection.footerMiddle": { en: "for free government ambulance.", af: "vir gratis regeringsambulans.", xh: "ye-ambulensi karhulumente yasimahla." },
  "emergencySection.footerAfter": { en: "works from any mobile, even without airtime.", af: "werk vanaf enige selfoon, selfs sonder lugtyd.", xh: "isebenza kuyo nayiphi na iselula, nangenayo i-airtime." },
  "videos.title":            { en: "First Aid Videos", af: "Noodhulpvideo's", xh: "Iividiyo zoNcedo lokuQala" },
  "videos.subtitle":         { en: "Learn life-saving techniques", af: "Leer tegnieke wat lewens red", xh: "Funda iindlela zokusindisa ubomi" },
  "videos.credit":           { en: "Videos by St John Ambulance & British Heart Foundation", af: "Video's deur St John Ambulance & British Heart Foundation", xh: "Iividiyo zeSt John Ambulance kunye neBritish Heart Foundation" },

  // PWA install
  "pwa.installTitle":        { en: "Install MyMedic on your phone", af: "Installeer MyMedic op jou foon", xh: "Faka iMyMedic kwifowuni yakho" },
  "pwa.installBody":         { en: "Add to your home screen for quick access anytime.", af: "Voeg by jou tuisskerm vir vinnige toegang enige tyd.", xh: "Yongeza kwisikrini sasekhaya ukuze ufike ngokukhawuleza nanini na." },
  "pwa.installButton":       { en: "Install app", af: "Installeer app", xh: "Faka i-app" },
  "pwa.installing":          { en: "Installing…", af: "Installeer…", xh: "Iyafakwa…" },
  "pwa.dismiss":             { en: "Not now", af: "Nie nou nie", xh: "Hayi ngoku" },
  "pwa.iosBody":             { en: "Install MyMedic for one-tap access from your home screen.", af: "Installeer MyMedic vir een-tik toegang vanaf jou tuisskerm.", xh: "Faka iMyMedic ukuze ufike ngokucofa kube kanye kwisikrini sasekhaya." },
  "pwa.iosHint":             { en: "Tap Share, then Add to Home Screen", af: "Tik Deel, dan Voeg by tuisskerm", xh: "Cofa Yabelana, emva koko Yongeza kwisikrini sasekhaya" },
  "pwa.androidFallback":     { en: "Tap your browser menu (⋮) and choose Install app.", af: "Tik jou blaaier-kieslys (⋮) en kies Installeer app.", xh: "Cofa imenyu yebhrawuza (⋮) ukhethe uFaka i-app." },
} as const;

export type TranslationKey = keyof typeof T;

export function t(key: TranslationKey, lang: Lang): string {
  const entry = T[key] as Entry;
  if (!entry) return `[${key}]`;
  return (entry as Record<string, string | undefined>)[lang] || entry.en;
}