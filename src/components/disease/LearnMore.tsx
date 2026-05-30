interface LearnMoreItem { heading: string; paragraphs: string[]; }
interface Props { items: LearnMoreItem[]; label: string; }

export function LearnMore({ items, label }: Props) {
  if (!items?.length) return null;
  return (
    <details className="group mx-4 mt-2 mb-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-warm)] overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer list-none select-none px-4 py-3.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{label}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
             className="text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="px-4 pb-4 pt-2 space-y-4 border-t border-[var(--border)]">
        {items.map((it, i) => (
          <div key={i}>
            <h3 className="font-serif font-bold text-[17px] text-[var(--text)] leading-snug mb-1.5">{it.heading}</h3>
            {it.paragraphs.map((p, j) => (
              <p key={j} className="text-[14px] text-[var(--text-muted)] leading-relaxed mb-2 last:mb-0">{p}</p>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}