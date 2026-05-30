#!/usr/bin/env python3
"""Apply standard isiZulu localisation fixes across *.zu.json disease files."""
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "src" / "data" / "diseases"

REPLACEMENTS = [
    ("Four things worth knowing", "Izinto ezine okufanele uzazi"),
    ("What you might notice — and what you usually won't", "Izimpawu ongazibona — nalokho okuvamise ukungabi khona"),
    ("What you might notice", "Izimpawu ongazibona"),
    ("What is true and what is not", "Okuyiqiniso nokungeyona iqiniso"),
    ("Your next steps", "Izinyathelo zakho ezilandelayo"),
    ("Where to go", "Lapho ongaya khona"),
    ("Get help", "Thola usizo"),
    ("See a clinic or hospital urgently if", "Yiya emtholampilo noma esibhedlela ngokushesha uma"),
    ("What to do", "Okufanele ukwenze"),
    ("Pending clinical review", "Ukubuyekezwa komtholampilo kulindile"),
    ("Ukubuyekezwa komtholampilo okulindile", "Ukubuyekezwa komtholampilo kulindile"),
    (" in plain terms", " ngamazwi alula"),
    ("ngendlela ecacile", "ngamazwi alula"),
    ("I-Eczema", "I-eczema"),
    ("I-ambulansi kahulumeni", "I-ambulensi kahulumeni"),
    ("Isifo senhliziyo", "Ukuhlasela kwenhliziyo"),
    ("I-allergic enzima (i-anaphylaxis)", "Ukungezwani okukhulu komzimba (i-anaphylaxis)"),
    ("Izifo zesikhumba fungal", "Izifo zesikhumba ezibangelwa ukhunta"),
    ("Ukuthintela ukukhulelwa", "Ukuvimbela inzalo"),
    ("Impilo isongela", "Izimo ezisongela impilo"),
]


def walk_replace(obj):
    if isinstance(obj, dict):
        return {k: walk_replace(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk_replace(v) for v in obj]
    if isinstance(obj, str):
        s = obj
        for old, new in REPLACEMENTS:
            s = s.replace(old, new)
        return s
    return obj


def main():
    count = 0
    files_changed = 0
    for path in sorted(BASE.glob("*.zu.json")):
        before = path.read_text(encoding="utf-8")
        data = json.loads(before)
        updated = walk_replace(data)
        after = json.dumps(updated, ensure_ascii=False, indent=2) + "\n"
        if before != after:
            path.write_text(after, encoding="utf-8")
            files_changed += 1
            for old, new in REPLACEMENTS:
                count += before.count(old)
    print(f"Updated {files_changed} files (~{count} replacements)")


if __name__ == "__main__":
    main()
