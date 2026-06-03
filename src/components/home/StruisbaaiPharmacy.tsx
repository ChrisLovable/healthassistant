import { Phone, MapPin, Clock, Mail, ExternalLink } from "lucide-react";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

const PHONE_DISPLAY = "028 435 6913";
const PHONE_TEL = "+27284356913";
const ADDRESS = "15 Malvern Drive, Struisbaai, 7280, Western Cape";
const EMAIL = "rx@sbpharm.co.za";
const HOURS = "Mon–Fri 9:30–17:30, Sat 9:00–13:00, Sun 11:00–12:30";
const FACEBOOK_URL = "https://facebook.com/StruisbaaiPharm";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

/** Matches Struisbaai Pharmacy logo banner */
const PHARM = {
  main: "#20849b",
  light: "#3690a4",
  dark: "#1a6d85",
};

export async function StruisbaaiPharmacy() {
  const lang = await getLang();

  return (
    <section className="px-4 pt-3 pb-1">
      <div
        className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-card"
        style={{ border: `1px solid ${PHARM.main}40` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-9 h-9 rounded-full grid place-items-center text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${PHARM.light}, ${PHARM.main})` }}
          >
            <Phone size={16} />
          </div>
          <div className="min-w-0">
            <h2 className="font-serif font-bold text-[15px] text-[var(--text)] leading-tight">
              {t("struisbaaiPharmacy.title", lang)}
            </h2>
            <p className="text-[10px] text-[var(--text-muted)]">{t("struisbaaiPharmacy.subtitle", lang)}</p>
          </div>
        </div>

        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center justify-center gap-2 w-full py-3 mb-3 rounded-xl text-white font-semibold text-[14px] transition-all active:scale-[0.98] hover:opacity-95"
          style={{
            background: `linear-gradient(135deg, ${PHARM.light}, ${PHARM.main})`,
            boxShadow: `0 4px 12px ${PHARM.main}59`,
          }}
        >
          <Phone size={18} />
          {t("struisbaaiPharmacy.call", lang)} — {PHONE_DISPLAY}
        </a>

        <ul className="space-y-2 text-[11px] text-[var(--text-muted)] leading-relaxed">
          <li className="flex items-start gap-2">
            <MapPin size={14} className="shrink-0 mt-0.5 text-[#20849b]" />
            <span>
              <strong className="text-[var(--text)]">{t("struisbaaiPharmacy.address", lang)}:</strong>{" "}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#20849b]"
              >
                {ADDRESS}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Clock size={14} className="shrink-0 mt-0.5 text-[#20849b]" />
            <span>
              <strong className="text-[var(--text)]">{t("struisbaaiPharmacy.hours", lang)}:</strong> {HOURS}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Mail size={14} className="shrink-0 mt-0.5 text-[#20849b]" />
            <span>
              <strong className="text-[var(--text)]">{t("struisbaaiPharmacy.email", lang)}:</strong>{" "}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-[#20849b]">
                {EMAIL}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ExternalLink size={14} className="shrink-0 mt-0.5 text-[#20849b]" />
            <span>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-[#20849b]"
              >
                facebook.com/StruisbaaiPharm
              </a>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
