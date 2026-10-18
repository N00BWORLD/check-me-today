"use client";

// 복주머니가 흔들리며 열리는 짧은 연출 화면 (약 2초)
import { useLanguage } from "@/context/LanguageContext";
import LuckyPouch from "./LuckyPouch";
import { fortuneTexts } from "./texts";

export default function FortuneOpening() {
  const { lang } = useLanguage();
  const t = (key: keyof typeof fortuneTexts) => fortuneTexts[key][lang] || fortuneTexts[key].en;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* 뒤쪽 빛 */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#f6d77a]/60 to-[#e0702a]/40 blur-2xl animate-pulse" />
          <div className="relative w-full h-full flex items-center justify-center">
            <LuckyPouch size={150} shaking className="drop-shadow-2xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{t("opening")}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{t("openingSub")}</p>

        {/* 진행 막대 */}
        <div className="mt-6 w-56 mx-auto h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#c62f26] to-[#f6d77a] rounded-full animate-pouch-progress" />
        </div>
      </div>
    </main>
  );
}
