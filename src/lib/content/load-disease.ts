import fs from "fs";
import path from "path";
import type { DiseaseContent } from "@/types/phila";
import type { Lang } from "@/lib/i18n/lang";

const DISEASES_DIR = path.join(process.cwd(), "src", "data", "diseases");

const contentCache = new Map<string, DiseaseContent>();

function readDiseaseFile(slug: string, lang: Lang): DiseaseContent | null {
  const cacheKey = `${slug}.${lang}`;
  
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  const filePath = path.join(DISEASES_DIR, `${slug}.${lang}.json`);
  
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8")) as DiseaseContent;
    contentCache.set(cacheKey, content);
    return content;
  } catch {
    return null;
  }
}

export interface LoadedDisease {
  content: DiseaseContent;
  actualLang: Lang;
  isFallback: boolean;
}

export function loadDisease(slug: string, requestedLang: Lang): LoadedDisease | null {
  const requested = readDiseaseFile(slug, requestedLang);
  if (requested) {
    return { content: requested, actualLang: requestedLang, isFallback: false };
  }

  if (requestedLang !== "en") {
    const english = readDiseaseFile(slug, "en");
    if (english) {
      return { content: english, actualLang: "en", isFallback: true };
    }
  }

  return null;
}

export function listAuthoredDiseaseSlugs(): string[] {
  try {
    const files = fs.readdirSync(DISEASES_DIR);
    const slugs = new Set<string>();
    
    for (const file of files) {
      const match = file.match(/^(.+)\.en\.json$/);
      if (match) {
        slugs.add(match[1]);
      }
    }
    
    return Array.from(slugs);
  } catch {
    return [];
  }
}