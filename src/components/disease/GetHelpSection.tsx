import { Phone, MapPin } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import type { Helpline } from "@/types/phila";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; lede: string; helplines: Helpline[] }; }

export async function GetHelpSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.getHelp", lang)} heading={data.heading} />
      <p className="text-[14px] text-[var(--text)] leading-relaxed mb-4">{data.lede}</p>
      <div className="flex flex-col gap-2.5">
        {data.helplines.map((h, i) => (h.primary ? (
          <div key={i} className="rounded-2xl p-4 text-white flex items-center justify-between gap-3 overflow-hidden relative"
               style={{ background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.18), transparent 50%), linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, black) 60%, color-mix(in srgb, var(--accent) 50%, black) 100%)",
                        boxShadow: "0 10px 20px -4px color-mix(in srgb, var(--accent) 45%, transparent), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.15)" }}>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-[17px] leading-tight">{h.name}</h4>
              <p className="text-[12px] opacity-92">{h.description}</p>
              {h.meta && <p className="text-[10px] opacity-75 mt-0.5">{h.meta}</p>}
            </div>
            <a href={h.phone ? `tel:${h.phone}` : (h.link || "#")}
               className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-[14px] bg-white/22 backdrop-blur border border-white/30 text-white whitespace-nowrap">
              <Phone size={16} />
              {h.phone_display}
            </a>
          </div>
        ) : (
          <div key={i} className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-4 shadow-card flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-[17px] leading-tight text-[var(--text)]">{h.name}</h4>
              <p className="text-[12px] text-[var(--text-muted)]">{h.description}</p>
              {h.meta && <p className="text-[10px] text-[var(--text-soft)] mt-0.5">{h.meta}</p>}
            </div>
            <a href={h.link || "#"} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-[14px] text-white whitespace-nowrap"
               style={{ background: "radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--accent) 50%, white), var(--accent) 50%, color-mix(in srgb, var(--accent) 60%, black))",
                        boxShadow: "0 6px 12px -2px color-mix(in srgb, var(--accent) 45%, transparent), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.15)" }}>
              <MapPin size={16} />
              {h.phone_display}
            </a>
          </div>
        )))}
      </div>
    </section>
  );
}