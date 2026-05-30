#!/usr/bin/env python3
"""Audit UI and disease translation coverage."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TS = ROOT / "src/lib/i18n/translations.ts"
CATALOG = ROOT / "src/data/catalog-translations.json"
BASE = ROOT / "src/data/diseases"
LOAD = ROOT / "src/lib/content/load-disease.ts"

EN_HEADINGS = [
    "What it is", "In plain terms", "What you might notice",
    "Four things worth knowing", "Your next steps", "Where to go",
    "Get help", "See a clinic or hospital urgently if", "Call now",
    "Pending clinical review",
]


def audit_ui():
    ts = TS.read_text(encoding="utf-8")
    keys = re.findall(r'"([^"]+)":\s*\{', ts)
    langs = ["af", "zu", "xh", "st"]
    print("=== UI translations.ts ===")
    print(f"Total keys: {len(keys)}")
    for l in langs:
        missing = []
        for key in keys:
            idx = ts.find(f'"{key}"')
            end = ts.find('\n  "', idx + 1)
            if end < 0:
                end = len(ts)
            block = ts[idx:end]
            if not re.search(rf"\b{l}:\s*\"", block):
                missing.append(key)
        print(f"  {l.upper()}: {len(keys)-len(missing)}/{len(keys)} present, {len(missing)} missing -> EN fallback")
        if missing:
            for k in missing[:20]:
                print(f"    - {k}")
            if len(missing) > 20:
                print(f"    ... and {len(missing)-20} more")


def audit_catalog():
    cat = json.loads(CATALOG.read_text(encoding="utf-8"))
    print("\n=== catalog-translations.json ===")
    for section in ["groups", "diseases"]:
        items = cat[section]
        for l in ["af", "zu", "xh", "st"]:
            miss = [k for k, v in items.items() if l not in v]
            print(f"  {section} {l.upper()}: {len(items)-len(miss)}/{len(items)}" +
                  (f" missing: {miss}" if miss else " complete"))


def collect_strings(obj, skip_sources=False):
    out = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in {"slug", "group_slug"}:
                continue
            if skip_sources and k == "sources":
                continue
            out.extend(collect_strings(v))
    elif isinstance(obj, list):
        for v in obj:
            out.extend(collect_strings(v))
    elif isinstance(obj, str):
        s = obj.strip()
        if s:
            out.append(s)
    return out


def audit_diseases():
    en_files = sorted(BASE.glob("*.en.json"))
    print("\n=== Disease JSON files ===")
    for loc in ["af", "zu", "xh", "st"]:
        missing_files = []
        same_total = 0
        str_total = 0
        english_headings = []
        high_overlap = []
        for en_path in en_files:
            slug = en_path.stem.replace(".en", "")
            loc_path = BASE / f"{slug}.{loc}.json"
            if not loc_path.exists():
                missing_files.append(slug)
                continue
            en = json.loads(en_path.read_text(encoding="utf-8"))
            loc_data = json.loads(loc_path.read_text(encoding="utf-8"))
            en_s = set(collect_strings(en, skip_sources=True))
            loc_s = set(collect_strings(loc_data, skip_sources=True))
            same = len(en_s & loc_s)
            total = len(loc_s)
            same_total += same
            str_total += total
            pct = round(100 * same / total) if total else 0
            if pct > 30:
                high_overlap.append((slug, pct))
            text = json.dumps(loc_data, ensure_ascii=False)
            for h in EN_HEADINGS:
                if h in text:
                    english_headings.append(f"{slug}: {h}")
        pct_all = round(100 * same_total / str_total) if str_total else 0
        print(f"  {loc.upper()}: {len(en_files)-len(missing_files)}/{len(en_files)} files | ~{pct_all}% strings identical to EN (incl. org names/loanwords)")
        if missing_files:
            print(f"    missing files: {missing_files}")
        if english_headings:
            print(f"    untranslated EN headings: {len(english_headings)}")
            for x in english_headings[:5]:
                print(f"      - {x}")
        if high_overlap:
            top = sorted(high_overlap, key=lambda x: -x[1])[:3]
            print(f"    highest EN overlap: {top}")


def audit_load():
    load = LOAD.read_text(encoding="utf-8")
    print("\n=== load-disease.ts wiring ===")
    for loc in ["af", "zu", "xh", "st"]:
        count = len(re.findall(rf", {loc}: ", load))
        print(f"  {loc.upper()}: {count}/32 diseases mapped")
    print("  Fallback: if locale missing, English content loads (isFallback=true)")


if __name__ == "__main__":
    audit_ui()
    audit_catalog()
    audit_diseases()
    audit_load()
