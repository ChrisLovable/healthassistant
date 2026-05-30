type Lang = 'en' | 'af' | 'xh' | 'zu' | 'st';

const LANGUAGE_INSTRUCTIONS: Record<Lang, string> = {
  en: 'Respond in English only.',
  af: 'Antwoord uitsluitlik in Afrikaans. Behou wel mediese terme of medikasiename in Engels indien dit internasionaal so gebruik word.',
  xh: 'Phendula ngesiXhosa kuphela. Igama lamayeza okanye igama lemveliso liyavunyelwa eluwimi lwesiNgesi xa kuyimfuneko.',
  zu: 'Phendula ngesiZulu kuphela. Amagama emithi noma amagama empilo angahlala olimini lwesiNgesi uma kunesidingo.',
  st: 'Araba ka Sesotho feela. Mabitso a meriana le mareo a bongaka a ka sala a le ka Senyesemane haeba ho hlokahala.',
};

const NO_DISCLAIMER_RULE = `
CRITICAL UI RULE: Do NOT add any emergency disclaimer, "call 10177", "MyMedic cannot handle emergencies", or similar safety footer at the END of your response. The user interface ALREADY displays a fixed emergency banner below every chat reply. If you add your own closing disclaimer it duplicates the banner AND risks ungrammatical translations in Bantu languages (Sesotho/Xhosa/Zulu have a different negation structure that LLMs frequently get wrong).

EXCEPTION: If the user describes an actual emergency (chest pain with arm/jaw/neck pain, stroke signs, anaphylaxis, severe bleeding, suicidal ideation), OPEN your response with one clear sentence telling them to call 10177 — then continue with the rest. Do not add a closing disclaimer at the end.

Focus your response only on the medical content of the user's question. The UI handles all safety footers.
`.trim();

export function buildLanguageDirective(language: string): string {
  const lang = (language || 'en').toLowerCase() as Lang;
  const langInstruction = LANGUAGE_INSTRUCTIONS[lang] || LANGUAGE_INSTRUCTIONS.en;
  return `${langInstruction}\n\n${NO_DISCLAIMER_RULE}`;
}
