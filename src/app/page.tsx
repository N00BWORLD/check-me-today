"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import AppIcon from "@/components/AppIcon";
import AdUnit from "@/components/AdUnit";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage, uiTexts } from "@/context/LanguageContext";

export default function Home() {
  const { t, lang } = useLanguage();
  
  const APPS = [
    {
      id: "teto",
      title: t(uiTexts.tetoVsEgen),
      iconSrc: "/icon-teto.png",
      href: "/test",
      tags: ["심리", "성격", "psychology", "personality"],
      isComingSoon: false,
    },
    {
      id: "sleep",
      title: t(uiTexts.sleepAnalysis),
      iconSrc: "/icon-sleep.png",
      href: "#",
      tags: ["건강", "수면", "health", "sleep"],
      isComingSoon: true,
    },
    {
      id: "color",
      title: t(uiTexts.personalColor),
      iconSrc: "/icon-color.png",
      href: "#",
      tags: ["뷰티", "색상", "beauty", "color"],
      isComingSoon: true,
    },
  ];

  const [filteredApps, setFilteredApps] = useState(APPS);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredApps(APPS);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = APPS.filter(
      (app) =>
        app.title.toLowerCase().includes(lowerQuery) ||
        app.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
    setFilteredApps(filtered);
  };

  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString(
    lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US', 
    dateOptions
  );

  return (
    <main className="min-h-screen flex flex-col items-center pt-12 pb-24 px-4 sm:px-6">
      {/* Header */}
      <header className="w-full max-w-xl mb-8 animate-fade-in">
        {/* Logo & Brand & Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white dark:border-slate-800" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                {t(uiTexts.brandName)}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t(uiTexts.brandSlogan)}
              </p>
            </div>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>

        {/* Date & Title */}
        <div className="glass dark:bg-slate-800/80 rounded-2xl p-5">
          <p className="text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wider mb-1">
            {dateString}
          </p>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
            {t(uiTexts.todayTest).split(" ")[0]} <span className="text-gradient">{t(uiTexts.todayTest).split(" ").slice(1).join(" ") || "테스트"}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {t(uiTexts.discoverYourself)}
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="w-full max-w-xl animate-slide-up stagger-1">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Section Title */}
      <div className="w-full max-w-xl mb-4 animate-fade-in stagger-2">
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
          {t(uiTexts.testList)}
        </h3>
      </div>

      {/* App Grid */}
      <div className="w-full max-w-xl animate-slide-up stagger-3">
        <div className="glass dark:bg-slate-800/80 rounded-3xl p-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
            {filteredApps.map((app, idx) => (
              <div 
                key={app.id} 
                className="animate-scale-in"
                style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
              >
                <AppIcon
                  title={app.title}
                  iconSrc={app.iconSrc}
                  href={app.href}
                  isComingSoon={app.isComingSoon}
                />
              </div>
            ))}

            {filteredApps.length === 0 && (
              <div className="col-span-full text-center py-12 animate-fade-in">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-slate-400 dark:text-slate-500 font-medium">{t(uiTexts.noResults)}</p>
                <p className="text-slate-300 dark:text-slate-600 text-sm mt-1">{t(uiTexts.tryOther)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="w-full max-w-xl mt-6 animate-fade-in stagger-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {["#심리", "#성격", "#연애", "#건강", "#뷰티"].map((tag, idx) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-500 dark:text-slate-300 border border-white/50 dark:border-slate-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-700 transition-colors cursor-pointer animate-scale-in"
              style={{ animationDelay: `${0.5 + idx * 0.05}s` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Ad - 축소됨 */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <AdUnit />
      </div>
    </main>
  );
}
