#!/usr/bin/env python3
"""Inject Sesotho (st) strings into translations.ts."""
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parent.parent
TS = ROOT / "src" / "lib" / "i18n" / "translations.ts"
CACHE = ROOT / "scripts" / ".st-ui-cache.json"

APPROVED: dict[str, str] = {
    "home.hero.title": "Tlhahisoleseding ea bophelo bo botle eo u ka e tšepang.",
    "home.hero.disclaimer": "MyMedic e fana ka tlhahisoleseding e akaretsang feela mabapi le bophelo bo botle; ha e fane ka keletso ea bongaka, tlhahlobo kapa kalafo, 'me ha ea lokela ho sebelisoa sebakeng sa ho buisana le ngaka kapa setsebi se tšoanelehang sa bophelo bo botle.",
    "home.browse.title": "Sheba ka lihlopha",
    "home.browse.subtitle": "Tobetsa sehlopha leha e le sefe ho bona mafu kapa mathata a amanang le sona.",
    "home.footer.line2": "Tlhahisoleseding ea bophelo bo botle ea Afrika Boroa.",
    "chatbot.title": "Botsa MyMedic",
    "chatbot.subtitle": "Lipotso tsa bongaka le tsa khemisi · EN · AF · ZU · XH · ST",
    "chatbot.placeholder": "Ngola kapa u bue potso ea hau...",
    "chatbot.disclaimer": "MyMedic e fana ka tlhahisoleseding e akaretsang feela 'me ha e nkele keletso ea bongaka sebaka.",
    "quickLinks.title": "Fumana tse haufi",
    "quickLinks.nearestMedicalFacility": "Setsi sa bongaka se haufi",
    "quickLinks.nearestPharmacy": "Khemisi e haufi",
    "emergencySection.title": "Ambulense ea tšohanyetso",
    "emergencySection.subtitle": "Tobetsa ho letsa hang-hang",
    "emergencySection.footerBefore": "Letsetsa",
    "emergencySection.footerMiddle": "bakeng sa ambulense ea 'muso ea mahala.",
    "emergencySection.footerAfter": "e sebetsa ho selefounu efe kapa efe, leha e se na airtime.",
    "emergencySection.shareWhatsApp": "Abelana ka app ena ho WhatsApp",
    "emergencySection.linkCopied": "Sehokelo se kopitsoe!",
    "emergencySection.shareMessage": "Sheba MyMedic — tlhahisoleseding ea bophelo bo botle eo u ka e tšepang: ",
    "videos.title": "Livideo tsa Thuso ea Pele (First Aid)",
    "videos.subtitle": "Ithute mekhoa ea ho pholosa bophelo",
    "videos.credit": "Livideo tsa St John Ambulance le British Heart Foundation",
    "section.whatIsIt": "Ke eng",
    "section.signs": "Matšoao ao u ka a bonang",
    "section.actionSteps": "Seo u lokelang ho se etsa",
    "section.getHelp": "Fumana thuso",
    "section.prevention": "Thibelo",
    "section.urgent": "Tšohanyetso — letsetsa hona joale",
    "meta.medicallyReviewed": "Ho hlahloba ha tleliniki ho ntse ho emetse",
    "disclaimer.reviewed": "Ho hlahloba ha tleliniki ho ntse ho emetse",
    "notice.langSoon": "E tla haufinyane",
    "notice.fallbackSt": "Litaba tsa sengoloa sena li ntse li fetoleloa Sesothong. Litlhoko li Sesothong; mongolo o ka hlaha ka Senyesemane ka nakoana.",
    "clinicFinder.title": "Fumana thuso e haufi",
    "clinicFinder.pharmacy": "Khemisi",
    "clinicFinder.clinic": "Tleliniki",
    "clinicFinder.hospital": "Sepetlele",
    "clinicFinder.emergency": "Tšohanyetso",
}

translator = GoogleTranslator(source="en", target="st")


def extract_en(source: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for m in re.finditer(
        r'"([^"]+)":\s*\{\s*\n\s*en:\s*"((?:\\.|[^"\\])*)"',
        source,
    ):
        out[m.group(1)] = m.group(2).replace('\\"', '"')
    for m in re.finditer(r'"([^"]+)":\s*\{\s*en:\s*"((?:\\.|[^"\\])*)"', source):
        if m.group(1) not in out:
            out[m.group(1)] = m.group(2).replace('\\"', '"')
    return out


def load_cache() -> dict[str, str]:
    if CACHE.exists():
        return json.loads(CACHE.read_text(encoding="utf-8"))
    return {}


def save_cache(data: dict[str, str]) -> None:
    CACHE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def main():
    source = TS.read_text(encoding="utf-8")
    source = source.replace(
        'type Entry = { en: string; af?: string; zu?: string; xh?: string };',
        'type Entry = { en: string; af?: string; zu?: string; xh?: string; st?: string };',
    )
    en_map = extract_en(source)
    cache = load_cache()
    cache.update(APPROVED)

    for key, en in en_map.items():
        if key in cache and cache[key]:
            continue
        if not en.strip():
            cache[key] = ""
            continue
        try:
            cache[key] = translator.translate(en)
            time.sleep(0.12)
        except Exception:
            cache[key] = en
        print(f"translated {key}")

    save_cache(cache)

    for key, st in cache.items():
        if f'"{key}"' not in source:
            continue
        key_idx = source.find(f'"{key}"')
        block_end = source.find("\n  ", key_idx + 1)
        if block_end == -1:
            block_end = len(source)
        block = source[key_idx:block_end]
        if re.search(r"\bst:\s*", block):
            continue
        escaped = st.replace("\\", "\\\\").replace('"', '\\"')
        if "xh:" in block:
            new_block = block.replace("xh:", f'st: "{escaped}",\n    xh:', 1)
        elif "zu:" in block:
            new_block = block.replace("zu:", f'st: "{escaped}",\n    zu:', 1)
        elif "af:" in block:
            new_block = block.replace("af:", f'st: "{escaped}",\n    af:', 1)
        else:
            new_block = re.sub(
                r'(en:\s*"(?:\\.|[^"\\])*")',
                rf'\1,\n    st: "{escaped}"',
                block,
                count=1,
            )
        source = source.replace(block, new_block, 1)

    # Update EN chatbot subtitle to include ST
    source = source.replace(
        "Medical & pharmacy questions · EN · AF · ZU · XH",
        "Medical & pharmacy questions · EN · AF · ZU · XH · ST",
    )
    source = source.replace(
        "Mediese & apteekvrae · EN · AF · ZU · XH",
        "Mediese & apteekvrae · EN · AF · ZU · XH · ST",
    )

    TS.write_text(source, encoding="utf-8")
    print(f"Injected st for {len(cache)} keys")


if __name__ == "__main__":
    main()
