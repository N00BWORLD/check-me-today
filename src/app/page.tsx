"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import AppIcon from "@/components/AppIcon";
import AdUnit from "@/components/AdUnit";

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

  return (
    <main className="min-h-screen bg-[#F2F2F7] flex flex-col items-center pt-20 px-6">
      {/* Date & Header */}
      <div className="w-full max-w-xl mb-8 space-y-1">
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">
          {new Date().toLocaleDateString('ko-KR', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          투데이
        </h1>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* App Grid */}
      <div className="w-full max-w-xl grid grid-cols-4 gap-y-8 gap-x-4">
        {filteredApps.map((app) => (
          <AppIcon
            key={app.id}
            title={app.title}
            iconSrc={app.iconSrc}
            href={app.href}
            isComingSoon={app.isComingSoon}
          />
        ))}

        {filteredApps.length === 0 && (
          <div className="col-span-4 text-center py-12 text-slate-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* Bottom Ad Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200">
        <AdUnit />
      </div>
    </main>
  );
}
