import Link from "next/link";
import { MapPin, Hospital, Pill, Stethoscope } from "lucide-react";

const QUICK_LINKS = [
  {
    href: "/clinic-finder?type=clinic",
    label: "Find clinic",
    icon: Stethoscope,
    color: "#16A085",
  },
  {
    href: "/clinic-finder?type=hospital",
    label: "Find hospital",
    icon: Hospital,
    color: "#2980B9",
  },
  {
    href: "/clinic-finder?type=pharmacy",
    label: "Find pharmacy",
    icon: Pill,
    color: "#8E44AD",
  },
  {
    href: "/clinic-finder?type=emergency",
    label: "Emergency room",
    icon: MapPin,
    color: "#C0392B",
  },
];

export function QuickLinks() {
  return (
    <section className="px-4 py-2">
      <h2 className="font-serif font-bold text-[15px] text-[var(--text)] mb-2">Find nearby</h2>
      <div className="grid grid-cols-4 gap-2">
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1.5 p-3 bg-white/80 backdrop-blur border border-white/80 rounded-xl hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl grid place-items-center text-white"
                style={{
                  background: `radial-gradient(circle at 30% 25%, color-mix(in srgb, ${link.color} 50%, white), ${link.color} 50%, color-mix(in srgb, ${link.color} 60%, black))`,
                  boxShadow: `0 4px 12px ${link.color}40`,
                }}
              >
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-medium text-[var(--text)] text-center leading-tight">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
