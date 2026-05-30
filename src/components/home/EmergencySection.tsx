"use client";

import { useState } from "react";
import { Phone, Ambulance } from "lucide-react";
import { useLang } from "@/lib/i18n/provider";
import { t } from "@/lib/i18n/translations";

const EMERGENCY_NUMBERS = [
  {
    name: "Government Ambulance",
    number: "10177",
    description: "Free public emergency services",
    color: "#C0392B",
  },
  {
    name: "Netcare 911",
    number: "082 911",
    tel: "082911",
    description: "Private emergency response",
    color: "#2980B9",
  },
  {
    name: "ER24",
    number: "084 124",
    tel: "084124",
    description: "Private emergency response",
    color: "#16A085",
  },
  {
    name: "Emergency (Mobile)",
    number: "112",
    description: "Works on any network, even without airtime",
    color: "#8E44AD",
  },
];

export function EmergencySection() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const labels = {
    en: {
      gov: "Government Ambulance",
      netcare: "Netcare 911",
      er24: "ER24",
      mobile: "Emergency (Mobile)",
    },
    af: {
      gov: "Regeringsambulans",
      netcare: "Netcare 911",
      er24: "ER24",
      mobile: "Noodgeval (Selfoon)",
    },
    xh: {
      gov: "I-ambulensi kaRhulumente",
      netcare: "Netcare 911",
      er24: "ER24",
      mobile: "Ungxamiseko (Ifowuni)",
    },
    zu: {
      gov: "I-ambulensi kahulumeni",
      netcare: "Netcare 911",
      er24: "ER24",
      mobile: "Isimo esiphuthumayo (Iselula)",
    },
    st: {
      gov: "Ambulense ea 'Muso",
      netcare: "Netcare 911",
      er24: "ER24",
      mobile: "Tšohanyetso (mobile)",
    },
  } as const;
  const L = labels[lang] ?? labels.en;

  async function handleWhatsAppShare() {
    const url = window.location.origin;
    const message = t("emergencySection.shareMessage", lang) + url;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard may be unavailable; still open WhatsApp
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="px-4 py-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-red-500 grid place-items-center">
            <Ambulance size={16} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-[15px] text-red-900">{t("emergencySection.title", lang)}</h2>
            <p className="text-[10px] text-red-700">{t("emergencySection.subtitle", lang)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {EMERGENCY_NUMBERS.map((item) => (
            <a
              key={item.number}
              href={`tel:${item.tel || item.number}`}
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl border border-red-100 hover:border-red-300 hover:shadow-md transition-all active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-full grid place-items-center text-white"
                style={{ backgroundColor: item.color }}
              >
                <Phone size={18} />
              </div>
              <span className="font-bold text-[14px] text-[var(--text)]">{item.number}</span>
              <span className="text-[10px] text-[var(--text-muted)] text-center leading-tight">
                {item.number === "10177" ? L.gov : item.number === "082 911" ? L.netcare : item.number === "084 124" ? L.er24 : L.mobile}
              </span>
            </a>
          ))}
        </div>

        <p className="text-[10px] text-red-700 mt-3 text-center leading-relaxed">
          {t("emergencySection.footerBefore", lang)} <strong>10177</strong> {t("emergencySection.footerMiddle", lang)} <strong>112</strong> {t("emergencySection.footerAfter", lang)}
        </p>

        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-semibold text-[12px] transition-all active:scale-[0.98] shadow-sm"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {copied ? t("emergencySection.linkCopied", lang) : t("emergencySection.shareWhatsApp", lang)}
        </button>
      </div>
    </section>
  );
}
