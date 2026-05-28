import acneEn from "@/data/diseases/acne.en.json";
import acneAf from "@/data/diseases/acne.af.json";
import anxietyEn from "@/data/diseases/anxiety.en.json";
import anxietyAf from "@/data/diseases/anxiety.af.json";
import asthmaAttackEn from "@/data/diseases/asthma-attack.en.json";
import asthmaAttackAf from "@/data/diseases/asthma-attack.af.json";
import asthmaAttackXh from "@/data/diseases/asthma-attack.xh.json";
import asthmaChildrenEn from "@/data/diseases/asthma-children.en.json";
import asthmaChildrenAf from "@/data/diseases/asthma-children.af.json";
import breastCancerEn from "@/data/diseases/breast-cancer.en.json";
import breastCancerAf from "@/data/diseases/breast-cancer.af.json";
import cervicalCancerHpvEn from "@/data/diseases/cervical-cancer-hpv.en.json";
import cervicalCancerHpvAf from "@/data/diseases/cervical-cancer-hpv.af.json";
import childFeverEn from "@/data/diseases/child-fever.en.json";
import childFeverAf from "@/data/diseases/child-fever.af.json";
import childFeverXh from "@/data/diseases/child-fever.xh.json";
import childhoodDiarrhoeaEn from "@/data/diseases/childhood-diarrhoea.en.json";
import childhoodDiarrhoeaAf from "@/data/diseases/childhood-diarrhoea.af.json";
import childhoodDiarrhoeaXh from "@/data/diseases/childhood-diarrhoea.xh.json";
import contraceptionEn from "@/data/diseases/contraception.en.json";
import contraceptionAf from "@/data/diseases/contraception.af.json";
import covid19En from "@/data/diseases/covid-19.en.json";
import covid19Af from "@/data/diseases/covid-19.af.json";
import depressionEn from "@/data/diseases/depression.en.json";
import depressionAf from "@/data/diseases/depression.af.json";
import diabetesEn from "@/data/diseases/diabetes.en.json";
import diabetesAf from "@/data/diseases/diabetes.af.json";
import eczemaEn from "@/data/diseases/eczema.en.json";
import eczemaAf from "@/data/diseases/eczema.af.json";
import fluEn from "@/data/diseases/flu.en.json";
import fluAf from "@/data/diseases/flu.af.json";
import fungalSkinEn from "@/data/diseases/fungal-skin.en.json";
import fungalSkinAf from "@/data/diseases/fungal-skin.af.json";
import headacheMigraineEn from "@/data/diseases/headache-migraine.en.json";
import headacheMigraineAf from "@/data/diseases/headache-migraine.af.json";
import heartAttackEn from "@/data/diseases/heart-attack.en.json";
import heartAttackAf from "@/data/diseases/heart-attack.af.json";
import heartAttackXh from "@/data/diseases/heart-attack.xh.json";
import heartburnRefluxEn from "@/data/diseases/heartburn-reflux.en.json";
import heartburnRefluxAf from "@/data/diseases/heartburn-reflux.af.json";
import highBloodPressureEn from "@/data/diseases/high-blood-pressure.en.json";
import highBloodPressureAf from "@/data/diseases/high-blood-pressure.af.json";
import highCholesterolEn from "@/data/diseases/high-cholesterol.en.json";
import highCholesterolAf from "@/data/diseases/high-cholesterol.af.json";
import hivEn from "@/data/diseases/hiv.en.json";
import meningitisEn from "@/data/diseases/meningitis.en.json";
import meningitisAf from "@/data/diseases/meningitis.af.json";
import meningitisXh from "@/data/diseases/meningitis.xh.json";
import pneumoniaEn from "@/data/diseases/pneumonia.en.json";
import pneumoniaAf from "@/data/diseases/pneumonia.af.json";
import pregnancyDangerSignsEn from "@/data/diseases/pregnancy-danger-signs.en.json";
import pregnancyDangerSignsAf from "@/data/diseases/pregnancy-danger-signs.af.json";
import pregnancyDangerSignsXh from "@/data/diseases/pregnancy-danger-signs.xh.json";
import prostateProblemsEn from "@/data/diseases/prostate-problems.en.json";
import prostateProblemsAf from "@/data/diseases/prostate-problems.af.json";
import severeAllergicReactionEn from "@/data/diseases/severe-allergic-reaction.en.json";
import severeAllergicReactionAf from "@/data/diseases/severe-allergic-reaction.af.json";
import severeAllergicReactionXh from "@/data/diseases/severe-allergic-reaction.xh.json";
import stisEn from "@/data/diseases/stis.en.json";
import stisAf from "@/data/diseases/stis.af.json";
import strokeEn from "@/data/diseases/stroke.en.json";
import strokeAf from "@/data/diseases/stroke.af.json";
import strokeXh from "@/data/diseases/stroke.xh.json";
import substanceUseEn from "@/data/diseases/substance-use.en.json";
import substanceUseAf from "@/data/diseases/substance-use.af.json";
import tbEn from "@/data/diseases/tb.en.json";
import tbAf from "@/data/diseases/tb.af.json";
import utiEn from "@/data/diseases/uti.en.json";
import utiAf from "@/data/diseases/uti.af.json";
import vaccinationsEn from "@/data/diseases/vaccinations.en.json";
import vaccinationsAf from "@/data/diseases/vaccinations.af.json";
import type { DiseaseContent } from "@/types/phila";
import type { Lang } from "@/lib/i18n/lang";

