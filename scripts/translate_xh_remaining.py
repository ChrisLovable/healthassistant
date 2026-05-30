import json
import re
import time
from pathlib import Path
from deep_translator import GoogleTranslator

BASE = Path(r"c:/phila/src/data/diseases")
translator = GoogleTranslator(source="en", target="xh")

SKIP_KEYS = {"slug", "group_slug", "id", "phone", "icon", "color", "link", "route", "route_link", "sourceUrl"}
SKIP_PATH_PARTS = {"sources"}
URL_RE = re.compile(r"^(https?://|/)")
NUMBERISH_RE = re.compile(r"^[\d\s().,+\-/%:]+$")


def should_translate(text: str, path: str) -> bool:
    s = text.strip()
    if not s:
        return False
    if URL_RE.match(s) or NUMBERISH_RE.match(s):
        return False
    if any(p in path for p in SKIP_PATH_PARTS):
        return False
    return True


def normalize(text: str) -> str:
    return (text or "").strip()


def post_fix(t: str) -> str:
    t = t.replace("Fowunela", "Tsalela umnxeba")
    t = t.replace("fowunela", "tsalela umnxeba")
    t = t.replace("A&E", "isebe likaxakeka")
    t = t.replace("ambulensi", "i-ambulensi")
    t = t.replace("i-ambulensi", "i-ambulensi")
    t = t.replace("i-ORS", "i-ORS")
    t = t.replace("ukungalindi", "musa ukulinda")
    t = t.replace("Musa ukulinda", "Musa ukulinda")
    t = t.replace("Tsalela umnxeba ku 10177", "Tsalela umnxeba ku-10177")
    t = t.replace("ku 112", "ku-112")
    return t


def walk_collect(xh_val, en_val, path=""):
    pairs = []
    if isinstance(xh_val, dict) and isinstance(en_val, dict):
        for k, xv in xh_val.items():
            np = f"{path}.{k}" if path else k
            ev = en_val.get(k)
            if k in SKIP_KEYS:
                continue
            pairs.extend(walk_collect(xv, ev, np))
    elif isinstance(xh_val, list) and isinstance(en_val, list):
        for i, xv in enumerate(xh_val):
            ev = en_val[i] if i < len(en_val) else None
            np = f"{path}[{i}]"
            pairs.extend(walk_collect(xv, ev, np))
    elif isinstance(xh_val, str) and isinstance(en_val, str):
        if normalize(xh_val) == normalize(en_val) and should_translate(en_val, path):
            pairs.append((path, en_val))
    return pairs


def walk_apply(node, mapping, path=""):
    if isinstance(node, dict):
        out = {}
        for k, v in node.items():
            np = f"{path}.{k}" if path else k
            out[k] = walk_apply(v, mapping, np)
        return out
    if isinstance(node, list):
        return [walk_apply(v, mapping, f"{path}[{i}]") for i, v in enumerate(node)]
    if isinstance(node, str):
        return mapping.get(path, node)
    return node


def translate_unique(strings):
    result = {}
    items = list(strings)
    batch_size = 20
    for i in range(0, len(items), batch_size):
        batch = items[i:i + batch_size]
        done = False
        for _ in range(3):
            try:
                out = translator.translate_batch(batch)
                for src, dst in zip(batch, out):
                    result[src] = post_fix(dst)
                done = True
                break
            except Exception:
                time.sleep(1.2)
        if not done:
            for src in batch:
                try:
                    result[src] = post_fix(translator.translate(src))
                except Exception:
                    result[src] = src
                time.sleep(0.2)
        time.sleep(0.25)
    return result


def process_file(xh_path: Path):
    en_path = BASE / xh_path.name.replace(".xh.json", ".en.json")
    if not en_path.exists():
        return False
    xh_obj = json.loads(xh_path.read_text(encoding="utf-8"))
    en_obj = json.loads(en_path.read_text(encoding="utf-8"))

    pairs = walk_collect(xh_obj, en_obj)
    if not pairs:
        return False

    unique_src = sorted({text for _, text in pairs})
    translated = translate_unique(unique_src)
    path_map = {path: translated.get(src, src) for path, src in pairs}

    new_obj = walk_apply(xh_obj, path_map)
    old = json.dumps(xh_obj, ensure_ascii=False, sort_keys=False)
    new = json.dumps(new_obj, ensure_ascii=False, sort_keys=False)
    if old != new:
        xh_path.write_text(json.dumps(new_obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        return True
    return False


def main():
    updated = 0
    for xh in sorted(BASE.glob("*.xh.json")):
        changed = process_file(xh)
        if changed:
            updated += 1
            print(f"updated {xh.name}")
    print(f"files_updated={updated}")


if __name__ == "__main__":
    main()
