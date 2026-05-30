#!/usr/bin/env python3
"""Apply standard isiXhosa localisation fixes across *.xh.json disease files."""
import json
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "src" / "data" / "diseases"

# Order matters: longer phrases first
REPLACEMENTS = [
    ("ngokwemiqathango ecacileyo", "ngamazwi alula"),
    ("ngamazwi acacileyo", "ngamazwi alula"),
    ("Ukuthintela ukukhawula", "Ucwangciso-ntsapho"),
    ("i-blue reliver inhaler", "i-inhaler eluhlaza okwesibhakabhaka yokukhulula ukuphefumla"),
    ("bujika bubhlowu okanye bungwevu", "buba luhlaza okwesibhakabhaka okanye bungwevu"),
    ("bubhlowu", "luluhlaza okwesibhakabhaka"),
    ("Bona ugqirha ukuze ufumane ubunzima.", "Bonana nogqirha ukuze ufumane unyango olufanelekileyo."),
    ("Ilindele ukuphononongwa kweklinikhi", "Ukuphononongwa kweklinikhi kusalindelwe"),
    ("Pending clinical review", "Ukuphononongwa kweklinikhi kusalindelwe"),
    ("eluleko lwezonyango", "ingcebiso yezonyango"),
    ("ukuqondiswa okanye unyango", "uxilongo okanye unyango"),
    ("Ucwangciso lokukhulelwa", "Ucwangciso-ntsapho"),
    ("Uxinzelelo lwengqondo (depression)", "Ukudakumba (depression)"),
    ("Uxinzelelo lwengqondo", "Ukudakumba (depression)"),
    ("Iimpawu ze-FAST nento omawuyenze", "Iimpawu ze-FAST kunye nento omawuyenze"),
    ("Indlela yokunyanga i-shock", "Indlela yokunceda umntu ose-shock-ini"),
    ("kwifama", "kwikhemesti"),
    (" iifama,", " iikhemesti,"),
    ("Ifama", "Ikhemesti"),
    ("ifama", "ikhemesti"),
    ("farmasi", "ikhemesti"),
    ("Eyona farmasi ikufuphi", "Ikhemesti ekufutshane"),
    ("Eyona ndawo yonyango ikufuphi", "Iziko lezonyango elikufutshane"),
    ("Cofa naluphi na udidi ukuze ubone iimeko ezingaphakathi.", "Cofa naluphi na udidi ukuze ubone iimeko ezikulo."),
    ("Ulwazi lwezempilo onokuluthemba.", "Ulwazi lwezempilo olunokuthenjwa."),
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
    for path in sorted(BASE.glob("*.xh.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        updated = walk_replace(data)
        before = path.read_text(encoding="utf-8")
        after = json.dumps(updated, ensure_ascii=False, indent=2) + "\n"
        if before != after:
            path.write_text(after, encoding="utf-8")
            files_changed += 1
            # rough string change count
            for old, new in REPLACEMENTS:
                count += before.count(old)
    print(f"Updated {files_changed} files (~{count} replacements)")


if __name__ == "__main__":
    main()
