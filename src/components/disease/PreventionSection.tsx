import { Sticker } from "@/components/ui/Sticker";
import { SectionHeader } from "./SectionHeader";
import { STICKER_HEX } from "@/types/phila";
import type { PreventionItem } from "@/types/phila";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; lede: string; items: PreventionItem[] }; }

export async function PreventionSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.prevention", lang)} heading={data.heading} />
      <p className="text-[14px] text-[var(--text)] leading-relaxed mb-4">{data.lede}</p>
      <div className="grid grid-cols-2 gap-2.5">
        {data.items.map((item, i) => (
          <div key={i} className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-3.5 shadow-card">
            <Sticker color={STICKER_HEX[item.color]} icon={item.icon} size="sm" />
            <h4 className="font-serif font-bold text-[16px] mt-2.5 text-[var(--text)] leading-tight">{item.title}</h4>
            <p className="text-[12px] text-[var(--text-muted)] mt-1 leading-snug">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}