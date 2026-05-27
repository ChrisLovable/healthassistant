"use client";

import { Phone, Ambulance } from "lucide-react";

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
  return (
    <section className="px-4 py-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-red-500 grid place-items-center">
            <Ambulance size={16} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-[15px] text-red-900">Emergency ambulance</h2>
            <p className="text-[10px] text-red-700">Tap to call immediately</p>
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
              <span className="text-[10px] text-[var(--text-muted)] text-center leading-tight">{item.name}</span>
            </a>
          ))}
        </div>

        <p className="text-[10px] text-red-700 mt-3 text-center leading-relaxed">
          Call <strong>10177</strong> for free government ambulance. <strong>112</strong> works from any mobile, even without airtime.
        </p>
      </div>
    </section>
  );
}
