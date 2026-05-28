import Link from "next/link";
import { Pill, Stethoscope } from "lucide-react";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

const QUICK_LINKS = [
  {
    href: "/clinic-finder?type=medical",
    key: "quickLinks.nearestMedicalFacility",
    icon: Stethoscope,
    color: "#16A085",
  },
  {
    href: "/clinic-finder?type=pharmacy",
    key: "quickLinks.nearestPharmacy",
    icon: Pill,
    color: "#8E44AD",
  },
] as const;

export async function QuickLinks() {
  const lang = await getLang();
  return (
    <section className="px-4 py-2">
      <h2 className="font-serif font-bold text-[15px] text-[var(--text)] mb-2">{t("quickLinks.title", lang)}</h2>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1.5 p-3 bg-white/80 backdrop-blur border border-white/80 rounded-xl hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl grid place-items-center text-white"
                style={{
                  background: `radial-gradient(circle at 30% 25%, color-mix(in srgb, ${link.color} 50%, white), ${link.color} 50%, color-mix(in srgb, ${link.color} 60%, black))`,
                  boxShadow: `0 4px 12px ${link.color}40`,
                }}
              >
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-medium text-[var(--text)] text-center leading-tight">
                {t(link.key, lang)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
