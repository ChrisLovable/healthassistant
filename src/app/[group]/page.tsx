import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TopBar } from "@/components/ui/TopBar";
import { Sticker } from "@/components/ui/Sticker";
import { getGroup, loadDiseasesForGroup } from "@/lib/content/load-groups";
import { listAuthoredDiseaseSlugs } from "@/lib/content/load-disease";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface PageProps { params: Promise<{ group: string }>; }

export default async function GroupPage({ params }: PageProps) {
  const { group: groupSlug } = await params;
  const lang = await getLang();
  const group = getGroup(groupSlug, lang);
  if (!group) notFound();

  const diseases = loadDiseasesForGroup(groupSlug, lang);
  const authoredSlugs = listAuthoredDiseaseSlugs();
  const label = diseases.length === 1 ? t("conditions.singular", lang) : t("conditions.plural", lang);

  return (
    <div className="min-h-screen max-w-md mx-auto" style={{ ["--accent" as string]: group.color } as React.CSSProperties}>
      <TopBar />

      <main>
        <div className="px-4 pt-5 pb-2">
          <Link href="/" className="inline-flex items-center gap-1 text-[12px] font-medium mb-3" style={{ color: group.color }}>
            <ChevronLeft size={14} strokeWidth={2.5} />
            {t("nav.allCategories", lang)}
          </Link>
          <div className="flex items-start gap-3 mb-2">
            <Sticker color={group.color} icon={group.icon} size="md" />
            <div className="flex-1 pt-1">
              <h1 className="font-serif font-bold text-[24px] text-[var(--text)] tracking-tight leading-[1.05]">{group.name}</h1>
              <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-snug">{group.tagline}</p>
              <p className="text-[11px] text-[var(--text-soft)] font-medium mt-1">{diseases.length} {label}</p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-8">
          <div className="flex flex-col gap-2 mt-3">
            {diseases.map(disease => {
              const isAuthored = authoredSlugs.includes(disease.slug);
              return (
                <Link key={disease.slug} href={`/${group.slug}/${disease.slug}`}
                      className={`group flex items-center gap-3 p-3 bg-white/90 backdrop-blur border border-white/80 rounded-2xl shadow-card transition-all ${isAuthored ? "hover:shadow-card-hover hover:-translate-y-0.5" : "opacity-60"}`}>
                  <Sticker color={group.color} icon={group.icon} size="xs" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-[14px] text-[var(--text)] leading-tight">{disease.name}</h3>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">{disease.tagline}</p>
                    {!isAuthored && <p className="text-[10px] text-[var(--text-soft)] mt-0.5 italic">{t("contentComingSoon", lang)}</p>}
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-soft)] flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}