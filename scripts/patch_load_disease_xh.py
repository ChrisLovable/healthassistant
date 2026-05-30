#!/usr/bin/env python3
"""Add isiXhosa imports and map entries to load-disease.ts."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DISEASES = ROOT / "src" / "data" / "diseases"
LOAD = ROOT / "src" / "lib" / "content" / "load-disease.ts"

slugs = sorted(p.name.replace(".xh.json", "") for p in DISEASES.glob("*.xh.json"))
source = LOAD.read_text(encoding="utf-8")

for slug in slugs:
    var = "".join(p.capitalize() for p in re.split(r"[-_]", slug)) + "Xh"
    import_line = f'import {var} from "@/data/diseases/{slug}.xh.json";'
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
        if " xh:" in block or ", xh:" in block:
            return m.group(0)
        v = "".join(p.capitalize() for p in re.split(r"[-_]", slug)) + "Xh"
        return f"{block}, xh: {v} as DiseaseContent {m.group(2)}"
    source, n = re.subn(pattern, repl, source, count=1)
    if n:
        print(f"mapped {slug}")

LOAD.write_text(source, encoding="utf-8")
print("load-disease.ts updated")
