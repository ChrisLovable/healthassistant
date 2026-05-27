export interface Group {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  color: string;
  icon: string;
  tier_default: string;
  poster_priority: number;
}

export interface Disease {
  id: number;
  slug: string;
  group_slug: string;
  name: string;
  tagline: string;
  tier: string;
  modules: string[];
  in_mvp: boolean;
}

export interface GroupWithCount extends Group {
  diseaseCount: number;
}

export interface DiseaseData {
  version: string;
  platform: string;
  mvp_count: number;
  languages: string[];
  core_sections: string[];
  modules_available: string[];
  groups: Group[];
  diseases: Disease[];
}

export type StickerColor = "purple" | "gold" | "green" | "coral" | "orange";

export interface FactItem {
  color: StickerColor;
  icon: string;
  headline: string;
  body: string;
}

export interface SignItem {
  color: StickerColor;
  icon: string;
  title: string;
  description: string;
}

export interface PreventionItem {
  color: StickerColor;
  icon: string;
  title: string;
  description: string;
}

export interface MythPair {
  myth: string;
  fact: string;
}

export interface ActionStep {
  title: string;
  description: string;
}

export interface Helpline {
  name: string;
  description: string;
  meta?: string;
  phone: string | null;
  phone_display: string;
  primary: boolean;
  link?: string;
}

export interface DiseaseContent {
  slug: string;
  group_slug: string;
  name: string;
  tagline: string;
  read_time_minutes: number;
  last_reviewed: string;
  next_review: string;
  reviewer: string;
  sources: string[];
  what_is_it: { heading: string; lede: string; paragraphs: string[] };
  facts: { heading: string; items: FactItem[]; pull_quote?: { text: string; source: string } };
  signs: { heading: string; lede: string; items: SignItem[] };
  urgent?: { heading: string; primary_message: string; phone: string; phone_display: string; red_flags: string[] };
  spreads?: { heading: string; yes: string[]; no: string[] };
  myths?: { heading: string; items: MythPair[] };
  prevention?: { heading: string; lede: string; items: PreventionItem[] };
  action_steps: { heading: string; items: ActionStep[] };
  get_help: { heading: string; lede: string; helplines: Helpline[] };
}

export const STICKER_HEX: Record<StickerColor, string> = {
  purple: "#8E44AD",
  gold:   "#C7972A",
  green:  "#16A085",
  coral:  "#C0392B",
  orange: "#E67E22",
};