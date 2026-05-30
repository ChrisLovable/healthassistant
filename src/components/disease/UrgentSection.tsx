import { AlertTriangle } from "lucide-react";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; primary_message: string; phone: string | null; phone_display: string; red_flags: string[] }; }

export async function UrgentSection({ data }: Props) {
  const lang = await getLang();
  // If heading not provided in data, fall back to translated kicker
  const headingText = data.heading || t("section.urgent", lang);
  return (
    <section className="px-4 py-5">
      <div className="rounded-3xl p-5 text-white relative overflow-hidden"
           style={{ background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15), transparent 50%), linear-gradient(135deg, #C0392B 0%, #8B2018 60%, #5C1810 100%)",
                    boxShadow: "0 16px 32px -8px rgba(192,57,43,0.45), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -2px 4px rgba(0,0,0,0.20)" }}>
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-10 h-10 rounded-2xl grid place-items-center bg-white/22 backdrop-blur border border-white/30">
            <AlertTriangle size={20} fill="white" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] opacity-95">{headingText}</p>
        </div>
        <p className="font-serif font-bold text-[22px] leading-tight mb-4">{data.primary_message}</p>

        <ul className="space-y-1.5 mb-4 text-[13px] leading-snug">
          {data.red_flags.map((flag, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}