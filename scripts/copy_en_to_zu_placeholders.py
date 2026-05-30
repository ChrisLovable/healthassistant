"""Copy English disease files to Zulu placeholders for any missing .zu.json files."""
import json
import shutil
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent / "src" / "data" / "diseases"

for en_path in sorted(BASE.glob("*.en.json")):
    slug = en_path.name.replace(".en.json", "")
    zu_path = BASE / f"{slug}.zu.json"
    if zu_path.exists():
        continue
    shutil.copy(en_path, zu_path)
    print(f"copied {slug}")

print("Done.")
