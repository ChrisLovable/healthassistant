"""Add Zulu group and disease names to catalog-translations.json."""
import json
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "src" / "data" / "catalog-translations.json"
DISEASES = ROOT / "src" / "data" / "diseases.json"
translator = GoogleTranslator(source="en", target="zu")


def tr(text: str) -> str:
    if not text.strip():
        return text
    try:
        return translator.translate(text)
    except Exception:
        return text


def main():
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    data = json.loads(DISEASES.read_text(encoding="utf-8"))

    for group in data["groups"]:
        slug = group["slug"]
        if "zu" not in catalog["groups"].get(slug, {}):
            catalog["groups"].setdefault(slug, {})["zu"] = {
                "name": tr(group["name"]),
                "tagline": tr(group["tagline"]),
            }
            print(f"group {slug}")

    for disease in data["diseases"]:
        slug = disease["slug"]
        if "zu" not in catalog["diseases"].get(slug, {}):
            catalog["diseases"].setdefault(slug, {})["zu"] = {
                "name": tr(disease["name"]),
                "tagline": tr(disease["tagline"]),
            }
            print(f"disease {slug}")

    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Catalog updated.")


if __name__ == "__main__":
    main()
