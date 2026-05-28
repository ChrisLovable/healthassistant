import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";
import { sourceUrl } from "@/lib/content/sources";

interface Props { sources: string[]; }

export async function Disclaimer({ sources }: Props) {
  const lang = await getLang();
  return (
    <footer className="px-4 pt-8 pb-12 border-t border-[var(--border)] text-[11px] text-[var(--text-muted)] leading-relaxed mt-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <h5 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-soft)] mb-1.5">{t("disclaimer.findMoreInfo", lang)}</h5>
          <ul className="space-y-1">
            {sources.map((s) => {
              const url = sourceUrl(s);
              return (
                <li key={s}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:no-underline"
                    >
                      {s}
                    </a>
                  ) : (
                    s
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bg-[var(--surface-warm)] border border-[var(--border-soft)] rounded-2xl p-3.5 shadow-card text-[11px] leading-relaxed">
        <strong className="text-[var(--text)]">{t("disclaimer.important", lang)}:</strong> {t("disclaimer.body", lang)}
      </div>
    </footer>
  );
}