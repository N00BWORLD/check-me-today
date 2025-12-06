"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar";
import AppIcon from "@/components/AppIcon";
import AdUnit from "@/components/AdUnit";

// Dynamic import for framer-motion to avoid SSR issues
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const MotionHeader = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.header),
  { ssr: false }
);

const MotionSpan = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.span),
  { ssr: false }
);

const APPS = [
  {
    id: "teto",
    title: "테토 vs 에겐",
    iconSrc: "/icon-teto.png",
    href: "/test",
    tags: ["심리", "성격", "호르몬", "연애"],
    isComingSoon: false,
  },
  {
    id: "sleep",
    title: "수면 분석",
    iconSrc: "/icon-sleep.png",
    href: "#",
    tags: ["건강", "수면", "잠"],
    isComingSoon: true,
  },
  {
    id: "color",
    title: "퍼스널 컬러",
    iconSrc: "/icon-color.png",
    href: "#",
    tags: ["뷰티", "색상", "진단"],
    isComingSoon: true,
  },
];

export default function Home() {
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
  const dateString = today.toLocaleDateString('ko-KR', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <main className="min-h-screen flex flex-col items-center pt-12 pb-32 px-4 sm:px-6">
      {/* Header */}
      <header className="w-full max-w-xl mb-8 animate-fade-in">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-2xl">✨</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Check Me Today
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              오늘 나를 확인해봐
            </p>
          </div>
        </div>

        {/* Date & Title */}
        <div className="glass rounded-2xl p-5">
          <p className="text-purple-600 text-sm font-bold uppercase tracking-wider mb-1">
            {dateString}
          </p>
          <h2 className="text-3xl font-black text-slate-800 mb-2">
            투데이 <span className="text-gradient">테스트</span>
          </h2>
          <p className="text-slate-500 text-sm">
            심리 테스트로 진짜 나를 발견해보세요 🔮
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="w-full max-w-xl animate-slide-up stagger-1">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Section Title */}
      <div className="w-full max-w-xl mb-4 animate-fade-in stagger-2">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-1">
          🎯 테스트 목록
        </h3>
      </div>

      {/* App Grid */}
      <div className="w-full max-w-xl animate-slide-up stagger-3">
        <div className="glass rounded-3xl p-6">
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
                <p className="text-slate-400 font-medium">검색 결과가 없습니다</p>
                <p className="text-slate-300 text-sm mt-1">다른 키워드로 검색해보세요</p>
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
              className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-500 border border-white/50 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors cursor-pointer animate-scale-in"
              style={{ animationDelay: `${0.5 + idx * 0.05}s` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Ad Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 glass-strong border-t border-white/50 safe-bottom">
        <AdUnit />
      </div>
    </main>
  );
}
