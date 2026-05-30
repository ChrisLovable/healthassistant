import { TopBar } from "@/components/ui/TopBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AskMyMedicChatbot } from "@/components/home/AskMyMedicChatbot";
import { QuickLinks } from "@/components/home/QuickLinks";
import { EmergencySection } from "@/components/home/EmergencySection";
import { FirstAidVideos } from "@/components/home/FirstAidVideos";
import { getLang } from "@/lib/i18n/lang-server";
import { t } from "@/lib/i18n/translations";

export default async function HomePage() {
  const lang = await getLang();

  return (
    <div className="min-h-screen max-w-md mx-auto">
      <TopBar />

      <main>
        <section className="px-4 pt-5 pb-1">
          <h1 className="font-serif font-bold text-[24px] text-[var(--text)] tracking-tight leading-[1.08]">
            {t("home.hero.title", lang)}
          </h1>
          <p className="text-[11px] text-[var(--text-muted)] mt-2 leading-relaxed">
            {t("home.hero.disclaimer", lang)}
          </p>
        </section>

        <CategoryGrid />
        <AskMyMedicChatbot />
        <QuickLinks />
        <FirstAidVideos />
        <EmergencySection />

        <footer className="px-4 py-4 text-center text-[10px] text-[var(--text-soft)] leading-relaxed">
          <p className="mb-0.5">
            {t("home.footer.line1", lang)} {t("home.footer.developedBy", lang)}{" "}
            <a
              href="https://www.myaipartner.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80"
            >
              www.myaipartner.co.za
            </a>
          </p>
          <p>{t("home.footer.line2", lang)}</p>
        </footer>
      </main>
    </div>
  );
}