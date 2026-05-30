#!/usr/bin/env python3
"""Translate disease *.st.json from English with Sesotho glossary post-fixes."""
from __future__ import annotations

import json
import re
import sys
import time
from pathlib import Path

from deep_translator import GoogleTranslator

BASE = Path(__file__).resolve().parent.parent / "src" / "data" / "diseases"
CACHE = Path(__file__).resolve().parent / ".st-disease-cache.json"

SKIP_KEYS = {"slug", "group_slug", "id", "phone", "icon", "color", "link", "route", "route_link", "sourceUrl"}
SKIP_PATH_PARTS = {"sources"}
URL_RE = re.compile(r"^(https?://|/)")
NUMBERISH_RE = re.compile(r"^[\d\s().,+\-/%:]+$")

translator = GoogleTranslator(source="en", target="st")

DISEASE_NAMES: dict[str, str] = {
    "acne": "Acne",
    "anxiety": "Matšoenyeho",
    "asthma-attack": "Tlhaselo ea asthma",
    "asthma-children": "Asthma ho bana",
    "breast-cancer": "Kankere ea matsoele le maqhubu",
    "cervical-cancer-hpv": "Kankere ea molomo oa popelo le HPV",
    "child-fever": "Feberu ea ngoana",
    "childhood-diarrhoea": "Letšollo la bana",
    "contraception": "Thibela pelehi",
    "covid-19": "COVID-19",
    "depression": "Ho tepella maikutlo",
    "diabetes": "Lefu la tsoekere",
    "eczema": "Eczema",
    "flu": "Ntaramane (Flu)",
    "fungal-skin": "Mafu a letlalo a bakoang ke fungus",
    "headache-migraine": "Hlooho e bohloko le hlooho e opang (Migraine)",
    "heart-attack": "Tlhaselo ea pelo",
    "heartburn-reflux": "Pelo e chesa le asiti e nyolohelang (Acid reflux)",
    "high-blood-pressure": "Khatello e phahameng ea mali",
    "high-cholesterol": "K'holeseterole e phahameng",
    "hiv": "HIV",
    "meningitis": "Meningitis",
    "pneumonia": "Nyumonia",
    "pregnancy-danger-signs": "Matšoao a kotsi a bokhachane",
    "prostate-problems": "Mathata a tšoelesa ea senyama (Prostate)",
    "severe-allergic-reaction": "Karabelo e matla ea ho kula (anaphylaxis)",
    "stis": "Mafu a tšoaetsanoang ka thobalano (STIs)",
    "stroke": "Stroke / Setorouku",
    "substance-use": "Tšebeliso e mpe ea lithethefatsi le ho lemalla",
    "tb": "Lefuba (TB)",
    "uti": "Tšoaetso ea moroto (UTI)",
    "vaccinations": "Liente tsa bana",
}

REPLACEMENTS: list[tuple[str, str]] = [
    ("Four things worth knowing", "Lintho tse nne tseo u lokelang ho li tseba"),
    ("What you might notice — and what you usually won't", "Matšoao ao u ka a bonang — le seo u sa tloaeng u se bone"),
    ("What you might notice", "Matšoao ao u ka a bonang"),
    ("What is true and what is not", "Seo e leng 'nete le seo e seng 'nete"),
    ("Your next steps", "Mehato ea hau e latelang"),
    ("Where to go", "Moo u ka eang teng"),
    ("Get help", "Fumana thuso"),
    ("See a clinic or hospital urgently if", "E-ea tleliniking kapa sepetlele ka potlako haeba"),
    ("What to do", "Seo u lokelang ho se etsa"),
    ("Pending clinical review", "Ho hlahloba ha tleliniki ho ntse ho emetse"),
    (" in plain terms", " ka mantsoe a bonolo"),
    ("In plain terms", "Ka mantsoe a bonolo"),
    ("Call now", "Letsetsa hona joale"),
    ("Call 10177", "Letsetsa 10177"),
    ("Emergency", "Tšohanyetso"),
    ("Red flags", "Matšoao a kotsi"),
    ("danger signs", "matšoao a kotsi"),
    ("Talk to someone now", "Bua le motho hona joale"),
    ("pharmacy", "khemisi"),
    ("Pharmacy", "Khemisi"),
    ("clinic", "tleliniki"),
    ("Clinic", "Tleliniki"),
    ("doctor", "ngaka"),
    ("Doctor", "Ngaka"),
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
        cur = cur[int(part)] if part.isdigit() else cur[part]
    return cur


def set_at_path(node, path: str, value: str):
    parts = [p for p in re.split(r"\.|\[|\]", path) if p]
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


def post_fix_tree(node):
    if isinstance(node, dict):
        return {k: post_fix_tree(v) for k, v in node.items()}
    if isinstance(node, list):
        return [post_fix_tree(v) for v in node]
    if isinstance(node, str):
        return post_fix(node)
    return node


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
        st = post_fix(translator.translate(en))
    except Exception as exc:
        print(f"  translate error: {exc!r}", file=sys.stderr)
        st = en
    cache[en] = st
    return st


def process_file(slug: str, cache: dict[str, str], force: bool = False) -> int:
    en_path = BASE / f"{slug}.en.json"
    st_path = BASE / f"{slug}.st.json"
    en_data = json.loads(en_path.read_text(encoding="utf-8"))
    zu_data = json.loads(st_path.read_text(encoding="utf-8")) if st_path.exists() else json.loads(json.dumps(en_data))

    changed = 0
    for path, en_text in walk_pairs(en_data):
        try:
            current = get_at_path(zu_data, path)
        except (KeyError, IndexError, TypeError):
            current = en_text
        if not force and current.strip() != en_text.strip():
            continue
        st_text = translate_text(en_text, cache)
        if st_text != current:
            set_at_path(zu_data, path, st_text)
            changed += 1
        if changed and changed % 25 == 0:
            save_cache(cache)
            time.sleep(0.3)

    if slug in DISEASE_NAMES:
        zu_data["name"] = DISEASE_NAMES[slug]
    zu_data["reviewer"] = "Ho hlahloba ha tleliniki ho ntse ho emetse"

    zu_data = post_fix_tree(zu_data)
    st_path.write_text(json.dumps(zu_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return changed


def main():
    slugs = sorted(p.name.replace(".en.json", "") for p in BASE.glob("*.en.json"))
    cache = load_cache()
    total = 0
    print(f"Processing {len(slugs)} disease files...")
    for i, slug in enumerate(slugs, 1):
        n = process_file(slug, cache, force=True)
        total += n
        save_cache(cache)
        print(f"  [{i}/{len(slugs)}] {slug}: {n} strings")
        time.sleep(0.4)
    print(f"Done. ~{total} strings. Cache: {len(cache)} entries.")


if __name__ == "__main__":
    main()
