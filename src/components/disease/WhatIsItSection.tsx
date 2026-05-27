import { SectionHeader } from "./SectionHeader";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

interface Props { data: { heading: string; lede: string; paragraphs: string[] }; }

export async function WhatIsItSection({ data }: Props) {
  const lang = await getLang();
  return (
    <section className="px-4 py-7">
      <SectionHeader kicker={t("section.whatIsIt", lang)} heading={data.heading} />
      <p className="text-[16px] text-[var(--text)] leading-relaxed font-medium mb-3">{data.lede}</p>
      {data.paragraphs.map((p, i) => (<p key={i} className="text-[14px] text-[var(--text)] leading-relaxed mb-2.5">{p}</p>))}
    </section>
  );
}