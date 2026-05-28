"use client";
interface Props { name: string; tagline: string; }
export function DiseaseTitle({ name, tagline }: Props) {
  return (
    <div className="px-4 pt-1 pb-4">
      <h1 className="font-serif font-bold text-[40px] text-[var(--text)] tracking-tight leading-[1.02] mb-2">{name}</h1>
      <p className="text-[16px] text-[var(--text-muted)] leading-snug">{tagline}</p>
    </div>
  );
}