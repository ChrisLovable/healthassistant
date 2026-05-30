"""Add Zulu imports and map entries to load-disease.ts."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DISEASES = ROOT / "src" / "data" / "diseases"
LOAD = ROOT / "src" / "lib" / "content" / "load-disease.ts"

slugs = sorted(p.name.replace(".zu.json", "") for p in DISEASES.glob("*.zu.json"))
source = LOAD.read_text(encoding="utf-8")

for slug in slugs:
    var = "".join(p.capitalize() for p in re.split(r"[-_]", slug)) + "Zu"
    import_line = f'import {var} from "@/data/diseases/{slug}.zu.json";'
    if import_line not in source:
        # insert after en import for same slug
        en_line = f'import {var.replace("Zu", "En")}' if False else None
        anchor = f'from "@/data/diseases/{slug}.en.json";'
        idx = source.find(anchor)
        if idx == -1:
            print(f"skip import {slug} (no en anchor)")
            continue
        end = idx + len(anchor)
        source = source[:end] + "\n" + import_line + source[end:]

    # add zu to map entry
    pattern = rf'("{re.escape(slug)}":\s*\{{[^}}]*?)(\}})'
    def repl(m):
        block = m.group(1)
        if " zu:" in block or ", zu:" in block:
            return m.group(0)
        var = "".join(p.capitalize() for p in re.split(r"[-_]", slug)) + "Zu"
        return f'{block}, zu: {var} as DiseaseContent {m.group(2)}'
    source, n = re.subn(pattern, repl, source, count=1)
    if n:
        print(f"mapped {slug}")

LOAD.write_text(source, encoding="utf-8")
print("load-disease.ts updated")
