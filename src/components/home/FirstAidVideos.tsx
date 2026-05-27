"use client";

import { Play, ExternalLink } from "lucide-react";

const VIDEOS = [
  {
    title: "CPR",
    description: "How to perform CPR",
    url: "https://www.youtube.com/watch?v=UFvL7wTFzl0",
    color: "#C0392B",
  },
  {
    title: "Choking",
    description: "Help someone who is choking",
    url: "https://www.youtube.com/watch?v=PA9hpOnvtCk",
    color: "#E67E22",
  },
  {
    title: "Recovery Position",
    description: "Safe position for unconscious person",
    url: "https://www.youtube.com/watch?v=GmqXqwSV3bo",
    color: "#16A085",
  },
  {
    title: "Heart Attack",
    description: "Recognize and respond",
    url: "https://www.youtube.com/watch?v=gDwt7dD3awc",
    color: "#C0392B",
  },
  {
    title: "Stroke",
    description: "FAST signs and action",
    url: "https://www.youtube.com/watch?v=PhH9a0kIwmk",
    color: "#8E44AD",
  },
  {
    title: "Shock",
    description: "How to treat shock",
    url: "https://www.youtube.com/watch?v=61urGQrmeNM",
    color: "#2980B9",
  },
];

export function FirstAidVideos() {
  return (
    <section className="px-4 py-4">
      <div className="bg-white/90 backdrop-blur border border-white/80 rounded-2xl p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#C0392B] grid place-items-center">
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-[15px] text-[var(--text)]">First Aid Videos</h2>
            <p className="text-[10px] text-[var(--text-muted)]">Learn life-saving techniques</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {VIDEOS.map((video) => (
            <a
              key={video.title}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 p-2.5 bg-[var(--surface-warm)] border border-[var(--border)] rounded-xl hover:bg-white hover:shadow-sm hover:border-[var(--border-soft)] transition-all"
            >
              <div
                className="w-9 h-9 rounded-lg grid place-items-center flex-shrink-0 text-white"
                style={{
                  background: `radial-gradient(circle at 30% 25%, color-mix(in srgb, ${video.color} 50%, white), ${video.color} 50%, color-mix(in srgb, ${video.color} 60%, black))`,
                }}
              >
                <Play size={14} className="ml-0.5" fill="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[var(--text)] leading-tight truncate">
                  {video.title}
                </p>
                <p className="text-[9px] text-[var(--text-muted)] leading-tight truncate">
                  {video.description}
                </p>
              </div>
              <ExternalLink size={12} className="text-[var(--text-soft)] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        <p className="text-[9px] text-[var(--text-soft)] mt-3 text-center">
          Videos by St John Ambulance & British Heart Foundation
        </p>
      </div>
    </section>
  );
}
