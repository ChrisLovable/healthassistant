import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { reviewer: string; lastReviewed: string; nextReview: string; sources: string[]; }

export async function Disclaimer({ reviewer, lastReviewed, nextReview, sources }: Props) {
  const lang = await getLang();
  return (
    <footer className="px-4 pt-8 pb-12 border-t border-[var(--border)] text-[11px] text-[var(--text-muted)] leading-relaxed mt-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h5 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-soft)] mb-1.5">{t("disclaimer.reviewed", lang)}</h5>
          <p>{t("disclaimer.reviewedBy", lang)} {reviewer}</p>
          <p>{t("disclaimer.lastReview", lang)}: {lastReviewed}</p>
          <p>{t("disclaimer.nextReview", lang)}: {nextReview}</p>
        </div>
        <div>
          <h5 className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-soft)] mb-1.5">{t("disclaimer.sources", lang)}</h5>
          <p>{sources.join(" · ")}</p>
        </div>
      </div>
      <div className="bg-[var(--surface-warm)] border border-[var(--border-soft)] rounded-2xl p-3.5 shadow-card text-[11px] leading-relaxed">
        <strong className="text-[var(--text)]">{t("disclaimer.important", lang)}:</strong> {t("disclaimer.body", lang)}
      </div>
    </footer>
  );
}