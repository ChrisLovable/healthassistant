"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n/provider";
import { ALL_LANGS, AVAILABLE_LANGS, LANG_LABEL, type Lang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function TopBar() {
  const { lang, setLang } = useLang();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(247,244,238,0.78)] border-b border-black/5">
      <div className="max-w-md mx-auto px-4 pt-2 pb-3">
        <div className="flex justify-center">
          <div className="flex bg-white/60 backdrop-blur border border-black/10 rounded-full p-1 shadow-sm">
            {ALL_LANGS.map((code: Lang) => {
              const available = AVAILABLE_LANGS.includes(code);
              const active = lang === code;
              return (
                <button
                  key={code}
                  onClick={() => available && setLang(code)}
                  disabled={!available}
                  aria-disabled={!available}
                  className={`relative px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${active ? "bg-black text-white shadow" : "text-[var(--text-muted)]"} ${available ? "" : "opacity-40 cursor-not-allowed"}`}
                  title={available ? "" : t("notice.langSoon", lang)}
                >
                  {LANG_LABEL[code]}
                  {!available && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400 ring-1 ring-white" />}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="MyMedic"
            width={512}
            height={512}
            priority
            className="w-[90vw] max-w-full h-auto rounded-[10px]"
          />
        </div>
      </div>
    </header>
  );
}