import diseasesData from "@/data/diseases.json";
import catalogTranslations from "@/data/catalog-translations.json";
import type { Disease, Group, GroupWithCount, DiseaseData } from "@/types/phila";
import type { Lang } from "@/lib/i18n/lang";

const data = diseasesData as DiseaseData;
const ct = catalogTranslations as {
  groups: Record<string, Partial<Record<Lang, { name: string; tagline: string }>>>;
  diseases: Record<string, Partial<Record<Lang, { name: string; tagline: string }>>>;
};

function translateGroup(group: Group, lang: Lang): Group {
  const tr = ct.groups[group.slug]?.[lang];
  if (!tr) return group;
  return { ...group, name: tr.name, tagline: tr.tagline };
}

function translateDisease(disease: Disease, lang: Lang): Disease {
  const tr = ct.diseases[disease.slug]?.[lang];
  if (!tr) return disease;
  return { ...disease, name: tr.name, tagline: tr.tagline };
}

export function loadGroups(lang: Lang = "en"): GroupWithCount[] {
  return data.groups.map((group: Group) => ({
    ...translateGroup(group, lang),
    diseaseCount: data.diseases.filter((d: Disease) => d.group_slug === group.slug).length,
  }));
}

export function loadDiseasesForGroup(groupSlug: string, lang: Lang = "en"): Disease[] {
  return data.diseases
    .filter((d: Disease) => d.group_slug === groupSlug)
    .map((d) => translateDisease(d, lang));
}

export function getGroup(slug: string, lang: Lang = "en"): Group | undefined {
  const group = data.groups.find((g: Group) => g.slug === slug);
  if (!group) return undefined;
  return translateGroup(group, lang);
}