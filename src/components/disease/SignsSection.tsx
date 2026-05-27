import { Sticker } from "@/components/ui/Sticker";
import { SectionHeader } from "./SectionHeader";
import { STICKER_HEX } from "@/types/phila";
import type { SignItem } from "@/types/phila";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; lede: string; items: SignItem[] }; }

export async function SignsSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.signs", lang)} heading={data.heading} />
      <p className="text-[14px] text-[var(--text)] leading-relaxed mb-4">{data.lede}</p>
      <div className="flex flex-col gap-2.5">
        {data.items.map((sign, i) => (
          <div key={i} className="flex items-start gap-3 p-3.5 bg-white/90 backdrop-blur border border-white/80 rounded-2xl shadow-card">
            <Sticker color={STICKER_HEX[sign.color]} icon={sign.icon} size="xs" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[14px] text-[var(--text)] mb-0.5 leading-snug">{sign.title}</p>
              <p className="text-[13px] text-[var(--text-muted)] leading-snug">{sign.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}