const DISEASE_CONTENT: Record<string, Partial<Record<Lang, DiseaseContent>>> = {
  "acne": { en: acneEn as DiseaseContent, af: acneAf as DiseaseContent },
  "anxiety": { en: anxietyEn as DiseaseContent, af: anxietyAf as DiseaseContent },
  "asthma-attack": { en: asthmaAttackEn as DiseaseContent, af: asthmaAttackAf as DiseaseContent, xh: asthmaAttackXh as DiseaseContent },
  "asthma-children": { en: asthmaChildrenEn as DiseaseContent, af: asthmaChildrenAf as DiseaseContent },
  "breast-cancer": { en: breastCancerEn as DiseaseContent, af: breastCancerAf as DiseaseContent },
  "cervical-cancer-hpv": { en: cervicalCancerHpvEn as DiseaseContent, af: cervicalCancerHpvAf as DiseaseContent },
  "child-fever": { en: childFeverEn as DiseaseContent, af: childFeverAf as DiseaseContent, xh: childFeverXh as DiseaseContent },
  "childhood-diarrhoea": { en: childhoodDiarrhoeaEn as DiseaseContent, af: childhoodDiarrhoeaAf as DiseaseContent, xh: childhoodDiarrhoeaXh as DiseaseContent },
  "contraception": { en: contraceptionEn as DiseaseContent, af: contraceptionAf as DiseaseContent },
  "covid-19": { en: covid19En as DiseaseContent, af: covid19Af as DiseaseContent },
  "depression": { en: depressionEn as DiseaseContent, af: depressionAf as DiseaseContent },
  "diabetes": { en: diabetesEn as DiseaseContent, af: diabetesAf as DiseaseContent },
  "eczema": { en: eczemaEn as DiseaseContent, af: eczemaAf as DiseaseContent },
  "flu": { en: fluEn as DiseaseContent, af: fluAf as DiseaseContent },
  "fungal-skin": { en: fungalSkinEn as DiseaseContent, af: fungalSkinAf as DiseaseContent },
  "headache-migraine": { en: headacheMigraineEn as DiseaseContent, af: headacheMigraineAf as DiseaseContent },
  "heart-attack": { en: heartAttackEn as DiseaseContent, af: heartAttackAf as DiseaseContent, xh: heartAttackXh as DiseaseContent },
  "heartburn-reflux": { en: heartburnRefluxEn as DiseaseContent, af: heartburnRefluxAf as DiseaseContent },
  "high-blood-pressure": { en: highBloodPressureEn as DiseaseContent, af: highBloodPressureAf as DiseaseContent },
  "high-cholesterol": { en: highCholesterolEn as DiseaseContent, af: highCholesterolAf as DiseaseContent },
  "hiv": { en: hivEn as DiseaseContent },
  "meningitis": { en: meningitisEn as DiseaseContent, af: meningitisAf as DiseaseContent, xh: meningitisXh as DiseaseContent },
  "pneumonia": { en: pneumoniaEn as DiseaseContent, af: pneumoniaAf as DiseaseContent },
  "pregnancy-danger-signs": { en: pregnancyDangerSignsEn as DiseaseContent, af: pregnancyDangerSignsAf as DiseaseContent, xh: pregnancyDangerSignsXh as DiseaseContent },
  "prostate-problems": { en: prostateProblemsEn as DiseaseContent, af: prostateProblemsAf as DiseaseContent },
  "severe-allergic-reaction": { en: severeAllergicReactionEn as DiseaseContent, af: severeAllergicReactionAf as DiseaseContent, xh: severeAllergicReactionXh as DiseaseContent },
  "stis": { en: stisEn as DiseaseContent, af: stisAf as DiseaseContent },
  "stroke": { en: strokeEn as DiseaseContent, af: strokeAf as DiseaseContent, xh: strokeXh as DiseaseContent },
  "substance-use": { en: substanceUseEn as DiseaseContent, af: substanceUseAf as DiseaseContent },
  "tb": { en: tbEn as DiseaseContent, af: tbAf as DiseaseContent },
  "uti": { en: utiEn as DiseaseContent, af: utiAf as DiseaseContent },
  "vaccinations": { en: vaccinationsEn as DiseaseContent, af: vaccinationsAf as DiseaseContent },
};

export interface LoadedDisease {
  content: DiseaseContent;
  actualLang: Lang;
  isFallback: boolean;
}

export function loadDisease(slug: string, requestedLang: Lang): LoadedDisease | null {
  const versions = DISEASE_CONTENT[slug];
  if (!versions) return null;

  const requested = versions[requestedLang];
  if (requested) return { content: requested, actualLang: requestedLang, isFallback: false };

  const english = versions.en;
  if (english) return { content: english, actualLang: "en", isFallback: requestedLang !== "en" };

  return null;
}

export function listAuthoredDiseaseSlugs(): string[] {
  return Object.keys(DISEASE_CONTENT);
}
