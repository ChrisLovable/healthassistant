#!/usr/bin/env python3
"""Translate disease *.zu.json from English with glossary post-fixes and caching."""
from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path

from deep_translator import GoogleTranslator

BASE = Path(__file__).resolve().parent.parent / "src" / "data" / "diseases"
CACHE = Path(__file__).resolve().parent / ".zu-disease-cache.json"

SKIP_KEYS = {"slug", "group_slug", "id", "phone", "icon", "color", "link", "route", "route_link", "sourceUrl"}
SKIP_PATH_PARTS = {"sources"}
URL_RE = re.compile(r"^(https?://|/)")
NUMBERISH_RE = re.compile(r"^[\d\s().,+\-/%:]+$")

translator = GoogleTranslator(source="en", target="zu")

# Preferred disease display names (taglines translated separately)
DISEASE_NAMES: dict[str, str] = {
    "acne": "I-acne",
    "anxiety": "Ukukhathazeka",
    "asthma-attack": "Ukuhlaselwa kwe-asthma",
    "asthma-children": "I-asthma yezingane",
    "breast-cancer": "Umdlavuza webele",
    "cervical-cancer-hpv": "Umdlavuza womlomo wesibeletho ne-HPV",
    "child-fever": "Umkhuhlane wengane",
    "childhood-diarrhoea": "Uhudo lwezingane",
    "contraception": "Ukuvimbela inzalo",
    "covid-19": "I-COVID-19",
    "depression": "Ukucindezeleka",
    "diabetes": "Isifo sikashukela",
    "eczema": "I-eczema",
    "flu": "Umkhuhlane (influenza)",
    "fungal-skin": "Izifo zesikhumba ezibangelwa ukhunta",
    "headache-migraine": "Ikhanda elibuhlungu ne-migraine",
    "heart-attack": "Ukuhlasela kwenhliziyo",
    "heartburn-reflux": "Isilungulela ne-reflux",
    "high-blood-pressure": "Umfutho wegazi ophezulu",
    "high-cholesterol": "I-cholesterol ephezulu",
    "hiv": "I-HIV",
    "meningitis": "I-meningitis",
    "pneumonia": "Inyumoniya",
    "pregnancy-danger-signs": "Izimpawu eziyingozi zokukhulelwa",
    "prostate-problems": "Izinkinga zendlala yesinye",
    "severe-allergic-reaction": "Ukungezwani okukhulu komzimba (i-anaphylaxis)",
    "stis": "Izifo ezithathelwana ngocansi (STIs)",
    "stroke": "Isifo sohlangothi",
    "substance-use": "Ukusetshenziswa kwezidakamizwa nokulutheka",
    "tb": "I-TB (Tuberculosis)",
    "uti": "Ukutheleleka komgudu womchamo (UTI)",
    "vaccinations": "Ukugonywa kwezingane",
}

REPLACEMENTS: list[tuple[str, str]] = [
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
    ("Review pending", "Ukubuyekezwa komtholampilo kulindile"),
    (" in plain terms", " ngamazwi alula"),
    ("In plain terms", "Ngamazwi alula"),
    ("Call now", "Shayela manje"),
    ("Call 10177", "Shayela u-10177"),
    ("call 10177", "shayela u-10177"),
    ("Emergency", "Isimo esiphuthumayo"),
    ("Red flags", "Izimpawu eziyingozi"),
    ("danger signs", "izimpawu eziyingozi"),
    ("Talk to someone now", "Khuluma nomuntu manje"),
    ("pharmacy", "ikhemisi"),
    ("Pharmacy", "Ikhemisi"),
    ("clinic", "umtholampilo"),
    ("Clinic", "Umtholampilo"),
    ("doctor", "udokotela"),
    ("Doctor", "Udokotela"),
    ("I-Eczema", "I-eczema"),
    ("I-ambulansi kahulumeni", "I-ambulensi kahulumeni"),
]


