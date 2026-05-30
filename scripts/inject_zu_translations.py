"""Inject Zulu strings into translations.ts from English source strings."""
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parent.parent
TS = ROOT / "src" / "lib" / "i18n" / "translations.ts"
CACHE = ROOT / "scripts" / ".zu-ui-cache.json"
translator = GoogleTranslator(source="en", target="zu")


def extract_en_strings(source: str) -> dict[str, str]:
    strings: dict[str, str] = {}
    # Multi-line object entries
    for m in re.finditer(
        r'"([^"]+)":\s*\{\s*\n\s*en:\s*"((?:\\.|[^"\\])*)"(?:,\s*\n\s*af:[^\n]+)?(?:,\s*\n\s*xh:[^\n]+)?',
        source,
    ):
        strings[m.group(1)] = m.group(2).replace('\\"', '"')

    # Single-line entries
    for m in re.finditer(
        r'"([^"]+)":\s*\{\s*en:\s*"((?:\\.|[^"\\])*)"',
        source,
    ):
        if m.group(1) not in strings:
            strings[m.group(1)] = m.group(2).replace('\\"', '"')
    return strings


def load_cache() -> dict[str, str]:
    if CACHE.exists():
        return json.loads(CACHE.read_text(encoding="utf-8"))
    return {}


def save_cache(data: dict[str, str]) -> None:
    CACHE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def translate_all(en_map: dict[str, str]) -> dict[str, str]:
    cache = load_cache()
    for key, en in en_map.items():
        if key in cache:
            continue
        if not en.strip():
            cache[key] = ""
            continue
        try:
            cache[key] = translator.translate(en)
        except Exception as exc:
            print(f"fail {key}: {exc}")
            cache[key] = en
        time.sleep(0.15)
        print(f"translated {key}")
    save_cache(cache)
    return cache


def inject(source: str, zu_map: dict[str, str]) -> str:
    out = source
    for key, zu in zu_map.items():
        if f'"{key}"' not in out:
            continue
        # Skip if zu already present for this key block
        key_idx = out.find(f'"{key}"')
        block_end = out.find("\n  ", key_idx + 1)
        if block_end == -1:
            block_end = len(out)
        block = out[key_idx:block_end]
        if re.search(r"\bzu:\s*", block):
            continue
        escaped = zu.replace("\\", "\\\\").replace('"', '\\"')
        # Insert before xh: if present in block
        if "xh:" in block:
            out = out.replace(block, block.replace("xh:", f'zu: "{escaped}",\n    xh:', 1), 1)
            continue
        # Insert before closing brace on single-line entry
        pattern = rf'("{re.escape(key)}":\s*\{{[^}}]*?)(\s*\}})'
        def repl(m):
            inner = m.group(1)
            if "zu:" in inner:
                return m.group(0)
            return f'{inner}, zu: "{escaped}"{m.group(2)}'
        out, n = re.subn(pattern, repl, out, count=1)
        if n == 0 and "af:" in block:
            out = out.replace(block, block.replace("af:", f'zu: "{escaped}",\n    af:', 1), 1)
    return out


def main():
    source = TS.read_text(encoding="utf-8")
    en_map = extract_en_strings(source)
    print(f"Found {len(en_map)} UI strings")
    zu_map = translate_all(en_map)
    updated = inject(source, zu_map)
    TS.write_text(updated, encoding="utf-8")
    print("Updated translations.ts")


if __name__ == "__main__":
    main()
