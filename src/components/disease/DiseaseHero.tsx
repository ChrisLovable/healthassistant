import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Group } from "@/types/phila";

interface Props { group: Group; }

export function DiseaseHero({ group }: Props) {
  return (
    <div className="px-4 pt-4 pb-1">
      <nav className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
        <Link href={`/${group.slug}`} className="inline-flex items-center gap-1 font-medium" style={{ color: group.color }}>
          <ChevronLeft size={12} strokeWidth={2.5} />
          {group.name}
        </Link>
        <span className="text-[var(--text-soft)]">/</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur border text-[11px] font-semibold"
              style={{ borderColor: `${group.color}26`, color: group.color }}>
          <span className="w-2 h-2 rounded-full"
                style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${group.color} 50%, white), ${group.color} 60%, color-mix(in srgb, ${group.color} 60%, black))` }} />
          {group.tier_default}
        </span>
      </nav>
    </div>
  );
}