def should_translate(text: str, path: str) -> bool:
    s = text.strip()
    if not s:
        return False
    if URL_RE.match(s) or NUMBERISH_RE.match(s):
        return False
    if any(p in path for p in SKIP_PATH_PARTS):
        return False
    return True


def walk_pairs(node, path="", out=None):
    if out is None:
        out = []
    if isinstance(node, dict):
        for k, v in node.items():
            if k in SKIP_KEYS:
                continue
            walk_pairs(v, f"{path}.{k}" if path else k, out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk_pairs(v, f"{path}[{i}]", out)
    elif isinstance(node, str) and should_translate(node, path):
        out.append((path, node))
    return out


def get_at_path(node, path: str):
    cur = node
    for part in re.split(r"\.|\[|\]", path):
        if not part:
            continue
        if part.isdigit():
            cur = cur[int(part)]
        else:
            cur = cur[part]
    return cur


def set_at_path(node, path: str, value: str):
    parts = re.split(r"\.|\[|\]", path)
    parts = [p for p in parts if p]
    cur = node
    for part in parts[:-1]:
        cur = cur[int(part)] if part.isdigit() else cur[part]
    last = parts[-1]
    if last.isdigit():
        cur[int(last)] = value
    else:
        cur[last] = value


def post_fix(text: str) -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    return text


def load_cache() -> dict[str, str]:
    if CACHE.exists():
        return json.loads(CACHE.read_text(encoding="utf-8"))
    return {}


def save_cache(cache: dict[str, str]) -> None:
    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def translate_text(en: str, cache: dict[str, str]) -> str:
    if en in cache:
        return cache[en]
    try:
        zu = post_fix(translator.translate(en))
    except Exception as exc:
        print(f"  translate error: {exc!r} -> keeping EN", file=sys.stderr)
        zu = en
    cache[en] = zu
    return zu


def process_file(slug: str, cache: dict[str, str], force: bool = False) -> int:
    en_path = BASE / f"{slug}.en.json"
    zu_path = BASE / f"{slug}.zu.json"
    en_data = json.loads(en_path.read_text(encoding="utf-8"))
    zu_data = json.loads(zu_path.read_text(encoding="utf-8")) if zu_path.exists() else json.loads(
        json.dumps(en_data)
    )

    pairs = walk_pairs(en_data)
    changed = 0
    for path, en_text in pairs:
        try:
            current = get_at_path(zu_data, path)
        except (KeyError, IndexError, TypeError):
            current = en_text
        if not force and current.strip() != en_text.strip():
            continue
        zu_text = translate_text(en_text, cache)
        if zu_text != current:
            set_at_path(zu_data, path, zu_text)
            changed += 1
        if changed and changed % 25 == 0:
            save_cache(cache)
            time.sleep(0.3)

    if slug in DISEASE_NAMES:
        zu_data["name"] = DISEASE_NAMES[slug]
    zu_data["reviewer"] = "Ukubuyekezwa komtholampilo kulindile"

    zu_data = post_fix_tree(zu_data)
    zu_path.write_text(json.dumps(zu_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return changed


def post_fix_tree(node):
    if isinstance(node, dict):
        return {k: post_fix_tree(v) for k, v in node.items()}
    if isinstance(node, list):
        return [post_fix_tree(v) for v in node]
    if isinstance(node, str):
        return post_fix(node)
    return node


def main():
    slugs = sorted(p.name.replace(".en.json", "") for p in BASE.glob("*.en.json"))
    force = "--force" in sys.argv
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    if only:
        slugs = [s for s in slugs if s in only]

    cache = load_cache()
    total = 0
    print(f"Processing {len(slugs)} disease files (force={force})...")
    for i, slug in enumerate(slugs, 1):
        n = process_file(slug, cache, force=force)
        total += n
        save_cache(cache)
        print(f"  [{i}/{len(slugs)}] {slug}: {n} strings updated")
        time.sleep(0.5)
    print(f"Done. ~{total} strings updated. Cache: {len(cache)} entries.")


if __name__ == "__main__":
    main()
