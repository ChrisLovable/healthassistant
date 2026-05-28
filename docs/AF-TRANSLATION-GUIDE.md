# Phila — Afrikaans Translation Guide
Single source of truth for translating disease content EN -> AF.
Fix every term marked (REVIEW) with correct SA Afrikaans, THEN use this guide
to re-translate each src/data/diseases/{slug}.en.json into {slug}.af.json.

## Style rules
- South African Afrikaans, NOT Dutch (asem not adem; siek not ziek; vinnig not snel; jy/jou not u)
- Address the reader as "jy/jou", never "u"
- Write like a SA clinic pamphlet / Hart- en Slagstigting material reads: natural, warm, plain.
  NOT a word-for-word translation of the English.
- Medical accuracy beats literal fidelity. If the literal version sounds clinically wrong, use the natural SA term.
- Avoid English calques: "die enkele grootste oorsaak" -> rather "verreweg die grootste oorsaak"

## Keep UNCHANGED (never translate)
- Abbreviations: HIV, TB, COVID-19, HPV, PSA, IUD, DKA, ORS, BCG, EPI, BPH, SOI
- Proper nouns: MomConnect, SADAG, LifeLine, SANCA, CANSA, Childline SA, Pink Drive, Marie Stopes, loveLife, NICD
- Hospital names, phone numbers, dates, JSON keys, slug, group_slug, hero_image, color, icon, link, sources, reviewer

## Core glossary (EN -> AF)   [fix anything marked REVIEW]
SYMPTOMS / SIGNS
- vision problems        -> sigprobleme          (was wrongly "visieprobleme")
- shortness of breath    -> kortasem
- dizziness              -> duiseligheid
- numbness               -> gevoelloosheid
- confusion              -> verwarring
- seizure / convulsion   -> stuiptrekking         (REVIEW: or "toeval"?)
- swelling               -> swelling              (REVIEW: or "geswel"?)
- rash                   -> uitslag
- fever                  -> koors
- nausea                 -> naarheid
- vomiting               -> braking
- bleeding               -> bloeding
- chest pain             -> borspyn
- weakness               -> swakheid
- cough                  -> hoes

ANATOMY
- airways -> lugweë   | bladder -> blaas | kidney -> nier | prostate -> prostaat | lungs -> longe

CARE / ACTION
- treatment              -> behandeling
- screening              -> sifting / siftingstoets   (was wrongly "skerming")
- side effects           -> newe-effekte              (REVIEW: or "byverskynsels"?)
- vaccine / vaccination  -> inenting                  (REVIEW: pick "inenting" OR "vaksien", be consistent)
- injection -> inspuiting | blood pressure -> bloeddruk | blood sugar -> bloedsuiker

EMERGENCY
- emergency -> noodgeval | ambulance -> ambulans | life-threatening -> lewensgevaarlik | call 10177 -> bel 10177

## Standard section headings (use consistently)
- "Four things worth knowing"     -> "Vier dinge om te weet"
- "What to look out for"          -> "Waarop om te let"
- "What to do"                    -> "Wat om te doen"
- "Your next steps"               -> "Jou volgende stappe"
- "Where to go"                   -> "Waarheen om te gaan"
- "How X spreads"                 -> "Hoe X versprei"
- "What is true and what is not"  -> "Wat is waar en wat is nie"   (REVIEW: or "Mites en feite"?)

## Stroke mnemonic
English uses FAST; I used "GAST". CONFIRM this is a real SA Afrikaans convention
or replace with the exact wording the Hart- en Slagstigting uses.

## Known errors already in the current AF files
- "visieprobleme" -> "sigprobleme"  (appears in several urgent red-flag lists)
- "skerming" (screening) -> "sifting / siftingstoets"
- Watch for English word-order mirroring (translationese) and over-formal vocabulary