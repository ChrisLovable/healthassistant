#!/usr/bin/env python3
"""Add Sesotho imports and map entries to load-disease.ts."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DISEASES = ROOT / "src" / "data" / "diseases"
LOAD = ROOT / "src" / "lib" / "content" / "load-disease.ts"

slugs = sorted(p.name.replace(".st.json", "") for p in DISEASES.glob("*.st.json"))
source = LOAD.read_text(encoding="utf-8")

for slug in slugs:
    var = "".join(p.capitalize() for p in re.split(r"[-_]", slug)) + "St"
    import_line = f'import {var} from "@/data/diseases/{slug}.st.json";'
    if import_line not in source:
        anchor = f'from "@/data/diseases/{slug}.en.json";'
        idx = source.find(anchor)
        if idx == -1:
            print(f"skip import {slug}")
            continue
        end = idx + len(anchor)
        source = source[:end] + "\n" + import_line + source[end:]

    pattern = rf'("{re.escape(slug)}":\s*\{{[^}}]*?)(\}})'
    def repl(m):
        block = m.group(1)
        if " st:" in block or ", st:" in block:
            return m.group(0)
        v = "".join(p.capitalize() for p in re.split(r"[-_]", slug)) + "St"
        return f"{block}, st: {v} as DiseaseContent {m.group(2)}"
    source, n = re.subn(pattern, repl, source, count=1)
    if n:
        print(f"mapped {slug}")

LOAD.write_text(source, encoding="utf-8")
print("load-disease.ts updated")
