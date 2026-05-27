import { SectionHeader } from "./SectionHeader";
import { STICKER_HEX } from "@/types/phila";
import type { MythPair } from "@/types/phila";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; items: MythPair[] }; }

export async function MythsSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.myths", lang)} heading={data.heading} />
      <div className="flex flex-col gap-3 mt-2">
        {data.items.map((pair, i) => (
          <div key={i} className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl overflow-hidden shadow-card">
            <div className="p-3.5 flex gap-3 items-start" style={{ background: "linear-gradient(180deg, rgba(251,235,233,0.95), rgba(251,235,233,0.8))" }}>
              <span className="px-2 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-[0.12em] text-white"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${STICKER_HEX.coral}cc, ${STICKER_HEX.coral} 60%, color-mix(in srgb, ${STICKER_HEX.coral} 60%, black))`,
                             boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.15)" }}>{t("myth.myth", lang)}</span>
              <span className="flex-1 text-[13px] leading-snug text-[var(--text)]">{pair.myth}</span>
            </div>
            <div className="p-3.5 flex gap-3 items-start border-t border-[var(--border-soft)]">
              <span className="px-2 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-[0.12em] text-white"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${STICKER_HEX.green}cc, ${STICKER_HEX.green} 60%, color-mix(in srgb, ${STICKER_HEX.green} 60%, black))`,
                             boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.15)" }}>{t("myth.fact", lang)}</span>
              <span className="flex-1 text-[13px] leading-snug text-[var(--text)]">{pair.fact}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}