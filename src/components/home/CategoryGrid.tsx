import { CategoryCard } from "./CategoryCard";
import { loadGroups, loadDiseasesForGroup } from "@/lib/content/load-groups";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

export async function CategoryGrid() {
  const lang = await getLang();
  const groups = loadGroups(lang);

  const groupsWithDiseases = groups.map(group => ({
    ...group,
    diseases: loadDiseasesForGroup(group.slug, lang),
  }));

  return (
    <section className="px-4 py-3">
      <h2 className="font-serif font-bold text-[17px] text-[var(--text)] mb-0.5 tracking-tight">{t("home.browse.title", lang)}</h2>
      <p className="text-[11px] text-[var(--text-muted)] mb-3">{t("home.browse.subtitle", lang)}</p>
      <div className="flex flex-col gap-2">
        {groupsWithDiseases.map(group => (<CategoryCard key={group.slug} group={group} lang={lang} />))}
      </div>
    </section>
  );
}