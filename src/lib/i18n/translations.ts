import type { Lang } from "./lang";

type Entry = { en: string; af?: string; zu?: string; xh?: string };

export const T = {
  // Home
  "home.hero.title":         { en: "Health information you can trust.",                                       af: "Gesondheidsinligting wat jy kan vertrou." },
  "home.hero.subtitle":      { en: "Tap a category or ask MyMedic any medical or pharmacy question.",           af: "Tik 'n kategorie of vra MyMedic enige mediese of apteekvraag." },
  "home.browse.title":       { en: "Browse by category",                                                      af: "Blaai per kategorie" },
  "home.browse.subtitle":    { en: "Tap any category to see the conditions inside.",                          af: "Tik enige kategorie om die toestande binne te sien." },
  "home.footer.line1":       { en: "© MyMedic · Cipla",                                         af: "© MyMedic · Cipla" },
  "home.footer.line2":       { en: "Medical information for South Africa",                                    af: "Mediese inligting vir Suid-Afrika" },

  // Cards / counts
  "conditions.singular":     { en: "condition",                                                               af: "toestand" },
  "conditions.plural":       { en: "conditions",                                                              af: "toestande" },
  "contentComingSoon":       { en: "Content coming soon",                                                     af: "Inhoud kom binnekort" },

  // Breadcrumbs
  "nav.allCategories":       { en: "All categories",                                                          af: "Alle kategorieë" },

  // Disease meta
  "meta.medicallyReviewed":  { en: "Medically reviewed",                                                      af: "Medies hersien" },
  "meta.minRead":            { en: "min read",                                                                af: "min lees" },
  "meta.listenPrompt":       { en: "Prefer to listen? EN · AF · ZU · XH",                                     af: "Verkies om te luister? EN · AF · ZU · XH" },
  "meta.listen":             { en: "Listen",                                                                  af: "Luister" },
  "meta.stop":               { en: "Stop",                                                                    af: "Stop" },

  // Section kickers
  "section.urgent":          { en: "Urgent — call now",                                                       af: "Dringend — bel nou" },
  "section.whatIsIt":        { en: "What is it",                                                              af: "Wat is dit" },
  "section.knowThis":        { en: "Know this",                                                               af: "Weet dit" },
  "section.signs":           { en: "Signs to look for",                                                       af: "Tekens om op te let" },
  "section.spreads":         { en: "How it spreads",                                                          af: "Hoe dit versprei" },
  "section.myths":           { en: "Myths and facts",                                                         af: "Mites en feite" },
  "section.prevention":      { en: "Prevention",                                                              af: "Voorkoming" },
  "section.actionSteps":     { en: "What to do",                                                              af: "Wat om te doen" },
  "section.getHelp":         { en: "Get help",                                                                af: "Kry hulp" },

  // Spreads / Myths labels
  "spreads.does":            { en: "Does spread by",                                                          af: "Versprei deur" },
  "spreads.doesNot":         { en: "Does NOT spread by",                                                      af: "Versprei NIE deur" },
  "myth.myth":               { en: "Myth",                                                                    af: "Mite" },
  "myth.fact":               { en: "Fact",                                                                    af: "Feit" },

  // Disclaimer
  "disclaimer.reviewed":     { en: "Medically reviewed",                                                      af: "Medies hersien" },
  "disclaimer.reviewedBy":   { en: "Reviewed by",                                                             af: "Hersien deur" },
  "disclaimer.lastReview":   { en: "Last review",                                                             af: "Laaste hersiening" },
  "disclaimer.nextReview":   { en: "Next review due",                                                         af: "Volgende hersiening" },
  "disclaimer.sources":      { en: "Sources",                                                                 af: "Bronne" },
  "disclaimer.important":    { en: "Important",                                                               af: "Belangrik" },
  "disclaimer.body":         { en: "The information on this page is for general education only. It is not medical advice and does not replace seeing a doctor or pharmacist. If you have specific questions about your health, please contact a healthcare professional or call one of the helplines above.",
                               af: "Die inligting op hierdie bladsy is slegs vir algemene opvoeding. Dit is nie mediese advies nie en vervang nie 'n besoek aan 'n dokter of apteker nie. Vir spesifieke vrae oor jou gesondheid, kontak asseblief 'n gesondheidsorgwerker of skakel een van die hulplyne hierbo." },

  // Chatbot
  "chatbot.title":           { en: "Ask MyMedic",                                                               af: "Vra MyMedic" },
  "chatbot.subtitle":        { en: "Medical & pharmacy questions · EN · AF · ZU · XH",                        af: "Mediese & apteek vrae · EN · AF · ZU · XH" },
  "chatbot.placeholder":     { en: "Type or speak your question...",                                          af: "Tik of sê jou vraag..." },
  "chatbot.prompt1":         { en: "I have a headache that won't go away",                                    af: "Ek het 'n hoofpyn wat nie wegtrek nie" },
  "chatbot.prompt2":         { en: "Is this rash dangerous?",                                                 af: "Is hierdie uitslag gevaarlik?" },
  "chatbot.prompt3":         { en: "What does my BP reading mean?",                                           af: "Wat beteken my bloeddruk lesing?" },
  "chatbot.disclaimer":      { en: "MyMedic gives general information only and is not a substitute for medical advice.",
                               af: "MyMedic gee net algemene inligting en is nie 'n plaasvervanger vir mediese advies nie." },

  // Translation pending notice
  "notice.fallbackAf":       { en: "",
                               af: "Hierdie artikel se inhoud word nog na Afrikaans vertaal. Die opskrifte is in Afrikaans; die hoofteks wys voorlopig in Engels." },
  "notice.langSoon":         { en: "Coming soon",                                                             af: "Kom binnekort" },

  // Clinic finder
  "clinicFinder.title":      { en: "Find nearby help",                                                        af: "Vind hulp naby jou" },
  "clinicFinder.subtitle":   { en: "Locate clinics, hospitals, pharmacies, and emergency rooms near you.",    af: "Vind klinieke, hospitale, apteke en noodkamers naby jou." },
  "clinicFinder.backHome":   { en: "Back to home",                                                            af: "Terug na tuisblad" },
  "clinicFinder.clinic":     { en: "Clinic",                                                                  af: "Kliniek" },
  "clinicFinder.hospital":   { en: "Hospital",                                                                af: "Hospitaal" },
  "clinicFinder.pharmacy":   { en: "Pharmacy",                                                                af: "Apteek" },
  "clinicFinder.emergency":  { en: "Emergency",                                                               af: "Noodgeval" },
  "clinicFinder.enableLoc":  { en: "Enable location access",                                                  af: "Aktiveer liggingtoegank" },
  "clinicFinder.locReason":  { en: "We need your location to find the nearest facilities. Your location is never stored.", af: "Ons het jou ligging nodig om die naaste fasiliteite te vind. Jou ligging word nooit gestoor nie." },
  "clinicFinder.useMyLoc":   { en: "Use my location",                                                         af: "Gebruik my ligging" },
  "clinicFinder.gettingLoc": { en: "Getting your location...",                                                af: "Kry jou ligging..." },
  "clinicFinder.locUnavail": { en: "Location unavailable",                                                    af: "Ligging onbeskikbaar" },
  "clinicFinder.tryAgain":   { en: "Try again",                                                               af: "Probeer weer" },
  "clinicFinder.openNow":    { en: "Open now",                                                                af: "Nou oop" },
  "clinicFinder.closed":     { en: "Closed",                                                                  af: "Gesluit" },
  "clinicFinder.directions": { en: "Directions",                                                              af: "Aanwysings" },
  "clinicFinder.details":    { en: "Details",                                                                 af: "Besonderhede" },
  "clinicFinder.emergency1": { en: "In a life-threatening emergency",                                         af: "In 'n lewensgevaarlike noodgeval" },
  "clinicFinder.emergency2": { en: "Call 10177 (ambulance) or 112 (emergency from mobile)",                   af: "Bel 10177 (ambulans) of 112 (nood vanaf selfoon)" },
} as const;

export type TranslationKey = keyof typeof T;

export function t(key: TranslationKey, lang: Lang): string {
  const entry = T[key] as Entry;
  if (!entry) return `[${key}]`;
  return (entry as Record<string, string | undefined>)[lang] || entry.en;
}