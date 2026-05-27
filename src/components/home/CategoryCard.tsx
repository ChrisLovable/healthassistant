import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Sticker } from "@/components/ui/Sticker";
import type { GroupWithCount, Disease } from "@/types/phila";
import type { Lang } from "@/lib/i18n/lang";

interface GroupWithDiseases extends GroupWithCount {
  diseases: Disease[];
}

interface Props { group: GroupWithDiseases; lang: Lang; }

export function CategoryCard({ group }: Props) {
  const diseaseNames = group.diseases.map(d => d.name).join(" · ");
  
  return (
    <Link href={`/${group.slug}`}
          className="group flex items-center gap-3 p-3 bg-white/85 backdrop-blur border border-white/80 rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5">
      <Sticker color={group.color} icon={group.icon} size="sm" />
      <div className="flex-1 min-w-0">
        <h3 className="font-serif font-bold text-[14px] text-[var(--text)] leading-tight">{group.name}</h3>
        <p className="text-[10px] text-[var(--text-muted)] mt-1 leading-relaxed line-clamp-2">{diseaseNames}</p>
      </div>
      <ChevronRight size={16} className="text-[var(--text-soft)] group-hover:text-[var(--text-muted)] transition-colors flex-shrink-0" />
    </Link>
  );
}