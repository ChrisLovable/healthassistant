import { icons, HelpCircle, type LucideIcon } from "lucide-react";

interface StickerProps {
  color: string;
  icon: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses: Record<NonNullable<StickerProps["size"]>, string> = {
  xs: "w-8 h-8 rounded-lg",
  sm: "w-10 h-10 rounded-xl",
  md: "w-14 h-14 rounded-2xl",
  lg: "w-20 h-20 rounded-2xl",
};

const iconPx: Record<NonNullable<StickerProps["size"]>, number> = {
  xs: 16,
  sm: 18,
  md: 24,
  lg: 32,
};

function toPascalCase(s: string): string {
  return s
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

export function Sticker({ color, icon, size = "md", className = "" }: StickerProps) {
  const pascalName = toPascalCase(icon);
  const Icon =
    ((icons as Record<string, LucideIcon>)[pascalName] as LucideIcon | undefined) || HelpCircle;

  return (
    <div
      className={`sticker grid place-items-center ${sizeClasses[size]} ${className}`}
      style={{ ["--accent" as string]: color } as React.CSSProperties}
    >
      <Icon size={iconPx[size]} strokeWidth={2.2} />
    </div>
  );
}