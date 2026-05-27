import { Sticker } from "@/components/ui/Sticker";
import { SectionHeader } from "./SectionHeader";
import { STICKER_HEX } from "@/types/phila";
import type { FactItem } from "@/types/phila";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; items: FactItem[]; pull_quote?: { text: string; source: string } }; }

export async function KnowThisSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.knowThis", lang)} heading={data.heading} />
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {data.items.map((fact, i) => (
          <div key={i} className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-3.5 shadow-card">
            <Sticker color={STICKER_HEX[fact.color]} icon={fact.icon} size="sm" />
            <h3 className="font-serif font-bold text-[20px] mt-2.5 text-[var(--text)] leading-[1.1]">{fact.headline}</h3>
            <p className="text-[12px] text-[var(--text-muted)] mt-1 leading-snug">{fact.body}</p>
          </div>
        ))}
      </div>

      {data.pull_quote && (
        <div className="p-4 rounded-2xl border-l-[5px]"
             style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, white) 0%, color-mix(in srgb, var(--accent) 30%, white) 100%)",
                      borderImage: "linear-gradient(180deg, color-mix(in srgb, var(--accent) 50%, white), var(--accent)) 1",
                      boxShadow: "0 8px 24px -8px color-mix(in srgb, var(--accent) 25%, transparent)" }}>
          <p className="font-serif font-semibold text-[18px] leading-snug mb-2" style={{ color: "color-mix(in srgb, var(--accent) 80%, black)" }}>
            &ldquo;{data.pull_quote.text}&rdquo;
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80" style={{ color: "color-mix(in srgb, var(--accent) 80%, black)" }}>
            — {data.pull_quote.source}
          </p>
        </div>
      )}
    </section>
  );
}