"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import AppCard from "@/components/AppCard";
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
      description: t(uiTexts.tetoVsEgenDesc),
      emoji: "🔥",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      bgGradient: "from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30",
      href: "/test",
      tags: ["심리", "성격", "psychology", "personality", "热情", "心理"],
      isComingSoon: false,
    },
    {
      id: "sleep",
      title: t(uiTexts.sleepAnalysis),
      description: t(uiTexts.sleepAnalysisDesc),
      emoji: "🌙",
      gradient: "from-indigo-500 via-purple-500 to-blue-500",
      bgGradient: "from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30",
      href: "#",
      tags: ["건강", "수면", "health", "sleep", "睡眠", "健康"],
      isComingSoon: true,
    },
    {
      id: "color",
      title: t(uiTexts.personalColor),
      description: t(uiTexts.personalColorDesc),
      emoji: "🎨",
      gradient: "from-pink-500 via-rose-500 to-amber-500",
      bgGradient: "from-pink-100 to-amber-100 dark:from-pink-900/30 dark:to-amber-900/30",
      href: "#",
      tags: ["뷰티", "색상", "beauty", "color", "色彩", "美容"],
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

  // 헤더 타이틀 분리
  const todayWord = lang === 'ko' ? '투데이' : lang === 'zh' ? '今日' : lang === 'ja' ? '今日の' : "Today's";
  const testWord = t(uiTexts.testWord);

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
            {todayWord} <span className="text-gradient">{testWord}</span>
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

      {/* App Cards */}
      <div className="w-full max-w-xl space-y-4 animate-slide-up stagger-3">
        {filteredApps.map((app, idx) => (
          <div 
            key={app.id} 
            className="animate-scale-in"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            <AppCard
              title={app.title}
              description={app.description}
              emoji={app.emoji}
              gradient={app.gradient}
              bgGradient={app.bgGradient}
              href={app.href}
              isComingSoon={app.isComingSoon}
            />
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="text-center py-12 animate-fade-in glass dark:bg-slate-800/80 rounded-3xl">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400 dark:text-slate-500 font-medium">{t(uiTexts.noResults)}</p>
            <p className="text-slate-300 dark:text-slate-600 text-sm mt-1">{t(uiTexts.tryOther)}</p>
          </div>
        )}
      </div>

      {/* Bottom Ad */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <AdUnit />
      </div>
    </main>
  );
}
