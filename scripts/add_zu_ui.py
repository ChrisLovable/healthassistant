"""Print Zulu UI strings for translations.ts (paste or review)."""
import re
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parent.parent
TS = ROOT / "src" / "lib" / "i18n" / "translations.ts"
translator = GoogleTranslator(source="en", target="zu")

text = TS.read_text(encoding="utf-8")
# Match single-line entries: "key": { en: "...", ...
single = re.findall(
    r'"([^"]+)":\s*\{\s*en:\s*"((?:\\.|[^"\\])*)"',
    text,
)
# Match multi-line disclaimer-style blocks
multiline = re.findall(
    r'"([^"]+)":\s*\{\s*\n\s*en:\s*"((?:\\.|[^"\\])*)"',
    text,
)

seen = set()
pairs = []
for key, en in single + multiline:
    if key in seen:
        continue
    seen.add(key)
    pairs.append((key, en.replace('\\"', '"')))

for key, en in pairs:
    try:
        zu = translator.translate(en)
    except Exception:
        zu = en
    print(f'  "{key}": ... zu: "{zu}"')

print(f"\nTotal: {len(pairs)}")
