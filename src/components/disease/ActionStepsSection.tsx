import { SectionHeader } from "./SectionHeader";
import type { ActionStep } from "@/types/phila";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; items: ActionStep[] }; }

export async function ActionStepsSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.actionSteps", lang)} heading={data.heading} />
      <ol className="flex flex-col gap-2.5 mt-2">
        {data.items.map((step, i) => (
          <li key={i} className="flex items-start gap-3.5 p-3.5 bg-white/90 backdrop-blur border border-white/80 rounded-2xl shadow-card">
            <span className="w-8 h-8 rounded-full grid place-items-center text-white font-serif font-bold text-[15px] flex-shrink-0"
                  style={{ background: "radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--accent) 50%, white), var(--accent) 50%, color-mix(in srgb, var(--accent) 60%, black))",
                           boxShadow: "0 6px 12px -2px color-mix(in srgb, var(--accent) 45%, transparent), inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)",
                           textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}>{i + 1}</span>
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-[14px] text-[var(--text)] mb-0.5 leading-snug">{step.title}</p>
              <p className="text-[13px] text-[var(--text-muted)] leading-snug">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}