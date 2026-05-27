interface Props {
  kicker: string;
  heading: string;
}

export function SectionHeader({ kicker, heading }: Props) {
  return (
    <>
      <p className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.12em] mb-2 pl-5">
        {kicker}
      </p>
      <h2 className="font-serif font-bold text-[24px] leading-[1.15] text-[var(--text)] tracking-tight pl-4 border-l-[4px] mb-3"
          style={{ borderImage: "linear-gradient(180deg, color-mix(in srgb, var(--accent) 60%, white), var(--accent)) 1" }}>
        {heading}
      </h2>
    </>
  );
}