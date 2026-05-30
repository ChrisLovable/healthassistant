"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Share, X } from "lucide-react";
import { useLang } from "@/lib/i18n/provider";
import { t } from "@/lib/i18n/translations";

const DISMISS_KEY = "mymedic-pwa-dismiss";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
}

function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function InstallPrompt() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (!isMobileDevice() || isStandalone()) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    setIos(isIOS());

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    const timer = window.setTimeout(() => {
      if (!isStandalone()) setVisible(true);
    }, 1500);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setVisible(false);
      }
    } finally {
      setDeferredPrompt(null);
      setInstalling(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 pt-2 pointer-events-none"
      role="dialog"
      aria-labelledby="pwa-install-title"
      aria-describedby="pwa-install-body"
    >
      <div className="pointer-events-auto mx-auto max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-card-hover overflow-hidden">
        <div className="flex items-start gap-3 p-4">
          <Image
            src="/192.png"
            alt=""
            width={48}
            height={48}
            className="rounded-xl shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p id="pwa-install-title" className="font-serif font-bold text-[15px] text-[var(--text)] leading-tight">
              {t("pwa.installTitle", lang)}
            </p>
            <p id="pwa-install-body" className="text-[12px] text-[var(--text-muted)] mt-1 leading-relaxed">
              {ios ? t("pwa.iosBody", lang) : t("pwa.installBody", lang)}
            </p>
            {ios && (
              <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent)]">
                <Share size={14} className="shrink-0" />
                {t("pwa.iosHint", lang)}
              </p>
            )}
            {!ios && !deferredPrompt && (
              <p className="mt-2 text-[11px] text-[var(--text-soft)] leading-relaxed">
                {t("pwa.androidFallback", lang)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded-full p-1 text-[var(--text-soft)] hover:text-[var(--text-muted)] hover:bg-black/5"
            aria-label={t("pwa.dismiss", lang)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 px-4 pb-4">
          <button
            type="button"
            onClick={dismiss}
            className="flex-1 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-[13px] font-semibold text-[var(--text-muted)]"
          >
            {t("pwa.dismiss", lang)}
          </button>
          {!ios && deferredPrompt && (
            <button
              type="button"
              onClick={install}
              disabled={installing}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text)] px-4 py-2.5 text-[13px] font-bold text-white shadow-lg disabled:opacity-70"
              style={{
                boxShadow: "0 8px 20px -6px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <Download size={16} />
              {installing ? t("pwa.installing", lang) : t("pwa.installButton", lang)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
