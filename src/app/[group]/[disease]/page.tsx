import { notFound } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { DiseaseHero } from "@/components/disease/DiseaseHero";
import { DiseaseTitle } from "@/components/disease/DiseaseTitle";
import { WhatIsItSection } from "@/components/disease/WhatIsItSection";
import { KnowThisSection } from "@/components/disease/KnowThisSection";
import { SignsSection } from "@/components/disease/SignsSection";
import { UrgentSection } from "@/components/disease/UrgentSection";
import { SpreadsSection } from "@/components/disease/SpreadsSection";
import { MythsSection } from "@/components/disease/MythsSection";
import { PreventionSection } from "@/components/disease/PreventionSection";
import { ActionStepsSection } from "@/components/disease/ActionStepsSection";
import { GetHelpSection } from "@/components/disease/GetHelpSection";
import { LearnMore } from "@/components/disease/LearnMore";
import { Disclaimer } from "@/components/disease/Disclaimer";
import { getGroup } from "@/lib/content/load-groups";
import { loadDisease } from "@/lib/content/load-disease";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface PageProps { params: Promise<{ group: string; disease: string }>; }

export default async function DiseasePage({ params }: PageProps) {
  const { group: groupSlug, disease: diseaseSlug } = await params;
  const lang = await getLang();
  const group = getGroup(groupSlug, lang);
  const loaded = loadDisease(diseaseSlug, lang);
  if (!group || !loaded) notFound();

  const { content, isFallback } = loaded;
  const learnMore = (content as { learn_more?: { items: { heading: string; paragraphs: string[] }[] } }).learn_more;

  // Title and tagline always come from translated catalog
  const catalogName = group ? group.name : content.name;
  // For the disease itself, we want translated name/tagline from catalog (group lookup did groups; do diseases separately)
  // Easiest: use diseaseSlug -> diseases.json + translation, but content.name already has the canonical EN.
  // The catalog-translations.json drives the AF title. We re-fetch via loadDiseasesForGroup if needed; here we just use content directly.

  return (
    <div className="min-h-screen max-w-md mx-auto" style={{ ["--accent" as string]: group.color } as React.CSSProperties}>
      <TopBar />

      <main>
        <DiseaseHero group={group} />
        <DiseaseTitle name={content.name} tagline={content.tagline} />

        {isFallback && lang === "af" && (
          <div className="mx-4 mt-1 mb-1 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-snug">
            {t("notice.fallbackAf", lang)}
          </div>
        )}
        {isFallback && lang === "zu" && (
          <div className="mx-4 mt-1 mb-1 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-snug">
            {t("notice.fallbackZu", lang)}
          </div>
        )}
        {isFallback && lang === "st" && (
          <div className="mx-4 mt-1 mb-1 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-snug">
            {t("notice.fallbackSt", lang)}
          </div>
        )}
        {isFallback && lang === "xh" && (
          <div className="mx-4 mt-1 mb-1 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-snug">
            {t("notice.fallbackXh", lang)}
          </div>
        )}

        {content.urgent && <UrgentSection data={content.urgent} />}
        <WhatIsItSection data={content.what_is_it} />
        <KnowThisSection data={content.facts} />
        <SignsSection data={content.signs} />
        {content.spreads && <SpreadsSection data={content.spreads} />}
        {content.myths && <MythsSection data={content.myths} />}
        {content.prevention && <PreventionSection data={content.prevention} />}
        <ActionStepsSection data={content.action_steps} />
        {learnMore?.items?.length ? <LearnMore items={learnMore.items} label={t("section.learnMore", lang)} /> : null}
        <GetHelpSection data={content.get_help} />
        <Disclaimer sources={content.sources} />
      </main>
    </div>
  );
}