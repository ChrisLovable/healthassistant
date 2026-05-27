"use client";

import { useState } from "react";
import { ShieldCheck, Calendar, Clock, Play, Headphones } from "lucide-react";
import { useLang } from "@/lib/i18n/provider";
import { t } from "@/lib/i18n/translations";

interface Props { name: string; tagline: string; lastReviewed: string; readTimeMinutes: number; }

export function DiseaseTitle({ name, tagline, lastReviewed, readTimeMinutes }: Props) {
  const { lang } = useLang();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="px-4 pt-1 pb-4">
      <h1 className="font-serif font-bold text-[40px] text-[var(--text)] tracking-tight leading-[1.02] mb-2">{name}</h1>
      <p className="text-[16px] text-[var(--text-muted)] leading-snug mb-4">{tagline}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-[var(--text-muted)] py-3 border-t border-b border-[var(--border)]">
        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} /> {t("meta.medicallyReviewed", lang)}</span>
        <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {lastReviewed}</span>
        <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {readTimeMinutes} {t("meta.minRead", lang)}</span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 bg-white/90 backdrop-blur border rounded-2xl p-2.5 pl-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
           style={{ borderColor: "color-mix(in srgb, var(--accent) 18%, transparent)" }}>
        <div className="flex items-center gap-2.5 text-[13px] font-medium" style={{ color: "color-mix(in srgb, var(--accent) 80%, black)" }}>
          <Headphones size={16} />
          {t("meta.listenPrompt", lang)}
        </div>
        <button onClick={() => setPlaying(p => !p)}
                className="px-4 py-2 rounded-full text-white font-bold text-[13px] inline-flex items-center gap-1.5"
                style={{ background: "radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--accent) 50%, white), var(--accent) 50%, color-mix(in srgb, var(--accent) 60%, black))",
                         boxShadow: "0 8px 16px -4px color-mix(in srgb, var(--accent) 45%, transparent), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.15)" }}>
          <Play size={14} fill="currentColor" />
          {playing ? t("meta.stop", lang) : t("meta.listen", lang)}
        </button>
      </div>
    </div>
  );
}