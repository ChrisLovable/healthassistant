export type Lang = "en" | "af" | "zu" | "xh" | "st";

export const ALL_LANGS: Lang[] = ["en", "af", "zu", "xh", "st"];
export const AVAILABLE_LANGS: Lang[] = ["en", "af", "zu", "xh", "st"];

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  af: "Afrikaans",
  zu: "isiZulu",
  xh: "isiXhosa",
  st: "Sesotho",
};

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "af" || value === "zu" || value === "xh" || value === "st";
}