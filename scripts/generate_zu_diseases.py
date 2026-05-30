"""Generate Zulu disease JSON files from English sources."""
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

BASE = Path(__file__).resolve().parent.parent / "src" / "data" / "diseases"
translator = GoogleTranslator(source="en", target="zu")

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


def post_fix(text: str) -> str:
    text = text.replace("Shayela u-10177", "Shayela u-10177")
    text = text.replace("fonela 10177", "shayela u-10177")
    text = text.replace("Call 10177", "Shayela u-10177")
    return text


def walk_strings(node, path="", out=None):
    if out is None:
        out = []
    if isinstance(node, dict):
        for k, v in node.items():
            if k in SKIP_KEYS:
                continue
            walk_strings(v, f"{path}.{k}" if path else k, out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk_strings(v, f"{path}[{i}]", out)
    elif isinstance(node, str) and should_translate(node, path):
        out.append((path, node))
    return out


def walk_apply(node, mapping, path=""):
    if isinstance(node, dict):
        return {
            k: walk_apply(v, mapping, f"{path}.{k}" if path else k)
            for k, v in node.items()
        }
    if isinstance(node, list):
        return [walk_apply(v, mapping, f"{path}[{i}]") for i, v in enumerate(node)]
    if isinstance(node, str):
        return post_fix(mapping.get(path, node))
    return node


def translate_batch(unique: dict[str, str]) -> dict[str, str]:
    result = {}
    items = list(unique.items())
    for i, (path, text) in enumerate(items):
        try:
            result[path] = post_fix(translator.translate(text))
        except Exception as exc:
            print(f"  skip {path}: {exc}")
            result[path] = text
        if (i + 1) % 20 == 0:
            print(f"  translated {i + 1}/{len(items)} strings...")
            time.sleep(0.5)
    return result


def main():
    en_files = sorted(BASE.glob("*.en.json"))
    print(f"Found {len(en_files)} English disease files")

    for en_path in en_files:
        slug = en_path.name.replace(".en.json", "")
        zu_path = BASE / f"{slug}.zu.json"
        if zu_path.exists():
            print(f"skip {slug} (zu exists)")
            continue

        with en_path.open(encoding="utf-8") as f:
            en_data = json.load(f)

        pairs = walk_strings(en_data)
        unique = {path: text for path, text in pairs}
        print(f"{slug}: translating {len(unique)} strings...")
        mapping = translate_batch(unique)
        zu_data = walk_apply(en_data, mapping)

        with zu_path.open("w", encoding="utf-8") as f:
            json.dump(zu_data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"  wrote {zu_path.name}")
        time.sleep(1)

    print("Done.")


if __name__ == "__main__":
    main()
