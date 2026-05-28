export type Lang = "en" | "af" | "zu" | "xh";

export const ALL_LANGS: Lang[] = ["en", "af", "zu", "xh"];
export const AVAILABLE_LANGS: Lang[] = ["en", "af", "xh"]; // ZU pending paid translators

export const LANG_LABEL: Record<Lang, string> = {
  en: "EN",
  af: "AF",
  zu: "ZU",
  xh: "XH",
};

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "af" || value === "zu" || value === "xh";
}