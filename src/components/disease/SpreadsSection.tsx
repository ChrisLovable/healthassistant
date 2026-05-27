import { Sticker } from "@/components/ui/Sticker";
import { SectionHeader } from "./SectionHeader";
import { STICKER_HEX } from "@/types/phila";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; yes: string[]; no: string[] }; }

export async function SpreadsSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.spreads", lang)} heading={data.heading} />
      <div className="grid grid-cols-1 gap-3 mt-2">
        <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[var(--border)]">
            <Sticker color={STICKER_HEX.orange} icon="alert-triangle" size="xs" />
            <h4 className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#B35A0E" }}>{t("spreads.does", lang)}</h4>
          </div>
          <ul className="space-y-2 text-[13px] text-[var(--text)]">
            {data.yes.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${STICKER_HEX.orange}cc, ${STICKER_HEX.orange} 60%, color-mix(in srgb, ${STICKER_HEX.orange} 60%, black))` }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[var(--border)]">
            <Sticker color={STICKER_HEX.green} icon="check" size="xs" />
            <h4 className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#0F6E56" }}>{t("spreads.doesNot", lang)}</h4>
          </div>
          <ul className="space-y-2 text-[13px] text-[var(--text)]">
            {data.no.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${STICKER_HEX.green}cc, ${STICKER_HEX.green} 60%, color-mix(in srgb, ${STICKER_HEX.green} 60%, black))` }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}